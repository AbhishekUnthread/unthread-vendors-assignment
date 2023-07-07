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

const initialQueryFilterState = {
  pageSize: 1,
  pageNo: 1,
  title: "",
};

const queryFilterReducer = (state, action) => {
  if (action.type === "SET_PAGE_SIZE") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      pageSize: action.size,
    };
  }
  if (action.type === "CHANGE_PAGE") {
    return {
      ...state,
      pageNo: action.pageNo + 1,
    };
  }
  if (action.type === "SEARCH") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      title: action.title,
    };
  }
  return initialQueryFilterState;
};

const ProductTabs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productsTabList, setProductsTabList] = useState(null);
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

  const pageChangeHandler = (_, pageNo) => {
    dispatchQueryFilter({ type: "CHANGE_PAGE", pageNo });
  };

  const pageSizeHandler = (size) => {
    dispatchQueryFilter({ type: "SET_PAGE_SIZE", size });
  };

  const searchHandler = (e) => {
    dispatchQueryFilter({ type: "SEARCH", title: e.target.value });
  };

  const sortHandler = (sortedData) => {
    setProductsTabList((prevState) => {
      return { ...prevState, data: sortedData };
    });
  };

  const editHandler = () => {
    navigate("./create");
  };

  useEffect(() => {
    if (productsTabError) {
      if (productsTabError?.data?.message) {
        dispatch(showError({ message: productsTabError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (productsTabIsSuccess) {
      setProductsTabList(productsTabData);
    }
  }, [productsTabError, productsTabIsSuccess, productsTabData, dispatch]);

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
            <TableSearch
              onChange={searchHandler}
              value={queryFilterState.title}
            />
          </div>
          <TabPanel value={0} index={0}>
            <ProductTabsTable
              error={productsTabIsError}
              isLoading={productsTabIsLoading}
              data={productsTabList?.data}
              totalCount={productsTabList?.totalCount}
              onPageChange={pageChangeHandler}
              onPageSize={pageSizeHandler}
              pageSize={queryFilterState.pageSize}
              page={queryFilterState.pageNo}
              onSort={sortHandler}
              onEdit={editHandler}
            />
          </TabPanel>
          <TabPanel value={0} index={1}>
            <ProductTabsTable
              error={productsTabIsError}
              isLoading={productsTabIsLoading}
              data={productsTabList?.data}
              totalCount={productsTabList?.totalCount}
              onPageChange={pageChangeHandler}
              onPageSize={pageSizeHandler}
              pageSize={queryFilterState.pageSize}
              page={queryFilterState.pageNo}
              onSort={sortHandler}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default ProductTabs;
