import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Conversation model
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Message model
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id).notNull(),
  role: text("role").notNull(), // user, assistant, system
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Checkpoint model
export const checkpoints = pgTable("checkpoints", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id).notNull(),
  afterMessageId: integer("after_message_id").references(() => messages.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// AI Provider Settings
export const aiProviderSettings = pgTable("ai_provider_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  provider: text("provider").notNull(), // groq, openai, anthropic, etc.
  model: text("model").notNull(),
  temperature: text("temperature").notNull(),
  maxTokens: integer("max_tokens").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConversationSchema = createInsertSchema(conversations).pick({
  userId: true,
  title: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  conversationId: true,
  role: true,
  content: true,
});

export const insertCheckpointSchema = createInsertSchema(checkpoints).pick({
  conversationId: true,
  afterMessageId: true,
});

export const insertAIProviderSettingsSchema = createInsertSchema(aiProviderSettings).pick({
  userId: true,
  provider: true,
  model: true,
  temperature: true,
  maxTokens: true,
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

export type InsertAIProviderSettings = z.infer<typeof insertAIProviderSettingsSchema>;
export type AIProviderSettings = typeof aiProviderSettings.$inferSelect;
