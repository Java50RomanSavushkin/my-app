import {createSlice} from '@reduxjs/toolkit'
import { AUTH_USER_ITEM } from '../config/auth-service-config';
const initialState: {authUser: string} = {
    authUser: localStorage.getItem(AUTH_USER_ITEM) || ''
}
const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        login: (state, data) => {
            state.authUser = data.payload;
        },
        logout: (state) => {
            state.authUser = '';
        }
    }
})
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;