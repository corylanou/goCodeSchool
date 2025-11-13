.PHONY: help dev build clean install templ tailwind server

help:
	@echo "Available commands:"
	@echo "  make install  - Install all dependencies (Go, Node, Air)"
	@echo "  make dev      - Start development server with hot reload"
	@echo "  make build    - Build for production"
	@echo "  make clean    - Clean generated files"
	@echo "  make templ    - Generate Templ files (watch mode)"
	@echo "  make tailwind - Build Tailwind CSS (watch mode)"
	@echo "  make server   - Run Go server with Air (watch mode)"

install:
	@echo "Installing dependencies..."
	go mod download
	npm install
	@echo "Installing Air for hot reload..."
	go install github.com/air-verse/air@latest
	@echo "Installing Templ..."
	go install github.com/a-h/templ/cmd/templ@latest
	@echo "Done! Run 'make dev' to start development server"

dev:
	@echo "Starting development server..."
	@echo "Templ will run on port 7331 (proxy)"
	@echo "Server will run on port 8080"
	@echo "Visit http://localhost:7331 for hot reload"
	@$(MAKE) -j3 templ tailwind server

templ:
	@echo "Starting Templ watcher..."
	templ generate --watch --proxy="http://localhost:8080" --open-browser=false

tailwind:
	@echo "Starting Tailwind watcher..."
	npm run tailwind:watch

server:
	@echo "Starting Go server with Air..."
	air

build:
	@echo "Building for production..."
	templ generate
	npm run tailwind:build
	go build -o bin/server ./cmd/server

clean:
	@echo "Cleaning generated files..."
	rm -rf bin/
	rm -f views/**/*_templ.go
	rm -f static/css/output.css
	@echo "Clean complete"

.DEFAULT_GOAL := help
