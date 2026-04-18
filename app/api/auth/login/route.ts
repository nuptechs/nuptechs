import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  generateState,
  generateCodeVerifier,
  generateCodeChallenge,
  buildAuthorizeUrl,
} from "../../../../lib/auth";

export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const url = buildAuthorizeUrl(state, codeChallenge);

  // Store state and verifier in httpOnly cookie for callback validation
  const cookieStore = await cookies();
  cookieStore.set("oidc_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600, // 10 min
  });
  cookieStore.set("oidc_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return NextResponse.redirect(url);
}
