# 🗄️ Database Setup Guide

After deploying to Vercel and setting up your MySQL database, you need to run the schema.

## Method 1: Using MySQL Command Line

### For PlanetScale:
```bash
# Install PlanetScale CLI (if not installed)
# Windows: Download from https://github.com/planetscale/cli/releases
# Or use: scoop install pscale

# Login
pscale auth login

# Connect to your database
pscale connect offisho_transport main --port 3306

# In another terminal, run:
mysql -h 127.0.0.1 -P 3306 -u root -p < database/schema.sql
```

### For Railway:
```bash
# Get connection string from Railway dashboard
# Then run:
mysql -h your-host.railway.app -u root -p < database/schema.sql
```

### For Render:
```bash
# Get connection details from Render dashboard
mysql -h your-host.render.com -u your-user -p your-database < database/schema.sql
```

## Method 2: Using MySQL Workbench / DBeaver

1. **Connect to Database**
   - Open MySQL Workbench or DBeaver
   - Create new connection with your database credentials:
     - Host: Your database host
     - Port: 3306 (usually)
     - Username: Your database user
     - Password: Your database password
     - Database: offisho_transport

2. **Run Schema**
   - Open `database/schema.sql` file
   - Copy all contents
   - Paste into SQL editor
   - Execute the script

## Method 3: Using Online Database Tools

### PlanetScale:
1. Go to your database dashboard
2. Click on "Console" tab
3. Copy contents of `database/schema.sql`
4. Paste and run in the console

### Railway:
1. Go to your MySQL service
2. Click "Connect" → "Public Networking"
3. Use any MySQL client with the connection string

## Method 4: Using Node.js Script

Create a file `setup-db.js`:

```javascript
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
  });

  const schema = fs.readFileSync(path.join(__dirname, 'database/schema.sql'), 'utf8');
  
  await connection.query(schema);
  console.log('✅ Database schema applied successfully!');
  
  await connection.end();
}

setupDatabase().catch(console.error);
```

Run:
```bash
cd backend
node ../setup-db.js
```

## Verify Schema

After running the schema, verify tables were created:

```sql
USE offisho_transport;
SHOW TABLES;
```

You should see:
- users
- cars
- requests
- contact_messages

## Create Admin User

After schema is set up, you can create an admin user:

```bash
cd backend
npm run dev
# Then use the registration endpoint or admin creation script
```

Or manually:
```sql
-- You'll need to hash the password first using bcrypt
-- Use the backend script: npm run createAdmin
```

---

**Note**: Make sure your database allows connections from Vercel's IP addresses. Most cloud providers (PlanetScale, Railway) handle this automatically.
