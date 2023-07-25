import { useEffect, useCallback, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  OutlinedInput,
  Tooltip,
  Grid,
  FormHelperText,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import _ from "lodash";

import AddCustomField from "../../../components/AddCustomField/AddCustomField";
import AddCustomFieldTable from "../../../components/AddCustomField/AddCustomFieldTable";
import InfoHeader from "../../../components/Header/InfoHeader";
import { UploadMediaSmall } from "../../../components/UploadMediaBox/UploadMedia";
import { SaveFooterTertiary } from "../../../components/SaveFooter/SaveFooter";
import { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";

import info from "../../../assets/icons/info.svg";

import "./ProductTabs.scss";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import {
  useGetAllProductTabsQuery,
  useCreateProductTabMutation,
  useEditProductTabMutation,
} from "../../../features/parameters/productTabs/productTabsApiSlice";

const commonCustomFieldSchema = Yup.object().shape({
  title: Yup.string().trim().min(3, "Too short").required("Required"),
  fieldType: Yup.string()
    .oneOf(["text", "dimension", "image", "weight", "productField"])
    .required("Required"),
  isDefaultHighlight: Yup.boolean().optional(),
  productValue: Yup.string()
    .trim()
    .when(
      ["isDefaultHighlight", "fieldType"],
      ([isDefaultHighlight, fieldType], schema) => {
        if (
          isDefaultHighlight &&
          ["text", "dimension", "image", "weight"].includes(fieldType)
        ) {
          return schema.required("Required");
        }
        return schema;
      }
    ),
  visibility: Yup.string().oneOf(["show", "hide"]).required("Required"),
});
const customFieldSchema = Yup.object().shape({
  title: Yup.string().trim().min(3, "Too short").required("Required"),
  fieldType: Yup.string()
    .oneOf(["text", "dimension", "image", "weight", "productField"])
    .required("Required"),
  visibility: Yup.string().oneOf(["show", "hide"]).required("Required"),
});
const createProductTabValidationSchema = Yup.object({
  title: Yup.string().trim().required("Required"),
  mediaUrl: Yup.string().trim(),
  tabLayout: Yup.string().trim().required("Required"),
  commonCustomFields: Yup.array()
    .of(commonCustomFieldSchema)
    .min(2)
    .max(2)
    .required("Required"),
  customFields: Yup.array().of(customFieldSchema).min(1).required("Required"),
});

const initialProductsInfoState = {
  deleteIndex: null,
  confirmationMessage: "",
  showDeleteModal: false,
  isEditing: false,
};

const initialQueryFilterState = {
  pageSize: 1,
  pageNo: null,
  totalCount: 0,
};

const productsTabReducer = (state, action) => {
  if (action.type === "SET_DELETE") {
    return {
      ...state,
      deleteIndex: action.deleteIndex,
      confirmationMessage: action.message || "",
      showDeleteModal: true,
    };
  }
  if (action.type === "REMOVE_DELETE") {
    return {
      ...initialProductsInfoState,
    };
  }
  if (action.type === "ENABLE_EDIT") {
    return {
      ...initialProductsInfoState,
      isEditing: true,
    };
  }
  if (action.type === "DISABLE_EDIT") {
    return {
      ...initialProductsInfoState,
      isEditing: false,
    };
  }

  return initialProductsInfoState;
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

const ProductTabInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const [productsInfoState, dispatchProductsInfo] = useReducer(
    productsTabReducer,
    initialProductsInfoState
  );
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );

  const {
    data: productsTabData,
    isLoading: productsTabIsLoading,
    error: productsTabError,
    isError: productsTabIsError,
    isSuccess: productsTabIsSuccess,
    isFetching: productsTabDataIsFetching,
  } = useGetAllProductTabsQuery(queryFilterState, {
    skip: queryFilterState.pageNo ? false : true,
  });

  const [
    createProductTab,
    {
      isLoading: createProductTabIsLoading,
      isSuccess: createProductTabIsSuccess,
      error: createProductTabError,
      isError: createProductTabIsError,
    },
  ] = useCreateProductTabMutation();

  const [
    editProductTab,
    {
      isLoading: editProductTabIsLoading,
      isSuccess: editProductTabIsSuccess,
      error: editProductTabError,
      isError: editProductTabIsError,
    },
  ] = useEditProductTabMutation();

  const formik = useFormik({
    initialValues: {
      title: productsTabData?.data[0].title || "",
      mediaUrl: productsTabData?.data[0].mediaUrl || "",
      tabLayout: productsTabData?.data[0].tabLayout || "Tab 2",
      commonCustomFields: [
        {
          title: productsTabData?.data[0].commonCustomFields[0]?.title || "",
          fieldType:
            productsTabData?.data[0].commonCustomFields[0]?.fieldType || "",
          isDefaultHighlight:
            productsTabData?.data[0].commonCustomFields[0]
              ?.isDefaultHighlight || false,
          productValue:
            productsTabData?.data[0].commonCustomFields[0]?.productValue || "",
          visibility:
            productsTabData?.data[0].commonCustomFields[0]?.visibility || "",
        },
        {
          title: productsTabData?.data[0].commonCustomFields[1]?.title || "",
          fieldType:
            productsTabData?.data[0].commonCustomFields[1]?.fieldType || "",
          isDefaultHighlight:
            productsTabData?.data[0].commonCustomFields[1]
              ?.isDefaultHighlight || false,
          productValue:
            productsTabData?.data[0].commonCustomFields[1]?.productValue || "",
          visibility:
            productsTabData?.data[0].commonCustomFields[1]?.visibility || "",
        },
      ],
      customFields: (productsTabData?.data[0].customFields?.length &&
        productsTabData?.data[0].customFields) || [
        {
          title: "",
          fieldType: "",
          productValue: "",
          visibility: "",
        },
      ],
    },
    enableReinitialize: true,
    validationSchema: createProductTabValidationSchema,
    onSubmit: (values) => {
      const productTabValues = structuredClone(values);
      productTabValues.commonCustomFields = productTabValues?.commonCustomFields
        ?.length
        ? productTabValues?.commonCustomFields
            .filter((field) => field.title)
            .map((field) => {
              const clonedField = structuredClone(field);
              if (clonedField.fieldType === "productField") {
                clonedField.isDefaultHighlight = false;
              } else if (
                ["text", "dimension", "image", "weight"].includes(
                  clonedField.fieldType
                )
              ) {
                if (!clonedField.isDefaultHighlight) {
                  clonedField.isDefaultHighlight = false;
                  delete clonedField.productValue;
                }
              }
              return clonedField;
            })
        : null;
      productTabValues.customFields = productTabValues?.customFields?.length
        ? productTabValues?.customFields
            .filter((field) => field.title)
            .map((field) => {
              const clonedField = structuredClone(field);
              if (
                ["text", "dimension", "image", "weight"].includes(
                  clonedField.fieldType
                )
              ) {
                delete clonedField.productValue;
              }
              return clonedField;
            })
        : null;
      for (const key in productTabValues) {
        if (!productTabValues[key] || !productTabValues[key]?.length)
          // if (key !== "mediaUrl") {
          delete productTabValues[key];
        // }
      }
      if (id) {
        editProductTab({
          id: productsTabData?.data[0]._id,
          details: productTabValues,
        })
          .unwrap()
          .then(() => {
            dispatchProductsInfo({ type: "DISABLE_EDIT" });
            dispatch(
              showSuccess({ message: "Product tab edited successfully" })
            );
            formik.resetForm();
          });
      } else {
        createProductTab(productTabValues)
          .unwrap()
          .then(() => {
            dispatch(
              showSuccess({
                message: "Product tab created successfully",
              })
            );
            formik.resetForm();
          });
      }
    },
  });

  const backHandler = () => {
    navigate("/parameters/productTabs");
  };

  const IconUploadHandler = useCallback((url) => {
    formik.setFieldValue("mediaUrl", url);
  }, []);

  const deleteFieldHandler = ({ deleteIndex, message }) => {
    if (formik.values?.customFields?.length === 1) {
      dispatch(showError({ message: "At least one custom field required" }));
      return;
    }
    dispatchProductsInfo({ type: "SET_DELETE", deleteIndex, message });
  };

  const CancelDeleteFieldHandler = () => {
    dispatchProductsInfo({ type: "REMOVE_DELETE" });
  };

  const deleteFieldConfirmationHandler = () => {
    const updatedFields = formik?.values?.customFields.filter(
      (_, index) => index !== productsInfoState.deleteIndex
    );
    formik.setFieldValue("customFields", updatedFields);
    dispatchProductsInfo({ type: "REMOVE_DELETE" });
  };

  const addFieldHandler = () => {
    const newCustomFields = formik?.values?.customFields.concat({
      title: "",
      fieldType: "",
      productValue: "",
      visibility: "",
    });
    formik.setFieldValue("customFields", newCustomFields);
  };

  const nextPageHandler = () => {
    const { pageNo, totalCount } = queryFilterState;
    if (pageNo + 1 > totalCount) {
      return;
    }
    navigate(`/parameters/productTabs/edit/${pageNo + 1}`);
  };

  const prevPageHandler = () => {
    const { pageNo } = queryFilterState;
    if (pageNo - 1 === 0) {
      return;
    }
    navigate(`/parameters/productTabs/edit/${pageNo - 1}`);
  };

  useEffect(() => {
    if (createProductTabIsError) {
      if (createProductTabError.data?.message) {
        dispatch(showError({ message: createProductTabError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (editProductTabIsError) {
      if (editProductTabError.data?.message) {
        dispatch(showError({ message: editProductTabError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
  }, [
    createProductTabError,
    createProductTabIsError,
    editProductTabError,
    editProductTabIsError,
    dispatch,
  ]);

  useEffect(() => {
    if (id) {
      dispatchQueryFilter({ type: "SET_PAGE_NO", pageNo: id });
    }
  }, [id]);

  useEffect(() => {
    if (productsTabIsError) {
      if (productsTabError?.data?.message) {
        dispatch(showError({ message: productsTabError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (productsTabIsSuccess) {
      dispatchQueryFilter({
        type: "SET_TOTAL_COUNT",
        totalCount: productsTabData.totalCount,
      });
    }
  }, [
    productsTabData,
    productsTabError,
    productsTabIsError,
    productsTabIsSuccess,
    dispatch,
  ]);

  useEffect(() => {
    if (id && !_.isEqual(formik.values, formik.initialValues)) {
      dispatchProductsInfo({ type: "ENABLE_EDIT" });
    } else if (id && _.isEqual(formik.values, formik.initialValues)) {
      dispatchProductsInfo({ type: "DISABLE_EDIT" });
    }
  }, [formik.initialValues, formik.values, id]);

  return (
    <div className="page container-fluid position-relative user-group product-tab-page">
      <InfoHeader
        title={formik.values.title || "Create Tab"}
        onBack={backHandler}
        onPreview={() => {}}
        onPrev={prevPageHandler}
        onNext={nextPageHandler}
        isEdit={!!id}
      />
      <form className="product-form" noValidate onSubmit={formik.handleSubmit}>
        <div className="row mt-3" style={{ marginBottom: "80px" }}>
          <div className="col-lg-9 mt-3">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
              <div className="col-md-12 px-0 d-flex">
                <div
                  className="d-flex align-items-start"
                  style={{ gap: "20px", width: "100%" }}
                >
                  <div style={{ flex: 1 }}>
                    <div className="d-flex mb-1">
                      <label className="small text-lightBlue me-2">
                        Enter Tab Title
                      </label>
                      <Tooltip title="Lorem ipsum" placement="top">
                        <img
                          src={info}
                          alt="info"
                          className=" c-pointer"
                          width={13.5}
                        />
                      </Tooltip>
                    </div>
                    <FormControl className="w-100 px-0">
                      <OutlinedInput
                        size="small"
                        placeholder="Enter Tab Title"
                        sx={{ paddingLeft: 0 }}
                        name="title"
                        value={formik.values?.title}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        autoFocus={true}
                      />
                      {!!formik.touched.title && formik.errors.title && (
                        <FormHelperText error>
                          {formik.errors.title}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <UploadMediaSmall
                      fileSrc={formik.values?.mediaUrl}
                      error={formik.errors.mediaUrl}
                      onUpload={IconUploadHandler}
                      onBlur={formik.handleBlur}
                      name="mediaUrl"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mt-4">
              <div className="d-flex justify-content-between align-items-center mb-2 px-0">
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <h6 className="me-2 text-lightBlue col-auto ps-0 fw-500">
                      Add Custom Fields
                    </h6>
                    <Tooltip title="Lorem ipsum" placement="top">
                      <img
                        src={info}
                        alt="info"
                        className=" c-pointer"
                        width={13.5}
                      />
                    </Tooltip>
                  </div>
                  <div className="d-flex">
                    <img
                      src={info}
                      alt="info"
                      className="c-pointer me-1"
                      width={10}
                    />
                    <span className="ex-small text-grey-6">
                      Create Custom fields such as a Manufacturing Days, etc
                    </span>
                  </div>
                </div>
                <div className="small">
                  <span className="text-grey-6">
                    Tab Layout: <span className="text-lightBlue">Tab1</span>{" "}
                    <button className="reset link">(Customize)</button>
                  </span>
                </div>
              </div>
              <Grid container rowSpacing={2}>
                <Grid item md={12}>
                  <div className="bg-black-13 border-grey-5 rounded-8 p-3 features mt-4">
                    <AddCustomField
                      values={formik.values?.commonCustomFields[0]}
                      field="commonCustomFields[0]"
                      formik={formik}
                      touched={
                        formik?.touched?.commonCustomFields?.length &&
                        formik?.touched?.commonCustomFields[0]
                      }
                      error={
                        formik?.errors?.commonCustomFields?.length &&
                        formik?.errors?.commonCustomFields[0]
                      }
                    />
                    <div className="mt-3"></div>
                    <AddCustomField
                      values={formik.values?.commonCustomFields[1]}
                      field="commonCustomFields[1]"
                      formik={formik}
                      touched={
                        formik?.touched?.commonCustomFields?.length &&
                        formik?.touched?.commonCustomFields[1]
                      }
                      error={
                        formik?.errors?.commonCustomFields?.length &&
                        formik?.errors?.commonCustomFields[1]
                      }
                    />
                  </div>
                </Grid>
                <Grid item md={12}>
                  <AddCustomFieldTable
                    formik={formik}
                    data={formik.values?.customFields}
                    onSort={() => {}}
                    onDeleteField={deleteFieldHandler}
                    onAdd={addFieldHandler}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <SaveFooterTertiary
          show={id ? productsInfoState.isEditing : true}
          onDiscard={backHandler}
          isLoading={createProductTabIsLoading || editProductTabIsLoading}
        />
      </form>
      <DeleteModalSecondary
        onConfirm={deleteFieldConfirmationHandler}
        onCancel={CancelDeleteFieldHandler}
        show={productsInfoState.showDeleteModal}
        message={productsInfoState.confirmationMessage}
        title="custom field"
      />
      <DiscardModalSecondary
        when={!_.isEqual(formik.values, formik.initialValues)}
        message="product tab"
      />
    </div>
  );
};

export default ProductTabInfo;
