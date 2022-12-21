import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token'),
    username: "",
    _id: "",
    registerSuccess: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
};



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
    extraReducers: {}
});

export default authSlice.reducer;
