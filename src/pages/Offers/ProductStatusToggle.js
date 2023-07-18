import React from "react";
// ! MATERIAL IMPORTS
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const ProductStatusToggle = ({value,toggleData,handleStatus,error}) => {


  return (
    <ToggleButtonGroup
      value={value}
      onChange={handleStatus}
      aria-label="text formatting"
      className="row d-flex px-2 productInfo-toggle"
      size="small"
      exclusive
    >
      <ToggleButton
        value={toggleData[0]}
        aria-label="active"
        style={{ width: "50%" }}
        className="productInfo-toggle__active"
      >
        <div className="d-flex">
          <p className="text-grey-6">{toggleData[0]}</p>
        </div>
      </ToggleButton>
      <ToggleButton
        value={toggleData[1]}
        aria-label="inactive"
        style={{ width: "50%" }}
        className="productInfo-toggle__draft"
      >
        <div className="d-flex">
          <p className="text-grey-6">{toggleData[1]}</p>
        </div>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ProductStatusToggle;
