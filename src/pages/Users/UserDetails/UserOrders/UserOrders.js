import React from "react";
import "../../../Products/AllProducts/AllProducts.scss";
// ! COMPONENT IMPORTS
import UserOrdersTable from "./UserOrdersTable";
import TableSearch from "../../../../components/TableSearch/TableSearch";
import FilterUsers from "../../../../components/FilterUsers/FilterUsers";
// ! IMAGES IMPORTS
import sort from "../../../../assets/icons/sort.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const UserOrders = () => {
  // ? POPOVERS STARTS HERE
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

  // * ORDERS TYPE POPOVERS STARTS
  const [anchorOrderTypeEl, setAnchorOrderTypeEl] = React.useState(null);
  const handleOrderTypeClick = (event) => {
    setAnchorOrderTypeEl(event.currentTarget);
  };
  const handleOrderTypeClose = () => {
    setAnchorOrderTypeEl(null);
  };
  const openOrderType = Boolean(anchorOrderTypeEl);
  const idOrderType = openOrderType ? "simple-popover" : undefined;
  // * ACTIVITY POPOVERS ENDS

  // ? POPOVERS ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 row productInfo">
      <div className="d-flex px-3 py-3 align-items-center">
        <h6 className="text-lightBlue me-2">Orders:</h6>
        <button
          className="button-grey ps-3 pe-2 rounded-pill"
          aria-describedby={idOrderType}
          variant="contained"
          onClick={handleOrderTypeClick}
        >
          <p className="text-lightBlue">Online</p>
          <KeyboardArrowDownIcon sx={{ color: "#c8d8ff", fontWeight: 300 }} />
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
          id={idOrderType}
          open={openOrderType}
          anchorEl={anchorOrderTypeEl}
          onClose={handleOrderTypeClose}
        >
          <div className="py-2 px-1">
            <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
              Online Orders
            </small>
            <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
              Offline Orders
            </small>
          </div>
        </Popover>
      </div>
      <div className="d-flex justify-content-center px-2">
        <hr className="hr-grey-6 w-100 m-0" />
      </div>
      <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
        <TableSearch />
        <div className="d-flex ms-2">
          <FilterUsers buttonName={"Filters"} />
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
      <div className="col-12 px-0">
        <UserOrdersTable />
      </div>
    </div>
  );
};

export default UserOrders;
