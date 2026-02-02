# 🔗 Connect Vercel Frontend to Railway Backend

## Current Status
- ✅ Frontend deployed: `https://offisho-trnasport-website-six.vercel.app/`
- ⚠️ Backend on Railway (need URL)
- ❌ Frontend showing "Server Offline"

## Step 1: Get Your Railway Backend URL

1. Go to **Railway Dashboard**: https://railway.app
2. Click on your **backend service** (the Node.js/Express service, not MySQL)
3. Click on the **"Settings"** tab
4. Look for **"Public Domain"** or **"Generate Domain"**
5. Copy the URL (should look like: `https://your-backend-name.up.railway.app`)

**Example Railway backend URL:**
```
https://offisho-backend-production.up.railway.app
```

---

## Step 2: Update Vercel Environment Variables

1. Go to **Vercel Dashboard**: https://vercel.com
2. Click on your project: **offisho-trnasport-website**
3. Go to **Settings** → **Environment Variables**
4. Add/Update these variables:

### Required Variables:

```env
Name: REACT_APP_API_URL
Value: https://YOUR-RAILWAY-BACKEND-URL.up.railway.app/api
Environment: ✅ Production ✅ Preview ✅ Development
```

**Example:**
```
REACT_APP_API_URL=https://offisho-backend-production.up.railway.app/api
```

**Important Notes:**
- ✅ Include `/api` at the end
- ✅ Use `https://` (not `http://`)
- ✅ Use the PUBLIC Railway URL (not internal)

---

## Step 3: Update Railway Backend CORS

Your Railway backend needs to allow requests from your Vercel frontend.

1. Go to **Railway Dashboard** → Your Backend Service
2. Go to **Variables** tab
3. Add/Update this variable:

```env
Name: FRONTEND_URL
Value: https://offisho-trnasport-website-six.vercel.app
Environment: ✅ Production ✅ Preview ✅ Development
```

**Or update multiple frontend URLs (for preview deployments):**

```env
Name: FRONTEND_URL
Value: https://offisho-trnasport-website-six.vercel.app,https://offisho-trnasport-website-git-*.vercel.app
```

---

## Step 4: Redeploy Both Services

### Redeploy Vercel Frontend:
```bash
# Option 1: Via Vercel Dashboard
# Go to Deployments → Click "Redeploy" on latest deployment

# Option 2: Via CLI
vercel --prod
```

### Redeploy Railway Backend:
1. Go to Railway Dashboard → Your Backend Service
2. Click **"Redeploy"** button (or push a commit to trigger redeploy)

---

## Step 5: Verify Connection

### Test Backend Health:
```bash
curl https://YOUR-RAILWAY-BACKEND-URL.up.railway.app/api/health
```

**Expected Response:**
```json
{"status":"ok","message":"Offisho Transport API is running"}
```

### Test Frontend:
1. Visit: https://offisho-trnasport-website-six.vercel.app/
2. Check browser console (F12) for any errors
3. Server status should show "Online" ✅

---

## Troubleshooting

### Still Showing "Server Offline"?

1. **Check Browser Console (F12):**
   - Look for CORS errors
   - Look for network errors
   - Check what URL it's trying to connect to

2. **Verify Environment Variables:**
   - Vercel: Check `REACT_APP_API_URL` is set correctly
   - Railway: Check `FRONTEND_URL` includes your Vercel URL

3. **Check Railway Backend Logs:**
   - Railway Dashboard → Backend Service → Logs
   - Look for CORS errors or connection issues

4. **Test Backend Directly:**
   ```bash
   # Test health endpoint
   curl https://YOUR-RAILWAY-BACKEND-URL.up.railway.app/api/health
   
   # Test from browser
   # Open: https://YOUR-RAILWAY-BACKEND-URL.up.railway.app/api/health
   ```

5. **Common Issues:**

   **CORS Error:**
   - ✅ Make sure `FRONTEND_URL` in Railway includes your Vercel URL
   - ✅ Redeploy Railway backend after updating CORS

   **404 Not Found:**
   - ✅ Make sure `REACT_APP_API_URL` ends with `/api`
   - ✅ Check Railway backend is running

   **Network Error:**
   - ✅ Verify Railway backend URL is correct
   - ✅ Check Railway backend is deployed and running
   - ✅ Check Railway logs for errors

---

## Quick Checklist

- [ ] Got Railway backend URL
- [ ] Set `REACT_APP_API_URL` in Vercel (with `/api` suffix)
- [ ] Set `FRONTEND_URL` in Railway (your Vercel URL)
- [ ] Redeployed Vercel frontend
- [ ] Redeployed Railway backend
- [ ] Tested backend health endpoint
- [ ] Checked browser console for errors
- [ ] Server status shows "Online"

---

## Need Your Railway Backend URL?

If you can't find it:
1. Railway Dashboard → Your Backend Service
2. Look for "Public Domain" or "Generate Domain"
3. If no domain exists, click "Generate Domain"
4. Copy the URL

**Share your Railway backend URL and I'll help you configure it!** 🚀
