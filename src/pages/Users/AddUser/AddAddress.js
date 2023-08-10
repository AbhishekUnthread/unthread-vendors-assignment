import { useState, forwardRef, useEffect, useReducer } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Chip,
  Slide
} from "@mui/material";

import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import AppStateSelect from "../../../components/AppStateSelect/AppStateSelect";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import AppCitySelect from "../../../components/AddCitySelect/AddCitySelect";

import archivedGrey from "../../../assets/icons/archivedGrey.svg";
import editGrey from "../../../assets/icons/editGrey.svg";
import cancel from "../../../assets/icons/cancel.svg";

import "./AddUser.scss";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialAddressState = {
  confirmationMessage: "",
  isEditing: false,
};

const addressTabReducer = (state, action) => {
  if (action.type === "ENABLE_EDIT") {
    return {
      ...initialAddressState,
      isEditing: true,
    };
  }
  if (action.type === "DISABLE_EDIT") {
    return {
      ...initialAddressState,
      isEditing: false,
    };
  }

  return initialAddressState;
};

const customerAddressValidation = Yup.object({
  name: Yup.string().trim().min(3).required("Required"),
  firstName: Yup.string().trim().min(3).required("Required"),
  lastName: Yup.string().trim().min(3).required("Required"),
  countryCode: Yup.string().required("Required"),
  phone: Yup.number().required("Required"),
  country: Yup.string().required("Required"),
  line1: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  pinCode: Yup.number().required("Required"),
  state: Yup.string().required("Required"),
});

const AddAddress = ({ customerAddressDetails, data }) => {
  const [address, setAddress] = useState(false);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [addressState, dispatchAddress] = useReducer(
    addressTabReducer,
    initialAddressState
  );

  const customerAddressFormik = useFormik({
    initialValues: {
      name: data?.name || "",
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      companyName: data?.companyName || "",
      countryCode: data?.countryCode || "",
      country: data?.country?.name || "",
      phone: data?.phone || "",
      line1: data?.line1 || "",
      line2: data?.line2 || "",
      city: data?.city?.name || "",
      pinCode: data?.pinCode || "",
      state: data?.state?.name || "",
      isDefaultAddress: data?.isDefaultAddress || false,
    },
    enableReinitialize: true,
    validationSchema: customerAddressValidation,
    onSubmit: (values) => {
                console.log(values, 'values valuesvalues');

      for (const key in values) {
        if(values[key] === "" || values[key] === null){
          delete values[key] 
        }
      }
      customerAddressDetails(values);
      setOpenNewUser(false);
    },
  });

  const handleAddressChange = () => {
    setAddress(prevState => !prevState)
  };

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

  const handleNewUser = () => {
    setOpenNewUser(true);
  };

  const handleNewUserClose = () => {
    setOpenNewUser(false);
  };

  useEffect(() => {
    if (!_.isEqual(customerAddressFormik.values, customerAddressFormik.initialValues)) {
      dispatchAddress({ type: "ENABLE_EDIT" });
    } else if (_.isEqual(customerAddressFormik.values, customerAddressFormik.initialValues)) {
      dispatchAddress({ type: "DISABLE_EDIT" });
    }
  }, [customerAddressFormik.initialValues, customerAddressFormik.values]);

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
        <div className="d-flex col-12 px-0 justify-content-between">
            <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                    Adresses
                </h6>
            </div>

            <p className="button-gradient py-2 px-3" onClick={handleNewUser}>
                <p className="">+ Add Adress</p>
            </p>
        </div>
        {customerAddressFormik && (
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
                            {customerAddressFormik.values.firstName} {customerAddressFormik.values.lastName}
                        </small>
                        <small className="text-lightBlue d-block">
                            {customerAddressFormik.values.line1}
                        </small>
                        <small className="text-lightBlue d-block">
                            {customerAddressFormik.values.city}-{customerAddressFormik.values.pinCode}, {customerAddressFormik.values.state}, {customerAddressFormik.values.city}
                        </small>
                        <small className="text-lightBlue d-block">
                            {customerAddressFormik.values.countryCode} {customerAddressFormik.values.phone}
                        </small>
                    </div>
                </div>
            </div>
        )}

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
            </DialogTitle>
            <DialogContent className="pb-4 px-4">
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
                        {!!customerAddressFormik.touched.name && 
                        customerAddressFormik.errors.name && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.name}
                            </FormHelperText>
                        )}
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
                        {!!customerAddressFormik.touched.firstName && 
                        customerAddressFormik.errors.firstName && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.firstName}
                            </FormHelperText>
                        )}
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
                        {!!customerAddressFormik.touched.lastName && 
                        customerAddressFormik.errors.lastName && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.lastName}
                            </FormHelperText>
                        )}
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
                        { (!!customerAddressFormik.touched.countryCode || 
                            !!customerAddressFormik.touched.phone) 
                            && (customerAddressFormik.errors.countryCode || 
                            customerAddressFormik.errors.phone) && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.countryCode || 
                                customerAddressFormik.errors.phone}
                            </FormHelperText>
                        )}
                    </div>
                    <div className="col-md-12 mt-3 add-user-country">
                        <p className="text-lightBlue mb-1">Country</p>
                        <AppCountrySelect 
                            value={customerAddressFormik.values.country}
                            GetCountryName={GetCountryName}
                            SelectCountryName={SelectCountryName}
                            name="country" 
                        />
                        {!!customerAddressFormik.touched.country && 
                        customerAddressFormik.errors.country && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.country}
                            </FormHelperText>
                        )}
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
                        {!!customerAddressFormik.touched.line1 && 
                        customerAddressFormik.errors.line1 && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.line1}
                            </FormHelperText>
                        )}
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
                        <AppCitySelect 
                            value={customerAddressFormik.values.city}
                            getCityName={getCityName}
                            SelectCityName={SelectCityName}
                            name="city" 
                        />
                        {!!customerAddressFormik.touched.city && 
                        customerAddressFormik.errors.city && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.city}
                            </FormHelperText>
                        )}
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
                        {!!customerAddressFormik.touched.city && 
                        customerAddressFormik.errors.city && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.city}
                            </FormHelperText>
                        )}
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
                        {!!customerAddressFormik.touched.state && 
                        customerAddressFormik.errors.state && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.state}
                            </FormHelperText>
                        )}
                    </div>
                </div>
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
                    onClick={() => customerAddressFormik.handleSubmit()}
                >
                    <p>Create</p>
                </button>
            </DialogActions>
        </Dialog>
    </div>
  );
};

export default AddAddress;
