-- ── Contratos SaaS ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS "contract_systems" (
  "id" serial PRIMARY KEY NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "name" text NOT NULL,
  "description" text,
  "is_active" boolean DEFAULT true NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "contract_systems_active_idx" ON "contract_systems" ("is_active");

CREATE TABLE IF NOT EXISTS "contracts" (
  "id" serial PRIMARY KEY NOT NULL,
  "public_token" text NOT NULL UNIQUE,
  "status" text DEFAULT 'draft' NOT NULL,

  "client_type" text DEFAULT 'pj' NOT NULL,
  "client_name" text NOT NULL,
  "client_fantasy_name" text,
  "client_document" text NOT NULL,
  "client_email" text,
  "client_phone" text,
  "client_address" text,
  "client_number" text,
  "client_complement" text,
  "client_neighborhood" text,
  "client_city" text,
  "client_state" text,
  "client_zip" text,

  "representative_name" text,
  "representative_rg" text,
  "representative_cpf" text,
  "representative_role" text,

  "systems" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "custom_system" text,

  "monthly_value_cents" integer NOT NULL,
  "payment_day" integer DEFAULT 10 NOT NULL,
  "loyalty_months" integer DEFAULT 12 NOT NULL,
  "early_termination_fee_months" integer DEFAULT 3 NOT NULL,
  "customization_deadline_days" integer DEFAULT 7 NOT NULL,

  "signed_at" timestamp,
  "start_date" timestamp,
  "loyalty_end_date" timestamp,

  "created_by" text NOT NULL,
  "created_by_name" text,
  "notes" text,
  "clauses_snapshot" jsonb,

  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "contracts_status_idx" ON "contracts" ("status");
CREATE INDEX IF NOT EXISTS "contracts_token_idx" ON "contracts" ("public_token");
CREATE INDEX IF NOT EXISTS "contracts_doc_idx" ON "contracts" ("client_document");
CREATE INDEX IF NOT EXISTS "contracts_created_by_idx" ON "contracts" ("created_by");

CREATE TABLE IF NOT EXISTS "contract_timeline" (
  "id" serial PRIMARY KEY NOT NULL,
  "contract_id" integer NOT NULL REFERENCES "contracts"("id") ON DELETE CASCADE,
  "action" text NOT NULL,
  "detail" text,
  "performed_by" text,
  "performed_by_name" text,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "contract_timeline_contract_idx" ON "contract_timeline" ("contract_id");

-- ── Seed do catálogo inicial de sistemas ──────────
INSERT INTO "contract_systems" ("slug", "name", "description", "sort_order")
VALUES
  ('barbearia', 'Sistema de Gestão para Barbearias e Salões de Beleza', 'Agenda, comissionamento, controle de comandas e fidelidade.', 1),
  ('sales', 'Sistema de Gestão de Vendas (Sales / Lojas)', 'PDV, estoque, vendedores, relatórios e integrações fiscais.', 2),
  ('igreja', 'Sistema de Gestão para Igrejas e Organizações Religiosas', 'Membros, dízimos, eventos, ministérios e comunicação.', 3),
  ('padaria', 'Sistema de Gestão para Padarias e Confeitarias', 'Produção, fichas técnicas, vendas balcão e controle de matéria-prima.', 4)
ON CONFLICT ("slug") DO NOTHING;
