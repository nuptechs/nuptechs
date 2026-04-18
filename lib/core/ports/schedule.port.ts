/**
 * SchedulePort — Abstraction for scheduling/meeting persistence.
 */

export type ScheduleStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";

export type Schedule = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  tool: string;
  timeslot: string | null;
  summary: string | null;
  status: ScheduleStatus;
  meetingUrl: string | null;
  confirmedAt: Date | null;
  completedAt: Date | null;
  cancelReason: string | null;
  createdAt: Date;
};

export type ScheduleFilters = {
  status?: ScheduleStatus | ScheduleStatus[];
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
};

export type ScheduleStats = {
  total: number;
  byStatus: Record<ScheduleStatus, number>;
  completionRate: number;
  noShowRate: number;
  thisWeek: number;
};

export abstract class SchedulePort {
  abstract findAll(filters?: ScheduleFilters, limit?: number, offset?: number): Promise<Schedule[]>;
  abstract findById(id: number): Promise<Schedule | null>;
  abstract updateStatus(id: number, status: ScheduleStatus): Promise<Schedule>;
  abstract confirm(id: number, meetingUrl?: string): Promise<Schedule>;
  abstract complete(id: number, summary?: string): Promise<Schedule>;
  abstract cancel(id: number, reason?: string): Promise<Schedule>;
  abstract markNoShow(id: number): Promise<Schedule>;
  abstract getStats(): Promise<ScheduleStats>;
  abstract count(filters?: ScheduleFilters): Promise<number>;
}
