import dotenv from 'dotenv';
import path from 'path';
import { pool } from '../src/models/db';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const checkSchema = async () => {
    try {
        const [rows] = await pool.execute('DESCRIBE cars');
        console.table(rows);
    } catch (error) {
        console.error(error);
    } finally {
        process.exit(0);
    }
};

checkSchema();
