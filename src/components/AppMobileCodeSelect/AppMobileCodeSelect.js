import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useGetAllCountryQuery } from "../../features/master/country/countryApiSlice";
const emptyFn = () => {};

export default function AppMobileCodeSelect({ 
  selectCountryCode,
  formik ,
  codeList=[]
}) {
  const handleTagList = (event, value) => {
    const newTag = value[value.length - 1].name;
    if (!formik.values.countryCode.includes(newTag)) {
      const updatedTags = [...formik.values.countryCode, newTag];
      selectCountryCode(updatedTags);
    }
  };

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 75 }}
      options={codeList}
      autoHighlight
      size="small"
      disableClearable
      freeSolo
      getOptionLabel={(option) => option?.countryCode}
      value={formik?.values?.countryCode || []}
      onChange={handleTagList}
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
            src={option.imageUrl}
            alt={option.name}
          />
          <small className="text-lightBlue my-1">
            {option.name} {option.countryCode}
          </small>
        </Box>
      )}
      renderTags={(value) => {
        <small className="fw-400 text-lightBlue">{value?.name}</small>
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Code"
        />
      )}
    />
  );
}
