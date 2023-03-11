import React from "react";
// ! IMAGES IMPORTS
import columns from "../../assets/icons/columns.svg";
// ! MATERIAL IMPORTS
import { FormGroup, FormControlLabel, Popover, Checkbox } from "@mui/material";

const OrderColumnsFilter = () => {
  // * COLUMNS POPOVERS STARTS
  const [anchorColumnsEl, setAnchorColumnsEl] = React.useState(null);

  const handleColumnsClick = (event) => {
    setAnchorColumnsEl(event.currentTarget);
  };

  const handleColumnsClose = () => {
    setAnchorColumnsEl(null);
  };

  const openColumns = Boolean(anchorColumnsEl);
  const idColumns = openColumns ? "simple-popover" : undefined;
  // * COLUMNS POPOVERS ENDS
  return (
    <React.Fragment>
      <button
        className="button-grey py-2 px-3 ms-2"
        aria-describedby={idColumns}
        variant="contained"
        onClick={handleColumnsClick}
      >
        <small className="text-lightBlue">Columns</small>
        <img src={columns} alt="columns" className="ms-2" />
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
        id={idColumns}
        open={openColumns}
        anchorEl={anchorColumnsEl}
        onClose={handleColumnsClose}
        className="columns"
      >
        <FormGroup className="px-2 py-1">
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                size="small"
                style={{
                  color: "#5C6D8E",
                }}
              />
            }
            label="Catgory"
            className="me-0"
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
            label="Sub Catgory"
            className="me-0"
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
            label="Collection"
            className="me-0"
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
            label="Vendor"
            className="me-0"
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
            label="Price"
            className="me-0"
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
            label="Activity"
            className="me-0"
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
            label="Status"
            className="me-0"
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
            label="Action"
            className="me-0"
          />
        </FormGroup>
      </Popover>
    </React.Fragment>
  );
};

export default OrderColumnsFilter;
