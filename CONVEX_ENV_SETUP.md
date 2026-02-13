# Convex Environment Variables Setup

## Required Environment Variables

You need to set these in the Convex Dashboard:
**URL:** https://dashboard.convex.dev/d/vivid-kookabura-368/settings/environment-variables

### 1. Authentication
```
AUTH_SECRET=your-random-secret-key-here-change-in-production
```
Generate a secure random string for this value.

### 2. SMTP Email Configuration
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=keaneishimwe@gmail.com
SMTP_PASS=mytc rgrj caux eriw
```

### 3. Cloudinary Configuration
```
CLOUDINARY_CLOUD_NAME=dtcufr7mc
CLOUDINARY_API_KEY=574829165463277
CLOUDINARY_API_SECRET=VBnQk722oYi_MC1pOXhlddhnKbQ
```

### 4. Admin Email (Optional)
```
ADMIN_EMAIL_SECONDARY=keaneishimwe@gmail.com
```


## How to Set Environment Variables

1. Go to: https://dashboard.convex.dev/d/vivid-kookabura-368/settings/environment-variables
2. Click "Add Environment Variable"
3. Enter the variable name and value
4. Click "Save"
5. Repeat for all variables above

## After Setting Variables

Run:
```bash
npx convex dev
```

The Convex functions should deploy successfully.

## Frontend Environment Variables

Update `frontend/.env.local`:
```
VITE_CONVEX_URL=https://vivid-kookabura-368.convex.cloud
```

This is already set in the root `.env.local` file.
