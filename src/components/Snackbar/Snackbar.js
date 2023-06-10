import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";

import { snackbarActions } from "../../features/snackbar/snackbarSlice";

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Messages = () => {
  const snackbarDetails = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  const closeSnackbarHandler = () => {
    dispatch(snackbarActions.reset());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={snackbarDetails.open}
      autoHideDuration={snackbarDetails.duration}
      onClose={closeSnackbarHandler}
    >
      <Alert variant={snackbarDetails.type}>{snackbarDetails.message}</Alert>
    </Snackbar>
  );
};

export default Messages;
