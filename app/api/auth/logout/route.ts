import { NextResponse } from "next/server";
import { getSession, destroySession, buildLogoutUrl } from "../../../../lib/auth";

export async function GET() {
  const session = await getSession();
  const logoutUrl = buildLogoutUrl(session?.idToken);
  await destroySession();
  return NextResponse.redirect(logoutUrl);
}
