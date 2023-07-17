import { forwardRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import cancel from "../../assets/icons/cancel.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog = (props) => {
  const {
    onConfirm,
    onCancel,
    show,
    isLoading,
    title,
    primaryMessage,
    secondaryMessage,
    confirmText,
    icon,
  } = props;

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      fullWidth={true}
      open={show}
      onClose={onCancel}
    >
      <DialogTitle>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column ">
            <h4 className="text-lightBlue fw-500">{title}</h4>
          </div>
          <button className="reset" onClick={onCancel}>
            <img src={cancel} alt="cancel" width={30} className="c-pointer" />
          </button>
        </div>
      </DialogTitle>
      <hr className="hr-grey-6 my-0" />

      <DialogContent className="py-3 px-4 d-flex align-items-center">
        {icon}
        <div>
          <p style={{ fontSize: "16px" }} className="text-grey-6 mx-4">
            {primaryMessage || "Are you sure?"}
          </p>
          <p style={{ fontSize: "16px" }} className="text-grey-6 mx-4">
            {secondaryMessage}
          </p>
        </div>
      </DialogContent>
      <DialogActions className="d-flex justify-content-end px-4 py-3">
        <LoadingButton
          loading={isLoading}
          disabled={isLoading}
          onClick={onConfirm}
          className="button-red-outline py-2 px-4"
          style={{
            lineHeight: 1.6,
            textTransform: "Capitalize",
          }}
        >
          <p>{confirmText ? confirmText : "Yes"}</p>
        </LoadingButton>
        <span className="pe-2" />
        <button
          onClick={onCancel}
          className="button-grey-outline py-2 px-4"
          style={{
            lineHeight: 1.6,
          }}
        >
          <p className="text-lightBlue">Cancel</p>
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
