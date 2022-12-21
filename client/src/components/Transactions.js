import axios from "axios";
import React, { useState, useEffect } from "react";
import Stock from "./Stock";
import { TextField, Grid, Card, Paper, Box } from "@material-ui/core";
import { useSelector } from "react-redux";

const Transactions = () => {
  // const [transactions, setTransactions] = useState([]);
  const transactions = useSelector((state) => state.transaction.transaction);

  /**
   example transaction object
  "id": 1,
    "amount": 1,
    "price": 146.1,
    "type": "buy",
    "date": "2022-10-05T04:12:10.414961Z",
    "account": 1,
    "stock": 1
   */
  return (
    <div>
      <h3>Transactions</h3>
      <div>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <p>{transaction.symbol}</p>
            <p>{transaction.price}</p>
            <p>{transaction.time}</p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
