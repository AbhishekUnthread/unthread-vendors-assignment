import React from "react";
// ! COMPONENT IMPORTS
import UserActivityTable from "./UserActivityTable/UserActivityTable";
import UserIPTable from "./UserIPTable/UserIPTable";
import UserWishlistTable from "./UserWishlistTable/UserWishlistTable";
import AppCustomerOverviewChart from "../../../../components/AppCustomerOverviewChart/AppCustomerOverviewChart";
// ! IMAGES IMPORTS
import archivedGrey from "../../../../assets/icons/archivedGrey.svg";
import editGrey from "../../../../assets/icons/editGrey.svg";
import location from "../../../../assets/icons/location.svg";
import activity from "../../../../assets/icons/activity.svg";
import chart from "../../../../assets/icons/chart.svg";
import refresh from "../../../../assets/icons/refresh.svg";
// ! MATERIAL IMPORTS
import {
  Chip,
  OutlinedInput,
  Popover,
  TextField,
  Tooltip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
// ! MATERIAL ICONS IMPORTS
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const UserInformation = () => {
  // ? DATE PICKER STARTS
  const [activityDateValue, setActivityDateValue] = React.useState(
    // moment()
    new Date()
  );

  const handleActivityDateChange = (newValue) => {
    setActivityDateValue(newValue);
  };
  // ? DATE PICKER ENDS

  // * ACTIVITY POPOVERS STARTS
  const [anchorActivityEl, setAnchorActivityEl] = React.useState(null);
  const handleActivityClick = (event) => {
    setAnchorActivityEl(event.currentTarget);
  };
  const handleActivityClose = () => {
    setAnchorActivityEl(null);
  };
  const openActivity = Boolean(anchorActivityEl);
  const idActivity = openActivity ? "simple-popover" : undefined;
  // * ACTIVITY POPOVERS ENDS

  return (
    <React.Fragment>
      <div className="bg-black-15 border-grey-5 rounded-8 row ">
        <div className="col-12 d-flex mt-3 justify-content-between px-3">
          <div className="d-flex align-items-center">
            <img src={chart} alt="location" />
            <h6 className="text-lightBlue ms-2 fw-500">Customer Overview</h6>
          </div>
          <div className="d-flex align-items-center">
            <small className="text-lightBlue me-1">
              Last Update:&nbsp;<span className="fw-500">April 25,2022</span>
            </small>
            <img src={refresh} alt="refresh" width={16} />
          </div>
        </div>
        <div className="mt-3 px-3">
          <hr className="hr-grey-6 m-0" />
        </div>
        <div className="col-12 px-0">
          <div className="row p-3 mx-0">
            <div
              className="col-md-8 col-lg-9 d-flex justify-content-between align-items-center mb-3 mb-md-0 rounded-8 px-0"
              style={{ background: "rgba(39, 40, 63, 0.5)" }}
            >
              <AppCustomerOverviewChart />
            </div>
            <div className="col-lg-3 col-md-4 d-flex flex-md-column flex-row">
              <div
                className="row mb-md-3 rounded-8 ms-md-0 py-2"
                style={{ background: "rgba(39, 40, 63, 0.5)" }}
              >
                <div className="col-12 d-flex justify-content-between">
                  <p className="text-blue-gradient">Total Orders</p>
                  <Tooltip title="info" placement="top">
                    <InfoOutlinedIcon
                      sx={{
                        color: "#c8d8ff",
                        fontSize: 18,
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </div>
                <div className="col-12 mt-2">
                  <h6 className="text-lightBlue fw-500">24</h6>
                </div>
                <div className="col-12">
                  <small className="text-grey-6">
                    <span className="text-decoration-underline text-blue-2">
                      Last Order:
                    </span>
                    &nbsp;April 20, 2022
                  </small>
                </div>
              </div>
              <div
                className="row mb-md-3 rounded-8 ms-md-0 py-2"
                style={{ background: "rgba(39, 40, 63, 0.5)" }}
              >
                <div className="col-12 d-flex justify-content-between">
                  <p className="text-blue-gradient">Lifetime Spent</p>
                  <Tooltip title="info" placement="top">
                    <InfoOutlinedIcon
                      sx={{
                        color: "#c8d8ff",
                        fontSize: 18,
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </div>
                <div className="col-12 mt-2">
                  <h6 className="text-lightBlue fw-500">₹&nbsp;50,465.00</h6>
                </div>
                <div className="col-12">
                  <small className="text-grey-6">
                    Mostly spent on&nbsp;
                    <span className="text-decoration-underline text-blue-2">
                      Rings
                    </span>
                  </small>
                </div>
              </div>
              <div
                className="row mb-md-3 rounded-8 ms-md-0 py-2"
                style={{ background: "rgba(39, 40, 63, 0.5)" }}
              >
                <div className="col-12 d-flex justify-content-between">
                  <p className="text-blue-gradient">Average Order Value</p>
                  <Tooltip title="info" placement="top">
                    <InfoOutlinedIcon
                      sx={{
                        color: "#c8d8ff",
                        fontSize: 18,
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </div>
                <div className="col-12 mt-2">
                  <h6 className="text-lightBlue fw-500">₹&nbsp;3,215</h6>
                </div>
                <div className="col-12">
                  <small className="text-grey-6">
                    Mostly spent on&nbsp;
                    <span className="text-decoration-underline text-blue-2">
                      Rings
                    </span>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 mt-3 rounded-8 row">
        <div className="col-12 d-flex mt-3 px-3">
          <img src={location} alt="location" />
          <h6 className="text-lightBlue ms-2 fw-500">Address</h6>
        </div>
        <div className="my-3 px-3">
          <hr className="hr-grey-6 m-0" />
        </div>
        <div className="col-12 px-3">
          <div
            className="row py-3 mb-3 rounded-8 mx-0"
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
              <small className="text-lightBlue d-block">Sanjay Chauhan</small>
              <small className="text-lightBlue d-block">
                66-68, Jambi Moballa, Bapu Khote Street, Mandvi
              </small>
              <small className="text-lightBlue d-block">
                Mumbai-400003, Maharashtra, Mumbai
              </small>
              <small className="text-lightBlue d-block">+91 9876543210</small>
            </div>
          </div>
          <div
            className="row py-3 mb-3 rounded-8 mx-0"
            style={{ background: "rgba(39, 40, 63, 0.5)" }}
          >
            <div className="col-12 d-flex justify-content-between align-items-center mb-2 px-3">
              <p className="text-lightBlue">Office</p>
              <div className="d-flex align-items-center">
                {/* <Chip label="Default" size="small" /> */}
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
              <small className="text-lightBlue d-block">Sanjay Chauhan</small>
              <small className="text-lightBlue d-block">
                66-68, Jambi Moballa, Bapu Khote Street, Mandvi
              </small>
              <small className="text-lightBlue d-block">
                Mumbai-400003, Maharashtra, Mumbai
              </small>
              <small className="text-lightBlue d-block">+91 9876543210</small>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 mt-3 rounded-8 row">
        <div className="col-12 d-flex mt-3 px-3">
          <h6 className="text-lightBlue fw-500">Wishlist</h6>
        </div>
        <div className="my-3 px-3">
          <hr className="hr-grey-6 m-0" />
        </div>
        <div className="col-12 px-0">
          <UserWishlistTable />
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 mt-3 rounded-8 row  ">
        <div className="col-12 d-flex mt-3 align-items-center justify-content-between">
          <h6 className="text-lightBlue ms-2 fw-500">Activity</h6>

          <div className="d-flex">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDateTimePicker
                value={activityDateValue}
                onChange={(newValue) => {
                  handleActivityDateChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Enter Date & Time"
                  />
                )}
              />
            </LocalizationProvider>
            <button
              className="button-grey py-2 px-3 ms-2"
              aria-describedby={idActivity}
              variant="contained"
              onClick={handleActivityClick}
            >
              <small className="text-lightBlue">Activity</small>
              <img src={activity} alt="activity" className="ms-2" />
            </button>
            <button className="button-gradient py-2 px-3 ms-2">
              <small>+ Add Notes</small>
            </button>

            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              id={idActivity}
              open={openActivity}
              anchorEl={anchorActivityEl}
              onClose={handleActivityClose}
            >
              <div className="py-2 px-1">
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Viewed User
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Edited User
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Updated User Status
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Archived User
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Added Comments
                </small>
              </div>
            </Popover>
          </div>
        </div>
        <div className="my-3 px-3">
          <hr className="hr-grey-6 m-0" />
        </div>
        <div className="col-12 px-0">
          <UserActivityTable />
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 mt-3 rounded-8 row  ">
        <div className="col-12 d-flex mt-3 justify-content-between align-items-center">
          <h6 className="text-lightBlue ms-2 fw-500">
            Access to Dashboard (IP)
          </h6>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              // label="Sort By Date"
              value={activityDateValue}
              onChange={handleActivityDateChange}
              renderInput={(params) => (
                <OutlinedInput
                  {...params}
                  placeholder="Enter Date & Time"
                  size="small"
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="my-3 px-3">
          <hr className="hr-grey-6 m-0" />
        </div>
        <div className="col-12 px-0">
          <UserIPTable />
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserInformation;
