import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { BrowserRouter, Route, Routes, Link, Outlet, useNavigate } from "react-router-dom";
import {  } from "react-router-dom";

import Watchlist from "./Watchlist";
import Transactions from "./Transactions";
import Usernav from "./Usernav";
import "./componentCSS.css";
import axios from "axios";
import { useSelector } from "react-redux";

const TestPage = () => {
  let navigate = useNavigate();
  const username = useSelector((state) => state.user.user.username);
  const balance = useSelector((state) => state.user.user.balance);

  //use effect that fetches user data from db with endpoint /user/username
  const [user, setUser] = useState("");

  //useeffect that navigates if username is null
  useEffect(() => {
    if (username == null) {
      navigate('/login', { replace: true });
    }
  }, [username]);


  // useEffect(() => {
  //   axios
  //     .get("/user")
  //     .then((res) => {
  //       console.log(res.data);
  //       setUser(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const [fakeStocks, setFakeStocks] = useState([
    {
      id: 2,
      symbol: "AAPL",
      amount: 999,
      createdAt: "2022-07-12T20:15:35.000Z",
      updatedAt: "2022-07-12T20:15:35.000Z",
    },
    {
      id: 2,
      symbol: "GOOG",
      amount: 999,
      createdAt: "2022-07-12T20:15:35.000Z",
      updatedAt: "2022-07-12T20:15:35.000Z",
    },
  ]);

  // if (username == null) {
  //   navigate('/login', { replace: true });
  // }else {
    return (
      <>
      <div className="user">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper elevation={3}>
              <Usernav />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <h3>{username}  ${balance}</h3>
            <Paper elevation={3}>
              <Outlet />
            </Paper>
          </Grid>
        </Grid>
      </div>
      </>
    );
  // }


};

export default TestPage;
