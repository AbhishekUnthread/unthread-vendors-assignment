import { forwardRef, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Messages = ({ messageLine, setMessage }) => {
  const snackbarDetails = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ snackbarDetails });
  }, [snackbarDetails]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={messageLine ? true : false}
      autoHideDuration={200000}
      onClose={() => setMessage("")}
    >
      <Alert variant={snackbarDetails.type}>{messageLine}</Alert>
    </Snackbar>
  );
};

export default Messages;
