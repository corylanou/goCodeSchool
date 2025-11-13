# Module 7: Deployment & Handoff

**Duration**: 2-3 class periods (90-135 minutes total)

**Learning Objectives**:
- Deploy website to Vercel production
- Connect and configure custom domain
- Set up environment variables securely
- Test the live production site
- Create client documentation
- Provide client training
- Plan ongoing maintenance
- Successfully hand off the project

## Prerequisites

Before starting this module, you should have:
- Completed Modules 1-6
- All content finalized and approved
- Site fully tested locally
- Client's domain registered
- All API keys ready (Brevo, reCAPTCHA, Analytics)

---

## Part 1: Pre-Deployment Checklist

### Final Testing

**Run Through Every Flow**:
- [ ] Visit every page on mobile and desktop
- [ ] Click every link
- [ ] Test navigation menu (including mobile)
- [ ] Submit contact form
- [ ] Verify email delivery
- [ ] Test all CTAs
- [ ] Check phone number links work
- [ ] Verify images load
- [ ] Test different browsers (Chrome, Safari, Firefox)

**Content Review**:
- [ ] No Lorem ipsum or placeholder text
- [ ] All client information is correct
- [ ] Phone numbers are accurate
- [ ] Email addresses are correct
- [ ] Business hours are accurate
- [ ] Address is correct
- [ ] Social media links work
- [ ] No broken images
- [ ] No "TODO" comments left

**Technical Review**:
- [ ] All environment variables documented
- [ ] .env.example is up to date
- [ ] .gitignore includes .env
- [ ] No console errors in browser
- [ ] No server errors in terminal
- [ ] All dependencies in go.mod
- [ ] All npm packages in package.json
- [ ] Build works (`make build`)

**SEO Review**:
- [ ] All meta tags optimized
- [ ] Open Graph images exist
- [ ] Structured data validated
- [ ] Sitemap works
- [ ] robots.txt ready
- [ ] Analytics installed (test in dev first)

---

## Part 2: Deploying to Vercel

### Setting Up Vercel

**Step 1: Create Account**:
1. Visit [vercel.com](https://vercel.com/)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

**Step 2: Push Code to GitHub**:

If not already done:
```bash
# Create repo on github.com first, then:
git remote add origin https://github.com/yourusername/client-website.git
git branch -M main
git push -u origin main
```

### Deploying the Project

**Method 1: Vercel Dashboard** (easiest):

1. Click "Add New Project"
2. Import from GitHub
3. Select your repository
4. Configure:
   - **Framework Preset**: Other
   - **Build Command**: `make build`
   - **Output Directory**: (leave empty or `.`)
   - **Install Command**: `make install`
5. Add environment variables (next section)
6. Click "Deploy"

**Method 2: Vercel CLI** (alternative):

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name? client-business-website
# - Directory? ./
# - Override settings? N
```

### Setting Environment Variables

**In Vercel Dashboard**:
1. Go to Project Settings
2. Click "Environment Variables"
3. Add each variable:

```
PORT=8080
ENV=production
SITE_URL=https://yourdomain.com
SITE_NAME=Client Business Name
SITE_DESCRIPTION=...
BREVO_API_KEY=...
BREVO_FROM_EMAIL=...
BREVO_FROM_NAME=...
BREVO_TO_EMAIL=...
RECAPTCHA_SITE_KEY=...
RECAPTCHA_SECRET_KEY=...
RECAPTCHA_THRESHOLD=0.5
GOOGLE_ANALYTICS_ID=...
```

**Important**:
- Set for "Production", "Preview", and "Development"
- Never expose secrets publicly
- Use production values (not localhost URLs)

**Save and redeploy**:
```bash
vercel --prod
```

---

## Part 3: Domain Configuration

### Understanding the Process

**Steps**:
1. Buy domain (client does this, or you help)
2. Get nameservers from Vercel
3. Update nameservers at registrar
4. Wait for DNS propagation (24-48 hours)
5. Verify site is live

### Adding Domain in Vercel

**Step 1: Add Domain**:
1. Go to Project Settings
2. Click "Domains"
3. Enter domain: `yourdomain.com`
4. Click "Add"

**Step 2: Choose Configuration Method**:

**Option A: Nameservers** (recommended):
- Vercel provides nameservers
- Point domain's nameservers to Vercel
- Vercel manages all DNS records
- Easiest for beginners

**Option B: A Record**:
- Add A record at your registrar
- Point to Vercel IP
- Keeps DNS at registrar
- More control, slightly more complex

**We'll use Option A (Nameservers)**.

**Step 3: Get Nameservers**:
Vercel will show nameservers like:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Updating Nameservers at Registrar

**Process varies by registrar. General steps**:

**Namecheap**:
1. Log in to Namecheap
2. Click "Domain List"
3. Click "Manage" next to domain
4. Find "Nameservers" section
5. Select "Custom DNS"
6. Enter Vercel nameservers
7. Click checkmark to save
8. Wait 24-48 hours

**GoDaddy**:
1. Log in to GoDaddy
2. Go to "My Products"
3. Click "DNS" next to domain
4. Scroll to "Nameservers"
5. Click "Change"
6. Select "I'll use my own nameservers"
7. Enter Vercel nameservers
8. Click "Save"
9. Wait 24-48 hours

**Google Domains** (now Squarespace):
1. Log in to domains.google.com
2. Click domain name
3. Click "DNS" in left sidebar
4. Find "Name servers"
5. Click "Use custom name servers"
6. Enter Vercel nameservers
7. Click "Save"
8. Wait 24-48 hours

### Checking DNS Propagation

**Tools**:
- [WhatsMyDNS.net](https://www.whatsmydns.net/)
- Enter your domain
- Select "A" or "NS" record type
- See propagation worldwide

**Expect**:
- Some locations update quickly (minutes to hours)
- Others take longer (up to 48 hours)
- This is normal!

### Verifying Site is Live

**Once DNS propagates**:
1. Visit `https://yourdomain.com`
2. Should show your site
3. SSL certificate automatic (https://)
4. Test all pages
5. Test contact form
6. Verify analytics tracking

**Troubleshooting**:
- **"DNS_PROBE_FINISHED_NXDOMAIN"** = DNS not propagated yet
- **"This site can't be reached"** = Nameservers not updated
- **"Not Secure" warning** = SSL still configuring (wait 5-10 minutes)

---

## Part 4: Post-Deployment Testing

### Complete Site Test

**Functionality**:
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Mobile menu works
- [ ] Contact form submits
- [ ] Email arrives at correct address
- [ ] Phone links work on mobile
- [ ] All images load
- [ ] No 404 errors

**Performance**:
- [ ] Run PageSpeed Insights
- [ ] All Core Web Vitals in "good" range
- [ ] Load time under 3 seconds
- [ ] Mobile score > 90

**SEO**:
- [ ] Verify in Search Console
- [ ] Submit sitemap
- [ ] Check robots.txt loads
- [ ] Verify meta tags in source
- [ ] Test Open Graph (share on social)
- [ ] Verify structured data

**Analytics**:
- [ ] Real-time tracking works
- [ ] Events fire correctly
- [ ] Goals set up (if applicable)

### Load Testing

**Test from Different Locations**:
- Use VPN or ask friends in other cities
- Verify fast load times everywhere
- Check mobile and desktop

**Test Different Browsers**:
- Chrome (latest)
- Safari (Mac/iOS)
- Firefox (latest)
- Edge (latest)

---

## Part 5: Client Documentation

### Creating Website Documentation

**Create `CLIENT_DOCUMENTATION.md` in project**:

```markdown
# Website Documentation for [Client Name]

## Overview
Your new website is live at: https://yourdomain.com

This document explains how to manage and update your website.

## Important Information

**Hosting**: Vercel (vercel.com)
**Domain**: Registered with [Registrar Name]
**Email Service**: Brevo (brevo.com)
**Analytics**: Google Analytics

## Access & Credentials

### Vercel (Hosting)
- Account: [client email or yours if managed]
- Access: [Shared with client? Or you manage?]

### Domain Registrar
- Website: [registrar website]
- Login: [client manages]
- Auto-renewal: [Yes/No]
- Expires: [date]

### Brevo (Email)
- Website: brevo.com
- Account: [email]
- API Key: Stored securely in Vercel

### Google Analytics
- Website: analytics.google.com
- Account: [email]
- Property: [property name]

## Website Updates

### Content Updates
[Explain how client can request changes or if they can make updates themselves]

### Emergency Updates
If urgent change needed:
1. Email: [your email]
2. Phone: [your phone]
3. Response time: Within 24 hours

## Maintenance Plan

### Included:
- [What you'll do for free/included]
- Security updates
- Bug fixes
- Minor content updates (X per month)

### Additional Services:
- Major redesigns: $[rate]
- New pages: $[rate]
- New features: $[rate]/hour

## Monthly/Annual Tasks

### Monthly:
- [ ] Review analytics
- [ ] Check for broken links
- [ ] Review form submissions
- [ ] Monitor site speed

### Annually:
- [ ] Renew domain (auto-renewal recommended)
- [ ] Review and update content
- [ ] Update team photos/bios
- [ ] Refresh testimonials

## Support

**Developer**: [Your Name]
**Email**: [Your Email]
**Phone**: [Your Phone]
**Hours**: [Your availability]

**For emergencies**: [Emergency contact method]

## Additional Resources

- Google Analytics Guide: [link]
- Brevo Help Center: [link]
- Vercel Documentation: [link]

---

Created: [Date]
Last Updated: [Date]
```

### Create Quick Reference Guide

**One-page printable guide**:

```markdown
# Quick Reference Guide

## Website
**URL**: https://yourdomain.com

## Contact Form
Emails go to: [email]
Check spam folder if not receiving

## Analytics
View visitors: analytics.google.com
Username: [email]

## Need Help?
Call/Text: [your phone]
Email: [your email]

## Annual Renewal
Domain renews: [date]
Cost: ~$12-15/year
Registrar: [registrar name]

**Set up auto-renewal to avoid losing domain!**

## Do NOT:
- Change nameservers
- Delete Vercel project
- Share API keys
- Modify code without backup

## Emergency Contacts
Web Developer: [your contact]
Domain Registrar: [support number]
Email Provider: [support number]
```

---

## Part 6: Client Training

### Training Session Agenda

**1. Website Overview** (10 min):
- Tour of all pages
- Point out key features
- Show mobile version
- Demonstrate contact form

**2. Analytics Dashboard** (15 min):
- Log in to Google Analytics
- Show real-time visitors
- Explain key metrics
- Set up email reports
- Show how to see traffic sources

**3. Managing Contact Form** (10 min):
- Where emails arrive
- How to respond
- Check spam folder
- Set up email filters

**4. Domain Management** (10 min):
- Where domain is registered
- How to renew
- Importance of auto-renewal
- What NOT to change (nameservers)

**5. Updates & Maintenance** (10 min):
- How to request content updates
- Response time expectations
- What's included in support
- How to report issues

**6. Best Practices** (5 min):
- Keep content fresh
- Respond to inquiries quickly
- Share on social media
- Encourage reviews
- Monitor analytics monthly

**7. Q&A** (10 min)

### Training Materials

**Provide**:
- Screen recording of walkthrough
- Client documentation
- Quick reference guide
- Contact information
- Analytics login details

---

## Part 7: Ongoing Maintenance Plan

### Maintenance Options

**Option 1: One-Time Delivery**:
- Hand off completely
- Provide documentation
- Client manages everything
- You available for paid updates

**Option 2: Monthly Retainer**:
- Monitor site health
- Make minor updates
- Respond to issues
- Generate monthly reports
- Price: $50-200/month depending on scope

**Option 3: Hybrid**:
- Client manages day-to-day
- You handle technical issues
- Quarterly check-ins
- Ad-hoc paid updates

### What to Monitor

**Monthly**:
- Site uptime (Vercel provides this)
- Performance scores
- Broken links
- Form submissions working
- Analytics trends

**Quarterly**:
- Content review
- SEO rankings
- Competitor analysis
- Backup verification
- Security updates

**Annually**:
- Major content refresh
- Design modernization review
- New feature opportunities
- Technology updates

---

## Part 8: Launch Day

### Pre-Launch Final Check

**24 Hours Before**:
- [ ] Final client approval
- [ ] All content verified
- [ ] Test on production URL
- [ ] Verify contact form works
- [ ] Check all links
- [ ] Verify phone numbers
- [ ] Test from mobile devices
- [ ] Clear browser cache and retest

**Launch Day**:
- [ ] Verify site is live
- [ ] Test from multiple devices/locations
- [ ] Send test contact form
- [ ] Verify Google Analytics tracking
- [ ] Check Search Console
- [ ] Take screenshots for portfolio
- [ ] Announce on social media (with permission)

### Launch Announcement

**Help Client Announce**:

**Social Media Post Template**:
```
🎉 Exciting News! 🎉

We're thrilled to announce the launch of our new website!

Visit us at [yourdomain.com] to:
✨ Learn more about our services
✨ See what makes us different
✨ Get in touch easily

Check it out and let us know what you think! 💻

#NewWebsite #SmallBusiness #[YourCity]
```

**Email to Existing Customers**:
```
Subject: Check Out Our Brand New Website!

Hi [Name],

We're excited to share that we've just launched our new website!

Visit [yourdomain.com] to see:
- Easy online contact form
- Updated service information
- Our story and mission
- [Other key features]

We'd love to hear what you think. And if you know anyone who could use our services, please share!

Thank you for your continued support.

Best regards,
[Business Name]
```

---

## Exercises

### Exercise 1: Deploy to Vercel (45 minutes)

**Tasks**:
1. Create Vercel account
2. Push code to GitHub
3. Import project to Vercel
4. Configure build settings
5. Add environment variables
6. Deploy successfully
7. Test deployment URL
8. Fix any errors

**Deliverable**: Live site on Vercel subdomain

### Exercise 2: Domain Configuration (30 minutes)

**Tasks**:
1. Register domain (if not already done)
2. Add domain in Vercel
3. Get nameservers
4. Update nameservers at registrar
5. Monitor DNS propagation
6. Verify site loads on custom domain
7. Check SSL certificate

**Deliverable**: Site live on custom domain with HTTPS

### Exercise 3: Post-Launch Testing (40 minutes)

**Tasks**:
1. Test all pages on live site
2. Run PageSpeed Insights
3. Test contact form submission
4. Verify email delivery
5. Check analytics tracking
6. Test from mobile device
7. Test from different browser
8. Create issues list if any found

**Deliverable**: Complete test report

### Exercise 4: Client Documentation (30 minutes)

**Tasks**:
1. Create CLIENT_DOCUMENTATION.md
2. Fill in all sections with actual info
3. Create quick reference guide
4. Gather all login credentials
5. Create video walkthrough (screen recording)
6. Compile into client package

**Deliverable**: Complete documentation package

### Exercise 5: Portfolio Case Study (25 minutes)

**Tasks**:
1. Take screenshots of final site
2. Write brief project description
3. List technologies used
4. Highlight key features
5. Include before/after or results
6. Add to your portfolio

**Deliverable**: Portfolio-ready case study

---

## Assessment Checklist

By the end of this module, you should have:
- [ ] Site deployed to Vercel production
- [ ] Custom domain connected and working
- [ ] Environment variables configured correctly
- [ ] All functionality tested on live site
- [ ] Client documentation created
- [ ] Training session delivered
- [ ] Maintenance plan established
- [ ] Launch announced
- [ ] Portfolio piece created
- [ ] Client satisfied and signed off

## Project Handoff Checklist

**Deliverables to Client**:
- [ ] Live website URL
- [ ] Admin/access credentials (documented)
- [ ] Client documentation
- [ ] Quick reference guide
- [ ] Analytics access
- [ ] Source code (GitHub repo access)
- [ ] Training video recording
- [ ] Contact information for support

**Developer Tasks**:
- [ ] Final invoice sent (if applicable)
- [ ] Add to portfolio
- [ ] Request testimonial/review
- [ ] Connect on LinkedIn
- [ ] Schedule follow-up check-in (1 month)

---

## Deployment Troubleshooting

**Build Fails on Vercel**:
- Check build logs
- Ensure `make build` works locally
- Verify all dependencies in go.mod
- Check environment variables are set

**Site Shows 404**:
- Verify routes in main.go
- Check vercel.json configuration
- Ensure static files are in correct directory

**Environment Variables Not Working**:
- Check they're set for correct environment (Production)
- Verify names match exactly (case-sensitive)
- Redeploy after adding variables

**Slow Performance**:
- Run PageSpeed Insights
- Optimize images further
- Check for large dependencies
- Review database queries (if applicable)

**Contact Form Not Working**:
- Check Brevo API key is correct
- Verify email addresses are valid
- Check reCAPTCHA keys are for correct domain
- Review server logs for errors

---

## Conclusion

Congratulations! You've completed the full journey:

1. ✅ Discovered client needs (Module 1)
2. ✅ Set up development environment (Module 2)
3. ✅ Applied professional design (Module 3)
4. ✅ Customized all content (Module 4)
5. ✅ Implemented contact system (Module 5)
6. ✅ Optimized for SEO (Module 6)
7. ✅ Deployed to production (Module 7)

**You've built a professional, production-ready website!**

### What's Next?

**For Your Portfolio**:
- Document this project
- Take quality screenshots
- Write a case study
- Share on LinkedIn
- Add to resume

**For Your Career**:
- Build 2-3 more sites to solidify skills
- Offer services to local businesses
- Join web development communities
- Keep learning and improving
- Consider specializing (React, backend, etc.)

**For This Client**:
- Check in after 1 month
- Offer ongoing support
- Ask for referrals
- Request testimonial
- Keep relationship warm

---

**Final Pro Tip**: The relationship doesn't end at launch. Great developers stay in touch, provide value, and build long-term relationships. Your client is your best source of referrals!

**You did it! 🎉**
