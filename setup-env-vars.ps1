# Interactive script to help set Vercel environment variables
# This will guide you through setting all required environment variables

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Vercel Environment Variables Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will help you set environment variables in Vercel." -ForegroundColor Yellow
Write-Host "Make sure you have completed SETUP_SERVICES.md first!" -ForegroundColor Yellow
Write-Host ""

# Check if logged in
$whoami = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in to Vercel. Please run: vercel login" -ForegroundColor Red
    exit 1
}

Write-Host "Logged in as: $whoami" -ForegroundColor Green
Write-Host ""

# Function to set environment variable
function Set-VercelEnv {
    param(
        [string]$Name,
        [string]$Description,
        [string]$Value = ""
    )
    
    Write-Host "Setting: $Name" -ForegroundColor Cyan
    Write-Host "Description: $Description" -ForegroundColor Gray
    
    if ([string]::IsNullOrEmpty($Value)) {
        $Value = Read-Host "Enter value for $Name"
    }
    
    if ([string]::IsNullOrEmpty($Value)) {
        Write-Host "Skipping $Name (empty value)" -ForegroundColor Yellow
        return
    }
    
    Write-Host "Setting $Name..." -ForegroundColor Yellow
    vercel env add $Name production
    Write-Host "✓ Set $Name" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Starting environment variable setup..." -ForegroundColor Green
Write-Host ""

# Database Variables
Write-Host "=== DATABASE CONFIGURATION ===" -ForegroundColor Magenta
Set-VercelEnv -Name "DB_HOST" -Description "MySQL database host"
Set-VercelEnv -Name "DB_PORT" -Description "MySQL database port (usually 3306)" -Value "3306"
Set-VercelEnv -Name "DB_USER" -Description "MySQL database username"
Set-VercelEnv -Name "DB_PASSWORD" -Description "MySQL database password"
Set-VercelEnv -Name "DB_NAME" -Description "MySQL database name" -Value "offisho_transport"

Write-Host ""

# JWT Variables
Write-Host "=== JWT CONFIGURATION ===" -ForegroundColor Magenta
Write-Host "Generating JWT secret..." -ForegroundColor Yellow
$jwtSecret = node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Generated JWT secret. Setting it now..." -ForegroundColor Green
    Set-VercelEnv -Name "JWT_SECRET" -Description "JWT secret key" -Value $jwtSecret.Trim()
} else {
    Set-VercelEnv -Name "JWT_SECRET" -Description "JWT secret key (generate with: node -e `"console.log(require('crypto').randomBytes(64).toString('hex'))`")"
}
Set-VercelEnv -Name "JWT_EXPIRES_IN" -Description "JWT expiration time" -Value "24h"

Write-Host ""

# Cloudinary Variables
Write-Host "=== CLOUDINARY CONFIGURATION (REQUIRED) ===" -ForegroundColor Magenta
Set-VercelEnv -Name "CLOUDINARY_CLOUD_NAME" -Description "Cloudinary cloud name"
Set-VercelEnv -Name "CLOUDINARY_API_KEY" -Description "Cloudinary API key"
Set-VercelEnv -Name "CLOUDINARY_API_SECRET" -Description "Cloudinary API secret"

Write-Host ""

# Email Variables
Write-Host "=== EMAIL CONFIGURATION ===" -ForegroundColor Magenta
Set-VercelEnv -Name "EMAIL_HOST" -Description "SMTP host" -Value "smtp.gmail.com"
Set-VercelEnv -Name "EMAIL_PORT" -Description "SMTP port" -Value "587"
Set-VercelEnv -Name "EMAIL_USER" -Description "Email address"
Set-VercelEnv -Name "EMAIL_PASS" -Description "Email password or app password"

Write-Host ""

# URL Variables (will be set after deployment)
Write-Host "=== URL CONFIGURATION ===" -ForegroundColor Magenta
Write-Host "These will be set after first deployment with your actual Vercel URLs" -ForegroundColor Yellow
Write-Host "For now, you can set placeholder values:" -ForegroundColor Yellow
Set-VercelEnv -Name "FRONTEND_URL" -Description "Frontend URL (update after deployment)"
Set-VercelEnv -Name "BACKEND_URL" -Description "Backend URL (update after deployment)"
Set-VercelEnv -Name "REACT_APP_API_URL" -Description "API URL for frontend (update after deployment)"
Set-VercelEnv -Name "NODE_ENV" -Description "Node environment" -Value "production"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Environment variables setup complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Deploy: vercel --yes" -ForegroundColor White
Write-Host "2. Update FRONTEND_URL, BACKEND_URL, and REACT_APP_API_URL with your actual Vercel URLs" -ForegroundColor White
Write-Host "3. Run database schema: See SETUP_DATABASE.md" -ForegroundColor White
Write-Host "4. Redeploy: vercel --prod" -ForegroundColor White
Write-Host ""
