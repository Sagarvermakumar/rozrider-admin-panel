import { configureStore } from '@reduxjs/toolkit';
import { adminApi } from './services/adminApi';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
