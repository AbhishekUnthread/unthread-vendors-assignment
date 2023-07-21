import React, { useEffect, useReducer, useState } from "react";
import "./EditTags.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// ! COMPONENT IMPORTS
import NotesBox from "../../../components/NotesBox/NotesBox";
import StatusBox from "../../../components/StatusBox/StatusBox";
import AddProducts from "../../../components/AddProducts/AddProducts";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import cancel from "../../../assets/icons/cancel.svg";

// ! MATERIAL IMPORTS
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateTagMutation,
  useEditTagMutation,
  useGetAllTagsQuery,
} from "../../../features/parameters/tagsManager/tagsManagerApiSlice";
import { updateTagId } from "../../../features/parameters/tagsManager/tagsManagerSlice";
import {
  showError,
  showSuccess,
} from "../../../features/snackbar/snackbarAction";
import SaveFooter, {
  SaveFooterSecondary,
  SaveFooterTertiary,
} from "../../../components/SaveFooter/SaveFooter";
import * as Yup from "yup";
import DiscardModal, {
  DiscardModalSecondary,
} from "../../../components/Discard/DiscardModal";
import InfoHeader from "../../../components/Header/InfoHeader";
import { useFormik } from "formik";
import _ from "lodash";
import TableLoader from "../../../components/Loader/TableLoader";
// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const initialQueryFilterState = {
  pageSize: 1,
  pageNo: null,
  totalCount: 0,
};
const initialTagsState = {
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

const tagsReducer = (state, action) => {
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
  return initialTagsState;
};
const tagValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),
});

const EditTags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id, filter } = useParams();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [tagState, dispatchTag] = useReducer(tagsReducer, initialTagsState);
  const [decodedObject, setDecodedObject] = useState(null);





  const {
    data: tagsData,
    isLoading: tagsIsLoading,
    isSuccess: tagsIsSuccess,
    error: tagsError,
    isError: tagsIsError,
  } = useGetAllTagsQuery(
    {
      ...queryFilterState,
      ...(decodedObject?.queryParameters || {}),
      ...(decodedObject?.TagTypeQuery || {}),
      name: decodedObject?.queryFilterState?.name || "",
    }
    // ,
    // queryFilterState,
    // {
    //   skip: queryFilterState.pageNo ? false : true,
    // }
  );

  const [
    editTag,
    {
      data: editData,
      isLoading: editTagIsLoading,
      isSuccess: editTagIsSuccess,
      error: editTagError,
      isError: editTagIsError,
    },
  ] = useEditTagMutation();

  const nextPageHandler = () => {
    const { pageNo, totalCount } = queryFilterState;

    if (pageNo + 1 > totalCount) {
      return;
    }
    navigate(`/parameters/tagsManager/edit/${pageNo + 1}/${filter}`);
  };

  const prevPageHandler = () => {
    const { pageNo } = queryFilterState;
    if (pageNo - 1 === 0) {
      return;
    }
    navigate(`/parameters/tagsManager/edit/${pageNo - 1}/${filter}`);
  };

  const backHandler = () => {
    navigate(`/parameters/tagsManager?status=${decodedObject.tab}`);
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
    if (editTagIsError) {
      if (editTagError?.data?.message) {
        dispatch(showError({ message: editTagError?.data?.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong, please try again" })
        );
      }
    }
  }, [editTagError, editTagIsError, dispatch]);

  useEffect(() => {
    if (tagsIsSuccess) {
      dispatchTag({ type: "EDITED_DISABLE" });
      dispatchQueryFilter({
        type: "SET_TOTAL_COUNT",
        totalCount: tagsData?.data?.totalCount,
      });
      if (tagsIsError) {
        if (tagsError?.data?.message) {
          dispatch(showError({ message: tagsError?.data?.message }));
        } else {
          dispatch(
            showError({ message: "Something went wrong, please try again" })
          );
        }
      }
    }
  }, [
    tagsIsSuccess,
    tagsIsError,
    tagsError,
    editTagIsSuccess,
    id,
    filter,
    tagsData,
    dispatch,
  ]);

  const formik = useFormik({
    initialValues: {
      name: tagsData?.data?.data[0].name || "",
      notes: tagsData?.data?.data[0].notes ,
      filter: tagsData?.data?.data[0].showFilter || false,
    },
    enableReinitialize: true,
    validationSchema: tagValidationSchema,
    onSubmit: (values) => {
      dispatchTag({ type: "EDITED_DISABLE" });
      if (id) {
        editTag({
          id: tagsData?.data?.data[0]._id,
          details: {
            showFilter: values?.filter,
            name: values?.name,
            notes: values?.notes,
          },
        })
          .unwrap()
          .then(() => {
            dispatchTag({ type: "DISABLE_EDIT" });
            dispatch(showSuccess({ message: "Tag edited successfully" }));
            navigate(`/parameters/tagsManager?status=${decodedObject.tab}`);
          });
      }
    },
  });
  useEffect(() => {
    if (id && !_.isEqual(formik.values, formik.initialValues)) {
      dispatchTag({ type: "ENABLE_EDIT" });
      dispatchTag({ type: "EDITED_ENABLE" });
    } else if (id && _.isEqual(formik.values, formik.initialValues)) {
      dispatchTag({ type: "EDITED_DISABLE" });
      dispatchTag({ type: "DISABLE_EDIT" });
    }
  }, [formik.initialValues, formik.values, id]);

  useEffect(() => {
    if(tagsIsLoading)
    {
      <TableLoader/>
    }
  }, [tagsIsLoading])
  

console.log({filter :formik.values?.filter})
console.log("dewqfe",queryFilterState.totalCount)
console.log("fffwerf",queryFilterState.pageNo)

  return (
    <div
      className="page container-fluid position-relative user-group"
      style={{ display: "grid", gridTemplateRows: "auto 1fr" }}
    >
      <InfoHeader
        title={formik.values.name || "Edit Tag"}
        onBack={backHandler}
        onPrev={prevPageHandler}
        onNext={nextPageHandler}
        isEdit={!!id}
      />
      <form
        className="tag-form"
        noValidate
        onSubmit={formik.handleSubmit}
        style={{ display: "grid", gridTemplateRows: "1fr auto" }}
      >
        <div className="row mt-3">
          <div className="col-lg-9 mt-3">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
              <div className="col-md-12 px-0">
                <div className="d-flex mb-1">
                  <p className="text-lightBlue me-2">Tag Name</p>
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
                    placeholder="Enter Tag Name"
                    size="small"
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
                  <span className="text-blue-2 c-pointer">(manage)</span>
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
          <div className="col-lg-3 pe-0 ps-0 ps-lg-3">
            <NotesBox
              name="notes"
              value={formik.values?.notes}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <SaveFooterTertiary
          show={id ? tagState.isEditing : true}
          onDiscard={backHandler}
          isLoading={editTagIsLoading}
        />
        <DiscardModalSecondary when={tagState.edited} message="tag tab" />
      </form>
    </div>
  );
};

export default EditTags;
