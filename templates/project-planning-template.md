# Project Planning Template

## 📋 Project Information

**Project Name**: [Your Project Name]  
**Duration**: [X weeks]  
**Student Name**: [Your Name]  
**Start Date**: [Date]  
**Target Completion**: [Date]

## 🎯 Project Vision

### What are we building?

[Describe your project in 2-3 sentences. What problem does it solve? Who will use it?]

### Why this project?

[Explain why you chose this project and what you hope to learn]

### Success Definition

[How will you know the project is successful? What are the key outcomes?]

## 👥 User Stories

### Primary Users

[Who will use your application?]

### Core User Stories

Format: "As a [user type], I want [functionality] so that [benefit]"

- As a [user], I want [feature] so that [benefit]
- As a [user], I want [feature] so that [benefit]
- As a [user], I want [feature] so that [benefit]

### Nice-to-Have Features

- [Feature 1]
- [Feature 2]
- [Feature 3]

## 🏗️ Technical Architecture

### Technology Stack

- **Backend**: Go (version X.X)
- **Framework**: [net/http | Echo | Gin | Other]
- **Database**: [SQLite | PostgreSQL | Other]
- **Frontend**: [HTML/CSS | HTMX | Templates | Other]
- **Styling**: [TailwindCSS | CSS | Other]
- **Deployment**: [Vercel | Other]

### System Architecture

```text
[Create a simple diagram or description of your system components]

Frontend (Browser) 
    ↓ HTTP requests
Go Web Server
    ↓ Database queries
SQLite Database
```

### Database Design

#### Tables Needed

1. **[Table Name]**
   - Field 1: [type] - [description]
   - Field 2: [type] - [description]
   - Field 3: [type] - [description]

2. **[Table Name]**
   - Field 1: [type] - [description]
   - Field 2: [type] - [description]

#### Relationships

- [Table A] → [Table B] (one-to-many)
- [Table C] ↔ [Table D] (many-to-many)

### API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/[resource]` | List all [items] | None | JSON array |
| POST | `/api/[resource]` | Create new [item] | JSON object | Created item |
| PUT | `/api/[resource]/{id}` | Update [item] | JSON object | Updated item |
| DELETE | `/api/[resource]/{id}` | Delete [item] | None | Success message |

## 📱 User Interface Design

### Page Structure

1. **Home Page** (`/`)
   - Purpose: [Description]
   - Components: [List key UI elements]

2. **[Page Name]** (`/[route]`)
   - Purpose: [Description]
   - Components: [List key UI elements]

3. **[Page Name]** (`/[route]`)
   - Purpose: [Description]
   - Components: [List key UI elements]

### Wireframes

[Create simple sketches or descriptions of your UI layout]

```text
+------------------+
| Header           |
+------------------+
| Navigation       |
+------------------+
| Main Content     |
|                  |
|                  |
+------------------+
| Footer           |
+------------------+
```

## 🤖 AI Prompting Strategy

### Phase 1: Project Setup

**Goal**: Create initial project structure and configuration

**Key Prompts**:

```text
"Create a Go web application for [project description] with:
- [Technology stack]
- [Key features]
- Project structure with proper organization
- Basic configuration files"
```

### Phase 2: Database Implementation

**Goal**: Set up database schema and connections

**Key Prompts**:

```text
"Design SQLite database schema for [project] with:
- [List your tables and fields]
- Proper relationships and constraints
- Go structs for data models
- CRUD operations using database/sql"
```

### Phase 3: Backend Development

**Goal**: Implement API endpoints and business logic

**Key Prompts**:

```text
"Implement Go handlers for:
- [List your API endpoints]
- Input validation and error handling
- [Authentication if needed]
- Follow RESTful conventions"
```

### Phase 4: Frontend Development

**Goal**: Create user interface and interactions

**Key Prompts**:

```text
"Create HTML templates with:
- [Your page structure]
- Forms for user input
- [HTMX for dynamic updates if using]
- Responsive design with [styling approach]"
```

### Phase 5: Integration & Testing

**Goal**: Connect all components and ensure functionality

**Key Prompts**:

```text
"Help me integrate and test:
- Frontend-backend communication
- Database operations
- Error handling throughout the application
- Performance optimization"
```

### Phase 6: Deployment

**Goal**: Deploy to production environment

**Key Prompts**:

```text
"Prepare and deploy my Go application to Vercel:
- Configure vercel.json for Go functions
- Set up environment variables
- Test deployment and troubleshoot issues"
```

## 📅 Development Timeline

### Week 1: Foundation

- [ ] Complete project planning
- [ ] Set up development environment
- [ ] Create initial project structure
- [ ] Design and implement database schema
- [ ] Basic Go server with routing

**Daily Goals**:

- Day 1: Planning and setup
- Day 2: Database design and implementation
- Day 3: Basic server and routing
- Day 4: Test and refine foundation
- Day 5: Review and prepare for next phase

### Week 2: Core Features

- [ ] Implement main API endpoints
- [ ] Create basic frontend templates
- [ ] Connect frontend to backend
- [ ] Implement core user stories
- [ ] Basic testing and debugging

**Daily Goals**:

- Day 1: API endpoint development
- Day 2: Frontend template creation
- Day 3: Frontend-backend integration
- Day 4: Feature testing and debugging
- Day 5: Core functionality completion

### Week 3: Polish and Deploy

- [ ] Add advanced features
- [ ] Improve user interface
- [ ] Performance optimization
- [ ] Deploy to Vercel
- [ ] Final testing and documentation

**Daily Goals**:

- Day 1: Advanced feature implementation
- Day 2: UI/UX improvements
- Day 3: Performance optimization
- Day 4: Deployment and configuration
- Day 5: Final testing and project completion

## ✅ Success Checkpoints

### Technical Checkpoints

- [ ] All planned features are implemented
- [ ] Application runs without errors
- [ ] Database operations work correctly
- [ ] Frontend-backend integration is seamless
- [ ] Application is deployed and accessible online
- [ ] Performance is acceptable for expected usage

### Learning Checkpoints

- [ ] I understand how all parts of the application work
- [ ] I can explain the code to someone else
- [ ] I successfully used AI to solve development challenges
- [ ] I can troubleshoot and debug issues independently
- [ ] I documented my learning process and key insights

### Quality Checkpoints

- [ ] Code follows Go best practices
- [ ] Error handling is comprehensive
- [ ] Security considerations are addressed
- [ ] User experience is intuitive and responsive
- [ ] Application handles edge cases gracefully

## 📝 Learning Documentation

### Daily Log Template

**Date**: [Date]  
**Time Spent**: [Hours]  
**What I Worked On**: [Description]  
**AI Prompts Used**: [List effective prompts]  
**What I Learned**: [Key insights]  
**Challenges**: [Problems encountered]  
**Solutions**: [How issues were resolved]  
**Tomorrow's Goals**: [Next steps]

### Code Review Notes

**File**: [filename.go]  
**Purpose**: [What this code does]  
**Key Functions**: [Main functions and their purposes]  
**AI Assistance**: [How AI helped with this code]  
**Understanding Level**: [1-5 scale, with notes]

### Problem-Solving Log

**Problem**: [Description of the issue]  
**Attempted Solutions**: [What you tried]  
**AI Assistance**: [How AI helped solve it]  
**Final Solution**: [What worked]  
**Lessons Learned**: [Insights for future reference]

## 🎯 Extension Ideas

### If you finish early:

- [ ] Add user authentication and sessions
- [ ] Implement real-time features with WebSockets
- [ ] Add advanced search and filtering
- [ ] Create an admin dashboard
- [ ] Implement API rate limiting
- [ ] Add comprehensive logging and monitoring
- [ ] Create automated tests
- [ ] Optimize for mobile devices
- [ ] Add data export/import functionality
- [ ] Implement caching for better performance

### Advanced challenges:

- [ ] Microservices architecture
- [ ] Integration with third-party APIs
- [ ] Advanced security features
- [ ] Performance monitoring and optimization
- [ ] Continuous integration/deployment pipeline

## 📚 Resources and References

### Technical Documentation

- [Go Documentation](https://golang.org/doc/)
- [Database Documentation]
- [Framework Documentation]
- [Deployment Platform Documentation]

### Learning Resources

- [Relevant tutorials]
- [Community forums]
- [Stack Overflow discussions]
- [GitHub repositories for reference]

### AI Tools and Prompting Guides

- [GitHub Copilot best practices]
- [Effective prompting strategies]
- [AI debugging techniques]

---

**Project Status**: [Planning | In Progress | Testing | Deployed | Complete]  
**Last Updated**: [Date]  
**Next Review**: [Date]
