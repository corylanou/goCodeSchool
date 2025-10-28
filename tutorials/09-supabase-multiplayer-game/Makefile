.PHONY: help setup start stop reset clean run dev test

# Default target
help:
	@echo "Available commands:"
	@echo "  make setup    - Initial project setup (install dependencies, start Supabase)"
	@echo "  make start    - Start Supabase services"
	@echo "  make stop     - Stop Supabase services"
	@echo "  make reset    - Reset database (warning: loses all data)"
	@echo "  make run      - Run the Go server"
	@echo "  make dev      - Start Supabase and run server (development mode)"
	@echo "  make clean    - Stop services and clean up"
	@echo "  make test     - Run tests"

# Setup project
setup:
	@echo "Setting up project..."
	npm install -g supabase
	supabase init || true
	supabase start
	go mod download
	@echo "Setup complete! Don't forget to:"
	@echo "1. Create .envrc file with Supabase keys"
	@echo "2. Run: direnv allow"
	@echo "3. Update app.js with SUPABASE_ANON_KEY"

# Start Supabase
start:
	@echo "Starting Supabase..."
	supabase start

# Stop Supabase
stop:
	@echo "Stopping Supabase..."
	supabase stop

# Reset database
reset:
	@echo "Resetting database..."
	supabase db reset

# Run Go server
run:
	@echo "Starting game server on http://localhost:8080..."
	go run main.go

# Development mode (start everything)
dev:
	@echo "Starting development environment..."
	@make start
	@sleep 5
	@make run

# Clean up
clean:
	@echo "Cleaning up..."
	supabase stop
	rm -rf .supabase

# Run tests (placeholder)
test:
	@echo "Running tests..."
	go test ./...