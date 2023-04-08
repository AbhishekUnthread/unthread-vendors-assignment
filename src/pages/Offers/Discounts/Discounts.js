import React from "react";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import DiscountsTable from "./DiscountsTable";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";
// ! IMAGES IMPORTS
import discounts from "../../../assets/icons/sidenav/discounts.svg";
import sort from "../../../assets/icons/sort.svg";
import cancel from "../../../assets/icons/cancel.svg";
import productDiscount from "../../../assets/icons/productDiscount.svg";
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
  Slide,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
// ! MATERIAL ICONS IMPORT
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const Discounts = () => {
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

  // ? CATEGORIES DIALOG STARTS HERE
  const [openCreateDiscount, setOpenCreateDiscount] = React.useState(false);

  const handleCreateDiscount = () => {
    setOpenCreateDiscount(true);
  };

  const handleCreateDiscountClose = () => {
    setOpenCreateDiscount(false);
  };
  // ? CATEGORIES DIALOG ENDS HERE

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <div className="d-flex w-auto align-items-center px-0">
          <h4 className="page-heading w-auto ps-0 me-2">Discounts</h4>
          <Tooltip title="Lorem ipsum" placement="top">
            <InfoOutlinedIcon
              sx={{ color: "#c8d8ff", fontSize: 20 }}
              className="c-pointer"
            />
          </Tooltip>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Offers / Discounts"} icon={discounts} />
          <ImportSecondDialog dialogName={"Discounts"} />
          <button
            className="button-gradient py-2 px-4 ms-3"
            onClick={handleCreateDiscount}
          >
            <p>+ Create Discount</p>
          </button>

          <Dialog
            open={openCreateDiscount}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCreateDiscountClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="md"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">
                    Select Type of Discount
                  </h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleCreateDiscountClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="py-3 px-4">
              <div className="row">
                {[...Array(5)].map((elementInArray, index) => (
                  <div className="col-6 my-3">
                    <Link
                      to="/offers/discounts/create"
                      className="d-flex p-3 rounded-8 hover-back-two c-pointer text-decoration-none"
                    >
                      <img
                        src={productDiscount}
                        alt="productDiscount"
                        width={100}
                      />
                      <div className="d-flex ms-3 flex-column">
                        <p className="text-lightBlue">Product Discount</p>
                        <small className="d-block mt-2 text-grey-6">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Esse odio amet
                        </small>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-end px-4 py-3">
              <button
                className="button-lightBlue-outline py-2 px-5"
                onClick={handleCreateDiscountClose}
              >
                <p className="">Cancel</p>
              </button>
              {/* <button
                className="button-gradient py-2 px-5"
                onClick={handleCreateDiscountClose}
              >
                <p>Save</p>
              </button> */}
            </DialogActions>
          </Dialog>
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
              <Tab label="Product Discount" className="tabs-head" />
              <Tab label="Cart Discount" className="tabs-head" />
              <Tab label="Free Shipping" className="tabs-head" />
              <Tab label="Buy X, Get Y" className="tabs-head" />
              <Tab label="Bulk/Tired Discount Pricing" className="tabs-head" />
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
            <DiscountsTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DiscountsTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DiscountsTable />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DiscountsTable />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <DiscountsTable />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <DiscountsTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Discounts;
