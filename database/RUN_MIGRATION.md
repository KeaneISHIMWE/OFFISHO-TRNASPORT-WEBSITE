# How to Run the Database Migration

This guide explains how to add the `phone_number` column to your users table.

## Your Database Information

Based on your `.env` file:
- **Database Host:** `interchange.proxy.rlwy.net`
- **Database Port:** `15458`
- **Database Name:** `railway`
- **Database User:** `root`
- **Database Password:** `VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV`

## Method 1: Using MySQL Command Line (Recommended)

### On Windows (PowerShell or Command Prompt):

1. **Make sure MySQL is installed** or use Railway's MySQL client
2. **Navigate to your project directory:**
   ```powershell
   cd "C:\Users\zeroo\Desktop\OFFISHO TRANSPORT"
   ```

3. **Run the migration:**
   ```powershell
   mysql -h interchange.proxy.rlwy.net -P 15458 -u root -p railway < database/migration_add_phone_number.sql
   ```
   
   When prompted, enter your password: `VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV`

### Alternative: Include password in command (less secure):
```powershell
mysql -h interchange.proxy.rlwy.net -P 15458 -u root -pVjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV railway < database/migration_add_phone_number.sql
```
*(Note: No space between -p and password)*

## Method 2: Using MySQL Workbench (GUI Method)

1. **Open MySQL Workbench**
2. **Create a new connection:**
   - Hostname: `interchange.proxy.rlwy.net`
   - Port: `15458`
   - Username: `root`
   - Password: `VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV`
   - Default Schema: `railway`

3. **Connect to the database**

4. **Open the migration file:**
   - File → Open SQL Script
   - Navigate to `database/migration_add_phone_number.sql`

5. **Execute the script:**
   - Click the "Execute" button (lightning bolt icon) or press `Ctrl+Shift+Enter`

## Method 3: Direct SQL Execution (Any MySQL Client)

Connect to your database and run these SQL commands directly:

```sql
USE railway;

-- Add phone_number column to users table
ALTER TABLE users 
ADD COLUMN phone_number VARCHAR(20) NULL AFTER email;

-- Add index for phone_number for faster lookups
CREATE INDEX idx_phone_number ON users(phone_number);
```

## Method 4: Using Railway CLI (If Available)

If you have Railway CLI installed:

```bash
railway connect
mysql railway < database/migration_add_phone_number.sql
```

## Method 5: Using Node.js Script (Quick Alternative)

Create a temporary script to run the migration:

1. **Create `run-migration.js` in your project root:**

```javascript
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const connection = await mysql.createConnection({
    host: 'interchange.proxy.rlwy.net',
    port: 15458,
    user: 'root',
    password: 'VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV',
    database: 'railway',
    multipleStatements: true
  });

  try {
    const sql = fs.readFileSync(
      path.join(__dirname, 'database', 'migration_add_phone_number.sql'),
      'utf8'
    );
    
    await connection.query(sql);
    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    await connection.end();
  }
}

runMigration();
```

2. **Run it:**
```bash
cd backend
node ../run-migration.js
```

## Verification

After running the migration, verify it worked:

```sql
USE railway;
DESCRIBE users;
```

You should see `phone_number` column in the output.

Or check if the column exists:

```sql
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'railway' 
AND TABLE_NAME = 'users' 
AND COLUMN_NAME = 'phone_number';
```

## Troubleshooting

### Error: "Column 'phone_number' already exists"
- The migration has already been run. You can safely ignore this or skip the migration.

### Error: "Access denied"
- Double-check your database credentials in `backend/.env`
- Ensure your IP is whitelisted in Railway (if required)

### Error: "Unknown database 'railway'"
- Verify your database name is correct
- Check Railway dashboard for the actual database name

### Error: "mysql: command not found"
- Install MySQL client or use Method 2 (MySQL Workbench) or Method 5 (Node.js script)

## Quick One-Liner (Windows PowerShell)

```powershell
mysql -h interchange.proxy.rlwy.net -P 15458 -u root -pVjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV railway -e "ALTER TABLE users ADD COLUMN phone_number VARCHAR(20) NULL AFTER email; CREATE INDEX idx_phone_number ON users(phone_number);"
```

## Need Help?

If you encounter any issues:
1. Check Railway dashboard for database connection status
2. Verify your database credentials are correct
3. Ensure your IP address is allowed (if Railway has IP restrictions)
4. Try connecting with MySQL Workbench first to test the connection
