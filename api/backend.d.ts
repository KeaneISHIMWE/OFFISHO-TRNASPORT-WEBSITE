// Type declarations for backend imports in Vercel API route
// Backend code is included at runtime via includeFiles in vercel.json
// This file prevents TypeScript errors without requiring backend dependencies

declare module '../backend/src/server' {
  // Minimal type definition - avoids importing express types
  type ExpressRequest = any;
  type ExpressResponse = any;
  const app: (req: ExpressRequest, res: ExpressResponse) => void | Promise<void>;
  export default app;
}

