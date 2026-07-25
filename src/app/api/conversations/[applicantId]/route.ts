import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ applicantId: string }> }) {
  const { applicantId } = await params;
  const messages = await prisma.conversation.findMany({
    where: { applicantId },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ messages });
}
