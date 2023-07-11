import React from "react";
import "./UserDetails.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import TabPanel from "../../../components/TabPanel/TabPanel";
import UserOrders from "./UserOrders/UserOrders";
import UserInformation from "./UserInformation/UserInformation";
import NotesBox from "../../../components/NotesBox/NotesBox";
import TagsBox from "../../../components/TagsBox/TagsBox";
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
import verified from "../../../assets/icons/verified.svg";
import copy from "../../../assets/icons/copy.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Tab,
  Tabs,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Popover,
  Chip,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const UserDetails = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <div className="col-lg-9 mt-4">
          <div className="row flex-column mb-2">
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between tabs-header-box mb-4"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="scrollable force tabs example"
                className="tabs"
              >
                <Tab label="Information" className="tabs-head" />
                <Tab label="Orders" className="tabs-head" />
                <Tab label="CJP" className="tabs-head" />
                <Tab label="Digital Gold" className="tabs-head" />
                <Tab label="Enquiries" className="tabs-head" />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <UserInformation />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UserOrders />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <p className="text-lightBlue">CJP</p>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <p className="text-lightBlue">Digital Gold</p>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <p className="text-lightBlue">Enquiries</p>
            </TabPanel>
          </div>
        </div>
        <div className="col-lg-3 mt-4 pe-0 ps-0 ps-lg-3">
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
              <small className="rounded-pill text-black fw-400 table-status px-2 py-1 me-2">
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
          {/* <NotesBox />
          <TagsBox /> */}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
