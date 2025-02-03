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
    <ul className="list-group">
      <li className="list-group-item">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li className="list-group-item">
        <Link to="/profile" className="nav-link">Profile</Link>
      </li>
      <li className="list-group-item">
        <Link to="/findTeam" className="nav-link">Find Team</Link>
      </li>
      <li className="list-group-item">
        <Link to="/createTeam" className="nav-link">Create Team</Link>
      </li>
      <li className="list-group-item">
        <Link to="/teamPage" className="nav-link">Create Team</Link>
      </li>
    </ul>
  </Nav>
</Navbar>

    )
}

export default NavigationBar;