import Layout from './Layout'
import useAuth from './store/AuthStore';
import ErrorBoundary from './ErrorBoundary';


import { useEffect, useState } from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';



const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const Charging = lazy(() => import('./pages/Charging'));
const Sessions = lazy(() => import('./pages/Sessions'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const Verification = lazy(() => import('./pages/Verification'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));

const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));
const ChangeEmail = lazy(() => import('./pages/ChangeEmail'));

const SignOut = lazy(() => import('./pages/SignOut'));
import Loading from './pages/Loading'

const Error = lazy(() => import('./pages/Error'));
const Warning = lazy(() => import('./pages/Warning'));
const Success = lazy(() => import('./pages/Success'));





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

                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/charging' element={<Charging />} />
                <Route path='/sessions' element={<Sessions />} />

                <Route path='/verification' element={<Verification />} />
                <Route path='/auth/signup/:hash' element={<SignUp />} />
                <Route path='/auth/signin/:hash' element={<SignIn />} />

                <Route path='/auth/reset-password/:hash' element={<ResetPassword />} />
                <Route path='/auth/change-password/:hash' element={<ChangePassword />} />
                <Route path='/auth/email/:hash' element={<ChangeEmail />} />

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