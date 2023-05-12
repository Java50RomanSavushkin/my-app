import { createSlice } from "@reduxjs/toolkit";
const initialState: {categories: string[]} = {
    categories: []
}
const categoriesSlice = createSlice({
initialState,
name: 'categoriesState',
reducers: {
    setCategories: (state, data) => {
        state.categories = data.payload
    }
}
});
export const categoriesActions = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;