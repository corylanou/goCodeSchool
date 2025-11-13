# Module 4: Core Pages

**Duration**: 3-4 class periods (135-180 minutes total)

**Learning Objectives**:
- Customize all page content for your specific client
- Write compelling, conversion-focused copy
- Work effectively with Templ templates
- Add dynamic interactions with HTMX
- Implement social proof (testimonials, reviews)
- Create effective calls-to-action
- Use AI to generate and refine content

## Prerequisites

Before starting this module, you should have:
- Completed Modules 1-3
- Client content gathered (from requirements checklist)
- Brand colors and fonts applied
- Site accessible and responsive

---

## Part 1: Homepage Content Strategy

### Homepage Purpose

The homepage has ONE job:
> Get visitors to take the next action (call, email, fill form, read more)

**Homepage is NOT**:
- ❌ A place to put everything about your business
- ❌ An essay about your history
- ❌ A wall of text

**Homepage IS**:
- ✅ Clear value proposition
- ✅ Trust indicators
- ✅ Compelling call-to-action
- ✅ Easy navigation to other pages

### Homepage Structure (Template)

**1. Hero Section** (above the fold):
- Compelling headline
- Supporting subheadline
- Primary CTA button
- Hero image or visual

**2. Value Propositions** (why choose us):
- 3-5 key benefits
- Icons or images
- Brief descriptions

**3. Services Overview**:
- Top 3-4 services
- Link to services page
- Visual elements

**4. Social Proof**:
- 2-3 testimonials
- Trust indicators (years in business, awards, certifications)
- Client logos (if applicable)

**5. Final CTA**:
- Restate value
- Strong action button
- Remove friction

### Writing the Hero Headline

**Formula**: [What You Do] + [Who It's For] + [Key Benefit]

**Examples**:

**Before** (generic):
```
"Welcome to ABC Plumbing"
```

**After** (specific):
```
"24/7 Emergency Plumbing for Austin Homeowners"
"Professional Plumbing Services You Can Trust"
"Fast, Reliable Plumbing Repairs - Same Day Service"
```

**Client Example - Restaurant**:
```
Before: "Welcome to Giovanni's"
After:  "Authentic Italian Cuisine in the Heart of Downtown"
```

**Client Example - Consulting**:
```
Before: "Business Consulting Services"
After:  "Help Growing Businesses Scale Without the Overwhelm"
```

**Your Turn**: Use AI to generate options
```
Prompt: "Generate 5 compelling hero headlines for a [industry] business that [what they do]. Target audience is [audience description]. The business is located in [location] and their unique value is [differentiation]."
```

### Customizing the Hero Section

**Edit `views/pages/home.templ`**:

```templ
<!-- Hero Section -->
<section class="section-padding bg-gradient-to-br from-primary-50 to-white">
    <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center">
            <!-- Replace this with client's headline -->
            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                24/7 Emergency Plumbing for Austin Homeowners
            </h1>

            <!-- Replace with client's value proposition -->
            <p class="text-xl text-gray-600 mb-8 text-balance">
                Licensed, insured plumbers ready to help. Same-day service,
                upfront pricing, and a 100% satisfaction guarantee.
            </p>

            <!-- Update CTA buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+15551234567" class="btn-primary text-lg">
                    Call Now: (555) 123-4567
                </a>
                <a href="/contact" class="btn-secondary text-lg">
                    Request Service
                </a>
            </div>
        </div>
    </div>
</section>
```

**Key Points**:
1. Use client's actual phone number
2. Make primary CTA actionable (not generic "Learn More")
3. Keep headline under 12 words if possible
4. Use `text-balance` for better line breaks

### Adding Hero Image

**Option 1: Background Image**:

```templ
<section class="relative min-h-[600px] flex items-center">
    <!-- Background image -->
    <div class="absolute inset-0 z-0">
        <img
            src="/static/images/hero-bg.jpg"
            alt="Plumber fixing sink"
            class="w-full h-full object-cover"
        />
        <!-- Overlay for text readability -->
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

    <!-- Content -->
    <div class="container-custom relative z-10">
        <div class="max-w-3xl text-white">
            <h1 class="text-5xl md:text-6xl font-bold mb-6">
                Your Headline Here
            </h1>
            <!-- ... rest of content ... -->
        </div>
    </div>
</section>
```

**Option 2: Side-by-Side Layout**:

```templ
<section class="section-padding">
    <div class="container-custom">
        <div class="grid md:grid-cols-2 gap-8 items-center">
            <!-- Text content -->
            <div>
                <h1 class="text-4xl md:text-5xl font-bold mb-4">
                    Your Headline
                </h1>
                <p class="text-xl text-gray-600 mb-6">
                    Supporting text
                </p>
                <a href="/contact" class="btn-primary">Get Started</a>
            </div>

            <!-- Image -->
            <div>
                <img
                    src="/static/images/hero.jpg"
                    alt="Descriptive alt text"
                    class="rounded-lg shadow-xl"
                />
            </div>
        </div>
    </div>
</section>
```

---

## Part 2: Services Page Customization

### Services Content Strategy

**Each Service Needs**:
1. Clear name/title
2. What it is (brief description)
3. Benefits (why they need it)
4. Process (how it works, optional)
5. Pricing (if applicable)
6. Call-to-action

### Using AI to Write Service Descriptions

**Prompt Template**:
```
Write a compelling service description for a [industry] business.

Service: [service name]
What it includes: [brief list]
Target customer: [who needs this]
Key benefit: [main problem it solves]
Tone: [professional/friendly/technical]

Format:
- Opening paragraph (2-3 sentences explaining what it is)
- 3-4 bullet points of key benefits
- Closing sentence with call-to-action

Keep it under 150 words, focus on benefits not features.
```

**Example - Plumbing Service**:
```
Write a compelling service description for a residential plumbing business.

Service: Emergency Plumbing Repairs
What it includes: 24/7 availability, leak fixes, burst pipes, clogged drains
Target customer: Homeowners with urgent plumbing issues
Key benefit: Fast response prevents water damage and costly repairs
Tone: Reassuring and professional

[AI generates description]
```

### Customizing Services Page

**Edit `views/pages/services.templ`**:

```templ
<!-- Service 1 -->
<div class="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-shadow">
    <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
        <!-- Use appropriate icon -->
        <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <!-- Icon path here -->
        </svg>
    </div>

    <!-- Client's actual service name -->
    <h3 class="text-2xl font-bold text-gray-900 mb-4">
        Emergency Plumbing Repairs
    </h3>

    <!-- AI-generated or client-provided description -->
    <p class="text-gray-600 mb-6">
        When disaster strikes, we're here 24/7. Our licensed plumbers respond
        quickly to handle burst pipes, major leaks, and urgent repairs. Fast
        response prevents water damage and gives you peace of mind.
    </p>

    <!-- Benefits list -->
    <ul class="space-y-2 mb-6">
        <li class="flex items-start">
            <svg class="w-6 h-6 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-700">24/7 emergency availability</span>
        </li>
        <li class="flex items-start">
            <svg class="w-6 h-6 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-700">Average 60-minute response time</span>
        </li>
        <li class="flex items-start">
            <svg class="w-6 h-6 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-700">Upfront pricing before we start</span>
        </li>
    </ul>

    <a href="/contact" class="btn-primary inline-block">
        Request Emergency Service
    </a>
</div>
```

**Repeat for each service** - duplicate the card, update content.

### Making Services Dynamic with Data

For a more maintainable approach, create a data structure:

**Update `internal/handlers/pages.go`**:

```go
type Service struct {
    Title       string
    Description string
    Benefits    []string
    IconPath    string
}

func (h *PageHandlers) Services(c echo.Context) error {
    services := []Service{
        {
            Title:       "Emergency Plumbing Repairs",
            Description: "When disaster strikes, we're here 24/7...",
            Benefits: []string{
                "24/7 emergency availability",
                "Average 60-minute response time",
                "Upfront pricing before we start",
            },
            IconPath: "M9.663 17h4.673M12 3v1m6.364...",
        },
        // Add more services
    }

    meta := models.NewPageMeta(
        "Our Services - "+h.config.SiteName,
        "Professional plumbing services...",
    ).WithURL(h.config.SiteURL + "/services")

    return h.render(c, pages.Services(meta, h.config, services))
}
```

**Update `views/pages/services.templ`**:

```templ
package pages

import (
    "github.com/gocodeschool/small-business-website/internal/models"
    "github.com/gocodeschool/small-business-website/internal/handlers"
    "github.com/gocodeschool/small-business-website/views/layouts"
)

templ Services(meta *models.PageMeta, config *models.Config, services []handlers.Service) {
    @layouts.Base(meta, config) {
        <!-- ... header ... -->

        <section class="section-padding bg-white">
            <div class="container-custom">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    for _, service := range services {
                        <div class="bg-white border border-gray-200 rounded-lg p-8">
                            <h3 class="text-2xl font-bold mb-4">{ service.Title }</h3>
                            <p class="text-gray-600 mb-6">{ service.Description }</p>

                            <ul class="space-y-2 mb-6">
                                for _, benefit := range service.Benefits {
                                    <li class="flex items-start">
                                        <svg class="w-6 h-6 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>{ benefit }</span>
                                    </li>
                                }
                            </ul>

                            <a href="/contact" class="btn-primary">Learn More</a>
                        </div>
                    }
                </div>
            </div>
        </section>
    }
}
```

---

## Part 3: About Page Storytelling

### About Page Purpose

**What it's for**:
- Build trust and connection
- Humanize your business
- Explain your mission and values
- Showcase your team

**What it's NOT**:
- A boring corporate history lesson
- A wall of text about yourself
- A resume

### The Story Arc

**Good About Pages Follow This Structure**:

1. **The Hook** - Why you started
2. **The Challenge** - Problem you noticed
3. **The Solution** - How you help
4. **The Mission** - Your driving purpose
5. **The Team** - Who delivers the service
6. **The Invitation** - How to work with you

### Writing an Engaging Company Story

**AI Prompt for About Page**:
```
Write an engaging "About Us" page for a [industry] business with this information:

Background:
- Founded in [year]
- Started because [reason/problem founder noticed]
- Grew from [starting point] to [current state]

Mission:
[What drives the business, their core purpose]

Values:
[List 3-5 values]

Team:
[Brief description of team size and expertise]

Tone: [Conversational/Professional/Warm]
Length: 300-400 words

Structure it as a compelling story, not a list of facts. Focus on the "why" behind the business, not just the "what."
```

### Customizing About Page

**Edit `views/pages/about.templ`**:

```templ
<!-- Company Story Section -->
<section class="section-padding bg-white">
    <div class="container-custom">
        <div class="max-w-4xl mx-auto">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <!-- Image -->
                <div>
                    <img
                        src="/static/images/team-photo.jpg"
                        alt="Owner John Smith with team in front of service van"
                        class="rounded-lg shadow-lg"
                    />
                </div>

                <!-- Story -->
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">
                        Our Story
                    </h2>

                    <!-- Use AI-generated or client-provided story -->
                    <p class="text-gray-600 mb-4">
                        Started in 2015 when John Smith noticed too many homeowners
                        getting overcharged for simple plumbing repairs, ABC Plumbing
                        was built on a simple promise: honest pricing and expert service.
                    </p>

                    <p class="text-gray-600 mb-4">
                        What began as a one-truck operation has grown to a team of 12
                        licensed plumbers, but our commitment remains the same. We treat
                        every home like it's our own and every customer like family.
                    </p>

                    <p class="text-gray-600">
                        Today, we're proud to be Austin's most trusted plumbing service,
                        with over 5,000 satisfied customers and an A+ BBB rating.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
```

### Adding Team Members

**If client has team photos and bios**:

```templ
<section class="section-padding bg-white">
    <div class="container-custom">
        @components.SectionHeader(
            "Meet Our Team",
            "The skilled professionals dedicated to your satisfaction"
        )

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <!-- Team Member 1 -->
            <div class="text-center">
                <img
                    src="/static/images/team/john-smith.jpg"
                    alt="John Smith, Owner and Master Plumber"
                    class="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 class="text-xl font-semibold mb-1">John Smith</h3>
                <p class="text-primary-600 mb-2">Owner & Master Plumber</p>
                <p class="text-gray-600 text-sm">
                    25 years of experience. Licensed Master Plumber #12345.
                    Specializes in complex repairs and renovations.
                </p>
            </div>

            <!-- Repeat for other team members -->
        </div>
    </div>
</section>
```

**If client doesn't have photos** - Skip team section or use initials/icons.

---

## Part 4: Social Proof & Testimonials

### Why Testimonials Matter

**Statistics**:
- 92% of consumers read online reviews
- Testimonials can increase conversions by 34%
- Video testimonials are 89% more effective than text

**What Makes a Good Testimonial**:
- ✅ Specific (not "Great service!")
- ✅ Includes result/outcome
- ✅ Real person with name and photo
- ✅ Addresses common objection

**Example**:

❌ **Weak**: "Great service, highly recommend!"

✅ **Strong**: "When our basement flooded at 2am, ABC Plumbing arrived within 45 minutes. They fixed the burst pipe and helped us file the insurance claim. John and his team saved us thousands in water damage. Can't thank them enough!" - Sarah M., Austin

### Adding Testimonials to Homepage

**Create a testimonials component `views/components/testimonial.templ`**:

```templ
package components

type Testimonial struct {
    Quote        string
    CustomerName string
    Location     string
    Rating       int
}

templ TestimonialCard(t Testimonial) {
    <div class="bg-white p-6 rounded-lg shadow-md">
        <!-- Star rating -->
        <div class="flex mb-4">
            for i := 0; i < 5; i++ {
                if i < t.Rating {
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                } else {
                    <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                }
            }
        </div>

        <!-- Quote -->
        <p class="text-gray-700 mb-4 italic">
            "{ t.Quote }"
        </p>

        <!-- Attribution -->
        <p class="text-sm font-semibold text-gray-900">
            { t.CustomerName }
        </p>
        <p class="text-sm text-gray-600">
            { t.Location }
        </p>
    </div>
}
```

**Add to homepage**:

```templ
<!-- Testimonials Section -->
<section class="section-padding bg-gray-50">
    <div class="container-custom">
        @components.SectionHeader(
            "What Our Customers Say",
            "Don't just take our word for it"
        )

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            @components.TestimonialCard(components.Testimonial{
                Quote:        "When our basement flooded at 2am, ABC Plumbing arrived within 45 minutes...",
                CustomerName: "Sarah M.",
                Location:     "Austin, TX",
                Rating:       5,
            })

            <!-- Add more testimonials -->
        </div>
    </div>
</section>
```

### Trust Indicators

**Add trust badges/indicators**:

```templ
<!-- Trust Section -->
<section class="section-padding bg-white">
    <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <!-- Years in Business -->
            <div>
                <div class="text-4xl font-bold text-primary-600 mb-2">10+</div>
                <div class="text-gray-600">Years in Business</div>
            </div>

            <!-- Customers Served -->
            <div>
                <div class="text-4xl font-bold text-primary-600 mb-2">5,000+</div>
                <div class="text-gray-600">Happy Customers</div>
            </div>

            <!-- Rating -->
            <div>
                <div class="text-4xl font-bold text-primary-600 mb-2">4.9★</div>
                <div class="text-gray-600">Average Rating</div>
            </div>

            <!-- Certification -->
            <div>
                <div class="text-4xl font-bold text-primary-600 mb-2">A+</div>
                <div class="text-gray-600">BBB Rating</div>
            </div>
        </div>
    </div>
</section>
```

---

## Part 5: HTMX Dynamic Interactions

### What is HTMX?

HTMX lets you add dynamic behavior with HTML attributes (no JavaScript needed for simple interactions).

**Common Use Cases**:
- Load content without page refresh
- Infinite scroll
- Form validation
- Live search
- Dynamic modals

### Example: Expandable FAQ Section

**Create FAQ handler in `internal/handlers/pages.go`**:

```go
type FAQ struct {
    Question string
    Answer   string
}

func (h *PageHandlers) GetFAQs(c echo.Context) error {
    faqs := []FAQ{
        {
            Question: "Do you offer emergency services?",
            Answer:   "Yes! We're available 24/7 for emergency plumbing repairs...",
        },
        {
            Question: "What areas do you serve?",
            Answer:   "We serve all of Austin and surrounding areas within 30 miles...",
        },
        // Add more FAQs
    }

    return c.JSON(http.StatusOK, faqs)
}
```

**Add route in `cmd/server/main.go`**:

```go
e.GET("/api/faqs", pageHandlers.GetFAQs)
```

**Create FAQ component with HTMX**:

```templ
<!-- FAQ Section with HTMX -->
<section class="section-padding bg-white">
    <div class="container-custom max-w-3xl">
        <h2 class="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
        </h2>

        <div class="space-y-4">
            <!-- FAQ Item 1 -->
            <div class="border border-gray-200 rounded-lg">
                <button
                    class="w-full text-left px-6 py-4 font-semibold flex justify-between items-center hover:bg-gray-50"
                    hx-get="/api/faq/1"
                    hx-target="#faq-1"
                    hx-swap="innerHTML"
                    aria-expanded="false"
                >
                    <span>Do you offer emergency services?</span>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="faq-1" class="hidden px-6 pb-4 text-gray-600">
                    <!-- Content loaded via HTMX -->
                </div>
            </div>

            <!-- More FAQ items -->
        </div>
    </div>
</section>
```

**Simpler Alternative: Pure CSS Accordion**:

```templ
<div class="space-y-4">
    <details class="border border-gray-200 rounded-lg">
        <summary class="px-6 py-4 font-semibold cursor-pointer hover:bg-gray-50">
            Do you offer emergency services?
        </summary>
        <div class="px-6 pb-4 text-gray-600">
            Yes! We're available 24/7 for emergency plumbing repairs. Just call
            our hotline and we'll dispatch a technician right away.
        </div>
    </details>

    <!-- More questions -->
</details>
```

---

## Part 6: Calls-to-Action (CTAs)

### CTA Best Practices

**What Makes a Good CTA**:
1. **Action-oriented** - Use verbs (Get, Start, Schedule, Call)
2. **Specific** - What happens when they click?
3. **Urgent** - Why now?
4. **Low-friction** - Remove barriers

**Examples**:

❌ **Weak CTAs**:
- "Learn More"
- "Click Here"
- "Submit"

✅ **Strong CTAs**:
- "Get Your Free Quote Today"
- "Schedule Your Appointment"
- "Call Now for 24/7 Emergency Service"
- "Start Your Free Trial - No Credit Card Required"

### Multiple CTAs Strategy

**Different visitors need different CTAs**:

**High Intent** (ready to buy):
- "Call Now: (555) 123-4567"
- "Schedule Service Today"
- "Get Emergency Help"

**Medium Intent** (considering):
- "Request a Free Quote"
- "See Our Services"
- "View Pricing"

**Low Intent** (researching):
- "Download Free Guide"
- "Read Customer Reviews"
- "Learn More About Us"

### Implementing Effective CTAs

**Homepage Final CTA Section**:

```templ
<section class="section-padding bg-primary-600 text-white">
    <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center">
            <!-- Headline -->
            <h2 class="text-4xl font-bold mb-4">
                Ready to Get Started?
            </h2>

            <!-- Supporting text - address objection or create urgency -->
            <p class="text-xl mb-8 text-primary-100">
                Don't let plumbing problems stress you out. Our licensed
                plumbers are ready to help 24/7. Get fast, reliable service
                with upfront pricing.
            </p>

            <!-- Primary CTA -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href="tel:+15551234567"
                    class="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-lg"
                >
                    Call Now: (555) 123-4567
                </a>
                <a
                    href="/contact"
                    class="inline-block px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors text-lg"
                >
                    Request Service Online
                </a>
            </div>

            <!-- Trust indicator -->
            <p class="mt-6 text-primary-200">
                ⭐⭐⭐⭐⭐ Rated 4.9/5 by 500+ customers
            </p>
        </div>
    </div>
</section>
```

---

## Exercises

### Exercise 1: Homepage Customization (45 minutes)

**Tasks**:
1. Write 5 headline options (use AI if needed)
2. Choose the best and implement it
3. Customize subheadline for client's value prop
4. Update all CTA buttons with specific actions
5. Replace placeholder features with client's actual benefits
6. Add client's phone number and make it clickable
7. Test on mobile and desktop

**Deliverable**: Fully customized homepage with client content

### Exercise 2: Services Page Content (40 minutes)

**Tasks**:
1. Use AI to generate descriptions for client's 3-4 main services
2. List 3 benefits for each service
3. Find appropriate icons (Heroicons)
4. Implement all services in services.templ
5. Make CTAs specific to each service
6. Add process section if applicable
7. Test responsive layout

**Deliverable**: Complete services page with compelling copy

### Exercise 3: About Page Story (30 minutes)

**Tasks**:
1. Gather client's founding story and mission
2. Use AI to write engaging "Our Story" section
3. Add section on mission and values
4. Include team members (if photos available)
5. Ensure it's scannable (short paragraphs, subheadings)
6. Add relevant images

**Deliverable**: Compelling about page that builds trust

### Exercise 4: Add Testimonials (25 minutes)

**Tasks**:
1. Get 3-5 testimonials from client
2. Rewrite if needed (with permission) to be more specific
3. Create testimonial component
4. Add to homepage
5. Add trust indicators (years in business, rating, etc.)
6. Ensure proper spacing and responsive layout

**Deliverable**: Social proof section on homepage

### Exercise 5: CTA Optimization (20 minutes)

**Tasks**:
1. Audit all CTAs on site
2. Replace generic "Learn More" with specific actions
3. Ensure phone numbers are clickable (tel: links)
4. Add urgency where appropriate
5. Test all links work correctly
6. Add tracking (Google Analytics event) to main CTA

**Deliverable**: Actionable CTAs throughout site

---

## Assessment Checklist

Before moving to Module 5, you should be able to:
- [ ] Write compelling, benefit-focused copy
- [ ] Use AI effectively to generate content
- [ ] Customize all template pages with client information
- [ ] Create and use Templ components
- [ ] Implement testimonials and social proof
- [ ] Write effective calls-to-action
- [ ] Make content scannable and readable
- [ ] Ensure all content is mobile-friendly
- [ ] Add dynamic elements with HTMX (optional)
- [ ] Tell a compelling brand story

## Content Writing Tips

**1. Write for Skimmers**:
- Most people scan, don't read every word
- Use short paragraphs (2-3 sentences max)
- Add subheadings frequently
- Use bullet points
- Bold key phrases

**2. Focus on Benefits, Not Features**:
❌ "We use state-of-the-art equipment"
✅ "Get the job done right the first time, saving you money on repeat visits"

**3. Use "You" Language**:
❌ "We provide excellent customer service"
✅ "You'll get personalized attention from start to finish"

**4. Be Specific**:
❌ "Fast service"
✅ "Most repairs completed in under 2 hours"

**5. Address Objections**:
Common objections:
- Too expensive → "Upfront pricing, no hidden fees"
- Takes too long → "Same-day service available"
- Can't trust → "A+ BBB rating, 5-star reviews"
- Risky → "100% satisfaction guarantee"

---

## Next Module

In **Module 5: Contact System**, you'll:
- Implement a fully functional contact form
- Integrate Brevo for email delivery
- Add reCAPTCHA v3 spam protection
- Implement honeypot spam prevention
- Handle form validation (client and server-side)
- Use HTMX for smooth form submission
- Test the complete contact flow

All your content is in place - time to make the site interactive!

---

**Pro Tip**: Good copy takes iteration. Write, review, refine. Show it to someone unfamiliar with the business - if they understand the value proposition in 5 seconds, you've succeeded!
