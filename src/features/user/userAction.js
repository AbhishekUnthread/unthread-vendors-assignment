import { userActions } from "./userSlice";

import {
  saveUserToLocal,
  getUserFromLocal,
  removeUserFromLocal,
} from "../../utils/storage";

const setUserHandler = () => {
  return (dispatch) => {};
};

export { setUserHandler };
