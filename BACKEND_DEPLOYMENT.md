# Backend Deployment Guide for Vercel

This guide covers deploying the Offisho Transport backend to Vercel as serverless functions.

## ⚠️ Important Considerations

### Database
Vercel serverless functions work best with:
- **PlanetScale** (MySQL-compatible, serverless)
- **Railway** (MySQL hosting)
- **Render** (MySQL hosting)
- **AWS RDS** or **Google Cloud SQL**

### File Storage
- **Cloudinary** is REQUIRED for file uploads on Vercel (local storage doesn't work in serverless)
- Make sure Cloudinary is configured in environment variables

## Prerequisites

1. Cloud MySQL database (PlanetScale, Railway, etc.)
2. Cloudinary account for image storage
3. Vercel account

## Deployment Steps

### Step 1: Set Up Database

Choose one of these options:

#### Option A: PlanetScale (Recommended for Vercel)
1. Sign up at https://planetscale.com
2. Create a new database
3. Get connection string
4. Update environment variables (see below)

#### Option B: Railway
1. Sign up at https://railway.app
2. Create new project → Add MySQL
3. Get connection details
4. Update environment variables

### Step 2: Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```env
# Database Configuration
DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=offisho_transport

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=24h

# Cloudinary (REQUIRED for Vercel)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

# Frontend URL (your Vercel frontend URL)
FRONTEND_URL=https://your-frontend.vercel.app

# Backend URL (your Vercel backend URL - will be set after deployment)
BACKEND_URL=https://your-project.vercel.app

# Node Environment
NODE_ENV=production
```

### Step 3: Deploy to Vercel

#### Via Vercel Dashboard:
1. Go to https://vercel.com/new
2. Import your repository
3. **Root Directory**: Leave blank (root of repo)
4. **Framework Preset**: Other
5. **Build Command**: `cd backend && npm install && npm run build`
6. **Output Directory**: Leave blank (not needed for API)
7. **Install Command**: `npm install`
8. Add all environment variables
9. Click **Deploy**

#### Via Vercel CLI:
```bash
# From project root
vercel

# Set environment variables
vercel env add DB_HOST
vercel env add DB_PASSWORD
# ... add all other variables

# Deploy to production
vercel --prod
```

### Step 4: Update Database Schema

After deploying, you need to run the database schema:

1. Connect to your MySQL database
2. Run the schema file:
```bash
mysql -h your-host -u your-user -p your-database < database/schema.sql
```

Or use a MySQL client like MySQL Workbench or DBeaver.

### Step 5: Update Frontend API URL

Update your frontend's `REACT_APP_API_URL` environment variable in Vercel to point to your backend:
```
REACT_APP_API_URL=https://your-project.vercel.app/api
```

## Project Structure for Vercel

```
your-project/
├── api/
│   └── index.ts          # Vercel serverless function entry
├── backend/
│   └── src/
│       └── server.ts     # Express app
├── frontend/
│   └── dist/             # Frontend build output
└── vercel.json           # Vercel configuration
```

## API Routes

Your API will be available at:
- `https://your-project.vercel.app/api/auth/*`
- `https://your-project.vercel.app/api/cars/*`
- `https://your-project.vercel.app/api/requests/*`
- `https://your-project.vercel.app/api/contact/*`

## Troubleshooting

### Database Connection Issues
- Verify database credentials
- Check if database allows connections from Vercel IPs
- For PlanetScale, ensure you're using the correct branch

### File Upload Issues
- **CRITICAL**: Cloudinary must be configured
- Local file storage doesn't work on Vercel
- Check Cloudinary environment variables

### CORS Issues
- Update `FRONTEND_URL` in backend environment variables
- Ensure frontend URL matches your Vercel deployment

### Cold Starts
- First request may be slow (serverless cold start)
- Consider upgrading Vercel plan for better performance

## Alternative: Deploy Backend Separately

If you prefer a traditional server deployment:

### Railway (Recommended)
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select backend directory
4. Add environment variables
5. Deploy

### Render
1. Go to https://render.com
2. New Web Service
3. Connect GitHub repo
4. Set root directory to `backend`
5. Build: `npm install && npm run build`
6. Start: `npm start`
7. Add environment variables

## Environment Variables Checklist

- [ ] DB_HOST
- [ ] DB_PORT
- [ ] DB_USER
- [ ] DB_PASSWORD
- [ ] DB_NAME
- [ ] JWT_SECRET
- [ ] JWT_EXPIRES_IN
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] EMAIL_HOST
- [ ] EMAIL_PORT
- [ ] EMAIL_USER
- [ ] EMAIL_PASS
- [ ] FRONTEND_URL
- [ ] BACKEND_URL (set after deployment)
- [ ] NODE_ENV

---

**Your backend API will be available at:** `https://your-project.vercel.app/api`
