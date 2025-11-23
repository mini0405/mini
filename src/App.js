import React, { useState, useEffect } from 'react';
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
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection]);

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e) => {
      if (!startX || !startY) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;
      
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const currentIndex = sections.indexOf(currentSection);
        if (diffX > 0 && currentIndex < sections.length - 1) {
          setCurrentSection(sections[currentIndex + 1]);
        } else if (diffX < 0 && currentIndex > 0) {
          setCurrentSection(sections[currentIndex - 1]);
        }
      }
      
      startX = 0;
      startY = 0;
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, sections]);



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