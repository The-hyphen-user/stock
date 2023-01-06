import axios from "axios";
import React, { useState, useEffect } from "react";
import Stock from "./Stock";
import { useSelector } from "react-redux";

const Watchlist = () => {
  const [stocks, setStocks] = useState([]);

  const watchlist = useSelector((state) => state.watchlist.watchlist);



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


