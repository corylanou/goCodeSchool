# Module 3: Design Foundation

**Duration**: 2-3 class periods (90-135 minutes total)

**Learning Objectives**:
- Master Tailwind CSS utility classes for responsive design
- Implement mobile-first design principles
- Understand and apply accessibility standards (WCAG 2.1)
- Create reusable component patterns
- Apply client branding consistently across the site
- Use color theory and typography effectively

## Prerequisites

Before starting this module, you should have:
- Completed Modules 1 and 2
- Development environment set up and running
- Starter template running locally
- Client branding information (colors, fonts, logo)

---

## Part 1: Mobile-First Design Philosophy

### Why Mobile-First Matters

**The Statistics** (2025):
- 📱 60-64% of web traffic is mobile
- 📱 Google uses mobile-first indexing
- 📱 Users expect sites to work perfectly on phones
- 📱 Mobile users are often ready to take action (call, visit, buy)

**What is Mobile-First?**
> Design and build for mobile screens first, then enhance for larger screens.

**Traditional Approach** (wrong):
```
Desktop design → Remove features → Mobile design
```

**Mobile-First Approach** (right):
```
Mobile design → Add features → Tablet → Desktop
```

### Mobile-First Benefits

**1. Forces Prioritization**:
- Limited space means focusing on what truly matters
- Cuts unnecessary content and features
- Results in cleaner, faster sites

**2. Better Performance**:
- Smaller initial payload
- Faster load times
- Better mobile experience (where most users are)

**3. Progressive Enhancement**:
- Everyone gets a good experience
- Desktop users get enhanced features
- No one is left out

### Tailwind's Mobile-First Breakpoints

**How Tailwind Works**:
```html
<!-- No prefix = mobile (all screens) -->
<div class="text-sm">Small text on all screens</div>

<!-- sm: = tablets (640px+) -->
<div class="text-sm sm:text-base">
  Small on mobile, medium on tablet+
</div>

<!-- md: = desktop (768px+) -->
<div class="text-sm sm:text-base md:text-lg">
  Small → medium → large as screen grows
</div>

<!-- lg: = large desktop (1024px+) -->
<!-- xl: = extra large (1280px+) -->
<!-- 2xl: = huge screens (1536px+) -->
```

**Breakpoints Reference**:
```
Default:  0px     (mobile phones)
sm:       640px   (large phones, small tablets)
md:       768px   (tablets, small laptops)
lg:       1024px  (laptops, desktops)
xl:       1280px  (large desktops)
2xl:      1536px  (very large screens)
```

**Example - Responsive Grid**:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Mobile: 1 column -->
  <!-- Tablet: 2 columns -->
  <!-- Desktop: 3 columns -->
</div>
```

---

## Part 2: Tailwind CSS Mastery

### Essential Utility Classes

**Layout**:
```html
<!-- Container (max-width responsive container) -->
<div class="container mx-auto px-4">
  Content with automatic responsive width
</div>

<!-- Flexbox -->
<div class="flex justify-between items-center">
  Left | Center | Right
</div>

<div class="flex flex-col md:flex-row gap-4">
  Stack on mobile, row on desktop
</div>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  Responsive grid
</div>
```

**Spacing**:
```html
<!-- Padding (internal space) -->
<div class="p-4">Padding all sides (1rem)</div>
<div class="px-4 py-2">Horizontal 1rem, vertical 0.5rem</div>
<div class="pt-8">Top padding only (2rem)</div>

<!-- Margin (external space) -->
<div class="m-4">Margin all sides</div>
<div class="mx-auto">Horizontal center</div>
<div class="mt-8">Top margin only</div>

<!-- Spacing scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32... -->
<!-- 1 unit = 0.25rem (4px), so p-4 = 1rem = 16px -->
```

**Typography**:
```html
<!-- Size -->
<h1 class="text-4xl md:text-5xl lg:text-6xl">
  Responsive heading
</h1>

<!-- Weight -->
<p class="font-normal">Regular text</p>
<p class="font-semibold">Semi-bold text</p>
<p class="font-bold">Bold text</p>

<!-- Color -->
<p class="text-gray-900">Almost black</p>
<p class="text-gray-600">Medium gray</p>
<p class="text-primary-600">Brand color</p>

<!-- Alignment -->
<p class="text-left md:text-center">
  Left on mobile, center on desktop
</p>
```

**Colors**:
```html
<!-- Background -->
<div class="bg-white">White background</div>
<div class="bg-gray-50">Light gray</div>
<div class="bg-primary-600">Brand color</div>

<!-- Text color -->
<p class="text-gray-900">Dark text</p>
<p class="text-white">White text</p>

<!-- Border -->
<div class="border border-gray-200">Gray border</div>
```

**Sizing**:
```html
<!-- Width -->
<div class="w-full">100% width</div>
<div class="w-1/2">50% width</div>
<div class="w-64">256px (16rem) width</div>
<div class="max-w-4xl">Max width 896px</div>

<!-- Height -->
<div class="h-screen">100vh (full viewport)</div>
<div class="h-64">256px height</div>
```

**Visual Effects**:
```html
<!-- Rounded corners -->
<div class="rounded">Small radius (0.25rem)</div>
<div class="rounded-lg">Large radius (0.5rem)</div>
<div class="rounded-full">Fully rounded (pills, circles)</div>

<!-- Shadows -->
<div class="shadow-sm">Subtle shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>

<!-- Hover effects -->
<button class="bg-blue-500 hover:bg-blue-700 transition-colors">
  Hover me
</button>
```

### Tailwind Responsive Patterns

**Pattern 1: Responsive Text**:
```html
<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  <!--
    Mobile: 1.875rem (30px)
    Small: 2.25rem (36px)
    Medium: 3rem (48px)
    Large: 3.75rem (60px)
  -->
  Progressive sizing
</h1>
```

**Pattern 2: Responsive Spacing**:
```html
<section class="py-8 sm:py-12 md:py-16 lg:py-20">
  <!-- More padding on larger screens -->
  Content
</section>
```

**Pattern 3: Show/Hide by Breakpoint**:
```html
<!-- Show on mobile, hide on desktop -->
<div class="block md:hidden">
  Mobile menu
</div>

<!-- Hide on mobile, show on desktop -->
<div class="hidden md:block">
  Desktop navigation
</div>
```

**Pattern 4: Responsive Layout Direction**:
```html
<div class="flex flex-col md:flex-row gap-4">
  <!-- Stack vertically on mobile, horizontally on desktop -->
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Part 3: Applying Client Branding

### Step 1: Color Palette Setup

**Get Client Colors**:
From your discovery interview, you should have:
- Primary brand color
- Secondary colors (if any)
- Any colors to avoid

**Generate Full Palette**:
Use [Tailwind Color Palette Generator](https://uicolors.app/create):

1. Enter client's primary color HEX code
2. Generate shades (50-900)
3. Copy the configuration

**Update `tailwind.config.js`**:
```js
module.exports = {
  content: ["./views/**/*.templ"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',   // Lightest
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // Base color (client's brand)
          600: '#0284c7',  // Common for buttons
          700: '#0369a1',  // Hover states
          800: '#075985',
          900: '#0c4a6e',  // Darkest
        },
        // Add secondary color if needed
        secondary: {
          500: '#10b981',  // Example: green accent
          600: '#059669',
          700: '#047857',
        },
      },
    },
  },
  plugins: [],
}
```

**Using Your Colors**:
```html
<button class="bg-primary-600 hover:bg-primary-700 text-white">
  Click me
</button>

<div class="bg-primary-50 text-primary-900">
  Light background with dark text
</div>
```

### Step 2: Typography Setup

**Get Client Fonts**:
From discovery, you should have:
- Primary font (headings and/or body)
- Secondary font (if applicable)

**Option 1: Google Fonts** (recommended):

1. Visit [fonts.google.com](https://fonts.google.com)
2. Find client's font (or similar)
3. Select needed weights (400, 600, 700)
4. Copy embed code

**Add to `views/layouts/base.templ`**:
```templ
<head>
    <!-- ... other tags ... -->

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
</head>
```

**Update `tailwind.config.js`**:
```js
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
    },
  },
}
```

**Option 2: System Fonts** (faster, no download):
```js
fontFamily: {
  sans: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
}
```

### Step 3: Custom Component Styles

**Define Reusable Components in `static/css/input.css`**:
```css
@layer components {
  /* Primary button matching client brand */
  .btn-primary {
    @apply px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg
           shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2
           focus:ring-primary-500 focus:ring-offset-2 transition-colors
           duration-200;
  }

  /* Secondary button */
  .btn-secondary {
    @apply px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg
           border-2 border-primary-600 hover:bg-primary-50
           focus:outline-none focus:ring-2 focus:ring-primary-500
           transition-colors duration-200;
  }

  /* Section container */
  .section-padding {
    @apply py-12 sm:py-16 lg:py-20;
  }

  /* Custom container */
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

**Using Custom Components**:
```html
<button class="btn-primary">Get Started</button>
<section class="section-padding">
  <div class="container-custom">
    Content
  </div>
</section>
```

---

## Part 4: Accessibility Fundamentals

### Why Accessibility Matters

**Legal Requirements**:
- ADA compliance required for U.S. businesses
- WCAG 2.1 Level AA is the standard
- 4,500+ lawsuits filed in 2024 for non-compliance

**Business Benefits**:
- Reach 15% more people (disability statistics)
- Better SEO (Google rewards accessible sites)
- Better UX for everyone
- Professional reputation

**Ethical Imperative**:
- Everyone deserves access to information
- Disabilities are diverse (vision, motor, cognitive, auditory)
- Temporary disabilities (broken arm, eye surgery)
- Situational limitations (bright sunlight, noisy environment)

### WCAG 2.1 Level AA Requirements (Simplified)

**1. Perceivable - Can users perceive the content?**

**Color Contrast**:
- Normal text: 4.5:1 contrast ratio minimum
- Large text (18pt+ or 14pt+ bold): 3:1 minimum

**Check contrast**:
```
Use WebAIM Contrast Checker: webaim.org/resources/contrastchecker/
```

**Good examples**:
```html
<!-- ✅ Good contrast -->
<div class="bg-white text-gray-900">Dark on light (21:1)</div>
<div class="bg-primary-600 text-white">White on blue (check!)</div>

<!-- ❌ Poor contrast -->
<div class="bg-gray-300 text-gray-400">Too similar</div>
```

**Alt Text for Images**:
```html
<!-- ✅ Descriptive alt text -->
<img src="team.jpg" alt="Five team members standing in office, smiling at camera"/>

<!-- ❌ Missing or useless alt -->
<img src="team.jpg" alt="image"/>
<img src="team.jpg"/>

<!-- Decorative images (use empty alt) -->
<img src="decoration.svg" alt="" role="presentation"/>
```

**2. Operable - Can users operate the interface?**

**Keyboard Navigation**:
All interactive elements must work with keyboard only:
- Tab: Move forward through elements
- Shift+Tab: Move backward
- Enter/Space: Activate buttons/links
- Arrows: Navigate within components

**Test**: Try using your site with only keyboard (no mouse!)

**Focus States**:
```html
<!-- ✅ Visible focus indicator -->
<button class="focus:ring-2 focus:ring-primary-500 focus:outline-none">
  Click me
</button>

<!-- ❌ No focus indicator -->
<button class="outline-none">  <!-- DON'T remove outline without replacement -->
  Click me
</button>
```

**Skip Links** (for screen readers):
```html
<body>
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:p-4 focus:z-50">
    Skip to main content
  </a>

  <nav>...</nav>

  <main id="main-content">
    Content
  </main>
</body>
```

**3. Understandable - Can users understand the content and interface?**

**Clear Labels**:
```html
<!-- ✅ Proper label -->
<label for="email" class="block mb-2">Email Address</label>
<input
  type="email"
  id="email"
  name="email"
  required
  aria-required="true"
/>

<!-- ❌ No label -->
<input type="email" placeholder="Email"/>  <!-- Placeholder is NOT a label -->
```

**Error Messages**:
```html
<!-- ✅ Accessible error -->
<div>
  <label for="phone">Phone Number</label>
  <input
    id="phone"
    aria-invalid="true"
    aria-describedby="phone-error"
  />
  <p id="phone-error" class="text-red-600" role="alert">
    Please enter a valid phone number
  </p>
</div>
```

**4. Robust - Works with assistive technologies**

**Semantic HTML**:
```html
<!-- ✅ Semantic elements -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Heading</h1>
    <p>Content</p>
  </article>
</main>

<footer>
  Copyright info
</footer>

<!-- ❌ Div soup -->
<div class="header">
  <div class="nav">
    <div class="link"><a href="/">Home</a></div>
  </div>
</div>
```

**ARIA Labels** (when semantic HTML isn't enough):
```html
<!-- Mobile menu button -->
<button
  aria-label="Toggle mobile menu"
  aria-expanded="false"
  aria-controls="mobile-menu"
>
  <svg>...</svg>  <!-- Icon without text -->
</button>

<!-- Screen reader only text -->
<span class="sr-only">Opens in new window</span>
```

### Accessibility Checklist for Small Business Sites

**Every Page**:
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skipping)
- [ ] All images have alt text
- [ ] Color contrast meets 4.5:1 for text
- [ ] All interactive elements keyboard accessible
- [ ] Visible focus indicators
- [ ] No content in images that should be text

**Forms**:
- [ ] All inputs have associated labels
- [ ] Required fields marked clearly
- [ ] Error messages are clear and announced
- [ ] Form validates without page refresh (or provides clear feedback)

**Navigation**:
- [ ] Skip link to main content
- [ ] Current page indicated in nav
- [ ] Mobile menu keyboard accessible
- [ ] Links have descriptive text (not "click here")

**Testing**:
- [ ] Test with keyboard only
- [ ] Test with screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
- [ ] Run WAVE accessibility checker
- [ ] Run Lighthouse accessibility audit

---

## Part 5: Creating Reusable Components

### Component Pattern: Card

**Use Cases**: Services, team members, testimonials

**Create in `views/components/card.templ`**:
```templ
package components

// Card displays content in a styled container
templ Card(title, description string) {
	<div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
		<h3 class="text-xl font-semibold text-gray-900 mb-3">
			{ title }
		</h3>
		<p class="text-gray-600">
			{ description }
		</p>
	</div>
}
```

**Usage**:
```templ
@components.Card("Service Name", "Description of service")
```

### Component Pattern: Icon Card

**For feature/benefit sections**:

```templ
package components

// IconCard displays an icon with title and description
templ IconCard(title, description string, iconSVG templ.Component) {
	<div class="text-center p-6">
		<div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
			@iconSVG
		</div>
		<h3 class="text-xl font-semibold text-gray-900 mb-2">
			{ title }
		</h3>
		<p class="text-gray-600">
			{ description }
		</p>
	</div>
}

// Example icon component
templ CheckIcon() {
	<svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
	</svg>
}
```

### Component Pattern: CTA Button

**Reusable call-to-action button**:

```templ
package components

type CTAStyle string

const (
	CTAPrimary   CTAStyle = "primary"
	CTASecondary CTAStyle = "secondary"
)

// CTAButton renders a styled call-to-action button
templ CTAButton(text, href string, style CTAStyle) {
	if style == CTAPrimary {
		<a href={ templ.SafeURL(href) } class="btn-primary inline-block">
			{ text }
		</a>
	} else {
		<a href={ templ.SafeURL(href) } class="btn-secondary inline-block">
			{ text }
		</a>
	}
}
```

### Component Pattern: Section Header

**Consistent section styling**:

```templ
package components

// SectionHeader renders a centered section title and description
templ SectionHeader(title, description string) {
	<div class="text-center mb-12">
		<h2 class="text-4xl font-bold text-gray-900 mb-4">
			{ title }
		</h2>
		<p class="text-xl text-gray-600 max-w-2xl mx-auto">
			{ description }
		</p>
	</div>
}
```

---

## Part 6: AI-Assisted Design

### Using AI for Component Generation

**Prompt Template**:
```
Create a [component name] component in Templ for a Go-based website using Tailwind CSS.

Requirements:
- Display: [what it should show]
- Style: [design approach]
- Responsive: [mobile behavior]
- Accessibility: Include proper ARIA labels and semantic HTML
- Props: [list the data parameters]

The component should match these brand colors:
- Primary: [HEX code]
- Background: [HEX code]

Generate the Templ component code with:
1. Proper Tailwind responsive classes
2. Hover and focus states
3. Accessibility features
4. Usage example
```

**Example - Testimonial Component**:
```
Create a testimonial card component in Templ for a small business website using Tailwind CSS.

Requirements:
- Display: Customer quote, name, title/company, optional photo
- Style: Clean, modern card with subtle shadow
- Responsive: Full width on mobile, 3 columns on desktop
- Accessibility: Proper semantic structure
- Props: quote (string), customerName (string), customerTitle (string), photoURL (string, optional)

Brand colors:
- Primary: #0066CC
- Light background: #F0F9FF

Generate the component with proper error handling if photoURL is empty.
```

### Using AI for Layout Refinement

**Prompt for Responsiveness**:
```
Review this Templ component for responsive design issues:

[PASTE COMPONENT CODE]

Check for:
1. Mobile-first approach
2. Proper breakpoints (sm, md, lg)
3. Touch target sizes (minimum 44x44px on mobile)
4. Text readability at all sizes
5. Spacing consistency

Suggest improvements with updated code.
```

---

## Exercises

### Exercise 1: Color Palette Implementation (20 minutes)

**Tasks**:
1. Get client's primary brand color
2. Use uicolors.app to generate full palette
3. Update `tailwind.config.js` with new colors
4. Update all `btn-primary` instances to use new color
5. Test color contrast with WebAIM checker
6. Adjust if needed for accessibility

**Deliverable**: Updated config with accessible color palette

### Exercise 2: Mobile-First Component (30 minutes)

**Tasks**:
1. Create a new "feature grid" component
2. Display 3 features from client business
3. Stack vertically on mobile (< 768px)
4. Show 2 columns on tablet (768px - 1023px)
5. Show 3 columns on desktop (1024px+)
6. Add icons using SVG
7. Ensure proper spacing at all breakpoints

**Deliverable**: Working responsive feature grid

### Exercise 3: Accessibility Audit (30 minutes)

**Tasks**:
1. Run WAVE on your homepage (wave.webaim.org)
2. Fix all contrast errors
3. Add alt text to any images
4. Ensure all buttons have clear labels
5. Test keyboard navigation (Tab through entire page)
6. Add skip link if missing
7. Run WAVE again - aim for zero errors

**Deliverable**: Screenshot of WAVE report showing improvements

### Exercise 4: Typography System (20 minutes)

**Tasks**:
1. Choose Google Fonts for client
2. Add to base.templ
3. Update tailwind.config.js
4. Apply to all headings and body text
5. Create responsive heading scale
6. Test readability at different sizes

**Deliverable**: Site with client's fonts applied

### Exercise 5: AI Component Generation (25 minutes)

**Tasks**:
1. Identify a component you need (team member card, service box, etc.)
2. Write detailed AI prompt using template above
3. Generate component with Claude/ChatGPT
4. Review for accessibility and responsiveness
5. Integrate into your project
6. Test at all breakpoints

**Deliverable**: AI-generated component, working in site

---

## Assessment Checklist

Before moving to Module 4, you should be able to:
- [ ] Explain mobile-first design philosophy
- [ ] Use Tailwind responsive breakpoints correctly
- [ ] Apply client brand colors throughout the site
- [ ] Implement custom typography
- [ ] Create accessible components (WCAG 2.1 AA)
- [ ] Test color contrast and fix issues
- [ ] Build reusable component patterns
- [ ] Navigate site with keyboard only
- [ ] Use AI to generate accessible components
- [ ] Debug responsive layout issues

## Common Design Mistakes to Avoid

**1. Not Testing on Real Devices**:
- ❌ Only testing in browser DevTools
- ✅ Test on actual phones and tablets

**2. Tiny Touch Targets**:
- ❌ Buttons smaller than 44x44px on mobile
- ✅ Adequate spacing and size for fingers

**3. Poor Color Contrast**:
- ❌ Light gray text on white background
- ✅ Check all combinations with contrast checker

**4. Ignoring Accessibility**:
- ❌ "We'll add it later"
- ✅ Build it in from the start

**5. Inconsistent Spacing**:
- ❌ Random padding values everywhere
- ✅ Use Tailwind's spacing scale consistently

**6. Too Many Fonts**:
- ❌ 5 different font families
- ✅ 1-2 fonts maximum, vary weights instead

**7. Breaking on Tablet Sizes**:
- ❌ Only testing mobile and desktop
- ✅ Check all breakpoints, especially 768px-1024px

---

## Design Resources

**Color Tools**:
- [UI Colors](https://uicolors.app/create) - Generate Tailwind palettes
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors](https://coolors.co/) - Color palette inspiration

**Typography**:
- [Google Fonts](https://fonts.google.com/)
- [Fontpair](https://www.fontpair.co/) - Font pairing suggestions
- [Type Scale](https://typescale.com/) - Typography size calculator

**Accessibility**:
- [WAVE](https://wave.webaim.org/) - Accessibility checker
- [Axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)

**Icons**:
- [Heroicons](https://heroicons.com/) - Free SVG icons (used in template)
- [Font Awesome](https://fontawesome.com/)
- [Lucide Icons](https://lucide.dev/)

**Inspiration**:
- [Dribbble](https://dribbble.com/) - Design inspiration
- [Awwwards](https://www.awwwards.com/) - Award-winning sites
- [One Page Love](https://onepagelove.com/) - Small business site examples

---

## Next Module

In **Module 4: Core Pages**, you'll:
- Customize all page content for your client
- Build engaging copy with AI assistance
- Implement dynamic components with HTMX
- Add testimonials and social proof
- Create compelling calls-to-action
- Optimize content for conversions

Make sure your site looks great on all devices before proceeding!

---

**Pro Tip**: Design is an iterative process. Don't aim for perfection on the first try. Build, test, get feedback, and refine. Show your client early mockups to ensure you're aligned before spending too much time on details!
