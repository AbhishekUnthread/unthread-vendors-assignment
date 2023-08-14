import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useGetAllCityQuery } from "../../features/master/city/cityApiSlice";

export default function AppCitySelect({ formik, selectCityName }) {
  const {
    data: cityData,
    isLoading: cityIsLoading,
    isSuccess: cityIsSuccess,
    error: cityError,
  } = useGetAllCityQuery({createdAt: -1});

  const selectedCode = cityData?.data?.data.find(city => city._id === formik.values.city);

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={cityData?.data?.data || []}
      autoHighlight
      size="small"
      getOptionLabel={(option) => option?.name}
      value={selectedCode || null}
      onChange={selectCityName}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <small className="text-lightBlue my-1">
            {option.name}
          </small>
        </Box>
      )}
      renderTags={(value) => (
        <small className="fw-400 text-lightBlue">{value.name}</small>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          //   label="Choose a country"
          placeholder="Select State"
        />
      )}
    />
  );
}

