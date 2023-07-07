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

const AddAddress = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    createCustomerAddress,
    {
      isLoading: createCustomerAddressIsLoading,
      isSuccess: createCustomerAddressIsSuccess,
      error: createCustomerAddressError,
    },
  ] = useCreateCustomerAddressMutation();

  const customerAddressFormik = useFormik({
    initialValues: {
      name: "",
      firstName: "",
      lastName: "",
      companyName: "",
      phone: "",
      line1: "",
      isDefaultAddress: false,
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

  const GetCountryCode = (value) => {
    customerAddressFormik.setFieldValue("countryCode", value)
  }

  const SelectCountryCode = (event, value) => {
    customerAddressFormik.setFieldValue("countryCode", event)
  }

  const GetCountryName = (value) => {
    customerAddressFormik.setFieldValue("country", value)
  }

  const SelectCountryName = (event, value) => {
    customerAddressFormik.setFieldValue("country", event)
  }

  const getStateName = (value) => {
    customerAddressFormik.setFieldValue("state", value)
  }

  const SelectStateName = (event, value) => {
    customerAddressFormik.setFieldValue("state", event)
  }

  // ? ADDRESS STARTS HERE
  const [address, setAddress] = React.useState(false);

  const handleAddressChange = () => {
    setAddress(prevState => !prevState)
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
            // <form noValidate onSubmit={customerAddressFormik.handleSubmit}>
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
                                    name="isDefaultAddress"
                                    value={customerAddressFormik.values.isDefaultAddress}
                                    onChange={customerAddressFormik.handleChange}
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
                                        <AppMobileCodeSelect 
                                            value={customerAddressFormik.values.countryCode}
                                            GetCountryCode={GetCountryCode}
                                            SelectCountryCode = {SelectCountryCode}
                                            name="countryCode" 
                                        />
                                    </InputAdornment>
                                }
                                />
                            </FormControl>
                        </div>
                        <div className="col-md-12 mt-3 add-user-country">
                            <p className="text-lightBlue mb-1">Country</p>
                            <AppCountrySelect 
                                value={customerAddressFormik.values.country}
                                GetCountryName={GetCountryName}
                                SelectCountryName={SelectCountryName}
                                name="country" 
                            />
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
                                    name="line2"
                                    value={customerAddressFormik.values.line2}
                                    onChange={customerAddressFormik.handleChange}
                                />
                            </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                            <p className="text-lightBlue mb-1">Town/City</p>
                            <FormControl className="w-100 px-0">
                                <OutlinedInput
                                    placeholder="Enter Town/City"
                                    size="small"
                                    name="city"
                                    value={customerAddressFormik.values.city}
                                    onChange={customerAddressFormik.handleChange}
                                />
                            </FormControl>
                        </div>
                        <div className="col-md-6 mt-3">
                            <p className="text-lightBlue mb-1">Zipcode/Postalcode</p>
                            <FormControl className="w-100 px-0">
                                <OutlinedInput
                                    placeholder="Enter Zipcode/Postalcode"
                                    size="small"
                                    name="pinCode"
                                    value={customerAddressFormik.values.pinCode}
                                    onChange={customerAddressFormik.handleChange}
                                />
                            </FormControl>
                        </div>
                        <div className="col-md-12 mt-3  add-user-country">
                        <div className="d-flex align-items-center justify-content-between">
                            <p className="text-lightBlue mb-1">State or Region</p>
                            <small className="text-grey-6 mb-1">(Optional)</small>
                        </div>
                        <AppStateSelect 
                            value={customerAddressFormik.values.state}
                            getStateName={getStateName}
                            SelectStateName={SelectStateName}
                            name="state" 
                        />
                        </div>
                        <div className="col-12 mt-4 d-flex justify-content-between">
                        <Link
                            onClick={handleAddressChange}
                            className="button-red-outline py-2 px-4"
                        >
                            <p>Discard</p>
                        </Link>

                        <button
                            type="button"
                            onClick={() => customerAddressFormik.handleSubmit()}
                            className="button-gradient py-2 px-4 w-auto"
                        >
                            <p>Save</p>
                        </button>
                        </div>
                    </div>
                </div>
            // </form>
        )}
    </div>
  );
};

export default AddAddress;
