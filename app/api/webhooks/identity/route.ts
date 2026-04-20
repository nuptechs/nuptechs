import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { flagUserSession } from "../../../../lib/session-invalidation";

const WEBHOOK_SECRET = process.env.NUPIDENTITY_WEBHOOK_SECRET;

/**
 * Verifies the HMAC-SHA256 signature sent by NuPIdentify.
 * Signature format: sha256=HEX
 * Signed content: "${timestamp}.${rawBody}"
 */
function verifySignature(signature: string, timestamp: string, rawBody: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.error("[WEBHOOK] NUPIDENTITY_WEBHOOK_SECRET not set — rejecting request");
    return false;
  }
  try {
    const expected = `sha256=${crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(`${timestamp}.${rawBody}`)
      .digest("hex")}`;
    // Constant-time comparison to prevent timing attacks
    if (signature.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-nupidentity-signature") ?? "";
  const timestamp = request.headers.get("x-nupidentity-timestamp") ?? "";
  const eventType = request.headers.get("x-nupidentity-event") ?? "";
  const deliveryId = request.headers.get("x-nupidentity-delivery") ?? "unknown";

  const rawBody = await request.text();

  // Replay protection: reject requests older than 5 minutes
  const ts = parseInt(timestamp, 10);
  if (!ts || Math.abs(Date.now() / 1000 - ts) > 300) {
    console.error(`[WEBHOOK] Rejected stale delivery ${deliveryId} ts=${timestamp}`);
    return NextResponse.json({ error: "Stale request" }, { status: 400 });
  }

  if (!verifySignature(signature, timestamp, rawBody)) {
    console.error(`[WEBHOOK] Invalid signature for delivery ${deliveryId}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: { event: string; data: Record<string, unknown> };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { data } = payload;
  const userId = data?.userId as string | undefined;

  console.error(`[WEBHOOK] event=${eventType} delivery=${deliveryId} userId=${userId ?? "—"}`);

  switch (eventType) {
    // Profile assigned/revoked to a specific user → permissions changed
    case "user.profile.assigned":
    case "user.profile.revoked":
    // Explicit revocation (e.g. admin kicked via permission-revocation.service)
    case "permissions.revoked":
      if (userId) {
        flagUserSession(userId);
        console.error(`[WEBHOOK] session flagged for userId=${userId} event=${eventType}`);
      }
      break;

    // Profile functions changed → affects ALL users with that profile.
    // We can't enumerate those users without a DB call to NuPIdentify, so
    // this case is handled server-side in NuPIdentify's profile revocation flow
    // which chains into user-level `user.profile.revoked` events.
    case "profile.functions.bulk_updated":
      console.error(`[WEBHOOK] profile.functions.bulk_updated received — user-level events expected separately`);
      break;

    default:
      // Unknown events are acknowledged but ignored
      break;
  }

  return NextResponse.json({ ok: true });
}
