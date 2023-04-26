import { authActions } from "./authSlice";
import { checkTimeIsExpired, calculateRemainingTime } from "../../utils/time";

import {
  saveAuthToLocal,
  getAuthFromLocal,
  removeAuthFromLocal,
} from "../../../helpers/storage";

const checkLoginStatus = () => {
  return (dispatch) => {};
};

const loginHandler = (authDetails) => {
  return (dispatch) => {
    const { accessToken, refreshToken } = authDetails;
    const accessTokenExpirationTime =
      Date.now() + process.env.REACT_APP_ACCESS_TOKEN_EXPIRATION_TIME;
    const refreshTokenExpirationTime =
      Date.now() + process.env.REACT_APP_REFRESH_TOKEN_EXPIRATION_TIME;

    saveAuthToLocal({
      accessToken,
      refreshToken,
      accessTokenExpirationTime,
      refreshTokenExpirationTime,
    });

    dispatch(
      authActions.login({
        accessToken,
        refreshToken,
        accessTokenExpirationTime,
        refreshTokenExpirationTime,
      })
    );
  };
};

const logoutHandler = () => {
  return (dispatch) => {
    removeAuthFromLocal();
    dispatch(authActions.logout());
  };
};

export { checkLoginStatus, loginHandler, logoutHandler };
