import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn:  localStorage.getItem("isLoggedIn") === "true",
  userData: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      localStorage.setItem("isLoggedIn", "false");
    },
  }
})


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;