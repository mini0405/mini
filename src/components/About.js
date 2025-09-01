import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
                Molo, I'm <strong>Minentle Stuurman</strong>
              </p>
              <p>
                I'm a final year Computer Engineering student at Cape Peninsula University of Technology with a passion for cloud computing and cybersecurity. Recently, I wrapped up an incredible 6-month journey as a <strong>Cloud Support Engineering Intern at Amazon Web Services</strong>, where I got to work with cutting-edge cloud technologies and support enterprise customers.
              </p>
              
              <h3 style={{color: '#667eea', marginTop: '2rem', marginBottom: '1rem'}}>What I Do</h3>
              <p>
                My world revolves around creating secure, efficient digital solutions. Whether I'm troubleshooting complex AWS infrastructure, writing Python code, or designing database systems, I'm always thinking about how technology can solve real-world problems. I'm particularly fascinated by <strong>cybersecurity</strong> – there's something deeply satisfying about building systems that not only work brilliantly but also keep users safe.
              </p>
              
              <h3 style={{color: '#667eea', marginTop: '2rem', marginBottom: '1rem'}}>My Journey So Far</h3>
              <p>
                During my time at AWS, I had the privilege of working with an amazing team that taught me what true collaboration looks like. From supporting EC2 instances to helping customers navigate S3 configurations, every day brought new challenges and learning opportunities. I'm proud to be <strong>AWS Certified Solutions Architect Associate</strong>, with additional certifications in Cloud Quest tracks.
              </p>
              <p>
                But my experience goes beyond just technical skills. As a <strong>Residence Student Assistant managing 350+ students</strong>, I learned the art of communication, conflict resolution, and leadership. These experiences taught me that the best technical solutions are meaningless without the human element – understanding people's needs and communicating complex ideas clearly.
              </p>
              
              <h3 style={{color: '#667eea', marginTop: '2rem', marginBottom: '1rem'}}>Beyond the Code</h3>
              <p>
                When I'm not diving deep into cloud architectures or debugging systems, you'll find me exploring the intersection of technology and community impact. Growing up in South Africa and speaking multiple local languages fluently has given me a unique perspective on how technology can bridge cultural and communication gaps.
              </p>
              <p>
                I believe in the power of continuous learning – whether it's mastering a new AWS service, understanding emerging cybersecurity threats, or simply staying curious about how things work. This mindset has served me well, from balancing demanding internship responsibilities with final year studies to constantly seeking ways to improve and grow.
              </p>
              
              <h3 style={{color: '#667eea', marginTop: '2rem', marginBottom: '1rem'}}>What's Next</h3>
              <p>
                As I approach graduation in <strong>November 2025</strong>, I'm excited about the possibilities ahead. I'm looking for opportunities where I can apply my cloud computing expertise, leadership experience, and collaborative spirit to build innovative solutions and contribute to meaningful projects.
              </p>
              <p>
                I'm always open to connecting with fellow tech enthusiasts, discussing cloud computing trends, or chatting about opportunities in the South African tech landscape. Feel free to reach out – I'd love to hear from you!
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
              <div className="stat-item card">
                <h3>7</h3>
                <p>Months at AWS</p>
              </div>
              <div className="stat-item card">
                <h3>350+</h3>
                <p>Residents Managed</p>
              </div>
              <div className="stat-item card">
                <h3>2025</h3>
                <p>Graduation Year</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;