import React from "react";
// ! IMAGES IMPORTS
import arrowDown from "../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  FormControlLabel,
  Chip,
  RadioGroup,
  Radio,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import TableSearch from "../../components/TableSearch/TableSearch";

const CustomerEligibility = () => {
  // ? RADIO STARTS HERE
  const [customerEligibility, setCustomerEligibility] = React.useState(0);
  const handleCustomerEligibilityChange = (event, newValue) => {
    setCustomerEligibility(newValue);
  };
  // ? RADIO ENDS HERE

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            Customer Eligibility
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
            value={customerEligibility}
            onChange={handleCustomerEligibilityChange}
          >
            <FormControlLabel
              value="allCustomers"
              control={<Radio size="small" />}
              label="All Customers"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  // color: "#5C6D8E",
                },
              }}
            />
            <FormControlLabel
              value="specificCustomerGroups"
              control={<Radio size="small" />}
              label="Speceific Customer Groups"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  // color: "#5C6D8E",
                },
              }}
            />
            <FormControlLabel
              value="specificCustomer"
              control={<Radio size="small" />}
              label="Speceific Customer"
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
        <div className="d-flex mt-3">
          <TableSearch />
          <button className="button-grey py-2 px-3 ms-2">
            <small className="text-lightBlue me-2">Browse</small>
            <img src={arrowDown} alt="arrow" className="" />
          </button>
        </div>
        <div className="d-flex">
          <Chip
            label="VVIP Users"
            onDelete={handleDelete}
            size="small"
            className="mt-3 me-2"
          />
          <Chip
            label="Royal Users"
            onDelete={handleDelete}
            className="me-2 mt-3"
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerEligibility;
