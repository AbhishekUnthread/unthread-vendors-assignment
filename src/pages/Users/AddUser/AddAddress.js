import React, { useState } from "react";
import "./AddUser.scss";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

// ! COMPONENT IMPORTS
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import AppStateSelect from "../../../components/AppStateSelect/AppStateSelect";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import AppCitySelect from "../../../components/AddCitySelect/AddCitySelect";
// ! IMAGES IMPORTS
import archivedGrey from "../../../assets/icons/archivedGrey.svg";
import editGrey from "../../../assets/icons/editGrey.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Chip,
} from "@mui/material";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

const AddAddress = ({ customerAddressDetails }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

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
      customerAddressDetails(values)
      console.log(values, 'values for creating customers')
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

   const getCityName = (value) => {
    customerAddressFormik.setFieldValue("city", value)
  }

  const SelectCityName = (event, value) => {
    customerAddressFormik.setFieldValue("city", event)
  }

  // ? ADDRESS STARTS HERE
  const [address, setAddress] = React.useState(false);

  const handleAddressChange = () => {
    setAddress(prevState => !prevState)
  };
  // ? ADDRESS ENDS HERE
  // ? ADDRESS STARTS HERE
  const [savedAddress, setSavedAddress] = React.useState(false);

  // ? ADDRESS ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
        <div className="d-flex col-12 px-0 justify-content-between">
            <div className="d-flex align-items-center">
            <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                Addresses
            </h6>
            </div>

            <p className="button-gradient py-2 px-3" onClick={handleAddressChange}>
                <p className="">+ Add Address</p>
            </p>
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
                            {/* <FormControl className="w-100 px-0">
                                <OutlinedInput
                                    placeholder="Enter Town/City"
                                    size="small"
                                    name="city"
                                    value={customerAddressFormik.values.city}
                                    onChange={customerAddressFormik.handleChange}
                                />
                            </FormControl> */}
                            <AppCitySelect 
                                value={customerAddressFormik.values.city}
                                getCityName={getCityName}
                                SelectCityName={SelectCityName}
                                name="city" 
                            />

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
