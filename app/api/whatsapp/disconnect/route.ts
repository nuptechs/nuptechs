import { NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../lib/auth";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || "";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "";
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || "nuptechs-comercial";

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    return NextResponse.json(
      { error: "Evolution API não configurada" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(
      `${EVOLUTION_API_URL}/instance/logout/${EVOLUTION_INSTANCE}`,
      {
        method: "DELETE",
        headers: { apikey: EVOLUTION_API_KEY },
      }
    );

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: body || `HTTP ${res.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro de conexão" }, { status: 502 });
  }
}
