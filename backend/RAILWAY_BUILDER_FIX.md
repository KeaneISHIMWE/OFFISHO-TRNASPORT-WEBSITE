# Railway Builder Configuration - Permanent Fix

## Problem
Railway Nixpacks generates broken Nix expressions with `nodejs-20_x` undefined.

## Solution: Force Dockerfile Builder

Railway will use Dockerfile instead of auto-generating Nixpacks config.

### Files Created/Updated:

1. **`Dockerfile`** - Multi-stage build with Node.js 20
2. **`railway.toml`** - Explicitly sets builder to DOCKERFILE
3. **`.railwayignore`** - Prevents Railway from regenerating .nixpacks

### Railway Settings:

In Railway Dashboard → Backend Service → Settings:

1. **Builder**: Set to "Dockerfile" (or leave auto-detect)
2. **Root Directory**: Set to `backend`
3. **Dockerfile Path**: `backend/Dockerfile` (if root directory is project root)

### Environment Variable (Alternative):

If Railway still tries Nixpacks, set in Railway Variables:

```
RAILWAY_BUILDER=DOCKERFILE
```

## Verification

After deployment, check logs:
- Should see: "Building Docker image..."
- Should NOT see: "Using Nixpacks builder"
- Should NOT see: ".nixpacks" directory being created

## Why This Works

1. **Dockerfile** explicitly uses `node:20-alpine` (official image, always available)
2. **railway.toml** forces Dockerfile builder
3. **.railwayignore** prevents Nixpacks regeneration
4. **Multi-stage build** optimizes image size while keeping dev dependencies for build

## Future-Proof

- Dockerfile uses official Node.js images (maintained by Docker)
- No dependency on Railway's Nixpacks version
- Works regardless of Railway updates
- Can be tested locally: `docker build -t backend .`
