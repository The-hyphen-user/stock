import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetHoldings } from '../features/slices/holdingSlice';
import { resetWatchlist } from '../features/slices/watchlistSlice';
import { resetTransactions } from '../features/slices/transactionSlice';
import { resetUser } from '../features/slices/userSlice';

const Logout = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(resetHoldings())
    dispatch(resetWatchlist())
    dispatch(resetTransactions())
    dispatch(resetUser())
    localStorage.removeItem("token");
    navigate("/home");
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout