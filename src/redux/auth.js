import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    email: null,
    username: null,
    token: null,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (_state, action) => {
            const { email, username, token } = action.payload;
            return { email, username, token, error: null };
        },
        logout: () => {
            return initialState
        },
        error: (state, action) => {
            const { error } = action.payload;
            return { ...state, error }
        }
    }
})

export const { error, login, logout } = authSlice.actions;

export default authSlice.reducer;