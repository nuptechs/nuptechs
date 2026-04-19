import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const COOKIE_NAME = "nuptechs_session";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || process.env.NUPIDENTITY_CLIENT_SECRET || "nuptechs-fallback-secret-change-me"
);

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Canonical redirect: nuptechs.com → www.nuptechs.com
  if (host === "nuptechs.com") {
    const target = new URL(request.nextUrl.pathname + request.nextUrl.search, "https://www.nuptechs.com");
    return NextResponse.redirect(target, 308);
  }

  const { pathname } = request.nextUrl;

  // Only protect /admin routes (not auth API routes)
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const allCookieNames = request.cookies.getAll().map(c => c.name);

  console.error(`[MW] path=${pathname} hasCookie=${!!token} tokenLen=${token?.length || 0} allCookies=[${allCookieNames.join(',')}] host=${host} secretLen=${SECRET.byteLength}`);

  if (!token) {
    console.error(`[MW] NO SESSION COOKIE → redirect to login`);
    return NextResponse.redirect(new URL("/api/auth/login", SITE_URL));
  }

  try {
    const { payload } = await jose.jwtVerify(token, SECRET);
    console.error(`[MW] JWT OK sub=${(payload as any)?.user?.sub} exp=${payload.exp}`);
    return NextResponse.next();
  } catch (err: any) {
    console.error(`[MW] JWT VERIFY FAILED: ${err.code || err.message || err}`);
    // Invalid or expired session — redirect to login
    const response = NextResponse.redirect(new URL("/api/auth/login", SITE_URL));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|ico|woff|woff2)).*)"],
};
