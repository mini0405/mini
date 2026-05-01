import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

// ── BlurText ─────────────────────────────────────────────────────────────────
const BlurText = ({ text, delay = 50, animateBy = 'words', direction = 'top', className = '', style }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const segments = useMemo(() =>
    animateBy === 'words' ? text.split(' ') : text.split(''),
    [text, animateBy]
  );

  return (
    <p ref={ref} className={`blur-text-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            filter: inView ? 'blur(0px)' : 'blur(10px)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : `translateY(${direction === 'top' ? '-20px' : '20px'})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}{animateBy === 'words' && i < segments.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
};

// ── Typewriter tagline ────────────────────────────────────────────────────────
const phrases = [
  'Engineer',
  'Technologist',
  'Builder',
  'Solver',
  'Lifelong Learner',
];

const Typewriter = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex]);

  return (
    <span className="hero-v2-tagline-text">
      {displayed}<span className="hero-v2-cursor">|</span>
    </span>
  );
};

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = ({ onNavigate }) => {

  return (
    <section className="hero-v2">

      {/* ── Header ── */}
      <header className="hero-v2-header">
        <nav className="hero-v2-nav">
          <div className="hero-v2-signature">M</div>
        </nav>
      </header>

      {/* ── Centered name ── */}
      <div className="hero-v2-center">
        <div className="hero-v2-name-block">
          <BlurText
            text="MINENTLE"
            delay={80}
            animateBy="letters"
            direction="top"
            className="hero-v2-name"
          />
          <BlurText
            text="STUURMAN"
            delay={80}
            animateBy="letters"
            direction="top"
            className="hero-v2-name"
          />

          {/* Profile picture sits between the two name lines */}
          <div className="hero-v2-avatar-wrap">
            <div className="hero-v2-avatar">
              <img
                src="/images/stuurmin.jpg"
                alt="Minentle Stuurman"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Tagline typewriter ── */}
      <div className="hero-v2-tagline">
        <Typewriter />
      </div>

      {/* ── Scroll indicator ── */}
      <button
        className="hero-v2-scroll"
        aria-label="Scroll down"
        onClick={() => onNavigate('about')}
      >
        <ChevronDown size={32} />
      </button>

    </section>
  );
};

export default Hero;
