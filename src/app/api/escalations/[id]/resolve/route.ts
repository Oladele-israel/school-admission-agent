import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { triggerMakeAction } from "@/lib/webhooks";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { action, resolution } = await req.json();

  const escalation = await prisma.escalationTask.findUnique({ where: { id } });
  if (!escalation) return NextResponse.json({ error: "Escalation not found" }, { status: 404 });
  if (escalation.status === "RESOLVED") return NextResponse.json({ error: "Already resolved" }, { status: 409 });

  const finalResolution = action === "reject" ? "[No reply sent — request rejected by staff]" : resolution;

  await prisma.escalationTask.update({
    where: { id },
    data: { status: "RESOLVED", resolution: finalResolution, resolvedAt: new Date() },
  });

  // Unpause the agent so it can listen to the parent's replies again!
  await prisma.applicant.update({
    where: { id: escalation.applicantId },
    data: { agentPaused: false }
  });

  // Flow 2 (Universal): Hand the human's decision back to the agent.
  if (action !== "reject") {
    await triggerMakeAction({
      taskType: "ESCALATION_REPLY",
      escalationId: id,
      applicantId: escalation.applicantId,
      resolution: finalResolution,
    });
  }

  return NextResponse.json({ ok: true });
}
