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
  Tooltip,
  Chip,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";

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
  const [variantSets, setVariantSets] = React.useState(10);

  const handleVariantSetsChange = (event) => {
    setVariantSets(event.target.value);
  };
  // ? VARIANT SETS SELECT ENDS HERE

  // ? FIELD SETS DIALOG STARTS HERE
  const [openFieldSets, setOpenFieldSets] = React.useState(false);

  const handelFieldSets = () => {
    setOpenFieldSets(true);
  };

  const handelFieldSetsClose = () => {
    setOpenFieldSets(false);
  };
  // ? FIELD SETS DIALOG ENDS HERE

  // ? SIZE SELECT STARTS HERE
  const [size, setSize] = React.useState("");

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  // ? SIZE SELECT ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
      <div className="d-flex col-12 px-0 justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center">
            <h6 className="text-lightBlue fw-500 me-2">Options</h6>
            <Tooltip title="Lorem ipsum" placement="top">
              <img src={info} alt="info" className="c-pointer" width={13.5} />
            </Tooltip>
          </div>
          <small className="text-grey-6 mt-2">
            If this product has options, like size or color then add options
          </small>
        </div>
        <div className="d-flex">
          <button
            className="button-lightBlue-outline py-2 px-3"
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
                <h5 className="text-lightBlue fw-500">Import Option Sets</h5>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleImportOptionsClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">Select Option Sets</p>
              <div className="row mx-0">
                <FormControl
                  sx={{
                    m: 0,
                    minWidth: 120,
                  }}
                  size="small"
                  className="col-md-6"
                >
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
                    <MenuItem
                      value={10}
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Ring Sets
                    </MenuItem>
                    <MenuItem
                      value={20}
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Bangle Sets
                    </MenuItem>
                    <MenuItem
                      value={30}
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Chain Sets
                    </MenuItem>
                    <MenuItem
                      value={40}
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Default Option Sets
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button
                className="button-grey py-2 px-5"
                onClick={handleImportOptionsClose}
              >
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button
                className="button-gradient py-2 px-4"
                onClick={handleImportOptionsClose}
              >
                <p>Import Option Sets</p>
              </button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <hr className="hr-grey-6 mt-3 mb-3" />
      <div className="d-flex col-12 px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex">
            <p className="text-grey-6">Option Set:</p>
            <p className="mx-1 text-lightBlue">Ring Sets</p>
          </div>
          <div className="d-flex">
            <p className="text-blue-2 c-pointer" onClick={handelFieldSets}>
              Change Option Sets
            </p>
            <p className="text-grey-6 mx-2">|</p>
            <p className="cursor-pointer text-red-5 c-pointer">Remove</p>
          </div>
        </div>

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
              <h5 className="text-lightBlue fw-500">
                Select Additional Field Sets
              </h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handelFieldSetsClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 my-0" />
          <DialogContent className="py-3 px-4">
            <p className="text-lightBlue mb-2">Select Field Sets</p>
            <FormControl className="col-7 px-0" size="small">
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
                  Metal Field Sets
                </MenuItem>
                <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  Diamond Field Sets
                </MenuItem>
                <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  Gold Coin Field Sets
                </MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              className="button-grey py-2 px-5"
              onClick={handelFieldSetsClose}
            >
              <p className="text-lightBlue">Cancel</p>
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
      <hr className="hr-grey-6 mt-3 mb-0" />
      <div className="col-12 ">
        <div className="row py-3 border-grey-5 rounded-8 align-items-center bg-black-13 mt-3">
          <div className="col-md-8 col-6 d-flex">
            <FormControl
              sx={{
                m: 0,
                minWidth: 120,
                width: "100%",
              }}
            >
              <OutlinedInput placeholder="Enter Size" size="small" />
            </FormControl>
          </div>
          <div className="d-flex col-md-4 col-6 justify-content-end">
            <Tooltip title="Edit" placement="top">
              <div className="table-edit-icon rounded-4 p-2">
                <EditOutlinedIcon
                  sx={{
                    color: "#5c6d8e",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              </div>
            </Tooltip>
            <Tooltip title="Delete" placement="top">
              <div className="table-edit-icon rounded-4 p-2">
                <InventoryIcon
                  sx={{
                    color: "#5c6d8e",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              </div>
            </Tooltip>
          </div>
          <div className="col-12 mt-2">
            <small className="text-grey-6">
              Input Field Type:&nbsp;
              <span className="text-lightBlue">Dropdown</span>
            </small>
          </div>
          <div className="col-12 d-flex mt-2">
            <Chip label="S" size="small" className="px-1 me-2" />
            <Chip label="M" size="small" className="px-1 me-2" />
            <Chip label="L" size="small" className="px-1 me-2" />
            <Chip label="XL" size="small" className="px-1 me-2" />
          </div>
        </div>
        <div className="row py-3 border-grey-5 rounded-8 align-items-center bg-black-13 mt-3">
          <div className="col-md-8 col-6 d-flex">
            <FormControl
              sx={{
                m: 0,
                minWidth: 120,
                width: "100%",
              }}
            >
              <OutlinedInput placeholder="Enter Size" size="small" />
            </FormControl>
          </div>

          <div className="d-flex col-md-4 col-6 justify-content-end">
            <Tooltip title="Edit" placement="top">
              <div className="table-edit-icon rounded-4 p-2">
                <EditOutlinedIcon
                  sx={{
                    color: "#5c6d8e",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              </div>
            </Tooltip>
            <Tooltip title="Delete" placement="top">
              <div className="table-edit-icon rounded-4 p-2">
                <InventoryIcon
                  sx={{
                    color: "#5c6d8e",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              </div>
            </Tooltip>
          </div>
          <div className="col-12 mt-2">
            <small className="text-grey-6">
              Input Field Type:&nbsp;
              <span className="text-lightBlue">Dropdown</span>
            </small>
          </div>
          <div className="col-12 d-flex mt-2">
            <Chip label="S" size="small" className="px-1 me-2" />
            <Chip label="M" size="small" className="px-1 me-2" />
            <Chip label="L" size="small" className="px-1 me-2" />
            <Chip label="XL" size="small" className="px-1 me-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
