import { db } from "../../../db";
import { schedules } from "../../../db/schema";
import { desc, eq, sql, and, or, ilike, gte, lte, count } from "drizzle-orm";
import { SchedulePort, type Schedule, type ScheduleStatus, type ScheduleFilters, type ScheduleStats } from "../ports/schedule.port";

export class DrizzleScheduleAdapter extends SchedulePort {

  async findAll(filters?: ScheduleFilters, limit = 50, offset = 0): Promise<Schedule[]> {
    const conditions = this.buildConditions(filters);
    const query = conditions.length > 0
      ? db.select().from(schedules).where(and(...conditions))
      : db.select().from(schedules);
    return query.orderBy(desc(schedules.createdAt)).limit(limit).offset(offset) as unknown as Promise<Schedule[]>;
  }

  async findById(id: number): Promise<Schedule | null> {
    const [row] = await db.select().from(schedules).where(eq(schedules.id, id)).limit(1);
    return (row as unknown as Schedule) ?? null;
  }

  async updateStatus(id: number, status: ScheduleStatus): Promise<Schedule> {
    const [row] = await db.update(schedules).set({ status }).where(eq(schedules.id, id)).returning();
    return row as unknown as Schedule;
  }

  async confirm(id: number, meetingUrl?: string): Promise<Schedule> {
    const [row] = await db.update(schedules).set({
      status: "confirmed" as const,
      confirmedAt: new Date(),
      ...(meetingUrl && { meetingUrl }),
    }).where(eq(schedules.id, id)).returning();
    return row as unknown as Schedule;
  }

  async complete(id: number, summary?: string): Promise<Schedule> {
    const [row] = await db.update(schedules).set({
      status: "completed" as const,
      completedAt: new Date(),
      ...(summary && { summary }),
    }).where(eq(schedules.id, id)).returning();
    return row as unknown as Schedule;
  }

  async cancel(id: number, reason?: string): Promise<Schedule> {
    const [row] = await db.update(schedules).set({
      status: "cancelled" as const,
      ...(reason && { cancelReason: reason }),
    }).where(eq(schedules.id, id)).returning();
    return row as unknown as Schedule;
  }

  async markNoShow(id: number): Promise<Schedule> {
    const [row] = await db.update(schedules).set({
      status: "no_show" as const,
    }).where(eq(schedules.id, id)).returning();
    return row as unknown as Schedule;
  }

  async getStats(): Promise<ScheduleStats> {
    const allStatuses: ScheduleStatus[] = ["pending", "confirmed", "completed", "cancelled", "no_show"];
    const byStatus = {} as Record<ScheduleStatus, number>;

    for (const s of allStatuses) {
      const [r] = await db.select({ count: count() }).from(schedules).where(eq(schedules.status, s));
      byStatus[s] = r?.count ?? 0;
    }

    const total = Object.values(byStatus).reduce((a, b) => a + b, 0);
    const completed = byStatus.completed ?? 0;
    const noShow = byStatus.no_show ?? 0;
    const finalized = completed + noShow + (byStatus.cancelled ?? 0);

    const [thisWeekRow] = await db.select({ count: count() }).from(schedules)
      .where(gte(schedules.createdAt, sql`CURRENT_DATE - INTERVAL '7 days'`));

    return {
      total,
      byStatus,
      completionRate: finalized > 0 ? Math.round((completed / finalized) * 100) : 0,
      noShowRate: finalized > 0 ? Math.round((noShow / finalized) * 100) : 0,
      thisWeek: thisWeekRow?.count ?? 0,
    };
  }

  async count(filters?: ScheduleFilters): Promise<number> {
    const conditions = this.buildConditions(filters);
    const query = conditions.length > 0
      ? db.select({ count: count() }).from(schedules).where(and(...conditions))
      : db.select({ count: count() }).from(schedules);
    const [r] = await query;
    return r?.count ?? 0;
  }

  private buildConditions(filters?: ScheduleFilters) {
    const conditions: ReturnType<typeof eq>[] = [];
    if (!filters) return conditions;

    if (filters.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      if (statuses.length === 1) {
        conditions.push(eq(schedules.status, statuses[0]));
      } else {
        conditions.push(or(...statuses.map(s => eq(schedules.status, s)))!);
      }
    }

    if (filters.search) {
      const term = `%${filters.search}%`;
      conditions.push(or(
        ilike(schedules.name, term),
        ilike(schedules.email, term),
      )!);
    }

    if (filters.dateFrom) conditions.push(gte(schedules.createdAt, filters.dateFrom));
    if (filters.dateTo) conditions.push(lte(schedules.createdAt, filters.dateTo));

    return conditions;
  }
}
