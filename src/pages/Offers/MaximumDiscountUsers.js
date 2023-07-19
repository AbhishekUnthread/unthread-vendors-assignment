import React from "react";
// ! IMAGES IMPORTS
import info from "../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Tooltip,
  FormHelperText,
} from "@mui/material";

const MaximumDiscountUsers = ({value,field,formik,touched,error}) => {
  // ? CHECKBOX STARTS HERE
  const handleNumberofTimesChange = (event) => {
    formik.setFieldValue(`${field}.limitDiscountNumber`, event.target.checked);
  };

  const handleNumberofTimesUsageChange = (event) => {
    formik.setFieldValue(`${field}.limitUsagePerCustomer`, event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  const handleTotal = (event) => {
    const numericValue = event.target.value.replace(/[^\d]/g, ''); 
    formik.handleChange({
      target: {
        name: `${field}.total`,
        value: numericValue,
      },
    });
  };
  const handlePerCustomer = (event) => {
    const numericValue = event.target.value.replace(/[^\d]/g, ''); 
    formik.handleChange({
      target: {
        name: `${field}.perCustomer`,
        value: numericValue,
      },
    });
  };

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Maximum Discount uses
          </h6>
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
      <hr className="hr-grey-6 mt-3 mb-0" />
      <div className="col-12 d-flex flex-column px-0 mt-2">
        <FormControlLabel
          control={
            <Checkbox
              checked={value?.limitDiscountNumber}
              onChange={handleNumberofTimesChange}
              inputProps={{ "aria-label": "controlled" }}
              size="small"
              style={{
                color: "#5C6D8E",
                marginRight: 0,
                width: "auto",
              }}
            />
          }
          label="Limit number of times this discount can be used in total"
          sx={{
            "& .MuiTypography-root": {
              fontSize: 13,
              color: "#c8d8ff",
              // color: "#5c6d8e",
            },
          }}
          className="px-0"
        />

        {value?.limitDiscountNumber && (
          <div className="discount-inputs ps-4 ms-1 mb-3">
            <div className="d-flex mb-1">
              <small className="text-lightBlue">Enter Number</small>
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="ms-2 c-pointer"
                  width={13.5}
                />
              </Tooltip>
            </div>
            <FormControl className="px-0">
              <OutlinedInput
                placeholder="Enter Value"
                size="small"
                value={value?.total}
                onChange={handleTotal}
                onBlur={formik?.handleBlur}
                name={`${field}.total`}    
                endAdornment={
                  <InputAdornment position="end">times</InputAdornment>
                }
              />
            </FormControl>
            {!!touched?.total && error?.total && (
              <FormHelperText error>{error?.total}</FormHelperText>
            )}
          </div>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={value?.limitUsagePerCustomer}
              onChange={handleNumberofTimesUsageChange}
              inputProps={{ "aria-label": "controlled" }}
              size="small"
              style={{
                color: "#5C6D8E",
                marginRight: 0,
                width: "auto",
              }}
            />
          }
          label="Limit the number of usage per customer"
          sx={{
            "& .MuiTypography-root": {
              fontSize: 13,
              color: "#c8d8ff",
              // color: "#5c6d8e",
            },
          }}
          className="px-0"
        />
        {value?.limitUsagePerCustomer && (
          <div className="discount-inputs ps-4 ms-1">
            <div className="d-flex mb-1">
              <small className="text-lightBlue">Enter Number</small>
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="ms-2 c-pointer"
                  width={13.5}
                />
              </Tooltip>
            </div>
            <FormControl className="px-0">
              <OutlinedInput
                placeholder="Enter Value"
                size="small"
                value={value?.perCustomer}
                onChange={handlePerCustomer}
                onBlur={formik?.handleBlur}
                name={`${field}.perCustomer`}    
                endAdornment={
                  <InputAdornment position="end">per customer</InputAdornment>
                }
              />
            </FormControl>
            {!!touched?.perCustomer && error?.perCustomer && (
              <FormHelperText error>{error?.perCustomer}</FormHelperText>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaximumDiscountUsers;
