import React from "react";
import { Popover } from "@mui/material";
// ! IMAGES IMPORTS
import arrowDown from "../../assets/icons/arrowDown.svg";
const TableMassActionButton = ({onSelect, headingName, defaultValue=['active','In-active']}) => {
   // * EDIT STATUS POPOVERS STARTS
  const [anchorEditStatusEl, setAnchorEditStatusEl] = React.useState(null);
  const handleEditStatusClick = (event) => {
    setAnchorEditStatusEl(event.currentTarget);
  };
  const handleStatusSelect = (status) => {
    onSelect(status); // Call the callback function passed from the parent component
    handleEditStatusClose();
  };
  const handleEditStatusClose = () => {
    setAnchorEditStatusEl(null);
  };

  const openEditStatus = Boolean(anchorEditStatusEl);
  const idEditStatus = openEditStatus ? "simple-popover" : undefined;
  // * MASS ACTION POPOVERS ENDS
  return (
     <React.Fragment>
      <button
        className="button-grey py-2 px-3 ms-2"
        aria-describedby={idEditStatus}
        variant="contained"
        onClick={handleEditStatusClick}
      >
        <small className="text-lightBlue">{headingName}</small>
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
          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back" onClick={() => handleStatusSelect(defaultValue[0])}>
          {defaultValue[0]}
          </small>
          <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back" onClick={() => handleStatusSelect(defaultValue[1])}>
          {defaultValue[1]}
          </small>
        </div>
      </Popover>
    </React.Fragment>
  );
};
export default TableMassActionButton;