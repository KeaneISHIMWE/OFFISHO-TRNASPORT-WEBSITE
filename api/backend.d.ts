// Type declarations for backend imports in Vercel API route
// Backend code is included at runtime via includeFiles in vercel.json
// This file prevents TypeScript errors without requiring backend dependencies
// TypeScript will use this declaration instead of following the actual import

declare module '../backend/src/server' {
  import { VercelRequest, VercelResponse } from '@vercel/node';
  // Minimal type definition - avoids importing express types
  // This tells TypeScript that the server exports a default Express app
  const app: (req: VercelRequest | any, res: VercelResponse | any) => void | Promise<void>;
  export default app;
}

// Prevent TypeScript from following imports in backend directory
// Declare all backend modules to prevent type-checking
declare module '../backend/src/**/*' {
  export = any;
}

declare module '../backend/src/routes/*' {
  export = any;
}

declare module '../backend/src/controllers/*' {
  export = any;
}

declare module '../backend/src/middleware/*' {
  export = any;
}

declare module '../backend/src/utils/*' {
  export = any;
}

declare module '../backend/src/models/*' {
  export = any;
}

declare module '../backend/src/types/*' {
  export = any;
}

