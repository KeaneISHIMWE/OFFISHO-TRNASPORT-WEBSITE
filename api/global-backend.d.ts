// Global type declarations to prevent TypeScript from type-checking backend files
// This file is included via triple-slash directive in index.ts
// All backend modules are declared as 'any' to prevent dependency resolution
// These declarations tell TypeScript to use 'any' instead of following actual imports

// Declare the main server module - this is the key import
declare module '../backend/src/server' {
  const app: any;
  export default app;
}

// Declare all backend routes
declare module '../backend/src/routes/auth' { export = any; }
declare module '../backend/src/routes/cars' { export = any; }
declare module '../backend/src/routes/requests' { export = any; }
declare module '../backend/src/routes/contact' { export = any; }

// Declare all backend controllers
declare module '../backend/src/controllers/authController' { export = any; }
declare module '../backend/src/controllers/carController' { export = any; }
declare module '../backend/src/controllers/requestController' { export = any; }
declare module '../backend/src/controllers/contactController' { export = any; }

// Declare all backend middleware
declare module '../backend/src/middleware/auth' { export = any; }
declare module '../backend/src/middleware/upload' { export = any; }

// Declare all backend utils
declare module '../backend/src/utils/validation' { export = any; }
declare module '../backend/src/utils/email' { export = any; }

// Declare all backend models
declare module '../backend/src/models/db' { export = any; }

// Declare all backend types
declare module '../backend/src/types/index' { export = any; }

// Catch-all for any other backend imports
declare module '../backend/src/**/*' {
  export = any;
}
