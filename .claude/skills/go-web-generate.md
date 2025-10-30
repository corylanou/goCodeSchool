# go-web-generate

Generate code for common patterns in Go full-stack web applications using Echo, templ, Postgres, and SQLC.

## Purpose

Quickly generate boilerplate code for new features, following best practices from the full-stack website builder tutorial. This reduces repetitive work and ensures consistency across the project.

## Usage

When the user asks to:
- "generate a new handler"
- "create a new page"
- "add a new model/table"
- "scaffold a CRUD for [entity]"
- "add an API endpoint"

## What This Skill Generates

### 1. Database Entity (Model + Migration + Queries)

Generates complete database setup for a new entity:
- **Migration file**: `storage/migrations/NNNNN_create_[entity].sql` with Postgres syntax
- **Query file**: `storage/queries/[entity].sql` with SQLC queries
- Instructions to run `sqlc generate`

### 2. templ Page

Generates a complete page component:
- **Page template**: `views/[entity]/index.templ` or `views/[entity]/detail.templ`
- Uses layout pattern from tutorial
- Includes example data rendering

### 3. Echo Handler

Generates handler functions:
- **Handler file**: Add to `service/handlers.go` or `service/[entity]_handlers.go`
- Follows Service struct pattern
- Includes proper error handling
- Uses render helper for templ

### 4. CRUD Set

Generates complete CRUD for an entity:
- Migration with table schema
- SQLC queries (List, Get, Create, Update, Delete)
- Handlers for all operations
- templ templates (list, detail, form)
- Route registration

### 5. API Endpoint

Generates RESTful API endpoint:
- Handler with JSON responses
- Proper HTTP methods and status codes
- Request validation
- Error handling

## Implementation Guidelines

### Database Migration Format (Postgres)

```sql
-- +goose Up
CREATE TABLE [entity_plural] (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_[entity]_name ON [entity_plural](name);

-- +goose Down
DROP INDEX IF EXISTS idx_[entity]_name;
DROP TABLE [entity_plural];
```

### SQLC Query Format (Postgres)

```sql
-- name: List[Entities] :many
SELECT * FROM [entity_plural]
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: Get[Entity] :one
SELECT * FROM [entity_plural]
WHERE id = $1 LIMIT 1;

-- name: Create[Entity] :one
INSERT INTO [entity_plural] (name, description)
VALUES ($1, $2)
RETURNING *;

-- name: Update[Entity] :one
UPDATE [entity_plural]
SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP
WHERE id = $3
RETURNING *;

-- name: Delete[Entity] :exec
DELETE FROM [entity_plural] WHERE id = $1;
```

### Handler Format

```go
func (s *Service) handle[Entity]List(c echo.Context) error {
    // Parse query parameters
    page := c.QueryParam("page")
    // ... pagination logic

    // Fetch from database
    entities, err := s.db.Queries.List[Entities](c.Request().Context(), /* params */)
    if err != nil {
        return c.JSON(http.StatusInternalServerError, map[string]string{
            "error": "Failed to fetch [entities]",
        })
    }

    // Render templ template
    return render(c, [entity].List(entities))
}

func (s *Service) handle[Entity]Detail(c echo.Context) error {
    // Parse path parameter
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{
            "error": "Invalid ID",
        })
    }

    // Fetch from database
    entity, err := s.db.Queries.Get[Entity](c.Request().Context(), int64(id))
    if err != nil {
        if err == sql.ErrNoRows {
            return c.JSON(http.StatusNotFound, map[string]string{
                "error": "[Entity] not found",
            })
        }
        return c.JSON(http.StatusInternalServerError, map[string]string{
            "error": "Failed to fetch [entity]",
        })
    }

    // Render templ template
    return render(c, [entity].Detail(entity))
}
```

### templ Page Format

```templ
package [entity]

import (
    "{project-name}/views/layout"
    "{project-name}/storage/db"
)

templ List(entities []db.[Entity]) {
    @layout.Base(layout.Meta{
        Title: "[Entities]",
        Description: "List of [entities]",
    }) {
        <div class="max-w-6xl mx-auto">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold">[Entities]</h1>
                <a href="/[entities]/new" class="btn-primary">
                    Add [Entity]
                </a>
            </div>

            <div class="grid gap-4">
                for _, entity := range entities {
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-xl font-semibold">{ entity.Name }</h3>
                        <p class="text-gray-600">{ entity.Description }</p>
                        <a href={ templ.URL("/[entities]/" + fmt.Sprint(entity.ID)) }>
                            View Details →
                        </a>
                    </div>
                }
            </div>
        </div>
    }
}
```

### Route Registration

```go
// In service/routes.go
func (s *Service) RegisterRoutes(e *echo.Echo) {
    // ... existing routes

    // [Entity] routes
    [entities] := e.Group("/[entities]")
    [entities].GET("", s.handle[Entity]List)
    [entities].GET("/:id", s.handle[Entity]Detail)
    [entities].POST("", s.handle[Entity]Create)
    [entities].PUT("/:id", s.handle[Entity]Update)
    [entities].DELETE("/:id", s.handle[Entity]Delete)
}
```

## Steps for Each Generation Type

### Generate Database Entity

1. Ask for entity name (singular, e.g., "product")
2. Ask for fields with types (e.g., "name:string, price:decimal, stock:int")
3. Generate migration with Postgres types
4. Generate SQLC queries
5. Remind user to run `goose up` and `sqlc generate`

### Generate Page

1. Ask for page name and type (list, detail, form)
2. Ask what data it displays
3. Generate templ file with proper imports
4. Use layout.Base pattern
5. Include Tailwind classes

### Generate Handler

1. Ask for handler purpose (list, detail, create, etc.)
2. Ask what database entity it works with
3. Generate handler with error handling
4. Include route registration code

### Generate CRUD

1. Ask for entity name
2. Ask for all fields and types
3. Generate:
   - Migration
   - SQLC queries (all 5 operations)
   - Handlers (all 5 operations)
   - templ pages (list, detail, form)
   - Route registration
4. Provide checklist of next steps

### Generate API Endpoint

1. Ask for endpoint purpose and path
2. Ask for HTTP method(s)
3. Ask what data it works with
4. Generate handler with JSON responses
5. Include request/response examples

## After Generation Checklist

Always provide these reminders after generating code:

```
✅ Code generated successfully!

Next steps:
1. If database changes: Run migrations
   goose -dir storage/migrations postgres "$DATABASE_URL" up

2. If added queries: Generate SQLC code
   sqlc generate

3. If added templ files: Generate Go code
   templ generate

4. Test the new functionality locally

5. Commit your changes
```

## Best Practices

- Always use Postgres syntax ($1, $2 placeholders, not ?)
- Use SERIAL for auto-increment IDs
- Use TIMESTAMP for dates (not DATETIME)
- Include created_at and updated_at for most entities
- Add indexes for frequently queried columns
- Use proper HTTP status codes (200, 201, 400, 404, 500)
- Include error handling in all handlers
- Follow RESTful conventions for routes
- Keep handlers thin - delegate to storage layer
- Use the Service struct pattern (no globals)

## Notes

- All generated code follows patterns from the tutorial
- Postgres/Neon is the only supported database
- Uses Echo v4 router patterns
- Uses templ for HTML rendering
- Follows SQLC naming conventions
