import React, { useState } from 'react'
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
import info from "../../assets/icons/info.svg";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useGetAllProductTabsQuery } from '../../features/parameters/productTabs/productTabsApiSlice';
import { useGetAllVendorsQuery } from '../../features/parameters/vendors/vendorsApiSlice';

function Filters({ value, field, formik, touched, error }) {
  const {
    data: productsTabData,
    isLoading: productsTabIsLoading,
    error: productsTabError,
    isError: productsTabIsError,
    isSuccess: productsTabIsSuccess,
    isFetching: productsTabDataIsFetching,
  } = useGetAllProductTabsQuery(
    {createdAt : -1},
    // undefined, 
    // {
    // skip: value?.field !==10 ,
    // }
  );

  const {
    data: vendorsData,
    isLoading: vendorsIsLoading,
    isSuccess: vendorsIsSuccess,
    error: vendorsError,
  } = useGetAllVendorsQuery(
    { createdAt : -1 },
  );
  
    // ? FIELD SELECT STARTS HERE
  // const [field, setField] = React.useState("");

  const handleFieldChange = (event) => {
    formik.setFieldValue(`${field}.field`, event.target.value);
  };
  // ? FIELD SELECT ENDS HERE

  // ? OPERATOR SELECT STARTS HERE
  const [operator, setOperator] = React.useState("");

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };
  // ? OPERATOR SELECT ENDS HERE
  console.log("discountFilter", value?.field)
  console.log("dataaaaa", vendorsData?.data?.data)

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
    <div className="d-flex col-12 px-0 justify-content-between">
      <div className="d-flex align-items-center">
        <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
          Filters
        </h6>
        <Tooltip title="Lorem ipsum" placement="top">
          <img
            src={info}
            alt="info"
            className="ms-2 c-pointer"
            width={13.5}
          />
        </Tooltip>
      </div>
    </div>
    <hr className="hr-grey-6 mt-3 mb-0" />
    <div className="col-12 px-0">
      <div className="row">
        <div className="col-md-3 mt-3">
          <div className="d-flex mb-1">
            <p className="text-lightBlue">Field</p>
            <Tooltip title="Lorem ipsum" placement="top">
              <img
                src={info}
                alt="info"
                className="ms-2 c-pointer"
                width={13.5}
              />
            </Tooltip>
          </div>
          <FormControl
            sx={{ m: 0, minWidth: 120, width: "100%" }}
            size="small"
          >
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={value?.field}
              onChange={handleFieldChange}
              size="small"
            >
              <MenuItem
                value=""
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                None
              </MenuItem>
              <MenuItem
                value={10}
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                All Products
              </MenuItem>
              <MenuItem
                value={20}
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Category
              </MenuItem>
              <MenuItem
                value={30}
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Sub Category
              </MenuItem>
              <MenuItem
                value={40}
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Collection
              </MenuItem>
              <MenuItem
                value={50}
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Vendor Name
              </MenuItem>
              <MenuItem
                value={60}
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Attributes
              </MenuItem>
              <MenuItem
                value={70}
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Tags
              </MenuItem>
              <MenuItem
                value={80}
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                SKU's
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3 mt-3">
          <div className="d-flex mb-1">
            <p className="text-lightBlue">Operator</p>
            <Tooltip title="Lorem ipsum" placement="top">
              <img
                src={info}
                alt="info"
                className="ms-2 c-pointer"
                width={13.5}
              />
            </Tooltip>
          </div>
          <FormControl
            sx={{ m: 0, minWidth: 120, width: "100%" }}
            size="small"
          >
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={operator}
              onChange={handleOperatorChange}
              size="small"
            >
              <MenuItem
                value=""
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                None
              </MenuItem>
              <MenuItem
                value={10}
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Equal to
              </MenuItem>
              <MenuItem
                value={20}
                sx={{ fontSize: 13, color: "#5c6d8e" }}
              >
                Not Equal to
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-6 mt-3">
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
{vendorsData && (<Autocomplete
            multiple
            id="checkboxes-tags-demo"
            sx={{ width: "100%" }}
            options={vendorsData?.data?.data.map(item=>({title : item.name}))}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            size="small"
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
                  {option.title}
                </small>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                placeholder="Search"
              />
            )}
          />)}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <small className="text-blue-2 c-pointer fw-500">
            + Add More Filter
          </small>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Filters