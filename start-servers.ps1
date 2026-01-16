# Start All Servers Script
Write-Host "Starting Offisho Transport Servers..." -ForegroundColor Cyan
Write-Host ""

# Check if .env files exist
if (-not (Test-Path "backend\.env")) {
    Write-Host "ERROR: backend/.env not found!" -ForegroundColor Red
    Write-Host "Please run setup.ps1 first or create backend/.env manually" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path "frontend\.env")) {
    Write-Host "ERROR: frontend/.env not found!" -ForegroundColor Red
    Write-Host "Please run setup.ps1 first or create frontend/.env manually" -ForegroundColor Yellow
    exit 1
}

# Check Convex URL
$backendEnv = Get-Content "backend\.env" -Raw
if ($backendEnv -notmatch "CONVEX_URL=https://") {
    Write-Host "WARNING: CONVEX_URL not set in backend/.env" -ForegroundColor Yellow
    Write-Host "Please set CONVEX_URL after running: cd backend && npx convex dev --once" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Starting servers in separate windows..." -ForegroundColor Yellow
Write-Host ""

# Start Convex (Terminal 1)
Write-Host "Starting Convex dev server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host 'Convex Dev Server' -ForegroundColor Cyan; npx convex dev" -WindowStyle Normal

Start-Sleep -Seconds 2

# Start Backend (Terminal 2)
Write-Host "Starting Backend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host 'Backend Server (Port 5000)' -ForegroundColor Cyan; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 2

# Start Frontend (Terminal 3)
Write-Host "Starting Frontend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host 'Frontend Server (Port 3000)' -ForegroundColor Cyan; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "All servers starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Servers:" -ForegroundColor Cyan
Write-Host "  - Convex: Running in Terminal 1" -ForegroundColor White
Write-Host "  - Backend: http://localhost:5000 (Terminal 2)" -ForegroundColor White
Write-Host "  - Frontend: http://localhost:3000 (Terminal 3)" -ForegroundColor White
Write-Host ""
Write-Host "The frontend will automatically open in your browser." -ForegroundColor Yellow
Write-Host ""
