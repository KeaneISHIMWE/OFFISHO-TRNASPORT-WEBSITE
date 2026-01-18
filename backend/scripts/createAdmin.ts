import dotenv from 'dotenv';
import path from 'path';

// Load env vars before importing db
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { pool } from '../src/models/db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const createAdmin = async () => {
    try {
        const adminEmail = 'admin@offisho.com';
        const adminName = 'Admin User';
        const adminPassword = 'admin123'; // Default password

        console.log('Checking for existing admin user...');

        // Check if user already exists
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE email = ?',
            [adminEmail]
        ) as any[];

        if (existingUsers.length > 0) {
            console.log('Admin user already exists.');
            process.exit(0);
        }

        console.log('Creating admin user...');

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

        // Generate UUID
        const userId = uuidv4();

        // Insert user
        await pool.execute(
            'INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
            [userId, adminName, adminEmail, passwordHash, 'admin']
        );

        console.log('Admin user created successfully!');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);

    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
};

createAdmin();
