import React, { useState, useEffect, useReducer } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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

import CollectionsTable from "./CollectionsTable";
import TableSearch, { TableSearchSecondary} from "../../../components/TableSearch/TableSearch";
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
  useDeleteCollectionMutation,
  useHardDeleteCollectionMutation,
  useHardBulkDeleteCollectionMutation
} from "../../../features/parameters/collections/collectionsApiSlice";

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
  title:"",
  searchValue:""
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
  return initialQueryFilterState;
};

const Collections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [collectionType, setCollectionType] = useState(0);
  const [pageLength, setPageLegnth] = useState();
  const [sortFilter, setSortFilter] = useState("newestToOldest");
  const [statusFilter, setStatusFilter] = useState([]);
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );

  const filterParameter = {};

  const handleStatusChange = (event) => {
    const { value } = event.target;
  
    setStatusFilter((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((option) => option !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };
  
  if (sortFilter) {
    if (sortFilter === "alphabeticalAtoZ" || sortFilter === "alphabeticalZtoA") {
      filterParameter.alphabetical = sortFilter == "alphabeticalAtoZ" ? "1" : "-1";
    }
    else if (sortFilter === "oldestToNewest" || sortFilter === "newestToOldest") {
      filterParameter.createdAt = sortFilter == "oldestToNewest" ? "1" : "-1";
    }
  }

  if (statusFilter !== null) {
    if (Array.isArray(statusFilter)) {
      filterParameter.status = statusFilter.join(',');
    } else {
      filterParameter.status = statusFilter;
    }
  }

  if (statusFilter == null) {
    filterParameter.status = "active";
    filterParameter.status = "in-active";
    filterParameter.status = "active"
  }
  
  const collectionTypeQuery = 
      collectionType === 0 ? statusFilter.length > 0 ? { status: statusFilter } : { status: ["active","in-active","scheduled"] }
    : collectionType === 1 ? { status: "active" }
    : collectionType === 2 ? { createdAt: -1, status: "in-active" }
    : collectionType === 3 ? { createdAt: -1, status: "archieved" }
    : {};

  const filterParams = { ...filterParameter, ...collectionTypeQuery };

  const {
    data: collectionData,
    isLoading: collectionIsLoading,
    isSuccess: collectionIsSuccess,
    error: collectionError,
  } = useGetAllCollectionsQuery({ ...filterParameter, ...collectionTypeQuery, ...queryFilterState});

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

  const handleTabChange = (event, tabIndex) => {
    setCollectionType(tabIndex);
  };

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

  const editCategoryPageNavigationHandler = (data,index) => {
    const combinedObject = { filterParameter, collectionTypeQuery, queryFilterState };
    const encodedCombinedObject = encodeURIComponent(JSON.stringify(combinedObject));    

    const currentTabNo =
    index + (queryFilterState.pageNo - 1) * queryFilterState.pageSize;

    navigate(`./edit/${currentTabNo}/${encodedCombinedObject}`);
  };

  const changeVendorTypeHandler = (_event, tabIndex) => {
    setCollectionType(tabIndex);
    dispatchQueryFilter({ type: "SET_SEARCH_VALUE", searchValue: "" });
    dispatchQueryFilter({ type: "SEARCH", name: "" });
    setSortFilter('');
    setStatusFilter('')
    setSearchParams({status:tabIndex})
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

  useEffect(() => {
        if(+searchParams.get("status")===0)
        {
          setCollectionType(0);
        }
        else if(+searchParams.get("status")===1)
        {
          setCollectionType(1);
        }
        else if(+searchParams.get("status")===2)
        {
          console.log("check")
          setCollectionType(2);
        }
        else if(+searchParams.get("status")===3)
        {
          setCollectionType(3);
        }
    }, [searchParams])
    

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
              onChange={changeVendorTypeHandler}
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
                    checked={statusFilter.includes('active')}
                  />
                  <FormControlLabel
                    value="in-active"
                    control={<Checkbox size="small" sx={{ color: "#c8d8ff" }}/>}
                    label="In-Active"
                    checked={statusFilter.includes('in-active')}
                  />
                  <FormControlLabel
                    value="scheduled"
                    control={<Checkbox size="small" sx={{ color: "#c8d8ff" }}/>}
                    label="Scheduled"
                    checked={statusFilter.includes('scheduled')}
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
              edit={editCategoryPageNavigationHandler}
              rowsPerPage={queryFilterState.pageSize}
              page={queryFilterState.pageNo}
              changeRowsPerPage={handleChangeRowsPerPage}
              changePage={handleChangePage}
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
