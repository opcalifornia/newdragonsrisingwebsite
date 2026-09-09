import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { decrypt, getSessionCookie, type SessionPayload } from "./session";
import { findUserById } from "./mock-db";

/**
 * Optimistic check — reads the session from the cookie only, does not
 * redirect. Use for conditional UI (e.g. "Login" vs "Account" in the
 * header) where a missing session is a normal, expected state.
 */
export const getOptionalSession = cache(
  async (): Promise<SessionPayload | null> => {
    const cookie = await getSessionCookie();
    return decrypt(cookie);
  },
);

/**
 * Secure check — redirects to /login if there is no valid session. Use
 * in Server Components, Server Actions, and Route Handlers that require
 * an authenticated user.
 */
export const verifySession = cache(async (): Promise<SessionPayload> => {
  const session = await getOptionalSession();
  if (!session?.userId) {
    redirect("/login");
  }
  return session;
});

export const getUser = cache(async () => {
  const session = await getOptionalSession();
  if (!session?.userId) return null;
  const user = await findUserById(session.userId);
  if (!user) return null;
  // Data Transfer Object: never return the password hash to a component.
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
});
