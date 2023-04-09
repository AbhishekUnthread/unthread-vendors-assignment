import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
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
import makeSize from "../../../assets/icons/makeSize.svg";
import imageAdd from "../../../assets/icons/imageAdd.svg";
import uploadSizeChart from "../../../assets/icons/uploadSizeChart.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  OutlinedInput,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import CloseIcon from "@mui/icons-material/Close";

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

const CreateSizeChart = () => {
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
  // ? TOGGLE BUTTON ENDS HERE

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

          <h5 className="page-heading ms-2 ps-1">Create Size Chart</h5>
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
                    <p className="text-lightBlue px-0 me-2">Size Chart Name</p>
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
                      placeholder="Enter Size Chart Name"
                      size="small"
                    />
                  </FormControl>
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
              <h6 className="text-lightBlue fw-500 me-3">
                Make Size chart for
              </h6>

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
              <ToggleButton value="companyLabel" aria-label="companyLabel">
                <div className="d-flex">
                  <img src={makeSize} alt="makeSize" width={25} />

                  <div className="ms-3 text-start">
                    <p className="text-lightBlue">Make Size chart on Company</p>
                    <small className="text-grey-6 d-block">
                      Select company custom present labels
                    </small>
                  </div>
                </div>
              </ToggleButton>
            </ToggleButtonGroup>
            {sizeType === "addImage" ? (
              <React.Fragment>
                <p className="text-lightBlue px-0 me-2 mt-3">
                  Upload your Size Chart
                </p>
                <div {...getRootProps({ style })} className="mt-2">
                  <input
                    id="primary"
                    {...getInputProps()}
                    // onChange={(event) => {
                    //   uploadFileToCloud(event, "primary");
                    //   event.target.value = null;
                    // }}
                  />
                  <img
                    src={uploadSizeChart}
                    className="w-100"
                    alt="uploadSizeChart"
                  />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="d-flex justify-content-between align-items-center mb-2 px-0 mt-3">
                  <div className="d-flex align-items-center px-0">
                    <p className="text-lightBlue me-2">Size Chart Table</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="c-pointer"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <div className="hover-back bg-black-20 c-pointer rounded-8 px-2 py-2">
                    <small className="d-block mb-0">
                      Please click on table icon to add a table
                    </small>
                  </div>
                </div>
                <div className="col-12 px-0">
                  <AppTextEditor />
                </div>
                {/* <div className="row"> */}
                {/* </div> */}
              </React.Fragment>
            )}
          </div>
          <AddProductCondition />
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <h6 className="text-grey-6 mb-3">Preview:</h6>
            <div className="d-flex align-items-center">
              <img src={sizeTape} alt="sizeTape" width={25} />
              <p className="text-blue-1 ms-2 fw-500">Find my size?</p>
            </div>
            <div className="bg-black-21 rounded-8 p-3 mt-3 text-center">
              <div className="text-end">
                <CloseIcon
                  sx={{ color: "#c8d8ff", fontSize: 20 }}
                  className="c-pointer"
                />
              </div>
              <h4 className="text-lightBlue fw-600">Ring Size Chart</h4>
              <small className="text-grey-6 mt-3 d-block">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. At
                porro dolor
              </small>
              <img src={sizeTable} alt="sizeTable" className="w-100 mt-3" />
              <small className="text-grey-6 mt-3 d-block">
                Note:&nbsp;Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. At porro dolor
              </small>
              <small className="text-grey-6 mt-3 d-block">
                To download this ring size chart&nbsp;
                <span className="text-blue-2">Click here</span>
              </small>
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

export default CreateSizeChart;
