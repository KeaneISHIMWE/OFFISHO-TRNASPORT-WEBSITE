-- Migration: Add phone_number column to users table
-- This migration adds a phone_number field to support user contact information
-- The field is nullable to support existing users without breaking the application

-- Note: Replace 'railway' with your actual database name if different
USE railway;

-- Add phone_number column to users table
ALTER TABLE users 
ADD COLUMN phone_number VARCHAR(20) NULL AFTER email;

-- Add index for phone_number for faster lookups (optional but recommended)
CREATE INDEX idx_phone_number ON users(phone_number);

-- Note: Existing users will have NULL phone_number values
-- This allows the application to work with both old and new user records
