# 🔗 Railway Database: Internal vs Public Connection

## ⚠️ Important: You Have an INTERNAL Connection String

Your connection string:
```
mysql://root:VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV@mysql.railway.internal:3306/railway
```

**This is INTERNAL** (`mysql.railway.internal`) - it only works **inside Railway**, not from Vercel!

---

## ✅ What You Need: PUBLIC Hostname

For Vercel to connect, you need the **PUBLIC hostname** from Railway.

### Step 1: Get Public Hostname from Railway

1. Go to **Railway Dashboard**: https://railway.app
2. Click on your **MySQL service** (not the backend service)
3. Click on **"Settings"** tab
4. Look for **"Public Networking"** section
5. Find **"Public Hostname"** or **"Public Domain"**
6. Copy it (should look like: `containers-us-west-xxx.railway.app` or `xxxxx.railway.app`)

**Example public hostname:**
```
containers-us-west-123.railway.app
```

---

## Step 2: Update Vercel Environment Variables

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

### Database Connection Variables:

```env
Name: DB_HOST
Value: containers-us-west-123.railway.app
(Use YOUR public hostname from Railway)
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

## Step 3: Connection String Format

**For Vercel (PUBLIC):**
```
mysql://root:VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV@PUBLIC-HOSTNAME.railway.app:3306/railway
```

**Replace `PUBLIC-HOSTNAME` with your actual public hostname from Railway Settings.**

---

## 🔍 How to Find Public Hostname

### Method 1: Railway Dashboard
1. Railway → MySQL Service → **Settings**
2. Look for **"Public Networking"** or **"Public Domain"**
3. Copy the hostname

### Method 2: Railway Variables
1. Railway → MySQL Service → **Variables** tab
2. Look for variables like:
   - `MYSQLHOST` (might show public hostname)
   - `PUBLIC_HOSTNAME`
   - `PUBLIC_DOMAIN`

### Method 3: Railway CLI
```bash
railway variables
```

---

## ⚠️ Common Issues

### "Can't connect to database"
- ✅ Make sure you're using **PUBLIC hostname**, not `mysql.railway.internal`
- ✅ Check Railway MySQL service is running
- ✅ Verify port is `3306`

### "Access denied"
- ✅ Verify username is `root`
- ✅ Verify password is correct: `VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV`
- ✅ Check database name is `railway`

### "Host not found"
- ✅ Make sure you copied the PUBLIC hostname (not internal)
- ✅ Check Railway MySQL has public networking enabled

---

## 📋 Quick Checklist

- [ ] Got PUBLIC hostname from Railway MySQL Settings
- [ ] Set `DB_HOST` in Vercel (public hostname)
- [ ] Set `DB_PORT` = `3306`
- [ ] Set `DB_USER` = `root`
- [ ] Set `DB_PASSWORD` = `VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV`
- [ ] Set `DB_NAME` = `railway`
- [ ] Redeployed Vercel

---

## 🎯 Next Steps

1. **Get public hostname** from Railway MySQL Settings
2. **Update Vercel environment variables** with public hostname
3. **Redeploy Vercel** to apply changes
4. **Test connection** - check Vercel function logs

**Share your Railway MySQL PUBLIC hostname and I'll help configure it!** 🚀
