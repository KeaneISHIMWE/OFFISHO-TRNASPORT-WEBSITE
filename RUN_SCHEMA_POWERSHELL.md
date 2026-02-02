# 🗄️ Run Database Schema - PowerShell Command

## ✅ Correct PowerShell Command

PowerShell doesn't support `<` operator. Use this instead:

```powershell
Get-Content database\schema.sql | mysql -h interchange.proxy.rlwy.net -P 15458 -u root -p railway
```

**When prompted for password, enter:**
```
VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV
```

---

## Alternative: Using `type` command

```powershell
type database\schema.sql | mysql -h interchange.proxy.rlwy.net -P 15458 -u root -p railway
```

---

## What the command does:

1. `Get-Content database\schema.sql` - Reads the SQL file
2. `|` - Pipes it to MySQL
3. `mysql -h interchange.proxy.rlwy.net` - Connects to Railway database
4. `-P 15458` - Uses port 15458
5. `-u root` - Username is root
6. `-p` - Prompts for password
7. `railway` - Database name

---

## ⚠️ Important Notes:

- Make sure you're in the project root directory: `C:\Users\zeroo\Desktop\OFFISHO TRANSPORT`
- You need MySQL client installed on your computer
- If MySQL is not installed, use Railway Console instead (see below)

---

## 🎯 EASIER Option: Use Railway Console

1. Go to https://railway.app
2. Click your **MySQL** service
3. Click **"Data"** tab
4. Click **"Query"** button
5. Copy all contents from `database\schema.sql`
6. Paste into the query box
7. Click **"Run"**

This is much simpler and doesn't require MySQL installed!
