import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/index'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../features/authSlice'

import {
  FormButton,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  Container,
  FormWrap,
  Icon,
  Form,
  Text,
} from './SigninElements'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

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

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }


  return (
    <>
      <Container>
        <FormWrap>
          <Icon to='/'>Smart Traffic Systems</Icon>

          <FormContent>
            <Form onSubmit={onSubmit}>
              <FormH1>Sign in to your account</FormH1>
              <FormLabel htmlFor='for'>E-mail</FormLabel>
              <FormInput
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                onChange={onChange}
              />
              <FormLabel htmlFor='for'>Password</FormLabel>
              <FormInput type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={onChange}
              />
              <FormButton type='submit'>Continue</FormButton>
              {/* <Text to='/signup'>Forgot passoword</Text> */}
              {/* <Text to='/signup'>You don't have an account yet ?</Text> */}
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  )
}

export default SignIn
