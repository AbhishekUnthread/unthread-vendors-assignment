import { useState, forwardRef, useEffect, useReducer } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
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

import { 
    useEditCustomerAddressMutation 
} from "../../../features/customers/customerAddress/customerAddressApiSlice";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import { useGetAllCountryQuery } from "../../../features/master/country/countryApiSlice";

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

const AddAddress = ({ customerAddressDetails, data, deleteAddress }) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState([]);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [addressState, dispatchAddress] = useReducer(
    addressTabReducer,
    initialAddressState
  );

  const [
    editCustomerAddress,
    {
      data: editAddress,
      isLoading: editAddressIsLoading,
      isSuccess: editAddressIsSuccess,
      error: editAddressError,
    }
  ] = useEditCustomerAddressMutation();

  const {
    data: countryData,
    isLoading: countryIsLoading,
    isSuccess: countryIsSuccess,
    error: countryError,
  } = useGetAllCountryQuery({ createdAt: -1 });

  console.log( data, ' data?.country');

  const customerAddressFormik = useFormik({
    initialValues: {
      name: data?.name || "",
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      companyName: data?.companyName || "",
      countryCode: data?.countryCode || "",
      country: data?.country?._id || "",
      phone: data?.phone || "",
      line1: data?.line1 || "",
      line2: data?.line2 || "",
      city: data?.city?._id || "",
      pinCode: data?.pinCode || "",
      state: data?.state?._id || "",
      isDefaultAddress: data?.isDefaultAddress || false,
    },
    enableReinitialize: true,
    // validationSchema: customerAddressValidation,
    onSubmit: (values) => {
        console.log(values, 'values valuesvaluesvalues');
      for (const key in values) {
        if(values[key] === "" || values[key] === null){
          delete values[key] 
        }
      }
      customerAddressDetails([values]);
      setAddress((prevAddresses) => [...prevAddresses, values]);
      setOpenNewUser(false)
      if(data?._id) {
        editCustomerAddress({
            id: data?._id,
            details : values
        })
            .unwrap()
            .then(() => {
                dispatch(showSuccess({ message: "Custormer edited successfully" }));
            });
      }
    },
  });

  const handleCode = (event, value) => {
    customerAddressFormik.setFieldValue("countryCode", value?._id)
  };

  const selectedCode = countryData?.data?.data.find(country => 
    country._id === customerAddressFormik.values.countryCode 
  );

  const selectCountryName = (event, value) => {
    customerAddressFormik.setFieldValue("country", value?._id)
  }

  const getStateName = (event, value) => {
        console.log(value, 'value state');
            console.log(event, 'event state');

    customerAddressFormik.setFieldValue("state", value?._id)
  }

  const SelectCityName = (event, value) => {
        console.log(value, 'value city');
        console.log(event, 'event city');

    customerAddressFormik.setFieldValue("city", value?._id)
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

  const handleNewAddress = () => {
    customerAddressFormik.resetForm();
    setOpenNewUser(true);
  }

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
        <div className="d-flex col-12 px-0 justify-content-between">
            <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                    Adresses
                </h6>
            </div>

            <p className="button-gradient py-2 px-3" onClick={handleNewAddress}>
                <p className="">+ Add Adress</p>
            </p>
        </div>
        {address.map((address, index) => (
            <div className="col-12 mt-3" key={index}>
                <div
                    className="row py-3 mb-3 rounded-8"
                    style={{ background: "rgba(39, 40, 63, 0.5)" }}
                >
                    <div className="col-12 d-flex justify-content-between align-items-center mb-2 px-3">
                        <p className="text-lightBlue">{address?.name}</p>
                        <div className="d-flex align-items-center">
                            <Chip label="Default" size="small" className="px-2" />
                            <img
                                src={editGrey}
                                alt="editGrey"
                                className="c-pointer ms-3"
                                width={16}
                                onClick={handleNewUser}
                            />
                            <img
                                src={archivedGrey}
                                alt="archiverdGrey"
                                className="c-pointer ms-3"
                                width={16}
                                onClick={() => deleteAddress(address)}
                            />
                        </div>
                    </div>
                    <div className="col-12 px-3">
                        <small className="text-lightBlue d-block">
                            {address?.firstName} {address?.lastName}
                        </small>
                        <small className="text-lightBlue d-block">
                            {address?.line1}
                        </small>
                        <small className="text-lightBlue d-block">
                            {address?.city}-{address?.pinCode}, {address?.state}, {address?.city}
                        </small>
                        <small className="text-lightBlue d-block">
                            {selectedCode?.countryCode} {address?.phone}
                        </small>
                    </div>
                </div>
            </div>
        ))}

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
                        <h5 className="text-lightBlue fw-500">Create New Address</h5>

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
                        <p className="text-lightBlue mb-1">Name <span style={{color: "red"}}>*</span></p>
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
                        <p className="text-lightBlue mb-1">First Name <span style={{color: "red"}}>*</span></p>
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
                        <p className="text-lightBlue mb-1">Last Name <span style={{color: "red"}}>*</span></p>
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
                        <p className="text-lightBlue mb-1">Mobile Number <span style={{color: "red"}}>*</span></p>
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
                                        formik={customerAddressFormik}
                                        handleCode={handleCode}
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
                    <div className="col-md-6 mt-3">
                        <p className="text-lightBlue mb-1">Address Line 1 <span style={{color: "red"}}>*</span></p>
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
                        <p className="text-lightBlue mb-1">Town/City <span style={{color: "red"}}>*</span></p>
                        <AppCitySelect 
                            formik={customerAddressFormik}
                            SelectCityName={SelectCityName}
                        />
                        {!!customerAddressFormik.touched.city && 
                        customerAddressFormik.errors.city && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.city}
                            </FormHelperText>
                        )}
                    </div>
                    <div className="col-md-6 mt-3">
                        <p className="text-lightBlue mb-1">Zipcode/Postalcode <span style={{color: "red"}}>*</span></p>
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
                            <p className="text-lightBlue mb-1">State or Region <span style={{color: "red"}}>*</span></p>
                            {/* <small className="text-grey-6 mb-1">(Optional)</small> */}
                        </div>
                        <AppStateSelect 
                            formik={customerAddressFormik}
                            getStateName={getStateName}
                        />
                        {!!customerAddressFormik.touched.state && 
                        customerAddressFormik.errors.state && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.state}
                            </FormHelperText>
                        )}
                    </div>
                    <div className="col-md-12 mt-3 add-user-country">
                        <p className="text-lightBlue mb-1">Country <span style={{color: "red"}}>*</span></p>
                        <AppCountrySelect 
                            selectCountryName={selectCountryName}
                            formik={customerAddressFormik}
                        />
                        {!!customerAddressFormik.touched.country && 
                        customerAddressFormik.errors.country && (
                            <FormHelperText error>
                                {customerAddressFormik.errors.country}
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