import React from "react";
import "./Attributes.scss";
// ! IMAGES IMPORTS
import info from "../../../../assets/icons/info.svg";
import eyeClosed from "../../../../assets/icons/eyeClosed.svg";
import cancel from "../../../../assets/icons/cancel.svg";
import question from "../../../../assets/images/products/question.svg";
// ! MATERIAL IMPORTS
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Slide,
} from "@mui/material";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const Attributes = () => {
  // ? ADDITIONAL FIELDS DIALOG STARTS HERE
  const [openAdditionalFields, setOpenAdditionalFields] = React.useState(false);

  const handleAdditionalFields = () => {
    setOpenAdditionalFields(true);
  };

  const handleAdditionalFieldsClose = () => {
    setOpenAdditionalFields(false);
  };
  // ? ADDITIONAL FIELDS DIALOG ENDS HERE

  // ? FIELD SETS DIALOG STARTS HERE
  const [openFieldSets, setOpenFieldSets] = React.useState(false);

  const handelFieldSets = () => {
    setOpenFieldSets(true);
  };

  const handelFieldSetsClose = () => {
    setOpenFieldSets(false);
  };
  // ? FIELD SETS DIALOG ENDS HERE

  return (
    <div className="bg-black-2 border-grey-5 rounded-3 p-3 row attributes">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue">
            Additional Fields
          </h6>
          <img src={info} alt="info" className="ms-2" />
        </div>
        <p className="c-pointer text-blue-2" onClick={handleAdditionalFields}>
          Manage Additional Fields
        </p>

        <Dialog
          open={openAdditionalFields}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleAdditionalFieldsClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth={true}
        >
          {/* <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue">Tags</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handleAdditionalFieldsClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle> */}
          {/* <hr className="hr-grey-6 mt-2 mb-0" /> */}
          <DialogContent className="py-2 px-4 text-center">
            <img src={question} alt="question" />
            <div className="row"></div>
            <h5 className="text-lightBlue mt-3 mb-2">
              You have unsaved changes.
            </h5>
            <h5 className="text-lightBlue mt-3 mb-2">
              Are you sure you want to leave this page?
            </h5>
            <div className="d-flex justify-content-center mt-4">
              <hr className="hr-grey-6 w-50" />
            </div>
          </DialogContent>
          <DialogActions className="d-flex justify-content-between px-4 pb-4">
            <button
              className="button-red-outline py-2 px-5"
              onClick={handleAdditionalFieldsClose}
            >
              <p>Leave this page</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handleAdditionalFieldsClose}
            >
              <p>Stay on this page</p>
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <hr className="hr-grey-6 my-3" />
      <div className="d-flex col-12 px-0">
        <p className="text-grey-5">Field Type :</p>
        <p className="mx-1">Metal Field Sets</p>
        <p className="text-blue-2 c-pointer" onClick={handelFieldSets}>
          (Change field sets)
        </p>

        <Dialog
          open={openFieldSets}
          TransitionComponent={Transition}
          keepMounted
          onClose={handelFieldSetsClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue">Select Additional Field Sets</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handelFieldSetsClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 mt-2 mb-0" />
          <DialogContent className="py-3 px-4">
            <p className="text-lightBlue mb-2">Select Field Sets</p>

            <FormControl sx={{ background: "#15142A" }} className="col-7 px-0">
              <OutlinedInput placeholder="Enter Field Sets" size="small" />
            </FormControl>
          </DialogContent>
          <hr className="hr-grey-6 mt-2 mb-0" />
          <DialogActions className="d-flex justify-content-between px-4 pb-2">
            <button
              className="button-red-outline py-2 px-5"
              onClick={handelFieldSetsClose}
            >
              <p>Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handelFieldSetsClose}
            >
              <p>Add</p>
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <hr className="hr-grey-6 mt-3 mb-3" />
      <div className="col-12 mt-1 mb-2 pb-2">
        <div className="row align-items-start">
          <div className="col-4">
            <p className="text-lightBlue">Style Code</p>
            <div className="d-flex">
              <img src={eyeClosed} alt="eyeClosed" width={15} />
              <small className="text-grey-6 ms-2">Customer wont see this</small>
            </div>
          </div>
          <FormControl sx={{ background: "#15142A" }} className="col-7 px-0">
            <OutlinedInput placeholder="Enter Content" size="small" />
          </FormControl>
        </div>
      </div>
      <div className="col-12 mt-1 mb-2 pb-2">
        <div className="row align-items-start">
          <p className="text-lightBlue col-4">Labour Code</p>
          <FormControl sx={{ background: "#15142A" }} className="col-7 px-0">
            <OutlinedInput placeholder="Enter Content" size="small" />
          </FormControl>
        </div>
      </div>
      <div className="col-12 mt-1 mb-2 pb-2">
        <div className="row align-items-start">
          <p className="text-lightBlue col-4">Labour Charge</p>
          <FormControl sx={{ background: "#15142A" }} className="col-7 px-0">
            <OutlinedInput placeholder="Enter Content" size="small" />
          </FormControl>
        </div>
      </div>
      <div className="col-12 mt-1 mb-2 pb-2">
        <div className="row align-items-start">
          <p className="text-lightBlue col-4">Metal Certification</p>
          <FormControl sx={{ background: "#15142A" }} className="col-7 px-0">
            <OutlinedInput placeholder="Enter Content" size="small" />
          </FormControl>
        </div>
      </div>
      <div className="col-12 mt-1 mb-2 pb-2">
        <div className="row align-items-start">
          <p className="text-lightBlue col-4">Metal Weight</p>
          <FormControl sx={{ background: "#15142A" }} className="col-8 px-0">
            <OutlinedInput
              placeholder="Enter Content"
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gm
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
      <div className="col-12">
        <div
          className="row py-3 mb-3"
          style={{ background: "rgba(39, 40, 63, 0.5)" }}
        >
          <div className="col-12 mb-3">
            <p className="text-lightBlue">Diamond Information 1</p>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Diamond Name</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Size (mm)</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Setting Type</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">No of Pieces</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Carat Weight</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
        </div>
        <div
          className="row py-3"
          style={{ background: "rgba(39, 40, 63, 0.5)" }}
        >
          <div className="col-12 mb-3">
            <p className="text-lightBlue">Diamond Information 2</p>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Diamond Name</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Size (mm)</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Setting Type</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">No of Pieces</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Carat Weight</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attributes;
