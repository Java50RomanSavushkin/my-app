import { createSlice } from "@reduxjs/toolkit";
import { ShoppingProductType } from "../model/ShoppingProductType";
const initialState: {shopping: ShoppingProductType[]} = {
    shopping: []
}
const shoppingSlice = createSlice({
    initialState,
    name: "shoppingState",
    reducers: {
        setShopping: (state, data) => {
            state.shopping = data.payload;
        },
        resetShopping: (state) => {
            state.shopping = initialState.shopping;
        }
    }
})
export const shoppingActions = shoppingSlice.actions;
export const shoppingReducer = shoppingSlice.reducer;