import { NextResponse } from "next/server";
import { getOptionalSession } from "@/lib/auth/dal";

/**
 * Deliberately tiny and cache-disabled: the header calls this
 * client-side on mount to decide between "Log In" and "My Account"
 * without forcing every static page to render dynamically (a top-level
 * cookies() read in the root layout would do that — see the "Auth and
 * streaming" note in the Next.js authentication guide).
 */
export async function GET() {
  const session = await getOptionalSession();
  return NextResponse.json(
    { authenticated: Boolean(session?.userId) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
