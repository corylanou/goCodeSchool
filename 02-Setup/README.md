# 00-Setup: AI-Assisted Development Environment

## 🎯 Overview

Welcome to Go Code School! This setup module will get you ready for AI-assisted "vibe coding" - where you describe what you want to build and AI helps you implement it using Go, HTMX, and modern web technologies.

## 🛠️ What You'll Install

### Required Tools

1. **Go 1.25** - Our primary programming language
2. **VS Code** - Code editor with AI extensions
3. **GitHub Copilot** - FREE for students! AI pair programmer
4. **Git** - Version control
5. **Vercel CLI** - For deploying your projects

### Project-Specific Tools

1. **Air** - Live reload during development
2. **templ** - Type-safe HTML templating
3. **sqlc** - Type-safe SQL code generation

## 🚀 Quick Start

### Step 1: Install Go

#### macOS

```bash
# Using Homebrew (recommended)
brew install go

# Or download from https://golang.org/dl/
```

#### Windows

1. Download installer from [https://golang.org/dl/](https://golang.org/dl/)
2. Run the .msi file
3. Verify: Open Command Prompt and run `go version`

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install golang-go

# Or download latest from golang.org
wget https://golang.org/dl/go1.25.x.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.25.x.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
```

### Step 2: Install VS Code and Extensions

```bash
# Install VS Code extensions
code --install-extension golang.Go
code --install-extension github.copilot
code --install-extension github.copilot-chat
code --install-extension bradlc.vscode-tailwindcss
```

### Step 3: Get GitHub Copilot (FREE for Students!)

1. **Apply for GitHub Student Pack**:
   - Visit [GitHub Education](https://education.github.com/pack)
   - Use your school email (.edu)
   - Upload student verification documents
   - Get approved (usually 24-48 hours)

2. **Activate Copilot**:
   - Copilot Pro automatically included
   - Open VS Code, sign in to GitHub
   - Start coding with AI assistance!

### Step 4: Install Project Tools

```bash
# Air for live reload
go install github.com/cosmtrek/air@latest

# templ for HTML templating
go install github.com/a-h/templ/cmd/templ@latest

# sqlc for database code generation
go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest

# Vercel CLI for deployment
npm install -g vercel
```

### Step 5: Verify Everything Works

```bash
# Check Go installation
go version

# Check tools
air -v
templ version
sqlc version
vercel --version

# Test GitHub Copilot
# Open VS Code and type: func hello() {
# Copilot should suggest: fmt.Println("Hello, World!")
```

## 🎯 Your First AI Vibe Coding Session

Let's test your setup with a simple Go web server:

### 1. Create a test project

```bash
mkdir ~/test-vibe-coding
cd ~/test-vibe-coding
go mod init test-app
```

### 2. Open in VS Code

```bash
code .
```

### 3. Try AI-Assisted Coding

Create `main.go` and start typing:

```text
// Create a simple web server that serves "Hello from AI-assisted Go!"
```

Let GitHub Copilot suggest the complete implementation! You should see something like:

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello from AI-assisted Go!")
    })
    
    fmt.Println("Server starting on :8080")
    http.ListenAndServe(":8080", nil)
}
```

### 4. Test It

```bash
go run main.go
# Visit http://localhost:8080
```

🎉 **Success!** You just wrote your first AI-assisted Go web server!

## 💡 AI Prompting Tips for Beginners

### Start with Comments

```go
// Create a function that handles user registration
// It should validate email and hash passwords
func registerUser() {
    // Copilot will suggest the implementation
}
```

### Use Descriptive Names

```go
// Copilot understands context from function names
func createTodoWithDueDateAndPriority() {
    // AI will suggest appropriate fields and validation
}
```

### Ask for Complete Features

```text
// Create an HTMX endpoint that adds todos without page refresh
// Include validation and error handling
```

## 📁 Project Organization

All your projects will follow this structure:

```text
your-project/
├── main.go              # Entry point
├── handlers/            # HTTP handlers
├── models/             # Data structures
├── templates/          # HTML templates
├── static/            # CSS, JS, images
├── database/          # SQL files and migrations
├── go.mod             # Go dependencies
└── vercel.json        # Deployment config
```

## 🔧 VS Code Configuration

Create `.vscode/settings.json` in your project:

```json
{
  "go.toolsManagement.autoUpdate": true,
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": true
  },
  "github.copilot.editor.enableAutoCompletions": true,
  "emmet.includeLanguages": {
    "templ": "html"
  }
}
```

## 🚨 Troubleshooting

### GitHub Copilot Not Working?

1. Check VS Code extension is enabled
2. Sign in to GitHub account
3. Verify student pack is active
4. Restart VS Code

### Go Tools Missing?

```bash
# Reinstall Go tools
go install -a std
```

### Air Not Found?

```bash
# Add Go bin to PATH
echo 'export PATH=$PATH:$(go env GOPATH)/bin' >> ~/.bashrc
source ~/.bashrc
```

## 🎓 What's Next?

Once your setup is complete, you'll start building real projects:

1. **Portfolio Website** - Personal site with Go backend
2. **Todo Application** - CRUD app with HTMX
3. **Blog Platform** - Content management system
4. **And 6 more projects!**

Each project uses AI assistance to help you:

- Plan and architect applications
- Generate boilerplate code
- Debug and optimize
- Deploy to production

## 📚 Additional Resources

- [Go Documentation](https://golang.org/doc/)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [HTMX Guide](https://htmx.org/docs/)
- [Vercel Go Runtime](https://vercel.com/docs/functions/runtimes/go)

---

**Ready to start building?** Head to `01-Portfolio-Project` and create your first AI-assisted web application!
