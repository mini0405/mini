import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import HeroV2 from './components/v2/HeroV2';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AnimatedGreeting from './components/AnimatedGreeting';
import VersionSwitcher from './components/VersionSwitcher';
import './App.css';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState('home');
  const [version, setVersion] = useState('v1');
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];

  useEffect(() => {
    const path = location.pathname.slice(1) || 'home';
    setCurrentSection(path);
  }, [location]);

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
          handleNavigation(sections[currentIndex + 1]);
        } else if (diffX < 0 && currentIndex > 0) {
          handleNavigation(sections[currentIndex - 1]);
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

  const handleNavigation = (section) => {
    setCurrentSection(section);
    navigate(`/${section === 'home' ? '' : section}`);
  };

  const renderSection = () => {
    const HeroComponent = version === 'v2' ? HeroV2 : Hero;
    
    switch(currentSection) {
      case 'home':
        return <HeroComponent onNavigate={handleNavigation} />;
      case 'about':
        return <About onNavigate={handleNavigation} />;
      case 'skills':
        return <Skills onNavigate={handleNavigation} />;
      case 'projects':
        return <Projects onNavigate={handleNavigation} />;
      case 'contact':
        return <Contact onNavigate={handleNavigation} />;
      default:
        return <HeroComponent onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="App">
      <VersionSwitcher currentVersion={version} onVersionChange={setVersion} />
      <AnimatedGreeting />
      <Navigation currentSection={currentSection} onNavigate={handleNavigation} />
      <main className="main-content" key={currentSection}>
        {renderSection()}
      </main>
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/home" element={<AppContent />} />
        <Route path="/about" element={<AppContent />} />
        <Route path="/skills" element={<AppContent />} />
        <Route path="/projects" element={<AppContent />} />
        <Route path="/contact" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;