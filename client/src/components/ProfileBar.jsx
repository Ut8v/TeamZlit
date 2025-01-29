import React, {useEffect, useState} from 'react'
import '../styles/profile-bar.css';
import profilePic from '../assets/user-profile-icon.jpg';
import { useNavigate } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const ProfileBar = () => {

  async function getToken() {
    const { data: { user } } = await supabase.auth.getUser()   
    return user
  }

  const user = getToken()
  console.log(user)

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

  let navigate = useNavigate()

  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
}

const currentUrl = window.location.href;

if(currentUrl === 'http://localhost:5173/' || currentUrl === 'http://localhost:5173/signup') {
  return null
} else {
  return (
    <div className="profile-bar-container">
      <div className="profile-bar-content">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        
        <div className="profile-info">
        <h2>John Doe</h2>
        <p>johndoe@example.com</p>
        </div>
        
        <button className="logout-button" onClick={(handleLogout)}>Logout</button>
      </div>
    </div>
  );
};
}

export default ProfileBar;
