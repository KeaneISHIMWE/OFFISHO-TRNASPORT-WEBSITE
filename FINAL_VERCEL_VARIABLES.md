# ✅ Final Vercel Environment Variables

Go to: **https://vercel.com/keaneishimwes-projects/backend/settings/environment-variables**

Click **"Add New"** for each variable below:

---

## Database Variables

```
Name: DB_HOST
Value: metro.proxy.rlwy.net
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: DB_PORT
Value: 39210
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

---

## Cloudinary Variables

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

---

## JWT Variables

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

---

## Email Variables (Gmail)

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
Value: [Your Gmail address - fill this in]
Environment: ✅ Production ✅ Preview ✅ Development
```

```
Name: EMAIL_PASS
Value: [Your Gmail app password - fill this in]
Environment: ✅ Production ✅ Preview ✅ Development
```

**To get Gmail app password:**
- Go to Google Account → Security
- Enable 2-Step Verification (if not enabled)
- App Passwords → Generate
- Copy the 16-character password

---

## URL Variables

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

1. Make sure all variables are saved
2. Go to **"Deployments"** tab
3. Click **"..."** on the latest deployment
4. Click **"Redeploy"**

**OR** run this command:
```powershell
vercel --prod
```

---

## Next Step: Run Database Schema

After redeploying, you need to run the database schema. See `SETUP_DATABASE.md` for instructions.
