import  { createSlice } from  '@reduxjs/toolkit' ;

const initialState = {
  watchlist: []
};

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    resetWatchlist: (state) => {
      state.watchlist = initialState.watchlist;
    },
    addWatchlistItem: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeWatchlistItem: (state, action) => {
      state.watchlist = state.watchlist.filter((item) => item.symbol !== action.payload.symbol);
    },
  },
});

export const { setWatchlist, resetWatchlist, addWatchlistItem, removeWatchlistItem } = watchlistSlice.actions;

export default watchlistSlice.reducer;