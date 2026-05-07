import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession, hasPermission } from "../../../../../lib/auth";
import { getContainer } from "../../../../../lib/core/container";
import type { ContractStatus } from "../../../../../lib/core/ports/contract.port";

const UpdateSchema = z.object({
  clientName: z.string().optional(),
  clientFantasyName: z.string().optional().nullable(),
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
  systems: z.array(z.string()).optional(),
  customSystem: z.string().optional().nullable(),
  monthlyValueCents: z.number().int().nonnegative().optional(),
  paymentDay: z.number().int().min(1).max(28).optional(),
  loyaltyMonths: z.number().int().min(1).max(60).optional(),
  earlyTerminationFeeMonths: z.number().int().min(0).max(12).optional(),
  customizationDeadlineDays: z.number().int().min(1).max(60).optional(),
  notes: z.string().optional().nullable(),
  status: z
    .enum(["draft", "sent", "signed", "active", "cancelled", "expired"])
    .optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:content"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const idNum = parseInt(id, 10);
  if (isNaN(idNum)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const { contracts } = getContainer();
  const [contract, timeline] = await Promise.all([
    contracts.findById(idNum),
    contracts.getTimeline(idNum),
  ]);
  if (!contract) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

  return NextResponse.json({ contract, timeline });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:content"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const idNum = parseInt(id, 10);
  if (isNaN(idNum)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { contracts } = getContainer();
  const updated = await contracts.update(
    idNum,
    parsed.data as any,
    session.user.sub,
    session.user.name ?? null
  );

  // Se mudou status, registra explicitamente
  if (parsed.data.status) {
    await contracts.updateStatus(
      idNum,
      parsed.data.status as ContractStatus,
      session.user.sub,
      session.user.name ?? null
    );
  }

  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.permissions, "nuptechs:admin"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const idNum = parseInt(id, 10);
  if (isNaN(idNum)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const { contracts } = getContainer();
  await contracts.delete(idNum);
  return NextResponse.json({ ok: true });
}
