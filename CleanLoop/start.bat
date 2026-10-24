@echo off
title CleanLoop
cd /d "%~dp0"
echo.
echo   Starting CleanLoop...
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo   Node.js is not installed.
  echo   Download the LTS version from https://nodejs.org , install it, then double-click start.bat again.
  echo.
  pause
  exit /b 1
)
if not exist node_modules\express (
  echo   Installing the server package - one time only...
  call npm install --omit=dev --no-audit --no-fund
)
if not exist client\dist\index.html (
  echo   Building the web app - one time only, needs internet...
  call npm run build
)
node server\index.js --open
pause
