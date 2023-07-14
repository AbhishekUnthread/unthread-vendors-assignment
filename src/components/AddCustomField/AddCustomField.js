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
    value: "productField",
    children: [
      {
        id: uuidv4(),
        title: "Product Title",
        value: "title",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "Description",
        value: "description",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "SKU",
        value: "SKU",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "Category",
        value: "category",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "Sub Category",
        value: "subCategory",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "Tag Manager",
        value: "tagManager",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "Vendor",
        value: "vendor",
        children: null,
        icon: null,
      },
      {
        id: uuidv4(),
        title: "Collection",
        value: "collection",
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
            placeholder="Enter Dimension"
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
            placeholder="Enter Weight"
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

  const changeFieldTypeHandler = ({ type, value }) => {
    formik.setFieldValue(`${field}.productValue`, value);
    formik.setFieldValue(`${field}.fieldType`, type);
  };
  const changeVisibilityHandler = ({ type }) => {
    formik.setFieldValue(`${field}.visibility`, type);
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
              placeholder="Enter Custom Title"
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
            placeholder="Select Field Type"
            value={
              values?.fieldType !== "productField"
                ? values?.fieldType
                : values?.productValue
            }
            onChange={changeFieldTypeHandler}
            onBlur={formik?.handleBlur}
            name={`${field}.fieldType`}
            options={CUSTOM_FIELD_LIST}
            error={!!touched?.fieldType && error?.fieldType}
            isSubmitting={formik.isSubmitting}
          />
        </Grid>
        <Grid item md={2}>
          <InputDropdown
            placeholder="Select"
            value={values?.visibility}
            onChange={changeVisibilityHandler}
            onBlur={formik?.handleBlur}
            name={`${field}.visibility`}
            options={CUSTOM_FIELD_DISPLAY}
            error={!!touched?.visibility && error?.visibility}
            isSubmitting={formik.isSubmitting}
          />
        </Grid>
      </Grid>
      {!hideDefaultHighlight &&
        ["text", "dimension", "image", "weight"].includes(
          values?.fieldType
        ) && (
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
      {!hideDefaultHighlight &&
        values?.isDefaultHighlight &&
        ["text", "dimension", "image", "weight"].includes(
          values?.fieldType
        ) && (
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
