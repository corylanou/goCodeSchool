package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/a-h/templ"
	"github.com/gocodeschool/small-business-website/internal/handlers"
	"github.com/gocodeschool/small-business-website/internal/middleware"
	"github.com/gocodeschool/small-business-website/internal/models"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
)

func main() {
	// Load environment variables from .env file (development only)
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Load configuration
	cfg, err := models.LoadConfig()
	if err != nil {
		log.Fatal("Failed to load configuration:", err)
	}

	// Create Echo instance
	e := echo.New()

	// Middleware
	e.Use(echomiddleware.Logger())
	e.Use(echomiddleware.Recover())
	e.Use(echomiddleware.Secure())
	e.Use(echomiddleware.CORS())

	// Custom middleware
	e.Use(middleware.ConfigMiddleware(cfg))

	// Static files
	e.Static("/static", "static")

	// Initialize handlers
	pageHandlers := handlers.NewPageHandlers(cfg)

	// Routes
	e.GET("/", pageHandlers.Home)
	e.GET("/about", pageHandlers.About)
	e.GET("/services", pageHandlers.Services)
	e.GET("/contact", pageHandlers.Contact)

	// TODO: Add contact form submission handler
	// e.POST("/contact", pageHandlers.SubmitContact)

	// Health check endpoint
	e.GET("/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
	})

	// Start server with graceful shutdown
	go func() {
		addr := fmt.Sprintf(":%s", cfg.Port)
		log.Printf("Server starting on http://localhost%s", addr)
		if err := e.Start(addr); err != nil && err != http.ErrServerClosed {
			log.Fatal("Server failed to start:", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit

	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server stopped")
}

// render is a helper function to render Templ components
func render(c echo.Context, component templ.Component) error {
	return component.Render(c.Request().Context(), c.Response())
}
