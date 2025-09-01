import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AnimatedGreeting.css';

const AnimatedGreeting = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate bounces based on screen width
  const getBouncePoints = () => {
    const bounces = Math.max(6, Math.floor(screenWidth / 150)); // More bounces on wider screens
    const points = [];
    const yPoints = [];
    const scalePoints = [];
    const rotatePoints = [];
    
    for (let i = 0; i <= bounces; i++) {
      const progress = i / bounces;
      points.push(progress * 100); // 0% to 100% across screen
      
      // Decreasing bounce height
      const bounceHeight = i === 0 || i === bounces ? 0 : -50 + (i * 5); // Gets smaller
      yPoints.push(bounceHeight);
      
      // Scale compression on bounce
      const scaleValue = i === 0 || i === bounces ? 1 : (i % 2 === 0 ? 1.1 : 0.95);
      scalePoints.push(scaleValue);
      
      // Rotation as it bounces
      const rotateValue = i === 0 ? 0 : (i % 2 === 0 ? 10 : -10);
      rotatePoints.push(rotateValue);
    }
    
    return { x: points, y: yPoints, scale: scalePoints, rotate: rotatePoints };
  };

  // All 11 South African official languages
  const greetings = [
    { text: 'Molo', welcome: 'Wamkelekile', language: 'Xhosa' },
    { text: 'Sawubona', welcome: 'Wamukelekile', language: 'Zulu' },
    { text: 'Dumela', welcome: 'O amogelehile', language: 'Tswana' },
    { text: 'Avuxeni', welcome: 'Ku amukelekile', language: 'Tsonga' },
    { text: 'Ndaa', welcome: 'Ni amukele', language: 'Venda' },
    { text: 'Dumela', welcome: 'O amohelehile', language: 'Sesotho' },
    { text: 'Sawubona', welcome: 'Siyakwamukela', language: 'Ndebele' },
    { text: 'Lotjhani', welcome: 'Le amogetšwe', language: 'Sepedi' },
    { text: 'Avuxeni', welcome: 'Swa ku amukela', language: 'Siswati' },
    { text: 'Hallo', welcome: 'Welkom', language: 'Afrikaans' },
    { text: 'Hello', welcome: 'Welcome', language: 'English' }
  ];

  // Static greetings for top
  const staticGreetings = {
    sasl: '👋🤟✋', // SASL hand signs for hello
    braille: '⠓⠑⠇⠇⠕' // Braille for "hello"
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [greetings.length]);

  const bouncePoints = getBouncePoints();
  
  const bounceVariants = {
    initial: { 
      x: '-10vw', 
      y: 0,
      opacity: 0, 
      scale: 0.8,
      rotate: -15
    },
    animate: { 
      x: bouncePoints.x.map(point => `${point}vw`),
      y: bouncePoints.y,
      opacity: 1, 
      scale: bouncePoints.scale,
      rotate: bouncePoints.rotate,
      transition: {
        duration: 3.5, // Slower speed
        ease: "easeOut"
      }
    },
    exit: { 
      x: '110vw', 
      y: -20,
      opacity: 0, 
      scale: 0.6,
      rotate: 20,
      transition: {
        duration: 1,
        ease: "easeIn"
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="animated-greeting">
      {/* Static SASL and Braille at top */}
      <div className="static-greetings">
        <motion.div 
          className="sasl-greeting"
          variants={floatVariants}
          animate="animate"
        >
          <span className="greeting-text">{staticGreetings.sasl}</span>
          <span className="greeting-label">SASL</span>
        </motion.div>
        
        <motion.div 
          className="braille-greeting"
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 1.5 }}
        >
          <span className="greeting-text braille-text">{staticGreetings.braille}</span>
          <span className="greeting-label">Braille</span>
        </motion.div>
      </div>

      {/* Animated bouncing greetings */}
      <div className="bouncing-greetings">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGreeting}
            className="bouncing-greeting"
            variants={bounceVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <span className="greeting-text main-greeting">
              {greetings[currentGreeting].text}
            </span>
            <span className="greeting-language">
              {greetings[currentGreeting].welcome}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating particles for extra effect */}
      <div className="greeting-particles">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [-20, -40, -20],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedGreeting;