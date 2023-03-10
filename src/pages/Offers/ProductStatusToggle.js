import React from "react";
// ! MATERIAL IMPORTS
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const ProductStatusToggle = () => {
  // ? TOGGLE BUTTONS STARTS HERE
  const [productStatus, setPoductStatus] = React.useState("active");
  const handleProductStatus = (event, newProductStatus) => {
    setPoductStatus(newProductStatus);
  };
  // ? TOGGLE BUTTONS ENDS HERE

  return (
    <ToggleButtonGroup
      value={productStatus}
      onChange={handleProductStatus}
      aria-label="text formatting"
      className="row d-flex px-2 productInfo-toggle"
      size="small"
      exclusive
    >
      <ToggleButton
        value="active"
        aria-label="active"
        style={{ width: "50%" }}
        className="productInfo-toggle__active"
      >
        <div className="d-flex">
          <p className="text-grey-6">Active</p>
        </div>
      </ToggleButton>
      <ToggleButton
        value="inactive"
        aria-label="inactive"
        style={{ width: "50%" }}
        className="productInfo-toggle__draft"
      >
        <div className="d-flex">
          <p className="text-grey-6">In-Active</p>
        </div>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ProductStatusToggle;
