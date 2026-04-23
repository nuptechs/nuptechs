import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "../../../../db";
import { cardShares } from "../../../../db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEBHOOK_TOKEN = process.env.EVOLUTION_WEBHOOK_TOKEN || "";

// Maps Evolution `messages.update` status strings to our enum
function mapStatus(evStatus: string | undefined): "sent" | "delivered" | "read" | "failed" | null {
  if (!evStatus) return null;
  const s = evStatus.toUpperCase();
  if (s === "DELIVERY_ACK" || s === "DELIVERED") return "delivered";
  if (s === "READ" || s === "PLAYED") return "read";
  if (s === "SERVER_ACK" || s === "SENT") return "sent";
  if (s === "ERROR" || s === "FAILED") return "failed";
  return null;
}

export async function POST(req: NextRequest) {
  // Lightweight shared-secret auth (Evolution supports custom headers / query)
  if (WEBHOOK_TOKEN) {
    const provided =
      req.headers.get("x-webhook-token") ||
      req.nextUrl.searchParams.get("token") ||
      "";
    if (provided !== WEBHOOK_TOKEN) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const body = payload as {
    event?: string;
    data?: {
      key?: { id?: string };
      keyId?: string;
      status?: string;
      update?: { status?: string };
    };
  };

  const event = body.event;
  if (event && !/messages?[._-]?update/i.test(event)) {
    return NextResponse.json({ ignored: true });
  }

  const messageId = body.data?.key?.id ?? body.data?.keyId;
  const rawStatus = body.data?.status ?? body.data?.update?.status;
  const mapped = mapStatus(rawStatus);
  if (!messageId || !mapped) {
    return NextResponse.json({ ignored: true });
  }

  // Update only rows whose message_ids JSONB array contains this id
  // AND only upgrade status (pending < sent < delivered < read; failed is terminal)
  await db.execute(sql`
    UPDATE ${cardShares}
    SET status = ${mapped},
        updated_at = now()
    WHERE ${cardShares.messageIds}::jsonb @> ${JSON.stringify([messageId])}::jsonb
      AND (
        (${mapped} = 'read' AND ${cardShares.status} IN ('pending','sent','delivered'))
        OR (${mapped} = 'delivered' AND ${cardShares.status} IN ('pending','sent'))
        OR (${mapped} = 'sent' AND ${cardShares.status} = 'pending')
        OR (${mapped} = 'failed' AND ${cardShares.status} <> 'read')
      )
  `);

  return NextResponse.json({ ok: true });
}
