import SnackbarUtils from "./useSnackbar";

const showSuccess = ({ message, duration }) => {
  return (dispatch) => {
    SnackbarUtils.success(message);
  };
};

const showError = ({ message, duration }) => {
  return (dispatch) => {
    SnackbarUtils.error(message);
  };
};

const showWarning = ({ message, duration }) => {
  return (dispatch) => {
    SnackbarUtils.warning(message);
  };
};

const showInfo = ({ message, duration }) => {
  return (dispatch) => {
    SnackbarUtils.info(message);
  };
};

export { showSuccess, showError, showWarning, showInfo };
