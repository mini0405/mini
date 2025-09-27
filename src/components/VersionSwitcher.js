import React from 'react';
import './VersionSwitcher.css';

const VersionSwitcher = ({ currentVersion, onVersionChange }) => {
  return (
    <div className="version-switcher">
      <div className="version-toggle">
        <button 
          className={`version-btn ${currentVersion === 'v1' ? 'active' : ''}`}
          onClick={() => onVersionChange('v1')}
        >
          V1 <span className="version-label">Classic</span>
        </button>
        <button 
          className={`version-btn ${currentVersion === 'v2' ? 'active' : ''}`}
          onClick={() => onVersionChange('v2')}
        >
          V2 <span className="version-label">Interactive</span>
        </button>
      </div>
    </div>
  );
};

export default VersionSwitcher;