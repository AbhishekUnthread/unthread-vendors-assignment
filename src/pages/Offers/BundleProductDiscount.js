import React, { useEffect, useState } from "react";
// ! IMAGES IMPORTS
import info from "../../assets/icons/info.svg";
import product2 from "../../assets/images/products/product2.jpg";
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchBorder from "../../components/SearchBorder/SearchBorder";
import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
} from "../../features/parameters/categories/categoriesApiSlice";
import { useGetAllCollectionsQuery } from "../../features/parameters/collections/collectionsApiSlice";
import { useGetAllVendorsQuery } from "../../features/parameters/vendors/vendorsApiSlice";
import { useGetAllTagsQuery } from "../../features/parameters/tagsManager/tagsManagerApiSlice";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const BundleProductDiscount = ({
  sectionTitle,
  value,
  field,
  formik,
  touched,
  error,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(value?.value || []);
  const [dropDownData, setDropDownData] = useState([]);

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    error: categoriesError,
  } = useGetAllCategoriesQuery(undefined, {
    skip: value?.field !== "category",
  });
  const {
    data: collectionData,
    isLoading: collectionIsLoading,
    isSuccess: collectionIsSuccess,
    error: collectionError,
  } = useGetAllCollectionsQuery(undefined, {
    skip: value?.field !== "collection",
  });

  const {
    data: tagsData,
    isLoading: tagsIsLoading,
    isSuccess: tagsIsSuccess,
    error: tagsError,
  } = useGetAllTagsQuery(undefined, {
    skip: value?.field !== "Tags",
  });
  // ? FIELD SELECT STARTS HERE
  // const [field, setField] = React.useState("");

  const handleFieldChange = (event) => {
    formik.setFieldValue(`${field}.field`, event.target.value);
    formik.setFieldValue(`${field}.value`, []);
  };

  const handleOptionChange = (newValue) => {
    // setSelectedOptions(newValue);
    formik.setFieldValue(`${field}.value`, newValue);
  };
  const handleClear = (item) => {
    // const updatedSelectedOptions = selectedOptions.filter(
    //   (option) => option !== item
    // );
    const updatedSelectedOptions = value?.value.filter((option)=> option !== item)
    // handleOptionChange(updatedSelectedOptions);
    formik.setFieldValue(`${field}.value`, updatedSelectedOptions);

  };
  // ? FIELD SELECT ENDS HERE

  useEffect(() => {
    if (categoriesIsSuccess) {
      // formik.setFieldValue(`${field}.dropDownData`, categoriesData);
      setDropDownData(categoriesData);
    }
  }, [categoriesIsSuccess, categoriesData]);

  useEffect(() => {
    if (collectionIsSuccess) {
      // formik.setFieldValue(`${field}.dropDownData`, collectionData);
      setDropDownData(collectionData);
    }
  }, [collectionIsSuccess, collectionData]);

  useEffect(() => {
    if (tagsIsSuccess) {
      // formik.setFieldValue(`${field}.dropDownData`, tagsData);
      setDropDownData(tagsData);
    }
  }, [tagsIsSuccess, tagsData]);

  useEffect(() => {
    if (value?.field === "category") {
      // formik.setFieldValue(`${field}.dropDownData`, categoriesData);
      setDropDownData(categoriesData);
    } else if (value?.field === "collection") {
      // formik.setFieldValue(`${field}.dropDownData`, collectionData);
      setDropDownData(collectionData);
    } else if (value?.field === "Tags") {
      // formik.setFieldValue(`${field}.dropDownData`, tagsData);
      setDropDownData(tagsData);
    }
  }, [categoriesData, collectionData, tagsData, value?.field]);

  console.log("dropDownData", dropDownData);

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            {sectionTitle}
          </h6>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
      </div>
      <hr className="hr-grey-6 mt-3 mb-0" />
      {/* <div className="col-12 px-0">
      <div className="row align-items-start"> */}
      <div className="col-md-4 mt-3 ps-0 pe-0 pe-md-2">
        <div className="d-flex mb-1">
          <p className="text-lightBlue">Select Item from</p>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
        <FormControl sx={{ m: 0, minWidth: 120, width: "100%" }} size="small">
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={value?.field}
            name={`${field}.field`}
            onChange={handleFieldChange}
            size="small"
            displayEmpty
            renderValue={
              value?.field !== ""
                ? undefined
                : () => (
                    <span style={{ fontSize: "13px", color: "#5c6d8e" }}>
                      Select
                    </span>
                  )
            }
          >
            <MenuItem
              value="allProducts"
              sx={{ fontSize: 13, color: "#5c6d8e" }}
            >
              All Products
            </MenuItem>
            <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Specific Products
            </MenuItem>
            <MenuItem value="category" sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Category
            </MenuItem>
            <MenuItem
              value="collection"
              sx={{ fontSize: 13, color: "#5c6d8e" }}
            >
              Collection
            </MenuItem>
            <MenuItem value="Tags" sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Tags
            </MenuItem>
          </Select>
        </FormControl>
        <small className="mt-1 text-grey-6 font1">
          {!!touched && error?.field ? (
            <FormHelperText error>{error?.field}</FormHelperText>
          ) : null}
        </small>
      </div>
      <div className="col-md-8 mt-3 mb-3 pe-0 ps-0 ps-md-2">
        <div className="d-flex mb-1">
          <p className="text-lightBlue">Select Product</p>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
        {/* <SearchBorder /> */}
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          sx={{ width: "100%" }}
          options={dropDownData?.data?.data ?? []}
          disableCloseOnSelect
          getOptionLabel={(option) =>
            option?.firstName || option?.title || option?.name || []
          }
          size="small"
          value={value?.value}
          onChange={(_, newValue) => {
            handleOptionChange(newValue);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                checked={selected}
                size="small"
                style={{
                  color: "#5C6D8E",
                  marginRight: 0,
                }}
              />
              <small className="text-lightBlue">
                {option?.firstName || option?.title || option?.name}
              </small>
            </li>
          )}
          renderInput={(params) => (
            <TextField size="small" {...params} placeholder="Search" />
          )}
          renderTags={() => null}
          disableClearable
        />
        <small className="mt-1 text-grey-6 font1">
          {!!touched && error?.value ? (
            <FormHelperText error>{error?.value}</FormHelperText>
          ) : null}
        </small>
      </div>

      {value?.value?.map((item, index) => (
        <div className="col-12 mt-2 px-0">
          <div className="bg-black-21 rounded-8 align-items-center p-2 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={product2}
                alt="product2"
                className="rounded-8"
                width={50}
                height="auto"
              />
              <div className="d-flex flex-column ms-2">
                <p className="text-lightBlue">{item?.name}</p>
                <small className="text-grey-6 mt-1">SKU: TFDR012345</small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <p className="text-lightBlue me-3">₹&nbsp;50,000</p>
              <ClearIcon
                sx={{
                  color: "#c8d8ff",
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => handleClear(item)}
              />
            </div>
          </div>
        </div>
      ))}

      {/* <div className="col-12 mt-2 px-0">
        <div className="bg-black-21 rounded-8 align-items-center p-2 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={product2}
              alt="product2"
              className="rounded-8"
              width={50}
              height="auto"
            />
            <div className="d-flex flex-column ms-2">
              <p className="text-lightBlue">The Fringe Diamond Ring</p>
              <small className="text-grey-6 mt-1">SKU: TFDR012345</small>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="text-lightBlue me-3">₹&nbsp;50,000</p>
            <ClearIcon
              sx={{
                color: "#c8d8ff",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-12 mt-2 px-0">
        <div className="bg-black-21 rounded-8 align-items-center p-2 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={product2}
              alt="product2"
              className="rounded-8"
              width={50}
              height="auto"
            />
            <div className="d-flex flex-column ms-2">
              <p className="text-lightBlue">The Fringe Diamond Ring</p>
              <small className="text-grey-6 mt-1">SKU: TFDR012345</small>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="text-lightBlue me-3">₹&nbsp;50,000</p>
            <ClearIcon
              sx={{
                color: "#c8d8ff",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BundleProductDiscount;
