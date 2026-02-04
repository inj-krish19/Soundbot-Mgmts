import Layout from './Layout'
import useAuth from './store/AuthStore';
import ErrorBoundary from './ErrorBoundary';


import { useEffect, useState } from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';



import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

import Verification from './pages/Verification';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import ResetPassword from './pages/ResetPassword';

import SignOut from './pages/SignOut';
import Loading from './pages/Loading';

import Error from './pages/Error';
import Warning from './pages/Warning';
import Success from './pages/Success';





function App() {

  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const setAuth = useAuth((state) => state.setAuth);

  useEffect(() => {

    (async () => {

      try {
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
      } catch (err) {
      } finally {
        setLoading(false);
      }

    })();

  }, []);

  if (loading) return <Loading />

  return (
    <>

      <ErrorBoundary>
        <Router>
          <Suspense fallback={<Loading />} >


            <Routes>

              <Route element={<Layout />}>

                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />

                <Route path='/verification' element={<Verification />} />
                <Route path='/auth/signup/:hash' element={<SignUp />} />
                <Route path='/auth/signin/:hash' element={<SignIn />} />

                <Route path='/auth/reset-password/:hash' element={<ResetPassword />} />

                <Route path='/loading' element={<Loading />} />
                <Route path='/signout' element={<SignOut />} />

                <Route path='/success' element={<Success />} />
                <Route path='/error' element={<Error />} />
                <Route path='/warning' element={<Warning />} />

              </Route>

            </Routes>


          </Suspense>
        </Router>
      </ErrorBoundary>
    </>
  )
}

export default App;