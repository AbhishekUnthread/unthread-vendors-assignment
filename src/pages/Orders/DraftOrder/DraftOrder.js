import React from "react";
import { Link } from "react-router-dom";
import "./DraftOrder.scss";
// ! COMPONENT IMPORTS
import DraftOrderTable from "./DraftOrderTable";
import TabPanel from "../../../components/TabPanel/TabPanel";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import TableSearch from "../../../components/TableSearch/TableSearch";
import FilterUsers from "../../../components/FilterUsers/FilterUsers";
// ! IMAGES IMPORTS
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import allFlag from "../../../assets/images/products/allFlag.svg";
import usaFlag from "../../../assets/images/products/usaFlag.svg";
import ukFlag from "../../../assets/images/products/ukFlag.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import sort from "../../../assets/icons/sort.svg";
import analyticsUp from "../../../assets/icons/analyticsUp.svg";
import analyticsDown from "../../../assets/icons/analyticsDown.svg";
import orders from "../../../assets/icons/sidenav/orders.svg";
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const locationData = [
  { title: "Content 1", value: "content1" },
  { title: "Content 2", value: "content2" },
  { title: "Content 3", value: "content3" },
  { title: "Content 4", value: "content4" },
  { title: "Content 5", value: "content5" },
  { title: "Content 6", value: "content6" },
  { title: "Content 7", value: "content7" },
  { title: "Content 8", value: "content8" },
  { title: "Content 9", value: "content9" },
  { title: "Content 10", value: "content10" },
  { title: "Content 11", value: "content11" },
  { title: "Content 12", value: "content12" },
];

const taggedWithData = [
  { title: "Tag 1", value: "tag1" },
  { title: "Tag 2", value: "tag2" },
  { title: "Tag 3", value: "tag3" },
  { title: "Tag 4", value: "tag4" },
  { title: "Tag 5", value: "tag5" },
  { title: "Tag 6", value: "tag6" },
  { title: "Tag 7", value: "tag7" },
  { title: "Tag 8", value: "tag8" },
  { title: "Tag 9", value: "tag9" },
  { title: "Tag 10", value: "tag10" },
  { title: "Tag 11", value: "tag11" },
  { title: "Tag 12", value: "tag12" },
];

const DraftOrder = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? POPOVERS STARTS HERE

  // * FLAG POPOVERS STARTS
  const [anchorFlagEl, setAnchorFlagEl] = React.useState(null);
  const handleFlagClick = (event) => {
    setAnchorFlagEl(event.currentTarget);
  };
  const handleFlagClose = () => {
    setAnchorFlagEl(null);
  };
  const openFlag = Boolean(anchorFlagEl);
  const idFlag = openFlag ? "simple-popover" : undefined;
  // * FLAG POPOVERS ENDS

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

  // * LOCATION POPOVERS STARTS
  const [anchorLocationEl, setAnchorLocationEl] = React.useState(null);

  const handleLocationClick = (event) => {
    setAnchorLocationEl(event.currentTarget);
  };

  const handleLocationClose = () => {
    setAnchorLocationEl(null);
  };

  const openLocation = Boolean(anchorLocationEl);
  const idLocation = openLocation ? "simple-popover" : undefined;
  // * LOCATION POPOVERS ENDS

  // * NO OF ORDERS POPOVERS STARTS
  const [anchorOrdersEl, setAnchorOrdersEl] = React.useState(null);

  const handleOrdersClick = (event) => {
    setAnchorOrdersEl(event.currentTarget);
  };

  const handleOrdersClose = () => {
    setAnchorOrdersEl(null);
  };

  const openOrders = Boolean(anchorOrdersEl);
  const idOrders = openOrders ? "simple-popover" : undefined;
  // * NO OF ORDERS POPOVERS ENDS

  // * STATUS POPOVERS STARTS
  const [anchorStatusEl, setAnchorStatusEl] = React.useState(null);

  const handleStatusClick = (event) => {
    setAnchorStatusEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorStatusEl(null);
  };

  const openStatus = Boolean(anchorStatusEl);
  const idStatus = openStatus ? "simple-popover" : undefined;
  // * STATUS POPOVERS ENDS

  // * DAYS POPOVERS STARTS
  const [anchorDaysEl, setDaysEl] = React.useState(null);

  const handleDaysClick = (event) => {
    setDaysEl(event.currentTarget);
  };

  const handleDaysClose = () => {
    setDaysEl(null);
  };

  const openDays = Boolean(anchorDaysEl);
  const idDays = openDays ? "simple-popover" : undefined;
  // * DAYS POPOVERS ENDS

  // * TAGGED WITH POPOVERS STARTS
  const [anchorTaggedWithEl, setAnchorTaggedWithEl] = React.useState(null);

  const handleTaggedWithClick = (event) => {
    setAnchorTaggedWithEl(event.currentTarget);
  };

  const handleTaggedWithClose = () => {
    setAnchorTaggedWithEl(null);
  };

  const openTaggedWith = Boolean(anchorTaggedWithEl);
  const idTaggedWith = openTaggedWith ? "simple-popover" : undefined;
  // * TAGGED WITH POPOVERS ENDS

  // * CUSTOMER POPOVERS STARTS
  const [anchorCustomerEl, setAnchorCustomerEl] = React.useState(null);

  const handleCustomerClick = (event) => {
    setAnchorCustomerEl(event.currentTarget);
  };

  const handleCustomerClose = () => {
    setAnchorCustomerEl(null);
  };

  const openCustomer = Boolean(anchorCustomerEl);
  const idCustomer = openCustomer ? "simple-popover" : undefined;
  // * CUSTOMER POPOVERS ENDS

  // * NO OF ORDERS POPOVERS STARTS
  const [anchorDateEl, setAnchorDateEl] = React.useState(null);

  const handleDateClick = (event) => {
    setAnchorDateEl(event.currentTarget);
  };

  const handleDateClose = () => {
    setAnchorDateEl(null);
  };

  const openDate = Boolean(anchorDateEl);
  const idDate = openDate ? "simple-popover" : undefined;
  // * NO OF ORDERS POPOVERS ENDS

  // ? POPOVERS ENDS HERE

  // ? DATE PICKER STARTS HERE
  const [dateStartValue, setDateStartValue] = React.useState(new Date());
  // ? DATE PICKER ENDS HERE

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Draft Order</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Orders Module"} icon={orders} />
          <ExportDialog dialogName={"Orders"} />
          <ImportSecondDialog dialogName={"Orders"} />
          <Link
            to="/orders/allOrders/create"
            className="button-gradient py-2 px-4"
          >
            <p>+ Create Order</p>
          </Link>
        </div>
      </div>
      <div className="row mt-4">
        <Paper
          sx={{ width: "100%", mb: 0, mt: 0, p: 0 }}
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
              <Tab label="Invoice Sent" className="tabs-head" />
              <Tab label="Completed" className="tabs-head" />
            </Tabs>
            <div
              className="tabs-country c-pointer"
              aria-describedby={idFlag}
              variant="contained"
              onClick={handleFlagClick}
            >
              <img src={indiaFlag} alt="indiaFlag" height={15} />
              <p className="mx-2 text-lightBlue">India</p>
              <img src={arrowDown} alt="arrowDown" />
            </div>
            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              id={idFlag}
              open={openFlag}
              anchorEl={anchorFlagEl}
              onClose={handleFlagClose}
            >
              <div className="px-1 py-2">
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={allFlag} alt="allFlag" height={20} />
                  <p className="ms-2 text-lightBlue">All</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={ukFlag} alt="usaFlag" height={15} />
                  <p className="ms-2 text-lightBlue">UK</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={usaFlag} alt="usaFlag" height={15} />
                  <p className="ms-2 text-lightBlue">USA</p>
                </div>
              </div>
            </Popover>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
            <div className="d-flex ms-2">
              <div className="d-flex product-button__box">
                <button
                  className="button-grey py-1 px-3 d-none d-md-block"
                  aria-describedby={idStatus}
                  variant="contained"
                  onClick={handleStatusClick}
                >
                  <small className="text-lightBlue">Status</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
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
                  id={idStatus}
                  open={openStatus}
                  anchorEl={anchorStatusEl}
                  onClose={handleStatusClose}
                >
                  <div className=" px-1">
                    <FormGroup className="tags-checkbox">
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="Active"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="In-Active"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="Blocked"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="Archived"
                      />
                    </FormGroup>
                  </div>
                </Popover>

                <button
                  className="button-grey py-1 px-3 d-none d-md-block"
                  aria-describedby={idDate}
                  variant="contained"
                  onClick={handleDateClick}
                >
                  <small className="text-lightBlue">Created at</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
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
                  id={idDate}
                  open={openDate}
                  anchorEl={anchorDateEl}
                  onClose={handleDateClose}
                >
                  <div className="py-2">
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDateTimePicker
                        value={dateStartValue}
                        onChange={(newValue) => {
                          setDateStartValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Popover>

                <button
                  className="button-grey py-1 px-3 d-none d-md-block"
                  aria-describedby={idDate}
                  variant="contained"
                  onClick={handleDateClick}
                >
                  <small className="text-lightBlue">Updated at</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
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
                  id={idDate}
                  open={openDate}
                  anchorEl={anchorDateEl}
                  onClose={handleDateClose}
                >
                  <div className="py-2">
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDateTimePicker
                        value={dateStartValue}
                        onChange={(newValue) => {
                          setDateStartValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Popover>
                <button
                  className="button-grey py-2 px-3 d-none d-md-block"
                  aria-describedby={idTaggedWith}
                  variant="contained"
                  onClick={handleTaggedWithClick}
                >
                  <small className="text-lightBlue">Tagged With</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
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
                  id={idTaggedWith}
                  open={openTaggedWith}
                  anchorEl={anchorTaggedWithEl}
                  onClose={handleTaggedWithClose}
                >
                  <div className="py-2">
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      sx={{ width: 300 }}
                      options={taggedWithData}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.title}
                      size="small"
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            checked={selected}
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                          <small className="text-lightBlue">
                            {option.title}
                          </small>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          placeholder="Search"
                          inputRef={(input) => input?.focus()}
                        />
                      )}
                    />
                  </div>
                </Popover>

                <button
                  className="button-grey py-1 px-3 d-none d-md-block"
                  aria-describedby={idCustomer}
                  variant="contained"
                  onClick={handleCustomerClick}
                >
                  <small className="text-lightBlue">Customer</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
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
                  id={idCustomer}
                  open={openCustomer}
                  anchorEl={anchorCustomerEl}
                  onClose={handleCustomerClose}
                >
                  <div className="py-2">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      options={locationData}
                      getOptionLabel={(option) => option.title}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <small className="text-lightBlue my-1">
                            {option.title}
                          </small>
                        </li>
                      )}
                      sx={{
                        width: 200,
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search"
                          inputRef={(input) => input?.focus()}
                        />
                      )}
                    />
                  </div>
                </Popover>
              </div>
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
            <DraftOrderTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DraftOrderTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DraftOrderTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default DraftOrder;
