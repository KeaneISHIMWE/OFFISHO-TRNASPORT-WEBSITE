# 🔧 Railway Nixpacks Build Error - Fix Guide

## 🎯 Problem
Railway build error: `error: undefined variable 'nodejs-20_x'`

This happens when `nixpacks.toml` has incorrect syntax for Node.js version.

---

## ✅ Solution Applied

**Removed `nixpacks.toml`** - Railway will auto-detect Node.js from `package.json`

Railway automatically detects:
- Node.js version from `package.json` → `"engines": { "node": "20.x" }`
- Build command from `package.json` → `"build": "tsc"`
- Start command from `package.json` → `"start": "node dist/server.js"`

---

## 🔧 Railway Configuration

Your `railway.toml` is correct and will be used:

```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "node dist/server.js"
healthcheckPath = "/api/health"
```

---

## 📋 What Railway Will Do Now

1. **Detect Node.js 20** from `package.json` engines
2. **Run**: `npm install` (installs dependencies)
3. **Run**: `npm run build` (compiles TypeScript)
4. **Start**: `node dist/server.js` (runs server)

---

## 🚀 Next Steps

1. **Commit the changes** (removed nixpacks.toml)
2. **Push to GitHub** (if using GitHub deployment)
3. **Redeploy** in Railway
4. **Check logs** - should build successfully now

---

## 🐛 If Still Fails

### Option 1: Let Railway Auto-Detect (Recommended)
- Remove `nixpacks.toml` ✅ (Done)
- Railway will auto-detect from `package.json`

### Option 2: Use Dockerfile
Create `backend/Dockerfile`:
```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["node", "dist/server.js"]
```

### Option 3: Simplify railway.toml
Make sure `railway.toml` is simple:
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "node dist/server.js"
```

---

## ✅ Expected Result

After redeploying, logs should show:

```
[build] Detecting Node.js version...
[build] Using Node.js 20.x
[build] Installing dependencies...
[build] Building application...
[build] Build completed successfully
[deploy] Starting application...
[deploy] Server is running on port 5000
```

---

## 📝 Summary

- ✅ Removed `nixpacks.toml` (was causing build errors)
- ✅ Railway will auto-detect Node.js from `package.json`
- ✅ `railway.toml` will handle build/start commands
- ✅ `package.json` has correct engines and scripts

**Redeploy and Railway should build successfully!** 🚀
