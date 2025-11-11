import { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';

const VariableVisualizer = () => {
  const [code, setCode] = useState(`// Declare and modify variables
let count = 0;
let name = "Alice";
let isActive = true;

// Modify variables
count = count + 5;
name = name + " Smith";
isActive = !isActive;

// Log results
console.log("Count:", count);
console.log("Name:", name);
console.log("Active:", isActive);`);
  const [variables, setVariables] = useState([]);
  const [output, setOutput] = useState('');

  const executeCode = () => {
    try {
      const trackedVars = [];
      const logs = [];

      const customConsole = {
        log: (...args) => {
          logs.push(args.join(' '));
        },
      };

      // Parse and track variable declarations and assignments
      const lines = code.split('\n');
      const varState = {};

      lines.forEach((line, lineNum) => {
        const trimmed = line.trim();
        
        // Track let/const/var declarations
        const declMatch = trimmed.match(/^(let|const|var)\s+(\w+)\s*=\s*(.+);?$/);
        if (declMatch) {
          const [, , varName, value] = declMatch;
          try {
            const evalValue = eval(value);
            varState[varName] = {
              name: varName,
              value: evalValue,
              type: typeof evalValue,
              line: lineNum + 1,
            };
          } catch (e) {
            // Skip if eval fails
          }
        }

        // Track assignments
        const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+);?$/);
        if (assignMatch && !trimmed.startsWith('let') && !trimmed.startsWith('const') && !trimmed.startsWith('var')) {
          const [, varName, value] = assignMatch;
          if (varState[varName]) {
            try {
              // Replace variable references with their values
              let evalExpr = value;
              Object.keys(varState).forEach(v => {
                const regex = new RegExp(`\\b${v}\\b`, 'g');
                evalExpr = evalExpr.replace(regex, JSON.stringify(varState[v].value));
              });
              const evalValue = eval(evalExpr);
              varState[varName] = {
                ...varState[varName],
                value: evalValue,
                type: typeof evalValue,
                line: lineNum + 1,
              };
            } catch (e) {
              // Skip if eval fails
            }
          }
        }
      });

      // Execute the actual code
      const func = new Function('console', code);
      func(customConsole);

      setVariables(Object.values(varState));
      setOutput(logs.join('\n') || '✅ Code executed successfully!');
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
      setVariables([]);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'string':
        return 'from-green-500 to-emerald-600';
      case 'number':
        return 'from-blue-500 to-cyan-600';
      case 'boolean':
        return 'from-purple-500 to-pink-600';
      case 'object':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const formatValue = (value, type) => {
    if (type === 'string') return `"${value}"`;
    if (type === 'object') return JSON.stringify(value);
    return String(value);
  };

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        Variable State Tracker
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">
              Code Editor
            </h3>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <Editor
                height="400px"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
          <button
            onClick={executeCode}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg shadow-green-500/30"
          >
            ▶️ Execute & Track Variables
          </button>

          {/* Output */}
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
            <h3 className="text-sm font-semibold text-green-400 mb-2">Console Output:</h3>
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {output || 'Click "Execute" to see output...'}
            </pre>
          </div>
        </div>

        {/* Variable Display */}
        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">
            Variable States
          </h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {variables.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-3">📦</div>
                <p>No variables tracked yet</p>
                <p className="text-sm mt-2">Execute code to see variable states</p>
              </div>
            ) : (
              variables.map((variable, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg bg-gradient-to-r ${getTypeColor(
                    variable.type
                  )} bg-opacity-20 border border-white/10`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-white">
                        {variable.name}
                      </span>
                      <span className="px-2 py-1 bg-black/30 rounded text-xs font-semibold">
                        {variable.type}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      Line {variable.line}
                    </span>
                  </div>
                  <div className="bg-black/30 p-3 rounded font-mono text-sm">
                    <span className="text-gray-400">Value: </span>
                    <span className="text-white font-semibold">
                      {formatValue(variable.value, variable.type)}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Legend */}
          {variables.length > 0 && (
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Type Legend:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded"></div>
                  <span>String</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded"></div>
                  <span>Number</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded"></div>
                  <span>Boolean</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-600 rounded"></div>
                  <span>Object</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VariableVisualizer;
