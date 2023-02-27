import React from "react";
import "./Members.scss";
// ! COMPONENT IMPORTS
import MembersTable from "./MembersTable";
import TabPanel from "../../../components/TabPanel/TabPanel";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
import UploadFileRounded from "../../../components/UploadFileRounded/UploadFileRounded";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
// ! IMAGES IMPORTS
import info from "../../../assets/icons/info.svg";
import uploadProfile from "../../../assets/icons/uploadProfile.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Paper,
  Tab,
  Tabs,
  FormControl,
  InputAdornment,
  OutlinedInput,
  SwipeableDrawer,
} from "@mui/material";
// ! MATERIAL ICONS IMPORT
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

const Members = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? ADD MEMBER DRAWER STARTS HERE

  const [addProductDrawer, setAddProductDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleAddMemberDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAddProductDrawer({ ...addProductDrawer, [anchor]: open });
  };
  // ? ADD MEMBER DRAWER ENDS HERE

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <div className="d-flex w-auto align-items-center">
          <h4 className="page-heading w-auto ps-0 me-2">Team Members</h4>
          <InfoOutlinedIcon sx={{ color: "#c8d8ff", fontSize: 20 }} />
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Team Role Module"} />
          <ExportDialog dialogName={"Team Members"} />
          <ImportSecondDialog dialogName={"Team Members"} />
          <button
            className="button-gradient py-2 px-4"
            onClick={toggleAddMemberDrawer("right", true)}
          >
            <p>+ Add Team Member</p>
          </button>

          <SwipeableDrawer
            anchor="right"
            open={addProductDrawer["right"]}
            onClose={toggleAddMemberDrawer("right", false)}
            onOpen={toggleAddMemberDrawer("right", true)}
            className="role-drawer"
          >
            <div className="d-flex align-items-center pt-3">
              <KeyboardArrowLeftOutlinedIcon
                sx={{ fontSize: 25, color: "#c8d8ff" }}
                onClick={toggleAddMemberDrawer("right", false)}
                className="c-pointer"
              />
              <div>
                <h5 className="text-lightBlue fw-500">Add Team Member</h5>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-3" />
            <div className="px-3">
              <div className="row">
                <div className="col-md-4 pt-1">
                  <UploadFileRounded imageName={uploadProfile} />
                </div>
                <div className="col-md-8">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Name</p>
                    <img src={info} alt="info" width={15} />
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Name" size="small" />
                  </FormControl>
                  <div className="d-flex mb-1 mt-3">
                    <p className="text-lightBlue me-2">Designation</p>
                    <img src={info} alt="info" width={15} />
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Designation"
                      size="small"
                    />
                  </FormControl>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex mb-1 justify-content-between">
                    <p className="text-lightBlue me-2">Email ID</p>
                    <small className="text-blue-2">Verify</small>
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Email ID" size="small" />
                  </FormControl>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex mb-1 justify-content-between">
                    <p className="text-lightBlue me-2">Mobile Number</p>
                    <small className="text-blue-2">Verify</small>
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter Mobile Number"
                      size="small"
                      sx={{ paddingLeft: 0 }}
                      startAdornment={
                        <InputAdornment position="start">
                          <AppMobileCodeSelect />
                          {/* &nbsp;&nbsp;&nbsp;&nbsp;| */}
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>

                <div className="col-12 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Member Id</p>
                    <img src={info} alt="info" width={15} />
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Member ID" size="small" />
                  </FormControl>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Select Roles</p>
                    <img src={info} alt="info" width={15} />
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput placeholder="Enter Member ID" size="small" />
                  </FormControl>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue me-2">Description</p>
                    <img src={info} alt="info" width={15} />
                  </div>
                  <FormControl className="w-100 px-0">
                    <OutlinedInput
                      placeholder="Enter some Description"
                      size="small"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column py-3 px-4 role-buttons">
              <hr className="hr-grey-6 my-3 w-100" />
              <div className="d-flex justify-content-between">
                <button className="button-gradient py-2 px-5 w-auto ">
                  <p>Add to Team</p>
                </button>
                <button className="button-lightBlue-outline py-2 px-4">
                  <p>Cancel</p>
                </button>
              </div>
            </div>
          </SwipeableDrawer>
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
            <MembersTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MembersTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MembersTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Members;
