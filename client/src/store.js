import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from './features/token/tokenSlice'
import authReducer from './features/slices/authSlice'
import holdingReducer from './features/slices/holdingSlice'
import transactionReducer from './features/slices/transactionSlice'
import userReducer from './features/slices/userSlice'
import watchlistReducer from './features/slices/watchlistSlice'
import selectedStockReducer from './features/slices/selectedStockSlice'

import counterReducer from './features/slices/counterSlice'

export const store = configureStore({
  reducer: {
    // token: tokenSlice,
    auth: authReducer,
    holdings: holdingReducer,
    transaction: transactionReducer,
    user: userReducer,
    watchlist: watchlistReducer,
    counter: counterReducer,
    selectedStock: selectedStockReducer,
  },
})