import React, { useMemo } from "react";
import "./CreateLabels.scss";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import { ColorPicker, useColor } from "react-color-palette";
// ! COMPONENT IMPORTS
import AddProductCondition from "../../../components/AddProductCondition/AddProductCondition";
import AppTextEditor from "../../../components/AppTextEditor/AppTextEditor";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import sizeTape from "../../../assets/icons/sizeTape.svg";
import sizeTable from "../../../assets/icons/sizeTable.svg";
import text from "../../../assets/icons/text.svg";
import imageAdd from "../../../assets/icons/imageAdd.svg";
import uploadBadge from "../../../assets/icons/uploadBadge.svg";
import positionTopLeft from "../../../assets/icons/positionTopLeft.svg";
import positionTopRight from "../../../assets/icons/positionTopRight.svg";
import positionBottomLeft from "../../../assets/icons/positionBottomLeft.svg";
import positionBottomRight from "../../../assets/icons/positionBottomRight.svg";
import positionCenterLeft from "../../../assets/icons/positionCenterLeft.svg";
import positionCenterRight from "../../../assets/icons/positionCenterRight.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// ! MATERIAL ICONS IMPORTS
import CloseIcon from "@mui/icons-material/Close";
import { AntSwitch } from "../../../components/AntSwitch/AntSwitch";
import AppReactImageGallery from "../../../components/AppReactImageGallery/AppReactImageGallery";

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

const CreateLabels = () => {
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

  const [sizeType, setSizeType] = React.useState("addImage");

  const handleSizeType = (event, newProduct) => {
    setSizeType(newProduct);
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

  // ? DATE PICKER STARTS HERE
  const [dateStartValue, setDateStartValue] = React.useState(new Date());
  const [dateEndValue, setDateEndValue] = React.useState(new Date());
  // ? DATE PICKER ENDS HERE

  // ? COLOR PICKER PALLETE STARTS HERE
  const [color, setColor] = useColor("hex", "#121212");
  // ? COLOR PICKER PALLETE ENDS HERE

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

          <h5 className="page-heading ms-2 ps-1">Create Labels</h5>
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
                    <p className="text-lightBlue px-0 me-2">Label Name</p>
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
                      placeholder="Enter Label Name"
                      size="small"
                    />
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
            <div className="col-12 px-0 d-flex align-items-center">
              <h6 className="text-lightBlue me-2 text-lightBlue fw-500">
                Label Content
              </h6>
              <Tooltip title="Lorem ipsum" placement="top">
                <img src={info} alt="info" className="c-pointer" width={13.5} />
              </Tooltip>
            </div>

            <p className="text-lightBlue px-0 me-2 mt-3">Type</p>
            <ToggleButtonGroup
              value={sizeType}
              exclusive
              onChange={handleSizeType}
              aria-label="text alignment"
              className="productDetails-toggle px-0 mt-2"
            >
              <ToggleButton value="addImage" aria-label="addImage">
                <div className="d-flex">
                  <img src={imageAdd} alt="imageAdd" width={25} />
                  <div className="ms-3 text-start">
                    <p className="text-lightBlue">Image</p>
                    <small className="text-grey-6 d-block">
                      Add Image Label
                    </small>
                  </div>
                </div>
              </ToggleButton>
              <ToggleButton value="text" aria-label="text">
                <div className="d-flex">
                  <img src={text} alt="text" width={25} />

                  <div className="ms-3 text-start">
                    <p className="text-lightBlue">Text</p>
                    <small className="text-grey-6 d-block">
                      Add custom text label
                    </small>
                  </div>
                </div>
              </ToggleButton>
            </ToggleButtonGroup>
            {sizeType === "addImage" ? (
              <React.Fragment>
                <p className="text-lightBlue px-0 me-2 mt-3">Upload</p>
                <div {...getRootProps({ style })} className="mt-2">
                  <input
                    id="primary"
                    {...getInputProps()}
                    // onChange={(event) => {
                    //   uploadFileToCloud(event, "primary");
                    //   event.target.value = null;
                    // }}
                  />
                  <img src={uploadBadge} className="w-100" alt="uploadBadge" />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="d-flex col-12 px-0 mt-3 justify-content-between mb-1">
                  <div className="d-flex align-items-center">
                    <p className="text-lightBlue me-auto">Enter Text</p>
                  </div>
                  <p className="text-blue-2">+ Add Variables</p>
                </div>

                <FormControl className="w-100 px-0">
                  <OutlinedInput placeholder="Enter Text" size="small" />
                </FormControl>
              </React.Fragment>
            )}
            <div className="d-flex align-items-center mt-4 justify-content-between px-0">
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
                Label Content
              </h6>
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="c-pointer me-3"
                  width={13.5}
                />
              </Tooltip>

              <ToggleButtonGroup
                value={sizeChartView}
                exclusive
                onChange={handleSizeChartView}
                aria-label="text alignment"
                className="productDetails-toggle"
              >
                <ToggleButton value="desktopView" aria-label="desktopView">
                  <small className="text-capitalize text-lightBlue">
                    Desktop
                  </small>
                </ToggleButton>
                <ToggleButton value="mobileView" aria-label="mobileView">
                  <small className="text-capitalize text-lightBlue">
                    Mobile
                  </small>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="col-12 px-0">
              <div className="row">
                <div className="col-md-3 mt-3">
                  <h6 className="text-lightBlue fw-500">Label Color</h6>
                </div>
                <div className="col-md-9 mt-3">
                  <div className="row">
                    <div className="col-6">
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
                    </div>
                    <div className="col-6">
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
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <ColorPicker
                        height={150}
                        color={color}
                        onChange={setColor}
                        hideHSV
                        dark
                        className="w-100"
                      />
                    </div>
                    <div className="col-6">
                      <ColorPicker
                        height={150}
                        color={color}
                        onChange={setColor}
                        hideHSV
                        dark
                        className="w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mt-3">
                  <h6 className="text-lightBlue fw-500">Label Position</h6>
                </div>
                <div className="col-md-9 mt-3">
                  <div className="row">
                    {/* positionTopLeft */}
                    <div className="col-12">
                      <ToggleButtonGroup
                        value={labelPosition}
                        exclusive
                        onChange={handleLabelPosition}
                        aria-label="text alignment"
                        className="productDetails-toggle"
                      >
                        <ToggleButton value="topLeft" aria-label="topLeft">
                          <img
                            src={positionTopLeft}
                            alt="positionTopLeft"
                            className="w-100"
                          />
                        </ToggleButton>
                        <ToggleButton value="topRight" aria-label="topRight">
                          <img
                            src={positionTopRight}
                            alt="positionTopRight"
                            className="w-100"
                          />
                        </ToggleButton>
                        <ToggleButton
                          value="bottomLeft"
                          aria-label="bottomLeft"
                        >
                          <img
                            src={positionBottomLeft}
                            alt="positionBottomLeft"
                            className="w-100"
                          />
                        </ToggleButton>
                        <ToggleButton
                          value="bottomRight"
                          aria-label="bottomRight"
                        >
                          <img
                            src={positionBottomRight}
                            alt="positionBottomRight"
                            className="w-100"
                          />
                        </ToggleButton>
                        <ToggleButton
                          value="centerLeft"
                          aria-label="centerLeft"
                        >
                          <img
                            src={positionCenterLeft}
                            alt="positionCenterLeft"
                            className="w-100"
                          />
                        </ToggleButton>
                        <ToggleButton
                          value="centerRight"
                          aria-label="centerRight"
                        >
                          <img
                            src={positionCenterRight}
                            alt="positionCenterRight"
                            className="w-100"
                          />
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3 mt-3">
                  <h6 className="text-lightBlue fw-500">Label Color</h6>
                </div>
                <div className="col-md-9 mt-3">
                  <div className="row">
                    <div className="col-6">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue me-2">Top</p>
                        <Tooltip title="Lorem ipsum" placement="top">
                          <img
                            src={info}
                            alt="info"
                            className="c-pointer"
                            width={13.5}
                          />
                        </Tooltip>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue me-2">Bottom</p>
                        <Tooltip title="Lorem ipsum" placement="top">
                          <img
                            src={info}
                            alt="info"
                            className="c-pointer"
                            width={13.5}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <FormControl className="w-100 px-0">
                        <OutlinedInput placeholder="Enter Top" size="small" />
                      </FormControl>
                    </div>
                    <div className="col-6">
                      <FormControl className="w-100 px-0">
                        <OutlinedInput
                          placeholder="Enter Bottom"
                          size="small"
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mt-3">
                  <h6 className="text-lightBlue fw-500">Label Position</h6>
                </div>
                <div className="col-md-9 mt-3">
                  <div className="row">
                    {/* positionTopLeft */}
                    <div className="col-12">
                      <ToggleButtonGroup
                        value={labelSize}
                        exclusive
                        onChange={handleLabelSize}
                        aria-label="text alignment"
                        className="productDetails-toggle"
                      >
                        <ToggleButton value="small" aria-label="small">
                          <small className="text-lightBlue">Small</small>
                        </ToggleButton>
                        <ToggleButton value="medium" aria-label="medium">
                          <small className="text-lightBlue">Medium</small>
                        </ToggleButton>
                        <ToggleButton value="large" aria-label="large">
                          <small className="text-lightBlue">Large</small>
                        </ToggleButton>
                        <ToggleButton
                          value="extraLarge"
                          aria-label="extraLarge"
                        >
                          <small className="text-lightBlue">Extra Large</small>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default CreateLabels;
