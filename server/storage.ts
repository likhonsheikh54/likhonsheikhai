import { 
  users, type User, type InsertUser,
  conversations, type Conversation, type InsertConversation,
  messages, type Message, type InsertMessage,
  checkpoints, type Checkpoint, type InsertCheckpoint,
  settings, type Settings, type InsertSettings
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Conversation operations
  getConversation(id: number): Promise<Conversation | undefined>;
  getConversationsByUserId(userId: number): Promise<Conversation[]>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversation(id: number, data: Partial<InsertConversation>): Promise<Conversation | undefined>;
  deleteConversation(id: number): Promise<boolean>;
  
  // Message operations
  getMessage(id: number): Promise<Message | undefined>;
  getMessagesByConversationId(conversationId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Checkpoint operations
  getCheckpoint(id: number): Promise<Checkpoint | undefined>;
  getCheckpointsByConversationId(conversationId: number): Promise<Checkpoint[]>;
  createCheckpoint(checkpoint: InsertCheckpoint): Promise<Checkpoint>;
  deleteCheckpoint(id: number): Promise<boolean>;
  
  // Settings operations
  getSettings(userId: number): Promise<Settings | undefined>;
  updateSettings(userId: number, data: Partial<InsertSettings>): Promise<Settings | undefined>;
  createSettings(settings: InsertSettings): Promise<Settings>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        createdAt: new Date()
      })
      .returning();
    return user;
  }
  
  // Conversation operations
  async getConversation(id: number): Promise<Conversation | undefined> {
    const [conversation] = await db.select().from(conversations).where(eq(conversations.id, id));
    return conversation || undefined;
  }
  
  async getConversationsByUserId(userId: number): Promise<Conversation[]> {
    return await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .orderBy(desc(conversations.updatedAt));
  }
  
  async createConversation(conversation: InsertConversation): Promise<Conversation> {
    const now = new Date();
    const [newConversation] = await db
      .insert(conversations)
      .values({
        ...conversation,
        createdAt: now,
        updatedAt: now
      })
      .returning();
    return newConversation;
  }
  
  async updateConversation(id: number, data: Partial<InsertConversation>): Promise<Conversation | undefined> {
    const [updatedConversation] = await db
      .update(conversations)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(conversations.id, id))
      .returning();
    return updatedConversation || undefined;
  }
  
  async deleteConversation(id: number): Promise<boolean> {
    const [deletedConversation] = await db
      .delete(conversations)
      .where(eq(conversations.id, id))
      .returning({ id: conversations.id });
    return !!deletedConversation;
  }
  
  // Message operations
  async getMessage(id: number): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message || undefined;
  }
  
  async getMessagesByConversationId(conversationId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.timestamp);
  }
  
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values({
        ...message,
        timestamp: new Date()
      })
      .returning();
      
    // Update the conversation's updatedAt timestamp
    if (message.conversationId) {
      await db
        .update(conversations)
        .set({ updatedAt: new Date() })
        .where(eq(conversations.id, message.conversationId));
    }
    
    return newMessage;
  }
  
  // Checkpoint operations
  async getCheckpoint(id: number): Promise<Checkpoint | undefined> {
    const [checkpoint] = await db.select().from(checkpoints).where(eq(checkpoints.id, id));
    return checkpoint || undefined;
  }
  
  async getCheckpointsByConversationId(conversationId: number): Promise<Checkpoint[]> {
    return await db
      .select()
      .from(checkpoints)
      .where(eq(checkpoints.conversationId, conversationId))
      .orderBy(checkpoints.timestamp);
  }
  
  async createCheckpoint(checkpoint: InsertCheckpoint): Promise<Checkpoint> {
    const [newCheckpoint] = await db
      .insert(checkpoints)
      .values({
        ...checkpoint,
        timestamp: new Date()
      })
      .returning();
    return newCheckpoint;
  }
  
  async deleteCheckpoint(id: number): Promise<boolean> {
    const [deletedCheckpoint] = await db
      .delete(checkpoints)
      .where(eq(checkpoints.id, id))
      .returning({ id: checkpoints.id });
    return !!deletedCheckpoint;
  }
  
  // Settings operations
  async getSettings(userId: number): Promise<Settings | undefined> {
    const [userSettings] = await db.select().from(settings).where(eq(settings.userId, userId));
    return userSettings || undefined;
  }
  
  async updateSettings(userId: number, data: Partial<InsertSettings>): Promise<Settings | undefined> {
    const [updatedSettings] = await db
      .update(settings)
      .set(data)
      .where(eq(settings.userId, userId))
      .returning();
    return updatedSettings || undefined;
  }
  
  async createSettings(settingsData: InsertSettings): Promise<Settings> {
    const [newSettings] = await db
      .insert(settings)
      .values(settingsData)
      .returning();
    return newSettings;
  }
}

export const storage = new DatabaseStorage();
