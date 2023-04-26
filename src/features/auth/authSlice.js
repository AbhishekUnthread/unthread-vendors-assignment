import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  accessToken: null,
  refreshToken: null,
  accessTokenExpirationTime: null,
  refreshTokenExpirationTime: null,
  isLoggedIn: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const {
        accessToken,
        refreshToken,
        accessTokenExpirationTime,
        refreshTokenExpirationTime,
      } = action.payload;

      state = {
        ...state,
        accessToken,
        refreshToken,
        accessTokenExpirationTime,
        refreshTokenExpirationTime,
        isLoggedIn: true,
      };
    },
    logout(state) {
      state = {
        ...state,
        accessToken: null,
        refreshToken: null,
        accessTokenExpirationTime: null,
        refreshTokenExpirationTime: null,
        isLoggedIn: false,
      };
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
export const selectCurrentToken = (state) => state.auth.token;
