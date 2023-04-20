import {createSlice} from '@reduxjs/toolkit';
const initialState: {code: string} = {
    code: "OK"
}
const codeSlice = createSlice({
    initialState,
    name: "codeState",
    reducers: {
        set: (state, data) => {
            state.code = data.payload;
        },
        reset: (state) => {
            state.code = initialState.code;
        }
    }
})
export const codeActions = codeSlice.actions;
export const codeReducer = codeSlice.reducer;