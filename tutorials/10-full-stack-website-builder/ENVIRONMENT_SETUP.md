# Environment Setup Guide

Complete installation guide for all tools needed for full-stack Go web development.

---

## Overview

You'll install:

- Go 1.25 (programming language)
- VS Code (code editor)
- templ (template engine)
- Tailwind CSS (styling)
- goose (database migrations)
- sqlc (type-safe queries)
- litestream (database backups)
- Fly.io or Railway CLI (deployment)
- Git (version control)

**Estimated time:** 45-60 minutes

---

## System Requirements

### Minimum

- **OS**: macOS 10.15+, Windows 10+, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Disk**: 5GB free space
- **Internet**: Broadband connection

### Supported Platforms

- ✅ macOS (Intel or Apple Silicon)
- ✅ Windows 10/11
- ✅ Linux (Ubuntu, Debian, Fedora, etc.)
- ✅ ChromeOS (Linux container)

---

## Step 1: Install Git

Git is required for version control and deploying to hosting platforms.

### macOS

#### Check if already installed:

```bash
git --version
```text

If not installed:

```bash
# Using Homebrew (recommended)
brew install git

# OR download from:
# https://git-scm.com/download/mac
```text

### Windows

Download and install from: [git-scm.com/download/win](https://git-scm.com/download/win)

#### During installation:

- Use default options
- Choose "Git from the command line and also from 3rd-party software"
- Choose "Use Windows' default console window"

### Linux

```bash
# Debian/Ubuntu
sudo apt update
sudo apt install git

# Fedora
sudo dnf install git

# Arch
sudo pacman -S git
```text

### Verify Installation

```bash
git --version
# Should show: git version 2.x.x
```text

### Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```text

---

## Step 2: Install Go 1.25

### macOS

#### Using Homebrew (Recommended):

```bash
brew install go@1.25
```text

#### Or download installer:

1. Visit [go.dev/dl](https://go.dev/dl/)
2. Download macOS installer (.pkg)
3. Run installer
4. Follow prompts

### Windows

1. Visit [go.dev/dl](https://go.dev/dl/)
2. Download Windows installer (.msi)
3. Run installer
4. Follow prompts
5. Installer adds Go to PATH automatically

### Linux

```bash
# Download
wget https://go.dev/dl/go1.25.0.linux-amd64.tar.gz

# Remove old Go installation (if any)
sudo rm -rf /usr/local/go

# Extract
sudo tar -C /usr/local -xzf go1.25.0.linux-amd64.tar.gz

# Add to PATH (add to ~/.profile or ~/.bashrc)
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$(go env GOPATH)/bin

# Apply changes
source ~/.profile
```text

### Verify Installation

```bash
go version
# Should show: go version go1.25.0 darwin/amd64 (or your OS)
```text

### Set Up Go Environment

```bash
# View Go environment
go env

# Important paths:
# GOPATH - where Go packages are stored (usually ~/go)
# GOROOT - where Go is installed (usually /usr/local/go)
```text

#### Add to PATH (if not automatic):

#### macOS/Linux (~/.bashrc or ~/.zshrc):

```bash
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$(go env GOPATH)/bin
```text

#### Windows:

- Go installer usually adds to PATH automatically
- If not, add `C:\Go\bin` to PATH in System Environment Variables

---

## Step 3: Install VS Code

### All Platforms

1. Visit [code.visualstudio.com](https://code.visualstudio.com/)
2. Download for your OS
3. Run installer
4. Follow prompts

### Verify Installation

```bash
code --version
# Should show version number
```text

#### If `code` command not found:

#### macOS:

1. Open VS Code
2. Press `Cmd+Shift+P`
3. Type "shell command"
4. Select "Install 'code' command in PATH"

#### Windows:

- Usually works after restart
- If not, reinstall and check "Add to PATH" during installation

---

## Step 4: Install VS Code Extensions

Open VS Code and install these extensions:

### Required Extensions

#### Go Extension:

1. Click Extensions icon (left sidebar) or press `Ctrl+Shift+X`
2. Search for "Go"
3. Install "Go" by Go Team at Google
4. Click "Install"

#### templ Extension:

1. Search for "templ"
2. Install "templ" by a-h
3. Provides syntax highlighting and IntelliSense

### Recommended Extensions

#### Tailwind CSS IntelliSense:

- Autocomplete for Tailwind classes
- Search: "Tailwind CSS IntelliSense"

#### SQLite Viewer:

- View SQLite databases in VS Code
- Search: "SQLite Viewer"

#### Error Lens:

- Shows errors inline
- Search: "Error Lens"

#### GitLens:

- Git supercharged
- Search: "GitLens"

### Configure Go Extension

After installing Go extension, VS Code will prompt to install Go tools:

1. Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac)
2. Type "Go: Install/Update Tools"
3. Select all tools
4. Click "OK"

This installs:

- gopls (language server)
- dlv (debugger)
- staticcheck (linter)
- And more...

---

## Step 5: Install templ

templ generates Go code from template files.

### All Platforms

```bash
go install github.com/a-h/templ/cmd/templ@latest
```text

### Verify Installation

```bash
templ version
# Should show version number
```text

#### If `templ: command not found`:

Ensure `$(go env GOPATH)/bin` is in your PATH:

```bash
# Check GOPATH
go env GOPATH

# Add to PATH (if not already)
export PATH=$PATH:$(go env GOPATH)/bin
```text

---

## Step 6: Install Tailwind CSS

### Option A: Tailwind CLI (Standalone Binary)

**Recommended for students** - no Node.js required!

#### macOS:

```bash
# Intel Macs
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-x64
chmod +x tailwindcss-macos-x64
sudo mv tailwindcss-macos-x64 /usr/local/bin/tailwindcss

# Apple Silicon Macs
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64
chmod +x tailwindcss-macos-arm64
sudo mv tailwindcss-macos-arm64 /usr/local/bin/tailwindcss
```text

#### Linux:

```bash
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
chmod +x tailwindcss-linux-x64
sudo mv tailwindcss-linux-x64 /usr/local/bin/tailwindcss
```text

#### Windows:

```powershell
# Download from:
# https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-windows-x64.exe
# Rename to tailwindcss.exe
# Add to PATH
```text

#### Verify:

```bash
tailwindcss --help
```text

### Option B: Via npm (If You Have Node.js)

```bash
npm install -g tailwindcss
```text

---

## Step 7: Install goose

goose manages database migrations.

### All Platforms

```bash
go install github.com/pressly/goose/v3/cmd/goose@latest
```text

### Verify Installation

```bash
goose -version
# Should show version number
```text

---

## Step 8: Install sqlc

sqlc generates type-safe Go code from SQL.

### All Platforms

```bash
go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
```text

### Verify Installation

```bash
sqlc version
# Should show version number
```text

---

## Step 9: Install SQLite

SQLite is our database. It's often pre-installed, but let's ensure you have it.

### Check if Installed

```bash
sqlite3 --version
```text

If not installed:

### macOS

```bash
brew install sqlite3
```text

### Windows

1. Download from [sqlite.org/download.html](https://www.sqlite.org/download.html)
2. Download "sqlite-tools-win32-x86" ZIP
3. Extract to `C:\sqlite`
4. Add `C:\sqlite` to PATH

### Linux

```bash
# Debian/Ubuntu
sudo apt install sqlite3

# Fedora
sudo dnf install sqlite

# Arch
sudo pacman -S sqlite
```text

### Install Go SQLite Driver

```bash
go install github.com/mattn/go-sqlite3@latest
```text

#### Important for Windows users:

- Requires GCC compiler
- Install TDM-GCC: [tdm-gcc.tdragon.net](https://jmeubank.github.io/tdm-gcc/)
- Or use WSL2 (Windows Subsystem for Linux)

---

## Step 10: Install litestream

litestream provides continuous backups for SQLite.

### macOS

```bash
brew install litestream
```text

### Linux

```bash
# Download latest release
wget https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz

# Extract
tar -xzf litestream-v0.3.13-linux-amd64.tar.gz

# Move to PATH
sudo mv litestream /usr/local/bin/

# Make executable
sudo chmod +x /usr/local/bin/litestream
```text

### Windows

1. Download from [GitHub releases](https://github.com/benbjohnson/litestream/releases)
2. Extract `litestream.exe`
3. Move to `C:\Program Files\litestream\`
4. Add to PATH

### Verify Installation

```bash
litestream version
# Should show v0.3.x
```text

---

## Step 11: Install Deployment CLI

Choose **either** Fly.io **or** Railway (or install both).

### Option A: Fly.io CLI

#### macOS/Linux:

```bash
curl -L https://fly.io/install.sh | sh
```text

#### Windows:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```text

#### Verify:

```bash
flyctl version
```text

### Option B: Railway CLI

#### Requires Node.js/npm:

```bash
npm install -g @railway/cli
```text

#### Verify:

```bash
railway --version
```text

---

## Step 12: Install DB Browser for SQLite (Optional but Recommended)

GUI tool for viewing/editing SQLite databases.

### All Platforms

1. Visit [sqlitebrowser.org](https://sqlitebrowser.org/)
2. Download for your OS
3. Install

**Alternative:** Use VS Code extension "SQLite Viewer"

---

## Step 13: Set Up Project Directory

Create a workspace directory:

```bash
# macOS/Linux
mkdir -p ~/projects/goCodeSchool
cd ~/projects/goCodeSchool

# Windows
mkdir C:\projects\goCodeSchool
cd C:\projects\goCodeSchool
```text

---

## Verification Checklist

Run these commands to verify everything is installed:

```bash
# Version checks
git --version
go version
code --version
templ version
tailwindcss --help
goose -version
sqlc version
sqlite3 --version
litestream version
flyctl version  # or railway --version

# Go environment
go env

# Verify PATH includes Go binaries
echo $PATH | grep go  # macOS/Linux
echo %PATH% | findstr go  # Windows
```text

#### All should show version numbers or help text!

---

## Common Installation Issues

### Issue: Command Not Found

**Problem:** Installed tool but terminal says "command not found"

#### Solution:

1. Close and reopen terminal
2. Verify tool in PATH:

   ```bash
   echo $PATH  # macOS/Linux
   echo %PATH%  # Windows
```text

3. Add Go bin to PATH:

   ```bash
   export PATH=$PATH:$(go env GOPATH)/bin
```text

4. Make permanent by adding to `~/.bashrc`, `~/.zshrc`, or `~/.profile`

### Issue: Go SQLite3 Build Errors (Windows)

**Problem:** `go get github.com/mattn/go-sqlite3` fails

#### Solution:

1. Install TDM-GCC: [jmeubank.github.io/tdm-gcc](https://jmeubank.github.io/tdm-gcc/)
2. Or use WSL2 (recommended for Windows developers)
3. Ensure `CGO_ENABLED=1`

### Issue: Permission Denied (Linux/macOS)

**Problem:** `sudo: command not found` or `permission denied`

#### Solution:

```bash
# Use sudo for system-wide installs
sudo mv file /usr/local/bin/

# Or install to user directory
mv file ~/bin/
export PATH=$PATH:~/bin
```text

### Issue: Homebrew Not Installed (macOS)

**Problem:** `brew: command not found`

#### Solution:

```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```text

### Issue: templ Generate Fails

**Problem:** `templ generate` shows errors

#### Solution:

1. Verify templ installed: `templ version`
2. Verify Go installed: `go version`
3. Check file permissions
4. Ensure `.templ` files have correct syntax

---

## Platform-Specific Notes

### macOS

#### Homebrew is your friend:

- Easiest way to install most tools
- Handles updates: `brew upgrade`
- Install Homebrew first

#### Rosetta 2 (Apple Silicon):

- Most tools support Apple Silicon natively
- If issues, install Rosetta: `softwareupdate --install-rosetta`

### Windows

#### Use PowerShell or Command Prompt:

- Git Bash also works well
- Consider WSL2 for better Linux compatibility

#### Path Separators:

- Windows uses `\` instead of `/`
- Go tools handle this automatically

#### CGO Requirements:

- SQLite driver requires GCC
- Install TDM-GCC or use WSL2

### Linux

#### Package Managers:

- Ubuntu/Debian: `apt`
- Fedora: `dnf`
- Arch: `pacman`

#### Permissions:

- May need `sudo` for system-wide installs
- User installs go to `~/bin` or `~/.local/bin`

### ChromeOS / Chromebook

#### Enable Linux (Beta):

1. Settings → Advanced → Developers
2. Turn on "Linux development environment"
3. Wait for installation
4. Use Linux terminal

#### Then follow Linux instructions

---

## VS Code Configuration

### Recommended Settings

Create `.vscode/settings.json` in your project:

```json
{
  "go.useLanguageServer": true,
  "go.lintTool": "golangci-lint",
  "go.formatTool": "goimports",
  "editor.formatOnSave": true,
  "go.toolsManagement.autoUpdate": true,
  "tailwindCSS.includeLanguages": {
    "templ": "html"
  },
  "[go]": {
    "editor.defaultFormatter": "golang.go"
  }
}
```text

### Keyboard Shortcuts (Useful)

- `Ctrl+P` / `Cmd+P`: Quick file open
- `Ctrl+Shift+P` / `Cmd+Shift+P`: Command palette
- `Ctrl+backtick`: Toggle terminal
- `Ctrl+B`: Toggle sidebar
- `F2`: Rename symbol
- `Ctrl+.`: Quick fix

---

## Environment Variables

### Create .env File (Project-Level)

```bash
# In your project directory
touch .env
```text

#### Example .env:

```bash
DATABASE_PATH=./db/database.db
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
LITESTREAM_ACCESS_KEY_ID=xxxxx
LITESTREAM_SECRET_ACCESS_KEY=xxxxx
PORT=8080
```text

**⚠️ Important:** Add `.env` to `.gitignore`!

### Loading .env in Go

Install godotenv:

```bash
go get github.com/joho/godotenv
```text

In `main.go`:

```go
import "github.com/joho/godotenv"

func main() {
    // Load .env file
    godotenv.Load()

    // Use environment variables
    dbPath := os.Getenv("DATABASE_PATH")
}
```text

---

## Testing Your Setup

### Create Test Project

```bash
# Create project
mkdir test-project
cd test-project
go mod init testproject

# Create main.go
cat > main.go << 'EOF'
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
EOF

# Run
go run main.go
```text

Should print: `Hello, Go!`

### Create Test templ File

```bash
# Create templates directory
mkdir templates

# Create test.templ
cat > templates/test.templ << 'EOF'
package templates

templ Hello(name string) {
    <h1>Hello, { name }!</h1>
}
EOF

# Generate
templ generate

# Check generated file
ls templates/
# Should see: test.templ and test_templ.go
```text

---

## Next Steps

✅ All tools installed!

Now you can:

1. Continue with [README.md](./README.md) Phase 2 (Go basics)
2. Or jump to [QUICKSTART.md](./QUICKSTART.md) to build a project
3. Or review [TECH_STACK_DECISIONS.md](./TECH_STACK_DECISIONS.md) to understand why each tool

---

## Updating Tools

Keep your tools up to date:

```bash
# Update Go tools
go install github.com/a-h/templ/cmd/templ@latest
go install github.com/pressly/goose/v3/cmd/goose@latest
go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest

# Update Homebrew packages (macOS)
brew upgrade

# Update Tailwind CLI
# Download latest from GitHub releases

# Update litestream
brew upgrade litestream  # macOS
# Or download latest from GitHub
```text

---

## Getting Help

If you run into issues:

1. **Check error messages carefully** - they usually tell you what's wrong
2. **Search official documentation** for the tool
3. **Ask in club meetings** - others may have faced same issue
4. **Search Stack Overflow** - common issues already solved
5. **Check GitHub Issues** for the tool - might be known bug

---

## Summary

You now have a complete development environment:

- ✅ Go 1.25 for backend
- ✅ templ for templates
- ✅ Tailwind for styling
- ✅ SQLite + goose + sqlc for database
- ✅ litestream for backups
- ✅ Fly.io/Railway for deployment
- ✅ VS Code with extensions
- ✅ Git for version control

**Time to build!** 🚀
