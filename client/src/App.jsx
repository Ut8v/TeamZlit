import NavigationBar from './components/nav-bar';
import './App.css';
import './styles/nav-bar.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import FormToFindTeamComponent from './components/ui/formToFindTeam';
import FormToCreateTeamComponent from './components/ui/formToCreateTeam';
import ProfileBar from './components/ProfileBar'; 
import { Toaster } from "@/components/ui/toaster"
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import TeamPage from './pages/teamPage'
import TeamIndex from './pages/teamIndex'
import { useAuth } from './auth/authContext';
import UserProfile from './pages/userProfile';
import MyForm from './pages/MyForm';
import UserListPage from './pages/userList';
import UserPage from './pages/userPage';
import PostIndex from './pages/postIndex'
import PostPage from './pages/postPage'
import Loader from './components/loading/loader';


function App() {
  const { token, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
    <div className="app-container">
      {/* Left Navigation Bar */}
      <div className="navigation-bar">
        <NavigationBar />
      </div>

      {/* Main page content */}
      <div className="page-content">
      <Routes>
        {!token ? (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/findTeam" element={<FormToFindTeamComponent />} />
            <Route path="/createTeam" element={<FormToCreateTeamComponent />} />
            <Route path="/teamPage/:id" element={<TeamPage />} />
            <Route path="/teamIndex" element={<TeamIndex />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/myForms" element={<MyForm />} />
            <Route path="/userList" element={<UserListPage />} />
            <Route path="/userPage/:id" element={<UserPage />} />
            <Route path="/postIndex" element={<PostIndex />} />
            <Route path="/postPage/:id" element={<PostPage />} />
            <Route path="*" element={<Navigate to="/home" />} /> {/* fallback only for unmatched routes */}
          </>
        )}
      </Routes>
      </div>
      {/* Right Profile Bar */}
      <div className="profile-bar">
        <ProfileBar />
      </div>

      <Toaster />
    </div>
    </BrowserRouter>
  );
}

export default App;
