import React from "react";
import "./AddProduct.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import ProductInfo from "./ProductInfo/ProductInfo";
import MoreFeatures from "./MoreFeatures/MoreFeatures";
import SEO from "./SEO/SEO";
import Shipping from "./Shipping/Shipping";
import Variants from "./Variants/Variants";
import Options from "./Options/Options";
import Attributes from "./Attributes/Attributes";
import AppReactImageGallery from "../../../components/AppReactImageGallery/AppReactImageGallery";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import gold from "../../../assets/images/products/gold.svg";
import silver from "../../../assets/images/products/silver.svg";
import platinum from "../../../assets/images/products/platinum.svg";
// ! MATERIAL IMPORTS
import { Box, FormControl, MenuItem, Select, Tab, Tabs } from "@mui/material";

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

const AddProduct = () => {
  const [value, setValue] = React.useState(0);

  // ? TABS STARTS HERE
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleTabChange = () => {
    // console.log("asdf");
    value < 6 && setValue(value + 1);
  };
  // ? TABS ENDS HERE

  // ? SIZE SELECT STARTS HERE
  const [size, setSize] = React.useState("");
  // const [metal, setMetal] = React.useState("");
  // const [diamond, setDiamond] = React.useState("");

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  // ? SIZE SELECT ENDS HERE

  // const handleMetalChange = (e) => {
  //   // const newData = e.target.value;
  //   // console.log(e.target.value);
  //   if (e.target.value) {
  //     setMetal(e.target.value);
  //     var elems = document
  //       .querySelector(".metal-radio")
  //       .querySelectorAll(".MuiFormControlLabel-root.active");
  //     [].forEach.call(elems, function (el) {
  //       el.classList.remove("active");
  //     });
  //     e.target.closest("label").classList.toggle("active");
  //   }
  // };

  // const handleDiamondChange = (e) => {
  //   if (e.target.value) {
  //     setMetal(e.target.value);
  //     var elems = document
  //       .querySelector(".diamond-radio")
  //       .querySelectorAll(".MuiFormControlLabel-root.active");
  //     [].forEach.call(elems, function (el) {
  //       el.classList.remove("active");
  //     });
  //     e.target.closest("label").classList.toggle("active");
  //   }
  // };

  return (
    <div className="page container-fluid position-relative">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/allProducts">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <h5 className="page-heading ms-2 ps-1">Add Product</h5>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Duplicate</p>
          </button>
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Preview</p>
          </button>
          {/* <button className="button-gradient py-2 px-4">
            <p>+ Add Product</p>
          </button> */}
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
          {/* <Paper
            sx={{ width: "100%", mb: 2, mt: 3, p: 0 }}
            className="border-grey-5"
          > */}
          {/* <div className="row flex-column mt-3 mb-2 border-grey-5 bg-black-15 rounded-3"> */}
          <div className="row flex-column mb-2">
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between tabs-header-box mb-4"
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
                <Tab label="Product Info" className="tabs-head" />
                <Tab label="Attributes" className="tabs-head" />
                <Tab label="Options" className="tabs-head" />
                <Tab label="Variants" className="tabs-head" />
                <Tab label="Shipping" className="tabs-head" />
                <Tab label="SEO" className="tabs-head" />
                <Tab label="More Features" className="tabs-head" />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <ProductInfo />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Attributes />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Options />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Variants />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Shipping />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <SEO />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <MoreFeatures />
            </TabPanel>
          </div>
          {/* </Paper> */}
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
            <div className="d-flex my-4 flex-wrap">
              <h6 className="text-lightBlue">₹ 85,000</h6>
              <small className="ms-2 me-3 text-grey-6 ">
                <s>₹ 100,000</s>
              </small>
              <small className="text-lightBlue">15%&nbsp;OFF</small>
            </div>
            <p className="text-lightBlue mb-2">Size:</p>
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
            {/* <FormControl className="mt-2 custom-radio-buttons metal-radio">
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
                    label={e.name}
                    className={`mb-2 custom-radio${index} radio-buttons`}
                    onChange={(e) => {
                      handleMetalChange(e);
                    }}
                    key={index}
                  />
                ))}
              </RadioGroup>
            </FormControl> */}
            <div className="d-flex align-items-center flex-wrap">
              <div className="d-flex border-grey-5 p-1 mt-2 rounded-3 me-2">
                <img src={gold} alt="gold" width={15} />
                <small className="text-grey-6 ms-2">Gold</small>
              </div>
              <div className="d-flex border-grey-5 p-1 mt-2 rounded-3 me-2">
                <img src={silver} alt="silver" width={15} />
                <small className="text-grey-6 ms-2">Silver</small>
              </div>
              <div className="d-flex border-grey-5 p-1 mt-2 rounded-3 me-2">
                <img src={platinum} alt="platinum" width={15} />
                <small className="text-grey-6 ms-2">Platinum</small>
              </div>
            </div>
            <p className="text-lightBlue mt-3">Diamond</p>
            <div className="d-flex align-items-center flex-wrap">
              <div className="d-flex border-grey-5 p-1 rounded-3 me-2 mt-2">
                <small className="text-grey-6">IJ-SI</small>
              </div>
              <div className="d-flex border-grey-5 p-1 rounded-3 me-2 mt-2">
                <small className="text-grey-6">JK-VSSI</small>
              </div>
              <div className="d-flex border-grey-5 p-1 rounded-3 me-2 mt-2">
                <small className="text-grey-6">GH-VSSI</small>
              </div>
              <div className="d-flex border-grey-5 p-1 rounded-3 me-2 mt-2">
                <small className="text-grey-6">EF-VVS</small>
              </div>
            </div>
            {/* <FormControl className="mt-2 custom-radio-buttons diamond-radio">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label-diamond"
                defaultValue={productDiamond.name}
                name="radio-buttons-group-diamond"
                row
              >
                {productDiamond.map((e, index) => (
                  <FormControlLabel
                    value={e.name}
                    control={<Radio size="small" />}
                    label={e.name}
                    className={`mb-2 custom-radio${index} radio-buttons`}
                    onChange={(e) => {
                      handleDiamondChange(e);
                    }}
                    key={index}
                  />
                ))}
              </RadioGroup>
            </FormControl> */}
          </div>
          {/* 
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h6 className="text-grey-6">Tags </h6>
                <img
                  src={info}
                  alt="info"
                  className="ms-2 c-pointer"
                  width={14}
                />
              </div>
              <small className="text-blue-2 c-pointer" onClick={handleTagsOpen}>
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
                    <h5 className="text-lightBlue">Tags</h5>
                    <img
                      src={cancel}
                      alt="cancel"
                      width={30}
                      onClick={handleTagsClose}
                      className="c-pointer"
                    />
                  </div>
                </DialogTitle>
                <hr className="hr-grey-6 mt-2 mb-0" />
                <DialogContent className="py-2 px-4">
                  <div className="row">
                    <div className="col-md-6 mt-2">
                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon />
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
                        // aria-describedby={idVendor}
                        variant="contained"
                        // onClick={handleVendorClick}
                      >
                        <p>Alphabetical (A-Z)</p>
                        <img src={arrowDown} alt="arrowDown" className="ms-2" />
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
                        <div className="d-flex mb-2">
                          <small className="text-grey-6">Enter Tag Name</small>
                          <img
                            src={info}
                            alt="info"
                            className="ms-2 c-pointer"
                            width={14}
                          />
                        </div>
                        <FormControl
                        // className="col-7 px-0"
                        >
                          <OutlinedInput
                            placeholder="Enter Tag Name"
                            size="small"
                          />
                        </FormControl>
                      </Popover>
                    </div>
                  </div>
                  <p className="text-lightBlue mt-3 mb-2">
                    458 Tags are listed below
                  </p>

                  <FormGroup className="tags-checkbox">
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="Tags 1"
                      className="me-0"
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="Tags 2"
                      className="me-0"
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="Tags 3"
                      className="me-0"
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="Tags 4"
                      className="me-0"
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="Tags 5"
                      className="me-0"
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="Tags 6"
                      className="me-0"
                    />
                  </FormGroup>
                </DialogContent>
                <hr className="hr-grey-6 mt-2 mb-1" />
                <DialogActions className="d-flex justify-content-between px-4 pb-2">
                  <button
                    className="button-grey py-2 px-5"
                    onClick={handleTagsClose}
                  >
                    <p>Cancel</p>
                  </button>
                  <button
                    className="button-gradient py-2 px-5"
                    onClick={handleTagsClose}
                  >
                    <p>Continue</p>
                  </button>
                </DialogActions>
              </Dialog>
            </div>

          </div> */}
        </div>
      </div>
      <div className="row bottom-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <button className="button-red-outline py-2 px-4">
            <p>Discard</p>
          </button>
          <button className="button-lightBlue-outline py-2 px-4 ms-3">
            <p>Save as Draft</p>
          </button>
        </div>
        <button
          className="button-gradient py-2 px-4 w-auto"
          onClick={handleTabChange}
        >
          <p>{value === 6 ? "Save" : "Continue"}</p>
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
