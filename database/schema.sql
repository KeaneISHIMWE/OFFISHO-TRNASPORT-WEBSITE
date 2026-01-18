-- Offisho Transport Database Schema
-- MySQL Database Setup

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS offisho_transport CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE offisho_transport;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    rental_price_per_day DECIMAL(10, 2) NOT NULL,
    buy_price DECIMAL(10, 2),
    sell_price DECIMAL(10, 2),
    car_type ENUM('luxury', 'suv', 'sedan', 'convertible', 'van') NOT NULL,
    event_suitability JSON,
    availability_status ENUM('available', 'rented', 'sold', 'maintenance') NOT NULL DEFAULT 'available',
    specs JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_car_type (car_type),
    INDEX idx_availability (availability_status)
);

-- Requests table
CREATE TABLE IF NOT EXISTS requests (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    car_id VARCHAR(36) NOT NULL,
    request_type ENUM('rent', 'buy', 'sell') NOT NULL,
    with_driver BOOLEAN DEFAULT false,
    deposit_amount DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    event_date DATE,
    event_type VARCHAR(100),
    status ENUM('pending', 'approved', 'rejected', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    agreement_text TEXT,
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_car_id (car_id),
    INDEX idx_status (status)
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(36) PRIMARY KEY,
    request_id VARCHAR(36) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255),
    status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
    INDEX idx_request_id (request_id)
);

-- Note: UUIDs will be generated in the application code using the uuid package


