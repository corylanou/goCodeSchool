# Module 2: Setup & Architecture

**Duration**: 2-3 class periods (90-135 minutes total)

**Learning Objectives**:
- Set up a complete development environment for web development
- Understand the project architecture and file structure
- Run the starter template locally with hot reload
- Learn the basics of Go, Echo, Templ, HTMX, and Tailwind CSS
- Set up Git for version control
- Use AI tools effectively for coding tasks

## Prerequisites

Before starting this module, you should have:
- Completed Module 1: Client Discovery
- A real or practice client project to work on
- A computer with administrator access
- Stable internet connection
- Basic command line familiarity (helpful but not required)

---

## Part 1: Development Environment Setup

### What You'll Install

**Core Tools**:
1. **Go** (1.23+) - Programming language for our backend
2. **Node.js** (18+) - For Tailwind CSS and development tools
3. **Git** - Version control system
4. **VS Code** - Code editor (recommended)
5. **Terminal** - Command line interface

**Additional Tools** (installed via commands):
- Air - Hot reload for Go
- Templ - Template compiler
- Tailwind CSS - Styling framework

### Installation Guide

#### Step 1: Install Go

**Mac**:
```bash
# Using Homebrew (recommended)
brew install go

# Verify installation
go version
# Should show: go version go1.23.x darwin/arm64 (or similar)
```

**Windows**:
1. Download installer from [go.dev/dl](https://go.dev/dl/)
2. Run the installer
3. Open Command Prompt and verify:
```cmd
go version
```

**Linux**:
```bash
# Download and extract
wget https://go.dev/dl/go1.23.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.23.0.linux-amd64.tar.gz

# Add to PATH (add this to ~/.bashrc or ~/.zshrc)
export PATH=$PATH:/usr/local/go/bin

# Verify
go version
```

#### Step 2: Install Node.js

**Mac**:
```bash
# Using Homebrew
brew install node

# Verify
node --version  # Should be v18 or higher
npm --version
```

**Windows**:
1. Download installer from [nodejs.org](https://nodejs.org/)
2. Run installer (choose LTS version)
3. Verify in Command Prompt:
```cmd
node --version
npm --version
```

**Linux**:
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

#### Step 3: Install Git

**Mac**:
```bash
# Usually pre-installed, verify:
git --version

# If not installed:
brew install git
```

**Windows**:
1. Download from [git-scm.com](https://git-scm.com/)
2. Run installer (use recommended settings)
3. Verify in Command Prompt:
```cmd
git --version
```

**Linux**:
```bash
sudo apt-get update
sudo apt-get install git

# Verify
git --version
```

**Configure Git** (all platforms):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### Step 4: Install VS Code

1. Download from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install for your platform
3. Open VS Code

**Recommended Extensions**:
- Go (by Go Team at Google)
- templ-vscode (by a-h)
- Tailwind CSS IntelliSense (by Tailwind Labs)
- HTMX Attributes (by George Hickman)

**Install extensions**:
1. Click Extensions icon (left sidebar) or press `Cmd/Ctrl+Shift+X`
2. Search for each extension
3. Click Install

#### Step 5: Verify All Installations

Run this verification script:

```bash
echo "=== Checking installations ==="
echo ""
echo "Go version:"
go version
echo ""
echo "Node version:"
node --version
echo ""
echo "npm version:"
npm --version
echo ""
echo "Git version:"
git --version
echo ""
echo "=== All checks complete ==="
```

**Expected output**:
- Go: version 1.23.x
- Node: version 18.x or higher
- npm: version 9.x or higher
- Git: version 2.x

---

## Part 2: Understanding the Project Architecture

### The Tech Stack Explained

Our project uses a modern, production-ready stack:

**Backend**:
- **Go**: Fast, typed, compiled language
- **Echo**: Minimalist web framework for routing

**Frontend**:
- **Templ**: Type-safe HTML templates in Go
- **HTMX**: Dynamic interactions without JavaScript complexity
- **Tailwind CSS**: Utility-first CSS framework

**Services**:
- **Brevo**: Email delivery API
- **reCAPTCHA**: Spam prevention
- **Vercel**: Hosting and deployment

### Why This Stack?

**Benefits for Students**:
- ✅ **Type safety**: Catch errors before they happen
- ✅ **Fast compilation**: Quick feedback loop
- ✅ **Simple deployment**: One command to deploy
- ✅ **Modern**: Used in production by real companies
- ✅ **Maintainable**: Easy to understand and modify
- ✅ **SEO-friendly**: Server-side rendering

**Real-World Applications**:
- Small to medium business websites
- Landing pages
- Portfolio sites
- SaaS marketing sites
- Documentation sites

### Project Structure Deep Dive

```
project/
├── cmd/
│   └── server/
│       └── main.go              # Application entry point
├── internal/
│   ├── handlers/
│   │   └── pages.go             # HTTP request handlers
│   ├── middleware/
│   │   └── config.go            # Middleware functions
│   └── models/
│       ├── config.go            # Configuration struct
│       └── meta.go              # SEO metadata struct
├── views/
│   ├── layouts/
│   │   └── base.templ           # Base HTML layout
│   ├── components/
│   │   ├── nav.templ            # Navigation component
│   │   └── footer.templ         # Footer component
│   └── pages/
│       ├── home.templ           # Homepage template
│       ├── about.templ          # About page template
│       ├── services.templ       # Services page template
│       └── contact.templ        # Contact page template
├── static/
│   ├── css/
│   │   ├── input.css            # Tailwind input
│   │   └── output.css           # Generated CSS (gitignored)
│   ├── js/                      # Custom JavaScript
│   └── images/                  # Images and assets
├── .air.toml                    # Hot reload config
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── go.mod                       # Go dependencies
├── go.sum                       # Go dependency checksums
├── Makefile                     # Development commands
├── package.json                 # Node dependencies
├── tailwind.config.js           # Tailwind configuration
├── vercel.json                  # Vercel deployment config
└── README.md                    # Project documentation
```

### Understanding Each Directory

**`cmd/server/`**: Application entry point
- `main.go` sets up the server, routes, and middleware
- Only one file - keeps the entry point simple
- Think of it as the "main function" that starts everything

**`internal/`**: Internal application logic
- `handlers/`: Functions that respond to HTTP requests
- `middleware/`: Functions that run before/after requests
- `models/`: Data structures and configuration
- "internal" means these can't be imported by other projects

**`views/`**: Templ templates (HTML components)
- `layouts/`: Wraps pages with common structure (header, footer, meta tags)
- `components/`: Reusable UI pieces (nav, footer, buttons)
- `pages/`: Full page templates
- All `.templ` files compile to `*_templ.go` files

**`static/`**: Public assets served directly
- `css/`: Stylesheets
- `js/`: JavaScript files (if needed)
- `images/`: Photos, logos, icons
- Accessible at `/static/filename` in browser

### Request Flow Example

Let's trace what happens when someone visits your homepage:

```
1. User navigates to yourbusiness.com
   ↓
2. DNS points to Vercel server
   ↓
3. Vercel routes to your Go application
   ↓
4. Echo router matches "/" to handlers.Home()
   ↓
5. Home handler creates PageMeta (title, description, OG tags)
   ↓
6. Renders pages.Home() Templ component
   ↓
7. Templ uses layouts.Base() for HTML structure
   ↓
8. Components are assembled (nav, page content, footer)
   ↓
9. HTML is sent to browser
   ↓
10. Browser requests /static/css/output.css and images
   ↓
11. User sees beautiful, fast website!
```

---

## Part 3: Getting the Starter Template Running

### Step 1: Copy the Template

**Option A: Start Fresh** (recommended for learning):
```bash
# Navigate to where you want your project
cd ~/projects

# Copy the template
cp -r path/to/goCodeSchool/tutorials/small-business-website/template my-client-website
cd my-client-website
```

**Option B: Use Git** (recommended for version control):
```bash
cd ~/projects
git clone <repo-url> my-client-website
cd my-client-website
```

### Step 2: Install Dependencies

Run the installation command:

```bash
make install
```

This installs:
- Go modules (dependencies listed in go.mod)
- Node packages (Tailwind CSS)
- Air (hot reload tool)
- Templ (template compiler)

**What's happening**:
```bash
go mod download          # Downloads Go dependencies
npm install              # Installs Node packages
go install air           # Installs Air globally
go install templ         # Installs Templ globally
```

**Expected output**:
```
Installing dependencies...
go: downloading github.com/labstack/echo/v4 v4.11.3
go: downloading github.com/a-h/templ v0.2.543
...
added 112 packages in 8s
Installing Air for hot reload...
Installing Templ...
Done! Run 'make dev' to start development server
```

### Step 3: Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Open in your editor
code .env  # or nano .env, vim .env, etc.
```

**For now, update these minimum values**:
```env
PORT=8080
ENV=development
SITE_NAME=Your Client Business Name
SITE_DESCRIPTION=Brief description of the business
```

**Note**: We'll add API keys (Brevo, reCAPTCHA) in Module 5.

### Step 4: Start the Development Server

```bash
make dev
```

**What this does**:
1. Starts Templ watcher (regenerates Go code from .templ files)
2. Starts Tailwind watcher (rebuilds CSS when styles change)
3. Starts Air (Go server with hot reload)

**Expected output**:
```
Starting development server...
Templ will run on port 7331 (proxy)
Server will run on port 8080
Visit http://localhost:7331 for hot reload

Proxy listening on :7331
Target listening on :8080
Generating templates...
Building CSS...
Starting server...

Server starting on http://localhost:8080
```

### Step 5: Open in Browser

**Visit**: `http://localhost:7331`

You should see:
- Homepage with hero section
- Navigation menu (try mobile view!)
- Click through to About, Services, Contact pages
- All styling should be applied

**Testing hot reload**:
1. Open `views/pages/home.templ` in VS Code
2. Change the main headline text
3. Save the file
4. Watch your browser automatically refresh!

### Common Setup Issues

**Issue**: "command not found: make"
- **Solution** (Mac): `brew install make`
- **Solution** (Windows): Use Git Bash or WSL
- **Alternative**: Run commands manually:
  ```bash
  templ generate --watch &
  npm run tailwind:watch &
  air
  ```

**Issue**: "Port 8080 already in use"
- **Solution**: Change PORT in `.env` to 3000 (or another free port)

**Issue**: "templ: command not found"
- **Solution**: Ensure Go bin is in PATH:
  ```bash
  export PATH=$PATH:$(go env GOPATH)/bin
  # Add to ~/.bashrc or ~/.zshrc to make permanent
  ```

**Issue**: "Module not found" errors
- **Solution**: Run `go mod tidy` then `make install` again

**Issue**: CSS not loading
- **Solution**: Ensure Tailwind watcher is running (check terminal)
- **Solution**: Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

---

## Part 4: Understanding the Core Technologies

### Go Basics for Web Development

**What is Go?**
- Compiled, typed programming language created by Google
- Fast, simple syntax, great for web servers
- Used by Docker, Kubernetes, many web services

**Key Concepts You'll Use**:

**1. Packages**:
```go
package main  // Declares this file is part of the "main" package

import (
    "fmt"  // Standard library package
    "github.com/labstack/echo/v4"  // External package
)
```

**2. Functions**:
```go
func Home(c echo.Context) error {
    // Function that takes Echo context, returns error
    return c.String(200, "Hello!")
}
```

**3. Structs** (data structures):
```go
type PageMeta struct {
    Title       string
    Description string
}

meta := PageMeta{
    Title:       "My Page",
    Description: "Page description",
}
```

**4. Error Handling**:
```go
result, err := someFunction()
if err != nil {
    // Handle error
    return err
}
// Use result
```

**You don't need to be a Go expert!** The template handles most complexity.

### Echo Framework Basics

**What is Echo?**
- Lightweight web framework for Go
- Handles routing, requests, responses
- Similar to Express (Node.js) or Flask (Python)

**Key Concepts**:

**1. Routing**:
```go
e := echo.New()
e.GET("/", homeHandler)       // Handle GET requests to "/"
e.GET("/about", aboutHandler) // Handle GET requests to "/about"
e.POST("/contact", submitHandler) // Handle POST requests
```

**2. Handlers**:
```go
func homeHandler(c echo.Context) error {
    // c = context with request/response info
    return c.String(200, "Hello!")  // Return HTTP 200 with text
}
```

**3. Middleware**:
```go
e.Use(middleware.Logger())   // Log all requests
e.Use(middleware.Recover())  // Recover from panics
```

### Templ Basics

**What is Templ?**
- Type-safe templates for Go
- Write HTML-like syntax, compiles to Go code
- Catches errors at compile time, not runtime

**Key Concepts**:

**1. Template Declaration**:
```templ
package pages

// Home renders the homepage
templ Home(title string) {
    <h1>{title}</h1>
}
```

**2. Using Components**:
```templ
templ Page() {
    @layouts.Base() {
        <div>Page content</div>
    }
}
```

**3. Conditionals**:
```templ
templ Example(loggedIn bool) {
    if loggedIn {
        <p>Welcome back!</p>
    } else {
        <p>Please log in</p>
    }
}
```

**4. Loops**:
```templ
templ List(items []string) {
    for _, item := range items {
        <li>{item}</li>
    }
}
```

### HTMX Basics

**What is HTMX?**
- JavaScript library for dynamic interactions
- Add attributes to HTML, no JavaScript code needed
- Makes simple interactions trivial

**Key Concepts**:

**1. Ajax Requests**:
```html
<button hx-post="/submit" hx-target="#result">
    Submit
</button>
<div id="result"></div>
```

**2. Common Attributes**:
- `hx-get="/url"` - Make GET request
- `hx-post="/url"` - Make POST request
- `hx-target="#id"` - Where to put response
- `hx-swap="innerHTML"` - How to insert response
- `hx-trigger="click"` - What triggers request

**We'll use HTMX in Module 5 for the contact form!**

### Tailwind CSS Basics

**What is Tailwind?**
- Utility-first CSS framework
- Apply styles via class names
- No writing custom CSS for most things

**Key Concepts**:

**1. Utility Classes**:
```html
<div class="bg-blue-500 text-white p-4 rounded-lg">
    Blue box with white text, padding, rounded corners
</div>
```

**2. Responsive Design**:
```html
<div class="text-sm md:text-base lg:text-lg">
    Small text on mobile, medium on tablet, large on desktop
</div>
```

**3. Hover/Focus States**:
```html
<button class="bg-blue-500 hover:bg-blue-700">
    Hover me
</button>
```

**Common Tailwind Classes**:
```
Spacing:     p-4 (padding), m-4 (margin), px-4 (horizontal padding)
Colors:      bg-blue-500 (background), text-white (text color)
Typography:  text-xl (size), font-bold (weight), text-center (align)
Layout:      flex, grid, container
Sizing:      w-full (width), h-screen (height)
Borders:     border, rounded-lg, shadow-md
```

---

## Part 5: Git and Version Control

### Why Use Git?

**Benefits**:
- ✅ Track all changes to your code
- ✅ Undo mistakes easily
- ✅ Collaborate with others
- ✅ Deploy from Git (Vercel integration)
- ✅ Professional skill for your career

**Workflow**:
```
Edit files → Stage changes → Commit → Push to GitHub
```

### Setting Up Git for Your Project

**Initialize Repository**:
```bash
git init
git add .
git commit -m "Initial commit - starter template"
```

**Connect to GitHub** (after creating repo on github.com):
```bash
git remote add origin https://github.com/yourusername/project-name.git
git branch -M main
git push -u origin main
```

### Essential Git Commands

**Check status**:
```bash
git status
# Shows which files changed
```

**Stage files for commit**:
```bash
git add filename.txt      # Add specific file
git add .                 # Add all changed files
```

**Commit changes**:
```bash
git commit -m "Add homepage hero section"
# Always write clear, descriptive messages
```

**Push to GitHub**:
```bash
git push
```

**View history**:
```bash
git log --oneline
# Shows commit history
```

**Undo changes** (before commit):
```bash
git checkout -- filename.txt
# Discards changes to file
```

**Create a branch**:
```bash
git checkout -b feature-name
# Creates and switches to new branch
```

### Good Commit Message Examples

✅ **Good**:
- "Add contact form with validation"
- "Fix mobile navigation menu toggle"
- "Update homepage hero image and CTA copy"
- "Implement Brevo email integration"

❌ **Bad**:
- "Changes"
- "Update"
- "Fix stuff"
- "WIP"

### Git Workflow for This Project

**Daily workflow**:
1. Start work session: `git pull` (get latest changes)
2. Make changes to files
3. Test locally (`make dev`)
4. Stage: `git add .`
5. Commit: `git commit -m "Clear message"`
6. Push: `git push`

**Before showing client**:
- Commit all work
- Push to GitHub
- Deploy to Vercel (Module 7)
- Share live URL

---

## Part 6: AI-Assisted Development Setup

### Choosing Your AI Tool

**Options**:

**Claude** (claude.ai):
- Excellent for code generation and explanation
- Good at understanding context
- Free tier available

**ChatGPT** (chat.openai.com):
- Very good for code snippets
- Large knowledge base
- Free tier available

**GitHub Copilot** (VS Code extension):
- Inline code suggestions as you type
- $10/month (free for students!)
- Most seamless experience

**Recommendation**: Use Claude or ChatGPT to start (free), add Copilot later if desired.

### Setting Up Your AI Workflow

**1. Open AI Tool in Browser**:
- Keep Claude or ChatGPT open in a browser tab
- Use it alongside VS Code

**2. Reference the AI Prompt Library**:
- Found in `resources/ai-prompt-library.md`
- Copy and customize prompts for your needs

**3. Effective AI Usage**:
```
❌ "Make my website better"
✅ "I need to add a testimonials section to my homepage. It should display 3 testimonials in a grid on desktop, stacking on mobile. Each testimonial should have a quote, customer name, and 5-star rating. Can you generate the Templ component code using Tailwind CSS?"
```

### AI Workflow Example

**Task**: Add a "Call Now" button to the navigation

**Step 1**: Ask AI for code
```
Prompt: "I need to add a 'Call Now' button to my navigation component in Templ. The phone number is (555) 123-4567. The button should be styled with Tailwind CSS to match a primary brand color and be mobile-responsive. Here's my current nav.templ file: [paste code]"
```

**Step 2**: Review the response
- Check if it makes sense
- Verify Tailwind classes are correct
- Ensure it fits your design

**Step 3**: Test it
- Copy code into your project
- Save and check browser
- Adjust if needed

**Step 4**: Iterate
```
Follow-up: "The button is too large on mobile. Can you make it icon-only on small screens with just a phone icon?"
```

---

## Part 7: Customizing the Starter Template

### Your First Customization Tasks

**1. Update Site Configuration** (`.env`):
```env
SITE_NAME=Joe's Plumbing Services
SITE_DESCRIPTION=Professional plumbing services in Austin, TX
```

**2. Update Brand Colors** (`tailwind.config.js`):
```js
colors: {
  primary: {
    // Replace with your client's colors
    500: '#0066CC',  // Main brand color
    600: '#0052A3',  // Slightly darker
    700: '#003D7A',  // Even darker
  },
}
```

**3. Update Homepage Headline** (`views/pages/home.templ`):
```templ
<h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
    Professional Plumbing Services
</h1>
```

**4. Test Your Changes**:
- Save all files
- Check `localhost:7331` in browser
- Should see updates automatically

### Understanding the TODO Comments

Throughout the template, you'll find comments like:
```go
// TODO: Replace with client's business name and tagline
```

These mark places you need to customize. Use them as a checklist!

**Find all TODOs**:
```bash
grep -r "TODO" views/
# Lists all TODO comments in templates
```

---

## Exercises

### Exercise 1: Environment Setup Verification (15 minutes)

**Tasks**:
1. Install all required tools
2. Run the verification script
3. Start the development server
4. Take a screenshot of the homepage
5. Stop the server (Ctrl+C)

**Deliverable**: Screenshot showing working local site

### Exercise 2: Code Exploration (20 minutes)

**Tasks**:
1. Open `cmd/server/main.go`
2. Find where routes are defined
3. Trace the homepage route to its handler
4. Find where the homepage template is rendered
5. Open `views/pages/home.templ`
6. Follow the template hierarchy (pages → layouts → components)

**Deliverable**: Written summary of the request flow for the homepage

### Exercise 3: Make Your First Change (30 minutes)

**Tasks**:
1. Update `.env` with your client's business name
2. Change the homepage headline to match client
3. Update one of the feature boxes with client-specific content
4. Change the primary brand color in `tailwind.config.js`
5. Verify changes in browser
6. Git commit your changes

**Deliverable**: Git commit with clear message

### Exercise 4: AI-Assisted Coding (30 minutes)

**Tasks**:
1. Open Claude or ChatGPT
2. Ask it to generate a new service card component
3. Provide details: client's service, Tailwind styling, Templ syntax
4. Review the generated code
5. Add it to your services page
6. Test and refine if needed

**Deliverable**: Working new component, AI prompt used

### Exercise 5: Git Practice (20 minutes)

**Tasks**:
1. Make 3 different changes to your project
2. Commit each change separately with clear messages
3. View your commit history with `git log --oneline`
4. Create a new branch called `feature-test`
5. Make a change in the branch
6. Switch back to `main` branch
7. Delete the test branch

**Deliverable**: Screenshot of `git log` output

---

## Assessment Checklist

Before moving to Module 3, you should be able to:
- [ ] Install and configure all development tools
- [ ] Start the development server and see the site locally
- [ ] Navigate the project structure and find specific files
- [ ] Explain the request flow from browser to rendered page
- [ ] Make basic changes to templates and see them update
- [ ] Understand the role of each technology in the stack
- [ ] Use Git to commit and track changes
- [ ] Effectively use AI tools for code generation
- [ ] Customize the starter template with client information

## Troubleshooting Reference

### Development Server Issues

**Server won't start**:
```bash
# Check if port is in use
lsof -i :8080

# Kill process if needed
kill -9 [PID]

# Or change port in .env
```

**Changes not reflecting**:
1. Hard refresh browser (Cmd+Shift+R)
2. Check terminal for errors
3. Restart dev server (Ctrl+C, then `make dev`)
4. Clear browser cache

**Templ errors**:
```bash
# Manually generate templates
templ generate

# Check for syntax errors in .templ files
```

### Git Issues

**"fatal: not a git repository"**:
```bash
git init
```

**"Your branch is behind"**:
```bash
git pull
```

**Committed wrong files**:
```bash
# Undo last commit, keep changes
git reset --soft HEAD~1
```

---

## Next Module

In **Module 3: Design Foundation**, you'll:
- Master Tailwind CSS for responsive design
- Implement mobile-first layouts
- Learn accessibility best practices
- Build custom components
- Apply your client's brand to the entire site

Make sure you have the starter template running successfully before proceeding!

---

**Pro Tip**: Keep the dev server running while you code. The instant feedback from hot reload will make you significantly more productive!
