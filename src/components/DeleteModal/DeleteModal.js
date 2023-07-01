import { LoadingButton } from '@mui/lab'
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
            <img 
              src={Delete}
              alt="questionMark"
              width="250px"
            />
          </Box>
          <Typography
            variant="h5"
            align="center"
            sx={{ color: "lightBlue", marginBottom: 2 }}
          >
            Are you sure you want to delete permanently {name} ?
          </Typography>
          <br />
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