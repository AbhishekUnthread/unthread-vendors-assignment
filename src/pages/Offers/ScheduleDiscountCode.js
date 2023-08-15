import React from "react";
// ! IMAGES IMPORTS
import info from "../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import { Checkbox, FormControlLabel, FormHelperText, TextField, Tooltip } from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";

const ScheduleDiscountCode = ({formik,field,value,touched, error}) => {
  console.log("jheuyfdewde", value?.startDateTime)
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Active Dates
          </h6>
        </div>
      </div>
      <hr className="hr-grey-6 mt-3 mb-0" />
      <div className="col-12 px-0">
        <div className="row align-items-start">
          <div className="col-md-6 mt-3">
            <div className="d-flex mb-1">
              <p className="text-lightBlue">Start Date and Time</p>
              <Tooltip title="Lorem ipsum" placement="top">
                <img
                  src={info}
                  alt="info"
                  className="ms-2 c-pointer"
                  width={13.5}
                />
              </Tooltip>
            </div>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDateTimePicker
                value={value?.startDateTime}
                onChange={(newValue) => {
                  formik.setFieldValue(`${field}.startDateTime`, newValue);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
                className="w-100"
                minDateTime={moment()}
              />
            </LocalizationProvider>
            {!!touched?.startDateTime && error?.startDateTime && (
              <FormHelperText error>{error?.startDateTime}</FormHelperText>
            )}
          </div>
          <div className="col-md-6 mt-3">
            <div className="d-flex mb-1 justify-content-between">
              <div className="d-flex">
                <p className="text-lightBlue">End Date and Time</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <small className="text-grey-6">(optional)</small>
            </div>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDateTimePicker
                value={value?.endDateTime}
                onChange={(newValue) => {
                  formik.setFieldValue(`${field}.endDateTime`, newValue);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
                className="w-100"
                minDateTime={value?.startDateTime ? moment(value.startDateTime) : null}
                disabled={value?.startDateTime === "" ? true : false}
              />
            </LocalizationProvider>
            {!!touched?.endDateTime && error?.endDateTime && (
              <FormHelperText error>{error?.endDateTime}</FormHelperText>
            )}
            <FormControlLabel
          control={
            <Checkbox
              checked={value?.neverExpire}
              onChange={formik?.handleChange}
              name = {`${field}.neverExpire`}
              inputProps={{ "aria-label": "controlled" }}
              size="small"
              style={{
                color: "#5C6D8E",
                marginRight: 0,
                width: "auto",
              }}
            />
          }
          label="Never Expire"
          sx={{
            "& .MuiTypography-root": {
              fontSize: 13,
              color: "#c8d8ff",
            },
          }}
          className="px-0"
        />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDiscountCode;
