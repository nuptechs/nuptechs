/**
 * AnalyticsPort — Abstraction for page view analytics.
 */

export type AnalyticsOverview = {
  today: number;
  yesterday: number;
  thisWeek: number;
  lastWeek: number;
  thisMonth: number;
  total: number;
  trend: number; // percentage change week-over-week
};

export type PageStat = {
  path: string;
  views: number;
};

export type DailyStat = {
  date: string; // YYYY-MM-DD
  views: number;
};

export type ReferrerStat = {
  referrer: string;
  views: number;
};

export abstract class AnalyticsPort {
  abstract getOverview(): Promise<AnalyticsOverview>;
  abstract getTopPages(days: number, limit?: number): Promise<PageStat[]>;
  abstract getDailyViews(days: number): Promise<DailyStat[]>;
  abstract getTopReferrers(days: number, limit?: number): Promise<ReferrerStat[]>;
}
