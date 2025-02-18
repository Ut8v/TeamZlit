import { Link } from 'react-router-dom'; // Import Link
import '../styles/profile-bar.css';
import profilePic from '../assets/user-profile-icon.jpg';
import { useAuth } from '../auth/authContext'
import { useNavigate } from 'react-router-dom';

const ProfileBar = () => {
  const Navigate = useNavigate();
  const { logout, token, user } = useAuth();

  const handleLogout = () => {
    logout();
    Navigate('/');
  }
  return (
    <div className="profile-bar-container">
      {token &&
      <div className="profile-bar-content">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <div className="profile-info">
        <h2>{user}</h2>
        </div>

        <Link to="/profile">
          <button className="profile-button">View Profile</button>
        </Link>

        <button className="logout-button" onClick={(handleLogout)}>Logout</button>
      </div>
      }
    </div>
  );
};


export default ProfileBar;
