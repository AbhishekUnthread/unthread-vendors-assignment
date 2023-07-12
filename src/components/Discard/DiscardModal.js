import { Dialog, DialogActions, DialogContent, Slide } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { forwardRef } from 'react'

import noData from "../../assets/icons/noData.svg";
import closeModal from "../../assets/icons/closeModal.svg";

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
            <img src={closeModal} alt="question" width={40} className="closeModal c-pointer" 
              onClick={toggleDiscardModal}
            />
            <img src={noData} alt="question" width={160} className="mb-4 mt-4"/>
            <div className="row"></div>
            <h5 className="text-lightBlue mt-2 mb-2">
                Exit without saving ?
            </h5>
            <h6 className="mt-3 mb-4" style={{color: "#5C6D8E"}}>
                You are about to close this collection with unsaved changes.
                Would like to save these changes before closing ?
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
  )
}

export default DiscardModal;