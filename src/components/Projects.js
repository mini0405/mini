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
      icon: 'school',
      projects: [
        {
          title: 'Dynamic Load Balancer',
          role: 'Lead Engineer',
          description: 'A high-performance Layer 7 traffic director featuring a custom Smooth Weighted Round Robin algorithm and real-time packet visualization.',
          details: [
            'Engineered a concurrent load balancer in Go from scratch, implementing advanced traffic strategies like Sticky Sessions and IP Hashing.',
            'Built a custom Circuit Breaker pattern to automatically detect failing nodes and reroute traffic, ensuring high availability.',
            'Developed a neon-themed React dashboard that consumes Server-Sent Events (SSE) to visualize packet lifecycle, latency, and server health in real-time.',
            'Orchestrated the entire architecture using Docker Compose for a seamless dev-to-production workflow.'
          ],
          tech: ['Go (Golang)', 'React', 'Docker', 'Server-Sent Events', 'Nginx'],
          type: 'Final Year Project',
          links: {
            github: 'https://github.com/mini0405/dynamic_load_balancing',
            demo: null // Will be updated with S3 video URL
          }
        },
        {
          title: 'Networking Labs (NSS370S)',
          description: 'Configured routers in Cisco Packet Tracer and VyOS, practiced troubleshooting, subnetting, and built network topologies from scratch.',
          tech: ['Cisco Packet Tracer', 'VyOS', 'Routing Protocols', 'Subnetting'],
          type: 'Academic Lab'
        },
        {
          title: 'Solar Smart-Grid Controller',
          role: 'Embedded Systems Developer',
          description: 'An off-grid power management system for high-load appliances, optimizing solar energy distribution for residential use.',
          details: [
            'Engineered an embedded control system to manage power switching between solar inverter batteries and mains electricity.',
            'Programmed logic in C++ to monitor battery voltage thresholds and prevent deep discharge cycles.',
            'Designed the complete electrical schematic including inverter sizing and solar array calculations for sustainability.',
            'Simulated load scenarios to verify energy efficiency under varying weather conditions.'
          ],
          tech: ['C/C++', 'Arduino', 'Power Electronics', 'Proteus'],
          type: 'GA4 Project',
          links: {
            tinkercad: 'https://www.tinkercad.com/things/42sk359Vb1w-washing-machine-logic?sharecode=sIXx2PSgEKINMiDRkwjtaWEoZeLxOIukc5ykxArhLCI',
            demo: "https://website-minentle.s3.us-east-1.amazonaws.com/Version+3+ThinkerCad.mp4"
          }
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
      icon: 'work',
      projects: [
        {
          title: 'Enterprise Carpooling Platform',
          role: 'Full-Stack Developer (AWS Intern)',
          description: 'A secure, 3-tier internal ride-sharing application designed to optimize employee commute logistics within Amazon Web Services.',
          details: [
            'Designed a scalable 3-tier cloud architecture strictly adhering to the AWS Well-Architected Framework.',
            'Implemented a RESTful API on Node.js EC2 instances, sitting behind an Application Load Balancer for fault tolerance.',
            'Managed persistent user data and ride-matching algorithms using a relational MySQL database (Amazon RDS).',
            'Secured the infrastructure using VPC subnets, Security Groups, and granular IAM roles.'
          ],
          tech: ['AWS EC2 & RDS', 'Node.js', 'React', 'ALB', 'IAM'],
          type: 'Internship',
          links: {
            github: null,
            demo: null
          }
        },
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
      icon: 'code',
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
                  <span className="category-icon material-icons">{category.icon}</span>
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
                      
                      {project.role && <p className="project-role">{project.role}</p>}
                      
                      <p className="project-description">{project.description}</p>
                      
                      {project.details && (
                        <ul className="project-details">
                          {project.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                      
                      <div className="project-tech">
                        {project.tech.map((tech) => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      
                      {project.links && (
                        <div className="project-actions">
                          {project.links.github !== undefined && (
                            project.links.github ? (
                              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
                                <i className="devicon-github-original"></i> GitHub
                              </a>
                            ) : (
                              <button className="project-link" disabled>
                                <i className="devicon-github-original"></i> Private Repo
                              </button>
                            )
                          )}
                          {project.links.tinkercad && (
                            <a href={project.links.tinkercad} target="_blank" rel="noopener noreferrer" className="project-link">
                              <span className="material-icons">memory</span> Tinkercad
                            </a>
                          )}
                          {project.links.demo !== undefined && (
                            <button 
                              className="project-link" 
                              disabled={!project.links.demo}
                              onClick={() => project.links.demo && window.open(project.links.demo, '_blank')}
                            >
                              <span className="material-icons">play_circle</span> {project.links.demo ? 'Watch Demo' : 'Demo Coming Soon'}
                            </button>
                          )}
                        </div>
                      )}
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