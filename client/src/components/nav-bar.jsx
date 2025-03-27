import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from '../auth/authContext';
import { Home, Search, PlusCircle, List } from 'lucide-react';

const NavigationBar = () => {
  const { token } = useAuth();
  
  const NavLink = ({ to, icon, text }) => (
    <Link 
      to={to} 
      className="nav-link flex items-center gap-3 py-3 px-4 text-white hover:bg-[#008780] transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis"
    >
      {icon}
      <span className="flex-grow">{text}</span>
    </Link>
  );

  return (
    <nav className="navbar-container fixed top-0 left-0 h-screen w-[250px] bg-[#2e5669] flex flex-col">
      <div className="flex justify-center items-center py-6">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-24 h-24 object-contain" 
        />
      </div>

      {token && (
        <div className="flex flex-col flex-grow">
          <NavLink 
            to="/home" 
            icon={<Home className="w-5 h-5 flex-shrink-0" />} 
            text="Home" 
          />
          <NavLink 
            to="/findTeam" 
            icon={<Search className="w-5 h-5 flex-shrink-0" />} 
            text="Find Team" 
          />
          <NavLink 
            to="/createTeam" 
            icon={<PlusCircle className="w-5 h-5 flex-shrink-0" />} 
            text="Create Team" 
          />
          <NavLink 
            to="/teamIndex" 
            icon={<List className="w-5 h-5 flex-shrink-0" />} 
            text="Browse Teams" 
          />
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;