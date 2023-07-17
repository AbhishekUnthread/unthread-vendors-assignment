import { forwardRef } from "react";
import { Dialog, DialogActions, DialogContent, Slide } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactRouterPrompt from "react-router-prompt";

import AlertDialog from "../AlertDialog/AlertDialog";

import noData from "../../assets/icons/noData.svg";
import closeModal from "../../assets/icons/closeModal.svg";
import { ReactComponent as ConfirmIcon } from "../../assets/icons/confirm.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DiscardModal = ({ showDiscardModal, toggleDiscardModal }) => {
  const navigate = useNavigate();

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        open={showDiscardModal}
        onClose={toggleDiscardModal}
      >
        <DialogContent className="py-2 px-4 text-center">
          <img
            src={closeModal}
            alt="question"
            width={40}
            className="closeModal c-pointer"
            onClick={toggleDiscardModal}
          />
          <img src={noData} alt="question" width={160} className="mb-4 mt-4" />
          <div className="row"></div>
          <h5 className="text-lightBlue mt-2 mb-2">Exit without saving ?</h5>
          <h6 className="mt-3 mb-4" style={{ color: "#5C6D8E" }}>
            You are about to close this collection with unsaved changes. Would
            like to save these changes before closing ?
          </h6>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center px-4 pb-4">
          <button
            className="button-lightBlue-outline py-2 px-3 me-4"
            onClick={toggleDiscardModal}
          >
            <p>Cancel</p>
          </button>
          <button
            className="button-red-outline py-2 px-3"
            onClick={() => navigate(-1)}
          >
            <p>Exit without saving</p>
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const DiscardModalSecondary = ({ when = false, message,onDiscard }) => {
  return (
    <ReactRouterPrompt when={when}>
      {({ isActive, onConfirm, onCancel }) =>
        isActive && (
          <AlertDialog
            onConfirm={()=>{
              if(onDiscard)
              {
                onDiscard();
                onConfirm();
              }
              else{
                onConfirm();
              }
            }}
            onCancel={onCancel}
            show={isActive}
            title="Exit without saving?"
            primaryMessage={`This ${message || "screen"} can't be saved.`}
            secondaryMessage="Would you like to exit without saving?"
            confirmText="Exit Without Saving"
            icon={<ConfirmIcon width={80} height={80} />}
          />
        )
      }
    </ReactRouterPrompt>
  );
};

export default DiscardModal;
export { DiscardModalSecondary };
