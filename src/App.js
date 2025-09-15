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
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const path = location.pathname.slice(1) || 'home';
    setCurrentSection(path);
  }, [location]);

  const handleNavigation = (section) => {
    setCurrentSection(section);
    navigate(`/${section === 'home' ? '' : section}`);
  };

  const renderSection = () => {
    switch(currentSection) {
      case 'home':
        return <Hero onNavigate={handleNavigation} />;
      case 'about':
        return <About onNavigate={handleNavigation} />;
      case 'skills':
        return <Skills onNavigate={handleNavigation} />;
      case 'projects':
        return <Projects onNavigate={handleNavigation} />;
      case 'contact':
        return <Contact onNavigate={handleNavigation} />;
      default:
        return <Hero onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="App">
      <AnimatedGreeting />
      <Navigation currentSection={currentSection} onNavigate={handleNavigation} />
      <main className="main-content">
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