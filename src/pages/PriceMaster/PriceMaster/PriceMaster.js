import { useEffect, useReducer } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useDispatch } from "react-redux";

import TabPanel from "../../../components/TabPanel/TabPanel";
import {
  PriceMasterActiveTable,
  PriceMasterArchivedTable,
} from "./PriceMasterTable";
import { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";
import { ArchiveModalSecondary } from "../../../components/ArchiveModal/ArchiveModal";
import { UnArchiveModalSecondary } from "../../../components/UnArchiveModal/UnArchiveModal";

import {
  useGetAllMastersQuery,
  useUpdateMasterMutation,
  useDeleteMasterMutation,
} from "../../../features/priceMaster/priceMasterApiSlice";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

import { omitEmptyKeys, pickExactObjKeys } from "../../../utils/helper";

import "../../Products/AllProducts/AllProducts.scss";

const TAB_LIST = [
  { id: 1, label: "active" },
  { id: 2, label: "archived" },
];

const DEFAULT_ACTIVE_TAB = 1;

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
  name: "",
  status: "active",
};

const initialPriceMasterState = {
  totalCount: 0,
  deleteId: null,
  archivedId: null,
  unArchivedId: null,
  confirmationMessage: "",
  showDeleteModal: false,
  showArchivedModal: false,
  showUnArchivedModal: false,
  search: "",
  firstRender: true,
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
  if (action.type === "SET_FILTERS") {
    return {
      ...state,
      ...action.filters,
    };
  }
  if (action.type === "SET_STATUS") {
    return {
      ...state,
      status: action.status,
    };
  }
  return initialQueryFilterState;
};

const priceMasterReducer = (state, action) => {
  if (action.type === "SET_TOTAL_COUNT") {
    return {
      ...state,
      totalCount: action.totalCount,
    };
  }
  if (action.type === "SET_DELETE") {
    return {
      ...state,
      showArchivedModal: initialPriceMasterState.showArchivedModal,
      showUnArchivedModal: initialPriceMasterState.showUnArchivedModal,
      archivedId: initialPriceMasterState.archivedId,
      unArchivedId: initialPriceMasterState.unArchivedId,
      deleteId: action.id,
      confirmationMessage: action.message || "",
      showDeleteModal: true,
    };
  }
  if (action.type === "REMOVE_DELETE") {
    return {
      ...initialPriceMasterState,
      activeTab: state.activeTab,
      totalCount: state.totalCount,
      firstRender: false,
      search: state.search,
    };
  }
  if (action.type === "SET_ARCHIVED") {
    return {
      ...state,
      showDeleteModal: initialPriceMasterState.showDeleteModal,
      showUnArchivedModal: initialPriceMasterState.showUnArchivedModal,
      deleteId: initialPriceMasterState.archivedId,
      unArchivedId: initialPriceMasterState.unArchivedId,
      archivedId: action.id,
      confirmationMessage: action.message || "",
      showArchivedModal: true,
    };
  }
  if (action.type === "REMOVE_ARCHIVED") {
    return {
      ...initialPriceMasterState,
      activeTab: state.activeTab,
      totalCount: state.totalCount,
      firstRender: false,
      search: state.search,
    };
  }
  if (action.type === "SET_UN_ARCHIVED") {
    return {
      ...state,
      showDeleteModal: initialPriceMasterState.showDeleteModal,
      showArchivedModal: initialPriceMasterState.showArchivedModal,
      deleteId: initialPriceMasterState.archivedId,
      archivedId: initialPriceMasterState.archivedId,
      unArchivedId: action.id,
      confirmationMessage: action.message || "",
      showUnArchivedModal: true,
    };
  }
  if (action.type === "REMOVE_UN_ARCHIVED") {
    return {
      ...initialPriceMasterState,
      activeTab: state.activeTab,
      totalCount: state.totalCount,
      firstRender: false,
      search: state.search,
    };
  }
  if (action.type === "SEARCH_VALUE") {
    return {
      ...state,
      search: action.search,
    };
  }
  if (action.type === "DISABLE_FIRST_RENDER") {
    return {
      ...state,
      firstRender: false,
    };
  }
  if (action.type === "SET_ACTIVE_TAB") {
    return {
      ...state,
      activeTab: action.activeTab,
    };
  }
  return initialPriceMasterState;
};

const PriceMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [priceMasterState, dispatchPriceMaster] = useReducer(
    priceMasterReducer,
    initialPriceMasterState
  );

  const {
    data: masterData,
    isLoading: masterIsLoading,
    error: masterError,
    isError: masterIsError,
    isSuccess: masterIsSuccess,
    isFetching: masterIsFetching,
  } = useGetAllMastersQuery(queryFilterState, {
    skip: priceMasterState.firstRender,
  });
  const [
    updateMaster,
    {
      isLoading: updateMasterIsLoading,
      error: updateMasterError,
      isSuccess: updateMasterIsSuccess,
    },
  ] = useUpdateMasterMutation();
  const [
    deleteMaster,
    {
      isLoading: deleteMasterIsLoading,
      error: deleteMasterError,
      isSuccess: deleteMasterIsSuccess,
    },
  ] = useDeleteMasterMutation();

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
    dispatchPriceMaster({ type: "SEARCH_VALUE", search: value });
  };

  const editHandler = (srNo) => {
    navigate({
      pathname: `/priceMaster/edit/${srNo}`,
      search: `?${createSearchParams({
        search: JSON.stringify({
          ...queryFilterState,
          activeTab: priceMasterState.activeTab,
        }),
      })}`,
    });
  };

  const createMasterHandler = () => {
    navigate({
      pathname: "/priceMaster/create",
      search: `?${createSearchParams({
        search: JSON.stringify({
          ...queryFilterState,
          activeTab: priceMasterState.activeTab,
        }),
      })}`,
    });
  };

  const deleteHandler = ({ id, message }) => {
    dispatchPriceMaster({
      type: "SET_DELETE",
      id,
      message,
    });
  };
  const archivedHandler = ({ id, message }) => {
    dispatchPriceMaster({
      type: "SET_ARCHIVED",
      id,
      message,
    });
  };
  const unArchivedHandler = ({ id, message }) => {
    dispatchPriceMaster({
      type: "SET_UN_ARCHIVED",
      id,
      message,
    });
  };

  const cancelDeleteHandler = () => {
    dispatchPriceMaster({ type: "REMOVE_DELETE" });
  };
  const cancelArchivedHandler = () => {
    dispatchPriceMaster({ type: "REMOVE_ARCHIVED" });
  };
  const cancelUnArchivedHandler = () => {
    dispatchPriceMaster({ type: "REMOVE_UN_ARCHIVED" });
  };

  const deleteConfirmationHandler = () => {
    deleteMaster(priceMasterState.deleteId)
      .unwrap()
      .then(() => {
        dispatchPriceMaster({
          type: "REMOVE_DELETE",
        });
        dispatch(showSuccess({ message: "Master deleted successfully" }));
      })
      .catch((error) => {
        if (error?.data?.message) {
          dispatch(showError({ message: error.data.message }));
        } else {
          dispatch(
            showError({ message: "Something went wrong!, please try again" })
          );
        }
      });
  };
  const archivedConfirmationHandler = () => {
    updateMaster({
      id: priceMasterState.archivedId,
      details: { status: "archieved" },
    })
      .unwrap()
      .then(() => {
        dispatchPriceMaster({
          type: "REMOVE_ARCHIVED",
        });
        dispatch(showSuccess({ message: "Master archived successfully" }));
      })
      .catch((error) => {
        if (error?.data?.message) {
          dispatch(showError({ message: error.data.message }));
        } else {
          dispatch(
            showError({ message: "Something went wrong!, please try again" })
          );
        }
      });
  };
  const unArchivedConfirmationHandler = () => {
    updateMaster({
      id: priceMasterState.unArchivedId,
      details: { status: "active" },
    })
      .unwrap()
      .then(() => {
        dispatchPriceMaster({
          type: "REMOVE_UN_ARCHIVED",
        });
        dispatch(showSuccess({ message: "Master un-archived successfully" }));
      })
      .catch((error) => {
        if (error?.data?.message) {
          dispatch(showError({ message: error.data.message }));
        } else {
          dispatch(
            showError({ message: "Something went wrong!, please try again" })
          );
        }
      });
  };

  const changeTabHandler = (_, tabIndex) => {
    const status = tabIndex ? "archieved" : "active";
    dispatchQueryFilter({ type: "" });
    dispatchQueryFilter({ type: "SET_STATUS", status });
    dispatchPriceMaster({
      type: "SET_ACTIVE_TAB",
      activeTab: tabIndex + 1,
    });
    dispatchPriceMaster({
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
      dispatchPriceMaster({
        type: "SET_TOTAL_COUNT",
        totalCount: masterData.totalCount,
      });
    }
  }, [masterError, masterIsSuccess, masterData, dispatch]);

  useEffect(() => {
    if (priceMasterState.firstRender) {
      const search = omitEmptyKeys(JSON.parse(searchParams.get("search")));
      const filters = pickExactObjKeys(queryFilterState, search);
      dispatchQueryFilter({
        type: "SET_FILTERS",
        filters,
      });
      filters.name &&
        dispatchPriceMaster({
          type: "SEARCH_VALUE",
          search: filters.name,
        });

      dispatchPriceMaster({
        type: "SET_ACTIVE_TAB",
        activeTab: search.activeTab || DEFAULT_ACTIVE_TAB,
      });
      dispatchPriceMaster({ type: "DISABLE_FIRST_RENDER" });
    }
  }, [searchParams, priceMasterState.firstRender, queryFilterState]);

  useEffect(() => {
    if (!priceMasterState.firstRender) {
      setSearchParams(
        {
          search: JSON.stringify({
            ...queryFilterState,
            activeTab: priceMasterState.activeTab,
          }),
        },
        { replace: true }
      );
    }
  }, [
    queryFilterState,
    setSearchParams,
    priceMasterState.firstRender,
    priceMasterState.activeTab,
  ]);

  return (
    <div className="container-fluid page">
      <PageTitleBar
        title="Price Master"
        onTutorial={() => {}}
        onExport={() => {}}
        onImport={() => {}}
        onCreate={createMasterHandler}
        createBtnText="+ Create Master"
      />
      {priceMasterState.activeTab && (
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
                value={priceMasterState.activeTab - 1}
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
                value={priceMasterState.search}
              />
            </div>
            <TabPanel value={priceMasterState.activeTab - 1} index={0}>
              <PriceMasterActiveTable
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
              />
            </TabPanel>
            <TabPanel value={priceMasterState.activeTab - 1} index={1}>
              <PriceMasterArchivedTable
                error={masterError}
                isLoading={masterIsLoading || masterIsFetching}
                data={masterData?.data}
                totalCount={priceMasterState?.totalCount}
                onPageChange={pageChangeHandler}
                onPageSize={pageSizeHandler}
                pageSize={queryFilterState.pageSize}
                page={queryFilterState.pageNo}
                onEdit={editHandler}
                onDelete={deleteHandler}
                onUnArchived={unArchivedHandler}
              />
            </TabPanel>
          </Paper>
        </div>
      )}
      <DeleteModalSecondary
        onConfirm={deleteConfirmationHandler}
        onCancel={cancelDeleteHandler}
        show={priceMasterState.showDeleteModal}
        isLoading={deleteMasterIsLoading}
        message={priceMasterState.confirmationMessage}
        title="Price Master"
      />
      <ArchiveModalSecondary
        onConfirm={archivedConfirmationHandler}
        onCancel={cancelArchivedHandler}
        show={priceMasterState.showArchivedModal}
        isLoading={updateMasterIsLoading}
        message={priceMasterState.confirmationMessage}
        title="Price Master"
      />
      <UnArchiveModalSecondary
        onConfirm={unArchivedConfirmationHandler}
        onCancel={cancelUnArchivedHandler}
        show={priceMasterState.showUnArchivedModal}
        isLoading={updateMasterIsLoading}
        message={priceMasterState.confirmationMessage}
        title="Price Master"
      />
    </div>
  );
};

export default PriceMaster;
