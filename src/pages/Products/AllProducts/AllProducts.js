import React, { useMemo } from "react";
import PropTypes from "prop-types";
import "./AllProducts.scss";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
// ! IMAGES IMPORTS
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import columns from "../../../assets/icons/columns.svg";
import cancel from "../../../assets/icons/cancel.svg";
import tutorial from "../../../assets/icons/tutorial.svg";
import allFlag from "../../../assets/images/products/allFlag.svg";
import usaFlag from "../../../assets/images/products/usaFlag.svg";
import ukFlag from "../../../assets/images/products/ukFlag.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import sort from "../../../assets/icons/sort.svg";
import uploadLineSheet from "../../../assets/images/products/uploadLineSheet.svg";
import uploadCompanySheet1 from "../../../assets/images/products/uploadCompanySheet1.svg";
import uploadCompanySheet2 from "../../../assets/images/products/uploadCompanySheet2.svg";
import filter from "../../../assets/icons/filter.svg";
// ! COMPONENT IMPORTS
import AllProductsTable from "../AllProductsTable/AllProductsTable";
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Slide,
  SwipeableDrawer,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

// ? SEARCH INPUT STARTS HERE
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: "#1c1b33",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: 0,
    width: "auto",
  },
  backgroundColor: "#1c1b33",
  height: "37.6px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: theme.spacing(1.5),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
  },
}));
// ? SEARCH INPUT ENDS HERE

// ? TABS STARTS HERE
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
// ? TABS ENDS HERE

// ? FILTER ACCORDIAN STARTS HERE
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#c8d8ff" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    padding: "0px",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "0 16px ",
}));
// ? FILTER ACCORDIAN ENDS HERE

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? FILE UPLOAD STARTS HERE
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
  borderWidth: 2,
  borderRadius: 8,
  borderColor: "#38395c",
  borderStyle: "dashed",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
// ? FILE UPLOAD ENDS HERE

const vendorData = [
  { title: "Content 1", value: "content1" },
  { title: "Content 2", value: "content2" },
  { title: "Content 3", value: "content3" },
  { title: "Content 4", value: "content4" },
  { title: "Content 5", value: "content5" },
  { title: "Content 6", value: "content6" },
  { title: "Content 7", value: "content7" },
  { title: "Content 8", value: "content8" },
  { title: "Content 9", value: "content9" },
  { title: "Content 10", value: "content10" },
  { title: "Content 11", value: "content11" },
  { title: "Content 12", value: "content12" },
];
const taggedWithData = [
  { title: "Tag 1", value: "tag1" },
  { title: "Tag 2", value: "tag2" },
  { title: "Tag 3", value: "tag3" },
  { title: "Tag 4", value: "tag4" },
  { title: "Tag 5", value: "tag5" },
  { title: "Tag 6", value: "tag6" },
  { title: "Tag 7", value: "tag7" },
  { title: "Tag 8", value: "tag8" },
  { title: "Tag 9", value: "tag9" },
  { title: "Tag 10", value: "tag10" },
  { title: "Tag 11", value: "tag11" },
  { title: "Tag 12", value: "tag12" },
];

const AllProducts = () => {
  const [value, setValue] = React.useState(0);
  const [valueExport, setExportValue] = React.useState(0);
  const [importValue, setImportValue] = React.useState("importProducts");
  const [importSecondValue, setImportSecondValue] =
    React.useState("uploadLineSheet");

  const handleImportChange = (event, newValue) => {
    setImportValue(newValue);
  };
  const handleImportSecondChange = (event, newValue) => {
    setImportSecondValue(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleExportChange = (event, newValue) => {
    setExportValue(newValue);
  };

  // ? FILTER DRAWER STARTS HERE
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  // ? FILTER DRAWER ENDS HERE

  // ? POPOVERS STARTS HERE

  // * FLAG POPOVERS STARTS
  const [anchorFlagEl, setAnchorFlagEl] = React.useState(null);
  const handleFlagClick = (event) => {
    setAnchorFlagEl(event.currentTarget);
  };
  const handleFlagClose = () => {
    setAnchorFlagEl(null);
  };
  const openFlag = Boolean(anchorFlagEl);
  const idFlag = openFlag ? "simple-popover" : undefined;
  // * FLAG POPOVERS ENDS

  // * COLUMNS POPOVERS STARTS
  const [anchorColumnsEl, setAnchorColumnsEl] = React.useState(null);

  const handleColumnsClick = (event) => {
    setAnchorColumnsEl(event.currentTarget);
  };

  const handleColumnsClose = () => {
    setAnchorColumnsEl(null);
  };

  const openColumns = Boolean(anchorColumnsEl);
  const idColumns = openColumns ? "simple-popover" : undefined;
  // * COLUMNS POPOVERS ENDS

  // * SORT POPOVERS STARTS
  const [anchorSortEl, setAnchorSortEl] = React.useState(null);

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;
  // * SORT POPOVERS ENDS

  // * VENDOR POPOVERS STARTS
  const [anchorVendorEl, setAnchorVendorEl] = React.useState(null);

  const handleVendorClick = (event) => {
    setAnchorVendorEl(event.currentTarget);
  };

  const handleVendorClose = () => {
    setAnchorVendorEl(null);
  };

  const openVendor = Boolean(anchorVendorEl);
  const idVendor = openVendor ? "simple-popover" : undefined;
  // * VENDOR POPOVERS ENDS

  // * CATEGORY POPOVERS STARTS
  const [anchorCategoryEl, setAnchorCategoryEl] = React.useState(null);

  const handleCategoryClick = (event) => {
    setAnchorCategoryEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setAnchorCategoryEl(null);
  };

  const openCategory = Boolean(anchorCategoryEl);
  const idCategory = openCategory ? "simple-popover" : undefined;
  // * CATEGORY POPOVERS ENDS

  // * TAGGED WITH POPOVERS STARTS
  const [anchorTaggedWithEl, setAnchorTaggedWithEl] = React.useState(null);

  const handleTaggedWithClick = (event) => {
    setAnchorTaggedWithEl(event.currentTarget);
  };

  const handleTaggedWithClose = () => {
    setAnchorTaggedWithEl(null);
  };

  const openTaggedWith = Boolean(anchorTaggedWithEl);
  const idTaggedWith = openTaggedWith ? "simple-popover" : undefined;
  // * TAGGED WITH POPOVERS ENDS

  // ? POPOVERS ENDS HERE

  // ? FILTER ACCORDIAN STARTS HERE
  const [expanded, setExpanded] = React.useState("panel1");

  const handleAccordianChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // ? FILTER ACCORDIAN ENDS HERE

  // ? EXPORT DIALOG STARTS HERE
  const [openExport, setOpenExport] = React.useState(false);

  const handleExportOpen = () => {
    setOpenExport(true);
  };

  const handleExportClose = () => {
    setOpenExport(false);
  };
  // ? EXPORT DIALOG ENDS HERE

  // ? IMPORT DIALOG STARTS HERE
  const [openImport, setOpenImport] = React.useState(false);

  const handleImportOpen = () => {
    setOpenImport(true);
  };

  const handleImportClose = () => {
    setOpenImport(false);
  };
  // ? IMPORT DIALOG ENDS HERE

  // ? IMPORT SECOND DIALOG STARTS HERE
  const [openImportSecond, setOpenImportSecond] = React.useState(false);

  const handleImportSecondOpen = () => {
    setOpenImport(false);
    setOpenImportSecond(true);
  };

  const handleImportSecondClose = () => {
    setOpenImportSecond(false);
  };
  // ? IMPORT SECOND DIALOG ENDS HERE

  // ? FILE UPLOAD STARTS HERE
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  // ? FILE UPLOAD ENDS HERE

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">All Products</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3">
            <img src={tutorial} alt="tutorial" className="me-2" width={20} />
            <p className="text-blue-gradient">Tutorial</p>
          </button>
          <button
            className="button-transparent me-1 py-2 px-3"
            onClick={handleExportOpen}
          >
            <p className="text-lightBlue">Export</p>
          </button>

          <button
            className="button-transparent me-3 py-2 px-3 me-3"
            onClick={handleImportOpen}
          >
            <p className="text-lightBlue">Import</p>
          </button>
          <Link
            to="/products/allProducts/addProduct"
            className="button-gradient py-2 px-4"
          >
            <p>+ Add Product</p>
          </Link>
        </div>
        <Dialog
          open={openExport}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleExportClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue fw-500">Export Products</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handleExportClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 my-0" />
          <DialogContent className="py-3 px-4">
            <p className="text-lightBlue mb-2">Export</p>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueExport}
                onChange={handleExportChange}
              >
                <FormControlLabel
                  value="currentPage"
                  control={<Radio size="small" />}
                  label="Current Page"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="allProducts"
                  control={<Radio size="small" />}
                  label="All Products"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
            <p className="text-lightBlue mb-2 mt-3">Export as</p>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueExport}
                onChange={handleExportChange}
              >
                <FormControlLabel
                  value="csvForExcel"
                  control={<Radio size="small" />}
                  label="CSV for Excel, Number or other Spreadsheet program"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="plainCsvFile"
                  control={<Radio size="small" />}
                  label="Plain CSV File"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
            <p className="text-lightBlue mb-2 mt-3">HTML format</p>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueExport}
                onChange={handleExportChange}
              >
                <FormControlLabel
                  value="normalText"
                  control={<Radio size="small" />}
                  label="Normal Text"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="htmlCodedText"
                  control={<Radio size="small" />}
                  label="HTML Coded Text"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              className="button-grey py-2 px-5"
              onClick={handleExportClose}
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handleExportClose}
            >
              <p className="">Continue</p>
            </button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openImport}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleImportClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue fw-500">Import Products</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handleImportClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 my-0" />
          <DialogContent className="py-2 px-4">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={importValue}
                onChange={handleImportChange}
              >
                <FormControlLabel
                  value="importProducts"
                  control={<Radio size="small" />}
                  label="Import Products from Existing Site"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <FormControlLabel
                  value="bulkImportProducts"
                  control={<Radio size="small" />}
                  label="Bulk Import Products"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              className="button-grey py-2 px-5"
              onClick={handleImportClose}
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handleImportSecondOpen}
            >
              <p>Continue</p>
            </button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openImportSecond}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleImportSecondClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-lightBlue fw-500">Import Products</h5>
              <img
                src={cancel}
                alt="cancel"
                width={30}
                onClick={handleImportSecondClose}
                className="c-pointer"
              />
            </div>
          </DialogTitle>
          <hr className="hr-grey-6 my-0" />
          <DialogContent className="py-2 px-4">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={importSecondValue}
                onChange={handleImportSecondChange}
              >
                <FormControlLabel
                  value="uploadCompanySheet"
                  control={<Radio size="small" />}
                  label="Upload Company line sheet"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />

                <FormControlLabel
                  value="uploadLineSheet"
                  control={<Radio size="small" />}
                  label="Upload your own line sheet"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />

                {importSecondValue === "uploadCompanySheet" && (
                  <div className="d-flex flex-column">
                    <small className="text-grey-6"> Note :</small>
                    <small className="text-grey-6">
                      1. Upload the skeleton file and Map it with the Company
                      Data.
                    </small>
                    <small className="text-grey-6">
                      2. You can watch the Tutorial on how to do it.&nbsp;
                      <span className="text-blue-gradient c-pointer">
                        Watch here
                      </span>
                    </small>
                    <small className="text-grey-6">
                      3. Do not upload more than 50 products at a time.
                    </small>
                    <small className="text-grey-6">
                      4. Select the folder containing Product Images with
                      Product folder name equal to SKU
                    </small>
                    <small className="text-grey-6">
                      5. Products should be uploaded successfully.
                    </small>
                    <div {...getRootProps({ style })} className="mt-3">
                      <input
                        id="primary"
                        {...getInputProps()}
                        // onChange={(event) => {
                        //   uploadFileToCloud(event, "primary");
                        //   event.target.value = null;
                        // }}
                      />
                      <img src={uploadCompanySheet1} className="w-100" alt="" />
                    </div>
                    <small className="mt-2 text-lightBlue">
                      Don't have our line sheet?&nbsp;
                      <span className="text blue-gradient c-pointer">
                        Download here
                      </span>
                    </small>
                    <div {...getRootProps({ style })} className="mt-3 mb-3">
                      <input
                        id="primary"
                        {...getInputProps()}
                        // onChange={(event) => {
                        //   uploadFileToCloud(event, "primary");
                        //   event.target.value = null;
                        // }}
                      />
                      <img src={uploadCompanySheet2} className="w-100" alt="" />
                    </div>
                  </div>
                )}
              </RadioGroup>
            </FormControl>
            {importSecondValue === "uploadLineSheet" && (
              <div className="d-flex flex-column">
                <small className="text-grey-6"> Note :</small>
                <small className="text-grey-6">
                  1. Upload the skeleton file and Map it with the Company Data.
                </small>
                <small className="text-grey-6">
                  2. You can watch the Tutorial on how to do it.&nbsp;
                  <span className="text-blue-gradient c-pointer">
                    Watch here
                  </span>
                </small>
                <small className="text-grey-6">
                  3. Do not upload more than 50 products at a time.
                </small>
                <small className="text-grey-6">
                  4. Select the folder containing Product Images with Product
                  folder name equal to SKU
                </small>
                <small className="text-grey-6">
                  5. Products should be uploaded successfully.
                </small>
                <div {...getRootProps({ style })} className="mt-3">
                  <input
                    id="primary"
                    {...getInputProps()}
                    // onChange={(event) => {
                    //   uploadFileToCloud(event, "primary");
                    //   event.target.value = null;
                    // }}
                  />
                  <img src={uploadLineSheet} className="w-100" alt="" />
                </div>
                <small className="mt-2 text-lightBlue">
                  Please make sure to leave a single row at the top of the Sheet
                </small>
              </div>
            )}
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              className="button-grey py-2 px-5"
              onClick={handleImportSecondClose}
            >
              <p>Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={handleImportSecondClose}
            >
              <p>Continue</p>
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="row">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 3, p: 0 }}
          className="border-grey-5 bg-black-15"
        >
          <Box
            sx={{ width: "100%" }}
            className="d-flex justify-content-between tabs-header-box"
          >
            {/* variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile */}
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Live" className="tabs-head" />
              <Tab label="Draft" className="tabs-head" />
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
            <div
              className="tabs-country c-pointer"
              aria-describedby={idFlag}
              variant="contained"
              onClick={handleFlagClick}
            >
              <img src={indiaFlag} alt="indiaFlag" height={15} />
              <p className="mx-2 text-lightBlue">India</p>
              <img src={arrowDown} alt="arrowDown" />
            </div>
            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              id={idFlag}
              open={openFlag}
              anchorEl={anchorFlagEl}
              onClose={handleFlagClose}
            >
              <div className="px-1 py-2">
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={allFlag} alt="allFlag" height={20} />
                  <p className="ms-2 text-lightBlue">All</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={ukFlag} alt="usaFlag" height={15} />
                  <p className="ms-2 text-lightBlue">UK</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={usaFlag} alt="usaFlag" height={15} />
                  <p className="ms-2 text-lightBlue">USA</p>
                </div>
              </div>
            </Popover>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#c8d8ff" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <div className="d-flex">
              <div className="d-flex product-button__box ms-2">
                <button
                  className="button-grey py-2 px-3 d-none d-md-block"
                  aria-describedby={idVendor}
                  variant="contained"
                  onClick={handleVendorClick}
                >
                  <small className="text-lightBlue">Vendor</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idVendor}
                  open={openVendor}
                  anchorEl={anchorVendorEl}
                  onClose={handleVendorClose}
                >
                  <div className="py-2">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      options={vendorData}
                      getOptionLabel={(option) => option.title}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <small className="text-lightBlue my-1">
                            {option.title}
                          </small>
                        </li>
                      )}
                      sx={{
                        width: 200,
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search"
                          inputRef={(input) => input?.focus()}
                        />
                      )}
                    />
                  </div>
                </Popover>
                <button
                  className="button-grey py-2 px-3 d-none d-md-block"
                  aria-describedby={idCategory}
                  variant="contained"
                  onClick={handleCategoryClick}
                >
                  <small className="text-lightBlue">Category</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idCategory}
                  open={openCategory}
                  anchorEl={anchorCategoryEl}
                  onClose={handleCategoryClose}
                >
                  <div className="py-2">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      sx={{ width: 200 }}
                      options={vendorData}
                      getOptionLabel={(option) => option.title}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <small className="text-lightBlue my-1">
                            {option.title}
                          </small>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search"
                          inputRef={(input) => input?.focus()}
                        />
                      )}
                    />
                  </div>
                </Popover>

                <button
                  className="button-grey py-2 px-3 d-none d-md-block"
                  aria-describedby={idTaggedWith}
                  variant="contained"
                  onClick={handleTaggedWithClick}
                >
                  <small className="text-lightBlue">Tagged With</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>

                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idTaggedWith}
                  open={openTaggedWith}
                  anchorEl={anchorTaggedWithEl}
                  onClose={handleTaggedWithClose}
                >
                  <div className="py-2">
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      sx={{ width: 300 }}
                      options={taggedWithData}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.title}
                      size="small"
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            checked={selected}
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                          <small className="text-lightBlue">
                            {option.title}
                          </small>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          placeholder="Search"
                          inputRef={(input) => input?.focus()}
                        />
                      )}
                    />
                  </div>
                </Popover>

                <React.Fragment key="right">
                  <button
                    className="button-grey py-2 px-3"
                    onClick={toggleDrawer("right", true)}
                  >
                    <small className="text-lightBlue">More Filters</small>
                    <img src={filter} alt="filter" className="ms-2" />
                  </button>
                  <SwipeableDrawer
                    anchor="right"
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                    onOpen={toggleDrawer("right", true)}
                  >
                    <div className="d-flex justify-content-between py-3 px-3 ms-2 me-1">
                      <h6 className="text-lightBlue">Filters</h6>
                      <img
                        src={cancel}
                        alt="cancel"
                        className="c-pointer filter-icon"
                        onClick={toggleDrawer("right", false)}
                      />
                    </div>

                    <div className="px-2">
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleAccordianChange("panel1")}
                      >
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          id="panel1d-header"
                        >
                          <p className="text-lightBlue">Product Category</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleAccordianChange("panel2")}
                      >
                        <AccordionSummary
                          aria-controls="panel2d-content"
                          id="panel2d-header"
                        >
                          <p className="text-lightBlue">Sub Category</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleAccordianChange("panel3")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <p className="text-lightBlue">Vendor</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel4"}
                        onChange={handleAccordianChange("panel4")}
                      >
                        <AccordionSummary
                          aria-controls="panel4d-content"
                          id="panel4d-header"
                        >
                          <p className="text-lightBlue">Collection</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormGroup className="tags-checkbox">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 1"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 2"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 3"
                            />
                          </FormGroup>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel5"}
                        onChange={handleAccordianChange("panel5")}
                      >
                        <AccordionSummary
                          aria-controls="panel5d-content"
                          id="panel5d-header"
                        >
                          <p className="text-lightBlue">Tagged With</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            sx={{ width: "100%" }}
                            options={taggedWithData}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            size="small"
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={
                                    <CheckBoxOutlineBlankIcon fontSize="small" />
                                  }
                                  checkedIcon={
                                    <CheckBoxIcon fontSize="small" />
                                  }
                                  checked={selected}
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                                <small className="text-lightBlue">
                                  {option.title}
                                </small>
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                {...params}
                                placeholder="Search"
                                inputRef={(input) => input?.focus()}
                              />
                            )}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel6"}
                        onChange={handleAccordianChange("panel6")}
                      >
                        <AccordionSummary
                          aria-controls="panel6d-content"
                          id="panel6d-header"
                        >
                          <p className="text-lightBlue">Product Status</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel7"}
                        onChange={handleAccordianChange("panel7")}
                      >
                        <AccordionSummary
                          aria-controls="panel7d-content"
                          id="panel7d-header"
                        >
                          <p className="text-lightBlue">Inventory</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={recommendedProductRadio}
                            // onChange={handleRecommendedProductRadio}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="Content 1"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="Content 2"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio size="small" />}
                              label="Content 3"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  color: "#c8d8ff",
                                },
                              }}
                            />
                          </RadioGroup>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel8"}
                        onChange={handleAccordianChange("panel8")}
                      >
                        <AccordionSummary
                          aria-controls="panel8d-content"
                          id="panel8d-header"
                        >
                          <p className="text-lightBlue">Labels</p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormGroup className="tags-checkbox">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 1"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 2"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                    marginRight: 0,
                                  }}
                                />
                              }
                              label="Content 3"
                            />
                          </FormGroup>
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    <div className="d-flex flex-column py-3 px-4 filter-buttons">
                      <hr className="hr-grey-6 my-3 w-100" />
                      <div className="d-flex justify-content-between">
                        <button className="button-lightBlue-outline py-2 px-3">
                          <p>Clear all Filters</p>
                        </button>
                        <button className="button-gradient py-2 px-5 w-auto ">
                          <p>Done</p>
                        </button>
                      </div>
                    </div>
                  </SwipeableDrawer>
                </React.Fragment>
              </div>
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idSort}
                variant="contained"
                onClick={handleSortClick}
              >
                <small className="text-lightBlue me-2">Sort</small>
                <img src={sort} alt="sort" className="" />
              </button>
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idColumns}
                variant="contained"
                onClick={handleColumnsClick}
              >
                <small className="text-lightBlue">Columns</small>
                <img src={columns} alt="columns" className="ms-2" />
              </button>

              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                id={idSort}
                open={openSort}
                anchorEl={anchorSortEl}
                onClose={handleSortClose}
                className="columns"
              >
                <FormControl className="px-2 py-1">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    // value={value}
                    // onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="productName"
                      control={<Radio size="small" />}
                      label="Product Name"
                    />
                    <FormControlLabel
                      value="category"
                      control={<Radio size="small" />}
                      label="Category"
                    />
                    <FormControlLabel
                      value="subCategory"
                      control={<Radio size="small" />}
                      label="Sub Category"
                    />
                    <FormControlLabel
                      value="vendor"
                      control={<Radio size="small" />}
                      label="Vendor"
                    />
                    <FormControlLabel
                      value="uploadDate"
                      control={<Radio size="small" />}
                      label="Upload Date"
                    />
                    <FormControlLabel
                      value="alphabeticalAtoZ"
                      control={<Radio size="small" />}
                      label="Alphabetical (A-Z)"
                    />
                    <FormControlLabel
                      value="alphabeticalZtoA"
                      control={<Radio size="small" />}
                      label="Alphabetical (Z-A)"
                    />
                    <FormControlLabel
                      value="oldestToNewest"
                      control={<Radio size="small" />}
                      label="Oldest to Newest"
                    />
                    <FormControlLabel
                      value="newestToOldest"
                      control={<Radio size="small" />}
                      label="Newest to Oldest"
                    />
                  </RadioGroup>
                </FormControl>
              </Popover>

              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                id={idColumns}
                open={openColumns}
                anchorEl={anchorColumnsEl}
                onClose={handleColumnsClose}
                className="columns"
              >
                <FormGroup className="px-2 py-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Catgory"
                    className="me-0"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Sub Catgory"
                    className="me-0"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Collection"
                    className="me-0"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Vendor"
                    className="me-0"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Price"
                    className="me-0"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Activity"
                    className="me-0"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Status"
                    className="me-0"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Action"
                    className="me-0"
                  />
                </FormGroup>
              </Popover>
            </div>
          </div>
          <TabPanel value={value} index={0}>
            <AllProductsTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AllProductsTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AllProductsTable />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AllProductsTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default AllProducts;
