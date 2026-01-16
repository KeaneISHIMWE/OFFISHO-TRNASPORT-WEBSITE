import { ConvexHttpClient } from "convex/browser";
import dotenv from 'dotenv';

dotenv.config();

const CONVEX_URL = process.env.CONVEX_URL || "";

if (!CONVEX_URL) {
  console.warn("Warning: CONVEX_URL not set. Convex client will not work.");
  console.warn("Please run 'npx convex dev' to get your Convex URL and add it to .env");
}

export const convexClient = new ConvexHttpClient(CONVEX_URL);

export default convexClient;
