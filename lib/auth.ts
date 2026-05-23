import { cookies } from "next/headers";
import * as jose from "jose";

const ISSUER_URL = process.env.NUPIDENTITY_ISSUER_URL || "https://identify.nuptechs.com";
const CLIENT_ID = process.env.NUPIDENTITY_CLIENT_ID || "nuptechs_admin_6Y9B9prfVis";
const CLIENT_SECRET = process.env.NUPIDENTITY_CLIENT_SECRET!;

const JWKS_URI = `${ISSUER_URL}/api/oidc/jwks`;
const AUTHORIZE_URL = `${ISSUER_URL}/api/oidc/authorize`;
const TOKEN_URL = `${ISSUER_URL}/api/oidc/token`;
const USERINFO_URL = `${ISSUER_URL}/api/oidc/userinfo`;
const LOGOUT_URL = `${ISSUER_URL}/api/oidc/logout`;

const COOKIE_NAME = "nuptechs_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

let jwks: ReturnType<typeof jose.createRemoteJWKSet> | null = null;

function getJWKS() {
  if (!jwks) {
    jwks = jose.createRemoteJWKSet(new URL(JWKS_URI));
  }
  return jwks;
}

// PKCE helpers
export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64url(array);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64url(new Uint8Array(digest));
}

function base64url(bytes: Uint8Array): string {
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function generateState(): string {
  return generateCodeVerifier();
}

export function getCallbackUrl(): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${base}/api/auth/callback`;
}

export function buildAuthorizeUrl(state: string, codeChallenge: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: getCallbackUrl(),
    scope: "openid profile email permissions",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });
  return `${AUTHORIZE_URL}?${params}`;
}

export async function exchangeCode(code: string, codeVerifier: string) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: getCallbackUrl(),
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code_verifier: codeVerifier,
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token exchange failed: ${err}`);
  }

  return res.json() as Promise<{
    access_token: string;
    id_token: string;
    refresh_token?: string;
    expires_in: number;
    token_type: string;
  }>;
}

export async function validateToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, getJWKS(), {
      issuer: ISSUER_URL,
      audience: CLIENT_ID,
    });
    return payload as jose.JWTPayload & {
      sub: string;
      name?: string;
      email?: string;
      picture?: string;
    };
  } catch {
    // Fallback to userinfo endpoint
    const res = await fetch(USERINFO_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
  }
}

export function buildLogoutUrl(idToken?: string): string {
  const params = new URLSearchParams({
    post_logout_redirect_uri: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    client_id: CLIENT_ID,
  });
  if (idToken) params.set("id_token_hint", idToken);
  return `${LOGOUT_URL}?${params}`;
}

// Session management via encrypted cookie
const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || process.env.NUPIDENTITY_CLIENT_SECRET || "nuptechs-fallback-secret-change-me"
);

export async function fetchUserPermissions(accessToken: string): Promise<string[]> {
  try {
    const res = await fetch(USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return [];
    const info = await res.json();
    return Array.isArray(info.permissions) ? info.permissions : [];
  } catch {
    return [];
  }
}

export async function createSessionToken(data: {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  user: { sub: string; name?: string; email?: string; picture?: string };
  permissions?: string[];
}): Promise<string> {
  // Only store essential user data + permissions in the cookie JWT.
  // Full OIDC tokens (accessToken, idToken, refreshToken) are intentionally
  // excluded to keep the cookie under the browser's ~4096 byte limit.
  return await new jose.SignJWT({
    user: data.user,
    permissions: data.permissions || [],
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export { COOKIE_NAME as SESSION_COOKIE_NAME, COOKIE_MAX_AGE as SESSION_COOKIE_MAX_AGE };

/**
 * Returns cookie domain for production so cookies work across
 * both nuptechs.com and www.nuptechs.com.
 */
export function getCookieDomain(): string | undefined {
  const url = process.env.NEXT_PUBLIC_SITE_URL || '';
  if (url.includes('nuptechs.com')) return '.nuptechs.com';
  return undefined;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jose.jwtVerify(token, SECRET);
    return payload as unknown as {
      user: { sub: string; name?: string; email?: string; picture?: string };
      permissions: string[];
      iat: number; // seconds since epoch — used for invalidation check
    };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  const cookieDomain = getCookieDomain();
  cookieStore.delete({
    name: COOKIE_NAME,
    path: "/",
    ...(cookieDomain && { domain: cookieDomain }),
  });
}

// ─── Permission definitions ────────────────────────────
// These match function keys defined in NuPIdentity for the nuptechs system.
// nuptechs:admin   → Full access (settings, whatsapp, audit, downloads)
// nuptechs:content → Content management (leads, schedules, blog, analytics)
// nuptechs:viewer  → Read-only (dashboard, analytics)
// nuptechs:infra   → View NuPtechs infrastructure presentation (Infra NuPtechs page)

export type NuptechsPermission =
  | "nuptechs:admin"
  | "nuptechs:content"
  | "nuptechs:viewer"
  | "nuptechs:infra";

export function hasPermission(
  sessionPermissions: string[],
  required: NuptechsPermission | NuptechsPermission[],
): boolean {
  const perms = sessionPermissions || [];
  // admin has implicit access to everything
  if (perms.includes("nuptechs:admin")) return true;
  const needed = Array.isArray(required) ? required : [required];
  return needed.some((p) => perms.includes(p));
}

export function getIdentityConsoleUrl(): string {
  return `${ISSUER_URL}/console`;
}
