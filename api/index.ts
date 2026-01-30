// Vercel Serverless Function wrapper for Express app
import { VercelRequest, VercelResponse } from '@vercel/node';
// Import backend server - Vercel will handle the compilation
// @ts-ignore - Backend dependencies are available at runtime via includeFiles
import app from '../backend/src/server';

// Export the Express app handler for Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  // Set VERCEL environment variable for serverless detection
  process.env.VERCEL = '1';
  return app(req, res);
};
