import { useEffect, useReducer } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useDispatch } from "react-redux";

import TabPanel from "../../../components/TabPanel/TabPanel";
import OptionsTable from "./OptionsTable";
import OptionSetsTable from "./OptionSetsTable";
import { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";

import {
  useGetAllOptionsQuery,
  useGetAllAttributesQuery,
  useDeleteOptionMutation,
} from "../../../features/parameters/options/optionsApiSlice";
import {
  useGetAllOptionSetsQuery,
  useDeleteOptionSetMutation,
} from "../../../features/parameters/options/optionSetsApiSlice";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

import { omitEmptyKeys, pickExactObjKeys } from "../../../utils/helper";

const TAB_LIST = [
  { id: 1, label: "all options" },
  { id: 2, label: "option sets" },
];

const DEFAULT_ACTIVE_TAB = 1;

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
  title: "",
  name: "",
};

const initialOptionsState = {
  totalCount: 0,
  deleteId: null,
  deleteType: "",
  confirmationMessage: "",
  showDeleteModal: false,
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
      title: action.value,
      name: action.value,
    };
  }
  if (action.type === "SET_FILTERS") {
    return {
      ...state,
      ...action.filters,
    };
  }
  return initialQueryFilterState;
};

const optionReducer = (state, action) => {
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
      ...initialOptionsState,
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
  return initialOptionsState;
};

const Options = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [optionsState, dispatchOptions] = useReducer(
    optionReducer,
    initialOptionsState
  );

  const {
    data: optionSetsData,
    isLoading: optionSetsIsLoading,
    error: optionSetsError,
    isError: optionSetsIsError,
    isSuccess: optionSetsIsSuccess,
    isFetching: optionSetsDataIsFetching,
  } = useGetAllOptionSetsQuery(queryFilterState, {
    skip: optionsState.firstRender || optionsState.activeTab === 1,
  });

  const {
    data: optionsData,
    isLoading: optionsIsLoading,
    error: optionsError,
    isError: optionsIsError,
    isSuccess: optionsIsSuccess,
    isFetching: optionsDataIsFetching,
  } = useGetAllOptionsQuery(queryFilterState, {
    skip: optionsState.firstRender || optionsState.activeTab === 2,
  });
  const {
    data: attributesData,
    isLoading: attributesIsLoading,
    error: attributesError,
    isError: attributesIsError,
    isSuccess: attributesIsSuccess,
    isFetching: attributesDataIsFetching,
  } = useGetAllAttributesQuery(
    {
      attribute: optionsData?.data.map((option) => option._id),
    },
    {
      skip: !!!optionsData?.data?.length || optionsState.activeTab === 2,
    }
  );

  const [
    deleteOption,
    {
      isLoading: deleteOptionIsLoading,
      error: deleteOptionError,
      isSuccess: deleteOptionIsSuccess,
    },
  ] = useDeleteOptionMutation();
  const [
    deleteOptionSet,
    {
      isLoading: deleteOptionSetIsLoading,
      error: deleteOptionSetError,
      isSuccess: deleteOptionSetIsSuccess,
    },
  ] = useDeleteOptionSetMutation();

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
    dispatchOptions({ type: "SEARCH_VALUE", search: value });
  };

  const editHandler = (srNo) => {
    navigate({
      pathname: `./edit/${srNo}`,
      search: `?${createSearchParams({
        search: JSON.stringify({
          ...queryFilterState,
          activeTab: optionsState.activeTab,
        }),
      })}`,
    });
  };

  const editSetHandler = (srNo) => {
    navigate({
      pathname: `./sets/edit/${srNo}`,
      search: `?${createSearchParams({
        search: JSON.stringify({
          ...queryFilterState,
          activeTab: optionsState.activeTab,
        }),
      })}`,
    });
  };

  const createOptionHandler = () => {
    navigate({
      pathname: "./create",
      search: `?${createSearchParams({
        search: JSON.stringify({
          ...queryFilterState,
          activeTab: optionsState.activeTab,
        }),
      })}`,
    });
  };

  const createOptionSetHandler = () => {
    navigate({
      pathname: "./sets/create",
      search: `?${createSearchParams({
        search: JSON.stringify({
          ...queryFilterState,
          activeTab: optionsState.activeTab,
        }),
      })}`,
    });
  };

  const deleteHandler = ({ id, message }) => {
    dispatchOptions({ type: "SET_DELETE", id, message, deleteType: "option" });
  };

  const deleteSetHandler = ({ id, message }) => {
    dispatchOptions({ type: "SET_DELETE", id, message, deleteType: "set" });
  };

  const CancelDeleteHandler = () => {
    dispatchOptions({ type: "REMOVE_DELETE" });
  };

  const deleteConfirmationHandler = () => {
    if (optionsState.deleteType === "option") {
      deleteOption(optionsState.deleteId)
        .unwrap()
        .then(() => {
          dispatchOptions({
            type: "REMOVE_DELETE",
          });
          dispatch(showSuccess({ message: "Option deleted successfully" }));
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
      return;
    }
    deleteOptionSet(optionsState.deleteId)
      .unwrap()
      .then(() => {
        dispatchOptions({
          type: "REMOVE_DELETE",
        });
        dispatch(showSuccess({ message: "Option set deleted successfully" }));
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
    dispatchQueryFilter({ type: "" });
    dispatchOptions({
      type: "SET_ACTIVE_TAB",
      activeTab: tabIndex + 1,
    });
    dispatchOptions({
      type: "SEARCH_VALUE",
      search: "",
    });
  };

  useEffect(() => {
    if (optionsError) {
      if (optionsError?.data?.message) {
        dispatch(showError({ message: optionsError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (attributesError) {
      if (attributesError?.data?.message) {
        dispatch(showError({ message: attributesError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (optionsIsSuccess) {
      dispatchOptions({
        type: "SET_TOTAL_COUNT",
        totalCount: optionsData.totalCount,
      });
    }
  }, [optionsError, optionsIsSuccess, optionsData, attributesError, dispatch]);

  useEffect(() => {
    if (optionSetsError) {
      if (optionSetsError?.data?.message) {
        dispatch(showError({ message: optionSetsError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }

    if (optionSetsIsSuccess) {
      dispatchOptions({
        type: "SET_TOTAL_COUNT",
        totalCount: optionSetsData.totalCount,
      });
    }
  }, [optionSetsError, optionSetsIsSuccess, optionSetsData, dispatch]);

  useEffect(() => {
    if (optionsState.firstRender) {
      const search = omitEmptyKeys(JSON.parse(searchParams.get("search")));
      const filters = pickExactObjKeys(queryFilterState, search);
      dispatchQueryFilter({
        type: "SET_FILTERS",
        filters,
      });
      filters.title &&
        dispatchOptions({
          type: "SEARCH_VALUE",
          search: filters.title,
        });

      dispatchOptions({
        type: "SET_ACTIVE_TAB",
        activeTab: search.activeTab || DEFAULT_ACTIVE_TAB,
      });
      dispatchOptions({ type: "DISABLE_FIRST_RENDER" });
    }
  }, [searchParams, optionsState.firstRender, queryFilterState]);

  useEffect(() => {
    if (!optionsState.firstRender) {
      setSearchParams(
        {
          search: JSON.stringify({
            ...queryFilterState,
            activeTab: optionsState.activeTab,
          }),
        },
        { replace: true }
      );
    }
  }, [
    queryFilterState,
    setSearchParams,
    optionsState.firstRender,
    optionsState.activeTab,
  ]);

  return (
    <div className="container-fluid page">
      <PageTitleBar
        title="Options"
        onTutorial={() => {}}
        onExport={() => {}}
        onImport={() => {}}
        onCreate={optionsState.activeTab === 1 ? createOptionHandler : null}
        onSecondaryCreate={
          optionsState.activeTab === 2 ? createOptionSetHandler : null
        }
        createBtnText="+ Create Options"
        createSecondaryBtnText="+ Create Option Sets"
      />

      {optionsState.activeTab && (
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
                value={optionsState.activeTab - 1}
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
                value={optionsState.search}
              />
            </div>
            <TabPanel value={optionsState.activeTab - 1} index={0}>
              <OptionsTable
                error={optionsIsError || attributesIsError}
                isLoading={
                  optionsIsLoading ||
                  optionsDataIsFetching ||
                  attributesIsLoading ||
                  attributesDataIsFetching
                }
                data={optionsData?.data}
                dataSecondary={attributesData?.data}
                totalCount={optionsState?.totalCount}
                onPageChange={pageChangeHandler}
                onPageSize={pageSizeHandler}
                pageSize={queryFilterState.pageSize}
                page={queryFilterState.pageNo}
                onEdit={editHandler}
                onDelete={deleteHandler}
              />
            </TabPanel>
            <TabPanel value={optionsState.activeTab - 1} index={1}>
              <OptionSetsTable
                error={optionSetsIsError}
                isLoading={optionSetsIsLoading || optionSetsDataIsFetching}
                data={optionSetsData?.data}
                totalCount={optionSetsData?.totalCount}
                onPageChange={pageChangeHandler}
                onPageSize={pageSizeHandler}
                pageSize={queryFilterState.pageSize}
                page={queryFilterState.pageNo}
                onEdit={editSetHandler}
                onDelete={deleteSetHandler}
              />
            </TabPanel>
          </Paper>
        </div>
      )}
      <DeleteModalSecondary
        onConfirm={deleteConfirmationHandler}
        onCancel={CancelDeleteHandler}
        show={optionsState.showDeleteModal}
        isLoading={deleteOptionIsLoading || deleteOptionSetIsLoading}
        message={optionsState.confirmationMessage}
        title={optionsState.deleteType === "option" ? "Option" : "Option Set"}
      />
    </div>
  );
};

export default Options;
