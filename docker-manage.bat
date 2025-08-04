@echo off
setlocal enabledelayedexpansion

:: Hometrix Docker Management Script for Windows

title Hometrix Docker Manager

:: Check if Docker is running
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

:: Main menu
:menu
cls
echo ===============================================
echo         Hometrix Docker Manager
echo ===============================================
echo.
echo 1. Build all images
echo 2. Start services (Production)
echo 3. Start services (Development)
echo 4. Stop all services
echo 5. Restart services
echo 6. Show logs
echo 7. Show status
echo 8. Clean up resources
echo 9. Reset all data
echo 0. Exit
echo.
set /p choice="Select an option (0-9): "

if "%choice%"=="1" goto build
if "%choice%"=="2" goto production
if "%choice%"=="3" goto development
if "%choice%"=="4" goto stop
if "%choice%"=="5" goto restart
if "%choice%"=="6" goto logs
if "%choice%"=="7" goto status
if "%choice%"=="8" goto clean
if "%choice%"=="9" goto reset
if "%choice%"=="0" goto exit
goto menu

:build
echo [INFO] Building Docker images...
docker-compose build --no-cache
if %errorlevel% equ 0 (
    echo [SUCCESS] All images built successfully!
) else (
    echo [ERROR] Build failed!
)
pause
goto menu

:production
echo [INFO] Starting services in production mode...
docker-compose up -d
if %errorlevel% equ 0 (
    echo [SUCCESS] All services started in production mode!
    call :show_urls
) else (
    echo [ERROR] Failed to start services!
)
pause
goto menu

:development
echo [INFO] Starting services in development mode...
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
if %errorlevel% equ 0 (
    echo [SUCCESS] All services started in development mode!
    call :show_urls
) else (
    echo [ERROR] Failed to start services!
)
pause
goto menu

:stop
echo [INFO] Stopping all services...
docker-compose down
if %errorlevel% equ 0 (
    echo [SUCCESS] All services stopped!
) else (
    echo [ERROR] Failed to stop services!
)
pause
goto menu

:restart
echo [INFO] Restarting all services...
docker-compose restart
if %errorlevel% equ 0 (
    echo [SUCCESS] All services restarted!
    call :show_urls
) else (
    echo [ERROR] Failed to restart services!
)
pause
goto menu

:logs
echo [INFO] Showing logs... (Press Ctrl+C to stop)
docker-compose logs -f
pause
goto menu

:status
echo [INFO] Service status:
docker-compose ps
echo.
call :show_urls
pause
goto menu

:clean
echo [WARNING] This will remove all stopped containers and unused resources.
set /p confirm="Are you sure? (y/N): "
if /i "%confirm%"=="y" (
    echo [INFO] Cleaning up Docker resources...
    docker system prune -f
    docker volume prune -f
    echo [SUCCESS] Cleanup completed!
) else (
    echo [INFO] Cleanup cancelled.
)
pause
goto menu

:reset
echo [WARNING] This will stop all services and remove all data volumes.
set /p confirm="Are you sure? (y/N): "
if /i "%confirm%"=="y" (
    echo [INFO] Resetting all data...
    docker-compose down -v
    docker-compose up -d
    echo [SUCCESS] Reset completed!
    call :show_urls
) else (
    echo [INFO] Reset cancelled.
)
pause
goto menu

:show_urls
echo.
echo Docker Service URLs (when running in containers):
echo   Frontend:           http://localhost:3000
echo   Auth Service:       http://localhost:5001
echo   Prediction Service: http://localhost:5002
echo   MongoDB:            mongodb://localhost:27017
echo   Nginx Proxy:        http://localhost:80
echo.
echo Development Mode URLs (when running locally):
echo   Frontend:           http://localhost:5173 (Vite dev server)
echo   Auth Service:       http://localhost:5001
echo   Prediction Service: http://localhost:5002
echo   MongoDB:            mongodb://localhost:27017
echo.
goto :eof

:exit
echo Thanks for using Hometrix Docker Manager!
pause
exit /b 0
