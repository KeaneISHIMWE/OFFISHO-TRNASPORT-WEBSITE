# Force Railway to Use Dockerfile

## Problem
Railway is still using Nixpacks (running `npm ci`) instead of Dockerfile.

## Solution: Set Builder in Railway Dashboard

### Step 1: Go to Railway Settings
1. Railway Dashboard → Backend Service
2. Click **"Settings"** tab
3. Find **"Build & Deploy"** section

### Step 2: Set Builder to Dockerfile
1. Find **"Builder"** dropdown
2. Select **"Dockerfile"** (NOT "Nixpacks" or "Auto")
3. **Dockerfile Path**: `Dockerfile` (or `backend/Dockerfile` if root is project root)
4. **Root Directory**: `backend`
5. Click **"Save"**

### Step 3: Clear Cache and Redeploy
1. Click **"Clear Build Cache"**
2. Click **"Redeploy"**

## Verification
After redeploying, logs should show:
- ✅ "Building Docker image..."
- ✅ "npm install" (NOT "npm ci")
- ❌ NOT "Using Nixpacks builder"

## If Still Fails
1. Delete the service
2. Create new service from GitHub
3. Set Root Directory = `backend`
4. Set Builder = `Dockerfile` immediately
5. Deploy
