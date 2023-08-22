import { authActions } from "./authSlice";
import { checkTimeIsExpired, calculateRemainingTime } from "../../utils/time";

import {
  saveAuthToLocal,
  getAuthFromLocal,
  removeAuthFromLocal,
   
} from "../../utils/storage";

const logoutHandler = () => {
  return (dispatch) => {
    removeAuthFromLocal();
    dispatch(authActions.logout());
  };
};

const checkLoginStatus = () => {
  return (dispatch) => {
    const authDetails = getAuthFromLocal();

    if (authDetails) {
      const accessTokenExpired = checkTimeIsExpired(
        authDetails.accessTokenExpirationTime
      );

      if (accessTokenExpired) {
        removeAuthFromLocal();
        dispatch(authActions.logout());
        return;
      }

      dispatch(authActions.login(authDetails));
      const autoLogoutTime = calculateRemainingTime(
        authDetails.accessTokenExpirationTime
      );
      setTimeout(() => {
        removeAuthFromLocal();
        dispatch(authActions.logout());
      }, autoLogoutTime);
      return;
    }

    removeAuthFromLocal();
    dispatch(authActions.logout());
  };
};

const loginHandler = (authDetails) => {
  return (dispatch) => {
    const { accessToken, refreshToken } = authDetails;
    const accessTokenExpirationTime =
      Date.now() + +process.env.REACT_APP_ACCESS_TOKEN_EXPIRATION_TIME;
    const refreshTokenExpirationTime =
      Date.now() + +process.env.REACT_APP_REFRESH_TOKEN_EXPIRATION_TIME;

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

    const autoLogoutTime = calculateRemainingTime(accessTokenExpirationTime);
    setTimeout(() => {
      removeAuthFromLocal();
      dispatch(authActions.logout());
    }, autoLogoutTime);
  };
};

export { checkLoginStatus, loginHandler, logoutHandler };
