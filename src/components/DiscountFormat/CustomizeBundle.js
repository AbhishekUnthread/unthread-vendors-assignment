import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import info from "../../assets/icons/info.svg";

function CustomizeBundle({ formik, touched, error, value, field }) {
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Customise Frontend Bundle Section
          </h6>
        </div>
      </div>
      <hr className="hr-grey-6 mt-3 mb-0" />
      {/* <div className="col-12 px-0">
      <div className="row align-items-start"> */}
      <div className="col-md-12 mt-3 px-0">
        <div className="d-flex mb-1">
          <p className="text-lightBlue">Enter Bundle Title</p>
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
            placeholder="Enter Bundle Title"
            size="small"
            name={`${field}.bundleTitle`}
            value={value?.bundleTitle}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </FormControl>
        <small className="mt-1 text-grey-6 font1">
          {!!touched && error?.bundleTitle ? (
            <FormHelperText error>{error?.bundleTitle}</FormHelperText>
          ) : null}
        </small>

        <small className="mt-1 text-grey-6 font1">
          Customer can see this as section title
        </small>
      </div>
      <div className="col-md-12 mt-3 px-0">
        <div className="d-flex mb-1">
          <p className="text-lightBlue">Enter Subtitle</p>
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
            placeholder="Enter Bundle Subt text"
            size="small"
            name={`${field}.subtitle`}
            value={value?.subtitle}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </FormControl>
        {!!touched && error?.subtitle ? (
          <Typography variant="caption" color="#F67476">
          {error?.subtitle}
          </Typography>
        ) : (
          <small className="mt-1 text-grey-6 font1">
            Customer can see this as section subtitle
          </small>
        )}
      </div>
    </div>
  );
}

export default CustomizeBundle;
