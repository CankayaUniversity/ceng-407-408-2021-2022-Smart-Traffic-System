import {React,useState} from 'react'
import Form from '../components/Signup/Form'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const SignupPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Form />
    </>
  )
}

export default SignupPage
