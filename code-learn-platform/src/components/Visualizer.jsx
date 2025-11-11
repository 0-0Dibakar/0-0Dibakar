import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrayVisualizer from './visualizers/ArrayVisualizer';
import LoopVisualizer from './visualizers/LoopVisualizer';
import SortingVisualizer from './visualizers/SortingVisualizer';
import VariableVisualizer from './visualizers/VariableVisualizer';

const Visualizer = () => {
  const [activeVisualizer, setActiveVisualizer] = useState('array');

  const visualizers = [
    {
      id: 'array',
      name: 'Array Operations',
      icon: '📊',
      description: 'Visualize array manipulations',
      component: ArrayVisualizer,
    },
    {
      id: 'loop',
      name: 'Loop Execution',
      icon: '🔄',
      description: 'See loops in action',
      component: LoopVisualizer,
    },
    {
      id: 'sorting',
      name: 'Sorting Algorithms',
      icon: '📈',
      description: 'Watch sorting algorithms work',
      component: SortingVisualizer,
    },
    {
      id: 'variables',
      name: 'Variable States',
      icon: '📦',
      description: 'Track variable changes',
      component: VariableVisualizer,
    },
  ];

  const ActiveComponent = visualizers.find(v => v.id === activeVisualizer)?.component;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Code Visualizer
          </h1>
          <p className="text-xl text-gray-400">
            See your code come to life with interactive visualizations
          </p>
        </motion.div>

        {/* Visualizer Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {visualizers.map((viz) => (
            <button
              key={viz.id}
              onClick={() => setActiveVisualizer(viz.id)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-3 ${
                activeVisualizer === viz.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
                  : 'glass glass-hover'
              }`}
            >
              <span className="text-2xl">{viz.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{viz.name}</div>
                <div className="text-xs text-gray-400">{viz.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Visualizer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVisualizer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {ActiveComponent && <ActiveComponent />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Visualizer;
