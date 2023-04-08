import React from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import BundleDiscountTable from "./BundleDiscountTable";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";
// ! IMAGES IMPORTS
import sort from "../../../assets/icons/sort.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  FormControl,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
} from "@mui/material";
// ! MATERIAL ICONS IMPORT
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const BundleDiscount = () => {
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

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <div className="d-flex w-auto align-items-center px-0">
          <h4 className="page-heading w-auto ps-0 me-2">Bundle Discount</h4>

          <Tooltip title="Lorem ipsum" placement="top">
            <InfoOutlinedIcon
              sx={{ color: "#c8d8ff", fontSize: 20 }}
              className="c-pointer"
            />
          </Tooltip>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          {/* <ViewLogsDrawer
            headingName={"Offers / Bundle Discount"}
            icon={discounts}
          />
          <ImportSecondDialog dialogName={"Bundle Discount"} /> */}
          <Link
            to="/offers/bundleDiscount/create"
            className="button-gradient py-2 px-4 ms-3"
          >
            <p>+ Create Bundle</p>
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
              <Tab label="Active" className="tabs-head" />
              <Tab label="Scheduled" className="tabs-head" />
              <Tab label="Expired" className="tabs-head" />
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
          </div>
          <TabPanel value={value} index={0}>
            <BundleDiscountTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BundleDiscountTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BundleDiscountTable />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <BundleDiscountTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default BundleDiscount;
