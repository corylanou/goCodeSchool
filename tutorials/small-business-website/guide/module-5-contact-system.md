# Module 5: Contact System

**Duration**: 3-4 class periods (135-180 minutes total)

**Learning Objectives**:
- Implement server-side form handling in Go
- Integrate Brevo API for email delivery
- Add reCAPTCHA v3 for spam prevention
- Implement honeypot spam technique
- Create client-side and server-side validation
- Use HTMX for smooth form submission
- Handle errors gracefully
- Test the complete contact flow

## Prerequisites

Before starting this module, you should have:
- Completed Modules 1-4
- Contact page with form HTML in place
- Brevo account created (free tier)
- Google reCAPTCHA account and keys

---

## Part 1: Service Account Setup

### Setting Up Brevo

**Step 1: Create Brevo Account**:
1. Visit [brevo.com](https://www.brevo.com/)
2. Sign up for free account
3. Verify your email address
4. Complete account setup

**Step 2: Get API Key**:
1. Click your profile (top right)
2. Go to **SMTP & API**
3. Click **API Keys** tab
4. Click **Generate a new API key**
5. Name it: "Small Business Website"
6. Copy the key (you'll only see it once!)

**Step 3: Verify Sender Email**:
1. Go to **Senders**
2. Add your email address
3. Verify via email link
4. This email will appear as the "from" address

**Note**: Free tier includes 300 emails per day (9,000/month) - perfect for small business sites.

### Setting Up Google reCAPTCHA v3

**Step 1: Register Site**:
1. Visit [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Click the **+** button to create new site
3. Enter label: "Client Business Website"
4. Choose **reCAPTCHA v3**
5. Add domains:
   - `localhost` (for development)
   - `yourdomain.com` (your production domain)
6. Accept terms and submit

**Step 2: Get Keys**:
- **Site Key** - Goes in frontend (visible to users)
- **Secret Key** - Goes in backend (keep secure!)
- Copy both keys

**Step 3: Understanding reCAPTCHA v3**:
- No user interaction (no checkbox or challenge)
- Returns a score (0.0 to 1.0)
  - 1.0 = Very likely human
  - 0.0 = Very likely bot
- You set the threshold (recommended: 0.5)
- Runs invisibly in the background

### Add Keys to Environment

**Edit `.env`**:
```env
# Brevo Configuration
BREVO_API_KEY=your_brevo_api_key_here
BREVO_FROM_EMAIL=noreply@yourdomain.com
BREVO_FROM_NAME=Your Business Name
BREVO_TO_EMAIL=contact@yourdomain.com

# reCAPTCHA v3
RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
RECAPTCHA_THRESHOLD=0.5

# Site Info
SITE_URL=http://localhost:7331
SITE_NAME=Your Business Name
```

**Important**: Never commit `.env` to Git! It should already be in `.gitignore`.

---

## Part 2: Contact Form Models

### Create Form Data Structures

**Create `internal/models/contact.go`**:

```go
package models

import (
	"strings"
	"regexp"
)

// ContactForm represents a contact form submission
type ContactForm struct {
	Name    string `json:"name" form:"name"`
	Email   string `json:"email" form:"email"`
	Phone   string `json:"phone" form:"phone"`
	Message string `json:"message" form:"message"`
	Website string `json:"website" form:"website"` // Honeypot field
}

// Validate performs validation on the contact form
func (f *ContactForm) Validate() map[string]string {
	errors := make(map[string]string)

	// Name validation
	f.Name = strings.TrimSpace(f.Name)
	if f.Name == "" {
		errors["name"] = "Name is required"
	} else if len(f.Name) < 2 {
		errors["name"] = "Name must be at least 2 characters"
	} else if len(f.Name) > 100 {
		errors["name"] = "Name must be less than 100 characters"
	}

	// Email validation
	f.Email = strings.TrimSpace(f.Email)
	if f.Email == "" {
		errors["email"] = "Email is required"
	} else if !isValidEmail(f.Email) {
		errors["email"] = "Please enter a valid email address"
	}

	// Phone validation (optional)
	f.Phone = strings.TrimSpace(f.Phone)
	if f.Phone != "" && !isValidPhone(f.Phone) {
		errors["phone"] = "Please enter a valid phone number"
	}

	// Message validation
	f.Message = strings.TrimSpace(f.Message)
	if f.Message == "" {
		errors["message"] = "Message is required"
	} else if len(f.Message) < 10 {
		errors["message"] = "Message must be at least 10 characters"
	} else if len(f.Message) > 1000 {
		errors["message"] = "Message must be less than 1000 characters"
	}

	// Honeypot check (if filled, it's a bot)
	if f.Website != "" {
		errors["spam"] = "Spam detected"
	}

	return errors
}

// isValidEmail checks if email format is valid
func isValidEmail(email string) bool {
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}

// isValidPhone checks if phone format is valid (US format, flexible)
func isValidPhone(phone string) bool {
	// Remove common formatting characters
	cleaned := regexp.MustCompile(`[^\d]`).ReplaceAllString(phone, "")

	// Check if it's 10 or 11 digits (with or without country code)
	return len(cleaned) == 10 || len(cleaned) == 11
}
```

---

## Part 3: reCAPTCHA Verification

### Create reCAPTCHA Service

**Create `internal/services/recaptcha.go`**:

```go
package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"time"
)

// RecaptchaService handles reCAPTCHA verification
type RecaptchaService struct {
	secretKey string
	threshold float64
}

// RecaptchaResponse represents Google's reCAPTCHA response
type RecaptchaResponse struct {
	Success     bool      `json:"success"`
	Score       float64   `json:"score"`
	Action      string    `json:"action"`
	ChallengeTS time.Time `json:"challenge_ts"`
	Hostname    string    `json:"hostname"`
	ErrorCodes  []string  `json:"error-codes"`
}

// NewRecaptchaService creates a new recaptcha service
func NewRecaptchaService(secretKey string, threshold float64) *RecaptchaService {
	return &RecaptchaService{
		secretKey: secretKey,
		threshold: threshold,
	}
}

// Verify checks if the reCAPTCHA token is valid
func (s *RecaptchaService) Verify(token string) (bool, float64, error) {
	// Prepare request to Google
	resp, err := http.PostForm("https://www.google.com/recaptcha/api/siteverify",
		url.Values{
			"secret":   {s.secretKey},
			"response": {token},
		})

	if err != nil {
		return false, 0, fmt.Errorf("failed to verify recaptcha: %w", err)
	}
	defer resp.Body.Close()

	// Parse response
	var recaptchaResp RecaptchaResponse
	if err := json.NewDecoder(resp.Body).Decode(&recaptchaResp); err != nil {
		return false, 0, fmt.Errorf("failed to decode recaptcha response: %w", err)
	}

	// Check if verification succeeded
	if !recaptchaResp.Success {
		return false, 0, fmt.Errorf("recaptcha verification failed: %v", recaptchaResp.ErrorCodes)
	}

	// Check score against threshold
	isHuman := recaptchaResp.Score >= s.threshold

	return isHuman, recaptchaResp.Score, nil
}
```

---

## Part 4: Email Service (Brevo)

### Create Email Service

**Create `internal/services/email.go`**:

```go
package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gocodeschool/small-business-website/internal/models"
)

// EmailService handles sending emails via Brevo
type EmailService struct {
	apiKey    string
	fromEmail string
	fromName  string
	toEmail   string
}

// NewEmailService creates a new email service
func NewEmailService(apiKey, fromEmail, fromName, toEmail string) *EmailService {
	return &EmailService{
		apiKey:    apiKey,
		fromEmail: fromEmail,
		fromName:  fromName,
		toEmail:   toEmail,
	}
}

// BrevoEmail represents the Brevo API email structure
type BrevoEmail struct {
	Sender  BrevoContact   `json:"sender"`
	To      []BrevoContact `json:"to"`
	Subject string         `json:"subject"`
	HtmlContent string     `json:"htmlContent"`
}

// BrevoContact represents a contact in Brevo
type BrevoContact struct {
	Email string `json:"email"`
	Name  string `json:"name,omitempty"`
}

// SendContactForm sends a contact form submission via email
func (s *EmailService) SendContactForm(form *models.ContactForm) error {
	// Build HTML email content
	htmlContent := fmt.Sprintf(`
		<h2>New Contact Form Submission</h2>
		<p><strong>Name:</strong> %s</p>
		<p><strong>Email:</strong> %s</p>
		<p><strong>Phone:</strong> %s</p>
		<p><strong>Message:</strong></p>
		<p>%s</p>
	`, form.Name, form.Email, form.Phone, form.Message)

	// Prepare email payload
	email := BrevoEmail{
		Sender: BrevoContact{
			Email: s.fromEmail,
			Name:  s.fromName,
		},
		To: []BrevoContact{
			{
				Email: s.toEmail,
			},
		},
		Subject:     fmt.Sprintf("New Contact Form: %s", form.Name),
		HtmlContent: htmlContent,
	}

	// Convert to JSON
	payload, err := json.Marshal(email)
	if err != nil {
		return fmt.Errorf("failed to marshal email: %w", err)
	}

	// Create HTTP request
	req, err := http.NewRequest("POST", "https://api.brevo.com/v3/smtp/email", bytes.NewBuffer(payload))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("api-key", s.apiKey)

	// Send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}
	defer resp.Body.Close()

	// Check response status
	if resp.StatusCode != http.StatusCreated {
		return fmt.Errorf("brevo API returned status %d", resp.StatusCode)
	}

	return nil
}
```

---

## Part 5: Contact Form Handler

### Create Contact Handler

**Update `internal/handlers/pages.go`** - add this method:

```go
// SubmitContact handles contact form submissions
func (h *PageHandlers) SubmitContact(c echo.Context) error {
	// Parse form data
	var form models.ContactForm
	if err := c.Bind(&form); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid form data",
		})
	}

	// Validate form
	if errors := form.Validate(); len(errors) > 0 {
		return c.JSON(http.StatusUnprocessableEntity, map[string]interface{}{
			"error":  "Validation failed",
			"fields": errors,
		})
	}

	// Get reCAPTCHA token from form
	recaptchaToken := c.FormValue("recaptcha_token")
	if recaptchaToken == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "reCAPTCHA token is required",
		})
	}

	// Verify reCAPTCHA
	recaptchaService := services.NewRecaptchaService(
		h.config.RecaptchaSecretKey,
		h.config.RecaptchaThreshold,
	)

	isHuman, score, err := recaptchaService.Verify(recaptchaToken)
	if err != nil {
		log.Printf("reCAPTCHA verification error: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to verify reCAPTCHA",
		})
	}

	if !isHuman {
		log.Printf("Spam detected: score %.2f", score)
		return c.JSON(http.StatusForbidden, map[string]string{
			"error": "Spam detected. Please try again.",
		})
	}

	// Send email via Brevo
	emailService := services.NewEmailService(
		h.config.BrevoAPIKey,
		h.config.BrevoFromEmail,
		h.config.BrevoFromName,
		h.config.BrevoToEmail,
	)

	if err := emailService.SendContactForm(&form); err != nil {
		log.Printf("Failed to send email: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to send message. Please try again or call us directly.",
		})
	}

	// Success response
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Thank you! Your message has been sent successfully. We'll get back to you soon.",
	})
}
```

### Add Route

**Update `cmd/server/main.go`** - add this route:

```go
// Contact form submission
e.POST("/contact", pageHandlers.SubmitContact)
```

---

## Part 6: Frontend Form with HTMX

### Update Contact Page Template

**Edit `views/pages/contact.templ`** - replace the form section:

```templ
<!-- Contact Form -->
<div class="bg-gray-50 p-8 rounded-lg">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">Send a Message</h2>

    <form
        id="contact-form"
        hx-post="/contact"
        hx-trigger="submit"
        hx-target="#form-messages"
        hx-swap="innerHTML"
        class="space-y-6"
    >
        <!-- Name Field -->
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Name <span class="text-red-600">*</span>
            </label>
            <input
                type="text"
                id="name"
                name="name"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Your name"
            />
        </div>

        <!-- Email Field -->
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email <span class="text-red-600">*</span>
            </label>
            <input
                type="email"
                id="email"
                name="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="your@email.com"
            />
        </div>

        <!-- Phone Field (Optional) -->
        <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Phone
            </label>
            <input
                type="tel"
                id="phone"
                name="phone"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="(555) 123-4567"
            />
        </div>

        <!-- Message Field -->
        <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message <span class="text-red-600">*</span>
            </label>
            <textarea
                id="message"
                name="message"
                required
                rows="5"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                placeholder="Tell us how we can help you..."
            ></textarea>
        </div>

        <!-- Honeypot Field (hidden from users) -->
        <input
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
            style="position: absolute; left: -9999px;"
            aria-hidden="true"
        />

        <!-- Hidden reCAPTCHA Token Field -->
        <input type="hidden" name="recaptcha_token" id="recaptcha_token"/>

        <!-- reCAPTCHA Notice -->
        <div class="text-sm text-gray-600">
            This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy" class="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener">Privacy Policy</a> and
            <a href="https://policies.google.com/terms" class="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener">Terms of Service</a> apply.
        </div>

        <!-- Submit Button -->
        <button
            type="submit"
            class="w-full btn-primary text-lg"
            id="submit-btn"
        >
            Send Message
        </button>

        <!-- Form Messages Container -->
        <div id="form-messages"></div>
    </form>
</div>

<!-- reCAPTCHA v3 Script -->
<script>
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // Get reCAPTCHA token
        grecaptcha.ready(function() {
            grecaptcha.execute('{ config.RecaptchaSiteKey }', {action: 'submit'})
                .then(function(token) {
                    // Add token to form
                    document.getElementById('recaptcha_token').value = token;

                    // Trigger HTMX submission
                    htmx.trigger('#contact-form', 'submit');
                });
        });
    });

    // Handle HTMX events
    document.body.addEventListener('htmx:beforeRequest', function(e) {
        if (e.detail.elt.id === 'contact-form') {
            // Disable submit button
            const btn = document.getElementById('submit-btn');
            btn.disabled = true;
            btn.textContent = 'Sending...';
        }
    });

    document.body.addEventListener('htmx:afterRequest', function(e) {
        if (e.detail.elt.id === 'contact-form') {
            const btn = document.getElementById('submit-btn');
            btn.disabled = false;
            btn.textContent = 'Send Message';

            const response = JSON.parse(e.detail.xhr.response);

            if (e.detail.successful) {
                // Success
                document.getElementById('form-messages').innerHTML = `
                    <div class="p-4 bg-green-100 text-green-800 rounded-lg">
                        ${response.message}
                    </div>
                `;

                // Clear form
                document.getElementById('contact-form').reset();
            } else {
                // Error
                document.getElementById('form-messages').innerHTML = `
                    <div class="p-4 bg-red-100 text-red-800 rounded-lg">
                        ${response.error || 'An error occurred. Please try again.'}
                    </div>
                `;
            }
        }
    });
</script>
```

---

## Part 7: Testing the Contact Form

### Manual Testing Checklist

**Test Valid Submissions**:
1. Fill out form with valid data
2. Click submit
3. Check for success message
4. Check email inbox for message
5. Verify all form fields are in email

**Test Validation**:
1. Submit empty form → Should show validation errors
2. Submit with invalid email → Should reject
3. Submit with very short message → Should reject
4. Submit with very long message → Should reject

**Test Spam Prevention**:
1. Fill honeypot field → Should be rejected as spam
2. Use browser console to test low reCAPTCHA score (harder to test)

**Test Error Handling**:
1. Temporarily use invalid Brevo API key
2. Submit form
3. Should show user-friendly error (not technical details)

### Debugging Tips

**Email Not Sending**:
- Check Brevo API key is correct in `.env`
- Verify sender email is verified in Brevo
- Check server logs for errors
- Test API key with curl:
```bash
curl -X POST https://api.brevo.com/v3/smtp/email \
  -H "api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": {"email": "test@example.com"},
    "to": [{"email": "you@example.com"}],
    "subject": "Test",
    "htmlContent": "<p>Test email</p>"
  }'
```

**reCAPTCHA Not Working**:
- Verify site key is in `.env` and loaded in template
- Check console for JavaScript errors
- Ensure domain is added in reCAPTCHA admin
- For localhost, make sure `localhost` is in allowed domains

**Form Not Submitting**:
- Check browser console for errors
- Verify HTMX is loaded
- Check network tab to see if request is made
- Verify route is registered in main.go

---

## Exercises

### Exercise 1: Implement Contact Form (60 minutes)

**Tasks**:
1. Set up Brevo account and get API key
2. Set up reCAPTCHA and get keys
3. Add keys to `.env`
4. Create contact form models
5. Create email and reCAPTCHA services
6. Implement contact handler
7. Update contact page template with HTMX
8. Test full flow

**Deliverable**: Working contact form with email delivery

### Exercise 2: Custom Email Template (20 minutes)

**Tasks**:
1. Design a better HTML email template
2. Include business branding
3. Format contact data nicely
4. Add a "Reply" button
5. Test with different email clients (Gmail, Outlook)

**Deliverable**: Branded HTML email template

### Exercise 3: Form Validation Enhancement (25 minutes)

**Tasks**:
1. Add real-time client-side validation
2. Show inline error messages
3. Highlight invalid fields
4. Add character counter for message field
5. Prevent submission if invalid

**Deliverable**: Enhanced validation UX

### Exercise 4: Rate Limiting (30 minutes)

**Tasks**:
1. Research rate limiting in Go
2. Implement simple rate limiter (max 5 submissions per hour per IP)
3. Return appropriate error message
4. Test with rapid submissions

**Deliverable**: Rate-limited contact form

### Exercise 5: Auto-Response Email (Optional, 30 minutes)

**Tasks**:
1. Send auto-response to customer when they submit form
2. Thank them and set expectations ("We'll respond within 24 hours")
3. Include business contact info
4. Make it professional and branded

**Deliverable**: Auto-response email functionality

---

## Assessment Checklist

Before moving to Module 6, you should be able to:
- [ ] Set up and configure Brevo email service
- [ ] Set up and configure Google reCAPTCHA v3
- [ ] Create form validation logic
- [ ] Handle form submissions in Go
- [ ] Send emails via API
- [ ] Implement honeypot spam prevention
- [ ] Verify reCAPTCHA tokens
- [ ] Use HTMX for smooth form submission
- [ ] Handle errors gracefully
- [ ] Test the complete contact flow

## Security Best Practices

**1. Never Trust Client Input**:
- Always validate on server
- Client-side validation is for UX, not security
- Sanitize all inputs

**2. Protect API Keys**:
- Never commit `.env` to Git
- Use environment variables in production
- Rotate keys if exposed

**3. Rate Limiting**:
- Prevent abuse by limiting submissions per IP
- Consider adding CAPTCHA after failed attempts

**4. Error Messages**:
- Don't reveal internal details to users
- Log detailed errors server-side
- Show friendly messages to users

**5. HTTPS Only**:
- Never send sensitive data over HTTP
- Vercel provides automatic HTTPS

---

## Troubleshooting Common Issues

**Issue**: "Brevo API returned status 401"
- **Cause**: Invalid API key
- **Solution**: Double-check API key in .env, regenerate if needed

**Issue**: "reCAPTCHA verification failed"
- **Cause**: Invalid secret key or domain mismatch
- **Solution**: Verify secret key, ensure domain is registered

**Issue**: Emails going to spam
- **Cause**: No SPF/DKIM records or suspicious content
- **Solution**: Set up domain authentication in Brevo, avoid spam trigger words

**Issue**: Form submits but no email received
- **Cause**: Incorrect "to" email in .env
- **Solution**: Check BREVO_TO_EMAIL is correct, check spam folder

**Issue**: "CORS error" in browser console
- **Cause**: Missing CORS middleware (shouldn't happen with template)
- **Solution**: Ensure CORS middleware is enabled in main.go

---

## Next Module

In **Module 6: SEO & Performance**, you'll:
- Optimize meta tags for search engines
- Implement Open Graph tags for social sharing
- Improve Core Web Vitals
- Optimize images and assets
- Set up Google Analytics
- Test with PageSpeed Insights
- Implement structured data (Schema.org)
- Create XML sitemap

Your site is now fully functional - time to make it discoverable and fast!

---

**Pro Tip**: Test your contact form from multiple devices and email addresses before showing the client. Nothing worse than a broken contact form on launch day!
