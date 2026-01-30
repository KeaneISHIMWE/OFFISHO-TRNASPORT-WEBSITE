import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth';
import carRoutes from './routes/cars';
import requestRoutes from './routes/requests';
import contactRoutes from './routes/contact';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically (only in non-serverless environments)
if (!process.env.VERCEL) {
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
}

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Offisho Transport API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      cars: '/api/cars',
      requests: '/api/requests'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Offisho Transport API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  console.error(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    path: req.path,
    availableEndpoints: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      cars: {
        getAll: 'GET /api/cars',
        getById: 'GET /api/cars/:id',
        create: 'POST /api/cars (admin only)',
        update: 'PUT /api/cars/:id (admin only)',
        delete: 'DELETE /api/cars/:id (admin only)'
      },
      requests: {
        getAll: 'GET /api/requests (auth required)',
        getById: 'GET /api/requests/:id (auth required)',
        create: 'POST /api/requests (auth required)',
        updateStatus: 'PUT /api/requests/:id/status (admin only)',
        delete: 'DELETE /api/requests/:id (auth required)'
      }
    }
  });
});

// Start server if not in test environment
// On Railway, we always want to start the server
// On Vercel, the serverless function handles requests
if (process.env.NODE_ENV !== 'test') {
  if (!process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

export default app;
