import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import AppStateSelect from "../../../components/AppStateSelect/AppStateSelect";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import StatusBox from "../../../components/StatusBox/StatusBox";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import addMedia from "../../../assets/icons/addMedia.svg";
import info from "../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateStoreMutation } from "../../../features/products/inventory/inventoryApiSlice";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import AppCitySelect from "../../../components/AppCitySelect/AppCitySelect";
import AppGenericSelect from "../../../components/AppGenericSelect/AppGenericSelect";
import { useGetAllCityQuery } from "../../../features/master/city/cityApiSlice";
import { useGetAllStateQuery } from "../../../features/master/state/stateApiSlice";
import { useGetAllCountryQuery } from "../../../features/master/country/countryApiSlice";
// import MapDirections from "../../../components/GoogleMapDirections/GoogleMapDirections/GoogleMapDirections";

const storeInitialValue = {
  name: "",
  phone: "",
  email: "",
  countryCode: "",
  isDefault: false,
  status: "active",
  managerDetails: {
    fullName: "",
    countryCode: "",
    phone: "",
    email: "",
  },
  address: {
    country: "",
    line1: "",
    line2: "",
    city: "",
    pincode: "",
    state: "",
    lattitude: "",
    longitude: "",
  },
  storeHours: {
    monday: {
      status: "open",
      to: "",
      from: "",
    },
    tuesday: {
      status: "open",
      to: "",
      from: "",
    },
    wednesday: {
      status: "open",
      to: "",
      from: "",
    },
    thursday: {
      status: "open",
      to: "",
      from: "",
    },
    friday: {
      status: "open",
      to: "",
      from: "",
    },
    saturday: {
      status: "open",
      to: "",
      from: "",
    },
    sunday: {
      status: "closed",
      to: "",
      from: "",
    },
  },
  mediaUrl: [],
  notes: "",
  settings: {
    fullfillOnlineOrder: true,
    enableStorePickup: true,
  },
};

const dayObj = {
  status: Yup.string().oneOf(["closed", "open"]),
  from: Yup.string().when("status", (status, schema) =>
    status === "open" ? schema.required("required") : schema.nullable(true)
  ),
  to: Yup.string().when("status", (status, schema) =>
    status === "open" ? schema.required("required") : schema.nullable(true)
  ),
};

const storeValidationSchema = Yup.object({
  name: Yup.string().trim().required("required"),
  countryCode: Yup.string().trim().required("required"),
  phone: Yup.number().required("required"),
  email: Yup.string().trim().email("email is not valid").required("required"),
  status: Yup.string().oneOf(["active", "in-active"]),
  managerDetails: Yup.object({
    fullName: Yup.string().trim(),
    countryCode: Yup.string().trim(),
    phone: Yup.number(),
    email: Yup.string().trim().email("email is not valid"),
  }),
  address: Yup.object({
    country: Yup.string().required("required"),
    line1: Yup.string().required("required"),
    line2: Yup.string(),
    city: Yup.string().required("required"),
    pincode: Yup.number().required("required"),
    state: Yup.string().required("required"),
    lattitude: Yup.string(),
    longitude: Yup.string(),
  }),
  storeHours: Yup.object({
    monday: Yup.object(dayObj),
    tuesday: Yup.object(dayObj),
    wednesday: Yup.object(dayObj),
    thursday: Yup.object(dayObj),
    friday: Yup.object(dayObj),
    saturday: Yup.object(dayObj),
    sunday: Yup.object(dayObj),
  }),
  mediaUrl: Yup.array(),
  notes: Yup.string(),
  settings: Yup.object({
    fullfillOnlineOrder: Yup.boolean(),
    enableStorePickup: Yup.boolean(),
  }),
});

const CreateStore = () => {
  const navigate = useNavigate();
  const [createStore] = useCreateStoreMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: storeInitialValue,
    validationSchema: storeValidationSchema,
    onSubmit: (values) => {
      // console.log({ values });
      createStore(values)
        .unwrap()
        .then(() => navigate("/products/inventory"))
        .catch((e) => console.log(e));
    },
  });

  console.log(formik.touched);
  // console.log(formik.errors);
  // console.log(formik.values);

  const updateStateValue = (value) => formik.setFieldValue("address.state", value);
  const updateCountryValue = (value) => formik.setFieldValue("address.country", value);
  const updateStoreStatus = (value, status) => formik.setFieldValue("status", status);
  // const updateMediaUrl = (value) => formik.setFieldValue("mediaUrl", value ?? "");
  const updateCountryCodeValue = (value) => formik.setFieldValue("countryCode", value ?? "");
  const updateManagerDetailsCountryCodeValue = (value) =>
    formik.setFieldValue("managerDetails.countryCode", value ?? "");

  const setDayToTimings = (dayName = "", timeValue = "") => formik.setFieldValue(`storeHours.${dayName}.to`, timeValue);
  const setDayFromTimings = (dayName = "", timeValue = "") =>
    formik.setFieldValue(`storeHours.${dayName}.from`, timeValue);
  const resetDayTimings = (dayName = "") => {
    formik.setFieldValue(`storeHours.${dayName}.to`, "10:00");
    formik.setFieldValue(`storeHours.${dayName}.from`, "18:30");
  };

  const addressStateHandler = (_, value) => {
    formik.setFieldValue("address.state", value?._id || "");
  };

  const changeCityHandler = (_, value) => formik.setFieldValue("address.city", value?._id ?? "");
  const changeStateHandler = (_, value) => formik.setFieldValue("address.state", value?._id ?? "");
  const changeCountryHandler = (_, value) => formik.setFieldValue("address.country", value?._id ?? "");

  const changeManagerCountryCodeHandler = (_, value) =>
    formik.setFieldValue("managerDetails.countryCode", value?._id ?? "");

  return (
    <form
      noValidate
      className="page container-fluid position-relative"
      onSubmit={formik.handleSubmit}>
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link
            to="/products/inventory"
            className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <h5 className="page-heading ms-2 ps-1">Create Store</h5>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">Store Information</h6>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" />
            <div className="col-12 px-0">
              <div className="row align-items-start">
                <div className="col-md-12 mt-3">
                  <div className="d-flex">
                    <p className="text-lightBlue mb-1">Store Name</p>
                    <Tooltip
                      title="Lorem ipsum"
                      placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="ms-2 c-pointer"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Store Name"
                      size="small"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormHelperText error>{formik.touched.name && formik.errors.name}</FormHelperText>
                  </FormControl>
                </div>
                <div className="col-md-12 mt-3">
                  <p className="text-lightBlue mb-1">Mobile Number</p>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Mobile Number"
                      size="small"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      sx={{ paddingLeft: 0 }}
                      startAdornment={
                        <InputAdornment position="start">
                          <AppGenericSelect
                            hasImg
                            dataId="_id"
                            dataLabel="countryCode"
                            dataImgUrl="imageUrl"
                            name="countryCode"
                            value={formik.values.countryCode}
                            error={formik.touched.countryCode ? formik.errors.countryCode : ""}
                            onChange={changeCityHandler}
                            formik={formik}
                            useGetQuery={useGetAllCountryQuery}
                            getQueryFilters={{ createdAt: -1 }}
                          />
                          {/* <AppMobileCodeSelect
                            GetCountryCode={updateCountryCodeValue}
                            SelectCountryCode={updateCountryCodeValue}
                          /> */}
                        </InputAdornment>
                      }
                    />
                    <FormHelperText error>{formik.touched.phone && formik.errors.phone}</FormHelperText>
                  </FormControl>
                </div>
                <div className="col-md-12 mt-3">
                  <div className="d-flex">
                    <p className="text-lightBlue mb-1">Email ID</p>
                    <Tooltip
                      title="Lorem ipsum"
                      placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="ms-2 c-pointer"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Email ID"
                      size="small"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormHelperText error>{formik.touched.email && formik.errors.email}</FormHelperText>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="d-flex col-12 px-0 justify-content-between">
              <h6 className="text-lightBlue me-auto text-lightBlue fw-500">Addresses</h6>
            </div>

            <div className="col-md-6 ps-0 mt-3">
              <p className="text-lightBlue mb-1">Address Line 1</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Address Line 1"
                  size="small"
                  name="address.line1"
                  value={formik.values.address.line1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormHelperText error>{formik.touched.address?.line1 && formik.errors.address?.line1}</FormHelperText>
              </FormControl>
            </div>
            <div className="col-md-6 pe-0 mt-3">
              <div className="d-flex align-items-center justify-content-between">
                <p className="text-lightBlue mb-1">Address Line 2</p>
                <small className="text-grey-6 mb-1">(Optional)</small>
              </div>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Address Line 2"
                  size="small"
                  name="address.line2"
                  value={formik.values.address.line2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormHelperText error>{formik.touched.address?.line2 && formik.errors.address?.line2}</FormHelperText>
              </FormControl>
            </div>

            <div className="col-md-6 ps-0 mt-3">
              <p className="text-lightBlue mb-1">Town / City</p>

              <AppGenericSelect
                name="address.city"
                dataId="_id"
                dataLabel="name"
                value={formik.values.address.city}
                error={formik.touched.address?.city ? formik.errors.address?.city : ""}
                onChange={changeCityHandler}
                formik={formik}
                useGetQuery={useGetAllCityQuery}
                getQueryFilters={{ createdAt: -1 }}
              />
              {/* <AppCitySelect
                name="address.city"
                GetCountryName={updateCityValue}
                SelectCityName={updateCityValue}
              /> */}
            </div>

            <div className="col-md-6 pe-0 mt-3">
              <p className="text-lightBlue mb-1">Zipcode / Postalcode</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Zipcode / Postalcode"
                  size="small"
                  name="address.pincode"
                  value={formik.values.address.pincode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormHelperText error>
                  {formik.touched.address?.pincode && formik.errors.address?.pincode}
                </FormHelperText>
              </FormControl>
            </div>

            <div className="col-md-12 px-0 mt-3 add-user-country">
              <p className="text-lightBlue mb-1">State or Region</p>
              <AppGenericSelect
                name="address.state"
                dataId="_id"
                dataLabel="name"
                value={formik.values.address.state}
                error={formik.touched.address?.state ? formik.errors.address?.state : ""}
                onChange={changeStateHandler}
                formik={formik}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                useGetQuery={useGetAllStateQuery}
                getQueryFilters={{ createdAt: -1 }}
              />
              {/* <AppStateSelect
                name="address.state"
                // getStateName={updateStateValue}
                // SelectStateName={updateStateValue}
                onChange={addressStateHandler}
                onBlur={formik.handleBlur}
                value={formik.values.address.state}
              /> */}
            </div>

            <div className="col-md-12 px-0 mt-3 add-user-country">
              <p className="text-lightBlue mb-1">Country</p>
              <AppGenericSelect
                name="address.country"
                dataId="_id"
                dataLabel="name"
                value={formik.values.address.country}
                error={formik.touched.address?.country ? formik.errors.address?.country : ""}
                onChange={changeCountryHandler}
                formik={formik}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                useGetQuery={useGetAllCountryQuery}
                getQueryFilters={{ createdAt: -1 }}
              />
              {/* <AppCountrySelect
                name="address.country"
                GetCountryName={updateCountryValue}
                SelectCountryName={updateCountryValue}
              /> */}
            </div>

            <div className="col-12 px-0 mt-3">
              {/* <MapDirections /> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                tabIndex="0"
                title="store map"></iframe>
            </div>
            <div className="col-md-6 mt-3 ps-0">
              <p className="text-lightBlue mb-1">Latitude</p>
              <FormControl className="w-100">
                <OutlinedInput
                  placeholder="Enter Latitude"
                  size="small"
                  name="address.lattitude"
                  value={formik.values.address.lattitude}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormHelperText error>
                  {formik.touched.address?.lattitude && formik.errors.address?.lattitude}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="col-md-6 mt-3 pe-0">
              <p className="text-lightBlue mb-1">Longitude</p>
              <FormControl className="w-100">
                <OutlinedInput
                  placeholder="Enter Longitude"
                  size="small"
                  name="address.longitude"
                  value={formik.values.address.longitude}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormHelperText error>
                  {formik.touched.address?.longitude && formik.errors.address?.longitude}
                </FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4 row attributes">
            <div className="d-flex col-12 px-0 mb-4  justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">Store Hours</h6>
                <Tooltip
                  title="Lorem ipsum"
                  placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
            </div>
            <StoreHoursWeekDay
              dayName="monday"
              dayValues={formik.values.storeHours.monday}
              formikHandleChange={formik.handleChange}
              onFromTimeChange={setDayFromTimings}
              onToTimeChange={setDayToTimings}
              resetDayTimings={resetDayTimings}
            />

            <StoreHoursWeekDay
              dayName="tuesday"
              dayValues={formik.values.storeHours.tuesday}
              formikHandleChange={formik.handleChange}
              onFromTimeChange={setDayFromTimings}
              onToTimeChange={setDayToTimings}
              resetDayTimings={resetDayTimings}
            />

            <StoreHoursWeekDay
              dayName="wednesday"
              dayValues={formik.values.storeHours.wednesday}
              formikHandleChange={formik.handleChange}
              onFromTimeChange={setDayFromTimings}
              onToTimeChange={setDayToTimings}
              resetDayTimings={resetDayTimings}
            />

            <StoreHoursWeekDay
              dayName="thursday"
              dayValues={formik.values.storeHours.thursday}
              formikHandleChange={formik.handleChange}
              onFromTimeChange={setDayFromTimings}
              onToTimeChange={setDayToTimings}
              resetDayTimings={resetDayTimings}
            />

            <StoreHoursWeekDay
              dayName="friday"
              dayValues={formik.values.storeHours.friday}
              formikHandleChange={formik.handleChange}
              onFromTimeChange={setDayFromTimings}
              onToTimeChange={setDayToTimings}
              resetDayTimings={resetDayTimings}
            />

            <StoreHoursWeekDay
              dayName="saturday"
              dayValues={formik.values.storeHours.saturday}
              formikHandleChange={formik.handleChange}
              onFromTimeChange={setDayFromTimings}
              onToTimeChange={setDayToTimings}
              resetDayTimings={resetDayTimings}
            />

            <StoreHoursWeekDay
              dayName="sunday"
              dayValues={formik.values.storeHours.sunday}
              formikHandleChange={formik.handleChange}
              onFromTimeChange={setDayFromTimings}
              onToTimeChange={setDayToTimings}
              resetDayTimings={resetDayTimings}
            />

            {/*  */}
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4 row attributes">
            <div className="d-flex col-12 px-0 justify-content-between">
              <h6 className="text-lightBlue fw-500">Manager Info</h6>
              <small className="text-grey-6 mb-1">(Optional)</small>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" />
            <div className="col-12 px-0">
              <div className="row align-items-start">
                <div className="col-md-12 mt-3">
                  <div className="d-flex">
                    <p className="text-lightBlue mb-1">Manager Name</p>
                    <Tooltip
                      title="Lorem ipsum"
                      placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="ms-2 c-pointer"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Manager Name"
                      size="small"
                      name="managerDetails.fullName"
                      value={formik.values.managerDetails.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormHelperText error>
                      {formik.touched.managerDetails?.fullName && formik.errors.managerDetails?.fullName}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className="col-md-12 mt-3">
                  <p className="text-lightBlue mb-1">Mobile Number</p>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Mobile Number"
                      size="small"
                      name="managerDetails.phone"
                      value={formik.values.managerDetails.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      sx={{ paddingLeft: 0 }}
                      startAdornment={
                        <InputAdornment position="start">
                          <AppGenericSelect
                            hasImg
                            dataId="_id"
                            dataLabel="countryCode"
                            dataImgUrl="imageUrl"
                            name="managerDetails.countryCode"
                            value={formik.values.managerDetails.countryCode}
                            error={
                              formik.touched.managerDetails?.countryCode
                                ? formik.errors.managerDetails?.countryCode
                                : ""
                            }
                            onChange={changeManagerCountryCodeHandler}
                            formik={formik}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            useGetQuery={useGetAllCountryQuery}
                            getQueryFilters={{ createdAt: -1 }}
                          />
                          {/* <AppMobileCodeSelect
                            GetCountryCode={updateManagerDetailsCountryCodeValue}
                            SelectCountryCode={updateManagerDetailsCountryCodeValue}
                          /> */}
                        </InputAdornment>
                      }
                    />
                    <FormHelperText error>
                      {formik.touched.managerDetails?.phone && formik.errors.managerDetails?.phone}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className="col-md-12 mt-3">
                  <p className="text-lightBlue mb-1">Email ID</p>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Email ID"
                      size="small"
                      name="managerDetails.email"
                      value={formik.values.managerDetails.email}
                      onChange={formik.handleChange}
                      onBlur={formik.onBlur}
                    />
                    <FormHelperText error>
                      {formik.touched.managerDetails?.email && formik.errors.managerDetails?.email}
                    </FormHelperText>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4 row attributes">
            <div className="d-flex col-12 px-0 justify-content-between">
              <h6 className="text-lightBlue me-auto text-lightBlue fw-500">Setting</h6>
            </div>

            <FormControl className="w-100 px-0">
              <div className="d-flex align-items-center mt-3 col-12 px-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="settings.fullfillOnlineOrder"
                      checked={formik.values.settings.fullfillOnlineOrder}
                      onChange={formik.handleChange}
                      onBlur={formik.onBlur}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                  }
                  label="Fulfill online orders from this location"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#C8D8FF",
                    },
                  }}
                />
                <Tooltip
                  title="Lorem ipsum"
                  placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-1 c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <FormHelperText error>
                {formik.touched.settings?.fullfillOnlineOrder && formik.errors.settings?.fullfillOnlineOrder}
              </FormHelperText>
            </FormControl>

            <FormControl className="w-100 px-0">
              <div className="d-flex align-items-center mt-1 col-12 px-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="settings.enableStorePickup"
                      checked={formik.values.settings.enableStorePickup}
                      onChange={formik.handleChange}
                      onBlur={formik.onBlur}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                      }}
                    />
                  }
                  label="Enable Store Pickup"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      color: "#C8D8FF",
                    },
                  }}
                />
                <Tooltip
                  title="Lorem ipsum"
                  placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-1 c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <FormHelperText error>
                {formik.touched.settings?.enableStorePickup && formik.errors.settings?.enableStorePickup}
              </FormHelperText>
            </FormControl>
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <StatusBox
            name={"status"}
            value={formik?.values?.status}
            handleProductStatus={updateStoreStatus}
            headingName={"Store Status"}
          />
          <div className="mt-4">
            <UploadMediaBox
              name="mediaUrl"
              // value={formik?.values?.mediaUrl}
              imageName={addMedia}
              headingName={"Store Media"}
              // UploadChange={updateMediaUrl}
              isUploaded={() => {}}
            />
          </div>
          {/* <TagsBox /> */}
          <NotesBox
            name="notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="row bottom-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link
            to="/products/inventory"
            className="button-red-outline py-2 px-4">
            <p>Discard</p>
          </Link>

          {/* <Link
            to="/users/allUsers"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link> */}
        </div>
        <div className="d-flex w-auto px-0">
          {/* <Link
            to="/users/allUsers"
            className="button-lightBlue-outline py-2 px-4 ms-3">
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/users/allUsers"
            className="button-gradient py-2 px-4 w-auto ms-3">
            <p>Save</p>
          </Link> */}
          <button
            type="button"
            // to="/users/allUsers"
            className="button-lightBlue-outline py-2 px-4 ms-3">
            <p>Save & Add Another</p>
          </button>
          <button
            type="submit"
            // to="/users/allUsers"
            className="button-gradient py-2 px-4 w-auto ms-3">
            <p>Save</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateStore;

function StoreHoursWeekDay({
  dayName = "",
  dayValues = {},
  formikHandleChange = () => {},
  onFromTimeChange = () => {},
  onToTimeChange = () => {},
  resetDayTimings = () => {},
}) {
  const handleStatusChange = (e) => {
    if (e.target.value) resetDayTimings(dayName);
    formikHandleChange(e);
  };

  const [from, setFrom] = useState(moment(dayValues.from, "HH:mm"));
  const handleFromChange = (newValue) => {
    setFrom(newValue);
    onFromTimeChange(dayName, newValue.format("HH:mm"));
  };

  const [to, setTo] = useState(moment(dayValues.to, "HH:mm"));
  const handleToChange = (newValue) => {
    setTo(newValue);
    onToTimeChange(dayName, newValue.format("HH:mm"));
  };

  return (
    <div className="col-12">
      <div className="row align-items-center py-2">
        <div className="col-2">
          <span className="text-lightBlue text-capitalize">{dayName}</span>
        </div>
        <div className="col-3">
          <FormControl
            size="small"
            className="w-100">
            <Select
              size="small"
              variant="outlined"
              name={`storeHours.${dayName}.status`}
              onChange={handleStatusChange}
              value={dayValues.status}>
              <MenuItem value="closed">Closed</MenuItem>
              <MenuItem value="open">Open</MenuItem>
            </Select>
          </FormControl>
        </div>
        {dayValues.status === "open" && (
          <>
            <div className="col-3">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="Start Time"
                  value={from}
                  onChange={handleFromChange}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="col-auto">-</div>
            <div className="col-3">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="End Time"
                  value={to}
                  onChange={handleToChange}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
