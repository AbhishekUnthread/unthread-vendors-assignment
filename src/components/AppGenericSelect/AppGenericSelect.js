import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormControl } from "@mui/base";
import { FormHelperText } from "@mui/material";

const emptyFn = () => {};

export default function AppGenericSelect({
  name = "",
  value = "",
  label = "",
  placeholder = "",
  error = "",
  dataId = "",
  dataLabel = "",
  dataImgUrl = "",
  hasImg = false,
  formik,
  onChange = emptyFn,
  useGetQuery = emptyFn,
  getQueryFilters = {},
}) {
  const { data: queryData, isLoading: queryIsLoading, isSuccess: queryIsSuccess, error: queryError } = useGetQuery(getQueryFilters);

  const options = queryData?.data?.data ?? [];

  const selectedValue = options.find((optn) => optn?.[dataId] === value) ?? {};

  const onBlur = () => formik.setFieldTouched(name, true);

  if (queryIsSuccess)
    return (
      <FormControl>
        <Autocomplete
          options={options}
          autoHighlight
          size="small"
          name={name}
          getOptionLabel={(option) => option?.[dataLabel] || ""}
          onChange={onChange}
          onBlur={onBlur}
          value={selectedValue}
          renderOption={(props, option) => (
            <Box
              {...props}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}>
              {hasImg && (
                <img
                  loading="lazy"
                  width="20"
                  src={option?.[dataImgUrl] ?? ""}
                  alt={option?.[dataLabel] ?? ""}
                />
              )}
              <small className="text-lightBlue my-1">{option?.[dataLabel] || ""}</small>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              autoComplete="off"
            />
          )}
        />
        {!!error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    );
  else return <></>;
}
