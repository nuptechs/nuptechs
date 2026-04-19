import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  generateState,
  generateCodeVerifier,
  generateCodeChallenge,
  buildAuthorizeUrl,
  getCookieDomain,
} from "../../../../lib/auth";

export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const url = buildAuthorizeUrl(state, codeChallenge);

  // Store state and verifier in httpOnly cookie for callback validation
  const cookieStore = await cookies();
  const cookieDomain = getCookieDomain();
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
