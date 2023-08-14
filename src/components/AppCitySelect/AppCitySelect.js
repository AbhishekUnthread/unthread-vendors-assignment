import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useGetAllCityQuery } from "../../features/master/city/cityApiSlice";

export default function AppCitySelect({ GetCityName = () => {}, SelectCityName = () => {} }) {
  const handleCityName = (event) => {
    console.log(event.target.value);
    GetCityName(event.target.value);
  };

  const selectCityName = (event, value) => {
    console.log(value);
    SelectCityName(value?._id ?? "");
  };

  const {
    data: cityData,
    // isLoading: cityIsLoading,
    // isSuccess: cityIsSuccess,
    // error: cityError,
  } = useGetAllCityQuery({ createdAt: -1 });

  return (
    <Autocomplete
      id="city-select-demo"
      // sx={{ width: 320 }}
      options={cityData?.data?.data}
      autoHighlight
      size="small"
      getOptionLabel={(option) => option?.name}
      onChange={selectCityName}
      renderOption={(props, option) => (
        <Box
          component="li"
          // sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}>
          <small className="text-lightBlue my-1">{option?.name}</small>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select the City"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          onChange={handleCityName}
        />
      )}
    />
  );
}
