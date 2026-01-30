# Troubleshooting bundle.js Loading Error

## ✅ Confirmed: Webpack Compiles Successfully
The webpack configuration is correct and can compile bundle.js without errors.

## The Problem
The webpack-dev-server is running but bundle.js isn't being served correctly. This is usually due to:
1. **Dev server needs restart** - Config changes require a restart
2. **Browser cache** - Old HTML/scripts cached
3. **Dev server not compiling** - Check terminal for errors

## Step-by-Step Fix

### 1. Stop the Dev Server
- Find the terminal/PowerShell running `npm start`
- Press `Ctrl+C` to stop
- Wait 5 seconds for it to fully stop

### 2. Clear Everything
```powershell
cd frontend

# Clear dist folder
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

# Clear webpack cache
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue

# Clear npm cache (optional)
npm cache clean --force
```

### 3. Restart Dev Server
```powershell
npm start
```

**Watch for these messages:**
- ✅ `Frontend dev server running on http://localhost:3000`
- ✅ `webpack compiled successfully`
- ✅ `Bundle.js available at: http://localhost:3000/bundle.js`

**If you see ERRORS, note them down!**

### 4. Clear Browser Cache
1. Open `http://localhost:3000`
2. Press `F12` to open DevTools
3. Right-click the refresh button
4. Select "Empty Cache and Hard Reload"
   
   OR
   
   Press `Ctrl+Shift+Delete` → Clear "Cached images and files"

### 5. Verify bundle.js is Loading
1. Open DevTools (F12)
2. Go to **Network** tab
3. Refresh the page (`Ctrl+F5`)
4. Look for `bundle.js` in the list
5. Check its status:
   - ✅ **200 OK** = Working!
   - ❌ **404** = Dev server issue
   - ❌ **Failed** = Network/CORS issue

### 6. Test bundle.js Directly
Open this URL in your browser:
```
http://localhost:3000/bundle.js
```

**Expected:** You should see JavaScript code (starts with `!function` or `(function()`)
**If 404:** Dev server isn't serving the file

## If Still Not Working

### Check Terminal Output
Look at the terminal where `npm start` is running:
- Are there any **red error messages**?
- Does it say "webpack compiled successfully"?
- Are there TypeScript errors?

### Check for Port Conflicts
```powershell
netstat -ano | findstr ":3000"
```
If multiple processes are listed, kill them:
```powershell
# Find the process ID (PID) from netstat output
taskkill /PID <PID> /F
```

### Alternative: Use Production Build
If dev server continues to fail, use production build:
```powershell
cd frontend
npm run build
npx serve dist -p 3000
```

## Common Issues

### Issue: "Cannot GET /bundle.js"
**Solution:** Dev server isn't running or didn't compile. Check terminal for errors.

### Issue: Bundle.js loads but app doesn't work
**Solution:** Check browser console (F12) for JavaScript errors.

### Issue: HMR waiting but bundle.js fails
**Solution:** Dev server is running but not compiling. Restart the server.

### Issue: CORS errors
**Solution:** Already handled in webpack config. If persists, check backend CORS settings.
