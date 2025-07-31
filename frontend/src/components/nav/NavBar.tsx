import { Container, Nav, Navbar } from "react-bootstrap";
import type { User } from "../../model/user";
import { NavBarLoggedInView } from "./NavLoggedInView";
import { NavBarLoggedOutView } from "./NavLoggedOutView";
import { Link } from 'react-router-dom';

interface NavBarProps {
  loggedInUser: User | null,
  onSignupClicked: () => void,
  onLoginClicked: () => void,
  onLogoutSuccessful: () => void,
}

export function NavBar({ loggedInUser, onSignupClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) {

  return (
    <Navbar bg="primary" variant="dark" expand="md" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to={'/'}>Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar"/>
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} to={'/privacy'}>Privacy</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            { loggedInUser
              ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
              : <NavBarLoggedOutView onSignUpClicked={onSignupClicked} onLoginClicked={onLoginClicked} />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}