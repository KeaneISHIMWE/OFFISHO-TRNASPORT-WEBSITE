# 🔍 How to Find Backend Logs on Railway

## ⚠️ Important: You're Looking at MySQL Logs

The logs you shared are from the **MySQL service**, not the backend application. MySQL is running fine ✅

We need to find the **backend application logs** to see why it's failing.

---

## Step 1: Check if Backend Service Exists

1. Go to **Railway Dashboard**: https://railway.app
2. Look at your **project** (should show multiple services)
3. You should see:
   - ✅ **MySQL** service (database) - This is running
   - ❓ **Backend/Node.js** service - This is what we need to check

**Do you see a separate backend service?**
- If **YES** → Go to Step 2
- If **NO** → Go to Step 3 (Backend not deployed yet!)

---

## Step 2: View Backend Service Logs

1. Click on your **Backend/Node.js service** (NOT MySQL)
2. Click on **"Logs"** tab
3. Look for errors like:
   - "Cannot find module"
   - "Database connection error"
   - "Port already in use"
   - "Build failed"
   - "TypeScript errors"

**These logs will tell us exactly what's wrong!**

---

## Step 3: Backend Service Not Found?

If you don't see a backend service, you need to **deploy it**:

### Option A: Deploy from GitHub (Recommended)

1. Railway Dashboard → **"New"** → **"GitHub Repo"**
2. Select your repository
3. Railway will detect it's a Node.js app
4. Set the **Root Directory** to `backend` (if needed)
5. Railway will auto-detect build settings
6. Add environment variables (see below)

### Option B: Deploy from Local

1. Install Railway CLI: `npm i -g @railway/cli`
2. Run: `railway login`
3. Run: `railway init`
4. Run: `railway up`

---

## Step 4: Required Environment Variables

Once backend service is created, set these variables:

**Railway → Backend Service → Variables:**

```env
DB_HOST=[Public hostname from MySQL Settings]
DB_PORT=3306
DB_USER=root
DB_PASSWORD=VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV
DB_NAME=railway
FRONTEND_URL=https://offisho-trnasport-website-six.vercel.app
NODE_ENV=production
```

**To get DB_HOST:**
1. Railway → MySQL Service → **Settings**
2. Find **"Public Networking"** section
3. Copy the **public hostname** (not `mysql.railway.internal`)

---

## Step 5: Check Backend Service Status

After deploying, check:

1. **Service Status:**
   - Should show "Running" (green)
   - If "Failed" or "Stopped" → Check logs

2. **Public Domain:**
   - Railway → Backend Service → **Settings**
   - Should show: `offishotransport-backend.up.railway.app`
   - If not, click **"Generate Domain"**

3. **Health Check:**
   ```bash
   curl https://offishotransport-backend.up.railway.app/api/health
   ```

---

## 🐛 Common Issues

### Issue: "No backend service found"
**Solution:** Deploy backend service from GitHub or Railway CLI

### Issue: "Build failed"
**Solution:** Check build logs for TypeScript errors

### Issue: "Database connection failed"
**Solution:** Set DB_* environment variables with PUBLIC hostname

### Issue: "Port already in use"
**Solution:** Railway sets PORT automatically, don't hardcode it

---

## 📋 Quick Checklist

- [ ] Found backend service in Railway dashboard
- [ ] Viewed backend service logs (not MySQL logs)
- [ ] Checked for error messages in logs
- [ ] Set all required environment variables
- [ ] Backend service shows "Running" status
- [ ] Public domain is configured
- [ ] Tested `/api/health` endpoint

---

## 🎯 Next Steps

1. **Check if backend service exists** in Railway dashboard
2. **If exists:** View its logs and share the errors
3. **If not exists:** Deploy backend service from GitHub
4. **Set environment variables** (especially DB_HOST with public hostname)
5. **Redeploy and test**

**Share the backend service logs (not MySQL logs) and I'll help fix the specific error!** 🔍
