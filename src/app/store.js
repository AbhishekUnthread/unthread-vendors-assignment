import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    snackbar: snackbarReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: process.env.REACT_APP_ENV !== "dev" ? false : true,
});

export default store;
