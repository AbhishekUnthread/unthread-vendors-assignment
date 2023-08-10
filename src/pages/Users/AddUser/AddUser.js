import { useReducer, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import _ from "lodash";
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

import { 
  useCreateCustomerMutation, 
  useGetAllCustomersQuery,
  useEditCustomerMutation
} from "../../../features/customers/customer/customerApiSlice"
import { useGetAllTagsQuery } from "../../../features/parameters/tagsManager/tagsManagerApiSlice";
import { useGetAllCustomerGroupQuery } from "../../../features/customers/customerGroup/customerGroupApiSlice";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import TagsBox from "../../../components/TagsBox/TagsBox";
import { SaveFooterTertiary} from "../../../components/SaveFooter/SaveFooter";
import AddAddress from "./AddAddress";
import { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";
import CustomerChip from "./CustomerChip";

import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import addMedia from "../../../assets/icons/addMedia.svg";
import cancel from "../../../assets/icons/cancel.svg";

import "./AddUser.scss";

const initialQueryFilterState = {
  pageSize: 1,
  pageNo: null,
  totalCount: 0,
};

const initialCustomerState = {
  deleteIndex: null,
  confirmationMessage: "",
  showDeleteModal: false,
  isEditing: false,
};

const queryFilterReducer = (state, action) => {
  if (action.type === "SET_PAGE_NO") {
    return {
      ...state,
      pageNo: +action.pageNo,
    };
  }
  if (action.type === "SET_TOTAL_COUNT") {
    return {
      ...state,
      totalCount: action.totalCount,
    };
  }
  return initialQueryFilterState;
};

const customerTabReducer = (state, action) => {
  if (action.type === "SET_DELETE") {
    return {
      ...state,
      deleteIndex: action.deleteIndex,
      confirmationMessage: action.message || "",
      showDeleteModal: true,
    };
  }
  if (action.type === "REMOVE_DELETE") {
    return {
      ...initialCustomerState,
    };
  }
  if (action.type === "ENABLE_EDIT") {
    return {
      ...initialCustomerState,
      isEditing: true,
    };
  }
  if (action.type === "DISABLE_EDIT") {
    return {
      ...initialCustomerState,
      isEditing: false,
    };
  }

  return initialCustomerState;
};

const customerValidationSchema = Yup.object({
  firstName: Yup.string().trim().min(3).required("Required"),
  lastName: Yup.string().trim().min(3).required("Required"),
  dob: Yup.date().required("Required"),
  gender: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  countryCode: Yup.string().required("Required"),
  phone: Yup.number().required("Required"),
  userGroup: Yup.array().of(Yup.string()),
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
  let { id } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [customerState, dispatchCustomer] = useReducer(
    customerTabReducer,
    initialCustomerState
  );

  const {
    data: customerData,
    isLoading: customerIsLoading,
    error: customerIsError,
    isSuccess: customerIsSuccess,
  } = useGetAllCustomersQuery({id: id},{ skip: id ? false : true});

  const [
    editCustomer,
    {
      data: editData,
      isLoading: editCustomerIsLoading,
      isSuccess: editCustomerIsSuccess,
      error: editCustomerError,
    }
  ] = useEditCustomerMutation();

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
    customerFormik.setFieldValue("countryCode", value ?? "")
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

  const backHandler = () => {
    navigate("/users/allUsers");
  };

  const customerFormik = useFormik({
    initialValues: {
      firstName: customerData?.data?.data[0]?.firstName || "",
      lastName: customerData?.data?.data[0]?.lastName || "",
      dob: customerData?.data?.data[0]?.dob || "",
      gender: customerData?.data?.data[0]?.gender || "",
      countryCode: customerData?.data?.data[0]?.countryCode || "",
      phone: customerData?.data?.data[0]?.phone || "",
      email: customerData?.data?.data[0]?.email || "",
      password: customerData?.data?.data[0]?.password || "",
      address: customerData?.data?.data[0]?.address || "",
      isSendEmail: customerData?.data?.data[0]?.isSendEmail || false,
      isTemporaryPassword: customerData?.data?.data[0]?.isTemporaryPassword || false,
      notes: customerData?.data?.data[0]?.notes || "",
      imageUrl: customerData?.data?.data[0]?.imageUrl || "",
      userGroup: customerData?.data?.data[0]?.userGroup || [],
      tags: customerData?.data?.data[0]?.tags || ""
    },
    enableReinitialize: true,
    validationSchema: customerValidationSchema,
    onSubmit: (values) => {
      for (const key in values) {
        if(values[key] === "" || values[key] === null){
          delete values[key] 
        }
      }
      if(!id) {
        createCustomer(values)
          .unwrap()
          .then((res) => {
            navigate("/users/allUsers");
            dispatch(showSuccess({ message: "Custormer created successfully" }));
          })
      } else {
        editCustomer({
        id: id,
        details : values
      })
        .unwrap()
          .then(() => {
            dispatch(showSuccess({ message: "Custormer edited successfully" }));
          });
      }
    },
  });

  useEffect(() => {
    if (id) {
      dispatchQueryFilter({ type: "SET_PAGE_NO", pageNo: id });
    }
  }, [id]);

  useEffect(() => {
    if (id && !_.isEqual(customerFormik.values, customerFormik.initialValues)) {
      dispatchCustomer({ type: "ENABLE_EDIT" });
    } else if (id && _.isEqual(customerFormik.values, customerFormik.initialValues)) {
      dispatchCustomer({ type: "DISABLE_EDIT" });
    }
  }, [customerFormik.initialValues, customerFormik.values, id]);

  const removeGroup = (groupIdToRemove) => {
    const updatedGroups = customerFormik.values.userGroup.filter(groupId => groupId !== groupIdToRemove);
    customerFormik.setFieldValue("userGroup", updatedGroups);
  };

  const selectedGroups = customerGroupData?.data?.data?.filter(group =>
    customerFormik.values.userGroup.includes(group._id)
  );

  const handleGroupChange = (_, group) => {
    const groupIds = group?.map((group) => group?._id)
    customerFormik.setFieldValue("userGroup", groupIds)
  }

  const currentDate = new Date();
  const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

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
                          maxDate={maxDate}
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
                              SelectCountryCode = {GetCountryCode}
                              name="countryCode" 
                              formik={customerFormik}
                            />
                          </InputAdornment>
                        }
                        value={customerFormik.values.phone}
                        onBlur={customerFormik.handleBlur}
                        onChange={customerFormik.handleChange}
                        name="phone" 
                      />
                    </FormControl>
                    { (!!customerFormik.touched.countryCode || !!customerFormik.touched.phone) 
                      && (customerFormik.errors.countryCode || customerFormik.errors.phone) && (
                      <FormHelperText error>
                        {customerFormik.errors.countryCode || customerFormik.errors.phone}
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
                      value={selectedGroups || []}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option?.name}
                      size="small"
                      onChange={handleGroupChange}
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
                      renderTags={(value) =>
                        value.map((option) => (
                          <div
                            key={option?._id}
                            className={`rounded-pill d-flex align-items-center px-2 py-1 c-pointer`}
                            style={{
                              background:
                                "linear-gradient(303.01deg, #2f2e69 -4.4%, #514969 111.29%)",
                            }}
                          >
                            <small className="fw-400 text-lightBlue">{option?.name}</small>
                            <button type="button" className="reset">
                              <img 
                                src={cancel} 
                                alt="cancel" 
                                width={20} 
                                className="c-pointer" 
                                onClick={() => removeGroup(option?._id)}
                              />
                            </button>
                          </div>
                        ))
                      }
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
              data={customerData?.data?.data[0]?.addresses[0]}
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
              previousImage={customerFormik?.values?.imageUrl}
            />
            <TagsBox 
              formik={customerFormik}
              name="tags"
              value={customerFormik.values.tags || []}
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
          <SaveFooterTertiary
            show={id ? customerState.isEditing : true}
            onDiscard={backHandler}
            isLoading={createCustomerIsLoading || editCustomerIsLoading}
          />
        </div>
      </div>
      <DiscardModalSecondary
        when={id && !_.isEqual(customerFormik.values, customerFormik.initialValues)}
        message="customer tab"
      />
    </form>
  );
};

export default AddUser;