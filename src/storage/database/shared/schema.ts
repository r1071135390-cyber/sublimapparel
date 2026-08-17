import { sql } from "drizzle-orm";
import {
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const healthCheck = pgTable("health_check", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow(),
});

/**
 * Floating chat panel messages (Zendesk-style).
 * Public write; no Auth required -> RLS scenario A (service_role_key bypasses).
 */
export const chatMessages = pgTable(
  "chat_messages",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 80 }).notNull(),
    email: varchar("email", { length: 160 }).notNull(),
    topic: varchar("topic", { length: 40 }).notNull().default("other"),
    message: text("message").notNull(),
    source: varchar("source", { length: 40 }).notNull().default("floating_chat"),
    userAgent: varchar("user_agent", { length: 240 }),
    ip: varchar("ip", { length: 64 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("chat_messages_created_at_idx").on(table.createdAt),
    index("chat_messages_email_idx").on(table.email),
    index("chat_messages_topic_idx").on(table.topic),
  ],
);
