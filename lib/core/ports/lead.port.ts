/**
 * LeadPort — Abstraction for lead/contact persistence and pipeline operations.
 * Business logic NEVER imports DB directly — only this port.
 */

export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

export type Lead = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  challenge: string;
  status: LeadStatus;
  notes: string | null;
  score: number | null;
  assignedTo: string | null;
  lastContactAt: Date | null;
  convertedAt: Date | null;
  lostReason: string | null;
  source: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type LeadFilters = {
  status?: LeadStatus | LeadStatus[];
  search?: string;
  assignedTo?: string | null;
  dateFrom?: Date;
  dateTo?: Date;
};

export type LeadStats = {
  total: number;
  byStatus: Record<LeadStatus, number>;
  conversionRate: number;
  avgTimeToConvert: number | null; // days
  thisWeek: number;
  lastWeek: number;
};

export type LeadTimelineEntry = {
  id: number;
  leadId: number;
  action: string;
  detail: string | null;
  performedBy: string;
  createdAt: Date;
};

export abstract class LeadPort {
  abstract findAll(filters?: LeadFilters, limit?: number, offset?: number): Promise<Lead[]>;
  abstract findById(id: number): Promise<Lead | null>;
  abstract updateStatus(id: number, status: LeadStatus, performedBy: string): Promise<Lead>;
  abstract updateNotes(id: number, notes: string, performedBy: string): Promise<Lead>;
  abstract updateScore(id: number, score: number): Promise<Lead>;
  abstract assign(id: number, assignedTo: string | null, performedBy: string): Promise<Lead>;
  abstract markLost(id: number, reason: string, performedBy: string): Promise<Lead>;
  abstract getStats(): Promise<LeadStats>;
  abstract getTimeline(leadId: number): Promise<LeadTimelineEntry[]>;
  abstract addTimelineEntry(entry: Omit<LeadTimelineEntry, "id" | "createdAt">): Promise<void>;
  abstract count(filters?: LeadFilters): Promise<number>;
}
