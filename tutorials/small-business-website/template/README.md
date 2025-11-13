# Small Business Website - Starter Template

A modern, professional starter template for building small business websites with Go, Echo, Templ, HTMX, and Tailwind CSS.

## Features

- **Server-Side Rendering**: Fast, SEO-friendly pages with Go and Templ
- **Modern Styling**: Tailwind CSS with custom brand colors and components
- **Dynamic Interactions**: HTMX for smooth UX without complex JavaScript
- **Mobile-First**: Responsive design that looks great on all devices
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Contact Form**: Built-in form with spam prevention (honeypot + reCAPTCHA)
- **Email Integration**: Brevo API for reliable email delivery
- **Hot Reload**: Automatic browser refresh during development
- **Production Ready**: Configured for Vercel deployment

## Tech Stack

- **Backend**: Go 1.23+ with Echo v4 framework
- **Templating**: Templ (type-safe HTML templates)
- **Styling**: Tailwind CSS 3.4+
- **Interactivity**: HTMX 2.0
- **Email**: Brevo API
- **Spam Prevention**: reCAPTCHA v3 + Honeypot
- **Deployment**: Vercel

## Project Structure

```
.
├── cmd/
│   └── server/
│       └── main.go              # Application entry point
├── internal/
│   ├── handlers/
│   │   └── pages.go             # HTTP handlers for routes
│   ├── middleware/
│   │   └── config.go            # Middleware for config injection
│   └── models/
│       ├── config.go            # Configuration struct
│       └── meta.go              # Page metadata for SEO
├── views/
│   ├── layouts/
│   │   └── base.templ           # Base HTML layout with meta tags
│   ├── components/
│   │   ├── nav.templ            # Navigation bar component
│   │   └── footer.templ         # Footer component
│   └── pages/
│       ├── home.templ           # Homepage
│       ├── about.templ          # About page
│       ├── services.templ       # Services page
│       └── contact.templ        # Contact page with form
├── static/
│   ├── css/
│   │   ├── input.css            # Tailwind input file
│   │   └── output.css           # Generated CSS (gitignored)
│   ├── js/                      # Custom JavaScript (if needed)
│   └── images/                  # Images and assets
├── .air.toml                    # Air config for hot reload
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── go.mod                       # Go dependencies
├── Makefile                     # Development commands
├── package.json                 # Node dependencies (Tailwind)
├── tailwind.config.js           # Tailwind configuration
└── vercel.json                  # Vercel deployment config
```

## Prerequisites

Make sure you have the following installed:

- [Go](https://go.dev/dl/) 1.23 or later
- [Node.js](https://nodejs.org/) 18 or later
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone or Copy This Template

```bash
# If starting fresh, copy this template directory to your project location
cp -r template my-business-website
cd my-business-website
```

### 2. Install Dependencies

```bash
make install
```

This will install:
- Go modules
- Node packages (Tailwind CSS)
- Air (for hot reload)
- Templ (template generator)

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

- **Brevo API Key**: Get from [Brevo Dashboard](https://app.brevo.com/) → Profile → SMTP & API → API Keys
- **reCAPTCHA Keys**: Get from [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
- **Site Details**: Update with your business information

### 4. Start Development Server

```bash
make dev
```

This starts three processes in parallel:
1. **Templ watcher**: Regenerates Go code from `.templ` files
2. **Tailwind watcher**: Rebuilds CSS when styles change
3. **Air server**: Runs Go server with hot reload

Visit `http://localhost:7331` (proxy with hot reload) or `http://localhost:8080` (direct server)

### 5. Customize for Your Client

Follow the TODO comments throughout the codebase:

1. **Brand Colors**: Update `tailwind.config.js` with client's colors
2. **Content**: Replace placeholder text in `.templ` files
3. **Images**: Add client's logo, photos to `static/images/`
4. **Contact Info**: Update email, phone, address in templates
5. **Services**: Customize services based on what client offers
6. **Meta Tags**: Update page titles and descriptions in handlers

## Development Commands

```bash
make help       # Show all available commands
make install    # Install all dependencies
make dev        # Start development server with hot reload
make build      # Build for production
make clean      # Clean generated files
```

## Building for Production

```bash
make build
```

This creates:
- Compiled Go binary in `bin/server`
- Minified CSS in `static/css/output.css`
- Generated Templ files

To run the production build locally:

```bash
./bin/server
```

## Deployment to Vercel

### Prerequisites

1. Install [Vercel CLI](https://vercel.com/docs/cli):
   ```bash
   npm install -g vercel
   ```

2. Create a [Vercel account](https://vercel.com/signup)

### Deploy

```bash
# First time deployment
vercel

# Production deployment
vercel --prod
```

### Environment Variables

In the Vercel dashboard, add your environment variables:

1. Go to your project → Settings → Environment Variables
2. Add all variables from `.env.example`
3. Set them for "Production", "Preview", and "Development" environments

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS with your domain registrar:
   - Add A record pointing to Vercel's IP
   - Or add CNAME record pointing to `cname.vercel-dns.com`

## Customization Guide

### Adding a New Page

1. **Create the template** in `views/pages/newpage.templ`:
   ```go
   package pages

   import (
       "github.com/gocodeschool/small-business-website/internal/models"
       "github.com/gocodeschool/small-business-website/views/layouts"
   )

   templ NewPage(meta *models.PageMeta, config *models.Config) {
       @layouts.Base(meta, config) {
           <h1>New Page</h1>
       }
   }
   ```

2. **Add the handler** in `internal/handlers/pages.go`:
   ```go
   func (h *PageHandlers) NewPage(c echo.Context) error {
       meta := models.NewPageMeta(
           "New Page - "+h.config.SiteName,
           "Description of new page",
       ).WithURL(h.config.SiteURL + "/newpage")

       return h.render(c, pages.NewPage(meta, h.config))
   }
   ```

3. **Add the route** in `cmd/server/main.go`:
   ```go
   e.GET("/newpage", pageHandlers.NewPage)
   ```

4. **Add navigation link** in `views/components/nav.templ`

### Changing Brand Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    50: '#f0fdf4',   // Lightest
    100: '#dcfce7',
    // ... through to ...
    900: '#14532d',  // Darkest
  },
}
```

Use [Tailwind Color Palette Generator](https://uicolors.app/create) for consistent color scales.

### Adding Custom Styles

Add custom CSS to `static/css/input.css` in the appropriate layer:

```css
@layer components {
  .my-custom-button {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
}
```

## Module Progression

This template is designed to grow with you through the tutorial modules:

- **Module 1-2**: Use as-is to understand structure
- **Module 3**: Customize styling and brand colors
- **Module 4**: Customize page content
- **Module 5**: Implement contact form submission (currently TODO)
- **Module 6**: Optimize SEO and performance
- **Module 7**: Deploy to production

## Troubleshooting

### Port Already in Use

If port 8080 is busy, change it in `.env`:
```
PORT=3000
```

### Templ Files Not Regenerating

1. Stop the dev server (Ctrl+C)
2. Run `make clean`
3. Run `make dev` again

### CSS Changes Not Appearing

1. Check `tailwind.config.js` has correct paths in `content`
2. Ensure class names are in `.templ` files, not string concatenation
3. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

### Go Module Errors

```bash
go mod tidy
go mod download
```

## Learning Resources

- [Go Documentation](https://go.dev/doc/)
- [Echo Framework](https://echo.labstack.com/guide/)
- [Templ Guide](https://templ.guide/)
- [HTMX Documentation](https://htmx.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Support

For issues and questions:
- Check the troubleshooting guide above
- Review module-specific guides in `../guide/`
- Consult the resources in `../resources/`

## License

This template is open source and available for educational use.

---

**Ready to build?** Start customizing the templates and make this site your own!
