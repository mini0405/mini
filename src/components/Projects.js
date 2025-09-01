import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Projects.css';

const Projects = ({ onNavigate }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const projectCategories = [
    {
      category: 'Academic Projects',
      icon: '🎓',
      projects: [
        {
          title: 'Dynamic Load Balancing Algorithm',
          description: 'Final year project designing and benchmarking load balancing algorithms for distributed systems with focus on efficiency and scalability.',
          tech: ['System Design', 'Distributed Systems', 'Performance Analysis'],
          type: 'Final Year Project'
        },
        {
          title: 'Networking Labs (NSS370S)',
          description: 'Configured routers in Cisco Packet Tracer and VyOS, practiced troubleshooting, subnetting, and built network topologies from scratch.',
          tech: ['Cisco Packet Tracer', 'VyOS', 'Routing Protocols', 'Subnetting'],
          type: 'Academic Lab'
        },
        {
          title: 'Solar Powered Washing Machine',
          description: 'Embedded Systems project designing sustainable washing machine powered by solar panels, batteries, and inverter with energy efficiency evaluation.',
          tech: ['Embedded Systems', 'Solar Power', 'Energy Efficiency', 'Sustainability'],
          type: 'GA4 Project'
        },
        {
          title: 'Broadcasting & Audio Systems',
          description: 'Electronic Communications project analyzing audio system design and broadcasting principles using academic research.',
          tech: ['Audio Systems', 'Broadcasting', 'Signal Processing', 'Research'],
          type: 'GA6 Project'
        }
      ]
    },
    {
      category: 'Professional Experience',
      icon: '💼',
      projects: [
        {
          title: 'AWS Cloud Support Associate',
          description: 'Internship assisting customers with AWS services troubleshooting, hands-on Linux and networking work, mentorship and real cloud systems exposure.',
          tech: ['AWS Services', 'Linux', 'Networking', 'Customer Support', 'Cloud Computing'],
          type: 'Internship'
        },
        {
          title: 'Commute Optimization App',
          description: 'Productivity app concept to optimize daily commuting with route tracking, public transport updates, and time-saving suggestions.',
          tech: ['Mobile Development', 'Route Optimization', 'Public Transport APIs', 'Cloud Deployement'],
          type: 'App Concept'
        }
      ]
    },
    {
      category: 'Personal Projects',
      icon: '💻',
      projects: [
        {
          title: 'Pet Care Management App',
          description: 'Mobile/web app concept for tracking pet health, feeding schedules, vet visits with notifications and comprehensive record-keeping features.',
          tech: ['Mobile Development', 'Health Tracking', 'Notifications', 'Database Design'],
          type: 'App Concept'
        },
        {
          title: 'GNS3 Networking Labs',
          description: 'Advanced network simulations beyond Packet Tracer, practicing complex routing, switching, and protocol configurations.',
          tech: ['GNS3', 'Advanced Routing', 'Switching', 'Network Protocols'],
          type: 'Lab Practice'
        },
        {
          title: 'Cybersecurity Learning Lab',
          description: 'Personal lab with VirtualBox VMs, exploring Wireshark for packet analysis and researching load balancing from security perspective.',
          tech: ['VirtualBox', 'Wireshark', 'Packet Analysis', 'Security Research'],
          type: 'Security Lab'
        }
      ]
    }
  ];

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title gradient-text">Projects & Experience</h2>
          
          <div className="projects-categories">
            {projectCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                className="project-category"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              >
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h3 className="category-title">{category.category}</h3>
                </div>
                
                <div className="projects-grid">
                  {category.projects.map((project, projectIndex) => (
                    <motion.div
                      key={project.title}
                      className="project-card card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.2 + projectIndex * 0.1 }}
                    >
                      <div className="project-header">
                        <h4 className="project-title">{project.title}</h4>
                        <span className="project-type">{project.type}</span>
                      </div>
                      
                      <p className="project-description">{project.description}</p>
                      
                      <div className="project-tech">
                        {project.tech.map((tech) => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;