import React from "react";
// ! IMAGES IMPORTS
import cancel from "../../assets/icons/cancel.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Slide,
  TextareaAutosize,
} from "@mui/material";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const AddNotesDialog = () => {
  // ? NOTES DIALOG STARTS HERE
  const [openAddNotes, setOpenAddNotes] = React.useState(false);

  const handleNotesClick = () => {
    setOpenAddNotes(true);
  };

  const handleNotesClose = () => {
    setOpenAddNotes(false);
  };
  // ? NOTES DIALOG ENDS HERE

  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  return (
    <React.Fragment>
      <button
        className="button-gradient py-2 px-3 ms-2"
        onClick={handleNotesClick}
      >
        <small>+ Add Notes</small>
      </button>

      <Dialog
        open={openAddNotes}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleNotesClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column ">
              <h5 className="text-lightBlue fw-500">Add Notes</h5>
              <small className="text-lightBlue mt-1 d-block">
                saniya@mydesignar.com
              </small>
            </div>
            <img
              src={cancel}
              alt="cancel"
              width={30}
              onClick={handleNotesClose}
              className="c-pointer"
            />
          </div>
        </DialogTitle>
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="pt-3 pb-4 px-4">
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                  width: "auto",
                }}
              />
            }
            label="Notify User"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "0.875rem",
                // color: "#c8d8ff",
                color: "#5c6d8e",
              },
            }}
            className=" px-0"
          />
          <TextareaAutosize
            aria-label="meta description"
            placeholder="Type Something"
            style={{
              background: "#15142A",
              color: "#c8d8ff",
              borderRadius: 5,
            }}
            minRows={3}
            className="col-12 mt-3"
          />
        </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex justify-content-between px-4 py-3">
          <button className="button-grey py-2 px-5" onClick={handleNotesClose}>
            <p className="text-lightBlue">Cancel</p>
          </button>
          <button
            className="button-gradient py-2 px-5"
            onClick={handleNotesClose}
          >
            <p>Save</p>
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddNotesDialog;
