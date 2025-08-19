# Stage 1: Project Setup and Foundation

## 🎯 Objectives

Set up the complete project structure and get your development environment ready for AI-assisted coding. By the end of this stage, you'll have a working Go web server that you can build upon.

**Time Estimate**: 2-3 hours  
**Difficulty**: Beginner  
**AI Assistance**: Heavy (let AI do most of the work!)

## ✅ Prerequisites

- [ ] Completed `00-Setup` module
- [ ] GitHub Copilot working in VS Code
- [ ] Go 1.25 installed and verified
- [ ] Basic terminal/command line familiarity

## 🚀 Step-by-Step Implementation

### Step 1: Create Project Directory (5 minutes)

```bash
# Navigate to your Go Code School directory
cd ~/goCodeSchool

# Create your portfolio project
mkdir my-portfolio
cd my-portfolio

# Initialize Go module
go mod init my-portfolio

# Open in VS Code
code .
```

### Step 2: AI-Assisted Project Structure (10 minutes)

In VS Code, create a new file called `main.go` and start with this AI prompt as a comment:

```go
// Create a complete Go web application for a personal portfolio website
// Requirements:
// - Use standard net/http library (no external frameworks)
// - Serve static files (CSS, images, JS)
// - HTML templates for different pages
// - SQLite database for projects and contact forms
// - Routes for: /, /about, /projects, /contact, /admin
// - Basic admin authentication
// - CRUD operations for managing projects
// - Contact form handling
// - Professional project structure with separate packages
// - Ready for Vercel deployment

package main
```

Let GitHub Copilot generate the initial code structure. You should see suggestions for:

- Import statements
- Main function with HTTP server
- Basic route handlers
- Static file serving

### Step 3: Create Directory Structure (5 minutes)

Based on what AI suggested, create the following directories:

```bash
mkdir -p {handlers,models,templates,static/{css,js,images},database}
```

### Step 4: AI-Assisted Database Schema (15 minutes)

Create `database/schema.sql` and use this prompt:

```sql
-- Create SQLite database schema for a portfolio website
-- Tables needed:
-- 1. projects: store portfolio projects with details
-- 2. contact_submissions: store contact form messages  
-- 3. admin_users: store admin login credentials
-- 4. site_settings: store configurable site content

-- Include proper data types, constraints, indexes
-- Add sample data for testing
```

Let AI generate the complete database schema with sample data.

### Step 5: Go Models and Database Connection (20 minutes)

Create `models/database.go` with this prompt:

```go
// Create Go structs and database connection for portfolio website
// Requirements:
// - SQLite database connection with proper error handling
// - Structs for: Project, ContactSubmission, AdminUser, SiteSetting
// - Database initialization function that creates tables
// - CRUD functions for each model
// - Prepared statements for security
// - Connection pooling and proper resource cleanup

package models
```

### Step 6: Basic HTTP Handlers (20 minutes)

Create `handlers/handlers.go` with this prompt:

```go
// Create HTTP handlers for portfolio website
// Routes needed:
// - GET / : home page with featured projects
// - GET /about : about page
// - GET /projects : projects showcase
// - GET /contact : contact form
// - POST /contact : handle contact form submission
// - GET /admin : admin login page
// - POST /admin/login : handle admin authentication
// - GET /admin/dashboard : admin dashboard (protected)
// 
// Include:
// - Proper error handling and HTTP status codes
// - HTML template rendering
// - Form validation
// - Session management for admin
// - JSON responses for API endpoints

package handlers
```

### Step 7: HTML Templates (25 minutes)

Create basic templates using AI assistance:

**`templates/layout.html`**:

```html
<!-- Create a base HTML template for portfolio website
Requirements:
- Modern, clean design with TailwindCSS
- Responsive navigation menu
- Header with site title and navigation
- Main content area with {{ template "content" . }}
- Footer with social links
- Meta tags for SEO
- Mobile-friendly design
- Loading animations and transitions
-->
```

**`templates/home.html`**:

```html
<!-- Create home page template
Content needed:
- Hero section with name and title
- Brief introduction paragraph
- Featured projects section (3 projects max)
- Skills/technologies grid
- Call-to-action buttons
- Professional photo placeholder
- Social media links
-->
```

Continue with other templates (`about.html`, `projects.html`, `contact.html`, `admin.html`).

### Step 8: Static Assets (15 minutes)

Create `static/css/style.css` with this prompt:

```css
/* Create CSS for portfolio website using TailwindCSS approach
Requirements:
- Modern, professional design
- Responsive layout (mobile-first)
- Color scheme: blue primary, gray secondary, white background
- Typography: clean fonts, good readability
- Components: buttons, cards, forms, navigation
- Animations: smooth transitions, hover effects
- Dark mode friendly colors
- Accessibility: focus states, contrast ratios
*/
```

### Step 9: Test Your Setup (10 minutes)

Run your application:

```bash
go run main.go
```

Visit `http://localhost:8080` and verify:

- [ ] Home page loads without errors
- [ ] Navigation works between pages
- [ ] Static CSS files load correctly
- [ ] Database connection successful
- [ ] No console errors in browser

### Step 10: Version Control Setup (5 minutes)

```bash
# Initialize git repository
git init

# Create .gitignore
echo "*.db
*.log
.env
.DS_Store" > .gitignore

# Add and commit initial code
git add .
git commit -m "Initial portfolio website setup with AI assistance"
```

## 🤖 AI Prompting Tips for This Stage

### Effective Prompts

**For Project Structure**:

```text
"Create a complete Go web application structure for a portfolio website. Include:
- main.go with HTTP server setup
- Separate packages for handlers, models, templates
- Static file serving for CSS/JS/images
- SQLite database integration
- Professional project organization
- Ready for production deployment"
```

**For Database Schema**:

```text
"Design a SQLite database schema for a personal portfolio website with:
- Projects table (id, title, description, technologies, github_url, live_url, featured)
- Contact submissions (id, name, email, message, read, timestamp)
- Admin users (id, username, password_hash)
- Site settings (id, key, value)
Include proper constraints, indexes, and sample data."
```

**For HTTP Handlers**:

```text
"Create Go HTTP handlers for a portfolio website with routes:
- / (home page with featured projects)
- /about (about page)
- /projects (project showcase)
- /contact (contact form)
- /admin (admin panel)
Include template rendering, form handling, and proper error responses."
```

### Debugging with AI

If you encounter errors, use this template:

```text
"I'm getting this error in my Go portfolio project:
[PASTE ERROR MESSAGE]

Here's my code:
[PASTE RELEVANT CODE]

Help me:
1. Understand what's causing this error
2. Fix the issue step by step
3. Prevent similar problems in the future
4. Improve the code quality"
```

## ✅ Stage 1 Checklist

### Technical Milestones

- [ ] Go web server starts without errors
- [ ] All routes respond with basic content
- [ ] Static files (CSS) load correctly
- [ ] Database connection works
- [ ] Templates render without errors
- [ ] Project structure is organized and clean
- [ ] Git repository initialized with first commit

### Code Quality

- [ ] No Go compilation errors
- [ ] Proper error handling in place
- [ ] Clean separation of concerns (handlers, models, templates)
- [ ] Consistent naming conventions
- [ ] Comments explain complex logic
- [ ] No hardcoded values (use constants)

### Learning Objectives

- [ ] I understand the project structure
- [ ] I can explain what each file does
- [ ] I successfully used AI to generate working code
- [ ] I can navigate between different pages
- [ ] I understand the database schema design
- [ ] I can run and test the application locally

## 🚨 Common Issues and Solutions

### Issue: Import Path Errors

**Problem**: Go can't find your local packages
**Solution**: Ensure your `go.mod` file has the correct module name and your imports match

**AI Prompt**:

```text
"Fix Go import path errors in my portfolio project. My module name is 'my-portfolio' and I'm trying to import local packages like handlers and models. Show me the correct import statements and go.mod configuration."
```

### Issue: Template Not Found

**Problem**: HTML templates aren't loading
**Solution**: Check file paths and template registration

**AI Prompt**:

```text
"Fix template loading errors in Go. I'm trying to load templates from ./templates/ directory but getting 'template not found' errors. Show me the correct way to parse and execute templates."
```

### Issue: Static Files Not Serving

**Problem**: CSS/JS files return 404 errors
**Solution**: Verify static file handler setup

**AI Prompt**:

```text
"My Go web server isn't serving static files from ./static/ directory. I'm getting 404 errors for CSS and JS files. Show me the correct way to set up static file serving with net/http."
```

### Issue: Database Connection Failed

**Problem**: SQLite database won't connect
**Solution**: Check database file permissions and path

**AI Prompt**:

```text
"Fix SQLite connection issues in Go. I'm getting 'database locked' or 'permission denied' errors. Show me proper SQLite connection handling with error checking."
```

## 📝 Documentation Template

Create a `DEVELOPMENT_LOG.md` file to track your progress:

```markdown
# Portfolio Development Log

## Stage 1: Project Setup

**Date**: [TODAY'S DATE]
**Time Spent**: [HOURS]
**AI Prompts Used**: [COUNT]

### What I Built Today
- [List major accomplishments]

### AI Assistance Highlights
- [Most helpful AI-generated code]
- [Best prompts that worked well]

### Challenges Overcome
- [Problems encountered and how solved]

### Code I Understand
- [Parts of the codebase I can explain]

### Code I Need to Study
- [Areas that need more learning]

### Tomorrow's Goals
- [Next steps for Stage 2]
```

## 🎯 Validation Questions

Before moving to Stage 2, ensure you can answer:

1. **How does the Go HTTP router work in your application?**
2. **What happens when someone visits your home page?**
3. **How are templates loaded and rendered?**
4. **Where is the database connection established?**
5. **How do static files get served to the browser?**
6. **What would you change to add a new page route?**

## 🔗 Resources for Stage 1

### Go Documentation

- [Go Web Programming](https://golang.org/doc/articles/wiki/)
- [net/http Package](https://pkg.go.dev/net/http)
- [html/template Package](https://pkg.go.dev/html/template)

### AI Prompting Resources

- [GitHub Copilot Best Practices](https://docs.github.com/en/copilot/getting-started-with-github-copilot)
- [Effective AI Prompting Guide](../examples/successful-prompts.md)

---

**🎉 Congratulations!** You've successfully set up your portfolio project foundation with AI assistance. The hardest part is done - you now have a working Go web application!

**Next Step**: Move to `stage-2-backend.md` to add database functionality and dynamic content management.
