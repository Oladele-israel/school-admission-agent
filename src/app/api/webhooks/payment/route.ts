import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

// Paystack/Flutterwave payment provider webhook. Verifies the signature so
// nobody can forge a "payment received" event.
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature") || req.headers.get("verif-hash");
  const expected = crypto.createHmac("sha512", process.env.PAYMENT_PROVIDER_SECRET || "").update(rawBody).digest("hex");

  if (!signature || signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const providerRef = event.data?.reference;
  const applicantPhoneOrEmail = event.data?.customer?.email;

  if (!providerRef) return NextResponse.json({ error: "Missing reference" }, { status: 400 });

  const payment = await prisma.payment.findFirst({ where: { providerRef } });
  if (payment) {
    await prisma.payment.update({ where: { id: payment.id }, data: { status: "paid" } });
    const remaining = await prisma.payment.count({ where: { applicantId: payment.applicantId, status: { not: "paid" } } });
    if (remaining === 0) {
      await prisma.applicant.update({ where: { id: payment.applicantId }, data: { stage: "ENROLLED" } });
    }
  }

  return NextResponse.json({ ok: true, matchedApplicant: applicantPhoneOrEmail ?? null });
}
