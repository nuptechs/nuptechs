import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { and, count, eq, gte } from "drizzle-orm";
import { db } from "../../../db";
import { cardShares } from "../../../db/schema";
import { getActiveShareInstance } from "../../../lib/share-card-config";
import { getActiveCardTemplate, type ActiveTemplate } from "../../../lib/card-templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || "";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "";
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET || "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nuptechs.com";

const LIMIT_PER_MINUTE = 3;
const LIMIT_PER_DAY = 10;
const PHONE_COOLDOWN_MS = 60 * 60 * 1000; // 1h

const DEFAULT_CAPTION = `🟣 *Cartão Comercial — NuPtechs*

*Silkeny Ferreira*
Diretor Comercial

📱 +55 (62) 98550-7649
📧 silkeny@nuptechs.com
🌐 ${SITE_URL}/comercial

_Engenharia de Software e Automação Empresarial._`;

const DEFAULT_MEDIA = [
  {
    url: `${SITE_URL}/comercial/cartao_diretor_comercial.png`,
    mimeType: "image/png",
    fileName: "cartao-silkeny-nuptechs.png",
  },
];

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function normalizePhone(raw: string): { e164Digits: string; prefix: string } | null {
  const trimmed = raw.trim();
  const clean = trimmed.replace(/\D/g, "");
  if (clean.length < 10 || clean.length > 15) return null;
  let digits = clean;
  if (!trimmed.startsWith("+") && digits.length <= 11) {
    digits = "55" + digits;
  }
  if (digits.length < 12 || digits.length > 15) return null;
  const prefix = digits.slice(0, Math.min(3, digits.length));
  return { e164Digits: digits, prefix };
}

function hashPhone(digits: string): string {
  return createHash("sha256").update(digits).digest("hex");
}

async function verifyTurnstile(token: string | null, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true; // disabled when secret not set
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}

async function checkRateLimit(
  ip: string,
  phoneHash: string
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const now = new Date();
  const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const cooldownAgo = new Date(now.getTime() - PHONE_COOLDOWN_MS);

  const [minuteRow] = await db
    .select({ n: count() })
    .from(cardShares)
    .where(and(eq(cardShares.ipAddress, ip), gte(cardShares.createdAt, oneMinuteAgo)));
  if ((minuteRow?.n ?? 0) >= LIMIT_PER_MINUTE) {
    return { ok: false, status: 429, message: "Muitas solicitações. Tente novamente em 1 minuto." };
  }

  const [dayRow] = await db
    .select({ n: count() })
    .from(cardShares)
    .where(and(eq(cardShares.ipAddress, ip), gte(cardShares.createdAt, oneDayAgo)));
  if ((dayRow?.n ?? 0) >= LIMIT_PER_DAY) {
    return { ok: false, status: 429, message: "Limite diário atingido." };
  }

  const [phoneRow] = await db
    .select({ n: count() })
    .from(cardShares)
    .where(and(eq(cardShares.phoneHash, phoneHash), gte(cardShares.createdAt, cooldownAgo)));
  if ((phoneRow?.n ?? 0) >= 1) {
    return { ok: false, status: 429, message: "Este número já recebeu o cartão recentemente." };
  }

  return { ok: true };
}

type EvolutionSendResult = { ok: boolean; id?: string; error?: string };

async function evolutionConnectionState(instance: string): Promise<"open" | "connecting" | "close" | "unknown"> {
  try {
    const res = await fetch(
      `${EVOLUTION_API_URL}/instance/connectionState/${instance}`,
      {
        headers: { apikey: EVOLUTION_API_KEY },
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!res.ok) return "unknown";
    const data = (await res.json()) as { instance?: { state?: string } };
    const state = data.instance?.state;
    if (state === "open" || state === "connecting" || state === "close") return state;
    return "unknown";
  } catch {
    return "unknown";
  }
}

async function evolutionFetch(path: string, body: unknown): Promise<EvolutionSendResult> {
  try {
    const res = await fetch(`${EVOLUTION_API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: EVOLUTION_API_KEY },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => ({}))) as {
      key?: { id?: string };
      message?: string;
    };
    if (!res.ok) return { ok: false, error: data.message || `HTTP ${res.status}` };
    return { ok: true, id: data.key?.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "network error" };
  }
}

async function sendCard(
  numberDigits: string,
  instance: string,
  template: ActiveTemplate | null
): Promise<{
  ok: boolean;
  messageIds: string[];
  error?: string;
}> {
  const messageIds: string[] = [];

  const includeContact = template ? template.includeContact : true;
  const caption = template && template.caption.trim() ? template.caption : DEFAULT_CAPTION;
  const mediaList =
    template && template.media.length > 0
      ? template.media.map((m) => ({
          url: `${SITE_URL}/api/card-media/${m.id}`,
          mimeType: m.mimeType,
          fileName: m.fileName,
        }))
      : DEFAULT_MEDIA;

  let anySuccess = false;
  let firstError: string | undefined;

  if (includeContact) {
    const contactRes = await evolutionFetch(`/message/sendContact/${instance}`, {
      number: numberDigits,
      contact: [
        {
          fullName: "Silkeny Ferreira",
          wuid: "5562985507649",
          phoneNumber: "+55 62 98550-7649",
          organization: "NuPtechs",
          email: "silkeny@nuptechs.com",
          url: `${SITE_URL}/comercial`,
        },
      ],
    });
    if (contactRes.ok) {
      anySuccess = true;
      if (contactRes.id) messageIds.push(contactRes.id);
    } else {
      firstError ??= contactRes.error;
    }
  }

  for (let i = 0; i < mediaList.length; i++) {
    const m = mediaList[i]!;
    // Only attach the caption to the first image (WhatsApp convention).
    const mediaRes = await evolutionFetch(`/message/sendMedia/${instance}`, {
      number: numberDigits,
      mediatype: "image",
      mimetype: m.mimeType,
      media: m.url,
      caption: i === 0 ? caption : "",
      fileName: m.fileName,
    });
    if (mediaRes.ok) {
      anySuccess = true;
      if (mediaRes.id) messageIds.push(mediaRes.id);
    } else {
      firstError ??= mediaRes.error;
    }
  }

  if (!anySuccess) {
    return { ok: false, messageIds, error: firstError || "falha no envio" };
  }

  return { ok: true, messageIds };
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const userAgent = req.headers.get("user-agent") ?? null;
  const referrer = req.headers.get("referer") ?? null;
  const country = req.headers.get("x-vercel-ip-country") ?? null;

  let phone = "";
  let turnstileToken: string | null = null;
  try {
    const body = (await req.json()) as { phone?: string; turnstileToken?: string };
    phone = typeof body.phone === "string" ? body.phone : "";
    turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : null;
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const normalized = normalizePhone(phone);
  if (!normalized) {
    return NextResponse.json({ error: "Número inválido" }, { status: 400 });
  }

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: "Verificação anti-bot falhou" }, { status: 403 });
  }

  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    return NextResponse.json({ error: "WhatsApp não configurado" }, { status: 503 });
  }

  const activeInstance = await getActiveShareInstance();

  const connState = await evolutionConnectionState(activeInstance);
  if (connState !== "open") {
    return NextResponse.json(
      { error: "WhatsApp temporariamente indisponível. Tente novamente em instantes." },
      { status: 503 }
    );
  }

  const phoneHash = hashPhone(normalized.e164Digits);

  const rl = await checkRateLimit(ip, phoneHash).catch(() => ({ ok: true as const }));
  if (!rl.ok) {
    return NextResponse.json({ error: rl.message }, { status: rl.status });
  }

  const [pending] = await db
    .insert(cardShares)
    .values({
      phoneHash,
      phonePrefix: normalized.prefix,
      status: "pending",
      ipAddress: ip,
      userAgent,
      country,
      referrer,
    })
    .returning({ id: cardShares.id });

  const activeTemplate = await getActiveCardTemplate();
  const send = await sendCard(normalized.e164Digits, activeInstance, activeTemplate);

  if (pending) {
    await db
      .update(cardShares)
      .set({
        status: send.ok ? "sent" : "failed",
        messageIds: send.messageIds,
        errorMessage: send.error ?? null,
        updatedAt: new Date(),
      })
      .where(eq(cardShares.id, pending.id));
  }

  if (!send.ok) {
    return NextResponse.json({ error: send.error || "Falha ao enviar" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
