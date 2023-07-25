import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  TextField,
  Autocomplete,
} from "@mui/material";

import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import TagsBox from "../../../components/TagsBox/TagsBox";
import SaveFooter from "../../../components/SaveFooter/SaveFooter";
import AddAddress from "./AddAddress";

import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import addMedia from "../../../assets/icons/addMedia.svg";

import "./AddUser.scss";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

import {useCreateCustomerMutation} from "../../../features/customers/customer/customerApiSlice"
import { useGetAllTagsQuery } from "../../../features/parameters/tagsManager/tagsManagerApiSlice";
import { useGetAllCustomerGroupQuery } from "../../../features/customers/customerGroup/customerGroupApiSlice";

const customerValidationSchema = Yup.object({
  firstName: Yup.string().trim().min(3).required("Required"),
  lastName: Yup.string().trim().min(3).required("Required"),
  dob: Yup.date().required("Required"),
  gender: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  countryCode: Yup.string().required("Required"),
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

  const handleMediaUrl = (value) => {
    if(value !== null) {
      customerFormik?.setFieldValue("imageUrl", value);
    }
  }

  const GetCountryCode = (value) => {
    customerFormik.setFieldValue("countryCode", value)
  }

  const SelectCountryCode = (event) => {
    customerFormik.setFieldValue("countryCode", event)
  }

  const handleDOB = (event, value) => {
    customerFormik.setFieldValue("dob", event)
  }

  const selectedTagList = (event) => {
    customerFormik.setFieldValue("tags", event)
  }

  const handleGroupName = (event, value) => {
    customerFormik.setFieldValue("userGroup", value.map(option => option._id))
  }

  const customerAddressDetails = (event, value) => {
    customerFormik.setFieldValue("address", [event])
  }

  const customerFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      countryCode: "",
      phone: "",
      email: "",
      password: "",
      address: "",
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
      createCustomer(values)
        .unwrap()
        .then((res) => {
            navigate("/users/allUsers");
            dispatch(showSuccess({ message: "Custormer created successfully" }));
        })
    },
  });

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
                        <DatePicker
                          name="dob" 
                          value={customerFormik.values.dob}
                          onChange={handleDOB}
                          renderInput={(params) => <TextField {...params} size="small" />}
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
                    {!!customerFormik.touched.gender && customerFormik.errors.gender && (
                      <FormHelperText error>
                        {customerFormik.errors.gender}
                      </FormHelperText>
                    )}
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
                    {!!customerFormik.touched.countryCode && customerFormik.errors.countryCode && (
                      <FormHelperText error>
                        {customerFormik.errors.countryCode}
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
                    <p className="text-lightBlue mb-1">Email ID</p>
                    <FormControl className="w-100 px-0">
                      <OutlinedInput 
                        placeholder="Enter Email ID" 
                        size="small" 
                        value={customerFormik.values.email}
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
                     {!!customerFormik.touched.password && customerFormik.errors.password && (
                      <FormHelperText error>
                        {customerFormik.errors.password}
                      </FormHelperText>
                    )}
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
                  <div className="col-md-12 mt-3">
                    <p className="text-lightBlue mb-1">User Group</p>
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      sx={{ width: "100%" }}
                      options={customerGroupData?.data?.data || []}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option?.name}
                      size="small"
                      onChange={handleGroupName}
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
                          <small className="text-lightBlue">{option.name}</small>
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

            <AddAddress 
              name="address"
              value={customerFormik.values.address}
              customerAddressDetails={customerAddressDetails}
            />
          </div>
          <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
            <UploadMediaBox 
              name={"imageUrl"}  
              value={customerFormik?.values?.imageUrl}  
              imageName={addMedia} 
              headingName={"Media"} 
              UploadChange={handleMediaUrl} 
              isUploaded={()=>{}}
            />
            <TagsBox 
              name="tags"
              value={customerFormik.values.tags}
              tagsList={tagsData?.data?.data || []}
              selectedTagList={selectedTagList}
            />
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
