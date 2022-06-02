import {React, useState} from 'react'
import SignIn from '../components/Signin'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const SigninPage = () => {

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <SignIn />
    </>
  )
}

export default SigninPage
