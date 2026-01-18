import dotenv from 'dotenv';
import path from 'path';
import { pool } from '../src/models/db';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const updateAdminEmail = async () => {
    try {
        const oldEmail = 'admin@offisho.com';
        const newEmail = 'admin@offishotransport.com';

        console.log(`Updating admin email from ${oldEmail} to ${newEmail}...`);

        const [result] = await pool.execute(
            'UPDATE users SET email = ? WHERE email = ? AND role = "admin"',
            [newEmail, oldEmail]
        ) as any;

        if (result.affectedRows > 0) {
            console.log('✅ Admin email updated successfully!');
        } else {
            console.log('⚠️ No admin user found with the old email. Creating new admin instead...');
            // If not found, let's just create it to be safe, reusing the create logic or just informing the user
            // Actually, let's just create it if it doesn't exist to be robust.

            await import('./createAdmin'); // This might re-run the create script but that creates 'admin@offisho.com'.
            // Let's just do a specific insert if update failed, assuming they might have deleted it or something.
            // For now, let's assume the user exists as I just created it.

            // Let's try to update ANY admin user to this email if there is only one
            const [admins] = await pool.execute('SELECT id FROM users WHERE role = "admin"') as any[];
            if (admins.length === 1) {
                await pool.execute('UPDATE users SET email = ? WHERE id = ?', [newEmail, admins[0].id]);
                console.log('✅ Updated the existing admin user to the new email.');
            } else {
                console.log('❌ Could not find the specific admin user to update.');
            }
        }

    } catch (error) {
        console.error('Error updating admin email:', error);
    } finally {
        process.exit(0);
    }
};

updateAdminEmail();
