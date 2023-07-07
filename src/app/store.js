import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import userReducer from "../features/user/userSlice";
import vendorReducer from "../features/parameters/vendors/vendorSlice";
import tagsReducer from "../features/parameters/tagsManager/tagsManagerSlice"
import categoryReducer from "../features/parameters/categories/categorySlice";
import collectionReducer from "../features/parameters/collections/collectionSlice"

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    snackbar: snackbarReducer,
    user: userReducer,
    vendor:vendorReducer,
    tags : tagsReducer,
    category:categoryReducer,
    collection:collectionReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: process.env.REACT_APP_ENV !== "dev" ? false : true,
});

export default store;
