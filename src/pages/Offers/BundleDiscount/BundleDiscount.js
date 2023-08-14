import React, { useEffect, useReducer, useState } from "react";
import { Link, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
// ! COMPONENT IMPORTS
import BundleDiscountTable from "./BundleDiscountTable";
import TableSearch, { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";
// ! IMAGES IMPORTS
import sort from "../../../assets/icons/sort.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  FormControl,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
} from "@mui/material";
// ! MATERIAL ICONS IMPORT
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useBulkDeleteBundleDiscountMutation, useDeleteBundleDiscountMutation, useGetAllBundleDiscountsQuery } from "../../../features/offers/discounts/bundleDiscountsApiSlice";
import { useDispatch } from "react-redux";
import { showError } from "../../../features/snackbar/snackbarAction";

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
  name:"",
  searchValue:"",
  // status: ["active", "in-active"],
  createdAt: "-1",
  alphabetical: null,
};
const initialBundleDiscountsState = {
  data: [],
  totalCount: 0,
  discountType:0,
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
      pageNo: action.pageNo + 1,
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
  return initialQueryFilterState;
};
const  bundleDiscountsReducer = (state, action) => {
  if (action.type === "SET_DATA") {
    return {
      ...state,
      data: action.data,
      totalCount: action.totalCount,
    };
  }
  if (action.type === "SET_DISCOUNT_TYPE") {
    return {
      ...state,
      discountType: action.discountType,
    };
  }
  return initialBundleDiscountsState;
};

const BundleDiscount = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const[searchParams, setSearchParams] = useSearchParams();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [bundleDiscountsState, dispatchBundleDiscounts] = useReducer(
    bundleDiscountsReducer,
    initialBundleDiscountsState
  );

  const{
    data: bundleDiscountsData, 
    isLoading: bundleDiscountsIsLoading, 
    isSuccess: bundleDiscountsIsSuccess, 
    error: bundleDiscountsError,
    isError:bundleDiscountsIsError
  }=useGetAllBundleDiscountsQuery(queryFilterState);

  const [
    deleteBundleDiscount,
    {
      isLoading: deleteBundleDiscountIsLoading,
      isSuccess: deleteBundleDiscountIsSuccess,
      error: deleteBundleDiscountError,
    },
  ] = useDeleteBundleDiscountMutation();

  const [
    bulkDeleteBundleDiscount,
    {
      isLoading: bulkDeleteBundleDiscountIsLoading,
      isSuccess: bulkDeleteBundleDiscountIsSuccess,
      error: bulkDeleteBundleDiscountError
    }
  ] = useBulkDeleteBundleDiscountMutation();

  const handleDiscountTypeChangeHandler = (event, newValue) => {
    dispatchBundleDiscounts({
      type:"SET_DISCOUNT_TYPE", discountType:newValue
    })
    dispatchQueryFilter({ type: "SET_SEARCH_VALUE", searchValue: "" });
    dispatchQueryFilter({ type: "SEARCH", name: "" });
    setSearchParams({type:newValue})
  };
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
  const editDiscountPageNavigation = (data)=>{
    Navigate({
      pathname: `./edit/${data ? data._id : ""}`,
      search: `?${createSearchParams({
        filter: JSON.stringify({ ...queryFilterState, discountType: bundleDiscountsState.discountType}),
      })}`,
    });
  };

    useEffect(() => {
    if (bundleDiscountsIsSuccess) {

      if (bundleDiscountsState.discountType === 0) {
        dispatchBundleDiscounts({
          type: "SET_DATA",
          data: bundleDiscountsData?.data?.data,
          totalCount: bundleDiscountsData?.data?.totalCount,
        })
      }
      if (bundleDiscountsState.discountType === 1) {
        dispatchBundleDiscounts({
          type: "SET_DATA",
          data: bundleDiscountsData?.data?.data,
          totalCount: bundleDiscountsData?.data?.totalCount,
        })
      }
      if(bundleDiscountsState.discountType === 2)
      {
        dispatchBundleDiscounts({
          type: "SET_DATA",
          data: bundleDiscountsData?.data?.data,
          totalCount: bundleDiscountsData?.data?.totalCount,
        })
      }
      if(bundleDiscountsState.discountType === 3)
      {
        dispatchBundleDiscounts({
          type: "SET_DATA",
          data: bundleDiscountsData?.data?.data,
          totalCount: bundleDiscountsData?.data?.totalCount,
        })
      }
    }
    if (bundleDiscountsIsError) {
      if (bundleDiscountsError?.data?.message) {
        dispatch(showError({ message: bundleDiscountsError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }

  }, [bundleDiscountsIsSuccess,bundleDiscountsIsError,bundleDiscountsError,dispatch,bundleDiscountsState.discountType,deleteBundleDiscountIsSuccess,bulkDeleteBundleDiscountIsSuccess,bundleDiscountsData])

  useEffect(() => {
    if (deleteBundleDiscountError) {
      if (deleteBundleDiscountError?.data?.message) {
        dispatch(showError({ message: deleteBundleDiscountError?.data?.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong, please try again" })
        );
      }
    }
  }, [deleteBundleDiscountError, dispatch]);

  useEffect(() => {
    if (bulkDeleteBundleDiscountError) {
      if (bulkDeleteBundleDiscountError?.data?.message) {
        dispatch(showError({ message: bulkDeleteBundleDiscountError?.data?.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong, please try again" })
        );
      }
    }
  }, [bulkDeleteBundleDiscountError, dispatch]);

  useEffect(() => {
    if(+searchParams.get("type")===0)
    {
      dispatchBundleDiscounts({
        type:"SET_DISCOUNT_TYPE", discountType:0
      })
    }
    else if(+searchParams.get("type")===1)
    {
      dispatchBundleDiscounts({
        type:"SET_DISCOUNT_TYPE", discountType:1
      })
    }
    else if(+searchParams.get("type")===2)
    {
      dispatchBundleDiscounts({
        type:"SET_DISCOUNT_TYPE", discountType:2
      })
    }
    else if(+searchParams.get("type")===3)
    {
      dispatchBundleDiscounts({
        type:"SET_DISCOUNT_TYPE", discountType:3
      })
    }
}, [searchParams])

  // * SORT POPOVERS STARTS
  const [anchorSortEl, setAnchorSortEl] = React.useState(null);

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;
  // * SORT POPOVERS ENDS

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <div className="d-flex w-auto align-items-center px-0">
          <h4 className="page-heading w-auto ps-0 me-2">Bundle Discount</h4>

          <Tooltip title="Lorem ipsum" placement="top">
            <InfoOutlinedIcon
              sx={{ color: "#c8d8ff", fontSize: 20 }}
              className="c-pointer"
            />
          </Tooltip>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          {/* <ViewLogsDrawer
            headingName={"Offers / Bundle Discount"}
            icon={discounts}
          />
          <ImportSecondDialog dialogName={"Bundle Discount"} /> */}
          <Link
            to="/offers/bundleDiscount/create"
            className="button-gradient py-2 px-4 ms-3"
          >
            <p>+ Create Bundle</p>
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
            {/* variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile */}
            <Tabs
              value={bundleDiscountsState.discountType}
              onChange={handleDiscountTypeChangeHandler}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Active" className="tabs-head" />
              <Tab label="Scheduled" className="tabs-head" />
              <Tab label="Expired" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
          <TableSearchSecondary
              onSearchValueChange={handleSearchValue}
              value={queryFilterState.searchValue}
              onChange={handleSearchChange}
            />
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
                    value="1"
                    control={
                      <Radio
                        size="small"
                        checked={queryFilterState.alphabetical === "1"}
                      />
                    }
                    label="Alphabetical (A-Z)"
                    onChange={handleAlphabeticalSorting}
                  />
                  <FormControlLabel
                    value="-1"
                    control={
                      <Radio
                        size="small"
                        checked={queryFilterState.alphabetical === "-1"}
                      />
                    }
                    label="Alphabetical (Z-A)"
                    onChange={handleAlphabeticalSorting}
                  />
                  <FormControlLabel
                    value="1"
                    control={
                      <Radio
                        size="small"
                        checked={queryFilterState.createdAt === "1"}
                      />
                    }
                    label="Oldest to Newest"
                    onChange={handleChronologicalSorting}
                  />
                  <FormControlLabel
                    value="-1"
                    control={
                      <Radio
                        size="small"
                        checked={queryFilterState.createdAt === "-1"}
                      />
                    }
                    label="Newest to Oldest"
                    onChange={handleChronologicalSorting}
                  />
                </RadioGroup>
              </FormControl>
            </Popover>
          </div>
          <TabPanel value={value} index={0}>
            <BundleDiscountTable 
              isLoading={bundleDiscountsIsLoading}
              list={bundleDiscountsState.data}
              totalCount={bundleDiscountsState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
              discountType ={bundleDiscountsState.discountType}
              edit={editDiscountPageNavigation}
              deleteData={deleteBundleDiscount}
              bulkDelete={bulkDeleteBundleDiscount}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BundleDiscountTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BundleDiscountTable />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <BundleDiscountTable />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default BundleDiscount;
