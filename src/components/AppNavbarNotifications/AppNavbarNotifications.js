import * as React from "react";
import "./AppNavbarNotifications.scss";
// ! COMPONENT IMPORTS
import TabPanel from "../TabPanel/TabPanel";
// ! IMAGES IMPORTS
import arrowDown from "../../assets/icons/arrowDown.svg";
import notificationNavbar from "../../assets/icons/notificationNavbar.svg";
import cancel from "../../assets/icons/cancel.svg";
// ! MATERIAL IMPORTS
import { Badge, Box, IconButton, Popover, Tab, Tabs } from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const AppNavbarNotifications = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? POPPER STARTS HERE
  const [anchorPopperEl, setAnchorPopperEl] = React.useState(null);
  const handlePopperClick = (event) => {
    setAnchorPopperEl(event.currentTarget);
  };

  const handlePopperClose = () => {
    setAnchorPopperEl(null);
  };

  const openPopper = Boolean(anchorPopperEl);
  const idPopper = openPopper ? "simple-popper" : undefined;
  // ? POPPER ENDS HERE

  // * METAL FILTER POPOVERS STARTS
  const [anchorMetalFilterEl, setAnchorMetalFilterEl] = React.useState(null);
  const handleMetalFilter = (event) => {
    setAnchorMetalFilterEl(event.currentTarget);
  };
  const handleMetalFilterClose = () => {
    setAnchorMetalFilterEl(null);
  };
  const openMetalFilter = Boolean(anchorMetalFilterEl);
  const idMetalFilter = openMetalFilter ? "simple-popover" : undefined;
  // * METAL FILTER POPOVERS ENDS

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
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue fw-500 me-2">Notification</h6>
                <div
                  className="rounded-pill d-flex button-transparent px-2 py-1 c-pointer border-grey-5"
                  aria-describedby={idMetalFilter}
                  variant="contained"
                  onClick={handleMetalFilter}
                >
                  <small className="text-lightBlue fw-400">All</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </div>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idMetalFilter}
                  open={openMetalFilter}
                  anchorEl={anchorMetalFilterEl}
                  onClose={handleMetalFilterClose}
                >
                  <div className="py-2 px-1">
                    <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                      All
                    </small>
                    <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                      Unread
                    </small>
                    <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                      Unseen
                    </small>
                  </div>
                </Popover>
              </div>
            </div>

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
            {[...Array(10)].map((elementInArray, index) => (
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia error quasi nihil expedita amet, officia sapiente.
                  </small>
                </div>
                <div className="d-flex flex-column justify-content-between align-items-end">
                  <small className="text-grey-6 d-block">1:37 PM</small>
                  <small className="text-blue-2 d-block text-decoration-underline">
                    View
                  </small>
                </div>
              </div>
            ))}
          </TabPanel>
          <TabPanel value={value} index={1} className="px-3 nav-tab-panel">
            {[...Array(10)].map((elementInArray, index) => (
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia error quasi nihil expedita amet, officia sapiente.
                  </small>
                </div>
                <div className="d-flex flex-column justify-content-between align-items-end">
                  <small className="text-grey-6 d-block">1:37 PM</small>
                  <small className="text-blue-2 d-block text-decoration-underline">
                    View
                  </small>
                </div>
              </div>
            ))}
          </TabPanel>
          <TabPanel value={value} index={2} className="px-3 nav-tab-panel">
            {[...Array(10)].map((elementInArray, index) => (
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia error quasi nihil expedita amet, officia sapiente.
                  </small>
                </div>
                <div className="d-flex flex-column justify-content-between align-items-end">
                  <small className="text-grey-6 d-block">1:37 PM</small>
                  <small className="text-blue-2 d-block text-decoration-underline">
                    View
                  </small>
                </div>
              </div>
            ))}
          </TabPanel>
          <TabPanel value={value} index={3} className="px-3 nav-tab-panel">
            {[...Array(10)].map((elementInArray, index) => (
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia error quasi nihil expedita amet, officia sapiente.
                  </small>
                </div>
                <div className="d-flex flex-column justify-content-between align-items-end">
                  <small className="text-grey-6 d-block">1:37 PM</small>
                  <small className="text-blue-2 d-block text-decoration-underline">
                    View
                  </small>
                </div>
              </div>
            ))}
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
