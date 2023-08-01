import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { showError } from "../../../features/snackbar/snackbarAction";
import { useGetAllCustomersQuery } from "../../../features/customers/customer/customerApiSlice";

import AllUsersTable from "./AllUsersTable";
import TabPanel from "../../../components/TabPanel/TabPanel";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import FilterUsers from "../../../components/FilterUsers/FilterUsers";
import { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";

import "./AllUsers.scss";

import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import allFlag from "../../../assets/images/products/allFlag.svg";
import usaFlag from "../../../assets/images/products/usaFlag.svg";
import ukFlag from "../../../assets/images/products/ukFlag.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import sort from "../../../assets/icons/sort.svg";
import analyticsUp from "../../../assets/icons/analyticsUp.svg";
import analyticsDown from "../../../assets/icons/analyticsDown.svg";
import customers from "../../../assets/icons/sidenav/customers.svg";

const locationData = [
  { title: "Content 1", value: "content1" },
  { title: "Content 2", value: "content2" },
  { title: "Content 3", value: "content3" },
  { title: "Content 4", value: "content4" },
  { title: "Content 5", value: "content5" },
  { title: "Content 6", value: "content6" },
  { title: "Content 7", value: "content7" },
  { title: "Content 8", value: "content8" },
  { title: "Content 9", value: "content9" },
  { title: "Content 10", value: "content10" },
  { title: "Content 11", value: "content11" },
  { title: "Content 12", value: "content12" },
];

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 0,
  name:"",
  searchValue: ""
};

const initialUsersState = {
  data: [],
  totalCount: 0,
  error: false,
  customerType:0,
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
      pageNo: action.pageNo ,
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
  return initialQueryFilterState;
};

const usersReducer = (state, action) => {
  if (action.type === "SET_DATA") {
    return {
      ...state,
      data: action.data,
      totalCount: action.totalCount,
    };
  }
  if (action.type === "ERROR") {
    return {
      ...state,
      error: action.error,
    };
  }
  if (action.type === "SET_CUSTOMER_TYPE") {
    console.log(action, 'acations');
    return {
      ...state,
      customerType: action.customerType,
    };
  }
  return initialUsersState;
};

const AllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[searchParams, setSearchParams] = useSearchParams();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [usersState, dispatchUsers] = useReducer(
    usersReducer,
    initialUsersState
  );

  const queryParameters = {};

  if(queryFilterState.name) {
    queryParameters.name = queryFilterState.name;
  }

  const customerStatusQuery = 
    usersState.customerType === 0 ? {createdAt: -1}
  : usersState.customerType === 1 ? { status: "active" }
  : usersState.customerType === 2 ? { status: "new" }
  : usersState.customerType === 3 ? { createdAt: -1, status: "in-active" }
  : usersState.customerType === 4 ? { createdAt: -1, status: "archieved" }
  : {};

  const {
    data: customersData,  
    isLoading: customersIsLoading, 
    isSuccess: customersIsSuccess, 
    error: customersError
  } = useGetAllCustomersQuery({
      createdAt:1,
      pageSize:queryFilterState.pageSize,
      pageNo:queryFilterState.pageNo+1,
      ...queryParameters, ...customerStatusQuery
    });

  const editHandler = (id) => {
    let combinedObject = {id, customerStatusQuery}
    const paramsQuery = encodeURIComponent(JSON.stringify(combinedObject));    

    navigate(`./details/${paramsQuery}`);
  };

  const handleChangeRowsPerPage = (event) => {
    dispatchQueryFilter({ type: "SET_PAGE_SIZE", value :event.target.value });
  };

  const handleChangePage = (_, pageNo) => {
    dispatchQueryFilter({ type: "CHANGE_PAGE", pageNo });
  };

  const changeCustomerTypeHandler = (event, newValue) => {
    dispatchUsers({
      type:"SET_CUSTOMER_TYPE", customerType:newValue
    })
    setSearchParams(newValue)
  };

  useEffect(() => {
    if( +searchParams.get("status") == 0 ) {
      usersState.customerType = 0;
    } else if(+searchParams.get("status")==1) {
      usersState.customerType = 1;
    } else if(+searchParams.get("status")===2) {
      usersState.customerType = 2;
    } else if(+searchParams.get("status")===3) {
      usersState.customerType = 3;
    }
  }, [searchParams])

  const handleSearchChange = (value) => {
    dispatchQueryFilter({ type: "SEARCH", name: value });
  };

  const handleSearchValue =(value)=>{
    dispatchQueryFilter({ type: "SET_SEARCH_VALUE", searchValue: value });
  }

  // * FLAG POPOVERS STARTS
  const [anchorFlagEl, setAnchorFlagEl] = useState(null);
  const handleFlagClick = (event) => {
    setAnchorFlagEl(event.currentTarget);
  };
  const handleFlagClose = () => {
    setAnchorFlagEl(null);
  };
  const openFlag = Boolean(anchorFlagEl);
  const idFlag = openFlag ? "simple-popover" : undefined;
  // * FLAG POPOVERS ENDS

  // * SORT POPOVERS STARTS
  const [anchorSortEl, setAnchorSortEl] = useState(null);

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;
  // * SORT POPOVERS ENDS

  // * LOCATION POPOVERS STARTS
  const [anchorLocationEl, setAnchorLocationEl] = useState(null);

  const handleLocationClick = (event) => {
    setAnchorLocationEl(event.currentTarget);
  };

  const handleLocationClose = () => {
    setAnchorLocationEl(null);
  };

  const openLocation = Boolean(anchorLocationEl);
  const idLocation = openLocation ? "simple-popover" : undefined;
  // * LOCATION POPOVERS ENDS

  // * NO OF ORDERS POPOVERS STARTS
  const [anchorOrdersEl, setAnchorOrdersEl] = useState(null);

  const handleOrdersClick = (event) => {
    setAnchorOrdersEl(event.currentTarget);
  };

  const handleOrdersClose = () => {
    setAnchorOrdersEl(null);
  };

  const openOrders = Boolean(anchorOrdersEl);
  const idOrders = openOrders ? "simple-popover" : undefined;
  // * NO OF ORDERS POPOVERS ENDS

  // * STATUS POPOVERS STARTS
  const [anchorStatusEl, setAnchorStatusEl] = useState(null);

  const handleStatusClick = (event) => {
    setAnchorStatusEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorStatusEl(null);
  };

  const openStatus = Boolean(anchorStatusEl);
  const idStatus = openStatus ? "simple-popover" : undefined;
  // * STATUS POPOVERS ENDS

  // * DAYS POPOVERS STARTS
  const [anchorDaysEl, setDaysEl] = useState(null);

  const handleDaysClick = (event) => {
    setDaysEl(event.currentTarget);
  };

  const handleDaysClose = () => {
    setDaysEl(null);
  };

  const openDays = Boolean(anchorDaysEl);
  const idDays = openDays ? "simple-popover" : undefined;
  // * DAYS POPOVERS ENDS

  useEffect(() => {
    if (customersIsSuccess) {
      dispatchUsers({
        type:"ERROR", error: false
      })
      if (usersState.customerType === 0) {
        dispatchUsers({
          type: "SET_DATA",
          data: customersData.data.data,
          totalCount: customersData.data.totalCount,
        })
      }
      if (usersState.customerType === 1) {
        dispatchUsers({
          type: "SET_DATA",
          data: customersData.data.data,
          totalCount: customersData.data.totalCount,
        })
      }
      if(usersState.customerType === 2)
      {
        dispatchUsers({
          type: "SET_DATA",
          data: customersData.data.data,
          totalCount: customersData.data.totalCount,
        })
      }
      if(usersState.customerType === 3)
      {
        dispatchUsers({
          type: "SET_DATA",
          data: customersData.data.data,
          totalCount: customersData.data.totalCount,
        })
      }
      if(usersState.customerType === 4)
      {
        dispatchUsers({
          type: "SET_DATA",
          data: customersData.data.data,
          totalCount: customersData.data.totalCount,
        })
      }
    }
    if (customersError) {
      dispatchUsers({
        type:"ERROR", error: true
      })
      if (customersError?.data?.message) {
        dispatch(showError({ message: customersError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }

  }, [customersData,customersIsSuccess,customersIsLoading,customersError,queryFilterState.pageNo,queryFilterState.pageSize])

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">All Customers</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"User Module"} icon={customers} />
          <ExportDialog dialogName={"Users"} />
          <ImportSecondDialog dialogName={"Users"} />
          <Link to="/users/allUsers/add" className="button-gradient py-2 px-4">
            <p>+ Add New</p>
          </Link>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-3 col-6 ps-0 my-3 d-flex">
          <div className="border-grey-5 bg-black-15 rounded-8 py-3 px-3 flex-grow-1">
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex flex-column">
                <h2 className="text-lightBlue fw-400">50</h2>
                <small className="text-grey-6 mt-2">Active</small>
              </div>
              <div className="d-flex flex-column align-items-end">
                <img
                  src={analyticsUp}
                  alt="analyticsUp"
                  className=""
                  width={25}
                />
                <small className="text-green-2 mt-3">+10.78 %</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 ps-0 my-3 d-flex">
          <div className="border-grey-5 bg-black-15 rounded-8 py-3 px-3 flex-grow-1">
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex flex-column">
                <h2 className="text-lightBlue fw-400">50</h2>
                <small className="text-grey-6 mt-2">In-Active</small>
              </div>
              <div className="d-flex flex-column align-items-end">
                <img
                  src={analyticsDown}
                  alt="analyticsDown"
                  className=""
                  width={25}
                />
                <small className="text-red-4 mt-3">-10.78 %</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 ps-0 my-3 d-flex">
          <div className="border-grey-5 bg-black-15 rounded-8 py-3 px-3 flex-grow-1">
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex flex-column">
                <h2 className="text-lightBlue fw-400">50</h2>
                <small className="text-grey-6 mt-2">Returning Users</small>
              </div>
              <div className="d-flex flex-column align-items-end">
                <img
                  src={analyticsUp}
                  alt="analyticsUp"
                  className=""
                  width={25}
                />
                <small className="text-green-2 mt-3">+10.78 %</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 ps-0 pe-0 my-3 d-flex">
          <div
            className="border-grey-5 bg-black-15 rounded-8 py-3 px-3 text-center flex-grow-1 d-flex align-items-center justify-content-center c-pointer"
            onClick={handleDaysClick}
          >
            <h3 className="text-lightBlue">30 Days</h3>

            <KeyboardArrowDownIcon
              sx={{
                fontSize: 30,
                marginLeft: 1,
                color: "#c8d8ff",
                cursor: "pointer",
                marginTop: "2px",
              }}
            />
          </div>

          <Popover
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            id={idDays}
            open={openDays}
            anchorEl={anchorDaysEl}
            onClose={handleDaysClose}
          >
            <div className="py-2 px-1">
              <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                Last 7 Days
              </small>
              <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                Last 15 Days
              </small>
              <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                Last 30 Days
              </small>
              <small className="text-blue-gradient rounded-3 p-2 d-block c-pointer">
                Custom Date
              </small>
            </div>
          </Popover>
        </div>
      </div>

      <div className="row">
        <Paper
          sx={{ width: "100%", mb: 0, mt: 0, p: 0 }}
          className="border-grey-5 bg-black-15"
        >
          <Box
            sx={{ width: "100%" }}
            className="d-flex justify-content-between tabs-header-box"
          >
            <Tabs
              value={usersState.customerType}
              onChange={changeCustomerTypeHandler}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Active" className="tabs-head" />
              <Tab label="New" className="tabs-head" />
              <Tab label="In-Active" className="tabs-head" />
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
            <div
              className="tabs-country c-pointer"
              aria-describedby={idFlag}
              variant="contained"
              onClick={handleFlagClick}
            >
              <img src={indiaFlag} alt="indiaFlag" height={15} />
              <p className="mx-2 text-lightBlue">India</p>
              <img src={arrowDown} alt="arrowDown" />
            </div>
            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              id={idFlag}
              open={openFlag}
              anchorEl={anchorFlagEl}
              onClose={handleFlagClose}
            >
              <div className="px-1 py-2">
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={allFlag} alt="allFlag" height={20} />
                  <p className="ms-2 text-lightBlue">All</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={ukFlag} alt="usaFlag" height={15} />
                  <p className="ms-2 text-lightBlue">UK</p>
                </div>
                <div className="d-flex align-items-center c-pointer hover-back px-3 py-1 my-1 rounded-3">
                  <img src={usaFlag} alt="usaFlag" height={15} />
                  <p className="ms-2 text-lightBlue">USA</p>
                </div>
              </div>
            </Popover>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearchSecondary 
              onSearchValueChange={handleSearchValue} 
              value={queryFilterState.searchValue} 
              onChange={handleSearchChange} 
            />
            <div className="d-flex ms-2">
              <div className="d-flex product-button__box">
                <button
                  className="button-grey py-1 px-3 d-none d-md-block"
                  aria-describedby={idLocation}
                  variant="contained"
                  onClick={handleLocationClick}
                >
                  <small className="text-lightBlue">Location</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idLocation}
                  open={openLocation}
                  anchorEl={anchorLocationEl}
                  onClose={handleLocationClose}
                >
                  <div className="py-2">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      options={locationData}
                      getOptionLabel={(option) => option.title}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <small className="text-lightBlue my-1">
                            {option.title}
                          </small>
                        </li>
                      )}
                      sx={{
                        width: 200,
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search"
                          inputRef={(input) => input?.focus()}
                        />
                      )}
                    />
                  </div>
                </Popover>
                <button
                  className="button-grey py-1 px-3 d-none d-md-block"
                  aria-describedby={idOrders}
                  variant="contained"
                  onClick={handleOrdersClick}
                >
                  <small className="text-lightBlue">No of Orders</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idOrders}
                  open={openOrders}
                  anchorEl={anchorOrdersEl}
                  onClose={handleOrdersClose}
                >
                  <div className="py-2 px-1">
                    <small className="d-block text-lightBlue">
                      Min No. of Order
                    </small>
                    <FormControl className="px-0 mt-1">
                      <OutlinedInput placeholder="Enter Min" size="small" />
                    </FormControl>
                    <small className="d-block text-lightBlue mt-2">
                      Max No. of Order
                    </small>
                    <FormControl className="px-0 mt-1">
                      <OutlinedInput placeholder="Enter Max" size="small" />
                    </FormControl>
                  </div>
                </Popover>

                <button
                  className="button-grey py-1 px-3 d-none d-md-block"
                  aria-describedby={idStatus}
                  variant="contained"
                  onClick={handleStatusClick}
                >
                  <small className="text-lightBlue">Status</small>
                  <img src={arrowDown} alt="arrowDown" className="ms-2" />
                </button>

                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={idStatus}
                  open={openStatus}
                  anchorEl={anchorStatusEl}
                  onClose={handleStatusClose}
                >
                  <div className=" px-1">
                    <FormGroup className="tags-checkbox">
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="Active"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="In-Active"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="Blocked"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                            }}
                          />
                        }
                        label="Archived"
                      />
                    </FormGroup>
                  </div>
                </Popover>
                <FilterUsers buttonName={"More Filters"} />
              </div>
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
                    // value={value}
                    // onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="userName"
                      control={<Radio size="small" />}
                      label="User Name"
                    />
                    <FormControlLabel
                      value="location"
                      control={<Radio size="small" />}
                      label="Location"
                    />
                    <FormControlLabel
                      value="totalSpent"
                      control={<Radio size="small" />}
                      label="Total Spent"
                    />
                    <FormControlLabel
                      value="noOfOrders"
                      control={<Radio size="small" />}
                      label="No of Orders"
                    />
                    <FormControlLabel
                      value="uploadTime"
                      control={<Radio size="small" />}
                      label="Upload Time"
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
                    <FormControlLabel
                      value="oldestToNewest"
                      control={<Radio size="small" />}
                      label="Oldest to Newest"
                    />
                    <FormControlLabel
                      value="newestToOldest"
                      control={<Radio size="small" />}
                      label="Newest to Oldest"
                    />
                  </RadioGroup>
                </FormControl>
              </Popover>
            </div>
          </div>
          <TabPanel value={usersState.customerType} index={0}>
            <AllUsersTable
              isLoading={customersIsLoading}
              error={usersState.error}
              list={usersState.data}
              totalCount={usersState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
              onEdit={editHandler}
            />
          </TabPanel>
          <TabPanel value={usersState.customerType} index={1}>
            <AllUsersTable 
              isLoading={customersIsLoading}
              error={usersState.error}
              list={usersState.data}
              totalCount={usersState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
              onEdit={editHandler}
            />
          </TabPanel>
          <TabPanel value={usersState.customerType} index={2}>
            <AllUsersTable 
              isLoading={customersIsLoading}
              error={usersState.error}
              list={usersState.data}
              totalCount={usersState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
              onEdit={editHandler}
            />
          </TabPanel>
          <TabPanel value={usersState.customerType} index={3}>
            <AllUsersTable 
              isLoading={customersIsLoading}
              error={usersState.error}
              list={usersState.data}
              totalCount={usersState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
              onEdit={editHandler}
            />
          </TabPanel>
          <TabPanel value={usersState.customerType} index={4}>
            <AllUsersTable 
              isLoading={customersIsLoading}
              error={usersState.error}
              list={usersState.data}
              totalCount={usersState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
              onEdit={editHandler}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default AllUsers;
