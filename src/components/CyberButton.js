import React from 'react';

const CyberButton = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <div className={`cyber-btn ${className}`}>
      <button className="cyber-btn-real" onClick={onClick} type={type} />
      <div className="cyber-spin cyber-spin-blur" />
      <div className="cyber-spin cyber-spin-intense" />
      <div className="cyber-btn-border">
        <div className="cyber-btn-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CyberButton;