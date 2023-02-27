import React from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AdditionalFieldsTable from "./AdditionalFieldsTable";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";
// ! MATERIAL IMPORTS
import { Box, Paper, Tab, Tabs } from "@mui/material";

const AdditionalFields = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Additional Fields</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Parameters / Collections"} />
          <ExportDialog dialogName={"Collections"} />
          <ImportSecondDialog dialogName={"Collections"} />
          <Link
            to="/parameters/additionalFields/createFieldSets"
            className="button-gradient py-2 px-4 ms-3"
          >
            <p>Create Field Sets</p>
          </Link>
        </div>
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
              <Tab label="Draft" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          <TabPanel value={value} index={0}>
            <AdditionalFieldsTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AdditionalFieldsTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AdditionalFieldsTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default AdditionalFields;
