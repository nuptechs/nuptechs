import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCode, validateToken, createSession, fetchUserPermissions } from "../../../../lib/auth";

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

  // Clean up PKCE cookies
  cookieStore.delete("oidc_state");
  cookieStore.delete("oidc_verifier");

  if (!savedState || !codeVerifier || state !== savedState) {
    return NextResponse.redirect(new URL("/admin?error=invalid_state", SITE_URL));
  }

  try {
    const tokens = await exchangeCode(code, codeVerifier);
    const claims = await validateToken(tokens.access_token);

    if (!claims) {
      return NextResponse.redirect(new URL("/admin?error=invalid_token", SITE_URL));
    }

    const permissions = await fetchUserPermissions(tokens.access_token);

    await createSession({
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

    return NextResponse.redirect(new URL("/admin", SITE_URL));
  } catch (err) {
    console.error("Auth callback error:", err);
    return NextResponse.redirect(new URL("/admin?error=exchange_failed", SITE_URL));
  }
}
