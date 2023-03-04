import * as React from "react";
import { styled } from "@mui/material/styles";
import "./AppNavbarNotifications.scss";
// ! IMAGES IMPORTS
import user from "../../assets/icons/user.svg";
import notificationNavbar from "../../assets/icons/notificationNavbar.svg";
import menuClose from "../../assets/icons/sidenav/menuClose.svg";
import menuOpen from "../../assets/icons/sidenav/menuOpen.svg";
import cancel from "../../assets/icons/cancel.svg";
// ! MATERIAL IMPORTS
import {
  AppBar,
  Badge,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Popper,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
// ! IMAGES IMPORTS
import rolesOwner from "../../assets/images/teams/rolesOwner.svg";
// ! MATERIAL ICONS IMPORTS
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import TabPanel from "../TabPanel/TabPanel";

const AppNavbarNotifications = () => {
  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const [checked, setChecked] = React.useState([0]);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  // ? POPPER STARTS HERE
  const [anchorPopperEl, setAnchorPopperEl] = React.useState(null);

  // const handlePopperClick = (event) => {
  //   setAnchorPopperEl(anchorPopperEl ? null : event.currentTarget);
  // };
  // const handlePopperClose = (event) => {
  //   setAnchorPopperEl(anchorPopperEl ? null : event.currentTarget);
  // };
  const handlePopperClick = (event) => {
    setAnchorPopperEl(event.currentTarget);
  };

  const handlePopperClose = () => {
    setAnchorPopperEl(null);
  };

  const openPopper = Boolean(anchorPopperEl);
  const idPopper = openPopper ? "simple-popper" : undefined;
  // ? POPPER ENDS HERE

  return (
    <React.Fragment>
      <IconButton
        size="large"
        aria-label="show 4 new mails"
        color="inherit"
        onClick={handlePopperClick}
      >
        <Badge badgeContent={4} color="purple" size="small">
          <DescriptionOutlinedIcon sx={{ color: "#c8d8ff" }} size="small" />
        </Badge>
      </IconButton>

      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopperClose}
        id={idPopper}
        open={openPopper}
        anchorEl={anchorPopperEl}
        sx={{ padding: 0 }}
        className="navbar-popover"
      >
        <div className="d-flex flex-column my-3">
          <div className="d-flex align-items-center justify-content-between px-3 navbar-popover-heading">
            <h6 className="text-lightBlue fw-500">Notification</h6>
            <img
              src={cancel}
              alt="cancel"
              width={25}
              onClick={handlePopperClose}
              className="c-pointer"
            />
          </div>
          <Box
            sx={{ width: "100%" }}
            className="d-flex justify-content-between tabs-header-box mt-3"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Orders" className="tabs-head" />
              <Tab label="Teams" className="tabs-head" />
              <Tab label="Updates" className="tabs-head me-5" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0} className="px-3 nav-tab-panel">
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} className="px-3 nav-tab-panel">
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} className="px-3 nav-tab-panel">
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={3} className="px-3 nav-tab-panel">
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
            <div className="d-flex justify-content-center border-grey-5 bg-black-13 p-3 rounded-8 my-3">
              <div className="d-flex">
                <img
                  src={notificationNavbar}
                  alt="notificationNavbar"
                  className="me-2"
                  width={40}
                />
                <small
                  className="text-lightBlue d-block"
                  style={{
                    maxWidth: "320px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  error quasi nihil expedita amet, officia sapiente.
                </small>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-end">
                <small className="text-grey-6 d-block">1:37 PM</small>
                <small className="text-blue-2 d-block text-decoration-underline">
                  View
                </small>
              </div>
            </div>
          </TabPanel>
          <hr className="hr-grey-6 my-0" />
          <div className="d-flex justify-content-center mt-3">
            <small className="text-blue-gradient">View More</small>
          </div>
        </div>
      </Popover>
    </React.Fragment>
  );
};

export default AppNavbarNotifications;
