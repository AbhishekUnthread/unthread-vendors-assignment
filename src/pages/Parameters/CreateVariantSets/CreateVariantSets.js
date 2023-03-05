import React from "react";
import "./CreateVariantSets.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import TabPanel from "../../../components/TabPanel/TabPanel";
import AppReactTree from "../../../components/AppReactTree/AppReactTree";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import gold from "../../../assets/images/products/gold.svg";
import silver from "../../../assets/images/products/silver.svg";
import platinum from "../../../assets/images/products/platinum.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  MenuItem,
  Select,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Tooltip,
  Tabs,
  Box,
  Tab,
  Autocomplete,
  TextField,
  Chip,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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

const productMetal = [
  { id: 1, name: "Gold", image: gold },
  { id: 2, name: "Silver", image: silver },
  { id: 3, name: "Platinum", image: platinum },
];

const CreateVariantSets = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // ? RADIO BUTTON STARTS HERE
  const [likeProductRadio, setLikeProductRadio] = React.useState("automated");
  const handleLikeProductRadio = (event) => {
    setLikeProductRadio(event.target.value);
  };

  // ? RADIO BUTTON ENDS HERE

  // ? INPUT FIELD TYPE SELECT STARTS HERE
  const [inputFieldType, setInputFieldType] = React.useState("");

  const handleInputFieldType = (event) => {
    setInputFieldType(event.target.value);
  };
  // ? INPUT FIELD TYPE SELECT ENDS HERE

  // ? SIZE SELECT STARTS HERE
  const [size, setSize] = React.useState("");
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  // ? SIZE SELECT ENDS HERE

  // ? ADD OPTIONS STARTS HERE
  const [addOptions, setAddOptions] = React.useState(false);

  const handleAddOptions = () => {
    !addOptions ? setAddOptions(true) : setAddOptions(false);
  };
  // ? ADD OPTIONS SELECT ENDS HERE

  // ? SAVE OPTIONS STARTS HERE
  const [saveOption, setSaveOption] = React.useState(false);

  const handleSaveOption = () => {
    setSaveOption(true);
  };
  // ? SAVE OPTIONS ENDS HERE

  const [metal, setMetal] = React.useState("");
  const handleMetalChange = (e) => {
    if (e.target.value) {
      setMetal(e.target.value.toLowerCase());
      var elems = document
        .querySelector(".metal-radio")
        .querySelectorAll(".MuiFormControlLabel-root.active");
      [].forEach.call(elems, function (el) {
        el.classList.remove("active");
      });
      e.target.closest("label").classList.toggle("active");
    }
  };

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

          <h5 className="page-heading ms-2 ps-1">Create Options Sets</h5>
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
      <div className="row mt-3">
        <div className="col-12">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="col-md-12 px-0">
              <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
                Option Information
              </h6>
              <hr className="hr-grey-6 my-3" />
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Name this Option Sets</p>
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
                <OutlinedInput placeholder="Global Option Sets" size="small" />
              </FormControl>
            </div>
          </div>
        </div>
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="col-12 mt-3 px-0">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">Add Notes</h5>
                  <small className="text-grey-6 mt-1 d-block">
                    If this product has options, like size or color then add
                    option
                  </small>
                </div>
                <button
                  className="button-gradient py-2 px-4 ms-3"
                  onClick={handleAddOptions}
                >
                  <p>+ Add Options</p>
                </button>
              </div>
            </div>
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
                <Tab label="Options" className="tabs-head" />
                <Tab label="Structure" className="tabs-head" />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              {saveOption && (
                <div className="col-12 ">
                  <div className="row py-3 border-grey-5 rounded-3 align-items-center bg-black-13 mt-3">
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
                      <button className="button-lightBlue-outline py-1 px-3 me-2">
                        <p>Edit</p>
                      </button>
                      <button className="button-lightBlue-outline py-1 px-3">
                        <p>Delete</p>
                      </button>
                    </div>
                    <div className="col-12 mt-3">
                      <small className="text-grey-6">
                        Input Field Type:&nbsp;
                        <span className="text-lightBlue">Dropdown</span>
                      </small>
                    </div>
                    <div className="col-12 d-flex mt-1">
                      <Chip label="S" size="small" className="px-1 me-2" />
                      <Chip label="M" size="small" className="px-1 me-2" />
                      <Chip label="L" size="small" className="px-1 me-2" />
                      <Chip label="XL" size="small" className="px-1 me-2" />
                    </div>
                  </div>
                  <div className="row py-3 border-grey-5 rounded-3 align-items-center bg-black-13 mt-3">
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
                      <button className="button-lightBlue-outline py-1 px-3 me-2">
                        <p>Edit</p>
                      </button>
                      <button className="button-lightBlue-outline py-1 px-3">
                        <p>Delete</p>
                      </button>
                    </div>
                    <div className="col-12 mt-3">
                      <small className="text-grey-6">
                        Input Field Type:&nbsp;
                        <span className="text-lightBlue">Dropdown</span>
                      </small>
                    </div>
                    <div className="col-12 d-flex mt-1">
                      <Chip label="S" size="small" className="px-1 me-2" />
                      <Chip label="M" size="small" className="px-1 me-2" />
                      <Chip label="L" size="small" className="px-1 me-2" />
                      <Chip label="XL" size="small" className="px-1 me-2" />
                    </div>
                  </div>
                </div>
              )}
              {addOptions && (
                <div className="col-12 mt-3">
                  <div className="row py-3 border-grey-5 rounded-3 bg-black-13">
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-item-center mb-2">
                        <p className="text-lightBlue me-2">Enter Option Name</p>
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
                        sx={{
                          m: 0,
                          minWidth: 120,
                          width: "100%",
                        }}
                      >
                        <OutlinedInput
                          placeholder="Enter Option Name"
                          size="small"
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-item-center mb-2">
                        <p className="text-lightBlue me-2">Input Field Type</p>
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
                            Drop-Down List
                          </MenuItem>
                          <MenuItem
                            value={20}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Drop-Down List with Thumbnails
                          </MenuItem>
                          <MenuItem
                            value={30}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Images & Color Swatches
                          </MenuItem>
                          <MenuItem
                            value={40}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Radio Buttons
                          </MenuItem>
                          <MenuItem
                            value={50}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Multiple Select
                          </MenuItem>
                          <MenuItem
                            value={60}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Circle Buttons
                          </MenuItem>
                          <MenuItem
                            value={70}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Square Button
                          </MenuItem>
                          <MenuItem
                            value={80}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            Text Field
                          </MenuItem>
                          <MenuItem
                            value={90}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            File Uploader
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-12 text-end mb-3">
                      <div className="d-flex align-item-center mb-2">
                        <p className="text-lightBlue me-2">Select Size</p>
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
                        options={taggedWithData}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.title}
                        size="small"
                        className="w-100"
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={
                                <CheckBoxOutlineBlankIcon fontSize="small" />
                              }
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
                    <div className="col-12 text-end d-flex justify-content-end">
                      <button className="button-lightBlue-outline py-2 px-4 me-2">
                        <p>Discard</p>
                      </button>
                      <button
                        className="button-gradient py-2 px-5"
                        onClick={handleSaveOption}
                      >
                        <p>Save</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="mt-3">
                <AppReactTree />
              </div>
            </TabPanel>
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="text-lightBlue fw-500">Preview</h6>
            </div>
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
            <p className="text-lightBlue mt-3">Metal</p>

            <FormControl className="mt-2 custom-radio-buttons metal-radio">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={productMetal.name}
                name="radio-buttons-group"
                row
              >
                {productMetal.map((e, index) => (
                  <FormControlLabel
                    value={e.name}
                    control={<Radio size="small" />}
                    className={`mb-2 custom-radio${index} radio-buttons`}
                    onChange={(e) => {
                      handleMetalChange(e);
                    }}
                    key={index}
                    label={
                      <div className="d-flex align-items-center px-1">
                        <img src={e.image} alt="" className="me-2" width={15} />
                        {e.name}
                      </div>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
            {metal === "gold" && (
              <React.Fragment>
                <p className="text-lightBlue mt-3 d-block">Gold Purity</p>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={likeProductRadio}
                  onChange={handleLikeProductRadio}
                  className="features-radio px-0"
                >
                  <FormControlLabel
                    value="14kt"
                    control={<Radio size="small" />}
                    label="14 KT"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        marginRight: 1,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="18kt"
                    control={<Radio size="small" />}
                    label="18 KT"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        marginRight: 1,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="22kt"
                    control={<Radio size="small" />}
                    label="22 KT"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        marginRight: 1,
                      },
                    }}
                  />
                </RadioGroup>
                <p className="text-lightBlue mt-3 d-block">Gold Color</p>
                <div className="d-flex flex-wrap">
                  <div className="d-flex border-grey-5 py-1 px-2 rounded-3 me-2 mt-2">
                    <img src={gold} alt="gold" width={15} />
                    <small className="text-grey-6 ms-2">Yellow</small>
                  </div>
                  <div className="d-flex border-grey-5 py-1 px-2 rounded-3 me-2 mt-2">
                    <img src={gold} alt="gold" width={15} />
                    <small className="text-grey-6 ms-2">Rose</small>
                  </div>
                </div>
              </React.Fragment>
            )}
            {metal === "silver" && (
              <React.Fragment>
                <p className="text-lightBlue mt-3 d-block">Silver Purity</p>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={likeProductRadio}
                  onChange={handleLikeProductRadio}
                  className="features-radio px-0"
                >
                  <FormControlLabel
                    value="925"
                    control={<Radio size="small" />}
                    label="925"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        marginRight: 1,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="999"
                    control={<Radio size="small" />}
                    label="999"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        marginRight: 1,
                      },
                    }}
                  />
                </RadioGroup>
                <p className="text-lightBlue mt-3 d-block">Silver Color</p>
                <div className="d-flex flex-wrap">
                  <div className="d-flex border-grey-5 py-1 px-2 rounded-3 me-2 mt-2">
                    <img src={gold} alt="gold" width={15} />
                    <small className="text-grey-6 ms-2">Gold Plated</small>
                  </div>
                  <div className="d-flex border-grey-5 py-1 px-2 rounded-3 me-2 mt-2">
                    <img src={gold} alt="gold" width={15} />
                    <small className="text-grey-6 ms-2">Sterling Silver</small>
                  </div>
                </div>
              </React.Fragment>
            )}
            {metal === "platinum" && (
              <React.Fragment>
                <p className="text-lightBlue mt-3 d-block">Platinum Purity</p>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={likeProductRadio}
                  onChange={handleLikeProductRadio}
                  className="features-radio px-0"
                >
                  <FormControlLabel
                    value="800"
                    control={<Radio size="small" />}
                    label="800"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        marginRight: 1,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="850"
                    control={<Radio size="small" />}
                    label="850"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        marginRight: 1,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="950"
                    control={<Radio size="small" />}
                    label="950"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        marginRight: 1,
                      },
                    }}
                  />
                </RadioGroup>
                <p className="text-lightBlue mt-3 d-block">Platinum Color</p>
                <div className="d-flex flex-wrap">
                  <div className="d-flex border-grey-5 py-1 px-2 rounded-3 me-2 mt-2">
                    <img src={silver} alt="gold" width={15} />
                    <small className="text-grey-6 ms-2">Pure White</small>
                  </div>
                </div>
              </React.Fragment>
            )}
            <React.Fragment>
              <p className="text-lightBlue mt-3">Diamond</p>
              <div className="d-flex flex-wrap">
                <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                  <small className="text-grey-6">IJ-SI</small>
                </div>
                <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                  <small className="text-grey-6">IJ-VSSI</small>
                </div>
                <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                  <small className="text-grey-6">GH-VSSI</small>
                </div>
                <div className="d-flex border-grey-5 py-2 px-2 rounded-3 me-2 mt-2">
                  <small className="text-grey-6">EF-VSS</small>
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
      </div>
      <div className="row create-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/collections"
            className="button-red-outline py-2 px-4"
          >
            <p>Discard</p>
          </Link>

          <Link
            to="/parameters/collections"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/collections"
            className="button-lightBlue-outline py-2 px-4"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/parameters/collections"
            className="button-gradient ms-3 py-2 px-4 w-auto"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateVariantSets;
