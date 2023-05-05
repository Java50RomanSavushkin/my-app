import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../model/ProductType";
const initialState: {products: ProductType[]} = {
    products: []
};
const productsSlice = createSlice({
    initialState,
    name: "productsState",
    reducers: {
        setProducts: (state, data) => {
            state.products = data.payload;
        }
    }
});
export const productsActions = productsSlice.actions;
export const productsReducer = productsSlice.reducer;