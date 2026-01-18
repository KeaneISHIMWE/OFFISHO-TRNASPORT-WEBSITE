# Offisho Transport - Full-Stack Web Application

A modern, responsive web application for Offisho Transport, specializing in selling, buying, and renting cars for various events such as weddings, corporate functions, and tours.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion, React Router, React Hook Form, Zod
- **Backend**: Node.js, Express, TypeScript
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary (cloud storage)
- **Email**: Nodemailer
- **Validation**: Joi (backend), Zod (frontend)

## Features

### User Features
- Browse and search cars with filters (type, price range, availability, event suitability)
- View detailed car information
- Submit booking requests (rent/buy/sell)
- Rental options: with driver (+10,000 FRW) or without driver (+50,000 FRW refundable deposit)
- User authentication (register/login)
- View request history

### Admin Features
- Full CRUD operations for cars
- Image upload for cars
- Manage and approve/reject booking requests
- View analytics (total cars, available cars, pending requests, revenue)
- Update request statuses

## Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd "OFFISHO TRANSPORT"
```

### 2. Database Setup

1. Install MySQL if you haven't already
2. Create a MySQL database:
```bash
mysql -u root -p
```

3. Run the schema file:
```bash
mysql -u root -p < database/schema.sql
```

Or manually:
```sql
CREATE DATABASE offisho_transport;
USE offisho_transport;
SOURCE database/schema.sql;
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# MySQL Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=offisho_transport

CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

### 4. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:5000`

### Start Frontend Server

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
offisho-transport/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (Auth)
│   │   ├── services/       # API service functions
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/         # Express routes
│   │   ├── controllers/   # Route handlers
│   │   ├── models/         # Database models (MySQL connection)
│   │   ├── middleware/     # Auth, validation, upload
│   │   ├── utils/         # Utility functions
│   │   └── server.ts
│   └── package.json
├── database/
│   └── schema.sql         # MySQL database schema
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Cars
- `GET /api/cars` - Get all cars (with filters)
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create car (admin only)
- `PUT /api/cars/:id` - Update car (admin only)
- `DELETE /api/cars/:id` - Delete car (admin only)

### Requests
- `GET /api/requests` - Get all requests (user's own or all if admin)
- `GET /api/requests/:id` - Get request by ID
- `POST /api/requests` - Create request (auth required)
- `PUT /api/requests/:id/status` - Update request status (admin only)
- `DELETE /api/requests/:id` - Delete request

## Default Admin Account

After setting up the database, create an admin user through the registration endpoint or manually:

```sql
-- Generate a UUID and hash password 'admin123' using bcrypt
-- Use the registration endpoint or create manually with proper password hash
```

## Environment Variables

See `.env.example` files in backend directory for required environment variables.

## License

ISC
