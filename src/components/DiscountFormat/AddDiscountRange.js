import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  OutlinedInput,
  Tooltip,
  Popover,
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
      <OutlinedInput placeholder="Enter Min Qty" size="small" />
    </FormControl>
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
      <OutlinedInput placeholder="Enter Max Qty" size="small" />
    </FormControl>
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
            // value={field}
            // onChange={handleFieldChange}
            size="small"
          >
            <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
              None
            </MenuItem>
            <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Value 1
            </MenuItem>
            <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Value 2
            </MenuItem>
            <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Value 3
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddDiscountRange