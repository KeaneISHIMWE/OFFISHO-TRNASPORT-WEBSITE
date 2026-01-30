# Railway Deployment Fix - Final Configuration

## Summary
This document outlines the final fixes applied to ensure successful Railway deployment and dropdown visibility.

## Railway Compatibility Fixes

### 1. Port Typing ✅
**File:** `backend/src/server.ts`
```typescript
// Before: const PORT = parseInt(process.env.PORT || '5000', 10);
// After:
const PORT = Number(process.env.PORT) || 5000;
```
- Ensures PORT is always a number type
- Handles Railway's PORT environment variable correctly

### 2. Host Binding ✅
**File:** `backend/src/server.ts`
```typescript
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
```
- Binds to `0.0.0.0` instead of default `localhost`
- Allows Railway to route external traffic correctly

### 3. Build Configuration ✅

#### `backend/railway.toml`
```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "npm start"
healthcheckPath = "/api/health"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

#### `backend/nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ["nodejs-20_x"]

[phases.install]
cmds = ["npm ci --production=false"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "node dist/server.js"
```

**Key Points:**
- Explicit build command ensures TypeScript compilation
- `npm ci --production=false` installs dev dependencies needed for build
- Direct `node dist/server.js` start command for reliability
- Health check timeout increased to 300ms

## Dropdown Visibility Fix

### Issue
Event Type dropdown (and other dropdowns) had white text on light background, making options invisible.

### Solution
**File:** `frontend/src/index.css`

1. **Changed background color to darker theme:**
   - Changed from `#1C2637` to `#1a1a1a` for better contrast
   - Applied to all `select option` elements

2. **Enhanced CSS specificity:**
   - Added `!important` flags to override browser defaults
   - Added browser-specific fixes for Chrome, Firefox, Safari

3. **Added scrollbar styling:**
   - Custom scrollbar for dropdown lists
   - Dark theme consistent with options

### CSS Changes Applied:
```css
select option {
  background-color: #1a1a1a !important;
  color: #FFFFFF !important;
  /* ... other styles ... */
}
```

## Data Flow Validation

### Phone Number in Email Template ✅
**File:** `backend/src/utils/email.ts`

The email template correctly displays phone numbers:
```html
<p class="contact-info">
  <span class="contact-label">Phone:</span> ${phoneDisplay}
</p>
```

Where `phoneDisplay` is:
- Phone number if available
- "Not provided" (styled in grey) if null/undefined

**Verification:**
- ✅ Phone number retrieved from database query
- ✅ Properly handled for null/undefined values
- ✅ Displayed in Customer Information section
- ✅ Error handling prevents crashes

## Build Verification

### TypeScript Compilation
```bash
cd backend
npm run build
```
✅ **Status:** Compiles successfully with no errors

### Expected Railway Build Process
1. Railway detects `nixpacks.toml` or `railway.toml`
2. Runs `npm ci --production=false` (installs all dependencies)
3. Runs `npm run build` (compiles TypeScript)
4. Starts with `node dist/server.js`
5. Health check at `/api/health` (300ms timeout)

## Testing Checklist

- [ ] Railway deployment succeeds (green status)
- [ ] Health check endpoint responds: `GET /api/health`
- [ ] Event Type dropdown shows white text on dark background
- [ ] Request Type dropdown shows white text on dark background
- [ ] Payment Method dropdown shows white text on dark background
- [ ] Email includes phone number in Customer Information section
- [ ] No console errors in browser
- [ ] No server errors in Railway logs

## Files Modified

1. `backend/src/server.ts` - PORT typing and host binding
2. `backend/railway.toml` - Build configuration
3. `backend/nixpacks.toml` - Explicit build steps
4. `frontend/src/index.css` - Dropdown visibility fixes
5. `backend/src/utils/email.ts` - Phone number handling (already fixed)

## Deployment Notes

- Railway will automatically detect and use `nixpacks.toml` if present
- The build command ensures TypeScript is compiled before starting
- Server binds to `0.0.0.0` to accept external connections
- Health check timeout allows for cold starts
