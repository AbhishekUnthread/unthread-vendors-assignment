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
// ! MATERIAL IMPORTS
import { Box, Paper, Tab, Tabs } from "@mui/material";

const ProductInventory = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Inventory</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Product Inventory"} icon={products} />
          <button className="button-transparent py-2 px-3 me-1">
            <p className="text-lightBlue">Transfer Inventory</p>
          </button>
          <ExportDialog dialogName={"Product Inventory"} />
          <ImportSecondDialog dialogName={"Product Inventory"} />
          <Link
            to="/products/inventory/create"
            className="button-gradient py-2 px-4 ms-3"
          >
            <p>Add Store</p>
          </Link>
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
              <Tab label="India" className="tabs-head" />
              <Tab label="USA" className="tabs-head" />
              <Tab label="UK" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          <TabPanel value={value} index={0}>
            <ProductInventoryTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProductInventoryTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProductInventoryTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default ProductInventory;
