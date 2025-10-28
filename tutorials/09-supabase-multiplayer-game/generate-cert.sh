#!/bin/bash

# Generate a self-signed certificate for local HTTPS
echo "🔒 Generating self-signed certificate for HTTPS..."

# Create certs directory if it doesn't exist
mkdir -p certs

# Get local IP address
LOCAL_IP=$(ipconfig getifaddr en0 || ipconfig getifaddr en1 || echo "127.0.0.1")
echo "📡 Using IP address: $LOCAL_IP"

# Generate private key and certificate
openssl req -x509 \
    -newkey rsa:4096 \
    -keyout certs/server.key \
    -out certs/server.crt \
    -days 365 \
    -nodes \
    -subj "/C=US/ST=State/L=City/O=School/CN=$LOCAL_IP" \
    -addext "subjectAltName=IP:$LOCAL_IP,IP:127.0.0.1,DNS:localhost"

echo "✅ Certificate generated!"
echo ""
echo "📋 Certificate files created:"
echo "   - certs/server.key (private key)"
echo "   - certs/server.crt (certificate)"
echo ""
echo "🎮 Your game will be available at:"
echo "   https://$LOCAL_IP:8443"
echo ""
echo "⚠️  Students will need to:"
echo "   1. Navigate to https://$LOCAL_IP:8443"
echo "   2. Click 'Advanced' when they see the security warning"
echo "   3. Click 'Proceed to $LOCAL_IP (unsafe)'"
echo ""