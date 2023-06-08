import React from "react";
import "./CreateDataSets.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import optionUpload from "../../../assets/icons/optionUpload.svg";
import gold from "../../../assets/images/products/gold.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  MenuItem,
  Select,
  OutlinedInput,
  FormControlLabel,
  RadioGroup,
  Radio,
  Tooltip,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFile from "../../../components/UploadFile/UploadFile";

const CreateDataSets = () => {
  // ? INPUT FIELD TYPE SELECT STARTS HERE
  const [inputFieldType, setInputFieldType] = React.useState("");

  const handleInputFieldType = (event) => {
    setInputFieldType(event.target.value);
  };
  // ? INPUT FIELD TYPE SELECT ENDS HERE

  // ? OPTION SELECT STARTS HERE
  const [optionSelect, setOptionSelect] = React.useState(10);

  const handleOptionSelect = (event) => {
    setOptionSelect(event.target.value);
  };
  // ? OPTION SELECT ENDS HERE

  // ? SIZE SELECT STARTS HERE
  const [size, setSize] = React.useState("");
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  // ? SIZE SELECT ENDS HERE

  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/parameters/variantSets" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <h5 className="page-heading ms-2 ps-1">Add Data</h5>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
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
      <div className="row mt-3">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="col-md-12 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Data Title</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <FormControl className="w-100 px-0">
                <OutlinedInput placeholder="Enter Data Title" size="small" />
              </FormControl>
            </div>
            <div className="col-12 mt-3 px-0">
              <div className="d-flex  mb-1">
                <p className="text-lightBlue me-2">Frontend Appearance</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>

              <FormControl
                sx={{
                  m: 0,
                  minWidth: 120,
                  width: "100%",
                }}
                size="small"
              >
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
                    Rectangle Buttons
                  </MenuItem>
                  <MenuItem value={60} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Circle Buttons
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            {inputFieldType && (
              <div className="col-12 bg-black-13 d-flex justify-content-between mt-4 py-3 mb-2">
                <p className="text-lightBlue">
                  {/* {inputFieldType === 20 || inputFieldType === 30
                    ? "Option Name"
                    : "Data Values"} */}
                  Data Value
                </p>
                <p className="text-lightBlue">Action</p>
              </div>
            )}
            {inputFieldType && (
              <React.Fragment>
                <div className="col-12 d-flex justify-content-between my-2">
                  <div className="d-flex align-items-center">
                    <FormControl className="me-2">
                      <OutlinedInput
                        placeholder="Enter Data Name"
                        size="small"
                      />
                    </FormControl>
                    {inputFieldType === 30 && (
                      <React.Fragment>
                        <FormControl
                          sx={{
                            m: 0,
                            minWidth: 10,
                            width: 100,
                          }}
                          size="small"
                          className="me-2"
                        >
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={optionSelect}
                            onChange={handleOptionSelect}
                            size="small"
                          >
                            <MenuItem
                              value={10}
                              sx={{ fontSize: 13, color: "#5c6d8e" }}
                            >
                              Color
                            </MenuItem>
                            <MenuItem
                              value={20}
                              sx={{ fontSize: 13, color: "#5c6d8e" }}
                            >
                              Image
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {optionSelect === 10 && (
                          <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2">
                            <img src={gold} alt="gold" width={15} />
                            <small className="text-grey-6 ms-2">#HC1258</small>
                          </div>
                        )}
                      </React.Fragment>
                    )}
                    {(inputFieldType === 20 || optionSelect === 20) && (
                      <UploadFile imageName={optionUpload} height={36} />
                    )}
                  </div>
                  <Tooltip title="Delete" placement="top">
                    <div className="d-flex table-edit-icon rounded-4 p-2 border-grey-5">
                      <DeleteIcon
                        sx={{
                          color: "#5c6d8e",
                          fontSize: 20,
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </Tooltip>
                </div>
                <div className="col-12 d-flex justify-content-between my-2">
                  <div className="d-flex align-items-center">
                    <FormControl className="me-2">
                      <OutlinedInput
                        placeholder="Enter Data Name"
                        size="small"
                      />
                    </FormControl>
                    {inputFieldType === 30 && (
                      <React.Fragment>
                        <FormControl
                          sx={{
                            m: 0,
                            minWidth: 10,
                            width: 100,
                          }}
                          size="small"
                          className="me-2"
                        >
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={optionSelect}
                            onChange={handleOptionSelect}
                            size="small"
                          >
                            <MenuItem
                              value={10}
                              sx={{ fontSize: 13, color: "#5c6d8e" }}
                            >
                              Color
                            </MenuItem>
                            <MenuItem
                              value={20}
                              sx={{ fontSize: 13, color: "#5c6d8e" }}
                            >
                              Image
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {optionSelect === 10 && (
                          <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2">
                            <img src={gold} alt="gold" width={15} />
                            <small className="text-grey-6 ms-2">#HC1258</small>
                          </div>
                        )}
                      </React.Fragment>
                    )}
                    {(inputFieldType === 20 || optionSelect === 20) && (
                      <UploadFile imageName={optionUpload} height={36} />
                    )}
                  </div>
                  <Tooltip title="Delete" placement="top">
                    <div className="d-flex table-edit-icon rounded-4 p-2 border-grey-5">
                      <DeleteIcon
                        sx={{
                          color: "#5c6d8e",
                          fontSize: 20,
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </Tooltip>
                </div>
                <small className="text-blue-2 c-pointer mt-2">
                  + Add Data Values
                </small>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="text-lightBlue fw-500">Preview</h6>
            </div>
            {inputFieldType &&
              (inputFieldType === 10 || inputFieldType === 20) && (
                <React.Fragment>
                  <p className="text-lightBlue mb-2 mt-3">Size</p>
                  <FormControl
                    sx={{ m: 0, minWidth: 120, width: "100%" }}
                    size="small"
                  >
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={size}
                      onChange={handleSizeChange}
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
                        S
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        M
                      </MenuItem>
                      <MenuItem
                        value={30}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        L
                      </MenuItem>
                      <MenuItem
                        value={40}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        XL
                      </MenuItem>
                    </Select>
                  </FormControl>
                </React.Fragment>
              )}
            {inputFieldType && inputFieldType === 30 && (
              <React.Fragment>
                <p className="text-lightBlue mt-3">Size</p>
                <div className="d-flex flex-wrap">
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <img src={gold} alt="gold" width={15} />
                    <small className="text-grey-6 ms-2">Value 1</small>
                  </div>
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <img src={gold} alt="gold" width={15} />
                    <small className="text-grey-6 ms-2">Value 2</small>
                  </div>
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <img src={gold} alt="gold" width={15} />
                    <small className="text-grey-6 ms-2">Value 3</small>
                  </div>
                </div>
              </React.Fragment>
            )}
            {inputFieldType && inputFieldType === 40 && (
              <React.Fragment>
                <p className="text-lightBlue mt-3">Size</p>

                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="mt-1"
                  // value={recommendedProductRadio}
                  // onChange={handleRecommendedProductRadio}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio size="small" />}
                    label="Value 1"
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
                    label="Value 2"
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
                    label="Value 3"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                      },
                    }}
                  />
                </RadioGroup>
              </React.Fragment>
            )}
            {inputFieldType && inputFieldType === 50 && (
              <React.Fragment>
                <p className="text-lightBlue mt-3">Size</p>
                <div className="d-flex flex-wrap">
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <small className="text-grey-6 ms-2">Value 1</small>
                  </div>
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <small className="text-grey-6 ms-2">Value 2</small>
                  </div>
                  <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                    <small className="text-grey-6 ms-2">Value 3</small>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <div className="row create-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/variantSets"
            className="button-red-outline py-2 px-4"
          >
            <p>Discard</p>
          </Link>

          <Link
            to="/parameters/variantSets"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/variantSets"
            className="button-lightBlue-outline py-2 px-4"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/parameters/variantSets"
            className="button-gradient ms-3 py-2 px-4 w-auto"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateDataSets;
