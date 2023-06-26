import { forwardRef, useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
// ! COMPONENT IMPORTS
import TabPanel from "../../../components/TabPanel/TabPanel";
import ProductTabsTable from "./ProductTabsTable";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TableSearch from "../../../components/TableSearch/TableSearch";
// ! IMAGES IMPORTS
import cancel from "../../../assets/icons/cancel.svg";
import parameters from "../../../assets/icons/sidenav/parameters.svg";
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
  Chip,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

import {
  useGetAllProductTabsQuery,
  useCreateProductTabMutation,
  useDeleteProductTabMutation,
  useEditProductTabMutation,
} from "../../../features/parameters/productTabs/productTabsApiSlice";

// ! MATERIAL ICONS IMPORTS

// ? DIALOG TRANSITION STARTS HERE
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ? DIALOG TRANSITION ENDS HERE
const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
};

const queryFilterReducer = (state, action) => {
  if (action.type === "NEXT_PAGE") {
    return {};
  }
  return initialQueryFilterState;
};

const ProductTabs = () => {
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );

  const {
    data: productsTabData,
    isLoading: productsTabIsLoading,
    error: productsTabError,
    isError: productsTabIsError,
    isSuccess: productsTabIsSuccess,
  } = useGetAllProductTabsQuery(queryFilterState);

  console.log(productsTabData);

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Product Tabs</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <button className="button-gradient py-2 px-4 ms-3 c-pointer">
            <p>+ Create New Tab</p>
          </button>
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
              <Tab label="All" className="tabs-head" />
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          <TabPanel value={0} index={0}>
            <ProductTabsTable />
          </TabPanel>
          <TabPanel value={0} index={1}>
            <ProductTabsTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default ProductTabs;
