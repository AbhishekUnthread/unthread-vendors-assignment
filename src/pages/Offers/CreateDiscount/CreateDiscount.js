import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateDiscount.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import ScheduleDiscountCode from "../ScheduleDiscountCode";
import ProductStatusToggle from "../ProductStatusToggle";
import MaximumDiscountUsers from "../MaximumDiscountUsers";
import CustomerEligibility from "../CustomerEligibility";
import ReturnAndExchangeCondition from "../ReturnAndExchangeCondition";
import SearchBorder from "../../../components/SearchBorder/SearchBorder";
import DiscountCombination from "../DiscountCombination";
import TableSearch from "../../../components/TableSearch/TableSearch";
import { SaveFooterTertiary } from "../../../components/SaveFooter/SaveFooter";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import info from "../../../assets/icons/info.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
// ! MATERIAL IMPORTS
import { useFormik } from "formik";
import * as Yup from "yup";

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
// ! MATERIAL ICONS IMPORTS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoHeader from "../../../components/Header/InfoHeader";
import DiscountFormat from "../../../components/DiscountFormat/DiscountFormat";
import MinimumRequirement from "../../../components/DiscountFormat/MinimumRequirement";
import DiscountValue from "../../../components/DiscountFormat/DiscountValue";
import Filters from "../../../components/DiscountFormat/Filters";
import CouponCode from "../../../components/DiscountFormat/CouponCode";
import BuyXGetY from "../../../components/DiscountFormat/BuyXGetY";
import { showError } from "../../../features/snackbar/snackbarAction";

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

const initialQueryFilterState = {
  pageSize: 1,
  pageNo: null,
  totalCount: 0,
};
const queryFilterReducer = (state, action) => {
  if (action.type === "SET_PAGE_NO") {
    return {
      ...state,
      pageNo: +action.pageNo,
    };
  }
  if (action.type === "SET_TOTAL_COUNT") {
    return {
      ...state,
      totalCount: action.totalCount,
    };
  }
  return initialQueryFilterState;
};

const couponCodeSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(40, "Title must not exceed 40 characters"),
  bodyText: Yup.string()
    .required("Body text is required")
    .max(100, "Body text must not exceed 100 characters"),
});

const maximumDiscountValidationSchema = Yup.object().shape({
  limitDiscountNumber: Yup.boolean(),
  limitUsagePerCustomer: Yup.boolean(),
  total: Yup.number().test("is-total-numeric", "required", function (value) {
    if (this.parent.limitDiscountNumber) {
      return Yup.number().required().isValidSync(value);
    }
    return true;
  }),
  perCustomer: Yup.number().test(
    "is-perCustomer-numeric",
    "required",
    function (value) {
      if (this.parent.limitUsagePerCustomer) {
        return Yup.number().required().isValidSync(value);
      }
      return true;
    }
  ),
});

const minimumRequirementValidationSchema = Yup.object().shape({
  requirement: Yup.string()
    .oneOf(["none", "minAmount", "minQuantity"], "Invalid Requirement")
    .required("Requirement is required"),

  value: Yup.number()
    .transform((value, originalValue) => {
      return /^[0-9]*$/.test(originalValue)
        ? parseFloat(originalValue)
        : undefined;
    })
    .typeError("Value must be a number")
    .test("is-value-required", "Value is required", function (value) {
      const { requirement } = this.parent;
      if (requirement === "minAmount" || requirement === "minQuantity") {
        return Yup.number().required().isValidSync(value);
      }
      return true;
    }),
});

const discountFormatSchema = Yup.object().shape({
  discountFormat: Yup.string()
    .oneOf(
      ["automaticDiscount", "discountCouponCode"],
      "Invalid Discount Format"
    )
    .required("Discount Format is required"),
  discountCode: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9]+$/, "Discount Code must be alphanumeric")
    .max(6, "Discount Code cannot exceed 6 characters")
    .required("Discount Code is required"),
});

const discountValidationSchema = Yup.object().shape({
  discountName: Yup.string()
    .trim()
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),
  discountType: Yup.string()
    .oneOf(
      [
        "productDiscount",
        "cartDiscount",
        "freeShiping",
        "buyXGetY",
        "bulkDiscountPricing",
        "",
      ],
      "Invalid Discount Type"
    )
    .required("Discount Type is required"),
  discountFormat: discountFormatSchema,
  minimumRequirement: minimumRequirementValidationSchema,
  returnExchange: Yup.string()
    .oneOf(["allowed", "notAllowed"], "Invalid")
    .required("required"),
  maximumDiscount: maximumDiscountValidationSchema,
  couponCode: couponCodeSchema,
});

const CreateDiscount = () => {
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [checkedDiscount, setCheckedDiscount] = React.useState(true);

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
  const [discountMode, setDiscountMode] = React.useState("giveDiscount");
  const handleDiscountModeChange = (event, newValue) => {
    setDiscountMode(newValue);
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

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const nextPageHandler = () => {
    const { pageNo, totalCount } = queryFilterState;
    if (pageNo + 1 > totalCount) {
      return;
    }
    navigate(`/offers/discounts/edit/${pageNo + 1}`);
  };

  const prevPageHandler = () => {
    const { pageNo } = queryFilterState;
    if (pageNo - 1 === 0) {
      return;
    }
    navigate(`/offers/discounts/edit/${pageNo - 1}`);
  };

  const backHandler = () => {
    navigate("/offers/discounts");
  };

  const formik = useFormik({
    initialValues: {
      discountName: "",
      discountType: "",
      discountFormat: {
        discountFormat: "discountCouponCode",
        discountCode: "",
      },
      minimumRequirement: {
        requirement: null,
        value: "",
      },
      returnExchange: "allowed",
      maximumDiscount: {
        limitDiscountNumber: false,
        limitUsagePerCustomer: false,
        total: null,
        perCustomer: null,
      },
      discountCombination: {
        allowCombineWithOthers: false,
        allowCombineWith: [],
      },
      filters: [
        {
          field: null,
          operator: null,
          fieldValue: null,
        },
      ],
      couponCode: {
        showCouponCode: false,
        title: null,
        bodyText: null,
      },
      customerEligibility: {
        customer: "all",
        value: [],
      },
      discountValue: {
        discountValue: null,
        type: "percentage",
        value: null,
        cartLabel: null,
      },
      buyXGetY: {
        buy: null,
        selectBuyItem: "",
        buyProduct: [],
        get: null,
        selectGetItem: "",
        getProduct: [],
        discountMode: "giveDiscount",
        discountValue: null,
        type: "percentage",
        value: null,
      },
    },
    enableReinitialize: true,
    validationSchema: discountValidationSchema,
    onSubmit: (values) => {},
  });

  const addFilterHandler = () => {
    const newFilter = formik?.values?.filters.concat({
      field: null,
      operator: null,
      fieldValue: null,
    });
    formik.setFieldValue("filters", newFilter);
  };

  const deleteFilterHandler = ({deleteIndex}) => {
    if (formik.values?.filters?.length === 1) {
      dispatch(showError({ message: "At least one filter is required" }));
      return;
    }
    const updatedFilter = formik?.values?.filters.filter(
      (_, index) => index !== deleteIndex
    );
    formik.setFieldValue("filters", updatedFilter);
  };

  // console.log({discountType:formik.values?.filters.field})
  // console.log({discountFormat:formik.values?.discountFormat?.discountFormat})
  // console.log({discountCode:formik.values?.discountFormat?.discountCode})
  // console.log({MinimumRequirement:formik.values?.minimumRequirement?.requirement})
  // console.log({MinimumRequirementValue:formik.values?.minimumRequirement?.value})

  // console.log({discountTypeError:formik?.errors?.discountFormat?.discountType})
  // console.log({discountFormatError:formik?.errors?.discountFormat?.discountFormat})
  // console.log({discountCodeError:formik?.errors?.discountFormat?.discountCode})
  // console.log({
  //   MinimumRequirementValueError: formik?.errors?.minimumRequirement?.value,
  // });
  // console.log({
  //   MinimumRequirementError: formik?.errors?.minimumRequirement?.requirement,
  // });

  return (
    <div className="page container-fluid position-relative">
      <InfoHeader
        title={formik.values.discountName || "Create Discount"}
        onBack={backHandler}
        onPreview={() => {}}
        onPrev={prevPageHandler}
        onNext={nextPageHandler}
        isEdit={false}
      />
      <formik className="offers-form" noValidate onSubmit={formik.handleSubmit}>
        <div className="row">
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
                  <div className="col-md-6 mt-3">
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
                        name="discountName"
                        value={formik.values?.discountName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        autoFocus={true}
                      />
                    </FormControl>
                    {!!formik.touched.discountName &&
                    formik.errors.discountName ? (
                      <Typography variant="caption" color="#F67476">
                        {formik.errors.discountName}
                      </Typography>
                    ) : (
                      <small className="mt-1 text-grey-6 font1">
                        Note: User can't see this, its for your reference
                      </small>
                    )}
                  </div>
                  <div className="col-md-6 mt-3">
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
                        value={formik.values?.discountType}
                        onChange={(event) => {
                          formik.setFieldValue(
                            "discountType",
                            event.target.value
                          );
                        }}
                        onBlur={formik.handleBlur}
                        name={"discountType"}
                        size="small"
                      >
                        <MenuItem
                          value="productDiscount"
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          Product Discount
                        </MenuItem>
                        <MenuItem
                          value="cartDiscount"
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          Cart Discount
                        </MenuItem>
                        <MenuItem
                          value="freeShiping"
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          Free Shipping
                        </MenuItem>
                        <MenuItem
                          value="buyXGetY"
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          Buy X, Get Y
                        </MenuItem>
                        <MenuItem
                          value="bulkDiscountPricing"
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          Bulk/Tiried Discount Pricing
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {!!formik.touched.discountType &&
                    formik.errors.discountType ? (
                      <Typography variant="caption" color="#F67476">
                        {formik.errors.discountType}
                      </Typography>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <DiscountFormat
              value={formik.values?.discountFormat}
              field="discountFormat"
              formik={formik}
              touched={formik?.touched?.discountFormat}
              error={formik?.errors?.discountFormat}
            />
            <DiscountValue
              value={formik.values?.discountValue}
              field="discountValue"
              formik={formik}
              touched={formik?.touched?.discountValue}
              error={formik?.errors?.discountValue}
            />

            <Filters
              value={formik.values?.filters}
              field="filters"
              formik={formik}
              touched={formik?.touched?.filters}
              error={formik?.errors?.filters}
              data={formik.values?.filters}
              onSort={() => {}}
              onDeleteField={deleteFilterHandler}
              onAdd={addFilterHandler}
            />
            {/* <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
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
                          <SearchBorder />
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
                          <SearchBorder />
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
                {discountMode === "giveDiscount" && (
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
                )}
              </div> */}

            <BuyXGetY
              value={formik.values?.buyXGetY}
              field="buyXGetY"
              formik={formik}
              touched={formik?.touched?.buyXGetY}
              error={formik?.errors?.buyXGetY}
            />

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

                <div className="row align-items-center">
                  <div className="col-md-6 discount-inputs-two d-flex align-items-center">
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
              <div className="col-12 px-0 mt-3">
                <small className="text-blue-2 fw-500 c-pointer">
                  + Add More Range
                </small>
              </div>
            </div>

            <CouponCode
              value={formik.values?.couponCode}
              field="couponCode"
              formik={formik}
              touched={formik?.touched?.couponCode}
              error={formik?.errors?.couponCode}
            />
            <MinimumRequirement
              value={formik.values?.minimumRequirement}
              field="minimumRequirement"
              formik={formik}
              touched={formik?.touched?.minimumRequirement}
              error={formik?.errors?.minimumRequirement}
            />
            <CustomerEligibility
              value={formik.values?.customerEligibility}
              field="customerEligibility"
              formik={formik}
              touched={formik?.touched?.customerEligibility}
              error={formik?.errors?.customerEligibility}
            />

            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
              <div className="d-flex col-12 px-0 justify-content-between">
                <div className="d-flex align-items-center">
                  <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                    Limit By Location
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

                <div className="d-flex mt-3">
                  <TableSearch />
                  <button className="button-grey py-2 px-3 ms-2">
                    <small className="text-lightBlue me-2">Browse</small>
                    <img src={arrowDown} alt="arrow" className="" />
                  </button>
                </div>
                <div className="d-flex">
                  <Chip
                    label="Japan"
                    onDelete={handleDelete}
                    size="small"
                    className="mt-3 me-2"
                  />
                  <Chip
                    label="China"
                    onDelete={handleDelete}
                    className="me-2 mt-3"
                    size="small"
                  />
                </div>
              </div>
            </div>
            <ReturnAndExchangeCondition
              sectionHeading={"Return & Exchange Condition"}
              value={formik.values?.returnExchange}
              field="returnExchange"
              formik={formik}
            />
            <MaximumDiscountUsers
              value={formik.values?.maximumDiscount}
              field="maximumDiscount"
              formik={formik}
              touched={formik?.touched?.maximumDiscount}
              error={formik?.errors?.maximumDiscount}
            />
            <DiscountCombination
              value={formik.values?.discountCombination}
              field="discountCombination"
              formik={formik}
            />
            <ScheduleDiscountCode />
          </div>
          <div className="col-lg-3 mt-4 pe-0 ps-0 ps-lg-3">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3">
              <small className="text-grey-6">Summary</small>
              <div className="d-flex align-items-center mt-1">
                <h6 className="text-lightBlue fw-500">
                  {formik.values?.discountName}
                </h6>
                {/* <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer ms-3">
                  <small className="text-black fw-400">Active</small>
                </div> */}
              </div>

              <hr className="hr-grey-6 my-3" />
              <small className="text-grey-6">Product Discount</small>
              <div className="d-flex align-items-center mt-1">
                <small className="text-blue-1 fw-500">
                  • Code&nbsp;&nbsp;|
                </small>
                <h6 className="fw-500 ms-2 me-2 text-lightBlue">
                  {formik.values?.discountFormat?.discountCode}
                </h6>

                <Tooltip title="Copy" placement="top">
                  <ContentCopyIcon
                    sx={{
                      color: "#5c6d8e",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </div>

              <hr className="hr-grey-6 my-3" />
              <p className="text-lightBlue">Filters</p>
              <div className="d-flex align-items-center mt-1">
                <small className="text-blue-1 fw-500">
                  • Discount applies to Categroy equals to Ring, Earring,
                  Necklace
                </small>
              </div>
              <hr className="hr-grey-6 my-3" />
              <p className="text-lightBlue">Discount</p>
              <div className="d-flex align-items-center mt-1">
                <small className="text-blue-1 fw-500">
                  • 50% off on Making charges
                </small>
              </div>
              <hr className="hr-grey-6 my-3" />
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
              <hr className="hr-grey-6 my-3" />
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
        <SaveFooterTertiary show={true} onDiscard={backHandler} />
      </formik>
    </div>
  );
};

export default CreateDiscount;
