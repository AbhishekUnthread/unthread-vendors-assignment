import React from "react";
import "./CreateStore.scss";
import { Link } from "react-router-dom";
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
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Tooltip,
} from "@mui/material";

const CreateStore = () => {
  // ? SWITCH STARTS HERE
  const [checkedSwitch, setCheckedSwitch] = React.useState(true);
  const handleSwitchChange = (event) => {
    setCheckedSwitch(event.target.checked);
  };
  // ? SWITCH ENDS HERE

  return (
    <div className="page container-fluid position-relative">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/products/inventory" className="d-flex">
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
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Store Information
                </h6>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" />
            <div className="col-12 px-0">
              <div className="row align-items-start">
                <div className="col-md-12 mt-3">
                  <div className="d-flex">
                    <p className="text-lightBlue mb-1">Store Name</p>
                    <Tooltip title="Lorem ipsum" placement="top">
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
                    <OutlinedInput placeholder="Enter Email ID" size="small" />
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="d-flex col-12 px-0 justify-content-between">
              <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                Addresses
              </h6>
            </div>
            <div className="col-md-12 px-0 mt-3 add-user-country">
              <p className="text-lightBlue mb-1">Country</p>
              <AppCountrySelect />
            </div>

            <div className="col-md-6 ps-0 mt-3">
              <p className="text-lightBlue mb-1">Address Line 1</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Address Line 1"
                  size="small"
                />
              </FormControl>
            </div>
            <div className="col-md-6 pe-0 mt-3">
              <p className="text-lightBlue mb-1">Address Line 2</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Address Line 2"
                  size="small"
                />
              </FormControl>
            </div>
            <div className="col-md-6 ps-0 mt-3">
              <p className="text-lightBlue mb-1">Town / City</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput placeholder="Enter Town / City" size="small" />
              </FormControl>
            </div>
            <div className="col-md-6 pe-0 mt-3">
              <p className="text-lightBlue mb-1">Zipcode / Postalcode</p>
              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Enter Zipcode / Postalcode"
                  size="small"
                />
              </FormControl>
            </div>

            <div className="col-md-12 px-0 mt-3 add-user-country">
              <div className="d-flex align-items-center justify-content-between">
                <p className="text-lightBlue mb-1">State or Region</p>
                <small className="text-grey-6 mb-1">(Optional)</small>
              </div>
              <AppStateSelect />
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
                title="store map"
              ></iframe>
            </div>
            <div className="col-md-6 mt-3 ps-0">
              <p className="text-lightBlue mb-1">Latitude</p>
              <FormControl className="w-100">
                <OutlinedInput placeholder="Enter Latitude" size="small" />
              </FormControl>
            </div>
            <div className="col-md-6 mt-3 pe-0">
              <p className="text-lightBlue mb-1">Longitude</p>
              <FormControl className="w-100">
                <OutlinedInput placeholder="Enter Longitude" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4 row attributes">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Manager Info
                </h6>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" />
            <div className="col-12 px-0">
              <div className="row align-items-start">
                <div className="col-md-12 mt-3">
                  <div className="d-flex">
                    <p className="text-lightBlue mb-1">Manager Name</p>
                    <Tooltip title="Lorem ipsum" placement="top">
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
                    <OutlinedInput placeholder="Enter Email ID" size="small" />
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-4 row attributes">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Enable Google Reviews
                </h6>
              </div>
              <AntSwitch
                inputProps={{ "aria-label": "ant design" }}
                checked={checkedSwitch}
                onChange={handleSwitchChange}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <StatusBox headingName={"Store Status"} />
          <div className="mt-4">
            <UploadMediaBox imageName={addMedia} headingName={"Store Media"} />
          </div>
          <TagsBox />
          <NotesBox />
        </div>
      </div>
      <div className="row bottom-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link to="/users/allUsers" className="button-red-outline py-2 px-4">
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
          <Link
            to="/users/allUsers"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/users/allUsers"
            className="button-gradient py-2 px-4 w-auto ms-3"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateStore;
