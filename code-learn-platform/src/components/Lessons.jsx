import { useState } from 'react';
import { motion } from 'framer-motion';
import { lessonsData } from '../data/lessonsData';
import Editor from '@monaco-editor/react';

const Lessons = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setCode(lesson.starterCode);
    setOutput('');
  };

  const runCode = () => {
    try {
      const logs = [];
      const customConsole = {
        log: (...args) => logs.push(args.join(' ')),
      };

      const func = new Function('console', code);
      func(customConsole);

      setOutput(logs.join('\n') || 'Code executed successfully!');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'Advanced':
        return 'text-red-400 bg-red-500/20 border-red-500/50';
      default:
        return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
    }
  };

  if (selectedLesson) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setSelectedLesson(null)}
            className="mb-6 px-4 py-2 glass glass-hover rounded-lg flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Lessons</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Lesson Content */}
            <div className="glass rounded-2xl p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-4xl">{selectedLesson.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-blue-400">
                    {selectedLesson.title}
                  </h2>
                  <div className="flex items-center space-x-3 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                        selectedLesson.difficulty
                      )}`}
                    >
                      {selectedLesson.difficulty}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ⏱️ {selectedLesson.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <div
                  className="text-gray-300 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: selectedLesson.content
                      .replace(/```javascript\n([\s\S]*?)```/g, '<pre class="bg-gray-800/50 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
                      .replace(/`([^`]+)`/g, '<code class="bg-gray-800/50 px-2 py-1 rounded text-blue-400">$1</code>')
                      .replace(/## (.*)/g, '<h3 class="text-xl font-semibold text-purple-400 mt-6 mb-3">$1</h3>')
                      .replace(/# (.*)/g, '<h2 class="text-2xl font-bold text-blue-400 mb-4">$1</h2>')
                      .replace(/- \*\*(.*?)\*\*: (.*)/g, '<li class="ml-4"><strong class="text-blue-400">$1</strong>: $2</li>'),
                  }}
                />
              </div>

              {/* Exercises */}
              <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">
                  💪 Practice Exercises
                </h3>
                {selectedLesson.exercises.map((exercise, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <p className="text-gray-300 mb-1">
                      {index + 1}. {exercise.question}
                    </p>
                    <p className="text-sm text-gray-500 ml-4">
                      💡 Hint: {exercise.hint}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Editor */}
            <div className="space-y-4">
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-blue-400">
                    Code Editor
                  </h3>
                  <button
                    onClick={runCode}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    ▶️ Run Code
                  </button>
                </div>
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

              {/* Output */}
              <div className="glass rounded-2xl p-4">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  Output
                </h3>
                <pre className="bg-gray-900/50 p-4 rounded-lg text-green-400 font-mono text-sm min-h-[150px] overflow-x-auto">
                  {output || 'Click "Run Code" to see output...'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Interactive Lessons
          </h1>
          <p className="text-xl text-gray-400">
            Learn programming concepts with hands-on examples
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonsData.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleLessonSelect(lesson)}
              className="glass glass-hover rounded-2xl p-6 cursor-pointer group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {lesson.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                {lesson.title}
              </h3>
              <p className="text-gray-400 mb-4">{lesson.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                    lesson.difficulty
                  )}`}
                >
                  {lesson.difficulty}
                </span>
                <span className="text-gray-500 text-sm">
                  ⏱️ {lesson.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
