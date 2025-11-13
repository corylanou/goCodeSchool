package handlers

import (
	"github.com/a-h/templ"
	"github.com/gocodeschool/small-business-website/internal/models"
	"github.com/gocodeschool/small-business-website/views/pages"
	"github.com/labstack/echo/v4"
)

// PageHandlers handles all page route requests
type PageHandlers struct {
	config *models.Config
}

// NewPageHandlers creates a new PageHandlers instance
func NewPageHandlers(cfg *models.Config) *PageHandlers {
	return &PageHandlers{
		config: cfg,
	}
}

// render is a helper function to render Templ components
func (h *PageHandlers) render(c echo.Context, component templ.Component) error {
	return component.Render(c.Request().Context(), c.Response())
}

// Home handles the homepage route
func (h *PageHandlers) Home(c echo.Context) error {
	// TODO: Create meta tags for the homepage
	meta := models.NewPageMeta(
		h.config.SiteName+" - Home",
		h.config.SiteDescription,
	).WithURL(h.config.SiteURL).WithImage(h.config.SiteURL + "/static/images/og-home.jpg")

	return h.render(c, pages.Home(meta, h.config))
}

// About handles the about page route
func (h *PageHandlers) About(c echo.Context) error {
	// TODO: Customize meta tags for the about page
	meta := models.NewPageMeta(
		"About Us - "+h.config.SiteName,
		"Learn more about our company, mission, and team.",
	).WithURL(h.config.SiteURL + "/about").WithImage(h.config.SiteURL + "/static/images/og-about.jpg")

	return h.render(c, pages.About(meta, h.config))
}

// Services handles the services page route
func (h *PageHandlers) Services(c echo.Context) error {
	// TODO: Customize meta tags for the services page
	meta := models.NewPageMeta(
		"Our Services - "+h.config.SiteName,
		"Discover the professional services we offer to help your business grow.",
	).WithURL(h.config.SiteURL + "/services").WithImage(h.config.SiteURL + "/static/images/og-services.jpg")

	return h.render(c, pages.Services(meta, h.config))
}

// Contact handles the contact page route
func (h *PageHandlers) Contact(c echo.Context) error {
	// TODO: Customize meta tags for the contact page
	meta := models.NewPageMeta(
		"Contact Us - "+h.config.SiteName,
		"Get in touch with us. We'd love to hear from you!",
	).WithURL(h.config.SiteURL + "/contact").WithImage(h.config.SiteURL + "/static/images/og-contact.jpg")

	return h.render(c, pages.Contact(meta, h.config))
}

// SubmitContact handles contact form submissions
// TODO: Implement in Module 5
// func (h *PageHandlers) SubmitContact(c echo.Context) error {
// 	return nil
// }
