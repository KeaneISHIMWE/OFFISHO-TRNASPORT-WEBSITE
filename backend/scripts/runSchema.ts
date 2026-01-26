import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function runSchema() {
  // Railway MySQL connection details
  const connectionConfig = {
    host: 'interchange.proxy.rlwy.net',
    port: 15458,
    user: 'root',
    password: 'VjSsZxTneYKAnTlmfMzSLFUcnhwWQhXV',
    database: 'railway',
    multipleStatements: true, // Allow multiple SQL statements
  };

  let connection: mysql.Connection | null = null;

  try {
    console.log('🔌 Connecting to Railway MySQL database...');
    connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Connected successfully!');

    // Read the schema file
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    console.log(`📖 Reading schema file: ${schemaPath}`);
    
    let schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Remove comments (lines starting with --)
    schema = schema.replace(/--.*$/gm, '');
    
    // Remove CREATE DATABASE and USE statements since we're connecting directly to 'railway' database
    schema = schema.replace(/CREATE DATABASE IF NOT EXISTS[^;]*;/gi, '');
    schema = schema.replace(/USE\s+\w+\s*;/gi, '');
    
    // Split by semicolons, keeping multi-line statements together
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length > 10); // Filter out empty or very short statements

    console.log(`📝 Executing ${statements.length} SQL statements...`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await connection.query(statement + ';');
          console.log(`✅ Statement ${i + 1}/${statements.length} executed successfully`);
        } catch (error: any) {
          // Ignore "table already exists" errors
          if (error.code === 'ER_TABLE_EXISTS_ERROR' || error.message.includes('already exists')) {
            console.log(`⚠️  Statement ${i + 1}/${statements.length}: Table already exists (skipping)`);
          } else {
            console.error(`❌ Error executing statement ${i + 1}:`, error.message);
            console.error(`   Statement: ${statement.substring(0, 100)}...`);
            throw error;
          }
        }
      }
    }

    console.log('\n✅ Schema execution completed successfully!');
    
  } catch (error: any) {
    console.error('❌ Error running schema:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Connection closed');
    }
  }
}

runSchema();
