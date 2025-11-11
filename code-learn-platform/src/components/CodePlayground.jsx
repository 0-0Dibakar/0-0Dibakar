import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';

const CodePlayground = () => {
  const [code, setCode] = useState(`// Welcome to the Code Playground!
// Write your JavaScript code here and click Run

function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));

// Try creating your own functions
let numbers = [1, 2, 3, 4, 5];
let sum = 0;

for (let num of numbers) {
  sum += num;
}

console.log("Sum:", sum);
`);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');

  const runCode = () => {
    try {
      const logs = [];
      const customConsole = {
        log: (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        },
        error: (...args) => {
          logs.push('❌ ' + args.join(' '));
        },
        warn: (...args) => {
          logs.push('⚠️ ' + args.join(' '));
        },
      };

      const func = new Function('console', code);
      func(customConsole);

      setOutput(logs.join('\n') || '✅ Code executed successfully!');
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    }
  };

  const clearCode = () => {
    setCode('// Start coding here...\n');
    setOutput('');
  };

  const examples = [
    {
      name: 'Hello World',
      code: `console.log("Hello, World!");`,
    },
    {
      name: 'Variables',
      code: `let name = "Alice";
let age = 25;
let isStudent = true;

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);`,
    },
    {
      name: 'Array Operations',
      code: `let fruits = ["apple", "banana", "orange"];

// Add item
fruits.push("grape");

// Loop through array
for (let fruit of fruits) {
  console.log("Fruit:", fruit);
}

console.log("Total fruits:", fruits.length);`,
    },
    {
      name: 'Functions',
      code: `function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

console.log("5 + 3 =", add(5, 3));
console.log("5 × 3 =", multiply(5, 3));`,
    },
    {
      name: 'Loops',
      code: `// For loop
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}

// While loop
let count = 0;
while (count < 3) {
  console.log("While count:", count);
  count++;
}`,
    },
  ];

  const loadExample = (example) => {
    setCode(example.code);
    setOutput('');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Code Playground
          </h1>
          <p className="text-xl text-gray-400">
            Experiment with code in real-time
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Examples Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-4 sticky top-24">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">
                📚 Examples
              </h3>
              <div className="space-y-2">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => loadExample(example)}
                    className="w-full text-left px-4 py-3 glass glass-hover rounded-lg text-sm"
                  >
                    {example.name}
                  </button>
                ))}
              </div>
              <button
                onClick={clearCode}
                className="w-full mt-4 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-sm font-semibold transition-all"
              >
                🗑️ Clear Code
              </button>
            </div>
          </div>

          {/* Editor and Output */}
          <div className="lg:col-span-3 space-y-6">
            {/* Editor */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-blue-400">
                  Code Editor
                </h3>
                <div className="flex items-center space-x-3">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-sm"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python (Coming Soon)</option>
                  </select>
                  <button
                    onClick={runCode}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg shadow-green-500/30"
                  >
                    ▶️ Run Code
                  </button>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10">
                <Editor
                  height="500px"
                  defaultLanguage={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                  }}
                />
              </div>
            </div>

            {/* Output Console */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-green-400">
                  Console Output
                </h3>
                <button
                  onClick={() => setOutput('')}
                  className="px-4 py-2 glass glass-hover rounded-lg text-sm"
                >
                  Clear Output
                </button>
              </div>
              <pre className="bg-gray-900/50 p-6 rounded-xl text-green-400 font-mono text-sm min-h-[200px] max-h-[400px] overflow-auto">
                {output || '💡 Click "Run Code" to see output here...'}
              </pre>
            </div>

            {/* Tips */}
            <div className="glass rounded-2xl p-6 bg-blue-500/5 border-blue-500/20">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">
                💡 Pro Tips
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Use <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">console.log()</code> to print output</li>
                <li>• Try the example codes to learn different concepts</li>
                <li>• Experiment with modifying the examples</li>
                <li>• Use Ctrl+Space for code suggestions</li>
                <li>• Press Ctrl+/ to comment/uncomment lines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
