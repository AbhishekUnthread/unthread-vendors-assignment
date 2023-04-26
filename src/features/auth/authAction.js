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
  return (dispatch) => {};
};

const logoutHandler = () => {
  return (dispatch) => {};
};

export { checkLoginStatus, loginHandler, logoutHandler };
