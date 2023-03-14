import React from "react";
import "./CreatePriceMaster.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import NotesBox from "../../../components/NotesBox/NotesBox";
import StatusBox from "../../../components/StatusBox/StatusBox";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import addMedia from "../../../assets/icons/addMedia.svg";
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
// ! MATERIAL ICON IMPORTS
import DeleteIcon from "@mui/icons-material/Delete";

const locationData = [
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

const CreatePriceMaster = () => {
  // ? OPERATOR SELECT STARTS HERE
  const [operator, setOperator] = React.useState("");

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };
  // ? OPERATOR SELECT ENDS HERE

  // ? WEIGHT SELECT STARTS HERE
  const [weight, setWeight] = React.useState("");

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };
  // ? WEIGHT SELECT ENDS HERE

  // ? PRICE TYPE RADIO STARTS HERE
  const [priceType, setPriceType] = React.useState(0);
  const handlePriceType = (event, newValue) => {
    setPriceType(newValue);
  };
  // ? PRICE TYPE RADIO ENDS HERE

  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/parameters/priceMaster/inventory" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>
          <h5 className="page-heading ms-2 ps-1">Create Master</h5>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Master Information
                </h6>
              </div>
            </div>
            <hr className="hr-grey-6 my-3" />
            <div className="col-md-12 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Name Master</p>
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
                <OutlinedInput placeholder="Enter Master Name" size="small" />
              </FormControl>
            </div>
          </div>

          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row features mt-4">
            <div className="d-flex flex-column col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Add Fields
                </h6>
              </div>
              <small className="text-grey-6 mt-1 d-block">
                ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </small>
            </div>
            <div className="col-12 px-0">
              <hr className="hr-grey-6 mt-3 mb-0" />
            </div>

            {[...Array(4)].map((elementInArray, index) => (
              <div className="col-12 d-flex px-0 mt-3">
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  size="small"
                  options={locationData}
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
                    <TextField {...params} placeholder="Search" />
                  )}
                />
                <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer ms-2">
                  <DeleteIcon
                    sx={{
                      color: "#c8d8ff",
                      fontSize: 16,
                      cursor: "pointer",
                      // marginRight: "0.5rem",
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="col-12 px-0 mt-3">
              <small className="text-blue-2 c-pointer fw-500">
                + Add Fields
              </small>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row features mt-4">
            <div className="d-flex flex-column col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Formula for Pricing
                </h6>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
            </div>
            <div className="col-12 px-0">
              <hr className="hr-grey-6 mt-3 mb-0" />
            </div>
            <div className="col-12 px-0 d-flex align-items-center mt-3">
              <p className="text-lightBlue text-lightBlue">Current Rate</p>
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="ms-2 c-pointer me-2"
                  width={13.5}
                />
              </Tooltip>
              <p className="text-lightBlue text-lightBlue me-2">will</p>

              <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={operator}
                  onChange={handleOperatorChange}
                  size="small"
                >
                  <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    None
                  </MenuItem>
                  <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Multiply
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Divide
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Add
                  </MenuItem>
                  <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Subtract
                  </MenuItem>
                </Select>
              </FormControl>

              <p className="text-lightBlue text-lightBlue mx-2">by</p>

              <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={weight}
                  onChange={handleWeightChange}
                  size="small"
                >
                  <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    None
                  </MenuItem>
                  <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Metal Weight
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Diamond Carat Weight
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Total Weight
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="d-flex flex-column p-3 bg-black-21 rounded-8 mt-3 col-auto">
              <p className="text-grey-6">Example</p>
              <p className="text-lightBlue mt-3">
                Current Rate:&nbsp;₹ 4,400 per gram&nbsp;
                <span className="text-grey-6">(Gold 18KT)</span>
              </p>
              <p className="text-lightBlue mt-2">
                Final Formula:&nbsp;₹ 4,400&nbsp;x1.46 grams&nbsp;=&nbsp;₹ 5,820
              </p>
            </div>
            <div className="d-flex flex-column col-12 px-0 justify-content-between mt-4 pt-3">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue text-lightBlue fw-500">
                  Price Type
                </h6>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
            </div>
            <div className="col-12 px-0">
              <hr className="hr-grey-6 mt-3 mb-0" />
            </div>
            <div className="col-12 d-flex flex-column px-0 mt-3">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={priceType}
                  onChange={handlePriceType}
                >
                  <FormControlLabel
                    value="minAmount"
                    control={<Radio size="small" />}
                    label="Default Pricing (Selection between Fixed pricing on per gram pricing)"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        // color: "#5C6D8E",
                      },
                    }}
                  />

                  <FormControlLabel
                    value="minQuantity"
                    control={<Radio size="small" />}
                    label="Weight Range Pricing (Min Weight - Max Weight)"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        // color: "#5C6D8E",
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <StatusBox headingName={"Master Status"} showSchedule={"false"} />
          <div className="mt-4">
            <UploadMediaBox imageName={addMedia} headingName={"Media"} />
          </div>

          <NotesBox />
        </div>
      </div>
      <div className="row create-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/priceMaster"
            className="button-red-outline py-2 px-4"
          >
            <p>Discard</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/priceMaster/inventory"
            className="button-gradient ms-3 py-2 px-4 w-auto"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatePriceMaster;
