import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AnimatedGreeting from './components/AnimatedGreeting';
import './App.css';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentSection = location.pathname.slice(1) || 'home';
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];

  const handleNavigate = (section) => {
    navigate(`/${section}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
          handleNavigate(sections[currentIndex + 1]);
        } else if (diffX < 0 && currentIndex > 0) {
          handleNavigate(sections[currentIndex - 1]);
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
  }, [currentSection, sections, handleNavigate]);



  return (
    <div className="App">
      <AnimatedGreeting />
      <Navigation currentSection={currentSection} onNavigate={handleNavigate} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Hero onNavigate={handleNavigate} />} />
          <Route path="/home" element={<Hero onNavigate={handleNavigate} />} />
          <Route path="/about" element={<About onNavigate={handleNavigate} />} />
          <Route path="/skills" element={<Skills onNavigate={handleNavigate} />} />
          <Route path="/projects" element={<Projects onNavigate={handleNavigate} />} />
          <Route path="/contact" element={<Contact onNavigate={handleNavigate} />} />
        </Routes>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;