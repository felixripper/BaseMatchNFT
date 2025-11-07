const API_BASE = '/api';

export interface User {
  id: string;
  username: string;
  isVerified?: boolean;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  age: number;
  bio?: string;
  occupation?: string;
  education?: string;
  location?: string;
  imageUrl?: string;
  interests?: string[];
}

export interface Match {
  id: string;
  userId1: string;
  userId2: string;
  matchedAt: string;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  sentAt: string;
}

export class ApiClient {
  async register(username: string, password: string, walletAddress?: string): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, walletAddress }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async login(username: string, password: string): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async verifyWallet(walletAddress: string): Promise<void> {
    const res = await fetch(`${API_BASE}/auth/verify-wallet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress }),
    });
    if (!res.ok) throw new Error(await res.text());
  }

  async getProfile(userId: string): Promise<Profile> {
    const res = await fetch(`${API_BASE}/profile/${userId}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async createProfile(profile: Omit<Profile, 'id'>): Promise<Profile> {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
    const res = await fetch(`${API_BASE}/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async getDiscoverProfiles(userId: string): Promise<Profile[]> {
    const res = await fetch(`${API_BASE}/discover/${userId}`);
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data.profiles;
  }

  async swipe(swiperId: string, swipedId: string, action: 'like' | 'pass'): Promise<{ match: boolean; matchId?: string }> {
    const res = await fetch(`${API_BASE}/swipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ swiperId, swipedId, action }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async getMatches(userId: string): Promise<Match[]> {
    const res = await fetch(`${API_BASE}/matches/${userId}`);
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data.matches;
  }

  async getMessages(matchId: string): Promise<Message[]> {
    const res = await fetch(`${API_BASE}/messages/${matchId}`);
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data.messages;
  }

  async sendMessage(message: Omit<Message, 'id' | 'sentAt'>): Promise<Message> {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
}

export const apiClient = new ApiClient();