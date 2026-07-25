import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { stage } = await req.json();

  const valid = ["INQUIRY", "TOUR_BOOKED", "TOUR_COMPLETED", "APPLICATION_SUBMITTED", "FEE_PENDING", "ENROLLED", "LOST"];
  if (!valid.includes(stage)) return NextResponse.json({ error: "Invalid stage" }, { status: 400 });

  const updated = await prisma.applicant.update({ where: { id }, data: { stage } });
  return NextResponse.json({ applicant: updated });
}
