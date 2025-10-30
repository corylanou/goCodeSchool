# go-web-scaffold

Generate a production-ready Go web application scaffold using Echo, templ, Tailwind CSS, Postgres/SQLC, and best practices.

## Purpose

Quickly bootstrap new full-stack Go web projects with proper folder structure, configuration files, and starter code following the patterns from the full-stack website builder tutorial.

## Technology Stack

- **Backend**: Go 1.25+ with Echo v4 framework
- **Templates**: templ for type-safe HTML templates
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **JavaScript**: Alpine.js v3 for lightweight interactivity
- **Database**: Neon Postgres with SQLC for type-safe queries
- **Migrations**: goose for database versioning
- **Development**: Air for hot reload
- **Deployment**: Vercel-ready with Neon Postgres database

## Usage

When the user asks to:
- "scaffold a new project"
- "create a new Go website"
- "start a new full-stack app"
- "set up a Go web project"

## What This Skill Does

1. **Creates project structure** following best practices:
   ```
   project-name/
   ├── cmd/               # Application entry point
   ├── service/           # Business logic & handlers
   ├── storage/           # Database layer
   ├── views/             # templ templates
   └── public/            # Static assets
   ```

2. **Generates configuration files**:
   - `go.mod` with required dependencies
   - `Makefile` for common tasks
   - `.air.toml` for hot reload
   - `tailwind.config.js` and `postcss.config.js`
   - `.gitignore` with appropriate rules
   - `.env.example` for environment variables
   - `vercel.json` for deployment
   - `sqlc.yaml` for SQLC configuration

3. **Creates starter code**:
   - `cmd/main.go` with Echo server setup
   - `service/service.go` with service struct pattern
   - `service/routes.go` with route registration
   - `service/handlers.go` with example handlers
   - `storage/storage.go` with database initialization
   - `views/layout/base.templ` with base HTML layout
   - `views/home/index.templ` with home page
   - Initial migration in `storage/migrations/`

4. **Sets up assets**:
   - `public/css/input.css` with Tailwind directives
   - Basic folder structure for images/js

## Implementation Steps

### 1. Gather Information

Ask the user:
- **Project name**: What to call the project (will be module name)
- **Project description**: Brief description for README
- **Include auth?**: Whether to include Clerk authentication scaffolding (yes/no)
- **Neon DATABASE_URL**: The Neon Postgres connection string from [neon.tech](https://neon.tech)

### 2. Create Folder Structure

```bash
mkdir -p {project-name}/{cmd,service,storage/{db,migrations,queries},views/{layout,home,components},public/{css,js,images},db}
```

### 3. Generate go.mod

```go
module {project-name}

go 1.25

require (
    github.com/labstack/echo/v4 v4.12.0
    github.com/a-h/templ v0.2.747
    github.com/lib/pq v1.10.9
    github.com/joho/godotenv v1.5.1
)
```

If auth: Add Clerk SDK (`github.com/clerk/clerk-sdk-go/v2`)

### 4. Create cmd/main.go

```go
package main

import (
    "log"
    "os"

    "github.com/joho/godotenv"
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"

    "{project-name}/service"
    "{project-name}/storage"
)

func main() {
    // Load environment variables
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }

    // Initialize database
    dbURL := os.Getenv("DATABASE_URL")
    if dbURL == "" {
        dbURL = "./db/app.db"
    }

    db, err := storage.New(dbURL)
    if err != nil {
        log.Fatal("Failed to initialize database:", err)
    }
    defer db.Close()

    // Initialize Echo
    e := echo.New()
    e.HideBanner = true
    e.HidePort = true

    // Middleware
    e.Use(middleware.Logger())
    e.Use(middleware.Recover())
    e.Use(middleware.CORS())

    // Static files
    e.Static("/public", "public")

    // Initialize service
    svc := service.New(db)
    svc.RegisterRoutes(e)

    // Start server
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    log.Printf("Server starting on http://localhost:%s", port)
    if err := e.Start(":" + port); err != nil {
        log.Fatal(err)
    }
}
```

### 5. Create service/service.go

```go
package service

import (
    "{project-name}/storage"
)

type Service struct {
    db *storage.Storage
}

func New(db *storage.Storage) *Service {
    return &Service{db: db}
}
```

### 6. Create service/routes.go

```go
package service

import (
    "github.com/labstack/echo/v4"
)

func (s *Service) RegisterRoutes(e *echo.Echo) {
    // Public routes
    e.GET("/", s.handleHome)
    e.GET("/about", s.handleAbout)

    // API routes
    api := e.Group("/api")
    api.GET("/health", s.handleHealth)
}
```

### 7. Create service/handlers.go

```go
package service

import (
    "context"
    "net/http"

    "github.com/a-h/templ"
    "github.com/labstack/echo/v4"

    "{project-name}/views/home"
)

func render(c echo.Context, component templ.Component) error {
    return component.Render(c.Request().Context(), c.Response())
}

func (s *Service) handleHome(c echo.Context) error {
    return render(c, home.Index())
}

func (s *Service) handleAbout(c echo.Context) error {
    return c.String(http.StatusOK, "About page")
}

func (s *Service) handleHealth(c echo.Context) error {
    return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
}
```

### 8. Create storage/storage.go

```go
package storage

import (
    "database/sql"
    "embed"

    _ "github.com/lib/pq"
    "{project-name}/storage/db"
)

//go:embed migrations/*.sql
var migrationsFS embed.FS

type Storage struct {
    db      *sql.DB
    Queries *db.Queries
}

func New(dbURL string) (*Storage, error) {
    database, err := sql.Open("postgres", dbURL)
    if err != nil {
        return nil, err
    }

    // Test connection
    if err := database.Ping(); err != nil {
        return nil, err
    }

    s := &Storage{
        db:      database,
        Queries: db.New(database),
    }

    // TODO: Run migrations here

    return s, nil
}

func (s *Storage) Close() error {
    return s.db.Close()
}
```

### 9. Create views/layout/base.templ

```templ
package layout

type Meta struct {
    Title       string
    Description string
}

templ Base(meta Meta) {
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>{ meta.Title }</title>
            <meta name="description" content={ meta.Description }/>
            <link rel="stylesheet" href="/public/css/styles.css"/>
            <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
        </head>
        <body class="min-h-screen bg-gray-50">
            @Header()
            <main class="container mx-auto px-4 py-8">
                { children... }
            </main>
            @Footer()
        </body>
    </html>
}

templ Header() {
    <header class="bg-white shadow-sm">
        <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" class="text-xl font-bold text-gray-800">{ meta.Title }</a>
            <div class="space-x-4">
                <a href="/" class="text-gray-600 hover:text-gray-900">Home</a>
                <a href="/about" class="text-gray-600 hover:text-gray-900">About</a>
            </div>
        </nav>
    </header>
}

templ Footer() {
    <footer class="bg-gray-800 text-white py-8 mt-auto">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; 2024 { meta.Title }. All rights reserved.</p>
        </div>
    </footer>
}
```

### 10. Create views/home/index.templ

```templ
package home

import "{project-name}/views/layout"

templ Index() {
    @layout.Base(layout.Meta{
        Title:       "{Project Name}",
        Description: "Welcome to {Project Name}",
    }) {
        <section class="text-center py-20">
            <h1 class="text-5xl font-bold text-gray-900 mb-4">
                Welcome to {Project Name}
            </h1>
            <p class="text-xl text-gray-600 mb-8">
                Built with Go, Echo, templ, and Tailwind CSS
            </p>
            <a
                href="/about"
                class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Get Started
            </a>
        </section>
    }
}
```

### 11. Create Makefile

```makefile
.PHONY: dev build test generate clean migrate

dev:
\tair

generate:
\ttempl generate
\tsqlc generate

build: generate
\tgo build -o bin/server cmd/main.go

css:
\ttailwindcss -i public/css/input.css -o public/css/styles.css

css-watch:
\ttailwindcss -i public/css/input.css -o public/css/styles.css --watch

test:
\tgo test ./...

clean:
\trm -rf bin/
\trm -f public/css/styles.css
\tfind . -name '*_templ.go' -delete
```

### 12. Create .air.toml

```toml
root = "."
testdata_dir = "testdata"
tmp_dir = "tmp"

[build]
  args_bin = []
  bin = "./tmp/main"
  cmd = "go build -o ./tmp/main ./cmd"
  delay = 1000
  exclude_dir = ["assets", "tmp", "vendor", "testdata", "node_modules"]
  exclude_file = []
  exclude_regex = ["_test.go", "_templ.go"]
  exclude_unchanged = false
  follow_symlink = false
  full_bin = ""
  include_dir = []
  include_ext = ["go", "templ", "tpl", "tmpl", "html"]
  include_file = []
  kill_delay = "0s"
  log = "build-errors.log"
  poll = false
  poll_interval = 0
  rerun = false
  rerun_delay = 500
  send_interrupt = false
  stop_on_error = false

[color]
  app = ""
  build = "yellow"
  main = "magenta"
  runner = "green"
  watcher = "cyan"

[log]
  main_only = false
  time = false

[misc]
  clean_on_exit = false

[screen]
  clear_on_rebuild = false
  keep_scroll = true
```

### 13. Create Tailwind config files

**public/css/input.css**:
```css
@import "tailwindcss";

@theme {
  /* Add custom theme variables here */
}
```

**tailwind.config.js**:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.templ",
    "./views/**/*.go",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**postcss.config.js**:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
  },
}
```

### 14. Create .env.example

```bash
# Server
PORT=8080

# Database (Neon Postgres)
DATABASE_URL=postgresql://user:pass@ep-example.us-east-2.aws.neon.tech/neondb?sslmode=require

# Authentication (if using Clerk)
# CLERK_SECRET_KEY=sk_test_xxxxx

# Environment
ENV=development
```

### 15. Create .gitignore

```gitignore
# Binaries
bin/
tmp/
*.exe
main

# Environment
.env
.env.local

# Generated files
*_templ.go
public/css/styles.css

# Dependencies
node_modules/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

### 16. Create README.md

```markdown
# {Project Name}

{Project Description}

## Tech Stack

- Go 1.25+ with Echo v4
- templ for type-safe templates
- Tailwind CSS v4
- Alpine.js v3
- Neon Postgres + SQLC
- Vercel deployment

## Development

Install dependencies:
\`\`\`bash
go mod download
npm install -g tailwindcss @tailwindcss/cli
go install github.com/a-h/templ/cmd/templ@latest
go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
go install github.com/air-verse/air@latest
\`\`\`

Run development server:
\`\`\`bash
# Terminal 1: Generate templ files and watch
make generate
templ generate --watch

# Terminal 2: Watch and build Tailwind
make css-watch

# Terminal 3: Run server with hot reload
make dev
\`\`\`

Visit http://localhost:8080

## Build

\`\`\`bash
make build
./bin/server
\`\`\`

## Deploy to Vercel

\`\`\`bash
vercel
\`\`\`

See deployment docs in tutorial.
```

### 17. Create sqlc.yaml

```yaml
version: "2"
sql:
  - engine: "postgresql"
    queries: "storage/queries"
    schema: "storage/migrations"
    gen:
      go:
        package: "db"
        out: "storage/db"
        emit_json_tags: true
        emit_interface: false
        emit_empty_slices: true
```

### 18. Create initial migration

**storage/migrations/00001_init.sql**:
```sql
-- +goose Up
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- +goose Down
DROP TABLE users;
```

### 19. Create example query

**storage/queries/users.sql**:
```sql
-- name: GetUser :one
SELECT * FROM users WHERE id = $1 LIMIT 1;

-- name: ListUsers :many
SELECT * FROM users ORDER BY created_at DESC;

-- name: CreateUser :one
INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *;
```

### 20. Final steps

After generating all files:

```bash
cd {project-name}

# Initialize Go module
go mod tidy

# Generate templ and SQLC code
templ generate
sqlc generate

# Build Tailwind CSS
tailwindcss -i public/css/input.css -o public/css/styles.css

# Test build
go build -o bin/server cmd/main.go
```

## Success Message

Tell the user:
```
✅ Project {project-name} scaffolded successfully!

Next steps:
1. cd {project-name}
2. Copy .env.example to .env and configure
3. Run `make dev` to start development server
4. Visit http://localhost:8080

The project structure follows best practices from the full-stack tutorial.
Check README.md for more details.
```

## Notes

- Always use the Service struct pattern (no global variables)
- Embed migrations for single-binary deployment
- Keep handlers thin - delegate to storage layer
- Follow the cmd/service/storage/views separation
- Use templ for all HTML rendering
- Configure for Neon Postgres and Vercel deployment
