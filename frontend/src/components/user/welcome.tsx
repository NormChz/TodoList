import type { User } from "../../model/user";
import '../../styles/global.css';
import style from '../../styles/App.module.css';

interface WelcomeProps {
  loggedInUser: User | null;
}

export function Welcome({loggedInUser}: WelcomeProps) {

  return (
    <>
    <div className={style.welcome} hidden={loggedInUser !== null}>
    <h1 style={{color: "orange"}}>&lt;/&gt;</h1>
    <h2 className="welcomeMsg" hidden={loggedInUser !== null} style={{margin: 0}} >
      HELLO stranger,<br></br> this is a MongoDB, Express, React, Node.js (aka MERN) project. It's a notes app where you can sign up and log in to create, read, update or delete (aka CRUD) your personal notes.
    </h2>
    </div>
    </>
  );
}