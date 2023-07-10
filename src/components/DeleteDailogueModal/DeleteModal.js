import { LoadingButton } from '@mui/lab'
import { Box, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import question from '../../assets/images/products/question.svg'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  // ? DIALOG TRANSITION ENDS HERE

const DeleteModal = ({showCreateModal,toggleArchiveModalHandler,handleArchive,name=""}) => {
  return (
    <>
    <Dialog
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        open={showCreateModal}
        onClose={toggleArchiveModalHandler}
      >
        <DialogContent className="py-2 px-4 text-center">
        <img src={question} alt="questionMark" width={200}/>
          {/* <Box
            sx={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
            }}
          >
            <img src={question} alt="questionMark" width={200}/>
          </Box> */}
          <h6 className="text-lightBlue mt-2 mb-2"> 
          Are you sure you want to permanently delete  <span className="text-blue-2">{name}</span>?
          </h6>
          {/* <Typography
            variant="h5"
            align="center"
            sx={{ color: "lightBlue", marginBottom: 2 }}
          >
            Are you sure you want to permanently delete  <span className="text-blue-2">{name}</span>?

          </Typography> */}
          <div className="d-flex justify-content-center mt-4">
              <hr className="hr-grey-6 w-100" />
          </div>
        </DialogContent>
        <DialogActions className="d-flex justify-content-between px-4 pb-4">
          <button
            className="button-red-outline py-2 px-4 me-5"
            onClick={toggleArchiveModalHandler}
            type="button"
          >
            <p className="text-lightBlue">No</p>
          </button>
          <LoadingButton
            className="button-gradient py-2 px-5 ms-5"
            type="button"
            onClick={handleArchive}
          >
            <p>Yes</p>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteModal