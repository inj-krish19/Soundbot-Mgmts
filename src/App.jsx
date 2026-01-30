import './index.css'
import ThemeToggle from './components/ThemeToggle'
import BackToTop from './components/BackToTop'

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';



import Header from './components/Header';


import Verification from './pages/Verification';
import ResetPassword from './pages/ResetPassword';


import { BrowserRouter as Router, Route, Routes } from 'react-router';
import useAuth from './store/AuthStore';
import { useEffect } from 'react';

function App() {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const setAuth = useAuth((state) => state.setAuth);

  useEffect(() => {

    (async () => {

      let response = await fetch(`${BACKEND_URL}/auth/me`, {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        credentials: 'include'
      });

      let res = await response.json();
      setAuth(res['authenticated']);

      console.log(res);

    })();

  }, []);

  return (
    <>

      <Router>

        <Header />
        <Routes>

          <Route path='/verification' element={<Verification />} />
          <Route path='/auth/signup/:hash' element={<SignUp />} />
          <Route path='/auth/signin/:hash' element={<SignIn />} />

          <Route path='/auth/reset-password/:hash' element={<ResetPassword />} />

        </Routes>

        <BackToTop />
        <ThemeToggle />

      </Router>

    </>
  )
}

export default App
