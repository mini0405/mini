import React from 'react';

const CyberButton = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
  return (
    <div className={`cyber-btn ${className}`}>
      <div className="cyber-btn-border">
        <button
          className="cyber-btn-content"
          onClick={disabled ? undefined : onClick}
          type={type}
          disabled={disabled}
        >
          {children}
        </button>
      </div>
    </div>
  );
};

export default CyberButton;
