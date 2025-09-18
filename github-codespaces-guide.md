# GitHub Codespaces for Education: Complete Setup Guide

## Overview

GitHub Codespaces provides cloud-based development environments that run entirely in the browser, making it perfect for students using Chromebooks. Each student gets a full VS Code experience with modern Go and Node.js development tools, GitHub Copilot access, and professional workspace features - all for free through GitHub Education.

## What Students Get for Free

### GitHub Education Pack Benefits

- **60 hours/month of Codespaces** (Core machines: 2-core, 4GB RAM)
- **GitHub Copilot access** (AI pair programming)
- **VS Code in the browser** (full-featured IDE)
- **Pre-configured development environments**
- **Primary development stack** (Go latest, Node.js LTS, npm latest)
- **Persistent storage** for their work
- **Collaboration features** for pair programming

## Setup Process for Educators

### Step 1: Register Your Classroom

1. Go to [GitHub Education](https://education.github.com)
2. Apply for **GitHub Global Campus** as an educator (instant approval with .edu email)
3. Once approved, create a **GitHub Classroom** at [classroom.github.com](https://classroom.github.com)
4. Link your classroom to your GitHub organization

### Step 2: Configure Development Environment

Create a `.devcontainer/devcontainer.json` file in your template repository:

```json
{
  "name": "Go & Node.js Development Environment",
  "image": "mcr.microsoft.com/devcontainers/base:debian-12",
  "features": {
    "ghcr.io/devcontainers/features/go:1": {
      "version": "latest"
    },
    "ghcr.io/devcontainers/features/node:1": {
      "version": "lts"
    },
    "ghcr.io/devcontainers/features/github-cli:1": {},
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "GitHub.copilot",
        "GitHub.copilot-chat",
        "golang.go",
        "a-h.templ",
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "bradlc.vscode-tailwindcss",
        "DavidAnson.vscode-markdownlint",
        "yzhang.markdown-all-in-one",
        "bierner.markdown-preview-github-styles",
        "zxh404.vscode-proto3",
        "tamasfe.even-better-toml",
        "ms-vscode.makefile-tools",
        "eamodio.gitlens",
        "GitHub.vscode-pull-request-github"
      ],
      "settings": {
        "terminal.integrated.defaultProfile.linux": "bash",
        "go.toolsManagement.autoUpdate": true,
        "go.lintTool": "golangci-lint",
        "go.lintOnSave": "workspace",
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "[go]": {
          "editor.defaultFormatter": "golang.go",
          "editor.codeActionsOnSave": {
            "source.organizeImports": "explicit"
          }
        },
        "[templ]": {
          "editor.defaultFormatter": "a-h.templ"
        },
        "[markdown]": {
          "editor.defaultFormatter": "DavidAnson.vscode-markdownlint"
        },
        "[json]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[jsonc]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[toml]": {
          "editor.defaultFormatter": "tamasfe.even-better-toml"
        },
        "tailwindCSS.includeLanguages": {
          "templ": "html"
        },
        "tailwindCSS.experimental.classRegex": [
          ["class\\s*:\\s*\"([^\"]*)\"", "([^\"]*)"]
        ]
      }
    }
  },
  "postCreateCommand": "go version && go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest && go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest && go install github.com/a-h/templ/cmd/templ@latest && node --version && npm --version",
  "remoteUser": "codespace"
}
```

### Step 3: Create Assignment Templates

1. Create a template repository with starter code
2. Include the `.devcontainer` configuration
3. Add a `Makefile` for common tasks:

```makefile
.PHONY: help setup test run lint clean build

help:
    @echo "Available commands:"
    @echo "  make setup   - Install dependencies"
    @echo "  make test    - Run tests"
    @echo "  make run     - Run the application"
    @echo "  make lint    - Run linters"
    @echo "  make build   - Build the application"
    @echo "  make clean   - Clean build artifacts"

setup:
    go mod download
    go mod tidy
    npm install
    @echo "Installing Go tools..."
    go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
    go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
    go install github.com/a-h/templ/cmd/templ@latest

test:
    go test -v ./...
    npm test

run:
    go run main.go

lint:
    golangci-lint run
    npm run lint

build:
    templ generate
    npm run build
    go build -o bin/app main.go

clean:
    rm -rf bin/ dist/ node_modules/
    go clean -cache
```

## Student Setup Process

### Step 1: Create GitHub Account

1. Visit [github.com/signup](https://github.com/signup)
2. Use school email for instant Education Pack approval
3. Verify email address

### Step 2: Apply for GitHub Education Pack

1. Go to [education.github.com/students](https://education.github.com/students)
2. Click "Get your pack"
3. Verify academic status (usually instant with .edu email)
4. Wait for approval email (typically within minutes)

### Step 3: Join GitHub Classroom

1. Instructor provides classroom invitation link
2. Students click link and authorize GitHub Classroom
3. Accept assignment (creates personal repository copy)

### Step 4: Launch Codespace

1. Open assignment repository
2. Click green "Code" button
3. Select "Codespaces" tab
4. Click "Create codespace on main"
5. Wait 1-2 minutes for environment to build (first time only)

## Using Codespaces on Chromebooks

### Accessing Your Codespace

1. **Browser-based**: Works directly in Chrome - no installation needed
2. **Progressive Web App**: Install as app from Chrome for better experience
   - Click three dots menu in Chrome
   - Select "Install app"
   - Creates desktop shortcut

### Essential Keyboard Shortcuts

- **Command Palette**: `Ctrl+Shift+P`
- **File search**: `Ctrl+P`
- **Terminal**: `` Ctrl+` ``
- **Save**: `Ctrl+S`
- **Find**: `Ctrl+F`
- **Multiple cursors**: `Alt+Click`

### Using GitHub Copilot

1. Copilot activates automatically once student has Education Pack
2. Start typing code and see suggestions in gray
3. Press `Tab` to accept suggestions
4. Use `Ctrl+Enter` to see multiple suggestions
5. Access Copilot Chat in sidebar for help

## Managing Codespaces Usage

### For Students

- **Monitor usage**: Settings → Billing → Codespaces usage
- **60 hours/month free** on 2-core machines
- **Stop codespaces** when not in use (auto-stops after 30 min)
- **Delete old codespaces** to free up storage

### Usage Optimization Tips

1. Use 2-core machines (default) for most work
2. Stop codespace after each session
3. Delete codespaces for completed assignments
4. One active codespace per assignment

### Calculating Usage

- 2-core machine = 60 hours/month free
- 4-core machine = 30 hours/month (uses 2x quota)
- Storage: 15GB/month free

## Supported Technologies

### Primary Stack

- **Go (latest)**: Full toolchain, debugging, testing, modules
  - golangci-lint for code quality
  - sqlc for type-safe SQL
  - templ for HTML templating
- **Node.js LTS / npm**: Modern JavaScript/TypeScript development
  - ESLint & Prettier for code formatting
  - Tailwind CSS for styling
  - Build tools and bundlers

### Databases

- SQLite (built-in)
- PostgreSQL (via Docker or sqlc)
- MongoDB (via Docker)
- Redis (via Docker)

### Development Tools

- **Version Control**: Git, GitHub CLI
- **Containerization**: Docker, Docker Compose
- **Build Automation**: Make, npm scripts
- **API Testing**: Thunder Client, curl
- **Collaboration**: Live Share for pair programming
- **AI Assistance**: GitHub Copilot & Copilot Chat

### VS Code Extensions (Pre-configured)

- **Go Development**: Go extension, templ support
- **Web Development**: Tailwind CSS IntelliSense, ESLint, Prettier
- **Documentation**: Markdown linting and preview
- **Configuration**: TOML, JSON formatting
- **Database**: sqlc support (via Go files)

## Common Workflows

### Starting a New Project

```bash
# Go web project with templ
go mod init myproject
go get github.com/a-h/templ
go get github.com/gorilla/mux  # or gin-gonic/gin
templ generate

# Initialize Tailwind CSS
npm init -y
npm install -D tailwindcss
npx tailwindcss init

# Database with sqlc
sqlc init
# Edit sqlc.yaml and create your schema.sql

# Full stack setup
make setup  # Runs all the installation steps
```

### Collaborating with Classmates

1. Install "Live Share" extension
2. Click "Share" in bottom status bar
3. Send link to classmate
4. Both can edit simultaneously

### Submitting Assignments

```bash
git add .
git commit -m "Complete assignment"
git push origin main
```

## Troubleshooting

### Common Issues & Solutions

#### Codespace won't start

- Check GitHub status page
- Try different browser
- Clear browser cache
- Contact GitHub Support

#### Out of free hours

- Delete unused codespaces
- Use 2-core instead of 4-core
- Stop codespaces when not working
- Check usage in Settings → Billing

#### Extensions not working

- Reload window: `Ctrl+Shift+P` → "Reload Window"
- Reinstall extension
- Check extension compatibility

#### Can't push to repository

- Verify repository permissions
- Check git configuration
- Ensure you're on correct branch

## Best Practices for Educators

### Repository Organization

```text
course-template/
├── .devcontainer/
│   └── devcontainer.json
├── .github/
│   └── classroom/
│       └── autograding.json
├── assignments/
│   ├── week1/
│   ├── week2/
│   └── final-project/
├── resources/
│   ├── slides/
│   └── examples/
├── Makefile
└── README.md
```

### Auto-grading Setup

Create `.github/classroom/autograding.json`:

```json
{
  "tests": [
    {
      "name": "Run Go Tests",
      "setup": "go mod download",
      "run": "go test ./...",
      "input": "",
      "output": "",
      "comparison": "included",
      "timeout": 10,
      "points": 50
    },
    {
      "name": "Run Linter",
      "setup": "",
      "run": "golangci-lint run",
      "input": "",
      "output": "",
      "comparison": "included",
      "timeout": 5,
      "points": 25
    }
  ]
}
```

## Additional Resources

### VS Code Extensions Reference

The devcontainer configuration includes these essential extensions:

- **Go Development**:
  - `golang.go` - Official Go extension
  - `a-h.templ` - Templ templating support
- **Web Development**:
  - `bradlc.vscode-tailwindcss` - Tailwind CSS IntelliSense
  - `dbaeumer.vscode-eslint` - ESLint integration
  - `esbenp.prettier-vscode` - Prettier code formatter
- **Documentation**:
  - `DavidAnson.vscode-markdownlint` - Markdown linting
  - `yzhang.markdown-all-in-one` - Markdown tools
  - `bierner.markdown-preview-github-styles` - GitHub-style preview
- **Configuration Files**:
  - `tamasfe.even-better-toml` - TOML language support
  - `zxh404.vscode-proto3` - Protocol Buffer support
- **Productivity**:
  - `GitHub.copilot` - AI pair programming
  - `GitHub.copilot-chat` - AI chat assistant
  - `eamodio.gitlens` - Git supercharged
  - `GitHub.vscode-pull-request-github` - GitHub PR management

### Official Documentation

- [GitHub Codespaces Docs](https://docs.github.com/en/codespaces)
- [GitHub Education](https://education.github.com)
- [GitHub Classroom Guide](https://docs.github.com/en/education/manage-coursework-with-github-classroom)
- [VS Code Documentation](https://code.visualstudio.com/docs)

### Video Tutorials

- [GitHub Codespaces Overview](https://www.youtube.com/watch?v=mPgD5YODZzQ)
- [GitHub Classroom Setup](https://www.youtube.com/watch?v=xVVeJ5z5v3A)
- [Using Copilot in Education](https://www.youtube.com/watch?v=RomNBJFQPVE)

### Support Channels

- GitHub Education Community: [education.github.community](https://education.github.community)
- GitHub Support: [support.github.com](https://support.github.com)
- VS Code Issues: [github.com/microsoft/vscode](https://github.com/microsoft/vscode/issues)

## Security & Privacy

### Student Data Protection

- Each codespace is isolated
- Students can't access others' codespaces
- All data encrypted at rest and in transit
- Compliant with FERPA/COPPA

### Code Ownership

- Students retain ownership of their code
- Repositories can be private or public
- Export options available
- Full git history preserved

## Cost Breakdown (After Free Tier)

If students exceed free tier:

- 2-core: $0.18/hour
- 4-core: $0.36/hour
- 8-core: $0.72/hour
- Storage: $0.07/GB/month

**Note**: Most students never exceed free tier with proper usage.

## Quick Start Checklist

### For Educators

- [ ] Apply for GitHub Global Campus
- [ ] Create GitHub Classroom
- [ ] Set up template repository
- [ ] Configure .devcontainer
- [ ] Create first assignment
- [ ] Share invitation link

### For Students

- [ ] Create GitHub account
- [ ] Apply for Education Pack
- [ ] Join classroom via link
- [ ] Accept first assignment
- [ ] Launch first codespace
- [ ] Complete setup tutorial

## Conclusion

GitHub Codespaces eliminates all barriers to professional development environments for students on Chromebooks. With zero installation, automatic configuration, and generous free tier, students can focus on learning rather than setup. The inclusion of GitHub Copilot and professional tools prepares them for real-world development workflows.

For questions or support, reach out to GitHub Education support or consult the community forums.
