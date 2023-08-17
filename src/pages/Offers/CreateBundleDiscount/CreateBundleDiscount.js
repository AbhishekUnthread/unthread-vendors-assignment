import React, { useEffect, useReducer, useState } from "react";
import "./CreateBundleDiscount.scss";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
// ! COMPONENT IMPORTS
import ProductStatusToggle from "../ProductStatusToggle";
import MaximumDiscountUsers from "../MaximumDiscountUsers";
import ScheduleDiscountCode from "../ScheduleDiscountCode";
import CustomerEligibility from "../CustomerEligibility";
import ReturnAndExchangeCondition from "../ReturnAndExchangeCondition";
import BundleProductDiscount from "../BundleProductDiscount";
import DiscountCombination from "../DiscountCombination";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import info from "../../../assets/icons/info.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import moment from "moment";
import _ from "lodash";


// ! MATERIAL IMPORTS
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Tooltip,
  Popover,
  Typography,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useFormik } from "formik";
import { useCreateBundleDiscountMutation, useEditBundleDiscountMutation, useGetAllBundleDiscountsQuery } from "../../../features/offers/discounts/bundleDiscountsApiSlice";
import * as Yup from "yup";
import OfferDiscount from "../../../components/DiscountFormat/OfferDiscount";
import { SaveFooterTertiary } from "../../../components/SaveFooter/SaveFooter";
import CustomizeBundle from "../../../components/DiscountFormat/CustomizeBundle";
import {
  showError,
  showSuccess,
} from "../../../features/snackbar/snackbarAction";
import { useDispatch } from "react-redux";
import { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";
import InfoHeader from "../../../components/Header/InfoHeader";

const createBundleValidationSchema = Yup.object().shape({
  field: Yup.string()
    .required("required")
    .oneOf(["allProducts", "category", "collection", "Tags"], "Invalid value"),
  value: Yup.array()
    .required("At least one value is required")
    .min(1, "At least one value is required"),
});

const displayBundleValidationSchema = Yup.object().shape({
  field: Yup.string()
    .required("required")
    .oneOf(["allProducts", "category", "collection", "Tags"], "Invalid value"),
  value: Yup.array()
    .required("At least one value is required")
    .min(1, "At least one value is required"),
});

const customizeBundleSchema = Yup.object().shape({
  bundleTitle: Yup.string().required("required"),
  subtitle: Yup.string().required("required"),
});

const discountValueSchema = Yup.object().shape({
  discountValue: Yup.number().required("Discount value is required"),
  type: Yup.string()
    .oneOf(["percentage", "fixed"])
    .required("Type must be percentage or fixed"),
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

const maximumDiscountValidationSchema = Yup.object().shape({
  limitDiscountNumber: Yup.boolean().optional(),
  limitUsagePerCustomer: Yup.boolean().optional(),
  total: Yup.number().when(
    ["limitDiscountNumber"],
    ([limitDiscountNumber], schema) => {
      return limitDiscountNumber ? schema.required("required").min(1,"Minimum quantity must be at least 1") : schema;
    }
  ),
  perCustomer: Yup.number().when(
    ["limitUsagePerCustomer","total","limitDiscountNumber"],
    ([limitUsagePerCustomer,total,limitDiscountNumber], schema) => {
      return limitUsagePerCustomer ? schema.required("required").max(
      Yup.ref("total"),
      "Maximum quantity must be greater than or equal to the total quantity"
    ) : schema;
    }
  ),
});

const scheduleDateSchema = Yup.object().shape({
  startDateTime: Yup.date().required("Start date and time is required"),
  endDateTime: Yup.date().when(["neverExpire"], ([neverExpire], schema) => {
    return neverExpire ? schema : schema.required("required");
  }),
  neverExpire: Yup.boolean(),
});
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

const discountValidationSchema = Yup.object().shape({
  bundleName: Yup.string()
    .trim()
    .max(50, "Name cannot exceed 50 characters")
    .required("required"),
  createBundle: createBundleValidationSchema,
  displayBundle: displayBundleValidationSchema,
  customizeBundle: customizeBundleSchema,
  discountValue: discountValueSchema,
  customerEligibility: customerEligibilitySchema,
  returnExchange: Yup.string()
    .oneOf(["allowed", "notAllowed"], "Invalid")
    .required("required"),
  maximumDiscount: maximumDiscountValidationSchema,
  scheduledDiscount: scheduleDateSchema,
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
      ...initialDiscountsState,
      isEditing: true,
    };
  }
  if (action.type === "DISABLE_EDIT") {
    return {
      ...initialDiscountsState,
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

const CreateBundleDiscount = () => {
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
  let { id } = useParams();

  const [
    createBundleDiscount,
    {
      isLoading: createBundleDiscountIsLoading,
      isSuccess: createBundleDiscountIsSuccess,
      error: createBundleDiscountError,
    },
  ] = useCreateBundleDiscountMutation();

  const [
    editBundleDiscount,
    {
      isLoading: editBundleDicountIsLoading,
      isSuccess: editBundleDicountIsSuccess,
      error: editBundleDicountError,
      isError: editBundleDicountIsError,
    },
  ] = useEditBundleDiscountMutation();

  const{
    data: bundleDiscountsData, 
    isLoading: bundleDiscountsIsLoading, 
    isSuccess: bundleDiscountsIsSuccess, 
    error: bundleDiscountsError,
    isError:bundleDiscountsIsError
  }=useGetAllBundleDiscountsQuery({
    id: id,
    alphabetical: decodedObject?.alphabetical,
    createdAt: decodedObject?.createdAt,
    name: decodedObject?.name,
    status: decodedObject?.status,
  },{skip: location.pathname === "/offers/bundleDiscount/create"});

  const backHandler = () => {
    navigate({
      pathname: "/offers/bundleDiscount",
      search: `?${createSearchParams({ filter: searchParams.get("filter") })}`,
    });
  };

  const prevPageHandler = ()=>{};
  const nextPageHandler = ()=>{};

  const formik = useFormik({
    initialValues: {
      bundleName: bundleDiscountsData?.data?.data[0]?.name ||"",
      returnExchange: bundleDiscountsData?.data?.data[0]?.returnExchangeCondition ||"allowed",
      maximumDiscount: {
        limitDiscountNumber: false,
        limitUsagePerCustomer: false,
        total: bundleDiscountsData?.data?.data[0]?.maximumDiscountUse?.total || "",
        perCustomer: bundleDiscountsData?.data?.data[0]?.maximumDiscountUse?.perCustomer || "",
      },
      discountCombination: {
        allowCombineWithOthers: bundleDiscountsData?.data?.data[0]?.allowCombineWithOthers ||false,
        allowCombineWith: bundleDiscountsData?.data?.data[0]?.allowCombineWith || [],
      },

      customerEligibility: {
        customer: bundleDiscountsData?.data?.data[0]?.eligibility?.eligibilityType || "allCustomers",
        customerGroups: bundleDiscountsData?.data?.data[0]?.eligibility?.customerGroups ||[],
        specificCustomers : bundleDiscountsData?.data?.data[0]?.eligibility?.specificCustomers || []
      },

      scheduledDiscount: {
        startDateTime: bundleDiscountsData?.data?.data[0]?.scheduledDiscount?.startDateTime || "",
        endDateTime: bundleDiscountsData?.data?.data[0]?.scheduledDiscount?.endDateTime || "",
        neverExpire: bundleDiscountsData?.data?.data[0]?.scheduledDiscount?.neverExpire || false,
      },
      customizeBundle: {
        bundleTitle: bundleDiscountsData?.data?.data[0]?.customizeBundle?.title || "",
        subtitle: bundleDiscountsData?.data?.data[0]?.customizeBundle?.subtitle || "",
      },
      createBundle: {
        field: bundleDiscountsData?.data?.data[0]?.makeBundleFromItems?.itemFrom || "",
        value: bundleDiscountsData?.data?.data[0]?.makeBundleFromItems?.products || [],
        dropDownData: [],
      },
      displayBundle: {
        field: bundleDiscountsData?.data?.data[0]?.displayBundle?.itemFrom || "",
        value: bundleDiscountsData?.data?.data[0]?.displayBundle?.products || [],
        dropDownData: [],
      },
      discountValue: {
        discountValue: bundleDiscountsData?.data?.data[0]?.mainDiscount?.value || "",
        type: bundleDiscountsData?.data?.data[0]?.mainDiscount?.unit || "percentage",
      },
    },
    enableReinitialize: true,
    validationSchema: discountValidationSchema,
    onSubmit: (values) => {
      dispatchDiscounts({ type: "EDITED_DISABLE" });
      const test = {
        name: values?.bundleName,
        status: "active",
        makeBundleFromItems: {
          itemFrom: values?.createBundle?.field,
          products: values?.createBundle?.value?.map(
            (item, index) => item?._id
          ),
        },
        displayBundle: {
          itemFrom: values?.displayBundle?.field,
          products: values?.displayBundle?.value?.map(
            (item, index) => item?._id
          ),
        },
        customizeBundle: {
          title: values?.customizeBundle?.bundleTitle,
          subtitle: values?.customizeBundle?.subtitle,
        },
        mainDiscount: {
          value: values?.discountValue?.discountValue,
          unit: values?.discountValue?.type,
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
                specificCustomers: values?.customerEligibility?.specificCustomers.map(
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
        returnExchangeCondition: values?.returnExchange,
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

        allowCombineWithOthers:
          values?.discountCombination?.allowCombineWithOthers,
        ...(values?.discountCombination?.allowCombineWithOthers === true
          ? { allowCombineWith: values?.discountCombination?.allowCombineWith }
          : {}),

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
        editBundleDiscount({
          id: bundleDiscountsData?.data?.data[0]._id,
          details: test,
        })
          .unwrap()
          .then(() => {
            dispatchDiscounts({ type: "DISABLE_EDIT" });
            dispatch(showSuccess({ message: "Bundle Discount edited successfully" }));
            formik.resetForm();
          });
      } else {
        createBundleDiscount(test).then(() => navigate("/offers/bundleDiscount"));
      }
      
    },
  });

  useEffect(() => {
    if (bundleDiscountsIsSuccess) {
      dispatchDiscounts({ type: "EDITED_DISABLE" });
    }
    if (bundleDiscountsIsError) {
      if (bundleDiscountsError?.data?.message) {
        dispatch(showError({ message: bundleDiscountsError?.data?.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong, please try again" })
        );
      }
    }
  }, [
    bundleDiscountsIsSuccess,
    bundleDiscountsIsSuccess,
    bundleDiscountsError,
    editBundleDicountIsSuccess,
    id,
    discountValueSchema,
    dispatch,
  ]);

  useEffect(() => {
    if (createBundleDiscountIsSuccess) {
      dispatch(showSuccess({ message: "Discount created successfully" }));
    }
    if (createBundleDiscountError) {
      if (createBundleDiscountError?.data?.message) {
        dispatch(
          showError({ message: createBundleDiscountError?.data?.message })
        );
      } else {
        dispatch(
          showError({ message: "Something went wrong, please try again" })
        );
      }
    }
  }, [createBundleDiscountIsSuccess, createBundleDiscountError, dispatch]);

  useEffect(() => {
    const encodedString = searchParams.get("filter");
    const decodedString = decodeURIComponent(encodedString);
    const parsedObject = JSON.parse(decodedString);
    setDecodedObject(parsedObject);

    // dispatchDiscounts({type : "SET_DISCOUNT_TYPE", discountType : searchParams.get("discountType") }) ;
  }, [searchParams]);

  useEffect(() => {
    if (id && !_.isEqual(formik.values, formik.initialValues)) {
      dispatchDiscounts({ type: "EDITED_ENABLE" });
      dispatchDiscounts({ type: "ENABLE_EDIT" });
    } else if (id && _.isEqual(formik.values, formik.initialValues)) {
      dispatchDiscounts({ type: "EDITED_DISABLE" });
      dispatchDiscounts({ type: "DISABLE_EDIT" });
    }
  }, [formik.initialValues, formik.values, id]);

  console.log("jhbbbiu2u1", discountsState?.discountType)

  return (
    <div className="page container-fluid position-relative">
      {/* <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/offers/bundleDiscount" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <h5 className="page-heading ms-2 ps-1">Create Bundle Discount</h5>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Duplicate</p>
          </button>
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
      </div> */}
      <InfoHeader
        title={formik.values?.bundleName || "Create Bundle Discount"}
        onBack={backHandler}
        // onPreview={() => {}}
        onPrev={prevPageHandler}
        onNext={nextPageHandler}
        isEdit={!!id}
      />
      <form className="offers-form" noValidate onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-9 mt-4">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
              <div className="d-flex col-12 px-0 justify-content-between">
                <div className="d-flex align-items-center">
                  <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                    Bundle Name
                  </h6>
                </div>
              </div>
              <hr className="hr-grey-6 mt-3 mb-0" />
              <div className="col-12 px-0">
                <div className="row align-items-start">
                  <div className="col-md-8 mt-3">
                    <div className="d-flex mb-1">
                      <p className="text-lightBlue">Enter Bundle Name</p>
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
                        name="bundleName"
                        value={formik.values?.bundleName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        autoFocus={true}
                        placeholder="Enter Bundle Name"
                        size="small"
                      />
                    </FormControl>
                    {!!formik.touched.bundleName && formik.errors.bundleName ? (
                      <Typography variant="caption" color="#F67476">
                        {formik.errors.bundleName}
                      </Typography>
                    ) : (
                      <small className="mt-1 text-grey-6 font1">
                        Note: Internal use only, custoemr can't see this
                      </small>
                    )}
                  </div>
                  {/* <div className="col-md-4 mt-3">
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
                </div> */}
                </div>
              </div>
            </div>

            <BundleProductDiscount
              sectionTitle={"Select Products to make bundle"}
              value={formik.values?.createBundle}
              field="createBundle"
              formik={formik}
              touched={formik?.touched?.createBundle}
              error={formik?.errors?.createBundle}
            />

            <BundleProductDiscount
              sectionTitle={"Select Where Bundles will be displayed"}
              value={formik.values?.displayBundle}
              field="displayBundle"
              formik={formik}
              touched={formik?.touched?.displayBundle}
              error={formik?.errors?.displayBundle}
            />
            <CustomizeBundle
              value={formik.values?.customizeBundle}
              field="customizeBundle"
              formik={formik}
              touched={formik?.touched?.customizeBundle}
              error={formik?.errors?.customizeBundle}
            />
            <OfferDiscount
              value={formik.values?.discountValue}
              field="discountValue"
              formik={formik}
              touched={formik?.touched?.discountValue}
              error={formik?.errors?.discountValue}
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
          </div>
          {/* <div className="col-lg-3 mt-4 pe-0 ps-0 ps-lg-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3">
            <small className="text-grey-6">Summary</small>
            <p className="text-blue-1 mt-3">Discount Code</p>
            <div className="d-flex align-items-center mt-1">
              <h5 className="fw-600 me-2 text-lightBlue">JWL20OFF</h5>
              <ContentCopyIcon
                sx={{
                  color: "#5c6d8e",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              />
            </div>
            <hr className="hr-grey-6 my-3" />
            <p className="text-lightBlue">Types and Method</p>
            <small className="text-blue-1 fw-500 d-block mt-2">
              • Code&nbsp;&nbsp;|&nbsp;&nbsp;Discount Promo
            </small>
            <small className="text-blue-1 fw-500 d-block mt-1">
              • Amount off Order
            </small>
            <hr className="hr-grey-6 my-2" />
            <p className="text-lightBlue">Details</p>
            <div className="d-flex mt-1 flex-column">
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • 20% off all Orders
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Applies to single products
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • All Custoemrs
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Unlimited Users
              </small>
              <small className="text-blue-1 fw-500 ps-2 d-block mt-1">
                • Activated Tomorrow
              </small>
            </div>
          </div>
        </div> */}

          <div className="col-lg-3 mt-4 pe-0 ps-0 ps-lg-3">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3">
              <small className="text-grey-6">Summary</small>
              <div className="d-flex align-items-center mt-1">
                <h6 className="text-lightBlue fw-500">
                  {formik?.values?.bundleName}
                </h6>
                {/* <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer ms-3">
                  <small className="text-black fw-400">Active</small>
                </div> */}
              </div>

              {/* <hr className="hr-grey-6 my-3" />
              <small className="text-grey-6">Product Discount</small>
              <div className="d-flex align-items-center mt-1">
                <small className="text-blue-2 fw-500">
                  • Code&nbsp;&nbsp;|
                </small>
                <h6 className="fw-500 ms-2 me-2 text-lightBlue">JWL20OFF</h6>

                <Tooltip title="Copy" placement="top">
                  <ContentCopyIcon
                    sx={{
                      color: "#5c6d8e",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </div> */}

              {/* <hr className="hr-grey-6 my-3" />
              <p className="text-lightBlue">Filters</p>
              <div className="d-flex align-items-center mt-1">
                <small className="text-blue-2 fw-500">
                  • Discount applies to Categroy equals to Ring, Earring,
                  Necklace
                </small>
              </div> */}
              <hr className="hr-grey-6 my-3" />
              <p className="text-lightBlue">Discount</p>
              <div className="d-flex align-items-center mt-1">
                <small className="text-blue-2 fw-500">
                  • {formik?.values.discountValue?.discountValue}{" "}
                  {formik?.values.discountValue?.type === "percentage"
                    ? `%`
                    : `Rs`}{" "}
                </small>
              </div>
              {/* <hr className="hr-grey-6 my-3" />
              <p className="text-lightBlue">Condition</p>
              <div className="d-flex mt-1 flex-column">
                <small className="text-blue-2 fw-500 d-block">
                  Apply Discount only if
                </small>
                <small className="text-blue-2 fw-500 ps-2 d-block mt-1">
                  • Order Amount is equal to ₹ 25,000
                </small>
                <small className="text-blue-2 fw-500 ps-2 d-block mt-1">
                  • Quantity is equal to 2
                </small>
              </div> */}
              <hr className="hr-grey-6 my-3" />
              <p className="text-lightBlue">Details</p>
              <div className="d-flex mt-1 flex-column">
                <small className="text-blue-2 fw-500 ps-2 d-block">
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
        isLoading={createBundleDiscountIsLoading || editBundleDicountIsLoading}
        />

        <DiscardModalSecondary
        when={discountsState.edited}
        message="bundle discount"
      />
      </form>
    </div>
  );
};

export default CreateBundleDiscount;
