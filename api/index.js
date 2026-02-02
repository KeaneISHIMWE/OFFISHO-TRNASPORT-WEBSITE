// Vercel Serverless Function wrapper for Express app
// Using .js instead of .ts to avoid TypeScript compilation of backend files
// Backend code is included at runtime via includeFiles in vercel.json

const { VercelRequest, VercelResponse } = require('@vercel/node');

// Lazy load backend server
let app;

// Export the Express app handler for Vercel
module.exports = async (req, res) => {
  // Set VERCEL environment variable for serverless detection
  process.env.VERCEL = '1';
  
  // Debug logging for troubleshooting (check Vercel function logs)
  console.log(`[Vercel API] ${req.method} ${req.url || '/'}`);
  
  // Lazy load backend server (using dynamic import for ES modules)
  if (!app) {
    try {
      // Use dynamic import for ES modules (backend uses ES modules)
      const serverModule = await import('../backend/src/server.js');
      app = serverModule.default || serverModule;
    } catch (error) {
      console.error('Error loading backend server:', error);
      // Fallback: create a simple handler
      app = (req, res) => {
        res.status(500).json({ error: 'Backend server not available', details: error.message });
      };
    }
  }
  
  // Vercel routes /api/* to this function via vercel.json routes configuration
  // Express receives the full path including /api prefix (e.g., /api/auth/login)
  // Express routes mounted at /api/auth, /api/cars, etc. will match correctly
  
  return app(req, res);
};
