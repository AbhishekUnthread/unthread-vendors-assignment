import React from "react";
import PropTypes from "prop-types";
import "../../Products/AllProducts/AllProducts.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import UserGroupsTable from "../UserGroupsTable/UserGroupsTable";
// ! IMAGES IMPORTS
import user from "../../../assets/images/users/user.svg";
import activity from "../../../assets/icons/activity.svg";
import teamMember1 from "../../../assets/images/products/teamMember1.svg";
import cancel from "../../../assets/icons/cancel.svg";
import tutorial from "../../../assets/icons/tutorial.svg";
import sort from "../../../assets/icons/sort.svg";
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Slide,
  SwipeableDrawer,
  Tab,
  Tabs,
  TextField,
  styled,
  InputBase,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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
    width: "auto",
  },
  backgroundColor: "#1c1b33",
  height: "37.6px",
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
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "5px",
  },
}));
// ? SEARCH INPUT ENDS HERE

// ? TABS STARTS HERE
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
// ? TABS ENDS HERE

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const activityData = [
  {
    id: 1,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 2,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 3,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 4,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 5,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 6,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 7,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 8,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 9,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 10,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 11,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 12,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 13,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 14,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 15,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 16,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 17,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 18,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 19,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 20,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
  {
    id: 21,
    dateAndTime: "25 July, 2022 at 12:00 pm",
    user: "Saniya Shaikh",
    activity: "Updated Saniys's status to inactive",
  },
];

const UserGroups = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  // * SORT POPOVERS STARTS
  const [anchorSortEl, setAnchorSortEl] = React.useState(null);

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;
  // * SORT POPOVERS ENDS

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

  const groupData = [
    { title: "No Group", value: "content1" },
    { title: "VIP", value: "content2" },
    { title: "VVIP", value: "content3" },
    { title: "Wholesaler", value: "content4" },
    { title: "Highest Orders", value: "content5" },
    { title: "Loyal Customers", value: "content6" },
    { title: "New Users", value: "content7" },
    { title: "Default Users", value: "content8" },
    { title: "Guest Users", value: "content9" },
  ];

  // ? FIELD SETS DIALOG STARTS HERE
  const [openManageGroups, setOpenManageGroups] = React.useState(false);

  const handleOpenManageGroups = () => {
    setOpenManageGroups(true);
  };

  const handleOpenManageGroupsClose = () => {
    setOpenManageGroups(false);
  };
  // ? FIELD SETS DIALOG ENDS HERE

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">User Groups</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3">
            <img src={tutorial} alt="tutorial" className="me-2" width={20} />
            <p className="text-blue-gradient">Tutorial</p>
          </button>
          <button
            className="button-transparent py-2 px-3"
            onClick={toggleActivityDrawer("right", true)}
            // onClick={handleExportOpen}
          >
            <p className="text-lightBlue">View Logs</p>
          </button>

          <button
            className="button-lightBlue-outline py-2 px-3 ms-3"
            onClick={handleOpenManageGroups}
          >
            <p>Manage Default Group</p>
          </button>
          <Link
            to="/createUserGroup"
            className="button-gradient py-2 px-4 ms-3"
          >
            <p>Create Group</p>
          </Link>

          <Dialog
            open={openManageGroups}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleOpenManageGroupsClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">
                    Select Additional Field Sets
                  </h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleOpenManageGroupsClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">
                Default Group for Registered Users
              </p>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                className="col-7 px-0"
                options={groupData}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                  <li {...props}>
                    <small className="text-lightBlue my-1">
                      {option.title}
                    </small>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search"
                    inputRef={(input) => input?.focus()}
                  />
                )}
              />
              <p className="text-lightBlue mb-2 mt-3">
                Default Group for Guest Users
              </p>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                className="col-7 px-0"
                options={groupData}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                  <li {...props}>
                    <small className="text-lightBlue my-1">
                      {option.title}
                    </small>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search"
                    inputRef={(input) => input?.focus()}
                  />
                )}
              />
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button
                className="button-grey py-2 px-5"
                onClick={handleOpenManageGroupsClose}
              >
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button
                className="button-gradient py-2 px-5"
                onClick={handleOpenManageGroupsClose}
              >
                <p>Apply</p>
              </button>
            </DialogActions>
          </Dialog>
        </div>

        <SwipeableDrawer
          anchor="right"
          open={activityDrawer["right"]}
          onClose={toggleActivityDrawer("right", false)}
          onOpen={toggleActivityDrawer("right", true)}
        >
          <div className="d-flex justify-content-between py-3 px-3">
            <h6 className="text-lightBlue">View Logs</h6>
            <img
              src={cancel}
              alt="cancel"
              className="c-pointer filter-icon me-1"
              onClick={toggleActivityDrawer("right", false)}
            />
          </div>

          <div className="px-3">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src={user}
                  alt="user"
                  className="me-2"
                  height={45}
                  width={45}
                />
                <div>
                  <p className="text-lightBlue fw-600">User Module</p>
                  <small className="mt-2 text-grey-6">
                    Last modified on 10 Dec, 2022 by Saniya Shaikh
                  </small>
                </div>
              </div>
              <div className="d-flex ms-5">
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
                      Archived User
                    </small>
                    <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                      Added Comments
                    </small>
                  </div>
                </Popover>
              </div>
            </div>
            <table className="table table-borderless mt-4">
              <thead>
                <tr className="table-grey-bottom table-grey-top">
                  <th scope="col">
                    <small className="text-lightBlue fw-400">User</small>
                  </th>
                  <th scope="col">
                    <small className="text-lightBlue fw-400">Activity</small>
                  </th>
                  <th scope="col">
                    <small className="text-lightBlue fw-400">
                      Date and Time
                    </small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((data) => (
                  <tr key={data.id}>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SwipeableDrawer>
      </div>

      <div className="row mt-3">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 0, p: 0 }}
          className="border-grey-5 bg-black-15"
        >
          <Box
            sx={{ width: "100%" }}
            className="d-flex justify-content-between tabs-header-box"
          >
            {/* variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile */}
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Active" className="tabs-head" />
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#c8d8ff" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <div className="d-flex">
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idSort}
                variant="contained"
                onClick={handleSortClick}
              >
                <small className="text-lightBlue me-2">Sort</small>
                <img src={sort} alt="sort" className="" />
              </button>

              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                id={idSort}
                open={openSort}
                anchorEl={anchorSortEl}
                onClose={handleSortClose}
                className="columns"
              >
                <FormControl className="px-2 py-1">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    // value={value}
                    // onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="customerName"
                      control={<Radio size="small" />}
                      label="Customer Name"
                    />
                    <FormControlLabel
                      value="location"
                      control={<Radio size="small" />}
                      label="Location"
                    />
                    <FormControlLabel
                      value="totalSpent"
                      control={<Radio size="small" />}
                      label="Total Spent"
                    />
                    <FormControlLabel
                      value="noOfOrders"
                      control={<Radio size="small" />}
                      label="No of Orders"
                    />
                    <FormControlLabel
                      value="uploadTime"
                      control={<Radio size="small" />}
                      label="Upload Time"
                    />
                    <FormControlLabel
                      value="alphabeticalAtoZ"
                      control={<Radio size="small" />}
                      label="Alphabetical (A-Z)"
                    />
                    <FormControlLabel
                      value="alphabeticalZtoA"
                      control={<Radio size="small" />}
                      label="Alphabetical (Z-A)"
                    />
                    <FormControlLabel
                      value="oldestToNewest"
                      control={<Radio size="small" />}
                      label="Oldest to Newest"
                    />
                    <FormControlLabel
                      value="newestToOldest"
                      control={<Radio size="small" />}
                      label="Newest to Oldest"
                    />
                  </RadioGroup>
                </FormControl>
              </Popover>
            </div>
          </div>
          <TabPanel value={value} index={0}>
            <UserGroupsTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserGroupsTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <UserGroupsTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default UserGroups;
