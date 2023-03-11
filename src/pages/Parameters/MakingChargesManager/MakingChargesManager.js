import React from "react";
import "../../Products/AllProducts/AllProducts.scss";
// ! COMPONENT IMPORTS
import TabPanel from "../../../components/TabPanel/TabPanel";
import MakingChargesManagerTable from "./MakingChargesManagerTable";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import TableSearch from "../../../components/TableSearch/TableSearch";
// ! IMAGES IMPORTS
import cancel from "../../../assets/icons/cancel.svg";
import parameters from "../../../assets/icons/sidenav/parameters.svg";
import sort from "../../../assets/icons/sort.svg";
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  OutlinedInput,
  Paper,
  Slide,
  Tab,
  Tabs,
  Select,
  MenuItem,
  Radio,
  FormControlLabel,
  Popover,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
// ! MATERIAL ICONS IMPORTS

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const MakingChargesManager = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  // ? ADD STANDARDS DIALOG STARTS HERE
  const [openAddStandards, setOpenAddStandards] = React.useState(false);

  const handleAddStandards = () => {
    setOpenAddStandards(true);
  };

  const handleAddStandardsClose = () => {
    setOpenAddStandards(false);
  };
  // ? ADD STANDARDS DIALOG ENDS HERE

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/parameters/priceMaster/inventory" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>
          <h5 className="page-heading ps-1 ms-2">Making Charges Manager</h5>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer
            headingName={"Parameters / Price Master"}
            icon={parameters}
          />
          <ExportDialog dialogName={"Price Master"} />
          <ImportSecondDialog dialogName={"Price Master"} />
          <Link
            to="/parameters/priceMaster/create"
            className="button-transparent py-2 px-3 me-1"
          >
            <p className="text-lightBlue">Settings</p>
          </Link>

          {/* <button className="button-lightBlue-outline px-3 py-1">
            <p>Live Rates</p>
          </button> */}
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
              <Tab label="IJ-SI" className="tabs-head" />
              <Tab label="JK-VSSI" className="tabs-head" />
              <Tab label="GH-VSSI" className="tabs-head" />
              <Tab label="EF-VSS" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
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

            <button
              className="button-gradient py-2 px-4 ms-2 c-pointer"
              onClick={handleAddStandards}
            >
              <p>Add Standards</p>
            </button>

            <Dialog
              open={openAddStandards}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleAddStandardsClose}
              aria-describedby="alert-dialog-slide-description"
              maxWidth="md"
              fullWidth={true}
            >
              <DialogTitle>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column ">
                    <h5 className="text-lightBlue fw-500">Add Standards</h5>

                    <small className="text-grey-6 mt-1 d-block">
                      ⓘ Some Dummy Content to explain
                    </small>
                  </div>
                  <img
                    src={cancel}
                    alt="cancel"
                    width={30}
                    onClick={handleAddStandardsClose}
                    className="c-pointer"
                  />
                </div>
              </DialogTitle>
              <hr className="hr-grey-6 my-0" />

              <DialogContent className="py-3 px-4">
                <div className="row mt-3">
                  <div className="col-12">
                    <p className="text-lightBlue mb-1">Select Category</p>

                    <FormControl sx={{ width: "100%" }} size="small">
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        // value={metal}
                        value=""
                        placeholder="Fixed"
                        // onChange={handleMetalChange}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value={10}>Category 1</MenuItem>
                        <MenuItem value={20}>Category 2</MenuItem>
                        <MenuItem value={30}>Category 3</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="row mb-3 mt-4">
                  <div className="col-12">
                    <div className="row bg-black-21 rounded-8 mx-0 py-3">
                      <div className="col-12 ">
                        <div className="d-flex">
                          <p className="text-lightBlue">
                            Price according to weight range
                          </p>
                          <Tooltip title="Lorem ipsum" placement="top">
                            <img
                              src={info}
                              alt="info"
                              className="c-pointer ms-2"
                              width={13.5}
                            />
                          </Tooltip>
                        </div>
                      </div>
                      <div className="col-md-3 col-6 mt-3">
                        <p className="text-lightBlue mb-1">Min Wt.</p>
                        <FormControl className="w-100 px-0">
                          <OutlinedInput
                            placeholder="Enter Min Weight"
                            size="small"
                          />
                        </FormControl>
                      </div>
                      <div className="col-md-3 col-6 mt-3">
                        <p className="text-lightBlue mb-1">Max Wt.</p>
                        <FormControl className="w-100 px-0">
                          <OutlinedInput
                            placeholder="Enter Max Weight"
                            size="small"
                          />
                        </FormControl>
                      </div>
                      <div className="col-md-3 col-6 mt-3">
                        <p className="text-lightBlue mb-1">Price</p>
                        <FormControl className="w-100 px-0">
                          <OutlinedInput
                            placeholder="Enter Price"
                            size="small"
                          />
                        </FormControl>
                      </div>
                      <div className="col-6 col-md-3 mt-3">
                        <p className="text-lightBlue mb-1">Price Type</p>

                        <FormControl sx={{ width: "100%" }} size="small">
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            // value={metal}
                            value=""
                            placeholder="Price Type"
                            // onChange={handleMetalChange}
                          >
                            <MenuItem value="">NA</MenuItem>
                            <MenuItem value={10}>Per Gram</MenuItem>
                            <MenuItem value={20}>Fixed Price</MenuItem>
                          </Select>
                        </FormControl>
                      </div>

                      <div className="col-12 text-end mt-3">
                        <p className="text-blue-2">+ Add More Range</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
              <hr className="hr-grey-6 my-0" />
              <DialogActions className="d-flex justify-content-between px-4 py-3">
                <button
                  className="button-grey py-2 px-5"
                  onClick={handleAddStandardsClose}
                >
                  <p className="text-lightBlue">Cancel</p>
                </button>
                <button
                  className="button-gradient py-2 px-5"
                  onClick={handleAddStandardsClose}
                >
                  <p>Save</p>
                </button>
              </DialogActions>
            </Dialog>
          </div>
          <TabPanel value={value} index={0}>
            <MakingChargesManagerTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MakingChargesManagerTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MakingChargesManagerTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default MakingChargesManager;
