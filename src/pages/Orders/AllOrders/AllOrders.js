import React from "react";
import { Link } from "react-router-dom";
import "./AllOrders.scss";
// ! COMPONENT IMPORTS
import AllOrdersTable from "./AllOrdersTable";
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
import OrderSortFilter from "../OrderSortFilter";
import OrderColumnsFilter from "../OrderColumnsFilter";
import OrderTagsFilter from "../OrderTagsFilter";
import OrderStatusFilter from "../OrderStatusFilter";
import OrderLocationFilter from "../OrderLocationFilter";
import FilterOrders from "../../../components/FilterOrders/FilterOrders";

const AllOrders = () => {
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

  // ? POPOVERS ENDS HERE

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Orders</h4>
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

      <div className="row mt-2">
        <div className="col-md-3 col-6 ps-0 my-3 d-flex">
          <div className="border-grey-5 bg-black-15 rounded-8 py-3 px-3 flex-grow-1">
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex flex-column">
                <h2 className="text-lightBlue fw-400">50</h2>
                <small className="text-grey-6 mt-2">Orders</small>
              </div>
              <div className="d-flex flex-column align-items-end">
                <img
                  src={analyticsUp}
                  alt="analyticsUp"
                  className=""
                  width={25}
                />
                <small className="text-green-2 mt-3">+10.78 %</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 ps-0 my-3 d-flex">
          <div className="border-grey-5 bg-black-15 rounded-8 py-3 px-3 flex-grow-1">
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex flex-column">
                <h2 className="text-lightBlue fw-400">50</h2>
                <small className="text-grey-6 mt-2">Sales Amount</small>
              </div>
              <div className="d-flex flex-column align-items-end">
                <img
                  src={analyticsDown}
                  alt="analyticsDown"
                  className=""
                  width={25}
                />
                <small className="text-red-4 mt-3">-10.78 %</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 ps-0 my-3 d-flex">
          <div className="border-grey-5 bg-black-15 rounded-8 py-3 px-3 flex-grow-1">
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex flex-column">
                <h2 className="text-lightBlue fw-400">50</h2>
                <small className="text-grey-6 mt-2">Fulfillment Items</small>
              </div>
              <div className="d-flex flex-column align-items-end">
                <img
                  src={analyticsUp}
                  alt="analyticsUp"
                  className=""
                  width={25}
                />
                <small className="text-green-2 mt-3">+10.78 %</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 ps-0 pe-0 my-3 d-flex">
          <div
            className="border-grey-5 bg-black-15 rounded-8 py-3 px-3 text-center flex-grow-1 d-flex align-items-center justify-content-center c-pointer"
            onClick={handleDaysClick}
          >
            <h3 className="text-lightBlue">30 Days</h3>
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
            id={idDays}
            open={openDays}
            anchorEl={anchorDaysEl}
            onClose={handleDaysClose}
          >
            <div className="py-2 px-1">
              <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                Last 7 Days
              </small>
              <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                Last 15 Days
              </small>
              <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                Last 30 Days
              </small>
              <small className="text-blue-gradient rounded-3 p-2 d-block c-pointer">
                Custom Date
              </small>
            </div>
          </Popover>
        </div>
      </div>

      <div className="row">
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
              <Tab label="New" className="tabs-head" />
              <Tab label="Complete" className="tabs-head" />
              <Tab label="Today" className="tabs-head" />
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
            <AllOrdersTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AllOrdersTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AllOrdersTable />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AllOrdersTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default AllOrders;
