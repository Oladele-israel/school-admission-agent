import { cookies } from "next/headers";
import crypto from "crypto";
import { prisma } from "./prisma";

const SECRET = process.env.SESSION_SECRET || "dev-secret-change-me-in-production";
export const SESSION_COOKIE_NAME = "session";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "ADMISSIONS_OFFICER" | "BURSAR" | "ADMIN";
};

function sign(payload: string) {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

/** Builds a tamper-proof cookie value: base64url(payload).hmacSignature */
export function buildSessionCookie(user: SessionUser): string {
  const encoded = Buffer.from(JSON.stringify(user)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

function verify(value: string | undefined): SessionUser | null {
  if (!value) return null;
  const [encoded, sig] = value.split(".");
  if (!encoded || !sig || sign(encoded) !== sig) return null;
  try {
    return JSON.parse(Buffer.from(encoded, "base64url").toString());
  } catch {
    return null;
  }
}

/** Reads and verifies the current user's session from the request cookies. */
export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  return verify(store.get(SESSION_COOKIE_NAME)?.value);
}

/** Looks up a user by email for the demo login flow. Swap for real password/OAuth auth later. */
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
}
