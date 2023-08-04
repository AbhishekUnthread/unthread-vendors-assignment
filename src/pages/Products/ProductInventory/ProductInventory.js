import { useEffect, useReducer, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import { TableSearchSecondary } from "../../../components/TableSearch/TableSearch";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import TabPanel from "../../../components/TabPanel/TabPanel";
// ! IMAGES IMPORTS
import sort from "../../../assets/icons/sort.svg";
import products from "../../../assets/icons/sidenav/products.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Paper,
  Tab,
  Tabs,
  Popover,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import AllInventory from "./AllInventory";
import ArchivedInventory from "./ArchivedInventory";
import { useGetAllStoresQuery } from "../../../features/products/inventory/inventoryApiSlice";

const initialQueryFilterState = {
  name: "",
  country: "",
  status: ["active", "in-active"],
  createdAt: "1",
  // updatedAt: "1",
  alphabetical: "",
  pageNo: 1,
  tabIndex: 0,
  pageSize: 10,
  searchValue: "",
};

const queryFilterReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGE_SIZE":
      return {
        ...state,
        pageNo: initialQueryFilterState.pageNo,
        pageSize: +action.value,
      };

    case "CHANGE_PAGE":
      return {
        ...state,
        pageNo: action.pageNo + 1,
      };

    case "SEARCH":
      return {
        ...state,
        pageNo: initialQueryFilterState.pageNo,
        name: action.name,
      };

    case "SET_SEARCH_VALUE":
      return {
        ...state,
        pageNo: initialQueryFilterState.pageNo,
        searchValue: action.searchValue,
      };

    case "SET_COUNTRY_VALUE": {
      return {
        ...state,
        pageNo: initialQueryFilterState.pageNo,
        country: action.country,
      };
    }

    case "SET_STATUS":
      const { value, checked } = action;
      return {
        ...state,
        pageNo: initialQueryFilterState.pageNo,
        status: checked ? state.status.concat(value) : state.status.filter((s) => s !== value),
      };

    case "SET_ALPHABETICAL_SORTING":
      return {
        ...state,
        pageNo: initialQueryFilterState.pageNo,
        alphabetical: action.alphabetical,
        createdAt: "",
        // updatedAt: "",
      };

    case "SET_CRONOLOGICAL_SORTING":
      return {
        ...state,
        pageNo: initialQueryFilterState.pageNo,
        createdAt: action.createdAt,
        // updatedAt: action.updatedAt,
        alphabetical: "",
      };

    case "SET_ALL_FILTERS":
      return {
        ...initialQueryFilterState,
        ...action.filters,
      };

    case "SET_TAB_INDEX":
      return {
        ...state,
        tabIndex: action.tab,
      };

    default:
      return initialQueryFilterState;
  }
};

const ProductInventory = () => {
  const [firstRender, setFirstRender] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleTabIndexChange = (event, tab) => dispatchQueryFilter({ type: "SET_TAB_INDEX", tab });

  const [queryFilterState, dispatchQueryFilter] = useReducer(queryFilterReducer, initialQueryFilterState);

  const {
    data: storeData,
    isLoading: storeIsLoading,
    // isSuccess: storeIsSuccess,
    error: storeError,
  } = useGetAllStoresQuery({ ...queryFilterState });

  const handleSearchValueChange = (searchValue) => dispatchQueryFilter({ type: "SET_SEARCH_VALUE", searchValue });

  const handleSearchChange = (name) => dispatchQueryFilter({ type: "SEARCH", name });

  const handleCountryValueChange = (id) => dispatchQueryFilter({ type: "SET_COUNTRY_VALUE", country: id });

  const handleStatusCheckboxChange = (event) => {
    const { value, checked } = event.target;
    dispatchQueryFilter({ type: "SET_STATUS", checked, value });
  };

  const handleChronologicalSorting = (event) => {
    dispatchQueryFilter({
      type: "SET_CRONOLOGICAL_SORTING",
      createdAt: event.target.value,
      // updatedAt: event.target.value,
    });
    setAnchorSortEl(null);
  };

  const handleAlphabeticalSorting = (event) => {
    dispatchQueryFilter({
      type: "SET_ALPHABETICAL_SORTING",
      alphabetical: event.target.value,
    });
    setAnchorSortEl(null);
  };

  const [anchorStatusEl, setAnchorStatusEl] = useState(null);
  const openStatus = Boolean(anchorStatusEl);
  const idStatus = openStatus ? "simple-popover" : undefined;
  const handleStatusClick = (event) => setAnchorStatusEl(event.currentTarget);
  const handleStatusClose = () => setAnchorStatusEl(null);

  const [anchorSortEl, setAnchorSortEl] = useState(null);
  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;
  const handleSortClick = (event) => setAnchorSortEl(event.currentTarget);
  const handleSortClose = () => setAnchorSortEl(null);

  useEffect(() => {
    if (firstRender)
      dispatchQueryFilter({
        type: "SET_ALL_FILTERS",
        filters: JSON.parse(searchParams.get("filter")),
      });
    setFirstRender(false);
  }, [searchParams, firstRender]);

  useEffect(() => setSearchParams({ filter: JSON.stringify(queryFilterState) }), [queryFilterState, setSearchParams]);

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Inventory</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer
            headingName={"Product Inventory"}
            icon={products}
          />
          <button className="button-transparent py-2 px-3 me-1">
            <p className="text-lightBlue">Transfer Inventory</p>
          </button>
          <ExportDialog dialogName={"Product Inventory"} />
          <ImportSecondDialog dialogName={"Product Inventory"} />
          <Link
            to="/products/inventory/create"
            className="button-gradient py-2 px-4 ms-3">
            <p>Add Store</p>
          </Link>
        </div>
      </div>

      <div className="row mt-4">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 0, p: 0 }}
          className="border-grey-5 bg-black-15">
          <Box
            sx={{ width: "100%" }}
            className="d-flex justify-content-between tabs-header-box">
            <Tabs
              value={queryFilterState.tabIndex}
              onChange={handleTabIndexChange}
              aria-label="scrollable force tabs example"
              className="tabs">
              <Tab
                label="All"
                className="tabs-head"
              />
              <Tab
                label="Archived"
                className="tabs-head"
              />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearchSecondary
              onChange={handleSearchChange}
              value={queryFilterState.searchValue}
              onSearchValueChange={handleSearchValueChange}
            />

            <div className="ps-3">
              <AppCountrySelect SelectCountryName={handleCountryValueChange} />
            </div>

            <button
              className="button-grey py-2 px-3 ms-2"
              aria-describedby={idStatus}
              variant="contained"
              onClick={handleStatusClick}>
              <small className="text-lightBlue me-2">Status</small>
              <img
                src={arrowDown}
                alt="status"
                className=""
              />
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
              className="columns">
              <FormGroup
                className="px-2 py-1"
                onChange={handleStatusCheckboxChange}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                      }}
                    />
                  }
                  label="Active"
                  value="active"
                  className="me-0"
                  checked={queryFilterState.status.includes("active")}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      style={{
                        color: "#5C6D8E",
                      }}
                    />
                  }
                  label="In-Active"
                  className="me-0"
                  value="in-active"
                  checked={queryFilterState.status.includes("in-active")}
                />
              </FormGroup>
            </Popover>

            <button
              className="button-grey py-2 px-3 ms-2"
              aria-describedby={idSort}
              variant="contained"
              onClick={handleSortClick}>
              <small className="text-lightBlue me-2">Sort</small>
              <img
                src={sort}
                alt="sort"
                className=""
              />
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
              className="columns">
              <FormControl className="px-2 py-1">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group">
                  <FormControlLabel
                    value="-1"
                    control={
                      <Radio
                        size="small"
                        checked={queryFilterState.createdAt === "-1"}
                        // checked={queryFilterState.updatedAt === "-1"}
                      />
                    }
                    label="Newest to Oldest"
                    onChange={handleChronologicalSorting}
                  />
                  <FormControlLabel
                    value="1"
                    control={
                      <Radio
                        size="small"
                        checked={queryFilterState.createdAt === "1"}
                        // checked={queryFilterState.updatedAt === "1"}
                      />
                    }
                    label="Oldest to Newest"
                    onChange={handleChronologicalSorting}
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
                </RadioGroup>
              </FormControl>
            </Popover>
          </div>
          <TabPanel
            value={queryFilterState.tabIndex}
            index={0}>
            <AllInventory
              // edit={}
              // deleteData={}
              // vendorType={}
              // bulkDelete={}
              // editVendor={}
              // bulkEdit={}
              list={storeData?.data?.data ?? []}
              error={storeError}
              isLoading={storeIsLoading}
              totalCount={storeData?.data?.totalCount ?? 0}
              page={queryFilterState.pageNo}
              rowsPerPage={queryFilterState.pageSize}
              changeRowsPerPage={(rsz) => dispatchQueryFilter({ type: "SET_PAGE_SIZE", value: rsz })}
              changePage={(pno) => dispatchQueryFilter({ type: "CHANGE_PAGE", pageNo: pno })}
            />
          </TabPanel>
          <TabPanel
            value={queryFilterState.tabIndex}
            index={1}>
            <ArchivedInventory />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default ProductInventory;
