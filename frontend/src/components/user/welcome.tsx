import type { User } from "../../model/user";
import '../../styles/global.css'

interface WelcomeProps {
  loggedInUser: User | null;
}

export function Welcome({loggedInUser}: WelcomeProps) {

  return (
    <h1 className="welcomeMsg" hidden={loggedInUser !== null}>
      Sign up or log in!
    </h1>
  );
}