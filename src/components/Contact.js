import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CyberButton from './CyberButton';
import './Contact.css';

const Contact = ({ onNavigate }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // Load Credly script
    const script = document.createElement('script');
    script.src = '//cdn.credly.com/assets/utilities/embed.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="//cdn.credly.com/assets/utilities/embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

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
      downloadUrl: 'https://website-minentle.s3.us-east-1.amazonaws.com/AWS+Certified+Solutions+Architect+-+Associate+certificate.pdf',
      credlyBadges: [
        { id: '428102de-c3ec-4350-afc2-ea2f618053c3', title: 'AWS Solutions Architect Associate' },
        { id: '0cd8e7de-9354-4c70-b168-dab3fa10586b', title: 'AWS Cloud Quest Solutions Architect' },
        { id: '3596d14b-3ced-4a74-a4f5-5cadc809e05e', title: 'AWS Cloud Quest Cloud Practitioner' }
      ]
    },
    {
      title: 'Qualification Completion Letter',
      description: 'Official completion letter for Bachelor of Engineering in Computer Engineering from CPUT',
      icon: 'school',
      type: 'PDF',
      size: '89.2 KB',
      downloadUrl: 'https://website-minentle.s3.us-east-1.amazonaws.com/Minentle+Stuurman+-+222392436.pdf'
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
                  
                  {doc.credlyBadges && (
                    <div className="certificate-embeds">
                      {doc.credlyBadges.map((badge, idx) => (
                        <div 
                          key={idx}
                          className="credly-embed"
                          data-iframe-width="150"
                          data-iframe-height="270"
                          data-share-badge-id={badge.id}
                          data-share-badge-host="https://www.credly.com"
                        ></div>
                      ))}
                    </div>
                  )}
                  
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
                  {doc.downloadUrl ? 'Download 📄' : 'Not Available'}
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