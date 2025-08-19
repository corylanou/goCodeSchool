# AI Prompting Guide for Go Development

## 🎯 Overview

This guide provides proven prompting strategies for effective AI-assisted Go development. Master these patterns to build applications faster and learn more effectively.

## 📚 The CLEAR Prompting Framework

### C - Context

Provide relevant background information

### L - Language and Tools

Specify your tech stack and constraints

### E - Examples

Include code samples or desired output

### A - Action

Clearly state what you want the AI to do

### R - Requirements

List specific criteria and constraints

## 🚀 Essential Prompt Templates

### 1. Project Initialization

#### Basic Project Setup

```text
Context: I'm a student learning Go web development
Language: Go 1.21+, using standard library net/http
Action: Create a new web application project structure
Requirements:
- RESTful API design
- SQLite database integration
- HTML templating
- Static file serving
- Proper error handling
- Ready for Vercel deployment

Include:
1. Directory structure
2. go.mod file
3. Basic main.go with routing
4. Example handler functions
5. Database connection setup
```

#### Framework-Specific Setup

```text
Create a Go web application using [Echo/Gin/Chi]:
- Project: [YOUR_PROJECT_NAME]
- Features: [LIST_FEATURES]
- Database: SQLite with sqlc code generation
- Frontend: HTML templates with HTMX
- Deployment: Vercel serverless functions

Provide:
1. Complete project structure
2. Configuration files
3. Basic route definitions
4. Middleware setup
5. Database schema design
```

### 2. Database Design and Implementation

#### Schema Design

```text
Design a SQLite database schema for [PROJECT_DESCRIPTION]:

Entities needed:
- [Entity 1]: [description and fields]
- [Entity 2]: [description and fields]
- [Entity 3]: [description and fields]

Requirements:
- Proper relationships and foreign keys
- Indexing for performance
- Data validation constraints
- Creation timestamps
- Soft delete capability

Provide:
1. SQL CREATE TABLE statements
2. Go struct definitions
3. Relationship diagrams
4. Sample data for testing
```

#### CRUD Operations

```text
Implement CRUD operations for [ENTITY_NAME] in Go:

Database: SQLite
Schema: [PASTE_YOUR_SCHEMA]
Framework: [net/http | Echo | Gin]

Requirements:
- Type-safe database operations
- Input validation
- Error handling with proper HTTP status codes
- JSON responses
- Prepared statements for security

Include:
1. Handler functions for each operation
2. Database query functions
3. Request/response structs
4. Validation logic
5. Error handling middleware
```

### 3. Feature Development

#### Authentication System

```text
Implement user authentication for my Go web application:

Current stack:
- Go with [framework]
- SQLite database
- HTML templates
- Session-based auth (not JWT)

Features needed:
- User registration with email/password
- Login/logout functionality
- Password hashing (bcrypt)
- Session management
- Protected routes middleware
- User profile management

Provide:
1. User model and database schema
2. Authentication handlers
3. Session middleware
4. Password hashing utilities
5. Frontend forms for login/register
6. Route protection examples
```

#### API Endpoint Development

```text
Create REST API endpoints for [FEATURE_NAME]:

Existing code context:
[PASTE_RELEVANT_CODE]

New endpoints needed:
- GET /api/[resource] - List items with pagination
- POST /api/[resource] - Create new item
- GET /api/[resource]/{id} - Get specific item
- PUT /api/[resource]/{id} - Update item
- DELETE /api/[resource]/{id} - Delete item

Requirements:
- Consistent error handling
- Input validation
- JSON request/response
- Proper HTTP status codes
- Integration with existing database models

Maintain consistency with existing code patterns.
```

### 4. Frontend Development

#### HTML Templates

```text
Create HTML templates for [PAGE_NAME] using Go's html/template:

Page purpose: [DESCRIPTION]
Data to display: [LIST_DATA_FIELDS]
User interactions: [LIST_INTERACTIONS]
Styling: TailwindCSS classes

Requirements:
- Semantic HTML structure
- Responsive design
- Form handling with validation
- Error message display
- Consistent with site navigation
- Accessible markup (ARIA labels)

Include:
1. Base template with common elements
2. Page-specific template
3. Form components
4. Error handling display
5. CSS classes for styling
```

#### HTMX Integration

```text
Add HTMX interactivity to [EXISTING_FEATURE]:

Current implementation: [DESCRIBE_CURRENT_STATE]
Desired behavior:
- [Interactive feature 1]
- [Interactive feature 2]
- [Interactive feature 3]

Requirements:
- No page refreshes
- Loading states and feedback
- Error handling with user messages
- Progressive enhancement
- Maintain accessibility

Update:
1. HTML templates with HTMX attributes
2. Go handlers for HTMX requests
3. Partial template responses
4. Client-side error handling
```

### 5. Code Review and Optimization

#### Code Review

```text
Review this Go code for improvements:

[PASTE_YOUR_CODE]

Focus areas:
1. Go best practices and idioms
2. Error handling patterns
3. Performance optimization
4. Security considerations
5. Code organization and clarity
6. Memory usage and efficiency

Provide:
- Specific issues found
- Improved code examples
- Explanation of why changes are better
- Alternative approaches to consider
```

#### Performance Optimization

```text
Optimize this Go web application for better performance:

Current issues:
- [Describe performance problems]
- [Load times, memory usage, etc.]

Code context:
[PASTE_RELEVANT_CODE]

Please analyze:
1. Database query efficiency
2. Memory allocation patterns
3. HTTP handler optimization
4. Caching opportunities
5. Resource usage

Provide optimized code with explanations.
```

### 6. Debugging and Troubleshooting

#### Error Debugging

```text
Debug this error in my Go application:

Error message:
[PASTE_COMPLETE_ERROR]

Code context:
[PASTE_RELEVANT_CODE]

Environment:
- Go version: [VERSION]
- OS: [SYSTEM]
- Database: [DATABASE_INFO]

Please:
1. Explain what's causing this error
2. Provide step-by-step fix
3. Show corrected code
4. Suggest prevention strategies
5. Add better error handling
```

#### Integration Issues

```text
Fix integration problem between [COMPONENT_A] and [COMPONENT_B]:

Problem description:
[DESCRIBE_THE_ISSUE]

Component A code:
[PASTE_CODE]

Component B code:
[PASTE_CODE]

Expected behavior: [DESCRIPTION]
Actual behavior: [DESCRIPTION]

Help me:
1. Identify the root cause
2. Provide a solution
3. Test the integration
4. Prevent similar issues
```

### 7. Deployment and DevOps

#### Vercel Deployment

```text
Prepare my Go application for Vercel deployment:

Current local setup:
- [Describe your local environment]
- Dependencies: [LIST_DEPENDENCIES]
- Database: [DATABASE_SETUP]
- Environment variables: [LIST_VARS]

Issues to address:
- [Any current deployment problems]

Help me:
1. Create proper vercel.json configuration
2. Restructure code for serverless functions
3. Handle environment variables
4. Configure static file serving
5. Set up custom domain (if needed)
6. Troubleshoot deployment errors
```

#### Production Optimization

```text
Optimize my Go application for production:

Current application:
[BRIEF_DESCRIPTION]

Production requirements:
- Handle [NUMBER] concurrent users
- Response time under [TIME]
- Uptime of 99.9%
- Security best practices

Optimize:
1. Database connection pooling
2. HTTP handler efficiency
3. Memory usage
4. Security headers
5. Logging and monitoring
6. Error recovery
```

## 💡 Advanced Prompting Techniques

### Context Stacking

Build context across multiple prompts:

```text
Prompt 1: "I'm building a Go blog platform with [details]"
Prompt 2: "Based on our previous discussion about the blog platform, now add [feature]"
Prompt 3: "Continuing with our blog platform, optimize the [component] we just created"
```

### Iterative Refinement

```text
"Improve this Go function:
[PASTE_CODE]

Make it:
1. More efficient
2. Better error handling
3. More readable
4. More testable

Show the improved version with explanations."
```

### Pattern Learning

```text
"Show me the Go pattern for [specific task]:
- Provide a complete example
- Explain when to use this pattern
- Show common variations
- Include error handling
- Add unit test example"
```

## 🚨 Common Prompting Mistakes

### ❌ Vague Requests

**Bad**: "Make my code better"
**Good**: "Optimize this Go function for memory usage and add proper error handling"

### ❌ No Context

**Bad**: "Fix this error: cannot find symbol"
**Good**: "Fix this Go compilation error in my web handler: [full error + code context]"

### ❌ Too Broad Scope

**Bad**: "Build a complete e-commerce site"
**Good**: "Create a product catalog API with search functionality using Go and SQLite"

### ❌ Missing Requirements

**Bad**: "Add authentication"
**Good**: "Add session-based authentication with bcrypt password hashing and middleware protection"

## 📊 Measuring Prompt Effectiveness

### Good Prompts Produce:

- ✅ Working code on first try
- ✅ Comprehensive solutions
- ✅ Clear explanations
- ✅ Best practices included
- ✅ Error handling coverage

### Improve Prompts That Result In:

- ❌ Incomplete solutions
- ❌ Code that doesn't compile
- ❌ Missing error handling
- ❌ Security vulnerabilities
- ❌ Poor performance

## 🎯 Project-Specific Prompt Collections

### Portfolio Website

```text
"Create a Go-powered portfolio website:
- Static pages: about, projects, contact
- Dynamic contact form with email
- Project showcase with database
- Admin panel for content management
- TailwindCSS styling
- Vercel deployment ready"
```

### Todo Application

```text
"Build a Go todo application with:
- User registration and login
- CRUD operations for todos
- Categories and priority levels
- Due date functionality
- HTMX for dynamic updates
- SQLite database backend"
```

### Blog Platform

```text
"Develop a Go blog platform featuring:
- Markdown post creation
- User authentication system
- Comment functionality
- Category/tag organization
- SEO-friendly URLs
- Admin dashboard
- Responsive design"
```

## 📚 Quick Reference

### Template Structure

```text
Context: [Background information]
Stack: [Technology details]
Goal: [What you want to achieve]
Requirements: [Specific criteria]
Constraints: [Limitations or preferences]
Output: [Desired format of response]
```

### Error Handling Template

```text
Error: [Exact error message]
Code: [Relevant code snippet]
Environment: [System details]
Expected: [What should happen]
Actual: [What's happening]
Help needed: [Specific assistance requested]
```

### Feature Request Template

```text
Feature: [Feature name and description]
Current state: [What exists now]
Desired state: [What you want]
Tech stack: [Your technologies]
Integration: [How it fits with existing code]
Priority: [Must-have vs nice-to-have]
```

---

**Remember**: Great prompts lead to great code. Invest time in crafting clear, specific prompts for better AI assistance and faster learning!
