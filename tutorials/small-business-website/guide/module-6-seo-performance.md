# Module 6: SEO & Performance

**Duration**: 2-3 class periods (90-135 minutes total)

**Learning Objectives**:
- Optimize meta tags for search engines
- Implement Open Graph tags for social sharing
- Understand and improve Core Web Vitals
- Optimize images and assets
- Set up Google Analytics and Search Console
- Create XML sitemap
- Implement structured data (Schema.org)
- Test with professional SEO tools

## Prerequisites

Before starting this module, you should have:
- Completed Modules 1-5
- All pages content finalized
- Site functional with working contact form
- Google account for Analytics and Search Console

---

## Part 1: SEO Fundamentals

### What is SEO?

**Search Engine Optimization (SEO)** = Making your site easier for search engines to understand and rank.

**Why SEO Matters for Small Business**:
- 68% of online experiences begin with a search engine
- 75% of users never scroll past the first page of results
- Local SEO is crucial (46% of Google searches are local)
- Organic search drives 53% of website traffic

**Three Pillars of SEO**:
1. **Technical SEO** - Site structure, speed, mobile-friendliness
2. **On-Page SEO** - Content, keywords, meta tags
3. **Off-Page SEO** - Backlinks, reviews, social signals

**We'll focus on** #1 and #2 (what you control).

### Understanding Meta Tags

**The Meta Tags That Matter**:

**1. Title Tag** (`<title>`):
- Shows in search results and browser tab
- 50-60 characters optimal
- Include primary keyword
- Unique for each page

**2. Meta Description**:
- Shows in search results below title
- 150-160 characters optimal
- Compelling copy that encourages clicks
- Include keyword naturally

**3. Viewport Meta** (mobile):
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
```

**4. Charset**:
```html
<meta charset="UTF-8"/>
```

**5. Robots**:
```html
<meta name="robots" content="index, follow"/>
```

### Our Meta Tag System

**Good news**: The starter template already has a meta tag system!

**Review `internal/models/meta.go`**:
```go
type PageMeta struct {
    Title         string
    Description   string
    Keywords      string
    OGTitle       string
    OGDescription string
    OGImage       string
    OGURL         string
    OGType        string
    CanonicalURL  string
    Robots        string
}
```

**Check `views/layouts/base.templ`**:
```templ
<title>{ meta.Title }</title>
<meta name="description" content={ meta.Description }/>
<meta property="og:title" content={ meta.OGTitle }/>
<!-- etc. -->
```

**It's already implemented!** We just need to optimize the content.

---

## Part 2: Optimizing Page Meta Tags

### Homepage Meta Tags

**Edit `internal/handlers/pages.go` - Home handler**:

```go
func (h *PageHandlers) Home(c echo.Context) error {
    // Create optimized meta tags
    meta := models.NewPageMeta(
        // Title: Business Name + Main Keyword + Location
        "ABC Plumbing - 24/7 Emergency Plumber in Austin, TX",

        // Description: Value prop + CTA
        "Licensed emergency plumber serving Austin. Same-day service, upfront pricing, 100% satisfaction guaranteed. Call now for fast, reliable plumbing repairs.",
    ).WithURL(h.config.SiteURL).
      WithImage(h.config.SiteURL + "/static/images/og-home.jpg").
      WithKeywords("plumber Austin, emergency plumbing, Austin plumber, plumbing repair")

    return h.render(c, pages.Home(meta, h.config))
}
```

**Title Formula**: `[Business Name] - [Main Service] in [Location]`

**Examples**:
- "Joe's Pizza - Authentic Italian Restaurant in Brooklyn, NY"
- "Smith Law - Personal Injury Attorney in Dallas, Texas"
- "Bright Smiles Dental - Family Dentist in Seattle, WA"

### Service Pages Meta Tags

**Make each service page unique**:

```go
func (h *PageHandlers) Services(c echo.Context) error {
    meta := models.NewPageMeta(
        // Specific service + location
        "Plumbing Services in Austin - Repairs, Installation & More",

        // What services, who for, benefit
        "Complete residential plumbing services in Austin, TX. From emergency repairs to installations, our licensed plumbers deliver quality work. Call for a free quote.",
    ).WithURL(h.config.SiteURL + "/services").
      WithImage(h.config.SiteURL + "/static/images/og-services.jpg").
      WithKeywords("plumbing services Austin, plumber near me, plumbing installation, drain cleaning Austin")

    return h.render(c, pages.Services(meta, h.config, services))
}
```

### Using AI to Write Meta Tags

**Prompt Template**:
```
Write SEO-optimized meta tags for a [page type] page of a [industry] website.

Business: [name]
Location: [city, state]
Main Keywords: [keyword 1, keyword 2, keyword 3]
Page Focus: [what the page is about]

Generate:
1. Title tag (50-60 characters, include location and main keyword)
2. Meta description (150-160 characters, compelling and actionable)
3. Keywords list (5-10 keywords, most important first)

Make the title and description appealing to humans while optimized for search engines. Include location for local SEO.
```

**Example**:
```
Write SEO-optimized meta tags for a services page of a plumbing website.

Business: ABC Plumbing
Location: Austin, TX
Main Keywords: plumbing services, emergency plumber, drain cleaning
Page Focus: Overview of all plumbing services offered

[AI generates optimized tags]
```

---

## Part 3: Open Graph Tags for Social Sharing

### What are Open Graph Tags?

**Open Graph (OG)** tags control how your site appears when shared on social media.

**Without OG tags**:
- Random or missing image
- Generic description
- Unprofessional appearance

**With OG tags**:
- Custom image
- Compelling title and description
- Professional, clickable preview

### Implementing OG Tags

**Already in template!** Just need to add images and verify content.

**Add OG Image for Each Page**:

1. Create images (recommended size: 1200x630px)
2. Save in `static/images/`:
   - `og-home.jpg`
   - `og-about.jpg`
   - `og-services.jpg`
   - `og-contact.jpg`

3. Update handlers with `.WithImage()`:
```go
meta := models.NewPageMeta(title, description).
    WithURL(h.config.SiteURL + "/about").
    WithImage(h.config.SiteURL + "/static/images/og-about.jpg")
```

### Testing OG Tags

**Tools**:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

**Process**:
1. Deploy site (even to staging)
2. Enter URL in validator
3. See preview
4. Fix any issues
5. Re-scrape to update cache

---

## Part 4: Schema.org Structured Data

### What is Structured Data?

**Structured data** helps search engines understand your content better.

**Benefits**:
- Rich snippets in search results (star ratings, prices, etc.)
- Knowledge Graph inclusion
- Voice search optimization
- Better local SEO

### Implementing Local Business Schema

**Add to `views/layouts/base.templ`** in the `<head>`:

```templ
<!-- Structured Data (Schema.org) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{ config.SiteName }",
  "image": "{ config.SiteURL }/static/images/logo.jpg",
  "description": "{ config.SiteDescription }",
  "@id": "{ config.SiteURL }",
  "url": "{ config.SiteURL }",
  "telephone": "+15551234567",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Business St",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.2672,
    "longitude": -97.7431
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://www.facebook.com/yourbusiness",
    "https://www.instagram.com/yourbusiness",
    "https://www.linkedin.com/company/yourbusiness"
  ]
}
</script>
```

**Customize**:
- Replace all placeholder data with client's actual information
- Add/remove social media URLs
- Update business hours
- Include correct coordinates (get from Google Maps)

### Testing Structured Data

**Use Google's Rich Results Test**:
1. Visit [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
2. Enter your URL
3. Click "Test URL"
4. Review results and fix any errors

---

## Part 5: Core Web Vitals & Performance

### Understanding Core Web Vitals

**Core Web Vitals** = Google's page experience metrics.

**The Three Metrics** (2025):

**1. LCP (Largest Contentful Paint)**:
- How long until main content loads
- Target: Under 2.5 seconds
- **How to improve**: Optimize images, reduce server response time

**2. INP (Interaction to Next Paint)**:
- How quickly page responds to interactions
- Target: Under 200ms
- **How to improve**: Minimize JavaScript, optimize event handlers

**3. CLS (Cumulative Layout Shift)**:
- How much content shifts while loading
- Target: Below 0.1
- **How to improve**: Set image dimensions, avoid inserting content above existing content

**Why They Matter**:
- Direct ranking factor
- 24% boost for sites meeting all targets
- Poor scores = lower rankings

### Testing Your Site's Performance

**Use Google PageSpeed Insights**:
1. Visit [pagespeed.web.dev](https://pagespeed.web.dev/)
2. Enter your URL
3. Wait for analysis
4. Review scores (0-100):
   - 90-100: Good
   - 50-89: Needs improvement
   - 0-49: Poor

**Test both**: Mobile and Desktop

### Optimizing Images

**Images are usually the #1 performance issue.**

**Best Practices**:

**1. Use Modern Formats**:
- WebP (smaller than JPEG/PNG)
- AVIF (even smaller, cutting edge)
- Fallback to JPEG/PNG for compatibility

**2. Optimize File Size**:
- Compress before uploading
- Tools: TinyPNG, Squoosh, ImageOptim
- Target: Under 200KB for photos, under 50KB for logos

**3. Use Correct Dimensions**:
```html
<!-- Always specify width and height -->
<img
    src="/static/images/hero.jpg"
    alt="Description"
    width="1200"
    height="600"
    class="w-full h-auto"
/>
```

**4. Lazy Loading**:
```html
<img src="image.jpg" alt="..." loading="lazy"/>
```

**5. Responsive Images**:
```html
<img
    srcset="
        hero-small.jpg 400w,
        hero-medium.jpg 800w,
        hero-large.jpg 1200w
    "
    sizes="(max-width: 768px) 400px, (max-width: 1024px) 800px, 1200px"
    src="hero-large.jpg"
    alt="..."
/>
```

### CSS and Font Optimization

**Already optimized in template**:
- Tailwind CSS purges unused styles
- Single CSS file
- Minified in production

**Font Loading**:
```html
<!-- Preconnect to font sources -->
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>

<!-- Load fonts with display=swap to prevent FOIT -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
```

### Vercel Optimizations

**Automatic optimizations Vercel provides**:
- Global CDN (content served from nearest location)
- Automatic image optimization
- Brotli compression
- HTTP/2
- Auto-scaling

**No configuration needed!**

---

## Part 6: Google Analytics Setup

### Why Analytics?

**Track**:
- How many visitors
- Where they come from
- What pages they visit
- How long they stay
- Conversions (contact form submissions, calls)

### Setting Up Google Analytics 4

**Step 1: Create Account**:
1. Visit [analytics.google.com](https://analytics.google.com/)
2. Click "Start measuring"
3. Enter account name
4. Configure data sharing (optional)
5. Click "Next"

**Step 2: Create Property**:
1. Property name: "Client Business Website"
2. Time zone and currency
3. Click "Next"

**Step 3: Business Information**:
1. Industry category
2. Business size
3. How you'll use Analytics
4. Click "Create"

**Step 4: Accept Terms**

**Step 5: Get Measurement ID**:
1. Choose "Web" platform
2. Enter website URL
3. Stream name: "Main Website"
4. Click "Create stream"
5. Copy "Measurement ID" (starts with G-)

### Adding Analytics to Your Site

**Edit `views/layouts/base.templ`** - add to `<head>`:

```templ
if config.Env == "production" {
    <!-- Google Analytics -->
    <script async src={ "https://www.googletagmanager.com/gtag/js?id=" + config.GoogleAnalyticsID }></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '{ config.GoogleAnalyticsID }');
    </script>
}
```

**Add to `internal/models/config.go`**:
```go
type Config struct {
    // ... existing fields ...
    GoogleAnalyticsID string
}

func LoadConfig() (*Config, error) {
    cfg := &Config{
        // ... existing config ...
        GoogleAnalyticsID: os.Getenv("GOOGLE_ANALYTICS_ID"),
    }
    return cfg, nil
}
```

**Add to `.env`**:
```env
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

**Important**: Only load analytics in production (see `if config.Env == "production"`)

### Tracking Contact Form Submissions

**Add event tracking when form succeeds**:

```javascript
// In the HTMX success handler
if (e.detail.successful) {
    // Track conversion
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
            'event_category': 'Contact',
            'event_label': 'Contact Form'
        });
    }

    // Show success message...
}
```

---

## Part 7: Google Search Console

### What is Search Console?

**Google Search Console** shows:
- Which queries bring traffic
- How you rank for keywords
- Index status (which pages Google knows about)
- Mobile usability issues
- Core Web Vitals issues

### Setting Up Search Console

**Step 1: Add Property**:
1. Visit [search.google.com/search-console](https://search.google.com/search-console/)
2. Click "Add Property"
3. Enter your domain: `yourdomain.com`
4. Click "Continue"

**Step 2: Verify Ownership**:

**Option A: HTML File** (easiest for Vercel):
1. Download verification file
2. Add to `static/` folder
3. Deploy
4. Click "Verify"

**Option B: DNS** (if you manage DNS):
1. Add TXT record to DNS
2. Wait for propagation
3. Click "Verify"

**Step 3: Submit Sitemap** (next section)

---

## Part 8: XML Sitemap

### What is a Sitemap?

**Sitemap** = List of all pages on your site for search engines.

**Benefits**:
- Helps Google discover all pages
- Shows page hierarchy
- Indicates update frequency

### Creating a Sitemap Handler

**Create `internal/handlers/sitemap.go`**:

```go
package handlers

import (
	"encoding/xml"
	"net/http"

	"github.com/labstack/echo/v4"
)

// SitemapURL represents a URL in the sitemap
type SitemapURL struct {
	Loc        string  `xml:"loc"`
	LastMod    string  `xml:"lastmod,omitempty"`
	ChangeFreq string  `xml:"changefreq,omitempty"`
	Priority   float64 `xml:"priority,omitempty"`
}

// URLSet is the root element of the sitemap
type URLSet struct {
	XMLName xml.Name     `xml:"urlset"`
	Xmlns   string       `xml:"xmlns,attr"`
	URLs    []SitemapURL `xml:"url"`
}

// SitemapHandler handles sitemap generation
type SitemapHandler struct {
	baseURL string
}

// NewSitemapHandler creates a new sitemap handler
func NewSitemapHandler(baseURL string) *SitemapHandler {
	return &SitemapHandler{baseURL: baseURL}
}

// GetSitemap generates the XML sitemap
func (h *SitemapHandler) GetSitemap(c echo.Context) error {
	sitemap := URLSet{
		Xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
		URLs: []SitemapURL{
			{
				Loc:        h.baseURL + "/",
				ChangeFreq: "weekly",
				Priority:   1.0,
			},
			{
				Loc:        h.baseURL + "/about",
				ChangeFreq: "monthly",
				Priority:   0.8,
			},
			{
				Loc:        h.baseURL + "/services",
				ChangeFreq: "monthly",
				Priority:   0.9,
			},
			{
				Loc:        h.baseURL + "/contact",
				ChangeFreq: "monthly",
				Priority:   0.7,
			},
		},
	}

	c.Response().Header().Set("Content-Type", "application/xml")
	c.Response().WriteHeader(http.StatusOK)

	encoder := xml.NewEncoder(c.Response())
	encoder.Indent("", "  ")

	if err := encoder.Encode(sitemap); err != nil {
		return err
	}

	return nil
}
```

**Add route in `cmd/server/main.go`**:

```go
sitemapHandler := handlers.NewSitemapHandler(cfg.SiteURL)
e.GET("/sitemap.xml", sitemapHandler.GetSitemap)
```

**Test**: Visit `http://localhost:7331/sitemap.xml`

**Submit to Search Console**:
1. Go to Search Console
2. Sitemaps section (left sidebar)
3. Enter: `https://yourdomain.com/sitemap.xml`
4. Click "Submit"

---

## Part 9: Robots.txt

### Creating robots.txt

**Create `static/robots.txt`**:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

**Update with your actual domain before deploying!**

**What it means**:
- `User-agent: *` = Applies to all crawlers
- `Allow: /` = Can crawl everything
- `Sitemap:` = Where to find sitemap

**Serve it**:
Add route in `cmd/server/main.go`:
```go
e.Static("/robots.txt", "static/robots.txt")
```

---

## Exercises

### Exercise 1: Meta Tag Optimization (30 minutes)

**Tasks**:
1. Review current meta tags on all pages
2. Use AI to generate optimized versions
3. Ensure all titles are under 60 characters
4. Ensure all descriptions are 150-160 characters
5. Include location and keywords naturally
6. Make each page unique
7. Test with SEO preview tool

**Deliverable**: All pages with optimized meta tags

### Exercise 2: Core Web Vitals Test (30 minutes)

**Tasks**:
1. Run PageSpeed Insights on all pages
2. Document scores for LCP, INP, CLS
3. Identify top 3 issues
4. Fix image size issues
5. Add width/height to images
6. Add lazy loading where appropriate
7. Re-test and compare scores

**Deliverable**: Improved PageSpeed scores, before/after screenshots

### Exercise 3: Structured Data Implementation (25 minutes)

**Tasks**:
1. Gather all client business information
2. Add LocalBusiness schema to base layout
3. Include all relevant fields (address, phone, hours, etc.)
4. Add social media URLs
5. Test with Google Rich Results Test
6. Fix any validation errors

**Deliverable**: Valid structured data with zero errors

### Exercise 4: Analytics Setup (20 minutes)

**Tasks**:
1. Create Google Analytics 4 property
2. Get measurement ID
3. Add to .env
4. Integrate GA code in base layout
5. Test with browser extension (Google Analytics Debugger)
6. Add event tracking for contact form submission
7. Verify events in GA real-time view

**Deliverable**: Working analytics with event tracking

### Exercise 5: Complete SEO Audit (40 minutes)

**Tasks**:
1. Create checklist of all SEO elements
2. Verify each page:
   - Unique title and description
   - Proper heading hierarchy (h1, h2, h3)
   - Alt text on all images
   - Internal linking
   - Mobile-friendly
   - Fast load time
3. Create sitemap
4. Submit to Search Console
5. Generate SEO report

**Deliverable**: Complete SEO audit checklist

---

## Assessment Checklist

Before moving to Module 7, you should be able to:
- [ ] Write effective meta tags for SEO
- [ ] Implement Open Graph tags
- [ ] Add structured data (Schema.org)
- [ ] Optimize images for performance
- [ ] Test and improve Core Web Vitals
- [ ] Set up Google Analytics
- [ ] Set up Google Search Console
- [ ] Create and submit XML sitemap
- [ ] Test with professional SEO tools
- [ ] Understand local SEO basics

## SEO Checklist for Launch

**Technical SEO**:
- [ ] All pages have unique, optimized titles
- [ ] All pages have compelling meta descriptions
- [ ] Proper heading hierarchy (one h1, then h2, h3)
- [ ] All images have descriptive alt text
- [ ] Mobile-friendly (responsive)
- [ ] Fast load time (< 3 seconds)
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] XML sitemap created and submitted
- [ ] robots.txt in place
- [ ] Google Analytics installed
- [ ] Google Search Console verified

**On-Page SEO**:
- [ ] Content includes target keywords naturally
- [ ] Internal linking between pages
- [ ] Clear calls-to-action
- [ ] Contact information visible
- [ ] Location mentioned on every page (local SEO)

**Structured Data**:
- [ ] LocalBusiness schema implemented
- [ ] Schema validated with no errors
- [ ] Social media profiles linked

**Performance**:
- [ ] PageSpeed score > 90 (mobile and desktop)
- [ ] All Core Web Vitals in "good" range
- [ ] Images optimized and compressed
- [ ] Fonts loaded efficiently

---

## Next Module

In **Module 7: Deployment & Handoff**, you'll:
- Deploy to Vercel production
- Connect custom domain
- Configure DNS
- Set environment variables
- Create client documentation
- Provide training
- Set up ongoing maintenance plan
- Hand off the completed project

You're almost done - time to launch!

---

**Pro Tip**: SEO is a long-term game. Don't expect immediate results. It typically takes 3-6 months to see significant ranking improvements. But proper foundation from day one sets you up for success!
