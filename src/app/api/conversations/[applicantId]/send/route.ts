import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// An officer sends a manual message. This only works once the thread is
// paused (agentPaused = true) — enforced here, not just in the UI — so the
// agent and a human can never talk over each other in the same thread.
export async function POST(req: NextRequest, { params }: { params: Promise<{ applicantId: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { applicantId } = await params;
  const { body } = await req.json();
  if (!body?.trim()) return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });

  const applicant = await prisma.applicant.findUnique({ where: { id: applicantId } });
  if (!applicant) return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
  if (!applicant.agentPaused) {
    return NextResponse.json({ error: "Take over the conversation before sending a manual message" }, { status: 409 });
  }

  const message = await prisma.conversation.create({
    data: { applicantId, sender: `officer:${user.id}`, body },
  });

  return NextResponse.json({ message });
}
