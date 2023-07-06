import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "../../assets/DefaultValues/Countries"

export default function AppMobileCodeSelect({ GetCountryCode, SelectCountryCode }) {
  const handleCountryCode = (event) => {
    if (event) {
      GetCountryCode(event.target.value);
    }
  };

  const selectCountryCode = (event, value) => {
    SelectCountryCode(value?.phone);
  }

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 75 }}
      options={countries}
      autoHighlight
      size="small"
      disableClearable
      freeSolo
      getOptionLabel={(option) => `+${option.phone}`}
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
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          <small className="text-lightBlue my-1">
            {option.label} ({option.code}) +{option.phone}
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

