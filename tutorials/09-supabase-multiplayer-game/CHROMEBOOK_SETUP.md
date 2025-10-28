# 📱 Chromebook & HTTPS Setup Guide

## Problem: Chromebooks Block Non-HTTPS Connections

Modern Chromebooks and browsers block "insecure" HTTP connections on local networks for security. This guide shows how to work around this for classroom use.

## Solution: Use HTTPS with Self-Signed Certificate

### For the Teacher/Host:

1. **Generate the Certificate** (one time only):
```bash
./generate-cert.sh
```

2. **Start the Server**:
```bash
go run main.go
```

You'll see output like:
```
🔒 HTTPS Server: https://localhost:8443
📱 Secure network URL: https://10.87.145.53:8443  ← Students use this!
```

3. **Share the HTTPS URL** with students (the one with port 8443)

### For Students on Chromebooks:

1. **Open Chrome** and navigate to the URL your teacher provides
   - Example: `https://10.87.145.53:8443`

2. **You'll see a Security Warning** - this is normal for self-signed certificates

3. **To bypass the warning on Chromebook**:

   **Method 1: Advanced Options**
   - Click "Advanced"
   - Click "Proceed to 10.87.145.53 (unsafe)"

   **Method 2: Type a Secret Code** (if Advanced doesn't appear)
   - When you see the error page, just type: `thisisunsafe`
   - (you won't see anything as you type, but it works!)
   - The page will automatically reload

4. **Success!** You should now see the game

## Alternative Solutions

### Option 1: Use a Tunneling Service (ngrok)

If certificates don't work, you can use ngrok to create a secure public URL:

1. **Install ngrok**: https://ngrok.com/download
2. **Run ngrok**:
```bash
ngrok http 8080
```
3. **Share the HTTPS URL** that ngrok provides (like `https://abc123.ngrok.io`)

### Option 2: Use Local DNS with mDNS

Some networks support `.local` domains which may work better:
- Try `https://teachercomputer.local:8443` instead of IP address

### Option 3: Chrome Flags (School Admin Only)

If you have admin access, you can allow insecure localhost:
1. Navigate to `chrome://flags`
2. Search for "insecure"
3. Enable "Allow invalid certificates for resources loaded from localhost"

## Troubleshooting

### "NET::ERR_CERT_INVALID" Error
- Make sure you're using HTTPS (not HTTP)
- Try the "thisisunsafe" trick

### "This site can't be reached"
- Check the IP address is correct
- Make sure you're on the same network
- Verify the server is running

### Certificate Issues
- Certificates expire after 365 days
- Run `./generate-cert.sh` again if needed
- Each new certificate requires re-accepting

## Security Note

⚠️ **For Classroom Use Only!**

Self-signed certificates are perfect for local development and classroom settings but should NOT be used for public websites. They're safe for your local network game!

## Quick Reference

**Teacher Commands:**
```bash
# Generate certificate (once)
./generate-cert.sh

# Start server
go run main.go

# Check your IP
ifconfig | grep "inet "
```

**Student URL Format:**
```
https://<teacher-ip>:8443
```

**Bypass Warning:**
- Type: `thisisunsafe` (no spaces, won't show on screen)