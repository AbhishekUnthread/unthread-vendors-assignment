import React from "react";
import { Popover } from "@mui/material";
// ! IMAGES IMPORTS
import arrowDown from "../../assets/icons/arrowDown.svg";
import deleteRed from "../../assets/icons/delete.svg";

const TableMassActionButton = () => {
  // * MASS ACTION POPOVERS STARTS
  const [anchorMassActionEl, setAnchorMassActionEl] = React.useState(null);
  const handleMassActionClick = (event) => {
    setAnchorMassActionEl(event.currentTarget);
  };
  const handleMassActionClose = () => {
    setAnchorMassActionEl(null);
  };
  const openMassAction = Boolean(anchorMassActionEl);
  const idMassAction = openMassAction ? "simple-popover" : undefined;
  // * MASS ACTION POPOVERS ENDS

  return (
    <React.Fragment>
      <button
        className="button-grey py-2 px-3 ms-2"
        aria-describedby={idMassAction}
        variant="contained"
        onClick={handleMassActionClick}
      >
        <small className="text-lightBlue">Mass Action</small>
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
        id={idMassAction}
        open={openMassAction}
        anchorEl={anchorMassActionEl}
        onClose={handleMassActionClose}
      >
        <div className="py-2 px-2">
          <small className="text-grey-7 px-2">ACTIONS</small>
          <hr className="hr-grey-6 my-2" />
          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
            Edit User
          </small>
          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
            Edit User Group
          </small>
          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
            Add or Remove Tags
          </small>
          <div className="d-flex justify-content-between  hover-back rounded-3 p-2 c-pointer">
            <small className="text-lightBlue font2 d-block">
              Archived User
            </small>
            <img src={deleteRed} alt="delete" className="" />
          </div>
        </div>
      </Popover>
    </React.Fragment>
  );
};

export default TableMassActionButton;
