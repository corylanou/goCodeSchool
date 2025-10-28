# Technology Stack Decisions

## Overview

This document explains **why** we chose each technology for this full-stack website builder tutorial. Understanding these decisions will help you make informed choices for your own projects and client work.

## Core Decision-Making Principles

When choosing technologies for small business websites, we prioritize:

1. **Student Learning Value** - Will this skill be valuable in the job market?
2. **Production Readiness** - Can this handle real client projects?
3. **Simplicity** - Is it learnable within our timeline?
4. **Cost Effectiveness** - Can students and small businesses afford it?
5. **Reliability** - Is it stable and well-maintained?

---

## Complete Stack Comparison

| Component | Our Choice | Alternative 1 | Alternative 2 | Why We Chose |
|-----------|-----------|---------------|---------------|--------------|
| **Backend Language** | Go 1.25 | Node.js/Express | Python/Django | Fast, type-safe, single binary deployment, growing industry demand |
| **Templates** | templ | html/template | React/Next.js | Type-safe, Go-native, no JavaScript build complexity |
| **Component Library** | templui | Custom components | Tailwind UI | Pre-built templ components save time, professional quality |
| **CSS Framework** | Tailwind CSS | Bootstrap | Custom CSS | Modern utility-first approach, high job market value, flexible |
| **Database** | SQLite | PostgreSQL | MySQL | Zero config, single file, perfect scale for small business sites |
| **Migrations** | goose | golang-migrate | Atlas | Simple SQL-based, easy to understand, version control friendly |
| **ORM/Query Builder** | sqlc | GORM | Ent | Type-safe generated code, write real SQL (learn database skills) |
| **Authentication** | Clerk | Auth0 | Custom auth | Security by experts, beautiful UI, free tier, social logins included |
| **Backup/Replication** | litestream v0.3.x | Manual backups | Postgres replication | Real-time SQLite replication, critical for production, affordable |
| **Hosting** | Fly.io or Railway | Vercel/Netlify | AWS/DigitalOcean | Go-friendly, simple deployment, free tier, good SQLite support |
| **CSS Build** | Tailwind CLI | PostCSS | CDN | Simple, fast, no complex build process |
| **Version** | Go 1.25 | Go 1.23 | Go 1.24 | Latest stable, newest features and improvements |

---

## Detailed Technology Decisions

### 1. Backend Language: Go 1.25

#### Why Go?

#### Performance

- Compiled language (fast execution)
- Efficient memory usage
- Built-in concurrency with goroutines
- Perfect for web servers handling multiple requests

#### Developer Experience

- Type safety catches bugs at compile time
- Simple syntax (less to learn than Java or C++)
- Excellent standard library (http server built-in)
- Fast compilation
- Single binary deployment (no dependencies to install)

#### Job Market Value

- Growing demand in industry (especially for backend/infrastructure)
- Higher salaries than PHP or Python in many markets
- Used by major companies (Google, Uber, Netflix, Dropbox)

#### Project Fit

- Perfect for small business websites (fast, reliable)
- Easy deployment (copy one file to server)
- Great for students (clear errors, good learning language)

#### Alternatives Considered

#### Node.js (JavaScript/TypeScript)

- ✅ Large ecosystem (npm packages)
- ✅ Same language as frontend (if using React)
- ✅ Good for real-time features
- ❌ Slower runtime performance
- ❌ Callback complexity (though async/await helps)
- ❌ Need to manage node_modules (large, complex)
- ❌ More memory usage

#### Python (Django/Flask)

- ✅ Very beginner-friendly syntax
- ✅ Huge ecosystem
- ✅ Great for data science/AI integration
- ❌ Slower performance
- ❌ Need virtual environments (dependency management complexity)
- ❌ Type safety requires extra tooling (mypy)
- ❌ Deployment more complex (WSGI servers, etc.)

#### PHP

- ✅ Very common for small business sites
- ✅ Easy to find hosting
- ✅ WordPress ecosystem
- ❌ Older language with inconsistent design
- ❌ Lower job market value
- ❌ Declining in popularity

**Our Decision**: Go offers the best balance of performance, learning value, and production readiness for our students.

#### Why Version 1.25?

- Latest stable release (as of tutorial creation)
- Security patches and bug fixes
- New language features and improvements
- Shows students importance of staying current
- Long-term support from Go team

---

### 2. Templating: templ

#### Why templ?

#### Type Safety

- Components are Go functions
- Compile-time error checking
- Autocomplete in VS Code
- Refactoring support

#### No Build Complexity

- Integrates directly with Go
- No webpack, vite, or other build tools
- Just `templ generate` and `go build`

#### Performance

- Server-side rendering (SSR)
- Fast initial page loads
- No JavaScript needed for basic sites
- SEO-friendly (content immediately available)

#### Learning Value

- Teaches component-based thinking
- Understanding SSR vs CSR (client-side rendering)
- Go code, not new template syntax

#### Alternatives Considered

#### html/template (Go standard library)

- ✅ Built into Go (no dependencies)
- ✅ Simple for small projects
- ❌ Not type-safe (typos cause runtime errors)
- ❌ No component system
- ❌ Harder to refactor
- ❌ No autocomplete

#### React/Next.js

- ✅ Industry standard for complex web apps
- ✅ Huge ecosystem
- ✅ Great for highly interactive UIs
- ❌ Steep learning curve (need to learn JavaScript + React)
- ❌ Complex build tooling (webpack, babel, etc.)
- ❌ Not needed for most small business sites
- ❌ SEO requires SSR setup (Next.js)

#### HTMX + html/template

- ✅ Simple interactivity without JavaScript frameworks
- ✅ Server-side focus
- ✅ Small learning curve
- ❌ html/template not type-safe
- ❌ Less structured than component approach

**Our Decision**: templ provides type safety and modern component patterns while keeping the stack simple (Go-only).

---

### 3. Component Library: templui

#### Why templui?

#### Time Savings

- Pre-built UI components
- Professional design out of the box
- Focus on business logic, not styling

#### Consistency

- All components follow same design language
- Tailwind-based (consistent with our CSS choice)
- Accessible (proper HTML semantics)

#### Learning Professional Practices

- Real projects use component libraries
- Shows value of code reuse
- Design system principles

#### templ Integration

- Built specifically for templ
- Type-safe component props
- Go-native usage

#### Alternatives Considered

#### Build components from scratch

- ✅ Complete customization
- ✅ Learn CSS deeply
- ❌ Very time-consuming
- ❌ Easy to create accessibility issues
- ❌ Inconsistent design

#### Tailwind UI (official components)

- ✅ Beautiful, professional design
- ✅ Large component collection
- ❌ Costs $299 (though very good value)
- ❌ Requires adapting React/Vue components to templ
- ❌ Not designed for templ

#### DaisyUI (Tailwind component classes)

- ✅ Free and open source
- ✅ Works with Tailwind
- ❌ Class-based, not Go components
- ❌ Less type safety

**Our Decision**: templui is the only mature component library specifically built for templ, saving students time while teaching professional practices.

---

### 4. CSS Framework: Tailwind CSS

#### Why Tailwind?

#### Industry Standard

- Fastest-growing CSS framework
- High job market demand
- Used by major companies

#### Utility-First Approach

- Style elements directly in HTML/templ
- No context switching (HTML → CSS file → HTML)
- No naming classes (no "button-blue" vs "btn-primary" debates)

#### Productivity

- Rapid prototyping
- Responsive design with simple classes (`md:text-lg`)
- Hover states, dark mode built-in (`hover:bg-blue-600`, `dark:text-white`)

#### Performance

- Unused classes automatically removed (PurgeCSS)
- Small production bundle
- No unused CSS bloat

#### Consistency

- Design tokens built-in (colors, spacing, etc.)
- Hard to create inconsistent spacing or colors
- Team members use same system

#### Alternatives Considered

#### Bootstrap

- ✅ Mature, well-documented
- ✅ Many examples available
- ✅ Component-based
- ❌ Dated design aesthetic
- ❌ More opinionated (harder to customize)
- ❌ Declining popularity
- ❌ Larger bundle size

#### Custom CSS

- ✅ Complete control
- ✅ No framework overhead
- ❌ Time-consuming to build design system
- ❌ Easy to create inconsistencies
- ❌ Harder to maintain
- ❌ Need strong CSS skills

#### Material UI / Ant Design

- ✅ Complete design systems
- ✅ Many components
- ❌ Requires React
- ❌ Opinionated look (everything looks like Google/Ant)

**Our Decision**: Tailwind provides the best balance of modern practices, job market value, and productivity for students learning full-stack development.

---

### 5. Database: SQLite

#### Why SQLite?

#### Simplicity

- Zero configuration
- No database server to run
- Single file (easy to understand)
- Works immediately on any OS

#### Perfect for Small Business Sites

- Can handle 100,000+ visitors per day
- Read-heavy workloads (typical for business sites)
- Fast for most use cases
- Powers production apps (Expensify uses it!)

#### Development Experience

- Easy local development (no Docker needed)
- Database is a file (can version control test data)
- Backup is file copy (with litestream for production)
- No connection pool management

#### Cost

- Completely free
- No database hosting costs
- No per-query fees

#### Learning Value

- Teaches SQL (transferable to Postgres/MySQL)
- Simpler to start than complex databases
- Shows when to use different database types

#### When SQLite is Perfect

✅ Small to medium traffic sites (< 100K visits/day)
✅ Read-heavy applications (blogs, business sites, documentation)
✅ Single-server deployments
✅ Mobile apps and desktop applications
✅ Prototypes and MVPs
✅ Development and testing

#### When to Use Alternatives

**PostgreSQL** is better for:

- High write volume (thousands of writes per second)
- Multiple concurrent writers
- Complex queries (advanced window functions, full-text search)
- Distributed systems (multiple servers)
- Very large datasets (> 100GB)

**MySQL** is similar to PostgreSQL for our use case

**Firebase/Supabase** is better for:

- Real-time features (chat, collaboration)
- Managed infrastructure (don't want to manage servers)
- Mobile-first apps

#### Alternatives Considered

#### PostgreSQL

- ✅ More features (JSON, full-text search, etc.)
- ✅ Better for high write volume
- ✅ Industry standard for web apps
- ❌ Requires database server setup
- ❌ More complex local development
- ❌ Connection pool management needed
- ❌ Hosting costs ($7-$20/month minimum)

#### MySQL

- ✅ Very common in shared hosting
- ✅ Similar to PostgreSQL for basic use
- ❌ Same complexity as PostgreSQL
- ❌ Less advanced features than PostgreSQL
- ❌ Oracle ownership concerns

#### Firebase/Supabase

- ✅ Managed (no server management)
- ✅ Real-time capabilities
- ✅ Good free tier
- ❌ Vendor lock-in
- ❌ Less control
- ❌ NoSQL (Firebase) or requires learning Postgres (Supabase)
- ❌ Already covered in other tutorial

**Our Decision**: SQLite is the perfect database for learning and for small business websites. It's simpler to start with, costs nothing, and scales sufficiently for 95% of small business use cases.

---

### 6. Database Migrations: goose

#### Why goose?

#### Simplicity

- Write plain SQL migrations
- Up and down migrations (can rollback)
- Simple CLI tool
- Easy to understand what's happening

#### Version Control

- Migrations are files in your repo
- Team members share schema changes
- Track database changes over time
- Reproducible database setup

#### Production Ready

- Used in many Go projects
- Reliable and stable
- Good error handling

#### Learning Value

- Teaches SQL (not hidden behind ORM)
- Shows importance of versioning database changes
- Professional development practice

#### Alternatives Considered

#### golang-migrate

- ✅ Similar functionality
- ✅ More drivers (Postgres, MySQL, etc.)
- ❌ More complex CLI
- ❌ Harder for beginners

#### Atlas

- ✅ Modern, declarative approach
- ✅ Can generate migrations from schema
- ✅ Graph visualization
- ❌ Newer, less proven
- ❌ Steeper learning curve
- ❌ More complex for simple use case

#### Hand-written SQL scripts

- ✅ Very simple
- ❌ No version tracking
- ❌ Easy to get out of sync
- ❌ Hard to rollback
- ❌ No protection against running twice

#### ORM migrations (GORM, etc.)

- ✅ Integrated with ORM
- ❌ Less control
- ❌ Don't learn SQL as well
- ❌ Harder to debug

**Our Decision**: goose provides the right balance of simplicity and professionalism, while teaching students actual SQL.

---

### 7. Query Builder: sqlc

#### Why sqlc?

#### Type Safety

- Generates Go code from SQL queries
- Compile-time error checking
- Autocomplete in editor
- Refactoring support

#### Learn Real SQL

- Write actual SQL queries (not hidden)
- Understand what's happening
- Transferable skill to any database
- Can optimize queries

#### Performance

- Zero runtime overhead
- No reflection (like GORM uses)
- Direct database calls
- Can see generated code

#### Maintainability

- SQL in .sql files (not strings in Go code)
- Clear separation
- Easy to test queries independently
- Database developers can review SQL

#### Alternatives Considered

#### GORM (popular ORM)

- ✅ Very popular in Go community
- ✅ Quick to get started
- ✅ Handles relationships automatically
- ❌ Uses reflection (slower, less type-safe)
- ❌ Hides SQL (don't learn as much)
- ❌ Generated queries not always optimal
- ❌ Magic behavior can be confusing

#### Ent (Facebook's ORM)

- ✅ Type-safe (code generation)
- ✅ Powerful schema system
- ✅ Good for complex relationships
- ❌ Very complex for beginners
- ❌ Steep learning curve
- ❌ Overkill for simple sites

#### database/sql (Go standard library)

- ✅ No dependencies
- ✅ Complete control
- ❌ Lots of boilerplate code
- ❌ Easy to make mistakes
- ❌ Scanning rows is tedious
- ❌ No type safety

**Our Decision**: sqlc provides type safety and modern tooling while ensuring students learn real SQL skills.

---

### 8. Authentication: Clerk

#### Why Clerk?

#### Security by Experts

- Don't roll your own auth (major security risk)
- Password hashing done correctly
- Brute force protection
- Security updates handled for you

#### Free Tier

- 10,000 monthly active users free
- More than enough for small businesses
- No credit card required to start

#### Developer Experience

- Beautiful pre-built UI components
- Sign in, sign up, password reset included
- Social logins (Google, GitHub, etc.)
- Email verification automatic
- Webhook support

#### Production Ready

- Session management
- JWT tokens
- Organization/team support
- User profiles
- Multi-factor authentication

#### Learning Value

- Modern authentication patterns
- OAuth understanding
- API integration skills
- Security best practices

#### Alternatives Considered

#### Auth0

- ✅ Very mature, enterprise-grade
- ✅ Powerful features
- ❌ More expensive ($25/month after 7,500 users)
- ❌ More complex setup
- ❌ Heavier documentation

#### Supabase Auth

- ✅ Free and open source
- ✅ Good documentation
- ✅ Works well with Postgres
- ❌ Already covered in another tutorial
- ❌ Tied to Supabase ecosystem

#### Custom authentication

- ✅ Complete control
- ✅ No third-party dependency
- ❌ MAJOR security risk if done wrong
- ❌ Time-consuming (weeks of work)
- ❌ Need to implement email, password reset, etc.
- ❌ Ongoing security maintenance

#### Firebase Auth

- ✅ Free tier available
- ✅ Social logins included
- ❌ Tied to Firebase ecosystem
- ❌ JavaScript-focused SDK

**Our Decision**: Clerk offers the best balance of ease-of-use, security, and cost for students learning to build client websites.

---

### 9. Backup/Replication: litestream v0.3.x

#### Why litestream?

#### Critical for Production SQLite

- SQLite is a single file (one point of failure)
- Continuous replication (seconds behind)
- Point-in-time recovery
- Enables SQLite in production safely

#### Streaming Replication

- Real-time backup (not periodic)
- Minimal data loss (seconds, not hours)
- Stores to S3-compatible storage
- Multiple replicas possible

#### Affordable

- S3 costs ~$1-5/month for small sites
- Backblaze B2 even cheaper
- No expensive database hosting

#### Easy to Use

- Simple configuration file
- Runs alongside your app
- Automatic restoration on startup
- Works with systemd, Docker, etc.

#### Why v0.3.x?

- Latest stable release series
- Important bug fixes and features
- Production-tested
- Good documentation

#### Alternatives Considered

#### Manual SQLite backups

- ✅ Simple (cp database.db backup.db)
- ❌ Can lose data (time between backups)
- ❌ Need to schedule (cron, etc.)
- ❌ Manual restoration
- ❌ Not safe during writes

#### PostgreSQL with replication

- ✅ Built-in replication
- ✅ Very reliable
- ❌ Much more complex to set up
- ❌ More expensive ($15-50/month)
- ❌ Overkill for small sites

#### Managed database backups (AWS RDS, etc.)

- ✅ Automatic backups
- ✅ Point-in-time recovery
- ❌ Very expensive ($50+/month)
- ❌ Vendor lock-in

**No backups** 😱

- ❌ UNACCEPTABLE for client work
- ❌ Will lose data eventually
- ❌ Unprofessional

**Our Decision**: litestream is essential for production SQLite deployments and teaches students the critical importance of backups.

---

### 10. Hosting Platform: Fly.io or Railway

#### Why Fly.io?

#### Go-Friendly

- Native Go support (just `fly deploy`)
- Deploys single binary
- Fast cold starts

#### Free Tier

- Generous free allowance
- Good for learning and small projects
- Can scale up when needed

#### Simple Deployment

- Git push style
- Automatic SSL certificates
- Environment variables easy to set

#### SQLite Support

- Persistent volumes (disk storage)
- Perfect for SQLite + litestream
- Data persists across deployments

#### Global CDN

- Deploy to multiple regions
- Fast for users worldwide

#### Why Railway?

#### Extremely Simple

- Possibly easiest deployment platform
- Beautiful UI
- Great for beginners

#### Free Tier

- $5 free credit per month
- No credit card required initially

#### Go Support

- Detects Go automatically
- Simple deployment

#### Good for SQLite

- Persistent volumes available
- Works with litestream

#### Alternatives Considered

#### Vercel/Netlify

- ✅ Amazing for static sites
- ✅ Free tier
- ✅ Excellent documentation
- ❌ Designed for serverless (not long-running Go servers)
- ❌ SQLite on filesystem not ideal
- ❌ Better for Next.js than Go

#### AWS (EC2, ECS, etc.)

- ✅ Powerful, scalable
- ✅ Industry standard
- ❌ Very complex for beginners
- ❌ More expensive
- ❌ Steep learning curve
- ❌ Need to manage servers

#### DigitalOcean (Droplets)

- ✅ Affordable ($6/month)
- ✅ Simple VPS
- ❌ Need to manage Linux server
- ❌ Need to set up nginx, SSL, etc.
- ❌ More sysadmin work

#### Google Cloud Run

- ✅ Good for Go
- ✅ Scales to zero
- ❌ Not ideal for SQLite (ephemeral storage)
- ❌ More complex than Fly.io/Railway

#### Heroku

- ✅ Easy deployment
- ✅ Was popular for learning
- ❌ Removed free tier (now $5/month minimum)
- ❌ Ephemeral filesystem (bad for SQLite)

**Our Decision**: Fly.io or Railway provide the simplest path to production for Go + SQLite apps, with free tiers for learning.

---

## Technology Selection Framework

When evaluating technologies for future projects, consider:

### For Students Learning

1. Will this be valuable on a resume?
2. Is the learning curve appropriate?
3. Are there good free resources?
4. Is it used in industry?

### For Client Projects

1. Is it production-ready and stable?
2. What are the ongoing costs?
3. Can we maintain it long-term?
4. Is it reliable?

### For Small Businesses

1. Is it cost-effective?
2. Does it scale to their needs?
3. Is it secure?
4. Can another developer take over?

---

## Further Research

Want to dive deeper? Here are resources for comparing technologies:

### General Comparisons

- [StackShare](https://stackshare.io/) - See what companies use
- [State of JS/CSS](https://stateofjs.com/) - Frontend trends
- [Go Developer Survey](https://go.dev/blog/survey2023-q1-results) - Go ecosystem trends
- [DB-Engines](https://db-engines.com/) - Database popularity rankings

### Specific Technology Research

- Each technology's official documentation
- GitHub stars/issues (community health)
- Reddit communities (r/golang, r/webdev)
- YouTube comparison videos

### Decision-Making Process

1. Research 3-4 alternatives
2. List pros/cons for your use case
3. Try quick prototypes with top 2
4. Consider long-term maintenance
5. Document your decision

---

## Questions to Consider

After reading this document, discuss with your team:

1. Which of these decisions surprised you?
2. Are there any choices you would make differently? Why?
3. What would you choose for a high-traffic site (millions of visitors)?
4. What would you choose for a real-time chat application?
5. How do these choices change if the client has a bigger budget?

---

## Summary

Our stack prioritizes:

- ✅ **Learning value** (modern, in-demand skills)
- ✅ **Simplicity** (manageable for students in one semester)
- ✅ **Production readiness** (can handle real clients)
- ✅ **Cost effectiveness** (affordable for small businesses)
- ✅ **Type safety** (catch bugs early)

This combination gives students marketable skills while keeping the project achievable and professional.
