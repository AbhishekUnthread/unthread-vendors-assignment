import React from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import ProductInventoryTable from "./ProductInventoryTable";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";
// ! IMAGES IMPORTS
import products from "../../../assets/icons/sidenav/products.svg";
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import allFlag from "../../../assets/images/products/allFlag.svg";
import usaFlag from "../../../assets/images/products/usaFlag.svg";
import ukFlag from "../../../assets/images/products/ukFlag.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import { Box, Paper, Tab, Tabs, Popover } from "@mui/material";
import AllInventory from "./AllInventory";
import ArchivedInventory from "./ArchivedInventory";

const ProductInventory = () => {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Inventory</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer
            headingName={"Product Inventory"}
            icon={products}
          />
          <button className="button-transparent py-2 px-3 me-1">
            <p className="text-lightBlue">Transfer Inventory</p>
          </button>
          <ExportDialog dialogName={"Product Inventory"} />
          <ImportSecondDialog dialogName={"Product Inventory"} />
          <Link
            to="/products/inventory/create"
            className="button-gradient py-2 px-4 ms-3">
            <p>Add Store</p>
          </Link>
        </div>
      </div>

      <div className="row mt-4">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 0, p: 0 }}
          className="border-grey-5 bg-black-15">
          <Box
            sx={{ width: "100%" }}
            className="d-flex justify-content-between tabs-header-box">
            {/* variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile */}
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs">
              <Tab
                label="All"
                className="tabs-head"
              />
              <Tab
                label="Archived"
                className="tabs-head"
              />
            </Tabs>
            {/* <div
              className="tabs-country c-pointer"
              aria-describedby={idFlag}
              variant="contained"
              onClick={handleFlagClick}>
              <img
                src={indiaFlag}
                alt="indiaFlag"
                height={15}
              />
              <p className="mx-2 text-lightBlue">India</p>
              <img
                src={arrowDown}
                alt="arrowDown"
              />
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
              onClose={handleFlagClose}>
              <div className="px-1 py-2">
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img
                    src={allFlag}
                    alt="allFlag"
                    height={20}
                  />
                  <p className="ms-2 text-lightBlue">All</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img
                    src={ukFlag}
                    alt="usaFlag"
                    height={15}
                  />
                  <p className="ms-2 text-lightBlue">UK</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img
                    src={usaFlag}
                    alt="usaFlag"
                    height={15}
                  />
                  <p className="ms-2 text-lightBlue">USA</p>
                </div>
              </div>
            </Popover> */}
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          <TabPanel
            value={value}
            index={0}>
            <AllInventory />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}>
            <ArchivedInventory />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default ProductInventory;
