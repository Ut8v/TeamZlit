import React from 'react';
import './profile-bar.css'; // Import the profile-bar styles
import profilePic from './assets/user-profile-icon.jpg'; // Import the profile picture

const ProfileBar = () => {
  return (
    <div className="profile-bar-container">
      <div className="profile-bar">
        {/* Profile Picture */}
        <img src={profilePic} alt="Profile" className="profile-pic" />
        
        {/* Profile Info */}
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
