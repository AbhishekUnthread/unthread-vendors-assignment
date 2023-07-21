import { Button, FormControl, FormHelperText, InputAdornment, MenuItem, OutlinedInput, Select, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import info from "../../assets/icons/info.svg";


function DiscountFormat({value,field,formik,touched,error}) {
    const [touch, setTouch] = useState(false);
    const [generatedCode, setGeneratedCode] = useState(""); 

    const generateRandomCode = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const codeLength = 6;
      let result = "";
    
      for (let i = 0; i < codeLength; i++) {
        // Ensure the first character is a letter
        const charSet = i === 0 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : characters;
        result += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
    
      return result;
    };
    
  
    const handleGenerateCode = () => {
      const randomCode = generateRandomCode();
      formik.setFieldValue(`${field}.discountCode`, randomCode);
    };

  const handleDiscountType = (event) => {
    formik.setFieldValue(`${field}.discountType`, event.target.value);
  };

  const handleDiscountFormatChange = (event) => {
    formik.setFieldValue(`${field}.discountFormat`, event.target.value);
    formik.setFieldValue(`${field}.discountCode`, "");
  };

  // useEffect(() => {
  //   if (formik.isSubmitting) {
  //       setTouch(true)
  //   }
  // }, [formik.isSubmitting]);

  // console.log({touch:touch})

  // useEffect(() => {
  //   formik.setFieldValue(`${field}.discountCode`, "");
  // }, [value?.discountFormat]);
  
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
    <div className="d-flex col-12 px-0 justify-content-between">
      <div className="d-flex align-items-center">
        <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
          Discount Format
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
      <div className="row">
        <div className="col-md-12 mt-3">
          <div className="d-flex mb-1">
            <p className="text-lightBlue">Discount Type</p>
            <Tooltip title="Lorem ipsum" placement="top">
              <img
                src={info}
                alt="info"
                className="ms-2 c-pointer"
                width={13.5}
              />
            </Tooltip>
          </div>
          <FormControl
            sx={{ m: 0, minWidth: 120, width: "100%" }}
            size="small"
          >
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={value?.discountType}
              onChange={handleDiscountType}
              onBlur={formik?.handleBlur}
              name={`${field}.discountType`}
              size="small"
            >
              <MenuItem
                value="productDiscount"
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Product Discount
              </MenuItem>
              <MenuItem
                value="cartDiscount"
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Cart Discount
              </MenuItem>
              <MenuItem
                value="freeShiping"
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Free Shipping
              </MenuItem>
              <MenuItem
                value="buyXGetY"
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Buy X, Get Y
              </MenuItem>
              <MenuItem
                value="bulkDiscountPricing"
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Bulk/Tiried Discount Pricing
              </MenuItem>
            </Select>
          </FormControl>
          {!!touched?.discountType && error?.discountType && (
              <FormHelperText error>{error?.discountType}</FormHelperText>
            )}
        </div>
        <div className="col-md-5 mt-3">
          <div className="d-flex mb-1">
            <p className="text-lightBlue">Select Discount Format</p>
            <Tooltip title="Lorem ipsum" placement="top">
              <img
                src={info}
                alt="info"
                className="ms-2 c-pointer"
                width={13.5}
              />
            </Tooltip>
          </div>
          <FormControl
            sx={{ m: 0, minWidth: 120, width: "100%" }}
            size="small"
          >
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={value?.discountFormat}
              onBlur={formik?.handleBlur}
              onChange={handleDiscountFormatChange}
              name={`${field}.discountFormat`}
              size="small"
            >
              <MenuItem
                value="automaticDiscount"
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Automatic Discount
              </MenuItem>
              <MenuItem
                value="discountCouponCode"
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Discount Coupon Code
              </MenuItem>
            </Select>
          </FormControl>
          {!!touched?.discountFormat && error?.discountFormat && (
              <FormHelperText error>{error?.discountFormat}</FormHelperText>
            )}
        </div>
        <div className="col-md-7 mt-3 discount-gradient-inputs">
          <div className="d-flex mb-1">
            <p className="text-lightBlue">{`${value?.discountFormat==="automaticDiscount"?`Discount Name`:`Type Discount Code`}`}</p>
            <Tooltip title="Lorem ipsum" placement="top">
              <img
                src={info}
                alt="info"
                className="ms-2 c-pointer"
                width={13.5}
              />
            </Tooltip>
          </div>

          <FormControl className="w-100 px-0">
          <OutlinedInput
            placeholder="Enter Discount Code"
            size="small"
            value={value?.discountCode}
            // onChange={(e) => {
            //   const capitalizedValue = e.target.value.toUpperCase();
            //   formik.setFieldValue(`${field}.discountCode`, capitalizedValue);
            // }}
            onChange={formik.handleChange}
            onBlur={formik?.handleBlur}
            name={`${field}.discountCode`}
            endAdornment={
                value?.discountFormat === "automaticDiscount"
                ? null
                : (
                    <InputAdornment position="end" onClick={handleGenerateCode}>
                        Generate Code
                    </InputAdornment>
                )
            }
            />
          </FormControl>
          <small className="mt-1 text-grey-6 font1">
            {!!touched?.discountCode && error?.discountCode ? (
                <FormHelperText error>{error?.discountCode}</FormHelperText>
            ) : (
                <>
                {value?.discountFormat === "automaticDiscount"
                    ? "Customer will have to enter in coupons to avail discount"
                    : "User will have to enter in coupons to avail Discount"}
                </>
            )}
            </small>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DiscountFormat