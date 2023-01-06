import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  const [q1name, setQ1name] = useState("symbol");
  const [q1data, setQ1data] = useState("AMZN");
  const [q2name, setQ2name] = useState("quantity");
  const [q2data, setQ2data] = useState("5");
  const [path, setPath] = useState("api/transaction/sell");
  const [method, setMethod] = useState("POST");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios(
      `http://localhost:5000/${path}`,{
        method: `${method}`,
        params: {
          [q1name]: q1data,
          [q2name]: q2data,
        },
      }
      // params: {
      //   [q1name]: q1data,
      //   [q2name]: q2data,
      // },
      // headers: {
      //   "Content-Type": "application/json",
      //   //add token here
      // }

      // }
    ).then((res) => {
      console.log(res);
    });
  };
  const changeMethod = (e) => {
    e.preventDefault();
    method === "POST" ? setMethod("GET") : setMethod("POST");
  };

  return (
    <div>
      <h1>Test</h1>
      <label>q1name</label>
      <input
        type="text"
        value={q1name}
        onChange={(e) => setQ1name(e.target.value)}
      />
      <label>q1data</label>
      <input
        type="text"
        value={q1data}
        onChange={(e) => setQ1data(e.target.value)}
      />
      <label>q2name</label>
      <input
        type="text"
        value={q2name}
        onChange={(e) => setQ2name(e.target.value)}
      />
      <label>q2data</label>
      <input
        type="text"
        value={q2data}
        onChange={(e) => setQ2data(e.target.value)}
      />
      <label>path</label>
      <input
        type="text"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <label>method: {method}</label>
      <button onClick={changeMethod}>swap</button>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Test;
