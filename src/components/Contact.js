import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CyberButton from './CyberButton';
import './Contact.css';

const Contact = ({ onNavigate }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const documents = [
    {
      title: 'Curriculum Vitae',
      description: 'Complete professional CV with education, experience, and skills',
      icon: 'description',
      type: 'PDF',
      size: '175.3 KB',
      downloadUrl: 'https://website-minentle.s3.us-east-1.amazonaws.com/Minentle_Stuurman_SiteCV.pdf'
    },
    {
      title: 'AWS Certifications',
      description: 'Solutions Architect Associate and Cloud Quest certificates',
      icon: 'cloud',
      type: 'PDF',
      size: '33.7 KB',
      downloadUrl: 'https://website-minentle.s3.us-east-1.amazonaws.com/AWS+Certified+Solutions+Architect+-+Associate+certificate.pdf'
    },
    {
      title: 'Academic Transcript',
      description: 'Official academic records from Cape Peninsula University of Technology',
      icon: 'school',
      type: 'PDF',
      size: 'Not Available',
      downloadUrl: null
    },
    {
      title: 'Portfolio Summary',
      description: 'One-page overview of key projects and achievements',
      icon: 'analytics',
      type: 'PDF',
      size: 'Not Available',
      downloadUrl: null
    }
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title gradient-text">Employment Documents</h2>
          <p className="section-subtitle">Download my professional documents for hiring consideration</p>
          
          <div className="documents-grid">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.title}
                className="document-card card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="document-icon">
                  <span className="material-icons">{doc.icon}</span>
                </div>
                
                <div className="document-content">
                  <h3 className="document-title">{doc.title}</h3>
                  <p className="document-description">{doc.description}</p>
                  
                  <div className="document-meta">
                    <span className="document-type">{doc.type}</span>
                    <span className="document-size">{doc.size}</span>
                  </div>
                </div>
                
                <CyberButton 
                  onClick={() => {
                    if (doc.downloadUrl) {
                      window.open(doc.downloadUrl, '_blank');
                    }
                  }}
                  disabled={!doc.downloadUrl}
                >
                  {doc.downloadUrl ? 'Download ⬇️' : 'Not Available'}
                </CyberButton>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;