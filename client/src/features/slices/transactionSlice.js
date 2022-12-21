import  { createSlice } from  '@reduxjs/toolkit' ;

const initialState = {
  transaction: []
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transaction = action.payload;
    },
    resetTransactions: (state) => {
      state.transaction = initialState.transaction;
    },
    addTransaction: (state, action) => {
      state.transaction.push(action.payload);
    }
  },
});

export const { setTransactions, resetTransactions, addTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;