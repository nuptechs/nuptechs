import { NextResponse } from "next/server";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || "";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "";
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || "nuptechs-comercial";

export async function GET() {
  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    return NextResponse.json(
      { error: "Evolution API não configurada" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(
      `${EVOLUTION_API_URL}/instance/fetchInstances?instanceName=${EVOLUTION_INSTANCE}`,
      { headers: { apikey: EVOLUTION_API_KEY }, cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Falha ao consultar instância" },
        { status: 502 }
      );
    }

    const instances = await res.json();
    const instance = Array.isArray(instances) ? instances[0] : instances;

    return NextResponse.json({
      instanceName: instance?.instance?.instanceName ?? EVOLUTION_INSTANCE,
      status: instance?.instance?.status ?? "unknown",
      ownerJid: instance?.instance?.ownerJid ?? null,
      number: instance?.instance?.number ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Erro de conexão" }, { status: 502 });
  }
}
