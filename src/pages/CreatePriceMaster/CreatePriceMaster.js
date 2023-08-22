import { useEffect, useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import {
  Autocomplete,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import _ from "lodash";

import NotesBox from "../../components/NotesBox/NotesBox";
import UploadMediaBox from "../../components/UploadMediaBox/UploadMediaBox";
import InfoHeader from "../../components/Header/InfoHeader";
import { SaveFooterTertiary } from "../../components/SaveFooter/SaveFooter";
import { AntSwitch } from "../../components/AntSwitch/AntSwitch";
import { DiscardModalSecondary } from "../../components/Discard/DiscardModal";
import { DeleteModalSecondary } from "../../components/DeleteModal/DeleteModal";
import PageLoader from "../../components/Loader/PageLoader";

import arrowLeft from "../../assets/icons/arrowLeft.svg";
import addMedia from "../../assets/icons/addMedia.svg";
import info from "../../assets/icons/info.svg";

import { showSuccess, showError } from "../../features/snackbar/snackbarAction";
import SnackbarUtils from "../../features/snackbar/useSnackbar";
import {
  useGetAllMastersQuery,
  useCreateMasterMutation,
  useUpdateMasterMutation,
  useDeleteMasterMutation,
} from "../../features/priceMaster/priceMasterApiSlice";
import { useGetAllOptionsQuery } from "../../features/parameters/options/optionsApiSlice";
import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
} from "../../features/parameters/categories/categoriesApiSlice";
import { useGetAllCollectionsQuery } from "../../features/parameters/collections/collectionsApiSlice";

import { objectIdReg, urlReg } from "../../utils/regex";
import { omitEmptyKeys } from "../../utils/helper";

import "./CreatePriceMaster.scss";

const FIELDS_DATA = [
  { title: "Option", value: "option" },
  { title: "Category", value: "category" },
];

const priceMasterValidationSchema = Yup.object({
  name: Yup.string().trim().min(3, "Too short").required("Required"),
  entityId: Yup.string()
    .matches(objectIdReg, "Not valid")
    .when(["type"], ([type], schema) => {
      if (type === "option") {
        return schema.required("Required");
      }
      return schema;
    }),
  type: Yup.string().oneOf(["option", "category"]).required("Required"),
  priceType: Yup.string()
    .oneOf(["default", "weightRange"])
    .required("Required"),
  mediaUrl: Yup.string().trim().matches(urlReg, "Not valid").optional(),
  notes: Yup.string().optional(),
});

const initialPriceMasterQueryFilterState = {
  srNo: null,
  order: null,
  pageSize: 1,
  pageNo: 0,
};

const initialPriceMasterState = {
  totalCount: 0,
  nextCount: 0,
  prevCount: 0,
  isEditing: false,
  deleteId: null,
  confirmationMessage: "",
  showDeleteModal: false,
  deleteTitle: "",
  isLoading: false,
  createdSuccess: false,
  data: [],
};

const priceMasterQueryFilterReducer = (state, action) => {
  if (action.type === "SET_SR_NO") {
    return {
      ...state,
      srNo: action.srNo,
      order: null,
    };
  }
  if (action.type === "SET_NEXT_ORDER") {
    return {
      ...state,
      order: 1,
    };
  }
  if (action.type === "SET_PREV_ORDER") {
    return {
      ...state,
      order: -1,
    };
  }
  return initialPriceMasterQueryFilterState;
};

const priceMasterReducer = (state, action) => {
  if (action.type === "SET_DELETE") {
    return {
      ...state,
      deleteId: action.deleteId,
      confirmationMessage: action.message || "",
      showDeleteModal: true,
      deleteTitle: action.deleteTitle,
    };
  }
  if (action.type === "REMOVE_DELETE") {
    return {
      ...state,
      deleteId: initialPriceMasterState.deleteId,
      confirmationMessage: initialPriceMasterState.confirmationMessage,
      showDeleteModal: initialPriceMasterState.showDeleteModal,
      deleteTitle: initialPriceMasterState.deleteTitle,
    };
  }
  if (action.type === "SET_PAGINATION") {
    return {
      ...state,
      totalCount: action.totalCount,
      nextCount: action.nextCount,
      prevCount: action.prevCount,
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
  if (action.type === "ENABLE_LOADING") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "DISABLE_LOADING") {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === "ENABLE_SUCCESS") {
    return {
      ...state,
      createdSuccess: true,
    };
  }
  if (action.type === "DISABLE_SUCCESS") {
    return {
      ...state,
      createdSuccess: false,
    };
  }
  if (action.type === "SET_FIELD_VALUES") {
    return {
      ...state,
      data: action.data,
    };
  }
  if (action.type === "RESET_FIELD_VALUES") {
    return {
      ...state,
      data: initialPriceMasterState.data,
    };
  }
  return initialPriceMasterState;
};

const CreatePriceMaster = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams("");
  let { id } = useParams();
  const [priceMasterQueryFilterState, dispatchPriceMasterQueryFilter] =
    useReducer(
      priceMasterQueryFilterReducer,
      initialPriceMasterQueryFilterState
    );
  const [priceMasterState, dispatchPriceMaster] = useReducer(
    priceMasterReducer,
    initialPriceMasterState
  );

  const {
    data: mastersData,
    isLoading: mastersIsLoading,
    error: mastersError,
    isError: mastersIsError,
    isSuccess: mastersIsSuccess,
  } = useGetAllMastersQuery(priceMasterQueryFilterState, {
    skip: priceMasterQueryFilterState.srNo ? false : true,
  });
  const [
    createMaster,
    {
      isLoading: createMasterIsLoading,
      isSuccess: createMasterIsSuccess,
      error: createMasterError,
      isError: createMasterIsError,
    },
  ] = useCreateMasterMutation();
  const [
    updateMaster,
    {
      isLoading: updateMasterIsLoading,
      isSuccess: updateMasterIsSuccess,
      error: updateMasterError,
      isError: updateMasterIsError,
    },
  ] = useUpdateMasterMutation();
  const [
    deleteMaster,
    {
      isLoading: deleteMasterIsLoading,
      isSuccess: deleteMasterIsSuccess,
      error: deleteMasterError,
      isError: deleteMasterIsError,
    },
  ] = useDeleteMasterMutation();

  const priceMasterFormik = useFormik({
    initialValues: {
      name: mastersData?.data[0]?.name || "",
      entityId: mastersData?.data[0]?.entityId || "",
      type: mastersData?.data[0]?.type || "",
      priceType: mastersData?.data[0]?.priceType || "",
      mediaUrl: mastersData?.data[0]?.mediaUrl || "",
      notes: mastersData?.data[0]?.notes || "",
    },
    enableReinitialize: true,
    validationSchema: priceMasterValidationSchema,
    onSubmit: async (values) => {
      const masterValues = omitEmptyKeys(values);
      dispatchPriceMaster({ type: "ENABLE_LOADING" });
      SnackbarUtils.savingToast();
      if (id) {
        updateMaster({
          id: mastersData?.data[0]._id,
          details: masterValues,
        })
          .unwrap()
          .then(() => {
            SnackbarUtils.hideToast();
            dispatchPriceMaster({ type: "DISABLE_LOADING" });
            priceMasterFormik.resetForm();
            dispatchPriceMaster({ type: "DISABLE_EDIT" });
            dispatch(showSuccess({ message: "Master edited successfully" }));
          })
          .catch((error) => {
            SnackbarUtils.hideToast();
            dispatchPriceMaster({ type: "DISABLE_LOADING" });
            if (error?.data?.message) {
              dispatch(showError({ message: error.data.message }));
            } else {
              dispatch(
                showError({
                  message: "Something went wrong!, please try again",
                })
              );
            }
          });
      } else {
        createMaster(masterValues)
          .unwrap()
          .then(() => {
            SnackbarUtils.hideToast();
            dispatchPriceMaster({ type: "DISABLE_LOADING" });
            priceMasterFormik.resetForm();
            dispatchPriceMaster({ type: "ENABLE_SUCCESS" });
            dispatch(
              showSuccess({
                message: "Master created successfully",
              })
            );
          })
          .catch((error) => {
            SnackbarUtils.hideToast();
            dispatchPriceMaster({ type: "DISABLE_LOADING" });
            if (error?.data?.message) {
              dispatch(showError({ message: error.data.message }));
            } else {
              dispatch(
                showError({
                  message: "Something went wrong!, please try again",
                })
              );
            }
          });
      }
    },
  });

  const {
    data: optionsData,
    isLoading: optionsIsLoading,
    error: optionsError,
    isError: optionsIsError,
    isSuccess: optionsIsSuccess,
    isFetching: optionsDataIsFetching,
  } = useGetAllOptionsQuery(
    {
      pageSize: 10,
      pageNo: 1,
    },
    {
      skip: priceMasterFormik.values.type !== "option",
    }
  );

  const backHandler = () => {
    navigate({
      pathname: "/priceMaster",
      search: `?${createSearchParams({
        search: searchParams.get("search"),
      })}`,
    });
  };

  const nextPageHandler = () => {
    dispatchPriceMasterQueryFilter({ type: "SET_NEXT_ORDER" });
  };

  const prevPageHandler = () => {
    dispatchPriceMasterQueryFilter({ type: "SET_PREV_ORDER" });
  };

  const selectedType =
    FIELDS_DATA.find(
      (field) => field.value === priceMasterFormik.values.type
    ) || null;

  let selectedEntity =
    priceMasterState.data.find(
      (item) => item.value === priceMasterFormik.values.entityId
    ) || null;

  const changeTypeHandler = (_, type) => {
    priceMasterFormik.setFieldValue("type", type?.value || "");
    priceMasterFormik.setFieldValue("entityId", "");
  };

  const changeEntityHandler = (_, entity) => {
    priceMasterFormik.setFieldValue("entityId", entity?.value || "");
  };

  const uploadMediaHandler = (url) => {
    priceMasterFormik.setFieldValue("mediaUrl", url);
  };

  useEffect(() => {
    if (id) {
      dispatchPriceMasterQueryFilter({ type: "SET_SR_NO", srNo: id });
    }
  }, [id]);

  useEffect(() => {
    if (mastersIsError) {
      if (mastersError?.data?.message) {
        dispatch(showError({ message: mastersError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (mastersIsSuccess) {
      dispatchPriceMaster({
        type: "SET_PAGINATION",
        totalCount: mastersData.totalCount,
        nextCount: mastersData.nextCount,
        prevCount: mastersData.prevCount,
      });
      // dispatchPriceMasterQueryFilter({
      //   type: "SET_SR_NO",
      //   srNo: mastersData.data[0].srNo,
      // });
    }
  }, [mastersData, mastersError, mastersIsError, mastersIsSuccess, dispatch]);

  useEffect(() => {
    if (
      id &&
      !_.isEqual(priceMasterFormik.values, priceMasterFormik.initialValues)
    ) {
      dispatchPriceMaster({ type: "ENABLE_EDIT" });
    } else if (
      id &&
      _.isEqual(priceMasterFormik.values, priceMasterFormik.initialValues)
    ) {
      dispatchPriceMaster({ type: "DISABLE_EDIT" });
    }
  }, [priceMasterFormik.initialValues, priceMasterFormik.values, id]);

  useEffect(() => {
    if (priceMasterState.createdSuccess) {
      navigate("/priceMaster");
    }
  }, [priceMasterState.createdSuccess, navigate]);

  useEffect(() => {
    if (priceMasterFormik.values.type === "option" && optionsIsSuccess) {
      const data = optionsData.data.map((option) => {
        return {
          value: option._id,
          title: option.title,
        };
      });
      dispatchPriceMaster({ type: "SET_FIELD_VALUES", data });
    } else {
      dispatchPriceMaster({ type: "RESET_FIELD_VALUES" });
    }
  }, [optionsIsSuccess, optionsData, priceMasterFormik.values.type]);

  return (
    <>
      {mastersIsLoading && <PageLoader />}
      <div className="page container-fluid position-relative user-group product-tab-page">
        <InfoHeader
          title={
            priceMasterFormik.values.name ||
            (id ? "Edit Master" : "Create Master")
          }
          onBack={backHandler}
          onPrev={prevPageHandler}
          onNext={nextPageHandler}
          isEdit={!!id}
          hasPrev={priceMasterState.prevCount}
          hasNext={priceMasterState.nextCount}
        />
        {!mastersIsLoading && (
          <form
            className="product-form"
            noValidate
            onSubmit={priceMasterFormik.handleSubmit}
          >
            <div className="row mt-3">
              <div className="col-lg-9 mt-3">
                <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
                  <div className="d-flex col-12 px-0 justify-content-between">
                    <div className="d-flex align-items-center">
                      <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                        Master Information
                      </h6>
                    </div>
                  </div>
                  <hr className="hr-grey-6 my-3" />
                  <div className="col-md-12 px-0">
                    <div className="d-flex mb-1">
                      <p className="text-lightBlue me-2">Name Master</p>
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
                        placeholder="Enter Master Name"
                        size="small"
                        name="name"
                        value={priceMasterFormik.values.name}
                        onBlur={priceMasterFormik.handleBlur}
                        onChange={priceMasterFormik.handleChange}
                        autoFocus={true}
                      />
                      {!!priceMasterFormik.touched.name &&
                        priceMasterFormik.errors.name && (
                          <FormHelperText error>
                            {priceMasterFormik.errors.name}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </div>
                </div>

                <div className="bg-black-15 border-grey-5 rounded-8 p-3 row features mt-4">
                  <div className="d-flex flex-column col-12 px-0 justify-content-between">
                    <div className="d-flex align-items-center">
                      <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
                        Add Fields
                      </h6>
                    </div>
                    <small className="text-grey-6 mt-1 d-block">
                      ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </small>
                  </div>
                  <div className="col-12 px-0">
                    <hr className="hr-grey-6 mt-3 mb-0" />
                  </div>

                  <div
                    className="col-12 d-flex px-0 mt-3"
                    style={{ gap: "20px" }}
                  >
                    <FormControl size="small">
                      <Autocomplete
                        id="type"
                        freeSolo
                        size="small"
                        options={FIELDS_DATA}
                        name="type"
                        onBlur={priceMasterFormik.handleBlur}
                        onChange={changeTypeHandler}
                        value={selectedType}
                        getOptionLabel={(option) => option.title}
                        renderOption={(props, option) => (
                          <li {...props}>
                            <small className="text-lightBlue my-1">
                              {option.title}
                            </small>
                          </li>
                        )}
                        sx={{
                          width: 200,
                        }}
                        renderInput={(params) => (
                          <TextField {...params} placeholder="Search" />
                        )}
                      />
                      {!!priceMasterFormik.touched.type &&
                        priceMasterFormik.errors.type && (
                          <FormHelperText error>
                            {priceMasterFormik.errors.type}
                          </FormHelperText>
                        )}
                    </FormControl>
                    {priceMasterFormik.values.type === "option" && (
                      <FormControl size="small">
                        <Autocomplete
                          id="entityId"
                          clearOnBlur={true}
                          freeSolo
                          size="small"
                          options={priceMasterState.data}
                          name="entityId"
                          onBlur={priceMasterFormik.handleBlur}
                          onChange={changeEntityHandler}
                          value={selectedEntity}
                          getOptionLabel={(option) => option.title}
                          renderOption={(props, option) => (
                            <li {...props}>
                              <small className="text-lightBlue my-1">
                                {option.title}
                              </small>
                            </li>
                          )}
                          sx={{
                            width: 200,
                          }}
                          renderInput={(params) => (
                            <TextField {...params} placeholder="Search" />
                          )}
                        />
                        {!!priceMasterFormik.touched.entityId &&
                          priceMasterFormik.errors.entityId && (
                            <FormHelperText error>
                              {priceMasterFormik.errors.entityId}
                            </FormHelperText>
                          )}
                      </FormControl>
                    )}
                  </div>
                </div>
                <div className="bg-black-15 border-grey-5 rounded-8 p-3 row features mt-4">
                  <div className="d-flex flex-column col-12 px-0 justify-content-between pt-3">
                    <div className="d-flex align-items-center">
                      <h6 className="text-lightBlue text-lightBlue fw-500">
                        Price Type
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
                  <div className="col-12 px-0">
                    <hr className="hr-grey-6 mt-3 mb-0" />
                  </div>
                  <div className="col-12 d-flex flex-column px-0 mt-3">
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="priceType"
                        value={priceMasterFormik.values.priceType}
                        onBlur={priceMasterFormik.handleBlur}
                        onChange={priceMasterFormik.handleChange}
                      >
                        <FormControlLabel
                          value="default"
                          control={<Radio size="small" />}
                          label="Default Pricing (Selection between Fixed pricing on per gram pricing)"
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: 13,
                              color: "#c8d8ff",
                              // color: "#5C6D8E",
                            },
                          }}
                        />

                        <FormControlLabel
                          value="weightRange"
                          control={<Radio size="small" />}
                          label="Weight Range Pricing (Min Weight - Max Weight)"
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: 13,
                              color: "#c8d8ff",
                              // color: "#5C6D8E",
                            },
                          }}
                        />
                      </RadioGroup>
                      {!!priceMasterFormik.touched.priceType &&
                        priceMasterFormik.errors.priceType && (
                          <FormHelperText error>
                            {priceMasterFormik.errors.priceType}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
                <UploadMediaBox
                  imageName={addMedia}
                  headingName={"Media"}
                  UploadChange={uploadMediaHandler}
                  previousImage={priceMasterFormik.values.mediaUrl}
                />

                <NotesBox
                  name="notes"
                  value={priceMasterFormik.values.notes}
                  onBlur={priceMasterFormik.handleBlur}
                  onChange={priceMasterFormik.handleChange}
                />
              </div>
            </div>
            <SaveFooterTertiary
              show={id ? priceMasterState.isEditing : true}
              onDiscard={backHandler}
              isLoading={priceMasterState.isLoading}
            />
          </form>
        )}
        <DiscardModalSecondary
          when={
            priceMasterState.createdSuccess
              ? false
              : !_.isEqual(
                  priceMasterFormik.values,
                  priceMasterFormik.initialValues
                )
          }
          message="master"
        />
      </div>
    </>
  );
};

export default CreatePriceMaster;
