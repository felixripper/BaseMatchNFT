import type { Express } from "express";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<void> {
  // put application routes here
  // prefix all routes with /api

  // User routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password, walletAddress } = req.body;
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser({ username, password, walletAddress });
      res.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ user: { id: user.id, username: user.username, isVerified: user.isVerified } });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/verify-wallet", async (req, res) => {
    try {
      const { walletAddress } = req.body;
      const user = await storage.getUserByWallet(walletAddress);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await storage.updateUser(user.id, { isVerified: true });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Verification failed" });
    }
  });

  // Profile routes
  app.get("/api/profile/:userId", async (req, res) => {
    try {
      const profile = await storage.getProfile(req.params.userId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json({ profile });
    } catch (error) {
      res.status(500).json({ message: "Failed to get profile" });
    }
  });

  app.post("/api/profile", async (req, res) => {
    try {
      const profile = await storage.createProfile(req.body);
      res.json({ profile });
    } catch (error) {
      res.status(500).json({ message: "Failed to create profile" });
    }
  });

  app.put("/api/profile/:userId", async (req, res) => {
    try {
      const profile = await storage.updateProfile(req.params.userId, req.body);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json({ profile });
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Discover/Swiping routes
  app.get("/api/discover/:userId", async (req, res) => {
    try {
      const profiles = await storage.getPotentialMatches(req.params.userId);
      res.json({ profiles });
    } catch (error) {
      res.status(500).json({ message: "Failed to get potential matches" });
    }
  });

  app.post("/api/swipe", async (req, res) => {
    try {
      const { swiperId, swipedId, action } = req.body;

      // Record the swipe
      await storage.createSwipe({ swiperId, swipedId, action });

      // Check for match if it's a like
      if (action === 'like') {
        const reciprocalSwipe = await storage.hasSwiped(swipedId, swiperId);
        if (reciprocalSwipe) {
          // Create match
          const match = await storage.createMatch({ userId1: swiperId, userId2: swipedId });
          return res.json({ match: true, matchId: match.id });
        }
      }

      res.json({ match: false });
    } catch (error) {
      res.status(500).json({ message: "Swipe failed" });
    }
  });

  // Matches routes
  app.get("/api/matches/:userId", async (req, res) => {
    try {
      const matches = await storage.getMatchesForUser(req.params.userId);
      res.json({ matches });
    } catch (error) {
      res.status(500).json({ message: "Failed to get matches" });
    }
  });

  // Messages routes
  app.get("/api/messages/:matchId", async (req, res) => {
    try {
      const messages = await storage.getMessagesForMatch(req.params.matchId);
      res.json({ messages });
    } catch (error) {
      res.status(500).json({ message: "Failed to get messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const message = await storage.createMessage(req.body);
      res.json({ message });
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Farcaster manifest endpoint
  app.get('/.well-known/farcaster.json', (req, res) => {
    const manifest = {
      frame: {
        name: "Base Match",
        version: "1",
        iconUrl: "https://basematch.vercel.app/icon.png",
        homeUrl: "https://basematch.vercel.app",
        imageUrl: "https://basematch.vercel.app/image.png",
        buttonTitle: "Match Now",
        splashImageUrl: "https://basematch.vercel.app/splash.png",
        splashBackgroundColor: "#0f0f0f",
        webhookUrl: "https://basematch.vercel.app/api/webhook",
        subtitle: "Exclusive NFT-gated dating platform on Base Network",
        description: "Find your perfect match in the exclusive NFT community on Base",
        primaryCategory: "social",
        tags: ["messaging", "network", "social"],
        tagline: "Exclusive dating platform",
        ogTitle: "Your perfect matches await",
        ogDescription: "Your perfect matches await"
      },
      accountAssociation: {
        header: "eyJmaWQiOjQ0MTYxMywidHlwZSI6ImF1dGgiLCJrZXkiOiIweEYwZTdiY0U1QmNiNzlENjgxMGE4MzU3NDY3MjYzM2E2ODk4MUU2OUIifQ",
        payload: "eyJkb21haW4iOiJiYXNlbWF0Y2gudmVyY2VsLmFwcCJ9",
        signature: "xaGIQd6EhDvQajU1HI2hLTeRXMSE+Zwsf80Y050NU417RKOSUuZTYnKK8kW7z11Rq/AvVyy42D1HPHZWx4q3Yhw="
      }
    };

    res.json(manifest);
  });
}
