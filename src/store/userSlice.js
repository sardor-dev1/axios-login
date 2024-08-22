import { createSlice } from "@reduxjs/toolkit";
import {getToLocalStorage, saveToLocalStorage} from "../utils/halper"

const initialUserData = getToLocalStorage("user")


const userSlice = createSlice({
  name: "user",
  initialState: { userData: initialUserData, error: null },
  reducers: {
    addUser: function (state, action) {
      state.userData = action.payload;
      saveToLocalStorage("user", state.userData)
      if(state.userData.token){
        saveToLocalStorage("token", state.userData.token)
      }
    },
    setUserError: function (state, action) {
      state.error = action.payload;
    },
  },
});

export const { addUser, setUserError } = userSlice.actions;
export default userSlice.reducer;
