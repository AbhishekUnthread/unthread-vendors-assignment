import React from "react";
import { Link } from "react-router-dom";
import "./ReturnRefunds.scss";
// ! COMPONENT IMPORTS
import ReturnRefundsTable from "./ReturnRefundsTable";
import TabPanel from "../../../components/TabPanel/TabPanel";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import TableSearch from "../../../components/TableSearch/TableSearch";
import FilterOrders from "../../../components/FilterOrders/FilterOrders";
import OrderSortFilter from "../OrderSortFilter";
import OrderColumnsFilter from "../OrderColumnsFilter";
import OrderTagsFilter from "../OrderTagsFilter";
import OrderStatusFilter from "../OrderStatusFilter";
import OrderLocationFilter from "../OrderLocationFilter";
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

const ReturnRefunds = () => {
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

  // * ORDER STATUS POPOVERS STARTS
  const [anchorOrderStatusEl, setAnchorOrderStatusEl] = React.useState(null);

  const handleOrderStatusClick = (event) => {
    setAnchorOrderStatusEl(event.currentTarget);
  };

  const handleOrderStatusClose = () => {
    setAnchorOrderStatusEl(null);
  };

  const openOrderStatus = Boolean(anchorOrderStatusEl);
  const idOrderStatus = openOrderStatus ? "simple-popover" : undefined;
  // * ORDER STATUS POPOVERS ENDS

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

  // ? POPOVERS ENDS HERE

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Return & Refund Requests</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Orders Module"} icon={orders} />
          <ExportDialog dialogName={"Orders"} />
          <ImportSecondDialog dialogName={"Orders"} />
          <Link
            to="/orders/returnRefunds/create"
            className="button-gradient py-2 px-4"
          >
            <p>+ Create Request</p>
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
              <Tab label="Today's" className="tabs-head" />
              <Tab label="Last 7 Days" className="tabs-head" />
            </Tabs>
            {/* <div
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
            </Popover> */}
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
            <div className="d-flex ms-2">
              <div className="d-flex product-button__box">
                <OrderLocationFilter />
                <OrderStatusFilter />
                <OrderTagsFilter />
                <FilterOrders buttonName={"More Filters"} />
              </div>
              <OrderSortFilter />
              <OrderColumnsFilter />
            </div>
          </div>
          <TabPanel value={value} index={0}>
            <ReturnRefundsTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ReturnRefundsTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ReturnRefundsTable />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ReturnRefundsTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default ReturnRefunds;
