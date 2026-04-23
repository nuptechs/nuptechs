import { NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../../../../lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || "";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "";

// Generates (or refreshes) the pairing QR code for a specific instance.
export async function POST(_req: Request, { params }: { params: { name: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    return NextResponse.json({ error: "Evolution API não configurada" }, { status: 503 });
  }

  const instanceName = decodeURIComponent(params.name || "").trim();
  if (!instanceName) {
    return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${EVOLUTION_API_URL}/instance/connect/${encodeURIComponent(instanceName)}`,
      { headers: { apikey: EVOLUTION_API_KEY }, cache: "no-store" }
    );
    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json({ error: body || `HTTP ${res.status}` }, { status: 502 });
    }
    const data = (await res.json()) as {
      base64?: string;
      code?: string;
      pairingCode?: string;
    };
    return NextResponse.json({
      base64: data.base64 ?? null,
      code: data.code ?? null,
      pairingCode: data.pairingCode ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Erro de conexão" }, { status: 502 });
  }
}
