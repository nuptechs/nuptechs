/**
 * AuditPort — Abstraction for audit logging of admin actions.
 */

export type AuditAction =
  | "lead.status_changed"
  | "lead.notes_updated"
  | "lead.assigned"
  | "lead.scored"
  | "lead.lost"
  | "schedule.confirmed"
  | "schedule.completed"
  | "schedule.cancelled"
  | "schedule.no_show"
  | "settings.updated"
  | "admin.login"
  | "admin.logout"
  | "blog.created"
  | "blog.updated"
  | "blog.deleted"
  | "blog.published"
  | "whatsapp.connected"
  | "whatsapp.disconnected";

export type AuditEntry = {
  id: number;
  action: AuditAction;
  entityType: string;
  entityId: string;
  detail: Record<string, unknown> | null;
  performedBy: string;
  performedByName: string | null;
  ipAddress: string | null;
  createdAt: Date;
};

export type AuditFilters = {
  action?: AuditAction | AuditAction[];
  entityType?: string;
  entityId?: string;
  performedBy?: string;
  dateFrom?: Date;
  dateTo?: Date;
};

export abstract class AuditPort {
  abstract log(entry: Omit<AuditEntry, "id" | "createdAt">): Promise<void>;
  abstract findAll(filters?: AuditFilters, limit?: number, offset?: number): Promise<AuditEntry[]>;
  abstract findByEntity(entityType: string, entityId: string): Promise<AuditEntry[]>;
  abstract count(filters?: AuditFilters): Promise<number>;
}
