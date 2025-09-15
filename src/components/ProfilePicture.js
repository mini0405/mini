import React from 'react';
import './ProfilePicture.css';

const ProfilePicture = ({ className = '' }) => {
  return (
    <div className={`profile-picture ${className}`}>
      <div className="profile-sphere">
        <img 
          src="/images/stuurmin.jpg" 
          alt="Minentle Stuurman" 
          className="profile-image"
        />
        <div className="tube-light-brown"></div>
      </div>
    </div>
  );
};

export default ProfilePicture;