import { useState } from 'react';
import { motion } from 'framer-motion';

const ArrayVisualizer = () => {
  const [array, setArray] = useState([5, 2, 8, 1, 9]);
  const [inputValue, setInputValue] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);

  const addElement = () => {
    if (inputValue) {
      setArray([...array, parseInt(inputValue) || inputValue]);
      setInputValue('');
      setHighlightIndex(array.length);
      setTimeout(() => setHighlightIndex(null), 1000);
    }
  };

  const removeElement = (index) => {
    setHighlightIndex(index);
    setTimeout(() => {
      setArray(array.filter((_, i) => i !== index));
      setHighlightIndex(null);
    }, 500);
  };

  const pushElement = () => {
    if (inputValue) {
      const newArray = [...array, parseInt(inputValue) || inputValue];
      setArray(newArray);
      setHighlightIndex(newArray.length - 1);
      setInputValue('');
      setTimeout(() => setHighlightIndex(null), 1000);
    }
  };

  const popElement = () => {
    if (array.length > 0) {
      setHighlightIndex(array.length - 1);
      setTimeout(() => {
        setArray(array.slice(0, -1));
        setHighlightIndex(null);
      }, 500);
    }
  };

  const shiftElement = () => {
    if (array.length > 0) {
      setHighlightIndex(0);
      setTimeout(() => {
        setArray(array.slice(1));
        setHighlightIndex(null);
      }, 500);
    }
  };

  const unshiftElement = () => {
    if (inputValue) {
      setArray([parseInt(inputValue) || inputValue, ...array]);
      setHighlightIndex(0);
      setInputValue('');
      setTimeout(() => setHighlightIndex(null), 1000);
    }
  };

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        Array Operations Visualizer
      </h2>

      {/* Array Display */}
      <div className="mb-8 p-6 bg-gray-900/50 rounded-xl">
        <div className="flex items-center justify-center space-x-2 min-h-[100px] flex-wrap gap-2">
          {array.length === 0 ? (
            <div className="text-gray-500 text-lg">Array is empty</div>
          ) : (
            array.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className={`relative group ${
                  highlightIndex === index
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                    : 'bg-gradient-to-br from-blue-500 to-purple-600'
                } rounded-lg p-4 min-w-[80px] text-center transition-all duration-300`}
              >
                <div className="text-2xl font-bold">{item}</div>
                <div className="text-xs text-gray-300 mt-1">index: {index}</div>
                <button
                  onClick={() => removeElement(index)}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </motion.div>
            ))
          )}
        </div>
        <div className="text-center mt-4 text-gray-400">
          Length: {array.length}
        </div>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-400">Add Elements</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="flex-1 px-4 py-2 bg-gray-800 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={pushElement}
              className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg font-semibold transition-all"
            >
              Push (End)
            </button>
            <button
              onClick={unshiftElement}
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg font-semibold transition-all"
            >
              Unshift (Start)
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-400">Remove Elements</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={popElement}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg font-semibold transition-all"
            >
              Pop (End)
            </button>
            <button
              onClick={shiftElement}
              className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 rounded-lg font-semibold transition-all"
            >
              Shift (Start)
            </button>
          </div>
          <button
            onClick={() => setArray([])}
            className="w-full px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 rounded-lg font-semibold transition-all"
          >
            Clear Array
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Current Array Code:</h3>
        <code className="text-green-400">
          let array = [{array.map(item => typeof item === 'string' ? `"${item}"` : item).join(', ')}];
        </code>
      </div>
    </div>
  );
};

export default ArrayVisualizer;
