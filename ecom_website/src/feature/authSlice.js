import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    error: null, // ✅ added
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.error = null;
        },

        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },

        setAuthError: (state, action) => {
            state.error = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            state.error = null;
        },
    },
});

export const {
    setAuth,
    updateUser,
    logout,
    setAuthError,
} = authSlice.actions;

export default authSlice.reducer;