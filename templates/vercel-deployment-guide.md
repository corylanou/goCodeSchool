# Vercel Deployment Guide for Go Applications

## 🎯 Overview

This guide shows students how to deploy Go web applications to Vercel using serverless functions, perfect for the modern web stack in our course.

## 🚀 Quick Start Deployment

### Step 1: Prepare Your Go Application

Your Go application needs to be structured for Vercel's serverless environment:

```go
// api/index.go
package handler

import (
    "fmt"
    "net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello from Go on Vercel!")
}
```

### Step 2: Create Vercel Configuration

Create `vercel.json` in your project root:

```json
{
  "functions": {
    "api/*.go": {
      "runtime": "vercel-go@latest"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/api/index.go"
    }
  ]
}
```

### Step 3: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to your account
vercel login

# Deploy your project
vercel --prod
```

## 📁 Project Structure for Full-Stack Apps

```text
your-project/
├── api/
│   ├── index.go          # Main handler
│   ├── auth.go           # Authentication endpoints
│   ├── contacts.go       # CRUD operations
│   └── database.go       # Database connection
├── public/
│   ├── index.html        # Frontend files
│   ├── styles.css
│   └── app.js
├── templates/
│   └── *.html           # Go templates
├── vercel.json          # Vercel configuration
└── go.mod              # Go modules
```

## 🔧 Advanced Configuration

### Environment Variables

Set up environment variables in Vercel dashboard or CLI:

```bash
# Set environment variables
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add API_KEY
```

Access in your Go code:

```go
import "os"

func handler(w http.ResponseWriter, r *http.Request) {
    dbURL := os.Getenv("DATABASE_URL")
    jwtSecret := os.Getenv("JWT_SECRET")
    // Use environment variables
}
```

### Custom Domains

1. **Add Domain in Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Configure DNS**:

   ```text
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Database Integration

For SQLite in serverless:

```go
// api/database.go
package handler

import (
    "database/sql"
    "os"
    _ "github.com/mattn/go-sqlite3"
)

func initDB() (*sql.DB, error) {
    // Use memory database or external service for serverless
    db, err := sql.Open("sqlite3", ":memory:")
    if err != nil {
        return nil, err
    }
    
    // Initialize tables
    createTables(db)
    return db, nil
}
```

## 🛠️ AI-Assisted Deployment Prompts

### Setup Prompts

```text
"Create a vercel.json configuration for a Go web application with multiple API endpoints"

"Set up environment variables for a Go application deployed on Vercel"

"Configure custom domain routing for Vercel deployment"
```

### Debugging Prompts

```text
"Help me troubleshoot Vercel deployment errors for Go functions"

"Fix CORS issues in Go serverless functions on Vercel"

"Optimize Go function performance for Vercel's serverless environment"
```

### Feature Addition Prompts

```text
"Add authentication middleware to Vercel Go functions"

"Implement file upload handling in Vercel serverless Go"

"Create API rate limiting for Vercel Go endpoints"
```

## 📊 Deployment Checklist

### Pre-Deployment

- [ ] Go application runs locally
- [ ] Environment variables configured
- [ ] `vercel.json` properly structured
- [ ] Dependencies in `go.mod`
- [ ] Static files in `public/` directory

### Post-Deployment

- [ ] All endpoints responding correctly
- [ ] Environment variables accessible
- [ ] Custom domain working (if configured)
- [ ] Database connections successful
- [ ] Performance metrics acceptable

### Testing

- [ ] Manual testing of all features
- [ ] API endpoints validation
- [ ] Frontend-backend integration
- [ ] Mobile responsiveness
- [ ] Error handling verification

## 🔍 Monitoring and Debugging

### Vercel Analytics

Enable analytics in project settings:

```json
{
  "analytics": {
    "enabled": true
  }
}
```

### Logging

Add logging to your Go functions:

```go
import "log"

func Handler(w http.ResponseWriter, r *http.Request) {
    log.Printf("Request received: %s %s", r.Method, r.URL.Path)
    // Your handler logic
}
```

### Error Tracking

```go
func Handler(w http.ResponseWriter, r *http.Request) {
    defer func() {
        if err := recover(); err != nil {
            log.Printf("Error: %v", err)
            http.Error(w, "Internal Server Error", 500)
        }
    }()
    
    // Your handler logic
}
```

## 🎯 Project-Specific Deployment Guides

### Portfolio Website

- Static HTML/CSS in `public/`
- Go API for contact form
- Simple routing configuration

### Todo Application

- Authentication endpoints
- CRUD operations for todos
- Session management
- Database integration

### Blog Platform

- Content management API
- File upload for images
- Admin authentication
- SEO optimization

### E-commerce Catalog

- Product API endpoints
- Image handling
- Search functionality
- Payment integration preparation

## 🚨 Common Issues and Solutions

### Issue: Function Timeout

```go
// Solution: Optimize database queries and add connection pooling
func quickHandler(w http.ResponseWriter, r *http.Request) {
    // Keep functions lightweight and fast
    // Use connection pooling for database operations
}
```

### Issue: Cold Start Performance

```go
// Solution: Keep global variables for reused connections
var db *sql.DB

func init() {
    var err error
    db, err = initDB()
    if err != nil {
        log.Fatal(err)
    }
}
```

### Issue: CORS Problems

```go
func Handler(w http.ResponseWriter, r *http.Request) {
    // Add CORS headers
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    
    if r.Method == "OPTIONS" {
        return
    }
    
    // Your handler logic
}
```

## 📚 Additional Resources

- [Vercel Go Runtime Documentation](https://vercel.com/docs/functions/runtimes/go)
- [Serverless Go Best Practices](https://vercel.com/guides/deploying-go-to-vercel)
- [Environment Variables Guide](https://vercel.com/docs/projects/environment-variables)
- [Custom Domains Setup](https://vercel.com/docs/projects/domains)

## 🎓 Student Success Tips

1. **Start Simple**: Deploy a basic "Hello World" function first
2. **Test Locally**: Use `vercel dev` for local development
3. **Monitor Performance**: Check function execution times
4. **Use Environment Variables**: Never hardcode secrets
5. **Version Control**: Use Git for deployment triggers
6. **Documentation**: Document your deployment process for future reference

---

**Next Steps**: Once comfortable with basic deployment, explore advanced features like edge functions, analytics, and performance optimization!
