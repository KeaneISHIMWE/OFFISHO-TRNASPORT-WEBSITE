# 🔧 Railway Backend "Application Failed to Respond" - Fix Guide

## 🎯 Problem
Railway shows: **"Application failed to respond"** when visiting `offishotransport-backend.up.railway.app`

This means the backend application is **crashing on startup** or **failing to build**.

---

## 🔍 Step 1: Check Railway Logs

**This is the MOST IMPORTANT step!**

1. Go to **Railway Dashboard**: https://railway.app
2. Click on your **backend service** (`offishotransport-backend`)
3. Click on **"Logs"** tab
4. Look for **error messages** - they will tell you exactly what's wrong

**Common errors you might see:**

### Error: "Cannot find module"
- **Fix**: Dependencies not installed correctly
- **Solution**: Check `package.json` and ensure build completes

### Error: "Database connection failed"
- **Fix**: Database credentials missing or incorrect
- **Solution**: Set environment variables (see Step 2)

### Error: "Port already in use" or "EADDRINUSE"
- **Fix**: Port configuration issue
- **Solution**: Railway sets PORT automatically, don't hardcode it

### Error: "Build failed"
- **Fix**: TypeScript compilation errors
- **Solution**: Check build logs for TypeScript errors

---

## 🔧 Step 2: Set Required Environment Variables

Go to **Railway Dashboard** → Backend Service → **"Variables"** tab

### Required Variables:

```env
# Database Connection (use PUBLIC hostname, not mysql.railway.internal)
DB_HOST=containers-us-west-xxx.railway.app
(Get from Railway MySQL → Settings → Public Networking)

DB_PORT=3306

DB_USER=root

DB_PASSWORD=VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV

DB_NAME=railway

# Frontend URL (for CORS)
FRONTEND_URL=https://offisho-trnasport-website-six.vercel.app

# Node Environment
NODE_ENV=production

# Port (Railway sets this automatically, but you can set it)
PORT=5000
```

**⚠️ Important:**
- `DB_HOST` must be the **PUBLIC hostname** from Railway MySQL Settings
- NOT `mysql.railway.internal` (that's internal only)
- Get public hostname from: Railway → MySQL Service → Settings → Public Networking

---

## 🔧 Step 3: Verify Build Configuration

Your `railway.toml` looks correct:
```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "npm start"
healthcheckPath = "/api/health"
```

**Make sure:**
- ✅ `npm run build` completes successfully (compiles TypeScript)
- ✅ `npm start` runs `node dist/server.js`
- ✅ `dist/server.js` exists after build

---

## 🔧 Step 4: Check Database Connection

The backend needs to connect to MySQL. Verify:

1. **MySQL Service is Running:**
   - Railway Dashboard → MySQL Service
   - Should show "Running" status

2. **Database Credentials:**
   - Railway → MySQL Service → Variables
   - Copy `MYSQLHOST` (public version)
   - Copy `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`

3. **Set in Backend Variables:**
   - Railway → Backend Service → Variables
   - Set `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

---

## 🔧 Step 5: Test Health Endpoint

Once backend is running, test:

```bash
curl https://offishotransport-backend.up.railway.app/api/health
```

**Expected Response:**
```json
{"status":"ok","message":"Offisho Transport API is running"}
```

---

## 🐛 Common Issues & Fixes

### Issue 1: Build Fails
**Symptoms:** Logs show TypeScript errors
**Fix:**
- Check `backend/tsconfig.json` is correct
- Ensure all dependencies are in `package.json`
- Check for syntax errors in TypeScript files

### Issue 2: Database Connection Fails
**Symptoms:** Logs show "MySQL connection error"
**Fix:**
- ✅ Use PUBLIC hostname (not `mysql.railway.internal`)
- ✅ Verify all DB_* variables are set
- ✅ Check MySQL service is running
- ✅ Verify credentials are correct

### Issue 3: Port Issues
**Symptoms:** "Port already in use" or app doesn't start
**Fix:**
- Railway sets `PORT` automatically
- Don't hardcode port in code
- Use `process.env.PORT || 5000`

### Issue 4: Missing Dependencies
**Symptoms:** "Cannot find module 'xxx'"
**Fix:**
- Check `package.json` has all dependencies
- Ensure `npm install` runs during build
- Check `devDependencies` vs `dependencies`

### Issue 5: CORS Errors (after backend starts)
**Symptoms:** Frontend can't connect
**Fix:**
- Set `FRONTEND_URL` in Railway backend variables
- Include your Vercel frontend URL
- Redeploy backend

---

## 📋 Quick Checklist

- [ ] Checked Railway logs for errors
- [ ] Set `DB_HOST` (PUBLIC hostname from MySQL Settings)
- [ ] Set `DB_PORT` = `3306`
- [ ] Set `DB_USER` = `root`
- [ ] Set `DB_PASSWORD` = `VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV`
- [ ] Set `DB_NAME` = `railway`
- [ ] Set `FRONTEND_URL` = `https://offisho-trnasport-website-six.vercel.app`
- [ ] Set `NODE_ENV` = `production`
- [ ] Verified MySQL service is running
- [ ] Redeployed backend service
- [ ] Tested `/api/health` endpoint

---

## 🚀 Next Steps

1. **Check Railway Logs** (most important!)
2. **Set environment variables** (especially DB_HOST with public hostname)
3. **Redeploy backend**
4. **Test health endpoint**

**Share the Railway logs and I'll help debug the specific error!** 🔍
