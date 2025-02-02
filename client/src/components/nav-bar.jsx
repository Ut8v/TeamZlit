import { Navbar, Nav } from "react-bootstrap"
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import React, {useEffect, useState} from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const baseUrl = import.meta.env.VITE_BASE
const signupUrl = baseUrl + 'signup'

const NavigationBar = () => {

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

  const currentUrl = window.location.href;

  if(currentUrl === baseUrl || currentUrl === signupUrl) {
    return null
  } else {
    return(
        <Navbar className="navbar-container d-flex flex-column align-items-start">
        <Navbar.Brand>
          <img src={logo} alt="Logo" className="d-inline-block align-top logo-pic" />
        </Navbar.Brand>
        <Nav className="nav-bar">
            <Link to="/Home" className="nav-link">Home</Link>
            <Link to="/page1" className="nav-link">Page 1</Link>
            <Link to="/findTeam" className="nav-link">Find Team</Link>
            <Link to="/createTeam" className="nav-link">Create Team</Link>
            <Link to="/createUser" className="nav-link">Create User</Link>
        </Nav>
      </Navbar>
    )
  }
}

export default NavigationBar;