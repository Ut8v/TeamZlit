import { Navbar, Nav } from "react-bootstrap"
import logo from "../assets/logo.png";

const NavigationBar = () => {
    return(
        <Navbar className="navbar-container d-flex flex-column align-items-start">
        <Navbar.Brand>
          <img src={logo} alt="Logo" className="d-inline-block align-top logo-pic" />
        </Navbar.Brand>
        <Nav className="nav-bar">
          <Nav.Link href="/" className="nav-link">Home</Nav.Link>
          <Nav.Link href="/page1" className="nav-link">Page 1</Nav.Link>
          <Nav.Link href="/findTeam" className="nav-link">Find Team</Nav.Link>
        </Nav>
      </Navbar>
    )
}

export default NavigationBar;