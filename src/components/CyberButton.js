import React from 'react';

const CyberButton = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
  return (
    <div className={`cyber-btn ${className} ${disabled ? 'disabled' : ''}`}>
      <button className="cyber-btn-real" onClick={disabled ? undefined : onClick} type={type} disabled={disabled} />
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