import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/index'

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

const SignIn = ({ setLoginUser }) => {
  const history = useNavigate()
  const [user, setUser] = useState({
    name: '',
    password: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user, //spread operator
      [name]: value,
    })
  }

  const login = () => {
    axios.post('http://localhost:5000/Login', user).then((res) => {
      alert(res.data.message)
      setLoginUser(res.data.user)
      history.push('/')
    })
  }

  return (
    <>
      <Navbar />
      <Container>
        <FormWrap>
          <Icon to='/'>Smart Traffic Systems</Icon>

          <FormContent>
            <Form action='#'>
              <FormH1>Sign in to your account</FormH1>
              <FormLabel htmlFor='for'>E-mail</FormLabel>
              <FormInput type='email' required />
              <FormLabel htmlFor='for'>Password</FormLabel>
              <FormInput type='password' required />
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
