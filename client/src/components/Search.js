import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import axios from "axios";
import Stock from "./Stock";
import Holdings from "./Holdings";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedStock,
  resetSelectedStock,
} from "../features/slices/selectedStockSlice";
import { addTransaction } from "../features/slices/transactionSlice";
import {
  addHolding,
  updateHoldingQuantity,
  updateOrAddHolding,
  updateOrDeleteHolding,
} from "../features/slices/holdingSlice";
import { addWatchlistItem } from "../features/slices/watchlistSlice";

import { updateUserBalance } from "../features/slices/userSlice";
// import HoldingActions from "../renameMe/HoldingActions.HoldingActions";

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");
  const [multiResults, setMultiResults] = useState("");
  // const [selected, setSelected] = useState("");
  const selected = useSelector((state) => state.selectedStock.selectedStock);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   axios.get(`http://127.0.0.1:8000/api/stockwatch/search/${query}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }).then ((res) => {
  //     console.log(res.data)
  //     setResults(res.data)
  //   })
  // }

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`/stock/search`, {
        params: {
          name: query,
        },
      })
      .then((res) => {
        dispatch(resetSelectedStock());
        // setSelected("");
        setResults("");
        setMultiResults(res.data);
        console.log("the goods:", res.data);
        // setResults(res.data)
      });
  };
  const handleSymbolSearch = (e) => {
    e.preventDefault();
    axios
      .get(`/stock/symbol`, {
        params: {
          name: query,
        },
      })
      .then((res) => {
        console.log("the goods:", res);

        dispatch(
          setSelectedStock({
            symbol: res.data.stock.symbol,
            name: res.data.stock.name,
            price: res.data.price,
          })
        );
        // dispatch(resetSelectedStock());
        // setSelected("");
        setMultiResults("");
        setResults(res.data);
        console.log(res.data);
        // setResults(res.data)
      });
  };
  const handlePriceSearch = (e) => {
    e.preventDefault();
    axios
      .get(`/stock/price`, {
        params: {
          name: query,
        },
      })
      .then((res) => {
        console.log("dATA", res.data);
        // setResults(res.data)
      });
  };

  const handleSelect = (data) => {
    if (!data.price) {
      axios
        .get(`/stock/price`, {
          params: {
            name: data.symbol,
          },
        })
        .then((price) => {
          console.log("price:", price.data.price);
          dispatch(
            setSelectedStock({
              symbol: data.symbol,
              name: data.name,
              price: price.data.price,
            })
          );
        });
    } else {
      dispatch(
        setSelectedStock({
          symbol: data.symbol,
          name: data.name,
          price: data.price,
        })
      );
    }
  };
  

  const handleBuy = (data) => {
    console.log("buying", data);
    console.log("symbol:", data.symbol);
    console.log("quantity:", data.tradeQuantity);
    axios(`/transaction/buy`, {
      method: "POST",
      params: {
        // symbol: "AMZN",
        quantity: data.tradeQuantity,
        symbol: data.symbol,
      },
    }).then((res) => {
      console.log("buying", res.data);
      console.log("buying", res.data.updatedInfo);
      console.log("buying", res.data.updatedInfo.balance);
      dispatch(updateUserBalance(res.data.updatedInfo.balance));
      dispatch(addTransaction(res.data.updatedInfo.transaction));
      dispatch(updateOrAddHolding(res.data.updatedInfo.holding));
    });
  };
   const handleSell = (data) => {
    axios(`/transaction/sell`, {
      method: "POST",
      params: {
        quantity: data.tradeQuantity,
        symbol: data.symbol,
      },
    })
    .then((res) => {
      dispatch(updateUserBalance(res.data.updatedInfo.balance));
      dispatch(addTransaction(res.data.updatedInfo.transaction));
      dispatch(updateOrDeleteHolding(res.data.updatedInfo.holding));
    })
  }
  const handleAddToWatchlist = (data) => {
    console.log(data)
    axios
    .post('/watchlist/add',{
      params: {
        symbol:data
      },
    })
    .then((res)=> {
      dispatch(
        addWatchlistItem({
          symbol: res.data.stock.symbol
        })
      )
    })

  }

  return (
    <div>
      <TextField
        id="standard-basic"
        label="Search"
        onChange={(e) => setQuery(e.target.value)}
      >
        {query}
      </TextField>
      <Button onClick={handleSearch} variant="contained" color="primary">
        Search
      </Button>
      <Button onClick={handleSymbolSearch} variant="contained" color="primary">
        Symbol Search
      </Button>

      <br />
      <br />

      {selected ? (
        <div>
          <Stock
            symbol={selected.symbol}
            name={selected.name}
            price={selected.price}
            tradable={true}
            buy={(data) => {
              handleBuy(data);
            }}
            sell={(data) => {
              handleSell(data);
            }}
            selectable={false}
            watchlistable={true}
            watchlist={(data) => {handleAddToWatchlist(data)}}
          />
        </div>
      ) : (
        <div>
          {results ? (
            <Grid
              container
              spacing={4}
              direction={"column"}
              sx={{
                width: "90%",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  width: "90%",
                }}
              >
                <Stock
                  symbol={results.stock.symbol}
                  name={results.stock.name}
                  price={results.price}
                  tradable={false}
                  selectable={true}
                  select={(data) => {
                    handleSelect(data);
                  }}
                />
              </Grid>
            </Grid>
          ) : (
            <div></div>
          )}

          {multiResults ? (
            <Grid
              container
              spacing={4}
              direction={"column"}
              sx={{
                width: "90%",
              }}
            >
              {multiResults.map((result, index) => (
                <Grid
                  item
                  xs={12}
                  key={result.id}
                  sx={{
                    width: "90%",
                  }}
                >
                  <Stock
                    key={index}
                    symbol={result.symbol}
                    name={result.name}
                    tradable={false}
                    selectable={true}
                    select={(data) => {
                      handleSelect(data);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div></div>
          )}
        </div>
      )}
      <br />
      <div>
        <Holdings />
      </div>
    </div>
  );
};

export default Search;
