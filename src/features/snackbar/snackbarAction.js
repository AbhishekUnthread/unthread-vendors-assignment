import { snackbarActions } from "./snackbarSlice";
import store from "../../app/store";

const showSuccess = ({ message, duration }) => {
  return (dispatch) => {
    const currentDuration = store.getState().snackbar.duration;
    dispatch(snackbarActions.show({ message, duration, type: "success" }));
    setTimeout(() => {
      dispatch(snackbarActions.reset());
    }, currentDuration);
  };
};

const showError = ({ message, duration }) => {
  return (dispatch) => {
    const currentDuration = store.getState().snackbar.duration;
    dispatch(snackbarActions.show({ message, duration, type: "error" }));
    setTimeout(() => {
      dispatch(snackbarActions.reset());
    }, currentDuration);
  };
};

const showWarning = ({ message, duration }) => {
  return (dispatch) => {
    const currentDuration = store.getState().snackbar.duration;
    dispatch(snackbarActions.show({ message, duration, type: "warning" }));
    setTimeout(() => {
      dispatch(snackbarActions.reset());
    }, currentDuration);
  };
};

const showInfo = ({ message, duration }) => {
  return (dispatch) => {
    const currentDuration = store.getState().snackbar.duration;
    dispatch(snackbarActions.show({ message, duration, type: "info" }));
    setTimeout(() => {
      dispatch(snackbarActions.reset());
    }, currentDuration);
  };
};

export { showSuccess, showError, showWarning, showInfo };
