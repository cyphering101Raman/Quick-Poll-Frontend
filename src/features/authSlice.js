import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userStatus: false,
  userData: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userStatus = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userStatus = false;
      state.userData = null;
    },
    registerUser: (state, action) => {
      state.userStatus = true;
      state.userData = action.payload;
    },
  }
})


export const {login, logout, registerUser} = authSlice.actions;
export default authSlice.reducer;