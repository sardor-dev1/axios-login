import { createSlice } from "@reduxjs/toolkit";

export const productSingleSlice = createSlice({
  name: "productSingle",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {
    saveProduct: (state, action) => {
      state.product = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { saveProduct, setLoading, setError } = productSingleSlice.actions;

export default productSingleSlice.reducer;