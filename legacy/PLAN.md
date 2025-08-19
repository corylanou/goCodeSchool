# Go Code School: Modern Web Development Plan

## 🎯 Project Overview

This course teaches middle and high school students modern web development using a lightweight, powerful tech stack.

Students will learn to build full-stack web applications using Go as the foundation,
avoiding complex frameworks while maintaining professional development practices.

## 🛠️ Tech Stack: GOTHSAV

- **G**o - Primary programming language and backend framework
- **t**empl - Type-safe HTML templating system
- **H**TML - Web fundamentals and semantic markup
- **S**QLite - Lightweight, file-based database
- **s**qlc - Type-safe SQL code generation
- **A**ir - Live reload development server
- **V**ercel - Free cloud hosting platform

## 🆓 Student Resources & Licensing

### Free Tools for Students

1. **GitHub Copilot Pro** - FREE for verified students
   - Real-time, context-aware code suggestions
   - Access through GitHub Education Student Pack
   - Requires school email verification
   - Eligibility reviewed monthly

2. **Vercel Hosting** - FREE "Hobby" tier
   - Unlimited personal projects
   - Custom domains
   - Automatic HTTPS
   - Git integration for automatic deployments

3. **Development Tools** - All open source and free
   - Go programming language
   - VS Code or any preferred editor
   - SQLite database
   - All course-specific libraries (templ, HTMX, etc.)

## 📚 Course Structure

### Phase 1: Foundations (Weeks 1-3)

**Goal**: Establish programming fundamentals and web basics

#### Module 1: Go Programming Fundamentals

- Go installation and workspace setup
- Variables, functions, and basic types
- Control structures (if/else, loops)
- Slices, maps, and structs
- Error handling patterns
- Package system and imports

#### Module 2: HTML & Web Fundamentals

- Semantic HTML5 elements
- Document structure and accessibility
- Forms and input validation
- CSS basics for styling
- Understanding HTTP requests/responses

#### Module 3: First Web Server

- Building a simple HTTP server with `net/http`
- Routing and URL parameters
- Serving static files
- Basic templating with `html/template`

### Phase 2: Modern Templating (Weeks 4-5)

**Goal**: Learn type-safe templating with templ

#### Module 4: Introduction to templ

- Installing and setting up templ
- Template syntax and components
- Type-safe template development
- Component composition and reusability
- Conditional rendering and loops

#### Module 5: Dynamic Web Pages

- Building interactive forms
- Template data binding
- Component props and state
- Creating reusable UI components

### Phase 3: Database Integration (Weeks 6-8)

**Goal**: Add persistent data storage

#### Module 6: SQLite Fundamentals

- Database concepts and SQL basics
- Setting up SQLite with Go
- CRUD operations (Create, Read, Update, Delete)
- Database design and relationships
- SQL best practices

#### Module 7: sqlc Code Generation

- Installing and configuring sqlc
- Writing SQL queries in .sql files
- Generating type-safe Go code
- Query organization and migrations
- Testing database operations

#### Module 8: Building a Data-Driven App

- User registration and authentication
- Session management
- Data validation and error handling
- Building a complete CRUD application

### Phase 4: Interactive Frontend (Weeks 9-10)

**Goal**: Add client-side interactivity without complex JavaScript

#### Module 9: HTMX Fundamentals

- HTMX concepts and benefits
- AJAX requests without JavaScript
- Dynamic content updates
- Form submissions and validation
- Progressive enhancement principles

#### Module 10: Advanced HTMX Patterns

- Real-time updates with Server-Sent Events
- Infinite scroll and pagination
- Modal dialogs and dynamic forms
- Error handling and user feedback

### Phase 5: Development Workflow (Week 11)

**Goal**: Professional development practices

#### Module 11: Development Tools

- Setting up Air for live reload
- Hot reloading templates and Go code
- Debugging techniques
- Testing strategies (unit and integration)
- Code organization and project structure

### Phase 6: Deployment & Production (Week 12)

**Goal**: Deploy applications to the internet

#### Module 12: Vercel Deployment

- Preparing Go applications for Vercel
- Understanding serverless functions
- Environment variables and configuration
- Custom domains and HTTPS
- Monitoring and maintenance

## 🚀 Capstone Project: Student Portfolio Website

Students will build a personal portfolio website featuring:

- About page with personal information
- Project showcase with CRUD functionality
- Contact form with database storage
- Admin panel for content management
- Responsive design with HTMX interactions
- Full deployment to Vercel

### Project Requirements:

- At least 5 different pages/routes
- Database with 3+ related tables
- User authentication system
- 5+ HTMX interactive features
- Professional styling and responsive design
- Deployed and accessible online

## 📋 Assessment Strategy

### Continuous Assessment (70%)

- Weekly coding exercises and mini-projects
- Code review and peer programming sessions
- GitHub commit history and documentation
- Participation in debugging sessions

### Project-Based Assessment (30%)

- Mid-term project: Todo application with authentication
- Final capstone project: Personal portfolio website
- Presentation and deployment demonstration

## 🛠️ Required Setup

### Development Environment

1. **Go 1.21+** - Latest stable version
2. **VS Code** with Go extension (or preferred editor)
3. **Git** for version control
4. **GitHub account** with Student Pack
5. **Vercel account** (free tier)

### Course-Specific Tools

1. **templ CLI** - `go install github.com/a-h/templ/cmd/templ@latest`
2. **sqlc** - `go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest`
3. **Air** - `go install github.com/cosmtrek/air@latest`

### Recommended Tools

1. **GitHub Copilot** (free for students)
2. **Thunder Client** or Postman for API testing
3. **DB Browser for SQLite** for database visualization

## 📖 Learning Resources

### Primary Resources

- [Go Official Documentation](https://golang.org/doc/)
- [templ Documentation](https://templ.guide/)
- [HTMX Documentation](https://htmx.org/docs/)
- [SQLite Tutorial](https://www.sqlitetutorial.net/)
- [Vercel Go Documentation](https://vercel.com/docs/functions/runtimes/go)

### Supplementary Resources

- [Go by Example](https://gobyexample.com/)
- [HTMX Examples](https://htmx.org/examples/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Community & Support

- Go community forums and Discord
- GitHub discussions for course projects
- Student coding club meetings
- Office hours for individual help

## 🎯 Learning Outcomes

By the end of this course, students will be able to:

1. **Backend Development**
   - Write clean, idiomatic Go code
   - Build RESTful web services
   - Design and implement database schemas
   - Handle user authentication and sessions

2. **Frontend Development**
   - Create semantic, accessible HTML
   - Build dynamic user interfaces with templ
   - Implement interactive features with HTMX
   - Apply responsive design principles

3. **Full-Stack Integration**
   - Connect frontend and backend systems
   - Manage application state and data flow
   - Handle errors and edge cases gracefully
   - Optimize performance and user experience

4. **Professional Skills**
   - Use version control effectively
   - Deploy applications to production
   - Debug and troubleshoot issues
   - Write maintainable, documented code
   - Collaborate on team projects

## 🔄 Course Updates & Iteration

This curriculum will be continuously updated based on:

- Student feedback and learning outcomes
- Industry trends and best practices
- New tool releases and updates
- Employer feedback on graduate skills

### Planned Enhancements

- Adding automated testing modules
- Integration with CI/CD pipelines
- Advanced security practices
- Performance optimization techniques
- Microservices architecture introduction

---

*Last Updated: August 2025*
*Next Review: January 2026*
