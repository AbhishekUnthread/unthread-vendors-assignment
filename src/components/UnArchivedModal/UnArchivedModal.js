import { LoadingButton } from '@mui/lab'
import { 
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Slide,
  Typography,
  Radio,
  RadioGroup
} from '@mui/material'
import React, { forwardRef } from 'react'
import unArchived from "../../assets/images/Components/Archived.png"

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  // ? DIALOG TRANSITION ENDS HERE

const UnArchivedModal = ({ showUnArchivedModal, closeUnArchivedModal, handleUnArchived, handleStatusValue }) => {
  const [statusValue, setStatusValue] = React.useState("in-active");

  const handleStatusRadio = (event) => {
    const value = event.target.value;
    setStatusValue(value);
    handleStatusValue(value);
  }

  console.log(statusValue,'statusValue')

  return (
    <>
    <Dialog
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        fullWidth={true}
        open={showUnArchivedModal}
        onClose={closeUnArchivedModal}
      >
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-3 px-4">
          <Box sx={{  display: 'flex', justifyContent: 'center' }}>
            <img src={unArchived} alt="questionMark" style={{width: '300px', height: '300px'}}/>
          </Box>
          <Typography
            variant="h5"
            align="center"
            sx={{ color: "lightBlue", marginBottom: 2 }}
          >
            Before un-archiving this item, 
            please set it's status.
          </Typography>
          <br />
        </DialogContent>
        <div className="d-flex justify-content-center">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group" 
            value={statusValue}
            onChange={handleStatusRadio}
            className="d-flex justify-content-between px-4 py-3"
            // onClick={(newValue) => {
            //   handleValue(newValue.target.value)
            // }}
          >
            <FormControlLabel
              value="active"
              control={<Radio size="small" />}
              label="Active"
            />
            <FormControlLabel
              value="in-active"
              control={<Radio size="small" />}
              label="In-Active"
            />
          </RadioGroup>
        </div>
        <DialogActions className="d-flex justify-content-between px-4 py-3">
          <button
            className="button-grey py-2 px-5"
            onClick={closeUnArchivedModal}
            type="button"
          >
            <p className="text-lightBlue">No</p>
          </button>
          <LoadingButton
            className="button-gradient py-2 px-5"
            type="button"
            onClick={handleUnArchived}
          >
            <p>Yes</p>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UnArchivedModal;