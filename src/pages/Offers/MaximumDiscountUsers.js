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
} from "@mui/material";

const MaximumDiscountUsers = () => {
  // ? CHECKBOX STARTS HERE
  const [checkedNumberofTimes, setCheckedNumberofTimes] = React.useState(false);

  const handleNumberofTimesChange = (event) => {
    setCheckedNumberofTimes(event.target.checked);
  };

  const [checkedNumberOfTimesUsage, setCheckedNumberOfTimesUsage] =
    React.useState(false);

  const handleNumberofTimesUsageChange = (event) => {
    setCheckedNumberOfTimesUsage(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

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
              checked={checkedNumberofTimes}
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
              fontSize: "0.75rem",
              // color: "#c8d8ff",
              color: "#5c6d8e",
            },
          }}
          className="px-0"
        />

        {checkedNumberofTimes && (
          <div className="discount-inputs ps-4 ms-1">
            <div className="d-flex mb-1">
              <p className="text-lightBlue">Enter Number</p>
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
                endAdornment={
                  <InputAdornment position="end">per customer</InputAdornment>
                }
              />
            </FormControl>
          </div>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedNumberOfTimesUsage}
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
              fontSize: "0.75rem",
              // color: "#c8d8ff",
              color: "#5c6d8e",
            },
          }}
          className="px-0"
        />
        {checkedNumberOfTimesUsage && (
          <div className="discount-inputs ps-4 ms-1">
            <div className="d-flex mb-1">
              <p className="text-lightBlue">Enter Number</p>
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
                endAdornment={
                  <InputAdornment position="end">per customer</InputAdornment>
                }
              />
            </FormControl>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaximumDiscountUsers;
