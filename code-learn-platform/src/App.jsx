import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Lessons from './components/Lessons';
import CodePlayground from './components/CodePlayground';
import Visualizer from './components/Visualizer';
import Quizzes from './components/Quizzes';
import Projects from './components/Projects';
import Progress from './components/Progress';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero onGetStarted={() => setActiveSection('lessons')} />;
      case 'lessons':
        return <Lessons />;
      case 'playground':
        return <CodePlayground />;
      case 'visualizer':
        return <Visualizer />;
      case 'quizzes':
        return <Quizzes />;
      case 'projects':
        return <Projects />;
      case 'progress':
        return <Progress />;
      default:
        return <Hero onGetStarted={() => setActiveSection('lessons')} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="pt-20">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;
