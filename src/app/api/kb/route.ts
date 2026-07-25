import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const articles = await prisma.knowledgeBaseArticle.findMany({ orderBy: { category: "asc" } });
  return NextResponse.json({ articles });
}

export async function POST(req: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { category, question, answer } = await req.json();
  if (!category?.trim() || !question?.trim() || !answer?.trim()) {
    return NextResponse.json({ error: "Category, question, and answer are all required" }, { status: 400 });
  }

  const article = await prisma.knowledgeBaseArticle.create({
    data: { category, question, answer, updatedBy: user.email },
  });
  return NextResponse.json({ article });
}
