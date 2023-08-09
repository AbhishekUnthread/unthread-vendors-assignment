import React, { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
// ! COMPONENT IMPORTS
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import StatusBox from "../../../components/StatusBox/StatusBox";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import addMedia from "../../../assets/icons/addMedia.svg";
import info from "../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import { Checkbox, FormControl, FormControlLabel, FormHelperText, InputAdornment, OutlinedInput, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { useCreateStoreMutation } from "../../../features/products/inventory/inventoryApiSlice";
import AppGenericSelect from "../../../components/AppGenericSelect/AppGenericSelect";
import { useGetAllCityQuery } from "../../../features/master/city/cityApiSlice";
import { useGetAllStateQuery } from "../../../features/master/state/stateApiSlice";
import { useGetAllCountryQuery } from "../../../features/master/country/countryApiSlice";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";
import { showError, showSuccess } from "../../../features/snackbar/snackbarAction";
import StoreHoursWeekDay from "./StoreHoursWeekDay";

const initCreateState = { addAnother: false, discard: false };

const createStateReducer = (state, action) => {
  switch (action.type) {
    case "SET_DISCARD":
      return {
        ...state,
        discard: action.discard,
      };
    case "SET_ADD_ANOTHER":
      return {
        ...state,
        addAnother: action.addAnother,
      };

    default:
      return state;
  }
};

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
    mapLink: "",
    lattitude: "0",
    longitude: "0",
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
  from: Yup.string().when("status", {
    is: (status) => status === "open",
    then: () => Yup.string().required("required"),
    otherwise: () => Yup.string().nullable(true),
  }),
  to: Yup.string().when("status", {
    is: (status) => status === "open",
    then: () =>
      Yup.string()
        .required("required")
        .test("is-valid-time", "End time should be ahead than Start time", function (value) {
          const from = this.parent.from;
          const to = value;
          if (from && to) {
            return from < to;
          }
          return true;
        }),
    otherwise: () => Yup.string().nullable(true),
  }),
};

const storeValidationSchema = Yup.object({
  name: Yup.string().trim().required("required"),
  countryCode: Yup.string().trim().required("required"),
  phone: Yup.string()
    .min(10, "Phone must be 10 digits long")
    .max(10, "Phone must be 10 digits long")
    .matches(/[0-9]/, "Phone number must only be digits")
    .required("required"),
  email: Yup.string().trim().email("email is not valid").required("required"),
  status: Yup.string().oneOf(["active", "in-active"]),
  managerDetails: Yup.object({
    fullName: Yup.string().trim(),
    countryCode: Yup.string().trim(),
    phone: Yup.string().min(10, "Phone must be 10 digits long").max(10, "Phone must be 10 digits long").matches(/[0-9]/, "Phone number must only be digits"),
    email: Yup.string().trim().email("email is not valid"),
  }),
  address: Yup.object({
    country: Yup.string().required("required"),
    line1: Yup.string().required("required"),
    line2: Yup.string().required("required"),
    city: Yup.string().required("required"),
    pincode: Yup.number().required("required"),
    state: Yup.string().required("required"),
    mapLink: Yup.string()
      .matches(/^(https:\/\/maps\.apple\.com|https:\/\/maps\.app\.goo\.gl)/, "Must be a google maps or apple maps link")
      .url("Invalid URL format")
      .required("required"),
    lattitude: Yup.string(),
    longitude: Yup.string(),
  }),
  storeHours: Yup.object({
    monday: Yup.object().shape(dayObj),
    tuesday: Yup.object().shape(dayObj),
    wednesday: Yup.object().shape(dayObj),
    thursday: Yup.object().shape(dayObj),
    friday: Yup.object().shape(dayObj),
    saturday: Yup.object().shape(dayObj),
    sunday: Yup.object().shape(dayObj),
  }),
  mediaUrl: Yup.array().of(
    Yup.object({
      isDefault: Yup.boolean(),
      image: Yup.string().url(),
    })
  ),
  notes: Yup.string(),
  settings: Yup.object({
    fullfillOnlineOrder: Yup.boolean(),
    enableStorePickup: Yup.boolean(),
  }),
});

const CreateStore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createState, createDispatch] = useReducer(createStateReducer, initCreateState);

  const [createStore, { isLoading: createStoreIsLoading }] = useCreateStoreMutation();

  const onDiscardCreate = () => navigate(-1);

  const setAddAnother = (addAnother) => {
    createDispatch({ type: "SET_ADD_ANOTHER", addAnother });
    createDispatch({ type: "SET_DISCARD", discard: false });
  };

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: storeInitialValue,
    validationSchema: storeValidationSchema,
    onSubmit: (values, { resetForm }) => {
      for (const key of Object.keys(values.managerDetails)) if (values.managerDetails[key] === "") delete values.managerDetails[key];
      if (values.mediaUrl.length === 0) delete values.mediaUrl;
      if (values.notes.length === 0) delete values.notes;

      createStore(values)
        .unwrap()
        .then(() => {
          if (createState.addAnother) {
            setAddAnother(false);
            resetForm();
          } else {
            onDiscardCreate();
          }
          dispatch(showSuccess({ message: `${values.name} created successfully` }));
        })
        .catch((e) => {
          console.log(e);
          dispatch(showError({ message: "Something went wrong" }));
        });
    },
  });

  useEffect(() => {
    const check = _.isEqual(formik.values, formik.initialValues);
    console.log("check", check);
    createDispatch({ type: "SET_DISCARD", discard: !check });
  }, [formik.initialValues, formik.values]);

  const changeStoreStatus = (_, status) => formik.setFieldValue("status", status);
  const changeCityHandler = (_, value) => formik.setFieldValue("address.city", value?._id ?? "");
  const changeStateHandler = (_, value) => formik.setFieldValue("address.state", value?._id ?? "");
  const changeCountryHandler = (_, value) => formik.setFieldValue("address.country", value?._id ?? "");
  const changeCountryCodeHandler = (_, value) => formik.setFieldValue("countryCode", value?._id ?? "");
  const changeManagerCountryCodeHandler = (_, value) => formik.setFieldValue("managerDetails.countryCode", value?._id ?? "");
  const changeMediaUrl = (value) =>
    !!value &&
    formik.setFieldValue("mediaUrl", [
      {
        isDefault: true,
        image: value ?? "",
      },
    ]);

  return (
    <div className="page container-fluid position-relative">
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
      <form
        noValidate
        onSubmit={formik.handleSubmit}>
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
                      <p className="text-lightBlue mb-1">
                        Store Name{" "}
                        <FormHelperText
                          className="d-inline"
                          error>
                          *
                        </FormHelperText>
                      </p>
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
                    <p className="text-lightBlue mb-1">
                      Mobile Number{" "}
                      <FormHelperText
                        className="d-inline"
                        error>
                        *
                      </FormHelperText>
                    </p>
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
                              // error={formik.touched.countryCode ? formik.errors.countryCode : ""}
                              onChange={changeCountryCodeHandler}
                              formik={formik}
                              useGetQuery={useGetAllCountryQuery}
                              getQueryFilters={{ createdAt: -1 }}
                            />
                          </InputAdornment>
                        }
                      />
                      <FormHelperText error>
                        {formik.touched.countryCode && formik.errors.countryCode} {formik.touched.phone && formik.errors.phone}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="d-flex">
                      <p className="text-lightBlue mb-1">
                        Email ID{" "}
                        <FormHelperText
                          className="d-inline"
                          error>
                          *
                        </FormHelperText>
                      </p>

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
                <p className="text-lightBlue mb-1">
                  Address Line 1{" "}
                  <FormHelperText
                    className="d-inline"
                    error>
                    *
                  </FormHelperText>
                </p>
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
                <p className="text-lightBlue mb-1">
                  Address Line 2{" "}
                  <FormHelperText
                    className="d-inline"
                    error>
                    *
                  </FormHelperText>
                </p>
                {/* <div className="d-flex align-items-center justify-content-between">
                <p className="text-lightBlue mb-1">Address Line 2</p>
                <small className="text-grey-6 mb-1">(Optional)</small>
              </div> */}
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
                <p className="text-lightBlue mb-1">
                  Town / City{" "}
                  <FormHelperText
                    className="d-inline"
                    error>
                    *
                  </FormHelperText>
                </p>

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
              </div>

              <div className="col-md-6 pe-0 mt-3">
                <p className="text-lightBlue mb-1">
                  Zipcode / Postalcode{" "}
                  <FormHelperText
                    className="d-inline"
                    error>
                    *
                  </FormHelperText>
                </p>
                <FormControl className="w-100 px-0">
                  <OutlinedInput
                    placeholder="Enter Zipcode / Postalcode"
                    size="small"
                    name="address.pincode"
                    value={formik.values.address.pincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormHelperText error>{formik.touched.address?.pincode && formik.errors.address?.pincode}</FormHelperText>
                </FormControl>
              </div>

              <div className="col-md-12 px-0 mt-3 add-user-country">
                <p className="text-lightBlue mb-1">
                  State or Region{" "}
                  <FormHelperText
                    className="d-inline"
                    error>
                    *
                  </FormHelperText>
                </p>
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
              </div>

              <div className="col-md-12 px-0 mt-3 add-user-country">
                <p className="text-lightBlue mb-1">
                  Country{" "}
                  <FormHelperText
                    className="d-inline"
                    error>
                    *
                  </FormHelperText>
                </p>
                <AppGenericSelect
                  name="address.country"
                  dataId="_id"
                  dataLabel="name"
                  value={formik.values.address.country}
                  error={formik.touched.address?.country ? formik.errors.address?.country : ""}
                  onChange={changeCountryHandler}
                  formik={formik}
                  useGetQuery={useGetAllCountryQuery}
                  getQueryFilters={{ createdAt: -1 }}
                />
              </div>

              {/* <div className="col-12 px-0 mt-3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  tabIndex="0"
                  title="store map"></iframe>
              </div> */}

              <div className="col-md-12 px-0 mt-3 add-user-country">
                <p className="text-lightBlue mb-1">
                  Maps Link{" "}
                  <FormHelperText
                    className="d-inline"
                    error>
                    *
                  </FormHelperText>
                </p>
                <FormControl className="w-100 px-0">
                  <OutlinedInput
                    placeholder="Enter Maps Link"
                    size="small"
                    name="address.mapLink"
                    value={formik.values.address.mapLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormHelperText error>{formik.touched.address?.mapLink && formik.errors.address?.mapLink}</FormHelperText>
                </FormControl>
              </div>

              {/* <div className="col-md-6 mt-3 ps-0">
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
            </div> */}
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
                dayTouched={formik.touched.storeHours?.monday}
                dayErrors={formik.errors.storeHours?.monday}
                formikHandleBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikSetValue={formik.setFieldValue}
                formikSetTouched={formik.setFieldTouched}
              />

              <StoreHoursWeekDay
                dayName="tuesday"
                dayValues={formik.values.storeHours.tuesday}
                dayTouched={formik.touched.storeHours?.tuesday}
                dayErrors={formik.errors.storeHours?.tuesday}
                formikHandleBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikSetValue={formik.setFieldValue}
                formikSetTouched={formik.setFieldTouched}
              />

              <StoreHoursWeekDay
                dayName="wednesday"
                dayValues={formik.values.storeHours.wednesday}
                dayTouched={formik.touched.storeHours?.wednesday}
                dayErrors={formik.errors.storeHours?.wednesday}
                formikHandleBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikSetValue={formik.setFieldValue}
                formikSetTouched={formik.setFieldTouched}
              />

              <StoreHoursWeekDay
                dayName="thursday"
                dayValues={formik.values.storeHours.thursday}
                dayTouched={formik.touched.storeHours?.thursday}
                dayErrors={formik.errors.storeHours?.thursday}
                formikHandleBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikSetValue={formik.setFieldValue}
                formikSetTouched={formik.setFieldTouched}
              />

              <StoreHoursWeekDay
                dayName="friday"
                dayValues={formik.values.storeHours.friday}
                dayTouched={formik.touched.storeHours?.friday}
                dayErrors={formik.errors.storeHours?.friday}
                formikHandleBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikSetValue={formik.setFieldValue}
                formikSetTouched={formik.setFieldTouched}
              />

              <StoreHoursWeekDay
                dayName="saturday"
                dayValues={formik.values.storeHours.saturday}
                dayTouched={formik.touched.storeHours?.saturday}
                dayErrors={formik.errors.storeHours?.saturday}
                formikHandleBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikSetValue={formik.setFieldValue}
                formikSetTouched={formik.setFieldTouched}
              />

              <StoreHoursWeekDay
                dayName="sunday"
                dayValues={formik.values.storeHours.sunday}
                dayTouched={formik.touched.storeHours?.sunday}
                dayErrors={formik.errors.storeHours?.sunday}
                formikHandleBlur={formik.handleBlur}
                formikHandleChange={formik.handleChange}
                formikSetValue={formik.setFieldValue}
                formikSetTouched={formik.setFieldTouched}
              />
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
                      <FormHelperText error>{formik.touched.managerDetails?.fullName && formik.errors.managerDetails?.fullName}</FormHelperText>
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
                              // error={formik.touched.managerDetails?.countryCode ? formik.errors.managerDetails?.countryCode : ""}
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
                        {formik.touched.managerDetails?.countryCode && formik.errors.managerDetails?.countryCode}{" "}
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
                      <FormHelperText error>{formik.touched.managerDetails?.email && formik.errors.managerDetails?.email}</FormHelperText>
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
                <FormHelperText error>{formik.touched.settings?.fullfillOnlineOrder && formik.errors.settings?.fullfillOnlineOrder}</FormHelperText>
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
                <FormHelperText error>{formik.touched.settings?.enableStorePickup && formik.errors.settings?.enableStorePickup}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
            <StatusBox
              name={"status"}
              value={formik?.values?.status}
              handleProductStatus={changeStoreStatus}
              headingName={"Store Status"}
            />
            <div className="mt-4">
              <UploadMediaBox
                name="mediaUrl"
                value={formik?.values?.mediaUrl}
                imageName={addMedia}
                headingName={"Store Media"}
                UploadChange={changeMediaUrl}
                noteText="Recommended Size: 1000px x 1000px"
              />
            </div>

            <NotesBox
              name="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div
          className="row create-buttons pt-5 pb-3 justify-content-between"
          style={{ width: "102%" }}>
          <div className="d-flex w-auto px-0">
            <button
              onClick={onDiscardCreate}
              className="button-red-outline py-2 px-4"
              type="button">
              <p>Discard</p>
            </button>
          </div>
          <div className="d-flex w-auto px-0">
            <button
              className="button-lightBlue-outline me-3 py-2 px-4 w-auto"
              type="submit"
              onClick={() => setAddAnother(true)}>
              <p>Save & Add Another</p>
            </button>
            <LoadingButton
              className="button-gradient ms-3 py-2 px-4 w-auto"
              type="submit"
              onClick={() => setAddAnother(false)}
              loading={createStoreIsLoading}
              disabled={createStoreIsLoading}>
              <p>Save</p>
            </LoadingButton>
          </div>
        </div>
        <DiscardModalSecondary
          when={createState.discard}
          message="store tab"
        />
      </form>
    </div>
  );
};

export default CreateStore;
