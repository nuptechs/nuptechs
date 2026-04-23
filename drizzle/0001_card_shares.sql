CREATE TABLE IF NOT EXISTS "card_shares" (
  "id" serial PRIMARY KEY NOT NULL,
  "phone_hash" text NOT NULL,
  "phone_prefix" text,
  "message_ids" jsonb,
  "status" text DEFAULT 'pending' NOT NULL,
  "error_message" text,
  "ip_address" text,
  "user_agent" text,
  "country" text,
  "referrer" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "card_shares_phone_idx" ON "card_shares" ("phone_hash");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "card_shares_ip_idx" ON "card_shares" ("ip_address","created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "card_shares_created_idx" ON "card_shares" ("created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "card_shares_status_idx" ON "card_shares" ("status");
