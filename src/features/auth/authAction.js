import { authActions } from "./authSlice";
import { checkTimeIsExpired, calculateRemainingTime } from "../../utils/time";

import {
  saveAuthToLocal,
  getAuthFromLocal,
  removeAuthFromLocal,
} from "../../utils/storage";

const checkLoginStatus = () => {
  return (dispatch) => {
    // const authDetails = getAuthFromLocal();
    // if (
    //   authDetails?.accessToken &&
    //   authDetails?.refreshToken &&
    //   authDetails?.accessTokenExpirationTime &&
    //   authDetails?.refreshTokenExpirationTime &&
    //   authDetails?.userId
    // ) {
    //   const {
    //     accessToken,
    //     refreshToken,
    //     accessTokenExpirationTime,
    //     refreshTokenExpirationTime,
    //     userId,
    //   } = authDetails;
    //   const accessTokenExpired = checkTimeIsExpired(accessTokenExpirationTime);
    //   const refreshTokenExpired = checkTimeIsExpired(
    //     refreshTokenExpirationTime
    //   );
    //   if (accessTokenExpired) {
    //     removeAuthFromLocal();
    //     dispatch(authActions.logout());
    //     return;
    //   }
    //   if (refreshTokenExpired) {
    //     // return;
    //   }
    //   dispatch(
    //     authActions.login({
    //       accessToken,
    //       refreshToken,
    //       accessTokenExpirationTime,
    //       refreshTokenExpirationTime,
    //       userId,
    //     })
    //   );
    //   const autoLogoutTime = calculateRemainingTime(accessTokenExpirationTime);
    //   setTimeout(() => {
    //     removeAuthFromLocal();
    //     dispatch(authActions.logout());
    //   }, autoLogoutTime);
    //   return;
    // }
    // removeAuthFromLocal();
    // dispatch(authActions.logout());
  };
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
    // const autoLogoutTime = calculateRemainingTime(accessTokenExpirationTime);
    // setTimeout(() => {
    //   removeAuthFromLocal();
    //   dispatch(authActions.logout());
    // }, autoLogoutTime);
  };
};

const logoutHandler = () => {
  return (dispatch) => {
    removeAuthFromLocal();
    dispatch(authActions.logout());
  };
};

export { checkLoginStatus, loginHandler, logoutHandler };
