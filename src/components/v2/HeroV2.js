import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Center, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import CyberButton from '../CyberButton';
import './HeroV2.css';

function FloatingText() {
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <Center>
        <Text
          fontSize={1}
          color="#f50"
          anchorX="center"
          anchorY="middle"
        >
          MINI
        </Text>
      </Center>
    </Float>
  );
}

const HeroV2 = ({ onNavigate }) => {
  return (
    <section className="hero-v2 section">
      <div className="hero-v2-container">
        <div className="hero-3d-scene">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <FloatingText />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Suspense>
          </Canvas>
        </div>
        
        <motion.div 
          className="hero-v2-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="hero-v2-title">
            Welcome to my <span className="gradient-text">Interactive Journey</span>
          </h1>
          
          <p className="hero-v2-subtitle">
            Choose your path to explore my story
          </p>
          
          <div className="hero-v2-paths">
            <CyberButton onClick={() => onNavigate('about')}>
              🎯 Recruiter Path
            </CyberButton>
            <CyberButton onClick={() => onNavigate('skills')}>
              💻 Developer Path
            </CyberButton>
            <CyberButton onClick={() => onNavigate('projects')}>
              🚀 Explorer Path
            </CyberButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroV2;