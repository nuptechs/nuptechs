/**
 * BlogPort — Abstraction for blog post management.
 * Posts live in source code (.ts files), but metadata/status
 * is tracked in the DB for admin operations.
 */

export type BlogPostStatus = "published" | "draft" | "scheduled" | "archived";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  tag: string;
  status: BlogPostStatus;
  seoTitle: string | null;
  seoDescription: string | null;
  featuredImage: string | null;
  publishedAt: Date | null;
  scheduledAt: Date | null;
  lastSyncedAt: Date | null;
  sectionCount: number;
  wordCount: number;
  hasMindMap: boolean;
  hasMnemonic: boolean;
  hasCallouts: boolean;
  relatedCount: number;
  views?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type BlogFilters = {
  status?: BlogPostStatus | BlogPostStatus[];
  tag?: string;
  search?: string;
};

export type BlogStats = {
  total: number;
  published: number;
  draft: number;
  scheduled: number;
  archived: number;
  totalViews: number;
  avgSeoScore: number;
  contentHealth: number; // 0-100 — % of posts with mind map + callouts + mnemonic
};

export type BlogContentHealth = {
  slug: string;
  title: string;
  checks: {
    hasMindMap: boolean;
    hasMnemonic: boolean;
    hasCallouts: boolean;
    hasRelated: boolean;
    hasSeoTitle: boolean;
    hasSeoDescription: boolean;
    hasSections: boolean;
  };
  score: number; // 0-100
};

export abstract class BlogPort {
  /** Sync source-code posts into DB (upsert). Returns count of synced posts. */
  abstract syncFromSource(posts: Array<{
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
  }>): Promise<number>;

  abstract findAll(filters?: BlogFilters, limit?: number, offset?: number): Promise<BlogPost[]>;
  abstract findBySlug(slug: string): Promise<BlogPost | null>;
  abstract updateStatus(slug: string, status: BlogPostStatus): Promise<BlogPost>;
  abstract updateMeta(slug: string, meta: { seoTitle?: string; seoDescription?: string; featuredImage?: string }): Promise<BlogPost>;
  abstract getStats(): Promise<BlogStats>;
  abstract getContentHealth(): Promise<BlogContentHealth[]>;
  abstract count(filters?: BlogFilters): Promise<number>;
}
