import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth/session";

/**
 * Next.js 16 renamed Middleware to Proxy (same functionality, new file
 * name/exports) — this is proxy.ts, not middleware.ts. See
 * node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md.
 *
 * This performs only the optimistic check described in the Next.js
 * auth guide: read the session from the cookie, redirect if missing.
 * It intentionally does not hit the (mock) database — the real
 * authorization check for role-gated content happens in the Data
 * Access Layer (src/lib/auth/dal.ts), close to the data.
 */
const protectedRoutes = ["/account"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  if (!isProtected) return NextResponse.next();

  const cookie = request.cookies.get("ndr_session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
