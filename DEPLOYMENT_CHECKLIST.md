# ✅ Deployment Checklist

Use this checklist to track your deployment progress.

## Pre-Deployment Setup

- [ ] **MySQL Database Created**
  - [ ] PlanetScale account created
  - [ ] Database `offisho_transport` created
  - [ ] Connection details saved:
    - [ ] Host: `_________________`
    - [ ] Username: `_________________`
    - [ ] Password: `_________________`
    - [ ] Database: `offisho_transport`
    - [ ] Port: `3306`

- [ ] **Cloudinary Account Created** (REQUIRED)
  - [ ] Account created at cloudinary.com
  - [ ] Credentials saved:
    - [ ] Cloud Name: `_________________`
    - [ ] API Key: `_________________`
    - [ ] API Secret: `_________________`

- [ ] **Email Service Configured**
  - [ ] Gmail app password generated OR
  - [ ] Other SMTP service configured
  - [ ] Credentials saved:
    - [ ] Email: `_________________`
    - [ ] Password/App Password: `_________________`

- [ ] **JWT Secret Generated**
  - [ ] Secret saved: `6e3695a2a48934021b5a70a740f283c8244b84fa657172604015607cee31a2fc2b26fda8e27074cb4a050db861a2ec36f47d998326b6ee177cfd0ead1b4a9e3b`

## Deployment Steps

- [ ] **Step 1: Deploy to Vercel**
  - [ ] Run: `.\deploy-full.ps1` or `vercel --yes`
  - [ ] Deployment URL saved: `https://_________________.vercel.app`

- [ ] **Step 2: Set Environment Variables**
  - [ ] Go to Vercel Dashboard → Project → Settings → Environment Variables
  - [ ] Database variables set:
    - [ ] DB_HOST
    - [ ] DB_PORT
    - [ ] DB_USER
    - [ ] DB_PASSWORD
    - [ ] DB_NAME
  - [ ] JWT variables set:
    - [ ] JWT_SECRET
    - [ ] JWT_EXPIRES_IN
  - [ ] Cloudinary variables set:
    - [ ] CLOUDINARY_CLOUD_NAME
    - [ ] CLOUDINARY_API_KEY
    - [ ] CLOUDINARY_API_SECRET
  - [ ] Email variables set:
    - [ ] EMAIL_HOST
    - [ ] EMAIL_PORT
    - [ ] EMAIL_USER
    - [ ] EMAIL_PASS
  - [ ] URL variables set (use your Vercel URL):
    - [ ] FRONTEND_URL
    - [ ] BACKEND_URL
    - [ ] REACT_APP_API_URL
    - [ ] NODE_ENV

- [ ] **Step 3: Run Database Schema**
  - [ ] Connected to MySQL database
  - [ ] Ran `database/schema.sql`
  - [ ] Verified tables created:
    - [ ] users
    - [ ] cars
    - [ ] requests
    - [ ] contact_messages

- [ ] **Step 4: Redeploy**
  - [ ] Run: `vercel --prod`
  - [ ] Deployment successful

- [ ] **Step 5: Verify**
  - [ ] Frontend loads: `https://_________________.vercel.app`
  - [ ] API health check works: `https://_________________.vercel.app/api/health`
  - [ ] Returns: `{"status":"ok","message":"Offisho Transport API is running"}`

## Post-Deployment

- [ ] **Create Admin User**
  - [ ] Use registration endpoint or admin script
  - [ ] Admin account created and tested

- [ ] **Test Features**
  - [ ] User registration/login works
  - [ ] Car listing displays
  - [ ] File upload works (Cloudinary)
  - [ ] Booking requests work
  - [ ] Admin dashboard accessible

## Your Deployment URLs

- **Frontend**: `https://_________________.vercel.app`
- **Backend API**: `https://_________________.vercel.app/api`
- **Health Check**: `https://_________________.vercel.app/api/health`

---

**Save this checklist and check off items as you complete them!**
