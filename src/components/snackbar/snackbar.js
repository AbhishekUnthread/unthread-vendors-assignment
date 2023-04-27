import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Messages = ({ messageLine, setMessage }) => {
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={messageLine ? true : false}
        autoHideDuration={200000}
        onClose={() => setMessage("")}
      >
        <Alert>{messageLine}</Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Messages;
