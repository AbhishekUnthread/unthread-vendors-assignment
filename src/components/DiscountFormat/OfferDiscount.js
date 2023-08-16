import {
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Popover,
  Tooltip,
} from "@mui/material";
import React from "react";
import info from "../../assets/icons/info.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";

function OfferDiscount({ formik, value, error, field, touched }) {
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
    <React.Fragment>
      <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
        <div className="d-flex col-12 px-0 justify-content-between">
          <div className="d-flex align-items-center">
            <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
              Offer Discount
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
        <hr className="hr-grey-6 my-3 " />
        <div className="col-12 px-0">
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

          <div className="discount-inputs-two">
            <FormControl className="px-0">
              <OutlinedInput
                placeholder="Enter Discount"
                size="small"
                name={`${field}.discountValue`}
                value={value?.discountValue}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
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
          </div>
        </div>
        <hr className="hr-grey-6 my-3 " />
        <div className="col-12 d-flex justify-content-between align-items-center px-0">
          <p className="text-lightBlue">Total Bundle Price</p>
          <div className="d-flex flex-column align-items-end">
            <div className="d-flex">
              <h5 className="text-lightBlue fw-500">₹ 75,000</h5>
              <h5 className="text-blue-1 fw-500 ms-3">
                <s>₹ 1,25,000</s>
              </h5>
            </div>
            <small className="text-grey-6 mt-2">
              Save 50% off on buying bundle
            </small>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default OfferDiscount;
