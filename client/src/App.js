import logo from './logo.svg';
import react, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Header from './components/Header';
import Home from './components/Home'
import Login from './components/Login';
import About from './components/About';
import Signup from './components/Signup';
import User from './components/User'
import HighScores from './components/HighScores';
import Header from './components/Header';
import Logout from './components/Logout';
import Watchlist from './components/Watchlist';
import Transactions from './components/Transactions';
import Holdings from './components/Holdings';
import Search from './components/Search';
import Profile from './components/Profile';
import axios from 'axios';
import Sync from './components/Sync';
import { useSelector } from 'react-redux';


function App() {
  // const BASE_URL = process.env.REACT_APP_ACCESS_API_URL;
  // const AUTH_TOKEN = useSelector((state) => state.auth.bearerToken);
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  // axios.defaults.headers['Content-Type'] = 'application/json';
  // axios.defaults.headers['Access-Control-Allow-Credentials'] = true;
  // axios.defaults.headers['Access-Control-Allow-Origin'] = 'http://localhost:5000';


  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:5000/api"; //for local dev running.
  // axios.defaults.baseURL = "http://localhost:3050" ;//for docker-compose running


  return (
  <div className="App">
      <p>home</p>
      <Header />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='user' element={<User />}>
          <Route path='watchlist' element={<Watchlist/>} />
          <Route path='transactions' element={<Transactions/>} />
          <Route path='holdings' element={<Holdings/>} />
          <Route path='search' element={<Search/>} />
          <Route path='profile' element={<Profile/>} />
        </Route>
        <Route path='about' element={<About />} />
        <Route path='home' element={<Home />} />
        <Route path='highscores' element={<HighScores />} />
        <Route path='sync' element={<Sync />} />
        <Route path='logout' element={<Logout />} />



        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
