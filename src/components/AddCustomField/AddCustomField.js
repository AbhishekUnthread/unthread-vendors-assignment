import { useCallback } from "react";
import {
  FormControl,
  OutlinedInput,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import StraightenIcon from "@mui/icons-material/Straighten";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ScaleIcon from "@mui/icons-material/Scale";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import { v4 as uuidv4 } from "uuid";

import InputDropdown from "../InputDropdown/InputDropdown";
import { UploadMediaLarge } from "../UploadMediaBox/UploadMedia";

import "./customField.scss";

const CUSTOM_FIELD_LIST = [
  {
    id: uuidv4(),
    title: "None",
    value: "",
    children: null,
    icon: (
      <FilterNoneIcon
        sx={{
          color: "#5c6d8e",
          fontSize: 18,
          cursor: "pointer",
        }}
      />
    ),
  },
  {
    id: uuidv4(),
    title: "Text",
    value: "text",
    children: null,
    icon: (
      <TextFieldsIcon
        sx={{
          color: "#5c6d8e",
          fontSize: 18,
          cursor: "pointer",
        }}
      />
    ),
  },
  {
    id: uuidv4(),
    title: "Image",
    value: "image",
    children: null,
    icon: (
      <InsertPhotoIcon
        sx={{
          color: "#5c6d8e",
          fontSize: 18,
          cursor: "pointer",
        }}
      />
    ),
  },
  {
    id: uuidv4(),
    title: "Dimensions",
    value: "dimension",
    children: null,
    icon: (
      <StraightenIcon
        sx={{
          color: "#5c6d8e",
          fontSize: 18,
          cursor: "pointer",
        }}
      />
    ),
  },
  {
    id: uuidv4(),
    title: "Weight",
    value: "weight",
    children: null,
    icon: (
      <ScaleIcon
        sx={{
          color: "#5c6d8e",
          fontSize: 18,
          cursor: "pointer",
        }}
      />
    ),
  },
  {
    id: uuidv4(),
    title: "Link to Product Field",
    value: "",
    children: [
      {
        id: uuidv4(),
        title: "Product Title",
        value: "productField",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "Product 1st Image",
        value: "productField",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "Product 2nd Image",
        value: "productField",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "Description",
        value: "productField",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "SKU",
        value: "productField",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "Category",
        value: "productField",
        children: null,
        icon: null,
      },
    ],
    icon: (
      <InsertLinkIcon
        sx={{
          color: "#5c6d8e",
          fontSize: 18,
          cursor: "pointer",
        }}
      />
    ),
  },
];

const CUSTOM_FIELD_DISPLAY = [
  {
    id: uuidv4(),
    title: "Show",
    value: "show",
    children: null,
  },
  {
    id: uuidv4(),
    title: "Hide",
    value: "hide",
    children: null,
  },
];

const FieldType = (props) => {
  const { fieldType, error, onChange, name, onBlur, value } = props;

  const changeValueHandler = (e) => {
    onChange(e.target.value);
  };

  switch (fieldType) {
    case "text": {
      return (
        <FormControl className="w-100 px-0 text-area">
          <TextField
            placeholder="Enter Text"
            value={value}
            onChange={changeValueHandler}
            name={name}
            onBlur={onBlur}
            multiline
            rows={5}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      );
    }
    case "image": {
      return (
        <UploadMediaLarge
          fileSrc={value}
          error={error}
          onUpload={onChange}
          onBlur={onBlur}
          name={name}
        />
      );
    }
    case "dimension": {
      return (
        <FormControl className="w-100 px-0">
          <OutlinedInput
            placeholder={"Enter Dimension"}
            value={value}
            onChange={changeValueHandler}
            name={name}
            onBlur={onBlur}
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <p className="text-lightBlue">mm</p>
              </InputAdornment>
            }
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      );
    }
    case "weight": {
      return (
        <FormControl className="w-100 px-0">
          <OutlinedInput
            placeholder={"Enter Dimension"}
            value={value}
            onChange={changeValueHandler}
            name={name}
            onBlur={onBlur}
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <p className="text-lightBlue">gm</p>
              </InputAdornment>
            }
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      );
    }
    default: {
      return <></>;
    }
  }
};

const AddCustomField = (props) => {
  const { values, field, formik, hideDefaultHighlight, touched, error } = props;

  const changeFieldTypeHandler = (fieldType) => {
    formik.setFieldValue(`${field}.fieldType`, fieldType);
  };
  const changeVisibilityHandler = (visibility) => {
    formik.setFieldValue(`${field}.visibility`, visibility);
  };
  const changeProductValueHandler = useCallback((productValue) => {
    formik.setFieldValue(`${field}.productValue`, productValue);
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <FormControl className="w-100 px-0">
            <OutlinedInput
              size="small"
              name={`${field}.title`}
              value={values?.title}
              onBlur={formik?.handleBlur}
              onChange={formik?.handleChange}
            />
            {!!touched?.title && error?.title && (
              <FormHelperText error>{error?.title}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item md={4}>
          <InputDropdown
            value={values?.fieldType}
            onChange={changeFieldTypeHandler}
            onBlur={formik?.handleBlur}
            name={`${field}.fieldType`}
            options={CUSTOM_FIELD_LIST}
            error={!!touched?.fieldType && error?.fieldType}
          />
        </Grid>
        <Grid item md={2}>
          <InputDropdown
            value={values?.visibility}
            onChange={changeVisibilityHandler}
            onBlur={formik?.handleBlur}
            name={`${field}.visibility`}
            options={CUSTOM_FIELD_DISPLAY}
            error={!!touched?.visibility && error?.visibility}
          />
        </Grid>
      </Grid>
      {!hideDefaultHighlight && (
        <FormControlLabel
          control={
            <Checkbox
              checked={values?.isDefaultHighlight}
              name={`${field}.isDefaultHighlight`}
              onBlur={formik?.handleBlur}
              onChange={formik?.handleChange}
              inputProps={{ "aria-label": "controlled" }}
              size="small"
              style={{
                color: "#5C6D8E",
                marginRight: 0,
                width: "auto",
              }}
            />
          }
          label="Enable Default Highlight"
          sx={{
            "& .MuiTypography-root": {
              fontSize: "0.7rem",
              color: "#c8d8ff",
            },
          }}
          className=" px-0"
        ></FormControlLabel>
      )}
      {values?.fieldType && (
        <div className="mt-2">
          <FieldType
            error={!!touched?.productValue && error?.productValue}
            value={values?.productValue}
            onChange={changeProductValueHandler}
            name={`${field}.productValue`}
            onBlur={formik?.handleBlur}
            fieldType={values?.fieldType}
          />
        </div>
      )}
    </>
  );
};

export default AddCustomField;
