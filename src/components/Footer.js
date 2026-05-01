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
              Multidisciplinary Engineer with a strong foundation in cloud architecture, software development, and systems support. 
              I specialize in bridging the gap between infrastructure and application layers to optimize performance, enhance security, and drive operational efficiency.
            </p>
            <div className="footer-tech-stack">
              <i className="devicon-java-plain colored"></i>
              <i className="devicon-python-plain colored"></i>
              <i className="devicon-javascript-plain colored"></i>
              <i className="devicon-go-plain colored"></i>
              <i className="devicon-c-plain colored"></i>
              <i className="devicon-cplusplus-plain colored"></i>
              <i className="devicon-mysql-plain colored"></i>
              <i className="devicon-bash-plain colored"></i>
              <i className="devicon-git-plain colored"></i>
              <i className="devicon-linux-plain"></i>
              <i className="devicon-amazonwebservices-plain-wordmark colored"></i>
            </div>
          </div>
          
          <div className="footer-contact">
            <h4>Connect With Me</h4>
            <div className="contact-links">
              <a href="mailto:mentorstuurman05@outlook.com" className="contact-link">
                <i className="contact-icon material-icons">email</i>
                <span>mentorstuurman05@outlook.com</span>
              </a>
              <a href="https://linkedin.com/in/mini-stuurman" className="contact-link" target="_blank" rel="noopener noreferrer">
                <i className="contact-icon devicon-linkedin-plain colored"></i>
                <span>LinkedIn Profile</span>
              </a>
              <a href="https://github.com/mini0405" className="contact-link" target="_blank" rel="noopener noreferrer">
                <i className="contact-icon devicon-github-original colored"></i>
                <span>GitHub Portfolio</span>
              </a>
              <a href="https://minentle.co.za" className="contact-link">
                <i className="contact-icon material-icons">language</i>
                <span>Portfolio Website</span>
              </a>
              <div className="contact-link">
                <i className="contact-icon material-icons">location_on</i>
                <span>Johannesburg / Cape Town, South Africa</span>
              </div>
              <a href="https://www.credly.com/users/minentle-stuurman/badges#credly" className="contact-link">
                <i className="contact-icon devicon-amazonwebservices-plain-wordmark colored"></i>
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