import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import { authApi } from "../services/authApi";

export const store = configureStore({ // is used to create the store the reducer tells redux which state sections it should manage
    reducer: {
        auth:authReducer,

        [authApi.reducerPath]:authApi.reducer
    },
    middleware:(getDefaultMidleware)=>getDefaultMidleware().concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

