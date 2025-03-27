import { Link } from 'react-router-dom';
import '../styles/profile-bar.css';
import profilePic from '../assets/user-profile-icon.jpg';
import { useAuth } from '../auth/authContext'
import { useNavigate } from 'react-router-dom';
import NotificationPopover from './notification/notification';
import { User, FileText, Users, LogOut } from 'lucide-react';

const ProfileBar = () => {
  const Navigate = useNavigate();
  const { logout, token, user } = useAuth();

  const handleLogout = () => {
    logout();
    Navigate('/');
  }

  const ProfileBarButton = ({ icon, text, to }) => (
    <Link to={to} className="w-full no-underline">
      <button className="profile-button flex items-center justify-center gap-2">
        {icon}
        {text}
      </button>
    </Link>
  );

  return (
    <div className="profile-bar-container">
      {token && (
        <div className="profile-bar-content">
          <div>
            <div className="flex flex-col items-center mb-6">
              <img 
                src={profilePic} 
                alt="Profile" 
                className="profile-pic mb-4" 
              />
              <div className="profile-info text-center">
                <h2 className="text-xl font-bold">{user}</h2>
              </div>
            </div>

            <div className="w-full space-y-4">
              <ProfileBarButton 
                icon={<User className="w-5 h-5" />} 
                text="View Profile" 
                to="/profile" 
              />
              
              <ProfileBarButton 
                icon={<FileText className="w-5 h-5" />} 
                text="My Forms" 
                to="/myForms" 
              />
              
              <ProfileBarButton 
                icon={<Users className="w-5 h-5" />} 
                text="User List" 
                to="/userList" 
              />
            </div>
          </div>

          <button 
            className="logout-button flex items-center justify-center gap-2 w-full mt-auto"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileBar;