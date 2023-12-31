import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useGetAllCountryQuery } from "../../features/master/country/countryApiSlice";

export default function AppCountrySelect({ selectCountryName, formik }) {
  const {
    data: countryData,
    // isLoading: countryIsLoading,
    // isSuccess: countryIsSuccess,
    // error: countryError,
  } = useGetAllCountryQuery({ createdAt: -1 });

  const selectedCode = countryData?.data?.data.find( country => country._id === formik.values.country );

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 320 }}
      options={countryData?.data?.data || []}
      value={selectedCode || null}
      autoHighlight
      size="small"
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
      getOptionLabel={(option) => option?.name}
      onChange={selectCountryName}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}>
          {/* <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          /> */}
          <small className="text-lightBlue my-1">{option?.name}</small>
        </Box>
      )}
      renderTags={(value) => (
        <small className="fw-400 text-lightBlue">{value.name}</small>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          //   label="Choose a country"
          placeholder="Select the Country"
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
