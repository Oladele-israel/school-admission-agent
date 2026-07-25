import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const applicant = await prisma.applicant.findUnique({ where: { sessionId } });
  if (!applicant) return NextResponse.json({ messages: [] });

  const messages = await prisma.conversation.findMany({
    where: { applicantId: applicant.id },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ messages });
}
