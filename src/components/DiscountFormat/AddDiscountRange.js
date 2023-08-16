import React from "react";
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

function AddDiscountRange({ value, field, formik, touched, error }) {
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
    <div className="row ">
      <div className="col-md-2 col-6 mt-1 ps-0 ml-0">
        {/* <div className="d-flex mb-1">
      <p className="text-lightBlue">Min Qty.</p>
      <Tooltip title="Lorem ipsum" placement="top">
        <img
          src={info}
          alt="info"
          className="ms-2 c-pointer"
          width={13.5}
        />
      </Tooltip>
    </div> */}
        <FormControl className="px-0">
          <OutlinedInput
            placeholder="Enter Min Qty"
            size="small"
            name={`${field}.minQty`}
            value={value?.minQty}
            onChange={formik?.handleChange}
          />
        </FormControl>
        {!!touched?.minQty && error?.minQty && (
              <FormHelperText error>{error?.minQty}</FormHelperText>
            )}
      </div>
      <div className="col-md-2 col-6 mt-1 ps-0">
        {/* <div className="d-flex mb-1">
      <p className="text-lightBlue">Max Qty.</p>
      <Tooltip title="Lorem ipsum" placement="top">
        <img
          src={info}
          alt="info"
          className="ms-2 c-pointer"
          width={13.5}
        />
      </Tooltip>
    </div> */}
        <FormControl className="px-0">
          <OutlinedInput
            placeholder="Enter Max Qty"
            size="small"
            name={`${field}.maxQty`}
            value={value?.maxQty}
            onChange={formik?.handleChange}
          />
        </FormControl>
        {!!touched?.maxQty && error?.maxQty && (
              <FormHelperText error>{error?.maxQty}</FormHelperText>
            )}
      </div>
      <div className="col-md-8 pe-0 ps-0 ps-md-3">
        {/* <div className="row mt-1">
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
    </div> */}
        <div className="row align-items-center mt-1">
          <div className="col-md-7 discount-inputs-two d-flex align-items-center">
          <div className="col">
            <FormControl className="px-0">
              <OutlinedInput
                value={value?.discountValue}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                name={`${field}.discountValue`}
                placeholder="Enter Discount"
                size="small"
                endAdornment={
                  <InputAdornment
                    position="end"
                    aria-describedby={idDiscountPercent}
                    onClick={handleDiscountPercent}
                    className="c-pointer"
                  >
                    <span className="d-flex align-items-center">
                      <p className="text-lightBlue">
                        {value?.type === "percentage"
                          ? `Percentage`
                          : `Fixed Amount`}
                      </p>
                      <img src={arrowDown} alt="arrow" className="ms-2" />
                    </span>
                  </InputAdornment>
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
              <div className="py-2 px-1">
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
          <div className="col-md-5">
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
                displayEmpty
                renderValue={
                  formik.values?.discountType !== ""
                    ? undefined
                    : () => (
                        <span style={{ fontSize: "13px", color: "#5c6d8e" }}>
                          Select
                        </span>
                      )
                }
              >
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
        </div>
      </div>
    </div>
  );
}

export default AddDiscountRange;
