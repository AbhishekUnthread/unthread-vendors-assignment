import { useState, useEffect, useReducer } from "react";
import { Link, useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { 
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Tooltip
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDispatch } from "react-redux";

import {
  showError,
} from "../../../features/snackbar/snackbarAction";
import {
  useGetAllCollectionsQuery,
  useGetCollectionsCountQuery,
  useDeleteCollectionMutation,
  useHardDeleteCollectionMutation,
  useHardBulkDeleteCollectionMutation
} from "../../../features/parameters/collections/collectionsApiSlice";

import CollectionsTable from "./CollectionsTable";
import { TableSearchSecondary} from "../../../components/TableSearch/TableSearch";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";

import sort from "../../../assets/icons/sort.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
  title:"",
  searchValue:"",
  status: ["active", "in-active", "scheduled"],
  updatedAt: "-1",
  alphabetical: null
};

const initialCollectionState = {
  status: "all",
};

const queryFilterReducer = (state, action) => {
  if (action.type === "SET_PAGE_SIZE") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      pageSize: +action.value,
    };
  }
  if (action.type === "CHANGE_PAGE") {
    return {
      ...state,
      pageNo: action.pageNo +1,
    };
  }
  if (action.type === "SEARCH") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      title: action.title,
    };
  }
  if (action.type === "SET_SEARCH_VALUE") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      searchValue: action.searchValue,
    };
  }
  if (action.type === "SET_STATUS") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      status: action.status ? action.status : initialQueryFilterState.status,
    };
  }
  if (action.type === "SET_ALPHABETICAL_SORTING") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      alphabetical: action.alphabetical,
      createdAt: null,
    };
  }
  if (action.type === "SET_CRONOLOGICAL_SORTING") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      createdAt: action.createdAt,
      alphabetical: null,
    };
  }
  if (action.type === "SET_ALL_FILTERS") {
    return {
      ...initialQueryFilterState,
      ...action.filters,
    };
  }
  return initialQueryFilterState;
};

const collectionReducer = (state, action) => {
  if (action.type === "SET_STATUS") {
    return {
      status: action.status,
    };
  }

  return initialCollectionState;
};

const Collections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [collectionType, setCollectionType] = useState(null);
  const [pageLength, setPageLegnth] = useState();
  const [firstRender, setFirstRender] = useState(true);
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [collectionState, dispatchCollectionState] = useReducer(
    collectionReducer,
    initialCollectionState
  );

  const handleStatusChange = (event) => {
    if (event.target.checked) {
      if (collectionState.status === "all") {
        dispatchQueryFilter({
          type: "SET_STATUS",
          status: [event.target.value],
        });
        dispatchCollectionState({
          type: "SET_STATUS",
          status: "",
        });
      } else {
        dispatchQueryFilter({
          type: "SET_STATUS",
          status: [...queryFilterState.status, event.target.value],
        });
      }
    } else {
      if (queryFilterState.status.length > 1) {
        dispatchQueryFilter({
          type: "SET_STATUS",
          status: queryFilterState.status.filter(
            (status) => status !== event.target.value
          ),
        });
      } else {
        dispatchQueryFilter({
          type: "SET_STATUS",
          status: ["active", "in-active", "scheduled"],
        });
        dispatchCollectionState({
          type: "SET_STATUS",
          status: "all",
        });
      }
    }
  };

  useEffect(() => {
    const filterParams = JSON.parse(searchParams.get("filter")) || {
      collectionType,
    };
    if (firstRender && Object.keys(filterParams).length) {
      let filters = {};
      for (let key in filterParams) {
        if (key !== "collectionType") {
          if (filterParams[key] !== (null || "")) {
            if (key === "status" && filterParams[key].length < 2) {
              dispatchCollectionState({
                type: "SET_STATUS",
                status: "",
              });
            }
            filters = {
              ...filters,
              [key]: filterParams[key],
            };
          }
        } else {
          setCollectionType(+filterParams[key]);
        }
      }
      if (filterParams.collectionType === (null || "")) {
        setCollectionType(0);
      }
      dispatchQueryFilter({
        type: "SET_ALL_FILTERS",
        filters,
      });
      setFirstRender(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!firstRender) {
      setSearchParams({
        filter: JSON.stringify({ ...queryFilterState, collectionType }),
      });
    }
  }, [queryFilterState, setSearchParams, collectionType, firstRender]);
  

  const {
    data: collectionData,
    isLoading: collectionIsLoading,
    isSuccess: collectionIsSuccess,
    error: collectionError,
  } = useGetAllCollectionsQuery({ ...queryFilterState });

  const {
    data: collectionCountData,
    isLoading: collectionCountIsLoading,
    isSuccess: collectionCountIsSuccess,
    error: collectionCountError,
  } = useGetCollectionsCountQuery();

  const collectionCount = collectionCountData?.data[0]

  const [
    hardDeleteCollection,
    {
      isLoading: hardDeleteCollectionIsLoading,
      isSuccess: hardDeleteCollectionIsSuccess,
      error: hardDeleteCollectionError,
    },
  ] = useHardDeleteCollectionMutation();

  const [
    bulkDeleteCollection,
    {
      isLoading: bulkDeleteCollectionIsLoading,
      isSuccess: bulkDeleteCollectionIsSuccess,
      error: bulkDeleteCollectionError,
    },
  ] = useHardBulkDeleteCollectionMutation();

  const [
    deleteCollection,
    {
      isLoading: deleteCollectionIsLoading,
      isSuccess: deleteCollectionIsSuccess,
      error: deleteCollectionError,
    },
  ] = useDeleteCollectionMutation();

  const deleteHardCollection = (data) => {
    hardDeleteCollection(data)
  }

  const deleteBulkCollection = (data) => {
    bulkDeleteCollection({deletes: data})
  }

  const handleChangeRowsPerPage = (event) => {
    dispatchQueryFilter({ type: "SET_PAGE_SIZE", value :event.target.value });
  };

  const handleChangePage = (_, pageNo) => {
    dispatchQueryFilter({ type: "CHANGE_PAGE", pageNo });
  };

  const handleSearchChange = (value) => {
    dispatchQueryFilter({ type: "SEARCH", title: value });
  };

  const handleSearchValue =(value)=>{
    dispatchQueryFilter({ type: "SET_SEARCH_VALUE", searchValue: value });
  }

  const editCategoryPageNavigationHandler = (data, index) => {
    navigate({
      pathname: `./edit/${data ? data._id : ""}`,
      search: `?${createSearchParams({
        filter: JSON.stringify({ ...queryFilterState, collectionType }),
      })}`,
    });
  };

  const changeCollectionTypeHandler = (_event, tabIndex) => {
    setCollectionType(tabIndex);
    if (tabIndex === 0) {
      dispatchCollectionState({
        type: "SET_STATUS",
        status: "all",
      });
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["active", "in-active", "scheduled"],
      });
    } else if (tabIndex === 1) {
      dispatchCollectionState({
        type: "SET_STATUS",
        status: "",
      });
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["active"],
      });
    } else if (tabIndex === 2) {
      dispatchCollectionState({
        type: "SET_STATUS",
        status: "",
      });
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["in-active"],
      });
    } else if (tabIndex === 3) {
      dispatchCollectionState({
        type: "SET_STATUS",
        status: "",
      });
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["archieved"],
      });
    }
    dispatchQueryFilter({ type: "SET_SEARCH_VALUE", searchValue: "" });
    dispatchQueryFilter({ type: "SEARCH", name: "" });
  };

  const handleAlphabeticalSorting = (event) => {
    dispatchQueryFilter({
      type: "SET_ALPHABETICAL_SORTING",
      alphabetical: event.target.value,
    });
    setAnchorSortEl(null);
  };

  const handleChronologicalSorting = (event) => {
    dispatchQueryFilter({
      type: "SET_CRONOLOGICAL_SORTING",
      createdAt: event.target.value,
    });
    setAnchorSortEl(null);
  };

  const [anchorSortEl, setAnchorSortEl] = useState(null);

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;

  const [anchorStatusEl, setAnchorStatusEl] = useState(null);
  const handleStatusClick = (event) => {
    setAnchorStatusEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorStatusEl(null);
  };

  const openStatus = Boolean(anchorStatusEl);
  const idStatus = openStatus ? "simple-popover" : undefined;

  const deleteCollectionHandler = (data) => {
    if (collectionType === 0) {
      deleteCollection(data._id);
    }
    if (collectionType === 1) {
      deleteCollection(data._id);
    }
    if (collectionType === 2) {
      deleteCollection(data._id);
    }
    if (collectionType === 3) {
      deleteCollection(data._id);
    }
  };

  useEffect(() => {
    if (collectionError) {
      setError(true);
      if (collectionError?.data?.message) {
        dispatch(showError({ message: collectionError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (collectionIsSuccess) {
      setError(false);
      if (collectionType === 0) {
        setCollectionList(collectionData.data.data);
        setPageLegnth(collectionData.data.totalCount)
      }
      if (collectionType === 1) {
        setCollectionList(collectionData.data.data);
        setPageLegnth(collectionData.data.totalCount)
      }
      if (collectionType === 2) {
        setCollectionList(collectionData.data.data);
        setPageLegnth(collectionData.data.totalCount)
      }
      if (collectionType === 3) {
        setCollectionList(collectionData.data.data);
        setPageLegnth(collectionData.data.totalCount)
      }
    }
  }, [
    collectionData,
    collectionIsSuccess,
    collectionError,
    collectionType,
    dispatch,
  ]);
  
  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Collections</h4>
        <Tooltip title="Lorem ipsum" placement="top">
          <InfoOutlinedIcon
            sx={{ color: "#c8d8ff", fontSize: 20 }}
            className="c-pointer"
          />
        </Tooltip>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ExportDialog dialogName={"Collections"} />
          <ImportSecondDialog dialogName={"Collections"} />
          <Link to="create" className="button-gradient py-2 px-4 ms-3">
            <p>+ Create Collection</p>
          </Link>
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
            <Tabs
              value={collectionType}
              onChange={changeCollectionTypeHandler}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab 
                label={`All (${collectionCount?.active + collectionCount?.inActive + collectionCount?.scheduled})`} className="tabs-head" 
              />
              <Tab 
                label={`Active (${collectionCount?.active})`} 
                className="tabs-head" />
              <Tab 
                label={`In-Active (${collectionCount?.inActive})`} 
                className="tabs-head" />
              <Tab 
                label={`Archived (${collectionCount?.archived})`} 
                className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearchSecondary 
              onSearchValueChange={handleSearchValue} 
              value={queryFilterState.searchValue} 
              onChange={handleSearchChange} 
            />
             <div className="d-flex">
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idStatus}
                variant="contained"
                onClick={handleStatusClick}
              >
                <small className="text-lightBlue me-2">Status</small>
                <img src={arrowDown} alt="sort" className="" />
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
                <FormControl className="px-2 py-1" onChange={handleStatusChange}>
                  <FormControlLabel
                    value="active"
                    control={<Checkbox size="small" sx={{ color: "#c8d8ff" }}/>}
                    label="Active"
                    checked={
                      collectionState.status === "" &&
                      queryFilterState.status.includes("active")
                    }
                  />
                  <FormControlLabel
                    value="in-active"
                    control={<Checkbox size="small" sx={{ color: "#c8d8ff" }}/>}
                    label="In-Active"
                    checked={
                      collectionState.status === "" &&
                      queryFilterState.status.includes("in-active")
                    }
                  />
                  <FormControlLabel
                    value="scheduled"
                    control={<Checkbox size="small" sx={{ color: "#c8d8ff" }}/>}
                    label="Scheduled"
                    checked={
                      collectionState.status === "" &&
                      queryFilterState.status.includes("scheduled")
                    }
                  />
                </FormControl>
              </Popover>
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
                  >
                    <FormControlLabel
                      value="-1"
                      control={<Radio 
                        size="small" 
                        checked={queryFilterState.createdAt === "-1"}
                      />}
                      label="Newest to Oldest"
                      onChange={handleChronologicalSorting}
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio 
                        size="small" 
                        checked={queryFilterState.createdAt === "1"}
                      />}
                      label="Oldest to Newest"
                      onChange={handleChronologicalSorting}
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio 
                        size="small" 
                        checked={queryFilterState.alphabetical === "1"}
                      />}
                      label="Alphabetical (A-Z)"
                      onChange={handleAlphabeticalSorting}
                    />
                    <FormControlLabel
                      value="-1"
                      control={<Radio 
                        size="small" 
                        checked={queryFilterState.alphabetical === "-1"}
                      />}
                      label="Alphabetical (Z-A)"
                      onChange={handleAlphabeticalSorting}
                    />
                  </RadioGroup>
                </FormControl>
              </Popover>
            </div>
          </div>
          <TabPanel value={collectionType} index={0}>
            <CollectionsTable
              deleteData={deleteCollectionHandler}
              isLoading={collectionIsLoading}
              error={error}
              list={collectionList}
              pageLength={pageLength}
              edit={editCategoryPageNavigationHandler}
              rowsPerPage={queryFilterState.pageSize}
              page={queryFilterState.pageNo}
              changeRowsPerPage={handleChangeRowsPerPage}
              changePage={handleChangePage}
              collectionType={collectionType}
            />
          </TabPanel>
          <TabPanel value={collectionType} index={1}>
            <CollectionsTable
              deleteData={deleteCollectionHandler}
              isLoading={collectionIsLoading}
              error={error}
              list={collectionList}
              pageLength={pageLength}
              edit={editCategoryPageNavigationHandler}
              rowsPerPage={queryFilterState.pageSize}
              page={queryFilterState.pageNo}
              changeRowsPerPage={handleChangeRowsPerPage}
              changePage={handleChangePage}
              collectionType={collectionType}
            />
          </TabPanel>
          <TabPanel value={collectionType} index={2}>
            <CollectionsTable
              deleteData={deleteCollectionHandler}
              isLoading={collectionIsLoading}
              error={error}
              list={collectionList}
              pageLength={pageLength}
              edit={editCategoryPageNavigationHandler}
              rowsPerPage={queryFilterState.pageSize}
              page={queryFilterState.pageNo}
              changeRowsPerPage={handleChangeRowsPerPage}
              changePage={handleChangePage}
              collectionType={collectionType}
            />
          </TabPanel>
          <TabPanel value={collectionType} index={3}>
            <CollectionsTable
              deleteData={deleteCollectionHandler}
              hardDeleteCollection={deleteHardCollection}
              bulkDelete={deleteBulkCollection}
              isLoading={collectionIsLoading}
              error={error}
              list={collectionList}
              pageLength={pageLength}
              collectionType={collectionType}
              edit={editCategoryPageNavigationHandler}
              rowsPerPage={queryFilterState.pageSize}
              page={queryFilterState.pageNo}
              changeRowsPerPage={handleChangeRowsPerPage}
              changePage={handleChangePage}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Collections;
