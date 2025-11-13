# Module 1: Client Discovery

**Duration**: 2-3 class periods (90-135 minutes total)

**Learning Objectives**:
- Conduct professional client interviews
- Gather comprehensive project requirements
- Educate clients about domains and hosting
- Create a clear project brief and scope document
- Understand common pitfalls in client communication

## Why This Module Matters

The research is clear: **unclear requirements and poor communication** are among the top mistakes developers make when building client websites. In fact, starting a project before fully defining the scope is one of the most dangerous mistakes you can make.

This module teaches you the **non-coding skills** that separate professionals from hobbyists. You'll learn how to:
- Ask the right questions
- Listen actively
- Set clear expectations
- Avoid scope creep
- Build trust with clients

> "The hardest parts about building client websites aren't the code - it's understanding what the client actually needs and helping them understand what's required to make it happen."

## Part 1: Understanding the Client's Business

### Before the Meeting

**Preparation Checklist**:
- [ ] Research the client's business online
- [ ] Review any existing website or marketing materials
- [ ] Check out their competitors
- [ ] Prepare your questions (see template in resources/)
- [ ] Set up a professional environment (quiet, good lighting for video calls)
- [ ] Have a way to take notes (laptop, tablet, or notebook)

### The Discovery Interview

**Structure** (45-60 minutes):
1. **Introduction** (5 min): Build rapport, explain the process
2. **Business Overview** (10 min): Let them tell their story
3. **Goals & Objectives** (10 min): What do they want to achieve?
4. **Target Audience** (10 min): Who are they trying to reach?
5. **Content & Features** (15 min): What goes on the site?
6. **Brand & Style** (5 min): Visual preferences
7. **Technical Requirements** (5 min): Domain, hosting, integrations
8. **Next Steps** (5 min): Set expectations, timeline

### Key Questions to Ask

**Business & Goals**:
- "Tell me about your business. How did you get started?"
- "What makes your business different from competitors?"
- "What are your main goals for this website?" (Get specific!)
- "How will you measure success?" (Avoid vague answers like "more growth")
- "Who is your ideal customer?"
- "What action do you want visitors to take?"

**Content & Structure**:
- "What pages do you envision for the site?"
- "Do you have existing content (text, images, videos)?"
- "Who will handle content updates after launch?"
- "Do you need a blog or news section?"
- "Any special features?" (booking, e-commerce, member login, etc.)

**Brand & Design**:
- "Do you have brand guidelines?" (logo, colors, fonts)
- "What websites do you like? What don't you like?"
- "Any specific design preferences?" (modern, traditional, minimalist, etc.)
- "Do you have professional photography, or will we need stock images?"

**Technical & Timeline**:
- "Do you already own a domain name?"
- "What's your ideal launch date?"
- "What's your budget for this project?"
- "Who will be the main point of contact?"

### Active Listening Techniques

1. **Paraphrase**: "So what I'm hearing is..."
2. **Clarify**: "Can you tell me more about..."
3. **Probe**: "Why is that important to you?"
4. **Validate**: "That makes sense because..."
5. **Summarize**: "Let me make sure I've got this right..."

**Common Mistake**: Jumping to solutions before understanding the problem.

❌ **Bad**: "Oh, you need a contact form? I can build that with React!"
✅ **Good**: "Tell me more about how customers currently reach you and what issues you're having..."

## Part 2: Requirements Gathering

### Essential Information Checklist

Use the **Requirements Checklist** in `resources/requirements-checklist.md` to ensure you collect everything needed:

**Business Information**:
- [ ] Company name (legal and DBA)
- [ ] Tagline/slogan
- [ ] Mission statement
- [ ] Years in business
- [ ] Location(s)
- [ ] Service area

**Contact Information**:
- [ ] Primary contact person
- [ ] Email address
- [ ] Phone number
- [ ] Physical address
- [ ] Social media handles
- [ ] Business hours

**Brand Assets**:
- [ ] Logo (vector format: SVG, AI, or EPS preferred)
- [ ] Brand colors (HEX codes)
- [ ] Fonts (names and files)
- [ ] Photography (high-resolution)
- [ ] Any existing marketing materials

**Content**:
- [ ] Page structure (Home, About, Services, Contact, etc.)
- [ ] Written content for each page
- [ ] Service/product descriptions
- [ ] Team bios (if applicable)
- [ ] Testimonials/reviews
- [ ] FAQs

**Technical Requirements**:
- [ ] Domain name (owned or to be registered)
- [ ] Current hosting (if migrating)
- [ ] Email addresses needed
- [ ] Third-party integrations (payment processors, booking systems, etc.)
- [ ] Analytics/tracking requirements

### Creating a Project Brief

After the interview, create a **Project Brief** document (1-2 pages) that includes:

1. **Client Overview**
   - Business name and industry
   - Primary contact information
   - Brief business description

2. **Project Goals**
   - 3-5 specific, measurable objectives
   - Target audience definition
   - Success metrics

3. **Site Structure**
   - List of pages (typically 3-5 for small business)
   - Key features needed
   - Any special functionality

4. **Design Direction**
   - Visual style keywords (modern, professional, friendly, etc.)
   - Color preferences
   - Reference websites they like

5. **Timeline & Milestones**
   - Discovery: [Date completed]
   - Design mockups: [Target date]
   - Development: [Start - End dates]
   - Launch: [Target date]

6. **Deliverables**
   - Mobile-responsive website
   - SEO optimization
   - Contact form with spam protection
   - Social media integration
   - One round of revisions

7. **What's Out of Scope**
   - E-commerce functionality
   - Custom CMS
   - Third-party API integrations beyond email
   - Ongoing content management

**Get Client Approval**: Share this brief and get written confirmation before starting development!

## Part 3: Domain & Hosting Education

Many small business owners don't understand domains and hosting. It's your job to educate them in simple terms.

### Explaining DNS Simply

Use the **Domain/DNS Guide** in `resources/domain-dns-guide.md` for detailed explanations.

**The Library Analogy**:
> "Think of the internet like a giant library. Your website is a book on a shelf (that's hosting). The domain name is like the call number that helps people find your book. DNS is like the library's catalog system that translates the call number to the exact shelf location."

**Key Concepts to Explain**:

1. **Domain Name** ($10-15/year)
   - Your website address (example.com)
   - You "lease" it, not buy it (renews annually)
   - Register through services like Namecheap, Google Domains, or GoDaddy

2. **Hosting** ($5-20/month)
   - Where your website files live
   - Like renting space on a powerful computer that's always online
   - We'll use Vercel (free tier is perfect for small business sites)

3. **Nameservers**
   - Tell the domain where to find your website
   - Set at domain registrar to point to hosting
   - Changes take 24-72 hours to propagate (be patient!)

4. **Email Hosting** (optional, $6+/month per user)
   - Professional email (contact@yourbusiness.com)
   - Separate from website hosting
   - Options: Google Workspace, Microsoft 365, or domain registrar

### The Domain Decision

**Help them choose a good domain**:
- ✅ Short and memorable
- ✅ Easy to spell and pronounce
- ✅ .com if possible (most trusted)
- ✅ Matches business name
- ❌ Hyphens or numbers (confusing)
- ❌ Too long or complicated
- ❌ Similar to competitors

**Check availability**: Use [Namecheap](https://www.namecheap.com/) or [Google Domains](https://domains.google/)

### Hosting Options Explanation

**For Small Business Websites, We Recommend**:

**Vercel** (What we'll use in this tutorial):
- ✅ Free tier perfect for small sites
- ✅ Automatic HTTPS/SSL
- ✅ Fast global CDN
- ✅ Git-based deployment
- ✅ Easy custom domain setup

**Alternatives** (good to mention):
- **Railway**: $5/month, simple deployment
- **Netlify**: Similar to Vercel, generous free tier
- **Traditional hosting** (Bluehost, SiteGround): $3-10/month but more complex

**Set Expectations**:
"I'll deploy your site to Vercel for free. You'll just need to purchase your domain name ($12-15/year). I'll help you connect them once your domain is registered."

## Part 4: Common Pitfalls & How to Avoid Them

### Top Mistakes Developers Make with Clients

Based on industry research, here are the biggest mistakes to avoid:

**1. Unclear Requirements** ⚠️ MOST DANGEROUS
- **Problem**: Starting to code before fully understanding what's needed
- **Solution**: Complete this entire module before writing any code
- **Red flag**: Client says "I'll know it when I see it"

**2. Scope Creep**
- **Problem**: Client keeps adding "just one more thing"
- **Solution**: Clear project brief with explicit out-of-scope items
- **Response**: "That's a great idea! Let's add it to a Phase 2 list for after launch."

**3. Poor Communication**
- **Problem**: Irregular updates, not respecting deadlines
- **Solution**: Set a regular check-in schedule (weekly update emails)
- **Tip**: Over-communicate progress, share work-in-progress screenshots

**4. Money-Focused Mindset**
- **Problem**: Constantly bringing up payment makes clients uncomfortable
- **Solution**: Discuss payment upfront, then focus on delivering value
- **Approach**: Be professional but not transactional

**5. Not Setting Boundaries**
- **Problem**: Responding to late-night texts, endless revision rounds
- **Solution**: Set communication hours and revision limits
- **Example**: "I'm available weekdays 9am-5pm. You get two rounds of revisions."

### Setting Healthy Boundaries

**Communication**:
- "I check email twice daily and will respond within 24 business hours"
- "For urgent issues, call me at [number], otherwise email is best"
- "My work hours are [time], I don't work weekends"

**Revisions**:
- "The project includes one round of revisions after each major milestone"
- "Additional changes beyond scope will require additional time/cost"
- "I'll document all requested changes so we're on the same page"

**Timeline**:
- "I'll provide weekly progress updates every Friday"
- "Delays on your end (content, feedback) will adjust the timeline accordingly"
- "I need [X days] notice for the final review before launch"

## Part 5: AI-Assisted Client Discovery

### Using AI to Prepare and Analyze

**Before the Interview**:

Prompt: "I'm meeting with a [industry] business to discuss building their website. They've been in business for [X years] and their main services are [list services]. What are 10 specific questions I should ask to understand their needs and goals?"

**After the Interview**:

Prompt: "I just interviewed a client for their small business website. Here are my notes: [paste notes]. Help me identify: 1) Any missing critical information 2) Potential scope creep risks 3) A suggested site structure 4) Key calls-to-action based on their goals"

**For Competitor Research**:

Prompt: "Analyze these three competitor websites: [URLs]. What are the common features? What makes each unique? What would help my client stand out?"

### AI Prompt Library for Client Discovery

See `resources/ai-prompt-library.md` for a complete collection of prompts for:
- Pre-interview research
- Question generation
- Note analysis
- Requirements documentation
- Project brief creation
- Client education explanations

## Exercises

### Exercise 1: Mock Client Interview (Pairs)

**Setup** (30 minutes):
1. Pair up with a classmate
2. One person is the "developer", one is the "client"
3. Client picks a business type (restaurant, gym, salon, consulting, etc.)
4. Developer conducts 15-minute discovery interview
5. Switch roles and repeat

**Deliverable**:
- Written notes from your interview
- List of 5 unanswered questions you wish you'd asked

### Exercise 2: Create a Project Brief (Individual)

**Task** (30 minutes):
Using the notes from Exercise 1, create a one-page project brief covering:
- Client overview
- Project goals (3-5 specific objectives)
- Proposed site structure
- Timeline
- Out of scope items

**Peer Review**:
Exchange briefs with your partner. Would you feel confident starting this project with this information? What's missing?

### Exercise 3: Domain Research (Individual)

**Task** (15 minutes):
1. Pick a real local business without a website (check Google Maps)
2. Research 3-5 potential domain names for them
3. Check availability on Namecheap
4. Write a brief explanation for why you recommend the best option

### Exercise 4: Explaining DNS (Pairs)

**Task** (20 minutes):
1. Partner A: Explain DNS to Partner B using your own analogy (not the library one)
2. Partner B: Ask follow-up questions as if you're a non-technical client
3. Switch roles
4. Discuss: What explanations worked best? What was confusing?

## Assessment Checklist

Before moving to Module 2, you should be able to:
- [ ] Conduct a professional discovery interview with clear structure
- [ ] Ask open-ended questions and actively listen
- [ ] Create a comprehensive requirements checklist
- [ ] Write a clear project brief with defined scope
- [ ] Explain domains, hosting, and DNS in simple terms
- [ ] Identify common client relationship pitfalls
- [ ] Set healthy boundaries and expectations
- [ ] Use AI tools to improve your discovery process

## Real-World Application

### Finding Your First Client

**Good Options for Students**:
1. **Family Business**: Parents, relatives, family friends
2. **School Organizations**: Clubs, sports teams, PTA
3. **Local Nonprofits**: Often need help and are patient with students
4. **Small Local Businesses**: Barbershops, coffee shops, tutors
5. **Classmate's Parents**: Ask around who owns a small business

**The Pitch**:
"I'm learning professional web development and looking to build a portfolio project. I'd like to create a modern, mobile-friendly website for your business at no cost. I'll deliver a professional site that you own completely. Are you interested?"

**Set Expectations**:
- Be honest about your skill level
- Explain this is a learning project
- Commit to a realistic timeline
- Offer to fix any issues that come up
- Ask for a testimonial/reference when complete

## Next Module

In **Module 2: Setup & Architecture**, you'll:
- Set up your development environment
- Understand the project structure
- Learn the basics of Go, Echo, Templ, and Tailwind
- Get the starter template running locally
- Set up Git for version control

But first, complete all exercises in this module and find your real-world client!

---

**Module 1 Resources**:
- `resources/client-interview-questionnaire.md` - Complete question template
- `resources/requirements-checklist.md` - Comprehensive checklist
- `resources/domain-dns-guide.md` - Client education materials
- `resources/ai-prompt-library.md` - AI prompts for discovery

**Pro Tip**: The best developers are great communicators first, great coders second. Master this module and you'll stand out from the crowd.
