# go-web-guide

Provide best practices guidance and architectural advice for Go full-stack web applications using Echo, templ, Tailwind, Neon Postgres, and modern patterns.

## Purpose

Help developers make good architectural decisions, follow best practices, debug issues, and understand the "why" behind patterns used in the full-stack website builder tutorial.

## Usage

When the user asks:
- "How should I structure [feature]?"
- "What's the best way to [do something]?"
- "Why do we use [pattern]?"
- "How do I debug [issue]?"
- "Should I use [approach A] or [approach B]?"
- "How do I [architectural question]?"

## What This Skill Provides

### 1. Architectural Guidance

Help with high-level design decisions:
- When to split code into multiple services
- How to organize complex features
- Database schema design advice
- API vs server-rendered pages
- Authentication/authorization patterns
- State management approaches

### 2. Pattern Explanations

Explain why we use specific patterns:
- Service struct pattern (dependency injection)
- templ component composition
- Echo context passing
- SQLC type-safe queries
- Migration-driven development
- Embedded FS for migrations

### 3. Debugging Help

Common issues and solutions:
- Database connection errors
- Template rendering issues
- Echo routing problems
- SQLC generation failures
- Migration conflicts
- CORS and middleware issues

### 4. Performance Optimization

Advice on making apps faster:
- Database query optimization
- Index design for Postgres
- Connection pooling with Neon
- Caching strategies
- Asset optimization
- Efficient templ rendering

### 5. Security Best Practices

Keeping applications secure:
- SQL injection prevention (SQLC handles this)
- XSS prevention in templ
- CSRF protection with Echo
- Authentication with Clerk
- Environment variable management
- Secure database connections

## Common Questions & Answers

### Architecture Questions

**Q: Should I use server-rendered pages (templ) or build an API + SPA?**

A: For most small business sites, server-rendered with templ is better:
- **Use templ when**: Content-focused, SEO important, simpler deployment, less JavaScript needed
- **Use API + SPA when**: Highly interactive, mobile app planned, multiple frontend teams
- **Hybrid approach**: Use templ for main pages, sprinkle Alpine.js for interactivity, add API endpoints only where needed

**Q: How should I organize a large feature with many files?**

A: Use feature-based organization:
```
service/
├── users_handlers.go      # User-related handlers
├── products_handlers.go   # Product-related handlers
├── orders_handlers.go     # Order-related handlers

views/
├── users/
│   ├── list.templ
│   └── detail.templ
├── products/
│   ├── list.templ
│   └── detail.templ

storage/queries/
├── users.sql
├── products.sql
└── orders.sql
```

**Q: When should I create a new service struct vs adding to existing one?**

A: Keep one Service struct per application. Only split if:
- Building microservices (different deployments)
- Clear bounded contexts (e.g., billing service separate from main app)
- Different teams owning different services

For most cases, one Service struct with many handlers is cleaner.

### Database Questions

**Q: Should I use UUIDs or serial integers for IDs?**

A: For most small business sites, use SERIAL (auto-increment integers):
- **SERIAL (INTEGER)**: Simpler, faster, smaller indexes, easier to debug
- **UUID**: Better for distributed systems, no collision risk, harder to guess

Default to SERIAL unless you specifically need UUID features.

**Q: How do I handle database migrations in production?**

A: Follow this workflow:
1. Write migration locally in `storage/migrations/`
2. Test with development Neon branch: `neonctl branches create --name dev`
3. Run migration on dev branch: `goose up`
4. Test application with dev database
5. Deploy to Vercel (migrations run automatically on startup)
6. Verify production works

**Never** write migrations that can't be rolled back safely.

**Q: How do I optimize slow queries?**

A: Use this approach:
1. Identify slow queries (check Neon console logs)
2. Use EXPLAIN ANALYZE to see query plan
3. Add indexes for frequently filtered/joined columns
4. Use LIMIT/OFFSET for pagination
5. Consider caching for rarely-changing data

Example index migration:
```sql
-- +goose Up
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- +goose Down
DROP INDEX idx_orders_created_at;
DROP INDEX idx_orders_user_id;
```

### templ Questions

**Q: How do I pass data between layouts and pages?**

A: Use the children pattern:
```templ
// Layout accepts children
templ Base(meta Meta) {
    <html>
        <body>
            @Header()
            <main>{ children... }</main>
        </body>
    </html>
}

// Page wraps content in layout
templ ProductDetail(product Product) {
    @layout.Base(layout.Meta{Title: product.Name}) {
        <h1>{ product.Name }</h1>
        <p>{ product.Description }</p>
    }
}
```

**Q: Should I create many small components or fewer large ones?**

A: Follow these guidelines:
- **Small components**: Reusable UI elements (Button, Card, Alert)
- **Medium components**: Feature-specific sections (ProductCard, UserProfile)
- **Large components**: Full pages (ProductList, ProductDetail)

If you copy-paste the same templ code 3+ times, make it a component.

**Q: How do I handle forms with templ?**

A: Use Echo for form handling, templ for rendering:
```templ
templ ProductForm(product *Product) {
    <form method="POST" action="/products">
        <input type="text" name="name" value={ product.Name }/>
        <textarea name="description">{ product.Description }</textarea>
        <button type="submit">Save</button>
    </form>
}
```

```go
func (s *Service) handleProductCreate(c echo.Context) error {
    name := c.FormValue("name")
    description := c.FormValue("description")

    // Validate
    if name == "" {
        return c.String(400, "Name required")
    }

    // Save to database
    product, err := s.db.Queries.CreateProduct(c.Request().Context(), db.CreateProductParams{
        Name: name,
        Description: description,
    })
    if err != nil {
        return c.String(500, "Failed to create product")
    }

    // Redirect to detail page
    return c.Redirect(303, fmt.Sprintf("/products/%d", product.ID))
}
```

### Echo Questions

**Q: What's the difference between c.String(), c.JSON(), and render()?**

A: Use based on response type:
- **c.String()**: Plain text responses (errors, simple messages)
- **c.JSON()**: API endpoints returning JSON data
- **render()**: HTML pages using templ templates

**Q: How do I add authentication middleware?**

A: Use Clerk middleware or custom:
```go
// With Clerk
import clerkhttp "github.com/clerk/clerk-sdk-go/v2/http"

func (s *Service) RegisterRoutes(e *echo.Echo) {
    // Public routes
    e.GET("/", s.handleHome)

    // Protected routes
    protected := e.Group("")
    protected.Use(echo.WrapMiddleware(clerkhttp.RequireSessionV2(clerk.NewClient(os.Getenv("CLERK_SECRET_KEY")))))
    protected.GET("/dashboard", s.handleDashboard)
    protected.GET("/profile", s.handleProfile)
}
```

**Q: How do I handle file uploads?**

A: Use Echo's FormFile:
```go
func (s *Service) handleImageUpload(c echo.Context) error {
    file, err := c.FormFile("image")
    if err != nil {
        return c.String(400, "No file uploaded")
    }

    // Open file
    src, err := file.Open()
    if err != nil {
        return c.String(500, "Failed to open file")
    }
    defer src.Close()

    // Save to storage (S3, Cloudflare R2, etc.)
    // Or save locally in development
    dst, err := os.Create(filepath.Join("public/uploads", file.Filename))
    if err != nil {
        return c.String(500, "Failed to save file")
    }
    defer dst.Close()

    io.Copy(dst, src)

    return c.String(200, "File uploaded successfully")
}
```

### Deployment Questions

**Q: How do I handle environment-specific config (dev vs prod)?**

A: Use environment variables with fallbacks:
```go
func getConfig() Config {
    return Config{
        Port: getEnv("PORT", "8080"),
        DatabaseURL: os.Getenv("DATABASE_URL"), // Required
        Environment: getEnv("ENV", "development"),
        ClerkKey: os.Getenv("CLERK_SECRET_KEY"),
    }
}

func getEnv(key, fallback string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return fallback
}
```

Use Neon branches for separate dev/prod databases.

**Q: How do I debug production issues on Vercel?**

A: Use these tools:
1. **Vercel logs**: `vercel logs` or check dashboard
2. **Add structured logging**:
   ```go
   log.Printf("[ERROR] Failed to fetch user %d: %v", userID, err)
   ```
3. **Health check endpoint**: Monitor `/health` with UptimeRobot
4. **Neon console**: Check slow queries and connection issues
5. **Sentry/error tracking**: Add for production error monitoring

### Performance Questions

**Q: My pages are loading slowly. How do I optimize?**

A: Debug in this order:
1. **Database**: Check query performance in Neon console, add indexes
2. **Connection pooling**: Neon handles this automatically
3. **Asset loading**: Minimize CSS/JS, use CDN for libraries
4. **Caching**: Add HTTP caching headers for static assets
5. **Pagination**: Don't load all records at once, use LIMIT/OFFSET

**Q: How many database connections should I use?**

A: With Neon:
- Use a single `*sql.DB` instance (don't create per-request)
- Set reasonable pool limits:
  ```go
  db.SetMaxOpenConns(25)
  db.SetMaxIdleConns(5)
  db.SetConnMaxLifetime(5 * time.Minute)
  ```
- Neon's connection pooling handles the rest

## Debugging Common Issues

### "no such table" Error

**Cause**: Migration hasn't run or wrong DATABASE_URL

**Fix**:
1. Check DATABASE_URL points to correct database
2. Run migrations: `goose -dir storage/migrations postgres "$DATABASE_URL" up`
3. Verify tables exist in Neon console

### "pq: password authentication failed"

**Cause**: Wrong Neon credentials

**Fix**:
1. Get fresh connection string from Neon console
2. Update DATABASE_URL in .env (local) or Vercel env vars
3. Ensure connection string includes `?sslmode=require`

### "template not found" Error

**Cause**: Forgot to run `templ generate`

**Fix**:
1. Run `templ generate` to create `*_templ.go` files
2. Add to Makefile/build script so it runs automatically
3. Check that `.templ` files have no syntax errors

### templ Files Not Updating

**Cause**: Browser caching or didn't regenerate

**Fix**:
1. Hard refresh browser (Cmd+Shift+R)
2. Run `templ generate` after every `.templ` change
3. Use `templ generate --watch` during development

### SQLC Generation Fails

**Cause**: SQL syntax error or wrong engine in sqlc.yaml

**Fix**:
1. Check `sqlc.yaml` has `engine: "postgresql"`
2. Verify queries use Postgres syntax ($1, $2, not ?)
3. Check SQL syntax in query files
4. Run `sqlc generate` and read error message

## Anti-Patterns to Avoid

### ❌ Global Variables

```go
// BAD
var db *sql.DB
func InitDB() { db = ... }
```

```go
// GOOD
type Service struct {
    db *Storage
}
```

### ❌ Inline SQL in Handlers

```go
// BAD
func (s *Service) getUser(c echo.Context) error {
    row := s.db.QueryRow("SELECT * FROM users WHERE id = $1", id)
    ...
}
```

```go
// GOOD
func (s *Service) getUser(c echo.Context) error {
    user, err := s.db.Queries.GetUser(c.Request().Context(), id)
    ...
}
```

### ❌ Not Using Context

```go
// BAD
s.db.Queries.ListProducts()
```

```go
// GOOD
s.db.Queries.ListProducts(c.Request().Context())
```

### ❌ Ignoring Errors

```go
// BAD
user, _ := s.db.Queries.GetUser(ctx, id)
```

```go
// GOOD
user, err := s.db.Queries.GetUser(ctx, id)
if err != nil {
    return err
}
```

## When to Refactor

Consider refactoring when you notice:
- **Handlers > 50 lines**: Extract helper functions
- **Repeating same query pattern**: Create a reusable function
- **Copy-pasted templ code**: Extract to component
- **God object Service struct**: Consider feature-based organization
- **Slow queries**: Add indexes, optimize

But remember: **Working code is better than perfectly organized code**. Refactor when it causes real problems, not preemptively.

## Resources

- Full tutorial: `tutorials/10-full-stack-website-builder/README.md`
- Echo docs: https://echo.labstack.com/
- templ docs: https://templ.guide/
- SQLC docs: https://docs.sqlc.dev/
- Neon docs: https://neon.tech/docs
- Postgres docs: https://www.postgresql.org/docs/

## Notes

- Favor simplicity over cleverness
- Optimize when you have data showing it's needed
- Follow the tutorial patterns until you understand why to deviate
- Test in development before deploying to production
- Use Neon branches for safe experimentation
