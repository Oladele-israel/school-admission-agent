import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const escalations = await prisma.escalationTask.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "asc" },
    include: { applicant: true },
  });
  return NextResponse.json({ escalations });
}
