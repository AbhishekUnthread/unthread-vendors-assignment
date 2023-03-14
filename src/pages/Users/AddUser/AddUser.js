import React from "react";
import "./AddUser.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import AppStateSelect from "../../../components/AppStateSelect/AppStateSelect";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import TagsBox from "../../../components/TagsBox/TagsBox";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import archivedGrey from "../../../assets/icons/archivedGrey.svg";
import editGrey from "../../../assets/icons/editGrey.svg";
import addUserUpload from "../../../assets/images/users/addUserUpload.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Chip,
  TextField,
  Autocomplete,
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

  return (
    <div className="page container-fluid position-relative">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/users/allUsers" className="d-flex">
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
      <div className="row mt-3">
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
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  User Type
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
                      <TextField
                        size="small"
                        {...params}
                        placeholder="Search"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Addresses
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
                  <div className="col-12 d-flex justify-content-between align-items-center mb-2 px-3">
                    <p className="text-lightBlue">Home</p>
                    <div className="d-flex align-items-center">
                      <Chip label="Default" size="small" className="px-2" />
                      <img
                        src={editGrey}
                        alt="editGrey"
                        className="c-pointer ms-3"
                        width={16}
                      />
                      <img
                        src={archivedGrey}
                        alt="archiverdGrey"
                        className="c-pointer ms-3"
                        width={16}
                      />
                    </div>
                  </div>
                  <div className="col-12 px-3">
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
                <div className="row py-3 rounded-8 border-grey-5 bg-black-13">
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
                  <div className="col-12 mt-4 d-flex justify-content-between">
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
          <UploadMediaBox
            imageName={addUserUpload}
            headingName={"Add Profile"}
          />
          <TagsBox />
          <NotesBox />
        </div>
      </div>
      <div className="row bottom-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link to="/users/allUsers" className="button-red-outline py-2 px-4">
            <p>Discard</p>
          </Link>

          <Link
            to="/users/allUsers"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/users/allUsers"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/users/allUsers"
            className="button-gradient py-2 px-4 w-auto ms-3"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
