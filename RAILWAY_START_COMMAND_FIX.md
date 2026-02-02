# 🔧 Railway "No Start Command Found" - Fix Guide

## 🎯 Problem
Railway error: **"No start command was found"**

This happens when Railway can't find how to start your application.

---

## ✅ Solution Applied

I've updated your configuration files:

1. ✅ Updated `railway.toml` - Changed startCommand to explicit path
2. ✅ Created `Procfile` - Fallback for Railway to detect start command
3. ✅ Verified `package.json` has start script

---

## 🔧 Step 1: Set Root Directory in Railway

**This is the MOST IMPORTANT step!**

1. Go to **Railway Dashboard** → Your Backend Service
2. Click **"Settings"** tab
3. Find **"Root Directory"** or **"Source"** section
4. Set it to: `backend`
5. Save changes

**Why?** Railway needs to know to look in the `backend` folder for `package.json`.

---

## 🔧 Step 2: Verify Configuration

Your `package.json` has:
```json
{
  "scripts": {
    "start": "node dist/server.js"
  },
  "main": "dist/server.js"
}
```

This is correct! ✅

---

## 🔧 Step 3: Check Build Process

Railway needs to:
1. ✅ Run `npm install` (installs dependencies)
2. ✅ Run `npm run build` (compiles TypeScript → creates `dist/server.js`)
3. ✅ Run `npm start` or `node dist/server.js` (starts server)

**Make sure:**
- Build completes successfully (check build logs)
- `dist/server.js` exists after build
- No TypeScript compilation errors

---

## 🔧 Step 4: Redeploy

After setting root directory:

1. Railway Dashboard → Backend Service
2. Click **"Redeploy"** button
3. Watch the logs:
   - Should see: "Installing dependencies"
   - Should see: "Building application"
   - Should see: "Starting application"
   - Should see: "Server is running on port XXXX"

---

## 🐛 Troubleshooting

### Issue: Still says "No start command found"

**Fix 1: Check Root Directory**
- Railway → Settings → Root Directory = `backend`
- Save and redeploy

**Fix 2: Check Build Logs**
- Railway → Logs → Look for build errors
- If build fails, `dist/server.js` won't exist
- Fix build errors first

**Fix 3: Verify package.json Location**
- Make sure `backend/package.json` exists
- Railway should find it in root directory

**Fix 4: Use Explicit Start Command**
- Railway → Settings → Deploy → Start Command
- Set to: `node dist/server.js`
- Or: `npm start`

---

## 📋 Quick Checklist

- [ ] Set Root Directory to `backend` in Railway Settings
- [ ] Verified `backend/package.json` exists
- [ ] Verified `backend/package.json` has `"start"` script
- [ ] Checked build logs - build completes successfully
- [ ] Verified `dist/server.js` exists after build
- [ ] Redeployed backend service
- [ ] Checked logs - see "Server is running"

---

## 🎯 Next Steps

1. **Set Root Directory** to `backend` in Railway Settings
2. **Redeploy** the backend service
3. **Check logs** - should see server starting
4. **Test endpoint**: `https://offishotransport-backend.up.railway.app/api/health`

---

## 💡 Alternative: Use Railway CLI

If Railway web UI doesn't work, use CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Set root directory
railway variables set RAILWAY_ROOT_DIR=backend

# Deploy
railway up
```

---

## ✅ Expected Result

After fixing, Railway logs should show:

```
[build] Installing dependencies...
[build] Building application...
[build] Build completed successfully
[deploy] Starting application...
[deploy] Server is running on port 5000
```

And the health endpoint should work:
```bash
curl https://offishotransport-backend.up.railway.app/api/health
# Should return: {"status":"ok","message":"Offisho Transport API is running"}
```

**Set the Root Directory to `backend` and redeploy!** 🚀
