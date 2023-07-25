import { useEffect, useCallback, useReducer } from "react";
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

import AddCustomField from "../../../components/AddCustomField/AddCustomField";
import AddCustomFieldTable from "../../../components/AddCustomField/AddCustomFieldTable";
import InfoHeader from "../../../components/Header/InfoHeader";
import { UploadMediaSmall } from "../../../components/UploadMediaBox/UploadMedia";
import { SaveFooterTertiary } from "../../../components/SaveFooter/SaveFooter";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import Attribute from "../../../components/Options/Attribute/Attribute";
import { AntSwitch } from "../../../components/AntSwitch/AntSwitch";
import OptionsAttributeTable from "./OptionsAttributeTable";

import info from "../../../assets/icons/info.svg";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import {
  useGetAllOptionsQuery,
  useCreateOptionMutation,
  useGetAllAttributesQuery,
  useCreateAttributeMutation,
  useGetAllSubOptionsQuery,
  useCreateSubOptionMutation,
  useGetAllSubAttributesQuery,
  useCreateSubAttributeMutation,
} from "../../../features/parameters/options/optionsApiSlice";

import { colorReg, urlReg } from "../../../utils/regex";

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

const createOptionValidationSchema = Yup.object({
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
});

const createAttributeValidationSchema = Yup.object({
  title: Yup.string().trim().min(3, "Too short").required("Required"),
  attribute: Yup.string().trim().required("Required"),
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
});

const initialOptionQueryFilterState = {
  id: null,
  pageSize: 1,
  pageNo: null,
};

const initialOptionState = {
  totalCount: 0,
  isEditing: false,
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
  if (action.type === "SET_TOTAL_COUNT") {
    return {
      ...state,
      totalCount: action.totalCount,
    };
  }

  return initialOptionState;
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
  } = useGetAllAttributesQuery();

  const [
    createOption,
    {
      isLoading: createOptionIsLoading,
      isSuccess: createOptionIsSuccess,
      error: createOptionError,
      isError: createOptionIsError,
    },
  ] = useCreateOptionMutation();

  const optionFormik = useFormik({
    initialValues: {
      title: optionsData?.data[0].title || "",
      apperance: optionsData?.data[0].apperance || "",
      type: optionsData?.data[0].type || "optionset",
      frontEndTitle: optionsData?.data[0].frontEndTitle || "",
      isFilter: optionsData?.data[0].isFilter || false,
      isPriceMaster: optionsData?.data[0].isPriceMaster || false,
    },
    enableReinitialize: true,
    validationSchema: createOptionValidationSchema,
    onSubmit: (values) => {},
  });
  const attributeFormik = useFormik({
    initialValues: {
      attributes: (attributesData?.data.length &&
        attributesData?.data.map((attribute) => ({
          title: attribute.title,
          attribute: attribute.attribute,
          colour: attribute.colour,
          imageUrl: attribute.imageUrl,
          type: attribute.type,
          value:
            optionFormik.values.apperance === "colorAndImageSwatches"
              ? (attribute.imageUrl && "imageUrl") ||
                (attribute.colour && "colour")
              : "",
          apperance: optionFormik.values.apperance,
        }))) || [
        {
          title: "",
          attribute: optionsData?.data[0]._id,
          colour: "",
          imageUrl: "",
          type: "optionset",
          value: "",
          apperance: optionFormik.values.apperance,
        },
      ],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      attributes: Yup.array().min(1).of(createAttributeValidationSchema),
    }),
    onSubmit: (values) => {},
  });

  const backHandler = () => {
    navigate("/parameters/productTabs");
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

  useEffect(() => {
    if (createOptionIsError) {
      if (createOptionError.data?.message) {
        dispatch(showError({ message: createOptionError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
  }, [createOptionError, createOptionIsError, dispatch]);

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

  // useEffect(() => {
  //   if (id && !_.isEqual(formik.values, formik.initialValues)) {
  //     dispatchProductsInfo({ type: "ENABLE_EDIT" });
  //   } else if (id && _.isEqual(formik.values, formik.initialValues)) {
  //     dispatchProductsInfo({ type: "DISABLE_EDIT" });
  //   }
  // }, [formik.initialValues, formik.values, id]);
  console.log(optionFormik.values);
  return (
    <div className="page container-fluid position-relative user-group product-tab-page">
      <InfoHeader
        title={optionFormik.values.title || "Create Options"}
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
                            name="title"
                            value={optionFormik.values?.title}
                            onBlur={optionFormik.handleBlur}
                            onChange={optionFormik.handleChange}
                            autoFocus={true}
                          />
                          {!!optionFormik.touched.title &&
                            optionFormik.errors.title && (
                              <FormHelperText error>
                                {optionFormik.errors.title}
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
                              name="isFilter"
                              value={optionFormik.values?.isFilter}
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
                            name="frontEndTitle"
                            value={optionFormik.values?.frontEndTitle}
                            onBlur={optionFormik.handleBlur}
                            onChange={optionFormik.handleChange}
                          />
                          {!!optionFormik.touched.frontEndTitle &&
                            optionFormik.errors.frontEndTitle && (
                              <FormHelperText error>
                                {optionFormik.errors.frontEndTitle}
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
                              name="apperance"
                              value={optionFormik.values?.apperance}
                              onBlur={optionFormik.handleBlur}
                              onChange={optionFormik.handleChange}
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
                            {!!optionFormik.touched.apperance &&
                              optionFormik.errors.apperance && (
                                <FormHelperText error>
                                  {optionFormik.errors.apperance}
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
                            name="isPriceMaster"
                            value={optionFormik.values?.isPriceMaster}
                            onBlur={optionFormik.handleBlur}
                            onChange={optionFormik.handleChange}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <OptionsAttributeTable />
            </div>
          </div>
        </div>
        <SaveFooterTertiary
          show={true}
          onDiscard={() => {}}
          isLoading={false}
        />
      </form>
    </div>
  );
};

export default OptionsInfo;
