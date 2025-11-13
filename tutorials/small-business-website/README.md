# Building Modern Small Business Websites with Go + AI

A comprehensive tutorial for high school students learning to build professional small business websites using modern tools and AI-assisted development.

## Overview

This tutorial teaches students the complete process of building a modern, professional website for a small business client - from initial customer interview through deployment. Students will learn not just coding, but the essential business and communication skills needed for real-world web development projects.

### What Students Will Build

A complete 3-5 page small business website featuring:
- Mobile-first responsive design
- SEO-optimized content with Open Graph tags
- Contact form with spam prevention (reCAPTCHA + honeypot)
- Professional email integration (Brevo)
- Accessible design (WCAG 2.1 AA)
- Production deployment (Vercel)

### Technology Stack

- **Backend**: Go + Echo Router
- **Templating**: Templ (type-safe HTML templates)
- **Interactivity**: HTMX (dynamic interactions without complex JavaScript)
- **Styling**: Tailwind CSS (utility-first responsive design)
- **Email**: Brevo API
- **Spam Prevention**: Google reCAPTCHA v3
- **Deployment**: Vercel
- **AI Tools**: Claude, ChatGPT, or GitHub Copilot

## Tutorial Structure

### Module 1: Client Discovery
Learn to conduct professional client interviews, gather requirements, and educate clients about domains and hosting.

**Skills**: Communication, requirements gathering, technical explanation

### Module 2: Setup & Architecture
Set up development environment, understand project structure, and learn AI-assisted coding workflows.

**Skills**: Development tools, Git workflow, AI prompting

### Module 3: Design Foundation
Master mobile-first responsive design with Tailwind CSS and build reusable layout components.

**Skills**: CSS, responsive design, accessibility basics

### Module 4: Core Pages
Build the main website pages (Home, About, Services) with effective calls-to-action and engaging content.

**Skills**: Templ templates, HTMX interactions, content strategy

### Module 5: Contact System
Implement a secure contact form with multi-layer spam prevention and email delivery.

**Skills**: Form handling, API integration, security

### Module 6: SEO & Performance
Optimize for search engines, social sharing, and fast page loads.

**Skills**: SEO, Open Graph tags, performance testing

### Module 7: Deployment & Handoff
Deploy to production, configure custom domains, and hand off to the client.

**Skills**: Deployment, DNS, documentation, presentation

## Project Structure

```
small-business-website/
├── guide/              # Written tutorial modules
│   ├── module-1-client-discovery.md
│   ├── module-2-setup-architecture.md
│   ├── module-3-design-foundation.md
│   ├── module-4-core-pages.md
│   ├── module-5-contact-system.md
│   ├── module-6-seo-performance.md
│   └── module-7-deployment-handoff.md
├── template/           # Starter project code
│   ├── cmd/
│   ├── internal/
│   ├── static/
│   ├── views/
│   └── README.md
├── lesson-plans/       # Teacher materials
│   ├── lesson-1-client-discovery.md
│   ├── lesson-2-setup-architecture.md
│   ├── lesson-3-design-foundation.md
│   ├── lesson-4-core-pages.md
│   ├── lesson-5-contact-system.md
│   ├── lesson-6-seo-performance.md
│   └── lesson-7-deployment-handoff.md
└── resources/          # Templates and references
    ├── client-interview-questionnaire.md
    ├── requirements-checklist.md
    ├── domain-dns-guide.md
    ├── ai-prompt-library.md
    └── troubleshooting-guide.md
```

## Prerequisites

### For Students
- Basic understanding of HTML and CSS
- Familiarity with command line basics
- Access to a computer with admin privileges
- GitHub account
- Google account (for reCAPTCHA)
- Brevo account (free tier)
- Vercel account (free tier)

### For Teachers
- Experience with Go programming
- Basic understanding of web development
- Familiarity with Git and GitHub
- Ability to help students set up development tools

## Learning Outcomes

By the end of this tutorial, students will be able to:

1. **Conduct professional client interviews** and gather requirements
2. **Design mobile-first responsive websites** using Tailwind CSS
3. **Build server-rendered web applications** with Go, Echo, and Templ
4. **Implement dynamic interactions** without complex JavaScript using HTMX
5. **Integrate third-party APIs** (Brevo, reCAPTCHA)
6. **Optimize for SEO and performance** (meta tags, Open Graph, Core Web Vitals)
7. **Deploy production websites** to cloud platforms
8. **Use AI tools effectively** to accelerate development
9. **Communicate professionally** with clients
10. **Build a portfolio** of real deployed projects

## Time Estimate

- **Guided instruction**: 14-21 class periods (assuming 45-60 minute periods)
- **Independent project**: 10-15 hours
- **Total**: Approximately 4-6 weeks with 2-3 class periods per week

## Real-World Application

Students can use these skills to:
- Build websites for local businesses
- Create sites for school clubs or events
- Launch personal portfolio sites
- Freelance as web developers
- Pursue web development internships

## Getting Started

### For Teachers
1. Review all module guides to understand the curriculum flow
2. Check lesson plans for classroom activities and timing
3. Set up your own demo project to familiarize yourself with the stack
4. Create student accounts/access for required services (optional: use teacher accounts first)
5. Consider partnering with local businesses for authentic projects

### For Students
1. Start with Module 1: Client Discovery
2. Follow the guide sequentially - each module builds on previous ones
3. Complete all exercises before moving to the next module
4. Use the AI prompt library as a starting point, but customize for your needs
5. Don't skip the requirements gathering - it's crucial for success!

## Additional Resources

- [Go Documentation](https://go.dev/doc/)
- [Echo Framework Guide](https://echo.labstack.com/guide/)
- [Templ Documentation](https://templ.guide/)
- [HTMX Documentation](https://htmx.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

## Support & Feedback

This tutorial is part of the goCodeSchool curriculum. For questions, issues, or suggestions:
- Open an issue in the goCodeSchool repository
- Refer to the troubleshooting guide in `resources/`
- Check module-specific FAQs

## License

This tutorial is open source and available for educational use.

---

**Ready to start?** Head to [Module 1: Client Discovery](guide/module-1-client-discovery.md) to begin your journey!
