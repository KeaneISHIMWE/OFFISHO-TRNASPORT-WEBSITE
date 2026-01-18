import dotenv from 'dotenv';
import path from 'path';
import { pool } from '../src/models/db';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const forceUpdateAdmin = async () => {
    try {
        const newEmail = 'admin@offishotransport.com';
        const password = 'admin123';

        // Just force update any admin to this email, or create if none
        console.log('Finding admin users...');
        const [admins] = await pool.execute('SELECT id FROM users WHERE role = "admin"') as any[];

        if (admins.length > 0) {
            console.log(`Found ${admins.length} admin(s). Updating the first one to ${newEmail}...`);
            await pool.execute('UPDATE users SET email = ? WHERE id = ?', [newEmail, admins[0].id]);
            console.log('✅ Updated admin email.');
        } else {
            console.log('No admin found. Creating one...');
            const bcrypt = require('bcrypt');
            const { v4: uuidv4 } = require('uuid');
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const userId = uuidv4();

            await pool.execute(
                'INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
                [userId, 'Admin User', newEmail, passwordHash, 'admin']
            );
            console.log('✅ Created new admin user.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit(0);
    }
};

forceUpdateAdmin();
