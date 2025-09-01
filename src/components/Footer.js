import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="footer-bio">
            <h3>Minentle Stuurman</h3>
            <p>
              Final year Computer Engineering student passionate about cloud computing and cybersecurity. 
              AWS Certified Solutions Architect with hands-on experience in cloud infrastructure and customer support.
            </p>
          </div>
          
          <div className="footer-navigation">
            <h4>Navigation</h4>
            <div className="nav-links">
              <button onClick={() => onNavigate && onNavigate('home')} className="footer-nav-link">
                <span className="nav-icon">🏠</span>
                <span>Home</span>
              </button>
              <button onClick={() => onNavigate && onNavigate('about')} className="footer-nav-link">
                <span className="nav-icon">👨💻</span>
                <span>About</span>
              </button>
              <button onClick={() => onNavigate && onNavigate('skills')} className="footer-nav-link">
                <span className="nav-icon">⚡</span>
                <span>Skills</span>
              </button>
              <button onClick={() => onNavigate && onNavigate('projects')} className="footer-nav-link">
                <span className="nav-icon">🚀</span>
                <span>Projects</span>
              </button>
              <button onClick={() => onNavigate && onNavigate('contact')} className="footer-nav-link">
                <span className="nav-icon">📄</span>
                <span>Documents</span>
              </button>
            </div>
          </div>
          
          <div className="footer-contact">
            <h4>Connect With Me</h4>
            <div className="contact-links">
              <a href="mailto:mentorstuurman05@outlook.com" className="contact-link">
                <span className="contact-icon">📧</span>
                <span>mentorstuurman05@outlook.com</span>
              </a>
              <a href="https://linkedin.com/in/mini-stuurman" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">💼</span>
                <span>LinkedIn Profile</span>
              </a>
              <a href="https://github.com/mini0405" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">💻</span>
                <span>GitHub Portfolio</span>
              </a>
              <a href="https://minentle.co.za" className="contact-link">
                <span className="contact-icon">🌐</span>
                <span>Portfolio Website</span>
              </a>
              <div className="contact-link">
                <span className="contact-icon">📍</span>
                <span>Johannesburg / Cape Town, South Africa</span>
              </div>
              <a href="https://www.credly.com/users/minentle-stuurman/badges#credly" className="contact-link">
                <span className="contact-icon">☁️</span>
                <span>AWS Certified Solutions Architect</span>
              </a>
            </div>
          </div>
        </motion.div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Minentle Stuurman. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;