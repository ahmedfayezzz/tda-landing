import { pgTable, text, varchar, timestamp, boolean, jsonb, integer, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table for CMS authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  email: varchar("email").unique().notNull(),
  password: text("password").notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  role: varchar("role").default("editor").notNull(), // admin, editor, viewer
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Pages table for CMS content management
export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  title: text("title").notNull(),
  slug: varchar("slug").unique().notNull(),
  content: jsonb("content").notNull(), // Structured content blocks
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImage: text("og_image"),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdBy: varchar("created_by").references(() => users.id).notNull(),
  updatedBy: varchar("updated_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Page versions for versioning and drafts
export const pageVersions = pgTable("page_versions", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  pageId: varchar("page_id").references(() => pages.id).notNull(),
  versionNumber: integer("version_number").notNull(),
  title: text("title").notNull(),
  content: jsonb("content").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImage: text("og_image"),
  isDraft: boolean("is_draft").default(false).notNull(),
  createdBy: varchar("created_by").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Media library
export const media = pgTable("media", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  url: text("url").notNull(),
  altText: text("alt_text"),
  uploadedBy: varchar("uploaded_by").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Navigation menus
export const menus = pgTable("menus", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  name: varchar("name").notNull(),
  location: varchar("location").notNull(), // header, footer, sidebar
  items: jsonb("items").notNull(), // Array of menu items
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Email settings
export const emailSettings = pgTable("email_settings", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  provider: varchar("provider").notNull(), // smtp, sendgrid, mailgun
  smtpHost: text("smtp_host"),
  smtpPort: integer("smtp_port"),
  smtpUsername: text("smtp_username"),
  smtpPassword: text("smtp_password"),
  smtpSecure: boolean("smtp_secure").default(false),
  apiKey: text("api_key"),
  fromEmail: text("from_email").notNull(),
  fromName: text("from_name").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Email templates
export const emailTemplates = pgTable("email_templates", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  name: varchar("name").notNull(),
  subject: text("subject").notNull(),
  htmlBody: text("html_body").notNull(),
  textBody: text("text_body"),
  variables: jsonb("variables"), // Available template variables
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Form submissions
export const formSubmissions = pgTable("form_submissions", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  formType: varchar("form_type").notNull(), // contact, newsletter, etc.
  data: jsonb("data").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Audit log
export const auditLog = pgTable("audit_log", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  userId: varchar("user_id").references(() => users.id),
  action: varchar("action").notNull(), // create, update, delete, login, etc.
  entityType: varchar("entity_type").notNull(), // page, user, media, etc.
  entityId: varchar("entity_id"),
  oldData: jsonb("old_data"),
  newData: jsonb("new_data"),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Site settings
export const siteSettings = pgTable("site_settings", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  key: varchar("key").unique().notNull(),
  value: text("value").notNull(),
  type: varchar("type").default("string").notNull(), // string, number, boolean, json
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Legacy contacts table (keeping existing structure)
export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  projectType: text("project_type"),
  details: text("details").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  pagesCreated: many(pages, { relationName: "pageCreator" }),
  pagesUpdated: many(pages, { relationName: "pageUpdater" }),
  pageVersions: many(pageVersions),
  mediaUploaded: many(media),
  auditLogs: many(auditLog),
}));

export const pagesRelations = relations(pages, ({ one, many }) => ({
  creator: one(users, {
    fields: [pages.createdBy],
    references: [users.id],
    relationName: "pageCreator",
  }),
  updater: one(users, {
    fields: [pages.updatedBy],
    references: [users.id],
    relationName: "pageUpdater",
  }),
  versions: many(pageVersions),
}));

export const pageVersionsRelations = relations(pageVersions, ({ one }) => ({
  page: one(pages, {
    fields: [pageVersions.pageId],
    references: [pages.id],
  }),
  creator: one(users, {
    fields: [pageVersions.createdBy],
    references: [users.id],
  }),
}));

export const mediaRelations = relations(media, ({ one }) => ({
  uploader: one(users, {
    fields: [media.uploadedBy],
    references: [users.id],
  }),
}));

export const auditLogRelations = relations(auditLog, ({ one }) => ({
  user: one(users, {
    fields: [auditLog.userId],
    references: [users.id],
  }),
}));

// Schema exports
export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
});

export const insertMediaSchema = createInsertSchema(media).omit({
  id: true,
  createdAt: true,
});

export const insertFormSubmissionSchema = createInsertSchema(formSubmissions).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;

export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;

export type InsertFormSubmission = z.infer<typeof insertFormSubmissionSchema>;
export type FormSubmission = typeof formSubmissions.$inferSelect;

export type PageVersion = typeof pageVersions.$inferSelect;
export type Menu = typeof menus.$inferSelect;
export type EmailSettings = typeof emailSettings.$inferSelect;
export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type AuditLog = typeof auditLog.$inferSelect;
export type SiteSettings = typeof siteSettings.$inferSelect;
