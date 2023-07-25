import React, { forwardRef } from 'react'
import AlertDialog from '../AlertDialog/AlertDialog'
import archiveIcon from "../../assets/images/Components/Archived.png"
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup, Slide } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import cancel from "../../assets/icons/cancel.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function UnArchiveModal(props) {
    const {
        onConfirm,
        onCancel,
        show,
        isLoading,
        title,
        primaryMessage,
        secondaryMessage,
        confirmText,
        icon,
        handleStatusValue
      } = props;
      const [statusValue, setStatusValue] = React.useState("in-active");

      const handleStatusRadio = (event) => {
        const value = event.target.value;
        setStatusValue(value);
        handleStatusValue(value);
      }
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
            <h4 className="text-lightBlue fw-500">{title}</h4>
          </div>
          <button className="reset" onClick={onCancel}>
            <img src={cancel} alt="cancel" width={30} className="c-pointer" />
          </button>
        </div>
      </DialogTitle>
      <hr className="hr-grey-6 my-0" />

      <DialogContent className="pt-3 pb-0 px-4 d-flex align-items-center">

        <img src={icon} alt="icon" style={{ width: "80px", height: "80px" }} />
        <div>
          <p
            style={{ fontSize: "16px" }}
            className="text-grey-6 mx-4"
            dangerouslySetInnerHTML={{
              __html: primaryMessage || "Are you sure?",
            }}
          ></p>
          <p
            style={{ fontSize: "16px" }}
            className="text-grey-6 mx-4"
            dangerouslySetInnerHTML={{ __html: secondaryMessage }}
          ></p>
     </div>
      </DialogContent>
      <div className=" d-flex justify-content-center">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group" 
            value={statusValue}
            onChange={handleStatusRadio}
            className="d-flex justify-content-between px-4 py-3"
          >
            <FormControlLabel
              value="active"
              control={<Radio size="small" />}
              label="Active"
              sx={{
                color: statusValue == "active" ? "#c8d8ff" : "#5C6D8E",
              }}
            />
            <FormControlLabel
              value="in-active"
              control={<Radio size="small" />}
              label="In-Active"
              sx={{
                color: statusValue == "in-active" ? "#c8d8ff" : "#5C6D8E",
              }}
            />
          </RadioGroup>
        </div>
      <DialogActions className="d-flex justify-content-end px-4 py-3">
        <LoadingButton
          loading={isLoading}
          disabled={isLoading}
          onClick={onConfirm}
          className="button-red-outline py-2 px-4"
          style={{
            lineHeight: 1.6,
            textTransform: "Capitalize",
          }}
        >
          <p>{confirmText ? confirmText : "Yes"}</p>
        </LoadingButton>
        <span className="pe-2" />
        <button
          onClick={onCancel}
          className="button-grey-outline py-2 px-4"
          style={{
            lineHeight: 1.6,
          }}
        >
          <p className="text-lightBlue">Cancel</p>
        </button>
      </DialogActions>
    </Dialog>
  )
}


function MultipleUnArchiveModal(props) {
    const {
        onConfirm,
        onCancel,
        show,
        isLoading,
        title,
        primaryMessage,
        secondaryMessage,
        confirmText,
        icon,
        handleStatusValue
      } = props;
      const [statusValue, setStatusValue] = React.useState("in-active");

      const handleStatusRadio = (event) => {
        const value = event.target.value;
        setStatusValue(value);
        handleStatusValue(value);
      }
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
            <h4 className="text-lightBlue fw-500">{title}</h4>
          </div>
          <button className="reset" onClick={onCancel}>
            <img src={cancel} alt="cancel" width={30} className="c-pointer" />
          </button>
        </div>
      </DialogTitle>
      <hr className="hr-grey-6 my-0" />

      <DialogContent className="pt-3 pb-0 px-4 d-flex align-items-center">

        <img src={icon} alt="icon" style={{ width: "80px", height: "80px" }} />
        <div>
          <p
            style={{ fontSize: "16px" }}
            className="text-grey-6 mx-4"
            dangerouslySetInnerHTML={{
              __html: primaryMessage || "Are you sure?",
            }}
          ></p>
          <p
            style={{ fontSize: "16px" }}
            className="text-grey-6 mx-4"
            dangerouslySetInnerHTML={{ __html: secondaryMessage }}
          ></p>
     </div>
      </DialogContent>
      <div className=" d-flex justify-content-center">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group" 
            value={statusValue}
            onChange={handleStatusRadio}
            className="d-flex justify-content-between px-4 py-3"
          >
            <FormControlLabel
              value="active"
              control={<Radio size="small" />}
              label="Active"
              sx={{
                color: statusValue == "active" ? "#c8d8ff" : "#5C6D8E",
              }}
            />
            <FormControlLabel
              value="in-active"
              control={<Radio size="small" />}
              label="In-Active"
              sx={{
                color: statusValue == "in-active" ? "#c8d8ff" : "#5C6D8E",
              }}
            />
          </RadioGroup>
        </div>
      <DialogActions className="d-flex justify-content-end px-4 py-3">
        <LoadingButton
          loading={isLoading}
          disabled={isLoading}
          onClick={onConfirm}
          className="button-red-outline py-2 px-4"
          style={{
            lineHeight: 1.6,
            textTransform: "Capitalize",
          }}
        >
          <p>{confirmText ? confirmText : "Yes"}</p>
        </LoadingButton>
        <span className="pe-2" />
        <button
          onClick={onCancel}
          className="button-grey-outline py-2 px-4"
          style={{
            lineHeight: 1.6,
          }}
        >
          <p className="text-lightBlue">Cancel</p>
        </button>
      </DialogActions>
    </Dialog>
  )
}

function UnArchiveModalSecondary(props) {
  const { onConfirm, onCancel, show, isLoading, message, title } = props;
return (
  <AlertDialog
  onConfirm={onConfirm}
  onCancel={onCancel}
  show={show}
  title={title ? `Un-Archive ${title} ?` : "Un-Archive ?"}
  primaryMessage={`Do you want to Un-Archive <span class='text-blue-1'>${message}</span> ?`}
  confirmText="Un-Archive"
  isLoading={isLoading}
  icon={archiveIcon}
/>
)
}

function UnMultipleArchiveModalSecondary(props) {
  const { onConfirm, onCancel, show, isLoading, message, title, pronoun } = props;
return (
  <AlertDialog
  onConfirm={onConfirm}
  onCancel={onCancel}
  show={show}
  title={title ? `Un-Archive ${title} ?` : "Un-Archive?"}
  primaryMessage={`This will Un-Archive ${
    message
      ? ` <span class='text-blue-1'>${message}</span>`
      : "<span class='text-blue-1'>selected</span>"
  } from the dashboard. `}
  secondaryMessage={`Would you like to Un-Archive ${pronoun} ?`}
  confirmText="Un-Archive"
  isLoading={isLoading}
  icon={archiveIcon}
/>
)
}


export default UnArchiveModal;
export  {MultipleUnArchiveModal,UnArchiveModalSecondary,UnMultipleArchiveModalSecondary};