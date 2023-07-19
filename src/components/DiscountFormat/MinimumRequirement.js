import { FormControl, FormControlLabel, FormHelperText, InputAdornment, OutlinedInput, Radio, RadioGroup, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import info from "../../assets/icons/info.svg";

function MinimumRequirement({value,field,formik,touched,error}) {

    const handleMinimumRequirementChange = (event, newValue) => {
        formik.setFieldValue(`${field}.requirement`, newValue);
        formik.setFieldValue(`${field}.value`, "");
        formik.setFieldTouched(`${field}.value`, false);
    };
    const handleValueChange = (event) => {
        const numericValue = event.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
        formik.handleChange({
          target: {
            name: `${field}.value`,
            value: numericValue,
          },
        });
      };

//       useEffect(() => {
//     formik.setFieldValue(`${field}.value`, "");
//     formik.setFieldTouched(`${field}.value`, false);

//   }, [value?.requirement]);

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
    <div className="d-flex col-12 px-0 justify-content-between">
      <div className="d-flex align-items-center">
        <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
          Minimum Requirement
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
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value?.requirement}
          onChange={handleMinimumRequirementChange}
        >
          <FormControlLabel
            value="none"
            control={<Radio size="small" />}
            label="None"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
                // color: "#5C6D8E",
              },
            }}
          />
          <FormControlLabel
            value="minAmount"
            control={<Radio size="small" />}
            label="Minimum Amount Purchased"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
                // color: "#5C6D8E",
              },
            }}
          />

          {value?.requirement === "minAmount" && (
            <div className="discount-inputs ps-4 ms-1 mb-3">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Value</p>
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
                value={value?.value}
                onChange={handleValueChange}
                onBlur={formik?.handleBlur}
                name={`${field}.value`}               
                startAdornment={
                  <InputAdornment variant="standard" position="start">
                    ₹
                  </InputAdornment>
                }

                 />
              </FormControl>
              {!!touched?.value && error?.value && (
              <FormHelperText error>{error?.value}</FormHelperText>
            )}
            </div>
          )}
          <FormControlLabel
            value="minQuantity"
            control={<Radio size="small" />}
            label="Minimum Quantity of Items"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
                // color: "#5C6D8E",
              },
            }}
          />

          {value?.requirement === "minQuantity" && (
            <div className="discount-inputs ps-4 ms-1">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Value</p>
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
                value={value?.value}
                onChange={handleValueChange}
                onBlur={formik?.handleBlur}
                name={`${field}.value`}
                endAdornment={
                  <InputAdornment position="end">
                    qty
                  </InputAdornment>
                }
                 />
              </FormControl>
              {!!touched?.value && error?.value && (
              <FormHelperText error>{error?.value}</FormHelperText>
            )}
            </div>
          )}
        </RadioGroup>
      </FormControl>
    </div>
  </div>
  )
}

export default MinimumRequirement