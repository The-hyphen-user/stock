import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`/user/register`, {
      username: username,
      password: password
    })
    .then(res => {
      console.log(res.data)
      console.log(res.status)
      if (res.status === 200) {
        console.log("User created")
        navigate("/login", { replace: true })
      } else {
        console.log("User not created")
      }
    })
  }


  return (
    <div>
    <p>sign up</p>
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

    </div></div>
  )
}

export default Signup