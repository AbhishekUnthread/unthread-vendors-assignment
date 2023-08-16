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
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import info from "../../assets/icons/info.svg";
import SearchBorder from "../SearchBorder/SearchBorder";
import arrowDown from "../../assets/icons/arrowDown.svg";
import { useGetAllCollectionsQuery } from "../../features/parameters/collections/collectionsApiSlice";
import { initial } from "lodash";
import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
} from "../../features/parameters/categories/categoriesApiSlice";

const initialBuyXgetYState = {
  buyProduct: [],
  getProduct: [],
};
const buyXgetYReducer = (state, action) => {
  if (action.type === "SET_BUY_PRODUCT") {
    return {
      ...state,
      buyProduct: action.buyProduct,
    };
  }
  if (action.type === "SET_GET_PRODUCT") {
    return {
      ...state,
      getProduct: action.getProduct,
    };
  }
};

function BuyXGetY({ value, field, formik, touched, error }) {
  const [discountMode, setDiscountMode] = React.useState("giveDiscount");
  const [item, setItem] = React.useState("");
  const [buyXgetYState, dispatchBuyXgetY] = useReducer(
    buyXgetYReducer,
    initialBuyXgetYState
  );
  const {
    data: collectionData,
    isLoading: collectionIsLoading,
    isSuccess: collectionIsSuccess,
    error: collectionError,
  } = useGetAllCollectionsQuery(undefined, {
    skip:
      value?.selectGetItem !== "collection" &&
      value?.selectBuyItem !== "collection",
  });
  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    error: categoriesError,
  } = useGetAllCategoriesQuery(undefined, {
    skip:
      value?.selectGetItem !== "category" &&
      value?.selectBuyItem !== "category",
  });
  const {
    data: subCategoriesData,
    isLoading: subCategoriesIsLoading,
    isSuccess: subCategoriesIsSuccess,
    error: subCategoriesError,
  } = useGetAllSubCategoriesQuery(undefined, {
    skip:
      value?.selectGetItem !== "subCategory" &&
      value?.selectBuyItem !== "subCategory",
  });

  const handleDiscountModeChange = (_, newValue) => {
    formik.setFieldValue(`${field}.discountMode`, newValue);
  };
  const handleItemChange = (event) => {
    setItem(event.target.value);
  };

  const handleSelectBuyItemChange = (event) => {
    formik.setFieldValue(`${field}.buyProduct`, []);
    formik.handleChange(event);
  };

  const handleSelectGetItemChange = (event) => {
    formik.setFieldValue(`${field}.getProduct`, []);
    formik.handleChange(event);
  };

  const [anchorDiscountPercentEl, setAnchorDiscountPercentEl] = useState(null);
  const handleDiscountPercent = (event) => {
    setAnchorDiscountPercentEl(event.currentTarget);
  };
  const handleDiscountPercentClose = () => {
    setAnchorDiscountPercentEl(null);
  };
  const openDiscountPercent = Boolean(anchorDiscountPercentEl);
  const idDiscountPercent = openDiscountPercent ? "simple-popover" : undefined;

  const handleChange = (newValue) => {
    formik.setFieldValue(`${field}.type`, newValue);
    setAnchorDiscountPercentEl(null);
  };

  //Number Formatting starts here
  const formattedNumber = (number) => {
    const numericValue = parseFloat(number);
    if (!isNaN(numericValue)) {
      const formattedValue = numericValue.toLocaleString("en-IN");
      return formattedValue;
    }
    return "";
  };
  const removeCommas = (formattedValue) => {
    return formattedValue.replace(/,/g, "");
  };
  const handleInputChange = (event) => {
    const inputNumber = removeCommas(event.target.value);
    formik.setFieldValue(`${field}.discountValue`, inputNumber);
  };
  //Number Formatting ends here
  useEffect(() => {
    if (collectionIsSuccess) {
      if (value?.selectBuyItem === "collection") {
        dispatchBuyXgetY({
          type: "SET_BUY_PRODUCT",
          buyProduct: collectionData,
        });
      }
      if (value?.selectGetItem === "collection") {
        dispatchBuyXgetY({
          type: "SET_GET_PRODUCT",
          getProduct: collectionData,
        });
      }
    }
  }, [
    collectionIsSuccess,
    collectionData,
    value?.selectBuyItem,
    value?.selectGetItem,
  ]);

  useEffect(() => {
    if (categoriesIsSuccess) {
      if (value?.selectBuyItem === "category") {
        dispatchBuyXgetY({
          type: "SET_BUY_PRODUCT",
          buyProduct: categoriesData,
        });
      }
      if (value?.selectGetItem === "category") {
        dispatchBuyXgetY({
          type: "SET_GET_PRODUCT",
          getProduct: categoriesData,
        });
      }
    }
  }, [
    categoriesIsSuccess,
    categoriesData,
    value?.selectBuyItem,
    value?.selectGetItem,
  ]);

  useEffect(() => {
    if (subCategoriesIsSuccess) {
      if (value?.selectBuyItem === "subCategory") {
        dispatchBuyXgetY({
          type: "SET_BUY_PRODUCT",
          buyProduct: subCategoriesData,
        });
      }
      if (value?.selectGetItem === "subCategory") {
        dispatchBuyXgetY({
          type: "SET_GET_PRODUCT",
          getProduct: subCategoriesData,
        });
      }
    }
  }, [
    subCategoriesData,
    subCategoriesIsSuccess,
    value?.selectBuyItem,
    value?.selectGetItem,
  ]);

  useEffect(() => {
    if (value?.selectBuyItem === "collection") {
      dispatchBuyXgetY({ type: "SET_BUY_PRODUCT", buyProduct: collectionData });
    } else if (value?.selectBuyItem === "product") {
      dispatchBuyXgetY({ type: "SET_BUY_PRODUCT", buyProduct: [] });
    } else if (value?.selectBuyItem === "category") {
      dispatchBuyXgetY({ type: "SET_BUY_PRODUCT", buyProduct: categoriesData });
    } else if (value?.selectBuyItem === "subCategory") {
      dispatchBuyXgetY({
        type: "SET_BUY_PRODUCT",
        buyProduct: subCategoriesData,
      });
    }
  }, [value?.selectBuyItem, collectionData, categoriesData, subCategoriesData]);

  useEffect(() => {
    if (value?.selectGetItem === "collection") {
      dispatchBuyXgetY({ type: "SET_GET_PRODUCT", getProduct: collectionData });
    } else if (value?.selectGetItem === "product") {
      dispatchBuyXgetY({ type: "SET_GET_PRODUCT", getProduct: [] });
    } else if (value?.selectGetItem === "category") {
      dispatchBuyXgetY({ type: "SET_GET_PRODUCT", getProduct: categoriesData });
    } else if (value?.selectGetItem === "subCategory") {
      dispatchBuyXgetY({
        type: "SET_GET_PRODUCT",
        getProduct: subCategoriesData,
      });
    }
  }, [value?.selectGetItem, collectionData, categoriesData, subCategoriesData]);

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="bg-black-21 border-grey-5 rounded-8 p-3 col-12">
        <div className="row">
          <div className="d-flex col-12 justify-content-between">
            <div className="d-flex align-items-center">
              <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                Buy
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
          <div className="col-12">
            <hr className="hr-grey-6 mt-3 mb-0" />
          </div>
          <div className="col-12 mb-3">
            <div className="row">
              <div className="col-md-3 mt-3">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue">Quanity</p>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className="ms-2 c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>

                <FormControl className="w-100 px-0">
                  <OutlinedInput
                    value={value?.buy}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    name={`${field}.buy`}
                    placeholder="Enter Quantity"
                    size="small"
                  />
                </FormControl>
                {!!touched?.buy && error?.buy ? (
                  <Typography variant="caption" color="#F67476">
                    {error?.buy}
                  </Typography>
                ) : null}
              </div>

              <div className="col-md-3 mt-3 ">
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
                <FormControl
                  sx={{ m: 0, minWidth: 120, width: "100%" }}
                  size="small"
                >
                  <Select
                    displayEmpty
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={value?.selectBuyItem || ""}
                    onChange={handleSelectBuyItemChange}
                    onBlur={formik?.handleBlur}
                    size="small"
                    name={`${field}.selectBuyItem`}
                  >
                    <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                      Select
                    </MenuItem>
                    <MenuItem
                      value="collection"
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Specific Collection
                    </MenuItem>
                    <MenuItem
                      value="product"
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Specific Product
                    </MenuItem>
                    <MenuItem
                      value="category"
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Specific Category
                    </MenuItem>
                    <MenuItem
                      value="subCategory"
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Specific Sub-Category
                    </MenuItem>
                  </Select>
                </FormControl>
                {!!touched?.selectBuyItem && error?.selectBuyItem ? (
                  <Typography variant="caption" color="#F67476">
                    {error?.selectBuyItem}
                  </Typography>
                ) : null}
              </div>
              <div className="col-md-6 mt-3">
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
                  options={buyXgetYState?.buyProduct?.data?.data ?? []}
                  value={value?.buyProduct || []}
                  getOptionLabel={(option) =>
                    option?.firstName || option?.title || option?.name || []
                  }
                  size="small"
                  onChange={(_, newValue) => {
                    formik.setFieldValue(`${field}.buyProduct`, newValue);
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
                    <TextField
                      size="small"
                      {...params}
                      placeholder="Search ..."
                    />
                  )}
                />
                {!!touched?.buyProduct && error?.buyProduct ? (
                  <Typography variant="caption" color="#F67476">
                    {error?.buyProduct}
                  </Typography>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black-21 border-grey-5 rounded-8 p-3 col-12 mt-3">
        <div className="row">
          <div className="d-flex col-12 justify-content-between">
            <div className="d-flex align-items-center">
              <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                Get
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
          <div className="col-12">
            <hr className="hr-grey-6 mt-3 mb-0" />
          </div>
          <div className="col-12 mb-3">
            <div className="row">
              <div className="col-md-3 mt-3">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue">Quanity</p>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className="ms-2 c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>

                <FormControl className="w-100 px-0">
                  <OutlinedInput
                    value={value?.get}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    name={`${field}.get`}
                    placeholder="Enter Quantity"
                    size="small"
                  />
                </FormControl>
                {!!touched?.get && error?.get ? (
                  <Typography variant="caption" color="#F67476">
                    {error?.get}
                  </Typography>
                ) : null}
              </div>
              <div className="col-md-3 mt-3 ">
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
                <FormControl
                  sx={{ m: 0, minWidth: 120, width: "100%" }}
                  size="small"
                >
                  <Select
                    displayEmpty
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={value?.selectGetItem || ""}
                    onChange={handleSelectGetItemChange}
                    size="small"
                    onBlur={formik?.handleBlur}
                    name={`${field}.selectGetItem`}
                  >
                    <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                      Select
                    </MenuItem>
                    <MenuItem
                      value="collection"
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Specific Collection
                    </MenuItem>
                    <MenuItem
                      value="product"
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Specific Product
                    </MenuItem>
                    <MenuItem
                      value="category"
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Specific Category
                    </MenuItem>
                    <MenuItem
                      value="subCategory"
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      SPecific Sub-Category
                    </MenuItem>
                  </Select>
                </FormControl>
                {!!touched?.selectGetItem && error?.selectGetItem ? (
                  <Typography variant="caption" color="#F67476">
                    {error?.selectGetItem}
                  </Typography>
                ) : null}
              </div>
              <div className="col-md-6 mt-3">
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
                  options={
                    buyXgetYState?.getProduct?.data?.data ?? [] // Add a default empty array if options is undefined or null
                  }
                  value={value?.getProduct || []}
                  getOptionLabel={(option) =>
                    option?.firstName || option?.title || option?.name || []
                  }
                  size="small"
                  onChange={(_, newValue) => {
                    formik.setFieldValue(`${field}.getProduct`, newValue);
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
                    <TextField
                      size="small"
                      {...params}
                      placeholder="Search ..."
                    />
                  )}
                />
                {!!touched?.getProduct && error?.getProduct ? (
                  <Typography variant="caption" color="#F67476">
                    {error?.getProduct}
                  </Typography>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 d-flex px-0 mt-3">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            row
            value={value?.discountMode}
            onChange={handleDiscountModeChange}
          >
            <FormControlLabel
              value="giveDiscount"
              control={<Radio size="small" />}
              label="Give Discount"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  // color: "#5C6D8E",
                },
              }}
            />
            <FormControlLabel
              value="free"
              control={<Radio size="small" />}
              label="Free"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#c8d8ff",
                  // color: "#5C6D8E",
                },
              }}
            />
          </RadioGroup>
        </FormControl>
      </div>
      {value?.discountMode === "giveDiscount" && (
        <div className="col-12 px-0">
          <div className="row mt-2">
            <div className="col-12">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Discount</p>
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
          </div>

          <div className="row align-items-center">
            <div className="col-md-5 discount-inputs-two d-flex align-items-center">
              <FormControl className="px-0">
                <OutlinedInput
                  value={formattedNumber(value?.discountValue)}
                  onChange={handleInputChange}
                  onBlur={formik?.handleBlur}
                  name={`${field}.discountValue`}
                  placeholder="Enter Discount"
                  size="small"
                  endAdornment={
                    <InputAdornment
                      position="end"
                      aria-describedby={idDiscountPercent}
                      onClick={handleDiscountPercent}
                      className="c-pointer"
                    >
                      <span className="d-flex align-items-center">
                        <p className="text-lightBlue">
                          {" "}
                          {value?.type === "percentage"
                            ? `Percentage`
                            : `Fixed Amount`}
                        </p>
                        <img src={arrowDown} alt="arrow" className="ms-2" />
                      </span>
                    </InputAdornment>
                  }
                />
                {!!touched?.discountValue && error?.discountValue ? (
                  <Typography variant="caption" color="#F67476">
                    {error?.discountValue}
                  </Typography>
                ) : null}
              </FormControl>
              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                id={idDiscountPercent}
                open={openDiscountPercent}
                anchorEl={anchorDiscountPercentEl}
                onClose={handleDiscountPercentClose}
              >
                <div className="py-2 px-1">
                  <small
                    className="text-lightBlue rounded-3 p-2 hover-back d-block"
                    onClick={() => handleChange("percentage")}
                  >
                    Percentage Discount
                  </small>
                  <small
                    className="text-lightBlue rounded-3 p-2 hover-back d-block"
                    onClick={() => handleChange("fixed")}
                  >
                    Fixed Amount
                  </small>
                </div>
              </Popover>

              <div className="w-auto text-center ms-3">
                <p className="text-lightBlue">on</p>
              </div>
            </div>
            <div className="col-md-7">
              <FormControl
                sx={{ m: 0, minWidth: 120, width: "100%" }}
                size="small"
              >
                <Select
                  displayEmpty
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={value?.value || ""}
                  onChange={formik?.handleChange}
                  name={`${field}.value`}
                  size="small"
                >
                  <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    Select
                  </MenuItem>
                  <MenuItem
                    value="goldPrice"
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Gold Price
                  </MenuItem>
                  <MenuItem
                    value="diamondPrice"
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Diamond Price
                  </MenuItem>
                  <MenuItem
                    value="makingCharge"
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Making Charges
                  </MenuItem>
                  <MenuItem
                    value="totalPrice"
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Total Price
                  </MenuItem>
                </Select>
                {!!touched?.value && error?.value ? (
                  <Typography variant="caption" color="#F67476">
                    {error?.value}
                  </Typography>
                ) : null}
              </FormControl>
            </div>
            {/* {discountType === 20 && (
            <div className="col-md-12 mt-3">
              <div className="d-flex mb-1">
                <p className="text-lightBlue">Cart Label</p>
                <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
              </div>
              <FormControl className="px-0 w-100">
                <OutlinedInput
                  placeholder="Enter Label"
                  size="small"
                />
              </FormControl>
            </div>
          )} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyXGetY;
