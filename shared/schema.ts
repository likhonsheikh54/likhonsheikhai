import { pgTable, text, serial, integer, boolean, timestamp, json, pgEnum, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  conversations: many(conversations),
}));

// AI Provider model
export const aiProviderEnum = pgEnum("ai_provider", ["groq", "openrouter", "langbase"]);

// Conversation model
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  provider: aiProviderEnum("provider").default("groq"),
  model: text("model"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  user: one(users, {
    fields: [conversations.userId],
    references: [users.id],
  }),
  messages: many(messages),
  checkpoints: many(checkpoints),
}));

// Message model
export const messageRoleEnum = pgEnum("message_role", ["user", "assistant", "system"]);

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id).notNull(),
  role: messageRoleEnum("role").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));

// Checkpoint model
export const checkpoints = pgTable("checkpoints", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id).notNull(),
  afterMessageId: integer("after_message_id").references(() => messages.id).notNull(),
  label: text("label"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const checkpointsRelations = relations(checkpoints, ({ one }) => ({
  conversation: one(conversations, {
    fields: [checkpoints.conversationId],
    references: [conversations.id],
  }),
  afterMessage: one(messages, {
    fields: [checkpoints.afterMessageId],
    references: [messages.id],
  }),
}));

// Settings model
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).unique().notNull(),
  theme: text("theme").default("dark"),
  defaultProvider: aiProviderEnum("default_provider").default("groq"),
  defaultModel: text("default_model"),
  temperature: text("temperature").default("0.14"),
  maxTokens: integer("max_tokens").default(2048),
  preferences: json("preferences").$type<Record<string, any>>(),
});

export const settingsRelations = relations(settings, ({ one }) => ({
  user: one(users, {
    fields: [settings.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  email: true,
});

export const insertConversationSchema = createInsertSchema(conversations).pick({
  userId: true,
  title: true,
  provider: true,
  model: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  conversationId: true,
  role: true,
  content: true,
});

export const insertCheckpointSchema = createInsertSchema(checkpoints).pick({
  conversationId: true,
  afterMessageId: true,
  label: true,
});

export const insertSettingsSchema = createInsertSchema(settings).pick({
  userId: true,
  theme: true,
  defaultProvider: true,
  defaultModel: true,
  temperature: true,
  maxTokens: true,
  preferences: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertCheckpoint = z.infer<typeof insertCheckpointSchema>;
export type Checkpoint = typeof checkpoints.$inferSelect;

export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;
