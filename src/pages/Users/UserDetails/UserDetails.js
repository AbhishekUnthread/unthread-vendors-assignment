import React from "react";
import "./UserDetails.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppReactImageGallery from "../../../components/AppReactImageGallery/AppReactImageGallery";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import gold from "../../../assets/images/products/gold.svg";
import silver from "../../../assets/images/products/silver.svg";
import platinum from "../../../assets/images/products/platinum.svg";
import cancel from "../../../assets/icons/cancel.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import editWhite from "../../../assets/icons/editWhite.svg";
import email from "../../../assets/icons/email.svg";
import phone from "../../../assets/icons/phone.svg";
import message from "../../../assets/icons/message.svg";
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import block from "../../../assets/images/users/block.svg";
import userLarge from "../../../assets/images/users/userLarge.svg";
import verified from "../../../assets/icons/verified.svg";
import copy from "../../../assets/icons/copy.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Checkbox,
  Autocomplete,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  Slide,
  Popover,
  styled,
  InputBase,
  Chip,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
import UserOrders from "./UserOrders/UserOrders";
import UserInformation from "./UserInformation/UserInformation";

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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
  },
}));
// ? SEARCH INPUT ENDS HERE

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

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

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

const UserDetails = () => {
  const [value, setValue] = React.useState(0);

  // ? TABS STARTS HERE
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleTabChange = () => {
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

  // ? TAGS DIALOG STARTS HERE
  const [openTags, setOpenTags] = React.useState(false);

  const handleTagsOpen = () => {
    setOpenTags(true);
  };

  const handleTagsClose = () => {
    setOpenTags(false);
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
  // * SORT POPOVERS STARTS
  const [anchorContactEl, setContactEl] = React.useState(null);

  const handleContactClick = (event) => {
    setContactEl(event.currentTarget);
  };

  const handleContactClose = () => {
    setContactEl(null);
  };

  const openContact = Boolean(anchorContactEl);
  const idContact = openContact ? "simple-popover" : undefined;
  // * SORT POPOVERS ENDS

  // ? BLOCK DIALOG STARTS HERE
  const [openBlock, setOpenBlock] = React.useState(false);

  const handleBlock = () => {
    setOpenBlock(true);
  };

  const handleBlockClose = () => {
    setOpenBlock(false);
  };
  // ? BLOCK DIALOG ENDS HERE

  return (
    <div className="page container-fluid position-relative">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/allUsers">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>
          <div>
            <h5 className="page-heading ms-2 ps-1">Saniya Shaikh</h5>
            <div className="d-flex ms-2 ps-1 mt-1">
              <small className="text-lightBlue me-2">
                Mumbai, Maharashtra, India
              </small>
              <img src={indiaFlag} alt="indiaFlag" width={20} />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          {/* <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Duplicate</p>
          </button>
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Preview</p>
          </button> */}
          <button
            className="button-red-outline py-1 px-4"
            onClick={handleBlock}
          >
            <p>Block & Archive</p>
          </button>

          <Dialog
            open={openBlock}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleBlockClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
          >
            <DialogContent className="py-2 px-4 text-center">
              <img src={block} alt="block" width={100} />
              <div className="row"></div>
              <h6 className="text-lightBlue mt-3 mb-2">
                Are you sure you want to
              </h6>
              <h6 className="text-lightBlue mt-2 mb-2">
                Block & Archive&nbsp;
                <span className="text-blue-2">Saniya Shaikh</span>&nbsp;?
              </h6>
              <div className="d-flex justify-content-center mt-4">
                <hr className="hr-grey-6 w-100" />
              </div>
            </DialogContent>
            <DialogActions className="d-flex justify-content-between px-4 pb-4">
              <button
                className="button-lightBlue-outline py-2 px-3 ms-5"
                onClick={handleBlockClose}
              >
                <p>Cancel</p>
              </button>
              <button
                className="button-red-outline py-2 px-3 me-5"
                onClick={handleBlockClose}
              >
                <p>Block & Archive</p>
              </button>
            </DialogActions>
          </Dialog>

          <Link
            to="/allProducts"
            className="button-lightBlue-outline py-1 ps-2 pe-3 ms-3"
          >
            <img
              src={editWhite}
              alt="editWhite"
              height={20}
              className="ps-1 pe-1"
            />
            <p>Edit</p>
          </Link>

          <button
            className="button-gradient py-1 px-4 w-auto ms-3 me-3"
            onClick={handleContactClick}
          >
            <p>Contact</p>
          </button>

          <Popover
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            id={idContact}
            open={openContact}
            anchorEl={anchorContactEl}
            onClose={handleContactClose}
          >
            <div className="py-2 px-1">
              <div className="d-flex align-items-center">
                <img src={phone} alt="phome" width={16} />
                <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                  Call
                </small>
              </div>
              <div className="d-flex align-items-center">
                <img src={email} alt="email" width={16} />
                <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                  Send Email
                </small>
              </div>
              <div className="d-flex align-items-center">
                <img src={message} alt="message" width={16} />
                <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                  Message
                </small>
              </div>
            </div>
          </Popover>
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
                <Tab label="Information" className="tabs-head" />
                <Tab label="Orders" className="tabs-head" />
                <Tab label="CJP" className="tabs-head" />
                <Tab label="Digital Gold" className="tabs-head" />
                <Tab label="Enquiries" className="tabs-head" />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <UserInformation />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UserOrders />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <p className="text-lightBlue">CJP</p>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <p className="text-lightBlue">Digital Gold</p>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <p className="text-lightBlue">Enquiries</p>
            </TabPanel>
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <img src={userLarge} alt="userLarge" width={100} />
            <div className="d-flex w-100 mt-3">
              <div className="d-flex w-100 align-items-center">
                <h6 className="text-lightBlue me-2">Saniya Shaikh</h6>
                <img src={verified} alt="verified" width={15} />
              </div>
              <img src={indiaFlag} alt="indiaFlag" width={18} />
            </div>
            <small className="text-grey-6 my-2 d-block">#123456 • Female</small>
            <div className="d-flex align-items-baseline flex-wrap">
              <small className="rounded-pill text-black fw-light table-status px-2 py-1 me-2">
                Active
              </small>
              <small className="text-grey-6 my-2 d-block">
                Last session&nbsp;
                <span className="text-lightBlue">Today at 6:00am</span>
              </small>
            </div>
            <small className="text-grey-6 mt-3 d-block">Registered Date</small>
            <p className="text-lightBlue mt-1">
              5 Dec, 2022&nbsp;<span className="text-grey-6">at 10:00am</span>
            </p>
            <div className="d-flex justify-content-center ">
              <hr className="hr-grey-6 w-100" />
            </div>
            <small className="text-grey-6 mt- d-block">E-mail ID</small>
            <div className="d-flex mt-1">
              <p className="text-lightBlue me-2">saniya@mydesignar.com</p>
              <img src={copy} alt="copy" />
            </div>
            <small className="text-grey-6 mt-2 d-block">Mobile Number</small>
            <div className="d-flex mt-1">
              <p className="text-lightBlue me-2">+91 9876543210</p>
              <img src={copy} alt="copy" />
            </div>
            <small className="text-grey-6 mt-2 d-block">Date of Birth</small>
            <div className="d-flex mt-1">
              <p className="text-lightBlue me-2">21 Nov, 1999</p>
            </div>
            <small className="text-grey-6 mt-2 mb-1 d-block">User Group</small>
            <Chip label="VIP" size="small" />
            <Chip label="Verified User" size="small" className="ms-2" />
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p className="text-lightBlue">Notes</p>
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
            <small className="mt-1 text-grey-6 font1">
              Note: User can't see this, its for your reference
            </small>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Tags</p>
                <img src={info} alt="info" className="ms-2" width={13.5} />
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
  );
};

export default UserDetails;
