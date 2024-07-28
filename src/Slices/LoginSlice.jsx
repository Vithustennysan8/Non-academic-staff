import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin : false
}

const LoginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        login : (state, action) => {
            state.isLogin = action;
        },
        logout : (state, action) => {
            state.isLogin = action;
        },
    }
})

export const { login, logout} = LoginSlice.actions;
export default LoginSlice.reducer;