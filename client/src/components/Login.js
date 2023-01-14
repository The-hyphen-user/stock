import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increase, setHoldings } from "../features/slices/holdingSlice";
import { setWatchlist } from "../features/slices/watchlistSlice";
import { setTransactions } from "../features/slices/transactionSlice";
import { setUser } from "../features/slices/userSlice";



const Login = () => {
  const URL = "127.0.0.1:8000";
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //http://127.0.0.1:8000/api/token/
    console.log("🧱USERNAME: ", username);
    axios
      .post(`/user/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        console.log("🧱DATA: ", res.data);
        console.log('🧝User',res.data.user)
        // console.log('sessionId',res.req.sessionID)
        dispatch(setHoldings(res.data.holdings));
        dispatch(setWatchlist(res.data.watchlists));
        dispatch(setTransactions(res.data.transactions));
        dispatch(setUser(res.data.user));

        const holdings = res.data.holdings;
        console.log("🧱HOLDINGS: ", holdings);
        return holdings;
      })
      // .then(res => {
      //   //set bearer token
      //   localStorage.setItem('token', res.data.access)
      // })
      .then((holdings) => {
        // dispatch(setHoldings(holdings));
        console.log("🧱HOLDINGS: ", holdings);
        navigate("/user", { replace: true })
        // dispatch(
        //   setHoldings([
        //       {
        //         symbol: "AAPL",
        //         quantity: 5,
        //       },
        //       {
        //         symbol: "MSFT",
        //         quantity: 30,
        //       },
        //     ],
        //   )
        // );
      });
  };

  const fuckingHoldings = useSelector((state) => state.holdings.holding);
  const sumbit2 = (e) => {
    e.preventDefault();
    console.log("🧱HOLDINGS: ", fuckingHoldings);
  };
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
          Log In here
        </Button>

      </div>
      <button onClick={sumbit2}>log holdings</button>
    </div>
  );
};

export default Login;


/*

        <h1>
          {fuckingHoldings.map((holding, index) => (
            <li key={index}>
              <p>{holding.symbol}</p>
              <p>{holding.quantity}</p>
            </li>
          ))}
        </h1>
*/