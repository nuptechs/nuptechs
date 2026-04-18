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
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("contacts_email_idx").on(t.email), index("contacts_status_idx").on(t.status)]
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
      enum: ["pending", "confirmed", "completed", "cancelled"],
    })
      .default("pending")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("schedules_status_idx").on(t.status)]
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
