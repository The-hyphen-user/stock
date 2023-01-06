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
    },
    updateOrAddHolding: (state, action) => {
      let holding = state.holding.find(
        (holding) => holding.id === action.payload.id
      );
      if (holding) {
        holding.quantity = action.payload.quantity;
      } else {
        state.holding.push(action.payload);
      }
    },
    updateOrDeleteHolding: (state, action) => {
      let holding = state.holding.find(
        (holding) => holding.id === action.payload.id
      );
      if (holding) {
        holding.quantity = action.payload.quantity;
        if (holding.quantity === 0) {
          state.holding = state.holding.filter(
            (holding) => holding.id !== action.payload.id
          );
        }
      }
    }
  },
});

export const { setHoldings, resetHoldings, addHolding, updateHoldingQuantity, updateOrAddHolding, updateOrDeleteHolding } = holdingSlice.actions;

export default holdingSlice.reducer;

// export const selectHoldings = (state) => state.holding.value;
