import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice.js"
import pollReducer from "../features/pollSlice.js"


const store = configureStore({
  reducer: {
    auth: authReducer,
    poll: pollReducer,
  }
})

export default store;