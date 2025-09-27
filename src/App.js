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

  useEffect(() => {
    const path = location.pathname.slice(1) || 'home';
    setCurrentSection(path);
  }, [location]);

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