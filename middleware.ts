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

  // Rotas protegidas por NuPIdentify (login obrigatório): admin + docs + dashboard de arquitetura.
  const PROTECTED_PREFIXES = ["/admin", "/admin-assets", "/docs", "/downloads", "/arquitetura"];
  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (!isProtected) {
    return NextResponse.next();
  }

  // Volta para a página originalmente pedida após o login.
  const loginUrl = (): URL => {
    const u = new URL("/api/auth/login", SITE_URL);
    u.searchParams.set("returnTo", pathname + request.nextUrl.search);
    return u;
  };

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(loginUrl());
  }

  try {
    await jose.jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch {
    // Invalid or expired session — redirect to login (preservando returnTo)
    const response = NextResponse.redirect(loginUrl());
    response.cookies.delete(COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|padaria|salao|sales|igreja|.*\\.(?:png|jpg|jpeg|webp|svg|ico|woff|woff2)).*)"],
};
