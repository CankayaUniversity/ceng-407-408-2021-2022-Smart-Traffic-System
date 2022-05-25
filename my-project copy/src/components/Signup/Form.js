import React, { useState } from 'react'
import Signup from './signup'
import FormSuccess from '../Signup/FormSuccess'
import './Form.css'
import Navbar from '../Navbar/index'
const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  function submitForm() {
    setIsSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img src='img/img-2.svg' alt='spaceship' className='form-img' />
        </div>
        {!isSubmitted ? <Signup submitForm={submitForm} /> : <FormSuccess />}
      </div>
    </>
  )
}

export default Form
