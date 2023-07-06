import { Box, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import Delete from "../../assets/images/Components/Cancel.png";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  // ? DIALOG TRANSITION ENDS HERE

const DeleteModal = ({showCreateModal,toggleArchiveModalHandler,handleArchive,name}) => {
  return (
    <>
    <Dialog
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        open={showCreateModal}
        onClose={toggleArchiveModalHandler}
      >
          <DialogContent className="py-2 px-4 text-center">
            <img src={Delete} alt="question" width={200} />
            <div className="row"></div>
            <h6 className="text-lightBlue mt-2 mb-2">
              Are you sure you want to delete permanently 
              <span className="text-blue-2">{name} </span> ?
            </h6>
            <div className="d-flex justify-content-center mt-4">
              <hr className="hr-grey-6 w-100" />
            </div>
        </DialogContent>
        <DialogActions className="d-flex justify-content-between px-4 pb-4">
          <button
            className="button-red-outline py-2 px-3 me-5"
            onClick={toggleArchiveModalHandler}
          >
            <p>No</p>
          </button>
          <button
            className="button-gradient py-2 px-3 ms-5"
            onClick={handleArchive}
          >
            <p>Yes</p>
          </button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteModal