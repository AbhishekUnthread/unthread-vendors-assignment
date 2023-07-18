import React, { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// ! COMPONENT IMPORTS
import NotesBox from "../../../components/NotesBox/NotesBox";
import StatusBox from "../../../components/StatusBox/StatusBox";
import AddProducts from "../../../components/AddProducts/AddProducts";
import {
  useGetAllVendorsQuery,
  useEditVendorMutation,
} from "../../../features/parameters/vendors/vendorsApiSlice";
import {
  showError,
  showSuccess,
} from "../../../features/snackbar/snackbarAction";
import { SaveFooterTertiary } from "../../../components/SaveFooter/SaveFooter";
import { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";
import InfoHeader from "../../../components/Header/InfoHeader";
import "./EditVendor.scss";

// ! ASSETS IMPORTS
import info from "../../../assets/icons/info.svg";

// ! MATERIAL IMPORTS
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import _ from "lodash";

const initialQueryFilterState = {
  pageSize: 1,
  pageNo: null,
  totalCount: 0,
};
const initialVendorState = {
  isEditing: false,
  edited: false,
  discarded: false,
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

const vendorsReducer = (state, action) => {
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
  if (action.type === "ENABLE_DISCARD") {
    return {
      ...state,
      discarded: true,
    };
  }
  if (action.type === "DISABLE_DISCARD") {
    return {
      ...state,
      discarded: false,
    };
  }
  return initialVendorState;
};

const vendorValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),
  status: Yup.string()
    .oneOf(["active", "in-active"], "Invalid status")
    .required("Status is required"),
});

const EditVendor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id, filter } = useParams();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [vendorState, dispatchVendor] = useReducer(
    vendorsReducer,
    initialVendorState
  );
  const [decodedObject, setDecodedObject] = useState(null);

  const {
    data: vendorsData,
    isLoading: vendorsIsLoading,
    isSuccess: vendorsIsSuccess,
    error: vendorsError,
    isError: vendorsIsError,
  } = useGetAllVendorsQuery(
    {
      ...queryFilterState,
      ...(decodedObject?.queryParameters || {}),
      ...(decodedObject?.vendorTypeQuery || {}),
      name: decodedObject?.queryFilterState?.name || "",
    }
    // ,
    // queryFilterState,
    // {
    //   skip: queryFilterState.pageNo ? false : true,
    // }
  );

  const [
    editVendor,
    {
      isLoading: editVendorIsLoading,
      isSuccess: editVendorIsSuccess,
      error: editVendorError,
      isError: editVendorIsError,
    },
  ] = useEditVendorMutation();

  const nextPageHandler = () => {
    const { pageNo, totalCount } = queryFilterState;

    if (pageNo + 1 > totalCount) {
      return;
    }
    navigate(`/parameters/vendors/edit/${pageNo + 1}/${filter}`);
  };

  const prevPageHandler = () => {
    const { pageNo } = queryFilterState;
    if (pageNo - 1 === 0) {
      return;
    }
    navigate(`/parameters/vendors/edit/${pageNo - 1}/${filter}`);
  };

  const backHandler = () => {
    navigate(`/parameters/vendors?status=${decodedObject.tab}`);
  };

  useEffect(() => {
    if (id) {
      dispatchQueryFilter({ type: "SET_PAGE_NO", pageNo: id });
    }
  }, [id]);

  useEffect(() => {
    const encodedString = filter;
    const decodedString = decodeURIComponent(encodedString);
    const parsedObject = JSON.parse(decodedString);

    setDecodedObject(parsedObject);
  }, [filter]);

  useEffect(() => {
    if (editVendorIsError) {
      if (editVendorError?.data?.message) {
        dispatch(showError({ message: editVendorError?.data?.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong, please try again" })
        );
      }
    }
  }, [editVendorError, editVendorIsError, dispatch]);

  useEffect(() => {
    if (vendorsIsSuccess) {
      dispatchVendor({ type: "EDITED_DISABLE" });
      dispatchQueryFilter({
        type: "SET_TOTAL_COUNT",
        totalCount: vendorsData?.data?.totalCount,
      });
    }
    if (vendorsIsError) {
      if (vendorsError?.data?.message) {
        dispatch(showError({ message: vendorsError?.data?.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong, please try again" })
        );
      }
    }
  }, [
    vendorsIsSuccess,
    vendorsIsError,
    vendorsError,
    editVendorIsSuccess,
    id,
    filter,
    vendorsData,
    dispatch,
  ]);

  const formik = useFormik({
    initialValues: {
      name: vendorsData?.data?.data[0].name || "",
      notes: vendorsData?.data?.data[0].notes,
      status: vendorsData?.data?.data[0].status,
      filter: vendorsData?.data?.data[0].showFilter,
    },
    enableReinitialize: true,
    validationSchema: vendorValidationSchema,
    onSubmit: (values) => {
      dispatchVendor({ type: "EDITED_DISABLE" });
      if (id) {
        editVendor({
          id: vendorsData?.data?.data[0]._id,
          details: {
            showFilter: values?.filter,
            name: values?.name,
            notes: values?.notes,
            status: values?.status,
          },
        })
          .unwrap()
          .then(() => {
            dispatchVendor({ type: "DISABLE_EDIT" });
            dispatch(showSuccess({ message: "Vendor edited successfully" }));
            navigate(`/parameters/vendors?status=${decodedObject.tab}`);
          });
      }
    },
  });

  useEffect(() => {
    if (id && !_.isEqual(formik.values, formik.initialValues)) {
      dispatchVendor({ type: "ENABLE_EDIT" });
      dispatchVendor({ type: "EDITED_ENABLE" });
    } else if (id && _.isEqual(formik.values, formik.initialValues)) {
      dispatchVendor({ type: "EDITED_DISABLE" });
      dispatchVendor({ type: "DISABLE_EDIT" });
    }
  }, [formik.initialValues, formik.values, id]);

  return (
    <div
      className="page container-fluid position-relative user-group"
      style={{ display: "grid", gridTemplateRows: "auto 1fr" }}
    >
      <InfoHeader
        title={formik.values.name || "Edit Vendor"}
        onBack={backHandler}
        onPrev={prevPageHandler}
        onNext={nextPageHandler}
        isEdit={!!id}
      />
      <form
        className="vendor-form"
        noValidate
        onSubmit={formik.handleSubmit}
        style={{ display: "grid", gridTemplateRows: "1fr auto" }}
      >
        <div className="row mt-3" style={{ marginBottom: "80px" }}>
          <div className="col-lg-9 mt-3">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
              <div className="col-md-12 px-0">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue me-2">Name</p>
                  <Tooltip title="Enter Name" placement="top">
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
                    placeholder="Enter Vendor Name"
                    name="name"
                    value={formik.values?.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoFocus={true}
                  />
                </FormControl>
                {formik.touched.name && formik.errors.name ? (
                  <Typography variant="caption" color="#F67476">
                    {formik.errors.name}
                  </Typography>
                ) : null}

                <div className="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="filter"
                        value={formik.values?.filter}
                        checked={formik.values?.filter}
                        onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                          marginRight: 0,
                          width: "auto",
                        }}
                      />
                    }
                    label="Include in Filters"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.875rem",
                        color: "#c8d8ff",
                      },
                    }}
                    className=" px-0 me-1"
                  />
                  <button className="reset link">(manage)</button>
                </div>
              </div>
            </div>

            <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mt-4">
              <div className="d-flex justify-content-between mb-2 px-0">
                <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
                  Add Products
                </h6>
              </div>
              <AddProducts />
            </div>
          </div>
          <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
            <StatusBox
              headingName={"Status"}
              value={formik.values?.status}
              toggleData={["active", "in-active"]}
              handleProductStatus={(_, val) =>
                formik.setFieldValue("status", val)
              }
            />
            <NotesBox
              name="notes"
              value={formik.values?.notes}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <SaveFooterTertiary
          show={id ? vendorState.isEditing : true}
          onDiscard={backHandler}
          isLoading={editVendorIsLoading}
        />
        <DiscardModalSecondary when={vendorState.edited} message="vendor tab" />
      </form>
    </div>
  );
};

export default EditVendor;
