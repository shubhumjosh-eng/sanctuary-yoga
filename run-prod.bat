@echo off
cd /d C:\Users\shubh\OneDrive\Desktop\sanctuary-yoga-studio\sanctuary
echo Building...
call npm run build
if %ERRORLEVEL% NEQ 0 (
  echo Build failed!
  pause
  exit /b 1
)
echo.
echo Starting server...
call npm run start