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
import email from "../../../assets/icons/email.svg";
import phone from "../../../assets/icons/phone.svg";
import message from "../../../assets/icons/message.svg";
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import block from "../../../assets/images/users/block.svg";
import userLarge from "../../../assets/images/users/userLarge.svg";
import copy from "../../../assets/icons/copy.svg";
import activity from "../../../assets/icons/activity.svg";
// ! MATERIAL IMPORTS
import {
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Chip,
  Popover,
  TextField,
  Tooltip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
// !MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddNotesDialog from "../../../components/AddNotesDialog/AddNotesDialog";

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
          <Link to="/teams/members" className="d-flex">
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
              <img src={block} alt="block" width={100} className="mt-3" />
              <div className="row"></div>
              <h6 className="text-lightBlue mt-3 mb-2">
                Are you sure you want to
              </h6>
              <h6 className="text-lightBlue mt-2 mb-2">
                Block & Archive&nbsp;
                <span className="text-blue-2">Saniya Shaikh</span>&nbsp;?
              </h6>
              <div className="d-flex justify-content-center mt-2">
                <hr className="hr-grey-6 w-100" />
              </div>
            </DialogContent>
            <DialogActions className="d-flex justify-content-between pt-0 pb-4 w-100">
              <button
                className="button-lightBlue-outline py-2 px-3 ms-5 me-2"
                onClick={handleBlockClose}
              >
                <p>Cancel</p>
              </button>
              <button
                className="button-red-outline py-2 px-3 me-5 ms-2"
                onClick={handleBlockClose}
              >
                <p>Block & Archive</p>
              </button>
            </DialogActions>
          </Dialog>

          <button className="button-lightBlue-outline py-1 ps-2 pe-3 ms-3">
            <EditOutlinedIcon
              sx={{
                color: "#5c6d8e",
                fontSize: 14,
                cursor: "pointer",
                margin: "0 8px 0 8px",
                // marginTop: "-3px",
              }}
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
            <div className="py-2 px-0">
              <div className="d-flex align-items-center  hover-back c-pointer p-2 rounded-3">
                <img src={phone} alt="phome" width={16} />
                <small className="text-lightBlue  ps-2 d-block">Call</small>
              </div>
              <div className="d-flex align-items-center  hover-back c-pointer p-2 rounded-3">
                <img src={email} alt="email" width={16} />
                <small className="text-lightBlue ps-2 d-block">
                  Send Email
                </small>
              </div>
              <div className="d-flex align-items-center  hover-back c-pointer p-2 rounded-3">
                <img src={message} alt="message" width={16} />
                <small className="text-lightBlue ps-2 d-block">Message</small>
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
        <div className="col-lg-9 mt-4">
          <div className="bg-black-15 border-grey-5 rounded-8 row">
            <div className="col-12 d-flex mt-3 align-items-center justify-content-between">
              <h6 className="text-lightBlue ms-1 fw-500">Activity</h6>

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
                <AddNotesDialog />

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
                      Archive User
                    </small>
                    <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                      Added Comments
                    </small>
                  </div>
                </Popover>
              </div>
            </div>
            <div className="my-3 px-2">
              <hr className="hr-grey-6 my-0 mx-1" />
            </div>
            <div className="col-12 px-0">
              <UserActivityTable />
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 mt-4 rounded-8 row">
            <div className="col-12 d-flex mt-3 justify-content-between align-items-center">
              <h6 className="text-lightBlue ms-1 fw-500">
                Access to Dashboard (IP)
              </h6>
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
            </div>
            <div className="my-3 px-2">
              <hr className="hr-grey-6 my-0 mx-1" />
            </div>
            <div className="col-12 px-0">
              <UserIPTable />
            </div>
          </div>
        </div>
        <div className="col-lg-3 mt-4 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <div className="member-image">
              <img src={userLarge} alt="userLarge" width={100} />
              <div className="member-image__dot"></div>
            </div>
            <div className="d-flex w-100 mt-3">
              <h6 className="text-lightBlue me-2">Saniya Shaikh</h6>
            </div>
            <p className="text-blue-1">Co-Founder</p>
            <small className="text-grey-6 mt-3 d-block">Registered Date</small>
            <p className="text-lightBlue mt-1">
              5 Dec, 2022&nbsp;<span className="text-grey-6">at 10:00am</span>
            </p>
            <small className="text-grey-6 mt-3 d-block">
              Last session&nbsp;
              <span className="text-lightBlue">Today at 6:00am</span>
            </small>
            <div className="d-flex justify-content-center ">
              <hr className="hr-grey-6 w-100" />
            </div>
            <small className="text-grey-6 mt- d-block">E-mail ID</small>
            <div className="d-flex mt-1">
              <p className="text-lightBlue me-2">saniya@mydesignar.com</p>
              <Tooltip title="Copy" placement="top">
                <img src={copy} alt="copy" className="c-pointer" />
              </Tooltip>
            </div>
            <small className="text-grey-6 mt-3 d-block">Mobile Number</small>
            <div className="d-flex mt-1">
              <p className="text-lightBlue me-2">+91 9876543210</p>
              <Tooltip title="Copy" placement="top">
                <img src={copy} alt="copy" className="c-pointer" />
              </Tooltip>
            </div>
            <small className="text-grey-6 mt-3 d-block">Member ID</small>
            <div className="d-flex mt-1">
              <p className="text-lightBlue me-2">UN845127</p>
              <Tooltip title="Copy" placement="top">
                <img src={copy} alt="copy" className="c-pointer" />
              </Tooltip>
            </div>
            <small className="text-grey-6 mt-3 mb-1 d-block">User Role</small>
            <Chip label="Super Admin" size="small" className="px-1" />
          </div>
          <NotesBox />
          <TagsBox />
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
