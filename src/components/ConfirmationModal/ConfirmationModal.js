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

const ConfirmationModal = (props) => {
  const { onConfirm, onCancel, show, isLoading, message } = props;

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
            <h5 className="text-lightBlue fw-500">Confirmation</h5>
            <small className="text-grey-6 mt-1 d-block">
              ⓘ Some Dummy Content to explain
            </small>
          </div>
          <button className="reset" onClick={onCancel}>
            <img src={cancel} alt="cancel" width={30} className="c-pointer" />
          </button>
        </div>
      </DialogTitle>
      <hr className="hr-grey-6 my-0" />

      <DialogContent className="py-3 px-4">
        <p className="text-lightBlue mb-2">
          {message ? `Are you sure you want to ${message}?` : "Are you sure?"}
        </p>
      </DialogContent>
      <hr className="hr-grey-6 my-0" />
      <DialogActions className="d-flex justify-content-between px-4 py-3">
        <button onClick={onCancel} className="button-grey py-2 px-5">
          <p className="text-lightBlue">Cancel</p>
        </button>
        <LoadingButton
          loading={isLoading}
          disabled={isLoading}
          onClick={onConfirm}
          className="button-red-outline py-2 px-5"
        >
          <p>Yes</p>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
