import React, { forwardRef, useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { 
  Box,
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

import CollectionsTable from "./CollectionsTable";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";

import sort from "../../../assets/icons/sort.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";

import { useDispatch } from "react-redux";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

import {
  useGetAllCollectionsQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useEditCollectionMutation,
} from "../../../features/parameters/collections/collectionsApiSlice";

const eventHandler = (e) => {
  e.stopPropagation();
  console.log(e.target);
};

const initialCollectionState = {
  status: "",
  start: 0,
  limit: 10,
  total: null,
};

const collectionsReducer = (state, action) => {
  switch (action.type) {
    case "STATUS": {
      return {
        ...state,
        status: action.payload,
      };
    }
    default: {
      return initialCollectionState;
    }
  }
};

const Collections = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [collectionType, setCollectionType] = useState(0);
  const [collectionsStatus, setCollectionsStatus] = useState("");
  const [pageLength, setPageLegnth] = useState();
  const [collectionState, collectionDispatch] = useReducer(
    collectionsReducer,
    initialCollectionState
  );
  const [sortFilter, setSortFilter] = React.useState("newestToOldest");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [searchValue, setSearchValue] = useState("");

  const filterParameter = {};

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }
  
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value)
    setAnchorStatusEl(null)
  }

  if (sortFilter) {
    if (sortFilter === "alphabeticalAtoZ" || sortFilter === "alphabeticalZtoA") {
      filterParameter.alphabetical = sortFilter == "alphabeticalAtoZ" ? "1" : "-1";
    }
    else if (sortFilter === "oldestToNewest" || sortFilter === "newestToOldest") {
      filterParameter.createdAt = sortFilter == "oldestToNewest" ? "1" : "-1";
    }
  }
  
  const collectionTypeQuery = collectionType === 0 ? { createdAt: -1 }
    : collectionType === 1 ? { status: "active" }
    : collectionType === 2 ? { createdAt: -1, status: "in-active" }
    : collectionType === 3 ? { createdAt: -1, status: "archieved" }
    : {};

  const filterParams = { ...filterParameter, ...collectionTypeQuery };
  if (searchValue) {
    filterParams.title = searchValue;
  }

  if (collectionType === 0) {
    filterParams.status = statusFilter;
  }

  const {
    data: collectionData,
    isLoading: collectionIsLoading,
    isSuccess: collectionIsSuccess,
    error: collectionError,
  } = useGetAllCollectionsQuery({...filterParams});

  const [
    deleteCollection,
    {
      isLoading: deleteCollectionIsLoading,
      isSuccess: deleteCollectionIsSuccess,
      error: deleteCollectionError,
    },
  ] = useDeleteCollectionMutation();

  const handleTabChange = (event, tabIndex) => {
    setCollectionType(tabIndex);
  };

   // * SORT POPOVERS STARTS
  const [anchorSortEl, setAnchorSortEl] = React.useState(null);

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const handleSortRadio = (event) => {
    setSortFilter(event.target.value);
    setAnchorSortEl(null);
  }

  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;
  // * SORT POPOVERS ENDS

  // * STATUS POPOVERS STARTS
  const [anchorStatusEl, setAnchorStatusEl] = React.useState(null);
  const handleStatusClick = (event) => {
    setAnchorStatusEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorStatusEl(null);
  };

  const openStatus = Boolean(anchorStatusEl);
  const idStatus = openStatus ? "simple-popover" : undefined;
  // * STATUS POPOVERS ENDS

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
              onChange={handleTabChange}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Active" className="tabs-head" />
              <Tab label="In-Active" className="tabs-head" />
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch searchValue={searchValue} handleSearchChange={handleSearchChange}/>
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
                <FormControl className="px-2 py-1">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={statusFilter}
                    onChange={handleStatusChange}
                  >
                    <FormControlLabel
                      value="active"
                      control={<Radio size="small" />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="in-active"
                      control={<Radio size="small" />}
                      label="In-Active"
                    />
                    <FormControlLabel
                      value="scheduled"
                      control={<Radio size="small" />}
                      label="Scheduled"
                    />
                    <FormControlLabel
                      value="archived"
                      control={<Radio size="small" />}
                      label="Archived"
                    />
                  </RadioGroup>
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
                    value={sortFilter}
                    onChange={handleSortRadio}
                  >
                    <FormControlLabel
                      value="newestToOldest"
                      control={<Radio size="small" />}
                      label="Newest to Oldest"
                    />
                    <FormControlLabel
                      value="oldestToNewest"
                      control={<Radio size="small" />}
                      label="Oldest to Newest"
                    />
                    <FormControlLabel
                      value="alphabeticalAtoZ"
                      control={<Radio size="small" />}
                      label="Alphabetical (A-Z)"
                    />
                    <FormControlLabel
                      value="alphabeticalZtoA"
                      control={<Radio size="small" />}
                      label="Alphabetical (Z-A)"
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
            />
          </TabPanel>
          <TabPanel value={collectionType} index={1}>
            <CollectionsTable
              deleteData={deleteCollectionHandler}
              isLoading={collectionIsLoading}
              error={error}
              list={collectionList}
              pageLength={pageLength}
            />
          </TabPanel>
          <TabPanel value={collectionType} index={2}>
            <CollectionsTable
              deleteData={deleteCollectionHandler}
              isLoading={collectionIsLoading}
              error={error}
              list={collectionList}
              pageLength={pageLength}
            />
          </TabPanel>
          <TabPanel value={collectionType} index={3}>
            <CollectionsTable
              deleteData={deleteCollectionHandler}
              isLoading={collectionIsLoading}
              error={error}
              list={collectionList}
              pageLength={pageLength}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Collections;
