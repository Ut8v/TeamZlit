import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import NavBar from './components/nav-bar';
import ProfileBar from './components/ProfileBar'; // Ensure the exact case is used

import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Left Navigation Bar */}
      <div className="navigation-bar">
        <NavBar />
      </div>

      {/* Main page content */}
      <div className="page-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page1" element={<Page1 />} />
          </Routes>
        </BrowserRouter>
      </div>

      {/* Right Profile Bar */}
      <ProfileBar />
    </div>
  );
}

export default App;
