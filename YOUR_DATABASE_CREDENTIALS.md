# 🗄️ Your Railway Database Credentials

## Current Credentials

```
DB_HOST=mysql.railway.internal
DB_USER=root
DB_PASSWORD=ffGxCnVTjWQDnigoherljSbUymgIEpOQ
DB_NAME=railway
DB_PORT=3306
```

## ⚠️ Important: Get Public Hostname

The host `mysql.railway.internal` is for internal Railway connections only. For Vercel, you need the **public hostname**.

### How to Get Public Hostname:

1. Go to your Railway project
2. Click on the **MySQL** service
3. Go to **"Settings"** tab
4. Look for **"Public Networking"** or **"Connect"** section
5. You should see a public hostname like: `xxxxx.railway.app` or `containers-us-west-xxx.railway.app`
6. Copy that hostname - that's your **DB_HOST** for Vercel

**OR** check the "Connect" tab - it might show the public connection string.

---

## Environment Variables for Vercel

Once you have the public hostname, use these:

```
DB_HOST=[Public hostname from Railway Settings]
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ffGxCnVTjWQDnigoherljSbUymgIEpOQ
DB_NAME=railway
```

**Note**: Database name is `railway` (not `offisho_transport`). You can either:
- Use `railway` as your database name, OR
- Create a new database called `offisho_transport` (see below)

---

## Create New Database (Optional)

If you want to use `offisho_transport` as the database name:

1. Go to Railway MySQL service
2. Click **"Data"** tab
3. Click **"Query"** button
4. Run this SQL:
```sql
CREATE DATABASE IF NOT EXISTS offisho_transport;
```

Then use `DB_NAME=offisho_transport` instead of `railway`.

---

## Next Steps

1. Get public hostname from Railway Settings
2. Add all environment variables to Vercel
3. Run database schema
4. Redeploy
