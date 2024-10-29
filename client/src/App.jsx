import NavigationBar from './components/nav-bar';
import './App.css';
import './styles/nav-bar.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import { FormToFindTeam } from './components/ui/formToFindTeam';
import ProfileBar from './components/ProfileBar'; 

import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Left Navigation Bar */}
      <div className="navigation-bar">
        <NavigationBar />
      </div>

      {/* Main page content */}
      <div className="page-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/findTeam" element={<FormToFindTeam />} />
          </Routes>
        </BrowserRouter>
      </div>

      {/* Right Profile Bar */}
      <div className="profile-bar">
        <ProfileBar />
      </div>
    </div>
  );
}

export default App;
