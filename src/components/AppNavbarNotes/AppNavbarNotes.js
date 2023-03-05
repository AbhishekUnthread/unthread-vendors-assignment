import * as React from "react";
import "./AppNavbarNotes.scss";
// ! IMAGES IMPORTS
import cancel from "../../assets/icons/cancel.svg";
// ! MATERIAL IMPORTS
import {
  Badge,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Popover,
  Tab,
  Tabs,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TabPanel from "../TabPanel/TabPanel";

const AppNavbarNotes = () => {
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

  return (
    <React.Fragment>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handlePopperClick}
      >
        <Badge badgeContent={7} color="purple" size="small">
          <NotificationsNoneIcon size="small" sx={{ color: "#c8d8ff" }} />
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
            <h6 className="text-lightBlue fw-500">Notes</h6>
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
              <Tab label="Completed" className="tabs-head" />
              <Tab label="Reminders" className="tabs-head me-5" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0} className="px-3 nav-tab-panel">
            {[...Array(5)].map((elementInArray, index) => (
              <React.Fragment>
                <div className="d-flex justify-content-center">
                  <small className="text-grey-6 d-block mt-3">10/02/2023</small>
                </div>
                <div className="d-flex align-items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheckboxChange}
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                          marginRight: 0,
                          width: "auto",
                        }}
                      />
                    }
                    label="To get started with My tasks and start using the emails to generate leads"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.875rem",
                        color: "#c8d8ff",
                        maxWidth: "320px",
                      },
                    }}
                    className="px-0 my-3"
                  />
                  <small className="text-grey-6 d-block ms-4">8:27 PM</small>
                </div>
                <div className="d-flex align-items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheckboxChange}
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                          marginRight: 0,
                          width: "auto",
                        }}
                      />
                    }
                    label="To get started with My tasks and start using the emails to generate leads"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.875rem",
                        color: "#c8d8ff",
                        maxWidth: "320px",
                      },
                    }}
                    className="px-0 my-3"
                  />
                  <small className="text-grey-6 d-block ms-4">8:27 PM</small>
                </div>
              </React.Fragment>
            ))}
          </TabPanel>
          <TabPanel value={value} index={1} className="px-3 nav-tab-panel">
            {[...Array(5)].map((elementInArray, index) => (
              <React.Fragment>
                <div className="d-flex justify-content-center">
                  <small className="text-grey-6 d-block mt-3">10/02/2023</small>
                </div>
                <div className="d-flex align-items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheckboxChange}
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                          marginRight: 0,
                          width: "auto",
                        }}
                      />
                    }
                    label="To get started with My tasks and start using the emails to generate leads"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.875rem",
                        color: "#c8d8ff",
                        maxWidth: "320px",
                      },
                    }}
                    className="px-0 my-3"
                  />
                  <small className="text-grey-6 d-block ms-4">8:27 PM</small>
                </div>
                <div className="d-flex align-items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheckboxChange}
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                          marginRight: 0,
                          width: "auto",
                        }}
                      />
                    }
                    label="To get started with My tasks and start using the emails to generate leads"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.875rem",
                        color: "#c8d8ff",
                        maxWidth: "320px",
                      },
                    }}
                    className="px-0 my-3"
                  />
                  <small className="text-grey-6 d-block ms-4">8:27 PM</small>
                </div>
              </React.Fragment>
            ))}
          </TabPanel>
          <TabPanel value={value} index={2} className="px-3 nav-tab-panel">
            {[...Array(5)].map((elementInArray, index) => (
              <React.Fragment>
                <div className="d-flex justify-content-center">
                  <small className="text-grey-6 d-block mt-3">10/02/2023</small>
                </div>
                <div className="d-flex align-items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheckboxChange}
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                          marginRight: 0,
                          width: "auto",
                        }}
                      />
                    }
                    label="To get started with My tasks and start using the emails to generate leads"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.875rem",
                        color: "#c8d8ff",
                        maxWidth: "320px",
                      },
                    }}
                    className="px-0 my-3"
                  />
                  <small className="text-grey-6 d-block ms-4">8:27 PM</small>
                </div>
                <div className="d-flex align-items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheckboxChange}
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                          marginRight: 0,
                          width: "auto",
                        }}
                      />
                    }
                    label="To get started with My tasks and start using the emails to generate leads"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.875rem",
                        color: "#c8d8ff",
                        maxWidth: "320px",
                      },
                    }}
                    className="px-0 my-3"
                  />
                  <small className="text-grey-6 d-block ms-4">8:27 PM</small>
                </div>
              </React.Fragment>
            ))}
          </TabPanel>
          <hr className="hr-grey-6 my-0" />
          <div className="d-flex justify-content-center mt-3">
            <small className="text-blue-gradient">+ Add Task</small>
          </div>
        </div>
      </Popover>
    </React.Fragment>
  );
};

export default AppNavbarNotes;
