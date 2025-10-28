#!/bin/bash

echo "🚀 Setting up Crewmate Crisis - Supabase Multiplayer Game"
echo "=================================================="
echo ""

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop first."
    echo ""
    echo "   macOS: brew install --cask docker"
    echo "   Or visit: https://www.docker.com/products/docker-desktop"
    echo ""
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    echo "   macOS: open -a Docker"
    exit 1
fi

echo "✅ Docker is installed and running"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+."
    echo "   Visit: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js is installed ($(node -v))"

# Check for Go
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go 1.25+."
    echo "   Visit: https://go.dev/dl/"
    exit 1
fi

echo "✅ Go is installed ($(go version))"

# Check for direnv
if ! command -v direnv &> /dev/null; then
    echo "⚠️  direnv is not installed. Installing via Homebrew..."
    brew install direnv
    echo "✅ direnv installed"
else
    echo "✅ direnv is installed"
fi

# Install Supabase CLI if not present
if ! command -v supabase &> /dev/null; then
    echo ""
    echo "📦 Installing Supabase CLI..."

    if command -v brew &> /dev/null; then
        echo "Installing via Homebrew..."
        brew install supabase/tap/supabase
    else
        echo "Installing via npm..."
        npm install -g supabase
    fi
else
    echo "✅ Supabase CLI is installed ($(supabase --version))"
fi

# Initialize Supabase
echo ""
echo "🗄️  Initializing Supabase..."
if [ ! -d ".supabase" ]; then
    supabase init
else
    echo "Supabase already initialized"
fi

# Start Supabase
echo ""
echo "🚀 Starting Supabase (this may take 3-5 minutes on first run)..."
echo "   Docker will download ~1.5GB of images on first run"
supabase start

echo ""
echo "=================================================="
echo "📝 IMPORTANT: Save these keys for your .envrc file:"
echo "=================================================="
echo ""
echo "Copy the output above and create a .envrc file with:"
echo ""
echo "export SUPABASE_URL=http://127.0.0.1:54321"
echo "export SUPABASE_ANON_KEY=<your_publishable_key_from_output>"
echo "export SUPABASE_SERVICE_KEY=<your_secret_key_from_output>"
echo "export PORT=8080"
echo "export GO_ENV=development"
echo ""
echo "Note: Look for 'Publishable key' and 'Secret key' in the output"
echo "Then run: direnv allow"
echo ""

# Apply database migrations
echo "🗄️  Setting up database schema..."
if [ -f "supabase/migrations/001_initial_schema.sql" ]; then
    supabase db reset
    echo "✅ Database schema created"
else
    echo "⚠️  No migrations found. You'll need to create the schema manually."
fi

# Install Go dependencies
echo ""
echo "📦 Installing Go dependencies..."
if [ -f "go.mod" ]; then
    go mod download
    echo "✅ Go dependencies installed"
else
    echo "Initializing Go module..."
    go mod init crewmate-crisis
    go get github.com/supabase-community/supabase-go
    go get github.com/gorilla/mux
    go get github.com/gorilla/handlers
fi

echo ""
echo "=================================================="
echo "✅ Setup complete!"
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Create a .envrc file with your Supabase keys (see above)"
echo "2. Run: direnv allow"
echo "3. Update static/app.js with your SUPABASE_ANON_KEY"
echo "4. Run: go run main.go"
echo "5. Open: http://localhost:8080"
echo ""
echo "Services running:"
echo "- 🎮 Game will be at: http://localhost:8080"
echo "- 🗄️  Supabase Studio: http://127.0.0.1:54323"
echo "- 📡 Supabase API: http://127.0.0.1:54321"
echo "- 📧 Email testing (Mailpit): http://127.0.0.1:54324"
echo ""
echo "To stop Supabase later: supabase stop"
echo "To check status: supabase status"
echo ""