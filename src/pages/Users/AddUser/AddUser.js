import React, { useMemo } from "react";
import "./AddUser.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
// ! COMPONENT IMPORTS
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import cancel from "../../../assets/icons/cancel.svg";
import archivedGrey from "../../../assets/icons/archivedGrey.svg";
import editGrey from "../../../assets/icons/editGrey.svg";
import addUserUpload from "../../../assets/images/users/addUserUpload.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  OutlinedInput,
  Slide,
  Checkbox,
  FormControlLabel,
  Chip,
  TextField,
  Autocomplete,
  styled,
  InputBase,
  FormGroup,
  Popover,
  TextareaAutosize,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
import AppStateSelect from "../../../components/AppStateSelect/AppStateSelect";

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

const AddUser = () => {
  // ? GENDER SELECT STARTS HERE
  const [gender, setGender] = React.useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  // ? GENDER SELECT ENDS HERE

  // ? USER ROLE SELECT STARTS HERE
  const [userRole, setUserRole] = React.useState("");

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
  };
  // ? USER ROLE SELECT ENDS HERE

  // ? USER GROUP SELECT STARTS HERE
  const [userGroup, setUserGroup] = React.useState("");

  const handleUserGroupChange = (event) => {
    setUserGroup(event.target.value);
  };
  // ? USER GROUP SELECT ENDS HERE

  // ? ADDRESS STARTS HERE
  const [address, setAddress] = React.useState(false);

  const handleAddressChange = () => {
    address ? setAddress(false) : setAddress(true);
  };
  // ? ADDRESS ENDS HERE
  // ? ADDRESS STARTS HERE
  const [savedAddress, setSavedAddress] = React.useState(false);

  const handleSavedAddressChange = () => {
    setSavedAddress(true);
    setAddress(false);
  };
  // ? ADDRESS ENDS HERE

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

          <h5 className="page-heading ms-2 ps-1">Add New Users</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  User Information
                </h6>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" />
            <div className="col-12 mb-2 pb-2 px-0">
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
                    <OutlinedInput placeholder="Enter Last Name" size="small" />
                  </FormControl>
                </div>
                <div className="col-md-6 mt-3">
                  <p className="text-lightBlue mb-1">Date of Birth</p>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Select Date of Birth"
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
                        Male{" "}
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
                <div className="col-md-12 mt-3">
                  <p className="text-lightBlue mb-1">Email ID</p>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Email ID" size="small" />
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
                      startAdornment={
                        <InputAdornment position="start">
                          +91&nbsp;&nbsp;&nbsp;&nbsp;|
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
                <div className="col-md-12 mt-3">
                  <p className="text-lightBlue mb-1">Password</p>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Password" size="small" />
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
                    label="Use Temporary Password"
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
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-3">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  User Group
                </h6>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" />
            <div className="col-12 px-0">
              <div className="row">
                <div className="col-md-12 mt-3">
                  <p className="text-lightBlue mb-1">User Role</p>
                  <FormControl
                    sx={{ m: 0, minWidth: 120, width: "100%" }}
                    size="small"
                  >
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={userRole}
                      onChange={handleUserRoleChange}
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
                        Admin
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Super Admin
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        User
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-12 mt-3">
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
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-3">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Add Address
                </h6>
              </div>

              <button
                className="button-gradient py-2 px-3"
                onClick={handleAddressChange}
              >
                <p className="">+ Add Address</p>
              </button>
            </div>
            {savedAddress && (
              <div className="col-12 mt-3">
                <div
                  className="row py-3 mb-3 rounded-8"
                  style={{ background: "rgba(39, 40, 63, 0.5)" }}
                >
                  <div className="col-12 d-flex justify-content-between align-items-center mb-2">
                    <p className="text-lightBlue">Home</p>
                    <div className="d-flex align-items-center">
                      <Chip label="Default" size="small" />
                      <img
                        src={editGrey}
                        alt="editGrey"
                        className="c-pointer ms-3"
                      />
                      <img
                        src={archivedGrey}
                        alt="archiverdGrey"
                        className="c-pointer ms-3"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <small className="text-lightBlue d-block">
                      Sanjay Chauhan
                    </small>
                    <small className="text-lightBlue d-block">
                      66-68, Jambi Moballa, Bapu Khote Street, Mandvi
                    </small>
                    <small className="text-lightBlue d-block">
                      Mumbai-400003, Maharashtra, Mumbai
                    </small>
                    <small className="text-lightBlue d-block">
                      +91 9876543210
                    </small>
                  </div>
                </div>
              </div>
            )}
            {address && (
              <div className="col-12 mt-3">
                <div
                  className="row py-3 mb-3 rounded-8"
                  style={{ background: "rgba(39, 40, 63, 0.5)" }}
                >
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
                        startAdornment={
                          <InputAdornment position="start">
                            +91&nbsp;&nbsp;&nbsp;&nbsp;|
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
                    <p className="text-lightBlue mb-1">Zipcode/Postalcode</p>
                    <FormControl className="w-100 px-0">
                      <OutlinedInput
                        placeholder="Enter Zipcode/Postalcode"
                        size="small"
                      />
                    </FormControl>
                  </div>

                  <div className="col-md-12 mt-3  add-user-country">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="text-lightBlue mb-1">State or Region</p>
                      <small className="text-grey-6 mb-1">(Optional)</small>
                    </div>
                    <AppStateSelect />
                  </div>
                  <div className="col-12 mt-3 d-flex justify-content-between">
                    <Link
                      onClick={handleAddressChange}
                      className="button-red-outline py-2 px-4"
                    >
                      <p>Discard</p>
                    </Link>

                    <Link
                      onClick={handleSavedAddressChange}
                      className="button-gradient py-2 px-4 w-auto"
                    >
                      <p>Save</p>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="text-lightBlue mb-3">Add Profile</h6>
              <small className="text-lightBlue mb-3 text-blue-2">
                Add Media from URL
              </small>
            </div>
            <div {...getRootProps({ style })} className="">
              <input
                id="primary"
                {...getInputProps()}
                // onChange={(event) => {
                //   uploadFileToCloud(event, "primary");
                //   event.target.value = null;
                // }}
              />
              <img src={addUserUpload} className="w-100" alt="" />
            </div>
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
              minRows={5}
              className="col-12"
            />
            <small className="mt-1 text-grey-6 font1">
              Note: User can't see this, its for your reference
            </small>
          </div>
        </div>
      </div>
      <div className="row bottom-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link to="/allUsers" className="button-red-outline py-2 px-4">
            <p>Discard</p>
          </Link>

          <Link
            to="/allUsers"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/allUsers"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
          <Link to="/allUsers" className="button-gradient py-2 px-4 w-auto">
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
