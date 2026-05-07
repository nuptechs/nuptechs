import { db } from "../../../db";
import {
  contracts,
  contractSystems,
  contractTimeline,
} from "../../../db/schema";
import {
  desc,
  eq,
  sql,
  and,
  or,
  ilike,
  gte,
  lte,
  count,
  inArray,
} from "drizzle-orm";
import {
  ContractPort,
  type Contract,
  type ContractCreateInput,
  type ContractFilters,
  type ContractStats,
  type ContractStatus,
  type ContractSystem,
  type ContractTimelineEntry,
} from "../ports/contract.port";

function generateToken(): string {
  // 32 chars: 16 bytes hex
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export class DrizzleContractAdapter extends ContractPort {
  // ─── Queries ──────────────────────────────────────────
  async findAll(
    filters?: ContractFilters,
    limit = 50,
    offset = 0
  ): Promise<Contract[]> {
    const conditions = this.buildConditions(filters);
    const query =
      conditions.length > 0
        ? db.select().from(contracts).where(and(...conditions))
        : db.select().from(contracts);

    const rows = await query
      .orderBy(desc(contracts.createdAt))
      .limit(limit)
      .offset(offset);
    return rows as unknown as Contract[];
  }

  async count(filters?: ContractFilters): Promise<number> {
    const conditions = this.buildConditions(filters);
    const query =
      conditions.length > 0
        ? db.select({ c: count() }).from(contracts).where(and(...conditions))
        : db.select({ c: count() }).from(contracts);
    const [row] = await query;
    return row?.c ?? 0;
  }

  async findById(id: number): Promise<Contract | null> {
    const [row] = await db
      .select()
      .from(contracts)
      .where(eq(contracts.id, id))
      .limit(1);
    return (row as unknown as Contract) ?? null;
  }

  async findByToken(token: string): Promise<Contract | null> {
    const [row] = await db
      .select()
      .from(contracts)
      .where(eq(contracts.publicToken, token))
      .limit(1);
    return (row as unknown as Contract) ?? null;
  }

  // ─── Mutations ────────────────────────────────────────
  async create(input: ContractCreateInput): Promise<Contract> {
    const publicToken = generateToken();
    const [row] = await db
      .insert(contracts)
      .values({
        publicToken,
        status: input.status ?? "draft",
        clientType: input.clientType,
        clientName: input.clientName,
        clientFantasyName: input.clientFantasyName,
        clientDocument: input.clientDocument,
        clientEmail: input.clientEmail,
        clientPhone: input.clientPhone,
        clientAddress: input.clientAddress,
        clientNumber: input.clientNumber,
        clientComplement: input.clientComplement,
        clientNeighborhood: input.clientNeighborhood,
        clientCity: input.clientCity,
        clientState: input.clientState,
        clientZip: input.clientZip,
        representativeName: input.representativeName,
        representativeRg: input.representativeRg,
        representativeCpf: input.representativeCpf,
        representativeRole: input.representativeRole,
        systems: input.systems,
        customSystem: input.customSystem,
        monthlyValueCents: input.monthlyValueCents,
        paymentDay: input.paymentDay,
        loyaltyMonths: input.loyaltyMonths,
        earlyTerminationFeeMonths: input.earlyTerminationFeeMonths,
        customizationDeadlineDays: input.customizationDeadlineDays,
        startDate: input.startDate ?? null,
        createdBy: input.createdBy,
        createdByName: input.createdByName,
        notes: input.notes,
      })
      .returning();
    const contract = row as unknown as Contract;
    await this.addTimelineEntry({
      contractId: contract.id,
      action: "created",
      detail: `Contrato criado para ${contract.clientName}`,
      performedBy: contract.createdBy,
      performedByName: contract.createdByName,
    });
    return contract;
  }

  async update(
    id: number,
    patch: Partial<ContractCreateInput> & { status?: ContractStatus },
    performedBy: string,
    performedByName?: string | null
  ): Promise<Contract> {
    const [row] = await db
      .update(contracts)
      .set({
        ...patch,
        updatedAt: new Date(),
      })
      .where(eq(contracts.id, id))
      .returning();
    await this.addTimelineEntry({
      contractId: id,
      action: "updated",
      detail: "Contrato atualizado",
      performedBy,
      performedByName,
    });
    return row as unknown as Contract;
  }

  async updateStatus(
    id: number,
    status: ContractStatus,
    performedBy: string,
    performedByName?: string | null
  ): Promise<Contract> {
    const extra: Record<string, unknown> = {
      status,
      updatedAt: new Date(),
    };
    if (status === "signed") {
      extra.signedAt = new Date();
      const startDate = new Date();
      extra.startDate = startDate;
      const loyaltyEndDate = new Date(startDate);
      // se o contrato existente tem loyaltyMonths, usamos; senão default 12
      const existing = await this.findById(id);
      const months = existing?.loyaltyMonths ?? 12;
      loyaltyEndDate.setMonth(loyaltyEndDate.getMonth() + months);
      extra.loyaltyEndDate = loyaltyEndDate;
    }
    const [row] = await db
      .update(contracts)
      .set(extra)
      .where(eq(contracts.id, id))
      .returning();
    await this.addTimelineEntry({
      contractId: id,
      action: `status_${status}`,
      detail: `Status alterado para ${status}`,
      performedBy,
      performedByName,
    });
    return row as unknown as Contract;
  }

  async delete(id: number): Promise<void> {
    await db.delete(contracts).where(eq(contracts.id, id));
  }

  // ─── Stats ────────────────────────────────────────────
  async getStats(): Promise<ContractStats> {
    const all = await db
      .select({
        status: contracts.status,
        c: count(),
        sum: sql<number>`COALESCE(SUM(${contracts.monthlyValueCents}), 0)`,
      })
      .from(contracts)
      .groupBy(contracts.status);

    const byStatus: Record<ContractStatus, number> = {
      draft: 0,
      sent: 0,
      signed: 0,
      active: 0,
      cancelled: 0,
      expired: 0,
    };
    let total = 0;
    let totalMonthlyRevenueCents = 0;
    for (const row of all) {
      const s = row.status as ContractStatus;
      byStatus[s] = Number(row.c);
      total += Number(row.c);
      if (s === "active" || s === "signed") {
        totalMonthlyRevenueCents += Number(row.sum);
      }
    }
    const startMonth = new Date();
    startMonth.setDate(1);
    startMonth.setHours(0, 0, 0, 0);
    const [{ c: thisMonth }] = await db
      .select({ c: count() })
      .from(contracts)
      .where(gte(contracts.createdAt, startMonth));

    return {
      total,
      byStatus,
      totalMonthlyRevenueCents,
      thisMonth: Number(thisMonth),
    };
  }

  // ─── Catálogo de sistemas ─────────────────────────────
  async listSystems(activeOnly = true): Promise<ContractSystem[]> {
    const query = activeOnly
      ? db
          .select()
          .from(contractSystems)
          .where(eq(contractSystems.isActive, true))
      : db.select().from(contractSystems);
    const rows = await query.orderBy(contractSystems.sortOrder);
    return rows as unknown as ContractSystem[];
  }

  // ─── Timeline ─────────────────────────────────────────
  async getTimeline(contractId: number): Promise<ContractTimelineEntry[]> {
    const rows = await db
      .select()
      .from(contractTimeline)
      .where(eq(contractTimeline.contractId, contractId))
      .orderBy(desc(contractTimeline.createdAt));
    return rows as unknown as ContractTimelineEntry[];
  }

  async addTimelineEntry(entry: {
    contractId: number;
    action: string;
    detail?: string | null;
    performedBy?: string | null;
    performedByName?: string | null;
    metadata?: unknown;
  }): Promise<void> {
    await db.insert(contractTimeline).values({
      contractId: entry.contractId,
      action: entry.action,
      detail: entry.detail ?? null,
      performedBy: entry.performedBy ?? null,
      performedByName: entry.performedByName ?? null,
      metadata: entry.metadata ?? null,
    });
  }

  // ─── Helpers ──────────────────────────────────────────
  private buildConditions(filters?: ContractFilters) {
    const conditions: any[] = [];
    if (!filters) return conditions;

    if (filters.status) {
      if (Array.isArray(filters.status)) {
        if (filters.status.length > 0) {
          conditions.push(inArray(contracts.status, filters.status));
        }
      } else {
        conditions.push(eq(contracts.status, filters.status));
      }
    }
    if (filters.createdBy) {
      conditions.push(eq(contracts.createdBy, filters.createdBy));
    }
    if (filters.search) {
      const term = `%${filters.search}%`;
      const searchCond = or(
        ilike(contracts.clientName, term),
        ilike(contracts.clientFantasyName, term),
        ilike(contracts.clientDocument, term),
        ilike(contracts.clientEmail, term)
      );
      if (searchCond) conditions.push(searchCond);
    }
    if (filters.dateFrom) conditions.push(gte(contracts.createdAt, filters.dateFrom));
    if (filters.dateTo) conditions.push(lte(contracts.createdAt, filters.dateTo));
    return conditions;
  }
}
