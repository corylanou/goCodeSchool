package models

// PageMeta contains metadata for SEO and Open Graph tags
type PageMeta struct {
	// Basic SEO
	Title       string
	Description string
	Keywords    string

	// Open Graph
	OGTitle       string
	OGDescription string
	OGImage       string
	OGType        string
	OGURL         string

	// Twitter Card (optional)
	TwitterCard string
	TwitterSite string

	// Canonical URL
	CanonicalURL string

	// Robots
	Robots string
}

// NewPageMeta creates a new PageMeta with sensible defaults
func NewPageMeta(title, description string) *PageMeta {
	return &PageMeta{
		Title:         title,
		Description:   description,
		OGTitle:       title,
		OGDescription: description,
		OGType:        "website",
		TwitterCard:   "summary_large_image",
		Robots:        "index, follow",
	}
}

// WithImage sets the OG image
func (m *PageMeta) WithImage(imageURL string) *PageMeta {
	m.OGImage = imageURL
	return m
}

// WithURL sets the canonical and OG URL
func (m *PageMeta) WithURL(url string) *PageMeta {
	m.CanonicalURL = url
	m.OGURL = url
	return m
}

// WithKeywords sets the meta keywords
func (m *PageMeta) WithKeywords(keywords string) *PageMeta {
	m.Keywords = keywords
	return m
}

// WithTwitter sets Twitter card metadata
func (m *PageMeta) WithTwitter(cardType, site string) *PageMeta {
	m.TwitterCard = cardType
	m.TwitterSite = site
	return m
}
