import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages'
import SigninPage from './pages/signin'
import SignupPage from './pages/signup'
import TestPage from './pages/test'
import ContactPage from './pages/contact'
import Aegean from './pages/aegean'
import BlackSea from './pages/blacksea'
import EasternAnatolia from './pages/easternanatolia'
import CentalAnatolia from './pages/centalanatolia'
import Marmara from './pages/marmara'
import Mediterranean from './pages/mediterranean'
import SouthEast from './pages/southeast'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signin' element={<SigninPage />} />
          <Route exact path='/signup' element={<SignupPage />} />
          <Route exact path='/contact' element={<ContactPage />} />
          <Route exact path='/test' element={<TestPage />} />
          <Route exact path='/aegean' element={<Aegean />} />
          <Route exact path='/blacksea' element={<BlackSea />} />
          <Route exact path='/eastern-anatolia' element={<EasternAnatolia />} />
          <Route exact path='/central-anatolia' element={<CentalAnatolia />} />
          <Route exact path='/marmara' element={<Marmara />} />
          <Route exact path='/mediterranean' element={<Mediterranean />} />
          <Route exact path='/southeast-anatolia' element={<SouthEast />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )

}

export default App
