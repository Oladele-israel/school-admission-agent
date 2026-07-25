import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { notifyAgentOfResolution } from "@/lib/webhooks";

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

  // Flow D: hand the human's decision back to the agent so it can compose the
  // actual outbound message — the agent never invents new terms, only delivers
  // exactly what was approved here.
  if (action !== "reject") {
    await notifyAgentOfResolution({
      escalationId: id,
      applicantId: escalation.applicantId,
      resolution: finalResolution,
    });
  }

  return NextResponse.json({ ok: true });
}
