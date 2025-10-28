#!/bin/bash

echo "🚀 Simple ngrok Setup for Crewmate Crisis"
echo "=========================================="
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
    echo "   Run this first: supabase start"
    echo ""
    exit 1
fi

echo "✅ Supabase is running"
echo ""

# Check if Go server is running
if ! curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "⚠️  Go server doesn't seem to be running!"
    echo "   Run this first: go run main.go"
    echo ""
    exit 1
fi

echo "✅ Go server is running"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 INSTRUCTIONS:"
echo ""
echo "You need to run ngrok in 2 separate terminals:"
echo ""
echo "TERMINAL 1 - For Supabase (database):"
echo "----------------------------------------"
echo "ngrok http 54321"
echo ""
echo "TERMINAL 2 - For Game (what students access):"
echo "----------------------------------------------"
echo "ngrok http 8080"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "After running ngrok, you'll get URLs like:"
echo "  https://abc123.ngrok-free.app → Supabase"
echo "  https://xyz789.ngrok-free.app → Game"
echo ""
echo "Then:"
echo "1. Copy the Supabase URL"
echo "2. Edit static/app.js line 12:"
echo "   const SUPABASE_URL = 'https://abc123.ngrok-free.app';"
echo "3. Share the Game URL with students"
echo ""
echo "Press Enter to see the commands again..."
read

clear
echo "🎮 QUICK COPY-PASTE COMMANDS:"
echo ""
echo "Terminal 1:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "ngrok http 54321"
echo ""
echo "Terminal 2:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "ngrok http 8080"
echo ""
echo "Update app.js line 12 with the Supabase URL from Terminal 1"
echo ""