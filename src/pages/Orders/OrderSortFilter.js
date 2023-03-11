import React from "react";
// ! IMAGES IMPORTS
import sort from "../../assets/icons/sort.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
} from "@mui/material";

const OrderSortFilter = () => {
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
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default OrderSortFilter;
