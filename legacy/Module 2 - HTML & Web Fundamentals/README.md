# Module 2: HTML & Web Fundamentals

**Duration**: Week 3 of Course  
**Prerequisites**: Module 1 - Go Programming Fundamentals  
**Goals**: Master HTML, understand web architecture, and prepare for web development

## 🎯 Learning Objectives

By the end of this module, you will be able to:

1. Create semantic, accessible HTML documents
2. Understand how the web works (HTTP, browsers, servers)
3. Build forms and handle user input
4. Apply basic CSS for styling and layout
5. Test and validate web pages
6. Connect HTML knowledge to Go web development
7. Follow web accessibility best practices

## 🌐 How the Web Works

### Understanding the Basics

Before diving into HTML, let's understand how web applications work:

```text
[Browser] ←→ [Internet] ←→ [Web Server] ←→ [Database]
    ↓                         ↓              ↓
  Displays               Serves HTML      Stores Data
 HTML/CSS               (Your Go App)
```

**Key Concepts:**

1. **Browser** - Interprets and displays HTML, CSS, JavaScript
2. **HTTP** - Protocol for communication between browser and server
3. **Web Server** - Program that serves web pages (this will be your Go program!)
4. **HTML** - Structure and content of web pages
5. **CSS** - Styling and layout of web pages
6. **URL/URI** - Web addresses that locate resources

### HTTP Requests & Responses

When you visit a website:

1. Browser sends HTTP request to server
2. Server processes request (this is where your Go code runs)
3. Server sends back HTTP response with HTML
4. Browser displays the HTML to user

**Common HTTP Methods:**

- **GET** - Retrieve data (viewing a page)
- **POST** - Send data (submitting a form)
- **PUT** - Update data
- **DELETE** - Remove data

## 📝 HTML Fundamentals

### 1. Basic HTML Structure

Every HTML document follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is a paragraph of text.</p>
</body>
</html>
```

**Key Elements Explained:**

- `<!DOCTYPE html>` - Tells browser this is HTML5
- `<html lang="en">` - Root element with language
- `<head>` - Metadata not visible to users
- `<meta charset="UTF-8">` - Character encoding
- `<meta name="viewport">` - Makes page mobile-friendly
- `<title>` - Shows in browser tab
- `<body>` - Visible content

### 2. Semantic HTML Elements

Use elements that describe the content's meaning:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Portfolio</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home">
            <h1>Alice Johnson</h1>
            <p>High School Student & Aspiring Developer</p>
        </section>

        <section id="about">
            <h2>About Me</h2>
            <p>I'm a junior at Lincoln High School passionate about coding and technology.</p>
        </section>

        <section id="projects">
            <h2>My Projects</h2>
            <article>
                <h3>Personal Website</h3>
                <p>Built with Go and HTML</p>
            </article>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Alice Johnson. All rights reserved.</p>
    </footer>
</body>
</html>
```

**Semantic Elements:**

- `<header>` - Top section, usually navigation
- `<nav>` - Navigation links
- `<main>` - Primary content
- `<section>` - Distinct sections of content
- `<article>` - Self-contained content
- `<aside>` - Sidebar content
- `<footer>` - Bottom section, usually copyright

### 3. Text Content Elements

```html
<!-- Headings (h1 is most important, h6 least) -->
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Paragraphs and text formatting -->
<p>This is a regular paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
<p>You can also use <mark>highlighted text</mark> and <small>small text</small>.</p>

<!-- Lists -->
<ul>
    <li>Unordered list item 1</li>
    <li>Unordered list item 2</li>
</ul>

<ol>
    <li>Ordered list item 1</li>
    <li>Ordered list item 2</li>
</ol>

<!-- Quotes -->
<blockquote>
    <p>"The best way to learn to program is to write programs."</p>
    <cite>- Programming Wisdom</cite>
</blockquote>

<!-- Code -->
<p>In Go, you can create a variable like this: <code>name := "Alice"</code></p>

<pre><code>
func main() {
    fmt.Println("Hello, World!")
}
</code></pre>
```

### 4. Links and Images

```html
<!-- Links -->
<a href="https://golang.org">Go Programming Language</a>
<a href="mailto:alice@email.com">Send me an email</a>
<a href="#contact">Go to contact section</a>

<!-- Images -->
<img src="profile.jpg" alt="Alice Johnson smiling" width="300" height="200">

<!-- Figure with caption -->
<figure>
    <img src="project-screenshot.png" alt="Screenshot of my todo app">
    <figcaption>My first Go web application</figcaption>
</figure>
```

**Important:** Always include `alt` attributes for accessibility!

### 5. Tables (for tabular data only)

```html
<table>
    <caption>My Grade Report</caption>
    <thead>
        <tr>
            <th>Subject</th>
            <th>Grade</th>
            <th>Credits</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Computer Science</td>
            <td>A</td>
            <td>3</td>
        </tr>
        <tr>
            <td>Mathematics</td>
            <td>B+</td>
            <td>4</td>
        </tr>
    </tbody>
</table>
```

### 6. Forms (Crucial for Web Applications!)

Forms are how users send data to your Go server:

```html
<form action="/submit-contact" method="POST">
    <fieldset>
        <legend>Contact Information</legend>
        
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="age">Age:</label>
        <input type="number" id="age" name="age" min="13" max="100">
        
        <label for="grade">Grade Level:</label>
        <select id="grade" name="grade">
            <option value="">Select grade...</option>
            <option value="9">9th Grade</option>
            <option value="10">10th Grade</option>
            <option value="11">11th Grade</option>
            <option value="12">12th Grade</option>
        </select>
        
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" cols="50"></textarea>
        
        <fieldset>
            <legend>Interests</legend>
            <input type="checkbox" id="coding" name="interests" value="coding">
            <label for="coding">Coding</label>
            
            <input type="checkbox" id="gaming" name="interests" value="gaming">
            <label for="gaming">Gaming</label>
            
            <input type="checkbox" id="music" name="interests" value="music">
            <label for="music">Music</label>
        </fieldset>
        
        <fieldset>
            <legend>Preferred Contact Method</legend>
            <input type="radio" id="contact-email" name="contact-method" value="email">
            <label for="contact-email">Email</label>
            
            <input type="radio" id="contact-phone" name="contact-method" value="phone">
            <label for="contact-phone">Phone</label>
        </fieldset>
        
        <button type="submit">Send Message</button>
        <button type="reset">Clear Form</button>
    </fieldset>
</form>
```

**Form Input Types:**

- `text` - Regular text input
- `email` - Email validation
- `password` - Hidden text
- `number` - Numeric input
- `date` - Date picker
- `file` - File upload
- `checkbox` - Multiple selections
- `radio` - Single selection from group
- `hidden` - Hidden data

## 🎨 CSS Basics

CSS (Cascading Style Sheets) controls how HTML looks:

### 1. Adding CSS to HTML

```html
<!-- Internal CSS (in <head>) -->
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
    }
    
    h1 {
        color: #333;
        text-align: center;
    }
    
    .highlight {
        background-color: yellow;
    }
    
    #main-content {
        max-width: 800px;
        margin: 0 auto;
    }
</style>

<!-- External CSS (preferred) -->
<link rel="stylesheet" href="styles.css">
```

### 2. CSS Selectors

```css
/* Element selector */
h1 {
    color: blue;
}

/* Class selector */
.highlight {
    background-color: yellow;
}

/* ID selector */
#header {
    background-color: #f0f0f0;
}

/* Descendant selector */
nav ul {
    list-style: none;
}

/* Multiple selectors */
h1, h2, h3 {
    font-family: 'Georgia', serif;
}
```

### 3. Common CSS Properties

```css
/* Typography */
font-family: Arial, sans-serif;
font-size: 16px;
font-weight: bold;
text-align: center;
line-height: 1.5;

/* Colors */
color: #333;
background-color: #f0f0f0;

/* Box Model */
margin: 10px;
padding: 15px;
border: 1px solid #ccc;
width: 300px;
height: 200px;

/* Layout */
display: block;
position: relative;
float: left;

/* Flexbox (modern layout) */
display: flex;
justify-content: center;
align-items: center;
```

### 4. Responsive Design Basics

Make your site work on all devices:

```css
/* Mobile-first approach */
body {
    font-size: 16px;
    padding: 10px;
}

/* Tablet styles */
@media (min-width: 768px) {
    body {
        padding: 20px;
    }
    
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .container {
        max-width: 1000px;
    }
    
    .sidebar {
        width: 30%;
        float: left;
    }
    
    .content {
        width: 70%;
        float: right;
    }
}
```

## ♿ Web Accessibility

Make your websites usable by everyone:

### 1. Semantic HTML

Use the right element for the job:

```html
<!-- Good: Semantic button -->
<button onclick="submitForm()">Submit</button>

<!-- Bad: Non-semantic div -->
<div onclick="submitForm()">Submit</div>

<!-- Good: Proper heading hierarchy -->
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>

<!-- Bad: Skipping heading levels -->
<h1>Main Title</h1>
<h4>Section Title</h4>
```

### 2. Alternative Text for Images

```html
<!-- Informative image -->
<img src="chart.png" alt="Sales increased 25% from January to March">

<!-- Decorative image -->
<img src="decoration.png" alt="" role="presentation">

<!-- Image used as link -->
<a href="/home">
    <img src="logo.png" alt="Company Name Home Page">
</a>
```

### 3. Form Labels and Instructions

```html
<form>
    <label for="username">Username (required):</label>
    <input type="text" id="username" name="username" required 
           aria-describedby="username-help">
    <small id="username-help">Must be 3-20 characters long</small>
    
    <fieldset>
        <legend>Preferred contact method</legend>
        <input type="radio" id="email" name="contact" value="email">
        <label for="email">Email</label>
        
        <input type="radio" id="phone" name="contact" value="phone">
        <label for="phone">Phone</label>
    </fieldset>
</form>
```

### 4. Color and Contrast

```css
/* Good contrast */
.text {
    color: #333;
    background-color: #fff;
}

/* Don't rely only on color */
.error {
    color: red;
    border: 2px solid red; /* Visual indicator besides color */
}

.success {
    color: green;
    background-image: url('checkmark.png'); /* Additional indicator */
}
```

## 🧪 Testing and Validation

### 1. HTML Validation

Use the [W3C HTML Validator](https://validator.w3.org/) to check your HTML:

```html
<!-- This will cause validation errors -->
<p>Unclosed paragraph
<div>Block element inside paragraph</div>
<img src="image.jpg"> <!-- Missing alt attribute -->
```

### 2. Accessibility Testing

Tools to test accessibility:

- **Browser DevTools** - Lighthouse accessibility audit
- **WAVE Web Accessibility Evaluator** - Browser extension
- **axe DevTools** - Comprehensive accessibility testing
- **Keyboard Navigation** - Test using only Tab, Enter, Space keys

### 3. Cross-Browser Testing

Test your pages in different browsers:

- Chrome/Chromium
- Firefox
- Safari (if on Mac)
- Edge

### 4. Mobile Testing

Test responsive design:

- Browser DevTools device simulation
- Real devices when possible
- Different screen sizes and orientations

## 🔗 Connecting to Go

Understanding how HTML connects to your Go web server:

### 1. Static Files

Your Go server will serve static files:

```text
project/
├── main.go
├── static/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── images/
│       └── logo.png
└── templates/
    ├── index.html
    └── about.html
```

### 2. HTML Templates

Go can generate dynamic HTML:

```html
<!-- Template with Go template syntax -->
<!DOCTYPE html>
<html>
<head>
    <title>{{.Title}}</title>
</head>
<body>
    <h1>Welcome, {{.UserName}}!</h1>
    <p>You have {{.MessageCount}} new messages.</p>
    
    {{range .Items}}
    <div>{{.Name}}: {{.Description}}</div>
    {{end}}
</body>
</html>
```

### 3. Forms and Go Handlers

Your HTML forms will send data to Go handlers:

```html
<!-- HTML Form -->
<form action="/submit-student" method="POST">
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <button type="submit">Submit</button>
</form>
```

```go
// Go handler (preview of Module 3)
func submitStudent(w http.ResponseWriter, r *http.Request) {
    if r.Method == "POST" {
        name := r.FormValue("name")
        email := r.FormValue("email")
        // Process the form data
    }
}
```

## 🏋️ Practice Exercises

### Exercise 1: Personal Portfolio Page

Create a complete HTML page with:

1. Semantic HTML structure
2. Navigation menu
3. About section with your information
4. Skills section (HTML list)
5. Contact form
6. Proper headings hierarchy
7. CSS styling for attractive appearance

### Exercise 2: Accessible Form

Build a comprehensive form with:

1. Personal information fields
2. Multiple input types (text, email, number, date)
3. Checkboxes and radio buttons
4. Dropdown selection
5. Textarea for comments
6. Proper labels and fieldsets
7. Validation attributes
8. Clear instructions and error handling

### Exercise 3: Responsive Layout

Create a responsive webpage that:

1. Works on mobile, tablet, and desktop
2. Uses CSS Grid or Flexbox
3. Has a collapsible navigation menu
4. Adjusts typography for screen size
5. Optimizes images for different devices

## 🧪 Module 2 Project: Student Directory

Build a static student directory website:

**Requirements:**

1. **Home page** with navigation and welcome message
2. **Students list page** with student cards
3. **Individual student pages** with detailed information
4. **Contact form page** for adding new students
5. **About page** explaining the directory

**Technical Requirements:**

- Valid, semantic HTML5
- CSS for styling and responsive design
- Accessible to screen readers
- Works in all major browsers
- Mobile-friendly design
- Form validation

**File Structure:**

```text
student-directory/
├── index.html
├── students.html
├── student-detail.html
├── contact.html
├── about.html
├── css/
│   └── styles.css
└── images/
    ├── student1.jpg
    ├── student2.jpg
    └── placeholder.jpg
```

## 📋 Checklist

Before moving to Module 3, ensure you can:

- [ ] Create valid, semantic HTML documents
- [ ] Build accessible forms with proper labels
- [ ] Apply CSS for styling and responsive design
- [ ] Understand how browsers and servers communicate
- [ ] Test websites for accessibility and validation
- [ ] Connect HTML concepts to web application development
- [ ] Complete the Student Directory project

## 🔗 What's Next?

In **Module 3**, you'll learn:

- Building your first Go web server
- Serving HTML files with Go
- Handling HTTP requests and responses
- Creating dynamic web pages with templates
- Processing form data in Go

**Ready to build web servers?** Module 3 will connect your HTML knowledge with Go programming to create dynamic web applications!

---

**Resources:**

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML) - Comprehensive HTML reference
- [W3C HTML Validator](https://validator.w3.org/) - Check your HTML
- [WAVE Accessibility Evaluator](https://wave.webaim.org/) - Test accessibility
- [Can I Use](https://caniuse.com/) - Browser compatibility checker
- [CSS-Tricks](https://css-tricks.com/) - CSS tutorials and guides
