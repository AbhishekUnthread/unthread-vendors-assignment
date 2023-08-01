import React from "react";
import "./CreateStore.scss";
import { Link, useNavigate } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import AppStateSelect from "../../../components/AppStateSelect/AppStateSelect";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import TagsBox from "../../../components/TagsBox/TagsBox";
import { AntSwitch } from "../../../components/AntSwitch/AntSwitch";
import StatusBox from "../../../components/StatusBox/StatusBox";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import addMedia from "../../../assets/icons/addMedia.svg";
import info from "../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import { Checkbox, FormControl, FormControlLabel, InputAdornment, OutlinedInput, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateStoreMutation } from "../../../features/products/inventory/inventoryApiSlice";

const createStoreValidationSchema = Yup.object({
  name: Yup.string().trim().required("required"),
  phone: Yup.string().trim().required("required"),
  email: Yup.string().trim().lowercase().email("email is not valid").required("required"),
  countryCode: Yup.string().trim().required("required"),
});

const CreateStore = () => {
  // ? SWITCH STARTS HERE
  const [checkedSwitch, setCheckedSwitch] = React.useState(true);
  const handleSwitchChange = (event) => {
    setCheckedSwitch(event.target.checked);
  };
  // ? SWITCH ENDS HERE

  const navigate = useNavigate();

  const [
    createStore,
    { data: createStoreData, isSuccess: createStoreIsSuccess, isLoading: createStoreIsLoading, error: createStoreError },
  ] = useCreateStoreMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      status: "active",
      managerDetails: {
        fullName: "",
        // countryCode: "",
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
      mediaUrl: "",
      notes: "",
      settings: {
        fullfillOnlineOrder: true,
        enableStorePickup: true,
      },
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
      values.countryCode = values.managerDetails.countryCode = values.address.country;
      values.storeHours = {
        monday: {
          status: "open",
          to: "10:00",
          from: "18:30",
        },
        tuesday: {
          status: "open",
          to: "10:00",
          from: "18:30",
        },
        wednesday: {
          status: "open",
          to: "10:00",
          from: "18:30",
        },
        thursday: {
          status: "open",
          to: "10:00",
          from: "18:30",
        },
        friday: {
          status: "open",
          to: "10:00",
          from: "18:30",
        },
        sataurday: {
          status: "open",
          to: "10:00",
          from: "18:30",
        },
        sunday: {
          status: "closed",
        },
      };
      createStore(values)
        .unwrap()
        .then(() => navigate("/products/inventory"));
    },
  });

  const updateStateValue = (value) => formik.setFieldValue("address.state", value);
  const updateCountryValue = (value) => formik.setFieldValue("address.country", value);
  const updateStoreStatus = (value, status) => formik.setFieldValue("status", status);
  const updateMediaUrl = (value) => formik.setFieldValue("mediaUrl", value ?? "");

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
                    />
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
                      sx={{ paddingLeft: 0 }}
                      startAdornment={
                        <InputAdornment position="start">
                          <AppMobileCodeSelect
                          // GetCountryCode={updateCountryCodeValue}
                          // SelectCountryCode={updateCountryCodeValue}
                          />
                          {/* &nbsp;&nbsp;&nbsp;&nbsp;| */}
                        </InputAdornment>
                      }
                    />
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
                    />
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
                />
              </FormControl>
            </div>
            <div className="col-md-6 pe-0 mt-3">
              <div className="d-flex align-items-center justify-content-between">
                <p className="text-lightBlue mb-1">Address Line 2</p>
                {/* <p className="text-lightBlue mb-1">State or Region</p> */}
                <small className="text-grey-6 mb-1">(Optional)</small>
              </div>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Address Line 2"
                  size="small"
                  name="address.line2"
                  value={formik.values.address.line2}
                  onChange={formik.handleChange}
                />
              </FormControl>
            </div>
            <div className="col-md-6 ps-0 mt-3">
              <p className="text-lightBlue mb-1">Town / City</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Town / City"
                  size="small"
                  name="address.city"
                  value={formik.values.address.city}
                  onChange={formik.handleChange}
                />
              </FormControl>
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
                />
              </FormControl>
            </div>

            <div className="col-md-12 px-0 mt-3 add-user-country">
              <p className="text-lightBlue mb-1">State or Region</p>
              <AppStateSelect
                name="address.state"
                getStateName={updateStateValue}
                SelectStateName={updateStateValue}
              />
            </div>

            <div className="col-md-12 px-0 mt-3 add-user-country">
              <p className="text-lightBlue mb-1">Country</p>
              <AppCountrySelect
                name="address.country"
                GetCountryName={updateCountryValue}
                SelectCountryName={updateCountryValue}
              />
            </div>

            <div className="col-12 px-0 mt-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
                width="100%"
                height="300"
                frameborder="0"
                style={{ border: 0 }}
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
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
                />
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
                />
              </FormControl>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4 row attributes">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">Manager Info</h6>
              </div>
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
                    />
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
                <div className="col-md-12 mt-3">
                  <p className="text-lightBlue mb-1">Email ID</p>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Email ID"
                      size="small"
                      name="managerDetails.email"
                      value={formik.values.managerDetails.email}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4 row attributes">
            <div className="d-flex col-12 px-0 justify-content-between">
              <h6 className="text-lightBlue me-auto text-lightBlue fw-500">Setting</h6>
            </div>

            <div className="d-flex align-items-center mt-3 col-12 px-0">
              <FormControlLabel
                control={
                  <Checkbox
                    name="settings.fullfillOnlineOrder"
                    checked={formik.values.settings.fullfillOnlineOrder}
                    onChange={formik.handleChange}
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

            <div className="d-flex align-items-center mt-1 col-12 px-0">
              <FormControlLabel
                control={
                  <Checkbox
                    name="settings.enableStorePickup"
                    checked={formik.values.settings.enableStorePickup}
                    onChange={formik.handleChange}
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
              value={formik?.values?.mediaUrl}
              imageName={addMedia}
              headingName={"Store Media"}
              UploadChange={updateMediaUrl}
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
            to="/users/allUsers"
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
