#!/bin/bash

echo "🚀 Starting Supabase with network access..."
echo ""
echo "⚠️  This will expose Supabase to your local network!"
echo "   Only use this for classroom/development environments."
echo ""

# Get local IP
LOCAL_IP=$(ipconfig getifaddr en0 || ipconfig getifaddr en1 || echo "127.0.0.1")
echo "📡 Your local IP: $LOCAL_IP"
echo ""

# Stop any running Supabase
echo "🛑 Stopping existing Supabase..."
supabase stop

# Start Supabase with network bindings
echo "🚀 Starting Supabase with network access..."
echo ""

# Unfortunately, Supabase CLI doesn't support binding to all interfaces directly
# But we can use Docker port forwarding as a workaround

# Start Supabase normally first
supabase start

echo ""
echo "🔧 Setting up network access via port forwarding..."
echo ""

# Get the container names
KONG_CONTAINER=$(docker ps --filter "name=kong" --format "{{.Names}}" | head -1)
POSTGRES_CONTAINER=$(docker ps --filter "name=db" --format "{{.Names}}" | head -1)

if [ -z "$KONG_CONTAINER" ]; then
    echo "❌ Supabase containers not found. Make sure Supabase started successfully."
    exit 1
fi

echo "📦 Found containers:"
echo "   - Kong API Gateway: $KONG_CONTAINER"
echo "   - PostgreSQL: $POSTGRES_CONTAINER"
echo ""

# Create port forwarding rules using socat in Docker
echo "🌐 Creating network access rules..."

# Kill any existing socat containers
docker rm -f supabase-network-proxy 2>/dev/null

# Run a proxy container that forwards ports from all interfaces to Supabase
docker run -d \
    --name supabase-network-proxy \
    --network host \
    alpine/socat \
    TCP-LISTEN:54321,fork,reuseaddr TCP-CONNECT:127.0.0.1:8000

echo ""
echo "✅ Network access configured!"
echo ""
echo "📋 Connection URLs for students:"
echo "   🎮 Game (HTTPS): https://$LOCAL_IP:8443"
echo "   🎮 Game (HTTP):  http://$LOCAL_IP:8080"
echo "   📡 Supabase API: http://$LOCAL_IP:54321"
echo ""
echo "⚠️  Make sure students use YOUR IP address ($LOCAL_IP)"
echo "   NOT localhost or 127.0.0.1"
echo ""
echo "🔒 For Chromebooks, use the HTTPS URL and follow CHROMEBOOK_SETUP.md"
echo ""