# 🚀 ngrok Quick Start - Get Playing in 5 Minutes!

## Teacher Setup (3 steps)

### 1️⃣ Start Everything
```bash
# Terminal 1: Start Supabase
supabase start

# Terminal 2: Start Game Server
go run main.go

# Terminal 3: Start ngrok tunnels
./start-ngrok.sh
```

### 2️⃣ Get Your URLs
When ngrok opens, you'll see something like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:54321  (Supabase)
Forwarding  https://xyz789.ngrok-free.app -> http://localhost:8080   (Game)
```

### 3️⃣ Update Code & Share
1. Edit `static/app.js` line 12:
   ```javascript
   const SUPABASE_URL = 'https://abc123.ngrok-free.app'; // Your Supabase ngrok URL
   ```

2. Share the game URL with students:
   ```
   https://xyz789.ngrok-free.app
   ```

## Student Setup (1 step)

### Just Open the Link!
1. Open the URL your teacher gives you
2. Enter your name
3. Join with room code
4. Play!

## That's It! 🎮

No certificates, no warnings, no network issues - just works!

---

## Troubleshooting

**"Failed to fetch" error?**
- Teacher needs to update app.js with Supabase ngrok URL

**"Tunnel not found" error?**
- ngrok tunnel closed - teacher needs to restart ngrok

**Game won't load?**
- Check you're using the game URL (port 8080), not Supabase URL

---

## Quick Commands Reference

```bash
# Install ngrok (first time only)
brew install ngrok

# Start everything
supabase start && go run main.go

# Start ngrok tunnels
./start-ngrok.sh

# Stop everything
supabase stop
# Close ngrok windows
# Ctrl+C in Go server terminal
```