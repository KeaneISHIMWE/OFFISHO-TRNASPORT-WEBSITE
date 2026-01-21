# 🔐 Add These to Vercel - Step by Step

Go to: **https://vercel.com/keaneishimwes-projects/backend/settings/environment-variables**

## ⚠️ First: Get Public Hostname

The host `mysql.railway.internal` won't work from Vercel. You need the public hostname:

1. In Railway, click your **MySQL** service
2. Go to **"Settings"** tab
3. Look for **"Public Networking"** or **"Connect"**
4. Copy the public hostname (looks like `xxxxx.railway.app`)

---

## Add These Variables (Click "Add New" for each):

### 1. Database Variables

```
Name: DB_HOST
Value: [Public hostname from Railway - NOT mysql.railway.internal]
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: DB_PORT
Value: 3306
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: DB_USER
Value: root
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: DB_PASSWORD
Value: ffGxCnVTjWQDnigoherljSbUymgIEpOQ
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: DB_NAME
Value: railway
Environment: ✅ Production ✅ Preview ✅ Development
```

### 2. Cloudinary Variables

```
Name: CLOUDINARY_CLOUD_NAME
Value: dtcufr7mc
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: CLOUDINARY_API_KEY
Value: 574829165463277
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: CLOUDINARY_API_SECRET
Value: VBnQk722oYi_MC1pOXhlddhnKbQ
Environment: ✅ Production ✅ Preview ✅ Development
```

### 3. JWT Variables

```
Name: JWT_SECRET
Value: 6e3695a2a48934021b5a70a740f283c8244b84fa657172604015607cee31a2fc2b26fda8e27074cb4a050db861a2ec36f47d998326b6ee177cfd0ead1b4a9e3b
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: JWT_EXPIRES_IN
Value: 24h
Environment: ✅ Production ✅ Preview ✅ Development
```

### 4. Email Variables (Gmail)

```
Name: EMAIL_HOST
Value: smtp.gmail.com
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: EMAIL_PORT
Value: 587
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: EMAIL_USER
Value: [Your Gmail address]
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: EMAIL_PASS
Value: [Your Gmail app password - see note below]
Environment: ✅ Production ✅ Preview ✅ Development
```

**To get Gmail app password:**
- Google Account → Security → 2-Step Verification (enable if needed)
- App Passwords → Generate → Copy 16-character password

### 5. URL Variables

```
Name: FRONTEND_URL
Value: https://backend-three-gamma-69.vercel.app
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: BACKEND_URL
Value: https://backend-three-gamma-69.vercel.app
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: REACT_APP_API_URL
Value: https://backend-three-gamma-69.vercel.app/api
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: NODE_ENV
Value: production
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: VERCEL
Value: 1
Environment: ✅ Production ✅ Preview ✅ Development
```

---

## After Adding All Variables

1. Click **"Save"** (if there's a save button)
2. Go to **"Deployments"** tab
3. Click **"..."** on latest deployment
4. Click **"Redeploy"**

Or run: `vercel --prod`

---

## ⚠️ Important Reminder

**DB_HOST must be the PUBLIC hostname from Railway Settings**, not `mysql.railway.internal`!
