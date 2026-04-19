import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  exchangeCode,
  validateToken,
  createSessionToken,
  fetchUserPermissions,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_MAX_AGE,
} from "../../../../lib/auth";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    const desc = searchParams.get("error_description") || error;
    return NextResponse.redirect(
      new URL(`/admin?error=${encodeURIComponent(desc)}`, SITE_URL)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/admin?error=missing_params", SITE_URL));
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get("oidc_state")?.value;
  const codeVerifier = cookieStore.get("oidc_verifier")?.value;

  if (!savedState || !codeVerifier || state !== savedState) {
    console.error("OIDC state mismatch", { savedState: !!savedState, codeVerifier: !!codeVerifier, stateMatch: state === savedState });
    return NextResponse.redirect(new URL("/admin?error=invalid_state", SITE_URL));
  }

  try {
    const tokens = await exchangeCode(code, codeVerifier);
    const claims = await validateToken(tokens.access_token);

    if (!claims) {
      return NextResponse.redirect(new URL("/admin?error=invalid_token", SITE_URL));
    }

    const permissions = await fetchUserPermissions(tokens.access_token);

    const sessionJwt = await createSessionToken({
      accessToken: tokens.access_token,
      idToken: tokens.id_token,
      refreshToken: tokens.refresh_token,
      user: {
        sub: claims.sub as string,
        name: (claims as any).name,
        email: (claims as any).email,
        picture: (claims as any).picture,
      },
      permissions,
    });

    // Set ALL cookies on the redirect response object directly
    // (cookies() + NextResponse.redirect() may not merge Set-Cookie headers reliably)
    const response = NextResponse.redirect(new URL("/admin", SITE_URL));
    response.cookies.set(SESSION_COOKIE_NAME, sessionJwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_COOKIE_MAX_AGE,
    });
    response.cookies.delete("oidc_state");
    response.cookies.delete("oidc_verifier");
    return response;
  } catch (err) {
    console.error("Auth callback error:", err);
    return NextResponse.redirect(new URL("/admin?error=exchange_failed", SITE_URL));
  }
}
