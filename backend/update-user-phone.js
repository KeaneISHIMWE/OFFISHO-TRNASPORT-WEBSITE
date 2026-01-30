const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateUserPhone() {
  const email = process.argv[2];
  const phoneNumber = process.argv[3];

  if (!email || !phoneNumber) {
    console.log('Usage: node update-user-phone.js <email> <phone_number>');
    console.log('Example: node update-user-phone.js keaneishimwe@gmail.com "+250 785 344 214"');
    process.exit(1);
  }

  let connection;
  
  try {
    console.log('🔌 Connecting to database...');
    
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('✅ Connected!\n');

    // Update user phone number
    const [result] = await connection.query(
      'UPDATE users SET phone_number = ? WHERE email = ?',
      [phoneNumber, email]
    );

    if (result.affectedRows > 0) {
      console.log(`✅ Phone number updated for ${email}`);
      console.log(`   New phone: ${phoneNumber}`);
    } else {
      console.log(`❌ User not found: ${email}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

updateUserPhone();
