import { createSlice } from "@reduxjs/toolkit";
import { OrderType } from "../model/OrderType";
const initialState: {orders: OrderType[]} = {
    orders: []
};
const ordersSlice = createSlice({
    initialState,
    name: 'ordersState',
    reducers: {
        setOrders: (state, data) => {
            state.orders = data.payload;
        }
    }
})
export const ordersActions = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
