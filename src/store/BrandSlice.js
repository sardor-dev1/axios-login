import { createSlice } from "@reduxjs/toolkit";

const brandSlice= createSlice({
    name: "brands",
    initialState:{
        brands: [],
        loading: false,
        error: null,
    },
    reducers: {
        saveBrands: (state, action) => {
            state.brands = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { saveBrands, setLoading, setError } = brandSlice.actions;

export default brandSlice.reducer;