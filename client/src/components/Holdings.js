import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHoldings } from "../features/slices/holdingSlice";
import { Grid, Paper } from "@material-ui/core";
import Stock from "./Stock";
import { setSelectedStock, resetSelectedStock } from "../features/slices/selectedStockSlice";

const Holdings = () => {
  const [newvalue, setNewvalue] = useState(0);
  // const holdings = useSelector((state) => state.holdings.holding);
  // const holdings = useSelector(state => state.holding)

  const loadedHoldings = useSelector((state) => state.holdings.holding);

  const dispatch = useDispatch();
  // const renderedHoldings = userHoldings.map((holding) => (
  //   <div key={holding.id}>
  //     <p>{holding.symbol}</p>
  //     <p>{holding.quantity}</p>
  //   </div>
  // ));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("🧱HOLDINGS: ", loadedHoldings);
    // dispatch(setHoldings())
  };

  const hangleSubmit2 = (e) => {
    e.preventDefault();
    //console.log("🧱HOLDINGS: ", loadedHoldings);
    dispatch(
      setHoldings([
        {
          id: 1,
          symbol: "AAPL",
          quantity: 5,
        },
        {
          id: 2,
          symbol: "MSFT",
          quantity: 25,
        },
      ])
    );
  };
  const handleSelect = (data) => {
    dispatch(setSelectedStock({
      symbol: data.symbol,
      name: data.name,
      price: data.price,
    }))
  }

  return (
    <>
      {/* <div>
        <p>Holdings</p>
        <h1>
          {loadedHoldings.map((holding, index) => (
            <li key={index}>
              <p>{holding.symbol}</p>
              <p>{holding.quantity}</p>
            </li>
          ))}
        </h1>
        <button onClick={handleSubmit}>display 🧱HOLDINGS</button>

        <h2>change to: </h2>
        <input type="text" onChange={(e) => setNewvalue(e.target.value)} />
        <button onClick={hangleSubmit2}>change</button>
      </div> */}
      <div>
        <p>Holdings</p>
        <Paper elevation={3}>
        <Grid container spacing={5}
              direction={"column"}
        >
          {loadedHoldings.map((holding, index) => (
            <Grid item key={index}>
              <Stock
                symbol={holding.symbol}
                amount={holding.quantity}
                name={holding.name}
                price={holding.price}
                selectable={true}
                select={(data)=>{handleSelect(data)}}


              />
              </Grid>
          ))}

        </Grid>
        </Paper>
      </div>
    </>
  );
};

export default Holdings;

/**
 * 
 * 
      <h1>{
        holding.map((holding, index) => (
          <li key={index}>
            <p>{holding.symbol}</p>
            <p>{holding.quantity}</p>
            </li>
        ))
      }</h1>


      
      <button onClick={() => dispatch(setHoldings(newvalue))}>change</button>
 */
