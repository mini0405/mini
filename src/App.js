import React, { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AnimatedGreeting from './components/AnimatedGreeting';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  const renderSection = () => {
    switch(currentSection) {
      case 'home':
        return <Hero onNavigate={setCurrentSection} />;
      case 'about':
        return <About onNavigate={setCurrentSection} />;
      case 'skills':
        return <Skills onNavigate={setCurrentSection} />;
      case 'projects':
        return <Projects onNavigate={setCurrentSection} />;
      case 'contact':
        return <Contact onNavigate={setCurrentSection} />;
      default:
        return <Hero onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="App">
      <AnimatedGreeting />
      <Navigation currentSection={currentSection} onNavigate={setCurrentSection} />
      <main className="main-content">
        {renderSection()}
      </main>
      <Footer onNavigate={setCurrentSection} />
    </div>
  );
}

export default App;