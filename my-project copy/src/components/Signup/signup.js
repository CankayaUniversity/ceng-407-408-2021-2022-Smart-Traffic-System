import { useState, useEffect } from 'react'

import validate from './validateInfo'
import axios from "axios"
import './Form.css'
import { toast } from 'react-toastify'
import { register, reset } from '../../features/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Signup = ({ submitForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }


  return (
    <div className='form-content-right'>
      <form onSubmit={onSubmit} className='form' noValidate>
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            id='name'
            name='name'
            placeholder='Enter your username'
            value={name}
            onChange={onChange}
          />
          
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={onChange}
          />
       
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            value={password}
            onChange={onChange}
          />
         
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            id='password2'
            name='password2'
            placeholder='Confirm your password'
            value={password2}
            onChange={onChange}
          />
        
        </div>
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
          Already have an account? Login{' '}
          <a href='/signin' target='_self'>
            here
          </a>
        </span>
      </form>
    </div>
  )
}

export default Signup
