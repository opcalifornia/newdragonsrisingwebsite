import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { UserRole } from "./mock-db";

/**
 * SESSION_SECRET must be set in production — this fallback exists only
 * so `npm run dev`/`npm run build` work in this environment without an
 * .env file. Generate a real one with `openssl rand -base64 32` and set
 * it before deploying.
 */
const secretKey = process.env.SESSION_SECRET ?? "dev-only-insecure-secret-do-not-use-in-production";
const encodedKey = new TextEncoder().encode(secretKey);

const SESSION_COOKIE = "ndr_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export type SessionPayload = {
  userId: string;
  role: UserRole;
  name: string;
  expiresAt: string;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = "",
): Promise<SessionPayload | null> {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession(
  data: Omit<SessionPayload, "expiresAt">,
) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await encrypt({ ...data, expiresAt: expiresAt.toISOString() });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
