// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // TODO: replace with a real Better Auth session/role check.
    // Until then, /admin is reachable by anyone who finds the URL —
    // fine for local dev, not fine if this gets deployed publicly.
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
