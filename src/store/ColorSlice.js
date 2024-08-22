import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    colors: [],
    loading: false,
    error: null,
  },
  reducers: {
    saveColors: (state, action) => {
      state.colors = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { saveColors, setLoading, setError } = colorSlice.actions;

export default colorSlice.reducer;
