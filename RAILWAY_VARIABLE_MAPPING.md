# 🔄 Railway Variable Name Mapping

## 🎯 Problem
Railway MySQL provides variables with `MYSQL*` prefix, but backend code expects `DB_*` prefix.

**Railway MySQL Variables:**
- `MYSQLHOST` (or `MYSQL_HOST`)
- `MYSQLUSER` (or `MYSQL_USER`)
- `MYSQLPASSWORD` (or `MYSQL_PASSWORD`)
- `MYSQLDATABASE` (or `MYSQL_DATABASE`)
- `MYSQLPORT` (or `MYSQL_PORT`)

**Backend Code Expects:**
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_PORT`

---

## ✅ Solution: Map Variables in Railway Backend

You need to set `DB_*` variables in Railway Backend Service, using values from MySQL Variables.

### Step 1: Get Values from MySQL Variables

1. Railway Dashboard → **MySQL Service** → **Variables** tab
2. Copy these values:
   - `MYSQLHOST` → Use for `DB_HOST` (but get PUBLIC hostname!)
   - `MYSQLUSER` → Use for `DB_USER`
   - `MYSQLPASSWORD` → Use for `DB_PASSWORD`
   - `MYSQLDATABASE` → Use for `DB_NAME`
   - `MYSQLPORT` → Use for `DB_PORT`

### Step 2: Get PUBLIC Hostname (CRITICAL!)

**⚠️ IMPORTANT:** `MYSQLHOST` might show `mysql.railway.internal` (internal only)

**You need the PUBLIC hostname:**

1. Railway Dashboard → **MySQL Service** → **Settings** tab
2. Find **"Public Networking"** section
3. Copy **Public Hostname** (e.g., `containers-us-west-123.railway.app`)

### Step 3: Set DB_* Variables in Backend Service

Railway Dashboard → **Backend Service** → **Variables** tab:

```env
DB_HOST = [PUBLIC hostname from MySQL Settings]
DB_PORT = [MYSQLPORT from MySQL Variables, usually 3306]
DB_USER = [MYSQLUSER from MySQL Variables, usually "root"]
DB_PASSWORD = [MYSQLPASSWORD from MySQL Variables]
DB_NAME = [MYSQLDATABASE from MySQL Variables, usually "railway"]
```

---

## 📋 Example Mapping

**From MySQL Variables:**
```
MYSQLHOST = mysql.railway.internal (internal - don't use!)
MYSQLUSER = root
MYSQLPASSWORD = VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV
MYSQLDATABASE = railway
MYSQLPORT = 3306
```

**From MySQL Settings → Public Networking:**
```
Public Hostname = containers-us-west-123.railway.app
```

**Set in Backend Variables:**
```
DB_HOST = containers-us-west-123.railway.app (PUBLIC hostname!)
DB_PORT = 3306
DB_USER = root
DB_PASSWORD = VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV
DB_NAME = railway
```

---

## 🔍 How to Verify

After setting variables and redeploying, check logs:

**Good:**
```
✅ MySQL database connected successfully
   Database: railway
   Host: containers-us-west-123.railway.app:3306
```

**Bad:**
```
❌ DB_HOST=localhost (variable not set)
❌ DB_PASSWORD=NOT SET (variable not set)
```

---

## 💡 Alternative: Update Backend Code

Instead of mapping variables, you could update backend code to read `MYSQL*` variables:

```typescript
const dbConfig = {
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.MYSQLPORT || process.env.DB_PORT || '3306'),
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'offisho_transport',
};
```

But **mapping in Railway is easier** - just set `DB_*` variables!

---

## ✅ Quick Checklist

- [ ] Got PUBLIC hostname from MySQL Settings → Public Networking
- [ ] Got values from MySQL Variables (`MYSQLUSER`, `MYSQLPASSWORD`, etc.)
- [ ] Set `DB_HOST` = [PUBLIC hostname] in Backend Variables
- [ ] Set `DB_PORT` = [from MYSQLPORT]
- [ ] Set `DB_USER` = [from MYSQLUSER]
- [ ] Set `DB_PASSWORD` = [from MYSQLPASSWORD]
- [ ] Set `DB_NAME` = [from MYSQLDATABASE]
- [ ] All set for Production environment
- [ ] Redeployed backend
- [ ] Logs show database connected ✅

---

## 🎯 Summary

**Railway MySQL provides:** `MYSQL*` variables  
**Backend code expects:** `DB_*` variables  
**Solution:** Set `DB_*` variables in Backend Service, using values from MySQL Variables

**Most Important:** Use PUBLIC hostname for `DB_HOST`, not `mysql.railway.internal`!
