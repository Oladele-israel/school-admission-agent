import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Sends a stage-3+ fee reminder that the agent drafted but held for bursar
// review, given tone risk with a paying parent. Approving clears the draft
// and logs it as a sent message on the applicant's thread.
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  if (!payment.draftReminder) return NextResponse.json({ error: "No draft reminder awaiting approval" }, { status: 409 });

  await prisma.conversation.create({
    data: { applicantId: payment.applicantId, sender: "agent", body: payment.draftReminder },
  });

  const updated = await prisma.payment.update({
    where: { id },
    data: { draftReminder: null, reminderStage: { increment: 1 } },
  });

  return NextResponse.json({ payment: updated });
}
