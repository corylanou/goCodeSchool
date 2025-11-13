package models

import (
	"fmt"
	"os"
	"strconv"
)

// Config holds all configuration for the application
type Config struct {
	// Server configuration
	Port string
	Env  string

	// Brevo email service
	BrevoAPIKey    string
	BrevoFromEmail string
	BrevoFromName  string
	BrevoToEmail   string

	// reCAPTCHA configuration
	RecaptchaSiteKey   string
	RecaptchaSecretKey string
	RecaptchaThreshold float64

	// Site configuration
	SiteURL         string
	SiteName        string
	SiteDescription string
}

// LoadConfig loads configuration from environment variables
func LoadConfig() (*Config, error) {
	cfg := &Config{
		Port: getEnv("PORT", "8080"),
		Env:  getEnv("ENV", "development"),

		BrevoAPIKey:    os.Getenv("BREVO_API_KEY"),
		BrevoFromEmail: os.Getenv("BREVO_FROM_EMAIL"),
		BrevoFromName:  os.Getenv("BREVO_FROM_NAME"),
		BrevoToEmail:   os.Getenv("BREVO_TO_EMAIL"),

		RecaptchaSiteKey:   os.Getenv("RECAPTCHA_SITE_KEY"),
		RecaptchaSecretKey: os.Getenv("RECAPTCHA_SECRET_KEY"),
		RecaptchaThreshold: getEnvFloat("RECAPTCHA_THRESHOLD", 0.5),

		SiteURL:         getEnv("SITE_URL", "http://localhost:8080"),
		SiteName:        getEnv("SITE_NAME", "Small Business Website"),
		SiteDescription: getEnv("SITE_DESCRIPTION", "Professional small business website"),
	}

	// Validate required fields
	if cfg.Env == "production" {
		if cfg.BrevoAPIKey == "" {
			return nil, fmt.Errorf("BREVO_API_KEY is required in production")
		}
		if cfg.RecaptchaSiteKey == "" || cfg.RecaptchaSecretKey == "" {
			return nil, fmt.Errorf("RECAPTCHA keys are required in production")
		}
	}

	return cfg, nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvFloat(key string, defaultValue float64) float64 {
	if value := os.Getenv(key); value != "" {
		if f, err := strconv.ParseFloat(value, 64); err == nil {
			return f
		}
	}
	return defaultValue
}
