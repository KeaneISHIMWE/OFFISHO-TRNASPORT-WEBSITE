import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../models/db';
import { User, JwtPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
const JWT_EXPIRES_IN = '24h';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone_number } = req.body;

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    ) as any[];

    if (existingUsers.length > 0) {
      res.status(400).json({ error: 'User with this email already exists' });
      return;
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Generate UUID for user
    const userId = uuidv4();

    // Insert user (phone_number can be null for existing users compatibility)
    await pool.execute(
      'INSERT INTO users (id, name, email, phone_number, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, name, email, phone_number || null, passwordHash, 'user']
    );

    // Get created user
    const [users] = await pool.execute(
      'SELECT id, name, email, phone_number, role FROM users WHERE id = ?',
      [userId]
    ) as any[];

    const user = users[0];

    if (!user) {
      res.status(500).json({ error: 'Failed to create user' });
      return;
    }

    // Generate JWT token
    const tokenPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number || null,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Test database connection first
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.ping();
      connection.release();
    } catch (dbError: any) {
      console.error('Database connection error:', dbError);
      console.error('Error code:', dbError.code);
      console.error('Error message:', dbError.message);
      console.error('SQL State:', dbError.sqlState);
      
      // Provide more specific error messages
      let errorMessage = 'Database connection failed';
      if (dbError.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to database server. Please check if the database is running and the host/port are correct.';
      } else if (dbError.code === 'ER_ACCESS_DENIED_ERROR' || dbError.code === 'ER_NOT_SUPPORTED_AUTH_MODE') {
        errorMessage = 'Database authentication failed. Please check your username and password.';
      } else if (dbError.code === 'ER_BAD_DB_ERROR') {
        errorMessage = 'Database does not exist. Please create the database first.';
      } else if (dbError.code === 'ENOTFOUND' || dbError.code === 'ETIMEDOUT') {
        errorMessage = 'Cannot reach database server. Please check your network connection and database host.';
      }
      
      res.status(500).json({ 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? `${dbError.code}: ${dbError.message}` : undefined
      });
      return;
    }

    // Find user
    let users: any[];
    try {
      [users] = await pool.execute(
        'SELECT id, name, email, password_hash, role FROM users WHERE email = ?',
        [email]
      ) as any[];
    } catch (dbError: any) {
      console.error('Database query error:', dbError);
      res.status(500).json({ 
        error: 'Database query failed',
        details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
      });
      return;
    }

    const user = users[0];

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Verify password
    let isValidPassword: boolean;
    try {
      isValidPassword = await bcrypt.compare(password, user.password_hash);
    } catch (bcryptError: any) {
      console.error('Password comparison error:', bcryptError);
      res.status(500).json({ error: 'Authentication error' });
      return;
    }

    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Generate JWT token
    try {
      const tokenPayload: JwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (jwtError: any) {
      console.error('JWT signing error:', jwtError);
      res.status(500).json({ 
        error: 'Token generation failed',
        details: process.env.NODE_ENV === 'development' ? jwtError.message : undefined
      });
      return;
    }
  } catch (error: any) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const [users] = await pool.execute(
      'SELECT id, name, email, phone_number, role, created_at, updated_at FROM users WHERE id = ?',
      [req.user.userId]
    ) as any[];

    const user = users[0];

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number || null,
        role: user.role,
        created_at: new Date(user.created_at).toISOString(),
        updated_at: new Date(user.updated_at).toISOString(),
      },
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
