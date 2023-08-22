import { useEffect, useReducer } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useDispatch } from "react-redux";

import TabPanel from "../../../components/TabPanel/TabPanel";
import PriceManagerTable from "./PriceManagerTable";
import { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";
import { ArchiveModalSecondary } from "../../../components/ArchiveModal/ArchiveModal";
import { UnArchiveModalSecondary } from "../../../components/UnArchiveModal/UnArchiveModal";

import { useGetAllMastersQuery } from "../../../features/priceMaster/priceMasterApiSlice";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

import { omitEmptyKeys, pickExactObjKeys } from "../../../utils/helper";

import "../../Products/AllProducts/AllProducts.scss";

const TAB_LIST = [{ id: 1, label: "all" }];

const DEFAULT_ACTIVE_TAB = 1;

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
  name: "",
};

const initialPriceManagerState = {
  totalCount: 0,
  deleteId: null,
  deleteType: "",
  confirmationMessage: "",
  showDeleteModal: false,
  search: "",
  activeTab: null,
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
      name: action.value,
    };
  }
  return initialQueryFilterState;
};

const priceManagerReducer = (state, action) => {
  if (action.type === "SET_TOTAL_COUNT") {
    return {
      ...state,
      totalCount: action.totalCount,
    };
  }
  if (action.type === "SET_DELETE") {
    return {
      ...state,
      deleteId: action.id,
      confirmationMessage: action.message || "",
      showDeleteModal: true,
      deleteType: action.deleteType,
    };
  }
  if (action.type === "REMOVE_DELETE") {
    return {
      ...initialPriceManagerState,
      activeTab: state.activeTab,
      totalCount: state.totalCount,
      search: state.search,
    };
  }
  if (action.type === "SEARCH_VALUE") {
    return {
      ...state,
      search: action.search,
    };
  }
  if (action.type === "SET_ACTIVE_TAB") {
    return {
      ...state,
      activeTab: action.activeTab,
    };
  }
  return initialPriceManagerState;
};

const PriceMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");
  let { id } = useParams();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [priceManagerState, dispatchPriceManager] = useReducer(
    priceManagerReducer,
    initialPriceManagerState
  );

  const {
    data: masterData,
    isLoading: masterIsLoading,
    error: masterError,
    isError: masterIsError,
    isSuccess: masterIsSuccess,
    isFetching: masterIsFetching,
  } = useGetAllMastersQuery(
    {
      srNo: id,
      pageSize: 1,
      pageNo: 0,
    },
    {
      skip: !id,
    }
  );

  const pageChangeHandler = (_, pageNo) => {
    dispatchQueryFilter({ type: "CHANGE_PAGE", pageNo });
  };

  const pageSizeHandler = (size) => {
    dispatchQueryFilter({ type: "SET_PAGE_SIZE", size });
  };

  const searchHandler = (value) => {
    dispatchQueryFilter({ type: "SEARCH_TITLE", value });
  };

  const searchValueHandler = (value) => {
    dispatchPriceManager({ type: "SEARCH_VALUE", search: value });
  };

  const backHandler = () => {
    navigate({
      pathname: "/priceMaster",
      search: `?${createSearchParams({
        search: searchParams.get("search"),
      })}`,
    });
  };

  const editHandler = (srNo) => {};

  const openHandler = (srNo) => {};

  const createMasterHandler = () => {};

  const deleteHandler = ({ id, message }) => {
    dispatchPriceManager({
      type: "SET_DELETE",
      id,
      message,
    });
  };

  const cancelDeleteHandler = () => {
    dispatchPriceManager({ type: "REMOVE_DELETE" });
  };

  const deleteConfirmationHandler = () => {
    // deleteMaster(priceMasterState.deleteId)
    //   .unwrap()
    //   .then(() => {
    //     dispatchPriceMaster({
    //       type: "REMOVE_DELETE",
    //     });
    //     dispatch(showSuccess({ message: "Master deleted successfully" }));
    //   })
    //   .catch((error) => {
    //     if (error?.data?.message) {
    //       dispatch(showError({ message: error.data.message }));
    //     } else {
    //       dispatch(
    //         showError({ message: "Something went wrong!, please try again" })
    //       );
    //     }
    //   });
  };

  const changeTabHandler = (_, tabIndex) => {
    const status = tabIndex ? "archieved" : "active";
    dispatchQueryFilter({ type: "" });
    dispatchQueryFilter({ type: "SET_STATUS", status });
    dispatchPriceManager({
      type: "SET_ACTIVE_TAB",
      activeTab: tabIndex + 1,
    });
    dispatchPriceManager({
      type: "SEARCH_VALUE",
      search: "",
    });
  };

  useEffect(() => {
    if (masterError) {
      if (masterError?.data?.message) {
        dispatch(showError({ message: masterError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }

    if (masterIsSuccess) {
      dispatchPriceManager({
        type: "SET_TOTAL_COUNT",
        totalCount: masterData.totalCount,
      });
    }
  }, [masterError, masterIsSuccess, masterData, dispatch]);

  return (
    <div className="container-fluid page">
      <PageTitleBar
        title={
          masterData?.data.length && masterData.data[0]?.name
            ? masterData.data[0].name
            : "Price Manager"
        }
        onBack={backHandler}
        onTutorial={() => {}}
        onExport={() => {}}
        onImport={() => {}}
        onCreate={createMasterHandler}
        createBtnText="+ Create Master"
      />
      {priceManagerState.activeTab && (
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
                value={priceManagerState.activeTab - 1}
                onChange={changeTabHandler}
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
              <TableSearchSecondary
                onChange={searchHandler}
                onSearchValueChange={searchValueHandler}
                value={priceManagerState.search}
              />
            </div>
            <TabPanel value={priceManagerState.activeTab - 1} index={0}>
              {/* <PriceMasterActiveTable
                error={masterError}
                isLoading={masterIsLoading || masterIsFetching}
                data={masterData?.data}
                totalCount={priceMasterState?.totalCount}
                onPageChange={pageChangeHandler}
                onPageSize={pageSizeHandler}
                pageSize={queryFilterState.pageSize}
                page={queryFilterState.pageNo}
                onEdit={editHandler}
                onArchived={archivedHandler}
                onOpen={openHandler}
              /> */}
            </TabPanel>
          </Paper>
        </div>
      )}
      <DeleteModalSecondary
        onConfirm={deleteConfirmationHandler}
        onCancel={cancelDeleteHandler}
        show={priceManagerState.showDeleteModal}
        // isLoading={deleteMasterIsLoading}
        message={priceManagerState.confirmationMessage}
        title="Price Master"
      />
    </div>
  );
};

export default PriceMaster;
