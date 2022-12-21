import  { createSlice } from  '@reduxjs/toolkit' ;

const initialState = {
  holding: [],
};

export const holdingSlice = createSlice({
  name: "holdings",
  initialState,
  reducers: {
    // increase: (state) => {
    //   state.holding += 1;
    // },
    setHoldings: (state, action) => {
      state.holding = action.payload;
    },
    resetHoldings: (state) => {
      state.holding = initialState.holding;
    },
    addHolding: (state, action) => {
      state.holding.push(action.payload);
    },
    updateHoldingQuantity: (state, action) => {
      state.holding.map((holding) => {
        if (holding.id === action.payload.id) {
          holding.quantity = action.payload.quantity;
        }
      });
    }
  },
});

export const { setHoldings, resetHoldings, addHolding, updateHoldingQuantity } = holdingSlice.actions;

export default holdingSlice.reducer;

// export const selectHoldings = (state) => state.holding.value;
