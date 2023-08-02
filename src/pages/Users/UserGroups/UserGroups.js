import { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Slide,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";

import { 
  useGetAllCustomerGroupQuery,
  useGetCustomerGroupCountQuery
  } from "../../../features/customers/customerGroup/customerGroupApiSlice";

import UserGroupsTable from "./UserGroupsTable";
import TabPanel from "../../../components/TabPanel/TabPanel";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";

import cancel from "../../../assets/icons/cancel.svg";
import sort from "../../../assets/icons/sort.svg";
import customers from "../../../assets/icons/sidenav/customers.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserGroups = () => {
  const [value, setValue] = useState(0);
  const [openManageGroups, setOpenManageGroups] = useState(false);
  const [anchorSortEl, setAnchorSortEl] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    data: groupCountData,
    isLoading: groupCountIsLoading,
    isSuccess: groupCountIsSuccess,
    error: groupCountError,
  } = useGetCustomerGroupCountQuery();

  const {
    data: customerGroupData,
    isLoading: customerGroupIsLoading,
    isSuccess: customerGroupIsSuccess,
    error: customerGroupError,
  } = useGetAllCustomerGroupQuery({createdAt: -1});

  const customerData =  customerGroupData?.data

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;

  const groupData = [
    { title: "No Group", value: "content1" },
    { title: "VIP", value: "content2" },
    { title: "VVIP", value: "content3" },
    { title: "Wholesaler", value: "content4" },
    { title: "Highest Orders", value: "content5" },
    { title: "Loyal Users", value: "content6" },
    { title: "New Users", value: "content7" },
    { title: "Default Users", value: "content8" },
    { title: "Guest Users", value: "content9" },
  ];

  const handleOpenManageGroups = () => {
    setOpenManageGroups(true);
  };

  const handleOpenManageGroupsClose = () => {
    setOpenManageGroups(false);
  };

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">User Groups</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"User Groups"} icon={customers} />
          <button
            className="button-lightBlue-outline py-2 px-3 ms-3"
            onClick={handleOpenManageGroups}
          >
            <p>Manage Default Group</p>
          </button>
          <Link
            to="/users/userGroups/create"
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
                    Manage Default Groups
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
      </div>

      <div className="row mt-4">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 0, p: 0 }}
          className="border-grey-5 bg-black-15"
        >
          <Box
            sx={{ width: "100%" }}
            className="d-flex justify-content-between tabs-header-box"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label={`All (${groupCountData?.data[0]?.all })`} className="tabs-head" />
              <Tab label={`Active (${groupCountData?.data[0]?.active })`} className="tabs-head" />
              <Tab label={`Archived (${groupCountData?.data[0]?.archived })`} className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
            <div className="d-flex ms-2">
              <button
                className="button-grey py-2 px-3"
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
                  >
                    <FormControlLabel
                      value="userName"
                      control={<Radio size="small" />}
                      label="User Name"
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
            <UserGroupsTable 
              data={customerData?.data || []}
              totalCount={customerData?.totalCount || 0}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserGroupsTable 
              data={customerData?.data || []}
              totalCount={customerData?.totalCount || 0}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <UserGroupsTable 
              data={customerData?.data || []}
              totalCount={customerData?.totalCount || 0}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default UserGroups;
