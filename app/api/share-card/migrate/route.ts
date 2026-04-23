import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "../../../../db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// One-shot migration endpoint for the card_shares table.
// Idempotent (CREATE TABLE IF NOT EXISTS). Guarded by EVOLUTION_WEBHOOK_TOKEN
// so only the operator that already holds that secret can trigger it.
// Safe to hit multiple times; safe to leave deployed.
export async function POST(req: NextRequest) {
  const expected = process.env.EVOLUTION_WEBHOOK_TOKEN || "";
  const provided =
    req.headers.get("x-webhook-token") ||
    req.nextUrl.searchParams.get("token") ||
    "";

  if (!expected || provided !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS card_shares (
        id serial PRIMARY KEY NOT NULL,
        phone_hash text NOT NULL,
        phone_prefix text,
        message_ids jsonb DEFAULT '[]'::jsonb NOT NULL,
        status text DEFAULT 'pending' NOT NULL,
        error_message text,
        ip_address text,
        user_agent text,
        country text,
        referrer text,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS card_shares_phone_idx ON card_shares (phone_hash)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS card_shares_ip_idx ON card_shares (ip_address, created_at)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS card_shares_created_idx ON card_shares (created_at)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS card_shares_status_idx ON card_shares (status)`);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS app_config (
        key text PRIMARY KEY NOT NULL,
        value text NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL,
        updated_by text
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS card_templates (
        id serial PRIMARY KEY NOT NULL,
        name text NOT NULL,
        caption text DEFAULT '' NOT NULL,
        include_contact boolean DEFAULT true NOT NULL,
        is_active boolean DEFAULT false NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL,
        created_by text
      )
    `);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS card_templates_active_idx ON card_templates (is_active)`);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS card_template_media (
        id serial PRIMARY KEY NOT NULL,
        template_id integer NOT NULL REFERENCES card_templates(id) ON DELETE CASCADE,
        position integer DEFAULT 0 NOT NULL,
        file_name text NOT NULL,
        mime_type text NOT NULL,
        size_bytes integer NOT NULL,
        bytes bytea NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS card_template_media_template_idx ON card_template_media (template_id, position)`);

    // Additive migration: per-template vCard contact fields (nullable → falls
    // back to legacy defaults in share-card when unset).
    await db.execute(sql`ALTER TABLE card_templates ADD COLUMN IF NOT EXISTS contact_name text`);
    await db.execute(sql`ALTER TABLE card_templates ADD COLUMN IF NOT EXISTS contact_phone text`);
    await db.execute(sql`ALTER TABLE card_templates ADD COLUMN IF NOT EXISTS contact_email text`);
    await db.execute(sql`ALTER TABLE card_templates ADD COLUMN IF NOT EXISTS contact_org text`);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
