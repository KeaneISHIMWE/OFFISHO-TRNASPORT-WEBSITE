# 🔧 Vercel Database Setup - Your Railway Credentials

## ⚠️ Important: Internal vs Public URL

Your connection string uses **`mysql.railway.internal`** - this is **INTERNAL** and only works inside Railway!

**For Vercel, you need the PUBLIC hostname.**

---

## Step 1: Get Public Hostname from Railway

1. Go to **Railway Dashboard**: https://railway.app
2. Click on your **MySQL service** (the database, not backend)
3. Click **"Settings"** tab
4. Look for **"Public Networking"** or **"Connect"** section
5. Find **"Public Hostname"** or **"Public Domain"**
6. Copy it (should look like: `containers-us-west-xxx.railway.app`)

**Example:**
```
containers-us-west-123.railway.app
```

**OR** it might be in the **"Variables"** tab as `MYSQLHOST` (public version)

---

## Step 2: Add Environment Variables to Vercel

Go to: **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

### Add These Variables:

```env
Name: DB_HOST
Value: [YOUR-PUBLIC-HOSTNAME].railway.app
(Replace with actual public hostname from Railway)
Environment: ✅ Production ✅ Preview ✅ Development

Name: DB_PORT
Value: 3306
Environment: ✅ Production ✅ Preview ✅ Development

Name: DB_USER
Value: root
Environment: ✅ Production ✅ Preview ✅ Development

Name: DB_PASSWORD
Value: VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV
Environment: ✅ Production ✅ Preview ✅ Development

Name: DB_NAME
Value: railway
Environment: ✅ Production ✅ Preview ✅ Development
```

---

## Step 3: Also Set Frontend/Backend URLs

While you're in Vercel environment variables, also add:

```env
Name: REACT_APP_API_URL
Value: https://YOUR-RAILWAY-BACKEND-URL.up.railway.app/api
(Get this from Railway → Backend Service → Settings → Public Domain)
Environment: ✅ Production ✅ Preview ✅ Development

Name: FRONTEND_URL
Value: https://offisho-trnasport-website-six.vercel.app
Environment: ✅ Production ✅ Preview ✅ Development
```

---

## Step 4: Update Railway Backend CORS

**In Railway Dashboard** → Backend Service → **Variables**:

```env
Name: FRONTEND_URL
Value: https://offisho-trnasport-website-six.vercel.app
Environment: Production
```

---

## Step 5: Redeploy

1. **Vercel**: Go to Deployments → Click "Redeploy"
2. **Railway Backend**: Click "Redeploy" button

---

## 🔍 How to Find Public Hostname

### Option 1: Railway Settings
1. Railway → MySQL Service → **Settings**
2. Look for **"Public Networking"** section
3. Find **"Public Hostname"**

### Option 2: Railway Variables
1. Railway → MySQL Service → **Variables** tab
2. Look for `MYSQLHOST` - it might show the public hostname
3. If it shows `mysql.railway.internal`, you need to enable public networking

### Option 3: Enable Public Networking
1. Railway → MySQL Service → **Settings**
2. Find **"Public Networking"** toggle
3. Enable it if disabled
4. Copy the generated public hostname

---

## ✅ Quick Checklist

- [ ] Got PUBLIC hostname from Railway MySQL Settings
- [ ] Set `DB_HOST` in Vercel (public hostname, NOT `mysql.railway.internal`)
- [ ] Set `DB_PORT` = `3306`
- [ ] Set `DB_USER` = `root`
- [ ] Set `DB_PASSWORD` = `VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV`
- [ ] Set `DB_NAME` = `railway`
- [ ] Set `REACT_APP_API_URL` (Railway backend URL + `/api`)
- [ ] Set `FRONTEND_URL` in Railway backend
- [ ] Redeployed Vercel
- [ ] Redeployed Railway backend

---

## 🐛 Troubleshooting

### "Can't connect to database"
- ✅ Make sure `DB_HOST` uses PUBLIC hostname (not `mysql.railway.internal`)
- ✅ Check Railway MySQL has public networking enabled
- ✅ Verify all credentials are correct

### "Access denied"
- ✅ Username: `root`
- ✅ Password: `VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV`
- ✅ Database: `railway`

### "Host not found"
- ✅ Make sure you copied PUBLIC hostname
- ✅ Check Railway MySQL service is running
- ✅ Verify public networking is enabled

---

## 📝 Summary

**Your Credentials:**
- User: `root`
- Password: `VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV`
- Port: `3306`
- Database: `railway`
- Host: **[NEED PUBLIC HOSTNAME FROM RAILWAY]** ⚠️

**Next Step:** Get the public hostname from Railway MySQL Settings and update `DB_HOST` in Vercel!
