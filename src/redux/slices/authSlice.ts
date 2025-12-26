import { createSlice } from '@reduxjs/toolkit';
import { adminApi } from '../services/adminApi';

interface AuthState {
    admin: any | null; // Replace 'any' with specific type if available
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    admin: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.admin = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                adminApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.admin = payload.admin;
                    state.isAuthenticated = true;
                }
            )
            .addMatcher(
                adminApi.endpoints.getProfile.matchFulfilled,
                (state, { payload }) => {
                    state.admin = payload.admin;
                    state.isAuthenticated = true;
                }
            )
            .addMatcher(
                adminApi.endpoints.logout.matchFulfilled,
                (state) => {
                    state.admin = null;
                    state.isAuthenticated = false;
                }
            );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
