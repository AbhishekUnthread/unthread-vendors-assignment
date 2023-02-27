import React from "react";
import "./MemberDetails.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import NotesBox from "../../../components/NotesBox/NotesBox";
import TagsBox from "../../../components/TagsBox/TagsBox";
import UserIPTable from "../../Users/UserDetails/UserInformation/UserIPTable/UserIPTable";
import UserActivityTable from "../../Users/UserDetails/UserInformation/UserActivityTable/UserActivityTable";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import editWhite from "../../../assets/icons/editWhite.svg";
import email from "../../../assets/icons/email.svg";
import phone from "../../../assets/icons/phone.svg";
import message from "../../../assets/icons/message.svg";
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import block from "../../../assets/images/users/block.svg";
import userLarge from "../../../assets/images/users/userLarge.svg";
import verified from "../../../assets/icons/verified.svg";
import copy from "../../../assets/icons/copy.svg";
import activity from "../../../assets/icons/activity.svg";
// ! MATERIAL IMPORTS
import {
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Chip,
  OutlinedInput,
  Popover,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const MemberDetails = () => {
  // * CONTACT POPOVERS STARTS
  const [anchorContactEl, setContactEl] = React.useState(null);

  const handleContactClick = (event) => {
    setContactEl(event.currentTarget);
  };

  const handleContactClose = () => {
    setContactEl(null);
  };

  const openContact = Boolean(anchorContactEl);
  const idContact = openContact ? "simple-popover" : undefined;
  // * CONTACT POPOVERS ENDS

  // ? BLOCK DIALOG STARTS HERE
  const [openBlock, setOpenBlock] = React.useState(false);

  const handleBlock = () => {
    setOpenBlock(true);
  };

  const handleBlockClose = () => {
    setOpenBlock(false);
  };
  // ? BLOCK DIALOG ENDS HERE

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
    <div className="page container-fluid position-relative">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/users/allUsers" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>
          <div>
            <h5 className="page-heading ms-2 ps-1">Saniya Shaikh</h5>
            <div className="d-flex ms-2 ps-1 mt-1">
              <small className="text-lightBlue me-2">
                Mumbai, Maharashtra, India
              </small>
              <img src={indiaFlag} alt="indiaFlag" width={20} />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <button
            className="button-red-outline py-1 px-3"
            onClick={handleBlock}
          >
            <p>Block & Archive</p>
          </button>

          <Dialog
            open={openBlock}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleBlockClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
          >
            <DialogContent className="py-2 px-4 text-center">
              <img src={block} alt="block" width={100} />
              <div className="row"></div>
              <h6 className="text-lightBlue mt-3 mb-2">
                Are you sure you want to
              </h6>
              <h6 className="text-lightBlue mt-2 mb-2">
                Block & Archive&nbsp;
                <span className="text-blue-2">Saniya Shaikh</span>&nbsp;?
              </h6>
              <div className="d-flex justify-content-center mt-4">
                <hr className="hr-grey-6 w-100" />
              </div>
            </DialogContent>
            <DialogActions className="d-flex justify-content-between px-4 pb-4">
              <button
                className="button-lightBlue-outline py-2 px-3 ms-5"
                onClick={handleBlockClose}
              >
                <p>Cancel</p>
              </button>
              <button
                className="button-red-outline py-2 px-3 me-5"
                onClick={handleBlockClose}
              >
                <p>Block & Archive</p>
              </button>
            </DialogActions>
          </Dialog>

          <button className="button-lightBlue-outline py-1 ps-2 pe-3 ms-3">
            <img
              src={editWhite}
              alt="editWhite"
              height={20}
              className="ps-1 pe-1"
            />
            <p>Edit</p>
          </button>

          <button
            className="button-gradient py-1 px-4 w-auto ms-3 me-3"
            onClick={handleContactClick}
          >
            <p>Contact</p>
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
            id={idContact}
            open={openContact}
            anchorEl={anchorContactEl}
            onClose={handleContactClose}
          >
            <div className="py-2 px-1">
              <div className="d-flex align-items-center">
                <img src={phone} alt="phome" width={16} />
                <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                  Call
                </small>
              </div>
              <div className="d-flex align-items-center">
                <img src={email} alt="email" width={16} />
                <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                  Send Email
                </small>
              </div>
              <div className="d-flex align-items-center">
                <img src={message} alt="message" width={16} />
                <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                  Message
                </small>
              </div>
            </div>
          </Popover>
          <img
            src={paginationLeft}
            alt="paginationLeft"
            className="c-pointer"
            width={30}
          />
          <img
            src={paginationRight}
            alt="paginationRight"
            className="c-pointer"
            width={30}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9 mt-3">
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
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <img src={userLarge} alt="userLarge" width={100} />
            <div className="d-flex w-100 mt-3">
              <div className="d-flex w-100 align-items-center">
                <h6 className="text-lightBlue me-2">Saniya Shaikh</h6>
                <img src={verified} alt="verified" width={15} />
              </div>
              <img src={indiaFlag} alt="indiaFlag" width={18} />
            </div>
            <small className="text-grey-6 my-2 d-block">#123456 • Female</small>
            <div className="d-flex align-items-baseline flex-wrap">
              <small className="rounded-pill text-black fw-light table-status px-2 py-1 me-2">
                Active
              </small>
              <small className="text-grey-6 my-2 d-block">
                Last session&nbsp;
                <span className="text-lightBlue">Today at 6:00am</span>
              </small>
            </div>
            <small className="text-grey-6 mt-3 d-block">Registered Date</small>
            <p className="text-lightBlue mt-1">
              5 Dec, 2022&nbsp;<span className="text-grey-6">at 10:00am</span>
            </p>
            <div className="d-flex justify-content-center ">
              <hr className="hr-grey-6 w-100" />
            </div>
            <small className="text-grey-6 mt- d-block">E-mail ID</small>
            <div className="d-flex mt-1">
              <p className="text-lightBlue me-2">saniya@mydesignar.com</p>
              <img src={copy} alt="copy" />
            </div>
            <small className="text-grey-6 mt-3 d-block">Mobile Number</small>
            <div className="d-flex mt-1">
              <p className="text-lightBlue me-2">+91 9876543210</p>
              <img src={copy} alt="copy" />
            </div>
            <small className="text-grey-6 mt-3 d-block">Date of Birth</small>
            <div className="d-flex mt-1">
              <p className="text-lightBlue me-2">21 Nov, 1999</p>
            </div>
            <small className="text-grey-6 mt-3 mb-1 d-block">User Group</small>
            <Chip label="VIP" size="small" className="px-1" />
            <Chip label="Verified User" size="small" className="ms-2 px-1" />
          </div>
          <NotesBox />
          <TagsBox />
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
