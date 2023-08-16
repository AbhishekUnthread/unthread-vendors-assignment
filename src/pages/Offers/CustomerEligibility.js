import React, { useState } from "react";
// ! IMAGES IMPORTS
import arrowDown from "../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import {
  FormControl,
  FormControlLabel,
  Chip,
  RadioGroup,
  Radio,
  Autocomplete,
  Checkbox,
  TextField,
  FormHelperText,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import TableSearch from "../../components/TableSearch/TableSearch";
import info from "../../assets/icons/info.svg";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useGetAllCustomersQuery } from "../../features/customers/customer/customerApiSlice";
import { useGetAllCustomerGroupQuery } from "../../features/customers/customerGroup/customerGroupApiSlice";

const CustomerEligibility = ({ value, field, formik, touched, error }) => {
  const { data: customersData, isSuccess: customersIsSuccess } =
    useGetAllCustomersQuery(undefined, {
      skip: value?.customer !== "specificCustomers",
    });

  const { data: customersGroupData, isSuccess: customersGroupIsSuccess } =
    useGetAllCustomerGroupQuery(undefined, {
      skip: value?.customer !== "customerGroups",
    });

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
            value={value?.customer}
            onChange={(_, newValue) => {
              formik.setFieldValue(`${field}.customer`, newValue);
              formik.setFieldValue(`${field}.specificCustomers`, []);
              formik.setFieldValue(`${field}.customerGroups`, []);
            }}
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
              value="customerGroups"
              control={<Radio size="small" />}
              label="Specific Customer Groups"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  // color: "#5C6D8E",
                },
              }}
            />
            {value?.customer === "customerGroups" &&
              customersGroupIsSuccess && (
                <React.Fragment>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    className="mt-3"
                    sx={{ width: "100%" }}
                    options={
                      customersData?.data?.data ||
                      customersGroupData?.data?.data
                    }
                    value={value?.customerGroups || []}
                    getOptionLabel={(option) =>
                      option?.firstName || option?.name
                    }
                    size="small"
                    onChange={(_, newValue) => {
                      formik.setFieldValue(`${field}.customerGroups`, newValue);
                    }}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          checked={selected}
                          size="small"
                          style={{
                            color: "#5C6D8E",
                            marginRight: 0,
                          }}
                        />
                        <small className="text-lightBlue">
                          {option.firstName || option?.name}
                        </small>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        placeholder="Search ..."
                      />
                    )}
                  />
                  {!!touched?.customerGroups && error?.customerGroups && (
                    <FormHelperText error>{error?.customerGroups}</FormHelperText>
                  )}
                </React.Fragment>
              )}
            <FormControlLabel
              value="specificCustomers"
              control={<Radio size="small" />}
              label="Specific Customer"
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
        {value?.customer === "specificCustomers" && customersIsSuccess && (
          <React.Fragment>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              className="mt-3"
              sx={{ width: "100%" }}
              options={
                customersData?.data?.data || customersGroupData?.data?.data
              }
              value={value?.specificCustomers || []}
              getOptionLabel={(option) => option?.firstName || option?.name}
              size="small"
              onChange={(_, newValue) => {
                formik.setFieldValue(`${field}.specificCustomers`, newValue);
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={selected}
                    size="small"
                    style={{
                      color: "#5C6D8E",
                      marginRight: 0,
                    }}
                  />
                  <small className="text-lightBlue">
                    {option.firstName || option?.name}
                  </small>
                </li>
              )}
              renderInput={(params) => (
                <TextField size="small" {...params} placeholder="Search ..." />
              )}
            />
            {!!touched?.specificCustomers && error?.specificCustomers && (
              <FormHelperText error>{error?.specificCustomers}</FormHelperText>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default CustomerEligibility;
