# 🔐 Admin Credentials

## Default Demo Admin Credentials

**Email:** `admin@offisho.com`  
**Password:** `admin123`

---

## How to Create Admin User

### Option 1: Using the Script (Recommended)

Make sure your database is set up first, then run:

```powershell
cd backend
npx ts-node scripts/createAdmin.ts
```

Or if you have it compiled:

```powershell
cd backend
node dist/scripts/createAdmin.js
```

### Option 2: Manual SQL (If script doesn't work)

You'll need to hash the password `admin123` using bcrypt. The easiest way is to use the script above.

### Option 3: Register via API

Once your backend is running:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@offisho.com",
  "password": "admin123"
}
```

Then manually update the role to 'admin' in the database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@offisho.com';
```

---

## Important Notes

⚠️ **Security Warning:** These are demo credentials. **Change the password immediately** in production!

- The default password `admin123` is weak and should be changed
- Consider using a stronger password for production environments
- The admin email can be changed using `backend/scripts/updateAdminEmail.ts`

---

## Troubleshooting

### "Admin user already exists"
- The admin user is already created
- Use the credentials above to login
- If you forgot the password, you can reset it or create a new admin

### "Database connection failed"
- Make sure your database is set up first
- See `QUICK_DATABASE_SETUP.md` for database setup instructions
- Verify your `.env` file has correct database credentials

### Script not found
- Make sure you're in the `backend` directory
- Install dependencies: `npm install`
- Use `npx ts-node scripts/createAdmin.ts` to run TypeScript directly

---

## Login Instructions

1. Make sure backend is running: `cd backend && npm start`
2. Go to your frontend login page
3. Enter:
   - **Email:** `admin@offisho.com`
   - **Password:** `admin123`
4. Click "Sign In"
5. You'll be redirected to the Admin Dashboard

---

**Default Credentials Summary:**
```
Email: admin@offisho.com
Password: admin123
```
