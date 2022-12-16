import React, { useState, useEffect } from 'react'
import { Grid, Paper } from '@material-ui/core';
import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";

import Watchlist from './Watchlist';
import Transactions from './Transactions';
import Usernav from './Usernav';
import './componentCSS.css'
import axios from 'axios';


const User = () => {


  //use effect that fetches user data from db with endpoint /user/username
  const [user, setUser] = useState('')

  useEffect(() => {
    axios.get('/user')
      .then(res => {
        console.log(res.data)
        setUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])









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

  return (
    <div className='user'>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper elevation={3}><Usernav /></Paper>
        </Grid>
        <Grid item xs={8}>

          <h3>user</h3>
          <Paper elevation={3}>
            <Outlet />
          </Paper>
        </Grid>
      </Grid>


    </div>
  )
}

export default User

/*

            <Route path='/watchlist' component={<Watchlist/>} />
            <Route path='/transactions' component={<Transactions/>} />



            
            <Routes>
              <Route path=''>
                <div />
              </Route>
              <Route path='/watchlist'>
                <Watchlist />
              </Route>
              <Route path='/transactions'>
                <Transactions />
              </Route>
            </Routes>
*/