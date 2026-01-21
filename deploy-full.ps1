# Full Stack Deployment Script for Vercel
# This script deploys both frontend and backend to Vercel

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Offisho Transport - Full Stack Deploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if logged in to Vercel
Write-Host "Checking Vercel login status..." -ForegroundColor Yellow
$loginCheck = vercel whoami 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in. Please log in to Vercel..." -ForegroundColor Yellow
    Write-Host "A browser window will open for authentication." -ForegroundColor Yellow
    Write-Host ""
    vercel login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Login failed. Please try again." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Green

# Install root dependencies
if (Test-Path "package.json") {
    npm install
}

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location -Path "backend"
npm install
Set-Location -Path ".."

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location -Path "frontend"
npm install
Set-Location -Path ".."

Write-Host ""
Write-Host "Starting deployment..." -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Make sure you have set all environment variables in Vercel Dashboard!" -ForegroundColor Yellow
Write-Host "Required variables:" -ForegroundColor Yellow
Write-Host "  - DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME" -ForegroundColor White
Write-Host "  - JWT_SECRET, JWT_EXPIRES_IN" -ForegroundColor White
Write-Host "  - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET" -ForegroundColor White
Write-Host "  - EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS" -ForegroundColor White
Write-Host "  - FRONTEND_URL, BACKEND_URL, NODE_ENV" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue with deployment..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Deploy to Vercel
Write-Host ""
Write-Host "Deploying to Vercel..." -ForegroundColor Green
vercel --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Set up your MySQL database (PlanetScale, Railway, etc.)" -ForegroundColor White
    Write-Host "2. Run database schema: database/schema.sql" -ForegroundColor White
    Write-Host "3. Update environment variables in Vercel Dashboard" -ForegroundColor White
    Write-Host "4. Update FRONTEND_URL and BACKEND_URL with your Vercel URLs" -ForegroundColor White
    Write-Host "5. Redeploy: vercel --prod" -ForegroundColor White
    Write-Host ""
    Write-Host "Check BACKEND_DEPLOYMENT.md for detailed instructions." -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "Deployment failed. Check the error messages above." -ForegroundColor Red
    exit 1
}
