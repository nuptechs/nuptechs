/**
 * Container — DI factory for all ports.
 * Adapter selection is automatic (Drizzle for all in this project).
 * If you ever need to swap (e.g., tests with in-memory), change here only.
 */

import { DrizzleLeadAdapter } from "./adapters/drizzle-lead.adapter";
import { DrizzleScheduleAdapter } from "./adapters/drizzle-schedule.adapter";
import { DrizzleAuditAdapter } from "./adapters/drizzle-audit.adapter";
import { DrizzleAnalyticsAdapter } from "./adapters/drizzle-analytics.adapter";
import { DrizzleSettingsAdapter } from "./adapters/drizzle-settings.adapter";
import { DrizzleBlogAdapter } from "./adapters/drizzle-blog.adapter";
import type { LeadPort } from "./ports/lead.port";
import type { SchedulePort } from "./ports/schedule.port";
import type { AuditPort } from "./ports/audit.port";
import type { AnalyticsPort } from "./ports/analytics.port";
import type { SettingsPort } from "./ports/settings.port";
import type { BlogPort } from "./ports/blog.port";

export type Container = {
  leads: LeadPort;
  schedules: SchedulePort;
  audit: AuditPort;
  analytics: AnalyticsPort;
  settings: SettingsPort;
  blog: BlogPort;
};

let _container: Container | null = null;

export function getContainer(): Container {
  if (!_container) {
    _container = Object.freeze({
      leads: new DrizzleLeadAdapter(),
      schedules: new DrizzleScheduleAdapter(),
      audit: new DrizzleAuditAdapter(),
      analytics: new DrizzleAnalyticsAdapter(),
      settings: new DrizzleSettingsAdapter(),
      blog: new DrizzleBlogAdapter(),
    });
  }
  return _container;
}

export function resetContainer(): void {
  _container = null;
}
