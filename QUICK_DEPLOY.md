# Quick Vercel Deployment Guide - Full Stack

## 🚀 Deploy Frontend + Backend in 5 Steps

### Step 1: Complete Vercel Login
If not already logged in:
```powershell
vercel login
```
A browser window will open for authentication.

### Step 2: Set Up Database
Choose one:
- **PlanetScale** (recommended): https://planetscale.com
- **Railway**: https://railway.app
- **Render**: https://render.com

Create a MySQL database and note the connection details.

### Step 3: Set Up Cloudinary (Required for File Uploads)
1. Sign up at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret

### Step 4: Deploy to Vercel
Run the full deployment script:
```powershell
.\deploy-full.ps1
```

Or deploy manually:
```powershell
vercel --yes
```

### Step 5: Configure Environment Variables
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Add these variables:**

#### Database
```
DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=offisho_transport
```

#### Authentication
```
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
```

#### Cloudinary (REQUIRED)
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Email
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

#### URLs (Set after first deployment)
```
FRONTEND_URL=https://your-project.vercel.app
BACKEND_URL=https://your-project.vercel.app
REACT_APP_API_URL=https://your-project.vercel.app/api
NODE_ENV=production
```

### Step 6: Run Database Schema
Connect to your MySQL database and run:
```bash
mysql -h your-host -u your-user -p your-database < database/schema.sql
```

### Step 7: Redeploy
After setting environment variables:
```powershell
vercel --prod
```

## 📝 Important Notes

- **Cloudinary is REQUIRED** - File uploads won't work without it on Vercel
- **Database must be accessible** from Vercel's servers
- **Update URLs** after first deployment with your actual Vercel URLs
- **CORS** is automatically configured via FRONTEND_URL

## 🔗 Your Deployment Links

After deployment:
- **Frontend**: `https://your-project-name.vercel.app`
- **Backend API**: `https://your-project-name.vercel.app/api`

## 🐛 Troubleshooting

- **Database connection issues**: Check credentials and ensure database allows Vercel IPs
- **File upload fails**: Verify Cloudinary is configured
- **CORS errors**: Update FRONTEND_URL in environment variables
- **404 on API routes**: Check vercel.json routes configuration

---

**Need detailed help?** 
- Frontend: Check `VERCEL_DEPLOYMENT.md`
- Backend: Check `BACKEND_DEPLOYMENT.md`
