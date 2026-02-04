import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Parse Railway DATABASE_URL for internal networking
// Format: mysql://user:password@host:port/database
function parseDatabaseUrl(url: string | undefined) {
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  try {
    const parsed = new URL(url);
    return {
      host: parsed.hostname,
      port: parseInt(parsed.port || '3306'),
      user: parsed.username,
      password: parsed.password,
      database: parsed.pathname.replace('/', ''),
    };
  } catch (error) {
    throw new Error(`Invalid DATABASE_URL format: ${error}`);
  }
}

// Get database configuration from Railway DATABASE_URL
let dbConfig;
try {
  const parsed = parseDatabaseUrl(process.env.DATABASE_URL);
  dbConfig = {
    ...parsed,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  };
} catch (error: any) {
  console.error('❌ Failed to parse DATABASE_URL:', error.message);
  console.error('DATABASE_URL must be set in Railway environment variables');
  process.exit(1);
}

// Create connection pool
export const pool = mysql.createPool(dbConfig);

// Test database connection
pool.getConnection()
  .then((connection) => {
    console.log('✅ MySQL database connected successfully');
    console.log(`   Database: ${dbConfig.database}`);
    connection.release();
  })
  .catch((error) => {
    console.error('❌ MySQL database connection error:', error.message);
    console.error('Check Railway MySQL service status and DATABASE_URL configuration');
    process.exit(1);
  });

export default pool;
