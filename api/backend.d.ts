// Type declarations for backend imports in Vercel API route
// Backend code is included at runtime via includeFiles in vercel.json
// This file prevents TypeScript errors without requiring backend dependencies

declare module '../backend/src/server' {
  import { Request, Response } from 'express';
  const app: {
    (req: Request, res: Response): void;
    listen?: (port: number, host: string, callback?: () => void) => void;
  };
  export default app;
}
