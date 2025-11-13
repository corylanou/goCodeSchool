# Small Business Website - Complete Lesson Plans

**Course**: Building Modern Small Business Websites
**Duration**: 14-21 class periods (45-60 minutes each)
**Target Audience**: High school students with basic programming knowledge
**Prerequisites**: Basic HTML/CSS understanding, comfortable with command line

---

# Lesson Plan 1: Client Discovery

**Module Reference**: Module 1: Client Discovery
**Duration**: 2-3 class periods
**Learning Objectives**:
- Conduct professional client discovery interviews
- Gather comprehensive project requirements
- Educate non-technical clients about web basics
- Create project brief and scope document

## Materials Needed

**For Students**:
- Computer with internet access
- Note-taking materials (digital or paper)
- Access to `resources/client-interview-questionnaire.md`
- Access to `resources/requirements-checklist.md`
- Access to `resources/domain-dns-guide.md`

**For Teacher**:
- Projector/screen for demonstrations
- Example project briefs
- Sample client scenarios
- Printed questionnaire templates (optional)

## Class Period 1: Introduction to Client Discovery (45-60 min)

### Opening (10 min)
- **Hook**: Show examples of good vs. bad small business websites
- **Discussion**: "What makes a good small business website?"
- **Real-world connection**: Share stat that 60%+ of web projects fail due to poor requirements gathering

### Direct Instruction (15 min)
- **Topic**: Client interview techniques
- **Content**:
  - Importance of discovery phase
  - Open-ended vs. closed questions
  - Active listening techniques
  - Common pitfalls (jumping to solutions, unclear requirements)
- **Demo**: Model a short client interview with student volunteer

### Guided Practice (15 min)
- **Activity**: Analyze sample interview transcripts
- **Task**: Identify good and bad questions
- **Discussion**: What information is missing? What questions would you ask?

### Homework Assignment
- Read Module 1 (Part 1-2)
- Prepare 5 questions for tomorrow's mock interview
- Find a potential real-world client (family business, local shop, etc.)

### Assessment
- Formative: Question quality during discussion
- Exit ticket: Write one open-ended question for each category (goals, audience, content)

## Class Period 2: Mock Client Interviews (45-60 min)

### Warm-up (5 min)
- Review: What are the key sections of a client interview?
- Quick poll: Who found a potential real client?

### Activity Setup (5 min)
- **Pair students**: One "developer", one "client"
- **Distribute**: Client scenarios (teacher-prepared business descriptions)
- **Time limit**: 15 minutes per interview, then switch

### Mock Interviews (30 min)
- **Round 1** (15 min): First interview
- **Switch** (2 min): Roles reverse
- **Round 2** (15 min): Second interview

**Teacher Role**: Circulate, observe, provide real-time feedback

### Debrief (15 min)
- **Whole class discussion**:
  - What went well?
  - What was challenging?
  - What questions did you forget to ask?
  - How did active listening help?
- **Share out**: Best questions discovered

### Homework Assignment
- Complete Exercise 2: Create project brief from interview notes
- Review `resources/requirements-checklist.md`
- Contact your real client to schedule discovery interview

### Assessment
- Formative: Observation during mock interviews
- Summative: Project brief quality (rubric provided)

## Class Period 3: Domain Education & Project Planning (45-60 min)

### Opening Activity (10 min)
- **Think-Pair-Share**: "Explain DNS to someone who's never heard of it"
- **Gallery walk**: Review student project briefs (posted anonymously)

### Direct Instruction (20 min)
- **Topic**: Domain, DNS, and hosting education
- **Content**:
  - What is a domain? (using analogies from guide)
  - What is hosting?
  - How DNS works (library/GPS analogies)
  - Nameservers, A records, CNAME records
- **Visual aids**: Draw diagrams on board/screen
- **Practice**: Use `resources/domain-dns-guide.md` as reference

### Practice Activity (15 min)
- **Exercise 3**: Domain research for real client
- **Task**:
  - Check domain availability
  - Research 3-5 options
  - Prepare recommendation with reasoning
- **Tool**: Namecheap or similar

### Wrap-up & Planning (10 min)
- **Discussion**: Red flags in client relationships
- **Review**: Module 1 assessment checklist
- **Preview**: Next module - we'll set up our development environment

### Homework Assignment
- Conduct real client discovery interview (use questionnaire)
- Complete requirements checklist
- Submit project brief for review
- Be ready to share client project next class

### Assessment
- Summative: Complete project brief with client information
- Participation: Domain research and recommendation
- Self-assessment: Module 1 checklist completion

## Discussion Prompts

**For Mock Interviews**:
- "Why is it important to understand the client's goals before discussing features?"
- "How do you handle a client who wants 'everything'?"
- "What would you do if a client has unrealistic expectations?"

**For Domain/DNS**:
- "Why might a client want to keep their domain and hosting separate?"
- "What could go wrong if nameservers are configured incorrectly?"
- "How would you explain DNS propagation delays to an impatient client?"

## Differentiation

**For Advanced Students**:
- Research and present on additional DNS record types (MX, TXT)
- Create a visual guide explaining DNS for clients
- Interview a real business owner

**For Struggling Students**:
- Provide sentence starters for interview questions
- Use fill-in-the-blank project brief template
- Pair with stronger partner for mock interview

**For English Language Learners**:
- Provide glossary of technical terms
- Allow extra time for interviews
- Offer visual analogies for DNS concepts

## Resources
- Module 1 guide
- `resources/client-interview-questionnaire.md`
- `resources/requirements-checklist.md`
- `resources/domain-dns-guide.md`
- Sample project briefs (teacher-created)

---

# Lesson Plan 2: Setup & Architecture

**Module Reference**: Module 2: Setup & Architecture
**Duration**: 2-3 class periods
**Learning Objectives**:
- Install and configure development tools
- Understand project architecture
- Run starter template locally
- Use Git for version control
- Begin AI-assisted coding

## Materials Needed

**For Students**:
- Computer with admin privileges
- Internet connection
- GitHub account
- Code editor (VS Code recommended)

**For Teacher**:
- Projector for live coding demos
- Pre-configured VM or demo environment
- Troubleshooting FAQ sheet
- Backup installation files (if network issues)

## Class Period 1: Tool Installation (45-60 min)

### Pre-class Setup (Teacher)
- Test all installation links
- Prepare troubleshooting guide
- Have USB drives with installers (backup)

### Opening (5 min)
- **Show**: Final product - a fully functional website
- **Roadmap**: Overview of the tech stack
- **Motivation**: Why these particular technologies?

### Installation Lab (40 min)
- **Follow Module 2 Part 1**: Development Environment Setup
- **Install in order**:
  1. Go (10 min)
  2. Node.js (5 min)
  3. Git (5 min)
  4. VS Code + Extensions (10 min)
  5. Verification script (5 min)

**Teacher Role**:
- Circulate and help with issues
- Have common solutions ready
- Use student helpers for peer support

### Verification & Troubleshooting (10 min)
- **Each student runs**: Verification script from Module 2
- **Document issues**: Create class troubleshooting list
- **Resolve**: Common problems together

### Wrap-up (5 min)
- **Check**: Who has everything installed?
- **Homework**: Read Module 2 Part 2 (Understanding the Architecture)

### Assessment
- Practical: Successful installation (verified via screenshot)
- Participation: Helping peers troubleshoot

## Class Period 2: Running the Starter Template (45-60 min)

### Review (5 min)
- Quick quiz: Match each tool to its purpose (Go, Node, Git, Templ)

### Project Setup (20 min)
- **Follow Module 2 Part 3**: Getting the Template Running
- **Steps**:
  1. Copy starter template (5 min)
  2. Install dependencies `make install` (5 min)
  3. Set up `.env` file (5 min)
  4. Start dev server `make dev` (5 min)

**Checkpoint**: Everyone should see site at localhost:7331

### Live Coding Demo (15 min)
- **Teacher demonstrates**:
  1. Change homepage headline
  2. Save file
  3. Watch browser auto-refresh
  4. Explain hot reload concept
- **Students follow along**

### Exploration Activity (15 min)
- **Exercise 2**: Code Exploration
- **Task**: Trace request flow from browser → handler → template
- **Work in pairs**: One navigates code, one documents flow

### Wrap-up (5 min)
- **Share out**: What did you discover?
- **Preview**: Next class - Git basics

### Assessment
- Practical: Screenshot of running local site
- Understanding: Request flow diagram

## Class Period 3: Git & First Customization (45-60 min)

### Git Basics Instruction (15 min)
- **Why Git?**: Version control importance
- **Key concepts**:
  - Repository
  - Commit
  - Push/Pull
  - Branch
- **Demo**: Create repo, make commit, push to GitHub

### Hands-on Git Practice (20 min)
- **Follow Module 2 Part 5**: Git and Version Control
- **Students**:
  1. Initialize Git repo
  2. Make first commit
  3. Create GitHub repo
  4. Push code
  5. Make a change
  6. Commit and push again

### First Customization (15 min)
- **Exercise 3**: Make Your First Change
- **Tasks**:
  - Update `.env` with client business name
  - Change homepage headline
  - Update brand color in tailwind.config.js
  - Git commit with good message

### Show & Tell (10 min)
- **Volunteers share**: Show customized homepages
- **Discuss**: Commit message best practices

### Assessment
- Practical: GitHub repo with multiple commits
- Quality: Commit message clarity

## Discussion Prompts

**Architecture**:
- "Why separate concerns into different directories (handlers, models, views)?"
- "What advantages does server-side rendering have over client-side?"
- "How does the development workflow differ from just editing HTML files?"

**Git**:
- "Why commit frequently instead of once at the end?"
- "What problems can arise without version control?"
- "How does Git help when working on client projects?"

## Differentiation

**For Advanced Students**:
- Set up GitHub Actions for automated tests
- Explore Echo middleware in depth
- Create custom Makefile commands

**For Struggling Students**:
- Provide step-by-step installation checklist with screenshots
- Pair with tech-savvy partner
- Focus on getting one thing working well before moving on

**For Different OS**:
- Prepare OS-specific installation guides
- Have test machines for Mac/Windows/Linux if possible

## Common Issues & Solutions

**Port already in use**:
- Change PORT in `.env`
- Show how to kill process

**Go/Node not in PATH**:
- Help add to system PATH
- Provide shell config snippets

**Permission errors**:
- Use sudo (cautiously)
- Check file permissions

**Template not updating**:
- Hard refresh browser
- Restart dev server
- Check for Templ syntax errors

## Resources
- Module 2 guide
- Installation troubleshooting sheet
- Git cheat sheet
- VS Code shortcuts guide

---

# Lesson Plan 3: Design Foundation

**Module Reference**: Module 3: Design Foundation
**Duration**: 2-3 class periods
**Learning Objectives**:
- Apply mobile-first responsive design
- Master Tailwind CSS utility classes
- Implement accessibility standards
- Apply client branding consistently

## Materials Needed

**For Students**:
- Development environment from Module 2
- Access to color palette generator (uicolors.app)
- WebAIM Contrast Checker
- WAVE accessibility tool
- Sample client branding info

**For Teacher**:
- Examples of good/bad responsive design
- Accessibility demonstration tools
- Screen reader (for demo)
- Color contrast examples

## Class Period 1: Mobile-First & Tailwind (45-60 min)

### Opening Activity (10 min)
- **Show**: Same website on phone vs desktop
- **Discussion**: Which device do most people use? (Answer: 60%+ mobile)
- **Challenge**: "Design a button that looks good on both"

### Mobile-First Philosophy (15 min)
- **Teach**: Why mobile-first matters
- **Demo**: Start with mobile, enhance for desktop (vs opposite)
- **Compare**: Desktop-first vs mobile-first approaches
- **Statistics**: Share research findings from Module 3

### Tailwind CSS Workshop (25 min)
- **Concept**: Utility-first CSS
- **Demo essential classes**:
  - Layout: `flex`, `grid`, container
  - Spacing: `p-4`, `m-auto`, `gap-6`
  - Typography: `text-xl`, `font-bold`
  - Colors: `bg-primary-600`, `text-white`
  - Responsive: `md:text-lg`, `lg:grid-cols-3`

**Live Coding**:
```html
<!-- Build a responsive card together -->
<div class="p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md">
  <h3 class="text-lg md:text-xl lg:text-2xl font-bold">Title</h3>
  <p class="text-gray-600 mt-2">Content</p>
</div>
```

### Practice Activity (10 min)
- **Exercise 2**: Mobile-First Component
- **Task**: Create feature grid (1/2/3 columns based on screen size)
- **Pair work**: One writes code, one tests responsive behavior

### Assessment
- Practical: Working responsive component
- Understanding: Explain mobile-first in own words

## Class Period 2: Accessibility Fundamentals (45-60 min)

### Why Accessibility Matters (10 min)
- **Stats**: 15% of population has disabilities
- **Legal**: ADA compliance, lawsuits
- **Demo**: Navigate site with screen reader
- **Empathy**: Close eyes, try to use a website

### WCAG 2.1 Basics (20 min)
- **Four principles**: Perceivable, Operable, Understandable, Robust
- **Focus on practical requirements**:
  - Color contrast (4.5:1 minimum)
  - Alt text for images
  - Keyboard navigation
  - Form labels

**Interactive Demo**:
1. Check color contrast (WebAIM tool)
2. Tab through page (keyboard only)
3. Use screen reader (NVDA/VoiceOver)

### Hands-on Accessibility (20 min)
- **Exercise 3**: Accessibility Audit
- **Steps**:
  1. Run WAVE on your page
  2. Fix all contrast errors
  3. Add alt text to images
  4. Test keyboard navigation
  5. Run WAVE again

**Pair programming**: One drives, one navigates WAVE tool

### Wrap-up (10 min)
- **Share**: Before/after WAVE scores
- **Discussion**: Was it harder or easier than expected?

### Assessment
- Practical: WAVE report showing improvements
- Reflection: Why accessibility benefits everyone

## Class Period 3: Client Branding Application (45-60 min)

### Branding Review (10 min)
- **Collect**: Student client brand info (colors, fonts, logo)
- **Discussion**: Why is consistent branding important?
- **Show**: Examples of good brand application

### Color Palette Setup (20 min)
- **Demo**: Use uicolors.app to generate palette from client's primary color
- **Students follow along**:
  1. Enter client's brand color
  2. Generate 50-900 shades
  3. Update `tailwind.config.js`
  4. Test contrast with WebAIM
  5. Adjust if needed

### Typography Setup (15 min)
- **Demo**: Add Google Fonts
- **Students**:
  1. Choose fonts for client
  2. Add to `base.templ`
  3. Update Tailwind config
  4. Apply to headings and body

### Mini-Project (15 min)
- **Exercise 1**: Complete color palette implementation
- **Exercise 4**: Typography system
- **Goal**: Site reflects client branding

### Assessment
- Practical: Site using client colors and fonts
- Accessibility: All combinations meet contrast requirements

## Discussion Prompts

**Mobile-First**:
- "Why is it easier to add features (mobile → desktop) than remove them (desktop → mobile)?"
- "What features might you hide on mobile but show on desktop?"

**Accessibility**:
- "Is accessibility just for people with disabilities?"
- "How does good accessibility also improve SEO?"
- "What's the business case for accessibility?"

**Branding**:
- "What happens if the client's brand color fails contrast tests?"
- "How do you balance client preferences with accessibility?"

## Differentiation

**For Advanced Students**:
- Create custom Tailwind plugin
- Build reusable component library
- Research advanced accessibility (ARIA)

**For Struggling Students**:
- Provide pre-made color palettes
- Use Tailwind Cheat Sheet reference
- Start with simpler components

**For Visual Learners**:
- Use Figma/design tool first
- Lots of visual examples
- Color-code different Tailwind class types

## Common Issues

**Colors not applying**:
- Check Tailwind config syntax
- Restart dev server
- Clear browser cache

**Fonts not loading**:
- Check Google Fonts link
- Verify network access
- Check browser console

**Contrast failing**:
- Use darker shade of color
- Increase font weight
- Add background contrast

## Resources
- Module 3 guide
- [UI Colors](https://uicolors.app/create)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE](https://wave.webaim.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- Accessibility cheat sheet

---

# Lesson Plan 4: Core Pages

**Module Reference**: Module 4: Core Pages
**Duration**: 3-4 class periods
**Learning Objectives**:
- Write compelling, conversion-focused copy
- Customize all page templates
- Implement testimonials and social proof
- Create effective CTAs
- Use AI for content generation

## Materials Needed

**For Students**:
- Client content (gathered in Module 1)
- Access to AI tools (Claude, ChatGPT)
- Content from requirements checklist
- Example good copy

**For Teacher**:
- Before/after copy examples
- Testimonial templates
- CTA effectiveness data
- AI prompt examples

## Class Period 1: Homepage Strategy & Hero Sections (45-60 min)

### Opening (10 min)
- **Show**: 5 small business homepages
- **Exercise**: Students have 5 seconds per site to understand what the business does
- **Debrief**: Which were clear? Which were confusing? Why?

### Homepage Psychology (15 min)
- **Teach**: Homepage purpose (get visitors to take action)
- **Structure**: Hero, value props, services, social proof, CTA
- **Formula**: [What You Do] + [Who It's For] + [Key Benefit]

**Examples**:
- ❌ "Welcome to ABC Company"
- ✅ "24/7 Emergency Plumbing for Austin Homeowners"

### Writing Workshop (20 min)
- **AI-assisted headline generation**:
  1. Show AI prompt template from Module 4
  2. Students input their client info
  3. Generate 5 headline options
  4. Class votes on best from each student

**Pairs work**: Refine and implement chosen headline

### Implementation (15 min)
- **Exercise**: Update homepage hero section
- **Customize**:
  - Headline
  - Subheadline
  - CTA buttons
  - Supporting text

### Assessment
- Quality: Headline clarity and appeal
- Completion: Updated hero section in code

## Class Period 2: Services & About Pages (45-60 min)

### Content Strategy Review (10 min)
- **Discuss**: Features vs Benefits
  - ❌ Feature: "We use advanced equipment"
  - ✅ Benefit: "Get it done right the first time"

### AI Content Generation Workshop (20 min)
- **Teach**: How to write effective AI prompts
- **Demo**: Generate service description using Module 4 template
- **Students practice**:
  - Write prompt for their client's main service
  - Generate description with AI
  - Refine and humanize the output
  - Test readability

### Services Page Development (20 min)
- **Exercise 2**: Services Page Content
- **Tasks**:
  - Generate 3-4 service descriptions
  - List benefits for each
  - Find appropriate icons
  - Implement in `services.templ`

### About Page Storytelling (10 min)
- **Quick lesson**: The story arc (Hook → Challenge → Solution → Mission)
- **Homework assignment**: Use AI to draft "Our Story" section

### Assessment
- Practical: Services page with client-specific content
- Writing: Benefit-focused copy (not feature-focused)

## Class Period 3: Social Proof & Testimonials (45-60 min)

### The Power of Social Proof (10 min)
- **Stats**: 92% read reviews, testimonials increase conversions 34%
- **Show**: Examples of weak vs strong testimonials
  - ❌ Weak: "Great service!"
  - ✅ Strong: "When our basement flooded at 2am..."

### Testimonial Workshop (20 min)
- **Teach**: What makes a good testimonial (specific, includes results, real person)
- **Practice**: Improve weak testimonials
  - Provide 3 weak examples
  - Students rewrite to be stronger
  - Share and compare

### Implementation (20 min)
- **Exercise 4**: Add Testimonials
- **Tasks**:
  - Create testimonial component (provided in module)
  - Add 3-5 client testimonials
  - Add trust indicators (years in business, rating, certifications)
  - Implement responsive layout

### Gallery Walk (10 min)
- **Activity**: Students view each other's testimonial sections
- **Feedback**: Sticky notes with positive comments

### Assessment
- Practical: Working testimonial section
- Design: Responsive and professional appearance

## Class Period 4: Calls-to-Action & Polish (45-60 min)

### CTA Psychology (15 min)
- **Teach**: What makes CTAs effective
  - Action-oriented verbs
  - Specific (what happens when they click?)
  - Creates urgency
  - Removes friction

**Activity**: CTA makeover
- Show weak CTAs, students improve them
- "Submit" → "Get Your Free Quote Today"
- "Click Here" → "Schedule Your Appointment Now"

### CTA Audit & Improvement (20 min)
- **Exercise 5**: CTA Optimization
- **Tasks**:
  - Find all CTAs on site
  - Replace generic text with specific actions
  - Make phone numbers clickable
  - Add urgency where appropriate
  - Test all links

### Final Content Polish (15 min)
- **Checklist review**:
  - No placeholder text remaining
  - All client info accurate
  - Spelling and grammar checked
  - Content is scannable (short paragraphs, bullets)
  - Mobile-friendly

### Peer Review (10 min)
- **Pair up**: Review partner's site
- **Check**: Content checklist from Module 4
- **Provide**: 2 stars and a wish

### Assessment
- Summative: Complete site with all content customized
- Rubric: Clarity, professionalism, client accuracy, mobile-friendly

## Discussion Prompts

**Content Strategy**:
- "Why do most people scan rather than read every word?"
- "How do you balance being informative with being concise?"
- "What's the right amount of content for a small business homepage?"

**AI Usage**:
- "What are the limitations of AI-generated content?"
- "How do you make AI content sound more human?"
- "When should you write copy yourself vs use AI?"

**Social Proof**:
- "What if your client doesn't have testimonials yet?"
- "Can too many testimonials be overwhelming?"
- "How do you get clients to provide testimonials?"

## Differentiation

**For Strong Writers**:
- Write original copy without AI first
- Help peers refine AI-generated content
- Create copywriting guide for class

**For Struggling Writers**:
- Use AI more heavily, focus on editing
- Provide sentence starters and templates
- Pair with strong writer for peer editing

**For Visual Thinkers**:
- Wireframe pages before writing content
- Use images to inspire copy
- Create mood boards for each page

## Common Issues

**Content too long**:
- Cut ruthlessly - every word must earn its place
- Use bullet points
- Move detail to separate pages

**Too generic**:
- Add specific numbers, names, locations
- Include client's unique story
- Use customer language, not jargon

**Weak CTAs**:
- Start with action verb
- Be specific about outcome
- Remove vague words like "learn more"

## Resources
- Module 4 guide
- `resources/ai-prompt-library.md`
- Copywriting examples
- CTA effectiveness research
- Readability checkers (Hemingway, Grammarly)

---

# Lesson Plan 5: Contact System

**Module Reference**: Module 5: Contact System
**Duration**: 3-4 class periods
**Learning Objectives**:
- Set up Brevo and reCAPTCHA accounts
- Implement server-side form handling
- Add spam prevention (honeypot + reCAPTCHA)
- Create smooth form UX with HTMX
- Test complete contact flow

## Materials Needed

**For Students**:
- Google account (for reCAPTCHA)
- Email account (for Brevo)
- `.env` file access
- Working development environment

**For Teacher**:
- Demo Brevo account
- Demo reCAPTCHA setup
- Email testing service
- Debugging guide

## Class Period 1: Service Setup & Understanding (45-60 min)

### Opening Discussion (10 min)
- **Question**: "Why is the contact form the most important part of a business site?"
- **Brainstorm**: What could go wrong with a contact form?
  - Spam
  - Emails not delivering
  - User doesn't know if it worked
  - Poor UX

### Brevo Setup Lab (20 min)
- **Demo**: Teacher walks through Brevo account creation
- **Students follow**:
  1. Create free Brevo account
  2. Verify email
  3. Navigate to API keys
  4. Generate and save API key
  5. Verify sender email

**Important**: Emphasize API key security!

### reCAPTCHA Setup (15 min)
- **Explain**: v3 vs v2, why v3 is better (invisible, score-based)
- **Demo**: Register site in Google reCAPTCHA admin
- **Students**:
  1. Register their domain (use localhost for now)
  2. Get site key and secret key
  3. Add keys to `.env`

### Environment Variables Review (10 min)
- **Teach**: What are environment variables? Why use them?
- **Security**: Why never commit `.env` to Git
- **Practice**: Add all keys to `.env` file
- **Verify**: Keys are in `.gitignore`

### Assessment
- Practical: Screenshot of Brevo dashboard with API key (hidden)
- Understanding: Explain why API keys must be kept secret

## Class Period 2: Backend Implementation (45-60 min)

### Code Walkthrough (15 min)
- **Review Module 5 code together**:
  - `models/contact.go` - form validation
  - `services/recaptcha.go` - reCAPTCHA verification
  - `services/email.go` - Brevo integration
  - `handlers/pages.go` - form submission handler

**Use think-aloud**: Teacher explains each section's purpose

### Pair Programming Session (30 min)
- **Exercise 1**: Implement Contact Form
- **Pairs**: Driver (types) and Navigator (guides)
- **Tasks**:
  1. Create contact form models (10 min)
  2. Create email service (10 min)
  3. Create contact handler (10 min)
  4. Switch driver/navigator roles halfway

**Teacher**: Circulate, answer questions, debug issues

### Testing Preparation (10 min)
- **Add route**: Ensure POST /contact is registered
- **Environment check**: Verify all keys are set
- **First test**: Try to compile (fix errors together)

### Homework
- Complete backend implementation if not finished
- Read Module 5 Part 6 (Frontend with HTMX)

### Assessment
- Practical: Code compiles without errors
- Understanding: Explain request flow from form → email

## Class Period 3: Frontend & HTMX Integration (45-60 min)

### HTMX Introduction (15 min)
- **What is HTMX?**: HTML-driven interactivity
- **Benefits**: No JavaScript knowledge needed, progressive enhancement
- **Demo**: Simple HTMX example
  ```html
  <button hx-post="/click" hx-target="#result">Click Me</button>
  <div id="result"></div>
  ```

### Form Implementation (25 min)
- **Follow Module 5 Part 6**:
  - Update contact.templ with HTMX attributes
  - Add reCAPTCHA script
  - Add form event handlers
  - Style success/error messages

**Live Coding**: Teacher demonstrates, students follow

### First Test (15 min)
- **Submit test form**:
  1. Fill out with real data
  2. Submit
  3. Check for success message
  4. Check email inbox
  5. Debug any issues together

### Troubleshooting Session (5 min)
- **Common issues**:
  - Email not arriving (check spam, API key, FROM email verified)
  - reCAPTCHA error (check keys, domain)
  - Form not submitting (check route, HTMX loaded)

### Assessment
- Practical: Working contact form with email delivery
- Problem-solving: Debug issues as they arise

## Class Period 4: Validation, Testing & Polish (45-60 min)

### Client-Side Validation (20 min)
- **Why validate on both sides?**: UX (client) + Security (server)
- **Implement**:
  - HTML5 validation attributes
  - Custom error messages
  - Real-time feedback
  - Accessible error announcements

**Exercise 3**: Form Validation Enhancement

### Comprehensive Testing (25 min)
- **Test checklist**:
  - [ ] Valid submission works
  - [ ] Invalid email rejected
  - [ ] Empty fields rejected
  - [ ] Honeypot catches bots (fill hidden field)
  - [ ] Success message clear
  - [ ] Error messages helpful
  - [ ] Form resets after success
  - [ ] Mobile responsive
  - [ ] Keyboard accessible

**Pairs**: One tests, one documents bugs

### Spam Prevention Review (10 min)
- **Discuss**: How honeypot works
- **Explain**: reCAPTCHA v3 scoring
- **Question**: What score threshold should we use? (Module 5 recommends 0.5)

### Final Polish (5 min)
- Loading states
- Disabled button during submission
- Clear success/error styling

### Assessment
- Summative: Complete, tested contact system
- Testing report: Document all test cases and results

## Discussion Prompts

**Security**:
- "Why validate on the server even if we validate on the client?"
- "What happens if someone steals your API keys?"
- "Is reCAPTCHA v3 foolproof? What are its limitations?"

**UX**:
- "Why is immediate feedback better than waiting for full page reload?"
- "How do you balance spam prevention with user friendliness?"

**Business Impact**:
- "What's the cost of a broken contact form for a business?"
- "How quickly should businesses respond to contact form submissions?"

## Differentiation

**For Advanced Students**:
- Implement rate limiting (Exercise 4)
- Add auto-response email (Exercise 5)
- Create admin dashboard to view submissions

**For Struggling Students**:
- Provide more code comments
- Break into smaller steps
- Focus on getting basic submission working first

**For Different Learning Styles**:
- Visual: Draw data flow diagrams
- Kinesthetic: Type all code (no copy-paste)
- Auditory: Explain code out loud to partner

## Common Issues

**Email not sending**:
1. Check Brevo API key
2. Verify sender email in Brevo
3. Check recipient email
4. Look at server logs
5. Test with curl

**reCAPTCHA failing**:
1. Check site/secret key match
2. Verify domain is registered
3. Check token is being sent
4. Look at verification response

**Form not submitting**:
1. Check HTMX is loaded
2. Verify route exists
3. Check network tab
4. Look for console errors

## Resources
- Module 5 guide
- [Brevo Docs](https://developers.brevo.com/)
- [reCAPTCHA Docs](https://developers.google.com/recaptcha/docs/v3)
- [HTMX Docs](https://htmx.org/docs/)
- Debugging checklist

---

# Lesson Plan 6: SEO & Performance

**Module Reference**: Module 6: SEO & Performance
**Duration**: 2-3 class periods
**Learning Objectives**:
- Optimize meta tags for search engines
- Implement structured data
- Improve Core Web Vitals
- Set up Google Analytics
- Create and submit sitemap

## Materials Needed

**For Students**:
- Google account
- Client domain (or staging URL)
- Access to PageSpeed Insights
- WAVE accessibility checker

**For Teacher**:
- SEO examples (good/bad)
- Analytics demo account
- Performance comparison data

## Class Period 1: SEO Fundamentals & Meta Tags (45-60 min)

### SEO Introduction (15 min)
- **Hook**: "Your client's site is amazing... but no one can find it"
- **Teach**: Three pillars of SEO (Technical, On-Page, Off-Page)
- **Focus**: What we control (Technical & On-Page)
- **Statistics**: 75% never go past first page of results

### Meta Tags Workshop (20 min)
- **Review**: Our meta tag system (already in template!)
- **Good vs Bad**:
  - Show examples of optimized vs generic meta tags
  - Explain title tag formula
  - Meta description best practices

**AI-Assisted Optimization**:
- Use AI prompt from Module 6 to generate meta tags
- Students generate for their client
- Peer review: Does it make sense? Want to click?

### Implementation (20 min)
- **Exercise 1**: Meta Tag Optimization
- **Update handlers** with optimized meta for each page:
  - Home
  - About
  - Services
  - Contact

**Test**: View page source, verify meta tags

### Preview (5 min)
- **Show**: How these appear in search results
- **Tool**: Use Google SERP preview tool

### Assessment
- Practical: All pages have unique, optimized meta tags
- Quality: Title under 60 chars, description 150-160 chars

## Class Period 2: Performance Optimization (45-60 min)

### Core Web Vitals Introduction (15 min)
- **Explain**: LCP, INP, CLS
- **Why it matters**: 24% boost for sites meeting targets
- **Demo**: Run PageSpeed Insights on example site
- **Interpret**: Understanding the scores

### Image Optimization Lab (25 min)
- **Teach**: Images are #1 performance issue
- **Best practices**:
  - Compress before uploading
  - Use correct dimensions
  - Add width/height attributes
  - Lazy loading

**Hands-on**:
1. Check current images with PageSpeed
2. Compress large images (TinyPNG)
3. Add width/height to img tags
4. Add lazy loading
5. Re-test

### Performance Testing (15 min)
- **Exercise 2**: Core Web Vitals Test
- **Process**:
  - Run PageSpeed on all pages
  - Document scores
  - Identify top 3 issues
  - Fix what you can
  - Re-test and compare

**Class competition**: Who can get highest score?

### Wrap-up (5 min)
- **Share**: Before/after scores
- **Discuss**: What made the biggest difference?

### Assessment
- Practical: Improved PageSpeed scores (screenshot comparison)
- Analysis: Explain which changes helped most

## Class Period 3: Analytics & Structured Data (45-60 min)

### Google Analytics Setup (20 min)
- **Demo**: Create GA4 property (teacher shows on projector)
- **Students follow**:
  1. Go to analytics.google.com
  2. Create account and property
  3. Get Measurement ID
  4. Add to `.env`
  5. Integrate code (Module 6 Part 6)

**Test real-time**:
- Visit own site
- See yourself in Real-Time view
- Click around, watch events

### Structured Data (20 min)
- **Explain**: What is Schema.org markup?
- **Benefits**: Rich snippets, better search understanding
- **Demo**: Add LocalBusiness schema
- **Students**: Customize with their client's info
  - Business name
  - Address
  - Phone
  - Hours
  - Geo coordinates (get from Google Maps)

### Validation (15 min)
- **Tools**: Google Rich Results Test
- **Exercise 3**: Test structured data
- **Fix**: Any validation errors

### Sitemap & Search Console (5 min)
- **Quick demo**: Generate sitemap (Module 6 Part 8)
- **Homework**: Set up Search Console and submit sitemap

### Assessment
- Practical: Working Analytics (verified in real-time)
- Validation: Zero errors in structured data test

## Discussion Prompts

**SEO**:
- "Is SEO manipulation or optimization?"
- "How long does SEO take to show results?" (Answer: 3-6 months)
- "What's more important: technical SEO or good content?"

**Performance**:
- "Does page speed really matter if content is good?"
- "Trade-off: Beautiful large images vs fast loading?"
- "How does mobile performance differ from desktop?"

**Analytics**:
- "Is tracking visitors an invasion of privacy?"
- "What's the most important metric for a small business site?"
- "How can analytics data improve the website?"

## Differentiation

**For Advanced Students**:
- Set up conversion tracking
- Create custom GA4 events
- Research advanced schema types
- Implement structured data for multiple entity types

**For Struggling Students**:
- Provide completed schema template (just fill in blanks)
- Focus on one page's meta tags first
- Use pre-optimized images

**Visual Learners**:
- Show lots of before/after examples
- Use diagrams for explaining concepts
- Color-code different types of meta tags

## Common Issues

**Analytics not tracking**:
- Check Measurement ID is correct
- Verify code is in `<head>`
- Check only loads in production
- Use browser extension to debug

**PageSpeed score low**:
- Focus on images first
- Check for render-blocking resources
- Ensure CSS is minified
- Verify Vercel optimizations enabled

**Structured data errors**:
- Missing required fields
- Invalid format (check JSON syntax)
- URL doesn't match domain

## Resources
- Module 6 guide
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Analytics](https://analytics.google.com/)
- [Schema.org](https://schema.org/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- SEO checklist

---

# Lesson Plan 7: Deployment & Handoff

**Module Reference**: Module 7: Deployment & Handoff
**Duration**: 2-3 class periods
**Learning Objectives**:
- Deploy website to Vercel production
- Configure custom domain
- Create client documentation
- Conduct professional handoff
- Build portfolio case study

## Materials Needed

**For Students**:
- Vercel account
- GitHub repository
- Client domain (registered)
- Completed website
- Screen recording tool

**For Teacher**:
- Deployment checklist
- Client documentation templates
- Portfolio examples
- Troubleshooting guide

## Class Period 1: Deployment to Vercel (45-60 min)

### Pre-Deployment Review (15 min)
- **Checklist**: Run through Module 7 Part 1
  - All pages work locally
  - No placeholder content
  - Contact form tested
  - No console errors
  - All dependencies committed

**Class activity**: Pairs review each other's sites

### Vercel Deployment Lab (30 min)
- **Demo**: Teacher deploys demo project
- **Students follow**:
  1. Create Vercel account
  2. Push final code to GitHub
  3. Import project to Vercel
  4. Configure build settings
  5. Add environment variables (critical!)
  6. Deploy

**Checkpoint**: Everyone has successful deployment

### Testing Production (10 min)
- **Visit**: Vercel URL (*.vercel.app)
- **Test**:
  - All pages load
  - Contact form works
  - No errors
  - Mobile responsive

**Bug bash**: Report any issues

### Troubleshooting (5 min)
- **Common issues**: Review Module 7 troubleshooting section
- **Help peers**: Those finished help others

### Assessment
- Practical: Live site on Vercel
- Testing: Screenshot of successful deployment

## Class Period 2: Domain Configuration & Final Testing (45-60 min)

### Domain Configuration Workshop (25 min)
- **Prerequisite**: Students should have client domain registered
- **Process**:
  1. Add domain in Vercel
  2. Get nameservers
  3. Update at registrar (students do this or guide client)
  4. Monitor DNS propagation

**If domains not ready**: Use Vercel subdomain for now

### Production Testing (20 min)
- **Exercise 3**: Post-Launch Testing
- **Complete checklist**:
  - Functionality (all features work)
  - Performance (PageSpeed test)
  - SEO (meta tags, sitemap)
  - Analytics (tracking verified)
  - Mobile (test on real device)

**Document**: Any issues found and resolved

### Client Documentation Start (15 min)
- **Introduction**: Why documentation matters
- **Template review**: MODULE 7 CLIENT_DOCUMENTATION.md
- **Begin filling in**: Students customize for their client

### Assessment
- Practical: Domain configured (or plan documented)
- Testing: Complete post-launch checklist

## Class Period 3: Professional Handoff & Portfolio (45-60 min)

### Client Documentation Completion (20 min)
- **Exercise 4**: Finish client documentation
- **Include**:
  - All access credentials (documented securely)
  - How to request updates
  - What's included in support
  - Emergency contacts
  - Annual maintenance tasks

**Create quick reference guide**: One-page essentials

### Training Video Creation (15 min)
- **Record**: 5-10 minute walkthrough
- **Cover**:
  - Website tour
  - How to access analytics
  - Where contact form emails go
  - How to request updates
  - Domain renewal reminder

**Tools**: Loom, QuickTime, or built-in screen recorder

### Portfolio Case Study (15 min)
- **Exercise 5**: Create portfolio piece
- **Include**:
  - Project overview
  - Challenge/solution
  - Technologies used
  - Screenshots
  - Results (if available)
  - Client testimonial (request it!)

### Launch Celebration (5 min)
- **Each student presents**: 60 second site overview
- **Celebrate wins**: Real websites deployed!
- **Peer feedback**: Kind, specific, helpful comments

### Wrap-up (5 min)
- **Reflection**: What did you learn?
- **Next steps**: Ongoing client relationship
- **Resources**: Where to continue learning

### Assessment
- Summative: Complete project with all deliverables
- Presentation: 60-second project overview
- Portfolio: Case study draft

## Final Project Rubric

### Functionality (30 points)
- [ ] All pages load correctly (5 pts)
- [ ] Navigation works (mobile & desktop) (5 pts)
- [ ] Contact form submits and delivers email (10 pts)
- [ ] Responsive on all devices (5 pts)
- [ ] No broken links or errors (5 pts)

### Design & Content (25 points)
- [ ] Professional appearance (5 pts)
- [ ] Client branding applied consistently (5 pts)
- [ ] Content is client-specific (no placeholders) (5 pts)
- [ ] Accessible (meets WCAG 2.1 AA basics) (5 pts)
- [ ] Mobile-first responsive design (5 pts)

### SEO & Performance (20 points)
- [ ] Meta tags optimized (unique per page) (5 pts)
- [ ] Structured data implemented (5 pts)
- [ ] PageSpeed score > 90 (5 pts)
- [ ] Analytics tracking works (5 pts)

### Technical Quality (15 points)
- [ ] Clean code (organized, commented) (5 pts)
- [ ] Git commit history (meaningful messages) (5 pts)
- [ ] Environment variables secure (5 pts)

### Documentation & Handoff (10 points)
- [ ] Client documentation complete (5 pts)
- [ ] Training video created (3 pts)
- [ ] Portfolio case study (2 pts)

**Total: 100 points**

## Discussion Prompts

**Deployment**:
- "What's the difference between deploying to Vercel vs traditional hosting?"
- "Why might you need different environment variables in development vs production?"

**Client Relationships**:
- "When does your responsibility end?"
- "How do you handle a client who wants constant free updates?"
- "What's a fair ongoing maintenance plan?"

**Professional Development**:
- "How will you present this project to future employers?"
- "What would you do differently on your next project?"

## Differentiation

**For Advanced Students**:
- Set up custom email domain
- Implement advanced analytics goals
- Create maintenance playbook
- Build CMS for client content updates

**For Struggling Students**:
- Use Vercel subdomain (skip custom domain)
- Provide documentation template (fill in blanks)
- Pair with advanced student for deployment

**For Visual Learners**:
- Diagram deployment architecture
- Flowchart client handoff process
- Screenshots for every step

## Common Issues

**Build fails**:
- Check build logs carefully
- Ensure all dependencies in go.mod
- Verify `make build` works locally
- Check environment variables

**Domain not working**:
- Wait for DNS propagation (24-48 hours)
- Verify nameservers correct
- Check propagation with online tool

**Analytics not working**:
- Verify Measurement ID correct
- Check code only loads in production
- Clear cache and test

## Beyond the Course

**Students should leave with**:
- Live, deployed website
- GitHub portfolio
- Real client project experience
- Understanding of full web dev lifecycle
- Professional skills (communication, documentation)
- Confidence to take on more projects

**Encourage students to**:
- Build 2-3 more sites for practice
- Join web dev communities
- Keep learning new technologies
- Share work on social media
- Help other students

**Final advice**:
"The hardest part of web development isn't the code - it's understanding what to build and delivering it professionally. You've learned both. Now go build amazing things!"

---

## Course Assessment

### Formative Assessments (Throughout Course)
- Daily check-ins and exit tickets
- Pair programming observations
- Code reviews
- Module-end quizzes
- Self-assessment checklists

### Summative Assessment (Final Project)
- Complete deployed website (60%)
- Client documentation package (15%)
- Portfolio case study (10%)
- Final presentation (15%)

### Alternative Assessments
- Process journal (document journey)
- Peer teaching (expert in one module)
- Blog post series (explain concepts to beginners)
- Video tutorial creation

---

## Resources for Teachers

**Before Course Starts**:
- Set up demo accounts (Brevo, Analytics, Vercel)
- Test complete workflow yourself
- Create troubleshooting database
- Prepare backup materials (USBs with installers)
- Connect with local businesses for real clients

**During Course**:
- Daily standup (student progress check)
- Office hours for stuck students
- Peer mentoring program
- Guest speaker (professional developer)

**After Course**:
- Student showcase event
- Collect feedback for improvements
- Update materials based on issues encountered
- Stay connected (alumni network)

**Professional Development**:
- Join web dev education communities
- Stay current with technologies
- Build sample projects
- Conference attendance (if possible)

---

**This complete lesson plan series provides a roadmap for teaching professional web development skills to high school students. Adjust timing and activities based on your specific class needs, student abilities, and available resources.**
