import logo from "./logo.svg";
import "./App.css";
import Test from "./components/Test";
import TestDB from "./components/TestDB";
import Sync from "./components/Sync";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Link, } from "react-router-dom";


function App() {
  axios.defaults.baseURL = "http://localhost:5000/api"; //for local dev running
  // axios.defaults.baseURL = "http://localhost:6868/api" ;//for docker-compose running
  return (
    <div className="App">
      <header className="App-header">
        <button>
          <a href="https://www.google.com/">google</a>
        </button>
        <Test />
        <br />
        <TestDB />
        <Sync />
        <Login/>
        <Register/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
