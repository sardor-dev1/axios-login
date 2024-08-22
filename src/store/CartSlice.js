import { createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage, getToLocalStorage } from "../utils/halper";

const CART = "cart";

const cartSlice = createSlice({
  name: "cart",
  initialState: getToLocalStorage(CART),
  reducers: {
    addItem: (state, action) => {
      if (!Array.isArray(state)) {
        state = [];
      }
      state.push(action.payload);

      saveToLocalStorage(CART, state);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((card) => card.id === id);

      if (index !== -1) {
        state.splice(index, 1);
      }
      saveToLocalStorage(CART, state);
    },
    removeAll: (state) => {
      state.length = 0;
      saveToLocalStorage(CART, state);
    },
  },
});

export const { addItem, removeItem, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
