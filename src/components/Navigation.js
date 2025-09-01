import React from 'react';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation = ({ currentSection, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'about', label: 'About', icon: 'person' },
    { id: 'skills', label: 'Skills', icon: 'bolt' },
    { id: 'projects', label: 'Projects', icon: 'rocket_launch' },
    { id: 'contact', label: 'Documents', icon: 'description' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            className={`nav-item ${currentSection === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="nav-icon material-icons">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;