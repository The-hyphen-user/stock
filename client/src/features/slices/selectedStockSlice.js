import  { createSlice } from  '@reduxjs/toolkit' ;

const initialState = {
  selectedStock: null,
};

export const selectedStockSlice = createSlice({
  name: "selectedStock",
  initialState,
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
    resetSelectedStock: (state) => {
      state.selectedStock = initialState.selectedStock;
    },
  },
});

export const { setSelectedStock, resetSelectedStock } = selectedStockSlice.actions;

export default selectedStockSlice.reducer;
