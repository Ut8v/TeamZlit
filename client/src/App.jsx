import NavigationBar from './components/nav-bar';
import './App.css';
import './styles/nav-bar.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import FormToFindTeamComponent from './components/ui/formToFindTeam';
import FormToCreateTeamComponent from './components/ui/formToCreateTeam';
import FormToCreateUserComponent from './components/ui/formToCreateUser';
import ProfileBar from './components/ProfileBar'; 
import { Toaster } from "@/components/ui/toaster"
import React, {useEffect, useState} from 'react'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

function App() {
  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('item')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

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
            <Route path="/page1" element={<Page1 />} />
            <Route path="/findTeam" element={<FormToFindTeamComponent />} />
            <Route path="/createTeam" element={<FormToCreateTeamComponent />} />
            <Route path="/createUser" element={<FormToCreateUserComponent />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path={'/'} element={<Login setToken={setToken} />} />
            {token?<Route path={'/home'} element={<Home token={token} />} />:""}
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
