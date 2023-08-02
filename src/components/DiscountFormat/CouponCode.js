import React from 'react'
import info from "../../assets/icons/info.svg";
import {
    FormControl,
    MenuItem,
    Select,
    InputAdornment,
    OutlinedInput,
    Checkbox,
    FormControlLabel,
    Chip,
    TextField,
    Autocomplete,
    Tooltip,
    RadioGroup,
    Radio,
    Popover,
    TextareaAutosize,
    Typography,
  } from "@mui/material";

function CouponCode({ value, field, formik }) {


    
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
    <FormControlLabel
      control={
        <Checkbox
          name={`${field}.showCouponCode`}   
          checked={value?.showCouponCode}
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
      label="Show Coupon Code on Cart Page"
      sx={{
        "& .MuiTypography-root": {
          fontSize: "0.875rem",
          color: "#c8d8ff",
          // color: "#5c6d8e",
        },
      }}
      className="px-0"
    />

    {value?.showCouponCode && (
      <React.Fragment>
        <hr className="hr-grey-6 my-3" />
        <div className="d-flex flex-column px-0">
          <div className="d-flex mb-1">
            <p className="text-lightBlue">Title</p>
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
            name={`${field}.title`}
            value={value?.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter Coupon Name"
            size="small"
            />
          </FormControl>
          <div className="d-flex mb-1 mt-3">
            <p className="text-lightBlue">Body Text</p>
            <Tooltip title="Lorem ipsum" placement="top">
              <img
                src={info}
                alt="info"
                className="ms-2 c-pointer"
                width={13.5}
              />
            </Tooltip>
          </div>
          <TextareaAutosize
            aria-label="meta description"
            placeholder="Type Something"
            name={`${field}.bodyText`}
            value={value?.bodyText}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            style={{
              background: "#15142A",
              color: "#c8d8ff",
              borderRadius: 5,
              padding : "14px 8.5px"
            }}
            minRows={3}
          />
        </div>
      </React.Fragment>
    )}
  </div>
  )
}

export default CouponCode