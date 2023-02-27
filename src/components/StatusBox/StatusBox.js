import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const StatusBox = ({ headingName }) => {
  // ? TOGGLE BUTTONS STARTS HERE
  const [productStatus, setPoductStatus] = React.useState("active");
  const handleProductStatus = (event, newProductStatus) => {
    setPoductStatus(newProductStatus);
  };
  // ? TOGGLE BUTTONS ENDS HERE
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="text-lightBlue mb-3 fw-500">{headingName}</h6>
      </div>

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
    </div>
  );
};

export default StatusBox;
