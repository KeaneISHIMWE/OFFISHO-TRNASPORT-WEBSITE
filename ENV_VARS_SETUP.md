# 🔐 Environment Variables Setup Guide

Your backend is deployed at: **https://backend-three-gamma-69.vercel.app**

## Step 1: Go to Vercel Dashboard

1. Visit: https://vercel.com/keaneishimwes-projects/backend/settings
2. Click on **"Environment Variables"** in the left sidebar

## Step 2: Add Environment Variables

Click **"Add New"** for each variable below:

### Database Variables

```
Name: DB_HOST
Value: [Your MySQL host from PlanetScale/Railway]
Environment: Production, Preview, Development (select all)

Name: DB_PORT
Value: 3306
Environment: Production, Preview, Development

Name: DB_USER
Value: [Your MySQL username]
Environment: Production, Preview, Development

Name: DB_PASSWORD
Value: [Your MySQL password]
Environment: Production, Preview, Development

Name: DB_NAME
Value: offisho_transport
Environment: Production, Preview, Development
```

### JWT Variables

```
Name: JWT_SECRET
Value: 6e3695a2a48934021b5a70a740f283c8244b84fa657172604015607cee31a2fc2b26fda8e27074cb4a050db861a2ec36f47d998326b6ee177cfd0ead1b4a9e3b
Environment: Production, Preview, Development

Name: JWT_EXPIRES_IN
Value: 24h
Environment: Production, Preview, Development
```

### Cloudinary Variables (REQUIRED)

```
Name: CLOUDINARY_CLOUD_NAME
Value: [Your Cloudinary cloud name]
Environment: Production, Preview, Development

Name: CLOUDINARY_API_KEY
Value: [Your Cloudinary API key]
Environment: Production, Preview, Development

Name: CLOUDINARY_API_SECRET
Value: [Your Cloudinary API secret]
Environment: Production, Preview, Development
```

### Email Variables

```
Name: EMAIL_HOST
Value: smtp.gmail.com
Environment: Production, Preview, Development

Name: EMAIL_PORT
Value: 587
Environment: Production, Preview, Development

Name: EMAIL_USER
Value: [Your email address]
Environment: Production, Preview, Development

Name: EMAIL_PASS
Value: [Your Gmail app password or email password]
Environment: Production, Preview, Development
```

### URL Variables

```
Name: FRONTEND_URL
Value: https://backend-three-gamma-69.vercel.app
Environment: Production, Preview, Development

Name: BACKEND_URL
Value: https://backend-three-gamma-69.vercel.app
Environment: Production, Preview, Development

Name: REACT_APP_API_URL
Value: https://backend-three-gamma-69.vercel.app/api
Environment: Production, Preview, Development

Name: NODE_ENV
Value: production
Environment: Production, Preview, Development

Name: VERCEL
Value: 1
Environment: Production, Preview, Development
```

## Step 3: Save and Redeploy

After adding all variables:

1. Click **"Save"**
2. Go to **"Deployments"** tab
3. Click the **"..."** menu on the latest deployment
4. Click **"Redeploy"**

Or run from command line:
```powershell
vercel --prod
```

## Quick Copy-Paste Template

Copy this and fill in your values:

```
DB_HOST=
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=offisho_transport
JWT_SECRET=6e3695a2a48934021b5a70a740f283c8244b84fa657172604015607cee31a2fc2b26fda8e27074cb4a050db861a2ec36f47d998326b6ee177cfd0ead1b4a9e3b
JWT_EXPIRES_IN=24h
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=
FRONTEND_URL=https://backend-three-gamma-69.vercel.app
BACKEND_URL=https://backend-three-gamma-69.vercel.app
REACT_APP_API_URL=https://backend-three-gamma-69.vercel.app/api
NODE_ENV=production
VERCEL=1
```

---

**After setting variables, proceed to database setup!**
