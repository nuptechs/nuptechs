import { NextRequest, NextResponse } from "next/server";
import { getSession, hasPermission } from "../../../../../lib/auth";
import {
  getActiveShareInstance,
  setActiveShareInstance,
} from "../../../../../lib/share-card-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || "";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "";

type RawInstance = {
  name?: string;
  instanceName?: string;
  connectionStatus?: string;
  status?: string;
  ownerJid?: string | null;
  number?: string | null;
  profileName?: string | null;
  profilePicUrl?: string | null;
};

type NormalizedInstance = {
  instanceName: string;
  status: string;
  ownerJid: string | null;
  number: string | null;
  profileName: string | null;
  profilePicUrl: string | null;
  isActive: boolean;
};

function normalize(raw: RawInstance, activeName: string): NormalizedInstance {
  const instanceName = raw.instanceName || raw.name || "";
  const owner = raw.ownerJid ?? null;
  const derivedNumber = owner ? owner.replace(/@s\.whatsapp\.net$/, "") : raw.number ?? null;
  return {
    instanceName,
    status: raw.connectionStatus || raw.status || "unknown",
    ownerJid: owner,
    number: derivedNumber,
    profileName: raw.profileName ?? null,
    profilePicUrl: raw.profilePicUrl ?? null,
    isActive: instanceName === activeName,
  };
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    return NextResponse.json({ error: "Evolution API não configurada" }, { status: 503 });
  }

  const activeName = await getActiveShareInstance();

  try {
    const res = await fetch(`${EVOLUTION_API_URL}/instance/fetchInstances`, {
      headers: { apikey: EVOLUTION_API_KEY },
      cache: "no-store",
    });
    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: body || `HTTP ${res.status}` },
        { status: 502 }
      );
    }
    const raw = (await res.json()) as RawInstance[] | { instance: RawInstance }[];
    const list: RawInstance[] = Array.isArray(raw)
      ? raw.map((r) => ("instance" in r ? (r as { instance: RawInstance }).instance : (r as RawInstance)))
      : [];
    const instances = list
      .map((r) => normalize(r, activeName))
      .filter((i) => i.instanceName)
      .sort((a, b) => a.instanceName.localeCompare(b.instanceName));

    return NextResponse.json({ active: activeName, instances });
  } catch {
    return NextResponse.json({ error: "Erro de conexão" }, { status: 502 });
  }
}

// Set the active instance used by /api/share-card
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = (await req.json().catch(() => ({}))) as { instanceName?: string };
  const instanceName = (body.instanceName || "").trim();
  if (!instanceName) {
    return NextResponse.json({ error: "instanceName é obrigatório" }, { status: 400 });
  }

  await setActiveShareInstance(instanceName, session.user.sub);
  return NextResponse.json({ ok: true, active: instanceName });
}
