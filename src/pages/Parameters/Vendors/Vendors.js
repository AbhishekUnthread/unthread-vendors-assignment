import React, { forwardRef, useState, useEffect, useReducer } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";
// ! COMPONENT IMPORTS
import TabPanel from "../../../components/TabPanel/TabPanel";
import VendorsTable from "./VendorsTable";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import {
  useGetAllVendorsQuery,
  useCreateVendorMutation,
  useDeleteVendorMutation,
  useBulkCreateVendorMutation,
  useEditVendorMutation,
  useBulkDeleteVendorMutation,
  useBulkEditVendorMutation,
  useGetAllVendorsStatusCountQuery,
} from "../../../features/parameters/vendors/vendorsApiSlice";
import "../../Products/AllProducts/AllProducts.scss";
// ! ASSETS IMPORTS
import cancel from "../../../assets/icons/cancel.svg";
import parameters from "../../../assets/icons/sidenav/parameters.svg";
import sort from "../../../assets/icons/sort.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
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
  Chip,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Popover,
  FormGroup,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
// ! MATERIAL ICONS IMPORTS
import { LoadingButton } from "@mui/lab";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Vendors = () => {
  const [multipleVendors, setMultipleVendors] = React.useState([]);
  const [anchorSortEl, setAnchorSortEl] = React.useState(null);
  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;
  const [anchorStatusEl, setAnchorStatusEl] = React.useState(null);
  const handleStatusClick = (event) => {
    setAnchorStatusEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorStatusEl(null);
  };

  const openStatus = Boolean(anchorStatusEl);
  const idStatus = openStatus ? "simple-popover" : undefined;

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Vendors</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer
            headingName={"Parameters / Vendors"}
            icon={parameters}
          />
          <ExportDialog dialogName={"Vendors"} />
          <ImportSecondDialog dialogName={"Vendors"} />
          <button className="button-gradient py-2 px-4 ms-3 c-pointer">
            <p>+ Add Vendors</p>
          </button>
          <Dialog
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
            open={false}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">Create Vendor</h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />

            <form>
              <DialogContent className="py-3 px-4">
                <div className="d-flex mb-2">
                  <p className="text-lightBlue me-2 ">Vendor Name </p>
                  <Tooltip title="Enter Name" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className=" c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>
                <FormControl className="col-7 px-0">
                  <OutlinedInput
                    sx={{ pr: 1 }}
                    placeholder="Enter Vendor Name"
                    size="small"
                    name="name"
                    endAdornment={
                      <InputAdornment position="end">
                        <Tooltip title="Create Multiple Vendor" placement="top">
                          <ChevronRightIcon className="c-pointer" />
                        </Tooltip>
                      </InputAdornment>
                    }
                  />

                  <FormHelperText error color="#F67476"></FormHelperText>
                </FormControl>
                <br />
                <div className="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="showFilter"
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                          marginRight: 0,
                          width: "auto",
                        }}
                      />
                    }
                    label="Include in Filters"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.875rem",
                        color: "#c8d8ff",
                      },
                    }}
                    className=" px-0 me-1"
                  />
                  <span className="text-blue-2 c-pointer">(manage)</span>
                </div>
                <div>
                  {multipleVendors &&
                    multipleVendors.map((value, index) => (
                      <Chip
                        key={index}
                        label={value.name}
                        onDelete={() => {}}
                        size="small"
                        className="mt-3 me-2 px-1"
                      />
                    ))}
                </div>
              </DialogContent>

              <hr className="hr-grey-6 my-0" />

              <DialogActions className="d-flex justify-content-between px-4 py-3">
                <button className="button-grey py-2 px-5" type="button">
                  <p className="text-lightBlue">Cancel</p>
                </button>
                <LoadingButton
                  loading={false}
                  disabled={false}
                  className="button-gradient py-2 px-5"
                  type="submit"
                >
                  <p>Create</p>
                </LoadingButton>
              </DialogActions>
            </form>
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
              value={0}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label={`All (active)`} className="tabs-head" />
              <Tab label={`Active (0)`} className="tabs-head" />
              <Tab label={`In-Active (0)`} className="tabs-head" />
              <Tab label={`Archived (0)`} className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearchSecondary />

            <React.Fragment>
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idStatus}
                variant="contained"
                onClick={handleStatusClick}
              >
                <small className="text-lightBlue me-2">Status</small>
                <img src={arrowDown} alt="status" className="" />
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
                id={idStatus}
                open={openStatus}
                anchorEl={anchorStatusEl}
                onClose={handleStatusClose}
                className="columns"
              >
                <FormGroup className="px-2 py-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Active"
                    value="active"
                    className="me-0"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="In-Active"
                    className="me-0"
                    value="in-active"
                  />
                </FormGroup>
              </Popover>
            </React.Fragment>

            <button
              className="button-grey py-2 px-3 ms-2"
              aria-describedby={idSort}
              variant="contained"
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
              className="columns"
            >
              <FormControl className="px-2 py-1">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                  <FormControlLabel
                    value="-1"
                    control={<Radio size="small" />}
                    label="Newest to Oldest"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio size="small" />}
                    label="Oldest to Newest"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio size="small" />}
                    label="Alphabetical (A-Z)"
                  />
                  <FormControlLabel
                    value="-1"
                    control={<Radio size="small" />}
                    label="Alphabetical (Z-A)"
                  />
                </RadioGroup>
              </FormControl>
            </Popover>
          </div>
          <TabPanel value={0} index={0}>
            <VendorsTable
              isLoading={false}
              error={false}
              list={[
                {
                  _id: "64c78a69ee6c2f000898b756",
                  isFlagShip: false,
                  active: true,
                  name: "sahil",
                  status: "active",
                  showFilter: false,
                  addedBy: "6458a464beb8f94daa27d806",
                  srNo: 9,
                  createdAt: "2023-07-31T10:18:17.289Z",
                  updatedAt: "2023-07-31T10:18:17.289Z",
                  __v: 0,
                  totalProduct: 0,
                },
                {
                  _id: "64c78a64a6a7170008cba192",
                  isFlagShip: false,
                  active: true,
                  name: "sanjay",
                  status: "archieved",
                  showFilter: false,
                  addedBy: "6458a464beb8f94daa27d806",
                  srNo: 8,
                  createdAt: "2023-07-31T10:18:12.317Z",
                  updatedAt: "2023-08-06T18:27:12.976Z",
                  __v: 0,
                  totalProduct: 0,
                },
                {
                  _id: "64c78a59a6a7170008cba18d",
                  isFlagShip: false,
                  active: true,
                  name: "ayush",
                  status: "active",
                  showFilter: false,
                  addedBy: "6458a464beb8f94daa27d806",
                  srNo: 7,
                  createdAt: "2023-07-31T10:18:01.547Z",
                  updatedAt: "2023-07-31T10:18:01.547Z",
                  __v: 0,
                  totalProduct: 0,
                },
                {
                  _id: "64c78a42ee6c2f000898b750",
                  isFlagShip: false,
                  active: true,
                  name: "test 6d",
                  status: "active",
                  showFilter: false,
                  addedBy: "6458a464beb8f94daa27d806",
                  srNo: 6,
                  createdAt: "2023-07-31T10:17:38.667Z",
                  updatedAt: "2023-08-14T07:39:17.021Z",
                  __v: 0,
                  totalProduct: 0,
                },
                {
                  _id: "64c78a2f09a6500009255470",
                  isFlagShip: false,
                  active: true,
                  name: "test 4",
                  status: "active",
                  showFilter: false,
                  addedBy: "6458a464beb8f94daa27d806",
                  order: 1,
                  srNo: 4,
                  __v: 0,
                  createdAt: "2023-07-31T10:17:19.408Z",
                  updatedAt: "2023-07-31T10:17:19.408Z",
                  totalProduct: 0,
                },
                {
                  _id: "64c78a2f09a650000925546f",
                  isFlagShip: false,
                  active: true,
                  name: "test 5",
                  status: "active",
                  showFilter: false,
                  addedBy: "6458a464beb8f94daa27d806",
                  order: 2,
                  srNo: 5,
                  __v: 0,
                  createdAt: "2023-07-31T10:17:19.408Z",
                  updatedAt: "2023-07-31T10:17:19.408Z",
                  totalProduct: 0,
                },
                {
                  _id: "64c78a1f09a6500009255469",
                  isFlagShip: false,
                  active: true,
                  name: "test 3",
                  status: "active",
                  showFilter: false,
                  addedBy: "6458a464beb8f94daa27d806",
                  srNo: 3,
                  createdAt: "2023-07-31T10:17:03.083Z",
                  updatedAt: "2023-07-31T10:17:03.083Z",
                  __v: 0,
                  totalProduct: 0,
                },
                {
                  _id: "64c78a1609a6500009255464",
                  isFlagShip: false,
                  active: true,
                  name: "test 1",
                  status: "active",
                  showFilter: false,
                  addedBy: "6458a464beb8f94daa27d806",
                  order: 1,
                  srNo: 1,
                  __v: 0,
                  createdAt: "2023-07-31T10:16:54.320Z",
                  updatedAt: "2023-07-31T10:16:54.320Z",
                  totalProduct: 0,
                },
                {
                  _id: "64c78a1609a6500009255463",
                  isFlagShip: false,
                  active: true,
                  name: "test 2",
                  status: "archieved",
                  showFilter: false,
                  addedBy: "6458a464beb8f94daa27d806",
                  order: 2,
                  srNo: 2,
                  __v: 0,
                  createdAt: "2023-07-31T10:16:54.320Z",
                  updatedAt: "2023-08-09T06:16:15.006Z",
                  totalProduct: 0,
                },
              ]}
              edit={() => {}}
              totalCount={0}
              deleteData={() => {}}
              bulkDelete={() => {}}
              vendorType={0}
              editVendor={() => {}}
              bulkEdit={() => {}}
              changeRowsPerPage={() => {}}
              rowsPerPage={10}
              changePage={() => {}}
              page={1}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Vendors;
