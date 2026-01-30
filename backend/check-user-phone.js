const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkUserPhone() {
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

    // Check all users and their phone numbers
    const [users] = await connection.query(
      'SELECT id, name, email, phone_number FROM users ORDER BY created_at DESC LIMIT 10'
    );

    console.log('📋 Recent Users:');
    console.log('─'.repeat(80));
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   Phone: ${user.phone_number || '❌ NULL/Not set'}`);
      console.log('');
    });

    // Check specific user if email provided
    const emailToCheck = process.argv[2];
    if (emailToCheck) {
      console.log(`\n🔍 Checking user: ${emailToCheck}`);
      const [specificUser] = await connection.query(
        'SELECT id, name, email, phone_number FROM users WHERE email = ?',
        [emailToCheck]
      );
      
      if (specificUser.length > 0) {
        const user = specificUser[0];
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Phone: ${user.phone_number || '❌ NULL/Not set'}`);
        console.log(`   User ID: ${user.id}`);
        
        if (!user.phone_number) {
          console.log('\n💡 To update phone number, run:');
          console.log(`   node update-user-phone.js "${user.email}" "+250 785 344 214"`);
        }
      } else {
        console.log('   ❌ User not found');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkUserPhone();
