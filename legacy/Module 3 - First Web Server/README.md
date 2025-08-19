# Module 3: First Web Server

**Duration**: End of Week 3 of Course  
**Prerequisites**: Module 1 (Go) + Module 2 (HTML)  
**Goals**: Build your first web server using Go and serve HTML pages

## 🎯 Learning Objectives

By the end of this module, you will be able to:

1. Create a basic HTTP server using Go's `net/http` package
2. Serve static HTML files and assets (CSS, images)
3. Handle different HTTP routes and methods
4. Create dynamic web pages using Go templates
5. Process form data from HTML forms
6. Understand URL routing and request handling
7. Debug and test web applications

## 🌐 Web Server Basics

### What is a Web Server?

A web server is a program that:

1. **Listens** for HTTP requests from browsers
2. **Processes** the requests (your Go code)
3. **Responds** with HTML, CSS, images, or data
4. **Manages** multiple users simultaneously

```text
Browser Request  →  Go Web Server  →  Response
GET /about       →  Route Handler  →  HTML Page
POST /contact    →  Form Handler   →  Success Page
```

### Your Development Setup

```text
Your Computer:
├── Go Web Server (Port 8080)
├── HTML Templates
├── Static Files (CSS, images)
└── Browser (http://localhost:8080)
```

## 🚀 Your First Web Server

### 1. Hello World Web Server

Create `main.go`:

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "<h1>Welcome to Go Code School!</h1>")
    fmt.Fprintf(w, "<p>This is your first web server built with Go.</p>")
}

func aboutPage(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "<h1>About Us</h1>")
    fmt.Fprintf(w, "<p>We teach modern web development with Go!</p>")
}

func main() {
    // Register route handlers
    http.HandleFunc("/", homePage)
    http.HandleFunc("/about", aboutPage)
    
    // Start server
    fmt.Println("Server starting on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Run your server:

```bash
go run main.go
```

Visit `http://localhost:8080` in your browser!

**Key Concepts:**

- `http.HandleFunc()` - Register a function to handle specific routes
- `http.ResponseWriter` - Used to send response back to browser
- `*http.Request` - Contains information about the incoming request
- `http.ListenAndServe()` - Starts the web server

### 2. Serving Static Files

Create this project structure:

```text
web-project/
├── main.go
├── static/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   │   └── logo.png
│   └── js/
│       └── app.js
└── templates/
    ├── index.html
    └── about.html
```

**styles.css:**

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    text-align: center;
}

nav ul {
    list-style: none;
    padding: 0;
    text-align: center;
}

nav li {
    display: inline;
    margin: 0 15px;
}

nav a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
}

nav a:hover {
    text-decoration: underline;
}
```

**Updated main.go:**

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
    html := `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Go Code School</title>
        <link rel="stylesheet" href="/static/css/styles.css">
    </head>
    <body>
        <div class="container">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            <h1>Welcome to Go Code School!</h1>
            <p>Learn modern web development with Go, HTML, and more!</p>
            <img src="/static/images/logo.png" alt="Go Code School Logo" style="max-width: 200px;">
        </div>
    </body>
    </html>`
    
    w.Header().Set("Content-Type", "text/html")
    fmt.Fprint(w, html)
}

func aboutPage(w http.ResponseWriter, r *http.Request) {
    html := `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>About - Go Code School</title>
        <link rel="stylesheet" href="/static/css/styles.css">
    </head>
    <body>
        <div class="container">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            <h1>About Go Code School</h1>
            <p>We teach students modern web development using:</p>
            <ul>
                <li>Go programming language</li>
                <li>HTML and CSS</li>
                <li>Modern development tools</li>
                <li>Best practices and accessibility</li>
            </ul>
        </div>
    </body>
    </html>`
    
    w.Header().Set("Content-Type", "text/html")
    fmt.Fprint(w, html)
}

func main() {
    // Serve static files
    http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
    
    // Register route handlers
    http.HandleFunc("/", homePage)
    http.HandleFunc("/about", aboutPage)
    
    // Start server
    fmt.Println("Server starting on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

**Key Concepts:**

- `http.FileServer()` - Serves static files from a directory
- `http.StripPrefix()` - Removes URL prefix before serving files
- `w.Header().Set()` - Sets HTTP response headers

### 3. Using HTML Templates

Embedding HTML in Go strings gets messy quickly. Let's use templates!

**templates/base.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{.Title}} - Go Code School</title>
    <link rel="stylesheet" href="/static/css/styles.css">
</head>
<body>
    <div class="container">
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/students">Students</a></li>
            </ul>
        </nav>
        
        <main>
            {{.Content}}
        </main>
        
        <footer>
            <p>&copy; 2025 Go Code School. Built with Go!</p>
        </footer>
    </div>
</body>
</html>
```

**templates/home.html:**

```html
<h1>{{.Title}}</h1>
<p>{{.Message}}</p>

<h2>Course Statistics</h2>
<ul>
    <li>Students Enrolled: {{.Stats.Students}}</li>
    <li>Modules Completed: {{.Stats.Modules}}</li>
    <li>Projects Built: {{.Stats.Projects}}</li>
</ul>

<h2>Recent Students</h2>
{{range .RecentStudents}}
<div class="student-card">
    <h3>{{.Name}}</h3>
    <p>Grade: {{.Grade}} | Age: {{.Age}}</p>
    <p>Interests: {{range .Interests}}{{.}} {{end}}</p>
</div>
{{end}}
```

**Updated main.go with templates:**

```go
package main

import (
    "html/template"
    "log"
    "net/http"
)

type Student struct {
    Name      string
    Age       int
    Grade     int
    Interests []string
}

type Stats struct {
    Students int
    Modules  int
    Projects int
}

type PageData struct {
    Title          string
    Message        string
    Stats          Stats
    RecentStudents []Student
}

var templates *template.Template

func init() {
    // Parse all templates at startup
    templates = template.Must(template.ParseGlob("templates/*.html"))
}

func homePage(w http.ResponseWriter, r *http.Request) {
    data := PageData{
        Title:   "Welcome",
        Message: "Learn modern web development with Go, HTML, and more!",
        Stats: Stats{
            Students: 150,
            Modules:  12,
            Projects: 45,
        },
        RecentStudents: []Student{
            {Name: "Alice Johnson", Age: 16, Grade: 11, Interests: []string{"Coding", "Gaming"}},
            {Name: "Bob Smith", Age: 17, Grade: 12, Interests: []string{"Music", "Programming"}},
            {Name: "Charlie Brown", Age: 15, Grade: 10, Interests: []string{"Art", "Technology"}},
        },
    }
    
    err := templates.ExecuteTemplate(w, "home.html", data)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}

func aboutPage(w http.ResponseWriter, r *http.Request) {
    data := PageData{
        Title:   "About Us",
        Message: "We teach students modern web development using the latest tools and best practices.",
    }
    
    err := templates.ExecuteTemplate(w, "about.html", data)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}

func main() {
    // Serve static files
    http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
    
    // Register route handlers
    http.HandleFunc("/", homePage)
    http.HandleFunc("/about", aboutPage)
    
    // Start server
    log.Println("Server starting on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

**Key Concepts:**

- `html/template` - Go's safe HTML templating package
- `{{.FieldName}}` - Insert data into templates
- `{{range .Slice}}...{{end}}` - Loop through slices
- `template.Must()` - Panic if templates fail to parse
- `template.ExecuteTemplate()` - Render template with data

### 4. Handling Forms

Let's add a contact form that processes data:

**templates/contact.html:**

```html
<h1>Contact Us</h1>

{{if .Success}}
<div class="success-message">
    <h2>Thank you, {{.FormData.Name}}!</h2>
    <p>We received your message and will respond to {{.FormData.Email}} soon.</p>
</div>
{{else}}

<form action="/contact" method="POST">
    <div class="form-group">
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required value="{{.FormData.Name}}">
    </div>
    
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required value="{{.FormData.Email}}">
    </div>
    
    <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" id="age" name="age" min="13" max="18" value="{{.FormData.Age}}">
    </div>
    
    <div class="form-group">
        <label for="grade">Grade Level:</label>
        <select id="grade" name="grade">
            <option value="">Select grade...</option>
            <option value="9" {{if eq .FormData.Grade "9"}}selected{{end}}>9th Grade</option>
            <option value="10" {{if eq .FormData.Grade "10"}}selected{{end}}>10th Grade</option>
            <option value="11" {{if eq .FormData.Grade "11"}}selected{{end}}>11th Grade</option>
            <option value="12" {{if eq .FormData.Grade "12"}}selected{{end}}>12th Grade</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="interests">Programming Interests:</label>
        <div class="checkbox-group">
            <input type="checkbox" id="web" name="interests" value="web" 
                   {{if .HasInterest "web"}}checked{{end}}>
            <label for="web">Web Development</label>
            
            <input type="checkbox" id="mobile" name="interests" value="mobile"
                   {{if .HasInterest "mobile"}}checked{{end}}>
            <label for="mobile">Mobile Apps</label>
            
            <input type="checkbox" id="games" name="interests" value="games"
                   {{if .HasInterest "games"}}checked{{end}}>
            <label for="games">Game Development</label>
        </div>
    </div>
    
    <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" required>{{.FormData.Message}}</textarea>
    </div>
    
    <button type="submit">Send Message</button>
    <button type="reset">Clear Form</button>
</form>

{{if .Errors}}
<div class="error-messages">
    <h3>Please fix the following errors:</h3>
    <ul>
    {{range .Errors}}
        <li>{{.}}</li>
    {{end}}
    </ul>
</div>
{{end}}

{{end}}
```

**Updated main.go with form handling:**

```go
package main

import (
    "html/template"
    "log"
    "net/http"
    "strconv"
    "strings"
)

type ContactForm struct {
    Name      string
    Email     string
    Age       string
    Grade     string
    Interests []string
    Message   string
}

type ContactPageData struct {
    Title     string
    Success   bool
    FormData  ContactForm
    Errors    []string
}

// Template helper function
func (data ContactPageData) HasInterest(interest string) bool {
    for _, i := range data.FormData.Interests {
        if i == interest {
            return true
        }
    }
    return false
}

var templates *template.Template

func init() {
    // Create custom template functions
    funcMap := template.FuncMap{
        "eq": func(a, b string) bool { return a == b },
    }
    
    // Parse templates with custom functions
    templates = template.Must(template.New("").Funcs(funcMap).ParseGlob("templates/*.html"))
}

func contactPage(w http.ResponseWriter, r *http.Request) {
    data := ContactPageData{
        Title: "Contact Us",
    }
    
    if r.Method == "POST" {
        // Process form submission
        err := r.ParseForm()
        if err != nil {
            http.Error(w, "Error parsing form", http.StatusBadRequest)
            return
        }
        
        // Get form values
        form := ContactForm{
            Name:      strings.TrimSpace(r.FormValue("name")),
            Email:     strings.TrimSpace(r.FormValue("email")),
            Age:       r.FormValue("age"),
            Grade:     r.FormValue("grade"),
            Interests: r.Form["interests"], // Get multiple values
            Message:   strings.TrimSpace(r.FormValue("message")),
        }
        
        // Validate form
        errors := validateContactForm(form)
        
        if len(errors) == 0 {
            // Form is valid - process it
            log.Printf("New contact form submission from %s (%s)", form.Name, form.Email)
            
            // In a real app, you would:
            // - Save to database
            // - Send email
            // - Log the submission
            
            data.Success = true
            data.FormData = form
        } else {
            // Form has errors - show them
            data.Errors = errors
            data.FormData = form
        }
    }
    
    err := templates.ExecuteTemplate(w, "contact.html", data)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}

func validateContactForm(form ContactForm) []string {
    var errors []string
    
    if len(form.Name) < 2 {
        errors = append(errors, "Name must be at least 2 characters long")
    }
    
    if !strings.Contains(form.Email, "@") {
        errors = append(errors, "Please enter a valid email address")
    }
    
    if form.Age != "" {
        age, err := strconv.Atoi(form.Age)
        if err != nil || age < 13 || age > 18 {
            errors = append(errors, "Age must be between 13 and 18")
        }
    }
    
    if len(form.Message) < 10 {
        errors = append(errors, "Message must be at least 10 characters long")
    }
    
    return errors
}

// ... (previous functions remain the same)

func main() {
    // Serve static files
    http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
    
    // Register route handlers
    http.HandleFunc("/", homePage)
    http.HandleFunc("/about", aboutPage)
    http.HandleFunc("/contact", contactPage)
    
    // Start server
    log.Println("Server starting on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

### 5. HTTP Methods and RESTful Patterns

Understanding different HTTP methods:

```go
func studentsHandler(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case "GET":
        // Show list of students or student form
        showStudents(w, r)
    case "POST":
        // Create a new student
        createStudent(w, r)
    case "PUT":
        // Update existing student
        updateStudent(w, r)
    case "DELETE":
        // Delete a student
        deleteStudent(w, r)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func showStudents(w http.ResponseWriter, r *http.Request) {
    // Display students list
    students := []Student{
        {Name: "Alice", Age: 16, Grade: 11},
        {Name: "Bob", Age: 17, Grade: 12},
    }
    
    data := StudentsPageData{
        Title:    "Students",
        Students: students,
    }
    
    templates.ExecuteTemplate(w, "students.html", data)
}

func createStudent(w http.ResponseWriter, r *http.Request) {
    // Process form to create new student
    name := r.FormValue("name")
    // ... validate and save student
    
    // Redirect to students list
    http.Redirect(w, r, "/students", http.StatusSeeOther)
}
```

### 6. URL Parameters and Routing

Handle dynamic URLs:

```go
func studentDetailHandler(w http.ResponseWriter, r *http.Request) {
    // Extract student ID from URL path
    path := r.URL.Path
    // /student/123 -> get "123"
    parts := strings.Split(path, "/")
    if len(parts) < 3 {
        http.NotFound(w, r)
        return
    }
    
    studentID := parts[2]
    
    // In a real app, you'd fetch from database
    student := findStudentByID(studentID)
    if student == nil {
        http.NotFound(w, r)
        return
    }
    
    data := StudentDetailData{
        Title:   student.Name,
        Student: *student,
    }
    
    templates.ExecuteTemplate(w, "student-detail.html", data)
}

// Register with pattern
func main() {
    http.HandleFunc("/student/", studentDetailHandler)
    // ...
}
```

## 🧪 Testing Your Web Server

### 1. Manual Testing

Test different scenarios:

```bash
# Test different routes
curl http://localhost:8080/
curl http://localhost:8080/about
curl http://localhost:8080/contact

# Test form submission
curl -X POST http://localhost:8080/contact \
     -d "name=Test User&email=test@email.com&message=Hello World"

# Test static files
curl http://localhost:8080/static/css/styles.css
```

### 2. Basic Error Handling

```go
func safeHandler(w http.ResponseWriter, r *http.Request) {
    defer func() {
        if err := recover(); err != nil {
            log.Printf("Panic in handler: %v", err)
            http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        }
    }()
    
    // Your handler code here
    // If panic occurs, it will be caught and handled gracefully
}
```

### 3. Logging Requests

```go
func loggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    }
}

// Use it:
http.HandleFunc("/", loggingMiddleware(homePage))
```

## 🏋️ Practice Exercises

### Exercise 1: Personal Website

Build a personal website with:

1. Home page with your information
2. Projects page showing your coding projects
3. Contact form that validates input
4. About page with your story
5. Static CSS styling
6. Error handling for invalid routes

### Exercise 2: Simple Blog

Create a basic blog with:

1. List of blog posts on home page
2. Individual post pages
3. Simple admin form to add posts (store in memory)
4. Search functionality
5. Tag-based filtering

### Exercise 3: Student Directory API

Build a web application that:

1. Shows list of students
2. Allows adding new students via form
3. Individual student detail pages
4. Edit student information
5. Delete students
6. Search and filter functionality

## 🎯 Module 3 Project: Class Management System

Build a complete web application for managing a programming class:

**Features:**

1. **Dashboard** - Overview of class statistics
2. **Students List** - View all enrolled students
3. **Add Student** - Form to enroll new students
4. **Student Profile** - Individual student pages with projects
5. **Projects** - List and manage student projects
6. **Contact** - Contact form for prospective students

**Technical Requirements:**

- Multiple routes and HTTP methods
- Form processing with validation
- Template-based HTML generation
- Static file serving (CSS, images)
- Error handling and logging
- Responsive design
- Data persistence (in-memory for now)

**File Structure:**

```text
class-management/
├── main.go
├── handlers.go
├── models.go
├── static/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── images/
│       └── logo.png
├── templates/
│   ├── base.html
│   ├── dashboard.html
│   ├── students.html
│   ├── student-detail.html
│   ├── add-student.html
│   ├── projects.html
│   └── contact.html
└── README.md
```

## 📋 Checklist

Before moving to Module 4, ensure you can:

- [ ] Create HTTP servers with multiple routes
- [ ] Serve static files (CSS, images, JavaScript)
- [ ] Use HTML templates to generate dynamic pages
- [ ] Handle form submissions and validate data
- [ ] Process different HTTP methods (GET, POST)
- [ ] Implement basic error handling
- [ ] Structure a web application with multiple files
- [ ] Complete the Class Management System project

## 🔗 What's Next?

In **Module 4**, you'll learn:

- **templ** - Type-safe HTML templating system
- Component-based template development  
- Better template organization and reusability
- Hot reloading with templ
- Moving beyond basic `html/template`

**Ready for modern templating?** Module 4 will introduce you to templ, a powerful type-safe templating system that makes building web UIs much more enjoyable!

---

**Resources:**

- [Go net/http Documentation](https://golang.org/pkg/net/http/) - Official HTTP package docs
- [Go Templates](https://golang.org/pkg/html/template/) - Template documentation  
- [HTTP Status Codes](https://httpstatuses.com/) - Reference for HTTP status codes
- [REST API Tutorial](https://restfulapi.net/) - Understanding RESTful design
- [Go Web Examples](https://gowebexamples.com/) - Practical Go web development examples
