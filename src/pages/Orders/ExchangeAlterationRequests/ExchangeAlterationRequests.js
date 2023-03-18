import React from "react";
import "./ExchangeAlterationRequests.scss";
// ! COMPONENT IMPORTS
import ExchangeAlterationRequestsTable from "./ExchangeAlterationRequestsTable";
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

const ExchangeAlterationRequests = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? POPOVERS STARTS HERE

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">
          Exchange & Alteration Requests
        </h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Orders Module"} icon={orders} />
          <ExportDialog dialogName={"Orders"} />
          <ImportSecondDialog dialogName={"Orders"} />
          <button
            // to="/orders/returnRefunds/create"
            className="button-gradient py-2 px-4"
          >
            <p>+ Create Request</p>
          </button>
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
            <ExchangeAlterationRequestsTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ExchangeAlterationRequestsTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ExchangeAlterationRequestsTable />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ExchangeAlterationRequestsTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default ExchangeAlterationRequests;
