import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, buildSessionCookie, SESSION_COOKIE_NAME } from "@/lib/auth";

// Demo login: looks the user up by email only (seed your User table first).
// Swap this for real password/OAuth verification before going to production.
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const user = await findUserByEmail(email);
  if (!user) return NextResponse.json({ error: "No account found with that email" }, { status: 401 });

  const cookieValue = buildSessionCookie({ id: user.id, email: user.email, name: user.name, role: user.role });
  const res = NextResponse.json({ ok: true, role: user.role });
  res.cookies.set(SESSION_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
