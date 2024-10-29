import React from 'react';
import '../styles/profile-bar.css';
import profilePic from '../assets/user-profile-icon.jpg';

const ProfileBar = () => {
  return (
    <div className="profile-bar-container">
      <div className="profile-bar-content">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        

        <div className="profile-info">
          <h2>John Doe</h2>
          <p>johndoe@example.com</p>
        </div>
        
        {/* Logout Button */}
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default ProfileBar;
