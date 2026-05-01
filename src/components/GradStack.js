import React, { useState } from 'react';
import './GradStack.css';

const GradStack = ({ images }) => {
  const [active, setActive] = useState(null); // index of clicked/expanded panel

  const handleClick = (idx) => {
    setActive(active === idx ? null : idx); // toggle — click again to collapse
  };

  return (
    <div className="grad-gallery">
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`grad-gallery-item ${active === idx ? 'expanded' : ''}`}
          onClick={() => handleClick(idx)}
        >
          <img
            src={src}
            alt={`Graduation ${idx + 1}`}
            className="grad-gallery-img"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};

export default GradStack;
