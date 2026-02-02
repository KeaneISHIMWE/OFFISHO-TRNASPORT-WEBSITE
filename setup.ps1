# Offisho Transport Setup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Offisho Transport - Complete Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Node.js
Write-Host "Step 1: Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($nodeVersion) {
    Write-Host "Node.js $nodeVersion found" -ForegroundColor Green
} else {
    Write-Host "Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Step 2: Install backend dependencies
Write-Host ""
Write-Host "Step 2: Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
if (Test-Path node_modules) {
    Write-Host "Backend dependencies already installed" -ForegroundColor Green
} else {
    npm install
    Write-Host "Backend dependencies installed" -ForegroundColor Green
}

# Step 3: Install frontend dependencies
Write-Host ""
Write-Host "Step 3: Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ../frontend
if (Test-Path node_modules) {
    Write-Host "Frontend dependencies already installed" -ForegroundColor Green
} else {
    npm install
    Write-Host "Frontend dependencies installed" -ForegroundColor Green
}

# Step 4: Check .env files
Write-Host ""
Write-Host "Step 5: Checking environment files..." -ForegroundColor Yellow
Set-Location ..

if (-not (Test-Path "backend\.env")) {
    Write-Host "Backend .env not found. Creating template..." -ForegroundColor Yellow
    $envContent = @"
JWT_SECRET=offisho-transport-secret-key-change-in-production-2024
NODE_ENV=development
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
FRONTEND_URL=http://localhost:3000
"@
    $envContent | Out-File -FilePath "backend\.env" -Encoding utf8
    Write-Host "Created backend/.env - Please update with your credentials" -ForegroundColor Green
} else {
    Write-Host "Backend .env exists" -ForegroundColor Green
}

if (-not (Test-Path "frontend\.env")) {
    Write-Host "Frontend .env not found. Creating..." -ForegroundColor Yellow
    $envContent = "REACT_APP_API_URL=http://localhost:5000/api"
    $envContent | Out-File -FilePath "frontend\.env" -Encoding utf8
    Write-Host "Created frontend/.env" -ForegroundColor Green
} else {
    Write-Host "Frontend .env exists" -ForegroundColor Green
}

# Step 5: Final instructions
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Update backend/.env with your credentials:" -ForegroundColor White
Write-Host "   - Database connection details" -ForegroundColor Cyan
Write-Host "   - SMTP email settings" -ForegroundColor Cyan
Write-Host "   - Cloudinary credentials" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Start the servers:" -ForegroundColor White
Write-Host "   Easy way: .\start-servers.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Manual way:" -ForegroundColor Cyan
Write-Host "   Terminal 1 (Backend):" -ForegroundColor Cyan
Write-Host "     cd backend; npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Terminal 2 (Frontend):" -ForegroundColor Cyan
Write-Host "     cd frontend; npm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
