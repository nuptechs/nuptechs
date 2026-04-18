import { db } from "../../../db";
import { blogPosts, pageViews } from "../../../db/schema";
import { desc, eq, sql, and, or, ilike, count } from "drizzle-orm";
import {
  BlogPort,
  type BlogPost,
  type BlogPostStatus,
  type BlogFilters,
  type BlogStats,
  type BlogContentHealth,
} from "../ports/blog.port";

export class DrizzleBlogAdapter extends BlogPort {

  async syncFromSource(posts: Array<{
    slug: string;
    title: string;
    tag: string;
    description: string;
    publishedAt: string;
    sectionCount: number;
    wordCount: number;
    hasMindMap: boolean;
    hasMnemonic: boolean;
    hasCallouts: boolean;
    relatedCount: number;
  }>): Promise<number> {
    let synced = 0;
    for (const p of posts) {
      const existing = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, p.slug))
        .limit(1);

      if (existing.length > 0) {
        await db.update(blogPosts).set({
          title: p.title,
          tag: p.tag,
          seoDescription: existing[0].seoDescription ?? p.description,
          sectionCount: p.sectionCount,
          wordCount: p.wordCount,
          hasMindMap: p.hasMindMap,
          hasMnemonic: p.hasMnemonic,
          hasCallouts: p.hasCallouts,
          relatedCount: p.relatedCount,
          lastSyncedAt: new Date(),
          updatedAt: new Date(),
        }).where(eq(blogPosts.slug, p.slug));
      } else {
        await db.insert(blogPosts).values({
          slug: p.slug,
          title: p.title,
          tag: p.tag,
          status: "published",
          seoDescription: p.description,
          publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
          sectionCount: p.sectionCount,
          wordCount: p.wordCount,
          hasMindMap: p.hasMindMap,
          hasMnemonic: p.hasMnemonic,
          hasCallouts: p.hasCallouts,
          relatedCount: p.relatedCount,
          lastSyncedAt: new Date(),
        });
      }
      synced++;
    }
    return synced;
  }

  async findAll(filters?: BlogFilters, limit = 50, offset = 0): Promise<BlogPost[]> {
    const conditions = this.buildConditions(filters);
    const query = conditions.length > 0
      ? db.select().from(blogPosts).where(and(...conditions))
      : db.select().from(blogPosts);

    const rows = await query.orderBy(desc(blogPosts.publishedAt)).limit(limit).offset(offset);

    // Enrich with view counts from pageViews
    const enriched: BlogPost[] = [];
    for (const row of rows) {
      const [viewRow] = await db
        .select({ views: count() })
        .from(pageViews)
        .where(eq(pageViews.path, `/blog/${row.slug}`));
      enriched.push({ ...(row as unknown as BlogPost), views: viewRow?.views ?? 0 });
    }
    return enriched;
  }

  async findBySlug(slug: string): Promise<BlogPost | null> {
    const [row] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (!row) return null;

    const [viewRow] = await db
      .select({ views: count() })
      .from(pageViews)
      .where(eq(pageViews.path, `/blog/${slug}`));

    return { ...(row as unknown as BlogPost), views: viewRow?.views ?? 0 };
  }

  async updateStatus(slug: string, status: BlogPostStatus): Promise<BlogPost> {
    const extra: Record<string, unknown> = { status, updatedAt: new Date() };
    if (status === "published") extra.publishedAt = new Date();

    const [row] = await db
      .update(blogPosts)
      .set(extra)
      .where(eq(blogPosts.slug, slug))
      .returning();
    return row as unknown as BlogPost;
  }

  async updateMeta(slug: string, meta: { seoTitle?: string; seoDescription?: string; featuredImage?: string }): Promise<BlogPost> {
    const [row] = await db
      .update(blogPosts)
      .set({ ...meta, updatedAt: new Date() })
      .where(eq(blogPosts.slug, slug))
      .returning();
    return row as unknown as BlogPost;
  }

  async getStats(): Promise<BlogStats> {
    const statuses = ["published", "draft", "scheduled", "archived"] as const;
    const byStatus: Record<string, number> = {};

    for (const s of statuses) {
      const [r] = await db.select({ count: count() }).from(blogPosts).where(eq(blogPosts.status, s));
      byStatus[s] = r?.count ?? 0;
    }

    const total = Object.values(byStatus).reduce((a, b) => a + b, 0);

    // Total blog views
    const [viewRow] = await db
      .select({ views: count() })
      .from(pageViews)
      .where(sql`${pageViews.path} LIKE '/blog/%'`);
    const totalViews = viewRow?.views ?? 0;

    // Content health: % of posts with all 3 enrichments
    const allPosts = await db.select().from(blogPosts);
    const healthyPosts = allPosts.filter(
      (p) => p.hasMindMap && p.hasMnemonic && p.hasCallouts
    ).length;
    const contentHealth = total > 0 ? Math.round((healthyPosts / total) * 100) : 0;

    // Avg SEO score (based on having seo title + description)
    const withSeo = allPosts.filter((p) => p.seoTitle && p.seoDescription).length;
    const avgSeoScore = total > 0 ? Math.round((withSeo / total) * 100) : 0;

    return {
      total,
      published: byStatus.published ?? 0,
      draft: byStatus.draft ?? 0,
      scheduled: byStatus.scheduled ?? 0,
      archived: byStatus.archived ?? 0,
      totalViews,
      avgSeoScore,
      contentHealth,
    };
  }

  async getContentHealth(): Promise<BlogContentHealth[]> {
    const allPosts = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));

    return allPosts.map((p) => {
      const checks = {
        hasMindMap: p.hasMindMap ?? false,
        hasMnemonic: p.hasMnemonic ?? false,
        hasCallouts: p.hasCallouts ?? false,
        hasRelated: (p.relatedCount ?? 0) > 0,
        hasSeoTitle: !!p.seoTitle,
        hasSeoDescription: !!p.seoDescription,
        hasSections: (p.sectionCount ?? 0) > 2,
      };
      const total = Object.values(checks).length;
      const passed = Object.values(checks).filter(Boolean).length;
      return {
        slug: p.slug,
        title: p.title,
        checks,
        score: Math.round((passed / total) * 100),
      };
    });
  }

  async count(filters?: BlogFilters): Promise<number> {
    const conditions = this.buildConditions(filters);
    const query = conditions.length > 0
      ? db.select({ count: count() }).from(blogPosts).where(and(...conditions))
      : db.select({ count: count() }).from(blogPosts);
    const [r] = await query;
    return r?.count ?? 0;
  }

  private buildConditions(filters?: BlogFilters) {
    const conditions: ReturnType<typeof eq>[] = [];
    if (!filters) return conditions;

    if (filters.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      if (statuses.length === 1) {
        conditions.push(eq(blogPosts.status, statuses[0]));
      } else {
        conditions.push(or(...statuses.map((s) => eq(blogPosts.status, s)))!);
      }
    }
    if (filters.tag) {
      conditions.push(eq(blogPosts.tag, filters.tag));
    }
    if (filters.search) {
      conditions.push(
        or(
          ilike(blogPosts.title, `%${filters.search}%`),
          ilike(blogPosts.slug, `%${filters.search}%`)
        )!
      );
    }
    return conditions;
  }
}
