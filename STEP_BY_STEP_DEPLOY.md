# 🚀 Step-by-Step Deployment Guide

Follow these steps in order to deploy your full-stack application.

## ✅ Step 1: Set Up Services (15-20 minutes)

### 1.1 MySQL Database Setup

**Choose PlanetScale (Recommended):**
1. Go to https://planetscale.com
2. Sign up with GitHub (free tier available)
3. Click "Create database"
4. Name: `offisho_transport`
5. Copy connection details:
   - Host (e.g., `xxxxxx.psdb.cloud`)
   - Username
   - Password
   - Database name: `offisho_transport`

**OR Railway:**
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Provision MySQL
4. Copy connection details from Variables tab

### 1.2 Cloudinary Setup (REQUIRED)

1. Go to https://cloudinary.com
2. Sign up for free account
3. Copy from Dashboard:
   - Cloud Name
   - API Key
   - API Secret

### 1.3 Email Setup (Gmail)

1. Go to Google Account → Security
2. Enable 2-Step Verification
3. App Passwords → Generate
4. Copy the 16-character password

### 1.4 Generate JWT Secret

Already generated for you:
```
6e3695a2a48934021b5a70a740f283c8244b84fa657172604015607cee31a2fc2b26fda8e27074cb4a050db861a2ec36f47d998326b6ee177cfd0ead1b4a9e3b
```

Save this - you'll need it!

---

## ✅ Step 2: Deploy to Vercel (5 minutes)

Run this command:
```powershell
.\deploy-full.ps1
```

Or manually:
```powershell
vercel --yes
```

**Note the deployment URL** - you'll need it for environment variables!

---

## ✅ Step 3: Set Environment Variables (10 minutes)

### Option A: Use the Script (Easier)
```powershell
.\setup-env-vars.ps1
```

### Option B: Manual Setup via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:

#### Database Variables:
```
DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=offisho_transport
```

#### JWT Variables:
```
JWT_SECRET=6e3695a2a48934021b5a70a740f283c8244b84fa657172604015607cee31a2fc2b26fda8e27074cb4a050db861a2ec36f47d998326b6ee177cfd0ead1b4a9e3b
JWT_EXPIRES_IN=24h
```

#### Cloudinary Variables (REQUIRED):
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Email Variables:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### URL Variables (Use your Vercel URLs):
```
FRONTEND_URL=https://your-project.vercel.app
BACKEND_URL=https://your-project.vercel.app
REACT_APP_API_URL=https://your-project.vercel.app/api
NODE_ENV=production
```

**Important**: Replace `your-project.vercel.app` with your actual Vercel deployment URL!

---

## ✅ Step 4: Run Database Schema (5 minutes)

Choose one method from `SETUP_DATABASE.md`:

### Quick Method - Using MySQL Client:
```bash
mysql -h your-host -u your-user -p your-database < database/schema.sql
```

### Or use MySQL Workbench/DBeaver:
1. Connect to your database
2. Open `database/schema.sql`
3. Copy and paste into SQL editor
4. Execute

---

## ✅ Step 5: Redeploy with Environment Variables (2 minutes)

```powershell
vercel --prod
```

---

## ✅ Step 6: Verify Deployment

1. **Check Frontend**: Visit `https://your-project.vercel.app`
2. **Check Backend**: Visit `https://your-project.vercel.app/api/health`
3. **Test API**: Should return `{"status":"ok","message":"Offisho Transport API is running"}`

---

## 🎉 You're Done!

Your app should now be live at:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-project.vercel.app/api`

---

## 🆘 Troubleshooting

### Database Connection Issues
- Verify credentials are correct
- Check if database allows external connections
- For PlanetScale: Make sure you're using the correct branch

### File Upload Issues
- **CRITICAL**: Cloudinary must be configured
- Check Cloudinary environment variables
- Verify Cloudinary credentials are correct

### CORS Issues
- Update `FRONTEND_URL` in environment variables
- Make sure it matches your Vercel URL exactly

### 404 on API Routes
- Check `vercel.json` configuration
- Verify routes are correct
- Check deployment logs in Vercel dashboard

---

**Need help?** Check the detailed guides:
- `SETUP_SERVICES.md` - Service setup details
- `SETUP_DATABASE.md` - Database setup methods
- `BACKEND_DEPLOYMENT.md` - Backend deployment details
