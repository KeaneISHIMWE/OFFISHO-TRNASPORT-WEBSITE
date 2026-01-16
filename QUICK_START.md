# Quick Start Guide

## 🚀 Complete Setup in 3 Steps

### Step 1: Install Dependencies (Already Done!)
Dependencies are installed. If you need to reinstall:
```powershell
cd backend
npm install
cd ../frontend
npm install
```

### Step 2: Setup Convex (REQUIRED - Interactive)

**You need to do this manually:**

1. Open a terminal in the `backend` folder:
```powershell
cd backend
```

2. Run Convex setup:
```powershell
npx convex dev --once
```

3. This will:
   - Open your browser
   - Ask you to login/create Convex account
   - Create a new project
   - Give you a Convex URL like: `https://your-project.convex.cloud`

4. Copy the Convex URL and add it to `backend/.env`:
   - Open `backend/.env`
   - Replace the empty `CONVEX_URL=` with: `CONVEX_URL=https://your-project.convex.cloud`
   - Save the file

5. Generate TypeScript types:
```powershell
npx convex dev --once
```

### Step 3: Start All Servers

**Option A: Use the start script (Recommended)**
```powershell
.\start-servers.ps1
```

**Option B: Manual start (3 terminals)**

Terminal 1 - Convex:
```powershell
cd backend
npx convex dev
```

Terminal 2 - Backend:
```powershell
cd backend
npm run dev
```

Terminal 3 - Frontend:
```powershell
cd frontend
npm start
```

### Step 4: Open the App

The frontend will automatically open at: **http://localhost:3000**

## ✅ Checklist

- [x] Dependencies installed
- [x] Environment files created
- [ ] Convex account created and URL added to backend/.env
- [ ] Convex types generated
- [ ] All servers running

## 🆘 Troubleshooting

**Convex URL not set:**
- Make sure you completed Step 2
- Check `backend/.env` has `CONVEX_URL=https://...`

**Port already in use:**
- Backend (5000): Close other apps using port 5000
- Frontend (3000): Close other apps using port 3000

**Convex errors:**
- Make sure you're logged in: `npx convex dev --once`
- Check your internet connection
- Verify the Convex URL in `.env` is correct

## 📝 Next Steps After Setup

1. **Create an admin user:**
   - Register a new account through the app
   - Manually update the user role to "admin" in Convex dashboard

2. **Add cars:**
   - Login as admin
   - Go to Admin Portal
   - Add cars with images

3. **Configure email (optional):**
   - Update SMTP settings in `backend/.env`
   - Required for email notifications

4. **Configure Cloudinary (optional):**
   - Sign up at cloudinary.com
   - Add credentials to `backend/.env`
   - Required for image uploads

## 🎉 You're All Set!

The application is ready to use. Start making requests and managing cars!
