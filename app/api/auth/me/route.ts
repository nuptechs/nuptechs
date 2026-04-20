import { NextResponse } from "next/server";
import { getSession } from "../../../../lib/auth";
import { isSessionInvalidated } from "../../../../lib/session-invalidation";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Check if NuPIdentify notified us that this user's permissions changed
  // after the current session cookie was issued.
  if (isSessionInvalidated(session.user.sub, session.iat ?? 0)) {
    return NextResponse.json(
      { authenticated: false, reason: "permissions_changed" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: session.user,
    permissions: session.permissions || [],
  });
}
