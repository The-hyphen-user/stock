import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const URL = '127.0.0.1:8000'
  let navigate = useNavigate();

    const [username, setUsername] = useState('username1')
    const [password, setPassword] = useState('password1')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
      //http://127.0.0.1:8000/api/token/
      axios.post(`/user/login`, {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res)
        console.log(res.data)
      })
      // .then(res => {
      //   //set bearer token
      //   localStorage.setItem('token', res.data.access)
      // })
      .then(() => {
        navigate("/user", { replace: true })})
    }

  return (
    <div>
    <p>Login</p>
      <div className="login-container">
        <TextField
          label="username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        <br />
        <TextField
          id="outlined-password-input"
          label="Password"
          variant="outlined"
          autoComplete="current-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <br />
        <Button onClick={handleSubmit} variant="contained">
          Log In
        </Button>

      </div>



    </div>
  )
}

export default Login