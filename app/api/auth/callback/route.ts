import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCode, validateToken, createSession, fetchUserPermissions } from "../../../../lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    const desc = searchParams.get("error_description") || error;
    return NextResponse.redirect(
      new URL(`/admin?error=${encodeURIComponent(desc)}`, request.url)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/admin?error=missing_params", request.url));
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get("oidc_state")?.value;
  const codeVerifier = cookieStore.get("oidc_verifier")?.value;

  // Clean up PKCE cookies
  cookieStore.delete("oidc_state");
  cookieStore.delete("oidc_verifier");

  if (!savedState || !codeVerifier || state !== savedState) {
    return NextResponse.redirect(new URL("/admin?error=invalid_state", request.url));
  }

  try {
    const tokens = await exchangeCode(code, codeVerifier);
    const claims = await validateToken(tokens.access_token);

    if (!claims) {
      return NextResponse.redirect(new URL("/admin?error=invalid_token", request.url));
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

    return NextResponse.redirect(new URL("/admin", request.url));
  } catch (err) {
    console.error("Auth callback error:", err);
    return NextResponse.redirect(new URL("/admin?error=exchange_failed", request.url));
  }
}
