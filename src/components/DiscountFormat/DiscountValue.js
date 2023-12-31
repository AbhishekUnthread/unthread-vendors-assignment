import React, { useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  OutlinedInput,
  Tooltip,
  Popover,
  FormHelperText,
} from "@mui/material";
import info from "../../assets/icons/info.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";
import { Column } from "ag-grid-community";

function DiscountValue({ value, field, formik, touched, error }) {
  // * DISCOUNT PERCENT POPOVERS STARTS
  const [anchorDiscountPercentEl, setAnchorDiscountPercentEl] =
    React.useState(null);
  const handleDiscountPercent = (event) => {
    setAnchorDiscountPercentEl(event.currentTarget);
  };
  const handleDiscountPercentClose = () => {
    setAnchorDiscountPercentEl(null);
  };
  const openDiscountPercent = Boolean(anchorDiscountPercentEl);
  const idDiscountPercent = openDiscountPercent ? "simple-popover" : undefined;
  // * DICOUNT PERCENT POPOVERS ENDS

  const handleChange = (newValue) => {
    formik.setFieldValue(`${field}.type`, newValue);
    setAnchorDiscountPercentEl(null);
  };
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Discount Value
          </h6>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
      </div>
      <hr className="hr-grey-6 mt-3 mb-0" />
      <div className="col-12 px-0">
        <div className="row mt-3">
          <div className="col-12">
            <div className="d-flex mb-1">
              <p className="text-lightBlue">Discount</p>
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="ms-2 c-pointer"
                  width={13.5}
                />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="row align-items-center ">
          <div className="col-md-5 discount-inputs-two d-flex align-items-center">
            <div className="col">
              <FormControl className="px-0">
                <OutlinedInput
                  value={value?.discountValue}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  name={`${field}.discountValue`}
                  placeholder="Enter Discount"
                  size="small"
                  startAdornment={
                    value?.type === "fixed" && (
                      <InputAdornment position="start" variant="standard">
                        <span className="text-lightBlue">₹</span>
                      </InputAdornment>
                    )
                  }
                  endAdornment={
                    <React.Fragment>
                      <InputAdornment position="end" variant="standard">
                        <span className="text-lightBlue">
                          {value?.type === "percentage" && "%"}
                        </span>
                      </InputAdornment>
                      <InputAdornment
                        position="end"
                        aria-describedby={idDiscountPercent}
                        onClick={handleDiscountPercent}
                        className="c-pointer"
                      >
                        <span className="d-flex align-items-center">
                          <p className="text-lightBlue">
                            {" "}
                            {value?.type === "percentage"
                              ? `Percentage`
                              : `Fixed Amount`}{" "}
                          </p>
                          <img src={arrowDown} alt="arrow" className="ms-2" />
                        </span>
                      </InputAdornment>
                    </React.Fragment>
                  }
                />
              </FormControl>
              <small>
                {!!touched?.discountValue && error?.discountValue && (
                  <FormHelperText error>{error?.discountValue}</FormHelperText>
                )}
              </small>
            </div>

            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              id={idDiscountPercent}
              open={openDiscountPercent}
              anchorEl={anchorDiscountPercentEl}
              onClose={handleDiscountPercentClose}
            >
              <div className="py-2 px-1 c-pointer">
                <small
                  className="text-lightBlue rounded-3 p-2 hover-back d-block"
                  onClick={() => handleChange("percentage")}
                >
                  Percentage Discount
                </small>
                <small
                  className="text-lightBlue rounded-3 p-2 hover-back d-block"
                  onClick={() => handleChange("fixed")}
                >
                  Fixed Amount
                </small>
              </div>
            </Popover>

            <div className="w-auto text-center ms-3">
              <p className="text-lightBlue">on</p>
            </div>
          </div>
          <div className="col-md-7">
            <FormControl
              sx={{ m: 0, minWidth: 120, width: "100%" }}
              size="small"
            >
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                name={`${field}.value`}
                value={value?.value}
                onChange={formik?.handleChange}
                size="small"
                placeholder="Enter Value"
              >
                <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                  None
                </MenuItem>
                <MenuItem
                  value="goldPrice"
                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                >
                  Gold Price
                </MenuItem>
                <MenuItem
                  value="diamondPrice"
                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                >
                  Diamond Price
                </MenuItem>
                <MenuItem
                  value="makingCharge"
                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                >
                  Making Charges
                </MenuItem>
                <MenuItem
                  value="totalPrice"
                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                >
                  Total Price
                </MenuItem>
              </Select>
            </FormControl>
            {!!touched?.value && error?.value && (
              <FormHelperText error>{error?.value}</FormHelperText>
            )}
          </div>

          {formik?.values?.discountType === "cartDiscount" && (
            <div className="col-md-12 mt-3">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Cart Label</p>
                {/* <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip> */}
              </div>
              <FormControl className="px-0 w-100">
                <OutlinedInput
                  value={value?.cartLabel}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  name={`${field}.cartLabel`}
                  placeholder="Enter Label"
                  size="small"
                />
              </FormControl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscountValue;
