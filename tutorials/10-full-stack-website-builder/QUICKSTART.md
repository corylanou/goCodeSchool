# Quick Start Guide

For experienced students who want to get started quickly without reading the full tutorial.

---

## Prerequisites

- Comfortable with command line
- Basic programming knowledge
- Text editor installed (VS Code recommended)

---

## Technology Stack

- **Backend**: Go 1.25
- **Templates**: templ
- **Components**: templui
- **CSS**: Tailwind CSS
- **Database**: SQLite + goose + sqlc
- **Auth**: Clerk
- **Backups**: litestream v0.3.x
- **Hosting**: Fly.io or Railway

---

## Installation (macOS/Linux)

### 1. Install Go 1.25

```bash
# macOS
brew install go@1.25

# Linux
wget https://go.dev/dl/go1.25.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.25.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

Verify:

```bash
go version  # Should show go1.25
```

### 2. Install Tools

```bash
# templ (templates)
go install github.com/a-h/templ/cmd/templ@latest

# goose (migrations)
go install github.com/pressly/goose/v3/cmd/goose@latest

# sqlc (type-safe queries)
go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest

# litestream (backups)
brew install litestream  # macOS
# OR
wget https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz
tar -xzf litestream-v0.3.13-linux-amd64.tar.gz
sudo mv litestream /usr/local/bin/

# Tailwind CLI
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64
chmod +x tailwindcss-macos-arm64
sudo mv tailwindcss-macos-arm64 /usr/local/bin/tailwindcss
```

### 3. Install SQLite Driver

```bash
go install github.com/mattn/go-sqlite3@latest
```

---

## Project Setup

### 1. Initialize Project

```bash
mkdir my-website
cd my-website
go mod init mywebsite
```

### 2. Install Dependencies

```bash
# Core dependencies
go get github.com/mattn/go-sqlite3
go get github.com/a-h/templ
go get github.com/clerk/clerk-sdk-go/v2
```

### 3. Project Structure

```text
my-website/
├── main.go
├── go.mod
├── go.sum
├── .env
├── .gitignore
├── db/
│   ├── migrations/
│   │   └── 00001_init.sql
│   ├── queries/
│   │   └── users.sql
│   └── database.db
├── templates/
│   ├── layout.templ
│   ├── home.templ
│   └── components/
│       └── button.templ
├── handlers/
│   └── home.go
├── static/
│   └── styles.css
├── litestream.yml
├── sqlc.yaml
└── tailwind.config.js
```

### 4. Configuration Files

**sqlc.yaml**:

```yaml
version: "2"
sql:
  - engine: "sqlite"
    queries: "db/queries/"
    schema: "db/migrations/"
    gen:
      go:
        package: "database"
        out: "db"
        emit_json_tags: true
```

**tailwind.config.js**:

```javascript
module.exports = {
  content: [
    "./templates/**/*.templ",
    "./templates/**/*.go",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**litestream.yml**:

```yaml
dbs:
  - path: ./db/database.db
    replicas:
      - type: s3
        bucket: myapp-backups
        path: database
        endpoint: https://s3.us-west-000.backblazeb2.com
        access-key-id: ${LITESTREAM_ACCESS_KEY_ID}
        secret-access-key: ${LITESTREAM_SECRET_ACCESS_KEY}
```

**.env**:

```bash
DATABASE_PATH=./db/database.db
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
LITESTREAM_ACCESS_KEY_ID=xxxxx
LITESTREAM_SECRET_ACCESS_KEY=xxxxx
```

**.gitignore**:

```gitignore
*.db
*.db-shm
*.db-wal
.env
*_templ.go
node_modules/
dist/
```

---

## Database Setup

### 1. Create Migration

```bash
goose -dir db/migrations create init sql
```

Edit `db/migrations/00001_init.sql`:

```sql
-- +goose Up
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clerk_user_id TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_clerk_id ON users(clerk_user_id);

-- +goose Down
DROP INDEX idx_users_clerk_id;
DROP TABLE users;
```

### 2. Run Migration

```bash
goose -dir db/migrations sqlite3 ./db/database.db up
```

### 3. Create Queries

**db/queries/users.sql**:

```sql
-- name: GetUser :one
SELECT * FROM users WHERE id = ? LIMIT 1;

-- name: GetUserByClerkID :one
SELECT * FROM users WHERE clerk_user_id = ? LIMIT 1;

-- name: ListUsers :many
SELECT * FROM users ORDER BY created_at DESC;

-- name: CreateUser :one
INSERT INTO users (clerk_user_id, email, name)
VALUES (?, ?, ?)
RETURNING *;

-- name: UpdateUser :exec
UPDATE users SET email = ?, name = ?
WHERE id = ?;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = ?;
```

### 4. Generate sqlc Code

```bash
sqlc generate
```

---

## Templates Setup

### 1. Create Layout

**templates/layout.templ**:

```templ
package templates

templ Layout(title string) {
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>{ title }</title>
        <link rel="stylesheet" href="/static/styles.css"/>
    </head>
    <body class="bg-gray-50">
        <nav class="bg-white shadow">
            <div class="container mx-auto px-4 py-4">
                <a href="/" class="text-xl font-bold text-blue-600">My Website</a>
            </div>
        </nav>
        <main class="container mx-auto px-4 py-8">
            { children... }
        </main>
    </body>
    </html>
}
```

### 2. Create Home Page

**templates/home.templ**:

```templ
package templates

templ HomePage() {
    @Layout("Home") {
        <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-bold mb-4">Welcome!</h1>
            <p class="text-gray-600">This is your new website.</p>
        </div>
    }
}
```

### 3. Generate templ Code

```bash
templ generate
```

---

## Main Application

**main.go**:

```go
package main

import (
    "database/sql"
    "log"
    "net/http"
    "os"

    "mywebsite/db"
    "mywebsite/templates"

    _ "github.com/mattn/go-sqlite3"
)

type App struct {
    db      *sql.DB
    queries *db.Queries
}

func main() {
    // Open database
    database, err := sql.Open("sqlite3", os.Getenv("DATABASE_PATH"))
    if err != nil {
        log.Fatal(err)
    }
    defer database.Close()

    // Create app
    app := &App{
        db:      database,
        queries: db.New(database),
    }

    // Routes
    http.HandleFunc("/", app.homeHandler)
    http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

    // Start server
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    log.Printf("Server starting on :%s", port)
    log.Fatal(http.ListenAndServe(":"+port, nil))
}

func (app *App) homeHandler(w http.ResponseWriter, r *http.Request) {
    templates.HomePage().Render(r.Context(), w)
}
```

---

## CSS Setup

### 1. Build Tailwind

```bash
# Development
tailwindcss -i ./static/input.css -o ./static/styles.css --watch

# Production
tailwindcss -i ./static/input.css -o ./static/styles.css --minify
```

**static/input.css**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Development Workflow

### 1. Run in Development

```bash
# Terminal 1: Watch templ
templ generate --watch

# Terminal 2: Watch Tailwind
tailwindcss -i ./static/input.css -o ./static/styles.css --watch

# Terminal 3: Run app
go run main.go
```

### 2. Access

Visit: <http://localhost:8080>

---

## Clerk Authentication

### 1. Sign Up

1. Create account at [clerk.com](https://clerk.com)
2. Create application
3. Copy API keys to `.env`

### 2. Add to main.go

```go
import (
    "github.com/clerk/clerk-sdk-go/v2"
    clerkhttp "github.com/clerk/clerk-sdk-go/v2/http"
)

func main() {
    // Initialize Clerk
    clerk.SetKey(os.Getenv("CLERK_SECRET_KEY"))

    // Middleware
    authMiddleware := clerkhttp.RequireHeaderAuthorization()

    // Protected routes
    http.Handle("/dashboard", authMiddleware(http.HandlerFunc(app.dashboardHandler)))

    // ... rest of setup
}
```

### 3. Add Sign In Page

**templates/signin.templ**:

```templ
package templates

templ SignInPage() {
    @Layout("Sign In") {
        <div class="max-w-md mx-auto">
            <div id="clerk-sign-in"></div>
            <script src="https://unpkg.com/@clerk/clerk-js@latest/dist/clerk.browser.js"></script>
            <script>
                const clerk = window.Clerk;
                clerk.load({
                    publishableKey: '{ os.Getenv("CLERK_PUBLISHABLE_KEY") }'
                });
                clerk.mountSignIn(document.getElementById("clerk-sign-in"));
            </script>
        </div>
    }
}
```

---

## Backups with litestream

### 1. Setup Backblaze B2

1. Create account at [backblaze.com/b2](https://www.backblaze.com/b2)
2. Create bucket
3. Create application key
4. Add credentials to `.env`

### 2. Run litestream

```bash
# Start replication
litestream replicate -config litestream.yml

# Check status
litestream dbs -config litestream.yml

# Test restore
litestream restore -config litestream.yml ./test-restore.db
```

---

## Deployment

### Option A: Fly.io

```bash
# Install CLI
brew install flyctl

# Login
flyctl auth signup

# Initialize
flyctl launch

# Create volume
flyctl volumes create data --size 1

# Set secrets
flyctl secrets set CLERK_SECRET_KEY=xxx
flyctl secrets set LITESTREAM_ACCESS_KEY_ID=xxx
flyctl secrets set LITESTREAM_SECRET_ACCESS_KEY=xxx

# Deploy
flyctl deploy

# Custom domain
flyctl certs create yourdomain.com
```

**fly.toml**:

```toml
app = "mywebsite"

[build]
  builder = "paketobuildpacks/builder:base"

[env]
  PORT = "8080"
  DATABASE_PATH = "/data/database.db"

[http_service]
  internal_port = 8080
  force_https = true

[[mounts]]
  source = "data"
  destination = "/data"
```

### Option B: Railway

```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

Then in dashboard:

1. Add volume at `/data`
2. Set environment variables
3. Configure custom domain

---

## Production Checklist

- [ ] All environment variables set
- [ ] Database migrations ran
- [ ] litestream configured and running
- [ ] Custom domain connected
- [ ] SSL certificate active (HTTPS)
- [ ] Health check endpoint working
- [ ] Monitoring set up (UptimeRobot)
- [ ] Backups tested (restore successful)

---

## Common Commands

```bash
# Database
goose -dir db/migrations sqlite3 ./db/database.db up
goose -dir db/migrations sqlite3 ./db/database.db down
goose -dir db/migrations sqlite3 ./db/database.db status

# Code generation
sqlc generate
templ generate

# CSS
tailwindcss -i ./static/input.css -o ./static/styles.css --watch

# Development
go run main.go

# Production build
go build -o main .

# Backups
litestream replicate -config litestream.yml
litestream restore -config litestream.yml ./db/database.db

# Deployment
flyctl deploy
railway up
```

---

## Troubleshooting

### Port already in use

```bash
lsof -ti:8080 | xargs kill -9
```

### Database locked

```bash
# Check for processes using database
lsof | grep database.db
# Kill processes if needed
```

### templ not found

```bash
export PATH=$PATH:$(go env GOPATH)/bin
```

### SQLite driver issues

```bash
# Ensure CGO enabled
export CGO_ENABLED=1
go get -u github.com/mattn/go-sqlite3
```

---

## Resources

- Full tutorial: [README.md](./README.md)
- Technology decisions: [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md)
- Environment setup: [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
- Deployment guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Client workflow: [CLIENT_WORKFLOW.md](./CLIENT_WORKFLOW.md)

---

## Next Steps

1. Build your first feature
2. Add authentication
3. Deploy to staging
4. Set up backups
5. Deploy to production
6. Take on your first client!

For detailed explanations of **why** each technology was chosen, read the full [README.md](./README.md).
