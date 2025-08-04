#!/bin/bash

# Hometrix Docker Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Help function
show_help() {
    echo "Hometrix Docker Management Script"
    echo ""
    echo "Usage: ./docker-manage.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build       Build all Docker images"
    echo "  up          Start all services in production mode"
    echo "  dev         Start all services in development mode"
    echo "  down        Stop all services"
    echo "  restart     Restart all services"
    echo "  logs        Show logs for all services"
    echo "  status      Show status of all services"
    echo "  clean       Clean up Docker resources"
    echo "  reset       Reset all data and restart"
    echo "  help        Show this help message"
    echo ""
}

# Build images
build_images() {
    print_status "Building Docker images..."
    docker-compose build --no-cache
    print_success "All images built successfully!"
}

# Start services in production
start_production() {
    print_status "Starting services in production mode..."
    docker-compose up -d
    print_success "All services started in production mode!"
    show_status
}

# Start services in development
start_development() {
    print_status "Starting services in development mode..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
    print_success "All services started in development mode!"
    show_status
}

# Stop services
stop_services() {
    print_status "Stopping all services..."
    docker-compose down
    print_success "All services stopped!"
}

# Restart services
restart_services() {
    print_status "Restarting all services..."
    docker-compose restart
    print_success "All services restarted!"
    show_status
}

# Show logs
show_logs() {
    print_status "Showing logs for all services..."
    docker-compose logs -f
}

# Show status
show_status() {
    print_status "Service status:"
    docker-compose ps
    echo ""
    print_status "Service URLs:"
    echo "  Frontend:           http://localhost:3000"
    echo "  Auth Service:       http://localhost:5001"
    echo "  Prediction Service: http://localhost:5002"
    echo "  MongoDB:            mongodb://localhost:27017"
    echo "  Nginx Proxy:        http://localhost:80"
}

# Clean up resources
clean_resources() {
    print_warning "This will remove all stopped containers, unused networks, and build cache."
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Cleaning up Docker resources..."
        docker system prune -f
        docker volume prune -f
        print_success "Cleanup completed!"
    else
        print_status "Cleanup cancelled."
    fi
}

# Reset all data
reset_data() {
    print_warning "This will stop all services and remove all data volumes."
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Resetting all data..."
        docker-compose down -v
        docker-compose up -d
        print_success "Reset completed!"
        show_status
    else
        print_status "Reset cancelled."
    fi
}

# Main script logic
case "${1:-help}" in
    build)
        build_images
        ;;
    up)
        start_production
        ;;
    dev)
        start_development
        ;;
    down)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    logs)
        show_logs
        ;;
    status)
        show_status
        ;;
    clean)
        clean_resources
        ;;
    reset)
        reset_data
        ;;
    help|*)
        show_help
        ;;
esac
