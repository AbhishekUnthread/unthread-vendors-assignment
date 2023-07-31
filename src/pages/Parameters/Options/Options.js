import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useDispatch } from "react-redux";

import TabPanel from "../../../components/TabPanel/TabPanel";
import OptionsTable from "./OptionsTable";
import { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";

import {
  useGetAllOptionsQuery,
  useGetAllAttributesQuery,
  useDeleteOptionMutation,
} from "../../../features/parameters/options/optionsApiSlice";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

const TAB_LIST = [
  { id: 1, label: "all" },
  //   { id: 2, label: "archived" },
];

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
  title: "",
};

const initialOptionsState = {
  data: null,
  totalCount: 0,
  deleteId: null,
  confirmationMessage: "",
  showDeleteModal: false,
  search: "",
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

const optionReducer = (state, action) => {
  if (action.type === "SET_DATA") {
    return {
      ...initialOptionsState,
      search: state.search,
      data: action.data,
      totalCount: action.totalCount,
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
      ...initialOptionsState,
      search: state.search,
      totalCount: state.totalCount,
      data: state.data,
    };
  }
  if (action.type === "SEARCH_VALUE") {
    return {
      ...state,
      search: action.search,
    };
  }
  return initialOptionsState;
};

const Options = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [optionsState, dispatchOptions] = useReducer(
    optionReducer,
    initialOptionsState
  );

  const {
    data: optionsData,
    isLoading: optionsIsLoading,
    error: optionsError,
    isError: optionsIsError,
    isSuccess: optionsIsSuccess,
    isFetching: optionsDataIsFetching,
  } = useGetAllOptionsQuery(queryFilterState);

  const [
    deleteOption,
    {
      isLoading: deleteOptionIsLoading,
      error: deleteOptionError,
      isSuccess: deleteOptionIsSuccess,
    },
  ] = useDeleteOptionMutation();

  const pageChangeHandler = (_, pageNo) => {
    dispatchQueryFilter({ type: "CHANGE_PAGE", pageNo });
  };

  const pageSizeHandler = (size) => {
    dispatchQueryFilter({ type: "SET_PAGE_SIZE", size });
  };

  const searchHandler = (value) => {
    dispatchQueryFilter({ type: "SEARCH_TITLE", title: value });
  };

  const searchValueHandler = (value) => {
    dispatchOptions({ type: "SEARCH_VALUE", search: value });
  };

  const editHandler = (index) => {
    const currentOption =
      index + (queryFilterState.pageNo - 1) * queryFilterState.pageSize;
    navigate(`./edit/${currentOption}`);
  };

  const createOptionHandler = () => {
    navigate("./create");
  };

  const deleteHandler = ({ id, message }) => {
    dispatchOptions({ type: "SET_DELETE", id, message });
  };

  const CancelDeleteHandler = () => {
    dispatchOptions({ type: "REMOVE_DELETE" });
  };

  const deleteConfirmationHandler = () => {
    deleteOption(optionsState.deleteId)
      .unwrap()
      .then(() => {
        dispatchOptions({
          type: "REMOVE_DELETE",
        });
        dispatch(showSuccess({ message: "Option Deleted" }));
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
    if (optionsIsSuccess) {
      dispatchOptions({
        type: "SET_DATA",
        data: optionsData.data,
        totalCount: optionsData.totalCount,
      });
    }
  }, [optionsError, optionsIsSuccess, optionsData, dispatch]);

  return (
    <div className="container-fluid page">
      <PageTitleBar
        title="Options"
        onTutorial={() => {}}
        onExport={() => {}}
        onImport={() => {}}
        onCreate={createOptionHandler}
        onSecondaryCreate={createOptionHandler}
        createBtnText="+ Create Options"
        createSecondaryBtnText="+ Options Sets"
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
            <TableSearchSecondary
              onChange={searchHandler}
              onSearchValueChange={searchValueHandler}
              value={optionsState.search}
            />
          </div>
          <TabPanel value={0} index={0}>
            <OptionsTable
              error={optionsIsError}
              isLoading={optionsIsLoading || optionsDataIsFetching}
              data={optionsState?.data}
              totalCount={optionsState?.totalCount}
              onPageChange={pageChangeHandler}
              onPageSize={pageSizeHandler}
              pageSize={queryFilterState.pageSize}
              page={queryFilterState.pageNo}
              onEdit={editHandler}
              onDelete={deleteHandler}
            />
          </TabPanel>
        </Paper>
      </div>
      <DeleteModalSecondary
        onConfirm={deleteConfirmationHandler}
        onCancel={CancelDeleteHandler}
        show={optionsState.showDeleteModal}
        isLoading={deleteOptionIsLoading}
        message={optionsState.confirmationMessage}
        title="Option"
      />
    </div>
  );
};

export default Options;
