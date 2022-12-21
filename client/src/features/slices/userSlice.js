import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: 
  {
    balance: 0,
    username: null,
    id: 133742069,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
    updateUserBalance: (state, action) => {
      state.user.balance = action.payload;
    }
  },
});

export const { setUser, resetUser, updateUserBalance } = userSlice.actions;

export default userSlice.reducer;