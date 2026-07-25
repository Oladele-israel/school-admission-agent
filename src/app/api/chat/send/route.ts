import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notifyAgentOfMessage } from "@/lib/webhooks";

// Entry point for the web chat widget — this is the direct replacement for
// the old "WhatsApp message received" trigger. Everything downstream (intent
// classification, tool calls, escalation) is unchanged; only the transport
// is different.
export async function POST(req: NextRequest) {
  const { sessionId, message, parentName } = await req.json();
  if (!sessionId || !message?.trim()) {
    return NextResponse.json({ error: "sessionId and message are required" }, { status: 400 });
  }

  const applicant = await prisma.applicant.upsert({
    where: { sessionId },
    update: parentName ? { parentName } : {},
    create: { sessionId, parentName: parentName || null, stage: "INQUIRY" },
  });

  const saved = await prisma.conversation.create({
    data: { applicantId: applicant.id, sender: "parent", body: message },
  });

  // If a human already took over this thread, don't wake the agent up —
  // this is the same rule that governs the manual-override button in /inbox.
  if (!applicant.agentPaused) {
    const recent = await prisma.conversation.findMany({
      where: { applicantId: applicant.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    await notifyAgentOfMessage({
      applicantId: applicant.id,
      sessionId,
      message,
    });
  }

  return NextResponse.json({ message: saved });
}
