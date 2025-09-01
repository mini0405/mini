import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Skills.css';

const Skills = ({ onNavigate }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skillCategories = [
    {
      title: 'Cloud Computing & Infrastructure',
      icon: 'cloud',
      color: '#667eea',
      skills: [
        'AWS EC2, S3, RDS, Lambda',
        'CloudWatch, IAM, VPC',
        'CloudFormation, Route 53',
        'Cost optimization',
        'Performance monitoring'
      ]
    },
    {
      title: 'Programming & Development',
      icon: 'code',
      color: '#764ba2',
      skills: [
        'Java (OOP)',
        'Python (Automation)',
        'SQL (Database queries)',
        'Bash/Shell scripting',
        'Git version control',
        'Linux/Windows CLI'
      ]
    },
    {
      title: 'Cybersecurity & Networks',
      icon: 'security',
      color: '#f093fb',
      skills: [
        'AWS security best practices',
        'IAM policies & access control',
        'Encryption & data protection',
        'TCP/IP, DNS, DHCP',
        'Firewall configuration',
        'VPN setup'
      ]
    },
    {
      title: 'Database & Data Management',
      icon: 'storage',
      color: '#4facfe',
      skills: [
        'MySQL design & optimization',
        'Database normalization',
        'Query optimization',
        'Performance tuning',
        'Data modeling'
      ]
    },
    {
      title: 'Leadership & Communication',
      icon: 'groups',
      color: '#43e97b',
      skills: [
        'Team management (350+ students)',
        'Customer support & troubleshooting',
        'Technical documentation',
        'Multilingual communication',
        'Conflict resolution'
      ]
    },
    {
      title: 'Certifications & Tools',
      icon: 'workspace_premium',
      color: '#fa709a',
      skills: [
        'AWS Solutions Architect Associate',
        'AWS Cloud Quest tracks',
        'Microsoft Office Suite',
        'IntelliJ IDEA, VS Code',
        'Remote desktop & SSH'
      ]
    }
  ];

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title gradient-text">Skills & Technologies</h2>
          <p className="skills-subtitle">My technical expertise across different domains</p>
          
          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                className="skill-card card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ '--card-color': category.color }}
              >
                <div className="skill-header">
                  <span className="skill-icon material-icons">{category.icon}</span>
                  <h3 className="skill-title">{category.title}</h3>
                </div>
                
                <div className="skill-list">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="skill-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 + skillIndex * 0.05 }}
                    >
                      <span className="skill-bullet">•</span>
                      <span className="skill-text">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="skills-footer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p><em>Always learning, always growing. These skills represent my journey so far.</em></p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;