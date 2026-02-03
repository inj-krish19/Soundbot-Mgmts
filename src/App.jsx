import ThemeToggle from './components/ThemeToggle'
import BackToTop from './components/BackToTop'

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

import Verification from './pages/Verification';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import ChangeEmail from './pages/ChangeEmail';

import SignOut from './pages/SignOut';
import Setting from './pages/Setting';

import Error from './pages/Error';
import Warning from './pages/Warning';
import Success from './pages/Success';



import Header from './components/Header';
import Footer from './components/Footer';




import { BrowserRouter as Router, Route, Routes } from 'react-router';
import useAuth from './store/AuthStore';
import { useEffect } from 'react';
import Warning from './pages/Warning';

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

        <main className='flex flex-col h-full min-h-screen w-full justify-around '>

          <Header />
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />

            <Route path='/verification' element={<Verification />} />
            <Route path='/auth/signup/:hash' element={<SignUp />} />
            <Route path='/auth/signin/:hash' element={<SignIn />} />

            <Route path='/auth/reset-password/:hash' element={<ResetPassword />} />
            <Route path='/signout' element={<SignOut />} />

            <Route path='/success' element={<Success />} />
            <Route path='/error' element={<Error />} />
            <Route path='/warning' element={<Warning />} />

          </Routes>

          <Footer />
          <BackToTop />
          <ThemeToggle />

        </main>


      </Router>

    </>
  )
}

export default App
