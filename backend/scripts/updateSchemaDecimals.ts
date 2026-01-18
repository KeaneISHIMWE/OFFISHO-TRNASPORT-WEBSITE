import dotenv from 'dotenv';
import path from 'path';
import { pool } from '../src/models/db';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const updateSchemaDecimals = async () => {
    try {
        console.log('Updating DECIMAL precision for pricing fields...');

        // Update cars table
        await pool.execute('ALTER TABLE cars MODIFY rental_price_per_day DECIMAL(15, 2) NOT NULL');
        await pool.execute('ALTER TABLE cars MODIFY buy_price DECIMAL(15, 2)');
        await pool.execute('ALTER TABLE cars MODIFY sell_price DECIMAL(15, 2)');

        // Update requests table
        await pool.execute('ALTER TABLE requests MODIFY deposit_amount DECIMAL(15, 2) DEFAULT 0');
        await pool.execute('ALTER TABLE requests MODIFY total_amount DECIMAL(15, 2) NOT NULL');

        // Update payments table
        await pool.execute('ALTER TABLE payments MODIFY amount DECIMAL(15, 2) NOT NULL');

        console.log('✅ Schema updated successfully to support larger amounts.');

    } catch (error) {
        console.error('Error updating schema:', error);
    } finally {
        process.exit(0);
    }
};

updateSchemaDecimals();
