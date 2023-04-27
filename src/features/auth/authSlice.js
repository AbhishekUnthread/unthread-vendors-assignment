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

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.accessTokenExpirationTime = accessTokenExpirationTime;
      state.refreshTokenExpirationTime = refreshTokenExpirationTime;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.accessToken = initialAuthState.accessToken;
      state.refreshToken = initialAuthState.refreshToken;
      state.accessTokenExpirationTime =
        initialAuthState.accessTokenExpirationTime;
      state.refreshTokenExpirationTime =
        initialAuthState.refreshTokenExpirationTime;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
