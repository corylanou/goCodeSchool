# Successful AI Prompts for Portfolio Project

## 🎯 Overview

This document contains proven AI prompts that generate high-quality code for your portfolio project. Use these as templates and modify them based on your specific needs.

## 📁 Project Setup Prompts

### Complete Project Structure

```text
Create a complete Go web application for a personal portfolio website with these requirements:

Tech Stack:
- Go 1.25 with standard net/http library
- SQLite database for data persistence
- HTML templates with TailwindCSS styling
- HTMX for dynamic interactions
- Vercel serverless deployment ready

Features Required:
- Home page with featured projects
- About page with bio and skills
- Projects showcase with filtering
- Contact form with email functionality
- Admin panel for content management
- User authentication for admin
- Responsive design for all devices

Project Structure:
- main.go (entry point with routing)
- handlers/ (HTTP request handlers)
- models/ (database models and operations)
- templates/ (HTML templates)
- static/ (CSS, JS, images)
- database/ (SQL schema and migrations)

Include:
1. Complete directory structure
2. go.mod with dependencies
3. Basic routing setup
4. Database connection
5. Template rendering system
6. Static file serving
7. Error handling middleware
8. Development server configuration

Make it production-ready with proper error handling, security considerations, and clean code structure.
```

### Database Schema Design

```text
Design a comprehensive SQLite database schema for a personal portfolio website with these entities:

1. PROJECTS table:
   - Unique project identifier
   - Project title and description
   - Long-form project details (markdown support)
   - Technology stack used (comma-separated or JSON)
   - GitHub repository URL
   - Live demo URL
   - Project image/screenshot URL
   - Featured flag for homepage display
   - Project status (completed, in-progress, planned)
   - Creation and update timestamps

2. CONTACT_SUBMISSIONS table:
   - Unique submission identifier
   - Sender name and email
   - Message subject and content
   - Read/unread status
   - Spam flag for filtering
   - IP address for security
   - Submission timestamp

3. ADMIN_USERS table:
   - User identifier
   - Username (unique)
   - Secure password hash (bcrypt)
   - Role/permission level
   - Last login timestamp
   - Account creation date

4. SITE_SETTINGS table:
   - Setting identifier
   - Setting key (unique)
   - Setting value (JSON or text)
   - Setting description
   - Last update timestamp

Additional Requirements:
- Proper data types and constraints
- Foreign key relationships where appropriate
- Indexes for performance optimization
- Default values for required fields
- Sample data for development/testing

Generate:
1. Complete SQL CREATE TABLE statements
2. Go struct definitions with proper tags
3. Database initialization function
4. Sample INSERT statements for testing
5. Migration scripts for schema updates
```

## 🔧 Backend Development Prompts

### HTTP Handlers Implementation

```text
Create comprehensive HTTP handlers for a Go portfolio website with these routes and functionality:

PUBLIC ROUTES:
- GET / : Home page with featured projects and introduction
- GET /about : About page with bio, skills, and experience
- GET /projects : Project showcase with search/filter capabilities
- GET /contact : Contact form page
- POST /contact : Handle contact form submission with validation

ADMIN ROUTES (authentication required):
- GET /admin : Admin login page
- POST /admin/login : Handle admin authentication
- GET /admin/dashboard : Admin dashboard with statistics
- GET /admin/projects : Project management interface
- POST /admin/projects : Create new project
- PUT /admin/projects/{id} : Update existing project
- DELETE /admin/projects/{id} : Delete project
- GET /admin/messages : View contact form submissions
- POST /admin/messages/{id}/read : Mark message as read

REQUIREMENTS:
- Use standard net/http library (no external frameworks)
- Proper HTTP status codes and error responses
- Input validation and sanitization
- SQL injection prevention with prepared statements
- Session-based authentication for admin
- JSON responses for API endpoints
- HTML template rendering for pages
- CSRF protection for forms
- Rate limiting for contact form
- Logging for security events

Include:
1. Handler functions with proper signatures
2. Middleware for authentication, logging, CORS
3. Form validation with error messages
4. Database operations with error handling
5. Session management implementation
6. Security headers and protections
7. Helper functions for common operations
8. Proper error handling and recovery
```

### Database Operations (CRUD)

```text
Implement complete CRUD operations for the portfolio website database models:

PROJECTS OPERATIONS:
- CreateProject: Add new project with validation
- GetProject: Retrieve single project by ID
- GetAllProjects: List projects with pagination and filtering
- GetFeaturedProjects: Get projects marked as featured
- UpdateProject: Modify existing project
- DeleteProject: Remove project (soft delete preferred)
- SearchProjects: Full-text search by title, description, technologies

CONTACT SUBMISSIONS:
- CreateSubmission: Store new contact form submission
- GetSubmission: Retrieve single submission
- GetAllSubmissions: List submissions with pagination
- MarkAsRead: Update read status
- DeleteSubmission: Remove submission
- GetUnreadCount: Count unread messages

ADMIN USERS:
- CreateUser: Add new admin user
- AuthenticateUser: Verify credentials
- GetUser: Retrieve user information
- UpdateUser: Modify user details
- UpdatePassword: Change password with validation

SITE SETTINGS:
- GetSetting: Retrieve configuration value
- SetSetting: Update configuration
- GetAllSettings: List all settings
- DeleteSetting: Remove setting

REQUIREMENTS:
- Use prepared statements for security
- Proper error handling and logging
- Input validation before database operations
- Transaction support for complex operations
- Connection pooling and resource cleanup
- Optimized queries with appropriate indexes
- Pagination for large result sets
- SQL injection prevention
- Data validation with Go struct tags
- Consistent error types and messages

Include:
1. Go struct definitions with database tags
2. Database connection management
3. Transaction handling helpers
4. Error type definitions
5. Validation functions
6. Helper functions for common queries
7. Database initialization and migration
8. Connection pooling configuration
```

## 🎨 Frontend Development Prompts

### HTML Template System

```text
Create a complete HTML template system for a portfolio website using Go's html/template package:

BASE TEMPLATE (layout.html):
- Modern, clean HTML5 structure
- Responsive meta tags and viewport
- TailwindCSS integration via CDN
- Navigation header with mobile hamburger menu
- Main content area with template inheritance
- Footer with social links and copyright
- SEO meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Structured data for search engines
- Performance optimizations (preload, prefetch)

PAGE TEMPLATES:
1. home.html - Hero section, featured projects, skills grid
2. about.html - Bio, timeline, skills, interests
3. projects.html - Project grid, filtering, search
4. contact.html - Contact form, social links
5. admin.html - Login form, dashboard, management

COMPONENT TEMPLATES:
- navigation.html - Responsive nav menu
- project-card.html - Reusable project display
- contact-form.html - Form with validation
- admin-sidebar.html - Admin navigation
- pagination.html - Page navigation controls

DESIGN REQUIREMENTS:
- Mobile-first responsive design
- Professional color scheme (blue, gray, white)
- Clean typography with good readability
- Smooth animations and transitions
- Accessible markup (ARIA labels, semantic HTML)
- Fast loading with optimized assets
- Cross-browser compatibility
- Print-friendly styles

INTERACTIVE FEATURES:
- Smooth scrolling navigation
- Image lazy loading
- Form validation feedback
- Loading states for forms
- Hover effects on interactive elements
- Mobile touch-friendly targets
- Keyboard navigation support

Include:
1. Complete HTML templates with Go template syntax
2. TailwindCSS classes for styling
3. JavaScript for interactivity (minimal)
4. Template helper functions
5. Error handling for missing data
6. SEO optimization features
7. Accessibility enhancements
8. Performance optimizations
```

### HTMX Integration

```text
Add HTMX functionality to make the portfolio website interactive without page refreshes:

CONTACT FORM ENHANCEMENT:
- Submit form via AJAX with loading indicator
- Display success/error messages inline
- Real-time form validation feedback
- Progress indicator during submission
- Email verification with visual feedback

PROJECT MANAGEMENT (Admin):
- Add new projects without page reload
- Edit project details inline
- Delete projects with confirmation modal
- Upload images with preview
- Save drafts automatically
- Bulk operations (delete multiple, reorder)

DYNAMIC CONTENT LOADING:
- Infinite scroll for projects page
- Search/filter projects with instant results
- Load more projects button
- Dynamic project detail modals
- Real-time search suggestions

MESSAGE MANAGEMENT (Admin):
- Mark messages as read/unread instantly
- Delete messages with undo option
- Filter messages by status
- Real-time notification of new messages
- Bulk message operations

REQUIREMENTS:
- Progressive enhancement (works without JavaScript)
- Proper loading states and user feedback
- Error handling with user-friendly messages
- Accessibility maintained with HTMX
- SEO-friendly URLs still work
- Fast response times (<200ms for interactions)
- Mobile-optimized touch interactions
- Keyboard navigation support

HTMX FEATURES TO USE:
- hx-get, hx-post, hx-put, hx-delete for requests
- hx-target for specifying update areas
- hx-swap for different replacement strategies
- hx-indicator for loading states
- hx-confirm for dangerous actions
- hx-trigger for custom event handling
- hx-vals for additional data
- hx-headers for authentication

Include:
1. HTMX attributes in HTML templates
2. Go handlers for HTMX endpoints
3. Partial templates for dynamic updates
4. Client-side JavaScript for enhancements
5. Error handling for AJAX requests
6. Loading indicators and feedback
7. Form validation improvements
8. Progressive enhancement fallbacks
```

## 🚀 Deployment Prompts

### Vercel Configuration

```text
Prepare the Go portfolio website for deployment on Vercel with serverless functions:

VERCEL CONFIGURATION:
- Create vercel.json with proper Go runtime configuration
- Set up serverless function routing for all endpoints
- Configure static file serving for CSS, JS, images
- Set up environment variables for production
- Configure custom domain with HTTPS
- Set up proper caching headers for static assets

SERVERLESS FUNCTION STRUCTURE:
- Convert HTTP handlers to Vercel function format
- Handle database connections in serverless environment
- Optimize cold start performance
- Set up proper error handling and logging
- Configure timeout and memory limits
- Handle file uploads for images

ENVIRONMENT SETUP:
- Database connection string (SQLite or PostgreSQL)
- Email service configuration (SendGrid, Mailgun)
- Admin authentication secrets
- Site configuration variables
- External API keys if needed
- Debug and logging configuration

PERFORMANCE OPTIMIZATION:
- Minimize function bundle size
- Optimize database queries for serverless
- Set up appropriate caching strategies
- Compress static assets
- Optimize images for web delivery
- Configure CDN for global performance

SECURITY CONFIGURATION:
- Set up proper CORS headers
- Configure security headers (CSP, HSTS, etc.)
- Set up rate limiting for API endpoints
- Configure secure session handling
- Set up SQL injection protection
- Add input validation and sanitization

MONITORING AND LOGGING:
- Set up function monitoring and alerts
- Configure error tracking and reporting
- Set up performance monitoring
- Add custom logging for debugging
- Configure uptime monitoring
- Set up backup and recovery procedures

Include:
1. Complete vercel.json configuration file
2. Modified Go code for serverless deployment
3. Environment variable setup guide
4. Deployment script and instructions
5. Domain configuration steps
6. Monitoring and logging setup
7. Performance optimization guide
8. Security checklist for production
```

## 🐛 Debugging Prompts

### Error Resolution Template

```text
Debug this error in my Go portfolio website:

ERROR MESSAGE:
[Paste the complete error message here]

CODE CONTEXT:
[Paste the relevant Go code where the error occurs]

ENVIRONMENT:
- Go version: 1.25
- Operating system: [Your OS]
- Database: SQLite
- Browser: [If frontend error]
- Deployment: [Local/Vercel]

WHAT I WAS TRYING TO DO:
[Describe the action that caused the error]

WHAT I EXPECTED:
[Describe what should have happened]

WHAT ACTUALLY HAPPENED:
[Describe the actual behavior]

Please help me:
1. Understand what's causing this error
2. Provide a step-by-step fix
3. Explain why this error occurred
4. Suggest how to prevent similar issues
5. Improve the code quality and error handling
6. Add proper testing to catch this in the future

Also check for:
- Common Go programming mistakes
- Security vulnerabilities
- Performance issues
- Best practice violations
```

### Code Review Template

```text
Review this Go code from my portfolio website for improvements:

CODE TO REVIEW:
[Paste your Go code here]

CONTEXT:
- Purpose: [What this code is supposed to do]
- Part of: [Which feature/component this belongs to]
- Performance requirements: [Any specific performance needs]
- Security considerations: [Any security requirements]

Please analyze and improve:

1. FUNCTIONALITY:
   - Does the code work correctly?
   - Are there any logical errors?
   - Does it handle edge cases properly?

2. GO BEST PRACTICES:
   - Proper error handling patterns
   - Idiomatic Go code style
   - Correct use of Go features
   - Memory efficiency and performance

3. SECURITY:
   - SQL injection prevention
   - Input validation and sanitization
   - Authentication and authorization
   - Secure data handling

4. MAINTAINABILITY:
   - Code readability and clarity
   - Proper documentation and comments
   - Function and variable naming
   - Code organization and structure

5. PERFORMANCE:
   - Database query optimization
   - Memory usage efficiency
   - Response time optimization
   - Resource cleanup

6. TESTING:
   - Testability of the code
   - Suggested unit tests
   - Integration testing approaches
   - Error scenario testing

Provide:
- Improved version of the code
- Explanation of changes made
- Additional suggestions for enhancement
- Testing recommendations
```

## 📊 Performance Optimization Prompts

### Database Optimization

```text
Optimize the SQLite database performance for my portfolio website:

CURRENT SCHEMA:
[Paste your database schema here]

CURRENT QUERIES:
[Paste your main database queries]

PERFORMANCE ISSUES:
[Describe any slow queries or performance problems]

Please optimize for:

1. QUERY PERFORMANCE:
   - Add appropriate indexes for common queries
   - Optimize SELECT statements for faster retrieval
   - Improve JOIN operations if any
   - Reduce database round trips

2. DATABASE STRUCTURE:
   - Normalize tables for efficiency
   - Add constraints for data integrity
   - Optimize data types for storage
   - Consider partitioning for large tables

3. CONNECTION MANAGEMENT:
   - Implement connection pooling
   - Optimize connection lifecycle
   - Handle connection errors gracefully
   - Reduce connection overhead

4. CACHING STRATEGY:
   - Identify cacheable data
   - Implement in-memory caching
   - Set up query result caching
   - Cache frequently accessed data

5. MONITORING:
   - Add query performance logging
   - Monitor slow queries
   - Track database resource usage
   - Set up performance alerts

Include:
1. Optimized database schema with indexes
2. Improved Go database code
3. Caching implementation
4. Performance monitoring setup
5. Load testing recommendations
6. Scaling strategies for growth
```

## 🔍 Testing Prompts

### Unit Testing Implementation

```text
Create comprehensive unit tests for my Go portfolio website:

CODE TO TEST:
[Paste the Go code you want to test]

TESTING REQUIREMENTS:
- Test all public functions and methods
- Cover both success and error scenarios
- Test edge cases and boundary conditions
- Mock external dependencies (database, email)
- Achieve high code coverage (>80%)
- Fast test execution (<1 second per test)

TEST CATEGORIES:

1. MODEL TESTS:
   - Database CRUD operations
   - Data validation functions
   - Business logic methods
   - Error handling scenarios

2. HANDLER TESTS:
   - HTTP request/response handling
   - Authentication and authorization
   - Form validation and processing
   - JSON API responses

3. INTEGRATION TESTS:
   - End-to-end user workflows
   - Database integration testing
   - Template rendering tests
   - Static file serving tests

4. SECURITY TESTS:
   - Input validation testing
   - SQL injection prevention
   - Authentication bypass attempts
   - CSRF protection validation

TESTING TOOLS:
- Go standard testing package
- testify for assertions and mocks
- httptest for HTTP testing
- Database test fixtures
- Test data generators

Include:
1. Complete test files with proper structure
2. Mock implementations for external dependencies
3. Test data setup and teardown functions
4. Benchmark tests for performance critical code
5. Integration test scenarios
6. Test configuration and helpers
7. CI/CD pipeline test integration
8. Coverage reporting setup
```

---

**💡 Pro Tips for Using These Prompts:**

1. **Customize Context**: Always add your specific project details
2. **Be Specific**: The more specific your requirements, the better the output
3. **Iterate**: Start with basic prompts, then refine based on results
4. **Validate**: Always test and understand the generated code
5. **Learn**: Ask AI to explain complex parts you don't understand
6. **Document**: Save prompts that work well for future reference

These prompts are designed to generate production-quality code while helping you learn Go web development fundamentals!
