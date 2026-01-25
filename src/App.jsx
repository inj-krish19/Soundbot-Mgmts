import './index.css'
import ThemeToggle from './components/ThemeToggle'
import BackToTop from './components/BackToTop'

import SignIn from './pages/SignIn';




import Header from './components/Header';

import { BrowserRouter as Router, Route, Routes } from 'react-router';

function App() {

  return (
    <>

      <Header />

      <Router>
        <Routes>

          <Route path='/signin' element={<SignIn />} />

        </Routes>
      </Router>


      <BackToTop />
      <ThemeToggle />

    </>
  )
}

export default App
