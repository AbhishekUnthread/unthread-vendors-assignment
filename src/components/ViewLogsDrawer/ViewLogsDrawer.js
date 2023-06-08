import React from "react";
// ! IMAGES IMPORTS
import activity from "../../assets/icons/activity.svg";
import teamMember1 from "../../assets/images/products/teamMember1.svg";
import cancel from "../../assets/icons/cancel.svg";
// ! MATERIAL IMPORTS
import {
  Popover,
  SwipeableDrawer,
  TextField,
  styled,
  InputBase,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
// ! MATERIAL ICONS IMPORTS
import SearchIcon from "@mui/icons-material/Search";

// ? SEARCH INPUT STARTS HERE
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: "#1c1b33",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: 0,
    width: "100%",
  },
  backgroundColor: "#1c1b33",
  height: "37.6px",
  //   marginRight: "8px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: theme.spacing(1.5),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
  },
}));
// ? SEARCH INPUT ENDS HERE

const activityData = [
  {
    id: 1,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 2,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 3,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 4,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 5,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 6,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 7,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 8,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 9,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 10,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 11,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 12,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 13,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 14,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 15,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 16,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 17,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 18,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 19,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 20,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
  {
    id: 21,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniya's status to inactive",
  },
];

const ViewLogsDrawer = ({ headingName, icon }) => {
  // ? DATE PICKER STARTS

  const [activityDateValue, setActivityDateValue] = React.useState(
    // moment()
    new Date()
  );

  const handleActivityDateChange = (newValue) => {
    setActivityDateValue(newValue);
  };

  // ? DATE PICKER ENDS

  // ? ACTIVITY DRAWER STARTS HERE
  const [activityDrawer, setActivityDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleActivityDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setActivityDrawer({ ...activityDrawer, [anchor]: open });
  };
  // ? ACTIVITY DRAWER ENDS HERE

  // ? POPOVERS STARTS HERE

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

  // ? POPOVERS ENDS HERE

  return (
    <React.Fragment>
      <button
        className="button-transparent me-1 py-2 px-3"
        onClick={toggleActivityDrawer("right", true)}
      >
        <p className="text-lightBlue">View Logs</p>
      </button>

      <SwipeableDrawer
        anchor="right"
        open={activityDrawer["right"]}
        onClose={toggleActivityDrawer("right", false)}
        onOpen={toggleActivityDrawer("right", true)}
      >
        <div className="px-3 activity-top bg-black-13 pb-3">
          <div className="d-flex justify-content-between py-3 px-0">
            <h6 className="text-lightBlue">View Logs</h6>
            <img
              src={cancel}
              alt="cancel"
              className="c-pointer filter-icon me-1"
              onClick={toggleActivityDrawer("right", false)}
            />
          </div>

          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <img
                src={icon}
                alt="user"
                className="me-2"
                height={30}
                width={30}
              />
              <div>
                <p className="text-lightBlue fw-600">{headingName}</p>
                <small className="mt-2 text-grey-6">
                  Last modified on 10 Dec, 2022 by Saniya Shaikh
                </small>
              </div>
            </div>
            <div className="d-flex ms-5">
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
                      sx={{ width: 210 }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className="d-flex mt-3 ">
            <Search sx={{ border: "1px solid #5c6d8e", background: "#15142a" }}>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#c8d8ff" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <button
              className="button-grey py-2 px-3"
              aria-describedby={idActivity}
              variant="contained"
              onClick={handleActivityClick}
            >
              <small className="text-lightBlue">Activity</small>
              <img src={activity} alt="activity" className="ms-2" />
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
                  Archive User
                </small>
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Added Comments
                </small>
              </div>
            </Popover>
          </div>
        </div>

        <div className="">
          <table className="table table-borderless activity-table">
            <thead className="">
              <tr className="bg-black-15">
                <th scope="col">
                  <small className="text-lightBlue fw-400"></small>
                </th>
                <th scope="col">
                  <small className="text-lightBlue fw-400">User</small>
                </th>
                <th scope="col">
                  <small className="text-lightBlue fw-400">Activity</small>
                </th>
                <th scope="col">
                  <small className="text-lightBlue fw-400">Date and Time</small>
                </th>
                <th scope="col">
                  <small className="text-lightBlue fw-400"></small>
                </th>
              </tr>
            </thead>
            <tbody>
              {activityData.map((data) => (
                <tr key={data.id}>
                  {/* DONOT REMOVE THIS BLANK COLUMN DONE FOR STYLING */}
                  <td>
                    <small className="text-grey-6 fw-400"></small>
                  </td>
                  {/* DONOT REMOVE THIS BLANK COLUMN DONE FOR STYLING */}
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <img
                        src={teamMember1}
                        alt="teamMember1"
                        className="me-2"
                      />
                      <small className="text-lightBlue fw-400">
                        {data.user}
                      </small>
                    </div>
                  </th>
                  <td>
                    <small className="text-lightBlue">{data.activity}</small>
                  </td>
                  <td>
                    <small className="text-grey-6 fw-400">
                      {data.dateAndTime}
                    </small>
                  </td>
                  {/* DONOT REMOVE THIS BLANK COLUMN DONE FOR STYLING */}
                  <td>
                    <small className="text-grey-6 fw-400"></small>
                  </td>
                  {/* DONOT REMOVE THIS BLANK COLUMN DONE FOR STYLING */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default ViewLogsDrawer;
