import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useGetAllCountryQuery } from "../../features/master/country/countryApiSlice";
const emptyFn = () => {};

export default function AppMobileCodeSelect({ 
  formik ,
  handleCode
}) {
  const {
    data: countryData,
    isLoading: countryIsLoading,
    isSuccess: countryIsSuccess,
    error: countryError,
  } = useGetAllCountryQuery({ createdAt: -1 });
  
  const selectedCode = countryData?.data?.data.find(country => country._id === formik.values.countryCode );

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 75 }}
      options={countryData?.data?.data || []}
      autoHighlight
      size="small"
      disableClearable
      freeSolo
      getOptionLabel={(option) => option?.countryCode}
      value={selectedCode || null}
      onChange={handleCode}
      componentsProps={{
        paper: {
          sx: {
            width: 320,
            border: "2px solid #38395c",
            marginLeft: "-7px",
            marginTop: "-1px",
          },
        },
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ width: 300, "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}>
          <img
            loading="lazy"
            width="20"
            src={option?.imageUrl}
          />
          <small className="text-lightBlue my-1">
            {option?.name} {option?.countryCode}
          </small>
        </Box>
      )}
      renderTags={(value) => (
        <small className="fw-400 text-lightBlue">{value.countryCode}</small>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Code"
        />
      )}
    />
  );
}
