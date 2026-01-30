# Restart Frontend Dev Server Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Frontend Dev Server Restart Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the frontend directory
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the frontend directory." -ForegroundColor Yellow
    Write-Host "Current directory: $PWD" -ForegroundColor Yellow
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "WARNING: node_modules not found!" -ForegroundColor Yellow
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to install dependencies!" -ForegroundColor Red
        exit 1
    }
}

# Stop any existing processes on port 3000
Write-Host "Step 1: Stopping processes on port 3000..." -ForegroundColor Yellow
$connections = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($connections) {
    $processes = $connections | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($processId in $processes) {
        try {
            $proc = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($proc) {
                Write-Host "  Stopping process $processId ($($proc.ProcessName))..." -ForegroundColor Gray
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
                Write-Host "  ✓ Stopped process $processId" -ForegroundColor Green
            }
        } catch {
            Write-Host "  ⚠ Could not stop process $processId" -ForegroundColor Yellow
        }
    }
    Write-Host "  Waiting for port to be released..." -ForegroundColor Gray
    Start-Sleep -Seconds 3
} else {
    Write-Host "  ✓ No processes found on port 3000" -ForegroundColor Green
}

# Clear dist folder (optional, but helps ensure clean state)
Write-Host ""
Write-Host "Step 2: Clearing dist folder..." -ForegroundColor Yellow
if (Test-Path "dist") {
    try {
        Remove-Item -Recurse -Force "dist" -ErrorAction Stop
        Write-Host "  ✓ Cleared dist folder" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠ Could not clear dist folder (may be in use)" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ✓ Dist folder doesn't exist (nothing to clear)" -ForegroundColor Green
}

# Clear node_modules/.cache if it exists
if (Test-Path "node_modules\.cache") {
    Write-Host "  Clearing webpack cache..." -ForegroundColor Gray
    Remove-Item -Recurse -Force "node_modules\.cache" -ErrorAction SilentlyContinue
    Write-Host "  ✓ Cleared webpack cache" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 3: Starting frontend dev server..." -ForegroundColor Green
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host "  Server will start on: http://localhost:3000" -ForegroundColor Cyan
Write-Host "  Once you see 'webpack compiled successfully'," -ForegroundColor Cyan
Write-Host "  open the URL above and press Ctrl+F5" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

# Start the dev server
try {
    npm start
} catch {
    Write-Host ""
    Write-Host "ERROR: Failed to start dev server!" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try running manually: npm start" -ForegroundColor Yellow
    exit 1
}
