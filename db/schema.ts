import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

// ── Leads (contact form submissions) ────────────────────
export const contacts = pgTable(
  "contacts",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    company: text("company"),
    challenge: text("challenge").notNull(),
    status: text("status", {
      enum: ["new", "contacted", "qualified", "converted", "lost"],
    })
      .default("new")
      .notNull(),
    notes: text("notes"),
    score: integer("score"),
    assignedTo: text("assigned_to"),
    lastContactAt: timestamp("last_contact_at"),
    convertedAt: timestamp("converted_at"),
    lostReason: text("lost_reason"),
    source: text("source").default("website"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("contacts_email_idx").on(t.email), index("contacts_status_idx").on(t.status)]
);

// ── Lead Timeline (activity log per lead) ───────────────
export const leadTimeline = pgTable(
  "lead_timeline",
  {
    id: serial("id").primaryKey(),
    leadId: integer("lead_id").notNull(),
    action: text("action").notNull(),
    detail: text("detail"),
    performedBy: text("performed_by").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("lead_timeline_lead_idx").on(t.leadId)]
);

// ── Agendamentos ────────────────────────────────────────
export const schedules = pgTable(
  "schedules",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    company: text("company"),
    phone: text("phone"),
    tool: text("tool").notNull(),
    timeslot: text("timeslot"),
    summary: text("summary"),
    status: text("status", {
      enum: ["pending", "confirmed", "completed", "cancelled", "no_show"],
    })
      .default("pending")
      .notNull(),
    meetingUrl: text("meeting_url"),
    confirmedAt: timestamp("confirmed_at"),
    completedAt: timestamp("completed_at"),
    cancelReason: text("cancel_reason"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("schedules_status_idx").on(t.status)]
);

// ── Audit Log ───────────────────────────────────────────
export const auditLog = pgTable(
  "audit_log",
  {
    id: serial("id").primaryKey(),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id").notNull(),
    detail: jsonb("detail"),
    performedBy: text("performed_by").notNull(),
    performedByName: text("performed_by_name"),
    ipAddress: text("ip_address"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("audit_log_action_idx").on(t.action),
    index("audit_log_entity_idx").on(t.entityType, t.entityId),
    index("audit_log_created_idx").on(t.createdAt),
  ]
);

// ── Page Views (analytics) ──────────────────────────────
export const pageViews = pgTable(
  "page_views",
  {
    id: serial("id").primaryKey(),
    path: text("path").notNull(),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    country: text("country"),
    sessionId: text("session_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("page_views_path_idx").on(t.path),
    index("page_views_created_idx").on(t.createdAt),
  ]
);

// ── Site Configuration (key-value) ──────────────────────
export const siteConfig = pgTable("site_config", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Blog Posts (DB-backed metadata for admin management) ─
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    tag: text("tag").notNull(),
    status: text("status", {
      enum: ["published", "draft", "scheduled", "archived"],
    })
      .default("draft")
      .notNull(),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    featuredImage: text("featured_image"),
    publishedAt: timestamp("published_at"),
    scheduledAt: timestamp("scheduled_at"),
    lastSyncedAt: timestamp("last_synced_at"),
    sectionCount: integer("section_count").default(0),
    wordCount: integer("word_count").default(0),
    hasMindMap: boolean("has_mind_map").default(false),
    hasMnemonic: boolean("has_mnemonic").default(false),
    hasCallouts: boolean("has_callouts").default(false),
    relatedCount: integer("related_count").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("blog_posts_slug_idx").on(t.slug),
    index("blog_posts_status_idx").on(t.status),
  ]
);

// ── Admin Users (NuPIdentity-linked) ────────────────────
export const adminUsers = pgTable(
  "admin_users",
  {
    id: serial("id").primaryKey(),
    profileId: text("profile_id").notNull().unique(), // NuPIdentity profile ID
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    role: text("role", { enum: ["admin", "editor", "viewer"] })
      .default("viewer")
      .notNull(),
    lastLoginAt: timestamp("last_login_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("admin_users_profile_idx").on(t.profileId)]
);
