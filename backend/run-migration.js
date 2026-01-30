const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function runMigration() {
  let connection;
  
  try {
    console.log('🔌 Connecting to database...');
    console.log(`   Host: ${process.env.DB_HOST}`);
    console.log(`   Database: ${process.env.DB_NAME}`);
    
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true
    });

    console.log('✅ Connected successfully!\n');

    // Read migration file
    const migrationPath = path.join(__dirname, '..', 'database', 'migration_add_phone_number.sql');
    let sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Replace USE statement with actual database name from env
    sql = sql.replace(/USE\s+\w+;/, `USE ${process.env.DB_NAME};`);
    
    console.log('📝 Running migration...');
    console.log('   Adding phone_number column to users table...\n');
    
    // Execute migration
    await connection.query(sql);
    
    console.log('✅ Migration completed successfully!');
    console.log('\n📋 Verifying migration...');
    
    // Verify the column was added
    const [columns] = await connection.query(
      `SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
       FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = ? 
       AND TABLE_NAME = 'users' 
       AND COLUMN_NAME = 'phone_number'`,
      [process.env.DB_NAME]
    );
    
    if (columns.length > 0) {
      console.log('✅ phone_number column exists!');
      console.log(`   Type: ${columns[0].DATA_TYPE}`);
      console.log(`   Nullable: ${columns[0].IS_NULLABLE}`);
    } else {
      console.log('⚠️  Warning: Could not verify column creation');
    }
    
  } catch (error) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log('ℹ️  Column phone_number already exists. Migration already applied.');
    } else {
      console.error('❌ Migration failed:', error.message);
      console.error('   Error code:', error.code);
      if (error.sql) {
        console.error('   SQL:', error.sql.substring(0, 200));
      }
      process.exit(1);
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed.');
    }
  }
}

runMigration();
