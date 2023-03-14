import React from "react";
import "./CreateOrder.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import TagsBox from "../../../components/TagsBox/TagsBox";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import TabPanel from "../../../components/TabPanel/TabPanel";
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import AppStateSelect from "../../../components/AppStateSelect/AppStateSelect";
import SearchBorder from "../../../components/SearchBorder/SearchBorder";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import currencyRupee from "../../../assets/icons/currencyRupee.svg";
import currencyDollar from "../../../assets/icons/currencyDollar.svg";
import currencyPound from "../../../assets/icons/currencyPound.svg";
import addMarkets from "../../../assets/icons/addMarkets.svg";
import userIcon from "../../../assets/icons/userIcon.svg";
import productIcon from "../../../assets/icons/productIcon.svg";
import cardIcon from "../../../assets/icons/cardIcon.svg";
import cancel from "../../../assets/icons/cancel.svg";
import locationGradient from "../../../assets/icons/locationGradient.svg";
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import product2 from "../../../assets/images/products/product2.jpg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Popover,
  Tooltip,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
  TextareaAutosize,
  DialogTitle,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OrderProductCard from "../OrderProductCard";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const CreateOrder = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? GENDER SELECT STARTS HERE
  const [gender, setGender] = React.useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  // ? GENDER SELECT ENDS HERE

  // ? USER GROUP SELECT STARTS HERE
  const [userGroup, setUserGroup] = React.useState("");

  const handleUserGroupChange = (event) => {
    setUserGroup(event.target.value);
  };
  // ? USER GROUP SELECT ENDS HERE

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

  // ? FIELD SETS DIALOG STARTS HERE
  const [openNewUser, setOpenNewUser] = React.useState(false);

  const handleNewUser = () => {
    setOpenNewUser(true);
  };

  const handleNewUserClose = () => {
    setOpenNewUser(false);
  };
  // ? FIELD SETS DIALOG ENDS HERE

  // ? ADD DISCOUNT DIALOG STARTS HERE
  const [openDiscount, setOpenDiscount] = React.useState(false);

  const handleDiscount = () => {
    setOpenDiscount(true);
  };

  const handleDiscountClose = () => {
    setOpenDiscount(false);
  };
  // ? ADD DISCOUNT DIALOG ENDS HERE

  // ? SHIIPPING DIALOG STARTS HERE
  const [openShipping, setOpenShipping] = React.useState(false);

  const handleShipping = () => {
    setOpenShipping(true);
  };

  const handleShippingClose = () => {
    setOpenShipping(false);
  };
  // ? SHIPPING DIALOG ENDS HERE

  // ? CHARGES DIALOG STARTS HERE
  const [openCharges, setOpenCharges] = React.useState(false);

  const handleCharges = () => {
    setOpenCharges(true);
  };

  const handleChargesClose = () => {
    setOpenCharges(false);
  };
  // ? CHARGES DIALOG ENDS HERE

  // ? CHECKBOX STARTS HERE
  const [checkedGiftWrap, setCheckedGiftWrap] = React.useState(false);

  const handleGiftWrapChange = (event) => {
    setCheckedGiftWrap(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

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

  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/orders/allOrders" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <div className="d-flex align-items-center ms-2">
            {/* <img
              src={rolesSuperAdmin}
              alt="role"
              className="me-2 ms-2"
              height={40}
              width={40}
            /> */}
            <div>
              <h5 className="text-lightBlue fw-500">Create Order</h5>
              {/* <small className="mt-2 text-grey-6">
                Create on 23/09/21 at 09:23am
              </small> */}
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
          <div
            className="d-flex button-transparent px-2 py-2 c-pointer border-grey-5 rounded-3 hover-back"
            aria-describedby={idMetalFilter}
            variant="contained"
            onClick={handleMetalFilter}
          >
            <div className="d-flex align-items-center">
              <img
                src={currencyRupee}
                alt="currencyRupee"
                width={18}
                className="me-2"
              />
              <small className="text-lightBlue d-block">
                Indian Rupees
                <KeyboardArrowDownIcon
                  sx={{
                    fontSize: 14,
                    marginLeft: 1,
                  }}
                />
              </small>
            </div>
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
            <div className="py-2 px-1">
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <img
                  src={currencyRupee}
                  alt="currencyRupee"
                  width={18}
                  className="me-2"
                />
                <small className="text-lightBlue d-block">
                  Indian Currency
                </small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <img
                  src={currencyDollar}
                  alt="currencyDollar"
                  width={18}
                  className="me-2"
                />
                <small className="text-lightBlue d-block">USA Currency</small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <img
                  src={currencyPound}
                  alt="currencyPound"
                  width={18}
                  className="me-2"
                />
                <small className="text-lightBlue d-block">UK Currency</small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <img
                  src={addMarkets}
                  alt="addMarkets"
                  width={18}
                  className="me-2"
                />
                <small className="text-lightBlue d-block">Add Markets</small>
              </div>
            </div>
          </Popover>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9 mt-4">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="col-12 px-0">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={userIcon} alt="userIcon" width={16} />
                  <h6 className="text-lightBlue fw-500 ms-2">Select User</h6>
                </div>
                <small
                  className="text-blue-2 c-pointer"
                  onClick={handleNewUser}
                >
                  + Add New
                </small>
              </div>

              <Dialog
                open={openNewUser}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleNewUserClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="md"
                fullWidth={true}
              >
                <DialogTitle>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column ">
                      <h5 className="text-lightBlue fw-500">Create New User</h5>

                      <small className="text-grey-6 mt-1 d-block">
                        ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.
                      </small>
                    </div>
                    <img
                      src={cancel}
                      alt="cancel"
                      width={30}
                      onClick={handleNewUserClose}
                      className="c-pointer"
                    />
                  </div>

                  <Box
                    sx={{ width: "100%" }}
                    className="d-flex justify-content-between tabs-header-box mt-3"
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
                      <Tab label="Basic Info" className="tabs-head" />
                      <Tab label="Shipping Address" className="tabs-head" />
                      <Tab label="Billing Address" className="tabs-head" />
                    </Tabs>
                  </Box>
                </DialogTitle>
                <DialogContent className="pb-4 px-4">
                  <TabPanel
                    value={value}
                    index={0}
                    className="px-0 nav-tab-panel"
                  >
                    <div className="col-12 px-0">
                      <div className="row align-items-start">
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">First Name</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter First Name"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">Last Name</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Last Name"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">Gender</p>
                          <FormControl
                            sx={{ m: 0, minWidth: 120, width: "100%" }}
                            size="small"
                          >
                            <Select
                              labelId="demo-select-small"
                              id="demo-select-small"
                              value={gender}
                              onChange={handleGenderChange}
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
                                Male
                              </MenuItem>
                              <MenuItem
                                value={20}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Female
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">User Group</p>
                          <FormControl
                            sx={{ m: 0, minWidth: 120, width: "100%" }}
                            size="small"
                          >
                            <Select
                              labelId="demo-select-small"
                              id="demo-select-small"
                              value={userGroup}
                              onChange={handleUserGroupChange}
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
                                Group 1
                              </MenuItem>
                              <MenuItem
                                value={20}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Group 2
                              </MenuItem>
                              <MenuItem
                                value={20}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Group 3
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-12 mt-3">
                          <p className="text-lightBlue mb-1">Email ID</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Email ID"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-12">
                          <FormControlLabel
                            control={
                              <Checkbox
                                inputProps={{ "aria-label": "controlled" }}
                                size="small"
                                style={{
                                  color: "#5C6D8E",
                                }}
                              />
                            }
                            label="User agreed to receive marketing emails."
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: 13,
                                color: "#5c6d8e",
                              },
                            }}
                          />
                        </div>

                        <div className="col-md-12 mt-3">
                          <p className="text-lightBlue mb-1">Mobile Number</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Mobile Number"
                              size="small"
                              sx={{ paddingLeft: 0 }}
                              startAdornment={
                                <InputAdornment position="start">
                                  <AppMobileCodeSelect />
                                  {/* &nbsp;&nbsp;&nbsp;&nbsp;| */}
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-12">
                          <FormControlLabel
                            control={
                              <Checkbox
                                inputProps={{ "aria-label": "controlled" }}
                                size="small"
                                style={{
                                  color: "#5C6D8E",
                                }}
                              />
                            }
                            label="User agreed to receive SMS marketing text messages."
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: 13,
                                color: "#5c6d8e",
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel
                    value={value}
                    index={1}
                    className="px-0 nav-tab-panel"
                  >
                    <div className="col-12 px-0">
                      <div className="row ">
                        {/* <div className="col-md-12">
                          <p className="text-lightBlue mb-1">Name</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Office Address, Home Address"
                              size="small"
                            />
                          </FormControl>
                          <small className="text-grey-6">
                            Name this address Ex. Office Address, Home Address
                          </small>
                        </div> */}

                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">First Name</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter First Name"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">Last Name</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Last Name"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-12 mt-3">
                          <p className="text-lightBlue mb-1">Company Name</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Company Name"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-12 mt-3">
                          <p className="text-lightBlue mb-1">Mobile Number</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Mobile Number"
                              size="small"
                              sx={{ paddingLeft: 0 }}
                              startAdornment={
                                <InputAdornment position="start">
                                  <AppMobileCodeSelect />
                                  {/* &nbsp;&nbsp;&nbsp;&nbsp;| */}
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-12 mt-3 add-user-country">
                          <p className="text-lightBlue mb-1">Country</p>
                          <AppCountrySelect />
                        </div>

                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">Address Line 1</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Address Line 1"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">Address Line 2</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Address Line 2"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">Town / City</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Town / City"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">
                            Zipcode / Postalcode
                          </p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Zipcode / Postalcode"
                              size="small"
                            />
                          </FormControl>
                        </div>

                        <div className="col-md-12 mt-3  add-user-country">
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="text-lightBlue mb-1">
                              State or Region
                            </p>
                            <small className="text-grey-6 mb-1">
                              (Optional)
                            </small>
                          </div>
                          <AppStateSelect />
                        </div>
                        <div className="col-12 mt-3">
                          <FormControlLabel
                            control={
                              <Checkbox
                                inputProps={{ "aria-label": "controlled" }}
                                size="small"
                                style={{
                                  color: "#5C6D8E",
                                }}
                              />
                            }
                            label="Same as Billing Address"
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: 13,
                                color: "#c8d8ff",
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel
                    value={value}
                    index={2}
                    className="px-0 nav-tab-panel"
                  >
                    <div className="col-12 px-0">
                      <div className="row ">
                        <div className="col-12">
                          <FormControlLabel
                            control={
                              <Checkbox
                                inputProps={{ "aria-label": "controlled" }}
                                size="small"
                                style={{
                                  color: "#5C6D8E",
                                }}
                              />
                            }
                            label="Same as Shipping Address"
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: 13,
                                color: "#c8d8ff",
                              },
                            }}
                          />
                        </div>

                        {/* <div className="col-md-12">
                          <p className="text-lightBlue mb-1">Name</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Office Address, Home Address"
                              size="small"
                            />
                          </FormControl>
                          <small className="text-grey-6">
                            Name this address Ex. Office Address, Home Address
                          </small>
                        </div> */}

                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">First Name</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter First Name"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">Last Name</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Last Name"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-12 mt-3">
                          <p className="text-lightBlue mb-1">Company Name</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Company Name"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-12 mt-3">
                          <p className="text-lightBlue mb-1">Mobile Number</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Mobile Number"
                              size="small"
                              sx={{ paddingLeft: 0 }}
                              startAdornment={
                                <InputAdornment position="start">
                                  <AppMobileCodeSelect />
                                  {/* &nbsp;&nbsp;&nbsp;&nbsp;| */}
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-12 mt-3 add-user-country">
                          <p className="text-lightBlue mb-1">Country</p>
                          <AppCountrySelect />
                        </div>

                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">Address Line 1</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Address Line 1"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">Address Line 2</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Address Line 2"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">Town / City</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Town / City"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">
                            Zipcode / Postalcode
                          </p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Zipcode / Postalcode"
                              size="small"
                            />
                          </FormControl>
                        </div>

                        <div className="col-md-12 mt-3  add-user-country">
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="text-lightBlue mb-1">
                              State or Region
                            </p>
                            <small className="text-grey-6 mb-1">
                              (Optional)
                            </small>
                          </div>
                          <AppStateSelect />
                        </div>

                        <div className="col-md-12 mt-3  add-user-country">
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="text-lightBlue mb-1">GSTIN</p>
                            <small className="text-grey-6 mb-1">
                              (Optional)
                            </small>
                          </div>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter GSTIN"
                              size="small"
                            />
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </DialogContent>
                <hr className="hr-grey-6 my-0" />
                <DialogActions className="d-flex justify-content-between px-4 py-3">
                  <button
                    className="button-grey py-2 px-5"
                    onClick={handleNewUserClose}
                  >
                    <p className="text-lightBlue">Cancel</p>
                  </button>
                  <button
                    className="button-gradient py-2 px-5"
                    onClick={handleNewUserClose}
                  >
                    <p>Create</p>
                  </button>
                </DialogActions>
              </Dialog>

              <div className="d-flex justify-content-center">
                <hr className="hr-grey-6 w-100 my-3" />
              </div>
              <div className="col-12">
                <SearchBorder />
              </div>
              <div className="col-12 mt-3">
                <div className="row">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-6">
                        <div className="d-flex align-items-center mt-1">
                          <h6 className="fw-500 text-blue-2 text-decoration-underline me-3">
                            Saniya Shaikh
                          </h6>

                          <img src={indiaFlag} alt="indiaFlag" height={15} />
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <small className="text-lightBlue me-2">
                            saniya@mydesignar.com
                          </small>

                          <Tooltip title="Hide" placement="top">
                            <VisibilityOutlinedIcon
                              sx={{
                                color: "#c8d8ff",
                                fontSize: 14,
                                cursor: "pointer",
                                marginRight: "8px",
                              }}
                            />
                          </Tooltip>

                          <Tooltip title="Copy" placement="top">
                            <ContentCopyIcon
                              sx={{
                                fontSize: 12,
                                color: "#c8d8ff",
                              }}
                              className="c-pointer"
                            />
                          </Tooltip>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <small className="text-lightBlue me-2">
                            +91-9876543210
                          </small>
                          <Tooltip title="Hide" placement="top">
                            <VisibilityOutlinedIcon
                              sx={{
                                color: "#c8d8ff",
                                fontSize: 14,
                                cursor: "pointer",
                                marginRight: "8px",
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Copy" placement="top">
                            <ContentCopyIcon
                              sx={{
                                fontSize: 12,
                                color: "#c8d8ff",
                              }}
                              className="c-pointer"
                            />
                          </Tooltip>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex justify-content-between mb-3">
                          <small className="text-grey-6 me-2">
                            Shipping Address
                          </small>
                          <small className="text-blue-2 c-pointer">Edit</small>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <small className="text-lightBlue me-3">
                            The Boardroom Co-Working Space - Andheri Near DN
                            Nagar Metro Station, Mumbai - 4000039, India
                          </small>
                          <Tooltip title="Copy" placement="top">
                            <ContentCopyIcon
                              sx={{
                                fontSize: 12,
                                color: "#c8d8ff",
                              }}
                              className="c-pointer"
                            />
                          </Tooltip>
                        </div>
                        <div className="d-flex mt-3">
                          <img
                            src={locationGradient}
                            alt="locationGradient"
                            width={14}
                            className="me-2"
                          />
                          <small className="text-blue-gradient c-pointer">
                            Get Direction
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 ps-4">
                    <div className="d-flex justify-content-between mb-3">
                      <small className="text-grey-6 me-2">
                        Billing Address
                      </small>
                      <small className="text-blue-2 c-pointer">Edit</small>
                    </div>
                    <small className="text-lightBlue me-3 d-block">
                      Sahil Bhutani
                    </small>
                    <div className="d-flex align-items-center justify-content-between">
                      <small className="text-lightBlue me-3">
                        The Boardroom Co-Working Space - Andheri Near DN Nagar
                        Metro Station, Mumbai - 4000039, India
                      </small>

                      <Tooltip title="Copy" placement="top">
                        <ContentCopyIcon
                          sx={{
                            fontSize: 12,
                            color: "#c8d8ff",
                          }}
                          className="c-pointer"
                        />
                      </Tooltip>
                    </div>
                    <div className="d-flex mt-3">
                      <small className="text-grey-6 me-3 d-block me-3">
                        GSTIN:&nbsp;
                        <span className="text-lightBlue">AB1234567890ADS</span>
                      </small>

                      <Tooltip title="Copy" placement="top">
                        <ContentCopyIcon
                          sx={{
                            fontSize: 12,
                            color: "#c8d8ff",
                          }}
                          className="c-pointer"
                        />
                      </Tooltip>
                    </div>
                    <div className="d-flex mt-2">
                      <small className="text-grey-6 me-3 d-block me-3">
                        Email ID:&nbsp;
                        <span className="text-lightBlue">
                          saniya@mydesignar.com
                        </span>
                      </small>
                      <Tooltip title="Copy" placement="top">
                        <ContentCopyIcon
                          sx={{
                            fontSize: 12,
                            color: "#c8d8ff",
                          }}
                          className="c-pointer"
                        />
                      </Tooltip>
                    </div>
                    <div className="d-flex mt-2">
                      <small className="text-grey-6 me-3">
                        Mobile No:&nbsp;
                        <span className="text-lightBlue">+91-9876543210</span>
                      </small>

                      <Tooltip title="Copy" placement="top">
                        <ContentCopyIcon
                          sx={{
                            fontSize: 12,
                            color: "#c8d8ff",
                          }}
                          className="c-pointer"
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="col-12 px-0">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={productIcon} alt="userIcon" width={16} />
                  <h6 className="text-lightBlue fw-500 ms-2">
                    Select Products
                  </h6>
                </div>
                {/* <small
                  className="text-blue-2 c-pointer"
                  onClick={toggleAddProductDrawer("right", true)}
                >
                  Custom Product
                </small> */}
              </div>

              {/* <SwipeableDrawer
                anchor="right"
                open={addProductDrawer["right"]}
                onClose={toggleAddProductDrawer("right", false)}
                onOpen={toggleAddProductDrawer("right", true)}
                className="order-custom-product-drawer"
              >
                <div className="d-flex align-items-center pt-3 px-3">
                  <KeyboardArrowLeftOutlinedIcon
                    sx={{ fontSize: 25, color: "#c8d8ff" }}
                    onClick={toggleAddProductDrawer("right", false)}
                    className="c-pointer"
                  />
                  <div>
                    <div className="d-flex align-items-center">
                      <h5 className="text-lightBlue fw-500 ms-2">
                        Add Custom Product
                      </h5>
                      <Tooltip title="Lorem ipsum" placement="top">
                        <img
                          src={info}
                          alt="info"
                          className="ms-2 c-pointer"
                          width={13.5}
                        />
                      </Tooltip>
                    </div>
                    <small className="text-grey-6 mt-1 d-block">
                      ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </small>
                  </div>
                </div>
                <div className="px-3">
                  <hr className="hr-grey-6 mt-3 mb-3" />
                </div>
                <div className="px-3">
                  <div className="row">
                    <div className="col-12">
                      <SearchBorder />
                    </div>

                    <div className="col-12 mt-3">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue">Product Title</p>
                        <Tooltip title="Lorem ipsum" placement="top">
                          <img
                            src={info}
                            alt="info"
                            className="c-pointer ms-2"
                            width={13.5}
                          />
                        </Tooltip>
                      </div>
                      <FormControl className="w-100 px-0">
                        <OutlinedInput placeholder="Enter Title" size="small" />
                      </FormControl>
                    </div>
                    <div className="col-md-6 mt-3">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue">Category</p>
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
                          value=""
                          placeholder="Fixed"
                          // onChange={handleMetalChange}
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value={10}>Category 1</MenuItem>
                          <MenuItem value={20}>Category 2</MenuItem>
                          <MenuItem value={30}>Category 3</MenuItem>
                          <MenuItem value={40}>Category 4r</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-md-6 mt-3">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue">Vendor Name</p>
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
                          value=""
                          placeholder="Fixed"
                          // onChange={handleMetalChange}
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value={10}>Vendor 1</MenuItem>
                          <MenuItem value={20}>Vendor 2</MenuItem>
                          <MenuItem value={30}>Vendor 3</MenuItem>
                          <MenuItem value={40}>Vendor 4</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    <div className="col-12 mt-3">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue">
                          Enter Weight and Dimensions
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
                    </div>
                    <div className="d-flex my-3 align-items-center shipping shipping-inputs col-12">
                      <FormControl className="me-5">
                        <OutlinedInput
                          placeholder="Enter Weight"
                          size="small"
                          endAdornment={
                            <InputAdornment position="end">kg</InputAdornment>
                          }
                        />
                      </FormControl>
                      <FormControl className="">
                        <OutlinedInput
                          placeholder="Enter Length"
                          size="small"
                          endAdornment={
                            <InputAdornment position="end">cm</InputAdornment>
                          }
                        />
                      </FormControl>
                      <p className="text-lightBlue mx-2">x</p>
                      <FormControl className="">
                        <OutlinedInput
                          placeholder="Enter Height"
                          size="small"
                          endAdornment={
                            <InputAdornment position="end">cm</InputAdornment>
                          }
                        />
                      </FormControl>
                      <p className="text-lightBlue mx-2">x</p>
                      <FormControl className="">
                        <OutlinedInput
                          placeholder="Enter Width"
                          size="small"
                          endAdornment={
                            <InputAdornment position="end">cm</InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column py-3 px-4 order-custom-product-drawer-buttons">
                  <hr className="hr-grey-6 my-3 w-100" />
                  <div className="d-flex justify-content-between">
                    <button
                      className="button-gradient py-2 px-5 w-auto"
                      onClick={toggleAddProductDrawer("right", false)}
                    >
                      <p>Save</p>
                    </button>
                    <button
                      className="button-lightBlue-outline py-2 px-4"
                      onClick={toggleAddProductDrawer("right", false)}
                    >
                      <p>Cancel</p>
                    </button>
                  </div>
                </div>
              </SwipeableDrawer> */}

              <div className="d-flex justify-content-center">
                <hr className="hr-grey-6 w-100 my-3" />
              </div>
              <div className="col-12">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue">Select Product</p>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className="c-pointer ms-2"
                      width={13.5}
                    />
                  </Tooltip>
                </div>
                <SearchBorder />
              </div>
            </div>

            <OrderProductCard
              showCartButton={true}
              showEditButton={false}
              showBasicDetail={false}
              showItemAvailable={false}
              showActionButton={false}
              showFulfillButton={false}
              showQCButton={true}
            />
            <div className="col-12 px-0 d-flex justify-content-center">
              <hr className="hr-grey-6 w-100 my-3" />
            </div>
            <div className="col-12 mt-2 px-0">
              <div className="d-flex  mb-1">
                <p className="text-lightBlue">Add Note to Customer:</p>
                {/* <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="c-pointer ms-2"
                    width={13.5}
                  />
                </Tooltip> */}
              </div>
              <TextareaAutosize
                aria-label="meta description"
                placeholder="Type Something"
                style={{
                  background: "#15142A",
                  color: "#c8d8ff",
                  borderRadius: 5,
                }}
                minRows={3}
                className="col-12"
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedGiftWrap}
                  onChange={handleGiftWrapChange}
                  inputProps={{ "aria-label": "controlled" }}
                  size="small"
                  style={{
                    color: "#5C6D8E",
                    marginRight: 0,
                    width: "auto",
                  }}
                />
              }
              label="Want Gift Wrapping?"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "0.75rem",
                  color: "#c8d8ff",
                  // color: "#5c6d8e",
                },
              }}
              className=" px-0"
            />
            {checkedGiftWrap && (
              <div className="col-12 px-0">
                <SearchBorder />
                <div className="row mx-0">
                  <div className="d-flex py-3 px-3 bg-black-21 w-auto rounded-8 mt-3">
                    <img
                      src={product2}
                      alt="product2"
                      className="rounded-8"
                      width={80}
                    />
                    <div className="d-flex flex-column justify-content-between ms-3">
                      <div>
                        <p className="fw-500 text-lightBlue">
                          JWL Exclusive Packaging
                        </p>
                        <small className="text-grey-6 mt-2">#GIFTWRAPPER</small>
                      </div>
                      <small className="text-blue-2 text-decoration-underline c-pointer">
                        View Image
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="col-12 px-0">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={cardIcon} alt="userIcon" width={16} />
                  <h6 className="text-lightBlue fw-500 ms-2">Payment</h6>
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center px-0">
              <hr className="hr-grey-6 w-100 my-3" />
            </div>
            <div className="col-12 px-0">
              <div className="row">
                <div className="col-4">
                  <small className="text-lightBlue">Subtotal</small>
                </div>
                <div className="col-4 text-center">
                  <p className="text-lightBlue">
                    1&nbsp;x&nbsp;<span className="fw-500">46,350</span>
                  </p>
                </div>
                <div className="col-4 text-end">
                  <p className="text-lightBlue">₹&nbsp;46,350</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <small
                    className="text-blue-2 text-decoration-underline c-pointer"
                    onClick={handleDiscount}
                  >
                    Add Discount
                  </small>

                  <Dialog
                    open={openDiscount}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleDiscountClose}
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth="sm"
                    fullWidth={true}
                  >
                    <DialogTitle>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column ">
                          <h5 className="text-lightBlue fw-500">
                            Add Discount
                          </h5>

                          <small className="text-grey-6 mt-1 d-block">
                            ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </small>
                        </div>
                        <img
                          src={cancel}
                          alt="cancel"
                          width={30}
                          onClick={handleDiscountClose}
                          className="c-pointer"
                        />
                      </div>
                    </DialogTitle>
                    <hr className="hr-grey-6 my-0" />
                    <DialogContent className="pb-4 px-4">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue">Select Product</p>
                      </div>
                      <SearchBorder />
                      <div className="d-flex mb-1 mt-3">
                        <p className="text-lightBlue">Discount Value</p>
                      </div>
                      <div className="row">
                        <div className="col-md-7 discount-inputs-two d-flex align-items-center">
                          <FormControl className="px-0">
                            <OutlinedInput
                              placeholder="Enter Discount"
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
                            <p className="text-lightBlue">on</p>
                          </div>
                        </div>
                        <div className="col-md-5">
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
                                Value 1
                              </MenuItem>
                              <MenuItem
                                value={20}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Value 2
                              </MenuItem>
                              <MenuItem
                                value={30}
                                sx={{ fontSize: 13, color: "#5c6d8e" }}
                              >
                                Value 3
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div className="d-flex mb-1 mt-3">
                        <p className="text-lightBlue">Add Reason</p>
                        <p className="text-grey-6">(Optional)</p>
                      </div>
                      <FormControl className="w-100 px-0">
                        <OutlinedInput
                          placeholder="Type Something"
                          size="small"
                        />
                      </FormControl>
                      <small className="text-grey-6">
                        Customer can see this reason
                      </small>
                    </DialogContent>
                    <hr className="hr-grey-6 my-0" />
                    <DialogActions className="d-flex justify-content-between px-4 py-3">
                      <button
                        className="button-grey py-2 px-5"
                        onClick={handleDiscountClose}
                      >
                        <p className="text-lightBlue">Cancel</p>
                      </button>
                      <button
                        className="button-gradient py-2 px-5"
                        onClick={handleDiscountClose}
                      >
                        <p>Add Discount</p>
                      </button>
                    </DialogActions>
                  </Dialog>
                </div>
                <div className="col-4 text-center">
                  <p className="text-lightBlue">-</p>
                </div>
                <div className="col-4 text-end">
                  <p className="text-lightBlue">₹&nbsp;0.00</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <small
                    className="text-blue-2 text-decoration-underline c-pointer"
                    onClick={handleShipping}
                  >
                    Add Shipping
                  </small>

                  <Dialog
                    open={openShipping}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleShippingClose}
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth="sm"
                    fullWidth={true}
                  >
                    <DialogTitle>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column ">
                          <h5 className="text-lightBlue fw-500">
                            Add Shipping
                          </h5>

                          <small className="text-grey-6 mt-1 d-block">
                            ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </small>
                        </div>
                        <img
                          src={cancel}
                          alt="cancel"
                          width={30}
                          onClick={handleShippingClose}
                          className="c-pointer"
                        />
                      </div>
                    </DialogTitle>
                    <hr className="hr-grey-6 my-0" />
                    <DialogContent className="pb-4 px-4 discount-inputs-two">
                      <div className="d-flex mb-1">
                        <p className="text-lightBlue">
                          Enter Custom Shipping Value
                        </p>
                      </div>
                      <FormControl className="px-0 col-12">
                        <OutlinedInput
                          placeholder="Enter Discount"
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
                      <small className="text-grey-6">
                        Enter "0" for Free Shipping
                      </small>

                      <div className="d-flex mb-1 mt-3">
                        <p className="text-lightBlue">Rate Name</p>
                      </div>
                      <FormControl className="w-100 px-0">
                        <OutlinedInput
                          placeholder="Type Something"
                          size="small"
                        />
                      </FormControl>
                      <small className="text-grey-6">
                        Customer can see this reason
                      </small>
                    </DialogContent>
                    <hr className="hr-grey-6 my-0" />
                    <DialogActions className="d-flex justify-content-between px-4 py-3">
                      <button
                        className="button-grey py-2 px-5"
                        onClick={handleShippingClose}
                      >
                        <p className="text-lightBlue">Cancel</p>
                      </button>
                      <button
                        className="button-gradient py-2 px-5"
                        onClick={handleShippingClose}
                      >
                        <p>Add Shipping</p>
                      </button>
                    </DialogActions>
                  </Dialog>
                </div>
                <div className="col-4 text-center">
                  <p className="text-lightBlue">-</p>
                </div>
                <div className="col-4 text-end">
                  <p className="text-lightBlue">₹&nbsp;0.00</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <small className="text-lightBlue">
                    Tax&nbsp;
                    <span className="text-blue-2 c-pointer">(Remove Tax)</span>
                  </small>
                </div>
                <div className="col-4 text-center">
                  <p className="text-lightBlue">Included</p>
                </div>
                <div className="col-4 text-end">
                  <p className="text-lightBlue">₹&nbsp;0.00</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <small className="text-lightBlue me-2">
                      Labour Charges
                    </small>
                    <Tooltip title="Edit" placement="top">
                      <EditOutlinedIcon
                        sx={{
                          color: "#6e8dd7",
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className="col-4 text-center">
                  <p className="text-lightBlue">Extra Labour Charges</p>
                </div>
                <div className="col-4 text-end">
                  <p className="text-lightBlue">₹&nbsp;2,300</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <small
                    className="text-blue-2 c-pointer text-decoration-underline"
                    onClick={handleCharges}
                  >
                    Add other charges
                  </small>

                  <Dialog
                    open={openCharges}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleChargesClose}
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth="sm"
                    fullWidth={true}
                  >
                    <DialogTitle>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column ">
                          <h5 className="text-lightBlue fw-500">
                            Add Other Charges
                          </h5>

                          <small className="text-grey-6 mt-1 d-block">
                            ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </small>
                        </div>
                        <img
                          src={cancel}
                          alt="cancel"
                          width={30}
                          onClick={handleChargesClose}
                          className="c-pointer"
                        />
                      </div>
                    </DialogTitle>
                    <hr className="hr-grey-6 my-0" />
                    <DialogContent className="pb-4 px-4 discount-inputs-two">
                      <div className="row">
                        <div className="col-6">
                          <div className="d-flex mb-1">
                            <p className="text-lightBlue">Enter Name</p>
                          </div>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Labour Charges"
                              size="small"
                            />
                          </FormControl>
                          <small className="text-grey-6">
                            Customer can see this name
                          </small>
                        </div>
                        <div className="col-6">
                          <div className="d-flex mb-1">
                            <p className="text-lightBlue">Enter Amount</p>
                          </div>
                          <FormControl className="px-0 w-100">
                            <OutlinedInput
                              placeholder="Enter Amount"
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
                        </div>
                      </div>

                      <div className="d-flex mb-1 mt-3">
                        <p className="text-lightBlue">Add Reason</p>
                      </div>
                      <FormControl className="w-100 px-0">
                        <OutlinedInput
                          placeholder="Type Something"
                          size="small"
                        />
                      </FormControl>
                      <small className="text-grey-6">
                        Customer can see this reason
                      </small>
                    </DialogContent>
                    <hr className="hr-grey-6 my-0" />
                    <DialogActions className="d-flex justify-content-between px-4 py-3">
                      <button
                        className="button-grey py-2 px-5"
                        onClick={handleChargesClose}
                      >
                        <p className="text-lightBlue">Cancel</p>
                      </button>
                      <button
                        className="button-gradient py-2 px-5"
                        onClick={handleChargesClose}
                      >
                        <p>Add Extra Amount</p>
                      </button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center px-0">
              <hr className="hr-grey-6 w-100 my-3" />
            </div>
            <div className="col-12 px-0">
              <div className="d-flex justify-content-between">
                <h6 className="fw-500 text-lightBlue">Total</h6>
                <h6 className="fw-500 text-lightBlue">₹&nbsp;46,350</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 pe-0 ps-0 ps-lg-3">
          <TagsBox />
        </div>
      </div>
      <div className="row create-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link to="/orders/allOrders" className="button-red-outline py-2 px-4">
            <p>Discard</p>
          </Link>

          <Link
            to="/orders/allOrders"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          {/* <Link
            to="/orders/allOrders"
            className="button-lightBlue-outline py-2 px-4"
          >
            <p>Save & Add Another</p>
          </Link> */}
          <Link
            to="/orders/orderDetails"
            className="button-gradient ms-3 py-2 px-4 w-auto"
          >
            <p>Create Order</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
