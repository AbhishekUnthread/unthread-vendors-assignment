import React, { useMemo } from "react";
import "./CreatePreOrder.scss";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import { ColorPicker, useColor } from "react-color-palette";
// ! COMPONENT IMPORTS
import AddProductCondition from "../../../components/AddProductCondition/AddProductCondition";
import { AntSwitch } from "../../../components/AntSwitch/AntSwitch";
import AppReactImageGallery from "../../../components/AppReactImageGallery/AppReactImageGallery";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import fullPayment from "../../../assets/icons/fullPayment.svg";
import partialPayment from "../../../assets/icons/partialPayment.svg";
import uploadBadge from "../../../assets/icons/uploadBadge.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  OutlinedInput,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  MenuItem,
  Popover,
  Select,
  InputAdornment,
  Chip,
  Checkbox,
} from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// ! MATERIAL ICONS IMPORTS
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TableSearch from "../../../components/TableSearch/TableSearch";
import AppTimer from "../../../components/AppTimer/AppTimer";

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

const CreatePreOrder = () => {
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

  // ? TOGGLE BUTTON STARTS HERE
  const [sizeChartView, setSizeChartView] = React.useState("desktopView");

  const handleSizeChartView = (event, newProduct) => {
    setSizeChartView(newProduct);
  };

  const [paymentType, setPaymentType] = React.useState("fullPayment");

  const handlePaymentType = (event, newProduct) => {
    setPaymentType(newProduct);
  };

  const [labelPosition, setLabelPosition] = React.useState("topLeft");

  const handleLabelPosition = (event, newProduct) => {
    setLabelPosition(newProduct);
  };

  const [labelSize, setLabelSize] = React.useState("small");

  const handleLabelSize = (event, newProduct) => {
    setLabelSize(newProduct);
  };
  // ? TOGGLE BUTTON ENDS HERE

  // ? SWITCH STARTS HERE
  const [checkedSwitch, setCheckedSwitch] = React.useState(false);
  const handleSwitchChange = (event) => {
    setCheckedSwitch(event.target.checked);
  };
  // ? SWITCH ENDS HERE

  // ? CHECKBOX ACCESS STARTS HERE
  const [checkedAccess, setCheckedAccess] = React.useState(false);
  const handleCheckedAccess = (event) => {
    setCheckedAccess(event.target.checked);
  };
  // ? CHECKBOX  ACCESS ENDS HERE

  // ? DATE PICKER STARTS HERE
  const [dateStartValue, setDateStartValue] = React.useState(new Date());
  const [dateEndValue, setDateEndValue] = React.useState(new Date());
  // ? DATE PICKER ENDS HERE

  // ? COLOR PICKER PALLETE STARTS HERE
  const [backgroundColor, setBackgroundColor] = useColor("hex", "#121212");
  const [textColor, setTextColor] = useColor("hex", "#fff");
  // ? COLOR PICKER PALLETE ENDS HERE

  // * DISCOUNT PERCENT POPOVERS STARTS
  const [anchorDiscountPercentEl, setAnchorDiscountPercentEl] =
    React.useState(null);
  const handleDiscountPercent = (event) => {
    setAnchorDiscountPercentEl(event.currentTarget);
  };
  const handleDiscountPercentClose = () => {
    setAnchorDiscountPercentEl(null);
  };
  const openDiscountPercent = Boolean(anchorDiscountPercentEl);
  const idDiscountPercent = openDiscountPercent ? "simple-popover" : undefined;
  // * DICOUNT PERCENT POPOVERS ENDS

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <div className="page container-fluid position-relative">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/functionality/sizeChart" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <h5 className="page-heading ms-2 ps-1">Create PreOrder Profiles</h5>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Duplicate</p>
          </button>
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Preview</p>
          </button>
          <img
            src={paginationLeft}
            alt="paginationLeft"
            className="c-pointer"
            width={30}
          />
          <img
            src={paginationRight}
            alt="paginationRight"
            className="c-pointer"
            width={30}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row productInfo">
            <div className="col-12 px-0">
              <div className="row">
                <div className="col-8">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue px-0 me-2">Name</p>
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
                    <OutlinedInput placeholder="Enter Name" size="small" />
                  </FormControl>

                  <small className="mt-1 text-grey-6 font1">
                    Note: User can't see this, its for your reference
                  </small>
                </div>
                <div className="col-4">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Status</p>
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
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row mt-4">
            <div className="col-12 px-0 d-flex align-items-center mb-3">
              <h6 className="text-lightBlue me-2 text-lightBlue fw-500">
                PreOrder Conditions
              </h6>
              <Tooltip title="Lorem ipsum" placement="top">
                <img src={info} alt="info" className="c-pointer" width={13.5} />
              </Tooltip>
            </div>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              // value={recommendedProductRadio}
              // onChange={handleRecommendedProductRadio}
            >
              <FormControlLabel
                value="1"
                control={<Radio size="small" />}
                label="Show all time"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />
              <small className="text-grey-6 mb-3 fw-500 d-block">
                "Add to Cart" are immediately replaced by "Pre Order". You can
                offer unlimited pre-orders or set a quantity limit.
              </small>
              <FormControlLabel
                value="2"
                control={<Radio size="small" />}
                label="Pre-Order only when inventory is available"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />
              <small className="text-grey-6 mb-3 fw-500 d-block">
                When inventory is above 0, Pre-order button will be shown.
                <br />
                Once inventory reaches 0, Pre-Order button will disable until
                inventory goes above 0
              </small>
              <FormControlLabel
                value="3"
                control={<Radio size="small" />}
                label="Pre-Order only when Out of Stock"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 13,
                    color: "#c8d8ff",
                  },
                }}
              />
              <small className="text-grey-6 mb-3 fw-500 d-block">
                When inventory is above 0, your usual "Add to Cart" button will
                shown.
                <br />
                Once inventory drops below 0, your Pre-Order button will be
                shown.
              </small>
            </RadioGroup>
            <div className="ps-5">
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                // value={recommendedProductRadio}
                // onChange={handleRecommendedProductRadio}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio size="small" />}
                  label="No Limit"
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
                  label="Limit PreOrder"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
              </RadioGroup>

              <div className="discount-inputs-two">
                <FormControl className="px-0">
                  <OutlinedInput
                    placeholder="Enter Discount"
                    size="small"
                    endAdornment={
                      <InputAdornment position="end" className="c-pointer">
                        <span className="d-flex align-items-center">
                          <p className="text-lightBlue">Percentage</p>
                        </span>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </div>

            <hr className="hr-grey-6 my-3 " />
            <div className="d-flex align-items-center justify-content-between px-0">
              <p className="text-lightBlue px-0 me-2">Schedule Visibility</p>
              <AntSwitch
                inputProps={{ "aria-label": "ant design" }}
                checked={checkedSwitch}
                onChange={handleSwitchChange}
              />
            </div>
            {checkedSwitch === true && (
              <div className="col-12 px-0">
                <div className="row align-items-start">
                  <div className="col-md-6 mt-3">
                    <div className="d-flex mb-1">
                      <p className="text-lightBlue">Start Date and Time</p>
                      <Tooltip title="Lorem ipsum" placement="top">
                        <img
                          src={info}
                          alt="info"
                          className="ms-2 c-pointer"
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
                        className="w-100"
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="col-md-6 mt-3">
                    <div className="d-flex mb-1 justify-content-between">
                      <div className="d-flex">
                        <p className="text-lightBlue">End Date and Time</p>
                        <Tooltip title="Lorem ipsum" placement="top">
                          <img
                            src={info}
                            alt="info"
                            className="ms-2 c-pointer"
                            width={13.5}
                          />
                        </Tooltip>
                      </div>
                      <small className="text-grey-6">(optional)</small>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDateTimePicker
                        value={dateEndValue}
                        onChange={(newValue) => {
                          setDateEndValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                        className="w-100"
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row mt-4">
            <div className="col-12 px-0 d-flex align-items-center">
              <h6 className="text-lightBlue me-2 text-lightBlue fw-500">
                PreOrder Appearance
              </h6>
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="c-pointer me-3"
                  width={13.5}
                />
              </Tooltip>
            </div>
            <div className="col-12 px-0">
              <div className="row">
                <div className="col-4 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Button Text</p>
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
                    <OutlinedInput
                      placeholder="Enter Button Text"
                      size="small"
                    />
                  </FormControl>
                  <small className="mt-1 text-grey-6 font1">
                    Note: User can't see this, its for your reference
                  </small>
                </div>
                <div className="col-4 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Delivery Message</p>
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
                    <OutlinedInput
                      placeholder="Enter Delivery Message"
                      size="small"
                    />
                  </FormControl>
                  <small className="mt-1 text-grey-6 font1">
                    Note: User can't see this, its for your reference
                  </small>
                </div>
                <div className="col-4 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Cart Text</p>
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
                    <OutlinedInput placeholder="Enter Cart Text" size="small" />
                  </FormControl>

                  <small className="mt-1 text-grey-6 font1">
                    Note: User can't see this, its for your reference
                  </small>
                </div>
                <div className="col-md-12 mt-3">
                  <div className="row">
                    <div className="col-auto">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue me-2">Background</p>
                        <Tooltip title="Lorem ipsum" placement="top">
                          <img
                            src={info}
                            alt="info"
                            className="c-pointer"
                            width={13.5}
                          />
                        </Tooltip>
                      </div>
                      <ColorPicker
                        height={150}
                        width={240}
                        color={backgroundColor}
                        onChange={setBackgroundColor}
                        hideHSV
                        dark
                        className="w-100"
                      />
                    </div>
                    <div className="col-auto">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue me-2">Text</p>
                        <Tooltip title="Lorem ipsum" placement="top">
                          <img
                            src={info}
                            alt="info"
                            className="c-pointer"
                            width={13.5}
                          />
                        </Tooltip>
                      </div>
                      <ColorPicker
                        height={150}
                        width={240}
                        color={textColor}
                        onChange={setTextColor}
                        hideHSV
                        dark
                        className="w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row mt-4">
            <div className="col-12 px-0 d-flex align-items-center mb-3">
              <h6 className="text-lightBlue me-2 text-lightBlue fw-500">
                Payment and Discount
              </h6>
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="c-pointer me-3"
                  width={13.5}
                />
              </Tooltip>
            </div>

            <ToggleButtonGroup
              value={paymentType}
              exclusive
              onChange={handlePaymentType}
              aria-label="text alignment"
              className="productDetails-toggle px-0 mt-2"
            >
              <ToggleButton value="fullPayment" aria-label="fullPayment">
                <div className="d-flex">
                  <img src={fullPayment} alt="imageAdd" width={25} />
                  <div className="ms-3 text-start">
                    <p className="text-lightBlue">Full Payment</p>
                    <small className="text-grey-6 d-block">
                      Add Image Label
                    </small>
                  </div>
                </div>
              </ToggleButton>
              <ToggleButton value="partialPayment" aria-label="partialPayment">
                <div className="d-flex">
                  <img src={partialPayment} alt="text" width={25} />

                  <div className="ms-3 text-start">
                    <p className="text-lightBlue">Partial Payment</p>
                    <small className="text-grey-6 d-block">
                      Add custom text label
                    </small>
                  </div>
                </div>
              </ToggleButton>
            </ToggleButtonGroup>
            <div className="col-12 px-0 mt-3">
              {paymentType === "fullPayment" && (
                <div className="w-100  discount-inputs-two d-flex flex-column">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Additional Discount</p>
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
                    <OutlinedInput
                      placeholder="Enter Additional Discount"
                      size="small"
                      endAdornment={
                        <InputAdornment
                          position="end"
                          aria-describedby={idDiscountPercent}
                          onClick={handleDiscountPercent}
                          className="c-pointer"
                        >
                          <span className="d-flex align-items-center">
                            <p className="text-lightBlue">Percentage</p>
                            <img src={arrowDown} alt="arrow" className="ms-2" />
                          </span>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              )}
              {paymentType === "partialPayment" && (
                <div className="row ">
                  <div className="col-md-7 discount-inputs-two d-flex flex-column">
                    <div className="d-flex mb-1">
                      <p className="text-lightBlue me-2">Initial Installment</p>
                      <Tooltip title="Lorem ipsum" placement="top">
                        <img
                          src={info}
                          alt="info"
                          className="c-pointer"
                          width={13.5}
                        />
                      </Tooltip>
                    </div>
                    <div className="d-flex align-items-center">
                      <FormControl className="px-0">
                        <OutlinedInput
                          placeholder="Enter Initial Installment"
                          size="small"
                          endAdornment={
                            <InputAdornment
                              position="end"
                              aria-describedby={idDiscountPercent}
                              onClick={handleDiscountPercent}
                              className="c-pointer"
                            >
                              <span className="d-flex align-items-center">
                                <p className="text-lightBlue">Percentage</p>
                                <img
                                  src={arrowDown}
                                  alt="arrow"
                                  className="ms-2"
                                />
                              </span>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <Popover
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        id={idDiscountPercent}
                        open={openDiscountPercent}
                        anchorEl={anchorDiscountPercentEl}
                        onClose={handleDiscountPercentClose}
                      >
                        <div className="py-2 px-1">
                          <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                            Percentage Discount
                          </small>
                          <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                            Fixed Amount
                          </small>
                        </div>
                      </Popover>

                      <div className="w-auto text-center ms-3">
                        <p className="text-lightBlue">off Total Amount</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5  discount-inputs-two d-flex flex-column">
                    <div className="d-flex mb-1">
                      <p className="text-lightBlue me-2">Additional Discount</p>
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
                      <OutlinedInput
                        placeholder="Enter Additional Discount"
                        size="small"
                        endAdornment={
                          <InputAdornment
                            position="end"
                            aria-describedby={idDiscountPercent}
                            onClick={handleDiscountPercent}
                            className="c-pointer"
                          >
                            <span className="d-flex align-items-center">
                              <p className="text-lightBlue">Percentage</p>
                              <img
                                src={arrowDown}
                                alt="arrow"
                                className="ms-2"
                              />
                            </span>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-5 mt-3">
                    <div className="d-flex mb-1">
                      <p className="text-lightBlue me-2">Final Payment After</p>
                      <Tooltip title="Lorem ipsum" placement="top">
                        <img
                          src={info}
                          alt="info"
                          className="c-pointer"
                          width={13.5}
                        />
                      </Tooltip>
                    </div>
                    <FormControl
                      sx={{ m: 0, minWidth: 120, width: "100%" }}
                      size="small"
                    >
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        // value={field}
                        // onChange={handleFieldChange}
                        size="small"
                      >
                        <MenuItem
                          value=""
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          None
                        </MenuItem>
                        <MenuItem
                          value={10}
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          1 week
                        </MenuItem>
                        <MenuItem
                          value={20}
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          2 week
                        </MenuItem>
                        <MenuItem
                          value={30}
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          1 Month
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row mt-4">
            <div className="col-md-12 d-flex px-0 ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedAccess}
                    onChange={handleCheckedAccess}
                    inputProps={{ "aria-label": "controlled" }}
                    size="small"
                    style={{
                      color: "#5C6D8E",
                    }}
                  />
                }
                label="Enable Access Type"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "0.875rem",
                    color: "#c8d8ff",
                    fontWeight: 500,
                  },
                }}
              />

              <Tooltip title="Lorem ipsum" placement="top">
                <img src={info} alt="info" className="c-pointer" width={13.5} />
              </Tooltip>
            </div>
            {checkedAccess && (
              <React.Fragment>
                <div className="col-12 px-0">
                  <div className="row">
                    <div className="col-8 mt-3">
                      <div className="d-flex mb-1 justify-content-between">
                        <div className="d-flex">
                          <p className="text-lightBlue me-2">Link</p>
                          <Tooltip title="Lorem ipsum" placement="top">
                            <img
                              src={info}
                              alt="info"
                              className="c-pointer"
                              width={13.5}
                            />
                          </Tooltip>
                        </div>
                        <div className="d-flex align-items-center">
                          <Tooltip title="Copy" placement="top">
                            <ContentCopyIcon
                              sx={{ fontSize: 12, color: "#c8d8ff" }}
                              className="c-pointer"
                            />
                          </Tooltip>
                          <small className="text-blue-2 ms-1 ms-2 c-pointer">
                            Copy Link
                          </small>
                        </div>
                      </div>
                      <FormControl className="w-100 px-0">
                        <OutlinedInput placeholder="Enter ID" size="small" />
                      </FormControl>
                    </div>
                    <div className="col-4 mt-3">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue me-2">Access</p>
                        <Tooltip title="Lorem ipsum" placement="top">
                          <img
                            src={info}
                            alt="info"
                            className="c-pointer"
                            width={13.5}
                          />
                        </Tooltip>
                      </div>

                      <FormControl
                        sx={{ m: 0, minWidth: 120, width: "100%" }}
                        size="small"
                      >
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          // value={field}
                          // onChange={handleFieldChange}
                          size="small"
                          defaultValue={"private"}
                        >
                          <MenuItem
                            value={"private"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Private
                          </MenuItem>
                          <MenuItem
                            value={"public"}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Public
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="bg-black-20 border-grey-5 rounded-8 p-3 mt-3">
                  <h6 className="text-lightBlue text-lightBlue fw-500 mb-3">
                    Customer Eligibility
                  </h6>
                  <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    // value={recommendedProductRadio}
                    // onChange={handleRecommendedProductRadio}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio size="small" />}
                      label="All Customers"
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
                      label="Specific Customer Groups"
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
                      label="Specific Customers"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                  </RadioGroup>
                  <div className="d-flex mt-3">
                    <TableSearch />
                    <button className="button-grey py-2 px-3 ms-2">
                      <small className="text-lightBlue me-2">Browse</small>
                      <img src={arrowDown} alt="arrow" className="" />
                    </button>
                  </div>
                  <div className="d-flex">
                    <Chip
                      label="VVIP Users"
                      onDelete={handleDelete}
                      size="small"
                      className="mt-3 me-2"
                    />
                    <Chip
                      label="Royal Users"
                      onDelete={handleDelete}
                      className="me-2 mt-3"
                      size="small"
                    />
                  </div>
                </div>
                <div className="bg-black-20 border-grey-5 rounded-8 p-3 mt-3">
                  <h6 className="text-lightBlue text-lightBlue fw-500 mb-3">
                    Access with
                  </h6>
                  <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    // value={recommendedProductRadio}
                    // onChange={handleRecommendedProductRadio}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio size="small" />}
                      label="No Landing Page"
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
                      label="One Time Password Login to View"
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
                      label="Enter ID and Password"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                  </RadioGroup>
                  <div className="row">
                    <div className="col-6 mt-3">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue me-2">ID</p>
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
                        <OutlinedInput placeholder="Enter ID" size="small" />
                      </FormControl>
                    </div>
                    <div className="col-6 mt-3">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue me-2">Password</p>
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
                        <OutlinedInput
                          placeholder="Enter Password"
                          size="small"
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="bg-black-20 border-grey-5 rounded-8 p-3 mt-3">
                  <h6 className="text-lightBlue text-lightBlue fw-500 mb-3">
                    Product Visibility
                  </h6>
                  <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    // value={recommendedProductRadio}
                    // onChange={handleRecommendedProductRadio}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio size="small" />}
                      label="Hide from website"
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
                      label="Show on website"
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          color: "#c8d8ff",
                        },
                      }}
                    />
                  </RadioGroup>
                </div>
              </React.Fragment>
            )}
          </div>

          <AddProductCondition />
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <h6 className="text-grey-6 mb-3">Preview:</h6>
            <AppReactImageGallery />
            <p className="mt-3 text-lightBlue">The Fringe Diamond Ring</p>
            <small className="text-grey-6 my-2">
              SKU123456&nbsp;|&nbsp;JWLellers
            </small>
            <div>
              <small className="text-grey-6">Diamond Ring</small>
            </div>

            <div className="d-flex mt-3 flex-wrap align-items-center">
              <h6 className="text-lightBlue">₹ 85,000</h6>
              <small className="ms-2 me-3 text-grey-6 ">
                <s>₹ 100,000</s>
              </small>
              <small className="text-lightBlue">15%&nbsp;OFF</small>
            </div>
            <div className="bg-black-20 border-grey-5 rounded-8 py-2 px-3 mt-3">
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                // value={recommendedProductRadio}
                // onChange={handleRecommendedProductRadio}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio size="small" />}
                  label="Full Payment"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#c8d8ff",
                    },
                  }}
                />
                <div className="d-flex align-items-center w-100 justify-cotnent-between">
                  <FormControlLabel
                    value="2"
                    control={<Radio size="small" />}
                    label="Partial Payment"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                      },
                    }}
                  />
                  <p className="text-blue-gradient fw-500 ms-auto">
                    ₹&nbsp;5,000
                  </p>
                </div>
                <div className="d-flex mt-2 flex-wrap align-items-center">
                  <small className="text-blue-1">Special Price</small>
                  <p className="ms-2 me-3 text-lightBlue ">
                    <s>₹&nbsp;80,000</s>
                  </p>
                  <small className="text-grey-6">₹&nbsp;85,000</small>
                </div>
                <div className="d-flex flex-column p-3 border-grey-5 rounded-8 mt-3 mb-2">
                  <div className="d-flex mt-2 flex-wrap justify-content-between w-100">
                    <small className="text-blue-1">Intial Payment</small>
                    <p className="ms-2 text-lightBlue">₹&nbsp;40,000</p>
                  </div>
                  <div className="d-flex mt-2 flex-wrap justify-content-between w-100">
                    <small className="text-blue-1">Final Payment</small>
                    <p className="ms-2 text-lightBlue ">₹&nbsp;40,000</p>
                  </div>
                  <small className="text-grey-6 font1 mt-1">
                    Final Payment after 1 week
                  </small>
                </div>
              </RadioGroup>
            </div>
            <button className="button-gradient py-2 px-4 w-100 mt-3 rounded-0">
              <h6 className="fw-500">EARLY ACCESS NOW</h6>
            </button>
            <div className="w-100 text-center">
              <small className="text-grey-6 font1 mt-1">
                Will be Delivered in 2 weeks
              </small>
            </div>
            <AppTimer />
          </div>
        </div>
      </div>
      <div className="row bottom-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link
            to="/products/allProducts"
            className="button-red-outline py-2 px-4"
          >
            <p>Discard</p>
          </Link>

          <Link
            to="/products/allProducts"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>

        {/* {value === 6 ? (
          <Link
            to="/products/allProducts"
            className="button-gradient py-2 px-4 w-auto"
          >
            <p>Save</p>
          </Link>
        ) : ( */}
        <button className="button-gradient py-2 px-4 w-auto">
          <p>Continue</p>
        </button>
        {/* )} */}
      </div>
    </div>
  );
};

export default CreatePreOrder;
