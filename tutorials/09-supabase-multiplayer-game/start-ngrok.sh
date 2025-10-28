#!/bin/bash

echo "🚀 Crewmate Crisis - ngrok Setup"
echo "================================"
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed!"
    echo ""
    echo "Install it with: brew install ngrok"
    echo "Or download from: https://ngrok.com/download"
    echo ""
    exit 1
fi

echo "✅ ngrok is installed"
echo ""

# Check if Supabase is running
if ! curl -s http://localhost:54321/rest/v1/ > /dev/null 2>&1; then
    echo "⚠️  Supabase doesn't seem to be running!"
    echo "   Run: supabase start"
    echo ""
    exit 1
fi

echo "✅ Supabase is running"
echo ""

# Check if Go server is running
if ! curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "⚠️  Go server doesn't seem to be running!"
    echo "   Run: go run main.go"
    echo ""
fi

echo "📡 Starting ngrok tunnels..."
echo ""
echo "This will open 2 terminal windows with ngrok tunnels."
echo "DO NOT CLOSE THESE WINDOWS while playing!"
echo ""

# Kill any existing ngrok processes
pkill -f "ngrok http" 2>/dev/null

# Start ngrok for Supabase in background
echo "🔧 Starting Supabase tunnel (port 54321)..."
osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"' && ngrok http 54321"' &

sleep 3

# Start ngrok for Game server
echo "🎮 Starting Game Server tunnel (port 8080)..."
osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"' && ngrok http 8080"' &

sleep 3

echo ""
echo "✅ ngrok tunnels are starting!"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. Look for the ngrok windows that just opened"
echo ""
echo "2. Find the URLs in each window:"
echo "   - Look for: Forwarding https://xxxxx.ngrok-free.app -> http://localhost:54321"
echo "   - Look for: Forwarding https://yyyyy.ngrok-free.app -> http://localhost:8080"
echo ""
echo "3. Update app.js with the Supabase ngrok URL:"
echo "   Edit line 12 in static/app.js:"
echo "   const SUPABASE_URL = 'https://YOUR-SUPABASE-URL.ngrok-free.app';"
echo ""
echo "4. Share the GAME URL (port 8080) with your students!"
echo ""
echo "5. Students just open the game URL in their browser - that's it!"
echo ""
echo "⚠️  IMPORTANT: Keep the ngrok windows open while playing!"
echo ""
echo "Press Enter when you've noted down the URLs..."
read

echo ""
echo "🎯 Quick Reference:"
echo "   - Supabase URL goes in app.js (for database)"
echo "   - Game URL goes to students (for playing)"
echo ""