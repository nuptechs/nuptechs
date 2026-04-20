import { NextResponse } from "next/server";
import { destroySession, buildLogoutUrl } from "../../../../lib/auth";

export async function GET() {
  const logoutUrl = buildLogoutUrl();
  await destroySession();
  return NextResponse.redirect(logoutUrl);
}
