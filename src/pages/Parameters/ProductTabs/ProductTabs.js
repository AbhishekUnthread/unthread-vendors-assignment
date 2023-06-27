import { forwardRef, useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
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
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import TabPanel from "../../../components/TabPanel/TabPanel";
import ProductTabsTable from "./ProductTabsTable";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TableSearch from "../../../components/TableSearch/TableSearch";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";

import cancel from "../../../assets/icons/cancel.svg";
import parameters from "../../../assets/icons/sidenav/parameters.svg";

import {
  useGetAllProductTabsQuery,
  useCreateProductTabMutation,
  useDeleteProductTabMutation,
  useEditProductTabMutation,
} from "../../../features/parameters/productTabs/productTabsApiSlice";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

const TAB_LIST = [
  { id: 1, label: "all" },
  { id: 2, label: "archived" },
];

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

  return (
    <div className="container-fluid page">
      <PageTitleBar
        title="Product Tabs"
        onTutorial={() => {}}
        onSettings={() => {}}
        onCreate={() => {}}
        createBtnText="+ Create New Tab"
      />

      <div className="row mt-4">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 0, p: 0 }}
          className="border-grey-5 bg-black-15"
        >
          <Box
            sx={{ width: "100%" }}
            className="d-flex justify-content-between tabs-header-box"
          >
            <Tabs
              value={0}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              {TAB_LIST.map((tab) => {
                return (
                  <Tab key={tab.id} label={tab.label} className="tabs-head" />
                );
              })}
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
