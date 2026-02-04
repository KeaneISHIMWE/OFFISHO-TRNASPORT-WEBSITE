# 🔧 Fix MySQL Connection Timeout (ETIMEDOUT)

## 🎯 Problem
Connection timeout error: `ETIMEDOUT`

Variables are set correctly, but connection times out.

---

## 🔍 Possible Causes

### 1. MySQL Public Networking Not Enabled
**Most Common Issue!**

Railway MySQL might not have public networking enabled.

**Fix:**
1. Railway Dashboard → MySQL Service → **Settings**
2. Find **"Public Networking"** section
3. **Enable** public networking
4. Copy the generated **Public Hostname**
5. Update `DB_HOST` in Backend Variables with new hostname
6. Redeploy backend

### 2. Wrong Hostname
**Check:**
- `DB_HOST` should be PUBLIC hostname (e.g., `containers-us-west-123.railway.app`)
- NOT `mysql.railway.internal` (internal only)
- NOT `offishotransport-database.up.railway.app` (this might be wrong)

**Fix:**
1. Railway → MySQL Service → Settings → Public Networking
2. Get the exact Public Hostname shown there
3. Update `DB_HOST` in Backend Variables
4. Redeploy

### 3. MySQL Service Not Running
**Check:**
1. Railway Dashboard → MySQL Service
2. Status should be **"Running"** (green)
3. If "Stopped" or "Failed", restart it

### 4. Port Issue
**Check:**
- `DB_PORT` should be `3306` (default MySQL port)
- Railway MySQL might use a different port

**Fix:**
1. Railway → MySQL Service → Variables
2. Check `MYSQLPORT` value
3. Set `DB_PORT` to match (usually `3306`)

### 5. Firewall/Network Issue
**Less common, but possible:**
- Railway might be blocking connections
- Try restarting MySQL service

---

## ✅ Step-by-Step Fix

### Step 1: Verify MySQL Service Status
1. Railway Dashboard → MySQL Service
2. Status should be **"Running"**
3. If not, click **"Restart"**

### Step 2: Enable Public Networking
1. Railway → MySQL Service → **Settings**
2. Find **"Public Networking"** or **"Networking"**
3. **Enable** it if disabled
4. Copy the **Public Hostname** shown

### Step 3: Update DB_HOST
1. Railway → Backend Service → **Variables**
2. Find `DB_HOST`
3. Update to the **exact Public Hostname** from Step 2
4. Save

### Step 4: Verify Port
1. Railway → MySQL Service → Variables
2. Check `MYSQLPORT` value
3. Railway → Backend Service → Variables
4. Set `DB_PORT` to match `MYSQLPORT` (usually `3306`)

### Step 5: Redeploy
1. Railway → Backend Service
2. Click **"Redeploy"**
3. Watch logs for connection

---

## 🔍 Verify Connection Details

After setting variables, logs should show:
```
✅ MySQL database connected successfully
   Database: railway
   Host: containers-us-west-123.railway.app:3306
```

If still timing out:
- Check MySQL service is running
- Verify Public Networking is enabled
- Confirm hostname is PUBLIC (not internal)
- Try restarting MySQL service

---

## 🐛 Troubleshooting

### Still Getting ETIMEDOUT?

1. **Check MySQL Logs:**
   - Railway → MySQL Service → Logs
   - Look for connection attempts
   - Check for errors

2. **Test Connection Manually:**
   ```bash
   mysql -h [PUBLIC_HOSTNAME] -P 3306 -u root -p
   ```
   If this fails, MySQL public networking isn't working.

3. **Try Different Port:**
   - Check MySQL Variables for actual port
   - Might not be 3306

4. **Restart Both Services:**
   - Restart MySQL service
   - Restart Backend service
   - Try again

---

## ✅ Quick Checklist

- [ ] MySQL service status is "Running"
- [ ] Public Networking is enabled in MySQL Settings
- [ ] Got PUBLIC hostname from MySQL Settings
- [ ] Set `DB_HOST` = [PUBLIC hostname] (not internal)
- [ ] Set `DB_PORT` = [from MYSQLPORT, usually 3306]
- [ ] Verified all other DB_* variables are set
- [ ] Redeployed backend
- [ ] Checked logs - connection successful

---

## 🎯 Most Likely Fix

**Enable Public Networking in MySQL Settings and use the PUBLIC hostname!**

The hostname `offishotransport-database.up.railway.app` might be correct, but verify it's the PUBLIC hostname from MySQL Settings → Public Networking.

**Share the Public Hostname from MySQL Settings and I'll help verify!** 🔍
