import { Button, Navbar } from "react-bootstrap";
import type { User } from "../../model/user";
import { logout } from "../../network/usersApi";

interface NavBarLoggedInViewProps {
  user: User,
  onLogoutSuccessful: () => void,
}

export function NavBarLoggedInView({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) {

  async function logoutUser() {
    try {
      await logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">
        Signed in as {user.username}
      </Navbar.Text>
      <Button onClick={logoutUser}>Log Out</Button>
      
    </>
  );
}