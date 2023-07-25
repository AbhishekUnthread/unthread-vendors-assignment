import React from "react";
// ! MATERIAL IMPORTS
import { Checkbox, FormControlLabel } from "@mui/material";

const DiscountCombination = ({ value, field, formik }) => {

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const currentValues = value?.allowCombineWith || [];

    const updatedValues = checked
      ? [...currentValues, name]
      : currentValues.filter((value) => value !== name);

    formik.setFieldValue(`${field}.allowCombineWith`, updatedValues);
  };

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <FormControlLabel
            control={
              <Checkbox
                name={`${field}.allowCombineWithOthers`}   
                checked={value?.allowCombineWithOthers}
                onChange={(event) => formik.handleChange(event)}
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                  width: "auto",
                }}
              />
            }
            label="Allow discount to be combined with other discounts"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "1rem",
                color: "#c8d8ff",
                fontWeight:500
              },
            }}
            className="px-0 "
          />
          {/* <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Allow discount to be combined with other discounts
          </h6> */}
          {/* <Tooltip title="Lorem ipsum" placement="top">
  <img
    src={info}
    alt="info"
    className="ms-2 c-pointer"
    width={13.5}
  />
</Tooltip> */}
        </div>
      </div>
     
      {value?.allowCombineWithOthers &&(
        <>
        <hr className="hr-grey-6 mt-3 mb-0" />
        {/* <p className="fw-500 px-0 py-1 fs-6" style={{
        color: "#96ABDE",
        fontFamily: "SF Pro Text", 
      }}>This discount can be combined with</p> */}

          <FormControlLabel
            control={
              <Checkbox
                name='product-discount'
                checked={value?.allowCombineWith?.includes('product-discount')}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                  width: "auto",
                }}
              />
            }
            label="Product Discount"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "0.75rem",
                color: "#c8d8ff",
                // color: "#5c6d8e",
              },
            }}
            className="px-0"
          />
          <FormControlLabel
            control={
              <Checkbox
                name='cart-discount'
                checked={value?.allowCombineWith?.includes('cart-discount')}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                  width: "auto",
                }}
              />
            }
            label="Cart Discount"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "0.75rem",
                color: "#c8d8ff",
                // color: "#5c6d8e",
              },
            }}
            className="px-0"
          />
          <FormControlLabel
            control={
              <Checkbox
                name ='free-shipping'
                checked={value?.allowCombineWith?.includes('free-shipping')}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                  width: "auto",
                }}
              />
            }
            label="Free Shipping"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "0.75rem",
                color: "#c8d8ff",
                // color: "#5c6d8e",
              },
            }}
            className="px-0"
          />
          <FormControlLabel
            control={
              <Checkbox
                name ='buyXgetY'
                checked={value?.allowCombineWith?.includes('buyXgetY')}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                  width: "auto",
                }}
              />
            }
            label="Buy X, Get Y"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "0.75rem",
                color: "#c8d8ff",
                // color: "#5c6d8e",
              },
            }}
            className="px-0"
          />
          <FormControlLabel
            control={
              <Checkbox
                name = 'bulk'
                checked={value?.allowCombineWith?.includes('bulk')}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                  width: "auto",
                }}
              />
            }
            label="Bulk/Tiered Discount"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "0.75rem",
                color: "#c8d8ff",
                // color: "#5c6d8e",
              },
            }}
            className="px-0"
          />
        </>)
      }
    </div>
  );
};

export default DiscountCombination;
