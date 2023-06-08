import { userActions } from "./userSlice";
import { authActions } from "../auth/authSlice";

import {
  saveUserToLocal,
  getUserFromLocal,
  removeUserFromLocal,
  removeAuthFromLocal,
} from "../../utils/storage";

const checkUserStatus = () => {
  return (dispatch) => {
    const userDetails = getUserFromLocal();
    if (!userDetails) {
      removeAuthFromLocal();
      dispatch(authActions.logout());
      return;
    }
    dispatch(userActions.set(userDetails));
  };
};

const setUserHandler = (userDetails) => {
  return (dispatch) => {
    saveUserToLocal(userDetails);
    dispatch(userActions.set(userDetails));
  };
};

const resetUserHandler = () => {
  return (dispatch) => {
    removeUserFromLocal();
    dispatch(userActions.reset());
  };
};

export { setUserHandler, resetUserHandler, checkUserStatus };
