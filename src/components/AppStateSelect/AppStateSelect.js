import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useGetAllStateQuery } from "../../features/master/state/stateApiSlice";

export default function AppStateSelect({ name, onChange, onBlur, value }) {
  const {
    data: stateData,
    isLoading: stateIsLoading,
    isSuccess: stateIsSuccess,
    error: stateError,
  } = useGetAllStateQuery({ createdAt: -1 });

  const selectedValue = stateData?.data?.data?.find((state) => state._id === value) ?? {};

  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={stateData?.data?.data || []}
      autoHighlight
      size="small"
      name={name}
      getOptionLabel={(option) => option?.name || ""}
      onChange={onChange}
      onBlur={onBlur}
      value={selectedValue}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}>
          <small className="text-lightBlue my-1">{option.name}</small>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label=""
          placeholder="Select State"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

const states = [
  { code: "AN", label: "Andaman and Nicobar Islands" },
  { code: "AP", label: "Andhra Pradesh" },
  { code: "AR", label: "Arunachal Pradesh" },
  { code: "AS", label: "Assam" },
  { code: "BR", label: "Bihar" },
  { code: "CH", label: "Chandigarh" },
  { code: "CT", label: "Chattisgarh" },
  { code: "DN", label: "Dadra & Nagar Haveli" },
  { code: "DD", label: "Daman & Diu" },
  { code: "DL", label: "Delhi" },
  { code: "GA", label: "Goa" },
  { code: "GJ", label: "Gujrat" },
  { code: "HR", label: "Haryana" },
  { code: "HP", label: "Himachal Pradesh" },
  { code: "JK", label: "Jammu & Kashmir" },
  { code: "JH", label: "Jharkhand" },
  { code: "KA", label: "Karnataka" },
  { code: "KL", label: "Kerala" },
  { code: "LD", label: "Lakshadweep" },
  { code: "MP", label: "Madhya Pradesh" },
  { code: "MH", label: "Maharashtra" },
  { code: "MN", label: "Manipur" },
  { code: "ML", label: "Meghalaya" },
  { code: "MZ", label: "Mizoram" },
  { code: "NL", label: "Nagaland" },
  { code: "OR", label: "Odisha" },
  { code: "PY", label: "Puducherry" },
  { code: "PB", label: "Punjab" },
  { code: "RJ", label: "Rajasthan" },
  { code: "SK", label: "Sikkim" },
  { code: "TN", label: "Tamil Nadu" },
  { code: "TG", label: "Telangana" },
  { code: "TR", label: "Tripura" },
  { code: "UP", label: "Uttar Pradesh" },
  { code: "UK", label: "Uttrakhand" },
  { code: "WB", label: "West Bengal" },
];
