import React from 'react'
import Stock from './Stock'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addWatchlistItem } from "../features/slices/watchlistSlice";

const Searchresults = ({stock, stocks}) => {
  const loadedHoldings = useSelector((state) => state.holdings.holding);

  const dispatch = useDispatch();
  
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
    {stock? (<div>
      <Stock 
        symbol={stock.symbol}
        price={stock.price}
        name={stock.name}
        selectable={true}
        select={stock.select}
        watchlistable={true}
        watchlist={(data) =>{handleAddToWatchlist(data)}}

      />
    </div>) :  (<div></div>)}
    {stocks? (<div></div>) :  (<div></div>)}

    </div>
  )
}

export default Searchresults