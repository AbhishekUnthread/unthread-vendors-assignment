import { useState, forwardRef, useReducer, useEffect } from "react";
import { Link, useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Slide,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";

import {
  showError,
} from "../../../features/snackbar/snackbarAction";
import { 
  useGetAllCustomerGroupQuery,
  useGetCustomerGroupCountQuery,
  useBulkDeleteCustomerGroupMutation
} from "../../../features/customers/customerGroup/customerGroupApiSlice";

import UserGroupsTable from "./UserGroupsTable";
import TabPanel from "../../../components/TabPanel/TabPanel";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";

import cancel from "../../../assets/icons/cancel.svg";
import sort from "../../../assets/icons/sort.svg";
import customers from "../../../assets/icons/sidenav/customers.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 0,
  name:"",
  searchValue: "",
  status: ["active", "in-active"],
  createdAt: "-1",
  alphabetical: null
};

const initialCustomerState = {
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
      name: action.name,
    };
  }
  if (action.type === "SET_SEARCH_VALUE") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      searchValue: action.searchValue,
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
  if (action.type === "SET_STATUS") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      status: action.status ? action.status : initialQueryFilterState.status,
    };
  }
  return initialQueryFilterState;
};

const customerReducer = (state, action) => {
  if (action.type === "SET_STATUS") {
    return {
      status: action.status,
    };
  }
  return initialCustomerState;
};

const UserGroups = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [openManageGroups, setOpenManageGroups] = useState(false);
  const [anchorSortEl, setAnchorSortEl] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [firstRender, setFirstRender] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const [pageLength, setPageLegnth] = useState();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [customerState, dispatchCustomerState] = useReducer(
    customerReducer,
    initialCustomerState
  );

  const [
    bulkDeleteCustomerGroup,
    {
      isLoading: bulkDeleteGroupIsLoading,
      isSuccess: bulkDeleteGroupIsSuccess,
      error: bulkDeleteGroupError,
    },
  ] = useBulkDeleteCustomerGroupMutation();

  const {
    data: groupCountData,
    isLoading: groupCountIsLoading,
    isSuccess: groupCountIsSuccess,
    error: groupCountError,
  } = useGetCustomerGroupCountQuery();

  const {
    data: customerGroupData,
    isLoading: customerGroupIsLoading,
    isSuccess: customerGroupIsSuccess,
    error: customerGroupError,
  } = useGetAllCustomerGroupQuery({...queryFilterState});

  const customerData =  customerGroupData?.data;

  const deleteBulkCollection = (data) => {
    bulkDeleteCustomerGroup({deletes: data})
  }

  const handleChangeRowsPerPage = (event) => {
    dispatchQueryFilter({ type: "SET_PAGE_SIZE", value :event.target.value });
  };

  const handleChangePage = (_, pageNo) => {
    dispatchQueryFilter({ type: "CHANGE_PAGE", pageNo });
  };

  const handleSearchChange = (value) => {
    dispatchQueryFilter({ type: "SEARCH", name: value });
  };

  const handleSearchValue =(value)=>{
    dispatchQueryFilter({ type: "SET_SEARCH_VALUE", searchValue: value });
  }

  const handleChange = (_event, tabIndex) => {
    setValue(tabIndex);
    if (tabIndex === 0) {
      dispatchCustomerState({
        type: "SET_STATUS",
        status: "all",
      });
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["active", "in-active"],
      });
    } else if (tabIndex === 1) {
      dispatchCustomerState({
        type: "SET_STATUS",
        status: "",
      });
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["active"],
      });
    } else if (tabIndex === 2) {
      dispatchCustomerState({
        type: "SET_STATUS",
        status: "",
      });
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["in-active"],
      });
    } else if (tabIndex === 3) {
      dispatchCustomerState({
        type: "SET_STATUS",
        status: "",
      });
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["archived"],
      });
    }
    dispatchQueryFilter({ type: "SET_SEARCH_VALUE", searchValue: "" });
    dispatchQueryFilter({ type: "SEARCH", name: "" });
    setSearchParams(tabIndex)
  };

   useEffect(() => {
    const filterParams = JSON.parse(searchParams.get("filter")) || {
      value,
    };
    if (firstRender && Object.keys(filterParams).length) {
      let filters = {};
      for (let key in filterParams) {
        if (key !== "value") {
          if (filterParams[key] !== (null || "")) {
            if (key === "status" && filterParams[key].length < 2) {
              dispatchCustomerState({
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
          setValue(+filterParams[key])
        }
      }
      if (filterParams.collectionType === (null || "")) {
        setValue(0)
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
        filter: JSON.stringify({ ...queryFilterState, value }),
      });
    }
  }, [queryFilterState, setSearchParams, value, firstRender]);

  useEffect(() => {
    if (customerGroupError) {
      if (customerGroupError?.data?.message) {
        dispatch(showError({ message: customerGroupError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (customerGroupIsSuccess) {
      if (value === 0) {
        setCustomerList(customerGroupData.data.data);
        setPageLegnth(customerGroupData.data.totalCount)
      }
      if (value === 1) {
        setCustomerList(customerGroupData.data.data);
        setPageLegnth(customerGroupData.data.totalCount)
      }
      if (value === 2) {
        setCustomerList(customerGroupData.data.data);
        setPageLegnth(customerGroupData.data.totalCount)
      }
      if (value === 3) {
        setCustomerList(customerGroupData.data.data);
        setPageLegnth(customerGroupData.data.totalCount)
      }
    }
  }, [
    customerGroupData,
    customerGroupIsSuccess,
    customerGroupError,
    value,
    dispatch,
  ]);

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;

  const groupData = [
    { title: "No Group", value: "content1" },
    { title: "VIP", value: "content2" },
    { title: "VVIP", value: "content3" },
    { title: "Wholesaler", value: "content4" },
    { title: "Highest Orders", value: "content5" },
    { title: "Loyal Users", value: "content6" },
    { title: "New Users", value: "content7" },
    { title: "Default Users", value: "content8" },
    { title: "Guest Users", value: "content9" },
  ];

  const handleOpenManageGroups = () => {
    setOpenManageGroups(true);
  };

  const handleOpenManageGroupsClose = () => {
    setOpenManageGroups(false);
  };

  const editHandler = (data, index) => {
    navigate({
      pathname: `./edit/${data ? data._id : ""}`,
      search: `?${createSearchParams({
        filter: JSON.stringify({ ...queryFilterState, pageSize: 1, value }),
      })}`,
    });
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

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">User Groups</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"User Groups"} icon={customers} />
          {/* <button
            className="button-lightBlue-outline py-2 px-3 ms-3"
            onClick={handleOpenManageGroups}
          >
            <p>Manage Default Group</p>
          </button> */}
          <Link
            to="/users/userGroups/create"
            className="button-gradient py-2 px-4 ms-3"
          >
            <p>Create Group +</p>
          </Link>

          {/* <Dialog
            open={openManageGroups}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleOpenManageGroupsClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">
                    Manage Default Groups
                  </h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleOpenManageGroupsClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">
                Default Group for Registered Users
              </p>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                className="col-7 px-0"
                options={groupData}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                  <li {...props}>
                    <small className="text-lightBlue my-1">
                      {option.title}
                    </small>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search"
                    inputRef={(input) => input?.focus()}
                  />
                )}
              />
              <p className="text-lightBlue mb-2 mt-3">
                Default Group for Guest Users
              </p>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                className="col-7 px-0"
                options={groupData}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                  <li {...props}>
                    <small className="text-lightBlue my-1">
                      {option.title}
                    </small>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search"
                    inputRef={(input) => input?.focus()}
                  />
                )}
              />
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button
                className="button-grey py-2 px-5"
                onClick={handleOpenManageGroupsClose}
              >
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button
                className="button-gradient py-2 px-5"
                onClick={handleOpenManageGroupsClose}
              >
                <p>Apply</p>
              </button>
            </DialogActions>
          </Dialog> */}
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
              value={value}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab 
                label={`All (${groupCountData?.data[0]?.active + groupCountData?.data[0]['in-active']})`} className="tabs-head" 
              />
              <Tab label={`Active (${groupCountData?.data[0]?.active })`} className="tabs-head" />
              <Tab label={`In-Active (${groupCountData?.data[0]['in-active']})`} className="tabs-head" />
              <Tab label={`Archived (${groupCountData?.data[0]?.archived })`} className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearchSecondary 
              onSearchValueChange={handleSearchValue} 
              value={queryFilterState.searchValue} 
              onChange={handleSearchChange} 
            />
            <div className="d-flex ms-2">
              <button
                className="button-grey py-2 px-3"
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
          <TabPanel value={value} index={0}>
            <UserGroupsTable 
              value={value}
              data={customerList}
              totalCount={customerData?.totalCount || 0}
              loading={customerGroupIsLoading}
              error={customerGroupError}
              onEdit={editHandler}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserGroupsTable 
              value={value}
              data={customerList}
              totalCount={customerData?.totalCount || 0}
              loading={customerGroupIsLoading}
              error={customerGroupError}
              onEdit={editHandler}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <UserGroupsTable 
              value={value}
              data={customerList}
              totalCount={customerData?.totalCount || 0}
              loading={customerGroupIsLoading}
              error={customerGroupError}
              onEdit={editHandler}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <UserGroupsTable 
              value={value}
              data={customerList}
              totalCount={customerData?.totalCount || 0}
              loading={customerGroupIsLoading}
              error={customerGroupError}
              bulkDelete={deleteBulkCollection}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default UserGroups;
