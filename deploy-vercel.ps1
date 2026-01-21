# Vercel Deployment Script for Offisho Transport Frontend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Offisho Transport - Vercel Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
Set-Location -Path "frontend"

# Check if logged in
Write-Host "Checking Vercel login status..." -ForegroundColor Yellow
$loginCheck = vercel whoami 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in. Please log in to Vercel..." -ForegroundColor Yellow
    Write-Host "A browser window will open for authentication." -ForegroundColor Yellow
    Write-Host ""
    vercel login
}

Write-Host ""
Write-Host "Starting deployment..." -ForegroundColor Green
Write-Host ""

# Deploy to Vercel
# Use --yes for non-interactive mode (will use defaults)
vercel --yes

Write-Host ""
Write-Host "Deployment initiated!" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Set environment variable REACT_APP_API_URL in Vercel Dashboard" -ForegroundColor Yellow
Write-Host "Go to: Vercel Dashboard > Your Project > Settings > Environment Variables" -ForegroundColor Yellow
Write-Host "Add: REACT_APP_API_URL = https://your-backend-api-url.com/api" -ForegroundColor Yellow
Write-Host ""
Write-Host "After setting environment variables, run:" -ForegroundColor Cyan
Write-Host "  vercel --prod" -ForegroundColor White
Write-Host ""

# Return to root directory
Set-Location -Path ".."
