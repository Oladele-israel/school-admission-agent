import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { category, question, answer } = await req.json();

  const article = await prisma.knowledgeBaseArticle.update({
    where: { id },
    data: { category, question, answer, updatedBy: user.email },
  });
  return NextResponse.json({ article });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.knowledgeBaseArticle.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
