export const lessonsData = [
  {
    id: 1,
    title: 'Variables & Data Types',
    difficulty: 'Beginner',
    duration: '15 min',
    icon: '📦',
    description: 'Learn about variables, strings, numbers, and basic data types',
    content: `# Variables & Data Types

Variables are containers for storing data values. In JavaScript, you can declare variables using \`let\`, \`const\`, or \`var\`.

## Variable Declaration

\`\`\`javascript
let name = "Alice";
const age = 25;
let isStudent = true;
\`\`\`

## Data Types

JavaScript has several primitive data types:
- **String**: Text data ("hello")
- **Number**: Numeric values (42, 3.14)
- **Boolean**: true or false
- **Undefined**: Variable declared but not assigned
- **Null**: Intentional absence of value

## Try It Yourself

\`\`\`javascript
let greeting = "Hello, World!";
let count = 10;
let isActive = true;

console.log(greeting);
console.log(count);
console.log(isActive);
\`\`\``,
    starterCode: `// Declare variables
let name = "Your Name";
let age = 20;
let isLearning = true;

// Print variables
console.log("Name:", name);
console.log("Age:", age);
console.log("Learning:", isLearning);`,
    exercises: [
      {
        question: 'Create a variable called "city" and assign it your city name',
        hint: 'Use let or const to declare the variable',
      },
      {
        question: 'Create a number variable for your favorite number',
        hint: 'Numbers don\'t need quotes',
      },
    ],
  },
  {
    id: 2,
    title: 'Arrays & Lists',
    difficulty: 'Beginner',
    duration: '20 min',
    icon: '📋',
    description: 'Master arrays and list operations',
    content: `# Arrays & Lists

Arrays are used to store multiple values in a single variable.

## Creating Arrays

\`\`\`javascript
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
\`\`\`

## Array Methods

- \`push()\`: Add to end
- \`pop()\`: Remove from end
- \`shift()\`: Remove from start
- \`unshift()\`: Add to start
- \`length\`: Get array size

## Example

\`\`\`javascript
let colors = ["red", "green"];
colors.push("blue");
console.log(colors); // ["red", "green", "blue"]
\`\`\``,
    starterCode: `// Create an array
let fruits = ["apple", "banana", "orange"];

// Add an item
fruits.push("grape");

// Access items
console.log("First fruit:", fruits[0]);
console.log("All fruits:", fruits);
console.log("Total fruits:", fruits.length);`,
    exercises: [
      {
        question: 'Create an array of your top 3 favorite movies',
        hint: 'Use square brackets []',
      },
      {
        question: 'Add a fourth movie using push()',
        hint: 'arrayName.push("new item")',
      },
    ],
  },
  {
    id: 3,
    title: 'Loops & Iteration',
    difficulty: 'Beginner',
    duration: '25 min',
    icon: '🔄',
    description: 'Learn how to repeat code with loops',
    content: `# Loops & Iteration

Loops allow you to execute code multiple times.

## For Loop

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
\`\`\`

## While Loop

\`\`\`javascript
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
\`\`\`

## For...of Loop

\`\`\`javascript
let fruits = ["apple", "banana", "orange"];
for (let fruit of fruits) {
  console.log(fruit);
}
\`\`\``,
    starterCode: `// For loop example
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}

// Loop through array
let colors = ["red", "green", "blue"];
for (let color of colors) {
  console.log("Color:", color);
}`,
    exercises: [
      {
        question: 'Write a loop that prints numbers from 1 to 10',
        hint: 'Use a for loop with i starting at 1',
      },
      {
        question: 'Loop through an array and print each item',
        hint: 'Use for...of loop',
      },
    ],
  },
  {
    id: 4,
    title: 'Functions',
    difficulty: 'Intermediate',
    duration: '30 min',
    icon: '⚙️',
    description: 'Create reusable code with functions',
    content: `# Functions

Functions are reusable blocks of code that perform specific tasks.

## Function Declaration

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alice"));
\`\`\`

## Arrow Functions

\`\`\`javascript
const add = (a, b) => a + b;
console.log(add(5, 3)); // 8
\`\`\`

## Function Parameters

\`\`\`javascript
function calculateArea(width, height) {
  return width * height;
}
\`\`\``,
    starterCode: `// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Arrow function
const multiply = (a, b) => a * b;

// Test functions
console.log(greet("World"));
console.log("5 × 3 =", multiply(5, 3));`,
    exercises: [
      {
        question: 'Create a function that calculates the square of a number',
        hint: 'function square(num) { return num * num; }',
      },
      {
        question: 'Create an arrow function that checks if a number is even',
        hint: 'Use the modulo operator (%) to check divisibility',
      },
    ],
  },
  {
    id: 5,
    title: 'Conditionals',
    difficulty: 'Beginner',
    duration: '20 min',
    icon: '🔀',
    description: 'Make decisions in your code with if/else statements',
    content: `# Conditionals

Conditionals allow your code to make decisions.

## If Statement

\`\`\`javascript
let age = 18;
if (age >= 18) {
  console.log("You are an adult");
}
\`\`\`

## If-Else

\`\`\`javascript
let score = 75;
if (score >= 60) {
  console.log("Pass");
} else {
  console.log("Fail");
}
\`\`\`

## Else If

\`\`\`javascript
let grade = 85;
if (grade >= 90) {
  console.log("A");
} else if (grade >= 80) {
  console.log("B");
} else {
  console.log("C");
}
\`\`\``,
    starterCode: `// Simple if statement
let temperature = 25;
if (temperature > 30) {
  console.log("It's hot!");
} else if (temperature > 20) {
  console.log("It's nice!");
} else {
  console.log("It's cold!");
}

// Ternary operator
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status);`,
    exercises: [
      {
        question: 'Write a condition to check if a number is positive, negative, or zero',
        hint: 'Use if, else if, and else',
      },
      {
        question: 'Create a function that returns the larger of two numbers',
        hint: 'Use an if statement to compare the numbers',
      },
    ],
  },
  {
    id: 6,
    title: 'Objects',
    difficulty: 'Intermediate',
    duration: '25 min',
    icon: '🎁',
    description: 'Work with objects and their properties',
    content: `# Objects

Objects store collections of key-value pairs.

## Creating Objects

\`\`\`javascript
let person = {
  name: "Alice",
  age: 25,
  city: "New York"
};
\`\`\`

## Accessing Properties

\`\`\`javascript
console.log(person.name);
console.log(person["age"]);
\`\`\`

## Methods

\`\`\`javascript
let car = {
  brand: "Tesla",
  model: "Model 3",
  start: function() {
    console.log("Car started!");
  }
};

car.start();
\`\`\``,
    starterCode: `// Create an object
let student = {
  name: "John",
  age: 20,
  grade: "A",
  subjects: ["Math", "Science", "English"],
  study: function() {
    console.log(this.name + " is studying");
  }
};

// Access properties
console.log("Name:", student.name);
console.log("Subjects:", student.subjects);

// Call method
student.study();`,
    exercises: [
      {
        question: 'Create an object representing a book with title, author, and pages',
        hint: 'Use curly braces {} and key-value pairs',
      },
      {
        question: 'Add a method to the book object that prints its details',
        hint: 'Add a function as a property',
      },
    ],
  },
];
