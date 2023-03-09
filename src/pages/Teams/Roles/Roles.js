import React from "react";
import { Link } from "react-router-dom";
import "./Roles.scss";
// ! COMPONENT IMPORTS
import RolesTable from "./RolesTable";
import TabPanel from "../../../components/TabPanel/TabPanel";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
// ! IMAGES IMPORTS
import teams from "../../../assets/icons/sidenav/teams.svg";
// ! MATERIAL IMPORTS
import { Box, Paper, Tab, Tabs, Tooltip } from "@mui/material";
// ! MATERIAL ICONS IMPORT
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Roles = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <div className="d-flex w-auto align-items-center px-0">
          <h4 className="page-heading w-auto ps-0 me-2">Team Roles</h4>

          <Tooltip title="Lorem ipsum" placement="top">
            <InfoOutlinedIcon
              sx={{ color: "#c8d8ff", fontSize: 20 }}
              className="c-pointer"
            />
          </Tooltip>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Team Role Module"} icon={teams} />
          <Link to="/teams/roles/create" className="button-gradient py-2 px-4">
            <p>+ Create Roles</p>
          </Link>
        </div>
      </div>

      <div className="row">
        <Paper
          sx={{ width: "100%", mb: 0, mt: 3, p: 0 }}
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
            <TableSearch />
          </div>
          <TabPanel value={value} index={0}>
            <RolesTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RolesTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <RolesTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Roles;
