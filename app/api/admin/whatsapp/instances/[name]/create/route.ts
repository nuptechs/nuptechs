import { NextRequest, NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../../../../lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || "";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "";
const WEBHOOK_URL = process.env.EVOLUTION_WEBHOOK_URL || "";
const WEBHOOK_TOKEN = process.env.EVOLUTION_WEBHOOK_TOKEN || "";

function buildWebhookUrl(): string | undefined {
  if (!WEBHOOK_URL || !WEBHOOK_TOKEN) return undefined;
  const sep = WEBHOOK_URL.includes("?") ? "&" : "?";
  return `${WEBHOOK_URL}${sep}token=${encodeURIComponent(WEBHOOK_TOKEN)}`;
}

// Creates a new Evolution Baileys instance. Idempotent from the UI's
// perspective: if the name already exists, Evolution returns 403/409 and we
// surface the upstream message.
export async function POST(req: NextRequest, { params }: { params: { name: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    return NextResponse.json({ error: "Evolution API não configurada" }, { status: 503 });
  }

  const instanceName = decodeURIComponent(params.name || "").trim();
  if (!instanceName || !/^[a-z0-9-]+$/i.test(instanceName)) {
    return NextResponse.json(
      { error: "Nome inválido (use letras, números e hífen)" },
      { status: 400 }
    );
  }

  const webhookUrl = buildWebhookUrl();
  const payload: Record<string, unknown> = {
    instanceName,
    integration: "WHATSAPP-BAILEYS",
    qrcode: true,
  };
  if (webhookUrl) {
    payload.webhook = {
      url: webhookUrl,
      events: ["CONNECTION_UPDATE", "QRCODE_UPDATED"],
    };
  }

  try {
    const res = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: EVOLUTION_API_KEY },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json({ error: text || `HTTP ${res.status}` }, { status: 502 });
    }
    const data = text ? (JSON.parse(text) as unknown) : {};
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ error: "Erro de conexão" }, { status: 502 });
  }
}
