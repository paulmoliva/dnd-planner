import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    currentUser: {
        email: null,
        username: null,
        token: null,
    },
    error: null,
    loading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { email, username, token } = action.payload;
            state.currentUser = { email, username, token };
        },
        logout: (state) => {
            state.currentUser = initialState.currentUser;
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setLoading: (state, action) => {
            state.error = action.payload ? null : state.error;
            state.loading = action.payload;
        }
    }
})

export const { setError, setLoading, login, logout } = authSlice.actions;

export default authSlice.reducer;