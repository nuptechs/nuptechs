import { db } from "../../../db";
import { auditLog } from "../../../db/schema";
import { desc, eq, and, or, gte, lte, count } from "drizzle-orm";
import { AuditPort, type AuditEntry, type AuditAction, type AuditFilters } from "../ports/audit.port";

export class DrizzleAuditAdapter extends AuditPort {

  async log(entry: Omit<AuditEntry, "id" | "createdAt">): Promise<void> {
    await db.insert(auditLog).values({
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId,
      detail: entry.detail,
      performedBy: entry.performedBy,
      performedByName: entry.performedByName,
      ipAddress: entry.ipAddress,
    });
  }

  async findAll(filters?: AuditFilters, limit = 50, offset = 0): Promise<AuditEntry[]> {
    const conditions = this.buildConditions(filters);
    const query = conditions.length > 0
      ? db.select().from(auditLog).where(and(...conditions))
      : db.select().from(auditLog);
    return query.orderBy(desc(auditLog.createdAt)).limit(limit).offset(offset) as unknown as Promise<AuditEntry[]>;
  }

  async findByEntity(entityType: string, entityId: string): Promise<AuditEntry[]> {
    return db.select().from(auditLog)
      .where(and(eq(auditLog.entityType, entityType), eq(auditLog.entityId, entityId)))
      .orderBy(desc(auditLog.createdAt)) as unknown as Promise<AuditEntry[]>;
  }

  async count(filters?: AuditFilters): Promise<number> {
    const conditions = this.buildConditions(filters);
    const query = conditions.length > 0
      ? db.select({ count: count() }).from(auditLog).where(and(...conditions))
      : db.select({ count: count() }).from(auditLog);
    const [r] = await query;
    return r?.count ?? 0;
  }

  private buildConditions(filters?: AuditFilters) {
    const conditions: ReturnType<typeof eq>[] = [];
    if (!filters) return conditions;

    if (filters.action) {
      const actions = Array.isArray(filters.action) ? filters.action : [filters.action];
      if (actions.length === 1) {
        conditions.push(eq(auditLog.action, actions[0]));
      } else {
        conditions.push(or(...actions.map(a => eq(auditLog.action, a)))!);
      }
    }

    if (filters.entityType) conditions.push(eq(auditLog.entityType, filters.entityType));
    if (filters.entityId) conditions.push(eq(auditLog.entityId, filters.entityId));
    if (filters.performedBy) conditions.push(eq(auditLog.performedBy, filters.performedBy));
    if (filters.dateFrom) conditions.push(gte(auditLog.createdAt, filters.dateFrom));
    if (filters.dateTo) conditions.push(lte(auditLog.createdAt, filters.dateTo));

    return conditions;
  }
}
