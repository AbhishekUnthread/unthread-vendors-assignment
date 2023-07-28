import React, { forwardRef, useEffect, useReducer, useState } from "react";
import "../../EditVendor/EditVendor.scss";
import {
  Link,
  useNavigate,
  useParams,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
// ! COMPONENT IMPORTS
import AppTextEditor from "../../../../components/AppTextEditor/AppTextEditor";
import NotesBox from "../../../../components/NotesBox/NotesBox";
import StatusBox from "../../../../components/StatusBox/StatusBox";
import AddCategoriesProducts from "../../../../components/AddCategoriesProducts/AddCategoriesProducts";
import AddSubCategoriesProducts from "../../../../components/AddSubCategoriesProduct/AddSubCategoriesProduct";
import TabPanel from "../../../../components/TabPanel/TabPanel";
import UploadMediaBox from "../../../../components/UploadMediaBox/UploadMediaBox";
import SEO from "../../../Products/AddProduct/SEO/SEO";
import VisibilityBox from "../../../../components/VisibilityBox/VisibilityBox";
import SaveFooter, {
  SaveFooterTertiary,
} from "../../../../components/SaveFooter/SaveFooter";
import AddHeader from "../../../../components/AddHeader/AddHeader";
// ! IMAGES IMPORTS
import arrowLeft from "../../../../assets/icons/arrowLeft.svg";
import info from "../../../../assets/icons/info.svg";
import paginationRight from "../../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../../assets/icons/paginationLeft.svg";
import addMedia from "../../../../assets/icons/addMedia.svg";
// ! MATERIAL IMPORTS
import {
  Autocomplete,
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Paper,
  Popover,
  Select,
  Slide,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateSubCategoryMutation,
  useEditSubCategoryMutation,
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
} from "../../../../features/parameters/categories/categoriesApiSlice";
import {
  showError,
  showSuccess,
} from "../../../../features/snackbar/snackbarAction";
import { DiscardModalSecondary } from "../../../../components/Discard/DiscardModal";
import cancel from "../../../../assets/icons/cancel.svg";
import { LoadingButton } from "@mui/lab";
import _ from "lodash";
import { useFormik } from "formik";
import InfoHeader from "../../../../components/Header/InfoHeader";

const initialState = {
  confirmationMessage: "",
  isEditing: false,
  initialInfo: null,
  isSeoEditDone: false,
};

const initialQueryFilterState = {
  pageSize: 1,
  pageNo: null,
  totalCount: 0,
};

const categoryReducer = (state, action) => {
  if (action.type === "REMOVE_DELETE") {
    return {
      ...initialState,
    };
  }
  if (action.type === "ENABLE_EDIT") {
    return {
      ...initialState,
      isEditing: true,
    };
  }
  if (action.type === "DISABLE_EDIT") {
    return {
      ...initialState,
      isEditing: false,
    };
  }
  if (action.type === "DISABLE_SEO") {
    return {
      ...initialState,
      isSeoEditDone: false,
    };
  }

  return initialState;
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

function isEmpty(obj) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditSubCategories = () => {
  const [categoryType, setCategoryType] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id, filter } = useParams();
  const [categoryState, dispatchCategory] = useReducer(
    categoryReducer,
    initialState
  );
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [categoryName, setCategoryName] = useState("");

  const [showCreateSubModal, setShowCreateSubModal] = useState(false);
  const [subCategoryPatentId, setSubCategoryParentId] = useState("");
  const [decodedObject, setDecodedObject] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const {
    data: subCategoriesData,
    isLoading: subCategoriesIsLoading,
    isSuccess: subCategoriesIsSuccess,
    isError: subCategoriesIsError,
    error: subCategoriesError,
  } = useGetAllSubCategoriesQuery({
    srNo: id,
    ...decodedObject,
  });

  const [
    editSubCategory,
    {
      data: editData,
      isLoading: editSubCategoryIsLoading,
      isSuccess: editSubCategoryIsSuccess,
      error: editSubCategoryError,
    },
  ] = useEditSubCategoryMutation();

  const categoryEditFormik = useFormik({
    initialValues: {
      name: subCategoriesData?.data?.data?.[0]?.name || "",
      description: subCategoriesData?.data?.data?.[0]?.description || "<p></p>",
      status: subCategoriesData?.data?.data?.[0]?.status,
      notes: subCategoriesData?.data?.data?.[0]?.notes,
      showFilter: subCategoriesData?.data?.data?.[0]?.showFilter,
      startDate: subCategoriesData?.data?.data?.[0]?.startDate || null,
      endDate: subCategoriesData?.data?.data?.[0]?.endDate || null,
      mediaUrl: subCategoriesData?.data?.data?.[0]?.mediaUrl || "",
      seo: subCategoriesData?.data?.data?.[0]?.seos || {},
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      let editItems = {
        showFilter: values.showFilter, // Whether to show filters
        name: values.name, // Category name
        description: values.description, // Category description
        status: values.startDate === null ? values.status : "scheduled", // Category status
        // isVisibleFrontend: categoryVisibility,
        notes: values.notes,
      };
      if (values.mediaUrl) {
        editItems.mediaUrl = values.mediaUrl;
      }
      if (!isEmpty(values.seo)) {
        for (const key in values.seo) {
          if (
            values.seo[key] === "" ||
            values.seo[key] === null ||
            values.seo[key] === []
          ) {
            delete values.seo[key];
          }
        }
        editItems.seo = values.seo;
      }
      if (values.startDate) {
        editItems.startDate = new Date(values.startDate);
      }
      if (values.endDate) {
        editItems.endDate = new Date(values.endDate);
      }
      editSubCategory({
        id: subCategoriesData?.data?.data?.[0]?._id, // ID of the category
        details: editItems,
      })
        .unwrap()
        .then(() => {
          dispatch(
            showSuccess({ message: "Sub Category Updated Successfully" })
          );
          dispatchCategory({ type: "DISABLE_SEO" });
        });
    },
  });
  const clearDate = () => {
    categoryEditFormik.setFieldValue("startDate", null);
    categoryEditFormik.setFieldValue("endDate", null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    categoryEditFormik.handleSubmit();
  };

  useEffect(() => {
    const encodedString = searchParams.get("filter"); // The encoded string from the URL or any source

    const decodedString = decodeURIComponent(encodedString);
    const parsedObject = JSON.parse(decodedString);
    setDecodedObject(parsedObject);
  }, [searchParams]);

  const backHandler = () => {
    navigate({
      pathname: decodedObject?.goBack || `/parameters/categories?filter=${JSON.stringify({categoryType:1,status:decodedObject?.status})}`,
    });
  };

  const nextPageHandler = () => {
    const { pageNo } = queryFilterState;
    if( subCategoriesData?.data?.nextCount === 0){
      return
    }
   decodedObject.order = 1;
    navigate({
      pathname: `/parameters/subCategories/edit/${pageNo}`,
      search: `?${createSearchParams({
        filter: JSON.stringify(decodedObject),
      })}`,
    });
  };

  const prevPageHandler = () => {
    const { pageNo } = queryFilterState;
    if( subCategoriesData?.data?.prevCount === 0){
      return
    }
    decodedObject.order = -1;
    navigate({
      pathname: `/parameters/subCategories/edit/${pageNo}`,
      search: `?${createSearchParams({
        filter: JSON.stringify(decodedObject),
      })}`,
    });
  };

  useEffect(() => {
    if (subCategoriesData?.data?.data?.[0]?.srNo) {
      dispatchQueryFilter({ type: "SET_PAGE_NO", pageNo: subCategoriesData?.data?.data?.[0]?.srNo });
    }
  }, [subCategoriesData]);

  useEffect(() => {
    if (subCategoriesError) {
      if (subCategoriesError?.data?.message) {
        dispatch(showError({ message: subCategoriesError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (subCategoriesIsSuccess) {
      dispatchQueryFilter({
        type: "SET_TOTAL_COUNT",
        totalCount: subCategoriesData?.data?.totalCount,
      });
      setCategoryName(
        subCategoriesData?.data?.data?.[0]?.category?.[0]?.name || ""
      );
      setSubCategoryParentId(
        subCategoriesData?.data?.data?.[0]?.category?.[0]?._id || ""
      );
    }
  }, [
    subCategoriesData,
    subCategoriesError,
    subCategoriesIsError,
    subCategoriesIsSuccess,
    dispatch,
  ]);

  useEffect(() => {
    if (
      id &&
      !_.isEqual(categoryEditFormik.values, categoryEditFormik.initialValues)
    ) {
      dispatchCategory({ type: "ENABLE_EDIT" });
    } else if (
      id &&
      _.isEqual(categoryEditFormik.values, categoryEditFormik.initialValues)
    ) {
      dispatchCategory({ type: "DISABLE_EDIT" });
    }
  }, [categoryEditFormik.initialValues, categoryEditFormik.values, id]);

  const toggleCreateSubModalHandler = (flag) => {
    if (flag) {
      setShowCreateSubModal((prevState) => !prevState);
      return;
    }
    setShowCreateSubModal((prevState) => !prevState);
    setCategoryName(
      subCategoriesData?.data?.data?.[0].category?.[0]?.name || ""
    );
  };

  const handleParentCategoryChange = () => {
    editSubCategory({
      id: subCategoriesData?.data?.data?.[0]?._id, // ID of the category
      details: {
        categoryId: subCategoryPatentId,
      },
    })
      .unwrap()
      .then(() => {
        dispatch(
          showSuccess({ message: "Sub Category Parent Updated Successfully" })
        );
        dispatchCategory({ type: "DISABLE_SEO" });
      });
  };

  const changeCategoryTypeHandler = (event, tabIndex) => {
    setCategoryType(tabIndex);
    if (tabIndex === 0) {
    }
    if (tabIndex === 1) {
    }
  };

  return (
    <div className="page container-fluid position-relative user-group">
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
        open={showCreateSubModal}
        onClose={toggleCreateSubModalHandler}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column ">
              <h5 className="text-lightBlue fw-500">{`Sub Category`}</h5>

              <small className="text-grey-6 mt-1 d-block">
                ⓘ Some Dummy Content to explain
              </small>
            </div>
            <img
              src={cancel}
              alt="cancel"
              width={30}
              className="c-pointer"
              onClick={toggleCreateSubModalHandler}
            />
          </div>
        </DialogTitle>
        <hr className="hr-grey-6 my-0" />

        <div>
          <DialogContent className="py-3 px-4">
            <p className="text-lightBlue mb-2">Select Category</p>
            <FormControl
              //   sx={{ m: 0, minWidth: 120, width: "100%" }}
              size="small"
              className="col-md-7"
            >
              {categoriesData?.data?.data && (
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  size="small"
                  MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}
                  name="categoryId"
                  value={subCategoryPatentId}
                  onChange={(e) => {
                    setSubCategoryParentId(e.target.value);
                    let categoriesId = categoriesData?.data?.data?.map(
                      (item) => item?._id
                    );
                    let indexOfCategory = categoriesId?.indexOf(e.target.value);
                    setCategoryName(
                      categoriesData?.data?.data?.[indexOfCategory]?.name
                    );
                  }}
                >
                  <MenuItem key={""} value={"Select Category"}>
                    Select Category
                  </MenuItem>
                  {categoriesData.data.data.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </DialogContent>
          <hr className="hr-grey-6 my-0" />
          <DialogActions className="d-flex justify-content-between px-4 py-3">
            <button
              onClick={toggleCreateSubModalHandler}
              type="button"
              className="button-grey py-2 px-5"
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <LoadingButton
              onClick={() => {
                toggleCreateSubModalHandler(true);
                handleParentCategoryChange();
              }}
              className="button-gradient py-2 px-5"
            >
              <p>Save</p>
            </LoadingButton>
          </DialogActions>
        </div>
      </Dialog>

      <AddHeader
        headerName={categoryEditFormik.values.name || ""}
        handleSubClick={toggleCreateSubModalHandler}
        subHeading={`Parent Category: ${categoryName}`}
        subHighlightstext={"(Change)"}
        navigateLink={
          decodedObject?.goBack ||
          `/parameters/categories?filter=${JSON.stringify({categoryType:1,status:decodedObject?.status})}`
        }
        hasNext={subCategoriesData?.data?.nextCount}
        hasPrev={ subCategoriesData?.data?.prevCount}
        previewButton={true}
        handleNext={nextPageHandler}
        handlePrev={prevPageHandler}
      />

      <form noValidate onSubmit={submitHandler} className="row mt-3">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="col-md-12 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Sub-Category Name</p>
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
                  name="name"
                  value={categoryEditFormik.values.name}
                  onChange={categoryEditFormik.handleChange}
                  placeholder="Sub Category Name"
                  size="small"
                />
              </FormControl>
              <FormGroup>
                <div className="d-flex align-items-center col-12 px-0">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="showFilter"
                        inputProps={{ "aria-label": "controlled" }}
                        checked={categoryEditFormik.values.showFilter}
                        onChange={categoryEditFormik.handleChange}
                        size="small"
                        style={{
                          color: "#5C6D8E",
                          marginRight: 0,
                        }}
                      />
                    }
                    label="Include in Filters"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        color: "#c8d8ff",
                      },
                    }}
                  />
                  <span className="text-blue-2 c-pointer">(manage)</span>
                </div>
              </FormGroup>
            </div>
            <div className="col-12 mt-3 px-0">
              <div className="d-flex  mb-1">
                <p className="text-lightBlue me-2">Description</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <AppTextEditor
                value={categoryEditFormik.values.description}
                setFieldValue={(val) => {
                  if (val === "") {
                    categoryEditFormik.setFieldValue("description", "<p></p>");
                    return;
                  }
                  categoryEditFormik.setFieldValue("description", val);
                }}
              />
            </div>
          </div>

          <div className="border-grey-5 rounded-8 p-3 row bg-black-15 mt-4">
            <Box
              sx={{ width: "100%" }}
              className="d-flex justify-content-between tabs-header-box"
            >
              <Tabs
                value={categoryType}
                onChange={changeCategoryTypeHandler}
                aria-label="scrollable force tabs example"
                className="tabs"
              >
                <Tab label="All Products" className="tabs-head" />
              </Tabs>
            </Box>
            <div className="d-flex justify-content-between mb-2 px-0"></div>
            {
              <>
                <TabPanel value={categoryType} index={0}>
                  <AddCategoriesProducts />
                </TabPanel>
              </>
            }
          </div>
          <div className="mt-4">
            <SEO
              seoName={categoryEditFormik.values.name || ""}
              seoValue={categoryEditFormik.values.seo}
              handleSeoChange={(val) =>
                categoryEditFormik.setFieldValue("seo", val)
              }
              refrenceId={id ? subCategoriesData?.data?.data?.[0]?._id : ""}
            />
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <StatusBox
            headingName={"Category Status"}
            value={categoryEditFormik.values.status}
            handleProductStatus={(_, val) =>
              categoryEditFormik.setFieldValue("status", val)
            }
            toggleData={["active", "in-active"]}
            showSchedule={true}
            startDate={categoryEditFormik.values.startDate}
            endDate={categoryEditFormik.values.endDate}
            handleStartDate={(val) =>
              categoryEditFormik.setFieldValue("startDate", val)
            }
            handleEndDate={(val) =>
              categoryEditFormik.setFieldValue("endDate", val)
            }
            clearDate={clearDate}
          />
          <div className="mt-4">
            <UploadMediaBox
              imageName={addMedia}
              headingName={"Media"}
              UploadChange={(url) =>
                categoryEditFormik.setFieldValue("mediaUrl", url)
              }
              previousImage={categoryEditFormik.values.mediaUrl}
              isUploaded={() => {}}
            />
          </div>
          <NotesBox
            name={"notes"}
            value={categoryEditFormik.values.notes}
            onChange={categoryEditFormik.handleChange}
          />
        </div>
        <SaveFooterTertiary
          show={id ? categoryState.isEditing : true}
          onDiscard={backHandler}
          isLoading={editSubCategoryIsLoading}
        />
      </form>
      <DiscardModalSecondary
        when={
          !_.isEqual(
            categoryEditFormik.values,
            categoryEditFormik.initialValues
          )
        }
        message="Category"
      />
    </div>
  );
};

export default EditSubCategories;
