import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession, hasPermission } from "../../../../lib/auth";
import { getContainer } from "../../../../lib/core/container";
import type { ContractStatus } from "../../../../lib/core/ports/contract.port";
import { isValidCnpj, isValidCpf, onlyDigits } from "../../../../lib/contracts/cnpj";

const CreateSchema = z.object({
  clientType: z.enum(["pj", "pf"]),
  clientName: z.string().min(2),
  clientFantasyName: z.string().optional().nullable(),
  clientDocument: z.string().min(11),
  clientEmail: z.string().email().optional().nullable(),
  clientPhone: z.string().optional().nullable(),
  clientAddress: z.string().optional().nullable(),
  clientNumber: z.string().optional().nullable(),
  clientComplement: z.string().optional().nullable(),
  clientNeighborhood: z.string().optional().nullable(),
  clientCity: z.string().optional().nullable(),
  clientState: z.string().length(2).optional().nullable(),
  clientZip: z.string().optional().nullable(),

  representativeName: z.string().optional().nullable(),
  representativeRg: z.string().optional().nullable(),
  representativeCpf: z.string().optional().nullable(),
  representativeRole: z.string().optional().nullable(),

  systems: z.array(z.string()).default([]),
  customSystem: z.string().optional().nullable(),

  monthlyValueCents: z.number().int().nonnegative(),
  paymentDay: z.number().int().min(1).max(28).default(10),
  loyaltyMonths: z.number().int().min(1).max(60).default(12),
  earlyTerminationFeeMonths: z.number().int().min(0).max(12).default(3),
  customizationDeadlineDays: z.number().int().min(1).max(60).default(7),

  notes: z.string().optional().nullable(),
});

// ─── GET /api/admin/contracts — lista ─────────────────────────────
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:content"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = request.nextUrl;
  const statusParam = searchParams.get("status");
  const status = statusParam && statusParam !== "all" ? (statusParam as ContractStatus) : undefined;
  const search = searchParams.get("search") || undefined;
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const offset = parseInt(searchParams.get("offset") || "0");

  const { contracts } = getContainer();
  const [items, total, stats] = await Promise.all([
    contracts.findAll({ status, search }, limit, offset),
    contracts.count({ status, search }),
    contracts.getStats(),
  ]);

  return NextResponse.json({ items, total, stats });
}

// ─── POST /api/admin/contracts — cria ─────────────────────────────
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:content"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;
  // Normaliza documento e valida
  const doc = onlyDigits(data.clientDocument);
  if (data.clientType === "pj" && !isValidCnpj(doc)) {
    return NextResponse.json({ error: "CNPJ inválido" }, { status: 400 });
  }
  if (data.clientType === "pf" && !isValidCpf(doc)) {
    return NextResponse.json({ error: "CPF inválido" }, { status: 400 });
  }
  if (data.systems.length === 0 && !data.customSystem) {
    return NextResponse.json(
      { error: "Selecione ao menos um sistema" },
      { status: 400 }
    );
  }

  const { contracts } = getContainer();
  const created = await contracts.create({
    ...data,
    clientDocument: doc,
    clientFantasyName: data.clientFantasyName ?? null,
    clientEmail: data.clientEmail ?? null,
    clientPhone: data.clientPhone ?? null,
    clientAddress: data.clientAddress ?? null,
    clientNumber: data.clientNumber ?? null,
    clientComplement: data.clientComplement ?? null,
    clientNeighborhood: data.clientNeighborhood ?? null,
    clientCity: data.clientCity ?? null,
    clientState: data.clientState ?? null,
    clientZip: data.clientZip ? onlyDigits(data.clientZip) : null,
    representativeName: data.representativeName ?? null,
    representativeRg: data.representativeRg ?? null,
    representativeCpf: data.representativeCpf
      ? onlyDigits(data.representativeCpf)
      : null,
    representativeRole: data.representativeRole ?? null,
    customSystem: data.customSystem ?? null,
    notes: data.notes ?? null,
    createdBy: session.user.sub,
    createdByName: session.user.name ?? session.user.email ?? null,
  });

  return NextResponse.json(created, { status: 201 });
}
