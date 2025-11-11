import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(100);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArray);
    setSorted([]);
    setComparing([]);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
      setSorted(prev => [...prev, n - i - 1]);
    }
    setSorted(prev => [...prev, 0]);
    setComparing([]);
  };

  const selectionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        setComparing([minIdx, j]);
        await sleep(speed);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        await sleep(speed);
      }
      setSorted(prev => [...prev, i]);
    }
    setSorted(prev => [...prev, n - 1]);
    setComparing([]);
  };

  const insertionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        setComparing([j, j + 1]);
        await sleep(speed);

        arr[j + 1] = arr[j];
        setArray([...arr]);
        j--;
        await sleep(speed);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      setSorted(prev => [...prev, i]);
    }
    setComparing([]);
  };

  const startSort = async () => {
    setSorting(true);
    setSorted([]);
    setComparing([]);

    switch (algorithm) {
      case 'bubble':
        await bubbleSort();
        break;
      case 'selection':
        await selectionSort();
        break;
      case 'insertion':
        await insertionSort();
        break;
      default:
        break;
    }

    setSorting(false);
  };

  const getBarColor = (index) => {
    if (sorted.includes(index)) return '#10b981';
    if (comparing.includes(index)) return '#f59e0b';
    return '#3b82f6';
  };

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        Sorting Algorithm Visualizer
      </h2>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Algorithm</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={sorting}
            className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Speed: {speed}ms</label>
          <input
            type="range"
            min="50"
            max="500"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            disabled={sorting}
            className="w-full"
          />
        </div>
        <div className="flex items-end space-x-2">
          <button
            onClick={startSort}
            disabled={sorting}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sorting ? '⏳ Sorting...' : '▶️ Sort'}
          </button>
          <button
            onClick={generateArray}
            disabled={sorting}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔄 New Array
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="mb-6 p-6 bg-gray-900/50 rounded-xl">
        <div className="flex items-end justify-center space-x-1 h-[300px]">
          {array.map((value, index) => (
            <motion.div
              key={index}
              animate={{
                height: `${(value / Math.max(...array)) * 100}%`,
                backgroundColor: getBarColor(index),
              }}
              transition={{ duration: 0.3 }}
              className="flex-1 max-w-[60px] rounded-t-lg flex flex-col items-center justify-end pb-2"
              style={{ minWidth: '30px' }}
            >
              <span className="text-xs font-bold text-white">{value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-400">Unsorted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-400">Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-400">Sorted</span>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="p-4 bg-gray-900/50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Algorithm Info:</h3>
        <div className="text-sm text-gray-300">
          {algorithm === 'bubble' && (
            <p>
              <strong className="text-blue-400">Bubble Sort:</strong> Repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. Time Complexity: O(n²)
            </p>
          )}
          {algorithm === 'selection' && (
            <p>
              <strong className="text-blue-400">Selection Sort:</strong> Divides the array into sorted and unsorted regions, repeatedly selects the smallest element from unsorted region. Time Complexity: O(n²)
            </p>
          )}
          {algorithm === 'insertion' && (
            <p>
              <strong className="text-blue-400">Insertion Sort:</strong> Builds the final sorted array one item at a time, inserting each element into its proper position. Time Complexity: O(n²)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
