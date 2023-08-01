import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useGetAllCountryQuery } from "../../features/master/country/countryApiSlice";
const emptyFn = () => {};

export default function AppMobileCodeSelect({ GetCountryCode = emptyFn, SelectCountryCode = emptyFn }) {
  const handleCountryCode = (event) => {
    if (event) {
      GetCountryCode(event.target.value);
    }
  };

  const selectCountryCode = (event, value) => {
    SelectCountryCode(value?._id);
  };

  const {
    data: countryData,
    // isLoading: countryIsLoading,
    // isSuccess: countryIsSuccess,
    // error: countryError,
  } = useGetAllCountryQuery({ createdAt: -1 });

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 75 }}
      options={countryData?.data?.data}
      autoHighlight
      size="small"
      disableClearable
      freeSolo
      getOptionLabel={(option) => option.countryCode[0]}
      onChange={selectCountryCode}
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
            // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt={option.name}
          />
          <small className="text-lightBlue my-1">
            {option.name} {option.countryCode[0]}
          </small>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          //   label="Choose a country"
          placeholder="Code"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          onChange={handleCountryCode}
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
