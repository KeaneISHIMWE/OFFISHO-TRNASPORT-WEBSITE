# Backend Server Restart Required

## Issue
The phone number is not appearing in emails because the backend server is running old code.

## Solution
**You need to restart your backend server** to load the updated code that includes:
- Phone number retrieval from database
- Updated email template with phone number display
- Improved null/undefined handling

## Steps to Restart Backend

### If running with npm/node:
1. Stop the current backend server (Ctrl+C in the terminal)
2. Navigate to backend directory:
   ```bash
   cd backend
   ```
3. Start the server:
   ```bash
   npm start
   # or
   npm run dev
   # or
   node dist/server.js
   ```

### If running with ts-node:
```bash
cd backend
npm run dev
# or
npx ts-node src/server.ts
```

### If running on Railway/Production:
The server should auto-restart when you push changes, but you can manually restart:
1. Go to Railway dashboard
2. Find your backend service
3. Click "Restart" or "Redeploy"

## Verification

After restarting, check the console logs when a request is created. You should see:
```
📧 User data for email: { phone_number: '+250 785 344 214', ... }
📧 Email - User phone_number: { phone_number: '+250 785 344 214', ... }
📧 Final phoneDisplay value: +250 785 344 214
```

## Testing

1. Restart backend server
2. Submit a new rental request
3. Check the admin notification email
4. The phone number should now appear in the "Customer Information" section

## Current Status

✅ Phone number is in database: `+250 785 344 214` (for keaneishimwe@gmail.com)
✅ Email template updated to show phone number
✅ Code updated to handle phone number correctly
⏳ **Backend server needs restart to apply changes**
