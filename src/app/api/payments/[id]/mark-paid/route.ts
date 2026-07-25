import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Manual reconciliation for offline/bank-transfer payments. A note is
// required so there's always a paper trail for why a balance was cleared
// without a matching provider webhook.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { note } = await req.json();
  if (!note?.trim()) return NextResponse.json({ error: "A reconciliation note is required" }, { status: 400 });

  const payment = await prisma.payment.update({
    where: { id },
    data: { status: "paid", note, markedPaidBy: user.id },
  });

  const remaining = await prisma.payment.count({ where: { applicantId: payment.applicantId, status: { not: "paid" } } });
  if (remaining === 0) {
    await prisma.applicant.update({ where: { id: payment.applicantId }, data: { stage: "ENROLLED" } });
  }

  return NextResponse.json({ payment });
}
