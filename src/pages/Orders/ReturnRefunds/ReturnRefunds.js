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
import orders from "../../../assets/icons/sidenav/orders.svg";
// ! MATERIAL IMPORTS
import { Box, Paper, Tab, Tabs } from "@mui/material";

const ReturnRefunds = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
