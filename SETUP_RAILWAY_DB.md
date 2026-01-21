# 🚂 Set Up Free MySQL Database on Railway

Railway offers a **completely free** MySQL database (with $5 monthly credit that's more than enough for small projects).

## Step-by-Step Guide

### Step 1: Sign Up
1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub (recommended) or email
4. Verify your email if needed

### Step 2: Create MySQL Database
1. Once logged in, click **"New Project"**
2. Click **"Provision MySQL"** (or search for MySQL in the template gallery)
3. Wait ~30 seconds for Railway to create your database

### Step 3: Get Connection Details
1. Click on the **MySQL** service in your project
2. Go to the **"Variables"** tab
3. You'll see these environment variables:
   - `MYSQLHOST` - This is your **DB_HOST**
   - `MYSQLUSER` - This is your **DB_USER**
   - `MYSQLPASSWORD` - This is your **DB_PASSWORD**
   - `MYSQLDATABASE` - This is your **DB_NAME** (usually `railway`)
   - `MYSQLPORT` - This is your **DB_PORT** (usually `3306`)

### Step 4: Copy Values
Copy each value - you'll need them for Vercel environment variables:

```
DB_HOST = [Value from MYSQLHOST]
DB_PORT = 3306
DB_USER = [Value from MYSQLUSER]
DB_PASSWORD = [Value from MYSQLPASSWORD]
DB_NAME = [Value from MYSQLDATABASE]
```

**Important**: The database name might be `railway` or something else. You can either:
- Use the name Railway gives you, OR
- Create a new database called `offisho_transport` (see Step 5)

### Step 5: Create Database (Optional)
If Railway didn't create a database named `offisho_transport`, you can create it:

1. Click on MySQL service
2. Go to **"Data"** tab
3. Click **"Query"** or use a MySQL client
4. Run:
```sql
CREATE DATABASE IF NOT EXISTS offisho_transport;
```

Or you can use the database name Railway provides and update your schema accordingly.

### Step 6: Enable Public Access (For Schema Setup)
1. Go to MySQL service → **"Settings"**
2. Enable **"Public Networking"** (if available)
3. This allows you to connect from your computer to run the schema

**Alternative**: Use Railway's built-in MySQL client or connect via their web interface.

## Connection String Format

Your connection details will look like:
```
Host: xxxxxx.railway.app (or similar)
Port: 3306
Username: root (or similar)
Password: [random password Railway generated]
Database: railway (or offisho_transport if you created it)
```

## Free Tier Limits

- **$5 free credit per month** (plenty for a small database)
- **No credit card required** for free tier
- **512MB RAM** for MySQL (enough for small apps)
- **1GB storage** (plenty for most projects)

## Next Steps

After getting your Railway database credentials:
1. Add them to Vercel environment variables (see `WHAT_TO_DO_NOW.md`)
2. Run database schema (see `SETUP_DATABASE.md`)
3. Redeploy your app

---

**Need help?** Railway has great documentation: https://docs.railway.app
