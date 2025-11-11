import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizzesData } from '../data/quizzesData';

const Quizzes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
  };

  const handleAnswerSelect = (index) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    const question = selectedQuiz.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, { question: currentQuestion, selected: selectedAnswer, correct: isCorrect }]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
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

  if (quizCompleted) {
    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full glass rounded-2xl p-8 text-center"
        >
          <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Quiz Completed!
          </h2>
          <div className="text-5xl font-bold mb-6">
            <span className={passed ? 'text-green-400' : 'text-yellow-400'}>
              {score} / {selectedQuiz.questions.length}
            </span>
          </div>
          <div className="text-2xl mb-8">
            Score: <span className="font-bold">{percentage}%</span>
          </div>
          
          {passed ? (
            <p className="text-green-400 text-lg mb-8">
              🌟 Excellent work! You've mastered this topic!
            </p>
          ) : (
            <p className="text-yellow-400 text-lg mb-8">
              Keep practicing! Review the lessons and try again.
            </p>
          )}

          <div className="flex space-x-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              🔄 Retry Quiz
            </button>
            <button
              onClick={() => setSelectedQuiz(null)}
              className="px-6 py-3 glass glass-hover rounded-lg font-semibold"
            >
              ← Back to Quizzes
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (selectedQuiz) {
    const question = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedQuiz(null)}
            className="mb-6 px-4 py-2 glass glass-hover rounded-lg flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Quizzes</span>
          </button>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentQuestion + 1} of {selectedQuiz.questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">
                {question.question}
              </h3>

              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === question.correct;
                  const showCorrect = showExplanation && isCorrect;
                  const showWrong = showExplanation && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showCorrect
                          ? 'bg-green-500/20 border-green-500'
                          : showWrong
                          ? 'bg-red-500/20 border-red-500'
                          : isSelected
                          ? 'bg-blue-500/20 border-blue-500'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            showCorrect
                              ? 'bg-green-500 border-green-500'
                              : showWrong
                              ? 'bg-red-500 border-red-500'
                              : isSelected
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-500'
                          }`}
                        >
                          {showCorrect && '✓'}
                          {showWrong && '✗'}
                        </div>
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-6"
                >
                  <h4 className="font-semibold text-blue-400 mb-2">💡 Explanation:</h4>
                  <p className="text-gray-300">{question.explanation}</p>
                </motion.div>
              )}

              <div className="flex justify-end">
                {!showExplanation ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    {currentQuestion < selectedQuiz.questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Interactive Quizzes
          </h1>
          <p className="text-xl text-gray-400">
            Test your knowledge and track your progress
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzesData.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleQuizSelect(quiz)}
              className="glass glass-hover rounded-2xl p-6 cursor-pointer group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                {quiz.title}
              </h3>
              <p className="text-gray-400 mb-4">
                {quiz.questions.length} questions
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                  quiz.difficulty
                )}`}
              >
                {quiz.difficulty}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
