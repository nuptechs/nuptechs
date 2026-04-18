import { NextRequest, NextResponse } from "next/server";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || "";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "";
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || "nuptechs-comercial";

function normalizePhone(phone: string): string {
  let clean = phone.replace(/[^\d+]/g, "");
  if (!clean.startsWith("+") && !clean.startsWith("55") && clean.length <= 11) {
    clean = "55" + clean;
  }
  return clean.replace(/^\+/, "");
}

const cardMessage = `🟣 *Cartão Comercial — NuPtechs*

*Silkeny Ferreira*
Diretor Comercial

📱 WhatsApp: +55 (62) 98550-7649
📧 silkeny@nuptechs.com
🌐 nuptechs.com

_Engenharia de Software e Automação Empresarial — sistemas para toda complexidade._

👉 Salve o contato: https://www.nuptechs.com/comercial`;

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone || typeof phone !== "string" || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Número inválido" }, { status: 400 });
    }

    if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
      return NextResponse.json({ error: "WhatsApp não configurado" }, { status: 503 });
    }

    const url = `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: EVOLUTION_API_KEY,
      },
      body: JSON.stringify({
        number: normalizePhone(phone),
        text: cardMessage,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Falha ao enviar" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
