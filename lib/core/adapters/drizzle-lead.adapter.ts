import { db } from "../../../db";
import { contacts, leadTimeline } from "../../../db/schema";
import { desc, eq, sql, and, or, ilike, gte, lte, count, avg } from "drizzle-orm";
import { LeadPort, type Lead, type LeadStatus, type LeadFilters, type LeadStats, type LeadTimelineEntry } from "../ports/lead.port";

export class DrizzleLeadAdapter extends LeadPort {

  async findAll(filters?: LeadFilters, limit = 50, offset = 0): Promise<Lead[]> {
    const conditions = this.buildConditions(filters);
    const query = conditions.length > 0
      ? db.select().from(contacts).where(and(...conditions))
      : db.select().from(contacts);

    return query.orderBy(desc(contacts.createdAt)).limit(limit).offset(offset) as unknown as Promise<Lead[]>;
  }

  async findById(id: number): Promise<Lead | null> {
    const [row] = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
    return (row as Lead) ?? null;
  }

  async updateStatus(id: number, status: LeadStatus, performedBy: string): Promise<Lead> {
    const extra: Record<string, unknown> = { status, updatedAt: new Date() };
    if (status === "contacted") extra.lastContactAt = new Date();
    if (status === "converted") extra.convertedAt = new Date();

    const [row] = await db.update(contacts).set(extra).where(eq(contacts.id, id)).returning();
    await this.addTimelineEntry({ leadId: id, action: `Status → ${status}`, detail: null, performedBy });
    return row as unknown as Lead;
  }

  async updateNotes(id: number, notes: string, performedBy: string): Promise<Lead> {
    const [row] = await db.update(contacts).set({ notes, updatedAt: new Date() }).where(eq(contacts.id, id)).returning();
    await this.addTimelineEntry({ leadId: id, action: "Notas atualizadas", detail: notes.slice(0, 100), performedBy });
    return row as unknown as Lead;
  }

  async updateScore(id: number, score: number): Promise<Lead> {
    const [row] = await db.update(contacts).set({ score, updatedAt: new Date() }).where(eq(contacts.id, id)).returning();
    return row as unknown as Lead;
  }

  async assign(id: number, assignedTo: string | null, performedBy: string): Promise<Lead> {
    const [row] = await db.update(contacts).set({ assignedTo, updatedAt: new Date() }).where(eq(contacts.id, id)).returning();
    await this.addTimelineEntry({ leadId: id, action: assignedTo ? `Atribuído a ${assignedTo}` : "Atribuição removida", detail: null, performedBy });
    return row as unknown as Lead;
  }

  async markLost(id: number, reason: string, performedBy: string): Promise<Lead> {
    const [row] = await db.update(contacts).set({
      status: "lost" as const,
      lostReason: reason,
      updatedAt: new Date(),
    }).where(eq(contacts.id, id)).returning();
    await this.addTimelineEntry({ leadId: id, action: "Marcado como perdido", detail: reason, performedBy });
    return row as unknown as Lead;
  }

  async getStats(): Promise<LeadStats> {
    const allStatuses: LeadStatus[] = ["new", "contacted", "qualified", "converted", "lost"];
    const byStatus = {} as Record<LeadStatus, number>;

    for (const s of allStatuses) {
      const [r] = await db.select({ count: count() }).from(contacts).where(eq(contacts.status, s));
      byStatus[s] = r?.count ?? 0;
    }

    const total = Object.values(byStatus).reduce((a, b) => a + b, 0);
    const conversionRate = total > 0 ? (byStatus.converted / total) * 100 : 0;

    const [thisWeekRow] = await db.select({ count: count() }).from(contacts)
      .where(gte(contacts.createdAt, sql`CURRENT_DATE - INTERVAL '7 days'`));

    const [lastWeekRow] = await db.select({ count: count() }).from(contacts)
      .where(and(
        gte(contacts.createdAt, sql`CURRENT_DATE - INTERVAL '14 days'`),
        lte(contacts.createdAt, sql`CURRENT_DATE - INTERVAL '7 days'`)
      ));

    return {
      total,
      byStatus,
      conversionRate: Math.round(conversionRate * 10) / 10,
      avgTimeToConvert: null,
      thisWeek: thisWeekRow?.count ?? 0,
      lastWeek: lastWeekRow?.count ?? 0,
    };
  }

  async getTimeline(leadId: number): Promise<LeadTimelineEntry[]> {
    return db.select().from(leadTimeline)
      .where(eq(leadTimeline.leadId, leadId))
      .orderBy(desc(leadTimeline.createdAt)) as unknown as Promise<LeadTimelineEntry[]>;
  }

  async addTimelineEntry(entry: Omit<LeadTimelineEntry, "id" | "createdAt">): Promise<void> {
    await db.insert(leadTimeline).values(entry);
  }

  async count(filters?: LeadFilters): Promise<number> {
    const conditions = this.buildConditions(filters);
    const query = conditions.length > 0
      ? db.select({ count: count() }).from(contacts).where(and(...conditions))
      : db.select({ count: count() }).from(contacts);
    const [r] = await query;
    return r?.count ?? 0;
  }

  private buildConditions(filters?: LeadFilters) {
    const conditions: ReturnType<typeof eq>[] = [];
    if (!filters) return conditions;

    if (filters.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      if (statuses.length === 1) {
        conditions.push(eq(contacts.status, statuses[0]));
      } else {
        conditions.push(or(...statuses.map(s => eq(contacts.status, s)))!);
      }
    }

    if (filters.search) {
      const term = `%${filters.search}%`;
      conditions.push(or(
        ilike(contacts.name, term),
        ilike(contacts.email, term),
        ilike(contacts.company, term),
      )!);
    }

    if (filters.dateFrom) conditions.push(gte(contacts.createdAt, filters.dateFrom));
    if (filters.dateTo) conditions.push(lte(contacts.createdAt, filters.dateTo));

    return conditions;
  }
}
