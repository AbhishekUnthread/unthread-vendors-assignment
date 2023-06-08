import React from "react";
// ! IMAGES IMPORTS
import arrowDown from "../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import { FormGroup, FormControlLabel, Popover, Checkbox } from "@mui/material";

const OrderStatusFilter = () => {
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

  return (
    <React.Fragment>
      <button
        className="button-grey py-1 px-3 d-none d-md-block"
        aria-describedby={idStatus}
        variant="contained"
        onClick={handleStatusClick}
      >
        <small className="text-lightBlue">Order Status</small>
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
    </React.Fragment>
  );
};

export default OrderStatusFilter;
