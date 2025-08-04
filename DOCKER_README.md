# Hometrix Docker Setup

This repository contains a complete Docker Compose setup for the Hometrix House Price Prediction application.

## Architecture

The application consists of the following services:

- **Frontend**: React application with Vite (Port 3000)
- **Auth Service**: Node.js authentication API (Port 5001)
- **Prediction Service**: Python Flask ML prediction API (Port 5002)
- **MongoDB**: Database for user data and predictions (Port 27017)
- **Nginx**: Reverse proxy and load balancer (Port 80)

## Prerequisites

- Docker Desktop installed and running
- At least 4GB of available RAM
- Ports 80, 3000, 5001, 5002, and 27017 available

## Quick Start

### Using Management Scripts

#### Windows Users:
```cmd
# Run the interactive management script
docker-manage.bat
```

#### Linux/Mac Users:
```bash
# Make script executable
chmod +x docker-manage.sh

# Run the management script
./docker-manage.sh help
```

### Manual Commands

#### Production Deployment:
```bash
# Build all images
docker-compose build

# Start all services
docker-compose up -d

# Check status
docker-compose ps
```

#### Development Mode:
```bash
# Start with development overrides
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

## Service URLs

Once running, access the application at:

- **Main Application**: http://localhost:3000
- **API Documentation**: http://localhost:5001/api
- **Prediction API**: http://localhost:5002
- **Direct Database**: mongodb://localhost:27017

## Environment Configuration

### Production (.env)
```env
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=hometrix2025
JWT_SECRET=your-super-secret-jwt-key-2025
NODE_ENV=production
FLASK_ENV=production
```

### Development
Development mode uses different environment variables optimized for debugging and hot-reload.

## Available Commands

### Management Script Commands:
- `build` - Build all Docker images
- `up` - Start services in production mode
- `dev` - Start services in development mode
- `down` - Stop all services
- `restart` - Restart all services
- `logs` - Show logs for all services
- `status` - Show status of all services
- `clean` - Clean up Docker resources
- `reset` - Reset all data and restart

### Docker Compose Commands:
```bash
# Build specific service
docker-compose build frontend

# View logs for specific service
docker-compose logs -f auth-service

# Scale a service
docker-compose up -d --scale prediction-service=3

# Execute command in running container
docker-compose exec auth-service npm run test

# Stop and remove everything
docker-compose down -v
```

## Data Persistence

- **MongoDB Data**: Stored in named volume `mongodb_data`
- **Application Logs**: Available via `docker-compose logs`
- **Static Assets**: Built and served by Nginx

## Security Features

- Non-root users in all containers
- Security headers in Nginx
- Rate limiting on API endpoints
- Isolated network for inter-service communication
- Environment variables for sensitive data

## Health Checks

All services include health checks:
- Frontend: HTTP check on port 3000
- Auth Service: HTTP check on `/api/health`
- Prediction Service: HTTP check on `/health`
- MongoDB: Built-in health monitoring

## Troubleshooting

### Common Issues:

1. **Port Conflicts**:
   ```bash
   # Check what's using a port
   netstat -tulpn | grep :3000
   ```

2. **Memory Issues**:
   ```bash
   # Increase Docker memory limit to 4GB+
   # In Docker Desktop: Settings > Resources > Memory
   ```

3. **Permission Errors**:
   ```bash
   # Reset file permissions
   sudo chown -R $USER:$USER .
   ```

4. **Service Won't Start**:
   ```bash
   # Check logs for specific service
   docker-compose logs auth-service
   
   # Rebuild if needed
   docker-compose build --no-cache auth-service
   ```

### Debugging:

```bash
# Enter running container
docker-compose exec frontend sh

# View real-time logs
docker-compose logs -f --tail=100

# Check container resource usage
docker stats

# Inspect network
docker network inspect hometrix_hometrix-network
```

## Development Workflow

1. **Start Development Environment**:
   ```bash
   ./docker-manage.sh dev
   ```

2. **Make Code Changes**: Files are mounted as volumes for hot-reload

3. **Test Changes**: Services automatically restart on file changes

4. **View Logs**: 
   ```bash
   ./docker-manage.sh logs
   ```

5. **Rebuild After Dependencies Change**:
   ```bash
   ./docker-manage.sh build
   ```

## Production Deployment

1. **Update Environment Variables**:
   - Change default passwords
   - Set production JWT secret
   - Configure external database if needed

2. **Build and Deploy**:
   ```bash
   ./docker-manage.sh build
   ./docker-manage.sh up
   ```

3. **Monitor**:
   ```bash
   ./docker-manage.sh status
   ```

## Backup and Restore

### Backup MongoDB:
```bash
# Create backup
docker-compose exec mongodb mongodump --out /tmp/backup

# Copy to host
docker cp hometrix-mongodb:/tmp/backup ./mongodb-backup
```

### Restore MongoDB:
```bash
# Copy backup to container
docker cp ./mongodb-backup hometrix-mongodb:/tmp/restore

# Restore
docker-compose exec mongodb mongorestore /tmp/restore
```

## Performance Optimization

- **Nginx**: Configured with gzip, caching, and security headers
- **Database**: Indexed fields for faster queries
- **Images**: Multi-stage builds for smaller image sizes
- **Resources**: Health checks and restart policies configured

## Support

For issues or questions:
1. Check the logs: `./docker-manage.sh logs`
2. Verify service status: `./docker-manage.sh status`
3. Try rebuilding: `./docker-manage.sh build`
4. Reset if needed: `./docker-manage.sh reset`
