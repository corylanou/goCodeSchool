# Product Requirements Document: Personal Portfolio Website

## 📋 Project Information

**Project Name**: AI-Assisted Personal Portfolio Website  
**Target Audience**: Students learning Go web development with AI  
**Platform**: Web (responsive design)  
**Technology Stack**: Go 1.25, HTMX, SQLite, TailwindCSS, Vercel  
**Timeline**: 2 weeks  

## 🎯 Project Vision

### What are we building?

A professional portfolio website that showcases a student's programming projects, skills, and experience. The site will serve as both a learning project and a real portfolio that can be shared with potential employers or educational institutions.

### Why this project?

- **Real-world application**: Students get a functioning portfolio website
- **Full-stack learning**: Covers backend (Go), frontend (HTMX), database (SQLite), and deployment (Vercel)
- **AI collaboration**: Demonstrates effective AI-assisted development workflows
- **Portfolio building**: Creates actual value beyond just learning

### Success Definition

- **Technical**: Fully functional website deployed to production with custom domain
- **Educational**: Student understands all components and can explain the code
- **Professional**: Portfolio quality suitable for job applications or school projects
- **AI Mastery**: Student demonstrates effective AI prompting and collaboration skills

## 👥 User Stories

### Primary Users: Portfolio Visitors

**Persona**: Recruiters, teachers, peers, family members who want to learn about the student

#### Core User Stories

- **As a recruiter**, I want to quickly assess this student's technical skills so I can determine if they're a good fit for internships or entry-level positions
- **As a teacher**, I want to see this student's project work so I can evaluate their progress and provide feedback
- **As a peer**, I want to explore their projects so I can learn from their code and get inspiration for my own work
- **As a family member**, I want to understand what this student is learning so I can support their educational journey

### Secondary User: Portfolio Owner (Student)

#### Content Management Stories

- **As the portfolio owner**, I want to easily add new projects without editing code so I can keep my portfolio current
- **As the portfolio owner**, I want to update my contact information and bio so visitors get accurate information
- **As the portfolio owner**, I want to receive contact form submissions so I can respond to opportunities
- **As the portfolio owner**, I want my site to look professional on all devices so I make a good impression

### Tertiary User: Admin (Student)

#### Administrative Stories

- **As an admin**, I want to log into a secure admin panel so I can manage my portfolio content
- **As an admin**, I want to see contact form submissions so I can respond to inquiries
- **As an admin**, I want to upload project images so my work looks visually appealing

## 🏗️ Technical Architecture

### System Overview

```text
Frontend (Browser)
    ↓ HTTP requests
Go Web Server (net/http)
    ↓ Template rendering
HTML Templates (Go templates)
    ↓ Dynamic interactions
HTMX (no-refresh updates)
    ↓ Data persistence
SQLite Database
    ↓ Deployment
Vercel Serverless Functions
```

### Technology Stack Justification

- **Go 1.25**: Simple, powerful, excellent for learning web development fundamentals
- **Standard net/http**: Learn core concepts before frameworks like Echo/Gin
- **SQLite**: Zero-configuration database perfect for learning and simple deployments
- **HTMX**: Modern interactivity without complex JavaScript frameworks
- **TailwindCSS**: Rapid prototyping and responsive design
- **Vercel**: Free hosting with automatic HTTPS and Git integration

### Database Design

#### Tables Needed

1. **projects**
   - id: INTEGER PRIMARY KEY AUTOINCREMENT
   - title: TEXT NOT NULL
   - description: TEXT NOT NULL
   - long_description: TEXT
   - technologies: TEXT (comma-separated)
   - github_url: TEXT
   - live_url: TEXT
   - image_url: TEXT
   - featured: BOOLEAN DEFAULT FALSE
   - created_at: DATETIME DEFAULT CURRENT_TIMESTAMP
   - updated_at: DATETIME DEFAULT CURRENT_TIMESTAMP

2. **contact_submissions**
   - id: INTEGER PRIMARY KEY AUTOINCREMENT
   - name: TEXT NOT NULL
   - email: TEXT NOT NULL
   - subject: TEXT
   - message: TEXT NOT NULL
   - read: BOOLEAN DEFAULT FALSE
   - created_at: DATETIME DEFAULT CURRENT_TIMESTAMP

3. **admin_users**
   - id: INTEGER PRIMARY KEY AUTOINCREMENT
   - username: TEXT UNIQUE NOT NULL
   - password_hash: TEXT NOT NULL
   - created_at: DATETIME DEFAULT CURRENT_TIMESTAMP

4. **site_settings**
   - id: INTEGER PRIMARY KEY AUTOINCREMENT
   - key: TEXT UNIQUE NOT NULL
   - value: TEXT
   - updated_at: DATETIME DEFAULT CURRENT_TIMESTAMP

#### Relationships

- No foreign key relationships needed (simple, flat structure)
- All tables are independent for simplicity

### API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/` | Home page with intro and featured projects | None |
| GET | `/about` | About page with bio and skills | None |
| GET | `/projects` | Projects showcase page | None |
| GET | `/contact` | Contact form page | None |
| POST | `/contact` | Submit contact form | None |
| GET | `/admin` | Admin login page | None |
| POST | `/admin/login` | Admin authentication | None |
| GET | `/admin/dashboard` | Admin dashboard | Session |
| GET | `/admin/projects` | Manage projects | Session |
| POST | `/admin/projects` | Create new project | Session |
| PUT | `/admin/projects/{id}` | Update project | Session |
| DELETE | `/admin/projects/{id}` | Delete project | Session |
| GET | `/admin/messages` | View contact submissions | Session |
| POST | `/admin/messages/{id}/read` | Mark message as read | Session |

## 📱 User Interface Design

### Page Structure

1. **Home Page** (`/`)
   - **Hero Section**: Name, title, brief intro with photo
   - **Featured Projects**: 2-3 highlighted projects with images
   - **Skills Overview**: Programming languages and technologies
   - **Call to Action**: Links to projects and contact

2. **About Page** (`/about`)
   - **Personal Story**: Background, education, interests
   - **Skills Section**: Detailed technical skills with proficiency levels
   - **Timeline**: Education and project milestones
   - **Interests**: Hobbies and personal interests

3. **Projects Page** (`/projects`)
   - **Project Grid**: All projects with filtering by technology
   - **Project Cards**: Title, description, tech stack, links
   - **Search/Filter**: Find projects by technology or keyword
   - **Detailed View**: Modal or separate page for project details

4. **Contact Page** (`/contact`)
   - **Contact Form**: Name, email, subject, message
   - **Contact Information**: Email, social media links
   - **Response Message**: Confirmation after form submission
   - **Validation**: Client and server-side form validation

5. **Admin Dashboard** (`/admin`)
   - **Login Form**: Username/password authentication
   - **Project Management**: Add, edit, delete projects
   - **Message Inbox**: View and manage contact submissions
   - **Site Settings**: Update bio, skills, contact info

### Responsive Design Strategy

- **Mobile First**: Design for small screens, enhance for larger
- **Breakpoints**:
  - Mobile: 320px-768px
  - Tablet: 768px-1024px
  - Desktop: 1024px+
- **Navigation**: Hamburger menu on mobile, horizontal nav on desktop
- **Typography**: Readable font sizes across all devices
- **Images**: Responsive images with proper sizing

### Color Palette

- **Primary**: Blue (#3B82F6) - Professional, trustworthy
- **Secondary**: Slate (#64748B) - Neutral, readable
- **Accent**: Emerald (#10B981) - Success states, highlights
- **Background**: White (#FFFFFF) - Clean, minimal
- **Text**: Gray-900 (#1F2937) - High contrast readability

## 🚀 AI-Assisted Development Strategy

### Phase 1: Project Initialization (Day 1)

**AI Prompts**:

```text
"Create a Go web application project structure for a portfolio website with:
- Standard net/http routing
- SQLite database integration  
- HTML template system
- Static file serving
- Admin authentication
- Contact form functionality
- Vercel deployment configuration"
```

### Phase 2: Database Setup (Day 2)

**AI Prompts**:

```text
"Design SQLite database schema for a portfolio website with these entities:
- Projects with title, description, technologies, links, images
- Contact form submissions with name, email, message, read status
- Admin users with authentication
- Site settings for configurable content

Generate SQL CREATE statements and Go struct definitions."
```

### Phase 3: Backend Development (Day 3-4)

**AI Prompts**:

```text
"Implement Go HTTP handlers for a portfolio website:
- Home page with featured projects
- Projects listing with search/filter
- Contact form with email sending
- Admin authentication with sessions
- CRUD operations for projects
- REST API for HTMX interactions

Include proper error handling and validation."
```

### Phase 4: Frontend Templates (Day 5-6)

**AI Prompts**:

```text
"Create HTML templates for a portfolio website using Go templates:
- Responsive design with TailwindCSS
- Navigation component with mobile menu
- Project cards with hover effects
- Contact form with validation
- Admin interface for content management
- HTMX for dynamic updates without page refreshes

Include accessibility features and semantic HTML."
```

### Phase 5: HTMX Integration (Day 7-8)

**AI Prompts**:

```text
"Add HTMX functionality to the portfolio website for:
- Contact form submission without page refresh
- Admin project management (add/edit/delete)
- Dynamic project filtering
- Real-time form validation
- Loading states and user feedback

Maintain progressive enhancement and accessibility."
```

### Phase 6: Deployment (Day 9-10)

**AI Prompts**:

```text
"Prepare Go portfolio website for Vercel deployment:
- Configure vercel.json for Go serverless functions
- Set up environment variables for database and email
- Handle static file serving
- Configure custom domain
- Add HTTPS redirects and security headers
- Test deployment and troubleshoot issues"
```

## ✅ Success Criteria

### Technical Requirements

- [ ] **Functionality**: All features work without errors
- [ ] **Performance**: Pages load in under 2 seconds
- [ ] **Responsiveness**: Works on mobile, tablet, and desktop
- [ ] **Security**: Admin authentication and input validation
- [ ] **Database**: All CRUD operations function correctly
- [ ] **Email**: Contact form sends emails successfully
- [ ] **Deployment**: Site accessible at custom domain with HTTPS

### Code Quality Standards

- [ ] **Go Best Practices**: Follows standard Go conventions
- [ ] **Error Handling**: Comprehensive error checking and logging
- [ ] **Security**: SQL injection prevention, XSS protection
- [ ] **Performance**: Efficient database queries and caching
- [ ] **Maintainability**: Clean, readable, well-documented code
- [ ] **Testing**: Critical functions have unit tests

### User Experience Criteria

- [ ] **Navigation**: Intuitive menu and page structure
- [ ] **Content**: Professional presentation of skills and projects
- [ ] **Forms**: Easy to use with clear validation messages
- [ ] **Loading**: Fast page loads with loading indicators
- [ ] **Accessibility**: Screen reader friendly, keyboard navigation
- [ ] **Mobile**: Touch-friendly interface on mobile devices

### Learning Objectives Met

- [ ] **AI Collaboration**: Effective use of AI for all development phases
- [ ] **Code Understanding**: Student can explain all parts of the application
- [ ] **Problem Solving**: Independent debugging with AI assistance
- [ ] **Project Management**: Following structured development process
- [ ] **Documentation**: Clear documentation of learning journey
- [ ] **Portfolio Quality**: Professional result suitable for sharing

## 📊 Metrics and Analytics

### Performance Metrics

- **Page Load Time**: < 2 seconds on 3G connection
- **Lighthouse Score**: > 90 in all categories
- **Database Query Time**: < 100ms for most operations
- **Image Load Time**: Optimized images with proper sizing

### User Engagement (Future Enhancement)

- **Bounce Rate**: Track visitor engagement
- **Contact Form Conversion**: How many visitors send messages
- **Project Click-through**: Which projects get the most interest
- **Mobile vs Desktop Usage**: Optimize for primary platform

### Educational Metrics

- **Code Coverage**: Percentage of application covered by tests
- **AI Prompt Success Rate**: How often AI generates working code
- **Development Velocity**: Features completed per day
- **Bug Resolution Time**: How quickly issues are fixed

## 🔄 Future Enhancements

### Phase 2 Features (Optional Extensions)

- [ ] **Blog Section**: Write and publish articles
- [ ] **Theme Switcher**: Dark mode toggle
- [ ] **Analytics Dashboard**: Visitor statistics
- [ ] **SEO Optimization**: Meta tags, structured data
- [ ] **Performance Monitoring**: Real user metrics
- [ ] **Content Management**: Rich text editor for descriptions

### Advanced Features (Challenge Mode)

- [ ] **Multi-language Support**: Portfolio in multiple languages
- [ ] **API Integration**: GitHub repos, social media feeds
- [ ] **Search Engine**: Full-text search across projects
- [ ] **Commenting System**: Visitor feedback on projects
- [ ] **Newsletter Signup**: Email list for updates
- [ ] **Progressive Web App**: Offline functionality

### Technical Improvements

- [ ] **Caching Strategy**: Redis or in-memory caching
- [ ] **CDN Integration**: Image and asset optimization
- [ ] **Database Optimization**: Indexing and query optimization
- [ ] **Security Hardening**: Rate limiting, CSRF protection
- [ ] **Monitoring**: Application performance monitoring
- [ ] **CI/CD Pipeline**: Automated testing and deployment

---

**Ready to build?** This PRD will guide your AI-assisted development journey. Use it as a reference for all your prompts and decisions!
