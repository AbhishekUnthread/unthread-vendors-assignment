import React, { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link,useSearchParams } from "react-router-dom";
// ! COMPONENT IMPORTS
import DiscountsTable from "./DiscountsTable";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import TableSearch, { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";
// ! IMAGES IMPORTS
import discounts from "../../../assets/icons/sidenav/discounts.svg";
import sort from "../../../assets/icons/sort.svg";
import cancel from "../../../assets/icons/cancel.svg";
import productDiscount from "../../../assets/icons/productDiscount.svg";
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
  Slide,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
// ! MATERIAL ICONS IMPORT
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useGetAllDiscountsQuery } from "../../../features/offers/discounts/discountsApiSlice";
import { showError } from "../../../features/snackbar/snackbarAction";

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 1,
  name:"",
  searchValue:""
};
const initialDiscountsState = {
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
const  discountsReducer = (state, action) => {
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
  return initialDiscountsState;
};

const Discounts = () => {
  const[searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [discountsState, dispatchDiscounts] = useReducer(
    discountsReducer,
    initialDiscountsState
  );

  const{
    data: discountsData, // 
    isLoading: discountsIsLoading, 
    isSuccess: discountsIsSuccess, 
    error: discountsError,
    isError:discountsIsError
    

  }=useGetAllDiscountsQuery(queryFilterState);

  const handleDiscountTypeChangeHandler = (event, newValue) => {
    dispatchDiscounts({
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

console.log("first",discountsData?.data[0])
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

  // ? CATEGORIES DIALOG STARTS HERE
  const [openCreateDiscount, setOpenCreateDiscount] = React.useState(false);

  const handleCreateDiscount = () => {
    setOpenCreateDiscount(true);
  };

  const handleCreateDiscountClose = () => {
    setOpenCreateDiscount(false);
  };
  // ? CATEGORIES DIALOG ENDS HERE
  
  useEffect(() => {
    if (discountsIsSuccess) {

      if (discountsState.discountType === 0) {
        dispatchDiscounts({
          type: "SET_DATA",
          data: discountsData?.data,
          totalCount: discountsData?.totalCount,
        })
      }
      if (discountsState.discountType === 1) {
        dispatchDiscounts({
          type: "SET_DATA",
          data: discountsData?.data,
          totalCount: discountsData?.totalCount,
        })
      }
      if(discountsState.discountType === 2)
      {
        dispatchDiscounts({
          type: "SET_DATA",
          data: discountsData?.data,
          totalCount: discountsData?.totalCount,
        })
      }
      if(discountsState.discountType === 3)
      {
        dispatchDiscounts({
          type: "SET_DATA",
          data: discountsData?.data,
          totalCount: discountsData?.totalCount,
        })
      }
      if(discountsState.discountType === 4)
      {
        dispatchDiscounts({
          type: "SET_DATA",
          data: discountsData?.data,
          totalCount: discountsData?.totalCount,
        })
      }
    }
    if (discountsIsError) {
      if (discountsError?.data?.message) {
        dispatch(showError({ message: discountsError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }

  }, [discountsIsSuccess,discountsIsError,discountsError,dispatch,discountsData,discountsState.discountType])

  useEffect(() => {
    if(+searchParams.get("type")===0)
    {
      dispatchDiscounts({
        type:"SET_DISCOUNT_TYPE", discountType:0
      })
    }
    else if(+searchParams.get("type")===1)
    {
      dispatchDiscounts({
        type:"SET_DISCOUNT_TYPE", discountType:1
      })
    }
    else if(+searchParams.get("type")===2)
    {
      dispatchDiscounts({
        type:"SET_DISCOUNT_TYPE", discountType:2
      })
    }
    else if(+searchParams.get("type")===3)
    {
     dispatchDiscounts({
        type:"SET_DISCOUNT_TYPE", discountType:3
      })
    }
    else if(+searchParams.get("type")===4)
    {
     dispatchDiscounts({
        type:"SET_DISCOUNT_TYPE", discountType:4
      })
    }
    else if(+searchParams.get("type")===5)
    {
     dispatchDiscounts({
        type:"SET_DISCOUNT_TYPE", discountType:5
      })
    }
}, [searchParams])

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <div className="d-flex w-auto align-items-center px-0">
          <h4 className="page-heading w-auto ps-0 me-2">Discounts</h4>
          <Tooltip title="Lorem ipsum" placement="top">
            <InfoOutlinedIcon
              sx={{ color: "#c8d8ff", fontSize: 20 }}
              className="c-pointer"
            />
          </Tooltip>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer headingName={"Offers / Discounts"} icon={discounts} />
          <ImportSecondDialog dialogName={"Discounts"} />
          <button
            className="button-gradient py-2 px-4 ms-3"
            onClick={handleCreateDiscount}
          >
            <p>+ Create Discount</p>
          </button>

          <Dialog
            open={openCreateDiscount}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCreateDiscountClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="md"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">
                    Select Type of Discount
                  </h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleCreateDiscountClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="py-3 px-4">
              <div className="row">
                {[...Array(5)].map((elementInArray, index) => (
                  <div className="col-6 my-3">
                    <Link
                      to="/offers/discounts/create"
                      className="d-flex p-3 rounded-8 hover-back-two c-pointer text-decoration-none"
                    >
                      <img
                        src={productDiscount}
                        alt="productDiscount"
                        width={100}
                      />
                      <div className="d-flex ms-3 flex-column">
                        <p className="text-lightBlue">Product Discount</p>
                        <small className="d-block mt-2 text-grey-6">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Esse odio amet
                        </small>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-end px-4 py-3">
              <button
                className="button-lightBlue-outline py-2 px-5"
                onClick={handleCreateDiscountClose}
              >
                <p className="">Cancel</p>
              </button>
              {/* <button
                className="button-gradient py-2 px-5"
                onClick={handleCreateDiscountClose}
              >
                <p>Save</p>
              </button> */}
            </DialogActions>
          </Dialog>
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
              value={discountsState.discountType}
              onChange={handleDiscountTypeChangeHandler}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Product Discount" className="tabs-head" />
              <Tab label="Cart Discount" className="tabs-head" />
              <Tab label="Free Shipping" className="tabs-head" />
              <Tab label="Buy X, Get Y" className="tabs-head" />
              <Tab label="Bulk/Tired Discount Pricing" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
          <TableSearchSecondary onSearchValueChange={handleSearchChange} value={queryFilterState.searchValue} onChange={handleSearchValue} />
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
          <TabPanel value={discountsState.discountType} index={0}>
            <DiscountsTable
              isLoading={discountsIsLoading}
              list={discountsState.data}
              totalCount={discountsState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
             />
          </TabPanel>
          <TabPanel value={discountsState.discountType} index={1}>
            <DiscountsTable
              isLoading={discountsIsLoading}
              list={discountsState.data}
              totalCount={discountsState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
             />
          </TabPanel>
          <TabPanel value={discountsState.discountType} index={2}>
            <DiscountsTable
              isLoading={discountsIsLoading}
              list={discountsState.data}
              totalCount={discountsState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
             />
          </TabPanel>
          <TabPanel value={discountsState.discountType} index={3}>
            <DiscountsTable
              isLoading={discountsIsLoading}
              list={discountsState.data}
              totalCount={discountsState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
             />
          </TabPanel>
          <TabPanel value={discountsState.discountType} index={4}>
            <DiscountsTable
              isLoading={discountsIsLoading}
              list={discountsState.data}
              totalCount={discountsState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
             />
          </TabPanel>
          <TabPanel value={discountsState.discountType} index={5}>
            <DiscountsTable
              isLoading={discountsIsLoading}
              list={discountsState.data}
              totalCount={discountsState.totalCount}
              changeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={queryFilterState.pageSize}
              changePage={handleChangePage}
              page={queryFilterState.pageNo}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Discounts;
