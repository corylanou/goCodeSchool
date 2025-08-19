# Module 1: Go Programming Fundamentals

**Duration**: Week 1-2 of Course  
**Prerequisites**: None - complete beginner friendly  
**Goals**: Master Go basics and set up development environment

## 🎯 Learning Objectives

By the end of this module, you will be able to:

1. Install and configure Go development environment
2. Write and run Go programs
3. Use Go's basic data types and control structures
4. Create and use functions with proper error handling
5. Work with Go's package system
6. Understand Go's approach to memory management
7. Set up GitHub Copilot for AI assistance

## 🛠️ Setup & Installation

### Step 1: Install Go

#### Windows

1. Download Go from [https://golang.org/dl/](https://golang.org/dl/)
2. Run the installer (.msi file)
3. Verify installation: Open Command Prompt and run `go version`

#### macOS

1. Download Go from [https://golang.org/dl/](https://golang.org/dl/)
2. Open the package file and follow installation steps
3. Verify installation: Open Terminal and run `go version`

#### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install golang-go

# Or download from golang.org for latest version
wget https://golang.org/dl/go1.21.x.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.x.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

### Step 2: Configure Your Development Environment

#### VS Code Setup (Recommended)

1. Install [VS Code](https://code.visualstudio.com/)
2. Install the [Go extension](https://marketplace.visualstudio.com/items?itemName=golang.Go)
3. Install [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) (free for students!)

#### Verify Your Setup

```bash
go version          # Should show Go version
go env GOPATH      # Should show your Go workspace path
go env GOROOT      # Should show Go installation path
```

### Step 3: Set Up GitHub Copilot (FREE for Students!)

1. **Get GitHub Student Pack**:
   - Visit [GitHub Education](https://education.github.com/pack)
   - Sign up with your school email
   - Verify your student status

2. **Activate Copilot**:
   - Once verified, Copilot Pro is automatically included
   - Install the Copilot extension in VS Code
   - Sign in with your GitHub account

## 📚 Go Fundamentals

### 1. Your First Go Program

Create a file called `hello.go`:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go Code School!")
}
```

Run it:

```bash
go run hello.go
```

**Key Concepts**:

- Every Go program starts with a `package` declaration
- `main` package is special - it's the entry point
- `import` brings in other packages
- `main()` function is where execution begins

### 2. Variables and Data Types

```go
package main

import "fmt"

func main() {
    // Variable declarations
    var name string = "Alice"
    var age int = 16
    var height float64 = 5.6
    var isStudent bool = true
    
    // Short variable declaration (Go figures out the type)
    grade := 11
    school := "Lincoln High"
    
    // Constants
    const pi = 3.14159
    
    fmt.Printf("Name: %s, Age: %d, Grade: %d\n", name, age, grade)
    fmt.Printf("Height: %.1f, Student: %t\n", height, isStudent)
    fmt.Printf("School: %s, Pi: %f\n", school, pi)
}
```

**Practice Exercise**: Create a program that stores information about yourself and prints it nicely formatted.

### 3. Control Structures

#### If Statements

```go
package main

import "fmt"

func main() {
    age := 16
    
    if age >= 18 {
        fmt.Println("You can vote!")
    } else if age >= 16 {
        fmt.Println("You can drive!")
    } else {
        fmt.Println("Enjoy being young!")
    }
    
    // If with initialization
    if grade := 85; grade >= 90 {
        fmt.Println("A grade!")
    } else if grade >= 80 {
        fmt.Println("B grade!")
    } else {
        fmt.Println("Keep studying!")
    }
}
```

#### Loops

```go
package main

import "fmt"

func main() {
    // Basic for loop
    for i := 1; i <= 5; i++ {
        fmt.Printf("Count: %d\n", i)
    }
    
    // While-style loop
    count := 0
    for count < 3 {
        fmt.Printf("While count: %d\n", count)
        count++
    }
    
    // Infinite loop (with break)
    for {
        fmt.Println("Press Ctrl+C to stop!")
        break // Remove this to see infinite loop
    }
    
    // Loop through a slice
    fruits := []string{"apple", "banana", "orange"}
    for index, fruit := range fruits {
        fmt.Printf("Index %d: %s\n", index, fruit)
    }
}
```

**Practice Exercise**: Write a program that prints the multiplication table for any number.

### 4. Functions

```go
package main

import "fmt"

// Function with parameters and return value
func add(a int, b int) int {
    return a + b
}

// Function with multiple return values
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}

// Function with named return values
func getStudentInfo() (name string, grade int) {
    name = "Bob"
    grade = 10
    return // naked return
}

func main() {
    // Using functions
    sum := add(5, 3)
    fmt.Printf("5 + 3 = %d\n", sum)
    
    // Handling multiple return values
    result, err := divide(10, 2)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
    } else {
        fmt.Printf("10 / 2 = %f\n", result)
    }
    
    // Using named returns
    studentName, studentGrade := getStudentInfo()
    fmt.Printf("Student: %s, Grade: %d\n", studentName, studentGrade)
}
```

**Practice Exercise**: Create a calculator with functions for add, subtract, multiply, and divide.

### 5. Data Structures

#### Arrays and Slices

```go
package main

import "fmt"

func main() {
    // Arrays (fixed size)
    var scores [5]int
    scores[0] = 85
    scores[1] = 92
    scores[2] = 78
    
    // Array literal
    grades := [3]string{"A", "B", "C"}
    
    // Slices (dynamic arrays)
    var students []string
    students = append(students, "Alice")
    students = append(students, "Bob")
    students = append(students, "Charlie")
    
    // Slice literal
    subjects := []string{"Math", "Science", "English"}
    
    fmt.Printf("Scores: %v\n", scores)
    fmt.Printf("Grades: %v\n", grades)
    fmt.Printf("Students: %v\n", students)
    fmt.Printf("Subjects: %v\n", subjects)
    
    // Slice operations
    fmt.Printf("First 2 subjects: %v\n", subjects[:2])
    fmt.Printf("Last 2 subjects: %v\n", subjects[1:])
}
```

#### Maps

```go
package main

import "fmt"

func main() {
    // Create a map
    studentGrades := make(map[string]int)
    studentGrades["Alice"] = 95
    studentGrades["Bob"] = 87
    studentGrades["Charlie"] = 92
    
    // Map literal
    subjects := map[string]int{
        "Math":    85,
        "Science": 90,
        "English": 88,
    }
    
    // Access values
    fmt.Printf("Alice's grade: %d\n", studentGrades["Alice"])
    
    // Check if key exists
    grade, exists := studentGrades["David"]
    if exists {
        fmt.Printf("David's grade: %d\n", grade)
    } else {
        fmt.Println("David not found")
    }
    
    // Loop through map
    for student, grade := range studentGrades {
        fmt.Printf("%s: %d\n", student, grade)
    }
    
    // Delete a key
    delete(studentGrades, "Charlie")
    fmt.Printf("After deletion: %v\n", studentGrades)
}
```

### 6. Structs

```go
package main

import "fmt"

// Define a struct
type Student struct {
    Name   string
    Age    int
    Grade  int
    GPA    float64
    Active bool
}

// Method on struct
func (s Student) IsHonorRoll() bool {
    return s.GPA >= 3.5
}

// Method that modifies struct (pointer receiver)
func (s *Student) UpdateGPA(newGPA float64) {
    s.GPA = newGPA
}

func main() {
    // Create struct instances
    student1 := Student{
        Name:   "Alice",
        Age:    16,
        Grade:  11,
        GPA:    3.8,
        Active: true,
    }
    
    // Short form
    student2 := Student{"Bob", 17, 12, 3.2, true}
    
    // Zero value
    var student3 Student
    student3.Name = "Charlie"
    student3.Age = 15
    
    fmt.Printf("Student 1: %+v\n", student1)
    fmt.Printf("Student 2: %+v\n", student2)
    fmt.Printf("Student 3: %+v\n", student3)
    
    // Using methods
    fmt.Printf("Alice on honor roll: %t\n", student1.IsHonorRoll())
    
    // Modify through pointer
    student1.UpdateGPA(3.9)
    fmt.Printf("Alice's new GPA: %f\n", student1.GPA)
}
```

**Practice Exercise**: Create a `Book` struct with title, author, pages, and rating.
Add methods to check if it's a long book (>300 pages) and if it's highly rated (>4.0).

### 7. Error Handling

```go
package main

import (
    "errors"
    "fmt"
)

// Function that can return an error
func validateAge(age int) error {
    if age < 0 {
        return errors.New("age cannot be negative")
    }
    if age > 150 {
        return errors.New("age seems unrealistic")
    }
    return nil
}

// Function with custom error types
func divideNumbers(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero: %f / %f", a, b)
    }
    return a / b, nil
}

func main() {
    // Error handling pattern
    ages := []int{16, -5, 25, 200}
    
    for _, age := range ages {
        if err := validateAge(age); err != nil {
            fmt.Printf("Invalid age %d: %v\n", age, err)
        } else {
            fmt.Printf("Valid age: %d\n", age)
        }
    }
    
    // Multiple return values with error
    result, err := divideNumbers(10, 0)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
    } else {
        fmt.Printf("Result: %f\n", result)
    }
}
```

### 8. Packages and Modules

#### Creating a Package

Create a file `mathutils/calculator.go`:

```go
package mathutils

// Exported function (starts with capital letter)
func Add(a, b int) int {
    return a + b
}

// Exported function
func Multiply(a, b int) int {
    return a * b
}

// unexported function (starts with lowercase)
func helper() {
    // Only available within this package
}
```

#### Using the Package

In your main program:

```go
package main

import (
    "fmt"
    "./mathutils" // Local package
)

func main() {
    sum := mathutils.Add(5, 3)
    product := mathutils.Multiply(4, 7)
    
    fmt.Printf("Sum: %d\n", sum)
    fmt.Printf("Product: %d\n", product)
}
```

## 🏋️ Practice Exercises

### Exercise 1: Student Grade Calculator

Create a program that:

1. Stores information for 3 students (name, 4 test scores)
2. Calculates average for each student
3. Determines letter grade (A: 90+, B: 80-89, C: 70-79, D: 60-69, F: <60)
4. Finds the class average

### Exercise 2: Simple To-Do List

Create a program that:

1. Uses a slice to store to-do items
2. Allows adding new items
3. Allows marking items as complete
4. Displays all items with their status

### Exercise 3: Contact Book

Create a program with:

1. A `Contact` struct (name, phone, email)
2. Functions to add, find, and list contacts
3. Use a map to store contacts by name
4. Handle errors for duplicate names

## 🧪 Testing Your Knowledge

1. **What's the difference between `var name string` and `name := "value"`?**
2. **When would you use a slice vs an array?**
3. **How do you handle errors in Go?**
4. **What's the difference between a method and a function?**
5. **How do you make a function or variable available to other packages?**

## 🎯 Module 1 Project: Personal Info Manager

Build a command-line program that manages personal information:

**Requirements:**

1. Store multiple people with name, age, email, and phone
2. Add new people with validation
3. Search for people by name
4. List all people
5. Calculate average age
6. Handle all errors gracefully

**Sample Output:**

```text
Personal Info Manager
====================
1. Add Person
2. Find Person
3. List All
4. Show Stats
5. Quit

Enter choice: 1
Name: Alice Johnson
Age: 16
Email: alice@email.com
Phone: 555-0123
Person added successfully!

Enter choice: 4
Total people: 3
Average age: 16.7
```

## 📋 Checklist

Before moving to Module 2, ensure you can:

- [ ] Install and configure Go development environment
- [ ] Write and run Go programs
- [ ] Use variables, constants, and basic data types
- [ ] Write functions with error handling
- [ ] Work with slices, maps, and structs
- [ ] Create and use packages
- [ ] Handle errors properly
- [ ] Complete the Personal Info Manager project

## 🔗 What's Next?

In **Module 2**, you'll learn:

- HTML fundamentals and semantic markup
- CSS basics for styling
- Web accessibility principles
- How the web works (HTTP, browsers, servers)

**Time to move on?** Make sure you're comfortable with all Go basics before proceeding. Web development builds on these fundamentals!

---

**Need Help?**

- Check the [Go Documentation](https://golang.org/doc/)
- Use GitHub Copilot for code suggestions
- Ask questions in your coding club or office hours
