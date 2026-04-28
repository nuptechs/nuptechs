import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  index,
  customType,
} from "drizzle-orm/pg-core";

// Postgres bytea ⇄ Buffer. postgres-js returns bytea as Buffer (Uint8Array).
const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

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

// ── Card Shares (audit + rate-limit source) ─────────────
// Registers each share of the commercial card + delivery status
// from Evolution API webhooks. Also used as the rate-limit source
// (queries by ipAddress in a time window).
export const cardShares = pgTable(
  "card_shares",
  {
    id: serial("id").primaryKey(),
    // SHA-256 hex of the normalized E.164 phone (no plaintext at rest)
    phoneHash: text("phone_hash").notNull(),
    // Country digits prefix (e.g. "55") — safe, non-PII
    phonePrefix: text("phone_prefix"),
    // Message IDs returned by Evolution for later status correlation
    messageIds: jsonb("message_ids"),
    // "pending" | "sent" | "delivered" | "read" | "failed"
    status: text("status", {
      enum: ["pending", "sent", "delivered", "read", "failed"],
    })
      .default("pending")
      .notNull(),
    errorMessage: text("error_message"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    country: text("country"),
    referrer: text("referrer"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("card_shares_phone_idx").on(t.phoneHash),
    index("card_shares_ip_idx").on(t.ipAddress, t.createdAt),
    index("card_shares_created_idx").on(t.createdAt),
    index("card_shares_status_idx").on(t.status),
  ]
);

// ── App Config (key/value settings for runtime config) ──
// Used by the admin panel to override env-driven defaults
// (e.g. which WhatsApp instance sends the commercial card).
export const appConfig = pgTable("app_config", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: text("updated_by"),
});

// ── Card Templates (WhatsApp commercial card models) ────
// Admin-managed templates that bundle a custom caption + one or more images
// sent via /api/share-card. Only one template can be active at a time.
export const cardTemplates = pgTable(
  "card_templates",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    caption: text("caption").notNull().default(""),
    includeContact: boolean("include_contact").notNull().default(true),
    contactName: text("contact_name"),
    contactPhone: text("contact_phone"),
    contactEmail: text("contact_email"),
    contactOrg: text("contact_org"),
    contactTitle: text("contact_title"),
    contactSecondaryPhone: text("contact_secondary_phone"),
    contactAddress: text("contact_address"),
    contactLinkedinUrl: text("contact_linkedin_url"),
    contactInstagramUrl: text("contact_instagram_url"),
    contactWebsiteUrl: text("contact_website_url"),
    contactPhotoBytes: bytea("contact_photo_bytes"),
    contactPhotoMime: text("contact_photo_mime"),
    isActive: boolean("is_active").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdBy: text("created_by"),
  },
  (t) => [index("card_templates_active_idx").on(t.isActive)]
);

export const cardTemplateMedia = pgTable(
  "card_template_media",
  {
    id: serial("id").primaryKey(),
    templateId: integer("template_id")
      .notNull()
      .references(() => cardTemplates.id, { onDelete: "cascade" }),
    position: integer("position").notNull().default(0),
    fileName: text("file_name").notNull(),
    mimeType: text("mime_type").notNull(),
    sizeBytes: integer("size_bytes").notNull(),
    bytes: bytea("bytes").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("card_template_media_template_idx").on(t.templateId, t.position)]
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
