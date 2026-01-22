import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'offisho_transport',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Create connection pool
export const pool = mysql.createPool(dbConfig);

// Test database connection
pool.getConnection()
  .then((connection) => {
    console.log('✅ MySQL database connected successfully');
    console.log(`   Database: ${dbConfig.database}`);
    console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
    connection.release();
  })
  .catch((error) => {
    console.error('❌ MySQL database connection error:', error.message);
    console.error('Please check your database configuration in .env file');
    console.error('Required variables:');
    console.error('  DB_HOST=' + (dbConfig.host || 'NOT SET'));
    console.error('  DB_PORT=' + (dbConfig.port || 'NOT SET'));
    console.error('  DB_USER=' + (dbConfig.user || 'NOT SET'));
    console.error('  DB_PASSWORD=' + (dbConfig.password ? '***SET***' : 'NOT SET'));
    console.error('  DB_NAME=' + (dbConfig.database || 'NOT SET'));
    
    // Check if using placeholder values
    if (dbConfig.host === 'your-database-host' || 
        dbConfig.user === 'your-database-user' || 
        dbConfig.password === 'your-database-password') {
      console.error('');
      console.error('⚠️  WARNING: Database credentials are still using placeholder values!');
      console.error('   Please update your .env file with actual database credentials.');
    }
  });

export default pool;
