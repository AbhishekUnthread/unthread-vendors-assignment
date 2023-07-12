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
import closeModal from "../../assets/icons/closeModal.svg";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  // ? DIALOG TRANSITION ENDS HERE

const UnArchivedModal = ({ 
    showUnArchivedModal, 
    closeUnArchivedModal, 
    handleUnArchived, 
    handleStatusValue,
    name,
    nameType
  }) => {
  const [statusValue, setStatusValue] = React.useState("in-active");

  const handleStatusRadio = (event) => {
    const value = event.target.value;
    setStatusValue(value);
    handleStatusValue(value);
  }

  return (
    <>
    <Dialog
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        open={showUnArchivedModal}
        onClose={closeUnArchivedModal}
      >
        <DialogContent className="py-2 px-4 text-center">
          <img src={closeModal} alt="question" width={40} className="closeModal c-pointer" 
            onClick={closeUnArchivedModal}
          />
          <img src={unArchived} alt="question" width={160} className="mb-4 mt-4"/>
          <div className="row"></div>
            <h5 className="text-lightBlue mt-2 mb-2">
              Before un-archiving 
              <span className="text-blue-2"> "{name}" </span>
              {nameType},
                please set it's status.
            </h5>
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
              sx={{
                color: "#5C6D8E",
              }}
            />
            <FormControlLabel
              value="in-active"
              control={<Radio size="small" />}
              label="In-Active"
              sx={{
                color: "#5C6D8E",
              }}
            />
          </RadioGroup>
        </div>
        <DialogActions className="d-flex justify-content-center px-4 py-3">
          <button
              className="button-lightBlue-outline py-2 px-3 me-4"
            onClick={closeUnArchivedModal}
            type="button"
          >
            <p className="text-lightBlue">Cancel</p>
          </button>
          <LoadingButton
            className="button-gradient py-2 px-3"
            type="button"
            onClick={handleUnArchived}
          >
            <p>Un-Archive</p>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UnArchivedModal;