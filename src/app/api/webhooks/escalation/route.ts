import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Make.com's Flow A calls this on the fee_negotiation / complaint / no-KB-match
// / unmatched-payment-claim branches. Note there is no corresponding "send a
// substantive reply" webhook wired for these branches — that's the structural
// gate: the tool that could let the agent freelance simply doesn't exist here.
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.MAKE_INBOUND_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { applicantId, reason, triggerSnippet, assignedRole, suggestedReply, holdingMessage } = await req.json();
  if (!applicantId || !reason || !assignedRole) {
    return NextResponse.json({ error: "applicantId, reason, and assignedRole are required" }, { status: 400 });
  }

  // Format reason to match Prisma enum (e.g. "Fee Negotiation" -> "FEE_NEGOTIATION")
  const formattedReason = reason.toUpperCase().replace(/\s+/g, "_");

  const escalation = await prisma.escalationTask.create({
    data: { applicantId, reason: formattedReason, triggerSnippet: triggerSnippet || "", assignedRole, suggestedReply: suggestedReply || null },
  });

  await prisma.applicant.update({ where: { id: applicantId }, data: { agentPaused: true } });

  if (holdingMessage) {
    await prisma.conversation.create({ data: { applicantId, sender: "agent", body: holdingMessage } });
  }

  return NextResponse.json({ escalation });
}
