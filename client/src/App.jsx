import NavigationBar from './components/nav-bar';
import './App.css';
import './styles/nav-bar.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import FormToFindTeamComponent from './components/ui/formToFindTeam';
import FormToCreateTeamComponent from './components/ui/formToCreateTeam';
import ProfileBar from './components/ProfileBar'; 
import { Toaster } from "@/components/ui/toaster";
import TeamPage from './pages/teamPage'

import './App.css';

function App() {
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
            <Route path="/" element={<Home />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/findTeam" element={<FormToFindTeamComponent />} />
            <Route path="/createTeam" element={<FormToCreateTeamComponent />} />
            <Route path="/teamPage"   element={<TeamPage />} />
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
