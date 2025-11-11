import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoopVisualizer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loopType, setLoopType] = useState('for');
  const [iterations, setIterations] = useState(5);
  const [speed, setSpeed] = useState(1000);
  const [logs, setLogs] = useState([]);

  const array = Array.from({ length: iterations }, (_, i) => i + 1);

  useEffect(() => {
    if (isRunning && currentIndex < iterations) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, `Iteration ${currentIndex + 1}: Processing index ${currentIndex}`]);
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentIndex >= iterations && isRunning) {
      setIsRunning(false);
      setLogs(prev => [...prev, '✅ Loop completed!']);
    }
  }, [isRunning, currentIndex, iterations, speed]);

  const startLoop = () => {
    setCurrentIndex(0);
    setLogs([`🚀 Starting ${loopType} loop...`]);
    setIsRunning(true);
  };

  const stopLoop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, '⏸️ Loop paused']);
  };

  const resetLoop = () => {
    setIsRunning(false);
    setCurrentIndex(0);
    setLogs([]);
  };

  const getLoopCode = () => {
    switch (loopType) {
      case 'for':
        return `for (let i = 0; i < ${iterations}; i++) {
  console.log("Iteration", i);
}`;
      case 'while':
        return `let i = 0;
while (i < ${iterations}) {
  console.log("Iteration", i);
  i++;
}`;
      case 'forEach':
        return `array.forEach((item, index) => {
  console.log("Item", item, "at index", index);
});`;
      default:
        return '';
    }
  };

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        Loop Execution Visualizer
      </h2>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Loop Type</label>
          <select
            value={loopType}
            onChange={(e) => setLoopType(e.target.value)}
            disabled={isRunning}
            className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none"
          >
            <option value="for">For Loop</option>
            <option value="while">While Loop</option>
            <option value="forEach">forEach Loop</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Iterations: {iterations}</label>
          <input
            type="range"
            min="3"
            max="10"
            value={iterations}
            onChange={(e) => setIterations(parseInt(e.target.value))}
            disabled={isRunning}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Speed: {speed}ms</label>
          <input
            type="range"
            min="300"
            max="2000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mb-6">
        <button
          onClick={startLoop}
          disabled={isRunning}
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ▶️ Start
        </button>
        <button
          onClick={stopLoop}
          disabled={!isRunning}
          className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⏸️ Pause
        </button>
        <button
          onClick={resetLoop}
          className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          🔄 Reset
        </button>
      </div>

      {/* Visual Display */}
      <div className="mb-6 p-6 bg-gray-900/50 rounded-xl">
        <div className="flex items-center justify-center space-x-2 flex-wrap gap-2">
          {array.map((item, index) => (
            <motion.div
              key={index}
              animate={{
                scale: currentIndex === index && isRunning ? 1.2 : 1,
                backgroundColor:
                  currentIndex === index && isRunning
                    ? '#10b981'
                    : currentIndex > index
                    ? '#3b82f6'
                    : '#4b5563',
              }}
              className="rounded-lg p-4 min-w-[60px] text-center"
            >
              <div className="text-xl font-bold">{item}</div>
              <div className="text-xs text-gray-300 mt-1">i = {index}</div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-4 text-gray-400">
          Current Index: {currentIndex} / {iterations}
        </div>
      </div>

      {/* Code Display */}
      <div className="mb-6 p-4 bg-gray-900/50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Loop Code:</h3>
        <pre className="text-green-400 text-sm">
          <code>{getLoopCode()}</code>
        </pre>
      </div>

      {/* Console Logs */}
      <div className="p-4 bg-gray-900/50 rounded-lg max-h-[200px] overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Console Output:</h3>
        <div className="space-y-1">
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-green-400 font-mono"
            >
              {log}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoopVisualizer;
