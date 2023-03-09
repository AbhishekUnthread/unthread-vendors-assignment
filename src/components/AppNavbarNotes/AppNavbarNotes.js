import * as React from "react";
import "./AppNavbarNotes.scss";
// ! COMPONENT IMPORTS
import TabPanel from "../TabPanel/TabPanel";
// ! IMAGES IMPORTS
import cancel from "../../assets/icons/cancel.svg";
import clock from "../../assets/icons/clock.svg";
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
  TextareaAutosize,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HistoryIcon from "@mui/icons-material/History";
import ScheduleIcon from "@mui/icons-material/Schedule";

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
            className="d-flex justify-content-between tabs-header-box mt-2"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs px-3"
            >
              <Tab label="All" className="tabs-head" />{" "}
              <Tab label="Reminders" className="tabs-head me-5" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0} className="px-3 nav-tab-panel">
            <div className="d-flex flex-column p-2 bg-black-20 rounded-8 border-grey-5 mt-3">
              <TextareaAutosize
                aria-label="meta description"
                placeholder="Type Something"
                style={{
                  background: "transparent",
                  color: "#c8d8ff",
                  borderRadius: 5,
                }}
                minRows={3}
                className="col-12 nav-textarea mb-2"
              />
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <small className="text-blue-gradient me-2 c-pointer">
                    Assign Task
                  </small>
                  <small className="text-grey-6 c-pointer">
                    |&nbsp;Set Reminder
                  </small>
                </div>
                <div className="d-flex">
                  <small className="text-grey-6 me-2 c-pointer">Discard</small>
                  <small className="text-blue-gradient c-pointer">Save</small>
                </div>
              </div>
            </div>
            {[...Array(5)].map((elementInArray, index) => (
              <React.Fragment key={index}>
                <div className="d-flex justify-content-center mt-3">
                  <small className="text-grey-6 d-block mt-3">10/02/2023</small>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <hr className="hr-grey-6 w-100 my-0" />
                </div>
                <div className="d-flex align-items-start mt-3">
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
                        fontSize: "0.75rem",
                        color: "#c8d8ff",
                        maxWidth: "320px",
                      },
                    }}
                    className="px-0 mb-1 "
                  />
                  <small className="text-grey-6 d-block ms-4 mb-2">
                    8:27 PM
                  </small>
                </div>
                <div className="d-flex align-items-center c-pointer ms-4 mb-4">
                  <HistoryIcon sx={{ fontSize: 14, color: "#6e8dd7" }} />
                  <small className="font0 text-blue-2 ms-1">
                    Reminder : 9.00am • 12/02/2023
                  </small>
                </div>
                <div className="d-flex align-items-start mt-4 mb-2">
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
                        fontSize: "0.75rem",
                        color: "#c8d8ff",
                        maxWidth: "320px",
                      },
                    }}
                    className="px-0 mb-1 "
                  />
                  <small className="text-grey-6 d-block ms-4 mb-2">
                    8:27 PM
                  </small>
                </div>
              </React.Fragment>
            ))}
          </TabPanel>
          <TabPanel value={value} index={1} className="px-3 nav-tab-panel">
            <div className="d-flex flex-column p-2 bg-black-20 rounded-8 border-grey-5 mt-3">
              <TextareaAutosize
                aria-label="meta description"
                placeholder="Type Something"
                style={{
                  background: "transparent",
                  color: "#c8d8ff",
                  borderRadius: 5,
                }}
                minRows={3}
                className="col-12 nav-textarea mb-2"
              />
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <small className="text-blue-gradient me-2 c-pointer">
                    Assign Task
                  </small>
                  <small className="text-grey-6 c-pointer">
                    |&nbsp;Set Reminder
                  </small>
                </div>
                <div className="d-flex">
                  <small className="text-grey-6 me-2 c-pointer">Discard</small>
                  <small className="text-blue-gradient c-pointer">Save</small>
                </div>
              </div>
            </div>
            {[...Array(5)].map((elementInArray, index) => (
              <React.Fragment key={index}>
                <div className="d-flex justify-content-center mt-3">
                  <small className="text-grey-6 d-block mt-3">10/02/2023</small>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <hr className="hr-grey-6 w-100 my-0" />
                </div>
                <div className="d-flex align-items-start mt-3">
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
                        fontSize: "0.75rem",
                        color: "#c8d8ff",
                        maxWidth: "320px",
                      },
                    }}
                    className="px-0 mb-1 "
                  />
                  <small className="text-grey-6 d-block ms-4 mb-2">
                    8:27 PM
                  </small>
                </div>
                <div className="d-flex align-items-center c-pointer ms-4 mb-2">
                  <HistoryIcon sx={{ fontSize: 14, color: "#6e8dd7" }} />
                  <small className="font0 text-blue-2 ms-1">
                    Reminder : 9.00am • 12/02/2023
                  </small>
                </div>
                <div className="d-flex align-items-start mt-4">
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
                        fontSize: "0.75rem",
                        color: "#c8d8ff",
                        maxWidth: "320px",
                      },
                    }}
                    className="px-0 mb-1 "
                  />
                  <small className="text-grey-6 d-block ms-4 mb-2">
                    8:27 PM
                  </small>
                </div>
                <div className="d-flex align-items-center c-pointer ms-4 mb-2">
                  <ScheduleIcon sx={{ fontSize: 14, color: "#5c6d8e" }} />
                  <small className="font0 text-grey-6 ms-1">
                    Reminder : 9.00am • 12/02/2023 - Closed
                  </small>
                </div>
              </React.Fragment>
            ))}
          </TabPanel>
          <hr className="hr-grey-6 my-0" />
          <div className="d-flex justify-content-center mt-3">
            <small className="text-blue-gradient c-pointer">+ Add Task</small>
          </div>
        </div>
      </Popover>
    </React.Fragment>
  );
};

export default AppNavbarNotes;
