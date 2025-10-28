# 🌐 Network Setup Guide

## The Problem

When students connect to your game from their devices, they need access to TWO services:
1. **Your Go server** (port 8080/8443) - ✅ This works fine
2. **Your Supabase instance** (port 54321) - ❌ This only listens on localhost by default

The JavaScript code tries to connect to Supabase, but it fails because Supabase Docker only accepts connections from your local machine.

## Solutions

### Solution 1: Use ngrok (Easiest & Most Reliable)

**This is the RECOMMENDED approach for classrooms!**

1. **Install ngrok** (if not already installed):
```bash
# macOS
brew install ngrok

# Or download from https://ngrok.com/download
```

2. **Sign up for free ngrok account** at https://ngrok.com

3. **Start ngrok tunnel for BOTH services**:
```bash
# Terminal 1: Tunnel for your game server
ngrok http 8080

# Terminal 2: Tunnel for Supabase
ngrok http 54321
```

4. **Update your frontend** to use ngrok URLs:
   - ngrok will give you URLs like:
     - Game: `https://abc123.ngrok.io`
     - Supabase: `https://def456.ngrok.io`

5. **Update app.js temporarily**:
```javascript
// Replace line 5 in app.js:
const SUPABASE_URL = 'https://def456.ngrok.io'; // Your ngrok URL for Supabase
```

6. **Share the game URL** with students: `https://abc123.ngrok.io`

**Pros:**
- Works on ALL devices (Chromebooks, tablets, phones)
- No certificate warnings
- Bypasses all network restrictions
- Works even outside your local network

**Cons:**
- Requires internet connection
- Free tier has limits (but enough for a classroom)

---

### Solution 2: Port Forwarding with SSH (For Advanced Users)

If you have another machine on the network that students can access:

```bash
# On your machine, forward Supabase to all interfaces
ssh -L 0.0.0.0:54321:localhost:54321 localhost
```

---

### Solution 3: Modify Docker Network (Complex)

You can modify Docker's port bindings, but this requires stopping and restarting containers with different configurations.

```bash
# Find Supabase Kong container
docker ps | grep kong

# Stop and restart with port binding
docker stop <container_id>
docker run -d -p 0.0.0.0:54321:8000 <image_name>
```

⚠️ This might break Supabase's internal networking.

---

## Quick Setup for Classroom (Using ngrok)

### Teacher Setup:
1. Start Supabase normally: `supabase start`
2. Start your game server: `go run main.go`
3. Start ngrok for Supabase: `ngrok http 54321`
4. Update app.js with ngrok URL
5. Start ngrok for game: `ngrok http 8080`
6. Share the game ngrok URL with students

### Student Setup:
1. Open the ngrok URL provided by teacher
2. Play the game!

---

## Testing Network Access

To verify students can connect to Supabase:

1. **From student device**, open browser console
2. Check for errors containing "Supabase" or "54321"
3. If you see "net::ERR_CONNECTION_REFUSED", Supabase isn't accessible

---

## Alternative: All-in-One Cloud Deployment

For a permanent solution, deploy to a cloud service:

1. **Supabase Cloud** (free tier): https://supabase.com
   - Create a project
   - Use cloud URL in app.js
   - No local Supabase needed!

2. **Deploy game to Vercel/Netlify**
   - Push to GitHub
   - Connect to Vercel
   - Auto-deploy on push

This way, everything runs in the cloud and is accessible from anywhere!

---

## Environment Variable Solution

Instead of hardcoding URLs, you can make them configurable:

**In index.html**, add before app.js:
```html
<script>
  // Set these based on your setup
  window.GAME_CONFIG = {
    SUPABASE_URL: prompt("Enter Supabase URL:", "http://localhost:54321"),
    SUPABASE_KEY: "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH"
  };
</script>
```

**In app.js**, use:
```javascript
const SUPABASE_URL = window.GAME_CONFIG?.SUPABASE_URL || `http://${window.location.hostname}:54321`;
```

This lets you configure URLs at runtime!