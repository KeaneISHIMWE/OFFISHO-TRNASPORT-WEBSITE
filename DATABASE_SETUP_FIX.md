# 🔧 Database Setup - Fix Login Error

## Problem
The "Internal server error" on login is caused by **missing database credentials**. Your `.env` file currently has placeholder values.

## Quick Fix

### Option 1: Local MySQL Database (For Development)

1. **Install MySQL** (if not already installed):
   - Download: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP/WAMP which includes MySQL

2. **Create Database**:
   ```sql
   CREATE DATABASE offisho_transport CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Run Schema**:
   ```bash
   mysql -u root -p offisho_transport < database/schema.sql
   ```

4. **Update `.env` file** in `backend/` folder:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your-mysql-password
   DB_NAME=offisho_transport
   ```

### Option 2: Cloud Database (Recommended for Production)

#### Using Railway (Free Tier Available)

1. **Sign up**: https://railway.app
2. **Create Project** → **Add MySQL**
3. **Get Connection Details** from Railway dashboard
4. **Update `.env` file**:
   ```env
   DB_HOST=[Railway MySQL Host]
   DB_PORT=3306
   DB_USER=[Railway MySQL User]
   DB_PASSWORD=[Railway MySQL Password]
   DB_NAME=railway
   ```
5. **Run Schema**: Connect to Railway MySQL and run `database/schema.sql`

#### Using PlanetScale (Free Tier Available)

1. **Sign up**: https://planetscale.com
2. **Create Database** → **Get Connection String**
3. **Update `.env` file** with connection details
4. **Run Schema**: Use PlanetScale dashboard SQL editor

### Option 3: Quick Test (SQLite - Not Recommended for Production)

If you just want to test quickly, you could temporarily use SQLite, but MySQL is recommended.

## Steps After Setting Up Database

1. **Update `.env` file** with real credentials:
   ```env
   # Database Configuration
   DB_HOST=your-actual-host
   DB_PORT=3306
   DB_USER=your-actual-user
   DB_PASSWORD=your-actual-password
   DB_NAME=offisho_transport
   ```

2. **Restart Backend Server**:
   ```powershell
   cd backend
   npm start
   ```

3. **Check Logs** - You should see:
   ```
   ✅ MySQL database connected successfully
      Database: offisho_transport
      Host: localhost:3306
   ```

4. **Create Admin User** (if needed):
   ```powershell
   cd backend
   npm run create-admin
   ```
   Or use the script: `backend/scripts/createAdmin.ts`

5. **Test Login**:
   - Use the admin credentials you created
   - Or register a new user first

## Verify Database Connection

After updating `.env`, restart your backend and check the console output. You should see:
- ✅ `MySQL database connected successfully`
- ❌ If you see errors, check the error message for specific issues

## Common Issues

### "Access denied for user"
- Wrong username or password
- User doesn't have access to the database

### "Unknown database"
- Database doesn't exist
- Run `database/schema.sql` to create it

### "Can't connect to MySQL server"
- Wrong host/port
- MySQL server not running
- Firewall blocking connection

### "Table 'users' doesn't exist"
- Database exists but schema not run
- Run `database/schema.sql`

## Current Status

Your `.env` file currently has:
```
DB_HOST=your-database-host  ❌ (Placeholder)
DB_USER=your-database-user  ❌ (Placeholder)
DB_PASSWORD=your-database-password  ❌ (Placeholder)
```

**These need to be replaced with actual database credentials!**

---

**Next Steps:**
1. Choose a database option above
2. Set up the database
3. Update `.env` with real credentials
4. Restart backend
5. Test login again
