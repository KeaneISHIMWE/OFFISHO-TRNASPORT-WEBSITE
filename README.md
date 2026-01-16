# Offisho Transport - Full-Stack Web Application

A modern, responsive web application for Offisho Transport, specializing in selling, buying, and renting cars for various events such as weddings, corporate functions, and tours.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion, React Router, React Hook Form, Zod
- **Backend**: Node.js, Express, TypeScript, Convex (database)
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
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Auth, validation, upload
│   │   ├── utils/          # Helpers, email service
│   │   └── server.ts
│   └── package.json
├── database/
│   └── schema.sql          # PostgreSQL schema
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Convex account (free tier available at https://convex.dev)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up Convex:
```bash
# Login to Convex (will open browser)
npx convex dev --once

# This will generate the Convex URL - copy it for step 4
```

4. Create a `.env` file in the backend directory:
```env
CONVEX_URL=https://your-project.convex.cloud
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
FRONTEND_URL=http://localhost:3000
```

5. Generate Convex types (run this in backend directory):
```bash
npx convex dev --once
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Database Schema

The database uses Convex and includes the following tables:
- **users**: User accounts and authentication
- **cars**: Vehicle inventory
- **requests**: Booking/rental requests
- **payments**: Payment records

See `backend/convex/schema.ts` for the complete schema definition. The schema is automatically synced with Convex when you run `npx convex dev`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Cars
- `GET /api/cars` - List all cars (with filters)
- `GET /api/cars/:id` - Get car details
- `POST /api/cars` - Create car (admin only)
- `PUT /api/cars/:id` - Update car (admin only)
- `DELETE /api/cars/:id` - Delete car (admin only)

### Requests
- `GET /api/requests` - List requests (user sees own, admin sees all)
- `GET /api/requests/:id` - Get request details
- `POST /api/requests` - Create booking request
- `PUT /api/requests/:id/status` - Update request status (admin only)
- `DELETE /api/requests/:id` - Cancel request

## Rental Logic

- **Base rental price**: From `car.rental_price_per_day`
- **With driver**: Total = base + 10,000 FRW
- **Without driver**: Total = base + 50,000 FRW (refundable deposit)

## Payment Information

- **MTN MoMo**: +250 788 123 456
- **Bank Transfer**: Account: 1234567890, Bank: Bank of Rwanda

## Security Features

- JWT authentication with 24-hour expiration
- Password hashing with bcrypt (10 rounds)
- Input validation (Joi backend, Zod frontend)
- SQL injection prevention (parameterized queries)
- CORS configuration
- Helmet.js for security headers
- Rate limiting on auth endpoints

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Build the project: `npm run build`
3. Start the server: `npm start`

### Frontend Deployment
1. Set `REACT_APP_API_URL` to your backend URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder to Vercel/Netlify

## Environment Variables

See `.env.example` files in both frontend and backend directories for required environment variables.

## License

ISC

## Contact

For questions or support, please contact info@offisho.com
