import { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

import info from "../../../assets/icons/info.svg";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import {
  useGetAllOptionsQuery,
  useCreateOptionMutation,
  useUpdateOptionMutation,
  useGetAllAttributesQuery,
  useCreateAttributeMutation,
  useUpdateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAllSubOptionsQuery,
  useCreateSubOptionMutation,
  useUpdateSubOptionMutation,
  useDeleteSubOptionMutation,
  useGetAllSubAttributesQuery,
  useCreateSubAttributeMutation,
  useUpdateSubAttributeMutation,
  useDeleteSubAttributeMutation,
} from "../../../features/parameters/options/optionsApiSlice";

import { colorReg, urlReg } from "../../../utils/regex";
import { AssignmentReturn } from "@mui/icons-material";

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

const optionValidationSchema = Yup.object({
  option: Yup.object({
    _id: Yup.string(),
    title: Yup.string().trim().min(3, "Too short").required("Required"),
    apperance: Yup.string()
      .oneOf([
        "dropDownList",
        "dropDownThumbnail",
        "colorAndImageSwatches",
        "radioButtons",
        "rectangleButtons",
        "circleButtons",
      ])
      .required("Required"),
    type: Yup.string().oneOf(["optionset", "custom"]).required("Required"),
    frontEndTitle: Yup.string().trim().min(3, "Too short").required("Required"),
    isFilter: Yup.boolean().required("Required"),
    isPriceMaster: Yup.boolean().required("Required"),
    saved: Yup.boolean(),
  }),
  attributes: Yup.array()
    .of(
      Yup.object({
        _id: Yup.string(),
        title: Yup.string().trim().min(3, "Too short").required("Required"),
        colour: Yup.string()
          .trim()
          .matches(colorReg, "Not valid")
          .when(["value"], ([value], schema) => {
            if (value === "colour") {
              return schema.required("Required");
            }
            return schema;
          }),
        imageUrl: Yup.string()
          .trim()
          .matches(urlReg, "Not valid")
          .when(["value", "apperance"], ([value, apperance], schema) => {
            if (value === "imageUrl" || apperance === "dropDownThumbnail") {
              return schema.required("Required");
            }
            return schema;
          }),
        type: Yup.string().oneOf(["optionset", "custom"]).required("Required"),
        value: Yup.string()
          .oneOf(["colour", "imageUrl"])
          .when(["apperance"], ([apperance], schema) => {
            if (apperance === "colorAndImageSwatches") {
              return schema.required("Required");
            }
            return schema;
          }),
        apperance: Yup.string()
          .oneOf([
            "dropDownList",
            "dropDownThumbnail",
            "colorAndImageSwatches",
            "radioButtons",
            "rectangleButtons",
            "circleButtons",
          ])
          .required("Required"),
        saved: Yup.boolean(),
      })
    )
    .min(1)
    .required("Required"),
  subOptions: Yup.array().of(
    Yup.object({
      _id: Yup.string(),
      metaAttribute: Yup.string(),
      title: Yup.string().trim().min(3, "Too short").required("Required"),
      apperance: Yup.string()
        .oneOf([
          "dropDownList",
          "dropDownThumbnail",
          "colorAndImageSwatches",
          "radioButtons",
          "rectangleButtons",
          "circleButtons",
        ])
        .required("Required"),
      saved: Yup.boolean(),
      isOption: Yup.boolean(),
    })
  ),
  subAttributes: Yup.array()
    .of(
      Yup.object({
        _id: Yup.string(),
        metaAttribute: Yup.string(),
        metaSubAttribute: Yup.string(),
        title: Yup.string().trim().min(3, "Too short").required("Required"),
        colour: Yup.string()
          .trim()
          .matches(colorReg, "Not valid")
          .when(["value"], ([value], schema) => {
            if (value === "colour") {
              return schema.required("Required");
            }
            return schema;
          }),
        imageUrl: Yup.string()
          .trim()
          .matches(urlReg, "Not valid")
          .when(["value", "apperance"], ([value, apperance], schema) => {
            if (value === "imageUrl" || apperance === "dropDownThumbnail") {
              return schema.required("Required");
            }
            return schema;
          }),
        type: Yup.string().oneOf(["optionset", "custom"]).required("Required"),
        value: Yup.string()
          .oneOf(["colour", "imageUrl"])
          .when(["apperance"], ([apperance], schema) => {
            if (apperance === "colorAndImageSwatches") {
              return schema.required("Required");
            }
            return schema;
          }),
        apperance: Yup.string()
          .oneOf([
            "dropDownList",
            "dropDownThumbnail",
            "colorAndImageSwatches",
            "radioButtons",
            "rectangleButtons",
            "circleButtons",
          ])
          .required("Required"),
        saved: Yup.boolean(),
        isOption: Yup.boolean(),
      })
    )
    .when(["subOptions"], ([subOptions], schema) => {
      if (subOptions.length) {
        return schema.min(1).required("Required");
      }
      return schema;
    }),
});

const initialOptionQueryFilterState = {
  id: null,
  pageSize: 1,
  pageNo: null,
};

const initialOptionState = {
  totalCount: 0,
  isEditing: false,
  deleteId: null,
  saved: false,
  confirmationMessage: "",
  showDeleteModal: false,
  deleteTitle: "",
  deleteType: "",
  isLoading: false,
};

const initialDeletedOptionState = {
  attributes: [],
  subOptions: [],
  subAttributes: [],
};

const optionQueryFilterReducer = (state, action) => {
  if (action.type === "SET_PAGE_NO") {
    return {
      ...state,
      id: initialOptionQueryFilterState.id,
      pageNo: +action.pageNo,
    };
  }
  if (action.type === "SET_ID") {
    return {
      ...initialOptionQueryFilterState,
      id: action.id,
    };
  }
  return initialOptionQueryFilterState;
};

const optionReducer = (state, action) => {
  if (action.type === "SET_DELETE") {
    return {
      ...state,
      deleteId: action.deleteId,
      saved: action.saved,
      confirmationMessage: action.message || "",
      showDeleteModal: true,
      deleteTitle: action.deleteTitle,
      deleteType: action.deleteType,
    };
  }
  if (action.type === "REMOVE_DELETE") {
    return {
      ...state,
      deleteId: initialOptionState.deleteId,
      saved: initialOptionState.saved,
      confirmationMessage: initialOptionState.confirmationMessage,
      showDeleteModal: initialOptionState.showDeleteModal,
      deleteTitle: initialOptionState.deleteTitle,
      deleteType: initialOptionState.deleteType,
    };
  }
  if (action.type === "SET_TOTAL_COUNT") {
    return {
      ...state,
      totalCount: action.totalCount,
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

  return initialOptionState;
};

const deleteOptionReducer = (state, action) => {
  if (action.type === "SET_DELETED_ATTRIBUTES") {
    return {
      ...state,
      attributes: state.attributes.concat({
        ...action.attribute,
        deleted: true,
      }),
    };
  }
  if (action.type === "REMOVE_DELETED_ATTRIBUTES") {
    const updatedAttr = state.attributes.filter(
      (attr) => attr._id !== action.id
    );
    return {
      ...state,
      attributes: updatedAttr,
    };
  }
  if (action.type === "SET_DELETED_SUB_OPTIONS") {
    return {
      ...state,
      subOptions: state.subOptions.concat({
        ...action.subOption,
        deleted: true,
      }),
    };
  }
  if (action.type === "REMOVE_DELETED_SUB_OPTIONS") {
    const updatedSubOp = state.subOptions.filter(
      (subOp) => subOp._id !== action.id
    );
    return {
      ...state,
      subOptions: updatedSubOp,
    };
  }
  if (action.type === "SET_DELETED_SUB_ATTRIBUTES") {
    return {
      ...state,
      subAttributes: state.subAttributes.concat({
        ...action.subAttribute,
        deleted: true,
      }),
    };
  }
  if (action.type === "REMOVE_DELETED_SUB_ATTRIBUTES") {
    const updatedSubAttr = state.subAttributes.filter(
      (subAttr) => subAttr._id !== action.id
    );
    return {
      ...state,
      subAttributes: updatedSubAttr,
    };
  }
  return initialDeletedOptionState;
};

const OptionsInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const [optionQueryFilterState, dispatchOptionQueryFilter] = useReducer(
    optionQueryFilterReducer,
    initialOptionQueryFilterState
  );
  const [optionState, dispatchOption] = useReducer(
    optionReducer,
    initialOptionState
  );
  const [deleteOptionState, dispatchDeleteOption] = useReducer(
    deleteOptionReducer,
    initialDeletedOptionState
  );

  const {
    data: optionsData,
    isLoading: optionsIsLoading,
    error: optionsError,
    isError: optionsIsError,
    isSuccess: optionsIsSuccess,
    isFetching: optionsDataIsFetching,
  } = useGetAllOptionsQuery(optionQueryFilterState, {
    skip:
      optionQueryFilterState.pageNo || optionQueryFilterState.id ? false : true,
  });

  const {
    data: attributesData,
    isLoading: attributesIsLoading,
    error: attributesError,
    isError: attributesIsError,
    isSuccess: attributesIsSuccess,
    isFetching: attributesDataIsFetching,
  } = useGetAllAttributesQuery(
    { attribute: optionsData?.data?.length && optionsData?.data[0]?._id },
    {
      skip:
        optionsData?.data?.length && optionsData?.data[0]?._id ? false : true,
    }
  );
  const {
    data: subOptionsData,
    isLoading: subOptionsIsLoading,
    error: subOptionsError,
    isError: subOptionsIsError,
    isSuccess: subOptionsIsSuccess,
    isFetching: subOptionsDataIsFetching,
  } = useGetAllSubOptionsQuery(
    { attribute: optionsData?.data?.length && optionsData?.data[0]?._id },
    {
      skip:
        optionsData?.data?.length && optionsData?.data[0]?._id ? false : true,
    }
  );
  const {
    data: subAttributesData,
    isLoading: subAttributesIsLoading,
    error: subAttributesError,
    isError: subAttributesIsError,
    isSuccess: subAttributesIsSuccess,
    isFetching: subAttributesDataIsFetching,
  } = useGetAllSubAttributesQuery(
    { attribute: optionsData?.data?.length && optionsData?.data[0]?._id },
    {
      skip:
        optionsData?.data?.length && optionsData?.data[0]?._id ? false : true,
    }
  );

  const [
    createOption,
    {
      isLoading: createOptionIsLoading,
      isSuccess: createOptionIsSuccess,
      error: createOptionError,
      isError: createOptionIsError,
    },
  ] = useCreateOptionMutation();
  const [
    updateOption,
    {
      isLoading: updateOptionIsLoading,
      isSuccess: updateOptionIsSuccess,
      error: updateOptionError,
      isError: updateOptionIsError,
    },
  ] = useUpdateOptionMutation();
  const [
    createAttribute,
    {
      isLoading: createAttributeIsLoading,
      isSuccess: createAttributeIsSuccess,
      error: createAttributeError,
      isError: createAttributeIsError,
    },
  ] = useCreateAttributeMutation();
  const [
    updateAttribute,
    {
      isLoading: updateAttributeIsLoading,
      isSuccess: updateAttributeIsSuccess,
      error: updateAttributeError,
      isError: updateAttributeIsError,
    },
  ] = useUpdateAttributeMutation();
  const [
    deleteAttribute,
    {
      isLoading: deleteAttributeIsLoading,
      isSuccess: deleteAttributeIsSuccess,
      error: deleteAttributeError,
      isError: deleteAttributeIsError,
    },
  ] = useDeleteAttributeMutation();
  const [
    createSubOption,
    {
      isLoading: createSubOptionIsLoading,
      isSuccess: createSubOptionIsSuccess,
      error: createSubOptionError,
      isError: createSubOptionIsError,
    },
  ] = useCreateSubOptionMutation();
  const [
    updateSubOption,
    {
      isLoading: updateSubOptionIsLoading,
      isSuccess: updateSubOptionIsSuccess,
      error: updateSubOptionError,
      isError: updateSubOptionIsError,
    },
  ] = useUpdateSubOptionMutation();
  const [
    deleteSubOption,
    {
      isLoading: deleteSubOptionIsLoading,
      isSuccess: deleteSubOptionIsSuccess,
      error: deleteSubOptionError,
      isError: deleteSubOptionIsError,
    },
  ] = useDeleteSubOptionMutation();
  const [
    createSubAttribute,
    {
      isLoading: createSubAttributeIsLoading,
      isSuccess: createSubAttributeIsSuccess,
      error: createSubAttributeError,
      isError: createSubAttributeIsError,
    },
  ] = useCreateSubAttributeMutation();
  const [
    updateSubAttribute,
    {
      isLoading: updateSubAttributeIsLoading,
      isSuccess: updateSubAttributeIsSuccess,
      error: updateSubAttributeError,
      isError: updateSubAttributeIsError,
    },
  ] = useUpdateSubAttributeMutation();
  const [
    deleteSubAttribute,
    {
      isLoading: deleteSubAttributeIsLoading,
      isSuccess: deleteSubAttributeIsSuccess,
      error: deleteSubAttributeError,
      isError: deleteSubAttributeIsError,
    },
  ] = useDeleteSubAttributeMutation();

  const optionFormik = useFormik({
    initialValues: {
      option: {
        _id: "option-0",
        title: "",
        apperance: "dropDownList",
        type: "optionset",
        frontEndTitle: "",
        isFilter: false,
        isPriceMaster: false,
        saved: false,
      },
      attributes: [
        {
          _id: "attribute-0",
          title: "",
          colour: "#000000",
          imageUrl: "",
          type: "optionset",
          value: "colour",
          apperance: "dropDownList",
          saved: false,
        },
      ],
      subOptions: [],
      subAttributes: [],
    },
    enableReinitialize: true,
    validationSchema: optionValidationSchema,
    onSubmit: async (values) => {
      const option = values.option;
      const attributes = values.attributes;
      const subOptions = values.subOptions;
      const subAttributes = values.subAttributes;

      try {
        dispatchOption({ type: "ENABLE_LOADING" });
        if (!option.saved) {
          const { _id } = await createOption(option).unwrap();
          option._id = _id;
          option.saved = true;
        } else {
          await updateOption({ details: option, id: option._id }).unwrap();
        }
        const attributePromises = await Promise.allSettled(
          attributes.concat(deleteOptionState.attributes).map((attr) => {
            if (!attr.saved && !attr.deleted) {
              attr.attribute = option._id;
              const attrCopy = structuredClone(attr);
              Object.keys(attrCopy).forEach((key) => {
                if (attrCopy[key] === (null || undefined || ""))
                  delete attrCopy[key];
              });

              return new Promise((resolve, reject) => {
                createAttribute(attrCopy)
                  .unwrap()
                  .then(({ _id }) => {
                    attr.saved = true;
                    subOptions.forEach((subOption) => {
                      if (subOption.metaAttribute === attr._id) {
                        subOption.metaAttribute = _id;
                      }
                    });
                    attr._id = _id;
                    resolve();
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
            } else if (attr.saved && !attr.deleted) {
              const attrCopy = structuredClone(attr);
              Object.keys(attrCopy).forEach((key) => {
                if (attrCopy[key] === (null || undefined || ""))
                  delete attrCopy[key];
              });
              return new Promise((resolve, reject) => {
                updateAttribute({ details: attrCopy, id: attr._id })
                  .unwrap()
                  .then(() => {
                    resolve();
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
            } else if (attr.saved && attr.deleted) {
              return new Promise((resolve, reject) => {
                deleteAttribute(attr._id)
                  .unwrap()
                  .then(() => {
                    dispatchDeleteOption({
                      type: "REMOVE_DELETED_ATTRIBUTES",
                      id: attr._id,
                    });
                    resolve();
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
            } else {
              return null;
            }
          })
        );
        attributePromises.forEach((attrPromise) => {
          if (attrPromise.status === "rejected") {
            throw attrPromise.reason;
          }
        });
        const subOptionPromises = await Promise.allSettled(
          subOptions.concat(deleteOptionState.subOptions).map((subOp) => {
            if (!subOp.saved && !subOp.deleted) {
              subOp.attribute = option._id;
              const subOpCopy = structuredClone(subOp);
              Object.keys(subOpCopy).forEach((key) => {
                if (subOpCopy[key] === (null || undefined || ""))
                  delete subOpCopy[key];
              });
              return new Promise((resolve, reject) => {
                createSubOption(subOpCopy)
                  .unwrap()
                  .then(({ _id }) => {
                    subOp.saved = true;
                    subAttributes.forEach((subAttribute) => {
                      if (subAttribute.metaSubAttribute === subOp._id) {
                        subAttribute.metaAttribute = subOp.metaAttribute;
                        subAttribute.metaSubAttribute = _id;
                      }
                    });
                    subOp._id = _id;
                    resolve();
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
            } else if (subOp.saved && !subOp.deleted) {
              const subOpCopy = structuredClone(subOp);
              Object.keys(subOpCopy).forEach((key) => {
                if (subOpCopy[key] === (null || undefined || ""))
                  delete subOpCopy[key];
              });
              return new Promise((resolve, reject) => {
                updateSubOption({ details: subOpCopy, id: subOp._id })
                  .unwrap()
                  .then(() => {
                    resolve();
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
            } else if (subOp.saved && subOp.deleted) {
              return new Promise((resolve, reject) => {
                deleteSubOption(subOp._id)
                  .unwrap()
                  .then(() => {
                    dispatchDeleteOption({
                      type: "REMOVE_DELETED_SUB_OPTIONS",
                      id: subOp._id,
                    });
                    resolve();
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
            } else {
              return null;
            }
          })
        );
        subOptionPromises.forEach((subOpPromise) => {
          if (subOpPromise.status === "rejected") {
            throw subOpPromise.reason;
          }
        });
        const subAttributePromises = await Promise.allSettled(
          subAttributes
            .concat(deleteOptionState.subAttributes)
            .map((subAttr) => {
              if (!subAttr.saved && !subAttr.deleted) {
                subAttr.attribute = option._id;
                const subAttrCopy = structuredClone(subAttr);
                Object.keys(subAttrCopy).forEach((key) => {
                  if (subAttrCopy[key] === (null || undefined || ""))
                    delete subAttrCopy[key];
                });
                return new Promise((resolve, reject) => {
                  createSubAttribute(subAttrCopy)
                    .unwrap()
                    .then(({ _id }) => {
                      subAttr.saved = true;
                      subAttr._id = _id;
                      resolve();
                    })
                    .catch((error) => {
                      reject(error);
                    });
                });
              } else if (subAttr.saved && !subAttr.deleted) {
                const subAttrCopy = structuredClone(subAttr);
                Object.keys(subAttrCopy).forEach((key) => {
                  if (subAttrCopy[key] === (null || undefined || ""))
                    delete subAttrCopy[key];
                });
                return new Promise((resolve, reject) => {
                  updateSubAttribute({ details: subAttrCopy, id: subAttr._id })
                    .unwrap()
                    .then(() => {
                      resolve();
                    })
                    .catch((error) => {
                      reject(error);
                    });
                });
              } else if (subAttr.saved && subAttr.deleted) {
                return new Promise((resolve, reject) => {
                  deleteSubAttribute(subAttr._id)
                    .unwrap()
                    .then(() => {
                      dispatchDeleteOption({
                        type: "REMOVE_DELETED_SUB_ATTRIBUTES",
                        id: subAttr._id,
                      });
                      resolve();
                    })
                    .catch((error) => {
                      reject(error);
                    });
                });
              } else {
                return null;
              }
            })
        );
        subAttributePromises.forEach((subAttrPromise) => {
          if (subAttrPromise.status === "rejected") {
            throw subAttrPromise.reason;
          }
        });
        optionFormik.resetForm();
        dispatchOption({ type: "DISABLE_LOADING" });
        dispatch(showSuccess({ message: "Option created successfully" }));
      } catch (error) {
        dispatchOption({ type: "DISABLE_LOADING" });
        if (error?.data?.message) {
          dispatch(showError({ message: error.data.message }));
        } else {
          dispatch(
            showError({ message: "Something went wrong!, please try again" })
          );
        }
      }
    },
  });

  const backHandler = () => {
    navigate("/parameters/options");
  };

  const nextPageHandler = () => {
    const { pageNo } = optionQueryFilterState;
    const { totalCount } = optionState;
    if (pageNo + 1 > totalCount) {
      return;
    }
  };

  const prevPageHandler = () => {
    const { pageNo } = optionQueryFilterState;
    if (pageNo - 1 === 0) {
      return;
    }
  };

  const deleteAttributeHandler = ({ deleteId, saved, message }) => {
    if (optionFormik.values.attributes?.length === 1) {
      dispatch(showError({ message: "At least one attribute required" }));
      return;
    }
    dispatchOption({
      type: "SET_DELETE",
      deleteId,
      saved,
      message,
      deleteTitle: "attribute",
      deleteType: "attribute",
    });
  };

  const deleteSubOptionHandler = ({ deleteId, saved, message }) => {
    dispatchOption({
      type: "SET_DELETE",
      deleteId,
      saved,
      message,
      deleteTitle: "sub option",
      deleteType: "subOption",
    });
  };

  const deleteSubAttributeHandler = ({
    subOptionId,
    deleteId,
    saved,
    message,
  }) => {
    const subAttributeArr = optionFormik.values.subAttributes.filter((attr) => {
      return attr.metaSubAttribute === subOptionId;
    });
    if (subAttributeArr?.length === 1) {
      dispatch(showError({ message: "At least one sub attribute required" }));
      return;
    }
    dispatchOption({
      type: "SET_DELETE",
      deleteId,
      saved,
      message,
      deleteTitle: "sub attribute",
      deleteType: "subAttribute",
    });
  };

  const cancelDeleteAttributeHandler = () => {
    dispatchOption({ type: "REMOVE_DELETE" });
  };

  const deleteConfirmationHandler = () => {
    if (optionState.deleteType === "attribute") {
      const updatedAttributes = optionFormik.values.attributes?.filter(
        (attr) => {
          if (attr._id === optionState.deleteId && attr.saved === true) {
            dispatchDeleteOption({
              type: "SET_DELETED_ATTRIBUTES",
              attribute: attr,
            });
          }
          return attr._id !== optionState.deleteId;
        }
      );
      optionFormik.setFieldValue("attributes", updatedAttributes);

      const updatedSubOptions = optionFormik.values.subOptions?.filter(
        (subOption) => {
          if (
            subOption.metaAttribute === optionState.deleteId &&
            subOption.saved === true
          ) {
            dispatchDeleteOption({
              type: "SET_DELETED_SUB_OPTIONS",
              subOption,
            });
          }
          return subOption.metaAttribute !== optionState.deleteId;
        }
      );
      optionFormik.setFieldValue("subOptions", updatedSubOptions);

      const updatedSubAttributes = optionFormik.values.subAttributes?.filter(
        (subAttribute) => {
          if (
            subAttribute.metaAttribute === optionState.deleteId &&
            subAttribute.saved === true
          ) {
            dispatchDeleteOption({
              type: "SET_DELETED_SUB_ATTRIBUTES",
              subAttribute,
            });
          }
          return subAttribute.metaAttribute !== optionState.deleteId;
        }
      );
      optionFormik.setFieldValue("subAttributes", updatedSubAttributes);
    }
    if (optionState.deleteType === "subOption") {
      const updatedSubOptions = optionFormik.values.subOptions?.filter(
        (subOption) => {
          if (
            subOption._id === optionState.deleteId &&
            subOption.saved === true
          ) {
            dispatchDeleteOption({
              type: "SET_DELETED_SUB_OPTIONS",
              subOption,
            });
          }
          return subOption._id !== optionState.deleteId;
        }
      );
      optionFormik.setFieldValue("subOptions", updatedSubOptions);

      const updatedSubAttributes = optionFormik.values.subAttributes?.filter(
        (subAttribute) => {
          if (
            subAttribute.metaSubAttribute === optionState.deleteId &&
            subAttribute.saved === true
          ) {
            dispatchDeleteOption({
              type: "SET_DELETED_SUB_ATTRIBUTES",
              subAttribute,
            });
          }
          return subAttribute.metaSubAttribute !== optionState.deleteId;
        }
      );
      optionFormik.setFieldValue("subAttributes", updatedSubAttributes);
    }
    if (optionState.deleteType === "subAttribute") {
      const updatedSubAttributes = optionFormik.values.subAttributes?.filter(
        (subAttribute) => {
          if (
            subAttribute._id === optionState.deleteId &&
            subAttribute.saved === true
          ) {
            dispatchDeleteOption({
              type: "SET_DELETED_SUB_ATTRIBUTES",
              subAttribute,
            });
          }
          return subAttribute._id !== optionState.deleteId;
        }
      );
      optionFormik.setFieldValue("subAttributes", updatedSubAttributes);
    }

    dispatchOption({ type: "REMOVE_DELETE" });
  };

  const addAttributeFieldHandler = () => {
    const newAttributeFields = optionFormik.values.attributes?.concat({
      _id: `attribute-${
        +optionFormik.values.attributes.slice(-1)[0]._id.split("-")[1] + 1
      }`,
      title: "",
      colour: "#000000",
      imageUrl: "",
      type: "optionset",
      value: "colour",
      apperance: optionFormik.values.option.apperance,
      saved: false,
    });
    optionFormik.setFieldValue("attributes", newAttributeFields);
  };

  const addSubOptionFieldHandler = (id) => {
    const subOptionId = optionFormik.values.subOptions.length
      ? `subOption-${
          +optionFormik.values.subOptions.slice(-1)[0]._id.split("-")[1] + 1
        }`
      : "subOption-0";
    const newSubOptions = optionFormik.values.subOptions?.concat({
      _id: subOptionId,
      metaAttribute: id,
      title: "",
      apperance: "dropDownList",
      saved: false,
      isOption: true,
    });
    optionFormik.setFieldValue("subOptions", newSubOptions);

    const subAttributeId = optionFormik.values.subAttributes.length
      ? `subAttribute-${
          +optionFormik.values.subAttributes.slice(-1)[0]._id.split("-")[1] + 1
        }`
      : "subAttribute-0";

    const newSubAttribute = optionFormik.values.subAttributes?.concat({
      _id: subAttributeId,
      metaAttribute: id,
      metaSubAttribute: subOptionId,
      title: "",
      colour: "#000000",
      imageUrl: "",
      type: "optionset",
      value: "colour",
      apperance: "dropDownList",
      saved: false,
      isOption: true,
    });
    optionFormik.setFieldValue("subAttributes", newSubAttribute);
  };

  const addSubAttributeFieldHandler = ({ attributeId, subOptionId }) => {
    const subAttributeId = optionFormik.values.subAttributes.length
      ? `subAttribute-${
          +optionFormik.values.subAttributes.slice(-1)[0]._id.split("-")[1] + 1
        }`
      : "subAttribute-0";

    const subOptionAppearance = optionFormik.values.subOptions.find(
      (subOption) => subOption._id === subOptionId
    );

    const newSubAttribute = optionFormik.values.subAttributes?.concat({
      _id: subAttributeId,
      metaAttribute: attributeId,
      metaSubAttribute: subOptionId,
      title: "",
      colour: "#000000",
      imageUrl: "",
      type: "optionset",
      value: "colour",
      apperance: subOptionAppearance.apperance,
      saved: false,
      isOption: true,
    });
    optionFormik.setFieldValue("subAttributes", newSubAttribute);
  };

  const optionAppearanceHandler = (e) => {
    optionFormik.setFieldValue("option.apperance", e.target.value);
    optionFormik.values.attributes.forEach((_, index) => {
      optionFormik.setFieldValue(
        `attributes[${index}].apperance`,
        e.target.value
      );
    });
  };

  useEffect(() => {
    if (id) {
      dispatchOptionQueryFilter({ type: "SET_PAGE_NO", pageNo: id });
    }
  }, [id]);

  useEffect(() => {
    if (optionsIsError) {
      if (optionsError?.data?.message) {
        dispatch(showError({ message: optionsError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (optionsIsSuccess) {
      dispatchOption({
        type: "SET_TOTAL_COUNT",
        totalCount: optionsData.totalCount,
      });
    }
  }, [optionsData, optionsError, optionsIsError, optionsIsSuccess, dispatch]);

  useEffect(() => {
    if (id && !_.isEqual(optionFormik.values, optionFormik.initialValues)) {
      dispatchOption({ type: "ENABLE_EDIT" });
    } else if (
      id &&
      _.isEqual(optionFormik.values, optionFormik.initialValues)
    ) {
      dispatchOption({ type: "DISABLE_EDIT" });
    }
  }, [optionFormik.initialValues, optionFormik.values, id]);

  useEffect(() => {
    if (optionsIsSuccess && optionsData.data.length) {
      optionFormik.setFieldValue("option", {
        _id: optionsData?.data[0]?._id,
        title: optionsData?.data[0]?.title,
        apperance: optionsData?.data[0]?.apperance,
        type: optionsData?.data[0]?.type,
        frontEndTitle: optionsData?.data[0]?.frontEndTitle,
        isFilter: optionsData?.data[0]?.isFilter,
        isPriceMaster: optionsData?.data[0]?.isPriceMaster,
        saved: true,
      });
    }
    if (attributesIsSuccess && attributesData.data.length) {
      const attributesMappedData = attributesData.data.map((item) => {
        const value = item.colour ? "colour" : "imageUrl";
        return {
          _id: item._id,
          title: item.title,
          colour: item.colour,
          imageUrl: item.imageUrl,
          type: item.type,
          value,
          apperance: item.apperance,
          saved: true,
        };
      });
      optionFormik.setFieldValue("attributes", attributesMappedData);
    }
    if (subOptionsIsSuccess && subOptionsData.data.length) {
      const subOptionsMappedData = subOptionsData.data.map((item) => {
        return {
          _id: item._id,
          metaAttribute: item.mmetaAttribute,
          title: item.title,
          apperance: item.apperance,
          saved: true,
          isOption: item.isOption,
        };
      });

      optionFormik.setFieldValue("subOptions", subOptionsMappedData);
    }
    if (subAttributesIsSuccess && subAttributesData.data.length) {
      const subAttributeMappedData = subAttributesData.data.map((item) => {
        const value = item.colour ? "colour" : "imageUrl";
        return {
          _id: item._id,
          metaAttribute: item.metaAttribute,
          metaSubAttribute: item.metaSubAttribute,
          title: item.title,
          colour: item.colour,
          imageUrl: item.imageUrl,
          type: item.type,
          value,
          apperance: item.apperance,
          saved: true,
          isOption: item.isOption,
        };
      });
      optionFormik.setFieldValue("subAttributes", subAttributeMappedData);
    }
  }, [
    optionsData,
    optionsIsSuccess,
    attributesData,
    attributesIsSuccess,
    subOptionsData,
    subOptionsIsSuccess,
    subAttributesData,
    subAttributesIsSuccess,
  ]);

  return (
    <div className="page container-fluid position-relative user-group product-tab-page">
      <InfoHeader
        title={optionFormik.values.option?.title || "Create Options"}
        onBack={backHandler}
        onPrev={prevPageHandler}
        onNext={nextPageHandler}
        isEdit={!!id}
      />
      <form
        className="product-form"
        noValidate
        onSubmit={optionFormik.handleSubmit}
      >
        <div className="row mt-3">
          <div className="col-lg-9 mt-3">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
              <div className="col-md-12 px-0 d-flex mb-4">
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <div className="d-flex mb-1">
                          <label className="small text-lightBlue me-2">
                            Option Name
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
                            name="option.title"
                            value={optionFormik.values.option?.title}
                            onBlur={optionFormik.handleBlur}
                            onChange={optionFormik.handleChange}
                            autoFocus={true}
                          />
                          {!!optionFormik.touched.option?.title &&
                            optionFormik.errors.option?.title && (
                              <FormHelperText error>
                                {optionFormik.errors.option?.title}
                              </FormHelperText>
                            )}
                        </FormControl>
                        <FormControlLabel
                          control={
                            <Checkbox
                              inputProps={{ "aria-label": "controlled" }}
                              size="small"
                              style={{
                                color: "#5C6D8E",
                                marginRight: 0,
                                width: "auto",
                              }}
                              name="option.isFilter"
                              value={optionFormik.values.option?.isFilter}
                              onBlur={optionFormik.handleBlur}
                              onChange={optionFormik.handleChange}
                            />
                          }
                          label="Include in Filters"
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "0.7rem",
                              color: "#c8d8ff",
                            },
                          }}
                          className=" px-0"
                        ></FormControlLabel>
                      </Grid>
                      <Grid item md={6}>
                        <div className="d-flex mb-1">
                          <label className="small text-lightBlue me-2">
                            Frontend Name
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
                            name="option.frontEndTitle"
                            value={optionFormik.values.option?.frontEndTitle}
                            onBlur={optionFormik.handleBlur}
                            onChange={optionFormik.handleChange}
                          />
                          {!!optionFormik.touched.option?.frontEndTitle &&
                            optionFormik.errors.option?.frontEndTitle && (
                              <FormHelperText error>
                                {optionFormik.errors.option?.frontEndTitle}
                              </FormHelperText>
                            )}
                        </FormControl>
                        <FormHelperText>
                          Customer will see this on frontend
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={12}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <div>
                          <div className="d-flex  mb-1">
                            <p className="text-lightBlue me-2">
                              Frontend Appearance
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
                              name="option.apperance"
                              value={optionFormik.values.option?.apperance}
                              onBlur={optionFormik.handleBlur}
                              onChange={optionAppearanceHandler}
                            >
                              {FRONTEND_APPEARANCE.map((appearance) => {
                                return (
                                  <MenuItem
                                    key={appearance.id}
                                    value={appearance.value}
                                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                                  >
                                    {appearance.text}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                            {!!optionFormik.touched.option?.apperance &&
                              optionFormik.errors.option?.apperance && (
                                <FormHelperText error>
                                  {optionFormik.errors.option?.apperance}
                                </FormHelperText>
                              )}
                          </FormControl>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div
                          className="d-flex align-items-center justify-content-between"
                          style={{ marginTop: "32px" }}
                        >
                          <p className="text-lightBlue">
                            Is this option based on price master?
                          </p>
                          <AntSwitch
                            name="option.isPriceMaster"
                            value={optionFormik.values.option?.isPriceMaster}
                            onBlur={optionFormik.handleBlur}
                            onChange={optionFormik.handleChange}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <OptionsAttributeTable
                onAttributeAdd={addAttributeFieldHandler}
                formik={optionFormik}
                onAttributeDelete={deleteAttributeHandler}
                onSubOptionAdd={addSubOptionFieldHandler}
                onSubOptionDelete={deleteSubOptionHandler}
                onSubAttributeAdd={addSubAttributeFieldHandler}
                onSubAttributeDelete={deleteSubAttributeHandler}
              />
            </div>
          </div>
        </div>

        <SaveFooterTertiary
          show={id ? optionState.isEditing : true}
          onDiscard={backHandler}
          isLoading={optionState.isLoading}
        />
      </form>
      <DeleteModalSecondary
        onConfirm={deleteConfirmationHandler}
        onCancel={cancelDeleteAttributeHandler}
        show={optionState.showDeleteModal}
        message={optionState.confirmationMessage}
        title={optionState.deleteTitle}
      />
      <DiscardModalSecondary
        when={!_.isEqual(optionFormik.values, optionFormik.initialValues)}
        message="option"
      />
    </div>
  );
};

export default OptionsInfo;
