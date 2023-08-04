import React, { useEffect, useReducer, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Chip,
  TextField,
  Autocomplete,
  Tooltip,
  RadioGroup,
  Radio,
  Popover,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import info from "../../assets/icons/info.svg";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useGetAllProductTabsQuery } from "../../features/parameters/productTabs/productTabsApiSlice";
import { useGetAllVendorsQuery } from "../../features/parameters/vendors/vendorsApiSlice";
import { useGetAllTagsQuery } from "../../features/parameters/tagsManager/tagsManagerApiSlice";
import { useGetAllCollectionsQuery } from "../../features/parameters/collections/collectionsApiSlice";
import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
} from "../../features/parameters/categories/categoriesApiSlice";

const initialFilterState = {
    filterValue : []
  };
  const filterReducer = (state, action) => {
    if(action.type === "SET_DATA")
    {
        return {
            ...state,
            filterValue : action.filterValue ,
        }
    }

    return initialFilterState;
  };

function AddFilters({ value, formik, field }) {

    const [filterState, dispatchFilter] = useReducer(
        filterReducer,
        initialFilterState
    )

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    error: categoriesError,
  } = useGetAllCategoriesQuery(undefined, {
    skip: value?.field !== 30,
  });
  const {
    data: subCategoriesData,
    isLoading: subCategoriesIsLoading,
    isSuccess: subCategoriesIsSuccess,
    error: subCategoriesError,
  } = useGetAllSubCategoriesQuery(undefined, {
    skip: value?.field !== 40,
  });
  const {
    data: collectionData,
    isLoading: collectionIsLoading,
    isSuccess: collectionIsSuccess,
    error: collectionError,
  } = useGetAllCollectionsQuery(undefined, {
    skip: value?.field !== 50,
  });

  const {
    data: vendorsData,
    isLoading: vendorsIsLoading,
    isSuccess: vendorsIsSuccess,
    error: vendorsError,
  } = useGetAllVendorsQuery(undefined,{
    skip : value?.field !== 60,
  });
  const {
    data: tagsData,
    isLoading: tagsIsLoading,
    isSuccess: tagsIsSuccess,
    error: tagsError,
  } = useGetAllTagsQuery(undefined,{
    skip : value?.field !== 80,
  });


  const handleFieldChange = (event) => {
    formik.setFieldValue(`${field}.field`, event.target.value);
  };

  const handleOperatorChange = (event) => {
    formik.setFieldValue(`${field}.operator`,event.target.value)
  };


 useEffect(() => {
    if(categoriesIsSuccess)
    {
        formik.setFieldValue(`${field}.dropDownData`,categoriesData)
    }
 }, [categoriesIsSuccess,categoriesData])

 useEffect(() => {
    if(subCategoriesIsSuccess)
    {
        formik.setFieldValue(`${field}.dropDownData`,subCategoriesData)
    }
 }, [subCategoriesIsSuccess,subCategoriesData])

 useEffect(() => {
    if(collectionIsSuccess)
    {
        formik.setFieldValue(`${field}.dropDownData`,collectionData)

    }
 }, [collectionIsSuccess,collectionData])

 useEffect(() => {
    if(vendorsIsSuccess)
    {
        formik.setFieldValue(`${field}.dropDownData`,vendorsData)

    }
 }, [vendorsIsSuccess,vendorsData])

 useEffect(() => {
    if(tagsIsSuccess)
    {
        formik.setFieldValue(`${field}.dropDownData`,tagsData)

    }
 }, [tagsIsSuccess,tagsData])

 useEffect(() => {
    if(value?.field === 30)
    {
        formik.setFieldValue(`${field}.dropDownData`,categoriesData)
        
    }
    else if(value?.field === 40)
    {
        formik.setFieldValue(`${field}.dropDownData`,subCategoriesData)

    }
    else if(value?.field === 50)
    {
        formik.setFieldValue(`${field}.dropDownData`,collectionData)

    }
    else if(value?.field === 60)
    {
        formik.setFieldValue(`${field}.dropDownData`,vendorsData)

        
    }
    else if(value?.field === 80)
    {
        formik.setFieldValue(`${field}.dropDownData`,tagsData)

    }

 }, [categoriesData,subCategoriesData,collectionData,vendorsData,tagsData,value?.field])


 
  return (
    <div className="row">
      <div className="col-md-3 mt-1 px-0">
        <div className="d-flex mb-1">
          <p className="text-lightBlue">Field</p>
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
            onChange={handleFieldChange}
            size="small"
          >
            <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
              None
            </MenuItem>
            <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              All Products
            </MenuItem>
            <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Products
            </MenuItem>
            <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Category
            </MenuItem>
            <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Sub Category
            </MenuItem>
            <MenuItem value={50} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Collection
            </MenuItem>
            <MenuItem value={60} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Vendor Name
            </MenuItem>
            <MenuItem value={70} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Attributes
            </MenuItem>
            <MenuItem value={80} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Tags
            </MenuItem>
            <MenuItem value={90} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              SKU's
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="col-md-3 mt-1">
        <div className="d-flex mb-1">
          <p className="text-lightBlue">Operator</p>
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
            value={value?.operator}
            onChange={handleOperatorChange}
            size="small"
          >
            <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
              None
            </MenuItem>
            <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Equal to
            </MenuItem>
            <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Not Equal to
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="col-md-6 mt-1">
        <div className="d-flex mb-1">
          <p className="text-lightBlue">Value</p>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            sx={{ width: "100%" }}
            options={value?.dropDownData?.data?.data ?? [] }
            disableCloseOnSelect
            getOptionLabel={(option) => 
            option?.firstName || option?.title || option?.name || []
            }
            size="small"
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
                <small className="text-lightBlue">{option?.firstName || option?.title || option?.name}</small>
              </li>
            )}
            renderInput={(params) => (
              <TextField size="small" {...params} placeholder="Search" />
            )}
          />       
      </div>
    </div>
  );
}

export default AddFilters;
