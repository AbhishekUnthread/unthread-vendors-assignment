import React from 'react'
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
import SearchBorder from '../SearchBorder/SearchBorder';
import arrowDown from "../../assets/icons/arrowDown.svg";
import { useGetAllCollectionsQuery } from '../../features/parameters/collections/collectionsApiSlice';


function BuyXGetY({ value, field, formik, touched, error }) {
    const [discountMode, setDiscountMode] = React.useState("giveDiscount");
    const [item, setItem] = React.useState("");
    
    const {
        data: collectionData,
        isLoading: collectionIsLoading,
        isSuccess: collectionIsSuccess,
        error: collectionError,
      } = useGetAllCollectionsQuery();

    const handleDiscountModeChange = (event, newValue) => {
      setDiscountMode(newValue);
    };
    const handleItemChange = (event) => {
        setItem(event.target.value);
      };
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
                  onChange={formik?.handleChange}
                  size="small"
                >
                  <MenuItem
                    value=""
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Select
                  </MenuItem>
                  <MenuItem
                    value={10}
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Specific Collection
                  </MenuItem>
                  <MenuItem
                    value={20}
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Specific Product
                  </MenuItem>
                  <MenuItem
                    value={30}
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Specific Category
                  </MenuItem>
                  <MenuItem
                    value={40}
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Specific Sub-Category
                  </MenuItem>
                </Select>
              </FormControl>
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
    (collectionData?.data?.data || collectionData?.data?.data) ?? [] // Add a default empty array if options is undefined or null
  }
              value={value?.buyProduct||[]}
              getOptionLabel={(option) => option?.firstName || option?.title || []}
              size="small"
              onChange={(_, newValue) => {
                formik.setFieldValue( `${field}.buyProduct`, newValue);
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
                    {option?.firstName || option?.title}
                  </small>
                </li>
              )}
              renderInput={(params) => (
                <TextField size="small" {...params} placeholder="Search ..." />
              )}
            />
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
                  placeholder="Enter Quantity"
                  size="small"
                />
              </FormControl>
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
                //   onChange={handleItemChange}
                  size="small"
                >
                  <MenuItem
                    value=""
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Select
                  </MenuItem>
                  <MenuItem
                    value={10}
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Specific Collection
                  </MenuItem>
                  <MenuItem
                    value={20}
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Specific Product
                  </MenuItem>
                  <MenuItem
                    value={30}
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    Specific Category
                  </MenuItem>
                  <MenuItem
                    value={40}
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    SPecific Sub-Category
                  </MenuItem>
                </Select>
              </FormControl>
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
    (collectionData?.data?.data || collectionData?.data?.data) ?? [] // Add a default empty array if options is undefined or null
  }
              value={value?.buyProduct||[]}
              getOptionLabel={(option) => option?.firstName || option?.title || []}
              size="small"
              onChange={(_, newValue) => {
                formik.setFieldValue( `${field}.buyProduct`, newValue);
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
                    {option?.firstName || option?.title}
                  </small>
                </li>
              )}
              renderInput={(params) => (
                <TextField size="small" {...params} placeholder="Search ..." />
              )}
            />
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
          value={discountMode}
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
    {/* {discountMode === "giveDiscount" && (
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
                      <p className="text-lightBlue">Percentage</p>
                      <img
                        src={arrowDown}
                        alt="arrow"
                        className="ms-2"
                      />
                    </span>
                  </InputAdornment>
                }
              />
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
                <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                  Percentage Discount
                </small>
                <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
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
                labelId="demo-select-small"
                id="demo-select-small"
                value={field}
                onChange={handleFieldChange}
                size="small"
              >
                <MenuItem
                  value=""
                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                >
                  None
                </MenuItem>
                <MenuItem
                  value={10}
                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                >
                  Value 1
                </MenuItem>
                <MenuItem
                  value={20}
                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                >
                  Value 2
                </MenuItem>
                <MenuItem
                  value={30}
                  sx={{ fontSize: 13, color: "#5c6d8e" }}
                >
                  Value 3
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          {discountType === 20 && (
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
          )}
        </div>
      </div>
    )} */}
  </div>
  )
}

export default BuyXGetY