import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU4YTQ2NGJlYjhmOTRkYWEyN2Q4MDYiLCJlbWFpbCI6ImthdmluQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiS2F2aW4iLCJpYXQiOjE2ODM2MTEwNzYsImV4cCI6MTcxNTE0NzA3Nn0.nSYgXqm30Vp_Iv_QUxMcTwp10-seM_B0PPGUd_0QYMI",
  refreshToken: null,
  accessTokenExpirationTime:
    Date.now() + +process.env.REACT_APP_ACCESS_TOKEN_EXPIRATION_TIME,
  refreshTokenExpirationTime:
    Date.now() + +process.env.REACT_APP_REFRESH_TOKEN_EXPIRATION_TIME,
  isLoggedIn: true,
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
