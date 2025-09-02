import React, { useState, useEffect } from 'react';
import './TypewriterGreeting.css';

const TypewriterGreeting = () => {
  const greetings = [
    'Molo', // Xhosa
    'Sawubona', // Zulu
    'Dumela', // Tswana
    'Avuxeni', // Tsonga
    'Ndaa', // Venda
    'Lotjhani', // Pedi
    'Sanibonani', // Ndebele
    'Thobela', // Northern Sotho
    'Dumelang', // Southern Sotho
    'Hallo', // Afrikaans
    'Hello', // English
    '👋', // SASL
    '⠓⠑⠇⠇⠕' // Braille
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentGreeting = greetings[currentIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setDisplayText(currentGreeting.substring(0, displayText.length - 1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % greetings.length);
        }
      } else {
        setDisplayText(currentGreeting.substring(0, displayText.length + 1));
        
        if (displayText === currentGreeting) {
          setIsPaused(true);
        }
      }
    }, isPaused ? 2000 : isDeleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [currentIndex, displayText, isDeleting, isPaused, greetings]);

  return (
    <span className="typewriter-greeting">
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

export default TypewriterGreeting;