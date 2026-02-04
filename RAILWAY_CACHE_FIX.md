# Railway Cache Issue - npm ci Still Running

## Problem
Railway is still running `npm ci` even though Dockerfile uses `npm install`. This is a **build cache issue**.

## Solution: Clear Railway Build Cache

### Step 1: Clear Build Cache in Railway
1. Go to **Railway Dashboard** → Backend Service
2. Click **"Settings"** tab
3. Scroll to **"Build Cache"** section
4. Click **"Clear Build Cache"** button
5. Click **"Redeploy"**

### Step 2: Verify Dockerfile is Correct
Current Dockerfile uses:
- `npm install` (builder stage)
- `npm install --omit=dev` (runtime stage)
- **NO** `npm ci` commands

### Step 3: Force Railway to Use Dockerfile
In Railway Dashboard → Backend Service → Settings:
- **Builder**: Set to "Dockerfile" (not "Nixpacks" or "Auto")
- **Dockerfile Path**: `backend/Dockerfile` (or `Dockerfile` if root directory is backend)

## Alternative: Delete and Recreate Service
If cache clearing doesn't work:
1. Railway Dashboard → Backend Service → Settings
2. Delete the service
3. Create new service from same GitHub repo
4. Set Root Directory to `backend`
5. Set Builder to "Dockerfile"

## Verification
After clearing cache and redeploying, logs should show:
- ✅ "Installing dependencies..." (npm install)
- ❌ NOT "npm ci" anywhere
