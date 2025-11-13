package middleware

import (
	"github.com/gocodeschool/small-business-website/internal/models"
	"github.com/labstack/echo/v4"
)

const configKey = "config"

// ConfigMiddleware adds the config to the Echo context
func ConfigMiddleware(cfg *models.Config) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set(configKey, cfg)
			return next(c)
		}
	}
}

// GetConfig retrieves the config from the Echo context
func GetConfig(c echo.Context) *models.Config {
	cfg, ok := c.Get(configKey).(*models.Config)
	if !ok {
		return nil
	}
	return cfg
}
