import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Toggles whether the agent or a human currently owns this thread.
export async function POST(_req: NextRequest, { params }: { params: Promise<{ applicantId: string }> }) {
  const { applicantId } = await params;
  const applicant = await prisma.applicant.findUnique({ where: { id: applicantId } });
  if (!applicant) return NextResponse.json({ error: "Applicant not found" }, { status: 404 });

  const updated = await prisma.applicant.update({
    where: { id: applicantId },
    data: { agentPaused: !applicant.agentPaused },
  });

  return NextResponse.json({ agentPaused: updated.agentPaused });
}
