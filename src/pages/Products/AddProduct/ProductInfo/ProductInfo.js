import React, { useMemo } from "react";
import "./ProductInfo.scss";
import AppTextEditor from "../../../../components/AppTextEditor/AppTextEditor";
import { useDropzone } from "react-dropzone";
// ! IMAGES IMPORTS
import info from "../../../../assets/icons/info.svg";
import clock from "../../../../assets/icons/clock.svg";
import cancel from "../../../../assets/icons/cancel.svg";
import arrowDown from "../../../../assets/icons/arrowDown.svg";
import productInfoMedia1 from "../../../../assets/images/products/productInfoMedia1.svg";
import productInfoMedia2 from "../../../../assets/images/products/productInfoMedia2.svg";
import image from "../../../../assets/images/users/userLarge.svg"
import image2 from "../../../../assets/images/unthreadLogo.png"
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  Avatar,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputBase,
  MenuItem,
  OutlinedInput,
  Popover,
  Radio,
  RadioGroup,
  Select,
  Slide,
  styled,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CropIcon from '@mui/icons-material/Crop';
import deleteMedia from "../../../../assets/icons/deleteMedia.svg";
// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? SEARCH INPUT STARTS HERE
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {},
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  height: "30.6px",
  border: "1px solid #38395c",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.8, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
  },
}));
// ? SEARCH INPUT ENDS HERE

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
  //   backgroundColor: "",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  justifyContent: "center",
  backgroundColor: "#1a1932",
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

// ? COLLECTIONS AUTOCOMPLETE STARTS HERE
const collectionsData = [
  { title: "Collection 1", value: "Collection1" },
  { title: "Collection 2", value: "Collection2" },
  { title: "Collection 3", value: "Collection3" },
  { title: "Collection 4", value: "Collection4" },
  { title: "Collection 5", value: "Collection5" },
  { title: "Collection 6", value: "Collection6" },
  { title: "Collection 7", value: "Collection7" },
  { title: "Collection 8", value: "Collection8" },
  { title: "Collection 9", value: "Collection9" },
  { title: "Collection 10", value: "Collection10" },
  { title: "Collection 11", value: "Collection11" },
  { title: "Collection 12", value: "Collection12" },
];

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

const discountData = [
  { title: "5%", value: "5" },
  { title: "10%", value: "10" },
  { title: "20%", value: "20" },
  { title: "30%", value: "30" },
  { title: "40%", value: "40" },
  { title: "50%", value: "50" },
  { title: "60%", value: "60" },
  { title: "70%", value: "70" },
  { title: "80%", value: "80" },
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
// ? COLLECTIONS AUTOCOMPLETE ENDS HERE

const ProductInfo = () => {
  // ? TOGGLE BUTTONS STARTS HERE
  const [productStatus, setPoductStatus] = React.useState("active");
  const handleProductStatus = (event, newProductStatus) => {
    setPoductStatus(newProductStatus);
  };
  // ? TOGGLE BUTTONS ENDS HERE

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

  // ? CHECKBOX STARTS HERE
  const [checkedPrice, setCheckedPrice] = React.useState(false);

  const handlePriceRequest = (event) => {
    setCheckedPrice(event.target.checked);
    if (checkedDynamic) {
      setCheckedDynamic(false);
    }
  };

  const [checkedDynamic, setCheckedDynamic] = React.useState(false);

  const handleDynamicPrice = (event) => {
    setCheckedDynamic(event.target.checked);
    if (checkedPrice) {
      setCheckedPrice(false);
    }
  };

  const [checkedTrackInventory, setCheckedTrackInventory] =
    React.useState(false);

  const handleInventory = (event) => {
    setCheckedTrackInventory(event.target.checked);
  };

  const [checkedSellOutofStock, setCheckedSellOutofStock] =
    React.useState(false);

  const handleSellOutofStock = (event) => {
    setCheckedSellOutofStock(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  // ? RADIO BUTTON STARTS HERE
  const [trackInventory, setTrackInventory] = React.useState("productLevel");

  const handleTrackInventory = (event) => {
    setTrackInventory(event.target.value);
  };

  // ? RADIO BUTTON ENDS HERE

  // ?DYNAMIC TEXT EDITOR STARTS HERE
  const [openDynamicTextEditor, setOpenDynamicTextEditor] =
    React.useState(false);

  const handleDynamicTextEditor = () => {
    !openDynamicTextEditor
      ? setOpenDynamicTextEditor(true)
      : setOpenDynamicTextEditor(false);
  };
  // ? DYNAMIC TEXT EDITOR ENDS HERE

  // ? TOGGLE BUTTON STARTS HERE
  const [productDetails, setProductDetails] =
    React.useState("productInformation");

  const handleProductDetails = (event, newProduct) => {
    setProductDetails(newProduct);
  };
  // ? TOGGLE BUTTON ENDS HERE

  // ? SCHEDULE PRODUCT DIALOG STARTS HERE
  const [openScheduleProduct, setOpenScheduleProduct] = React.useState(false);

  const handelScheduleProduct = () => {
    setOpenScheduleProduct(true);
  };

  const handelScheduleProductClose = () => {
    setOpenScheduleProduct(false);
  };
  // ? SCHEDULE PRODUCT DIALOG ENDS HERE

  // ? DATE PICKER STARTS HERE
  const [dateStartValue, setDateStartValue] = React.useState(new Date());
  // ? DATE PICKER ENDS HERE

  // ? TAGS DIALOG STARTS HERE
  const [openTags, setOpenTags] = React.useState(false);

  const handleTagsOpen = () => {
    setOpenTags(true);
  };

  const handleTagsClose = () => {
    setOpenTags(false);
  };
  // ? TAGS DIALOG ENDS HERE

  // ? METAL STARTS HERE
  const [metal, setMetal] = React.useState("fixed");

  const handleMetalChange = (event) => {
    setMetal(event.target.value);
  };

  // ? METAL ENDS HERE

  // ? TAGS DIALOG STARTS HERE
  const [openStore, setOpenStore] = React.useState(false);

  const handleStoreOpen = () => {
    setOpenStore(true);
  };

  const handleStoreClose = () => {
    setOpenStore(false);
  };
  // ? TAGS DIALOG ENDS HERE

  // * SORT POPOVERS STARTS
  const [anchorTagEl, setAnchorTagEl] = React.useState(null);

  const handleTagClick = (event) => {
    setAnchorTagEl(event.currentTarget);
  };

  const handleTagClose = () => {
    setAnchorTagEl(null);
  };

  const openTag = Boolean(anchorTagEl);
  const idTag = openTag ? "simple-popover" : undefined;
  // * SORT POPOVERS ENDS

  // * DYNAMIC FIELD POPOVERS STARTS
  const [anchorDynamicEl, setAnchorDynamicEl] = React.useState(null);

  const handleDynamicClick = (event) => {
    setAnchorDynamicEl(event.currentTarget);
  };

  const handleDynamicClose = () => {
    setAnchorDynamicEl(null);
  };

  const openDynamic = Boolean(anchorDynamicEl);
  const idDynamic = openDynamic ? "simple-popover" : undefined;
  // * DYNAMIC FIELD POPOVERS ENDS

  // * METAL FILTER POPOVERS STARTS
  const [anchorMetalFilterEl, setAnchorMetalFilterEl] = React.useState(null);
  const handleMetalFilter = (event) => {
    setAnchorMetalFilterEl(event.currentTarget);
  };
  const handleMetalFilterClose = () => {
    setAnchorMetalFilterEl(null);
  };
  const openMetalFilter = Boolean(anchorMetalFilterEl);
  const idMetalFilter = openMetalFilter ? "simple-popover" : undefined;
  // * METAL FILTER POPOVERS ENDS

  return (
    <React.Fragment>
      <div className="bg-black-15 border-grey-5 rounded-8 p-3 row productInfo">
        <div className="col-12 px-0">
          <div className="row">
            <div className="col-8">
              <div className="d-flex mb-1">
                <p className="text-lightBlue px-0 me-2">Title</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <FormControl className="w-100 px-0">
                <OutlinedInput placeholder="Enter Title" size="small" />
              </FormControl>
            </div>
            <div className="col-4">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Product Status</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <ToggleButtonGroup
                value={productStatus}
                onChange={handleProductStatus}
                aria-label="text formatting"
                className="row d-flex px-2 productInfo-toggle"
                size="small"
                exclusive
              >
                <ToggleButton
                  value="active"
                  aria-label="active"
                  style={{ width: "50%" }}
                  className="productInfo-toggle__active"
                >
                  <div className="d-flex">
                    <p className="text-grey-6">Active</p>
                  </div>
                </ToggleButton>
                <ToggleButton
                  value="draft"
                  aria-label="draft"
                  style={{ width: "50%" }}
                  className="productInfo-toggle__draft"
                >
                  <div className="d-flex">
                    <p className="text-grey-6">Draft</p>
                  </div>
                </ToggleButton>
              </ToggleButtonGroup>
              <div className="d-flex align-items-center mt-1 c-pointer">
                <img src={clock} alt="clock" className="me-1" width={12} />
                <small className="text-blue-2" onClick={handelScheduleProduct}>
                  Schedule Product
                </small>
              </div>
            </div>

            <Dialog
              open={openScheduleProduct}
              TransitionComponent={Transition}
              keepMounted
              onClose={handelScheduleProductClose}
              aria-describedby="alert-dialog-slide-description"
              maxWidth="sm"
              fullWidth={true}
            >
              <DialogTitle>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-lightBlue fw-500">Schedule Product</h5>
                  <img
                    src={cancel}
                    alt="cancel"
                    width={30}
                    onClick={handelScheduleProductClose}
                    className="c-pointer"
                  />
                </div>
              </DialogTitle>
              <hr className="hr-grey-6 my-0" />
              <DialogContent className="py-3 px-4 schedule-product">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue me-2">Start Date</p>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className="c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDateTimePicker
                    value={dateStartValue}
                    onChange={(newValue) => {
                      setDateStartValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </LocalizationProvider>
                <div className="d-flex mb-1 mt-3">
                  <p className="text-lightBlue me-2">End Date</p>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className="c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDateTimePicker
                    value={dateStartValue}
                    onChange={(newValue) => {
                      setDateStartValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </LocalizationProvider>
              </DialogContent>
              <hr className="hr-grey-6 my-0" />
              <DialogActions className="d-flex flex-column justify-content-start px-4 py-3">
                <div className="d-flex justify-content-between w-100">
                  <button
                    className="button-grey py-2 px-5"
                    onClick={handelScheduleProductClose}
                  >
                    <p className="text-lightBlue">Cancel</p>
                  </button>
                  <button
                    className="button-gradient py-2 px-5"
                    onClick={handelScheduleProductClose}
                  >
                    <p>Schedule</p>
                  </button>
                </div>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="col-12 px-0 mt-3">
          <div className="d-flex justify-content-between mb-2 align-items-center">
            <p className="text-lightBlue mb-1">Description</p>
            <div className="d-flex">
              <button
                className="button-transparent me-1 py-2 px-3"
                onClick={handleDynamicClick}
                aria-describedby={idDynamic}
                variant="contained"
              >
                <small className="text-blue-2">Add Dynamic Fields</small>
              </button>

              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                id="idTaggedWith"
                open={openDynamic}
                anchorEl={anchorDynamicEl}
                onClose={handleDynamicClose}
              >
                <div className="py-2">
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    // sx={{ width: 200 }}
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
                className="button-transparent me-1 py-2 px-3"
                onClick={handleDynamicTextEditor}
              >
                <small className="text-blue-2">Tabs</small>
              </button>
            </div>
          </div>
          <AppTextEditor />
          {openDynamicTextEditor && (
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <ToggleButtonGroup
                  value={productDetails}
                  exclusive
                  onChange={handleProductDetails}
                  aria-label="text alignment"
                  className="productDetails-toggle"
                >
                  <ToggleButton
                    value="productInformation"
                    aria-label="productInformation"
                  >
                    <p className="text-capitalize text-lightBlue">
                      Product Information
                    </p>
                  </ToggleButton>
                  <ToggleButton value="metalInfo" aria-label="metalInfo">
                    <p className="text-capitalize text-lightBlue">
                      Metal Information
                    </p>
                  </ToggleButton>
                  <ToggleButton value="diamondInfo" aria-label="diamondInfo">
                    <p className="text-capitalize text-lightBlue">
                      Diamond Information
                    </p>
                  </ToggleButton>
                  <ToggleButton value="priceBreakup" aria-label="priceBreakup">
                    <p className="text-capitalize text-lightBlue">
                      Price Breakup
                    </p>
                  </ToggleButton>
                </ToggleButtonGroup>
                <p className="text-blue-2">Customise</p>
              </div>
              <AppTextEditor />
            </div>
          )}
        </div>

        <hr className="hr-grey-6 my-3" />
        <div className="col-12">
          <div className="row justify-content-between">
            <p className="text-lightBlue px-0 w-auto">Media</p>
            <small className="text-blue-2 w-auto px-0">
              Link Variant Images
            </small>
          </div>
          <div className="row">
            <div className="col-3 ps-0 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between mediaToolCheckBox" style={{color: '#5C6D8E'}}>
                <Checkbox />
                <DragIndicatorIcon className="mt-2 me-3" />
              </div>
              <div {...getRootProps({ style })} className="mt-3">
                <input
                  id="primary"
                  {...getInputProps()}
                  // onChange={(event) => {
                  //   uploadFileToCloud(event, "primary");
                  //   event.target.value = null;
                  // }}
                />
                <img src={image2} className="w-100 h-100" alt="" />
              </div>
              <div className="d-flex justify-content-end mediaToolDot" style={{color: '#5C6D8E'}}>
                <SyncAltIcon className="mx-2" /> 
                <InsertLinkIcon className="mx-2" />
                <CropIcon className="mx-2" />
                <img width="20px" height="25px" src={deleteMedia} className="mx-3" />
              </div>
              <button className="primary-image py-2 w-100 mt-3">
                <p>Primary Image</p>
              </button>
            </div>
            <div className="col-9 pe-0">
              <div {...getRootProps({ style })} className="mt-3">
                <input
                  id="primary"
                  {...getInputProps()}
                  // onChange={(event) => {
                  //   uploadFileToCloud(event, "primary");
                  //   event.target.value = null;
                  // }}
                />
                <img src={productInfoMedia2} className="w-100" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 rounded-8 p-3 row productInfo mt-4">
        <div className="col-12">
          <div className="row mb-3">
            <h6 className="text-lightBlue col-12 px-0 fw-500">Product Type</h6>
          </div>
          <div className="row">
            <div className="col-4 ps-0 mt-2">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Category</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
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
                  width: "100%",
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Search" />
                )}
              />
            </div>
            <div className="col-4 ps-0 mt-2">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Sub-Category</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                // sx={{ width: 200 }}
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
                  width: "100%",
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Search" />
                )}
              />
            </div>
            <div className="col-4 px-0 mt-2">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Vendor Name</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                // sx={{ width: 200 }}
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
                  width: "100%",
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Search" />
                )}
              />
            </div>
            <div className="col-12 px-0 mt-4">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Collections</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                sx={{ width: "100%" }}
                options={collectionsData}
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
                    <small className="text-lightBlue">{option.title}</small>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField size="small" {...params} placeholder="Search" />
                )}
              />
            </div>
            <div className="col-12 px-0 mt-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue me-2">Tags</p>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className="c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>
                <small
                  className="text-blue-2 c-pointer"
                  onClick={handleTagsOpen}
                >
                  View all Tags
                </small>

                <Dialog
                  open={openTags}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleTagsClose}
                  aria-describedby="alert-dialog-slide-description"
                  maxWidth="md"
                  fullWidth={true}
                >
                  <DialogTitle>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="text-lightBlue fw-500">Tags</h5>
                      <img
                        src={cancel}
                        alt="cancel"
                        width={30}
                        onClick={handleTagsClose}
                        className="c-pointer"
                      />
                    </div>
                  </DialogTitle>
                  <hr className="hr-grey-6 my-0" />
                  <DialogContent className="py-2 px-4">
                    <div className="row">
                      <div className="col-md-6 mt-2">
                        <Search>
                          <SearchIconWrapper>
                            <SearchIcon sx={{ color: "#c8d8ff" }} />
                          </SearchIconWrapper>
                          <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                          />
                        </Search>
                      </div>
                      <div className="col-md-3 col-6 ps-md-0 pe-0 mt-2">
                        <button
                          className="button-grey py-1 px-3 w-100"
                          variant="contained"
                        >
                          <p className="text-lightBlue">Alphabetical (A-Z)</p>
                          <img
                            src={arrowDown}
                            alt="arrowDown"
                            className="ms-2"
                          />
                        </button>
                      </div>
                      <div className="col-md-3 col-6 mt-2">
                        <button
                          className="button-gradient py-1 px-3 w-100"
                          onClick={handleTagClick}
                        >
                          <p>Create a New Tag</p>
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
                          id={idTag}
                          open={openTag}
                          anchorEl={anchorTagEl}
                          onClose={handleTagClose}
                          className="columns"
                        >
                          <div className="py-2 px-2">
                            <div className="d-flex mb-2 pt-1">
                              <small className="text-grey-6">
                                Enter Tag Name
                              </small>
                              <img
                                src={info}
                                alt="info"
                                className="ms-2 c-pointer"
                                width={14}
                              />
                            </div>
                            <FormControl className="pb-1">
                              <OutlinedInput
                                placeholder="Enter Tag Name"
                                size="small"
                              />
                            </FormControl>
                          </div>
                        </Popover>
                      </div>
                    </div>
                    <p className="text-lightBlue mt-3 mb-2">
                      458 Tags are listed below
                    </p>

                    <FormGroup className="tags-checkbox">
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                            }}
                          />
                        }
                        label="Tags 1"
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
                        label="Tags 2"
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
                        label="Tags 3"
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
                        label="Tags 4"
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
                        label="Tags 5"
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
                        label="Tags 6"
                        className="me-0"
                      />
                    </FormGroup>
                  </DialogContent>
                  <hr className="hr-grey-6 my-0" />
                  <DialogActions className="d-flex justify-content-between px-4 py-3">
                    <button
                      className="button-grey py-2 px-5"
                      onClick={handleTagsClose}
                    >
                      <p className="text-lightBlue">Cancel</p>
                    </button>
                    <button
                      className="button-gradient py-2 px-5"
                      onClick={handleTagsClose}
                    >
                      <p>Add 5 Tags</p>
                    </button>
                  </DialogActions>
                </Dialog>
              </div>
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
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      checked={selected}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                    <small className="text-lightBlue">{option.title}</small>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField size="small" {...params} placeholder="Search" />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 rounded-8 p-3 row productInfo mt-4">
        <div className="col-12 px-0">
          <div className="d-flex mb-3">
            <h6 className="text-lightBlue px-0 fw-500 me-2">Price</h6>
            <Tooltip title="Lorem ipsum" placement="top">
              <img src={info} alt="info" className="c-pointer" width={13.5} />
            </Tooltip>
          </div>
          <div className="row">
            <div className="col-4 mt-2">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">
                  Enter Price of the product
                </p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>

              <FormControl sx={{ width: "100%" }} className="col-7 px-0">
                <OutlinedInput
                  placeholder="Enter Price"
                  size="small"
                  disabled={checkedDynamic}
                  startAdornment={
                    <InputAdornment position="start">
                      <p className="text-lightBlue">₹</p>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-4 ps-0 mt-2">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Select Discount</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                // sx={{ width: 200 }}
                options={discountData}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                  <li {...props}>
                    <small className="text-lightBlue my-1">
                      {option.title}
                    </small>
                  </li>
                )}
                sx={{
                  width: "100%",
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Search" />
                )}
              />
            </div>
            <div className="col-4 mt-2">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Sale Price</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer ms-2"
                    width={13.5}
                  />
                </Tooltip>
              </div>

              <FormControl sx={{ width: "100%" }} className="col-7 px-0">
                <OutlinedInput placeholder="4000" size="small" />
              </FormControl>
            </div>
            <div className="col-12 mt-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedPrice}
                    onChange={handlePriceRequest}
                    inputProps={{ "aria-label": "controlled" }}
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Price on Request"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
                className="me-0"
              />
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="c-pointer ms-2"
                  width={13.5}
                />
              </Tooltip>
            </div>
            {checkedPrice && (
              <div className="col-12 mt-1 mb-3">
                <button className="button-gradient w-auto py-2 px-4">
                  <p>Edit Price on Request Setting</p>
                </button>
              </div>
            )}
            <div className="col-12">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedDynamic}
                    onChange={handleDynamicPrice}
                    inputProps={{ "aria-label": "controlled" }}
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Enable Dynamic Pricing"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
                className="me-0"
              />
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="c-pointer ms-2"
                  width={13.5}
                />
              </Tooltip>
            </div>
            {checkedDynamic && (
              <React.Fragment>
                <div className="col-12 mt-1 mb-3">
                  <button className="button-gradient w-auto py-2 px-4">
                    <p>Edit Price Master</p>
                  </button>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between mb-3">
                    <small className="text-lightBlue">
                      Calculated Total Price
                    </small>
                    <small className="text-lightBlue">₹&nbsp;20,600</small>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-grey-6">Metal Price</small>
                    <small className="text-grey-6">₹&nbsp;15,000</small>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-grey-6">Diamond Price</small>
                    <small className="text-grey-6">₹&nbsp;4,000</small>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-grey-6">Making Charges</small>
                    <small className="text-grey-6">₹&nbsp;1,000</small>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-grey-6">GST</small>
                    <small className="text-grey-6">₹&nbsp;600</small>
                  </div>
                </div>

                <div className="col-4 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Select Discount</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="c-pointer ms-2"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    options={discountData}
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <small className="text-lightBlue my-1">
                          {option.title}
                        </small>
                      </li>
                    )}
                    sx={{
                      width: "100%",
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Search" />
                    )}
                  />
                </div>
                <div className="col-4 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Select</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="c-pointer ms-2"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>

                  <FormControl sx={{ width: "100%" }} size="small">
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      // value={metal}
                      placeholder="Fixed"
                      // onChange={handleMetalChange}
                    >
                      <MenuItem value="fixed">Metal Price</MenuItem>
                      <MenuItem value="increase">Diamond Price</MenuItem>
                      <MenuItem value="decrease">Making Charges</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-4 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Sale Price</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="c-pointer ms-2"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>

                  <FormControl sx={{ width: "100%" }} className="col-7 px-0">
                    <OutlinedInput placeholder="4000" size="small" />
                  </FormControl>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 rounded-8 p-3 row productInfo mt-4">
        <div className="col-12 px-0">
          <div className="d-flex mb-3">
            <h6 className="text-lightBlue px-0 fw-500">Inventory</h6>
            <Tooltip title="Lorem ipsum" placement="top">
              <img
                src={info}
                alt="info"
                className="c-pointer ms-2"
                width={13.5}
              />
            </Tooltip>
          </div>
          <div className="row">
            <div className="col-6 mt-2">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">SKU</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer ms-2"
                    width={13.5}
                  />
                </Tooltip>
              </div>

              <FormControl sx={{ width: "100%" }} className="col-7 px-0">
                <OutlinedInput placeholder="DSERFC12540" size="small" />
              </FormControl>
            </div>
            <div className="col-6 mt-2">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Barcode (ISBN, UPC, GTIN etc.)</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer ms-2"
                    width={13.5}
                  />
                </Tooltip>
              </div>

              <FormControl sx={{ width: "100%" }} className="col-7 px-0">
                <OutlinedInput placeholder="Enter Barcode" size="small" />
              </FormControl>
            </div>
            <div className="col-12 mt-2 d-flex align-items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedTrackInventory}
                    onChange={handleInventory}
                    inputProps={{ "aria-label": "controlled" }}
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Track Inventory"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
                className="me-0"
              />
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="c-pointer ms-2"
                  width={13.5}
                />
              </Tooltip>
            </div>
            {checkedTrackInventory && (
              <React.Fragment>
                <div className="col-12">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedSellOutofStock}
                        onChange={handleSellOutofStock}
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Continue to sell when out of stock"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                      },
                    }}
                    className="me-0"
                  />
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className="c-pointer ms-2"
                      width={13.5}
                    />
                  </Tooltip>
                </div>
                <div className="col-12">
                  <hr className="hr-grey-6 my-3 " />
                </div>
                <div className="col-12 d-flex">
                  <div className="d-flex align-items-center me-4">
                    <h6 className="text-lightBlue">Track Inventory on</h6>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="c-pointer ms-2"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={trackInventory}
                    onChange={handleTrackInventory}
                  >
                    <FormControlLabel
                      value="productLevel"
                      control={<Radio size="small" />}
                      label="Product Level"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                    <FormControlLabel
                      value="variantLevel"
                      control={<Radio size="small" />}
                      label="Variant Level"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                  </RadioGroup>
                </div>
                {trackInventory === "variantLevel" && (
                  <p className="text-lightBlue mt-3">
                    Add Variant options to create variants and manage inventory{" "}
                    <span className="text-blue-2 c-pointer">
                      (Add Variants)
                    </span>
                  </p>
                )}
                {trackInventory === "productLevel" && (
                  <React.Fragment>
                    {/* <div className="col-12 d-flex justify-content-between mt-3">
                      <h6 className="text-grey-6">Manage Inventory</h6>
                      <p
                        className="text-blue-2 c-pointer"
                        onClick={handleStoreOpen}
                      >
                        Edit Store
                      </p>
                    </div> */}

                    <Dialog
                      open={openStore}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleStoreClose}
                      aria-describedby="alert-dialog-slide-description"
                      maxWidth="sm"
                      fullWidth={true}
                    >
                      <DialogTitle>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="text-lightBlue fw-500">Edit Store</h5>
                          <img
                            src={cancel}
                            alt="cancel"
                            width={30}
                            onClick={handleStoreClose}
                            className="c-pointer"
                          />
                        </div>
                      </DialogTitle>
                      <hr className="hr-grey-6 my-0" />
                      <DialogContent className="py-2 px-4">
                        <div className="row">
                          <div className="col-md-12 mt-2">
                            <Search>
                              <SearchIconWrapper>
                                <SearchIcon sx={{ color: "#c8d8ff" }} />
                              </SearchIconWrapper>
                              <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                              />
                            </Search>
                          </div>
                        </div>
                        <FormGroup className="tags-checkbox mt-2">
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                style={{
                                  color: "#5C6D8E",
                                }}
                              />
                            }
                            label="Tags 1"
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
                            label="Tags 2"
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
                            label="Tags 3"
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
                            label="Tags 4"
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
                            label="Tags 5"
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
                            label="Tags 6"
                            className="me-0"
                          />
                        </FormGroup>
                      </DialogContent>
                      <hr className="hr-grey-6 my-0" />
                      <DialogActions className="d-flex justify-content-between px-4 py-3">
                        <button
                          className="button-grey py-2 px-5"
                          onClick={handleStoreClose}
                        >
                          <p>Cancel</p>
                        </button>
                        <button
                          className="button-gradient py-2 px-5"
                          onClick={handleStoreClose}
                        >
                          <p>Done</p>
                        </button>
                      </DialogActions>
                    </Dialog>
                    <div className="col-12 d-flex align-items-center mt-3 mb-2">
                      <p className="text-lightBlue">
                        Apply Quantity to all stores
                      </p>
                      <Tooltip title="Lorem ipsum" placement="top">
                        <img
                          src={info}
                          alt="info"
                          className="c-pointer ms-2"
                          width={13.5}
                        />
                      </Tooltip>
                    </div>
                    <div className="col-12 d-flex">
                      <div className="row w-100 align-items-center">
                        <div className="col-md-3">
                          <FormControl className="w-100">
                            <OutlinedInput
                              placeholder="Enter Quantity"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-auto px-md-0">
                          <FormControl sx={{ m: 0, width: 120 }} size="small">
                            <Select
                              labelId="demo-select-small"
                              id="demo-select-small"
                              value={metal}
                              placeholder="Fixed"
                              onChange={handleMetalChange}
                            >
                              <MenuItem value="fixed">Fixed</MenuItem>
                              <MenuItem value="increase">Increase</MenuItem>
                              <MenuItem value="decrease">Decrease</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-3">
                          <button className="button-gradient py-2 px-5 w-auto">
                            <small>Apply</small>
                          </button>
                        </div>
                        <p
                          className="text-blue-2 c-pointer col-auto ms-auto px-0"
                          onClick={handleStoreOpen}
                        >
                          Edit Store
                        </p>
                      </div>
                    </div>
                    <div className="col-12 mt-4 mb-3">
                      <div className="d-flex justify-content-between align-items-center py-2 px-3 rounded-3 bg-black-13">
                        <div className="d-flex">
                          <p className="text-lightBlue py-1 me-2">Filter:</p>
                          <p
                            className="text-blue-2 px-2 py-1 c-pointer hover-back-transparent rounded-3"
                            aria-describedby={idMetalFilter}
                            variant="contained"
                            onClick={handleMetalFilter}
                          >
                            Country
                          </p>
                          <p
                            className="text-blue-2 px-2 py-1 c-pointer hover-back-transparent rounded-3"
                            aria-describedby={idMetalFilter}
                            variant="contained"
                            onClick={handleMetalFilter}
                          >
                            State
                          </p>
                        </div>

                        <Popover
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          id={idMetalFilter}
                          open={openMetalFilter}
                          anchorEl={anchorMetalFilterEl}
                          onClose={handleMetalFilterClose}
                        >
                          <FormGroup className="tags-checkbox py-2">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  style={{
                                    color: "#5C6D8E",
                                  }}
                                />
                              }
                              label="Content 1"
                              className="hover-back rounded-3 mx-0 pe-2"
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
                              label="Content 2"
                              className="hover-back rounded-3 mx-0 pe-2"
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
                              label="Content 3"
                              className="hover-back rounded-3 mx-0 pe-2"
                            />
                          </FormGroup>
                        </Popover>
                        <p className="text-lightBlue">10 stores</p>
                      </div>
                    </div>
                    <div className="col-12 d-flex justify-content-between my-2 align-items-center px-4">
                      <p className="text-lightBlue">
                        JWL - JWL Bagh, New Delhi-110005, India
                      </p>

                      <FormControl
                        sx={{ width: 100 }}
                        className="col-7 px-0 productInfo-inputs"
                      >
                        <OutlinedInput
                          placeholder="Enter Qty"
                          size="small"
                          defaultValue={1}
                          endAdornment={
                            <InputAdornment position="end">+</InputAdornment>
                          }
                          startAdornment={
                            <InputAdornment position="start">-</InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                    <div className="col-12 d-flex justify-content-between my-2 align-items-center px-4">
                      <p className="text-lightBlue">
                        JWL - JWL Bagh, New Delhi-110005, India
                      </p>

                      <FormControl
                        sx={{ width: 100 }}
                        className="col-7 px-0 productInfo-inputs"
                      >
                        <OutlinedInput
                          placeholder="Enter Qty"
                          size="small"
                          defaultValue={1}
                          endAdornment={
                            <InputAdornment position="end">+</InputAdornment>
                          }
                          startAdornment={
                            <InputAdornment position="start">-</InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                    <div className="col-12 d-flex justify-content-between my-2 align-items-center px-4">
                      <p className="text-lightBlue">
                        JWL - JWL Bagh, New Delhi-110005, India
                      </p>

                      <FormControl
                        sx={{ width: 100 }}
                        className="col-7 px-0 productInfo-inputs"
                      >
                        <OutlinedInput
                          placeholder="Enter Qty"
                          size="small"
                          defaultValue={100}
                          endAdornment={
                            <InputAdornment position="end">+</InputAdornment>
                          }
                          startAdornment={
                            <InputAdornment position="start">-</InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 rounded-8 p-3 row productInfo mt-4">
        <div className="d-flex justify-content-between px-0">
          <div className="d-flex mb-3 px-0">
            <h6 className="text-lightBlue px-0 fw-500">
              Product Applicable For
            </h6>
            <Tooltip title="Lorem Ipsum" placement="top">
              <img
                src={info}
                alt="info"
                className="ms-2 c-pointer"
                width={15}
              />
            </Tooltip>
          </div>
          <p className="text-blue-2 c-pointer col-auto ms-auto px-0">Manage</p>
        </div>
        <FormGroup className="tags-checkbox px-0">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                style={{
                  color: "#5C6D8E",
                }}
              />
            }
            label="Price Breakup"
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
            label="Returnable"
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
            label="COD Available"
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
            label="Lifetime Exchange"
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
            label="Lifetime Buyback"
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
            label="Next Day Shipping"
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
            label="Enable Try On"
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
            label="Enable to View Similar Items"
            className="me-0"
          />
        </FormGroup>
      </div>
    </React.Fragment>
  );
};

export default ProductInfo;
