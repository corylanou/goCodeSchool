# 01-Portfolio-Project: Your AI-Assisted Personal Website

## 🎯 Project Overview

Build a professional portfolio website using Go backend, HTMX frontend, and AI assistance throughout the development process. This project introduces you to the fundamentals of vibe coding - describing what you want and letting AI help you build it.

**Duration**: 2 weeks  
**Difficulty**: Beginner  
**AI Focus**: Project planning, code generation, and deployment

## 🏆 What You'll Build

A complete portfolio website featuring:

- **Home Page**: Professional introduction with your photo and skills
- **Projects Page**: Showcase of your work with dynamic content
- **About Page**: Your story, education, and experience
- **Contact Page**: Working contact form with email functionality
- **Admin Panel**: Add/edit projects without touching code
- **Responsive Design**: Looks great on all devices

**Live Demo**: Your site will be deployed to Vercel with a custom domain!

## 🎯 Learning Objectives

By completing this project, you'll master:

1. **AI Collaboration**: Effective prompting strategies for web development
2. **Go Web Development**: HTTP servers, routing, and templates
3. **Database Integration**: SQLite with CRUD operations
4. **Frontend Skills**: HTML, CSS, and HTMX for interactivity
5. **Deployment**: Professional hosting with Vercel
6. **Project Planning**: Using PRDs and wireframes for development

## 📋 Prerequisites

- ✅ Completed `00-Setup` module
- ✅ GitHub Copilot activated and working
- ✅ Basic familiarity with HTML/CSS (we'll AI-assist everything!)
- ✅ Willingness to learn through AI collaboration

## 🗂️ Project Structure

```text
01-Portfolio-Project/
├── planning/
│   ├── prd.md                    # Product Requirements Document
│   ├── wireframes/               # UI mockups
│   ├── database-design.md        # Schema planning
│   └── ai-prompts.md            # Successful prompts collection
├── stages/
│   ├── stage-1-setup.md         # Project initialization
│   ├── stage-2-backend.md       # Go server and database
│   ├── stage-3-frontend.md      # Templates and styling
│   ├── stage-4-features.md      # Advanced functionality
│   └── stage-5-deployment.md    # Vercel hosting
├── examples/
│   ├── successful-prompts.md    # AI prompts that worked well
│   ├── debugging-session.md     # How to debug with AI
│   └── code-review.md           # AI-assisted code improvements
└── final-project/               # Your completed website
    ├── main.go
    ├── handlers/
    ├── templates/
    ├── static/
    ├── database/
    └── vercel.json
```

## 🚀 Quick Start (10 Minutes)

### Test Your AI Setup

1. **Create Project Directory**:

```bash
cd ~/goCodeSchool
mkdir my-portfolio && cd my-portfolio
go mod init portfolio
code .
```

1. **AI-Assisted Hello World**:
In VS Code, create `main.go` and type this comment:

```go
// Create a Go web server that serves a simple portfolio homepage
// Include routes for /, /about, /projects, /contact
// Use html/template for rendering
// Add basic CSS styling
```

Let GitHub Copilot generate the code! You should see a complete web server suggestion.

1. **Test the Generation**:

```bash
go run main.go
# Visit http://localhost:8080
```

**Success?** Your AI is working! Continue to Stage 1.  
**Issues?** Check your Copilot setup in `00-Setup`.

## 📅 Development Timeline

### Week 1: Foundation and Backend

#### Day 1-2: Planning and Setup

- Complete Product Requirements Document (PRD)
- Create wireframes and database design
- Set up project structure with AI assistance

#### Day 3-4: Go Backend Development

- Build web server with routing
- Implement database models and CRUD operations
- Create API endpoints for dynamic content

#### Day 5: Integration Testing

- Test all backend functionality
- Debug with AI assistance
- Prepare for frontend development

### Week 2: Frontend and Deployment

#### Day 1-2: Template Development

- Create HTML templates with Go templating
- Implement responsive design with TailwindCSS
- Add HTMX for dynamic interactions

#### Day 3-4: Advanced Features

- Build admin panel for content management
- Add contact form with email functionality
- Implement project showcase with image uploads

#### Day 5: Deployment and Polish

- Deploy to Vercel
- Configure custom domain
- Final testing and optimization

## 🤖 AI Prompting Strategy

### Stage 1: Project Planning

```text
"Help me create a Product Requirements Document for a personal portfolio website. 
I need:
- Professional layout for a software developer
- Project showcase with descriptions and links
- Contact form functionality
- Admin panel for content management
- Modern, responsive design

Include user stories, technical requirements, and success metrics."
```

### Stage 2: Backend Development

```text
"Create a Go web application for a portfolio website with:
- Framework: standard net/http library
- Database: SQLite for simplicity
- Features: project management, contact form, admin auth
- Structure: clean separation of handlers, models, templates
- Security: basic authentication for admin panel

Generate the complete project structure with working code."
```

### Stage 3: Frontend Implementation

```text
"Design HTML templates for a portfolio website using Go templates:
- Modern, professional design
- Responsive layout (mobile-first)
- Navigation between sections
- Project cards with images
- Contact form with validation
- Use TailwindCSS for styling

Include HTMX for dynamic form submissions without page refreshes."
```

## ✅ Success Checkpoints

### Technical Milestones

- [ ] Web server runs locally without errors
- [ ] Database operations (create, read, update, delete) work
- [ ] All pages render correctly with proper styling
- [ ] Contact form sends emails successfully
- [ ] Admin panel allows content management
- [ ] Site is responsive on mobile and desktop
- [ ] Application deploys successfully to Vercel

### Learning Milestones

- [ ] I can explain how the Go web server works
- [ ] I understand the database schema and relationships
- [ ] I can modify templates to change the UI
- [ ] I successfully used AI to solve development challenges
- [ ] I can troubleshoot issues with AI assistance
- [ ] I documented my learning process thoroughly

### Portfolio Quality

- [ ] Site looks professional and polished
- [ ] Content showcases my skills effectively
- [ ] Performance is fast and responsive
- [ ] No broken links or missing images
- [ ] Contact form works reliably
- [ ] Site is accessible (screen readers, keyboard navigation)

## 🏗️ Tech Stack Deep Dive

### Backend: Go

- **Why Go?** Simple, powerful, great for web servers
- **Framework**: Standard `net/http` library (learn fundamentals first)
- **Database**: SQLite (no setup required, perfect for learning)
- **ORM**: Hand-written SQL (understand databases deeply)

### Frontend: HTMX + Templates

- **Why HTMX?** Modern interactivity without complex JavaScript
- **Templates**: Go's built-in `html/template` package
- **Styling**: TailwindCSS for rapid, responsive design
- **Icons**: Heroicons for consistent UI elements

### Deployment: Vercel

- **Why Vercel?** Free hosting, automatic HTTPS, Git integration
- **Serverless**: Go functions scale automatically
- **Custom Domain**: Professional web presence
- **Environment Variables**: Secure configuration

## 🎨 Design System

### Color Palette

- **Primary**: Modern blue (#3B82F6)
- **Secondary**: Slate gray (#64748B)
- **Accent**: Emerald green (#10B981)
- **Background**: Clean white (#FFFFFF)
- **Text**: Rich black (#1F2937)

### Typography

- **Headings**: Inter font family (clean, professional)
- **Body**: System fonts for performance
- **Code**: JetBrains Mono for code snippets

### Components

- **Cards**: Elevated with subtle shadows
- **Buttons**: Rounded corners, clear hierarchy
- **Forms**: Clean inputs with good labels
- **Navigation**: Simple, intuitive menu

## 📚 AI Learning Resources

### Effective Prompts

```text
"Explain this Go code to me like I'm a beginner:
[paste code here]

Break down:
- What each part does
- Why it's structured this way
- How I could modify it
- Best practices being followed"
```

### Debugging with AI

```text
"I'm getting this error in my Go portfolio project:
[paste error message]

Here's the relevant code:
[paste code context]

Help me:
1. Understand what's wrong
2. Fix the issue step by step
3. Prevent similar problems
4. Improve the code quality"
```

### Code Review

```text
"Review this Go code for my portfolio project:
[paste code]

Check for:
- Security vulnerabilities
- Performance improvements
- Go best practices
- Code readability
- Error handling
- Potential bugs"
```

## 🔗 External Resources

### Documentation

- [Go Web Programming Guide](https://golang.org/doc/articles/wiki/)
- [HTMX Documentation](https://htmx.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vercel Go Runtime](https://vercel.com/docs/functions/runtimes/go)

### Inspiration

- [Developer Portfolio Examples](https://github.com/topics/portfolio-website)
- [Go Web App Examples](https://github.com/golang/example)
- [HTMX Examples](https://htmx.org/examples/)

## 🎯 Extension Challenges

Finished early? Try these advanced features:

- [ ] **Blog Section**: Write and publish articles
- [ ] **Project Analytics**: Track visitor statistics
- [ ] **Theme Switcher**: Dark/light mode toggle
- [ ] **Multi-language Support**: Portfolio in multiple languages
- [ ] **API Integration**: GitHub repos, Twitter feed
- [ ] **Performance Optimization**: Caching, image optimization
- [ ] **SEO Enhancement**: Meta tags, structured data
- [ ] **Accessibility Audit**: Screen reader testing

---

**Ready to start building?** Head to `planning/prd.md` to create your project requirements with AI assistance!

## 🎬 Next Steps

1. **Read the Planning Documents**: Understand what you're building
2. **Follow the Stages**: Complete each stage before moving on
3. **Use AI Liberally**: Ask for help with every step
4. **Document Everything**: Track your learning journey
5. **Deploy Early**: Get your site online ASAP
6. **Iterate and Improve**: Keep enhancing your portfolio

**Remember**: This isn't just about coding - it's about learning to collaborate effectively with AI to build real applications!
