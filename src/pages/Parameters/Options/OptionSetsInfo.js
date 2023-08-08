import { useEffect, useReducer, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import {
  FormControl,
  OutlinedInput,
  Tooltip,
  Grid,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import _ from "lodash";

import InfoHeader from "../../../components/Header/InfoHeader";
import { SaveFooterTertiary } from "../../../components/SaveFooter/SaveFooter";
import { AntSwitch } from "../../../components/AntSwitch/AntSwitch";
import OptionsAttributeTable from "./OptionsAttributeTable";
import { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";
import PageLoader from "../../../components/Loader/PageLoader";
import OptionSet from "../../../components/Options/OptionSet/OptionSet";

import info from "../../../assets/icons/info.svg";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import { useGetAllCategoriesQuery } from "../../../features/parameters/categories/categoriesApiSlice";
import {
  useGetAllOptionSetsQuery,
  useCreateOptionSetMutation,
  useUpdateOptionSetMutation,
  useDeleteOptionSetMutation,
} from "../../../features/parameters/options/optionSetsApiSlice";

const FRONTEND_APPEARANCE = [
  {
    id: 1,
    value: "dropDownList",
    text: "Drop-Down List",
  },
  {
    id: 2,
    value: "dropDownThumbnail",
    text: "Drop-Down List with Thumbnail",
  },
  {
    id: 3,
    value: "colorAndImageSwatches",
    text: "Color & Image Swatches",
  },
  {
    id: 4,
    value: "radioButtons",
    text: "Radio Buttons",
  },
  {
    id: 5,
    value: "rectangleButtons",
    text: "Rectangle Buttons",
  },
  {
    id: 6,
    value: "circleButtons",
    text: "Circle Buttons",
  },
];

const optionSetValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  isProduct: Yup.boolean().required("Required"),
  categoryId: Yup.string().optional(),
  option: Yup.array().of(
    Yup.object({
      attribute: Yup.array().of(
        Yup.object({
          expanded: Yup.boolean().optional(),
          id: Yup.string().required("Required"),
          metaAttributes: Yup.array()
            .of(
              Yup.object({
                id: Yup.string().required("Required"),
                metaSubAttribute: Yup.array().of(
                  Yup.object({
                    id: Yup.string().required("Required"),
                    metaSubAttributeValue: Yup.array()
                      .of(Yup.string().required("Required"))
                      .when(["id"], ([id], schema) => {
                        if (id) {
                          return schema
                            .min(1, "Minimum 1 sub attribute required")
                            .required("Required");
                        }
                        return schema;
                      }),
                  })
                ),
              })
            )
            .when(["id"], ([id], schema) => {
              if (id) {
                return schema
                  .min(1, "Minimum 1 attribute required")
                  .required("Required");
              }
              return schema;
            }),
        })
      ),
    })
  ),
});

const initialOptionSetQueryFilterState = {
  srNo: null,
  order: null,
  pageSize: 1,
  pageNo: 0,
};

const initialOptionSetState = {
  totalCount: 0,
  nextCount: 0,
  prevCount: 0,
  isEditing: false,
  deleteIndex: null,
  confirmationMessage: "",
  showDeleteModal: false,
  deleteTitle: "",
  createdSuccess: false,
};

const optionSetQueryFilterReducer = (state, action) => {
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
  return initialOptionSetQueryFilterState;
};

const optionSetReducer = (state, action) => {
  if (action.type === "SET_DELETE") {
    return {
      ...state,
      deleteIndex: action.deleteIndex,
      confirmationMessage: action.message || "",
      showDeleteModal: true,
      deleteTitle: action.deleteTitle,
    };
  }
  if (action.type === "REMOVE_DELETE") {
    return {
      ...state,
      deleteIndex: initialOptionSetState.deleteIndex,
      confirmationMessage: initialOptionSetState.confirmationMessage,
      showDeleteModal: initialOptionSetState.showDeleteModal,
      deleteTitle: initialOptionSetState.deleteTitle,
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

  return initialOptionSetState;
};

const EMPTY_OPTION = {
  attribute: [
    {
      expanded: true,
      id: "",
      metaAttributes: [],
    },
  ],
};

const OptionSetsInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams("");
  let { id } = useParams();
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [optionSetQueryFilterState, dispatchOptionSetQueryFilter] = useReducer(
    optionSetQueryFilterReducer,
    initialOptionSetQueryFilterState
  );
  const [optionSetState, dispatchOptionSet] = useReducer(
    optionSetReducer,
    initialOptionSetState
  );

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    error: categoriesError,
    isError: categoriesIsError,
    isSuccess: categoriesIsSuccess,
  } = useGetAllCategoriesQuery();

  const [
    createOptionSet,
    {
      isLoading: createOptionSetIsLoading,
      isSuccess: createOptionSetIsSuccess,
      error: createOptionSetError,
      isError: createOptionSetIsError,
    },
  ] = useCreateOptionSetMutation();

  const {
    data: optionSetsData,
    isLoading: optionSetsIsLoading,
    error: optionSetsError,
    isError: optionSetsIsError,
    isSuccess: optionSetsIsSuccess,
  } = useGetAllOptionSetsQuery(optionSetQueryFilterState, {
    skip: optionSetQueryFilterState.srNo ? false : true,
  });

  const [
    updateOptionSet,
    {
      isLoading: updateOptionSetIsLoading,
      isSuccess: updateOptionSetIsSuccess,
      error: updateOptionSetError,
      isError: updateOptionSetIsError,
    },
  ] = useUpdateOptionSetMutation();

  const optionSetFormik = useFormik({
    initialValues: {
      name: optionSetsData?.data[0]?.name || "",
      isProduct: optionSetsData?.data[0]?.isProduct || false,
      categoryId: optionSetsData?.data[0]?.categoryId || "",
      option: optionSetsData?.data[0]?.option.length
        ? optionSetsData.data[0].option?.map((set) => {
            return {
              attribute: set.attribute?.map((option) => {
                return {
                  id: option.id,
                  metaAttributes: option.metaAttributes?.map((attr) => {
                    return {
                      id: attr.id,
                      metaSubAttribute: attr.metaSubAttribute.map((subOp) => {
                        return {
                          id: subOp.id,
                          metaSubAttributeValue:
                            subOp.metaSubAttributeValue.map((subAttr) => {
                              return subAttr._id;
                            }),
                        };
                      }),
                    };
                  }),
                };
              }),
            };
          })
        : [],
    },
    enableReinitialize: true,
    validationSchema: optionSetValidationSchema,
    onSubmit: (values) => {
      const optionSet = structuredClone(values);
      for (const key in optionSet) {
        if (
          optionSet[key] === "" ||
          optionSet[key] === null ||
          optionSet[key] === undefined
        )
          delete optionSet[key];
      }
      if (id) {
        updateOptionSet({
          id: optionSetsData?.data[0]._id,
          details: optionSet,
        })
          .unwrap()
          .then(() => {
            optionSetFormik.resetForm();
            dispatch(
              showSuccess({
                message: "Option set edited successfully",
              })
            );
          })
          .catch((error) => {
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
        return;
      }
      createOptionSet(optionSet)
        .unwrap()
        .then(() => {
          optionSetFormik.resetForm();
          dispatch(
            showSuccess({
              message: "Option set created successfully",
            })
          );
          dispatchOptionSet({ type: "ENABLE_SUCCESS" });
        })
        .catch((error) => {
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
    },
  });

  const backHandler = () => {
    navigate({
      pathname: "/parameters/options",
      search: `?${createSearchParams({
        search: searchParams.get("search"),
      })}`,
    });
  };

  const nextPageHandler = () => {
    dispatchOptionSetQueryFilter({ type: "SET_NEXT_ORDER" });
  };

  const prevPageHandler = () => {
    dispatchOptionSetQueryFilter({ type: "SET_PREV_ORDER" });
  };

  const deleteOptionHandler = ({ deleteIndex, message }) => {
    dispatchOptionSet({
      type: "SET_DELETE",
      deleteIndex,
      message,
      deleteTitle: "option",
    });
  };

  const cancelDeleteOptionHandler = () => {
    dispatchOptionSet({ type: "REMOVE_DELETE" });
  };

  const deleteConfirmationHandler = () => {
    const updatedOption = optionSetFormik.values.option?.filter((_, index) => {
      return index !== optionSetState.deleteIndex;
    });
    optionSetFormik.setFieldValue("option", updatedOption);

    dispatchOptionSet({ type: "REMOVE_DELETE" });
  };

  const addOptionHandler = () => {
    const updatedOptions = optionSetFormik.values.option?.concat(EMPTY_OPTION);
    optionSetFormik.setFieldValue("option", updatedOptions);
  };

  const pageLoadingHandler = useCallback((value) => {
    setPageIsLoading(true);
  }, []);

  useEffect(() => {
    if (id) {
      dispatchOptionSetQueryFilter({ type: "SET_SR_NO", srNo: id });
    }
  }, [id]);

  useEffect(() => {
    if (
      id &&
      !_.isEqual(optionSetFormik.values, optionSetFormik.initialValues)
    ) {
      dispatchOptionSet({ type: "ENABLE_EDIT" });
    } else if (
      id &&
      _.isEqual(optionSetFormik.values, optionSetFormik.initialValues)
    ) {
      dispatchOptionSet({ type: "DISABLE_EDIT" });
    }
  }, [optionSetFormik.initialValues, optionSetFormik.values, id]);

  useEffect(() => {
    let isLoading = categoriesIsLoading;
    if (optionSetQueryFilterState.srNo) {
      isLoading = categoriesIsLoading || optionSetsIsLoading;
    }
    if (isLoading) {
      setPageIsLoading(true);
    } else {
      setPageIsLoading(false);
    }
  }, [
    categoriesIsLoading,
    optionSetsIsLoading,
    optionSetQueryFilterState.srNo,
  ]);

  useEffect(() => {
    if (optionSetState.createdSuccess) {
      navigate({
        pathname: "/parameters/options",
        search: `?${createSearchParams({
          search: searchParams.get("search"),
        })}`,
      });
    }
  }, [optionSetState.createdSuccess, navigate, searchParams]);

  return (
    <>
      {pageIsLoading && <PageLoader />}
      <div className="page container-fluid position-relative user-group product-tab-page">
        <InfoHeader
          title={
            optionSetFormik.values.name ||
            (id ? "Edit Option Sets" : "Create Option Sets")
          }
          onBack={backHandler}
          onPrev={prevPageHandler}
          onNext={nextPageHandler}
          isEdit={!!id}
          hasPrev={optionSetState.prevCount}
          hasNext={optionSetState.nextCount}
        />

        {!pageIsLoading && (
          <form
            className="product-form"
            noValidate
            onSubmit={optionSetFormik.handleSubmit}
          >
            <div className="row mt-3">
              <div className="col-lg-9 mt-3">
                <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mb-3">
                  <div className="col-md-12 px-0 d-flex">
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <div className="d-flex mb-1">
                          <label className="small text-lightBlue me-2">
                            Enter Shared options Title
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
                            sx={{ paddingLeft: 0 }}
                            name="name"
                            value={optionSetFormik.values.name}
                            onBlur={optionSetFormik.handleBlur}
                            onChange={optionSetFormik.handleChange}
                            autoFocus={true}
                          />
                          {!!optionSetFormik.touched.name &&
                            optionSetFormik.errors.name && (
                              <FormHelperText error>
                                {optionSetFormik.errors.name}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Grid>
                      <Grid item md={6}>
                        <div>
                          <div className="d-flex  mb-1">
                            <p className="text-lightBlue me-2">
                              Apply to{" "}
                              <span style={{ color: "#5c6d8e" }}>
                                (optional)
                              </span>
                            </p>
                            <Tooltip title="Lorem ipsum" placement="top">
                              <img
                                src={info}
                                alt="info"
                                className=" c-pointer"
                                width={13.5}
                              />
                            </Tooltip>
                          </div>
                          <FormControl
                            sx={{
                              m: 0,
                              minWidth: 120,
                              width: "100%",
                            }}
                            size="small"
                          >
                            <Select
                              labelId="demo-select-small"
                              id="demo-select-small"
                              size="small"
                              name="categoryId"
                              value={optionSetFormik.values.categoryId}
                              onBlur={optionSetFormik.handleBlur}
                              onChange={optionSetFormik.handleChange}
                            >
                              {categoriesData?.data?.data?.length &&
                                categoriesData?.data?.data.map((category) => {
                                  return (
                                    <MenuItem
                                      key={category._id}
                                      value={category._id}
                                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                                    >
                                      {category.name}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>

                <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
                  <div className="col-md-12 px-0 d-flex">
                    <Grid container spacing={2}>
                      <Grid item sm={6}>
                        <div className="d-flex mb-1">
                          <label className="text-lightBlue me-2">
                            Make Option Sets
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

                        <div className="d-flex mb-1">
                          <Tooltip title="Lorem ipsum" placement="top">
                            <img
                              src={info}
                              alt="info"
                              className=" c-pointer me-1"
                              width={8.5}
                            />
                          </Tooltip>
                          <small className="ex-small text-grey-6">
                            If this product has options, like size or color then
                            add option
                          </small>
                        </div>
                      </Grid>
                      <Grid
                        item
                        sm={6}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          type="button"
                          onClick={addOptionHandler}
                          className="button-gradient py-2 px-4 ms-3 c-pointer"
                        >
                          <p>+ Add Options</p>
                        </button>
                      </Grid>
                    </Grid>
                  </div>
                  {optionSetFormik.values.option.map((option, index) => {
                    return (
                      <OptionSet
                        key={index}
                        isEdit={id}
                        onOptionDelete={deleteOptionHandler}
                        index={index}
                        formik={optionSetFormik}
                        isSubmitting={optionSetFormik.isSubmitting}
                        onPageLoad={pageLoadingHandler}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <SaveFooterTertiary
              show={id ? optionSetState.isEditing : true}
              onDiscard={backHandler}
              isLoading={createOptionSetIsLoading}
            />
          </form>
        )}
        <DeleteModalSecondary
          onConfirm={deleteConfirmationHandler}
          onCancel={cancelDeleteOptionHandler}
          show={optionSetState.showDeleteModal}
          message={optionSetState.confirmationMessage}
          title={optionSetState.deleteTitle}
        />
        <DiscardModalSecondary
          when={
            optionSetState.createdSuccess
              ? false
              : !_.isEqual(
                  optionSetFormik.values,
                  optionSetFormik.initialValues
                )
          }
          message="option"
        />
      </div>
    </>
  );
};

export default OptionSetsInfo;
