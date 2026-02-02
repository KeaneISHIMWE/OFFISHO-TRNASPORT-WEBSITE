# ⚡ Quick Connect Guide: Vercel Frontend → Railway Backend

## 🎯 What You Need

1. **Railway Backend URL** (get from Railway dashboard)
2. **Vercel Project** (already deployed ✅)

---

## 📋 Step-by-Step Instructions

### 1️⃣ Get Railway Backend URL

**In Railway Dashboard:**
1. Go to: https://railway.app
2. Click your **backend service** (Node.js service)
3. Click **"Settings"** tab
4. Find **"Public Domain"** section
5. Copy the URL (e.g., `https://offisho-backend.up.railway.app`)

**Don't have a domain?**
- Click **"Generate Domain"** button
- Railway will create one automatically

---

### 2️⃣ Set Vercel Environment Variable

**In Vercel Dashboard:**
1. Go to: https://vercel.com
2. Click project: **offisho-trnasport-website**
3. **Settings** → **Environment Variables**
4. Click **"Add New"**

**Add this variable:**
```
Name: REACT_APP_API_URL
Value: https://YOUR-RAILWAY-URL.up.railway.app/api
Environment: ✅ Production ✅ Preview ✅ Development
```

**⚠️ Important:**
- Replace `YOUR-RAILWAY-URL` with your actual Railway URL
- **Must include `/api` at the end**
- Use `https://` (not `http://`)

**Example:**
```
REACT_APP_API_URL=https://offisho-backend-production.up.railway.app/api
```

---

### 3️⃣ Set Railway CORS Variable

**In Railway Dashboard:**
1. Go to your **backend service**
2. Click **"Variables"** tab
3. Click **"New Variable"**

**Add this variable:**
```
Name: FRONTEND_URL
Value: https://offisho-trnasport-website-six.vercel.app
Environment: Production
```

**For preview deployments too:**
```
Name: FRONTEND_URL
Value: https://offisho-trnasport-website-six.vercel.app,https://offisho-trnasport-website-git-*.vercel.app
```

---

### 4️⃣ Redeploy Everything

**Vercel:**
- Go to **Deployments** → Click **"Redeploy"** on latest
- OR run: `vercel --prod`

**Railway:**
- Click **"Redeploy"** button in Railway dashboard
- OR push a commit to trigger redeploy

---

### 5️⃣ Test It!

**Test Backend:**
```bash
curl https://YOUR-RAILWAY-URL.up.railway.app/api/health
```

**Expected:**
```json
{"status":"ok","message":"Offisho Transport API is running"}
```

**Test Frontend:**
1. Visit: https://offisho-trnasport-website-six.vercel.app/
2. Open browser console (F12)
3. Check for errors
4. Server status should be "Online" ✅

---

## 🐛 Troubleshooting

### "Server Offline" Still Showing?

**Check Browser Console (F12):**
- Look for CORS errors → Update Railway `FRONTEND_URL`
- Look for 404 errors → Check `REACT_APP_API_URL` ends with `/api`
- Look for network errors → Verify Railway URL is correct

**Check Railway Logs:**
- Railway Dashboard → Backend Service → Logs
- Look for CORS or connection errors

**Verify Variables:**
- Vercel: `REACT_APP_API_URL` = `https://YOUR-RAILWAY-URL/api`
- Railway: `FRONTEND_URL` = `https://offisho-trnasport-website-six.vercel.app`

---

## ✅ Quick Checklist

- [ ] Got Railway backend URL
- [ ] Set `REACT_APP_API_URL` in Vercel (with `/api`)
- [ ] Set `FRONTEND_URL` in Railway
- [ ] Redeployed Vercel
- [ ] Redeployed Railway
- [ ] Tested backend health endpoint
- [ ] Frontend shows "Server Online"

---

## 💡 Need Help?

**Share your Railway backend URL and I'll help configure it!**

The URL should look like:
- `https://something.up.railway.app`
- `https://something-production.up.railway.app`
- `https://something.railway.app`
