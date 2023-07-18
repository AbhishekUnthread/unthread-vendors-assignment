import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useDispatch } from "react-redux";

import TabPanel from "../../../components/TabPanel/TabPanel";
import ProductTabsTable from "./ProductTabsTable";
import { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";

import {
  useGetAllProductTabsQuery,
  useDeleteProductTabMutation,
} from "../../../features/parameters/productTabs/productTabsApiSlice";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

const TAB_LIST = [{ id: 1, label: "all" }];

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
  title: "",
};

const initialProductsTabState = {
  data: null,
  totalCount: 0,
  deleteId: null,
  confirmationMessage: "",
  showDeleteModal: false,
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
  if (action.type === "SEARCH_TITLE") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      title: action.title,
    };
  }
  return initialQueryFilterState;
};

const productsTabReducer = (state, action) => {
  if (action.type === "SET_DATA") {
    return {
      ...initialProductsTabState,
      data: action.data,
      totalCount: action.totalCount,
    };
  }
  if (action.type === "SORT_DATA") {
    return {
      ...initialProductsTabState,
      totalCount: state.totalCount,
      data: action.data,
    };
  }
  if (action.type === "SET_DELETE") {
    return {
      ...state,
      deleteId: action.id,
      confirmationMessage: action.message || "",
      showDeleteModal: true,
    };
  }
  if (action.type === "REMOVE_DELETE") {
    return {
      ...initialProductsTabState,
      totalCount: state.totalCount,
      data: state.data,
    };
  }
  return initialProductsTabState;
};

const ProductTabs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [productsTabState, dispatchProductsTab] = useReducer(
    productsTabReducer,
    initialProductsTabState
  );

  const {
    data: productsTabData,
    isLoading: productsTabIsLoading,
    error: productsTabError,
    isError: productsTabIsError,
    isSuccess: productsTabIsSuccess,
    isFetching: productsTabDataIsFetching,
  } = useGetAllProductTabsQuery(queryFilterState);

  const [
    deleteProductTab,
    {
      isLoading: deleteProductTabIsLoading,
      error: deleteProductTabError,
      isSuccess: deleteProductTabIsSuccess,
    },
  ] = useDeleteProductTabMutation();

  const pageChangeHandler = (_, pageNo) => {
    dispatchQueryFilter({ type: "CHANGE_PAGE", pageNo });
  };

  const pageSizeHandler = (size) => {
    dispatchQueryFilter({ type: "SET_PAGE_SIZE", size });
  };

  const searchHandler = (value) => {
    dispatchQueryFilter({ type: "SEARCH_TITLE", title: value });
  };

  const sortHandler = (sortedData) => {
    dispatchProductsTab({
      type: "SORT_DATA",
      data: sortedData,
    });
  };

  const editHandler = (index) => {
    const currentTabNo =
      index + (queryFilterState.pageNo - 1) * queryFilterState.pageSize;
      console.log(index, 'index')

      console.log(currentTabNo, 'currentTabNo')
    navigate(`./edit/${currentTabNo}`);
  };

  const createHandler = () => {
    navigate("./create");
  };

  const deleteHandler = ({ id, message }) => {
    dispatchProductsTab({ type: "SET_DELETE", id, message });
  };

  const CancelDeleteHandler = () => {
    dispatchProductsTab({ type: "REMOVE_DELETE" });
  };

  const deleteConfirmationHandler = () => {
    deleteProductTab(productsTabState.deleteId);
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
      dispatchProductsTab({
        type: "SET_DATA",
        data: productsTabData.data,
        totalCount: productsTabData.totalCount,
      });
    }
  }, [productsTabError, productsTabIsSuccess, productsTabData, dispatch]);

  useEffect(() => {
    if (deleteProductTabError) {
      if (deleteProductTabError?.data?.message) {
        dispatch(showError({ message: deleteProductTabError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (deleteProductTabIsSuccess) {
      dispatchProductsTab({
        type: "REMOVE_DELETE",
      });
      dispatch(showSuccess({ message: "Product Tab Deleted" }));
    }
  }, [deleteProductTabError, deleteProductTabIsSuccess, dispatch]);

  return (
    <div className="container-fluid page">
      <PageTitleBar
        title="Product Tabs"
        onTutorial={() => {}}
        onSettings={() => {}}
        onCreate={createHandler}
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
            <TableSearchSecondary onChange={searchHandler} />
          </div>
          <TabPanel value={0} index={0}>
            <ProductTabsTable
              error={productsTabIsError}
              isLoading={productsTabIsLoading || productsTabDataIsFetching}
              data={productsTabState?.data}
              totalCount={productsTabState?.totalCount}
              onPageChange={pageChangeHandler}
              onPageSize={pageSizeHandler}
              pageSize={queryFilterState.pageSize}
              page={queryFilterState.pageNo}
              onSort={sortHandler}
              onEdit={editHandler}
              onDelete={deleteHandler}
            />
          </TabPanel>
        </Paper>
      </div>
      <ConfirmationModal
        onConfirm={deleteConfirmationHandler}
        onCancel={CancelDeleteHandler}
        show={productsTabState.showDeleteModal}
        isLoading={deleteProductTabIsLoading}
        message={productsTabState.confirmationMessage}
      />
    </div>
  );
};

export default ProductTabs;
