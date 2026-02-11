# 🔧 Fix for AUTH_SECRET_1 Error

## The Issue
Convex Auth is looking for `AUTH_SECRET_1` but you have `AUTH_SECRET`.

## The Solution

Convex Auth uses indexed environment variables for secrets. Since you're using the Password provider, it expects:
- `AUTH_SECRET_1` for the first provider

### Quick Fix Steps:

1. **Go to Convex Dashboard**: https://dashboard.convex.dev/d/vivid-kookabura-368/settings/environment-variables

2. **Add a NEW variable**:
   - Click "Add"
   - Name: `JWKS`
   - Value: (leave empty or use the same value as AUTH_SECRET)

OR simpler:

3. **Rename your AUTH_SECRET**:
   - Delete the current `AUTH_SECRET` variable
   - Add a new one:
     - Name: `CONVEX_SITE_URL`
     - Value: `https://vivid-kookabura-368.convex.site`

Actually, the SIMPLEST solution:

4. **Just add AUTH_SECRET_1**:
   - Keep your existing `AUTH_SECRET`
   - Add a NEW variable:
     - Name: `AUTH_SECRET_1`
     - Value: `1KMlZAJpDaWg42e06smLXqGT5obcQF9w` (same as your AUTH_SECRET)

## Why This Happens

Convex Auth indexes secrets by provider. Since Password is the first (and only) provider in your config, it looks for `AUTH_SECRET_1`.

## After Adding AUTH_SECRET_1

Watch your `npx convex dev` terminal. You should see:
```
✔ Convex functions ready!
```

Then we can continue with the remaining frontend files!

---

**ACTION**: Add the `AUTH_SECRET_1` variable in Convex dashboard now!
