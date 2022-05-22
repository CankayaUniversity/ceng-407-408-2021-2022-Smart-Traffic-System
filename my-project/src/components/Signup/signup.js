import React, {useState} from 'react'
import useForm from './useForm'
import validate from './validateInfo'
import axios from "axios"
import './Form.css'


const Signup = ({ submitForm }) => {
  const {handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  )

  const [user,setUser] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user, //spread operator
      [name]: value,
    })
  }
  //register function
  const egister = () => {
    const { name, email, password } = user
    if (name && email && password) {
      axios
        .post('http://localhost:5000/Register', user)
        .then((res) => console.log(res))
    } else {
      alert('invalid input')
    }
  }

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
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
