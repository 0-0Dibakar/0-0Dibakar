import { motion } from 'framer-motion';

const Hero = ({ onGetStarted }) => {
  const features = [
    {
      icon: '🎯',
      title: 'Interactive Learning',
      description: 'Learn by doing with hands-on coding exercises',
    },
    {
      icon: '🎨',
      title: 'Visual Feedback',
      description: 'See your code come to life with real-time visualizations',
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics',
    },
    {
      icon: '🏆',
      title: 'Earn Achievements',
      description: 'Complete challenges and unlock badges',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Learn to Code Visually
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Master programming through interactive visualizations, step-by-step
            execution, and hands-on projects
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/50"
            >
              Start Learning 🚀
            </button>
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="px-8 py-4 glass glass-hover rounded-full text-lg font-semibold"
            >
              Explore Features
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass glass-hover rounded-2xl p-6 text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-400">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 glass rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Why Choose CodeLearn?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Fast Learning</h3>
                <p className="text-gray-400">
                  Accelerate your learning with visual feedback and instant code execution
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="text-xl font-semibold mb-2">Structured Curriculum</h3>
                <p className="text-gray-400">
                  Follow a carefully designed path from beginner to advanced
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">💡</div>
                <h3 className="text-xl font-semibold mb-2">Real Projects</h3>
                <p className="text-gray-400">
                  Build actual projects that you can showcase in your portfolio
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
