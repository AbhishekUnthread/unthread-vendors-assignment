import { userActions } from "./userSlice";

import {
  saveUserToLocal,
  getUserFromLocal,
  removeUserFromLocal,
} from "../../utils/storage";

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

export { setUserHandler, resetUserHandler };
