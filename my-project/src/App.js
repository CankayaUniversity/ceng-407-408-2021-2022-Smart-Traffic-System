import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages'
import SigninPage from './pages/signin'
import SignupPage from './pages/signup'
import TestPage from './components/Regions/Test'
import ContactPage from './pages/contact'
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
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )

}

export default App
