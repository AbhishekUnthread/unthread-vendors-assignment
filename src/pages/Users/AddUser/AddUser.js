import React, { useState } from "react";
import "./AddUser.scss";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

// ! COMPONENT IMPORTS
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import AppStateSelect from "../../../components/AppStateSelect/AppStateSelect";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import TagsBox from "../../../components/TagsBox/TagsBox";
import SaveFooter from "../../../components/SaveFooter/SaveFooter"
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import archivedGrey from "../../../assets/icons/archivedGrey.svg";
import editGrey from "../../../assets/icons/editGrey.svg";
import addMedia from "../../../assets/icons/addMedia.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  FormHelperText,
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

import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import {useCreateCustomerMutation} from "../../../features/customers/customer/customerApiSlice"
import { useGetAllTagsQuery } from "../../../features/parameters/tagsManager/tagsManagerApiSlice";
import { useGetAllCustomerGroupQuery } from "../../../features/customers/customerGroup/customerGroupApiSlice";
import { useCreateCustomerAddressMutation } from "../../../features/customers/customerAddress/customerAddressApiSlice";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

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

const customerValidationSchema = Yup.object({
  firstName: Yup.string().trim().min(3).required("Required"),
  lastName: Yup.string().trim().min(3).required("Required"),
  email: Yup.string().email().required("Required"),
  phone: Yup.number().required("Required"),
  password:  Yup
    .string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required("Required"),
});

const AddUser = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);

  const {
    data: tagsData,
    isLoading: tagsIsLoading,
    isSuccess: tagsIsSuccess,
    error: tagsError,
  } = useGetAllTagsQuery({createdAt: -1});

  const {
    data: customerGroupData,
    isLoading: customerGroupIsLoading,
    isSuccess: customerGroupIsSuccess,
    error: customerGroupError,
  } = useGetAllCustomerGroupQuery();

  const [
    createCustomer,
    {
      isLoading: createCustomerIsLoading,
      isSuccess: createCustomerIsSuccess,
      error: createCustomerError,
    },
  ] = useCreateCustomerMutation();

  const [
    createCustomerAddress,
    {
      isLoading: createCustomerAddressIsLoading,
      isSuccess: createCustomerAddressIsSuccess,
      error: createCustomerAddressError,
    },
  ] = useCreateCustomerAddressMutation();

  const handleMediaUrl = (value) => {
    if(value !== null) {
      customerFormik?.setFieldValue("imageUrl", value);
    }
  }

  const GetCountryCode = (value) => {
    customerFormik.setFieldValue("countryCode", value)
  }

  const SelectCountryCode = (event, value) => {
    customerFormik.setFieldValue("countryCode", event)
  }

  const customerFormik = useFormik({
    initialValues: {
      isSendEmail: false,
      isTemporaryPassword: false
    },
    enableReinitialize: true,
    validationSchema: customerValidationSchema,
    onSubmit: (values) => {
      for (const key in values) {
        if(values[key] === "" || values[key] === null){
          delete values[key] 
        }
      }
      console.log(values, 'values for creating customers')
      // createCustomer(values)
      //   .unwrap()
      //   .then(() => customerFormik.resetForm());
      //   navigate("/users/allUsers");
      //   dispatch(showSuccess({ message: "Custormer created successfully" }));
    },
  });

  const customerAddressFormik = useFormik({
    initialValues: {
      name: ""
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      for (const key in values) {
        if(values[key] === "" || values[key] === null){
          delete values[key] 
        }
      }
      console.log(values, 'values for creating customers')
      // createCustomerAddress(values)
      //   .unwrap()
      //   .then(() => customerAddressFormik.resetForm());
      //   navigate("/users/allUsers");
      //   dispatch(showSuccess({ message: "Custormer created successfully" }));
    },
  });

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
    <form noValidate onSubmit={customerFormik.handleSubmit}>
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
                        value={customerFormik.values.firstName}
                        onBlur={customerFormik.handleBlur}
                        onChange={customerFormik.handleChange}
                        name="firstName"
                      />
                    </FormControl>
                    {!!customerFormik.touched.firstName && customerFormik.errors.firstName && (
                      <FormHelperText error>
                        {customerFormik.errors.firstName}
                      </FormHelperText>
                    )}
                  </div>
                  <div className="col-md-6 mt-3">
                    <p className="text-lightBlue mb-1">Last Name</p>
                    <FormControl className="w-100 px-0">
                      <OutlinedInput 
                        placeholder="Enter Last Name" 
                        size="small"
                        value={customerFormik.values.lastName}
                        onBlur={customerFormik.handleBlur}
                        onChange={customerFormik.handleChange}
                        name="lastName" 
                      />
                    </FormControl>
                    {!!customerFormik.touched.lastName && customerFormik.errors.lastName && (
                      <FormHelperText error>
                        {customerFormik.errors.lastName}
                      </FormHelperText>
                    )}
                  </div>
                  <div className="col-md-6 mt-3">
                    <p className="text-lightBlue mb-1">Date of Birth</p>
                    <FormControl className="w-100 px-0">
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDateTimePicker
                          onChange={(newValue) => {
                            setStartDate(newValue);
                            // handleStartDate(newValue)
                          }}
                          renderInput={(params) => <TextField {...params} size="small" placeholder="hello"/>}
                        />
                      </LocalizationProvider>
                    </FormControl>
                    {!!customerFormik.touched.dob && customerFormik.errors.dob && (
                      <FormHelperText error>
                        {customerFormik.errors.dob}
                      </FormHelperText>
                    )}
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
                        name="gender"
                        value={customerFormik.values.gender}
                        onChange={customerFormik.handleChange}
                        size="small"
                        placeholder="Gender"
                      >
                        <MenuItem
                          value="male"
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          Male
                        </MenuItem>
                        <MenuItem
                          value="female"
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
                      <OutlinedInput 
                        placeholder="Enter Email ID" 
                        size="small" 
                        value={customerFormik.values.email}
                        onBlur={customerFormik.handleBlur}
                        onChange={customerFormik.handleChange}
                        name="email" 
                      />
                    </FormControl>
                    {!!customerFormik.touched.email && customerFormik.errors.email && (
                      <FormHelperText error>
                        {customerFormik.errors.email}
                      </FormHelperText>
                    )}
                  </div>
                  <div className="col-md-12">
                    <FormControlLabel
                      control={
                        <Checkbox  
                          name="isSendEmail"                       
                          value={customerFormik.values.isSendEmail}
                          onChange={customerFormik.handleChange}
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
                            <AppMobileCodeSelect 
                              value={customerFormik.values.countryCode}
                              onBlur={customerFormik.handleBlur}
                              GetCountryCode={GetCountryCode}
                              SelectCountryCode = {SelectCountryCode}
                              name="countryCode" 
                            />
                            {/* &nbsp;&nbsp;&nbsp;&nbsp;| */}
                          </InputAdornment>
                        }
                        value={customerFormik.values.phone}
                        onBlur={customerFormik.handleBlur}
                        onChange={customerFormik.handleChange}
                        name="phone" 
                      />
                    </FormControl>
                    {!!customerFormik.touched.phone && customerFormik.errors.phone && (
                      <FormHelperText error>
                        {customerFormik.errors.phone}
                      </FormHelperText>
                    )}
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
                      <OutlinedInput 
                        placeholder="Enter Password" 
                        size="small"
                        value={customerFormik.values.password}
                        onBlur={customerFormik.handleBlur}
                        onChange={customerFormik.handleChange}
                        name="password"  
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-12">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isTemporaryPassword"
                          value={customerFormik.values.isTemporaryPassword}
                          onChange={customerFormik.handleChange}
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
                  <form1 noValidate onSubmit={customerAddressFormik.handleSubmit}>
                  <div className="col-12 mt-3">
                    <div className="row py-3 rounded-8 border-grey-5 bg-black-13">
                      <div className="col-md-12">
                        <p className="text-lightBlue mb-1">Name</p>
                        <FormControl className="w-100 px-0">
                          <OutlinedInput
                            placeholder="Office Address, Home Address"
                            size="small"
                            name="name"
                            value={customerAddressFormik.values.name}
                            onChange={customerAddressFormik.handleChange}
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
                            name="firstName"
                            value={customerAddressFormik.values.firstName}
                            onChange={customerAddressFormik.handleChange}
                          />
                        </FormControl>
                      </div>
                      <div className="col-md-6 mt-3">
                        <p className="text-lightBlue mb-1">Last Name</p>
                        <FormControl className="w-100 px-0">
                          <OutlinedInput
                            placeholder="Enter Last Name"
                            size="small"
                            name="lastName"
                            value={customerAddressFormik.values.lastName}
                            onChange={customerAddressFormik.handleChange}
                          />
                        </FormControl>
                      </div>
                      <div className="col-md-12 mt-3">
                        <p className="text-lightBlue mb-1">Company Name</p>
                        <FormControl className="w-100 px-0">
                          <OutlinedInput
                            placeholder="Enter Email ID"
                            size="small"
                            name="companyName"
                            value={customerAddressFormik.values.companyName}
                            onChange={customerAddressFormik.handleChange}
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
                            name="phone"
                            value={customerAddressFormik.values.phone}
                            onChange={customerAddressFormik.handleChange}
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
                            name="line1"
                            value={customerAddressFormik.values.line1}
                            onChange={customerAddressFormik.handleChange}
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

                        <button
                          type="submitform1"
                          // onClick={handleSavedAddressChange}
                          className="button-gradient py-2 px-4 w-auto"
                        >
                          <p>Save</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  </form1>
                )}
              </div>
          </div>
          <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
            <UploadMediaBox 
              name={"imageUrl"}  
              value={customerFormik?.values?.imageUrl}  
              imageName={addMedia} 
              headingName={"Media"} 
              UploadChange={handleMediaUrl} 
            />
            {/* <TagsBox 
              tagsList={tagsData?.data?.data}
            /> */}
            <NotesBox 
              name={"notes"}
              onChange={customerFormik.handleChange} 
              value={customerFormik.values.notes}
            />
          </div>
        </div>
        <div className="row bottom-buttons pt-5 pb-3 justify-content-between">
          <SaveFooter saveAddAnother={"Save & Add Another"} />
        </div>
      </div>
    </form>
  );
};

export default AddUser;
