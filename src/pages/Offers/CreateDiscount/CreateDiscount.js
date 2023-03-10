import React from "react";
import "./CreateDiscount.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppCountrySelect from "../../../components/AppCountrySelect/AppCountrySelect";
import AppStateSelect from "../../../components/AppStateSelect/AppStateSelect";
import AppMobileCodeSelect from "../../../components/AppMobileCodeSelect/AppMobileCodeSelect";
import UploadMediaBox from "../../../components/UploadMediaBox/UploadMediaBox";
import NotesBox from "../../../components/NotesBox/NotesBox";
import TagsBox from "../../../components/TagsBox/TagsBox";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import archivedGrey from "../../../assets/icons/archivedGrey.svg";
import editGrey from "../../../assets/icons/editGrey.svg";
import addUserUpload from "../../../assets/images/users/addUserUpload.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import info from "../../../assets/icons/info.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
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
  ToggleButtonGroup,
  ToggleButton,
  RadioGroup,
  Radio,
  Popover,
} from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ScheduleDiscountCode from "../ScheduleDiscountCode";
import ProductStatusToggle from "../ProductStatusToggle";
import MaximumDiscountUsers from "../MaximumDiscountUsers";
import CustomerEligibility from "../CustomerEligibility";
import ReturnAndExchangeCondition from "../ReturnAndExchangeCondition";

const taggedWithData = [
  { title: "Tag 1", value: "tag1" },
  { title: "Tag 2", value: "tag2" },
  { title: "Tag 3", value: "tag3" },
  { title: "Tag 4", value: "tag4" },
  { title: "Tag 5", value: "tag5" },
  { title: "Tag 6", value: "tag6" },
  { title: "Tag 7", value: "tag7" },
  { title: "Tag 8", value: "tag8" },
  { title: "Tag 9", value: "tag9" },
  { title: "Tag 10", value: "tag10" },
  { title: "Tag 11", value: "tag11" },
  { title: "Tag 12", value: "tag12" },
];

const CreateDiscount = () => {
  // ? GENDER SELECT STARTS HERE
  const [gender, setGender] = React.useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  // ? GENDER SELECT ENDS HERE

  // ? TOGGLE BUTTONS STARTS HERE
  const [productStatus, setPoductStatus] = React.useState("active");
  const handleProductStatus = (event, newProductStatus) => {
    setPoductStatus(newProductStatus);
  };
  // ? TOGGLE BUTTONS ENDS HERE

  // ? USER ROLE SELECT STARTS HERE
  const [discountType, setDiscountType] = React.useState("");

  const handleDiscountType = (event) => {
    setDiscountType(event.target.value);
  };
  // ? USER ROLE SELECT ENDS HERE

  // ? DISCOUNT FORMAT SELECT STARTS HERE
  const [discountFormat, setDiscountFormat] = React.useState("");

  const handleDiscountFormatChange = (event) => {
    setDiscountFormat(event.target.value);
  };
  // ? DISCOUNT FORMAT SELECT ENDS HERE

  // ? FIELD SELECT STARTS HERE
  const [field, setField] = React.useState("");

  const handleFieldChange = (event) => {
    setField(event.target.value);
  };
  // ? FIELD SELECT ENDS HERE

  // ? OPERATOR SELECT STARTS HERE
  const [operator, setOperator] = React.useState("");

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };
  // ? OPERATOR SELECT ENDS HERE

  // ? ITEM SELECT STARTS HERE
  const [item, setItem] = React.useState("");

  const handleItemChange = (event) => {
    setItem(event.target.value);
  };
  // ? ITEM SELECT ENDS HERE

  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

  // ? CHECKBOX STARTS HERE
  const [checkedDiscount, setCheckedDiscount] = React.useState(false);

  const handleDiscountCheckboxChange = (event) => {
    setCheckedDiscount(event.target.checked);
  };

  // ? CHECKBOX ENDS HERE

  // ? RADIO STARTS HERE
  const [minimumRequirement, setminimumRequirement] = React.useState(0);
  const handleMinimumRequirementChange = (event, newValue) => {
    setminimumRequirement(newValue);
  };

  const [limitByLocation, setLimitByLocation] = React.useState("");
  const handleLimitByLocationChange = (event, newValue) => {
    setLimitByLocation(newValue);
  };
  // ? RADIO ENDS HERE

  // * DISCOUNT PERCENT POPOVERS STARTS
  const [anchorDiscountPercentEl, setAnchorDiscountPercentEl] =
    React.useState(null);
  const handleDiscountPercent = (event) => {
    setAnchorDiscountPercentEl(event.currentTarget);
  };
  const handleDiscountPercentClose = () => {
    setAnchorDiscountPercentEl(null);
  };
  const openDiscountPercent = Boolean(anchorDiscountPercentEl);
  const idDiscountPercent = openDiscountPercent ? "simple-popover" : undefined;
  // * DICOUNT PERCENT POPOVERS ENDS

  return (
    <div className="page container-fluid position-relative">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/offers/discounts" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <h5 className="page-heading ms-2 ps-1">Create Bundle Discounts</h5>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
          <img
            src={paginationLeft}
            alt="paginationLeft"
            className="c-pointer"
            width={30}
          />
          <img
            src={paginationRight}
            alt="paginationRight"
            className="c-pointer"
            width={30}
          />
        </div>
      </div>
      <div className="row ">
        <div className="col-lg-9 mt-4">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Discount Info
                </h6>
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" />
            <div className="col-12 px-0">
              <div className="row align-items-start">
                <div className="col-md-8 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Name of the Discount</p>
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
                      placeholder="Enter Discount Name"
                      size="small"
                    />
                  </FormControl>

                  <small className="mt-1 text-grey-6 font1">
                    Note: User can't see this, its for your reference
                  </small>
                </div>
                <div className="col-md-4 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Status</p>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className="ms-2 c-pointer"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>

                  <ProductStatusToggle />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Discount Format
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
            <div className="col-12 px-0">
              <div className="row">
                <div className="col-md-12 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Discount Type</p>
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
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={discountType}
                      onChange={handleDiscountType}
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
                        Product Discount
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Cart Discount
                      </MenuItem>
                      <MenuItem
                        value={30}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Free Shipping
                      </MenuItem>
                      <MenuItem
                        value={40}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Buy X, Get Y
                      </MenuItem>
                      <MenuItem
                        value={50}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Bulk/Tiried Discount Pricing
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-5 mt-3">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Select Discount Format</p>
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
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={discountFormat}
                      onChange={handleDiscountFormatChange}
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
                        Automatic Discount
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Discount Coupon Code
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-7 mt-3 discount-gradient-inputs">
                  <div className="d-flex mb-1">
                    <p className="text-lightBlue">Type Discount Code</p>
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
                      placeholder="Enter Discount Code"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">
                          Generate Code
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <small className="mt-1 text-grey-6 font1">
                    User will have to enter in coupons to avail Discount
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Filters
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
            <div className="col-12 px-0">
              <div className="row">
                <div className="col-md-3 mt-3">
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
                        All Products
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Category
                      </MenuItem>
                      <MenuItem
                        value={30}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Sub Category
                      </MenuItem>
                      <MenuItem
                        value={40}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Collection
                      </MenuItem>
                      <MenuItem
                        value={50}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Vendor Name
                      </MenuItem>
                      <MenuItem
                        value={60}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Attributes
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-3 mt-3">
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
                  <FormControl
                    sx={{ m: 0, minWidth: 120, width: "100%" }}
                    size="small"
                  >
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={operator}
                      onChange={handleOperatorChange}
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
                        Equal to
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{ fontSize: 13, color: "#5c6d8e" }}
                      >
                        Not Equal to
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-6 mt-3">
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
                    options={taggedWithData}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
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
                        <small className="text-lightBlue">{option.title}</small>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        placeholder="Search"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <small className="text-blue-2">+ Add More Filter</small>
                </div>
              </div>
            </div>
          </div>

          {(discountType === 10 || discountType === 20) && (
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
              <div className="d-flex col-12 px-0 justify-content-between">
                <div className="d-flex align-items-center">
                  <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                    Discount
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
              <div className="col-12 px-0">
                <div className="row mt-3">
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
                <div className="row">
                  <div className="col-md-4 discount-inputs">
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
                            Percentage
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
                        <div className="py-2 px-1">
                          <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                            Percentage Discount
                          </small>
                          <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                            Fixed Amount
                          </small>
                        </div>
                      </div>
                    </Popover>
                  </div>
                  <div className="col-md-2 text-center">
                    <p className="text-lightBlue">on</p>
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      sx={{ m: 0, minWidth: 120, width: "100%" }}
                      size="small"
                    >
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        // value={field}
                        // onChange={handleFieldChange}
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
                        {/* <Tooltip title="Lorem ipsum" placement="top">
                        <img
                          src={info}
                          alt="info"
                          className="ms-2 c-pointer"
                          width={13.5}
                        />
                      </Tooltip> */}
                      </div>
                      <FormControl className="px-0 w-100">
                        <OutlinedInput placeholder="Enter Label" size="small" />
                      </FormControl>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {discountType === 40 && (
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
              <div className="d-flex col-12 px-0 justify-content-between">
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
              <hr className="hr-grey-6 mt-3 mb-0" />
              <div className="col-12 px-0 mb-3">
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
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={item}
                        onChange={handleItemChange}
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
                    <TableSearch />
                  </div>
                </div>
              </div>
              <div className="d-flex col-12 px-0 justify-content-between">
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
              <hr className="hr-grey-6 mt-3 mb-0" />
              <div className="col-12 px-0 mb-3">
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
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={item}
                        onChange={handleItemChange}
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
                    <TableSearch />
                  </div>
                </div>
              </div>

              <div className="col-12 d-flex px-0 mt-2">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    row
                    // value={returnAndExchangeCondition}
                    // onChange={handleReturnAndExchangeConditionChange}
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

              <div className="col-12 px-0">
                <div className="row mt-3">
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
                <div className="row">
                  <div className="col-md-4 discount-inputs">
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
                            Percentage
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
                        <div className="py-2 px-1">
                          <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                            Percentage Discount
                          </small>
                          <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                            Fixed Amount
                          </small>
                        </div>
                      </div>
                    </Popover>
                  </div>
                  <div className="col-md-2 text-center">
                    <p className="text-lightBlue">on</p>
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      sx={{ m: 0, minWidth: 120, width: "100%" }}
                      size="small"
                    >
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        // value={field}
                        // onChange={handleFieldChange}
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
                </div>
              </div>
            </div>
          )}
          {discountType === 50 && (
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
              <div className="d-flex col-12 px-0 justify-content-between">
                <div className="d-flex align-items-center">
                  <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                    Discount
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
              <div className="col-md-2 col-6 mt-3 ps-0">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue">Min Qty.</p>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className="ms-2 c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>
                <FormControl className="px-0">
                  <OutlinedInput placeholder="Enter Min Qty" size="small" />
                </FormControl>
              </div>
              <div className="col-md-2 col-6 mt-3 ">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue">Max Qty.</p>
                  <Tooltip title="Lorem ipsum" placement="top">
                    <img
                      src={info}
                      alt="info"
                      className="ms-2 c-pointer"
                      width={13.5}
                    />
                  </Tooltip>
                </div>
                <FormControl className="px-0">
                  <OutlinedInput placeholder="Enter Max Qty" size="small" />
                </FormControl>
              </div>
              <div className="col-md-8 pe-0 ps-0 ps-md-3">
                <div className="row mt-3">
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
                <div className="row">
                  <div className="col-6 discount-inputs">
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
                            Percentage
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
                        <div className="py-2 px-1">
                          <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                            Percentage Discount
                          </small>
                          <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
                            Fixed Amount
                          </small>
                        </div>
                      </div>
                    </Popover>
                  </div>
                  <div className="col-2 text-center">
                    <p className="text-lightBlue">on</p>
                  </div>
                  <div className="col-4">
                    <FormControl
                      sx={{ m: 0, minWidth: 120, width: "100%" }}
                      size="small"
                    >
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        // value={field}
                        // onChange={handleFieldChange}
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
                </div>
              </div>
              <div className="col-12 px-0 mt-3">
                <p className="text-blue-2">+ Add more range</p>
              </div>
            </div>
          )}
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Limit By Location
                </h6>
                {/* <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip> */}
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" />
            <div className="col-12 d-flex flex-column px-0 mt-2">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={limitByLocation}
                  onChange={handleLimitByLocationChange}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio size="small" />}
                    label="Don't Limit"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        // color: "#5C6D8E",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="moreCountry"
                    control={<Radio size="small" />}
                    label="Limit use to one or more country"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        // color: "#5C6D8E",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="moreState"
                    control={<Radio size="small" />}
                    label="Limit use to one or more state"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        // color: "#5C6D8E",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="morePostalCode"
                    control={<Radio size="small" />}
                    label="Limit use to one or more Zip Codes or Postal Codes"
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
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="d-flex col-12 px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                  Minimum Requirement
                </h6>
                {/* <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className="ms-2 c-pointer"
                    width={13.5}
                  />
                </Tooltip> */}
              </div>
            </div>
            <hr className="hr-grey-6 mt-3 mb-0" />
            <div className="col-12 d-flex flex-column px-0 mt-2">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={minimumRequirement}
                  onChange={handleMinimumRequirementChange}
                >
                  <FormControlLabel
                    value="none"
                    control={<Radio size="small" />}
                    label="None"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        // color: "#5C6D8E",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="minAmount"
                    control={<Radio size="small" />}
                    label="Minimum Amount Purchased"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        // color: "#5C6D8E",
                      },
                    }}
                  />

                  {minimumRequirement === "minAmount" && (
                    <div className="discount-inputs ps-4 ms-1">
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
                      <FormControl className="px-0">
                        <OutlinedInput placeholder="Enter Value" size="small" />
                      </FormControl>
                    </div>
                  )}
                  <FormControlLabel
                    value="minQuantity"
                    control={<Radio size="small" />}
                    label="Minimum Quantity of Items"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                        // color: "#5C6D8E",
                      },
                    }}
                  />

                  {minimumRequirement === "minQuantity" && (
                    <div className="discount-inputs ps-4 ms-1">
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
                      <FormControl className="px-0">
                        <OutlinedInput placeholder="Enter Value" size="small" />
                      </FormControl>
                    </div>
                  )}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <CustomerEligibility />
          <ReturnAndExchangeCondition />
          <MaximumDiscountUsers />
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedDiscount}
                  onChange={handleDiscountCheckboxChange}
                  inputProps={{ "aria-label": "controlled" }}
                  size="small"
                  style={{
                    color: "#5C6D8E",
                    marginRight: 0,
                    width: "auto",
                  }}
                />
              }
              label="Allow Discount to be combined with other discounts"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "0.875rem",
                  color: "#c8d8ff",
                  // color: "#5c6d8e",
                },
              }}
              className="px-0"
            />
            {checkedDiscount && (
              <div className="d-flex flex-column ps-4 mt-3">
                <p className="text-blue-1 mb-2">
                  This discount can be combined with
                </p>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                        width: "auto",
                      }}
                    />
                  }
                  label="Product Discount"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.75rem",
                      color: "#c8d8ff",
                      // color: "#5c6d8e",
                    },
                  }}
                  className="px-0"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                        width: "auto",
                      }}
                    />
                  }
                  label="Cart Discount"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.75rem",
                      color: "#c8d8ff",
                      // color: "#5c6d8e",
                    },
                  }}
                  className="px-0"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                        width: "auto",
                      }}
                    />
                  }
                  label="Free Shipping"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.75rem",
                      color: "#c8d8ff",
                      // color: "#5c6d8e",
                    },
                  }}
                  className="px-0"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                        width: "auto",
                      }}
                    />
                  }
                  label="Buy X, Get Y"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.75rem",
                      color: "#c8d8ff",
                      // color: "#5c6d8e",
                    },
                  }}
                  className="px-0"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                        width: "auto",
                      }}
                    />
                  }
                  label="Bulk/Tiered Discount"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.75rem",
                      color: "#c8d8ff",
                      // color: "#5c6d8e",
                    },
                  }}
                  className="px-0"
                />
              </div>
            )}
          </div>
          <ScheduleDiscountCode />
        </div>
        <div className="col-lg-3 mt-4 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <small className="text-grey-6">Summary</small>
            <div className="d-flex align-items-center mt-1">
              <h6 className="text-lightBlue fw-500">"Discount Name"</h6>
              <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer ms-3">
                <small className="text-black fw-400">Active</small>
              </div>
            </div>

            <hr className="hr-grey-6 my-2" />
            <small className="text-grey-6">Product Discount</small>
            <div className="d-flex align-items-center mt-1">
              <small className="text-blue-1 fw-500">• Code&nbsp;&nbsp;|</small>
              <h6 className="fw-500 ms-2 me-2 text-lightBlue">JWL20OFF</h6>
              <ContentCopyIcon
                sx={{
                  color: "#5c6d8e",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              />
            </div>

            <hr className="hr-grey-6 my-2" />
            <p className="text-lightBlue">Filters</p>
            <div className="d-flex align-items-center mt-1">
              <small className="text-blue-1 fw-500">
                • Discount applies to Categroy equals to Ring, Earring, Necklace
              </small>
            </div>
            <hr className="hr-grey-6 my-2" />
            <p className="text-lightBlue">Discount</p>
            <div className="d-flex align-items-center mt-1">
              <small className="text-blue-1 fw-500">
                • 50% off on Making charges
              </small>
            </div>
            <hr className="hr-grey-6 my-2" />
            <p className="text-lightBlue">Condition</p>
            <div className="d-flex mt-1 flex-column">
              <small className="text-blue-1 fw-500 d-block">
                Apply Discount only if
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Order Amount is equal to ₹ 25,000
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Quantity is equal to 2
              </small>
            </div>
            <hr className="hr-grey-6 my-2" />
            <p className="text-lightBlue">Details</p>
            <div className="d-flex mt-1 flex-column">
              <small className="text-blue-1 fw-500 d-block">
                Returns & Exchange not allowed
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Unlimited uses
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Activated tomorrow
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="row bottom-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link to="/offers/discounts" className="button-red-outline py-2 px-4">
            <p>Discard</p>
          </Link>

          <Link
            to="/offers/discounts"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/offers/discounts"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/offers/discounts"
            className="button-gradient py-2 px-4 w-auto ms-3"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateDiscount;
