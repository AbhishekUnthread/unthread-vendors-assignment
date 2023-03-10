import React from "react";
// ! MATERIAL IMPORTS
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

const ReturnAndExchangeCondition = ({ sectionHeading }) => {
  // ? RADIO STARTS HERE
  const [returnAndExchangeCondition, setReturnAndExchangeCondition] =
    React.useState(0);
  const handleReturnAndExchangeConditionChange = (event, newValue) => {
    setReturnAndExchangeCondition(newValue);
  };
  // ? RADIO ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            {sectionHeading}
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
            value={returnAndExchangeCondition}
            onChange={handleReturnAndExchangeConditionChange}
          >
            <FormControlLabel
              value="allowed"
              control={<Radio size="small" />}
              label="Allowed"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  // color: "#5C6D8E",
                },
              }}
            />
            <FormControlLabel
              value="notAllowed"
              control={<Radio size="small" />}
              label="Not Allowed"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  // color: "#5C6D8E",
                },
              }}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default ReturnAndExchangeCondition;
