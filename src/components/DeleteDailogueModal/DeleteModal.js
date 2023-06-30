import { LoadingButton } from '@mui/lab'
import { Box, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import question from "../../assets/icons/question.svg"

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
        fullWidth={true}
        open={showCreateModal}
        onClose={toggleArchiveModalHandler}
      >
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-3 px-4">
          <Box
            sx={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
            }}
          >
            <img src={question} alt="questionMark" />
          </Box>
          <Typography
            variant="h5"
            align="center"
            sx={{ color: "lightBlue", marginBottom: 2 }}
          >
            Are you sure you want to {name}?
          </Typography>
          <br />
        </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex justify-content-between px-4 py-3">
          <button
            className="button-grey py-2 px-5"
            onClick={toggleArchiveModalHandler}
            type="button"
          >
            <p className="text-lightBlue">No</p>
          </button>
          <LoadingButton
            className="button-gradient py-2 px-5"
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