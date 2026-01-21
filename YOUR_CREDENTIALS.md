# 🔐 Your Credentials - Save This!

## Cloudinary Credentials ✅

```
CLOUDINARY_CLOUD_NAME=dtcufr7mc
CLOUDINARY_API_KEY=574829165463277
CLOUDINARY_API_SECRET=VBnQk722oYi_MC1pOXhlddhnKbQ
```

## Next: Set Up Free MySQL Database

Use **Railway** (completely free for small projects):

1. Go to: https://railway.app
2. Sign up with GitHub (free)
3. Click "New Project"
4. Click "Provision MySQL"
5. Wait for database to be created
6. Click on the MySQL service
7. Go to "Variables" tab
8. Copy these values:
   - **MYSQLHOST** = Your DB_HOST
   - **MYSQLUSER** = Your DB_USER
   - **MYSQLPASSWORD** = Your DB_PASSWORD
   - **MYSQLDATABASE** = Your DB_NAME
   - **MYSQLPORT** = Usually 3306

---

## Environment Variables to Add in Vercel

Go to: https://vercel.com/keaneishimwes-projects/backend/settings/environment-variables

### Cloudinary (Already have these):
```
CLOUDINARY_CLOUD_NAME=dtcufr7mc
CLOUDINARY_API_KEY=574829165463277
CLOUDINARY_API_SECRET=VBnQk722oYi_MC1pOXhlddhnKbQ
```

### Database (Get from Railway):
```
DB_HOST=[From Railway MYSQLHOST]
DB_PORT=3306
DB_USER=[From Railway MYSQLUSER]
DB_PASSWORD=[From Railway MYSQLPASSWORD]
DB_NAME=[From Railway MYSQLDATABASE]
```

### JWT:
```
JWT_SECRET=6e3695a2a48934021b5a70a740f283c8244b84fa657172604015607cee31a2fc2b26fda8e27074cb4a050db861a2ec36f47d998326b6ee177cfd0ead1b4a9e3b
JWT_EXPIRES_IN=24h
```

### Email (Gmail):
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=[Your Gmail]
EMAIL_PASS=[Gmail app password]
```

### URLs:
```
FRONTEND_URL=https://backend-three-gamma-69.vercel.app
BACKEND_URL=https://backend-three-gamma-69.vercel.app
REACT_APP_API_URL=https://backend-three-gamma-69.vercel.app/api
NODE_ENV=production
VERCEL=1
```
