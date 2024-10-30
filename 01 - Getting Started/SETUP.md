# Go with VS Code and GitHub Quick Start Guide

Welcome to the world of Go programming! This guide will help you set up your development environment and get started with version control using GitHub.

## Prerequisites

1. Install Go: Download and install Go from the official website (<https://golang.org/dl/>).
2. Install VS Code: Download and install Visual Studio Code from the official website (<https://code.visualstudio.com/download>).

## Creating a GitHub Account and Repository

1. Go to <https://github.com/join> and fill in the required information (username, email address, and password) to create a new GitHub account.
2. Verify your email address by clicking on the link sent to your registered email.
3. Once you've verified your email, log in to your GitHub account.
4. Click on the "+" icon in the upper-right corner of the page and select "New repository".
5. Choose a name for your repository (e.g., "my-go-project"), add a description (optional), and select "Public" or "Private" depending on your preference.
6. Click on the "Create repository" button to create your new repository.

## Setting up VS Code for Go Development

1. Open VS Code and navigate to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X).
2. Search for "Go" in the extensions marketplace and install the official Go extension.
3. After installation, open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P) and type "Go: Install/Update Tools". Select all the tools and click "OK" to install them.

## Creating a Go Project

1. Create a new folder for your Go project.
2. Open the folder in VS Code (File > Open Folder...).
3. Create a new file named `main.go` in the project folder.
4. Write a simple "Hello, World!" program:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

5. Save the file (Ctrl+S or Cmd+S).

## Running the Go Program

1. Open the integrated terminal in VS Code (View > Terminal).
2. In the terminal, run the command `go run main.go`.
3. You should see "Hello, World!" printed in the terminal.

## Setting up Git and GitHub Integration

1. Open the Source Control view in VS Code (Ctrl+Shift+G or Cmd+Shift+G).
2. Click on the "Initialize Repository" button to initialize a new Git repository in your project folder.
3. Stage your changes by clicking on the "+" icon next to the `main.go` file.
4. Enter a commit message (e.g., "Initial commit") and press Ctrl+Enter or Cmd+Enter to commit the changes.
5. Click on the "Publish to GitHub" button in the Source Control view.
6. Choose the repository you created earlier (e.g., "my-go-project") and click "Publish to GitHub".

Congratulations! You've set up your Go development environment with VS Code and GitHub integration. You can now start writing more complex Go programs and easily track your changes using version control.

For more information on using Git with VS Code, refer to the tutorial you mentioned: <https://code.visualstudio.com/docs/sourcecontrol/intro-to-git>

Happy coding!
