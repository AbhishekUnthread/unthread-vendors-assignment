import React from 'react'
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
import TableSearch from '../TableSearch/TableSearch';
import info from "../../assets/icons/info.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";
import { useGetAllCityQuery } from '../../features/master/city/cityApiSlice';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useGetAllStateQuery } from '../../features/master/state/stateApiSlice';
import { useGetAllCountryQuery } from '../../features/master/country/countryApiSlice';

function LimitByLocation({value,field,formik,touched,error}) {

    const {
        data : cityData,
        isSuccess: cityDataIsSuccess,
        isError : cityDataIsError
    } = useGetAllCityQuery(undefined,{skip : value?.locationType !=="zip"});

    const {
        data : stateData,
        isSuccess : stateDataIsSuccess,
    } = useGetAllStateQuery(undefined, {skip : value?.locationType !== "state"});

    const {
        data: countryData,
        isSuccess : countryDataIsSuccess,
    } = useGetAllCountryQuery(undefined, {skip : value?.locationType !== "country"});
    
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
    <div className="d-flex col-12 px-0 justify-content-between">
      <div className="d-flex align-items-center">
        <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
          Limit By Location
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
    <div className="col-12 d-flex flex-column px-0 mt-2">
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value?.locationType}
          onChange={((_,newValue)=>{ formik.setFieldValue(`${field}.locationType`, newValue);})}
        >
          <FormControlLabel
            value="none"
            control={<Radio size="small" />}
            label="Don't Limit"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
                // color: "#5C6D8E",
              },
            }}
          />
          <FormControlLabel
            value="country"
            control={<Radio size="small" />}
            label="Limit use to one or more country"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
                // color: "#5C6D8E",
              },
            }}
          />
          <FormControlLabel
            value="state"
            control={<Radio size="small" />}
            label="Limit use to one or more state"
            sx={{
              "& .MuiTypography-root": {
                fontSize: 13,
                color: "#c8d8ff",
                // color: "#5C6D8E",
              },
            }}
          />
          <FormControlLabel
            value="zip"
            control={<Radio size="small" />}
            label="Limit use to one or more Zip Codes or Postal Codes"
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
      {value?.locationType !== "none" &&(<Autocomplete
              multiple
              id="checkboxes-tags-demo"
              className="mt-3"
              sx={{ width: "100%" }}
              options={
                (cityData?.data?.data||countryData?.data?.data||stateData?.data?.data) ?? []
              }
              value={value?.location||[]}
              getOptionLabel={(option) =>  option?.name}
              size="small"
              onChange={(_, newValue) => {
                formik.setFieldValue( `${field}.location`, newValue);
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
                    {option?.name}
                  </small>
                </li>
              )}
              renderInput={(params) => (
                <TextField size="small" {...params} placeholder="Search ..." />
              )}
            />)}

    </div>
  </div>
  )
}

export default LimitByLocation