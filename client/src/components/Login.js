import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/user/login", {
          username: username,
          password: password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
    <h3>Login</h3>
      <h3>username</h3>
      <input onChange={(e) => setUsername(e.target.value)}/>
      <h3>password</h3>
      <input onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default Login;
