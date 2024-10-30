# Go for It: Middle & High School Computer Science with Go

This repository 

## Why?



## What technology stack will we use?

The GOTTH stack stands for Go, Gin, TypeScript, Tailwind CSS, and Heroku. Here’s an overview of each chapter that will help students learn the basics of full stack development using this stack:

## Project: Simple To-Do List Web Application

### Objectives

1. **Learn the basics of Go programming language.**
2. **Understand web development concepts.**
3. **Get hands-on experience with Go’s web framework.**
4. **Learn about data storage and retrieval.**

#### Steps

1. **Setup and Introduction:**
   - Install Go on their machines.
   - Set up a Go workspace.
   - Introduction to Go syntax and basic programming constructs (variables, loops, functions, etc.).

2. **Create a Simple Web Server:**
   - Use Go’s `net/http` package to create a simple web server.
   - Handle basic HTTP requests and responses.
   - Create a simple “Hello, World!” web page.

3. **Build the To-Do List Application:**
   - **Frontend:**
     - Use HTML/CSS to create a simple user interface for the to-do list.
     - Use JavaScript for basic interactivity (optional, can be kept simple).
   - **Backend:**
     - Create handlers for different routes (e.g., `/`, `/add`, `/delete`).
     - Use Go structs to represent to-do items.
     - Store to-do items in memory (using slices or maps).

4. **Add Data Persistence:**
   - Introduce basic file I/O to save and load to-do items from a file.
   - Alternatively, introduce a simple database like SQLite for data persistence.

5. **Enhance the Application:**
   - Add features like marking items as completed, editing items, etc.
   - Implement user authentication (optional, for more advanced students).

6. **Deploy the Application:**
   - Teach students how to deploy their application to a cloud service like Heroku or DigitalOcean.
   - Explain the basics of web hosting and domain names.

### Example Code Snippet

Here’s a simple example of how to set up a basic web server in Go:

```go
package main

import (
    "fmt"
    "net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome to the To-Do List App!")
}

func main() {
    http.HandleFunc("/", homePage)
    fmt.Println("Server starting on port 8080...")
    http.ListenAndServe(":8080", nil)
}
```

### Resources

- **Go Documentation:** [https://golang.org/doc/](https://golang.org/doc/)
- **Go by Example:** [https://gobyexample.com/](https://gobyexample.com/)
- **HTML/CSS Basics:** [https://www.w3schools.com/](https://www.w3schools.com/)
- **Go Web Development Tutorials:** [https://gowebexamples.com/](https://gowebexamples.com/)

### Tips

- **Keep it Interactive:** Encourage students to add their own features and ideas to the project.
- **Pair Programming:** Have students work in pairs or small groups to foster collaboration.
- **Regular Check-ins:** Schedule regular check-ins to discuss progress and address any challenges.

This project will not only teach students the basics of Go but also give them a sense of accomplishment as they build a functional web application.
