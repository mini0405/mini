import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TypewriterGreeting from './TypewriterGreeting';
import ProfilePicture from './ProfilePicture';
import ImageSwiper from './ImageSwiper';
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
                I'm a Computer Engineering graduate from the Cape Peninsula University of Technology with a deep interest in cloud architecture, systems reliability, and cybersecurity. I specialize in bridging the gap between infrastructure and application layers to keep complex environments running smoothly.
              </p>

              <h3>What I Do</h3>
              <p>
                My world revolves around creating secure, efficient, and scalable digital solutions. Whether I'm troubleshooting complex AWS infrastructure, writing backend automation scripts, or debugging production systems, I'm always thinking about how technology can solve real-world problems. I'm particularly fascinated by cybersecurity—there is something deeply satisfying about building systems that not only perform brilliantly but also keep data and users safe.
              </p>

              <h3>My Journey So Far</h3>
              <p>
                My cloud foundation was built during an incredible 7-month journey as a Cloud Support Associate Intern at AWS. Working with enterprise customers to navigate complex EC2 and S3 configurations taught me what true collaboration looks like, and earning my AWS Certified Solutions Architect Associate credential solidified that expertise.
                But my experience goes beyond just the code. Managing 350+ residents as a Residence Student Assistant taught me the art of communication, conflict resolution, and leadership. Those experiences proved that the best technical solutions are meaningless without the human element. Today, I apply both my technical and communicative skills daily in my role as a <strong>Junior Application Support Engineer</strong>, ensuring operational reliability and seamless system performance.
              </p>

              <h3>Beyond the Code</h3>
              <p>
                When I'm not diving deep into cloud architectures or troubleshooting applications, you'll find me exploring the intersection of technology and community impact. Growing up in South Africa and speaking multiple local languages fluently has given me a unique perspective on how technology can bridge cultural and communication gaps. I believe in the power of continuous learning, whether it's mastering a new tool, understanding emerging security threats, or exploring hardware design.
              </p>

              <h3>What's Next</h3>
              <p>
                Having recently completed my BEngTech in Computer Engineering, I am now thinking of expanding my technical scope by pursuing Honours in Electrical Engineering. My 1st option from high school was Electrical Engineering, but I chose Computer Engineering because I saw how it could combine my interests in both hardware and software. I'm excited to continue applying my cloud expertise, operational experience, and collaborative spirit to build innovative solutions.
                I'm always open to connecting with fellow tech enthusiasts, discussing industry trends, or chatting about the South African tech landscape. Feel free to reach out; I'd love to hear from you! I always respond to messages on LinkedIn and email, and I'm open to coffee chats, mentorship opportunities, or just sharing insights about ideas.
              </p>

              <h3>Academic Foundation</h3>
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

              <blockquote>
                "Technology is best when it brings people together and makes their lives better."
              </blockquote>

              {/* Graduation & Acknowledgements */}
              <div className="grad-section">
                <h3 className="grad-title gradient-text">I Graduated!</h3>
                <p>
                  On the <strong>10th of April 2026</strong>, I officially graduated with the <strong> Bachelor of Engineering Technology in Computer Engineering</strong> from the Cape Peninsula University of Technology. This milestone represents 4 years of late nights, hard work, and growth; and I couldn't have done it alone.
                </p>

                <h3>With Gratitude</h3>
                <p>
                  To my <strong>family</strong>; thank you for your unwavering support, sacrifices, and belief in me even when I doubted myself. You are my foundation.
                </p>
                <p>
                  To my <strong>friends and peers</strong>; the study sessions, the laughs, and the shared struggles made this journey unforgettable. Thank you for walking this road with me.
                </p>
                <p>
                  To my <strong>lecturers and mentors at CPUT</strong>; your guidance shaped not just my technical skills but my character as an engineer.
                </p>
                <p>
                  To the <strong>AWS team</strong>; thank you for giving me the opportunity to grow in a world-class environment and for showing me what excellence looks like.
                </p>
                <p>
                  To <strong>everyone</strong> who cheered me on, checked in, and believed in this journey; this achievement belongs to all of us.
                </p>

                {/* ── ADD YOUR GRADUATION PHOTOS HERE ──────────────────────────
                     Place images in the /public/grad/ folder and name them
                     grad1.jpg, grad2.jpg ... grad10.jpg (or any name you like).
                     Add or remove entries below to match how many photos you have. ── */}
                     <h3>Graduation Photos</h3>
                <ImageSwiper images={[
                  '/grad/grad1.jpg',
                  '/grad/grad2.jpg',
                  '/grad/grad3.jpg',
                  '/grad/grad4.jpg',
                  '/grad/grad5.jpg',
                  '/grad/grad6.jpg',
                  '/grad/grad7.jpg',
                  '/grad/grad8.jpg'
                ]} />
              </div>
            </motion.div>

            <motion.div
              className="about-stats"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
               {/*<ProfilePicture /> */}
              <div className="stat-item card">
                <h3>2026</h3>
                <p>Graduation Year</p>
              </div>
              <div className="stat-item card">
                <h3>Feb 2026 - </h3>
                <p>Altron Digital Business</p>
              </div>
              <div className="stat-item card">
                <h3>7</h3>
                <p>Months at AWS</p>
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
