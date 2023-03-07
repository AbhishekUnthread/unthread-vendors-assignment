import React from "react";
import "./CreateOrder.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppTextEditor from "../../../components/AppTextEditor/AppTextEditor";
import TagsBox from "../../../components/TagsBox/TagsBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import TableSearch from "../../../components/TableSearch/TableSearch";
import UploadFileRounded from "../../../components/UploadFileRounded/UploadFileRounded";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import TabPanel from "../../../components/TabPanel/TabPanel";
import StatusBox from "../../../components/StatusBox/StatusBox";
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import AppStateSelect from "../../../components/AppStateSelect/AppStateSelect";
// ! IMAGES IMPORTS
import rolesSuperAdmin from "../../../assets/images/teams/rolesSuperAdmin.svg";
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import userRoles from "../../../assets/icons/userRoles.svg";
import uploadProfile from "../../../assets/icons/uploadProfile.svg";
import user from "../../../assets/images/users/user.svg";
import block from "../../../assets/images/users/block.svg";
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
// ! MATERIAL IMPORTS
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  styled,
  Popover,
  SwipeableDrawer,
  FormGroup,
  Tooltip,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
  TextareaAutosize,
  TextField,
  Autocomplete,
  DialogTitle,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// ! MATERIAL ICONS IMPORTS
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

// ? PERMISSIONS ACCORDIAN STARTS HERE
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
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
      <ArrowForwardIosSharpIcon
        sx={{
          fontSize: "0.9rem",
          color: "#c8d8ff",
        }}
      />
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
  padding: "0 16px 16px 28px",
}));

const permissionAccordionData = [
  {
    id: 1,
    name: "Dashboard",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 2,
    name: "Orders",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 3,
    name: "Products",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 4,
    name: "Parameters",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 5,
    name: "Users",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 6,
    name: "Analytics",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 7,
    name: "Functionality",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 8,
    name: "Offers",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 9,
    name: "Emailers",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 10,
    name: "Teams",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
  {
    id: 11,
    name: "Website",
    accDetails: [
      { id: 101, name: "Content 1" },
      { id: 102, name: "Content 2" },
      { id: 103, name: "Content 3" },
    ],
  },
];
// ? PERMISSIONS ACCORDIAN ENDS HERE

const groupData = [
  { title: "No Group", value: "content1" },
  { title: "VIP", value: "content2" },
  { title: "VVIP", value: "content3" },
  { title: "Wholesaler", value: "content4" },
  { title: "Highest Orders", value: "content5" },
  { title: "Loyal Users", value: "content6" },
  { title: "New Users", value: "content7" },
  { title: "Default Users", value: "content8" },
  { title: "Guest Users", value: "content9" },
];

const CreateOrder = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? ADD MEMBER DRAWER STARTS HERE

  const [addProductDrawer, setAddProductDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleAddMemberDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAddProductDrawer({ ...addProductDrawer, [anchor]: open });
  };
  // ? ADD MEMBER DRAWER ENDS HERE

  // ? PERMISSIONS ACCORDIAN STARTS HERE
  const [expanded, setExpanded] = React.useState("panel0");

  const handleAccordianChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // ? PERMISSIONS ACCORDIAN ENDS HERE

  // * ACCESS POPOVERS STARTS
  const [anchorAccessEl, setAnchorAccessEl] = React.useState(null);
  const handleAccessClick = (event) => {
    setAnchorAccessEl(event.currentTarget);
  };
  const handleAccessClose = () => {
    setAnchorAccessEl(null);
  };
  const openAccess = Boolean(anchorAccessEl);
  const idAccess = openAccess ? "simple-popover" : undefined;
  // * ACTIVITY POPOVERS ENDS

  // ? BLOCK DIALOG STARTS HERE
  const [openBlock, setOpenBlock] = React.useState(false);

  const handleBlock = () => {
    setOpenBlock(true);
  };

  const handleBlockClose = () => {
    setOpenBlock(false);
  };
  // ? BLOCK DIALOG ENDS HERE

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
              <div className="d-flex align-items-center rounded-3 p-2 hover-back">
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
              <div className="d-flex align-items-center rounded-3 p-2 hover-back">
                <img
                  src={currencyDollar}
                  alt="currencyDollar"
                  width={18}
                  className="me-2"
                />
                <small className="text-lightBlue d-block">USA Currency</small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back">
                <img
                  src={currencyPound}
                  alt="currencyPound"
                  width={18}
                  className="me-2"
                />
                <small className="text-lightBlue d-block">UK Currency</small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back">
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
                      <Tab label="Basic Info" className="tabs-head" />
                      <Tab label="Addresses" className="tabs-head" />
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
                        <div className="col-md-12">
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
                        </div>
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
                            label="Set as Default Address"
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: 13,
                                color: "#c8d8ff",
                              },
                            }}
                          />
                        </div>

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
                              placeholder="Enter Email ID"
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
                          <p className="text-lightBlue mb-1">Town/City</p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Town/City"
                              size="small"
                            />
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                          <p className="text-lightBlue mb-1">
                            Zipcode/Postalcode
                          </p>
                          <FormControl className="w-100 px-0">
                            <OutlinedInput
                              placeholder="Enter Zipcode/Postalcode"
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

              <div className="d-flex justify-content-center mt-2">
                <hr className="hr-grey-6 w-100" />
              </div>
              <div className="col-12">
                <TableSearch />
              </div>
              <div className="col-12 mt-3">
                <div className="row">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-6">
                        <div className="d-flex align-items-center">
                          <h6 className="fw-500 text-blue-2 text-decoration-underline me-3">
                            Saniya Shaikh
                          </h6>

                          <img src={indiaFlag} alt="indiaFlag" height={15} />
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <small className="text-grey-6 me-2">
                            saniya@mydesignar.com
                          </small>
                          <VisibilityOutlinedIcon
                            sx={{
                              color: "#5c6d8e",
                              fontSize: 14,
                              cursor: "pointer",
                              marginRight: "8px",
                            }}
                          />
                          <ContentCopyIcon
                            sx={{
                              fontSize: 12,
                              color: "#5c6d8e",
                            }}
                            className="c-pointer"
                          />
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <small className="text-grey-6 me-2">
                            +91-9876543210
                          </small>
                          <VisibilityOutlinedIcon
                            sx={{
                              color: "#5c6d8e",
                              fontSize: 14,
                              cursor: "pointer",
                              marginRight: "8px",
                            }}
                          />
                          <ContentCopyIcon
                            sx={{
                              fontSize: 12,
                              color: "#5c6d8e",
                            }}
                            className="c-pointer"
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex justify-content-between mb-3">
                          <small className="text-grey-6 me-2">
                            Shipping Address
                          </small>
                          <small className="text-blue-2">Edit</small>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <small className="text-lightBlue me-3">
                            The Boardroom Co-Working Space - Andheri Near DN
                            Nagar Metro Station, Mumbai - 4000039, India
                          </small>
                          <ContentCopyIcon
                            sx={{
                              fontSize: 12,
                              color: "#c8d8ff",
                            }}
                            className="c-pointer"
                          />
                        </div>
                        <div className="d-flex mt-3">
                          <img
                            src={locationGradient}
                            alt="locationGradient"
                            width={14}
                            className="me-2"
                          />
                          <small className="text-blue-gradient">
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
                      <small className="text-blue-2">Edit</small>
                    </div>
                    <small className="text-lightBlue me-3 d-block">
                      Sahil Bhutani
                    </small>
                    <div className="d-flex align-items-center justify-content-between">
                      <small className="text-lightBlue me-3">
                        The Boardroom Co-Working Space - Andheri Near DN Nagar
                        Metro Station, Mumbai - 4000039, India
                      </small>
                      <ContentCopyIcon
                        sx={{
                          fontSize: 12,
                          color: "#c8d8ff",
                        }}
                        className="c-pointer"
                      />
                    </div>
                    <div className="d-flex mt-3">
                      <small className="text-lightBlue me-3 d-block me-3">
                        GSTIN:&nbsp;
                        <span className="text-grey-6">AB1234567890ADS</span>
                      </small>
                      <ContentCopyIcon
                        sx={{
                          fontSize: 12,
                          color: "#5c6d8e",
                        }}
                        className="c-pointer"
                      />
                    </div>
                    <div className="d-flex mt-2">
                      <small className="text-lightBlue me-3 d-block me-3">
                        Email ID:&nbsp;
                        <span className="text-grey-6">
                          saniya@mydesignar.com
                        </span>
                      </small>
                      <ContentCopyIcon
                        sx={{
                          fontSize: 12,
                          color: "#5c6d8e",
                        }}
                        className="c-pointer"
                      />
                    </div>
                    <div className="d-flex mt-2">
                      <small className="text-lightBlue me-3">
                        Mobile No:&nbsp;
                        <span className="text-grey-6">+91-9876543210</span>
                      </small>
                      <ContentCopyIcon
                        sx={{
                          fontSize: 12,
                          color: "#5c6d8e",
                        }}
                        className="c-pointer"
                      />
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
                <small className="text-blue-2">Custom Product</small>
              </div>

              <div className="d-flex justify-content-center mt-2">
                <hr className="hr-grey-6 w-100" />
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
                <TableSearch />
              </div>
            </div>
            <div className="col-12 px-0 d-flex justify-content-center mt-2">
              <hr className="hr-grey-6 w-100" />
            </div>
            <div className="col-12 mt-2 px-0">
              <div className="d-flex  mb-1">
                <p className="text-lightBlue">User Note:</p>
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
                  // checked={checked}
                  // onChange={handleCheckboxChange}
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
            <div className="col-12 d-flex justify-content-center mt-2 px-0">
              <hr className="hr-grey-6 w-100" />
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
                  <small className="text-blue-2 text-decoration-underline">
                    Add Discount
                  </small>
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
                  <small className="text-blue-2 text-decoration-underline">
                    Add Shipping
                  </small>
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
                    <span className="text-blue-2">(Remove Tax)</span>
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
                  <small className="text-blue-2">Add other charges</small>
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center mt-2 px-0">
              <hr className="hr-grey-6 w-100" />
            </div>
            <div className="col-12">
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
          <Link
            to="/orders/allOrders"
            className="button-lightBlue-outline py-2 px-4"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/orders/orderDetails"
            className="button-gradient ms-3 py-2 px-4 w-auto"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
