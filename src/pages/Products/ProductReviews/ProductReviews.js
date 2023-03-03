import React from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import ProductReviewsTable from "./ProductReviewsTable";
import TabPanel from "../../../components/TabPanel/TabPanel";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
// ! IMAGES IMPORTS
import cancel from "../../../assets/icons/cancel.svg";
import sort from "../../../assets/icons/sort.svg";
import products from "../../../assets/icons/sidenav/products.svg";
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Slide,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const ProductReviews = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? POPOVERS STARTS HERE

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

  // ? POPOVERS ENDS HERE

  const groupData = [
    { title: "No Group", value: "content1" },
    { title: "VIP", value: "content2" },
    { title: "VVIP", value: "content3" },
    { title: "Wholesaler", value: "content4" },
    { title: "Highest Orders", value: "content5" },
    { title: "Loyal Users", value: "content6" },
    { title: "New Users", value: "content7" },
    { title: "Default Users", value: "content8" },
    { title: "Guest Users", value: "content9" },
  ];

  // ? FIELD SETS DIALOG STARTS HERE
  const [openManageGroups, setOpenManageGroups] = React.useState(false);

  const handleOpenManageGroups = () => {
    setOpenManageGroups(true);
  };

  const handleOpenManageGroupsClose = () => {
    setOpenManageGroups(false);
  };
  // ? FIELD SETS DIALOG ENDS HERE

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Product Reviews</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Product Module"} icon={products} />
          <Link
            to="/products/reviews/create"
            className="button-gradient py-2 px-4 ms-3"
          >
            <p>Create Reviews</p>
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
              <Tab label="Approved" className="tabs-head" />
              <Tab label="Disapproved" className="tabs-head" />
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
            <div className="d-flex ms-2">
              <button
                className="button-grey py-2 px-3"
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
          </div>
          <TabPanel value={value} index={0}>
            <ProductReviewsTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProductReviewsTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProductReviewsTable />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ProductReviewsTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default ProductReviews;
