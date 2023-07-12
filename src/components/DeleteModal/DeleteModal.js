import { Box, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import Delete from "../../assets/icons/newDelete.svg";
import closeModal from "../../assets/icons/closeModal.svg";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  // ? DIALOG TRANSITION ENDS HERE

const DeleteModal = ({showCreateModal,toggleArchiveModalHandler,handleArchive,name, deleteType}) => {

  console.log(deleteType,'deleteType')
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
            <img src={closeModal} alt="question" width={40} className="closeModal" 
              onClick={toggleArchiveModalHandler}
            />
            <img src={Delete} alt="question" width={160} className="mb-4 mt-4"/>
            <div className="row"></div>
            <h5 className="text-lightBlue mt-2 mb-2">
              Delete  
              <span className="text-blue-2"> "{name}" </span> collection ?
            </h5>
            <h6 className="mt-3 mb-4" style={{color: "#5C6D8E"}}>
              This will delete the collection from the dashboard and it can't be undone. 
              Are you sure you want to delete the collection ?
            </h6>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center px-4 pb-4">
          <button
            className="button-lightBlue-outline py-2 px-3 me-4"
            onClick={toggleArchiveModalHandler}
          >
            <p>Cancel</p>
          </button>
          <button
            className="button-red-outline py-2 px-3"
            onClick={handleArchive}
          >
            <p>Delete {deleteType}</p>
          </button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteModal