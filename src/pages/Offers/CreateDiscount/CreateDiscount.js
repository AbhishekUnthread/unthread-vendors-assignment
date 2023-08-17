import React, { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import moment from "moment";
import _ from "lodash";

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
import {
  showError,
  showSuccess,
} from "../../../features/snackbar/snackbarAction";
import DiscountRange from "../../../components/DiscountFormat/DiscountRange";
import {
  useCreateDiscountMutation,
  useEditDiscountMutation,
  useGetAllDiscountsQuery,
} from "../../../features/offers/discounts/discountsApiSlice";
import LimitByLocation from "../../../components/DiscountFormat/LimitByLocation";
import { useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";

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
  limitDiscountNumber: Yup.boolean().optional(),
  limitUsagePerCustomer: Yup.boolean().optional(),
  total: Yup.number().when(
    ["limitDiscountNumber"],
    ([limitDiscountNumber], schema) => {
      return limitDiscountNumber
        ? schema
            .required("required")
            .min(1, "Minimum quantity must be at least 1")
        : schema;
    }
  ),
  perCustomer: Yup.number().when(
    ["limitUsagePerCustomer", "total", "limitDiscountNumber"],
    ([limitUsagePerCustomer, total, limitDiscountNumber], schema) => {
      return limitUsagePerCustomer
        ? schema
            .required("required")
            .max(
              Yup.ref("total"),
              "Maximum quantity must be greater than or equal to the total quantity"
            )
        : schema;
    }
  ),
});

// const minimumRequirementValidationSchema = Yup.object().shape({
//   requirement: Yup.string()
//     .oneOf(["none", "minAmount", "minQuantity"], "Invalid Requirement")
//     .required("Requirement is required"),

//   value: Yup.number()
//     .transform((value, originalValue) => {
//       return /^[0-9]*$/.test(originalValue)
//         ? parseFloat(originalValue)
//         : undefined;
//     })
//     .typeError("Value must be a number")
//     .test("is-value-required", "Value is required", function (value) {
//       const { requirement } = this.parent;
//       if (requirement === "minAmount" || requirement === "minQuantity") {
//         return Yup.number().required().isValidSync(value);
//       }
//       return true;
//     }),
// });

const minimumRequirementValidationSchema = Yup.object().shape({
  requirement: Yup.string(),
  value: Yup.number().when(["requirement"], ([requirement], schema) => {
    return requirement === "amount" || requirement === "quantity"
      ? schema.required("required")
      : schema;
  }),
});

const discountFormatSchema = Yup.object().shape({
  discountFormat: Yup.string().oneOf(
    ["automatic", "code"],
    "Invalid Discount Format"
  ),
  discountCode: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9]+$/, "Discount Code must be alphanumeric")
    // .max(6, "Discount Code cannot exceed 6 characters")
    .required("Discount Code is required"),
});

const filterSchema = Yup.object().shape({
  field: Yup.string().required("Field is required"),
  operator: Yup.string().when(["field"], ([field], schema) => {
    return field === "allProducts" ? schema : schema.required("required");
  }),
  fieldValue: Yup.array().when(["field"], ([field], schema) => {
    return field === "allProducts" ? schema : schema.required("required");
  }),
});

const buyxGetySchema = Yup.object().shape({
  buy: Yup.string().required("Buy value is required"),
  selectBuyItem: Yup.string().required("Select buy item is required"),
  buyProduct: Yup.array().required("Buy product is required"),
  get: Yup.number().required("Get value is required"),
  selectGetItem: Yup.string().required("Select get item is required"),
  getProduct: Yup.array().required("Get product is required"),
  discountMode: Yup.string()
    .oneOf(["giveDiscount", "free"])
    .required("Discount mode is required"),

  discountValue: Yup.number().when(
    ["discountMode"],
    ([discountMode], schema) => {
      return discountMode === "giveDiscount"
        ? schema.required("required")
        : schema;
    }
  ),

  type: Yup.string(),
  value: Yup.string().when(["discountMode"], ([discountMode], schema) => {
    return discountMode === "giveDiscount"
      ? schema.required("required")
      : schema;
  }),
});

const scheduleDateSchema = Yup.object().shape({
  startDateTime: Yup.date().required("Start date and time is required"),
  endDateTime: Yup.date().when(["neverExpire"], ([neverExpire], schema) => {
    return neverExpire ? schema : schema.required("required");
  }),
  neverExpire: Yup.boolean(),
});

const discountValueSchema = Yup.object().shape({
  discountValue: Yup.number().required("Discount value is required"),
  type: Yup.string()
    .oneOf(["percentage", "fixed"])
    .required("Type must be percentage or fixed"),
  value: Yup.string().required("Value is required"),
  // cartLabel: Yup.string().when(['discountType'], ([discountType], schema) => {
  //   if (discountType === 'cartDiscount') {
  //     return schema.required('Cart label is required');
  //   }
  //   return schema;b
  // }),
});

const customerEligibilitySchema = Yup.object().shape({
  customer: Yup.string()
    .required("required")
    .oneOf(["specificCustomers", "customerGroups", "allCustomers"]),
  specificCustomers: Yup.array().when(["customer"], ([customer], schema) => {
    return customer === "specificCustomers"
      ? schema.required("required").min(1, "At least one value is required")
      : schema;
  }),
  customerGroups: Yup.array().when(["customer"], ([customer], schema) => {
    return customer === "customerGroups"
      ? schema.required("required").min(1, "At least one value is required")
      : schema;
  }),
});

const discountRangeValidationSchema = Yup.object().shape({
  minQty: Yup.number()
    .required("Minimum quantity is required")
    .min(0, "Minimum quantity must be at least 0"),
  maxQty: Yup.number()
    .required("Maximum quantity is required")
    .min(
      Yup.ref("minQty"),
      "Maximum quantity must be greater than or equal to the minimum quantity"
    ),
  discountValue: Yup.number().required("Discount value is required"),
  type: Yup.string()
    .required("Type is required")
    .oneOf(
      ["fixed", "percentage"],
      "Type must be either 'fixed' or 'percentage'"
    ),
  value: Yup.string().required("Value is required"),
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
        "freeShipping",
        "buyxGety",
        "bulk",
        "",
      ],
      "Invalid Discount Type"
    )
    .required("Discount Type is required"),
  discountFormat: discountFormatSchema,
  minimumRequirement: minimumRequirementValidationSchema,
  filters: Yup.mixed().when(["discountType"], ([discountType], schema) => {
    if (discountType !== "buyxGety") {
      return Yup.array().of(filterSchema);
    }
    return schema;
  }),
  returnExchange: Yup.string()
    .oneOf(["allowed", "notAllowed"], "Invalid")
    .required("required"),
  maximumDiscount: maximumDiscountValidationSchema,
  scheduledDiscount: scheduleDateSchema,
  discountValue: Yup.mixed().when(
    ["discountType"],
    ([discountType], schema) => {
      if (
        discountType !== "buyxGety" &&
        discountType !== "freeShipping" &&
        discountType !== "bulk"
      ) {
        return discountValueSchema;
      }
      return schema;
    }
  ),
  buyXGetY: Yup.mixed().when(["discountType"], ([discountType], schema) => {
    if (discountType === "buyxGety") {
      return buyxGetySchema.required("Buy X Get Y details are required");
    }
    return schema;
  }),
  customerEligibility: customerEligibilitySchema,
  discountRange: Yup.mixed().when(
    ["discountType"],
    ([discountType], schema) => {
      if (discountType === "bulk") {
        return Yup.array().of(discountRangeValidationSchema);
      }
      return schema;
    }
  ),

  // couponCode: couponCodeSchema,
});
const initialDiscountsState = {
  data: [],
  totalCount: 0,
  discountType: 0,
  isEditing: false,
  edited: false,
};
const discountsReducer = (state, action) => {
  if (action.type === "SET_DATA") {
    return {
      ...state,
      data: action.data,
      totalCount: action.totalCount,
    };
  }
  if (action.type === "SET_DISCOUNT_TYPE") {
    return {
      ...state,
      discountType: action.discountType,
    };
  }
  if (action.type === "ENABLE_EDIT") {
    return {
      ...state,
      isEditing: true,
    };
  }
  if (action.type === "DISABLE_EDIT") {
    return {
      ...state,
      isEditing: false,
    };
  }
  if (action.type === "EDITED_ENABLE") {
    return {
      ...state,
      edited: true,
    };
  }
  if (action.type === "EDITED_DISABLE") {
    return {
      ...state,
      edited: false,
    };
  }
  return initialDiscountsState;
};
const CreateDiscount = () => {
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [discountsState, dispatchDiscounts] = useReducer(
    discountsReducer,
    initialDiscountsState
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [decodedObject, setDecodedObject] = useState(null);
  const [copied, setCopied] = useState(false);
  let { id } = useParams();

  const [
    createDiscount,
    {
      isLoading: createDiscountIsLoading,
      isSuccess: createDiscountIsSuccess,
      error: createDiscountError,
    },
  ] = useCreateDiscountMutation();

  const {
    data: discountsData,
    isLoading: discountsIsLoading,
    isSuccess: discountsIsSuccess,
    error: discountsError,
    isError: discountsIsError,
  } = useGetAllDiscountsQuery(
    {
      id: id,
      alphabetical: decodedObject?.alphabetical,
      createdAt: decodedObject?.createdAt,
      name: decodedObject?.name,
      status: decodedObject?.status,
    },
    { skip: location.pathname === "/offers/discounts/create" }
  );

  const [
    editDiscount,
    {
      isLoading: editDicountIsLoading,
      isSuccess: editDicountIsSuccess,
      error: editDicountError,
      isError: editDicountIsError,
    },
  ] = useEditDiscountMutation();

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
    navigate({
      pathname: "/offers/discounts",
      search: `?${createSearchParams({ filter: searchParams.get("filter") })}`,
    });
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const formik = useFormik({
    initialValues: {
      discountName: discountsData?.data?.data[0].name || "",
      discountType:
        searchParams.get("discountType") ||
        discountsData?.data?.data[0]?.mainDiscount?.type ||
        "",
      discountFormat: {
        discountFormat:
          discountsData?.data.data[0].mainDiscount.format || "code",
        discountCode:
          discountsData?.data.data[0].mainDiscount.discountCode ||
          discountsData?.data.data[0].mainDiscount.discountName ||
          "",
      },
      minimumRequirement: {
        requirement:
          discountsData?.data.data[0].minimumRequirement.requirementType ||
          "none",
        value:
          discountsData?.data.data[0].minimumRequirement?.amount ||
          discountsData?.data.data[0].minimumRequirement?.quantity ||
          "",
      },
      returnExchange: "allowed",
      maximumDiscount: {
        limitDiscountNumber:
          discountsData?.data.data[0].maximumDiscountUse?.limitDiscountNumber ||
          false,
        limitUsagePerCustomer:
          discountsData?.data.data[0].maximumDiscountUse
            ?.limitUsagePerCustomer || false,
        total: discountsData?.data.data[0].maximumDiscountUse?.total || "",
        perCustomer:
          discountsData?.data.data[0].maximumDiscountUse?.perCustomer || "",
      },
      discountCombination: {
        allowCombineWithOthers:
          discountsData?.data.data[0].allowCombineWithOthers || false,
        allowCombineWith: discountsData?.data.data[0].allowCombineWith || [],
      },
      filters: [
        {
          field: "",
          operator: "",
          fieldValue: null,
          dropDownData: [],
        },
      ],
      couponCode: {
        showCouponCode: false,
        title: null,
        bodyText: null,
      },
      customerEligibility: {
        customer:
          discountsData?.data?.data[0]?.eligibility?.eligibilityType ||
          "allCustomers",
        customerGroups: [],
        specificCustomers: [],
      },
      discountValue: {
        discountValue: discountsData?.data?.data[0]?.mainDiscount?.value || "",
        type: discountsData?.data?.data[0]?.mainDiscount?.unit || "percentage",
        value: discountsData?.data?.data[0]?.mainDiscount?.discountOn || "",
        cartLabel: discountsData?.data?.data[0]?.mainDiscount?.cartLabel || "",
      },
      buyXGetY: {
        buy: "",
        selectBuyItem: "",
        buyProduct: [],
        get: "",
        selectGetItem: "",
        getProduct: [],
        discountMode: "giveDiscount",
        discountValue: "",
        type: "percentage",
        value: "",
      },
      discountRange: [
        {
          minQty: null,
          maxQty: null,
          discountValue: null,
          type: "percentage",
          value: null,
        },
      ],
      limitByLocation: {
        locationType: "none",
        location: "",
      },
      scheduledDiscount: {
        startDateTime:
          discountsData?.data?.data[0]?.scheduledDiscount?.startDateTime || "",
        endDateTime:
          discountsData?.data?.data[0]?.scheduledDiscount?.endDateTime || "",
        neverExpire:
          discountsData?.data?.data[0]?.scheduledDiscount?.neverExpire || false,
      },
    },
    enableReinitialize: true,
    validationSchema: discountValidationSchema,
    onSubmit: (values) => {
      dispatchDiscounts({ type: "EDITED_DISABLE" });
      const test = {
        name: values?.discountName,
        status: "active",
        mainDiscount: {
          type: values?.discountType,
          format: values?.discountFormat?.discountFormat,
          ...(values?.discountType === "cartDiscount" ||
          values?.discountType === "productDiscount" ||
          values?.discountType === "buyxGety"
            ? {
                value:
                  values?.discountValue?.discountValue ||
                  values?.buyXGetY?.discountValue,
                discountOn:
                  values?.discountValue?.value || values?.buyXGetY?.value,
                unit: values?.discountValue?.type || values?.buyXGetY?.type,
              }
            : {}),
          ...(values?.discountFormat?.discountFormat === "code"
            ? { discountCode: values?.discountFormat?.discountCode }
            : { discountName: values?.discountFormat?.discountCode }),
          ...(values?.discountType === "cartDiscount"
            ? { cartLabel: values?.discountValue?.cartLabel }
            : {}),

          ...(values?.discountType !== "buyxGety"
            ? values?.filters[0]?.field !== "allProducts"
              ? {
                  filter: values?.filters.map((filter) => ({
                    type: filter?.field,
                    operator: filter?.operator,
                    value: filter?.fieldValue.map((item, index) => item?._id),
                  })),
                }
              : {
                  filter: values?.filters.map((filter) => ({
                    type: filter?.field,
                  })),
                }
            : {}),

          ...(values?.discountType === "buyxGety"
            ? {
                discountLabelType: values?.buyXGetY?.discountMode,
                buyField: {
                  quantity: values?.buyXGetY?.buy,
                  selectItem: values?.buyXGetY?.selectBuyItem,
                  selectItemValue: values?.buyXGetY?.buyProduct.map(
                    (item, index) => item?._id
                  ),
                },
                getField: {
                  quantity: values?.buyXGetY?.get,
                  selectItem: values?.buyXGetY?.selectGetItem,
                  selectItemValue: values?.buyXGetY?.getProduct.map(
                    (item, index) => item?._id
                  ),
                },
              }
            : {}),
          ...(values?.discountType === "bulk"
            ? {
                rangeDiscount: values?.discountRange.map((discount) => ({
                  value: discount?.discountValue,
                  unit: discount?.type,
                  minQty: discount?.minQty,
                  maxQty: discount?.maxQty,
                  discountOn: discount?.value,
                })),
              }
            : {}),
        },
        minimumRequirement: {
          requirementType: values?.minimumRequirement?.requirement,
          ...(values?.minimumRequirement?.requirement === "amount"
            ? { amount: values?.minimumRequirement?.value }
            : values?.minimumRequirement?.requirement === "quantity"
            ? { quantity: values?.minimumRequirement?.value }
            : {}),
        },
        eligibility: {
          eligibilityType: values?.customerEligibility?.customer,
          ...(values?.customerEligibility?.customer === "allCustomers"
            ? { allCustomers: true }
            : values?.customerEligibility?.customer === "specificCustomers"
            ? {
                specificCustomers:
                  values?.customerEligibility?.specificCustomers.map(
                    (item, index) => item?._id
                  ),
              }
            : values?.customerEligibility?.customer === "customerGroups"
            ? {
                customerGroups: values?.customerEligibility?.customerGroups.map(
                  (item, index) => item?._id
                ),
              }
            : {}),
        },
        maximumDiscountUse: {
          ...(values?.maximumDiscount?.limitDiscountNumber === true &&
          values?.maximumDiscount?.limitUsagePerCustomer === true
            ? {
                total: values?.maximumDiscount?.total,
                perCustomer: values?.maximumDiscount?.perCustomer,
              }
            : values?.maximumDiscount?.limitDiscountNumber === true
            ? { total: values?.maximumDiscount?.total }
            : values?.maximumDiscount?.limitUsagePerCustomer === true
            ? { perCustomer: values?.maximumDiscount?.perCustomer }
            : { isUnlimited: true }),
        },
        returnExchangeCondition: values?.returnExchange,
        allowCombineWithOthers:
          values?.discountCombination?.allowCombineWithOthers,
        ...(values?.discountCombination?.allowCombineWithOthers === true
          ? { allowCombineWith: values?.discountCombination?.allowCombineWith }
          : {}),
        limitByLocation: {
          locationType: values?.limitByLocation?.locationType,
          ...(values?.limitByLocation?.locationType === "country"
            ? {
                country: values?.limitByLocation?.location.map(
                  (item, index) => item?._id
                ),
              }
            : values?.limitByLocation?.locationType === "state"
            ? {
                state: values?.limitByLocation?.location.map(
                  (item, index) => item?._id
                ),
              }
            : values?.limitByLocation?.locationType === "zip"
            ? {
                customerGroups: values?.limitByLocation?.location.map(
                  (item, index) => item?._id
                ),
              }
            : {}),
        },
        scheduledDiscount: {
          startDateTime: moment(
            values?.scheduledDiscount?.startDateTime
          ).format("YYYY-MM-DDTHH:mm:ss[Z]"),
          ...(values?.scheduledDiscount?.neverExpire
            ? { neverExpire: values?.scheduledDiscount?.neverExpire }
            : {
                endDateTime: moment(
                  values?.scheduledDiscount?.endDateTime
                ).format("YYYY-MM-DDTHH:mm:ss[Z]"),
              }),
        },
      };
      if (id) {
        editDiscount({
          id: discountsData?.data?.data[0]._id,
          details: test,
        })
          .unwrap()
          .then(() => {
            dispatchDiscounts({ type: "DISABLE_EDIT" });
            dispatch(showSuccess({ message: "Discounts edited successfully" }));
          });
      } else {
        createDiscount(test).then(() => {
          formik.resetForm();
          navigate("/offers/discounts");
          dispatch(showSuccess({ message: "Discount created successfully" }));
        });
      }
    },
  });

  const addFilterHandler = () => {
    const newFilter = formik?.values?.filters.concat({
      field: "",
      operator: "",
      fieldValue: "",
    });
    formik.setFieldValue("filters", newFilter);
  };

  const deleteFilterHandler = ({ deleteIndex }) => {
    if (formik.values?.filters?.length === 1) {
      dispatch(showError({ message: "At least one filter is required" }));
      return;
    }
    const updatedFilter = formik?.values?.filters.filter(
      (_, index) => index !== deleteIndex
    );
    formik.setFieldValue("filters", updatedFilter);
  };

  const deleteDiscountRangeHandler = ({ deleteIndex }) => {
    const discountRange = formik.values?.discountRange;
    if (discountRange && discountRange.length === 1) {
      dispatch(
        showError({ message: "At least one discount Range is required" })
      );
    } else if (discountRange) {
      formik.setFieldValue(
        "discountRange",
        discountRange.filter((_, index) => index !== deleteIndex)
      );
    }
  };
  const addDiscountRangeHandler = () => {
    const newRange = formik?.values?.discountRange.concat({
      minQty:
        formik.values.discountRange.length > 0
          ? +formik.values.discountRange[formik.values.discountRange.length - 1]
              .maxQty + 1
          : null,
      maxQty: null,
      discountValue: null,
      type: "percentage",
      value: null,
    });
    formik.setFieldValue("discountRange", newRange);
  };

  useEffect(() => {
    if (discountsIsSuccess) {
      dispatchDiscounts({ type: "EDITED_DISABLE" });
    }
    if (discountsIsError) {
      if (discountsError?.data?.message) {
        dispatch(showError({ message: discountsError?.data?.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong, please try again" })
        );
      }
    }
  }, [
    discountsIsSuccess,
    discountsIsError,
    discountsError,
    editDicountIsSuccess,
    id,
    discountValueSchema,
    dispatch,
  ]);

  useEffect(() => {
    // if (createDiscountIsSuccess) {
    //   dispatch(showSuccess({ message: "Discount created successfully" }));
    // }
    if (createDiscountError) {
      if (createDiscountError?.data?.message) {
        dispatch(showError({ message: createDiscountError?.data?.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong, please try again" })
        );
      }
    }
  }, [createDiscountError, dispatch]);

  useEffect(() => {
    const encodedString = searchParams.get("filter");
    const decodedString = decodeURIComponent(encodedString);
    const parsedObject = JSON.parse(decodedString);
    setDecodedObject(parsedObject);

    // dispatchDiscounts({type : "SET_DISCOUNT_TYPE", discountType : searchParams.get("discountType") }) ;
    // console.log("bndndwhdqwdk", discountsState?.discountType)
  }, [searchParams]);

  useEffect(() => {
    if (location.pathname !== "/offers/discounts/create") {
      if (id && !_.isEqual(formik.values, formik.initialValues)) {
        dispatchDiscounts({ type: "EDITED_ENABLE" });
        dispatchDiscounts({ type: "ENABLE_EDIT" });
      } else if (id && _.isEqual(formik.values, formik.initialValues)) {
        dispatchDiscounts({ type: "EDITED_DISABLE" });
        dispatchDiscounts({ type: "DISABLE_EDIT" });
      }
    }
    else{
      if (!_.isEqual(formik.values, formik.initialValues)) {
        dispatchDiscounts({ type: "EDITED_ENABLE" });
        dispatchDiscounts({ type: "ENABLE_EDIT" });
      } else if (_.isEqual(formik.values, formik.initialValues)) {
        dispatchDiscounts({ type: "EDITED_DISABLE" });
        dispatchDiscounts({ type: "DISABLE_EDIT" });
      }
    }
  }, [formik.initialValues, formik.values, id]);

  console.log("errorrrrrrrrrrrr", formik?.errors);
  console.log({ ValueValueInitial: formik?.initialValues });
  console.log({ ValueValue: formik?.values });
  console.log("istrueeeeeeee", !_.isEqual(formik.values, formik.initialValues));

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
      <form className="offers-form" noValidate onSubmit={formik.handleSubmit}>
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
                        placeholder="Discount Name"
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
                        displayEmpty
                        // renderValue={
                        //   formik.values?.discountType !== ""
                        //     ? undefined
                        //     : () => (
                        //         <span
                        //           style={{ fontSize: "13px", color: "#5c6d8e" }}
                        //         >
                        //           Select
                        //         </span>
                        //       )
                        // }
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
                          value="freeShipping"
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          Free Shipping
                        </MenuItem>
                        <MenuItem
                          value="buyxGety"
                          sx={{ fontSize: 13, color: "#5c6d8e" }}
                        >
                          Buy X, Get Y
                        </MenuItem>
                        <MenuItem
                          value="bulk"
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
            {(formik?.values?.discountType === "productDiscount" ||
              formik?.values?.discountType === "cartDiscount") && (
              <DiscountValue
                value={formik.values?.discountValue}
                field="discountValue"
                formik={formik}
                touched={formik?.touched?.discountValue}
                error={formik?.errors?.discountValue}
              />
            )}
            {formik?.values?.discountType === "bulk" && (
              <DiscountRange
                value={formik.values?.discountRange}
                field="discountRange"
                formik={formik}
                touched={formik?.touched?.discountRange}
                error={formik?.errors?.discountRange}
                data={formik.values?.discountRange}
                onSort={() => {}}
                onDeleteField={deleteDiscountRangeHandler}
                onAdd={addDiscountRangeHandler}
              />
            )}
            {formik?.values?.discountType !== "buyxGety" && (
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
            )}
            {formik?.values?.discountType === "buyxGety" && (
              <BuyXGetY
                value={formik.values?.buyXGetY}
                field="buyXGetY"
                formik={formik}
                touched={formik?.touched?.buyXGetY}
                error={formik?.errors?.buyXGetY}
              />
            )}

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

            <ScheduleDiscountCode
              value={formik.values?.scheduledDiscount}
              field="scheduledDiscount"
              formik={formik}
              touched={formik?.touched?.scheduledDiscount}
              error={formik?.errors?.scheduledDiscount}
            />
            {formik?.values?.discountType === "freeShipping" && (
              <LimitByLocation
                value={formik.values?.limitByLocation}
                field="limitByLocation"
                formik={formik}
                touched={formik?.touched?.limitByLocation}
                error={formik?.errors?.limitByLocation}
              />
            )}
            {/* <CouponCode
              value={formik.values?.couponCode}
              field="couponCode"
              formik={formik}
              touched={formik?.touched?.couponCode}
              error={formik?.errors?.couponCode}
            /> */}
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
              <small className="text-grey-6">
                {formik.values?.discountType}
              </small>
              <div className="d-flex align-items-center mt-1">
                <small className="text-blue-2 fw-500">
                  • Code&nbsp;&nbsp;|
                </small>
                { formik.values?.discountFormat?.discountCode ?
                  (<>
                    <h6 className="fw-500 ms-2 me-2 text-lightBlue">
                      {formik.values?.discountFormat?.discountCode}
                    </h6>
                    <CopyToClipboard
                      text={formik.values?.discountFormat?.discountCode}
                      onCopy={handleCopy}
                    >
                      <Tooltip
                        title={copied ? "Copied to clipboard" : "Copy"}
                        placement="top"
                      >
                        <ContentCopyIcon
                          sx={{
                            color: "#5c6d8e",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    </CopyToClipboard>
                  </>) : null
                }
              </div>

              <hr className="hr-grey-6 my-3" />
              <p className="text-lightBlue">Filters</p>
              <div className="d-flex align-items-center mt-1">
                <small className="text-blue-2 fw-500">
                  • Discount applies to Categroy equals to Ring, Earring,
                  Necklace
                </small>
              </div>
              <hr className="hr-grey-6 my-3" />
              <p className="text-lightBlue">Discount</p>
              <div className="d-flex align-items-center mt-1">
                <small className="text-blue-2 fw-500">
                  • {formik?.values.discountValue?.discountValue || formik?.values?.discountRange?.discountValue}{" "}
                  {formik?.values.discountValue?.type === "percentage"
                    ? `%`
                    : `Rs`}{" "}
                  off on {formik?.values.discountValue?.value}
                </small>
              </div>
              <hr className="hr-grey-6 my-3" />
              <p className="text-lightBlue">Condition</p>
              <div className="d-flex mt-1 flex-column">
                {formik?.values?.minimumRequirement?.requirement ===
                "amount" ? (
                  <>
                    <small className="text-blue-2 fw-500 d-block">
                      Apply Discount only if
                    </small>
                    <small className="text-blue-2 fw-500 ps-2 d-block mt-1">
                      • Order Amount is equal to ₹{" "}
                      {formik?.values?.minimumRequirement?.value}
                    </small>
                  </>
                ) : formik?.values?.minimumRequirement?.requirement ===
                  "quantity" ? (
                  <>
                    <small className="text-blue-2 fw-500 d-block">
                      Apply Discount only if
                    </small>
                    <small className="text-blue-2 fw-500 ps-2 d-block mt-1">
                      • Quantity is equal to{" "}
                      {formik?.values?.minimumRequirement?.value}
                    </small>
                  </>
                ) : (
                  <small className="text-blue-2 fw-500 ps-2 d-block mt-1">
                    • Unlimited uses
                  </small>
                )}
              </div>
              <hr className="hr-grey-6 my-3" />
              <p className="text-lightBlue">Details</p>
              <div className="d-flex mt-1 flex-column">
                <small className="text-blue-2 fw-500 d-block ps-2">
                  • Returns & Exchange{" "}
                  {formik?.values?.returnExchange === "allowed"
                    ? `Allowed`
                    : `Not Allowed`}
                </small>
                <small className="text-blue-2 fw-500 ps-2 d-block mt-1">
                  • Activated{" "}
                  {moment(
                    formik?.values?.scheduledDiscount?.startDateTime
                  ).format("Do MMMM, YYYY")}
                </small>
              </div>
            </div>
          </div>
        </div>
        <SaveFooterTertiary
          show={id ? discountsState.isEditing : true}
          onDiscard={backHandler}
          isLoading={createDiscountIsLoading || editDicountIsLoading}
        />
        <DiscardModalSecondary
          when={discountsState.edited}
          message="discount"
        />
      </form>
    </div>
  );
};

export default CreateDiscount;
