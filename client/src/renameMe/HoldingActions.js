import React from "react";
import axios from "axios";
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
import { updateUserBalance } from "../features/slices/userSlice";

export const BuyHolding = ({ symbol, quantity }) => {
  const dispatch = useDispatch();
  console.log("buy holding action");
  axios(`/transaction/buy`, {
    method: "POST",
    params: {
      quantity: quantity,
      symbol: symbol,
    },
  }).then((res) => {
    dispatch(updateUserBalance(res.data.updatedInfo.balance));
    dispatch(addTransaction(res.data.updatedInfo.transaction));
    dispatch(updateOrAddHolding(res.data.updatedInfo.holding));
  });
};


export const SellHolding = ({ symbol, quantity }) => {
  const dispatch = useDispatch();
  axios(`/transaction/sell`, {
    method: "POST",
    params: {
      quantity: quantity,
      symbol: symbol,
    },
  }).then((res) => {
    dispatch(updateUserBalance(res.data.updatedInfo.balance));
    dispatch(addTransaction(res.data.updatedInfo.transaction));
    dispatch(updateOrDeleteHolding(res.data.updatedInfo.holding));
  });
}
