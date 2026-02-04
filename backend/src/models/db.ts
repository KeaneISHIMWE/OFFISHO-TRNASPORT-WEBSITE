import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// MySQL connection configuration
// Support both Railway MYSQL* variables and custom DB_* variables
const dbConfig = {
  host: process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.MYSQLPORT || process.env.MYSQL_PORT || process.env.DB_PORT || '3306'),
  user: process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME || 'offisho_transport',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 60000, // 60 seconds timeout
  acquireTimeout: 60000, // 60 seconds to acquire connection
  timeout: 60000, // 60 seconds query timeout
};

// Create connection pool
export const pool = mysql.createPool(dbConfig);

// Test database connection with retry logic
let retryCount = 0;
const maxRetries = 3;

const testConnection = () => {
  pool.getConnection()
    .then((connection) => {
      console.log('✅ MySQL database connected successfully');
      console.log(`   Database: ${dbConfig.database}`);
      console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
      connection.release();
    })
    .catch((error) => {
      retryCount++;
      console.error(`❌ MySQL database connection error (attempt ${retryCount}/${maxRetries}):`, error.message);
      console.error('Connection details:');
      console.error('  Host:', dbConfig.host);
      console.error('  Port:', dbConfig.port);
      console.error('  User:', dbConfig.user);
      console.error('  Database:', dbConfig.database);
      console.error('  Password:', dbConfig.password ? '***SET***' : 'NOT SET');
      
      // Provide specific error guidance
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
        console.error('');
        console.error('⚠️  Connection timeout/refused. Possible issues:');
        console.error('   1. MySQL service is not running');
        console.error('   2. Public hostname is incorrect');
        console.error('   3. MySQL public networking is not enabled');
        console.error('   4. Firewall blocking connection');
        console.error('');
        console.error('   Check Railway MySQL Service:');
        console.error('   - Status should be "Running"');
        console.error('   - Public Networking should be enabled');
        console.error('   - Use PUBLIC hostname (not mysql.railway.internal)');
      }
      
      if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error('');
        console.error('⚠️  Access denied. Check:');
        console.error('   - DB_USER is correct');
        console.error('   - DB_PASSWORD is correct');
      }
      
      // Retry connection
      if (retryCount < maxRetries) {
        console.error(`   Retrying in 5 seconds...`);
        setTimeout(() => {
          testConnection();
        }, 5000);
      } else {
        console.error('');
        console.error('❌ Failed to connect after', maxRetries, 'attempts');
        console.error('   Please check Railway MySQL service and environment variables');
      }
    });
};

// Start connection test
testConnection();

export default pool;
