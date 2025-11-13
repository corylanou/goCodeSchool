# AI Prompt Library for Small Business Website Development

A comprehensive collection of AI prompts to assist you throughout the website development process, from client discovery through deployment.

---

## How to Use This Library

**Best Practices**:
- Copy prompts and customize with your specific details
- Replace [bracketed content] with real information
- Use Claude, ChatGPT, or similar AI tools
- Always review and verify AI outputs - they're assistants, not replacements for your judgment
- Combine multiple prompts for complex tasks
- Iterate on responses with follow-up questions

**Structure**: Prompts are organized by development phase and task type.

---

## Phase 1: Pre-Interview Research

### Research Client's Industry

```
I'm preparing to meet with a potential client who owns a [type of business, e.g., "family-owned Italian restaurant"] in [location]. They've been in business for [X years] and specialize in [their specialties].

Please help me prepare by:
1. Identifying common website needs for this industry
2. Listing 5-7 competitors I should research
3. Suggesting key features this type of business typically needs
4. Highlighting industry-specific challenges or regulations
5. Recommending 3 reference websites in this industry I should review

Research focus: [specific aspect, e.g., "online ordering," "reservation systems," "showcasing menu"]
```

### Generate Interview Questions

```
I'm conducting a discovery interview with a [industry] business. Their main services are [list services]. They want a website to [stated goal, e.g., "attract new customers and showcase their work"].

Generate 15 specific, open-ended questions I should ask during our interview, organized by these categories:
1. Business goals and success metrics (3 questions)
2. Target audience and customer journey (3 questions)
3. Content and features needed (4 questions)
4. Brand and design preferences (3 questions)
5. Technical requirements and constraints (2 questions)

Make the questions conversational and avoid technical jargon.
```

### Analyze Competitor Websites

```
I'm building a website for [client business name], a [industry] business in [location]. Please analyze these three competitor websites:

1. [URL 1]
2. [URL 2]
3. [URL 3]

For each site, identify:
- What works well (navigation, design, features, content)
- What could be improved
- Unique features or approaches
- Mobile responsiveness
- Call-to-action effectiveness

Then provide recommendations for how my client's site can differentiate itself and incorporate the best practices you've identified.
```

---

## Phase 2: Post-Interview Analysis

### Analyze Interview Notes

```
I just completed a client discovery interview. Here are my raw notes:

[PASTE YOUR NOTES HERE]

Please help me:
1. Identify any critical information that's missing or unclear
2. Extract the 3-5 primary project goals with measurable outcomes
3. Summarize the target audience profile
4. List technical requirements and integrations mentioned
5. Flag any potential red flags or project risks (scope creep, unrealistic expectations, timeline issues)
6. Suggest follow-up questions I should ask to clarify any ambiguities

Format your response as a structured analysis with clear sections.
```

### Create Project Brief

```
Based on this client interview information:

**Business**: [name and industry]
**Services**: [main services/products]
**Goals**: [stated goals]
**Target Audience**: [demographics and characteristics]
**Features Requested**: [list features]
**Timeline**: [launch date]
**Budget**: [budget if mentioned]

Create a professional 1-2 page project brief that includes:
1. Client overview (2-3 sentences)
2. Project goals (3-5 specific, measurable objectives)
3. Proposed site structure (list of pages)
4. Key features (prioritized)
5. Design direction (style keywords)
6. Timeline with milestones
7. Deliverables
8. What's explicitly out of scope

Write in professional but accessible language suitable for client review.
```

### Identify Requirements Gaps

```
Here's the information I've collected so far for a [industry] website project:

**Collected**:
[List what you have]

**Missing**:
[List what you know you're missing]

**Project scope**: [3-5 page website, contact form, mobile-responsive, SEO-optimized]

Please:
1. Identify additional critical information I haven't collected yet
2. Prioritize the missing items (must-have vs nice-to-have)
3. Draft an email requesting the missing information from the client
4. Suggest contingency plans if the client can't provide certain items (e.g., stock photos vs custom photography)
```

---

## Phase 3: Content Strategy

### Generate Page Structure

```
I'm building a website for a [industry] business that offers [services/products]. Their goals are to [stated goals] and their target customers are [audience description].

Recommend:
1. Optimal page structure (3-5 main pages)
2. For each page:
   - Purpose and key message
   - Essential content sections
   - Recommended length (word count)
   - Primary call-to-action
3. Navigation structure (main nav vs footer nav)
4. Any additional pages that might be beneficial

Consider SEO, user experience, and conversion optimization in your recommendations.
```

### Write Meta Descriptions

```
Generate SEO-optimized meta descriptions (150-160 characters each) for these pages on a [industry] website:

**Business**: [name]
**Location**: [city, state]
**Main Services**: [services]
**Unique Value**: [what makes them different]

Pages needing meta descriptions:
1. Homepage
2. About Us
3. [Service 1]
4. [Service 2]
5. Contact

For each, include relevant keywords naturally and create compelling copy that encourages clicks from search results.
```

### Create Content Outline

```
Create a detailed content outline for the [page name, e.g., "Services"] page of a [industry] website.

**Context**:
- Business: [name and description]
- Target audience: [audience description]
- Page goal: [e.g., "educate visitors about services and drive contact form submissions"]
- Key services: [list 3-4 services]

**Outline should include**:
1. Page headline and subheadline
2. Introduction paragraph (suggest key points)
3. Service sections (structure for each)
4. Trust indicators section (testimonials, certifications, etc.)
5. FAQ section (suggest 5 common questions)
6. Call-to-action section
7. Suggested word count for each section

Format as an actionable template the client can fill in.
```

### Generate Homepage Copy

```
Write compelling homepage copy for a [industry] business with these characteristics:

**Business**: [name]
**Tagline/Positioning**: [one sentence]
**Services**: [main services]
**Target Customer**: [description]
**What Makes Them Different**: [unique value proposition]
**Tone**: [professional, friendly, modern, traditional, etc.]

**Please write**:
1. Hero headline (8-12 words, attention-grabbing)
2. Hero subheadline (15-25 words, explains what they do)
3. Three value propositions (headline + 2-3 sentences each)
4. Call-to-action copy (button text + supporting sentence)
5. About section teaser (2-3 sentences)
6. Closing call-to-action copy

Keep all copy concise, benefit-focused, and action-oriented.
```

---

## Phase 4: Design & Development

### Generate Color Palette

```
Suggest a professional color palette for a [industry] website with this brand personality: [adjectives, e.g., "trustworthy, modern, approachable"].

**Context**:
- Industry: [industry]
- Existing brand colors (if any): [colors]
- Target audience: [demographic]
- Competitors use: [common competitor colors]

Provide:
1. Primary color (with HEX code and reasoning)
2. Secondary color (with HEX code and reasoning)
3. Accent color (with HEX code and reasoning)
4. Background color (with HEX code)
5. Text color (with HEX code)
6. Tailwind CSS configuration snippet I can use
7. Accessibility notes (ensure WCAG AA contrast ratios)

Explain the psychological reasoning behind each color choice for this industry.
```

### Create Templ Component

```
I'm building a [component name, e.g., "testimonial card"] component in Templ for a Go-based website using Tailwind CSS.

**Requirements**:
- Display: [what it should show, e.g., "customer quote, name, title, and photo"]
- Style: [design approach, e.g., "modern, with subtle shadow, rounded corners"]
- Responsive: [mobile behavior]
- Props needed: [list the data it needs]

Generate:
1. The Templ component code
2. Example usage
3. Tailwind classes explanation
4. Any accessibility considerations (ARIA labels, etc.)

Make it follow Go and Templ best practices.
```

### Debug CSS Issues

```
I'm having a CSS layout issue on my [describe page/component, e.g., "navigation menu"].

**Problem**: [describe issue, e.g., "mobile menu doesn't close when clicking outside"]

**Current code**:
```
[PASTE YOUR RELEVANT CODE HERE]
```

**What I've tried**:
- [attempt 1]
- [attempt 2]

Please:
1. Identify the likely cause
2. Provide corrected code
3. Explain why the original wasn't working
4. Suggest any additional improvements
```

### Generate Responsive Breakpoints

```
I'm designing a [section name, e.g., "services grid"] that needs to be responsive across all devices.

**Desktop (1024px+)**: [describe layout, e.g., "3 columns"]
**Tablet (768-1023px)**: [describe layout, e.g., "2 columns"]
**Mobile (<768px)**: [describe layout, e.g., "1 column"]

Generate Tailwind CSS classes that:
1. Implement these breakpoints
2. Maintain proper spacing at each size
3. Consider touch targets on mobile
4. Include any responsive typography adjustments

Provide the complete class string and explanation.
```

---

## Phase 5: SEO & Content Optimization

### Generate Title Tags

```
Create SEO-optimized title tags (50-60 characters each) for a [industry] website in [location].

**Business**: [name]
**Primary keyword**: [main keyword]
**Secondary keywords**: [2-3 keywords]

Generate title tags for:
1. Homepage
2. About page
3. [Service 1] page
4. [Service 2] page
5. Contact page

For each title:
- Include primary keyword naturally
- Keep under 60 characters
- Make compelling for click-through
- Follow format that works for this industry
- Include location if relevant for local SEO
```

### Create Open Graph Tags

```
Generate complete Open Graph meta tags for the [page name] page of a [industry] website.

**Page details**:
- URL: [full URL]
- Title: [page title]
- Description: [page description]
- Image: [image file name or description]
- Type: [website, article, etc.]

Generate:
1. All essential OG tags (og:title, og:description, og:image, og:url, og:type)
2. Twitter Card tags
3. Any industry-specific schema markup that would be beneficial
4. Image dimension recommendations

Format as ready-to-use HTML meta tags.
```

### Write Alt Text for Images

```
Generate descriptive alt text for these images on a [industry] website:

1. [Image 1 description: e.g., "team photo showing 5 people in office"]
2. [Image 2 description: e.g., "close-up of finished product"]
3. [Image 3 description: e.g., "storefront exterior"]
4. [Image 4 description: e.g., "customer using service"]

For each, provide:
- Concise, descriptive alt text (under 125 characters)
- Including relevant keywords naturally
- Focusing on what's important in the image
- Context for why this image is on the page

Consider both SEO and accessibility best practices.
```

### Optimize Page Speed

```
I ran Google PageSpeed Insights on my website and got these issues:

**Performance Score**: [score]
**Main Issues**:
- [issue 1]
- [issue 2]
- [issue 3]

**Tech Stack**: Go + Echo + Templ + Tailwind CSS, hosted on Vercel

**Current approach**:
[Describe how you're currently handling images, CSS, etc.]

Provide:
1. Specific fixes for each issue
2. Code examples where applicable
3. Estimated impact of each fix
4. Priority order for implementation
5. Any Vercel-specific optimizations I should implement
```

---

## Phase 6: Forms & Interactions

### Implement Contact Form Logic

```
I need to implement a contact form submission handler in Go using Echo framework with these requirements:

**Form fields**:
- Name (required)
- Email (required, validated)
- Phone (optional)
- Message (required)

**Security**:
- Honeypot field for spam prevention
- Google reCAPTCHA v3 (I have keys)
- Rate limiting

**Email delivery**:
- Use Brevo API
- Send to: [email]
- Include form submission details

Generate:
1. Go handler function with all validation
2. reCAPTCHA v3 verification code
3. Brevo API integration
4. Error handling
5. Success response
6. Example curl command for testing

Include comments explaining each section.
```

### Create Form Validation

```
I need client-side form validation for a contact form with these fields:

- Name (required, min 2 characters)
- Email (required, valid email format)
- Phone (optional, valid US phone format)
- Message (required, min 10 characters, max 500 characters)

Generate:
1. JavaScript validation function
2. Real-time validation (on blur)
3. Display error messages inline
4. Accessible error announcements (ARIA live regions)
5. Prevent submission if invalid
6. Clear, user-friendly error messages

Use vanilla JavaScript (no jQuery) and consider mobile users.
```

### HTMX Integration

```
I want to convert my contact form to submit via HTMX instead of full page reload.

**Current setup**:
- Go + Echo backend
- Standard HTML form
- POST to /contact endpoint

**Desired behavior**:
- Submit via HTMX (no page reload)
- Show loading spinner during submission
- Display success message in green box
- Display errors in red box
- Clear form on success
- Keep form data if error

Generate:
1. Updated Templ form template with HTMX attributes
2. Updated Go handler to return appropriate responses
3. CSS for loading, success, and error states
4. Any additional HTMX configuration needed
```

---

## Phase 7: Testing & Quality Assurance

### Create Testing Checklist

```
Generate a comprehensive testing checklist for a [industry] small business website before launch.

**Tech stack**: Go + Echo + Templ + HTMX + Tailwind CSS
**Pages**: [list pages]
**Key features**: [contact form, mobile responsive, SEO, etc.]
**Target browsers**: Chrome, Safari, Firefox, Edge
**Devices**: Desktop, tablet, mobile

Organize checklist by:
1. Functionality testing
2. Design/UI testing
3. Content review
4. Browser/device testing
5. Performance testing
6. SEO checklist
7. Accessibility checklist
8. Security checklist

Make it actionable with clear pass/fail criteria.
```

### Accessibility Audit

```
Review this code for WCAG 2.1 Level AA accessibility compliance:

```
[PASTE CODE HERE - navigation, form, or component]
```

Identify:
1. Accessibility violations (critical, moderate, minor)
2. Specific WCAG criteria that are violated
3. Code fixes for each issue
4. Additional accessibility enhancements beyond compliance
5. Testing tools I should use to verify

Prioritize issues that affect screen reader users and keyboard navigation.
```

### Debug Production Issue

```
I deployed my site to Vercel and I'm experiencing this issue:

**Problem**: [describe issue]
**Expected behavior**: [what should happen]
**Actual behavior**: [what's happening]
**Environment**: Production on Vercel
**Browser**: [browser and version]
**Console errors**: [paste any errors]

**What works in development**:
[What works locally]

Relevant code:
```
[PASTE RELEVANT CODE]
```

Help me:
1. Identify the likely cause (development vs production differences)
2. Suggest debugging steps
3. Provide a fix
4. Explain how to prevent this in the future
```

---

## Phase 8: Deployment & Launch

### Create Pre-Launch Checklist

```
Generate a comprehensive pre-launch checklist for deploying a small business website to Vercel.

**Project details**:
- [Industry] website
- Custom domain: [domain]
- Features: [list key features]
- Integrations: Brevo email, reCAPTCHA

**Checklist should cover**:
1. Code review and testing
2. Content review
3. SEO configuration
4. Environment variables setup
5. Domain and DNS configuration
6. Email and form testing
7. Analytics setup
8. Performance optimization
9. Security checks
10. Backup and recovery plan

Make each item specific and actionable with clear completion criteria.
```

### Write Deployment Documentation

```
Create deployment documentation for this website that a client or future developer could follow.

**Tech stack**: Go + Echo + Templ + HTMX + Tailwind CSS
**Hosting**: Vercel
**Domain registrar**: [registrar name]
**Email provider**: Brevo
**Analytics**: Google Analytics

**Documentation should include**:
1. Local development setup
2. Environment variables needed
3. Build process
4. Deployment steps to Vercel
5. Domain configuration instructions
6. How to update content
7. How to monitor and troubleshoot
8. Contact information for services

Write clearly for someone with basic technical knowledge.
```

### Generate DNS Instructions

```
Create step-by-step instructions for connecting a domain from [registrar name] to Vercel hosting.

**Domain**: [domain name]
**Registrar**: [registrar]
**Hosting**: Vercel

**Instructions should include**:
1. Logging into [registrar] account
2. Finding DNS settings (with screenshots description)
3. Adding required DNS records
4. Verification steps
5. Expected propagation time
6. How to verify it's working
7. Troubleshooting common issues

Write for a non-technical small business owner with screenshots descriptions.
```

---

## Phase 9: Client Communication

### Draft Client Email Updates

```
Draft a professional email to send to my client updating them on project progress.

**Project**: [client name] website
**Phase**: [current phase, e.g., "design mockups complete"]
**Completed this week**:
- [task 1]
- [task 2]
- [task 3]

**Next steps**:
- [next task 1]
- [next task 2]

**Need from client**:
- [item needed]

**Blockers**: [any issues]

**Timeline**: [status on schedule/behind/ahead]

Write in a professional but friendly tone. Include:
1. Progress summary
2. Link or way to view progress
3. What I need from them with deadline
4. Next steps and timeline
5. Invitation for questions/feedback
```

### Explain Technical Concepts

```
Help me explain [technical concept, e.g., "DNS propagation," "SSL certificates," "responsive design"] to a non-technical client.

**Context**: [why you need to explain this]
**Client background**: [their level of tech knowledge]

Provide:
1. Simple explanation using everyday analogies
2. Why it matters for their website
3. What they need to do (if anything)
4. Timeline or process
5. Address common concerns

Write as if speaking directly to the client, friendly and reassuring.
```

### Create Client Training Guide

```
Create a simple training guide for a client to manage basic website updates.

**Website platform**: [your setup]
**Client's role**: [what they'll be updating]
**Technical level**: [beginner, intermediate]

**Topics to cover**:
1. How to update [specific content]
2. How to add [specific feature, e.g., "new blog post"]
3. How to access and read analytics
4. What NOT to touch
5. When to contact me for help

Format as a step-by-step guide with descriptions of screenshots. Keep language simple and encouraging.
```

---

## Phase 10: Portfolio & Marketing

### Write Project Case Study

```
Create a portfolio case study for this website project:

**Client**: [industry and brief description, anonymized if needed]
**Challenge**: [what problem were you solving]
**Process**: [brief project overview]
**Solution**: [what you built]
**Results**: [measurable outcomes if available]
**Tech stack**: [technologies used]

Write in a way that:
1. Demonstrates your problem-solving approach
2. Shows results and impact
3. Highlights technical skills
4. Tells a compelling story
5. Follows this structure: Challenge → Process → Solution → Results

Target audience: Future clients and employers.
```

### Create Social Media Posts

```
Create 3 LinkedIn posts announcing the launch of a new website I built.

**Project details**:
- Client: [industry]
- Key features: [main features]
- My role: [what you did]
- Results: [any metrics]

For each post, create:
1. Engaging hook (first line)
2. Project description (2-3 paragraphs)
3. Key lessons learned or challenges overcome
4. Relevant hashtags
5. Call-to-action

Vary the angle for each post (technical focus, business impact, learning journey).
```

### Request Testimonial

```
Draft an email requesting a testimonial from my client for this completed website project.

**Client**: [name]
**Project**: [brief description]
**Result**: [how it helped their business]
**Relationship**: [your working relationship quality]

The email should:
1. Thank them for working with you
2. Explain why testimonials matter
3. Make it easy (provide specific questions they can answer)
4. Offer to draft it for them to edit
5. Respect their time

Include 3-5 specific questions about:
- Their experience working with you
- The website's impact on their business
- What they appreciated most
- Would they recommend you
```

---

## Advanced Prompts

### Refactor Code for Best Practices

```
Review and refactor this [language] code following best practices:

```
[PASTE CODE]
```

**Context**: [what this code does]
**Framework**: [framework/libraries used]

Please:
1. Identify code smells and anti-patterns
2. Suggest improvements for readability
3. Optimize for performance
4. Improve error handling
5. Add appropriate comments
6. Ensure security best practices
7. Make it more maintainable

Provide the refactored code with explanations for changes.
```

### Generate Test Cases

```
Generate test cases for this [component/function]:

```
[PASTE CODE]
```

Create:
1. Unit tests (if applicable)
2. Integration tests
3. Edge cases to test
4. Error scenarios
5. Test data needed

Use [testing framework, e.g., "Go testing package," "Jest"] and include:
- Test descriptions
- Setup/teardown code
- Assertions
- Mock data

Aim for comprehensive test coverage.
```

### Architecture Review

```
Review the architecture of my small business website project and suggest improvements.

**Current structure**:
```
[DESCRIBE YOUR PROJECT STRUCTURE]
```

**Tech stack**: Go + Echo + Templ + HTMX + Tailwind CSS
**Scale**: [size and traffic expectations]
**Pain points**: [any current issues]

Evaluate:
1. Project organization and file structure
2. Separation of concerns
3. Scalability considerations
4. Maintainability
5. Security architecture
6. Testing strategy

Provide specific recommendations for improvement with reasoning.
```

---

## Tips for Effective AI Prompting

### The Better the Input, the Better the Output

**❌ Vague Prompt**:
"Help me with my website"

**✅ Specific Prompt**:
"I need to implement a contact form with spam prevention for a Go-based website using Echo framework and Brevo for email delivery. The form should have name, email, and message fields with validation."

### Provide Context

Always include:
- What you're building
- Your tech stack
- What you've tried (if debugging)
- Your constraints (budget, timeline, skill level)
- Your goal

### Iterate and Refine

**First prompt**: Get general solution
**Follow-up 1**: "Can you make this more accessible?"
**Follow-up 2**: "Now optimize it for performance"
**Follow-up 3**: "Add error handling"

### Combine Prompts

Use multiple prompts together:
1. Generate initial code
2. Review for best practices
3. Add accessibility features
4. Create documentation
5. Generate tests

### Always Review AI Output

**AI is a tool, not a replacement for your judgment**:
- Verify technical accuracy
- Test all code before using
- Check for security issues
- Ensure it matches your project's needs
- Customize to your specific situation

---

**Remember**: These prompts are starting points. Customize them for your specific project, iterate based on responses, and always apply your own judgment and expertise to AI-generated content.
