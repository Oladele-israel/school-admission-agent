import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Make.com's Flow A / Flow D call this once the agent has a message ready to
// deliver. Because the channel is now web chat instead of WhatsApp, "sending"
// is just writing a row here — the parent's browser picks it up on its next
// poll of /api/chat/[sessionId]/messages.
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.MAKE_INBOUND_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { applicantId, message, intent, stage } = await req.json();
  if (!applicantId || !message?.trim()) {
    return NextResponse.json({ error: "applicantId and message are required" }, { status: 400 });
  }

  const saved = await prisma.conversation.create({
    data: { applicantId, sender: "agent", body: message, intent: intent || null },
  });

  if (stage) {
    await prisma.applicant.update({ where: { id: applicantId }, data: { stage } });
  }

  return NextResponse.json({ message: saved });
}
