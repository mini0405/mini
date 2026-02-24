import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TypewriterGreeting from './TypewriterGreeting';
import ProfilePicture from './ProfilePicture';
import './About.css';

const About = ({ onNavigate }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div 
          ref={ref}
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title gradient-text">About Me</h2>
          
          <div className="about-grid">
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                <TypewriterGreeting />, I'm <strong>Minentle Stuurman</strong>
              </p>
              <p>
                I'm a Computer Engineering graduate from the Cape Peninsula University of Technology with a passion for cloud computing, application monitoring, and cybersecurity. I recently completed an incredible 7-month journey as a <strong>Cloud Support Associate Intern at Amazon Web Services</strong>, where I worked with cutting-edge cloud technologies and supported enterprise customers. Currently, I'm working as a <strong>Junior Application Engineer at Altron Digital Business</strong>, where I started in <strong>February 2026</strong>.
              </p>
              
              <h3 style={{color: '#667eea', marginTop: '2rem', marginBottom: '1rem'}}>What I Do</h3>
              <p>
                My work focuses on ensuring systems run smoothly and efficiently. I monitor application performance using tools like <strong>Kibana and Grafana</strong>, investigate issues through log analysis, and manage support tickets to resolve technical problems within SLA targets. Whether I'm troubleshooting AWS infrastructure, working with SQL databases to generate insights, or assisting with data migrations, I'm always thinking about how to deliver reliable, secure solutions.
              </p>
              <p>
                I'm particularly passionate about <strong>observability and incident response</strong> – detecting anomalies early, diagnosing root causes quickly, and documenting solutions to prevent future issues. My experience spans cloud technologies, database management, system monitoring, and technical support, giving me a well-rounded perspective on building and maintaining robust applications.
              </p>
              
              <h3 style={{color: '#667eea', marginTop: '2rem', marginBottom: '1rem'}}>My Journey So Far</h3>
              <p>
                During my time at AWS, I had the privilege of working with an amazing team that taught me what true collaboration looks like. From supporting EC2 instances to helping customers navigate S3 configurations, every day brought new challenges and learning opportunities. I'm proud to be <strong>AWS Certified Solutions Architect Associate</strong>, with additional certifications in Cloud Quest tracks.
              </p>
              <p>
                But my experience goes beyond just technical skills. As a <strong>Residence Student Assistant managing 350+ Residents </strong>, I learned the art of communication, conflict resolution, and leadership. These experiences taught me that the best technical solutions are meaningless without the human element – understanding people's needs and communicating complex ideas clearly.
              </p>
              
              <h3 style={{color: '#667eea', marginTop: '2rem', marginBottom: '1rem'}}>Beyond the Code</h3>
              <p>
                When I'm not diving deep into cloud architectures or debugging systems, you'll find me exploring the intersection of technology and community impact. Growing up in South Africa and speaking multiple local languages fluently has given me a unique perspective on how technology can bridge cultural and communication gaps.
              </p>
              <p>
                I believe in the power of continuous learning, whether it's mastering a new AWS service, understanding emerging cybersecurity threats, or simply staying curious about how things work. This mindset has served me well, from balancing demanding internship responsibilities with final year studies to constantly seeking ways to improve and grow.
              </p>
              
              <h3 style={{color: '#667eea', marginTop: '2rem', marginBottom: '1rem'}}>Current Role</h3>
              <p>
                At <strong>Altron Digital Business</strong>, I work across the full application support lifecycle – from proactive monitoring and incident detection to troubleshooting, resolution, and knowledge documentation. I use monitoring platforms to track system health, analyze logs to diagnose issues, manage support workflows, and collaborate with teams to ensure seamless operations. I also work with AWS services and SQL databases for data migrations and reporting, ensuring data integrity throughout.
              </p>
              <p>
                This role has strengthened my skills in <strong>observability tools, incident management, database operations, and cross-team collaboration</strong> – all while maintaining a focus on delivering excellent user experiences and meeting service level commitments.
              </p>
              
              <h3 style={{color: '#667eea', marginTop: '2rem', marginBottom: '1rem'}}>Academic Foundation</h3>
              <p>
                My Computer Engineering degree at CPUT has provided me with a solid foundation across multiple technical domains:
              </p>
              
              <div className="academic-grid">
                <div className="academic-year-card">
                  <h4 className="year-title year-1">Year 1</h4>
                  <ul className="module-list">
                    <li>• Electrical Engineering Principles I</li>
                    <li>• Computer Architecture I</li>
                    <li>• Electronics I</li>
                    <li>• Physics I</li>
                    <li>• Engineering Mathematics I</li>
                    <li>• Software Design I</li>
                  </ul>
                </div>
                
                <div className="academic-year-card">
                  <h4 className="year-title year-2">Year 2</h4>
                  <ul className="module-list">
                    <li>• Computer Graphics II</li>
                    <li>• Engineering Communincation I</li>
                    <li>• Engineering Ethics I</li>
                    <li>• Engineering Mathematics II</li>
                    <li>• Signal Processing II</li>
                    <li>• Software Design II</li>
                    <li>• Digital Systems II</li>
                    <li>• Operating Systems II</li>
                  </ul>
                </div>
                
                <div className="academic-year-card">
                  <h4 className="year-title year-3">Year 3</h4>
                  <ul className="module-list">
                    <li>• Database Systems III</li>
                    <li>• Electronic Communications III</li>
                    <li>• Embedded Systems III</li>
                    <li>• Network Systems III</li>
                    <li>• Industrial Computing Design III</li>
                  </ul>
                </div>
              </div>
              
              <blockquote style={{fontStyle: 'italic', textAlign: 'center', margin: '2rem 0', padding: '1rem', borderLeft: '4px solid #667eea', background: 'rgba(102, 126, 234, 0.1)'}}>
                "Technology is best when it brings people together and makes their lives better."
              </blockquote>
            </motion.div>
            
            <motion.div 
              className="about-stats"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ProfilePicture />
              <div className="stat-item card">
                <h3>7</h3>
                <p>Months at AWS</p>
              </div>
              <div className="stat-item card">
                <h3>2026</h3>
                <p>Started at Altron</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;