import { Chip, OutlinedInput, Popover } from "@mui/material";
import React from "react";
// ! IMAGES IMPORTS
import archivedGrey from "../../../../assets/icons/archivedGrey.svg";
import editGrey from "../../../../assets/icons/editGrey.svg";
import location from "../../../../assets/icons/location.svg";
import activity from "../../../../assets/icons/activity.svg";
// ! COMPONENT IMPORTS
import UserActivityTable from "./UserActivityTable/UserActivityTable";
import UserIPTable from "./UserIPTable/UserIPTable";
import UserWishlistTable from "./UserWishlistTable/UserWishlistTable";
// ! MATERIAL IMPORTS
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

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
      <div className="bg-black-15 border-grey-5 rounded-8 row productInfo ">
        <p className="text-lightBlue p-3">Customer Overview</p>
      </div>
      <div className="bg-black-15 border-grey-5 mt-3 rounded-8 row productInfo ">
        <div className="col-12 d-flex mt-3">
          <img src={location} alt="location" />
          <p className="text-lightBlue ms-2">Address</p>
        </div>
        <div className="my-3 px-3">
          <hr className="hr-grey-6 m-0" />
        </div>
        <div className="col-12">
          <div
            className="row py-3 mb-3 rounded-8 mx-0"
            style={{ background: "rgba(39, 40, 63, 0.5)" }}
          >
            <div className="col-12 d-flex justify-content-between align-items-center mb-2">
              <p className="text-lightBlue">Home</p>
              <div className="d-flex align-items-center">
                <Chip label="Default" size="small" />
                <img src={editGrey} alt="editGrey" className="c-pointer ms-3" />
                <img
                  src={archivedGrey}
                  alt="archiverdGrey"
                  className="c-pointer ms-3"
                />
              </div>
            </div>
            <div className="col-12">
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
            <div className="col-12 d-flex justify-content-between align-items-center mb-2">
              <p className="text-lightBlue">Office</p>
              <div className="d-flex align-items-center">
                {/* <Chip label="Default" size="small" /> */}
                <img src={editGrey} alt="editGrey" className="c-pointer ms-3" />
                <img
                  src={archivedGrey}
                  alt="archiverdGrey"
                  className="c-pointer ms-3"
                />
              </div>
            </div>
            <div className="col-12">
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
      <div className="bg-black-15 border-grey-5 mt-3 rounded-8 row productInfo ">
        <div className="col-12 d-flex mt-3">
          <p className="text-lightBlue ms-2">Wishlist</p>
        </div>
        <div className="my-3 px-3">
          <hr className="hr-grey-6 m-0" />
        </div>
        <div className="col-12 px-0">
          <UserWishlistTable />
        </div>
      </div>
      <div className="bg-black-15 border-grey-5 mt-3 rounded-8 row productInfo ">
        <div className="col-12 d-flex mt-3 align-items-center justify-content-between">
          <p className="text-lightBlue ms-2">Activity</p>

          <div className="d-flex">
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
      <div className="bg-black-15 border-grey-5 mt-3 rounded-8 row productInfo ">
        <div className="col-12 d-flex mt-3 justify-content-between">
          <p className="text-lightBlue ms-2">Access to Dashboard (IP)</p>
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
