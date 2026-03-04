import Layout from '@/Layout'
import useAuth from '@/store/AuthStore';
import ErrorBoundary from './ErrorBoundary';


import { Suspense, lazy } from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';



const Home = lazy(() => import('@/pages/main/Home'));
const About = lazy(() => import('@/pages/main/About'));
const Contact = lazy(() => import('@/pages/main/Contact'));


const Charging = lazy(() => import('@/pages/dashboard/Charging'));
const Sessions = lazy(() => import('@/pages/dashboard/Sessions'));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));



const SignUp = lazy(() => import('@/pages/auth/SignUp'));
const SignIn = lazy(() => import('@/pages/auth/SignIn'));
const SignOut = lazy(() => import('@/pages/auth/SignOut'));

const ChangeEmail = lazy(() => import('@/pages/auth/ChangeEmail'));
const Verification = lazy(() => import('@/pages/auth/Verification'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'));
const ChangePassword = lazy(() => import('@/pages/auth/ChangePassword'));


import Loading from '@/pages/system/Loading'
const Error = lazy(() => import('@/pages/system/Error'));
const Warning = lazy(() => import('@/pages/system/Warning'));
const Success = lazy(() => import('@/pages/system/Success'));





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
        setAuth(Boolean(res['authenticated']));

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


                <Route path='/signout' element={<SignOut />} />
                <Route path='/auth/signup/:hash' element={<SignUp />} />
                <Route path='/auth/signin/:hash' element={<SignIn />} />


                <Route path='/verification' element={<Verification />} />
                <Route path='/auth/email/:hash' element={<ChangeEmail />} />
                <Route path='/auth/reset-password/:hash' element={<ResetPassword />} />
                <Route path='/auth/change-password/:hash' element={<ChangePassword />} />


                <Route path='/error' element={<Error />} />
                <Route path='/warning' element={<Warning />} />
                <Route path='/loading' element={<Loading />} />
                <Route path='/success' element={<Success />} />


              </Route>

            </Routes>


          </Suspense>
        </Router>
      </ErrorBoundary>
    </>
  )
}

export default App;