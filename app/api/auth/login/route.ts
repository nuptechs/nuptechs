import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  generateState,
  generateCodeVerifier,
  generateCodeChallenge,
  buildAuthorizeUrl,
  getCookieDomain,
} from "../../../../lib/auth";

/** Só aceita caminhos internos (anti open-redirect). */
function safeReturnTo(raw: string | null): string | null {
  if (!raw) return null;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) return null;
  return raw;
}

export async function GET(request: NextRequest) {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const url = buildAuthorizeUrl(state, codeChallenge);

  // Store state and verifier in httpOnly cookie for callback validation
  const cookieStore = await cookies();
  const cookieDomain = getCookieDomain();

  const returnTo = safeReturnTo(request.nextUrl.searchParams.get("returnTo"));
  if (returnTo) {
    cookieStore.set("oidc_return", returnTo, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600,
      ...(cookieDomain && { domain: cookieDomain }),
    });
  }
  cookieStore.set("oidc_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600, // 10 min
    ...(cookieDomain && { domain: cookieDomain }),
  });
  cookieStore.set("oidc_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
    ...(cookieDomain && { domain: cookieDomain }),
  });

  return NextResponse.redirect(url);
}
