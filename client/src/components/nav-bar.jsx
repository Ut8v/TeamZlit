import { Navbar, Nav } from "react-bootstrap"
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const currentUrl = window.location.href;

  if(currentUrl === 'http://localhost:5173/' || currentUrl === 'http://localhost:5173/signup') {
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