import { db } from "../../../db";
import { pageViews } from "../../../db/schema";
import { sql, desc, count } from "drizzle-orm";
import { AnalyticsPort, type AnalyticsOverview, type PageStat, type DailyStat, type ReferrerStat } from "../ports/analytics.port";

export class DrizzleAnalyticsAdapter extends AnalyticsPort {

  async getOverview(): Promise<AnalyticsOverview> {
    const [todayR] = await db.select({ count: count() }).from(pageViews)
      .where(sql`${pageViews.createdAt} >= CURRENT_DATE`);

    const [yesterdayR] = await db.select({ count: count() }).from(pageViews)
      .where(sql`${pageViews.createdAt} >= CURRENT_DATE - INTERVAL '1 day' AND ${pageViews.createdAt} < CURRENT_DATE`);

    const [thisWeekR] = await db.select({ count: count() }).from(pageViews)
      .where(sql`${pageViews.createdAt} >= CURRENT_DATE - INTERVAL '7 days'`);

    const [lastWeekR] = await db.select({ count: count() }).from(pageViews)
      .where(sql`${pageViews.createdAt} >= CURRENT_DATE - INTERVAL '14 days' AND ${pageViews.createdAt} < CURRENT_DATE - INTERVAL '7 days'`);

    const [thisMonthR] = await db.select({ count: count() }).from(pageViews)
      .where(sql`${pageViews.createdAt} >= CURRENT_DATE - INTERVAL '30 days'`);

    const [totalR] = await db.select({ count: count() }).from(pageViews);

    const thisWeek = thisWeekR?.count ?? 0;
    const lastWeek = lastWeekR?.count ?? 0;
    const trend = lastWeek > 0 ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : 0;

    return {
      today: todayR?.count ?? 0,
      yesterday: yesterdayR?.count ?? 0,
      thisWeek,
      lastWeek,
      thisMonth: thisMonthR?.count ?? 0,
      total: totalR?.count ?? 0,
      trend,
    };
  }

  async getTopPages(days: number, limit = 10): Promise<PageStat[]> {
    return db
      .select({ path: pageViews.path, views: count() })
      .from(pageViews)
      .where(sql`${pageViews.createdAt} >= CURRENT_DATE - INTERVAL '${sql.raw(String(days))} days'`)
      .groupBy(pageViews.path)
      .orderBy(desc(count()))
      .limit(limit) as unknown as Promise<PageStat[]>;
  }

  async getDailyViews(days: number): Promise<DailyStat[]> {
    const rows = await db.execute(sql`
      SELECT DATE(${pageViews.createdAt})::text AS date, COUNT(*)::int AS views
      FROM page_views
      WHERE ${pageViews.createdAt} >= CURRENT_DATE - INTERVAL '${sql.raw(String(days))} days'
      GROUP BY DATE(${pageViews.createdAt})
      ORDER BY date ASC
    `);
    return (Array.isArray(rows) ? rows : (rows as { rows?: unknown[] }).rows ?? []) as unknown as DailyStat[];
  }

  async getTopReferrers(days: number, limit = 10): Promise<ReferrerStat[]> {
    return db
      .select({ referrer: pageViews.referrer, views: count() })
      .from(pageViews)
      .where(sql`${pageViews.createdAt} >= CURRENT_DATE - INTERVAL '${sql.raw(String(days))} days' AND ${pageViews.referrer} IS NOT NULL AND ${pageViews.referrer} != ''`)
      .groupBy(pageViews.referrer)
      .orderBy(desc(count()))
      .limit(limit) as unknown as Promise<ReferrerStat[]>;
  }
}
