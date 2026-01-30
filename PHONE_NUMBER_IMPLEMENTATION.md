# Phone Number Field Implementation

This document outlines the changes made to add phone number support to user registration and rental request email notifications.

## Overview

Added a `phone_number` field to the user registration process and included it in rental request email notifications sent to car owners.

## Changes Made

### 1. Database Schema Update

**File:** `database/migration_add_phone_number.sql`

- Added `phone_number` column to `users` table (VARCHAR(20), nullable)
- Added index on `phone_number` for faster lookups
- Field is nullable to support existing users without breaking the application

**To apply the migration:**
```sql
-- Run this SQL script in your MySQL database
mysql -u your_user -p offisho_transport < database/migration_add_phone_number.sql
```

Or manually execute:
```sql
USE offisho_transport;
ALTER TABLE users ADD COLUMN phone_number VARCHAR(20) NULL AFTER email;
CREATE INDEX idx_phone_number ON users(phone_number);
```

### 2. Backend Changes

#### Type Definitions
**File:** `backend/src/types/index.ts`
- Updated `User` interface to include optional `phone_number?: string | null`

#### Validation Schema
**File:** `backend/src/utils/validation.ts`
- Updated `registerSchema` to accept `phone_number` as optional field
- Added regex pattern validation for phone number format
- Pattern supports international formats: `+250 785 344 214`, `(250) 785-344-214`, etc.

#### Authentication Controller
**File:** `backend/src/controllers/authController.ts`
- Updated `register` function to accept and save `phone_number`
- Updated `getMe` function to return `phone_number` in user data
- Phone number is stored as NULL if not provided (backward compatible)

#### Request Controller
**File:** `backend/src/controllers/requestController.ts`
- Updated user queries to include `phone_number` field
- Ensures phone number is available when sending email notifications

#### Email Template
**File:** `backend/src/utils/email.ts`
- Updated `sendAdminNotificationEmail` function
- Added phone number display in "Customer Information" section
- Phone number only displays if provided (conditional rendering)

### 3. Frontend Changes

#### Type Definitions
**File:** `frontend/src/types/index.ts`
- Updated `User` interface to include optional `phone_number?: string | null`

#### Registration Form
**File:** `frontend/src/pages/Register.tsx`
- Added phone number input field with Phone icon
- Field is marked as optional with visual indicator
- Added validation using Zod schema with regex pattern
- Placeholder shows example format: `+250 785 344 214`
- Styled consistently with other form fields

#### Authentication Context
**File:** `frontend/src/context/AuthContext.tsx`
- Updated `register` function signature to accept optional `phone_number` parameter
- Passes phone number to API registration call

#### API Service
**File:** `frontend/src/services/api.ts`
- Updated `authAPI.register` to accept and send `phone_number` parameter
- Phone number is only sent if provided (undefined if not)

## Validation

### Phone Number Format
The phone number validation accepts various international formats:
- `+250 785 344 214`
- `250 785 344 214`
- `(250) 785-344-214`
- `250-785-344-214`
- `0785344214`

**Regex Pattern:** `/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/`

### Backend Validation (Joi)
- Pattern matching for valid phone formats
- Maximum length: 20 characters
- Optional field (allows empty string or null)

### Frontend Validation (Zod)
- Same regex pattern as backend
- Maximum length: 20 characters
- Optional field (allows empty string)

## Email Template Changes

The admin notification email now includes phone number in the Customer Information section:

```html
<div class="details">
  <h3>Customer Information:</h3>
  <p><strong>Name:</strong> ${user.name}</p>
  <p><strong>Email:</strong> ${user.email}</p>
  ${user.phone_number ? `<p><strong>Phone:</strong> ${user.phone_number}</p>` : ''}
</div>
```

The phone number only displays if provided, maintaining clean formatting for users without phone numbers.

## Backward Compatibility

- **Existing Users:** Users registered before this update will have `NULL` phone_number values
- **Optional Field:** Phone number is optional during registration
- **Email Templates:** Phone number only displays if available (no broken HTML)
- **Database:** Migration uses `NULL` instead of `NOT NULL` to support existing records

## Testing Checklist

- [ ] Run database migration successfully
- [ ] Register new user with phone number
- [ ] Register new user without phone number
- [ ] Verify phone number appears in admin notification email
- [ ] Verify phone number does not break email for users without it
- [ ] Test phone number validation (valid and invalid formats)
- [ ] Verify existing users can still log in and use the system

## Example Usage

### Registration with Phone Number
```typescript
// Frontend
await registerUser('John Doe', 'john@example.com', 'password123', '+250 785 344 214');
```

### Registration without Phone Number
```typescript
// Frontend
await registerUser('John Doe', 'john@example.com', 'password123');
// or
await registerUser('John Doe', 'john@example.com', 'password123', undefined);
```

## Notes

- Phone number field is optional to maintain backward compatibility
- Existing users can continue using the system without phone numbers
- Phone number validation is lenient to support various international formats
- Email templates gracefully handle missing phone numbers
- Database migration is safe and can be run on production databases
