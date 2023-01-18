import React from "react";
import "./ProductInfo.scss";
import info from "../../../../assets/icons/info.svg";
import {
  FormControl,
  OutlinedInput,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AppTextEditor from "../../../../components/AppTextEditor/AppTextEditor";

const ProductInfo = () => {
  // ? TOGGLE BUTTONS STARTS HERE
  const [productStatus, setPoductStatus] = React.useState("active");
  const handleProductStatus = (event, newProductStatus) => {
    setPoductStatus(newProductStatus);
  };
  // ? TOGGLE BUTTONS ENDS HERE
  return (
    <div className="bg-black-2 border-grey-5 rounded-3 p-3 row productInfo">
      <div className="col-12">
        <div className="row">
          <div className="col-8">
            <div className="d-flex mb-1">
              <p className="text-grey-6">Title</p>
              <img src={info} alt="info" className="ms-2" width={13.5} />
            </div>
            <FormControl sx={{ background: "#15142A" }} className="col-7 px-0">
              <OutlinedInput placeholder="Enter Title" size="small" />
            </FormControl>
          </div>
          <div className="col-4">
            <div className="d-flex mb-1">
              <p className="text-grey-6">Product Status</p>
              <img src={info} alt="info" className="ms-2" width={13.5} />
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
                value="draft"
                aria-label="draft"
                style={{ width: "50%" }}
                className="productInfo-toggle__draft"
              >
                <div className="d-flex">
                  <p className="text-grey-6">Draft</p>
                </div>
              </ToggleButton>
            </ToggleButtonGroup>
            <small className="text-grey-6 mt-1">ⓘ Schedule Product</small>
          </div>
        </div>
      </div>
      <div className="col-12">
        <AppTextEditor />
      </div>
    </div>
  );
};

export default ProductInfo;
