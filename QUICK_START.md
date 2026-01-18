# Quick Start Guide

## 🚀 Complete Setup in 3 Steps

### Step 1: Install Dependencies
```powershell
cd backend
npm install
cd ../frontend
npm install
```

### Step 2: Setup MySQL

1. **Install MySQL** if you haven't already.
2. **Create a Database**:
   ```bash
   mysql -u root -p
   # Enter password
   CREATE DATABASE offisho_transport;
   ```
3. **Run the Schema**:
   ```bash
   mysql -u root -p offisho_transport < database/schema.sql
   ```

4. **Configure Environment Variables**:
   - Open `backend/.env`
   - Set `DB_USER` (usually 'root'), `DB_PASSWORD`, etc.

### Step 3: Start Servers

**Option A: Manual Start**

Terminal 1 - Backend:
```powershell
cd backend
npm run dev
```

Terminal 2 - Frontend:
```powershell
cd frontend
npm start
```

### Step 4: Open the App

The frontend will run at: **http://localhost:3000**

## ✅ Checklist

- [ ] Dependencies installed
- [ ] PostgreSQL database created and schema imported
- [ ] Backend .env configured
- [ ] Servers running

