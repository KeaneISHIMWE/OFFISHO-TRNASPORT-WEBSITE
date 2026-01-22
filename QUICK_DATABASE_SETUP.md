# 🚀 Quick Database Setup Guide

## Problem
Your `.env` file has placeholder database credentials, causing "Database connection failed" errors.

## ⚡ Fastest Solution: Railway (Free Cloud Database)

### Step 1: Create Railway Account (2 minutes)

1. Go to: https://railway.app
2. Click **"Start a New Project"**
3. Sign up with GitHub (easiest) or email

### Step 2: Create MySQL Database (1 minute)

1. In Railway dashboard, click **"New"** → **"Database"** → **"Add MySQL"**
2. Wait for it to provision (about 30 seconds)
3. Click on the MySQL service

### Step 3: Get Connection Details (1 minute)

1. Click the **"Variables"** tab
2. You'll see these variables:
   - `MYSQLHOST` (this is your DB_HOST)
   - `MYSQLPORT` (usually 3306)
   - `MYSQLUSER` (this is your DB_USER)
   - `MYSQLPASSWORD` (this is your DB_PASSWORD)
   - `MYSQLDATABASE` (usually "railway")

**Copy these values!**

### Step 4: Create Your Database Schema

1. Click the **"Data"** tab in Railway
2. Click **"Query"** 
3. Copy and paste the contents of `database/schema.sql`
4. Click **"Run"**

**OR** use MySQL command line:
```bash
mysql -h [MYSQLHOST] -P [MYSQLPORT] -u [MYSQLUSER] -p[MYSQLPASSWORD] [MYSQLDATABASE] < database/schema.sql
```

### Step 5: Update Your `.env` File

Open `backend/.env` and replace the database section with:

```env
# Database Configuration
DB_HOST=[paste MYSQLHOST here]
DB_PORT=3306
DB_USER=[paste MYSQLUSER here]
DB_PASSWORD=[paste MYSQLPASSWORD here]
DB_NAME=railway
```

**Example:**
```env
DB_HOST=containers-us-west-123.railway.app
DB_PORT=3306
DB_USER=root
DB_PASSWORD=abc123xyz
DB_NAME=railway
```

### Step 6: Restart Backend

```powershell
cd backend
npm start
```

You should see:
```
✅ MySQL database connected successfully
   Database: railway
   Host: containers-us-west-123.railway.app:3306
```

### Step 7: Create Admin User

```powershell
cd backend
npm run create-admin
```

Or manually register through the website.

---

## 🔄 Alternative: Local MySQL (If you prefer)

### Install MySQL

**Option A: XAMPP (Easiest)**
1. Download: https://www.apachefriends.org/
2. Install and start MySQL from XAMPP Control Panel
3. Default credentials:
   - Host: `localhost`
   - Port: `3306`
   - User: `root`
   - Password: (empty/blank)

**Option B: MySQL Installer**
1. Download: https://dev.mysql.com/downloads/installer/
2. Install MySQL Server
3. Set a root password during installation

### Create Database

```sql
CREATE DATABASE offisho_transport CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Run Schema

```powershell
mysql -u root -p offisho_transport < database/schema.sql
```

### Update `.env`

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=offisho_transport
```

---

## ✅ Verification

After setup, test the connection:

1. **Check backend logs** - Should show: `✅ MySQL database connected successfully`
2. **Try login** - Should work (or show "Invalid email/password" if no user exists)
3. **Create admin** - Run `npm run create-admin` in backend folder

---

## 🆘 Troubleshooting

### "Cannot connect to database server"
- Check if Railway MySQL is running (should be automatic)
- Verify DB_HOST and DB_PORT are correct
- Check firewall/VPN settings

### "Authentication failed"
- Double-check DB_USER and DB_PASSWORD
- Make sure you copied the exact values from Railway

### "Database does not exist"
- Run `database/schema.sql` in Railway Query tab
- Or create database manually: `CREATE DATABASE railway;`

### Still having issues?
- Check backend console for detailed error messages
- Verify all 5 DB_* variables are set correctly
- Make sure you restarted the backend after updating `.env`

---

**Recommended:** Use Railway for fastest setup! 🚀
