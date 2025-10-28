# Full-Stack Website Builder 🌐

## Build Production-Ready Websites for Small Business Clients

Welcome to the comprehensive guide for building professional, production-ready websites using modern Go technologies. This tutorial teaches you not just **how** to build, but **why** each decision matters.

---

## 🎯 What You'll Learn

By the end of this tutorial, you will:

- **Understand** the complete web development stack from domain to deployment
- **Explain** why each technology was chosen over alternatives
- **Build** full-stack Go applications with authentication and databases
- **Deploy** production-ready websites with proper backups
- **Deliver** professional client projects using the SBDC service model
- **Make** informed technology decisions for future projects

---

## 📚 Tutorial Philosophy

This is an **education-first** tutorial. Each section includes:

- 🧠 **What it is** - Clear explanations of concepts
- 🤔 **Why we chose it** - Reasoning and trade-offs
- 🔗 **Documentation links** - Official resources for deeper learning
- 🌍 **Real-world context** - Where you'll see this in practice
- ✅ **Practice exercises** - Hands-on tasks to reinforce learning

**Important**: Read [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md) to understand all technology choices and comparisons.

---

## 🛠️ Our Technology Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| Backend | Go 1.25 | Fast, type-safe, single binary deployment |
| Templates | templ | Type-safe components, Go-native |
| Components | templui | Pre-built professional components |
| CSS | Tailwind CSS | Modern utility-first, industry standard |
| Database | SQLite | Zero config, perfect for small business scale |
| Migrations | goose | Simple SQL-based version control |
| Queries | sqlc | Type-safe generated code from SQL |
| Auth | Clerk | Security by experts, free tier |
| Backups | litestream v0.3.x | Real-time SQLite replication |
| Hosting | Fly.io or Railway | Simple deployment, free tier |

Read the complete technology comparison and reasoning in [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md).

---

## 📖 Table of Contents

### Getting Started

- [Phase 0: Understanding the Web Stack](#phase-0-understanding-the-web-stack)

### Foundation

- [Phase 1: Domain Names & Web Fundamentals](#phase-1-domain-names-web-fundamentals)
- [Phase 2: Go Programming Language](#phase-2-go-programming-language)

### Frontend

- [Phase 3: Templating with templ](#phase-3-templating-with-templ)
- [Phase 4: templui Component Library](#phase-4-templui-component-library)
- [Phase 5: Tailwind CSS](#phase-5-tailwind-css)

### Database

- [Phase 6: SQLite Database](#phase-6-sqlite-database)
- [Phase 7: goose Migrations](#phase-7-goose-migrations)
- [Phase 8: sqlc for Type-Safe Queries](#phase-8-sqlc-for-type-safe-queries)

### Production Features

- [Phase 9: Clerk Authentication](#phase-9-clerk-authentication)
- [Phase 10: litestream Backups](#phase-10-litestream-backups)
- [Phase 11: Deployment](#phase-11-deployment)

### Client Work

- [Phase 12: Client Service Workflow](#phase-12-client-service-workflow)

### Additional Resources

- [Supporting Documentation](#supporting-documentation)
- [Video Recommendations](#video-recommendations)
- [Next Steps](#next-steps)

---

## Phase 0: Understanding the Web Stack

### 🧠 What You'll Learn

Before diving into specific technologies, let's understand how websites actually work.

### The Client-Server Model

```text
┌─────────────┐         Request          ┌─────────────┐
│   Browser   │ ────────────────────────> │  Web Server │
│  (Client)   │                           │   (Go App)  │
│             │ <──────────────────────── │             │
└─────────────┘         Response          └─────────────┘
                       (HTML/CSS/JS)             │
                                                 │ Query
                                                 ↓
                                          ┌─────────────┐
                                          │  Database   │
                                          │   (SQLite)  │
                                          └─────────────┘
```text

#### Key Concepts:

1. **Client (Browser)**
   - Sends HTTP requests
   - Renders HTML/CSS
   - Runs JavaScript
   - Displays website to user

2. **Server (Your Go Application)**
   - Receives HTTP requests
   - Processes business logic
   - Queries database
   - Generates HTML response
   - Sends back to client

3. **Database**
   - Stores persistent data
   - Handles queries from server
   - Manages data consistency

### What is HTTP?

HTTP (HyperText Transfer Protocol) is how browsers and servers communicate.

#### HTTP Request Example:

```text
GET /about HTTP/1.1
Host: www.example.com
```text

#### HTTP Response Example:

```text
HTTP/1.1 200 OK
Content-Type: text/html

<html>
  <body>
    <h1>About Us</h1>
  </body>
</html>
```text

#### Common HTTP Methods:

- `GET` - Retrieve data (viewing a page)
- `POST` - Send data (submitting a form)
- `PUT` - Update data
- `DELETE` - Remove data

### What is DNS?

DNS (Domain Name System) translates human-readable names to IP addresses.

```text
www.mysite.com  →  DNS Lookup  →  172.67.180.123  →  Your Server
```text

#### Why it matters:

- Humans remember names better than numbers
- Servers can change IP addresses without affecting users
- Professional appearance for clients

### What is "Full-Stack"?

**Full-stack** means working on both:

1. **Frontend** (what users see)
   - HTML structure
   - CSS styling
   - JavaScript interactivity (we'll use minimal JS)
   - User interface components

2. **Backend** (server logic)
   - HTTP request handling
   - Business logic
   - Database queries
   - Authentication
   - API endpoints

3. **Database** (data storage)
   - Schema design
   - Queries
   - Data relationships
   - Backups

### Our Complete Stack Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                         User's Browser                        │
│  (Receives HTML generated by templ + styled with Tailwind)   │
└───────────────────────────┬──────────────────────────────────┘
                            │ HTTP Request
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                       Your Go Server                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  HTTP Router: Receives requests                        │  │
│  │  ↓                                                      │  │
│  │  Clerk Middleware: Checks authentication               │  │
│  │  ↓                                                      │  │
│  │  Handler Function: Business logic                      │  │
│  │  ↓                                                      │  │
│  │  sqlc Queries: Type-safe database access               │  │
│  │  ↓                                                      │  │
│  │  templ Templates: Generate HTML response               │  │
│  └────────────────────────────────────────────────────────┘  │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                      SQLite Database                          │
│  (With litestream continuously backing up to S3)             │
└──────────────────────────────────────────────────────────────┘
```text

### 🔗 Learn More

- [How the Web Works - MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)
- [HTTP Overview - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [DNS Explained - Cloudflare](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [Client-Server Model - Wikipedia](https://en.wikipedia.org/wiki/Client%E2%80%93server_model)

### ✅ Knowledge Check

Before moving forward, make sure you can explain:

- [ ] What happens when you type a URL in your browser?
- [ ] What is the difference between frontend and backend?
- [ ] What does a database do?
- [ ] What is HTTP and why do we need it?
- [ ] What is DNS and how does it work?

---

## Phase 1: Domain Names & Web Fundamentals

### 🧠 What You'll Learn

How to choose, register, and configure a domain name for your website.

### What is a Domain Name?

A **domain name** is the human-readable address of your website (e.g., `mybusiness.com`).

#### Parts of a Domain:

```text
https://www.mybusiness.com/about
│      │   │          │   │
│      │   │          │   └─ Path
│      │   │          └───── Domain name
│      │   └──────────────── Subdomain (optional)
│      └──────────────────── Protocol
└─────────────────────────── Scheme
```text

#### Domain Structure:

- **TLD (Top-Level Domain)**: `.com`, `.org`, `.net`, `.io`
- **Second-Level Domain**: `mybusiness` (the part you choose)
- **Subdomain**: `www`, `blog`, `shop` (optional, you control these)

### Why Domain Names Matter for Clients

#### Professional Appearance

- `mycatering.com` vs `mycatering-site-123.netlify.app`
- Builds trust and credibility
- Easier to remember

#### Business Value

- Brand ownership
- Email addresses (`contact@mybusiness.com`)
- Marketing (business cards, signs)
- SEO benefits

### Choosing a Domain Name

#### Good Domain Characteristics:

- ✅ Short and memorable
- ✅ Easy to spell
- ✅ Describes the business
- ✅ Avoids numbers and hyphens
- ✅ Uses `.com` when possible (or local TLD like `.uk`)

#### Examples:

- 🟢 Good: `bluemountainbakery.com`, `smithplumbing.com`
- 🔴 Avoid: `blue-mountain-bakery123.com`, `smth-plmbng.net`

### Domain Registrars Comparison

A **registrar** is a company that sells domain names. Here are student-friendly options:

| Registrar | .com Price | Pros | Cons | Best For |
|-----------|-----------|------|------|----------|
| **Namecheap** | ~$13/year | Easy interface, good support, free privacy | None significant | **Recommended for students** |
| **Porkbun** | ~$10/year | Cheapest, free privacy, simple | Fewer features | Budget-conscious |
| **Google Domains** | ~$12/year | Clean interface, Google integration | Being sold to Squarespace | Google users |
| **Cloudflare** | At cost (~$9) | Cheapest possible, great DNS | Need Cloudflare account | Advanced users |
| **GoDaddy** | ~$20/year | Well-known | Aggressive upselling, expensive | ❌ Not recommended |

**Our Recommendation**: **Namecheap** or **Porkbun**

- Good balance of price and features
- Student-friendly interfaces
- Reliable service

### Understanding Domain Costs

#### First Year vs Renewal:

- First year: Often discounted ($8-10)
- Renewal: Usually $10-15/year
- ⚠️ **Important**: Check renewal prices, not just first-year deals!

#### Additional Costs:

- **Privacy protection**: FREE at Namecheap/Porkbun (hides your personal info in WHOIS)
- **Email hosting**: Optional ($1-5/month) - not needed initially
- **SSL certificate**: FREE with our hosting (Let's Encrypt)

### DNS Basics

**DNS (Domain Name System)** translates your domain to your server's IP address.

#### Key DNS Records:

| Record Type | Purpose | Example |
|-------------|---------|---------|
| **A** | Points domain to IPv4 address | `example.com` → `172.67.180.123` |
| **CNAME** | Points domain to another domain | `www.example.com` → `example.com` |
| **MX** | Email routing | Where to send `you@example.com` emails |
| **TXT** | Verification & config | Prove domain ownership |

#### Example DNS Setup:

```text
example.com          A       172.67.180.123
www.example.com      CNAME   example.com
```text

This makes both `example.com` and `www.example.com` go to your server.

### 🤔 Why We Recommend Actual Domain Registration

#### Learning Value:

- Real-world experience
- Understanding of DNS
- Professional portfolio piece
- Can be used on resume

#### Client Work Preparation:

- Every client will want their own domain
- Practice now with club domain
- Understand renewal costs to quote clients

#### Club Benefits:

- Professional appearance for services
- Real domain for SBDC partnership
- Can create email addresses

**Cost**: ~$10-13/year for one domain (club can fund this)

### 🌍 Where You'll See This

Every professional website uses:

- Custom domains (not free subdomains)
- DNS configuration for email (MX records)
- Multiple domains (blog.company.com, shop.company.com)
- Domain redirects (old-name.com → new-name.com)

### 🔗 Documentation & Resources

#### Domain Registrars:

- [Namecheap](https://www.namecheap.com/) - Recommended registrar
- [Porkbun](https://porkbun.com/) - Budget option
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) - At-cost pricing

#### Learning Resources:

- [How DNS Works - Cloudflare Learning Center](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [DNS Record Types Explained](https://www.cloudflare.com/learning/dns/dns-records/)
- [Domain Name System - Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System)
- [Choosing a Domain Name - Namecheap Blog](https://www.namecheap.com/blog/how-to-choose-a-domain-name/)

#### Tools:

- [DNS Lookup Tool](https://mxtoolbox.com/) - Check DNS records
- [WHOIS Lookup](https://www.namecheap.com/domains/whois/) - See domain info

#### Detailed Guide:

- See [DOMAIN_REGISTRATION.md](./DOMAIN_REGISTRATION.md) for step-by-step registration instructions

### ✅ Practice Exercises

#### Exercise 1: Domain Research (30 minutes)

1. Brainstorm 5 domain names for your club's website service
2. Check availability at Namecheap
3. Compare prices at 3 different registrars
4. Document first-year vs renewal costs
5. Present findings to team

#### Exercise 2: DNS Investigation (20 minutes)

1. Use `nslookup google.com` in terminal
2. Use MXToolbox to lookup DNS records for 3 websites
3. Find the A record, CNAME records, MX records
4. Draw a diagram showing domain → IP address flow

#### Exercise 3: Domain Decision (Group Activity)

1. As a team, choose your club's domain name
2. Decide which registrar to use
3. Calculate total first-year and 3-year costs
4. Plan who will manage renewals
5. Purchase domain (get instructor approval first)

#### Exercise 4: DNS Configuration (After Purchase)

1. Log into your registrar
2. Find the DNS management page
3. Identify existing DNS records
4. Document the nameservers
5. (Don't change anything yet - we'll configure in Phase 11)

---

## Phase 2: Go Programming Language

### 🧠 What You'll Learn

Understanding Go, why it's perfect for web servers, and how it compares to other languages.

### What is Go?

**Go** (also called Golang) is a programming language created by Google in 2009.

#### Design Goals:

- **Fast** compilation and execution
- **Simple** syntax (easier to learn than Java/C++)
- **Safe** (type-checking prevents many bugs)
- **Concurrent** (built-in support for multiple tasks at once)

#### Created By:

- Robert Griesemer
- Rob Pike
- Ken Thompson
(All legends in computer science)

### Why Go for Web Development?

#### Performance

```text
Language Speed Comparison (typical):
C/C++    ████████████████████ (fastest)
Go       ████████████████░░░░
Java     ██████████████░░░░░░
Node.js  ████████░░░░░░░░░░░░
Python   ████░░░░░░░░░░░░░░░░
```text

- Go is compiled (not interpreted like Python)
- Fast startup time
- Low memory usage
- Can handle thousands of requests per second

#### Simplicity

- Only 25 keywords (Python has 35, Java has 50+)
- One official way to format code (`gofmt`)
- Strong standard library (HTTP server included!)
- Clear error handling

#### Type Safety

```go
// This won't compile (caught before running):
var age int = "twenty"  // ❌ Error: cannot use "twenty" (type string) as type int

// This will:
var age int = 20  // ✅ Correct
```text

#### Built-in Concurrency

```go
// Handle multiple requests simultaneously with goroutines
go handleRequest(req1)  // Runs in background
go handleRequest(req2)  // Runs in background
// Both execute concurrently!
```text

#### Single Binary Deployment

```bash
# Compile Go code:
go build -o mywebsite

# Result: One file that contains everything!
./mywebsite
```text

No need to install:

- ❌ Node.js and npm packages
- ❌ Python and virtual environment
- ❌ Java JVM
- ✅ Just copy the binary and run!

### 🤔 Why We Chose Go Over Alternatives

See [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md#1-backend-language-go-125) for detailed comparison.

#### Quick Summary:

| Language | Best For | Why Not For This Tutorial |
|----------|----------|---------------------------|
| **Go** ✅ | Web servers, APIs, tools | **We're using this!** |
| Node.js | JavaScript everywhere, real-time | Slower, more complex dependencies |
| Python | Data science, AI, scripting | Slower, deployment complexity |
| PHP | Shared hosting, WordPress | Declining popularity, older patterns |
| Java | Enterprise, Android | Very verbose, heavyweight |
| Ruby | Rapid prototyping | Slower performance, less demand |

### Go 1.25 - Why Version Matters

#### Why We Specify Go 1.25:

- Latest stable release (security patches)
- New language improvements
- Better error messages
- Performance improvements
- Long-term support

#### Go's Release Cycle:

- New version every ~6 months
- Excellent backward compatibility
- Each version supported for ~1 year

#### Checking Your Version:

```bash
go version
# Should show: go version go1.25 darwin/amd64 (or similar)
```text

### Understanding Go's Type System

**Static Typing** means types are checked at compile time (before running).

```go
// Variable declarations:
var name string = "My Business"
var year int = 2024
var price float64 = 29.99
var isOpen bool = true

// Short syntax (type inferred):
name := "My Business"  // string
year := 2024          // int
price := 29.99        // float64
isOpen := true        // bool
```text

#### Benefits:

- ✅ Errors caught before code runs
- ✅ Editor autocomplete
- ✅ Safer refactoring
- ✅ Self-documenting code

### Go Web Server Example

Here's a simple Go web server:

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    // Register a handler for the / path
    http.HandleFunc("/", homeHandler)

    // Start server on port 8080
    fmt.Println("Server starting on http://localhost:8080")
    http.ListenAndServe(":8080", nil)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    // Write HTML response
    fmt.Fprintf(w, "<h1>Welcome to my website!</h1>")
}
```text

#### What's happening:

1. Import packages from standard library
2. Define handler function (runs for each request)
3. Start HTTP server on port 8080
4. Server waits for requests and calls handler

#### Run it:

```bash
go run main.go
# Visit http://localhost:8080 in browser
```text

### Go Project Structure

```text
my-website/
├── go.mod              # Project dependencies (like package.json)
├── go.sum              # Dependency checksums (like package-lock.json)
├── main.go             # Entry point
├── handlers/           # HTTP handler functions
│   ├── home.go
│   └── about.go
├── db/                 # Database code
│   └── queries.sql
├── templates/          # templ templates
│   └── layout.templ
└── static/             # CSS, images, etc.
    └── styles.css
```text

### 🌍 Where You'll See Go

#### Companies Using Go:

- Google (created it)
- Uber (microservices)
- Netflix (performance-critical services)
- Dropbox (rewrote Python code in Go for performance)
- Docker (container platform written in Go)
- Kubernetes (container orchestration)

#### Common Go Use Cases:

- Web servers and APIs
- Command-line tools
- Cloud services
- Microservices
- DevOps tools (Docker, Kubernetes, Terraform)

### 🔗 Documentation & Resources

#### Official Documentation:

- [go.dev](https://go.dev/) - Official Go website
- [Go Documentation](https://go.dev/doc/) - Official docs
- [A Tour of Go](https://go.dev/tour/) - Interactive tutorial
- [Go by Example](https://gobyexample.com/) - Code examples
- [Effective Go](https://go.dev/doc/effective_go) - Best practices

#### Learning Resources:

- [Go Crash Course - Traversy Media](https://www.youtube.com/watch?v=YS4e4q9oBaU) (1 hour)
- [Learn Go Programming - FreeCodeCamp](https://www.youtube.com/watch?v=YS4e4q9oBaU) (7 hours comprehensive)
- [Go Web Examples](https://gowebexamples.com/) - Web-specific tutorials

#### Community:

- [r/golang](https://reddit.com/r/golang) - Reddit community
- [Go Forum](https://forum.golangbridge.org/) - Official forum
- [Gophers Slack](https://gophers.slack.com/) - Chat community

#### Setup Guide:

- See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for installation instructions

### ✅ Practice Exercises

#### Exercise 1: Install Go 1.25 (30 minutes)

1. Follow [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
2. Install Go 1.25
3. Verify with `go version`
4. Set up VS Code with Go extension
5. Create "Hello, World!" program

#### Exercise 2: Build Your First Web Server (45 minutes)

1. Create new directory: `mkdir my-first-server && cd my-first-server`
2. Initialize Go module: `go mod init myserver`
3. Create `main.go` with the web server example above
4. Run with `go run main.go`
5. Visit <http://localhost:8080> in browser
6. Modify HTML response
7. Add another route (e.g., `/about`)

#### Exercise 3: Understand Types (30 minutes)

1. Create `types.go`
2. Declare variables of each type (string, int, float64, bool)
3. Try assigning wrong type (see compiler error)
4. Use `:=` short syntax
5. Print variables with `fmt.Println()`

#### Exercise 4: Go Playground Exploration (20 minutes)

1. Visit [Go Playground](https://go.dev/play/)
2. Try example programs
3. Modify and run code
4. Share a program with your team (use Share button)

#### Exercise 5: Compare Languages (Group Discussion)

1. If you know another language, compare syntax with Go
2. Write equivalent "Hello, World!" web server in another language
3. Compare:
   - Lines of code
   - Dependencies needed
   - Deployment complexity
4. Present findings to class

---

## Phase 3: Templating with templ

### 🧠 What You'll Learn

How to generate HTML dynamically with type-safe Go templates.

### What is Templating?

**Static HTML** (hardcoded):

```html
<h1>Welcome, John!</h1>
<p>You have 5 messages.</p>
```text

**Dynamic HTML** (generated from data):

```go
name := "John"
messageCount := 5

// Generate HTML with data
<h1>Welcome, {name}!</h1>
<p>You have {messageCount} messages.</p>
```text

#### Why Templating:

- Show personalized content
- Display database data
- Reuse layouts (header/footer on every page)
- Conditional rendering (show login button if not logged in)

### Server-Side vs Client-Side Rendering

**Server-Side Rendering (SSR)** - What we're using:

```text
Browser requests page
  ↓
Server generates HTML with data
  ↓
Browser receives complete HTML
  ↓
Page displays immediately (fast!)
```text

**Client-Side Rendering (CSR)** - React/Vue approach:

```text
Browser requests page
  ↓
Server sends JavaScript app
  ↓
Browser downloads and runs JavaScript
  ↓
JavaScript fetches data from API
  ↓
JavaScript generates HTML
  ↓
Page displays (slower)
```text

#### SSR Advantages (Our Approach):

- ✅ Faster initial page load
- ✅ Better SEO (Google sees content immediately)
- ✅ Works without JavaScript
- ✅ Less complex (no separate frontend app)

#### CSR Advantages:

- ✅ Richer interactivity
- ✅ Better for web apps (Gmail, Figma)
- ✅ Reduced server load
- ❌ Overkill for most small business sites

### What is templ?

**templ** is a templating language for Go that:

- Compiles to Go code
- Provides type-safe components
- Uses familiar HTML-like syntax
- Catches errors at compile time

**File Extension:** `.templ` (not `.html`)

#### Example templ Component:

```templ
package templates

templ WelcomeMessage(name string, count int) {
    <div class="welcome">
        <h1>Welcome, { name }!</h1>
        <p>You have { fmt.Sprintf("%d", count) } messages.</p>
    </div>
}
```text

#### Using in Go Code:

```go
// In your handler:
func homeHandler(w http.ResponseWriter, r *http.Request) {
    WelcomeMessage("John", 5).Render(context.Background(), w)
}
```text

### 🤔 Why We Chose templ

See [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md#2-templating-templ) for full comparison.

#### Key Reasons:

#### Type Safety:

```go
// This won't compile (caught before running):
WelcomeMessage(123, "five")  // ❌ Error: wrong types

// This will:
WelcomeMessage("John", 5)  // ✅ Correct
```text

#### Go Native:

- No new syntax to learn (it's just Go + HTML)
- Use Go functions directly
- Full Go tooling support

#### Component-Based:

```templ
// Reusable button component:
templ Button(text string, primary bool) {
    <button class={templ.KV("btn-primary", primary)}>
        { text }
    </button>
}

// Use it many times:
@Button("Save", true)
@Button("Cancel", false)
```text

#### Performance:

- Compiles to efficient Go code
- Fast rendering
- No runtime template parsing

### templ Basics

#### Component Definition:

```templ
package templates

// Simple component
templ Greeting(name string) {
    <h1>Hello, { name }!</h1>
}

// Component with children
templ Layout(title string) {
    <!DOCTYPE html>
    <html>
        <head>
            <title>{ title }</title>
        </head>
        <body>
            { children... }
        </body>
    </html>
}
```text

#### Conditionals:

```templ
templ Message(isLoggedIn bool, username string) {
    if isLoggedIn {
        <p>Welcome back, { username }!</p>
    } else {
        <p>Please log in.</p>
    }
}
```text

#### Loops:

```templ
templ ProductList(products []Product) {
    <ul>
        for _, product := range products {
            <li>{ product.Name } - ${ fmt.Sprintf("%.2f", product.Price) }</li>
        }
    </ul>
}
```text

#### Composition (Using Other Components):

```templ
templ HomePage(username string, items []Item) {
    @Layout("Home") {
        @Header(username)
        @ItemList(items)
        @Footer()
    }
}
```text

### The templ Workflow

1. **Write .templ file**
2. **Run `templ generate`** (converts to .go file)
3. **Import generated code in your handlers**
4. **Call component.Render()**

#### Example Workflow:

```bash
# 1. Create template
echo 'package templates
templ Hello() {
    <h1>Hello World!</h1>
}' > hello.templ

# 2. Generate Go code
templ generate
# Creates: hello_templ.go

# 3. Use in main.go
```text

### Project Structure with templ

```text
my-website/
├── templates/
│   ├── layout.templ           # Base layout
│   ├── layout_templ.go        # Generated (don't edit)
│   ├── home.templ             # Home page
│   ├── home_templ.go          # Generated
│   └── components/
│       ├── header.templ
│       └── button.templ
├── handlers/
│   └── home.go                # Uses templates
└── main.go
```text

**Important:** `.go` files ending in `_templ.go` are generated. Never edit these!

### 🌍 Where You'll See This

#### Server-Side Rendering Used By:

- WordPress (PHP templates)
- Ruby on Rails (ERB templates)
- Django (Python templates)
- Next.js (React with SSR)
- Laravel (Blade templates)

#### templ Specifically:

- Growing in Go community
- Used for:
  - Marketing websites
  - Admin dashboards
  - Internal tools
  - HTMX applications

### 🔗 Documentation & Resources

#### Official Documentation:

- [templ.guide](https://templ.guide/) - Official documentation
- [templ GitHub](https://github.com/a-h/templ) - Source code and issues
- [templ Examples](https://github.com/a-h/templ/tree/main/examples) - Example projects

#### Installation:

- See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md#installing-templ) for setup instructions

#### Learning Resources:

- [templ Quick Start](https://templ.guide/quick-start/)
- [Component Syntax](https://templ.guide/syntax-and-usage/)
- [Using templ with HTTP](https://templ.guide/server-side-rendering/)

#### Video Tutorials:

- [Building Web Apps with Go and templ](https://www.youtube.com/results?search_query=go+templ+tutorial) - Search YouTube for latest tutorials
- [HTMX + templ + Go](https://www.youtube.com/results?search_query=htmx+templ+go) - Common stack

#### Comparison Articles:

- [Why I Chose templ Over html/template](https://adrianhesketh.com/2023/05/07/reasons-to-use-templ/) - Creator's perspective
- [Server-Side Rendering vs Client-Side Rendering](https://web.dev/rendering-on-the-web/) - Google Web.dev

### ✅ Practice Exercises

#### Exercise 1: Install templ (15 minutes)

1. Follow [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md#installing-templ)
2. Install templ CLI: `go install github.com/a-h/templ/cmd/templ@latest`
3. Verify: `templ version`
4. Set up VS Code templ extension

#### Exercise 2: Your First Component (30 minutes)

1. Create `templates/` directory
2. Create `templates/hello.templ`:

```templ
package templates

templ HelloWorld() {
    <h1>Hello from templ!</h1>
    <p>This is my first component.</p>
}
```text

3. Run `templ generate`
4. Examine generated `hello_templ.go` file
5. Use in a Go web server

#### Exercise 3: Dynamic Content (45 minutes)

1. Create component that accepts name parameter
2. Create component that accepts slice of strings
3. Use for loop to display list
4. Add conditional (if/else) logic
5. Test with different data

#### Exercise 4: Layout Component (1 hour)

1. Create `templates/layout.templ` with HTML structure:
   - DOCTYPE, html, head, body tags
   - Title parameter
   - children content area
2. Create `templates/home.templ` that uses layout
3. Create `templates/about.templ` that uses same layout
4. Build web server with two routes
5. Verify shared header/footer

#### Exercise 5: Component Composition (45 minutes)

1. Create `Card` component (visual container)
2. Create `Button` component (styled button)
3. Create `ProductCard` component that uses both
4. Create page that displays multiple product cards
5. Pass different data to each card

#### Exercise 6: Compare Approaches (Group Activity)

1. Write same component in:
   - templ (type-safe)
   - html/template (standard Go)
   - Plain HTML (hardcoded)
2. Compare:
   - Lines of code
   - Type safety
   - Refactoring ease
3. Discuss trade-offs

---

## Phase 4: templui Component Library

### 🧠 What You'll Learn

How to use pre-built, professional UI components to build websites faster.

### What is a Component Library?

A **component library** is a collection of pre-built, reusable UI elements.

#### Without Component Library:

```templ
// You build everything from scratch:
templ MyButton() {
    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Click me
    </button>
}
```text

#### With Component Library:

```templ
// Use pre-built component:
@Button(ButtonProps{Text: "Click me", Variant: "primary"})
```text

#### Benefits:

- ✅ Save time (don't build from scratch)
- ✅ Professional design
- ✅ Consistent look across site
- ✅ Accessibility built-in
- ✅ Focus on business logic, not styling

### What is templui?

**templui** is a component library specifically built for templ templates.

#### What it provides:

- Pre-styled components (buttons, forms, cards, etc.)
- Tailwind CSS-based
- Go-native (type-safe component props)
- Accessible HTML
- Customizable

#### Example Components:

- Buttons (primary, secondary, danger)
- Forms (inputs, textareas, selects)
- Cards
- Navigation menus
- Alerts/notifications
- Modals
- Tables
- And more...

### 🤔 Why We Chose templui

See [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md#3-component-library-templui) for full comparison.

#### Key Reasons:

#### Built for templ:

- Only mature component library for templ
- Type-safe props
- Go-native usage
- No adaptation needed

#### Time Savings:

- Don't build common components
- Professional quality out of the box
- Focus on unique features

#### Teaches Professional Practices:

- Real projects use component libraries
- Design system principles
- Code reuse

### Using templui Components

#### Import templui:

```go
import "github.com/templui/templui"
```text

#### Use Components in templ:

```templ
package templates

import "github.com/templui/templui"

templ LoginPage() {
    @templui.Layout() {
        <div class="container mx-auto">
            <h1>Login</h1>

            @templui.Input(templui.InputProps{
                Type:        "email",
                Placeholder: "Email address",
                Name:        "email",
            })

            @templui.Input(templui.InputProps{
                Type:        "password",
                Placeholder: "Password",
                Name:        "password",
            })

            @templui.Button(templui.ButtonProps{
                Text:    "Sign In",
                Type:    "submit",
                Variant: "primary",
            })
        </div>
    }
}
```text

### Common templui Components

#### Buttons:

```templ
// Primary button
@templui.Button(templui.ButtonProps{
    Text:    "Save",
    Variant: "primary",
})

// Secondary button
@templui.Button(templui.ButtonProps{
    Text:    "Cancel",
    Variant: "secondary",
})

// Danger button
@templui.Button(templui.ButtonProps{
    Text:    "Delete",
    Variant: "danger",
})
```text

#### Form Inputs:

```templ
// Text input
@templui.Input(templui.InputProps{
    Type:        "text",
    Name:        "business_name",
    Label:       "Business Name",
    Placeholder: "Enter business name",
    Required:    true,
})

// Textarea
@templui.Textarea(templui.TextareaProps{
    Name:        "description",
    Label:       "Description",
    Rows:        5,
    Placeholder: "Describe your business",
})

// Select dropdown
@templui.Select(templui.SelectProps{
    Name:    "category",
    Label:   "Business Category",
    Options: []string{"Restaurant", "Retail", "Service"},
})
```text

#### Cards:

```templ
@templui.Card(templui.CardProps{
    Title: "Our Services",
    Body:  "We offer web design, hosting, and maintenance.",
})
```text

#### Alerts:

```templ
@templui.Alert(templui.AlertProps{
    Type:    "success",
    Message: "Your profile has been updated!",
})
```text

### Customizing Components

#### Override Styles:

```templ
// Add custom classes:
@templui.Button(templui.ButtonProps{
    Text:      "Custom Button",
    Variant:   "primary",
    ClassName: "mt-4 w-full",  // Additional Tailwind classes
})
```text

#### Create Wrapper Components:

```templ
// Wrap templui for consistent customization:
templ PrimaryButton(text string) {
    @templui.Button(templui.ButtonProps{
        Text:      text,
        Variant:   "primary",
        ClassName: "w-full py-3 text-lg",  // Your defaults
    })
}

// Use your wrapper:
@PrimaryButton("Sign Up")
@PrimaryButton("Get Started")
```text

### When to Build Custom Components

#### Use templui when:

- ✅ Standard UI element (button, input, card)
- ✅ Want to save time
- ✅ Need consistent design

#### Build custom when:

- ✅ Unique to your business logic
- ✅ Very specific design requirements
- ✅ Not available in templui

#### Example:

```templ
// Use templui for standard parts:
templ ProductCard(product Product) {
    @templui.Card() {
        // Custom business logic:
        <img src={ product.Image } alt={ product.Name } />
        <h3>{ product.Name }</h3>
        <p>${ fmt.Sprintf("%.2f", product.Price) }</p>

        if product.InStock {
            @templui.Button(templui.ButtonProps{Text: "Add to Cart", Variant: "primary"})
        } else {
            @templui.Button(templui.ButtonProps{Text: "Out of Stock", Variant: "secondary", Disabled: true})
        }
    }
}
```text

### Design Systems

#### What is a Design System?

A set of standards for design and code, including:

- Color palette
- Typography
- Spacing rules
- Component library
- Usage guidelines

#### Famous Design Systems:

- Material Design (Google)
- Human Interface Guidelines (Apple)
- Fluent Design (Microsoft)
- Carbon (IBM)

#### templui as Mini Design System:

- Consistent components
- Tailwind-based tokens
- Predictable behavior

#### Benefits for Client Work:

- Faster development
- Consistent look
- Easier handoff
- Professional appearance

### 🌍 Where You'll See This

#### Popular Component Libraries:

| Library | Framework | Users |
|---------|-----------|-------|
| Material-UI | React | Google's design language |
| Ant Design | React | Chinese company designs |
| Bootstrap | Any | Most popular (older approach) |
| Tailwind UI | Tailwind | Official Tailwind components (paid) |
| DaisyUI | Tailwind | Free Tailwind components |
| **templui** | templ | Go/templ projects |

#### Used By:

- Startups (move fast)
- Agencies (consistent client sites)
- Internal tools (professional quickly)
- Prototypes (test ideas fast)

### 🔗 Documentation & Resources

#### templui Documentation:

- [templui GitHub](https://github.com/templui/templui) - Official repository
- [templui Components](https://github.com/templui/templui/tree/main/components) - Browse components
- Component documentation (check repository README)

#### Installation:

```bash
go get github.com/templui/templui
```text

#### Design System Resources:

- [Design Systems 101](https://www.nngroup.com/articles/design-systems-101/) - Introduction
- [Material Design](https://m3.material.io/) - Google's design system
- [Why Design Systems Matter](https://www.invisionapp.com/inside-design/guide-to-design-systems/) - InVision article

#### Component Library Comparisons:

- [Best React Component Libraries](https://www.sitepoint.com/react-component-libraries/) - Concepts apply to all
- [Tailwind UI vs DaisyUI](https://www.reddit.com/r/tailwindcss/comments/qh1234/) - Free vs paid tradeoffs

### ✅ Practice Exercises

#### Exercise 1: Install templui (15 minutes)

1. In your Go project: `go get github.com/templui/templui`
2. Verify in `go.mod`
3. Import in a .templ file
4. Use a simple component (button)

#### Exercise 2: Build a Form (45 minutes)

1. Create a contact form using templui components:
   - Name input
   - Email input
   - Message textarea
   - Submit button
2. Add labels to all fields
3. Make some fields required
4. Style with Tailwind classes

#### Exercise 3: Create a Card Layout (45 minutes)

1. Use templui Card component
2. Create 3 cards showing services:
   - Web Design
   - Hosting
   - Maintenance
3. Each card has title, description, price
4. Add "Learn More" button to each
5. Arrange in grid layout

#### Exercise 4: Alert System (30 minutes)

1. Create page with templui Alert components:
   - Success alert
   - Error alert
   - Warning alert
   - Info alert
2. Add icons to each (using emoji or SVG)
3. Make them dismissible

#### Exercise 5: Build Custom Wrapper (1 hour)

1. Create wrapper component for templui Button with your defaults
2. Create wrapper for templui Input with consistent styling
3. Create wrapper for templui Card with your branding
4. Build a page using only your wrappers
5. Document when to use wrapper vs templui directly

#### Exercise 6: Compare Libraries (Research)

1. Look at 3 component libraries (Material-UI, DaisyUI, Bootstrap)
2. Compare:
   - Number of components
   - Styling approach
   - Customization ease
   - Cost
3. Understand why templui is right for our stack

---

## Phase 5: Tailwind CSS

### 🧠 What You'll Learn

Modern utility-first CSS for styling websites quickly and consistently.

### What is CSS?

**CSS (Cascading Style Sheets)** controls how HTML looks.

#### Without CSS:

```html
<button>Click Me</button>
```text

Result: Plain, unstyled button

#### With CSS:

```html
<button style="background-color: blue; color: white; padding: 10px;">
    Click Me
</button>
```text

Result: Blue button with white text

### Traditional CSS Approach

#### Separate CSS File:

```css
/* styles.css */
.btn {
    background-color: blue;
    color: white;
    padding: 10px;
    border-radius: 5px;
}

.btn:hover {
    background-color: darkblue;
}
```text

#### HTML:

```html
<button class="btn">Click Me</button>
```text

#### Problems with Traditional CSS:

- ❌ Context switching (HTML → CSS file → HTML)
- ❌ Naming classes is hard ("btn" vs "button" vs "btn-primary"?)
- ❌ Unused CSS grows large
- ❌ Hard to delete (is this class used anywhere?)
- ❌ Global scope (changes affect everywhere)

### What is Tailwind CSS?

**Tailwind** is a **utility-first** CSS framework.

**Utility-First Approach:**
Instead of creating class names, use pre-built utility classes directly in HTML.

#### Traditional:

```html
<button class="btn btn-primary">Click Me</button>
```text

```css
.btn {
    padding: 10px 20px;
    border-radius: 5px;
}
.btn-primary {
    background-color: blue;
    color: white;
}
```text

#### Tailwind:

```html
<button class="bg-blue-500 text-white px-5 py-2 rounded">
    Click Me
</button>
```text

No separate CSS file needed!

### Tailwind Class Breakdown

```html
<button class="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600">
    Click Me
</button>
```text

- `bg-blue-500` = background color (blue, shade 500)
- `text-white` = white text color
- `px-5` = padding left/right (5 units = 1.25rem = 20px)
- `py-2` = padding top/bottom (2 units = 0.5rem = 8px)
- `rounded` = border radius (rounded corners)
- `hover:bg-blue-600` = darker blue on hover

### 🤔 Why We Chose Tailwind

See [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md#4-css-framework-tailwind-css) for full comparison.

#### Key Reasons:

#### Job Market Value:

- Fastest-growing CSS framework
- High demand skill
- Used by major companies

#### Productivity:

- No naming classes
- No context switching
- Rapid prototyping
- Consistent spacing/colors

#### Performance:

- Unused classes removed automatically
- Small production bundle
- Optimized output

### Tailwind Core Concepts

#### 1. Spacing Scale

Tailwind uses a consistent spacing scale:

| Class | Rem | Pixels | Use Case |
|-------|-----|--------|----------|
| `p-0` | 0 | 0px | No padding |
| `p-1` | 0.25rem | 4px | Tiny |
| `p-2` | 0.5rem | 8px | Small |
| `p-4` | 1rem | 16px | Medium |
| `p-6` | 1.5rem | 24px | Large |
| `p-8` | 2rem | 32px | Extra large |

#### Spacing Classes:

- `p-4` = padding all sides
- `px-4` = padding left and right
- `py-4` = padding top and bottom
- `pt-4` = padding top only
- `m-4` = margin (same pattern)

#### 2. Colors

Tailwind has 22 colors, each with 10 shades:

```html
<div class="bg-blue-50">Lightest blue</div>
<div class="bg-blue-500">Medium blue</div>
<div class="bg-blue-900">Darkest blue</div>
```text

#### Common Colors:

- `blue-500` (primary actions)
- `red-500` (errors, danger)
- `green-500` (success)
- `yellow-500` (warnings)
- `gray-500` (neutral)

#### 3. Responsive Design

Add breakpoint prefix for responsive styling:

```html
<div class="text-sm md:text-base lg:text-lg">
    Responsive text size
</div>
```text

#### Breakpoints:

- (no prefix) = all screen sizes
- `sm:` = ≥ 640px (mobile landscape)
- `md:` = ≥ 768px (tablet)
- `lg:` = ≥ 1024px (laptop)
- `xl:` = ≥ 1280px (desktop)

#### Example:

```html
<div class="w-full md:w-1/2 lg:w-1/3">
    <!-- Full width on mobile, half on tablet, third on laptop -->
</div>
```text

#### 4. State Variants

Style different states:

```html
<button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2">
    Interactive button
</button>
```text

#### Common Variants:

- `hover:` = mouse over
- `focus:` = keyboard focus
- `active:` = being clicked
- `disabled:` = disabled state

#### 5. Flexbox & Grid

#### Flexbox (1D layout):

```html
<div class="flex items-center justify-between gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
```text

#### Grid (2D layout):

```html
<div class="grid grid-cols-3 gap-4">
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
</div>
```text

### Common Tailwind Patterns

#### Button:

```html
<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
    Click Me
</button>
```text

#### Card:

```html
<div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-bold mb-2">Card Title</h2>
    <p class="text-gray-600">Card content here.</p>
</div>
```text

#### Form Input:

```html
<input
    type="text"
    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Enter text"
/>
```text

#### Navigation:

```html
<nav class="bg-gray-800 text-white">
    <div class="container mx-auto flex items-center justify-between py-4">
        <div class="text-xl font-bold">Logo</div>
        <div class="flex gap-6">
            <a href="/" class="hover:text-blue-400">Home</a>
            <a href="/about" class="hover:text-blue-400">About</a>
            <a href="/contact" class="hover:text-blue-400">Contact</a>
        </div>
    </div>
</nav>
```text

### Using Tailwind with templ

```templ
package templates

templ Button(text string, primary bool) {
    <button class={
        "px-4 py-2 rounded font-semibold",
        templ.KV("bg-blue-500 text-white hover:bg-blue-600", primary),
        templ.KV("bg-gray-200 text-gray-800 hover:bg-gray-300", !primary),
    }>
        { text }
    </button>
}
```text

#### Usage:

```templ
@Button("Save", true)   // Blue primary button
@Button("Cancel", false) // Gray secondary button
```text

### Tailwind Configuration

#### tailwind.config.js:

```javascript
module.exports = {
  content: [
    "./templates/**/*.templ",
    "./templates/**/*.go",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#FF6347',  // Custom color
      },
    },
  },
}
```text

This tells Tailwind:

- Where to find classes (scan .templ files)
- Custom colors/spacing (extend theme)

### 🌍 Where You'll See This

#### Companies Using Tailwind:

- GitHub
- Shopify
- OpenAI (ChatGPT UI)
- Vercel
- Laravel (official UI)

#### Use Cases:

- Marketing websites
- SaaS applications
- Admin dashboards
- E-commerce sites
- Landing pages

#### Alternatives You'll See:

- Bootstrap (older, component-based)
- Material-UI (React + Material Design)
- Custom CSS (full control, more time)

### 🔗 Documentation & Resources

#### Official Documentation:

- [tailwindcss.com](https://tailwindcss.com/) - Official site
- [Tailwind Docs](https://tailwindcss.com/docs) - Complete reference
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet) - Quick reference

#### Learning Resources:

- [Tailwind CSS Crash Course - Traversy Media](https://www.youtube.com/watch?v=UBOj6rqRUME) (1 hour)
- [Tailwind CSS Tutorial - Net Ninja](https://www.youtube.com/watch?v=bxmDnn7lrnk&list=PL4cUxeGkcC9gpXORlEHjc5bgnIi5HEGhw) (Full series)
- [Play Tailwind (Playground)](https://play.tailwindcss.com/) - Try in browser

#### Design Resources:

- [Tailwind UI](https://tailwindui.com/) - Official components (paid, $299)
- [Tailwind Components](https://tailwindcomponents.com/) - Free community components
- [Flowbite](https://flowbite.com/) - Free Tailwind component library

#### Tools:

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - VS Code extension (autocomplete)
- [Tailwind Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) - Auto-sort classes

#### Installation:

- See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md#installing-tailwind) for setup instructions

### ✅ Practice Exercises

#### Exercise 1: Install Tailwind (30 minutes)

1. Follow [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md#installing-tailwind)
2. Install Tailwind CSS via npm or Tailwind CLI
3. Create tailwind.config.js
4. Set up build process
5. Verify Tailwind works in browser

**Exercise 2: Build Components (1 hour)**
Recreate these common elements with Tailwind:

1. **Button** - Primary, secondary, danger variants
2. **Card** - With image, title, description
3. **Alert** - Success, error, warning styles
4. **Form Input** - With label, focus state
5. **Navigation Bar** - Logo, links, responsive

#### Exercise 3: Responsive Layout (1 hour)

1. Create 3-column grid that becomes:
   - 1 column on mobile
   - 2 columns on tablet
   - 3 columns on desktop
2. Test by resizing browser
3. Add responsive text sizes
4. Make navigation hamburger menu on mobile

#### Exercise 4: Recreate a Design (1.5 hours)

1. Find a simple landing page design (Dribbble, Behance)
2. Recreate with Tailwind
3. Focus on:
   - Spacing consistency
   - Color scheme
   - Typography
   - Hover states
4. Document which classes you used most

#### Exercise 5: Dark Mode (45 minutes)

1. Add dark mode toggle to a page
2. Use `dark:` variant classes
3. Test switching between modes
4. Consider color choices for accessibility

**Exercise 6: Compare Approaches (Group Activity)**
Write the same button 3 ways:

1. Inline styles (style="...")
2. Traditional CSS (separate .css file)
3. Tailwind utility classes

#### Discuss:

- Which is fastest to write?
- Which is easiest to maintain?
- Which is most flexible?
- When would you use each approach?

---

## Phase 6: SQLite Database

### 🧠 What You'll Learn

How to store and retrieve persistent data using a lightweight, file-based database.

### What is a Database?

A **database** stores data permanently (persists after server restart).

#### Without Database:

```go
// Data in memory (lost on restart):
var users = []User{
    {Name: "John", Email: "john@example.com"},
}
```text

#### With Database:

```go
// Data stored in file (survives restart):
user := GetUserFromDatabase(123)
```text

### Relational vs NoSQL

#### Relational (SQL) Databases:

- Data in tables (rows and columns)
- Relationships between tables
- Use SQL query language
- Examples: SQLite, PostgreSQL, MySQL

#### NoSQL Databases:

- Data in documents, key-value, or graph format
- Flexible schema
- Often specialized queries
- Examples: MongoDB, Firebase, Redis

**Our Choice:** Relational (SQLite) because most business data is relational.

### What is SQLite?

**SQLite** is a lightweight, file-based SQL database.

#### Key Characteristics:

- **Zero configuration** (no server to run)
- **Single file** (entire database in one file)
- **Serverless** (library, not client-server)
- **Cross-platform** (works everywhere)
- **Full SQL support** (joins, indexes, transactions)

#### SQLite File:

```text
my-website/
├── database.db          ← Entire database in one file!
└── database.db-wal      ← Write-ahead log (for safety)
```text

### 🤔 Why We Chose SQLite

See [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md#5-database-sqlite) for full comparison.

#### Perfect for Small Business Websites:

- ✅ Can handle 100,000+ visitors/day
- ✅ Read-heavy workloads (typical websites)
- ✅ No database server costs
- ✅ Simple backups (copy file, or use litestream)
- ✅ Fast queries

#### When to Use PostgreSQL Instead:

- Heavy write volume (thousands of writes/second)
- Multiple concurrent writers
- Distributed systems (multiple servers)
- Very large datasets (> 100GB)

#### Companies Using SQLite:

- Expensify (accounting software)
- Apple (iOS core data)
- Airbnb (early days)
- Every browser (storing cookies, history)

### SQL Basics

**SQL (Structured Query Language)** is the language for relational databases.

#### Common SQL Commands:

#### Create Table:

```sql
CREATE TABLE businesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```text

#### Insert Data:

```sql
INSERT INTO businesses (name, email, phone)
VALUES ('Blue Mountain Bakery', 'contact@bluemountain.com', '555-1234');
```text

#### Query Data:

```sql
-- Get all businesses
SELECT * FROM businesses;

-- Get specific business
SELECT * FROM businesses WHERE id = 1;

-- Search by name
SELECT * FROM businesses WHERE name LIKE '%Bakery%';
```text

#### Update Data:

```sql
UPDATE businesses
SET phone = '555-5678'
WHERE id = 1;
```text

#### Delete Data:

```sql
DELETE FROM businesses WHERE id = 1;
```text

### Database Schema Design

**Schema** = structure of your database (tables, columns, relationships).

#### Example Schema for Business Website:

```sql
-- Users table (authentication handled by Clerk)
CREATE TABLE profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clerk_user_id TEXT UNIQUE NOT NULL,
    business_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price REAL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Contact submissions table
CREATE TABLE contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```text

#### Relationships:

```text
profiles (1) ←──→ (many) services
One business can have many services
```text

### Data Types in SQLite

| SQLite Type | Description | Go Type | Example |
|-------------|-------------|---------|---------|
| `INTEGER` | Whole numbers | int, int64 | 123, -456 |
| `REAL` | Decimal numbers | float64 | 19.99, -3.14 |
| `TEXT` | Strings | string | "Hello", "<user@email.com>" |
| `BLOB` | Binary data | []byte | Images, files |
| `NULL` | No value | nil | NULL |

#### Special Constraints:

- `PRIMARY KEY` = Unique identifier for each row
- `AUTOINCREMENT` = Automatically assign next number
- `NOT NULL` = Must have a value
- `UNIQUE` = No duplicates allowed
- `DEFAULT` = Value if none provided

### Working with SQLite in Go

#### Install SQLite Driver:

```bash
go get github.com/mattn/go-sqlite3
```text

#### Connect to Database:

```go
import (
    "database/sql"
    _ "github.com/mattn/go-sqlite3"
)

db, err := sql.Open("sqlite3", "./database.db")
if err != nil {
    log.Fatal(err)
}
defer db.Close()
```text

#### Basic Query:

```go
row := db.QueryRow("SELECT name, email FROM businesses WHERE id = ?", 1)

var name, email string
err := row.Scan(&name, &email)
if err != nil {
    log.Fatal(err)
}

fmt.Printf("Business: %s (%s)\n", name, email)
```text

**We'll use sqlc to generate type-safe code** (covered in Phase 8), so you won't write this boilerplate often.

### Database Best Practices

#### Use Transactions for Multiple Operations:

```sql
BEGIN TRANSACTION;
INSERT INTO profiles (...) VALUES (...);
INSERT INTO services (...) VALUES (...);
COMMIT;
```text

#### Use Indexes for Performance:

```sql
CREATE INDEX idx_businesses_email ON businesses(email);
-- Makes lookups by email much faster
```text

#### Use Foreign Keys for Data Integrity:

```sql
FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
-- If profile deleted, services are automatically deleted
```text

#### Always Backup (Phase 10):

- Use litestream for continuous backup
- Test restore process

### 🌍 Where You'll See This

#### SQLite Used In:

- Mobile apps (iOS, Android)
- Desktop applications
- Embedded systems
- Browser storage
- Small to medium websites
- Development/testing

#### SQL Skills Transfer To:

- PostgreSQL (very similar SQL)
- MySQL (similar SQL)
- Data analysis jobs (SQL is #1 skill)
- Backend development

### 🔗 Documentation & Resources

#### Official Documentation:

- [sqlite.org](https://www.sqlite.org/) - Official site
- [SQLite Documentation](https://www.sqlite.org/docs.html) - Complete reference
- [SQL As Understood By SQLite](https://www.sqlite.org/lang.html) - SQL syntax
- [When To Use SQLite](https://www.sqlite.org/whentouse.html) - Use cases

#### SQL Learning:

- [SQLite Tutorial](https://www.sqlitetutorial.net/) - Comprehensive guide
- [SQL Basics - Khan Academy](https://www.khanacademy.org/computing/computer-programming/sql) - Interactive
- [Learn SQL - Codecademy](https://www.codecademy.com/learn/learn-sql) - Free course
- [SQL Murder Mystery](https://mystery.knightlab.com/) - Learn SQL by solving mystery

#### Go + SQLite:

- [go-sqlite3 GitHub](https://github.com/mattn/go-sqlite3) - Driver we'll use
- [database/sql Tutorial](https://go.dev/doc/database/querying) - Go standard library

#### Tools:

- [DB Browser for SQLite](https://sqlitebrowser.org/) - GUI for viewing/editing SQLite files
- [SQLite Online](https://sqliteonline.com/) - Try SQL in browser

### ✅ Practice Exercises

#### Exercise 1: Install SQLite (20 minutes)

1. Install DB Browser for SQLite (GUI tool)
2. Install Go SQLite driver: `go get github.com/mattn/go-sqlite3`
3. Create test database file
4. Open in DB Browser

#### Exercise 2: Create Schema (45 minutes)

1. Design schema for a simple business website:
   - Businesses table
   - Services/products table
   - Contact form submissions
2. Write CREATE TABLE statements
3. Execute in DB Browser
4. Verify structure

#### Exercise 3: Insert Data (30 minutes)

1. Insert 5 test businesses
2. Insert 2-3 services for each business
3. Insert sample contact submissions
4. Use DB Browser or SQL commands

**Exercise 4: Query Practice (1 hour)**
Write SQL queries to:

1. Get all businesses
2. Find business by ID
3. Search businesses by name
4. Get all services for a business
5. Count contact submissions
6. Get recent submissions (last 7 days)
7. Find businesses with no services
8. Calculate average service price

#### Exercise 5: Go Integration (1 hour)

1. Create Go program that connects to SQLite
2. Create a `Business` struct
3. Write function to insert business
4. Write function to query all businesses
5. Print results

#### Exercise 6: Design Your Schema (Group Activity)

1. For your club's website service, design database schema
2. What tables do you need?
3. What columns in each table?
4. What relationships exist?
5. Present to class and get feedback

---

## Phase 7: goose Migrations

### 🧠 What You'll Learn

How to version control your database schema and manage changes over time.

### What are Database Migrations?

**Migrations** are version-controlled database schema changes.

#### Problem Without Migrations:

```text
Developer 1: Creates `users` table locally
Developer 2: Has different `users` table
Production: Has old schema
→ Chaos! 😱
```text

#### Solution With Migrations:

```text
001_create_users.sql    (Everyone runs this)
002_add_phone_column.sql (Everyone runs this)
003_add_index.sql       (Everyone runs this)
→ Everyone has same schema! ✅
```text

#### Benefits:

- ✅ Version control for database
- ✅ Team synchronization
- ✅ Reproducible setup
- ✅ Rollback capability
- ✅ Deployment automation

### Migration Workflow

```text
Local Dev: Write migration → Test → Commit to git
↓
Team: Pull git → Run migrations → Same schema
↓
Production: Deploy → Run migrations → Schema updated
```text

### What is goose?

**goose** is a database migration tool for Go that:

- Manages migration files
- Tracks which migrations have run
- Supports up (apply) and down (rollback)
- Works with SQLite, PostgreSQL, MySQL

### 🤔 Why We Chose goose

See [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md#6-database-migrations-goose) for full comparison.

#### Key Reasons:

- ✅ Simple SQL-based migrations
- ✅ Easy to understand (no magic)
- ✅ Go-native tool
- ✅ Supports up/down migrations
- ✅ Version control friendly

### goose Migration Structure

#### Migration File Naming:

```text
migrations/
├── 00001_create_profiles.sql
├── 00002_create_services.sql
├── 00003_add_profiles_phone.sql
└── 00004_create_contact_submissions.sql
```text

**Naming Pattern:** `{version}_{description}.sql`

#### Migration File Format:

```sql
-- +goose Up
-- SQL in this section is executed when migrating up
CREATE TABLE profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clerk_user_id TEXT UNIQUE NOT NULL,
    business_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- +goose Down
-- SQL in this section is executed when migrating down
DROP TABLE profiles;
```text

### Installing and Setting Up goose

#### Install goose:

```bash
go install github.com/pressly/goose/v3/cmd/goose@latest
```text

#### Verify installation:

```bash
goose -version
```text

#### Create migrations directory:

```bash
mkdir -p db/migrations
```text

### Creating Your First Migration

#### Create migration:

```bash
goose -dir db/migrations create create_profiles sql
```text

This creates: `db/migrations/00001_create_profiles.sql`

#### Edit the file:

```sql
-- +goose Up
CREATE TABLE profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clerk_user_id TEXT UNIQUE NOT NULL,
    business_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_profiles_clerk_user_id ON profiles(clerk_user_id);

-- +goose Down
DROP INDEX idx_profiles_clerk_user_id;
DROP TABLE profiles;
```text

### Running Migrations

#### Apply migrations (up):

```bash
goose -dir db/migrations sqlite3 ./database.db up
```text

Output:

```text
2024/01/15 10:30:00 OK   00001_create_profiles.sql
goose: no migrations to run. current version: 1
```text

#### Check status:

```bash
goose -dir db/migrations sqlite3 ./database.db status
```text

Output:

```text
Applied At                  Migration
=======================================
Mon Jan 15 10:30:00 2024 -- 00001_create_profiles.sql
```text

#### Rollback last migration (down):

```bash
goose -dir db/migrations sqlite3 ./database.db down
```text

### Common Migration Examples

#### Add Column:

```sql
-- +goose Up
ALTER TABLE profiles ADD COLUMN website TEXT;

-- +goose Down
ALTER TABLE profiles DROP COLUMN website;
```text

#### Create New Table:

```sql
-- +goose Up
CREATE TABLE services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE INDEX idx_services_profile_id ON services(profile_id);

-- +goose Down
DROP INDEX idx_services_profile_id;
DROP TABLE services;
```text

#### Add Index:

```sql
-- +goose Up
CREATE INDEX idx_services_price ON services(price);

-- +goose Down
DROP INDEX idx_services_price;
```text

### Migration Best Practices

#### 1. Never Edit Applied Migrations:

```text
❌ Don't: Edit 00001_create_profiles.sql after it's been applied
✅ Do: Create new migration 00005_add_profiles_column.sql
```text

#### 2. Always Write Down Migrations:

- Allows rollback if something goes wrong
- Required for goose

#### 3. Test Migrations Both Ways:

```bash
goose up    # Apply
goose down  # Rollback
goose up    # Apply again
```text

#### 4. Keep Migrations Small:

```text
✅ Good:
  00001_create_profiles.sql
  00002_create_services.sql
  00003_add_profiles_website.sql

❌ Bad:
  00001_create_entire_schema.sql (huge file, hard to review)
```text

#### 5. Use Descriptive Names:

```text
✅ Good: 00003_add_profiles_phone_column.sql
❌ Bad: 00003_update.sql
```text

### goose Version Table

goose tracks applied migrations in a table:

```sql
SELECT * FROM goose_db_version;
```text

Output:

```text
| id | version_id | is_applied | tstamp              |
|----|------------|------------|---------------------|
| 1  | 1          | 1          | 2024-01-15 10:30:00 |
| 2  | 2          | 1          | 2024-01-15 10:31:00 |
```text

**Don't manually edit this table!** Let goose manage it.

### Team Workflow with Migrations

#### Developer A creates feature:

1. Create migration: `goose create add_reviews sql`
2. Write up/down SQL
3. Test locally: `goose up`, `goose down`, `goose up`
4. Commit migration file to git
5. Push to team

#### Developer B pulls changes:

1. Pull from git (gets new migration file)
2. Run `goose up`
3. Database now has same schema as Developer A

#### Deployment:

```bash
# In deployment script:
goose -dir db/migrations sqlite3 $DATABASE_PATH up
./mywebsite  # Start server with updated schema
```text

### 🌍 Where You'll See This

#### Migration Tools:

- Rails: Active Record Migrations
- Django: Django Migrations
- Laravel: Eloquent Migrations
- Node.js: Knex.js, TypeORM
- Go: goose, golang-migrate, Atlas

**Every serious project uses migrations** to manage schema changes.

### 🔗 Documentation & Resources

#### Official Documentation:

- [goose GitHub](https://github.com/pressly/goose) - Official repository
- [goose Documentation](https://pressly.github.io/goose/) - Full guide

#### Installation:

```bash
go install github.com/pressly/goose/v3/cmd/goose@latest
```text

#### Learning Resources:

- [Database Migrations Explained](https://www.prisma.io/dataguide/types/relational/what-are-database-migrations) - Concept overview
- [Schema Migration Best Practices](https://www.brunton-spall.co.uk/post/2014/05/06/database-migrations-done-right/) - Article

#### Alternative Tools:

- [golang-migrate](https://github.com/golang-migrate/migrate) - Similar to goose, more features
- [Atlas](https://atlasgo.io/) - Modern, declarative migrations

### ✅ Practice Exercises

#### Exercise 1: Install goose (15 minutes)

1. Install goose: `go install github.com/pressly/goose/v3/cmd/goose@latest`
2. Verify: `goose -version`
3. Create migrations directory: `mkdir -p db/migrations`

#### Exercise 2: Create Initial Schema (1 hour)

1. Create migration for profiles table
2. Create migration for services table
3. Create migration for contact_submissions table
4. Run `goose up` to apply
5. Verify tables exist in DB Browser

#### Exercise 3: Modify Schema (45 minutes)

1. Create migration to add `website` column to profiles
2. Create migration to add index on services.price
3. Apply migrations
4. Verify changes
5. Test rollback with `goose down`

#### Exercise 4: Practice Rollback (30 minutes)

1. Check current version: `goose status`
2. Roll back last migration: `goose down`
3. Check database (column should be gone)
4. Re-apply: `goose up`
5. Verify data integrity

#### Exercise 5: Team Simulation (Group Activity)

1. One person creates migration, commits to git
2. Others pull and run migration
3. Everyone verifies same schema
4. Discuss: What happens if someone forgets to run migration?

#### Exercise 6: Production Simulation (45 minutes)

1. Create "production" database (separate file)
2. Run all migrations from scratch
3. Create script that:
   - Backs up database
   - Runs migrations
   - Starts server
4. Practice this workflow

---

## Phase 8: sqlc for Type-Safe Queries

### 🧠 What You'll Learn

How to write SQL queries and automatically generate type-safe Go code.

### The Problem with Manual Database Code

#### Raw SQL in Go (manual approach):

```go
row := db.QueryRow("SELECT name, email FROM businesses WHERE id = ?", id)

var name string
var email string
err := row.Scan(&name, &email)  // Easy to mess up order!

// Typos in SQL caught only at runtime
row := db.QueryRow("SELECT nam FROM businesses WHERE id = ?", id)
// ❌ Runtime error: no such column
```text

#### Problems:

- ❌ SQL typos found at runtime
- ❌ Easy to misorder Scan arguments
- ❌ No autocomplete
- ❌ Lots of boilerplate code
- ❌ Hard to refactor

### What is sqlc?

**sqlc** generates type-safe Go code from SQL queries.

#### Your Input (SQL):

```sql
-- name: GetBusiness :one
SELECT * FROM businesses WHERE id = ? LIMIT 1;

-- name: ListBusinesses :many
SELECT * FROM businesses ORDER BY name;
```text

#### sqlc Output (Generated Go Code):

```go
func (q *Queries) GetBusiness(ctx context.Context, id int64) (Business, error)
func (q *Queries) ListBusinesses(ctx context.Context) ([]Business, error)
```text

#### Benefits:

- ✅ Compile-time error checking
- ✅ Type-safe (correct types automatically)
- ✅ Autocomplete in editor
- ✅ Write real SQL (learn database skills)
- ✅ No runtime reflection overhead

### 🤔 Why We Chose sqlc

See [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md#7-query-builder-sqlc) for full comparison.

#### vs GORM (ORM):

- sqlc: Write SQL, get type-safe Go
- GORM: Write Go, generates SQL (hidden)
- We want students to learn SQL!

#### vs database/sql (standard library):

- database/sql: Lots of boilerplate, easy to make mistakes
- sqlc: Generated boilerplate, type-safe

### Installing sqlc

#### Install sqlc:

```bash
go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
```text

#### Verify:

```bash
sqlc version
```text

### Setting Up sqlc

#### Create configuration file `sqlc.yaml`:

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
        emit_interface: false
```text

#### What this means:

- `queries`: Where you write SQL queries
- `schema`: Where migrations are (sqlc reads schema)
- `out`: Where generated Go code goes
- `package`: Go package name for generated code

#### Create queries directory:

```bash
mkdir -p db/queries
```text

### Writing SQL Queries for sqlc

#### Create `db/queries/businesses.sql`:

```sql
-- name: GetBusiness :one
SELECT * FROM businesses
WHERE id = ? LIMIT 1;

-- name: ListBusinesses :many
SELECT * FROM businesses
ORDER BY name;

-- name: CreateBusiness :one
INSERT INTO businesses (
    name, email, phone
) VALUES (
    ?, ?, ?
)
RETURNING *;

-- name: UpdateBusiness :exec
UPDATE businesses
SET name = ?, email = ?, phone = ?
WHERE id = ?;

-- name: DeleteBusiness :exec
DELETE FROM businesses
WHERE id = ?;
```text

#### Query Annotations:

- `:one` = Returns single row (or error if not found)
- `:many` = Returns slice of rows
- `:exec` = Execute only (INSERT, UPDATE, DELETE with no RETURNING)
- `:execrows` = Execute and return number of rows affected

### Generating Go Code

#### Run sqlc:

```bash
sqlc generate
```text

#### Generated files:

```text
db/
├── db.go           # Database connection
├── models.go       # Struct types for each table
├── businesses.sql.go  # Generated query functions
└── querier.go      # Interface for all queries
```text

#### Generated struct (models.go):

```go
type Business struct {
    ID        int64     `json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
    Phone     string    `json:"phone"`
    CreatedAt time.Time `json:"created_at"`
}
```text

#### Generated functions (businesses.sql.go):

```go
func (q *Queries) GetBusiness(ctx context.Context, id int64) (Business, error)
func (q *Queries) ListBusinesses(ctx context.Context) ([]Business, error)
func (q *Queries) CreateBusiness(ctx context.Context, arg CreateBusinessParams) (Business, error)
// ... etc
```text

### Using Generated Code in Handlers

#### Setup (main.go):

```go
package main

import (
    "database/sql"
    "mywebsite/db"

    _ "github.com/mattn/go-sqlite3"
)

func main() {
    // Open database
    dbConn, err := sql.Open("sqlite3", "./database.db")
    if err != nil {
        log.Fatal(err)
    }

    // Create queries object
    queries := db.New(dbConn)

    // Pass to handlers
    app := &App{queries: queries}
    http.HandleFunc("/businesses", app.listBusinessesHandler)
    http.ListenAndServe(":8080", nil)
}
```text

#### In handler (handlers/businesses.go):

```go
func (app *App) listBusinessesHandler(w http.ResponseWriter, r *http.Request) {
    // Use generated function:
    businesses, err := app.queries.ListBusinesses(r.Context())
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // businesses is []db.Business - type-safe!
    BusinessListTemplate(businesses).Render(r.Context(), w)
}
```text

#### Create business:

```go
func (app *App) createBusinessHandler(w http.ResponseWriter, r *http.Request) {
    // Parse form
    name := r.FormValue("name")
    email := r.FormValue("email")
    phone := r.FormValue("phone")

    // Use generated function:
    business, err := app.queries.CreateBusiness(r.Context(), db.CreateBusinessParams{
        Name:  name,
        Email: email,
        Phone: sql.NullString{String: phone, Valid: phone != ""},
    })
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // business is db.Business type
    fmt.Fprintf(w, "Created business #%d", business.ID)
}
```text

### Advanced sqlc Features

#### Complex Queries:

```sql
-- name: SearchBusinesses :many
SELECT * FROM businesses
WHERE name LIKE '%' || ? || '%'
OR email LIKE '%' || ? || '%'
ORDER BY name
LIMIT ? OFFSET ?;
```text

#### Joins:

```sql
-- name: ListBusinessesWithServices :many
SELECT
    b.id,
    b.name,
    COUNT(s.id) as service_count
FROM businesses b
LEFT JOIN services s ON b.id = s.business_id
GROUP BY b.id, b.name
ORDER BY b.name;
```text

#### Transactions:

```go
// Begin transaction
tx, err := db.Begin()
if err != nil {
    return err
}
defer tx.Rollback()

// Create queries with transaction
qtx := queries.WithTx(tx)

// Run multiple queries
business, err := qtx.CreateBusiness(ctx, params1)
service, err := qtx.CreateService(ctx, params2)

// Commit if all succeeded
return tx.Commit()
```text

### sqlc Best Practices

#### 1. One File Per Table:

```text
db/queries/
├── businesses.sql
├── services.sql
└── contacts.sql
```text

#### 2. Name Queries Clearly:

```sql
-- ✅ Good:
-- name: GetBusinessByID :one
-- name: ListActiveBusinesses :many

-- ❌ Bad:
-- name: Get :one
-- name: List :many
```text

#### 3. Use Parameters, Not String Concatenation:

```sql
-- ✅ Good (safe from SQL injection):
SELECT * FROM businesses WHERE name = ?

-- ❌ Bad (SQL injection vulnerability):
SELECT * FROM businesses WHERE name = 'someName'
```text

#### 4. Re-generate After Query Changes:

```bash
sqlc generate
```text

### 🌍 Where You'll See This

#### Similar Tools:

- **GORM** (Go) - ORM, generates SQL from Go
- **Ent** (Go) - Graph-based ORM
- **Prisma** (Node.js) - Similar to sqlc (generates type-safe client)
- **Kysely** (TypeScript) - Type-safe query builder
- **SQLx** (Rust) - Compile-time checked SQL

**Code Generation** is increasingly popular:

- Type safety without runtime overhead
- Best of both worlds (SQL + type safety)

### 🔗 Documentation & Resources

#### Official Documentation:

- [sqlc.dev](https://sqlc.dev/) - Official site
- [sqlc Documentation](https://docs.sqlc.dev/) - Complete guide
- [sqlc GitHub](https://github.com/sqlc-dev/sqlc) - Source code

#### Installation:

```bash
go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
```text

#### Learning Resources:

- [Getting Started with sqlc](https://docs.sqlc.dev/en/latest/tutorials/getting-started-sqlite.html) - Official tutorial
- [sqlc Examples](https://github.com/sqlc-dev/sqlc/tree/main/examples) - Sample projects

#### Configuration:

- [sqlc.yaml Reference](https://docs.sqlc.dev/en/latest/reference/config.html) - All options

### ✅ Practice Exercises

#### Exercise 1: Install sqlc (15 minutes)

1. Install: `go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest`
2. Verify: `sqlc version`
3. Create `sqlc.yaml` configuration
4. Create `db/queries/` directory

#### Exercise 2: Generate Basic CRUD (1 hour)

1. Write queries for businesses table:
   - Get by ID
   - List all
   - Create
   - Update
   - Delete
2. Run `sqlc generate`
3. Examine generated code
4. Understand each generated function

#### Exercise 3: Use in Handlers (1.5 hours)

1. Create HTTP handlers that use generated code:
   - GET /businesses (list all)
   - GET /businesses/:id (get one)
   - POST /businesses (create)
   - PUT /businesses/:id (update)
   - DELETE /businesses/:id (delete)
2. Test with curl or browser

#### Exercise 4: Complex Queries (1 hour)

1. Write query with LIKE search
2. Write query with JOIN (businesses + services)
3. Write query with aggregation (COUNT)
4. Generate and use in handlers

#### Exercise 5: Error Handling (45 minutes)

1. Handle "not found" errors (GetBusinessByID)
2. Handle constraint violations (duplicate email)
3. Return appropriate HTTP status codes
4. Show user-friendly error messages

**Exercise 6: Compare Approaches (Group Activity)**
Write same database operation 3 ways:

1. Raw database/sql (manual Scan, etc.)
2. GORM (if time permits)
3. sqlc (generated code)

#### Compare:

- Lines of code
- Type safety
- Ease of refactoring
- Learning curve

---

## Phase 9: Clerk Authentication

### 🧠 What You'll Learn

How to add secure user authentication without building it from scratch.

### What is Authentication?

**Authentication** = Verifying who someone is (login)
**Authorization** = Verifying what they can do (permissions)

#### Common Authentication Features:

- Sign up (create account)
- Sign in (log in)
- Sign out (log out)
- Password reset
- Email verification
- Social logins (Google, GitHub, etc.)
- Two-factor authentication (2FA)
- Session management

### Why NOT Build Your Own Auth?

#### Security Risks:

- ❌ Password storage (must hash correctly with bcrypt/argon2)
- ❌ Timing attacks
- ❌ Brute force protection
- ❌ SQL injection vulnerabilities
- ❌ Session hijacking
- ❌ CSRF attacks
- ❌ Email verification spoofing

#### Time Investment:

- ❌ Weeks of development
- ❌ Ongoing security updates
- ❌ Building password reset flow
- ❌ Email infrastructure
- ❌ UI/UX for all auth flows

**Industry Standard:** Use an authentication service (Clerk, Auth0, Supabase Auth, Firebase Auth).

### What is Clerk?

**Clerk** is a complete authentication and user management service.

#### What Clerk Provides:

- 🔐 Secure authentication (passwords, magic links, OTP)
- 👥 Social logins (Google, GitHub, Microsoft, etc.)
- 📧 Email verification automatic
- 🔑 Password reset flow
- 👤 User profile management
- 🏢 Organization/team support
- 🔒 Session management with JWTs
- 🎨 Beautiful pre-built UI components
- 🪝 Webhooks for user events

### 🤔 Why We Chose Clerk

See [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md#8-authentication-clerk) for full comparison.

#### Key Reasons:

#### Free Tier:

- 10,000 monthly active users (MAUs) free
- Perfect for small businesses
- No credit card required to start

#### Developer Experience:

- Pre-built UI components (no custom forms needed)
- Simple Go SDK
- Works seamlessly with our stack
- Excellent documentation

#### Security:

- Industry experts handle security
- Regular security updates
- Compliant with standards
- Protection built-in

#### Features:

- Social logins included
- Email verification automatic
- Multi-factor authentication
- User profiles

### How Clerk Works

```text
User clicks "Sign In"
  ↓
Clerk UI component opens (modal/page)
  ↓
User signs in with email/password or social login
  ↓
Clerk creates session
  ↓
Your Go app receives JWT token
  ↓
You verify token and get user info
  ↓
Create/update user profile in your database
```text

### Setting Up Clerk

#### 1. Create Clerk Account:

- Visit [clerk.com](https://clerk.com/)
- Sign up for free account
- Create new application

#### 2. Get API Keys:

```bash
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```text

#### 3. Install Clerk Go SDK:

```bash
go get github.com/clerk/clerk-sdk-go/v2
```text

### Integrating Clerk in Go

#### Environment variables (.env file):

```bash
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```text

#### Initialize Clerk (main.go):

```go
package main

import (
    "github.com/clerk/clerk-sdk-go/v2"
    clerkhttp "github.com/clerk/clerk-sdk-go/v2/http"
)

func main() {
    // Initialize Clerk
    clerk.SetKey(os.Getenv("CLERK_SECRET_KEY"))

    // Create middleware
    authMiddleware := clerkhttp.RequireHeaderAuthorization()

    // Protected route
    http.Handle("/dashboard", authMiddleware(http.HandlerFunc(dashboardHandler)))

    http.ListenAndServe(":8080", nil)
}
```text

#### Protected handler:

```go
func dashboardHandler(w http.ResponseWriter, r *http.Request) {
    // Get authenticated user
    claims, ok := clerk.SessionClaimsFromContext(r.Context())
    if !ok {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    userID := claims.Subject // Clerk user ID

    // Get or create user profile in your database
    profile, err := app.queries.GetProfileByClerkID(r.Context(), userID)
    if err != nil {
        // Create new profile
        profile, err = app.queries.CreateProfile(r.Context(), db.CreateProfileParams{
            ClerkUserID:  userID,
            BusinessName: "New Business",
        })
    }

    // Render dashboard with user data
    DashboardTemplate(profile).Render(r.Context(), w)
}
```text

### Frontend Integration with templ

#### Sign in button (public page):

```templ
package templates

templ HomePage() {
    <html>
    <head>
        <!-- Include Clerk JavaScript -->
        <script src="https://unpkg.com/@clerk/clerk-js@latest/dist/clerk.browser.js"></script>
        <script>
            // Initialize Clerk
            const clerk = window.Clerk;
            clerk.load({
                publishableKey: '{{ .ClerkPublishableKey }}'
            });
        </script>
    </head>
    <body>
        <nav>
            <a href="/">Home</a>
            <div id="clerk-signin"></div>
            <!-- Clerk automatically renders sign-in button here -->
        </nav>

        <h1>Welcome to our Website Builder</h1>
        <p>Sign in to get started!</p>

        <script>
            // Mount Clerk sign-in button
            clerk.mountSignIn(document.getElementById("clerk-signin"));
        </script>
    </body>
    </html>
}
```text

#### Or use Clerk's prebuilt components:

```html
<!-- Sign In Page -->
<div id="clerk-sign-in"></div>
<script>
    Clerk.mountSignIn(document.getElementById("clerk-sign-in"));
</script>

<!-- User Button (profile menu) -->
<div id="clerk-user-button"></div>
<script>
    Clerk.mountUserButton(document.getElementById("clerk-user-button"));
</script>
```text

### User Profile Flow

#### Database schema (from Phase 7):

```sql
CREATE TABLE profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clerk_user_id TEXT UNIQUE NOT NULL,
    business_name TEXT NOT NULL,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```text

#### Get or create profile:

```go
func (app *App) getOrCreateProfile(ctx context.Context, clerkUserID string) (*db.Profile, error) {
    // Try to get existing profile
    profile, err := app.queries.GetProfileByClerkID(ctx, clerkUserID)
    if err == nil {
        return &profile, nil // Profile exists
    }

    // Get user details from Clerk
    user, err := clerk.Users().Read(clerkUserID)
    if err != nil {
        return nil, err
    }

    // Create new profile
    profile, err = app.queries.CreateProfile(ctx, db.CreateProfileParams{
        ClerkUserID:  clerkUserID,
        BusinessName: "My Business", // Default, user can update
        Email:        user.EmailAddresses[0].EmailAddress,
    })

    return &profile, err
}
```text

### Protecting Routes

#### Middleware approach:

```go
func RequireAuth(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Check if user is authenticated
        claims, ok := clerk.SessionClaimsFromContext(r.Context())
        if !ok {
            // Redirect to sign in
            http.Redirect(w, r, "/sign-in", http.StatusFound)
            return
        }

        // User is authenticated, continue
        next.ServeHTTP(w, r)
    }
}

// Use middleware
http.HandleFunc("/dashboard", RequireAuth(dashboardHandler))
http.HandleFunc("/settings", RequireAuth(settingsHandler))
```text

### Social Logins

#### Enable in Clerk Dashboard:

1. Go to Clerk dashboard
2. Navigate to "Social Connections"
3. Enable providers (Google, GitHub, etc.)
4. Configure OAuth credentials

**No code changes needed!** Clerk UI automatically shows enabled social logins.

### Session Management

#### Clerk handles sessions automatically:

- Creates session on sign in
- Issues JWT token
- Refreshes token automatically
- Revokes session on sign out

#### Get session info:

```go
claims, _ := clerk.SessionClaimsFromContext(r.Context())

userID := claims.Subject           // Clerk user ID
email := claims.Email              // User email
sessionID := claims.SessionID      // Session ID
```text

### Webhooks (Advanced)

#### Sync user data automatically:

```go
// Clerk sends webhooks when users are created/updated/deleted
func webhookHandler(w http.ResponseWriter, r *http.Request) {
    // Verify webhook signature
    payload, err := clerkhttp.VerifyWebhook(r)
    if err != nil {
        http.Error(w, "Invalid webhook", http.StatusBadRequest)
        return
    }

    // Handle event
    switch payload.Type {
    case "user.created":
        // Create profile in database
        createProfile(payload.Data.ID, payload.Data.Email)
    case "user.updated":
        // Update profile
        updateProfile(payload.Data.ID, payload.Data.Email)
    case "user.deleted":
        // Delete profile
        deleteProfile(payload.Data.ID)
    }

    w.WriteHeader(http.StatusOK)
}
```text

### Testing Authentication Locally

#### 1. Run your server:

```bash
go run main.go
```text

#### 2. Visit sign-in page:

```text
http://localhost:8080/sign-in
```text

#### 3. Create test account

- Use your email
- Or use social login

#### 4. Verify authentication:

- Check protected routes work
- Check user profile created in database
- Test sign out

### Understanding JWTs

**JWT (JSON Web Token)** = Secure way to transmit user info.

#### Structure:

```text
header.payload.signature

eyJhbGc...   .   eyJzdWI...   .   SflKxw...
  (Header)       (Claims)        (Signature)
```text

#### Claims (payload) contains:

```json
{
  "sub": "user_123abc",      // User ID
  "email": "user@example.com",
  "session_id": "sess_456def",
  "exp": 1704067200          // Expiration timestamp
}
```text

**Clerk signs tokens** so you know they're authentic.

### Security Best Practices

#### 1. Always verify tokens:

```go
// Clerk SDK does this automatically
claims, ok := clerk.SessionClaimsFromContext(r.Context())
if !ok {
    // Token invalid or missing
    return
}
```text

#### 2. Use HTTPS in production:

```text
// Tokens sent over secure connection
https://yourdomain.com
```text

#### 3. Don't store sensitive data in JWT:

```text
❌ Bad: Store credit card in JWT
✅ Good: Store user ID, look up data from database
```text

#### 4. Set short token expiration:

- Clerk defaults: 1 hour
- Automatically refreshed
- Limits damage if token stolen

### 🌍 Where You'll See This

#### Authentication Services:

- **Clerk** (what we're using)
- **Auth0** (enterprise-focused)
- **Firebase Auth** (Google's solution)
- **Supabase Auth** (open source)
- **AWS Cognito** (AWS ecosystem)
- **Okta** (enterprise)

**All serious applications** use authentication services, not custom-built auth.

#### JWT used by:

- Most modern web applications
- Mobile apps (storing token locally)
- Microservices (service-to-service auth)

### 🔗 Documentation & Resources

#### Official Documentation:

- [Clerk Documentation](https://clerk.com/docs) - Complete guide
- [Clerk Go SDK](https://github.com/clerk/clerk-sdk-go) - Official Go library
- [Clerk Quickstart](https://clerk.com/docs/quickstarts/go) - Getting started

#### Installation:

```bash
go get github.com/clerk/clerk-sdk-go/v2
```text

#### Clerk Dashboard:

- [dashboard.clerk.com](https://dashboard.clerk.com/) - Manage users, configure settings

#### Learning Resources:

- [Authentication Basics](https://auth0.com/intro-to-iam/what-is-authentication) - Auth concepts
- [JWT Explained](https://jwt.io/introduction) - Understanding JWTs
- [OAuth 2.0 Simplified](https://aaronparecki.com/oauth-2-simplified/) - Social login concepts

#### Security Resources:

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Why Not to Roll Your Own Auth](https://www.youtube.com/watch?v=eWQ2hkZEPJw) - Video explanation

### ✅ Practice Exercises

#### Exercise 1: Set Up Clerk Account (20 minutes)

1. Create free Clerk account at clerk.com
2. Create new application
3. Copy publishable and secret keys
4. Store in .env file
5. Install Go SDK

#### Exercise 2: Add Sign In (1 hour)

1. Create sign-in page using Clerk component
2. Add sign-in button to home page
3. Test signing up with your email
4. Verify user appears in Clerk dashboard
5. Test signing out

#### Exercise 3: Protect Routes (1 hour)

1. Create authentication middleware
2. Protect `/dashboard` route
3. Test accessing without signing in (should redirect)
4. Sign in and access dashboard (should work)
5. Display user info on dashboard

#### Exercise 4: User Profiles (1.5 hours)

1. Create database migration for profiles table
2. Write sqlc queries for profiles
3. In dashboard handler, get or create profile
4. Link Clerk user ID to database profile
5. Display profile info on page

#### Exercise 5: Social Logins (30 minutes)

1. Enable Google login in Clerk dashboard
2. Configure OAuth credentials
3. Test signing in with Google
4. Verify profile created in database
5. Test with another social provider (GitHub)

#### Exercise 6: Session Management (45 minutes)

1. Display current session info in UI
2. Show user email and ID
3. Add "Sign Out" button
4. Test that sign out works
5. Verify protected routes inaccessible after sign out

---

## Phase 10: litestream Backups

### 🧠 What You'll Learn

How to implement continuous backups for your SQLite database to prevent data loss.

### Why Backups Are Critical

#### Disasters Happen:

- 💥 Server crashes
- 🔥 Data center fires
- 🐛 Bugs that corrupt data
- 👤 Accidental deletions
- 💻 Hard drive failures
- 🔒 Ransomware attacks

#### Without Backups:

```text
Database corrupted → All client data lost → Business destroyed
```text

#### With Backups:

```text
Database corrupted → Restore from backup → Back online in minutes
```text

### The SQLite Backup Challenge

#### Problem with SQLite:

- Single file database
- If file corrupted = all data lost
- Need continuous backups, not just daily

#### Traditional Database Approach:

- PostgreSQL: Built-in replication
- MySQL: Binary logs
- MongoDB: Replica sets

**SQLite Solution:** **litestream**

### What is litestream?

**litestream** continuously streams SQLite changes to cloud storage.

#### How it works:

```text
Your App writes to database.db
            ↓
litestream watches for changes
            ↓
Changes streamed to S3/B2/Azure/GCS
            ↓
Restore from any point in time
```text

#### Features:

- ✅ Continuous replication (not periodic)
- ✅ Point-in-time recovery
- ✅ Streams to S3-compatible storage
- ✅ Minimal data loss (seconds behind)
- ✅ Automatic restoration on startup
- ✅ Minimal performance impact

### 🤔 Why We Chose litestream v0.3.x

See [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md#9-backupreplication-litestream-v03x) for full comparison.

#### Critical for Production SQLite:

- SQLite + litestream = Production ready
- Without litestream = Too risky

#### Why v0.3.x:

- Latest stable release
- Important bug fixes
- Production-tested
- Good documentation

#### Cost:

- S3: ~$1-5/month for small database
- Backblaze B2: Even cheaper (~$0.50-2/month)
- Essential insurance for client data

### Storage Options

#### S3-Compatible Services:

| Service | Cost | Best For |
|---------|------|----------|
| **AWS S3** | $0.023/GB/month | Enterprise, AWS users |
| **Backblaze B2** | $0.005/GB/month | Budget-conscious (**Recommended**) |
| **Cloudflare R2** | $0.015/GB/month | Zero egress fees |
| **DigitalOcean Spaces** | $5/month (250GB) | DO users |

**Recommendation:** **Backblaze B2** (cheapest, reliable)

### Installing litestream

#### Linux/macOS:

```bash
# Download and install
wget https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz
tar -xzf litestream-v0.3.13-linux-amd64.tar.gz
sudo mv litestream /usr/local/bin/
```text

#### Verify:

```bash
litestream version
# Should show: v0.3.13 (or current v0.3.x)
```text

#### macOS via Homebrew:

```bash
brew install litestream
```text

### Setting Up Backblaze B2

#### 1. Create B2 Account:

- Visit [backblaze.com/b2](https://www.backblaze.com/b2/cloud-storage.html)
- Sign up (free 10GB)

#### 2. Create Bucket:

- Name: `myapp-database-backups`
- Private (not public)
- Region: Choose closest to your server

#### 3. Create Application Key:

- Bucket dashboard → App Keys
- Copy:
  - Key ID: `005abc...`
  - Application Key: `K005xyz...`
  - Endpoint: `s3.us-west-000.backblazeb2.com`

### Configuring litestream

#### Create config file `litestream.yml`:

```yaml
dbs:
  - path: /path/to/database.db
    replicas:
      - type: s3
        bucket: myapp-database-backups
        path: database
        endpoint: https://s3.us-west-000.backblazeb2.com
        access-key-id: ${LITESTREAM_ACCESS_KEY_ID}
        secret-access-key: ${LITESTREAM_SECRET_ACCESS_KEY}
```text

#### Environment variables:

```bash
# .env file
LITESTREAM_ACCESS_KEY_ID=005abc...
LITESTREAM_SECRET_ACCESS_KEY=K005xyz...
```text

### Running litestream

#### Replicate (backup):

```bash
litestream replicate -config litestream.yml
```text

Output:

```text
time=2024-01-15T10:30:00Z level=INFO msg=litestream version=v0.3.13
time=2024-01-15T10:30:00Z level=INFO msg="initialized db" path=/path/to/database.db
time=2024-01-15T10:30:01Z level=INFO msg="replicating to" name=s3
```text

#### Check status:

```bash
litestream dbs -config litestream.yml
```text

### Restoring from Backup

#### Restore to point in time:

```bash
# Restore latest
litestream restore -config litestream.yml /path/to/database.db

# Restore to specific time
litestream restore -config litestream.yml -timestamp 2024-01-15T10:00:00Z /path/to/database.db
```text

#### Test restore regularly!

```bash
# Test restore to different file
litestream restore -config litestream.yml ./test-restore.db

# Verify data
sqlite3 test-restore.db "SELECT COUNT(*) FROM businesses;"
```text

### Production Deployment with litestream

#### Option 1: Run alongside app (Docker Compose):

```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    volumes:
      - ./data:/data
    environment:
      - DATABASE_PATH=/data/database.db

  litestream:
    image: litestream/litestream:0.3
    volumes:
      - ./data:/data
      - ./litestream.yml:/etc/litestream.yml
    environment:
      - LITESTREAM_ACCESS_KEY_ID=${LITESTREAM_ACCESS_KEY_ID}
      - LITESTREAM_SECRET_ACCESS_KEY=${LITESTREAM_SECRET_ACCESS_KEY}
    command: replicate -config /etc/litestream.yml
```text

#### Option 2: Single container with supervisor:

```dockerfile
FROM golang:1.25 AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y wget supervisor
RUN wget https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz
RUN tar -xzf litestream-v0.3.13-linux-amd64.tar.gz && mv litestream /usr/local/bin/

COPY --from=builder /app/main /app/main
COPY litestream.yml /etc/litestream.yml
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord"]
```text

#### supervisord.conf:

```ini
[supervisord]
nodaemon=true

[program:litestream]
command=/usr/local/bin/litestream replicate -config /etc/litestream.yml
autorestart=true

[program:app]
command=/app/main
autorestart=true
```text

### Automatic Restore on Startup

#### Script to restore if database missing:

```bash
#!/bin/bash
# startup.sh

if [ ! -f "/data/database.db" ]; then
    echo "Database not found, restoring from litestream..."
    litestream restore -config /etc/litestream.yml /data/database.db
fi

# Run migrations
goose -dir /app/migrations sqlite3 /data/database.db up

# Start litestream in background
litestream replicate -config /etc/litestream.yml &

# Start app
/app/main
```text

### Monitoring Backups

#### Check replication lag:

```bash
litestream dbs -config litestream.yml
```text

Output:

```text
path                     replica  generation  lag    size
/data/database.db        s3       abc123      2.1s   4.2MB
```text

**Lag should be < 10 seconds** for healthy replication.

**Set up alerts** (pseudo-code):

```go
// Check lag every minute
lag := getLitestreamLag()
if lag > time.Minute {
    sendAlert("litestream lag exceeds 1 minute!")
}
```text

### Disaster Recovery Plan

#### 1. Regular Testing:

- Test restore weekly
- Verify data integrity
- Time how long restore takes

#### 2. Document Process:

```markdown
## Emergency Restore Procedure

1. Stop application
2. Run: litestream restore -config litestream.yml /data/database.db
3. Verify: sqlite3 /data/database.db "SELECT COUNT(*) FROM businesses;"
4. Start application
5. Check logs for errors
```text

#### 3. Keep config backed up:

- Store `litestream.yml` in version control
- Backup environment variables securely (1Password, AWS Secrets Manager)

### 🌍 Where You'll See This

#### Backup Strategies:

- **PostgreSQL**: Continuous archiving (WAL), pg_dump
- **MySQL**: Binary logs, mysqldump
- **MongoDB**: Replica sets, mongodump
- **SQLite**: litestream (or periodic file copies)

**Point-in-time recovery** is standard for production databases.

#### Companies using litestream:

- Many startups running SQLite in production
- Side projects that grew
- Edge computing applications
- Cost-conscious SaaS products

### 🔗 Documentation & Resources

#### Official Documentation:

- [litestream.io](https://litestream.io/) - Official site
- [litestream Documentation](https://litestream.io/reference/) - Complete reference
- [litestream GitHub](https://github.com/benbjohnson/litestream) - Source code

#### Installation:

- [Install Guide](https://litestream.io/install/) - All platforms

#### Guides:

- [Getting Started](https://litestream.io/getting-started/) - First backup
- [Kubernetes Deployment](https://litestream.io/guides/kubernetes/) - K8s setup
- [Docker Deployment](https://litestream.io/guides/docker/) - Docker setup

#### Storage Providers:

- [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html) - Recommended
- [AWS S3](https://aws.amazon.com/s3/) - Enterprise
- [Cloudflare R2](https://www.cloudflare.com/products/r2/) - Zero egress

#### Disaster Recovery:

- [Backup Best Practices](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/) - 3-2-1 rule
- [Database Recovery Planning](https://www.postgresql.org/docs/current/backup.html) - Concepts apply to all databases

### ✅ Practice Exercises

#### Exercise 1: Install litestream (20 minutes)

1. Install litestream locally
2. Verify version: `litestream version`
3. Create config file
4. Set up environment variables

#### Exercise 2: Set Up B2 Storage (30 minutes)

1. Create Backblaze B2 account
2. Create bucket for backups
3. Create application key
4. Configure in litestream.yml
5. Test connection

#### Exercise 3: First Backup (45 minutes)

1. Create test SQLite database with data
2. Configure litestream for that database
3. Run `litestream replicate`
4. Verify backup in B2 dashboard
5. Check replication lag

#### Exercise 4: Test Restore (1 hour)

1. Stop litestream
2. Delete local database file (scary!)
3. Restore from backup
4. Verify all data intact
5. Document restore time

#### Exercise 5: Point-in-Time Restore (45 minutes)

1. Note current time
2. Add data to database
3. Note time again
4. Add more data
5. Restore to middle timestamp
6. Verify only first data present

#### Exercise 6: Production Simulation (1.5 hours)

1. Set up Docker Compose with app + litestream
2. Run migrations
3. Add data through app
4. Verify data backed up
5. Simulate disaster (delete database)
6. Restore and verify app works

---

## Phase 11: Deployment

### 🧠 What You'll Learn

How to deploy your Go website to production with a custom domain.

### What is Deployment?

**Deployment** = Making your website accessible on the internet.

#### Development (your laptop):

```text
http://localhost:8080
Only you can access
```text

#### Production (deployed):

```text
https://yourbusiness.com
Anyone can access
```text

### Deployment Options Explained

#### Three Main Approaches:

**1. PaaS (Platform as a Service)** ← We'll use this

- Simple deployment (git push style)
- Platform handles servers
- Examples: Fly.io, Railway, Heroku
- ✅ Best for learning

#### 2. VPS (Virtual Private Server)

- You manage Linux server
- Install everything manually
- Examples: DigitalOcean Droplets, Linode
- ❌ More complex for beginners

#### 3. Serverless

- Code runs on-demand
- No persistent server
- Examples: AWS Lambda, Vercel, Cloudflare Workers
- ❌ Not ideal for SQLite (needs persistent filesystem)

### 🤔 Why We Chose Fly.io / Railway

See [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md#10-hosting-platform-flyio-or-railway) for full comparison.

#### Both are excellent choices:

#### Fly.io:

- More mature
- Better documentation
- Global edge network
- Great for SQLite (persistent volumes)

#### Railway:

- Simpler interface
- Beautiful dashboard
- Great for beginners
- Easy environment variables

**Choose either!** This tutorial covers both.

### Deploying to Fly.io

#### Step 1: Install flyctl

#### macOS:

```bash
brew install flyctl
```text

#### Linux:

```bash
curl -L https://fly.io/install.sh | sh
```text

#### Verify:

```bash
flyctl version
```text

#### Step 2: Sign Up

```bash
flyctl auth signup
```text

Follow browser to create account (free tier available).

#### Step 3: Initialize App

```bash
cd your-project
flyctl launch
```text

Interactive prompts:

```text
? App Name: mybusiness-website
? Region: Choose closest to users
? Set up PostgreSQL: No (we're using SQLite)
? Set up Redis: No
```text

Creates `fly.toml` configuration file.

#### Step 4: Configure fly.toml

#### Edit `fly.toml`:

```toml
app = "mybusiness-website"

[build]
  builder = "paketobuildpacks/builder:base"

[env]
  PORT = "8080"
  DATABASE_PATH = "/data/database.db"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true

[[mounts]]
  source = "data"
  destination = "/data"
```text

**Why mounts?** SQLite needs persistent disk storage.

#### Step 5: Create Volume

```bash
flyctl volumes create data --size 1 --region <your-region>
```text

This creates persistent storage for your database.

#### Step 6: Set Environment Variables

```bash
flyctl secrets set CLERK_SECRET_KEY=sk_test_xxxxx
flyctl secrets set LITESTREAM_ACCESS_KEY_ID=xxxxx
flyctl secrets set LITESTREAM_SECRET_ACCESS_KEY=xxxxx
```text

#### Step 7: Deploy!

```bash
flyctl deploy
```text

Output:

```text
==> Building image
==> Pushing image to registry
==> Deploying mybusiness-website
 ✓ Deployment successful

Visit your app at: https://mybusiness-website.fly.dev
```text

#### Step 8: Check Logs

```bash
flyctl logs
```text

#### Step 9: Connect Custom Domain

#### Add domain:

```bash
flyctl certs create yourbusiness.com
flyctl certs create www.yourbusiness.com
```text

#### Configure DNS (in your registrar):

```text
A    @      66.241.125.115  (Fly.io's IP, shown after certs create)
CNAME www    yourbusiness.com
```text

Wait 5-60 minutes for DNS propagation.

#### Verify:

```bash
flyctl certs check yourbusiness.com
```text

### Deploying to Railway

#### Step 1: Sign Up

Visit [railway.app](https://railway.app/) and sign up (GitHub login recommended).

#### Step 2: Install Railway CLI

```bash
npm install -g @railway/cli
```text

Or use dashboard (no CLI needed).

#### Step 3: Initialize Project

```bash
railway login
railway init
```text

Choose "Create new project".

#### Step 4: Link to Git

#### Option A: Connect GitHub Repo

1. Push code to GitHub
2. In Railway dashboard, "New Project"
3. "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Go and deploys!

#### Option B: Deploy from CLI

```bash
railway up
```text

#### Step 5: Add Volume (for SQLite)

Railway dashboard:

1. Select your service
2. "Data" tab
3. "Add Volume"
4. Mount point: `/data`

#### Step 6: Set Environment Variables

Railway dashboard:

1. "Variables" tab
2. Add each variable:
   - `CLERK_SECRET_KEY=sk_test_xxxxx`
   - `DATABASE_PATH=/data/database.db`
   - `LITESTREAM_ACCESS_KEY_ID=xxxxx`
   - `LITESTREAM_SECRET_ACCESS_KEY=xxxxx`

#### Step 7: Configure Domain

Railway dashboard:

1. "Settings" tab
2. "Domains"
3. "Custom Domain"
4. Add `yourbusiness.com`
5. Configure DNS as shown

#### DNS records:

```text
CNAME @   <your-app>.up.railway.app
CNAME www <your-app>.up.railway.app
```text

#### Step 8: Deploy

Railway auto-deploys on git push!

```bash
git push origin main
```text

Watch build logs in dashboard.

### Deployment Checklist

#### Before deploying:

- [ ] All tests pass locally
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] litestream configured
- [ ] Health check endpoint works
- [ ] HTTPS will be forced

#### After deploying:

- [ ] Site loads at URL
- [ ] Database migrations ran
- [ ] litestream backing up
- [ ] Custom domain connected
- [ ] SSL certificate active (HTTPS)
- [ ] Can sign in with Clerk
- [ ] All features work

### Health Check Endpoint

#### Add to your app:

```go
func healthHandler(w http.ResponseWriter, r *http.Request) {
    // Check database
    err := db.Ping()
    if err != nil {
        w.WriteHeader(http.StatusServiceUnavailable)
        fmt.Fprintf(w, "Database unavailable: %v", err)
        return
    }

    // Check litestream
    // (check lag, etc.)

    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, "OK")
}

// Register route
http.HandleFunc("/health", healthHandler)
```text

#### Test:

```bash
curl https://yourbusiness.com/health
# Should return: OK
```text

### Rolling Back Deployments

#### Fly.io:

```bash
# List releases
flyctl releases

# Rollback to previous
flyctl releases rollback
```text

#### Railway:

- Dashboard → Deployments
- Click previous deployment
- "Redeploy"

### Monitoring Your Site

#### Uptime Monitoring (Free Services):

- [UptimeRobot](https://uptimerobot.com/) - Checks site every 5 min
- [Pingdom](https://www.pingdom.com/) - Free tier available
- [HealthChecks.io](https://healthchecks.io/) - Cron job monitoring

#### Setup:

1. Create account
2. Add your URL
3. Configure alerts (email/SMS)
4. Get notified if site goes down

#### Log Management:

```bash
# Fly.io
flyctl logs --app mybusiness-website

# Railway
railway logs
```text

### Scaling (When Needed)

#### Vertical Scaling (Bigger server):

#### Fly.io:

```bash
flyctl scale vm shared-cpu-2x --memory 512
```text

#### Railway:

- Dashboard → Settings → Resources
- Adjust CPU/RAM

#### Horizontal Scaling (More servers):

#### Fly.io:

```bash
flyctl scale count 2
```text

**Note:** SQLite doesn't support multiple writers. If you need horizontal scaling:

- Switch to PostgreSQL
- Or use SQLite read replicas

### Cost Estimation

#### Small Business Website:

| Service | Cost/Month |
|---------|------------|
| Fly.io/Railway | $0-5 (free tier sufficient initially) |
| Domain name | ~$1 (amortized over year) |
| Backblaze B2 | $0.50-2 |
| **Total** | **~$1.50-7/month** |

**Can charge clients:** $20-50/month for hosting (includes profit margin).

### 🌍 Where You'll See This

#### PaaS Platforms:

- Heroku (removed free tier)
- Render
- Fly.io
- Railway
- Google Cloud Run
- AWS Elastic Beanstalk

#### Used for:

- Startups (move fast)
- Side projects
- Client websites
- MVPs
- Small businesses

### 🔗 Documentation & Resources

#### Fly.io:

- [fly.io](https://fly.io/) - Official site
- [Fly.io Documentation](https://fly.io/docs/) - Complete docs
- [Go on Fly.io](https://fly.io/docs/languages-and-frameworks/golang/) - Go deployment guide
- [flyctl CLI Reference](https://fly.io/docs/flyctl/) - Commands

#### Railway:

- [railway.app](https://railway.app/) - Official site
- [Railway Documentation](https://docs.railway.app/) - Complete docs
- [Railway CLI](https://docs.railway.app/develop/cli) - CLI reference

#### Domain & DNS:

- [DNS Propagation Checker](https://www.whatsmydns.net/) - Check DNS changes
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Test HTTPS configuration

#### Monitoring:

- [UptimeRobot](https://uptimerobot.com/) - Free uptime monitoring
- [Better Stack](https://betterstack.com/) - Uptime + logs

### ✅ Practice Exercises

#### Exercise 1: Choose Platform (15 minutes)

1. Review Fly.io vs Railway documentation
2. Compare pricing
3. Decide which to use
4. Create account
5. Install CLI

#### Exercise 2: First Deployment (1.5 hours)

1. Prepare app for deployment
2. Add health check endpoint
3. Test locally one more time
4. Deploy to chosen platform
5. Verify site loads

#### Exercise 3: Environment Variables (30 minutes)

1. List all required env vars
2. Set in platform dashboard/CLI
3. Verify app can access them
4. Test Clerk authentication works
5. Check database connection

#### Exercise 4: Database Setup (1 hour)

1. Create persistent volume
2. Run migrations on production
3. Verify tables created
4. Test creating data through app
5. Verify litestream backing up

#### Exercise 5: Custom Domain (1 hour)

1. Add your domain to platform
2. Configure DNS records
3. Wait for propagation (check with whatsmydns.net)
4. Verify HTTPS certificate
5. Test site at custom domain

#### Exercise 6: Monitoring Setup (45 minutes)

1. Sign up for UptimeRobot
2. Add your site URL
3. Configure alerts
4. Test by stopping app (simulate outage)
5. Verify you receive alert

#### Exercise 7: Disaster Recovery Drill (Group Activity)

1. Simulate database corruption
2. Practice restore procedure
3. Time how long it takes
4. Document any issues
5. Update runbook

---

## Phase 12: Client Service Workflow

### 🧠 What You'll Learn

How to work with real clients to build and deliver professional websites as part of the SBDC partnership.

### The SBDC Partnership Model

**Small Business Development Center (SBDC)** helps small businesses succeed.

#### Your Club's Role:

- Build websites for small businesses
- Charge affordable rates
- Fundraise for club activities
- Gain real-world experience

#### Benefits:

- 💰 Club fundraising
- 📚 Real project experience
- 🤝 Community impact
- 💼 Portfolio pieces
- 🎓 Business skills

### Client Service Lifecycle

```text
1. Lead Generation (SBDC referrals)
   ↓
2. Discovery Call (understand needs)
   ↓
3. Proposal & Quote (scope + price)
   ↓
4. Contract & Deposit (legal agreement)
   ↓
5. Requirements Gathering (detailed needs)
   ↓
6. Design & Development (build site)
   ↓
7. Review & Revisions (client feedback)
   ↓
8. Launch & Training (go live + teach client)
   ↓
9. Ongoing Support (maintenance, updates)
```text

### Phase 1: Lead Generation

#### SBDC Referrals:

- SBDC Director refers small businesses
- Pre-qualified (legitimate businesses)
- Often have budget for services

#### Other Sources:

- Word of mouth
- Local business networking
- Chamber of Commerce
- Social media

#### Initial Contact Template:

```text
Subject: Website Development Services - [Business Name]

Hi [Contact Name],

[SBDC Director Name] connected us regarding website services for [Business Name].

Our club specializes in building professional, modern websites for small businesses at affordable rates. We'd love to learn about your needs and see if we can help.

Would you be available for a 20-minute call this week?

Best regards,
[Your Name]
[Club Name] Website Development Team
[Contact Info]
```text

### Phase 2: Discovery Call

#### Goals:

- Understand business
- Identify needs
- Set expectations
- Build rapport

#### Questions to Ask:

#### About Their Business:

1. What does your business do?
2. Who are your customers?
3. What makes you different from competitors?
4. What are your business goals?

#### About Website Needs:

1. Do you have a website currently?
2. What do you like/dislike about it?
3. What features do you need?
   - Contact form?
   - Service listings?
   - Photo gallery?
   - Online booking?
   - E-commerce?
4. Do you have content (text, photos, logo)?
5. Do you need help with content?

#### About Timeline & Budget:

1. When do you need this launched?
2. What's your budget range?
3. Do you need ongoing maintenance?

**Take Notes:**
Use a template document to capture all details.

### Phase 3: Proposal & Quote

#### Proposal Components:

#### 1. Executive Summary

```markdown
## Website Development Proposal for [Business Name]

We propose building a modern, professional website for [Business Name] that will:
- Showcase your services to potential customers
- Provide easy contact methods
- Establish credibility and trust
- Be mobile-friendly and fast
```text

#### 2. Scope of Work

```markdown
## Deliverables

### Included:
- ✅ 5-page website (Home, About, Services, Gallery, Contact)
- ✅ Mobile-responsive design
- ✅ Contact form
- ✅ Photo gallery (up to 20 photos)
- ✅ Service listings
- ✅ Google Maps integration
- ✅ SSL certificate (HTTPS)
- ✅ Basic SEO setup
- ✅ 1 round of revisions

### Not Included:
- ❌ E-commerce (can be added later)
- ❌ Blog (can be added later)
- ❌ Content writing (you provide text)
- ❌ Professional photography
```text

#### 3. Timeline

```markdown
## Project Timeline

- Week 1: Requirements gathering, design mockups
- Week 2-3: Development
- Week 4: Review and revisions
- Week 5: Launch and training

**Total: 5 weeks from contract signing**
```text

#### 4. Pricing

```markdown
## Investment

**Initial Build:** $800
- One-time website development

**Hosting & Maintenance:** $25/month
- Domain name
- Secure hosting
- Daily backups
- Software updates
- Emergency support
- Minor content updates (1 hour/month)

#### Payment Schedule:
- 50% ($400) deposit to begin
- 50% ($400) upon launch
```text

#### Pricing Considerations:

- **Your costs:** ~$7/month (domain + hosting + backups)
- **Your time:** 20-30 hours for first site
- **Club profit:** $18/month ongoing, $800 initial
- **Value to client:** Professional site worth $2000+ from agency

#### 5. Next Steps

```markdown
## Getting Started

If this proposal looks good:
1. Reply with approval
2. We'll send contract
3. Pay deposit via [payment method]
4. We'll schedule kickoff meeting

Questions? Let's schedule a call.
```text

### Phase 4: Contract & Deposit

#### Simple Contract Template:

```markdown
# Website Development Agreement

**Date:** [Date]
**Client:** [Business Name]
**Developer:** [Your Club Name]

## Services
[Paste scope of work from proposal]

## Timeline
[Paste timeline from proposal]

## Payment Terms
- 50% deposit: $400 (due before work begins)
- Final payment: $400 (due upon completion)
- Monthly hosting: $25/month (first payment due at launch)

## Client Responsibilities
- Provide content (text, images, logo) within 1 week
- Provide feedback within 3 business days
- Pay invoices within 7 days

## Developer Responsibilities
- Build website according to specifications
- Complete within agreed timeline
- Provide training on how to use website
- Provide ongoing support as specified

## Ownership
Client owns all content. Developer retains right to display in portfolio.

## Cancellation
Either party may cancel with 7 days written notice. Deposit is non-refundable if work has begun.

#### Signatures:

_________________________    _________________________
[Client Name], [Business]    [Your Name], [Club Name]

Date: ______________          Date: ______________
```text

**⚠️ Important:** Have an adult (teacher/advisor) review contracts!

#### Payment Methods:

- Venmo/CashApp (for small amounts)
- Check
- PayPal
- Square (credit cards)

### Phase 5: Requirements Gathering

#### Kickoff Meeting Agenda:

1. **Review proposal** (make sure everyone aligned)
2. **Collect assets:**
   - Logo (PNG/SVG, high resolution)
   - Photos (high quality, relevant)
   - Text content for each page
   - Brand colors (if they have them)
   - Contact info (phone, email, address, social media)

3. **Design preferences:**
   - Show example websites
   - "What style do you like?"
   - Colors, fonts, vibe

4. **Technical details:**
   - Do they have domain? (if yes, get access)
   - Need email? (e.g., <info@business.com>)
   - Any integrations? (booking system, etc.)

#### Content Questionnaire:

```markdown
# Website Content Questionnaire

## Home Page
1. Headline (main message):
2. Subheadline:
3. Brief description of business (2-3 sentences):
4. Call to action (e.g., "Call Today", "Get a Quote"):

## About Page
1. Your story (how/why started):
2. Years in business:
3. Team members (names, roles, photos):
4. What makes you different:

## Services Page
For each service:
1. Service name:
2. Description:
3. Price (if you show prices):
4. Photo:

## Contact Page
1. Phone:
2. Email:
3. Address:
4. Hours:
5. Social media links:
```text

### Phase 6: Design & Development

#### Workflow:

#### Week 1: Design Mockup

1. Create simple mockup (Figma, or even Canva)
2. Show client for approval
3. Revise if needed
4. Get written approval before coding

#### Week 2-3: Development

1. Set up project
2. Build pages with templ + Tailwind
3. Add database (if needed for contact form)
4. Integrate Clerk (if user accounts needed)
5. Test on mobile devices
6. Deploy to staging URL

#### Communication:

- Send weekly updates
- Share staging URL for progress checks
- Respond to questions within 24 hours

#### Development Checklist:

- [ ] All pages created
- [ ] Mobile responsive
- [ ] Contact form works
- [ ] Images optimized
- [ ] Fast load times
- [ ] HTTPS enabled
- [ ] SEO basics (titles, descriptions)
- [ ] Google Analytics added (if requested)

### Phase 7: Review & Revisions

#### Review Process:

1. Send staging URL to client
2. Ask for comprehensive feedback
3. Schedule review call
4. Document all requested changes
5. Prioritize (must-have vs nice-to-have)
6. Make revisions
7. Second review
8. Get final approval

#### Managing Scope Creep:

#### In Scope:

- Fixing bugs
- Minor text changes
- Reasonable adjustments

#### Out of Scope (additional fee):

- "Can we add a blog?"
- "Can we add e-commerce?"
- "Can we add 10 more pages?"

#### Response:

```text
"That's a great idea! That would be outside our original scope, but we can absolutely add it. Let me send you a quote for that additional work."
```text

### Phase 8: Launch & Training

#### Pre-Launch Checklist:

- [ ] Final client approval
- [ ] Domain connected
- [ ] SSL certificate active
- [ ] All content final
- [ ] Contact form tested
- [ ] Mobile tested
- [ ] Desktop tested
- [ ] Google Analytics live
- [ ] Client received final payment invoice

#### Launch Process:

1. Schedule launch time
2. Make site live
3. Test thoroughly
4. Announce launch (social media, email)

#### Training Session (1 hour):

1. How to update content (if applicable)
2. How to check contact form submissions
3. Explaining hosting/maintenance
4. How to request support
5. Answering questions

#### Launch Deliverables:

- Website live at domain
- Login credentials (if needed)
- Source code repository access (GitHub)
- Training video recording
- Support contact info

### Phase 9: Ongoing Support

#### Monthly Maintenance Includes:

- Software updates
- Security monitoring
- Backup verification
- Minor content updates (1 hour)
- Emergency support

#### Monthly Check-in:

```text
Subject: [Business Name] Website - Monthly Check-in

Hi [Name],

Quick monthly update:
✅ Website uptime: 99.9%
✅ Backups running smoothly
✅ Security updates applied
✅ No issues reported

Need any changes this month? You have 1 hour of content updates included.

Best,
[Your Name]
```text

#### Handling Support Requests:

- Respond within 24 hours (weekdays)
- For emergencies (site down): 2 hours
- Set expectations clearly
- Document all changes

### Building Your Portfolio

#### After each project:

1. Take screenshots
2. Write case study:
   - Problem
   - Solution
   - Results
3. Get testimonial from client
4. Add to club website

#### Portfolio Case Study Template:

```markdown
# [Business Name] Website

**Client:** [Business Name]
**Industry:** [e.g., Catering, Plumbing, Salon]
**Project Duration:** 5 weeks

## Challenge
[Business Name] needed a modern website to reach new customers and showcase their services.

## Solution
We built a 5-page responsive website featuring:
- Service listings
- Photo gallery
- Contact form
- Mobile-friendly design

## Technologies
- Go 1.25
- templ templates
- Tailwind CSS
- SQLite database
- Deployed on Fly.io

## Results
- Professional online presence
- Increased inquiries by [X]%
- Mobile traffic increased

[Screenshot images]

**Client Testimonial:**
"[Quote from client]" - [Name, Business]
```text

### Testimonial Request Template

```text
Subject: Quick favor - website testimonial?

Hi [Name],

Now that your website has been live for a few weeks, I'd love to hear your thoughts!

Would you mind writing a brief testimonial about working with us? A few sentences about:
- What you were looking for
- How the process went
- How the website is helping your business

We'd love to feature it on our website to help other small businesses learn about our services.

Thanks so much!
[Your Name]
```text

### Scaling Your Service

#### As you complete more projects:

1. **Standardize:**
   - Template proposals
   - Template contracts
   - Reusable code components
   - Documented processes

2. **Raise Prices:**
   - Start: $800
   - After 3 projects: $1200
   - After 10 projects: $1500-2000

3. **Expand Services:**
   - E-commerce (+$500)
   - Blog setup (+$300)
   - SEO optimization (+$200/month)
   - Content writing (+$50/page)

4. **Team Roles:**
   - Project manager
   - Designer
   - Developer
   - Support

### 🌍 Where You'll See This

#### Web Development Agencies:

- Freelancers (1 person)
- Small agencies (2-10 people)
- Large agencies (10+ people)

#### Similar Service Models:

- WordPress sites ($1000-5000)
- Shopify stores ($2000-10000)
- Custom web apps ($5000+)

#### Your advantage:

- Lower overhead (student club)
- Local focus (SBDC partnership)
- Modern tech stack (faster, better sites)

### 🔗 Documentation & Resources

#### Business Resources:

- [SCORE](https://www.score.org/) - Free business mentoring
- [Small Business Administration](https://www.sba.gov/) - Government resources
- [Invoice Template](https://invoice-generator.com/) - Free invoicing

#### Project Management:

- [Trello](https://trello.com/) - Free project boards
- [Notion](https://notion.so/) - Docs and project management
- [Google Workspace](https://workspace.google.com/) - Shared documents

#### Design Tools:

- [Figma](https://figma.com/) - Free for students
- [Canva](https://canva.com/) - Simple graphics
- [Unsplash](https://unsplash.com/) - Free stock photos

#### Contracts & Legal:

- [AND CO](https://www.and.co/contract-templates) - Free contract templates
- [Docusign](https://www.docusign.com/) - Electronic signatures
- **Consult with adult advisor** for legal review

### ✅ Practice Exercises

#### Exercise 1: Create Templates (2 hours)

1. Customize proposal template for your club
2. Customize contract template
3. Create content questionnaire
4. Create pricing sheet
5. Get advisor approval

#### Exercise 2: Mock Discovery Call (Group Activity, 1 hour)

1. Pair up: one student = client, one = developer
2. Role-play discovery call
3. Take notes using questionnaire
4. Switch roles
5. Discuss what went well/poorly

#### Exercise 3: Write Proposal (1.5 hours)

1. Using mock discovery notes
2. Write complete proposal
3. Include scope, timeline, pricing
4. Get peer review
5. Revise based on feedback

#### Exercise 4: Portfolio Site for Club (Group Project)

1. Build website for your own club
2. Showcase services
3. Display past projects
4. Include contact form
5. Make it your best work (it's your marketing!)

#### Exercise 5: Client Simulation (Multi-Week Project)

1. Teacher/advisor plays client
2. Go through entire workflow:
   - Discovery call
   - Proposal
   - Contract
   - Development
   - Launch
   - Support
3. Document issues encountered
4. Create runbook for real clients

#### Exercise 6: SBDC Meeting Prep (Group Discussion)

1. Research SBDC Director's role
2. Prepare questions about partnership
3. Create presentation showing:
   - Your skills
   - Sample projects
   - Pricing
   - Timeline
4. Practice pitch

---

## Supporting Documentation

For detailed guides on specific topics, see:

- **[TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md)** - Complete technology comparison and reasoning
- **[QUICKSTART.md](./QUICKSTART.md)** - Fast reference guide for experienced students
- **[DOMAIN_REGISTRATION.md](./DOMAIN_REGISTRATION.md)** - Step-by-step domain purchase walkthrough
- **[ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)** - Tool installation guides for all platforms
- **[CLIENT_WORKFLOW.md](./CLIENT_WORKFLOW.md)** - Expanded client service procedures and templates
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed deployment guides for Fly.io and Railway
- **[RESOURCES.md](./RESOURCES.md)** - Curated learning resources and documentation links
- **[CLAUDE.md](./CLAUDE.md)** - Project conventions for AI-assisted development

---

## Video Recommendations

#### Web Development Fundamentals:

- [How the Internet Works - Code.org](https://www.youtube.com/watch?v=Dxcc6ycZ73M) (5 min)
- [HTTP Crash Course - Traversy Media](https://www.youtube.com/watch?v=iYM2zFP3Zn0) (30 min)

#### Go Programming:

- [Go Tutorial for Beginners - TechWorld with Nana](https://www.youtube.com/watch?v=yyUHQIec83I) (3.5 hours)
- [Building a Web App with Go - Matt Holiday](https://www.youtube.com/watch?v=SonwZ6MF5BE) (1 hour)

#### Databases:

- [SQL Explained in 100 Seconds - Fireship](https://www.youtube.com/watch?v=zsjvFFKOm3c) (2 min)
- [Database Design Course - freeCodeCamp](https://www.youtube.com/watch?v=ztHopE5Wnpc) (4 hours)

#### Deployment:

- [Deploying Web Apps - Fireship](https://www.youtube.com/watch?v=sw-rh4W7IkM) (6 min)

#### Client Work:

- [How to Talk to Clients - The Futur](https://www.youtube.com/watch?v=VZtJfHpzwKo) (10 min)
- [Pricing Your Services - The Futur](https://www.youtube.com/watch?v=RKXZ7t_RiOM) (12 min)

---

## Next Steps

### For Students Just Starting

1. Read [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) and install tools
2. Work through Phase 0-2 exercises (fundamentals and Go)
3. Build your first simple web server
4. Join weekly club meetings to get help

### For Students Ready to Build

1. Complete Phase 3-8 exercises (full stack fundamentals)
2. Build a personal project using the stack
3. Deploy to Fly.io or Railway
4. Add to your portfolio

### For Students Ready for Clients

1. Complete Phase 9-12 (production and client work)
2. Build club's portfolio website as team
3. Create proposal templates
4. Meet with SBDC Director
5. Take on first client project (with supervision)

---

## Getting Help

#### Stuck on something?

1. Check [RESOURCES.md](./RESOURCES.md) for documentation links
2. Search official documentation for the tool
3. Ask in club meeting or discussion forum
4. Reach out to instructor/advisor

#### Found a bug in this tutorial?

- Document what's not working
- Share with instructor
- Help improve the tutorial!

---

## Final Thoughts

You're learning skills that will:

- ✅ Help real businesses
- ✅ Earn money for your club
- ✅ Build your portfolio
- ✅ Prepare you for tech careers
- ✅ Make a difference in your community

The key is **understanding why** you're using each technology, not just following instructions. Ask questions, experiment, break things (on your development machine!), and learn from mistakes.

**Most importantly:** Have fun building! Web development is creative and rewarding.

Good luck! 🚀
