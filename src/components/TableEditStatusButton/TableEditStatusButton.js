import React from "react";
import { Popover } from "@mui/material";
// ! IMAGES IMPORTS
import arrowDown from "../../assets/icons/arrowDown.svg";

const TableEditStatusButton = () => {
  // * EDIT STATUS POPOVERS STARTS
  const [anchorEditStatusEl, setAnchorEditStatusEl] = React.useState(null);
  const handleEditStatusClick = (event) => {
    setAnchorEditStatusEl(event.currentTarget);
  };
  const handleEditStatusClose = () => {
    setAnchorEditStatusEl(null);
  };
  const openEditStatus = Boolean(anchorEditStatusEl);
  const idEditStatus = openEditStatus ? "simple-popover" : undefined;
  // * EDIT STATUS POPOVERS ENDS

  return (
    <React.Fragment>
      <button
        className="button-grey py-2 px-3 ms-2"
        aria-describedby={idEditStatus}
        variant="contained"
        onClick={handleEditStatusClick}
      >
        <small className="text-lightBlue">Edit Status</small>
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
        id={idEditStatus}
        open={openEditStatus}
        anchorEl={anchorEditStatusEl}
        onClose={handleEditStatusClose}
      >
        <div className="py-2 px-1">
          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
            Set as Active
          </small>
          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
            Set as Draft
          </small>
        </div>
      </Popover>
    </React.Fragment>
  );
};

export default TableEditStatusButton;
