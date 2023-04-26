import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: process.env.REACT_APP_ENV !== "dev" ? false : true,
});

export default store;
