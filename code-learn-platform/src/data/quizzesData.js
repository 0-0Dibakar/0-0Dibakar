export const quizzesData = [
  {
    id: 1,
    title: 'JavaScript Basics',
    difficulty: 'Beginner',
    questions: [
      {
        question: 'What is the correct way to declare a variable in JavaScript?',
        options: ['variable x = 5', 'let x = 5', 'var x := 5', 'x = 5'],
        correct: 1,
        explanation: 'In modern JavaScript, we use "let" or "const" to declare variables.',
      },
      {
        question: 'Which data type is NOT primitive in JavaScript?',
        options: ['String', 'Number', 'Array', 'Boolean'],
        correct: 2,
        explanation: 'Array is an object type, not a primitive. Primitives include string, number, boolean, null, undefined, and symbol.',
      },
      {
        question: 'What does console.log() do?',
        options: [
          'Creates a new variable',
          'Prints output to the console',
          'Deletes a variable',
          'Creates a function',
        ],
        correct: 1,
        explanation: 'console.log() is used to print output to the browser console for debugging.',
      },
      {
        question: 'How do you write a single-line comment in JavaScript?',
        options: ['<!-- comment -->', '/* comment */', '// comment', '# comment'],
        correct: 2,
        explanation: 'Single-line comments in JavaScript start with //',
      },
      {
        question: 'What is the result of: typeof "Hello"',
        options: ['text', 'string', 'String', 'char'],
        correct: 1,
        explanation: 'The typeof operator returns "string" (lowercase) for string values.',
      },
    ],
  },
  {
    id: 2,
    title: 'Arrays & Loops',
    difficulty: 'Beginner',
    questions: [
      {
        question: 'How do you access the first element of an array?',
        options: ['array[1]', 'array.first()', 'array[0]', 'array.get(0)'],
        correct: 2,
        explanation: 'Arrays are zero-indexed, so the first element is at index 0.',
      },
      {
        question: 'Which method adds an element to the end of an array?',
        options: ['push()', 'add()', 'append()', 'insert()'],
        correct: 0,
        explanation: 'The push() method adds one or more elements to the end of an array.',
      },
      {
        question: 'What does array.length return?',
        options: [
          'The last element',
          'The first element',
          'The number of elements',
          'The array type',
        ],
        correct: 2,
        explanation: 'The length property returns the number of elements in an array.',
      },
      {
        question: 'Which loop is best for iterating over array elements?',
        options: ['if loop', 'for...of loop', 'switch loop', 'case loop'],
        correct: 1,
        explanation: 'The for...of loop is specifically designed for iterating over iterable objects like arrays.',
      },
      {
        question: 'What does pop() do to an array?',
        options: [
          'Adds to the start',
          'Removes from the end',
          'Removes from the start',
          'Adds to the end',
        ],
        correct: 1,
        explanation: 'The pop() method removes and returns the last element from an array.',
      },
    ],
  },
  {
    id: 3,
    title: 'Functions',
    difficulty: 'Intermediate',
    questions: [
      {
        question: 'What is the correct syntax for a function declaration?',
        options: [
          'function = myFunc() {}',
          'function myFunc() {}',
          'func myFunc() {}',
          'def myFunc() {}',
        ],
        correct: 1,
        explanation: 'Functions are declared using the "function" keyword followed by the function name.',
      },
      {
        question: 'What does a function return if no return statement is specified?',
        options: ['null', '0', 'undefined', 'false'],
        correct: 2,
        explanation: 'Functions without a return statement implicitly return undefined.',
      },
      {
        question: 'How do you write an arrow function?',
        options: [
          'const func = () => {}',
          'const func = -> {}',
          'const func = function() {}',
          'arrow func() {}',
        ],
        correct: 0,
        explanation: 'Arrow functions use the => syntax: const func = () => {}',
      },
      {
        question: 'What are function parameters?',
        options: [
          'Return values',
          'Input values',
          'Variable types',
          'Function names',
        ],
        correct: 1,
        explanation: 'Parameters are input values that a function accepts when called.',
      },
      {
        question: 'Can a function call itself?',
        options: [
          'No, never',
          'Yes, it\'s called recursion',
          'Only in loops',
          'Only with arrow functions',
        ],
        correct: 1,
        explanation: 'A function calling itself is called recursion, a powerful programming technique.',
      },
    ],
  },
];
