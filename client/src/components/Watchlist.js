import axios from "axios";
import React, { useState, useEffect } from "react";
import Stock from "./Stock";
import { useSelector } from "react-redux";

const Watchlist = () => {
  const [stocks, setStocks] = useState([]);

  const watchlist = useSelector((state) => state.watchlist.watchlist);

  // const useEffect = () => {
  //     axios.get('http://127.0.0.1:8000/api/stockwatch/watchlist/', {
  //         headers: {
  //             Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //     })
  //     .then(res => {
  //         console.log(res)
  //         console.log(res.data)
  //     })//set stocks to res.data
  //     .then((res) => {
  //         setStocks(res.data)
  //     })
  // }

  /**
     
     "id": 1,
        "ticker": "AAPL",
        "name": "Apple",
        "price": 0.0
     */

  return (
    <div>
      <h3>watchlist:</h3>
      <div>
        {watchlist.map((watchlistItems, index) => (
            <li key={index}>
            <p>{watchlistItems.symbol}</p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;

/*
    <Stock ticker='ticker' price='price' name='name' id='id' />
        {stocks.map((stock) => (
            <Stock ticker={stock.ticker} price={stock.price} name={stock.name} id={stock.id} />
        ))}
*/
