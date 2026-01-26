# ✅ What You Need To Do - Simple Checklist

Your backend is already deployed! Now follow these steps:

## 🎯 Step 1: Set Up Cloudinary (5 minutes) - REQUIRED

1. Go to https://cloudinary.com
2. Click "Sign Up for Free"
3. Create account (free tier is fine)
4. After signup, you'll see your Dashboard
5. Copy these 3 values:
   - **Cloud Name** (e.g., `dxxxxx`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)
6. **Save these** - you'll need them in Step 3

---

## 🎯 Step 2: Set Up MySQL Database (10 minutes) - FREE

Use **Railway** (completely free for small projects):

1. Go to https://railway.app
2. Sign up with GitHub (free account)
3. Click "New Project"
4. Click "Provision MySQL"
5. Wait for database to be created (takes ~30 seconds)
6. Click on the MySQL service
7. Go to "Variables" tab
8. Copy these values:
   - **MYSQLHOST** = This is your DB_HOST
   - **MYSQLUSER** = This is your DB_USER
   - **MYSQLPASSWORD** = This is your DB_PASSWORD
   - **MYSQLDATABASE** = This is your DB_NAME
   - **MYSQLPORT** = Usually 3306
9. **Save these** - you'll need them in Step 3

**Note**: Railway gives you $5 free credit monthly, which is more than enough for a small database!

---

## 🎯 Step 3: Set Environment Variables in Vercel (10 minutes)

1. **Go to this link**: https://vercel.com/keaneishimwes-projects/backend/settings/environment-variables

2. **Click "Add New"** for each variable below:

### Database Variables:
```
Name: DB_HOST
Value: [Paste your database host from Step 2]
Environment: ✅ Production ✅ Preview ✅ Development

Name: DB_PORT
Value: 3306
Environment: ✅ Production ✅ Preview ✅ Development

Name: DB_USER
Value: [Paste your database username]
Environment: ✅ Production ✅ Preview ✅ Development

Name: DB_PASSWORD
Value: [Paste your database password]
Environment: ✅ Production ✅ Preview ✅ Development

Name: DB_NAME
Value: offisho_transport
Environment: ✅ Production ✅ Preview ✅ Development
```

### JWT Variables:
```
Name: JWT_SECRET
Value: 6e3695a2a48934021b5a70a740f283c8244b84fa657172604015607cee31a2fc2b26fda8e27074cb4a050db861a2ec36f47d998326b6ee177cfd0ead1b4a9e3b
Environment: ✅ Production ✅ Preview ✅ Development

Name: JWT_EXPIRES_IN
Value: 24h
Environment: ✅ Production ✅ Preview ✅ Development
```

### Cloudinary Variables (Already have these!):
```
Name: =lkjskfdtcufr7mcdtcufr7mc
Value: dtcufr7mc
Environment: ✅ Production ✅ Preview ✅ Development

Name: CLOUDINARY_API_KEY
Value: `574829165463277`
Environment: ✅ Production ✅ Preview ✅ Development

Name: CLOUDINARY_API_SECRET
Value: VBnQk722oYi_MC1pOXhlddhnKbQ
Environment: ✅ Production ✅ Preview ✅ Development
```

### Email Variables (Gmail):
```
Name: EMAIL_HOST
Value: EMAIL_HOSTEMAIL_HOST
Environment: ✅ Production ✅ Preview ✅ Development

Name: EMAIL_PORT
Value: 587
Environment: ✅ Production ✅ Preview ✅ Development

Name: EMAIL_USER
Value: [Your Gmail address]
Environment: ✅ Production ✅ Preview ✅ Development

Name: EMAIL_PASS
Value: [Your Gmail app password - see note below]
Environment: ✅ Production ✅ Preview ✅ Development
```

**To get Gmail app password:**
- Go to Google Account → Security
- Enable 2-Step Verification (if not enabled)
- Go to App Passwords → Generate
- Copy the 16-character password

### URL Variables:
```
Name: FRONTEND_URL
Value: https://backend-three-gamma-69.vercel.app
Environment: ✅ Production ✅ Preview ✅ Development

Name: BACKEND_URL
Value: https://backend-three-gamma-69.vercel.app
Environment: ✅ Production ✅ Preview ✅ Development

Name: REACT_APP_API_URL
Value: https://backend-three-gamma-69.vercel.app/api
Environment: ✅ Production ✅ Preview ✅ Development

Name: NODE_ENV
Value: production
Environment: ✅ Production ✅ Preview ✅ Development

Name: VERCEL
Value: 1
Environment: ✅ Production ✅ Preview ✅ Development
```

3. **Click "Save"** after adding each variable

---

## 🎯 cd 
### Method 2: Using MySQL Workbench or DBeaver
1. Connect to your database using credentials from Step 2
2. Open file: `database/schema.sql`
3. Copy all contents
4. Paste into SQL editor
5. Execute/Run

### Method 3: Using PlanetScale Console
1. Go to your PlanetScale dashboard
2. Click on your database
3. Click "Console" tab
4. Copy contents of `database/schema.sql`
5. Paste and run

---

## 🎯 Step 5: Redeploy (2 minutes)

After setting all environment variables:

1. Go to: https://vercel.com/keaneishimwes-projects/backend/deployments
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**

**OR** run this command:
```powershell
vercel --prod
```

---

## 🎯 Step 6: Test It! (2 minutes)

1. **Check API**: https://backend-three-gamma-69.vercel.app/api/health
   - Should return: `{"status":"ok","message":"Offisho Transport API is running"}`

2. **Check API Info**: https://backend-three-gamma-69.vercel.app/api
   - Should show API endpoints

---

## ✅ Summary

Do these 6 steps in order:
1. ✅ Set up Cloudinary → Get credentials
2. ✅ Set up MySQL database → Get credentials  
3. ✅ Add all environment variables in Vercel
4. ✅ Run database schema
5. ✅ Redeploy
6. ✅ Test!

---

## 🆘 Need Help?

- **Can't find something?** Check `SETUP_SERVICES.md` for detailed instructions
- **Environment variables?** Check `ENV_VARS_SETUP.md`
- **Database setup?** Check `SETUP_DATABASE.md`

---

**Your deployment URL**: https://backend-three-gamma-69.vercel.app

**Start with Step 1: Set up Cloudinary!** 🚀
