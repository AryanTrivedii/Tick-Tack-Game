import React, { useState } from 'react';
import { TextField, Button ,styled} from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom';;
function Register() {
  const [user, setuser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
  });
  const navigate= useNavigate();
  const signup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', user);
      if (response.status === 201) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <TextField
        placeholder="firstname"
        variant="outlined"
        onChange={(e) => setuser({ ...user, firstname: e.target.value })}
      />

      <TextField
        placeholder="lastname"
        variant="outlined"
        onChange={(e) => setuser({ ...user, lastname: e.target.value })}
      />
      <TextField
        placeholder="username"
        variant="outlined"
        onChange={(e) => setuser({ ...user, username: e.target.value })}
      />

      <TextField
        placeholder="password"
        variant="outlined"
        onChange={(e) => setuser({ ...user, password: e.target.value })}
      />
      <Button onClick={signup}>Register</Button>

      <p>Lets Login<Link to='/login'> Login</Link> </p>
  
   
   
    </>
  );
}

export default Register;
