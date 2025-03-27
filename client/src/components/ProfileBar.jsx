import { Link } from 'react-router-dom'; // Import Link
import '../styles/profile-bar.css';
import profilePic from '../assets/user-profile-icon.jpg';
import { useAuth } from '../auth/authContext'
import { useNavigate } from 'react-router-dom';
import NotificationPopover from './notification/notification';

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
      <><div className="profile-bar-content">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <h2>{user}</h2>
          </div>

          <Link to="/profile">
            <button className="profile-button">View Profile</button>
          </Link>

          <button className="logout-button" onClick={(handleLogout)}>Logout</button>
          <hr />
          <div className="form-button">
            <Link to="/myForms">
              <button className="myform-button">My Form</button>
            </Link>
          </div>
          <div className="form-button">
            <Link to="/userList">
              <button className="myform-button">User List</button>
            </Link>
          </div>
        </div>
        <div className="notification-icon" style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', borderRadius: '50%', padding: '10px' }}>
        <NotificationPopover />
        </div>
        </>
      }
    </div>
    
  );
};


export default ProfileBar;
