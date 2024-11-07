import { Navbar, Nav } from "react-bootstrap"
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const NavigationBar = () => {
    return(
        <Navbar className="navbar-container d-flex flex-column align-items-start">
        <Navbar.Brand>
          <img src={logo} alt="Logo" className="d-inline-block align-top logo-pic" />
        </Navbar.Brand>
        <Nav className="nav-bar">
        <Link to="/" className="nav-link">Home</Link>
            <Link to="/page1" className="nav-link">Page 1</Link>
            <Link to="/findTeam" className="nav-link">Find Team</Link>
            <Link to="/createTeam" className="nav-link">Create Team</Link>
        </Nav>
      </Navbar>
    )
}

export default NavigationBar;