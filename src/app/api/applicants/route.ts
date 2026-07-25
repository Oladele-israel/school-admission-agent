import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const applicants = await prisma.applicant.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ applicants });
}
