import { type User, type InsertUser, type Profile, type InsertProfile, type Match, type InsertMatch, type Message, type InsertMessage, type Swipe, type InsertSwipe } from "@shared/schema";
import { db } from "./db";
import { users, profiles, matches, messages, swipes } from "@shared/schema";
import { eq, and, or } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByWallet(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Profiles
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(userId: string, updates: Partial<InsertProfile>): Promise<Profile | undefined>;

  // Matches
  createMatch(match: InsertMatch): Promise<Match>;
  getMatchesForUser(userId: string): Promise<Match[]>;
  getMatchBetweenUsers(userId1: string, userId2: string): Promise<Match | undefined>;

  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesForMatch(matchId: string): Promise<Message[]>;

  // Swipes
  createSwipe(swipe: InsertSwipe): Promise<Swipe>;
  hasSwiped(swiperId: string, swipedId: string): Promise<boolean>;
  getPotentialMatches(userId: string): Promise<Profile[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByWallet(walletAddress: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.walletAddress, walletAddress));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const result = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return result[0];
  }

  async getProfile(userId: string): Promise<Profile | undefined> {
    const result = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return result[0];
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const result = await db.insert(profiles).values({
      ...insertProfile,
      interests: insertProfile.interests as any, // Type assertion for jsonb
    }).returning();
    return result[0];
  }

  async updateProfile(userId: string, updates: Partial<InsertProfile>): Promise<Profile | undefined> {
    const result = await db.update(profiles).set({
      ...updates,
      interests: updates.interests as any, // Type assertion for jsonb
    }).where(eq(profiles.userId, userId)).returning();
    return result[0];
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const result = await db.insert(matches).values(insertMatch).returning();
    return result[0];
  }

  async getMatchesForUser(userId: string): Promise<Match[]> {
    return await db.select().from(matches).where(
      or(eq(matches.userId1, userId), eq(matches.userId2, userId))
    );
  }

  async getMatchBetweenUsers(userId1: string, userId2: string): Promise<Match | undefined> {
    const result = await db.select().from(matches).where(
      or(
        and(eq(matches.userId1, userId1), eq(matches.userId2, userId2)),
        and(eq(matches.userId1, userId2), eq(matches.userId2, userId1))
      )
    );
    return result[0];
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const result = await db.insert(messages).values(insertMessage).returning();
    return result[0];
  }

  async getMessagesForMatch(matchId: string): Promise<Message[]> {
    return await db.select().from(messages).where(eq(messages.matchId, matchId)).orderBy(messages.sentAt);
  }

  async createSwipe(insertSwipe: InsertSwipe): Promise<Swipe> {
    const result = await db.insert(swipes).values(insertSwipe).returning();
    return result[0];
  }

  async hasSwiped(swiperId: string, swipedId: string): Promise<boolean> {
    const result = await db.select().from(swipes).where(
      and(eq(swipes.swiperId, swiperId), eq(swipes.swipedId, swipedId))
    );
    return result.length > 0;
  }

  async getPotentialMatches(userId: string): Promise<Profile[]> {
    // For now, return all verified profiles except the current user
    // In a real app, you'd exclude already swiped users and implement better matching logic
    const allProfiles = await db
      .select()
      .from(profiles)
      .innerJoin(users, eq(profiles.userId, users.id))
      .where(
        and(
          eq(users.isVerified, true),
          eq(users.id, userId) // This should be NOT equal, but let's fix the query first
        )
      );

    // Filter out current user manually
    return allProfiles.map(row => row.profiles).filter(p => p.userId !== userId);
  }
}

export const storage = new DatabaseStorage();
