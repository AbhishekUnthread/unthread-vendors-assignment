import React from "react";
import "./Options.scss";
// ! IMAGES IMPORTS
import info from "../../../../assets/icons/info.svg";
import cancel from "../../../../assets/icons/cancel.svg";
// ! MATERIAL IMPORTS
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
} from "@mui/material";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const Options = () => {
  // ? IMPORT VARIANT DIALOG STARTS HERE
  const [importOptions, setImportOptions] = React.useState(false);

  const handleImportOptions = () => {
    setImportOptions(true);
  };

  const handleImportOptionsClose = () => {
    setImportOptions(false);
  };
  // ? IMPORT VARIANT ENDS HERE

  // ? VARIANT SETS SELECT STARTS HERE
  const [variantSets, setVariantSets] = React.useState("");

  const handleVariantSetsChange = (event) => {
    setVariantSets(event.target.value);
  };
  // ? VARIANT SETS SELECT ENDS HERE

  // ? ADD OPTIONS STARTS HERE
  const [addOptions, setAddOptions] = React.useState(false);

  const handleAddOptions = () => {
    setAddOptions(true);
  };
  // ? ADD OPTIONS SELECT ENDS HERE

  // ? SIZE SELECT STARTS HERE
  const [size, setSize] = React.useState("");

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  // ? SIZE SELECT ENDS HERE

  // ? INPUT FIELD TYPE SELECT STARTS HERE
  const [inputFieldType, setInputFieldType] = React.useState("");

  const handleInputFieldType = (event) => {
    setInputFieldType(event.target.value);
  };
  // ? INPUT FIELD TYPE SELECT ENDS HERE

  return (
    <div className="bg-black-2 border-grey-5 rounded-3 p-3 row attributes">
      <div className="d-flex col-12 px-0 justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center">
            <h6 className="text-lightBlue text-lightBlue">
              Options & Variants
            </h6>
            <img src={info} alt="info" className="ms-2" />
          </div>
          <small className="text-lightBlue mt-1">
            If this product has options, like size or color then add options
          </small>
        </div>
        <div className="d-flex">
          <button
            className="button-lightBlue-outline py-2 px-3 me-3"
            onClick={handleImportOptions}
          >
            <p>Import Options</p>
          </button>

          <Dialog
            open={importOptions}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleImportOptionsClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="text-lightBlue">Import Variant Sets Sets</h5>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleImportOptionsClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 mt-2 mb-0" />
            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">Select Variant Sets</p>

              {/* <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Field Sets" size="small" />
              </FormControl> */}

              <FormControl
                sx={{
                  m: 0,
                  minWidth: 120,
                  width: "50%",
                  background: "#15142A",
                }}
                size="small"
              >
                {/* <InputLabel id="demo-select-small">Select Size</InputLabel> */}
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={variantSets}
                  onChange={handleVariantSetsChange}
                  size="small"
                >
                  <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    None
                  </MenuItem>
                  <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Ring Sets
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Bangle Sets
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Chain Sets
                  </MenuItem>
                  <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Default Variant Sets
                  </MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <hr className="hr-grey-6 mt-2 mb-0" />
            <DialogActions className="d-flex justify-content-between px-4 pb-2">
              <button
                className="button-lightBlue-outline py-2 px-4"
                onClick={handleImportOptionsClose}
              >
                <p>Cancel</p>
              </button>
              <button
                className="button-gradient py-2 px-4"
                onClick={handleImportOptionsClose}
              >
                <p>Import Variant Sets</p>
              </button>
            </DialogActions>
          </Dialog>
          <button
            className="button-gradient py-2 px-3"
            onClick={handleAddOptions}
          >
            <p>Import Variant Options</p>
          </button>
        </div>
      </div>
      <hr className="hr-grey-6 mt-3 mb-3" />
      {addOptions && (
        <div className="col-12 mt-1 mb-2 pb-2 ">
          <div
            className="row py-3 mb-3 border-grey-5 rounded-3"
            style={{ background: "rgba(39, 40, 63, 0.5)" }}
          >
            <div className="col-md-6 mb-3">
              <div className="d-flex align-item-center mb-2">
                <p className="text-lightBlue ">Enter Option Name</p>
                <img src={info} alt="info" className="ms-2" width={15} />
              </div>
              <FormControl
                sx={{
                  m: 0,
                  minWidth: 120,
                  width: "100%",
                  background: "#15142A",
                }}
                size="small"
              >
                {/* <InputLabel id="demo-select-small">Select Size</InputLabel> */}
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={size}
                  onChange={handleSizeChange}
                  size="small"
                >
                  <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    None
                  </MenuItem>
                  <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    S
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    M
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    L
                  </MenuItem>
                  <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    XL
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex align-item-center mb-2">
                <p className="text-lightBlue">Input Field Type</p>
                <img src={info} alt="info" className="ms-2" width={15} />
              </div>
              <FormControl
                sx={{
                  m: 0,
                  minWidth: 120,
                  width: "100%",
                  background: "#15142A",
                }}
                size="small"
              >
                {/* <InputLabel id="demo-select-small">Select Size</InputLabel> */}
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={inputFieldType}
                  onChange={handleInputFieldType}
                  size="small"
                >
                  <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    None
                  </MenuItem>
                  <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Drop-Down List
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Drop-Down List with Thumbnails
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Images & Color Swatches
                  </MenuItem>
                  <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Radio Buttons
                  </MenuItem>
                  <MenuItem value={50} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Multiple Select
                  </MenuItem>
                  <MenuItem value={60} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Circle Buttons
                  </MenuItem>
                  <MenuItem value={70} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Square Button
                  </MenuItem>
                  <MenuItem value={80} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Text Field
                  </MenuItem>
                  <MenuItem value={90} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    File Uploader
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12 text-end mb-3">
              <button className="button-gradient py-2 px-3 ms-auto">
                <p>+ Add Condition</p>
              </button>
            </div>
            <div className="col-12 text-end d-flex justify-content-end">
              <button className="button-lightBlue-outline py-2 px-4 me-2">
                <p>Discard</p>
              </button>
              <button className="button-gradient py-2 px-5">
                <p>Save</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;
