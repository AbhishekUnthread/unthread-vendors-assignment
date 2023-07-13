import React, { useEffect, useReducer, useState } from "react";
import "../../EditVendor/EditVendor.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import info from "../../../../assets/icons/info.svg";
import addMedia from "../../../../assets/icons/addMedia.svg";
import _ from "lodash";
// ! MATERIAL IMPORTS
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
  Paper,
  Popover,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../../features/parameters/categories/categoriesApiSlice";
import {
  showError,
  showSuccess,
} from "../../../../features/snackbar/snackbarAction";
import { useFormik } from "formik";
import InfoHeader from "../../../../components/Header/InfoHeader";

const initialState = {
  confirmationMessage: "",
  isEditing: false,
  initialInfo: null,
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

  return true
}

const EditCategories = () => {
  const [categoryType, setCategoryType] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const [categoryState, dispatchCategory] = useReducer(
    categoryReducer,
    initialState
  );
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const [categoryDescription, setCategoryDescription] = useState("");



  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
    isSuccess: categoriesIsSuccess,
    error: categoriesError,
  } = useGetAllCategoriesQuery(queryFilterState, {
    skip: queryFilterState.pageNo ? false : true,
  });

  const [
    editCategory,
    {
      data: editData,
      isLoading: editCategoryIsLoading,
      isSuccess: editCategoryIsSuccess,
      error: editCategoryError,
    },
  ] = useEditCategoryMutation();

  const categoryEditFormik = useFormik({
    initialValues: {
      name: categoriesData?.data?.data?.[0]?.name || "",
      description: categoriesData?.data?.data?.[0]?.description,
      status: categoriesData?.data?.data?.[0]?.status,
      notes: categoriesData?.data?.data?.[0]?.notes,
      showFilter: categoriesData?.data?.data?.[0]?.showFilter,
      startDate: categoriesData?.data?.data?.[0]?.startDate || null,
      endDate: categoriesData?.data?.data?.[0]?.endDate || null,
      mediaUrl: categoriesData?.data?.data?.[0]?.mediaUrl || "",
      seo: categoriesData?.data?.data?.[0]?.seos || {},
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
      if(values.mediaUrl){
        editItems.mediaUrl = values.mediaUrl
      }
      if(isEmpty(values.seo)){
        editItems.seo ={
          title:values.name,
          slug:"https://example.com/"+values.name
        }
      }
      if(!isEmpty(values.seo)){
        editItems.seo = values.seo
      }
      if (values.startDate) {
        editItems.startDate = new Date(values.startDate);
      }
      if (values.endDate) {
        editItems.endDate = new Date(values.endDate);
      }
      editCategory({
        id: categoriesData?.data?.data?.[0]?._id, // ID of the category
        details: editItems,
      })
        .unwrap()
        .then(() => {
          dispatch(showSuccess({ message: "Category Updated Successfully" }));
        })
    },
  });

  const clearDate = () => {
    categoryEditFormik.setFieldValue("startDate", null);
    categoryEditFormik.setFieldValue("endDate", null);
  };

  useEffect(()=>{
    if(categoryDescription === "<p></p>"){
      categoryEditFormik.setFieldValue("description",categoryEditFormik.values.description)
    }
    categoryEditFormik.setFieldValue("description",categoryDescription)
  },[categoryDescription])

  

  const submitHandler = (e) => {
    e.preventDefault();
    categoryEditFormik.handleSubmit();
  };

  const backHandler = () => {
    navigate("/parameters/categories");
  };


  const nextPageHandler = () => {
    const { pageNo, totalCount } = queryFilterState;
    if (pageNo + 1 > totalCount) {
      return;
    }
    navigate(`/parameters/categories/edit/${pageNo + 1}`);
  };

  const prevPageHandler = () => {
    const { pageNo } = queryFilterState;
    if (pageNo - 1 === 0) {
      return;
    }
    navigate(`/parameters/categories/edit/${pageNo - 1}`);
  };

  useEffect(() => {
    if (id) {
      dispatchQueryFilter({ type: "SET_PAGE_NO", pageNo: id });
    }
  }, [id]);

  useEffect(() => {
    if (categoriesError) {
      if (categoriesError?.data?.message) {
        dispatch(showError({ message: categoriesError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (categoriesIsSuccess) {
      dispatchQueryFilter({
        type: "SET_TOTAL_COUNT",
        totalCount: categoriesData.totalCount,
      });
    }
  }, [
    categoriesData,
    categoriesError,
    categoriesIsError,
    categoriesIsSuccess,
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

  const changeCategoryTypeHandler = (event, tabIndex) => {
    setCategoryType(tabIndex);
    if (tabIndex === 0) {
    }
    if (tabIndex === 1) {
    }
  };

  return (
    <div  className="page container-fluid position-relative user-group">
      <InfoHeader
        title={categoryEditFormik.values.name || "Edit category"}
        onBack={backHandler}
        onPreview={() => {}}
        onPrev={prevPageHandler}
        onNext={nextPageHandler}
        isEdit={!!id}
      />
      <form noValidate onSubmit={submitHandler} className="row mt-3">
        <div className="col-lg-9 mt-3">
          <div className="features border-grey-5 rounded-8 p-3 row attributes">
            <div className="col-md-12 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Category Name</p>
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
                  placeholder="Category Name"
                  size="small"
                />
              </FormControl>
            </div>
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
                value={categoryDescription}
                setFieldValue={(val) => {
                  setCategoryDescription(val)
                }}
              />
            </div>
          </div>

          <div className="border-grey-5 rounded-8 p-3 row features mt-4">
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
                <Tab label="Sub Categories" className="tabs-head" />
              </Tabs>
            </Box>
            <div className="d-flex justify-content-between mb-2 px-0"></div>
            {
              <>
                <TabPanel value={categoryType} index={0}>
                  <AddCategoriesProducts />
                </TabPanel>
                <TabPanel value={categoryType} index={1}>
                  <AddSubCategoriesProducts id={id ? categoriesData?.data?.data?.[0]?._id :""} />
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
          {/* <VisibilityBox value={categoryVisibility}
            onChange={(_, val) => setCategoryVisibility(val)}
            
          /> */}
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
        isLoading={editCategoryIsLoading}
      />
      </form>
    </div>
  );
};

export default EditCategories;
