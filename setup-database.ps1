# Database Setup Helper Script
# This script helps you configure your database connection

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Database Setup Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$envPath = "backend\.env"

# Check if .env exists
if (-not (Test-Path $envPath)) {
    Write-Host "❌ .env file not found at: $envPath" -ForegroundColor Red
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" $envPath -ErrorAction SilentlyContinue
}

Write-Host "Current database configuration:" -ForegroundColor Yellow
Get-Content $envPath | Select-String -Pattern "DB_" | ForEach-Object {
    Write-Host "  $_" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Choose your database setup:" -ForegroundColor Cyan
Write-Host "1. Railway (Cloud - Recommended - Free)" -ForegroundColor Green
Write-Host "2. Local MySQL" -ForegroundColor Green
Write-Host "3. Manual Configuration" -ForegroundColor Green
Write-Host ""

$choice = Read-Host "Enter choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "=== Railway Setup ===" -ForegroundColor Magenta
        Write-Host ""
        Write-Host "1. Go to: https://railway.app" -ForegroundColor White
        Write-Host "2. Create account and new project" -ForegroundColor White
        Write-Host "3. Add MySQL database" -ForegroundColor White
        Write-Host "4. Copy connection details from Variables tab" -ForegroundColor White
        Write-Host ""
        
        $dbHost = Read-Host "Enter DB_HOST (MYSQLHOST from Railway)"
        $dbPort = Read-Host "Enter DB_PORT (default: 3306)" 
        if ([string]::IsNullOrEmpty($dbPort)) { $dbPort = "3306" }
        $dbUser = Read-Host "Enter DB_USER (MYSQLUSER from Railway)"
        $dbPassword = Read-Host "Enter DB_PASSWORD (MYSQLPASSWORD from Railway)" -AsSecureString
        $dbName = Read-Host "Enter DB_NAME (default: railway)"
        if ([string]::IsNullOrEmpty($dbName)) { $dbName = "railway" }
        
        $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword)
        $dbPasswordPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
        
        # Update .env file
        $envContent = Get-Content $envPath -Raw
        $envContent = $envContent -replace "DB_HOST=.*", "DB_HOST=$dbHost"
        $envContent = $envContent -replace "DB_PORT=.*", "DB_PORT=$dbPort"
        $envContent = $envContent -replace "DB_USER=.*", "DB_USER=$dbUser"
        $envContent = $envContent -replace "DB_PASSWORD=.*", "DB_PASSWORD=$dbPasswordPlain"
        $envContent = $envContent -replace "DB_NAME=.*", "DB_NAME=$dbName"
        
        Set-Content -Path $envPath -Value $envContent -NoNewline
        
        Write-Host ""
        Write-Host "✅ Database configuration updated!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Run database schema in Railway Query tab" -ForegroundColor White
        Write-Host "2. Copy contents of database/schema.sql" -ForegroundColor White
        Write-Host "3. Paste and run in Railway" -ForegroundColor White
        Write-Host "4. Restart backend: cd backend; npm start" -ForegroundColor White
    }
    "2" {
        Write-Host ""
        Write-Host "=== Local MySQL Setup ===" -ForegroundColor Magenta
        Write-Host ""
        
        $dbHost = Read-Host "Enter DB_HOST (default: localhost)"
        if ([string]::IsNullOrEmpty($dbHost)) { $dbHost = "localhost" }
        $dbPort = Read-Host "Enter DB_PORT (default: 3306)"
        if ([string]::IsNullOrEmpty($dbPort)) { $dbPort = "3306" }
        $dbUser = Read-Host "Enter DB_USER (default: root)"
        if ([string]::IsNullOrEmpty($dbUser)) { $dbUser = "root" }
        $dbPassword = Read-Host "Enter DB_PASSWORD (press Enter if none)" -AsSecureString
        $dbName = Read-Host "Enter DB_NAME (default: offisho_transport)"
        if ([string]::IsNullOrEmpty($dbName)) { $dbName = "offisho_transport" }
        
        $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword)
        $dbPasswordPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
        if ([string]::IsNullOrEmpty($dbPasswordPlain)) { $dbPasswordPlain = "" }
        
        # Update .env file
        $envContent = Get-Content $envPath -Raw
        $envContent = $envContent -replace "DB_HOST=.*", "DB_HOST=$dbHost"
        $envContent = $envContent -replace "DB_PORT=.*", "DB_PORT=$dbPort"
        $envContent = $envContent -replace "DB_USER=.*", "DB_USER=$dbUser"
        $envContent = $envContent -replace "DB_PASSWORD=.*", "DB_PASSWORD=$dbPasswordPlain"
        $envContent = $envContent -replace "DB_NAME=.*", "DB_NAME=$dbName"
        
        Set-Content -Path $envPath -Value $envContent -NoNewline
        
        Write-Host ""
        Write-Host "✅ Database configuration updated!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Create database: CREATE DATABASE $dbName;" -ForegroundColor White
        Write-Host "2. Run schema: mysql -u $dbUser -p $dbName < database/schema.sql" -ForegroundColor White
        Write-Host "3. Restart backend: cd backend; npm start" -ForegroundColor White
    }
    "3" {
        Write-Host ""
        Write-Host "=== Manual Configuration ===" -ForegroundColor Magenta
        Write-Host ""
        Write-Host "Edit the file: backend\.env" -ForegroundColor Yellow
        Write-Host "Update these variables:" -ForegroundColor Yellow
        Write-Host "  DB_HOST=your-database-host" -ForegroundColor White
        Write-Host "  DB_PORT=3306" -ForegroundColor White
        Write-Host "  DB_USER=your-database-user" -ForegroundColor White
        Write-Host "  DB_PASSWORD=your-database-password" -ForegroundColor White
        Write-Host "  DB_NAME=your-database-name" -ForegroundColor White
        Write-Host ""
        Write-Host "Then restart your backend server." -ForegroundColor Yellow
    }
    default {
        Write-Host "Invalid choice" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
