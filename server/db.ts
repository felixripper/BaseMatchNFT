import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// For development, use a fallback if DATABASE_URL is not set
const databaseUrl = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/basematchnft";

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL not set. Using fallback for development. Database operations will fail.",
  );
}

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle({ client: pool, schema });
