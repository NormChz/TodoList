import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { NavBar } from './components/nav/NavBar';
import { NotesPageLoggedInView } from './pages/NotesPageLoggedInView';
import { LoginDialog } from './components/user/loginDialog';
import { SignupDialog } from './components/user/signupDialog';
import type { User } from './model/user';
import './styles/App.css';
import style from './styles/App.module.css';
// import { Welcome } from './components/user/welcome';
import { getLoggedinUser } from './network/usersApi';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Welcome } from './components/user/welcome';


function App() {

  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  // with a page refresh, this will look for a session id
  useEffect(() => {
    async function checkLoggedInUser() {

      try {
        const loggedInUser = await getLoggedinUser();
        setLoggedInUser(loggedInUser);
      } catch (error) {
        console.error('Failed to fetch logged in user: ', error)
        setLoggedInUser(null);
      }
    }
    checkLoggedInUser();
  }, [])

  const handleUserSignup = (user: User) => {
    setLoggedInUser(user);
    setShowSignup(false);
  }

  const handleUserLogin = (user: User) => {
    setLoggedInUser(user)
    setShowLogin(false);
  }

  return (
    <BrowserRouter>
      <div className={style.mainAppWrapper}>
        <NavBar
          loggedInUser={loggedInUser}
          onSignupClicked={() => { setShowSignup(true) }} // OPEN THE SIGNUP PROMPT (1)
          onLoginClicked={() => { setShowLogin(true) }} // OPEN THE LOGIN PROMPT (2)
          onLogoutSuccessful={() => { setLoggedInUser(null) }} // LOGOUT 
        />
        <Container className={style.pageContainer}>
          <Routes>
            <Route path='/' element={<div className={style.boo}> <NotesPageLoggedInView loggedInUser={loggedInUser} /> <Welcome loggedInUser={loggedInUser}/> </div>}></Route>
            <Route path='/privacy' element={<PrivacyPage />}></Route>
            <Route path='/*' element={<NotFoundPage />}></Route>
          </Routes>
        </Container>
        <SignupDialog // SIGNUP PROMPT (1)
          show={showSignup}
          onDismissDialog={() => setShowSignup(false)}
          onSignUpSuccessful={(user) => handleUserSignup(user)} />
        <LoginDialog // LOGIN PROMPT (2)
          show={showLogin}
          onDismissDialog={() => setShowLogin(false)}
          onLoginSuccessful={(user) => handleUserLogin(user)} />
      </div>
    </BrowserRouter>
  )
}

export default App
