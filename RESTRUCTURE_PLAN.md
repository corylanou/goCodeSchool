# Go Code School: AI-Assisted Development Restructure Plan

## 🎯 Vision Statement

Transform from traditional exercise-based learning to **project-driven AI-assisted development** where students learn by building real applications through strategic planning and AI collaboration.

## 📊 Current State Analysis

### Competing Structure Issues

- **Legacy**: `01 - Getting Started/`, `02 - Hello World/`
- **Current**: `Module 1 - Go Fundamentals/`, `Module 2 - HTML & Web Fundamentals/`, `Module 3 - First Web Server/`
- **Missing**: Deployment workflows, AI-assisted coding practices, comprehensive planning docs

### Content Transformation Required

- Move from theory → exercises to projects → real applications
- Integrate AI prompting strategies throughout
- Add comprehensive planning documentation templates
- Include deployment and production workflows

## 🏗️ New Structure: Project-Driven Learning

### Core Learning Philosophy: "The Five-Skill Vibe Coding Framework"

1. **Strategic Thinking**: Plan before coding using PRDs and wireframes
2. **AI Collaboration**: Effective prompting and context management  
3. **Validation Checkpoints**: Testing and reviewing AI-generated code
4. **Debugging Mastery**: AI-assisted troubleshooting and optimization
5. **Context Management**: Maintaining project knowledge and documentation

## 📁 Proposed Directory Structure

```text
goCodeSchool/
├── 00-Setup/                          # Development environment + GitHub Copilot
├── 01-Portfolio-Project/              # Week 1-2: Personal website with Go backend
├── 02-Resume-Generator/               # Week 3: Dynamic resume with templating
├── 03-Contact-Manager/               # Week 4: CRUD app with SQLite
├── 04-Todo-App/                      # Week 5-6: Authentication + HTMX
├── 05-Blog-Platform/                 # Week 7-8: Content management system
├── 06-Product-Catalog/               # Week 9: E-commerce with advanced features
├── 07-Chat-App/                      # Week 10: Real-time communication
├── 08-Dashboard-Project/             # Week 11: API integration + data visualization
├── 09-Capstone-Project/              # Week 12: Student choice + deployment
├── templates/                        # Project templates and planning docs
│   ├── project-planning-template.md
│   ├── prd-template.md
│   ├── prompting-guide.md
│   └── deployment-checklist.md
└── resources/                        # Shared resources and references
```

## 🗂️ Project Structure Template

Each project directory contains:

```text
01-Portfolio-Project/
├── README.md                         # Project overview and learning objectives
├── planning/
│   ├── prd.md                       # Product Requirements Document
│   ├── wireframes/                  # UI mockups and flow diagrams
│   ├── technical-spec.md            # Architecture and database design
│   └── prompting-strategy.md        # AI prompting approaches for this project
├── stages/
│   ├── stage-1-setup.md            # Initial setup and basic structure
│   ├── stage-2-backend.md          # Backend API development
│   ├── stage-3-frontend.md         # Frontend and templating
│   ├── stage-4-features.md         # Advanced features and polish
│   └── stage-5-deployment.md       # Vercel deployment and optimization
├── examples/
│   ├── prompts.md                  # Successful prompts for each stage
│   ├── code-review.md              # AI-assisted code review examples
│   └── debugging.md                # Common issues and AI debugging approaches
└── final-project/                   # Student's completed work
```

## 🔄 Content Migration Strategy

### Phase 1: Preserve and Reorganize (Week 1)

1. **Consolidate Setup**: Merge `01 - Getting Started/` content into `00-Setup/`
2. **Archive Legacy**: Move old numbered chapters to `legacy/` directory
3. **Extract Reusable**: Pull Go fundamentals into `templates/go-basics.md`

### Phase 2: Create Project Templates (Week 2-3)

1. **Planning Templates**: Create PRD, wireframe, and technical specification templates
2. **Prompting Guides**: Develop AI prompting strategies for each project type
3. **Deployment Workflows**: Add comprehensive Vercel deployment documentation

### Phase 3: Build First Three Projects (Week 4-6)

1. **Portfolio Project**: Transform existing content into step-by-step project
2. **Resume Generator**: Create new project focusing on templating
3. **Contact Manager**: Database-focused project with CRUD operations

### Phase 4: Advanced Projects (Week 7-10)

1. **Todo App**: Authentication and session management
2. **Blog Platform**: Content management and admin features
3. **Product Catalog**: E-commerce functionality and advanced features

### Phase 5: Real-time and Integration (Week 11-12)

1. **Chat Application**: WebSockets and real-time features
2. **Dashboard Project**: API integration and data visualization
3. **Capstone Framework**: Student choice project structure

## 📝 Key Document Templates

### 1. Project Requirements Document (PRD) Template

```markdown
# Project Name

## Vision
What are we building and why?

## User Stories
- As a [user type], I want [functionality] so that [benefit]

## Technical Requirements
- Backend: Go with specific frameworks
- Frontend: HTML/CSS/HTMX approach
- Database: SQLite schema design
- Deployment: Vercel configuration

## Success Metrics
How will we know the project is successful?

## AI Prompting Strategy
Specific prompts for each development phase
```

### 2. Prompting Strategy Template

```markdown
# AI Prompting Guide for [Project Name]

## Setup Phase Prompts
"Create a Go web server using..."

## Database Design Prompts
"Design a SQLite schema for..."

## Feature Development Prompts
"Implement HTMX functionality for..."

## Debugging Prompts
"Help me troubleshoot this error..."

## Optimization Prompts
"Review this code for performance improvements..."
```

### 3. Stage-Based Learning Template

```markdown
# Stage X: [Feature Name]

## Learning Objectives
What will students master in this stage?

## Planning Phase
- [ ] Create wireframes for this feature
- [ ] Define API endpoints needed
- [ ] Plan database changes

## Implementation Phase
- [ ] Prompt AI for initial code structure
- [ ] Review and understand generated code
- [ ] Test and validate functionality
- [ ] Deploy and verify in production

## Validation Checkpoints
- Code review with AI assistance
- Manual testing scenarios
- Performance verification
```

## 🚀 Enhanced Deployment Strategy

### Missing: Comprehensive Vercel Integration

1. **Setup Documentation**: Complete Vercel account setup and configuration
2. **Go Serverless**: Vercel Functions for Go deployment
3. **Environment Management**: Production vs development configuration
4. **Domain Configuration**: Custom domain setup and SSL
5. **Monitoring**: Application performance and error tracking

### Project Deployment Progression

- **Projects 1-3**: Basic static deployment with Go backend
- **Projects 4-6**: Database integration and environment variables
- **Projects 7-9**: Advanced features, monitoring, and optimization

## 🎯 Learning Outcome Transformation

### From Traditional Approach

- Learn syntax → Complete exercises → Build simple examples

### To AI-Assisted Approach

- Plan projects → Collaborate with AI → Build real applications → Deploy to production

### New Assessment Methods

1. **Portfolio Review**: Students showcase deployed applications
2. **Planning Document Quality**: Evaluate PRDs and technical specifications
3. **AI Collaboration Skills**: Assess prompting effectiveness and code understanding
4. **Problem-Solving Process**: How students debug and iterate with AI assistance

## 📅 Implementation Timeline

### Week 1: Foundation Setup

- Remove legacy numbered chapters
- Create new directory structure
- Set up project templates

### Week 2-3: Content Development

- Develop first three project guides
- Create comprehensive prompting strategies
- Build deployment documentation

### Week 4-6: Beta Testing

- Run pilot projects with small group
- Gather feedback and iterate
- Refine prompting guides

### Week 7-8: Full Implementation

- Launch complete restructured curriculum
- Monitor student progress and engagement
- Continuous improvement based on feedback

## 🔧 Technical Requirements for Restructure

### Tools and Services

1. **GitHub Copilot**: Free student access setup documentation
2. **Vercel Account**: Free tier deployment guides
3. **AI Development Tools**: Cursor, Claude Code, or similar
4. **Monitoring**: Basic application performance tracking

### Documentation Standards

1. **Markdown Consistency**: Use consistent formatting across all documents
2. **Code Examples**: Every concept includes practical, tested examples
3. **Visual Aids**: Wireframes, diagrams, and screenshots for all projects
4. **Video Supplements**: Screen recordings of AI prompting sessions

## 📊 Success Metrics

### Student Engagement

- Time spent on projects vs traditional exercises
- Number of deployed applications created
- Quality of planning documents produced

### Learning Effectiveness

- Ability to effectively prompt AI for desired outcomes
- Code understanding and modification capabilities
- Problem-solving independence with AI assistance

### Industry Readiness

- Portfolio quality and completeness
- Real-world application deployment experience
- Modern development workflow familiarity

---

**Next Steps**: Begin Phase 1 content migration and create the first project template for immediate testing and feedback.
