# 🛠️ Service Setup Guide

## Step 1: Set Up MySQL Database (FREE)

### Railway (Recommended - Completely Free) ⭐

1. **Sign Up**
   - Go to https://railway.app
   - Sign up with GitHub (free account, no credit card needed)

2. **Create Database**
   - Click "New Project"
   - Click "Provision MySQL"
   - Wait ~30 seconds for database to be created

3. **Get Connection Details**
   - Click on MySQL service
   - Go to "Variables" tab
   - Copy these values:
     - **MYSQLHOST** = DB_HOST
     - **MYSQLUSER** = DB_USER
     - **MYSQLPASSWORD** = DB_PASSWORD
     - **MYSQLDATABASE** = DB_NAME
     - **MYSQLPORT** = DB_PORT (usually 3306)

4. **Connection Details Format**
   ```
   Host: xxxxxx.railway.app
   Username: root (or from MYSQLUSER)
   Password: [from MYSQLPASSWORD]
   Database: railway (or offisho_transport)
   Port: 3306
   ```

**Note**: Railway gives $5 free credit monthly - more than enough for a small database!

### Alternative: Render

1. **Sign Up**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create Project**
   - Click "New Project"
   - Select "Provision MySQL"
   - Wait for database to be created

3. **Get Connection Details**
   - Click on MySQL service
   - Go to "Variables" tab
   - Note:
     - MYSQLHOST (host)
     - MYSQLUSER (username)
     - MYSQLPASSWORD (password)
     - MYSQLDATABASE (database name)
     - MYSQLPORT (port, usually 3306)

### Option C: Render

1. **Sign Up**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Database**
   - Click "New +" → "PostgreSQL" (or MySQL if available)
   - Name: `offisho-transport`
   - Plan: Free tier available

3. **Get Connection Details**
   - Click on your database
   - Find "Connections" section
   - Note connection details

---

## Step 2: Set Up Cloudinary (REQUIRED)

1. **Sign Up**
   - Go to https://cloudinary.com
   - Click "Sign Up for Free"
   - Create account (free tier available)

2. **Get Credentials**
   - After signup, you'll see the Dashboard
   - Copy these values:
     - **Cloud Name** (e.g., `dxxxxx`)
     - **API Key** (e.g., `123456789012345`)
     - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

3. **Save Credentials**
   - You'll need these for Vercel environment variables

---

## Step 3: Email Service Setup

### Using Gmail

1. **Enable App Password**
   - Go to Google Account settings
   - Security → 2-Step Verification (enable if not already)
   - App passwords → Generate app password
   - Select "Mail" and "Other (Custom name)"
   - Name it "Offisho Transport"
   - Copy the generated password

2. **Use These Settings**
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password (16 characters)
   ```

### Using Other SMTP Services

- **SendGrid**: https://sendgrid.com
- **Mailgun**: https://mailgun.com
- **AWS SES**: https://aws.amazon.com/ses/

---

## Step 4: Generate JWT Secret

Run this command to generate a secure JWT secret:

```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Save the output - you'll need it for `JWT_SECRET`.

---

## ✅ Checklist

Before deploying, make sure you have:

- [ ] MySQL database created and connection details saved
- [ ] Cloudinary account created and credentials saved
- [ ] Email service configured (Gmail app password or other)
- [ ] JWT secret generated
- [ ] All credentials ready to paste into Vercel

---

**Next Step**: Deploy to Vercel and configure environment variables!
