import { InputBase, styled, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Login() {
  const Input = styled(InputBase)`
    margin-top: 5%;
  `;

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      if (response.status === 200 && response.data.token) {
        console.log('Login successful');
        navigate('/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <input
      variant="outlined"
        placeholder='username'
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        placeholder='password'
        type='password'
        onChange={(e) => setpassword(e.target.value)}
      />
      <Button variant='contained' onClick={login}>
        Login
      </Button>

      <p>
        If You Haven't Register
        <Link to='/register'> Register </Link>
      </p>
    </>
  );
}

export default Login;
