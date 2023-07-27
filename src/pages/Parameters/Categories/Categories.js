import React, { useMemo } from "react";
import { forwardRef, useState, useEffect, useReducer } from "react";
import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Paper,
  Popover,
  Slide,
  Tab,
  Tabs,
  TextField,
  Chip,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  TableHead,
  Typography,
  Checkbox,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import CategoriesTable from "./CategoriesTable";
import SubCategoriesTable from "./SubCategoriesTable";
import TableSearch from "../../../components/TableSearch/TableSearch";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import TabPanel from "../../../components/TabPanel/TabPanel";

import cancel from "../../../assets/icons/cancel.svg";
import parameters from "../../../assets/icons/sidenav/parameters.svg";
import sort from "../../../assets/icons/sort.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import info from "../../../assets/icons/info.svg";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation,
  useEditCategoryMutation,
  useEditSubCategoryMutation,
  useCategoryBulkCreateTagMutation,
  useSubCategoryBulkCreateTagMutation,
  useBulkEditTagCategoryMutation,
  useBulkEditTagSubCategoryMutation,
  useBulkDeleteSubCategoryMutation,
  useBulkDeleteCategoryMutation,
  useGetAllCategorieStatusCountQuery,
  useGetAllSubCategorieStatusCountQuery,
} from "../../../features/parameters/categories/categoriesApiSlice";

import "../../Products/AllProducts/AllProducts.scss";
import { useNavigate, useSearchParams,createSearchParams } from "react-router-dom";

const initialQueryFilterState = {
  pageSize: 10,
  pageNo: 0,
  totalCount: 0,
  name: "",
  searchValue: "",
  status: ["active", "in-active","scheduled"],
  firstStatus:"all",
  createdAt: "-1",
  alphabetical: null,
};

const queryFilterReducer = (state, action) => {
  if (action.type === "SET_PAGE_SIZE") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      pageSize: +action.value,
    };
  }
  if (action.type === "CHANGE_PAGE") {
    return {
      ...state,
      pageNo: action.pageNo,
    };
  }
  if (action.type === "SEARCH") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      name: action.name,
    };
  }
  if (action.type === "SET_STATUS") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      status: action.status ? action.status : initialQueryFilterState.status,
    };
  }
  if (action.type === "SET_STATUS_FIRST") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      firstStatus: action.value,
    };
  }
  if (action.type === "SET_ALPHABETICAL_SORTING") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      alphabetical: action.alphabetical,
      createdAt: null,
    };
  }
  if (action.type === "SET_CRONOLOGICAL_SORTING") {
    return {
      ...state,
      pageNo: initialQueryFilterState.pageNo,
      createdAt: action.createdAt,
      alphabetical: null,
    };
  }
  if (action.type === "SET_ALL_FILTERS") {
    return {
      ...initialQueryFilterState,
      ...action.filters,
    };
  }

  return initialQueryFilterState;
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const categoryValidationSchema = Yup.object({
  name: Yup.string().trim().min(3).required("required"),
  description: Yup.string().trim().min(3).optional(),
  status: Yup.mixed().oneOf(["active", "inactive"]).optional(),
});
const multipleCategorySchema = Yup.object({
  name: Yup.string().trim().min(3, "Name must be at least 3 characters long"),
});
const multipleSubCategorySchema = Yup.object({
  name: Yup.string().trim().min(3, "Name must be at least 3 characters long"),
});
const subCategoryValidationSchema = Yup.object({
  name: Yup.string().trim().min(3).required("required"),
  description: Yup.string().trim().min(3).optional(),
  status: Yup.mixed().oneOf(["active", "inactive"]).optional(),
  categoryId: Yup.string().required("required"),
});

function generateUrlName(name = "") {
  const formattedName =
    "https://example.com/" + name?.toLowerCase()?.replace(/ /g, '-');
  return formattedName;

}
const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialQueryFilterState
  );
  const[searchParams, setSearchParams] = useSearchParams();
  const [categoryType, setCategoryType] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateSubModal, setShowCreateSubModal] = useState(false);
  const [showCreatePopover, setShowCreatePopover] = useState(null);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [anchorStatusEl, setAnchorStatusEl] = React.useState("");
  const [sortFilter, setSortFilter] = React.useState("newestToOldest");
  const [statusFilter, setStatusFilter] = React.useState([]);
  const [multipleTags, setMultipleTags] = useState([]);
  const [multipleTagsForSub, setMultipleTagsForSub] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryTotalCount, setCategoryTotalCount] = React.useState([]);
  const [subCategoryTotalCount, setSubCategoryTotalCount] = React.useState([]);
  const [cateoryOpenState,setCategoryOpenState]=useState({
    id:"",
    open:false,
  })
  const [firstRender, setFirstRender] = useState(true);
   
  const filterParameter = {};

  const handleSearchChange = (event) => {
    dispatchQueryFilter({ type: "SEARCH", name: event.target.value });
  };

  const categoryTypeQuery =
    categoryType === 0
      ? {
          createdAt: -1,
          status:
            statusFilter.length > 0
              ? statusFilter
              : "active,in-active,scheduled",
        }
      : categoryType === 1
      ? {
          createdAt: -1,
          status:
            statusFilter.length > 0
              ? statusFilter
              : "active,in-active,scheduled",
        }
      : categoryType === 2
      ? { createdAt: -1, status: ["archieved"] }
      : categoryType === 3
      ? { createdAt: -1, status: ["archieved"] }
      : {};

  const filterParams = { ...filterParameter, ...categoryTypeQuery };
  if (searchValue) {
    filterParams.name = searchValue;
  }

  // Check SortOption
  if (sortFilter) {
    // Check alphabetical sort options
    if (
      sortFilter === "alphabeticalAtoZ" ||
      sortFilter === "alphabeticalZtoA"
    ) {
      filterParams.alphabetical =
        sortFilter === "alphabeticalAtoZ" ? "1" : "-1";
    }
    // Check createdAt sort options
    else if (
      sortFilter === "oldestToNewest" ||
      sortFilter === "newestToOldest"
    ) {
      filterParams.createdAt = sortFilter === "oldestToNewest" ? "1" : "-1";
    }
  }

  console.log(filterParams)

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    error: categoriesError,
  } = useGetAllCategoriesQuery({ ...queryFilterState });
  const {
    data: subCategoriesData,
    isLoading: subCategoriesIsLoading,
    isSuccess: subCategoriesIsSuccess,
    error: subCategoriesError,
  } = useGetAllSubCategoriesQuery({ ...queryFilterState });
  const {
    data: CategoriesStatusCount,
    isSuccess: CategoriesStatusCountIsSuccess,
  } = useGetAllCategorieStatusCountQuery();
  const {
    data: SubCategoriesStatusCount,
    isSuccess: SubCategoriesStatusCountIsSuccess,
  } = useGetAllSubCategorieStatusCountQuery();
  const [
    createCategory,
    {
      isLoading: createCategoryIsLoading,
      isSuccess: createCategoryIsSuccess,
      error: createCategoryError,
    },
  ] = useCreateCategoryMutation();
  const [
    bulkCreateCategory,
    {
      isLoading: bulkCreateTagsIsLoading,
      isSuccess: bulkCreateTagsIsSuccess,
      error: bulkCreateTagsError,
    },
  ] = useCategoryBulkCreateTagMutation();
  const [
    bulkCreateSubCategory,
    {
      isLoading: bulkCreateSubTagsIsLoading,
      isSuccess: bulkCreateSubTagsIsSuccess,
      error: bulkCreateSubTagsError,
    },
  ] = useSubCategoryBulkCreateTagMutation();
  const [
    createSubCategory,
    {
      isLoading: createSubCategoryIsLoading,
      isSuccess: createSubCategoryIsSuccess,
      error: createSubCategoryError,
    },
  ] = useCreateSubCategoryMutation();
  const [
    deleteCategory,
    {
      isLoading: deleteCategoryIsLoading,
      isSuccess: deleteCategoryIsSuccess,
      error: deleteCategoryError,
    },
  ] = useDeleteCategoryMutation();
  const [
    deleteSubCategory,
    {
      isLoading: deleteSubCategoryIsLoading,
      isSuccess: deleteSubCategoryIsSuccess,
      error: deleteSubCategoryError,
    },
  ] = useDeleteSubCategoryMutation();
  const [
    bulkDeleteSubCategory,
    {
      isLoading: bulkDeleteSubCategoryIsLoading,
      isSuccess: bulkDeleteSubCategoryIsSuccess,
      error: bulkDeleteSubCategoryError,
    },
  ] = useBulkDeleteSubCategoryMutation();
  const [
    bulkDeleteCategory,
    {
      isLoading: bulkDeleteCategoryIsLoading,
      isSuccess: bulkDeleteCategoryIsSuccess,
      error: bulkDeleteCategoryError,
    },
  ] = useBulkDeleteCategoryMutation();
  const [
    editCategory,
    {
      isLoading: editCategoryIsLoading,
      isSuccess: editCategoryIsSuccess,
      error: editCategoryError,
    },
  ] = useEditCategoryMutation();
  const [
    editSubCategory,
    {
      isLoading: editSubCategoryIsLoading,
      isSuccess: editSubCategoryIsSuccess,
      error: editSubCategoryError,
    },
  ] = useEditSubCategoryMutation();

  const [
    bulkEditCategory,
    {
      data: bulkEditCategoryTag,
      isLoading: bulkTagEditCategoryLoading,
      isSuccess: bulkTagEditCategoryIsSuccess,
      error: bulkTagEditCategoryError,
    },
  ] = useBulkEditTagCategoryMutation();

  const [
    bulkEditSubCategory,
    {
      data: bulkEditSubCategoryTag,
      isLoading: bulkTagEditSubCategoryLoading,
      isSuccess: bulkTagEditSubCategoryIsSuccess,
      error: bulkTagEditSubCategoryError,
    },
  ] = useBulkEditTagSubCategoryMutation();

  const categoryFormik = useFormik({
    initialValues: {
      name: "",
      description: "<p></p>",
      status: "active",
      showFilter: false,
    },
    enableReinitialize: true,
    validationSchema:
      multipleTags.length > 0
        ? multipleCategorySchema
        : categoryValidationSchema,
    onSubmit: (values) => {
      toggleCreateModalHandler()
      if (multipleTags.length > 0) {
        bulkCreateCategory(multipleTags)
          .unwrap()
          .then(() => {
            setMultipleTags([]);
            categoryFormik.resetForm();
            dispatch(showSuccess({ message: "Categories created successfully" }));
          })
          .catch((err) => {
            dispatch(showError({ message: err?.data?.message }));
          });
      } else {
        createCategory({
          ...values,
          seo:{
            title:values.name,
            slug:generateUrlName(values.name),
          }
        })
          .unwrap()
          .then(() => {
            categoryFormik.resetForm()
            dispatch(showSuccess({ message: " Category created successfully" }));
          })
          .catch((err) => {
            dispatch(showError({ message: err?.data?.message }));
          });
      }
    },
  });
  const subCategoryFormik = useFormik({
    initialValues: {
      name: "",
      description: "<p></p>",
      status: "active",
      categoryId: "",
      showFilter: false,
    },
    enableReinitialize: true,
    validationSchema:
      multipleTagsForSub.length > 0
        ? multipleSubCategorySchema
        : subCategoryValidationSchema,
    onSubmit: (values) => {
      toggleCreateSubModalHandler();
      if (multipleTagsForSub.length > 0) {
        bulkCreateSubCategory(multipleTagsForSub)
          .unwrap()
          .then(() => {
            subCategoryFormik.resetForm();
            setMultipleTagsForSub([]);
            let state={
              ...cateoryOpenState,
              open:true
            }
            setCategoryOpenState(state)
            dispatch(showSuccess({ message: "Sub Categories created successfully" }));
          })
          .catch((err) => {
            dispatch(showError({ message: err?.data?.message }));
          });
      } else {
        createSubCategory({
          ...values,
          seo:{
            title:values.name,
            slug:generateUrlName(values.name),
          }
        })
          .unwrap()
          .then(() => {
            subCategoryFormik.resetForm();
            let state={
              ...cateoryOpenState,
              open:true
            }
            setCategoryOpenState(state)
            dispatch(showSuccess({ message: "Sub Category created successfully" }));
          })
          .catch((err) => {
            dispatch(showError({ message: err?.data?.message }));
          });
      }
    },
  });

  const changeCategoryTypeHandler = (event, tabIndex) => {
    setCategoryList([]);
    setSubCategoryList([]);
    setCategoryType(tabIndex);
    if (tabIndex === 0) {
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["active", "in-active","scheduled"],
      });
    } else if (tabIndex === 1) {
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["active", "in-active","scheduled"],
      });
    } else if (tabIndex === 2) {
     
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["archieved"],
      });
    } else if (tabIndex === 3) {
      dispatchQueryFilter({
        type: "SET_STATUS",
        status: ["archieved"],
      });
    }
    dispatchQueryFilter({ type: "SEARCH", name: "" });
  };

  const handleAlphabeticalSorting = (event) => {
    dispatchQueryFilter({
      type: "SET_ALPHABETICAL_SORTING",
      alphabetical: event.target.value,
    });
    setAnchorSortEl(null);
  };

  const handleChronologicalSorting = (event) => {
    dispatchQueryFilter({
      type: "SET_CRONOLOGICAL_SORTING",
      createdAt: event.target.value,
    });
    setAnchorSortEl(null);
  };


  const toggleCreateModalHandler = () => {
    setShowCreateModal((prevState) => !prevState);
    setShowCreatePopover(null);
    categoryFormik.resetForm();
    setIsEditing(false);
    setMultipleTags([]);
  };

  const toggleCreateSubModalHandler = () => {
    setShowCreateSubModal((prevState) => !prevState);
    setShowCreatePopover(null);
    subCategoryFormik.resetForm();
    setIsEditing(false);
    setMultipleTagsForSub([]);
  };

  const toggleCreatePopoverHandler = (e) => {
    setShowCreatePopover((prevState) => (prevState ? null : e.currentTarget));
  };

  // * SORT POPOVERS STARTS
  const [anchorSortEl, setAnchorSortEl] = React.useState(null);

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const handleSortRadio = (event) => {
    setSortFilter(event.target.value);
    setAnchorSortEl(null);
  };

  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;
  // * SORT POPOVERS ENDS

  // * STATUS POPOVERS STARTS
  const handleStatusClick = (event) => {
    setAnchorStatusEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorStatusEl(null);
  };

  const handleStatusChange = (event) => {
    if (event.target.checked) {
      if (queryFilterState.firstStatus === "all") {
        dispatchQueryFilter({
          type: "SET_STATUS",
          status: [event.target.value],
        });
        dispatchQueryFilter({
          type: "SET_STATUS_FIRST",
          value: "",
        });
      } else {
        dispatchQueryFilter({
          type: "SET_STATUS",
          status: [...queryFilterState.status, event.target.value],
        });
      }
    } else {
      if (queryFilterState.status.length > 1) {
        dispatchQueryFilter({
          type: "SET_STATUS",
          status: queryFilterState.status.filter(
            (status) => status !== event.target.value
          ),
        });
      } else {
        dispatchQueryFilter({
          type: "SET_STATUS",
          status: ["active", "in-active","scheduled"],
        });
        dispatchQueryFilter({
          type: "SET_STATUS_FIRST",
          value: "all",
        });
      }
    }
  };

  const openStatus = Boolean(anchorStatusEl);
  const idStatus = openStatus ? "simple-popover" : undefined;
  // * STATUS POPOVERS ENDS

  const deleteCategoryHandler = (data) => {
    deleteCategory(data._id).unwrap().then(()=>{
      dispatch(showSuccess({ message: "Category Deleted Successfully" }))
    })
  };

  const deleteSubCategoryHandler = (data) => {
    deleteSubCategory(data._id).unwrap().then(()=>{
      dispatch(showSuccess({ message: "Sub Category Deleted Successfully" }))
    })
  };

  useEffect(() => {
    if (categoriesIsSuccess && subCategoriesIsSuccess) {
      setError(false);
      setCategoryList([])
      setSubCategoryList([])

      if (categoryType === 0) {
        setCategoryList(categoriesData.data.data);
        setCategoryTotalCount(categoriesData.data.totalCount);
      }
      if (categoryType === 1) {
        setSubCategoryList(subCategoriesData.data.data);
        setSubCategoryTotalCount(subCategoriesData.data.totalCount);
      }
      if (categoryType === 2) {
        setCategoryList(categoriesData.data.data);
        setCategoryTotalCount(categoriesData.data.totalCount);
      }
      if (categoryType === 3) {
        setSubCategoryList(subCategoriesData.data.data);
        setSubCategoryTotalCount(subCategoriesData.data.totalCount);
      }
    }
  }, [
    categoriesData,
    subCategoriesData,
    categoriesIsSuccess,
    subCategoriesIsSuccess,
    categoriesError,
    subCategoriesError,
    createCategoryIsSuccess,
    createCategoryError,
    createSubCategoryIsSuccess,
    createSubCategoryError,
    editCategoryIsSuccess,
    editSubCategoryIsSuccess,
    categoryType,
    bulkTagEditSubCategoryIsSuccess,
    bulkCreateSubTagsIsSuccess,
    bulkDeleteSubCategoryIsSuccess,
    deleteCategoryIsSuccess,
    deleteSubCategoryIsSuccess,
    dispatch,
    sortFilter,
  ]);


  const handleAddMultiple = (event, Formik, setTags, tags, data, flag) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      Formik.validateForm().then(() => {
        if (Formik.isValid && Formik.values.name !== "") {
          Formik.setFieldTouched("name", true);
          let tagName = tags.map((item) => item.name?.trim()?.toLowerCase());
          let valueExists = tagName.includes(data.name?.trim()?.toLowerCase());
          if (valueExists) {
            dispatch(showError({ message: `${Formik.values.name.trim()} already exists` }));
          }
          if (!valueExists) {
            setTags((prevValues) => [...prevValues, data]);
            if (flag) {
              Formik.resetForm();
            } else {
              Formik.setFieldValue("name", "");
            }
          }

         
        }
      });
    }
  };

  const handleDelete = (value, setMultipleTags) => {
    setMultipleTags((prevValues) => prevValues.filter((v) => v.name !== value));
  };

  const subModalOpenHandler = (row) => {
    setShowCreateSubModal((prev) => !prev);
    subCategoryFormik.setFieldValue("categoryId", row._id);
    let state={
      ...cateoryOpenState,
      id:row._id,
    }
    setCategoryOpenState(state)
  };

  const handleChangeRowsPerPage = (event) => {
    dispatchQueryFilter({ type: "SET_PAGE_SIZE", value: event.target.value });
  };

  const handleChangePage = (_, pageNo) => {
    dispatchQueryFilter({ type: "CHANGE_PAGE", pageNo });
  };

  useEffect(() => {
    const filterParams = JSON.parse(searchParams.get("filter")) || {
      categoryType,
    };
    if (firstRender && Object.keys(filterParams).length) {
      let filters = {};
      for (let key in filterParams) {
        if (key !== "categoryType") {
          if (filterParams[key] !== (null || "")) {
            if (key === "status" && filterParams[key].length < 2) {
              dispatchQueryFilter({
                type: "SET_STATUS",
                status: ["active", "in-active","scheduled"],
              });
            }
            filters = {
              ...filters,
              [key]: filterParams[key],
            };
          }
        } else {
          setCategoryType(+filterParams[key]);
        }
      }
      if (filterParams.categoryType === (null || ""|| 0)) {
        setCategoryType(0);
      }
      dispatchQueryFilter({
        type: "SET_ALL_FILTERS",
        filters,
      });
      setFirstRender(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!firstRender) {
      setSearchParams({
        filter: JSON.stringify({ ...queryFilterState, categoryType }),
      });
    }
  }, [queryFilterState, setSearchParams, categoryType, firstRender]);

  const editPageHandler = (data,index) => {
    navigate({
      pathname: `/parameters/categories/edit/${data ? data.srNo : ""}`,
      search: `?${createSearchParams({
        filter: JSON.stringify({ ...queryFilterState, categoryType,order:data.order }),
      })}`,
    });
  };

  const editSubPageHandler = (data,index) => {
    navigate({
      pathname: `/parameters/subCategories/edit/${data ? data.srNo : ""}`,
      search: `?${createSearchParams({
        filter: JSON.stringify({ ...queryFilterState, categoryType,order:data.order  }),
      })}`,
    }); 
   };

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Categories</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer
            headingName={"Parameters / Categories"}
            icon={parameters}
          />
          <ExportDialog dialogName={"Categories"} />
          <ImportSecondDialog dialogName={"Categories"} />
          <div>
            <button
              onClick={toggleCreatePopoverHandler}
              className="button-gradient py-2 px-4 c-pointer"
            >
              <p>+ Create</p>
            </button>

            <Popover
              open={Boolean(showCreatePopover)}
              anchorEl={showCreatePopover}
              onClose={toggleCreatePopoverHandler}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <div className="py-2 px-1">
                <small
                  onClick={toggleCreateModalHandler}
                  className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back"
                >
                  Create Category
                </small>
                {categoriesData?.data?.data.length && (
                  <small
                    onClick={toggleCreateSubModalHandler}
                    className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back"
                  >
                    Create Sub-Category
                  </small>
                )}
              </div>
            </Popover>
          </div>

          <Dialog
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
            open={showCreateModal}
            onClose={toggleCreateModalHandler}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                <div className="d-flex mb-2">
                <p className="text-lightBlue me-2 ">Create Category </p>
                <Tooltip title="Enter Name" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
                </div>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  className="c-pointer"
                  onClick={toggleCreateModalHandler}
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <form noValidate onSubmit={categoryFormik.handleSubmit}>
              <DialogContent className="py-3 px-4">
              <div className="d-flex mb-2 mt-2">
                <p className="text-lightBlue me-2 ">Category Name </p>
                <Tooltip title="Enter Name" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
                </div>
                <FormControl className="col-7 px-0">
                  <OutlinedInput
                    placeholder="Enter Category Name"
                    size="small"
                    name="name"
                    value={categoryFormik.values.name}
                    onBlur={categoryFormik.handleBlur}
                    onChange={categoryFormik.handleChange}
                    onKeyDown={(e) =>
                      handleAddMultiple(
                        e,
                        categoryFormik,
                        setMultipleTags,
                        multipleTags,
                        {
                          name: categoryFormik.values.name,
                          status: "active",
                          showFilter: categoryFormik.values.showFilter,
                          description: "<p></p>",
                          type: "active",
                        },
                        true
                      )
                    }
                    endAdornment={
                      <InputAdornment position="end">
                         <Tooltip title="Create Multiple Category" placement="top">

                        <ChevronRightIcon
                          className="c-pointer"
                          onClick={(e) =>
                            handleAddMultiple(
                              e,
                              categoryFormik,
                              setMultipleTags,
                              multipleTags,
                              {
                                name: categoryFormik.values.name,
                                status: "active",
                                showFilter: categoryFormik.values.showFilter,
                                description: "<p></p>",
                                type: "active",
                              },
                              true
                            )
                          }
                        />
                         </Tooltip>
                      </InputAdornment>
                    }
                  />
                  {!!categoryFormik.touched.name &&
                    categoryFormik.errors.name && (
                      <FormHelperText error>
                        {categoryFormik.errors.name}
                      </FormHelperText>
                    )}
                </FormControl>
                <br />
                <div className="small">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="showFilter"
                      checked={categoryFormik.values.showFilter}
                      onChange={categoryFormik.handleChange}
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
                  className=" px-0"
                />
                <button className="reset link">(manage)</button>
                </div>
                <div className="d-flex">
                  {multipleTags &&
                    multipleTags.map((data, index) => {
                      return (
                        <Chip
                          label={data.name}
                          onDelete={() =>
                            handleDelete(data.name, setMultipleTags)
                          }
                          onClick={() => {}}
                          size="small"
                          className="mt-3 me-2"
                        ></Chip>
                      );
                    })}
                    
                </div>
              </DialogContent>
              <hr className="hr-grey-6 my-0" />
              <DialogActions className="d-flex justify-content-between px-4 py-3">
                <button
                  onClick={toggleCreateModalHandler}
                  type="button"
                  className="button-grey py-2 px-5"
                >
                  <p className="text-lightBlue">Cancel</p>
                </button>
                <LoadingButton
                  loading={createCategoryIsLoading}
                  disabled={createCategoryIsLoading}
                  type="submit"
                  className="button-gradient py-2 px-5"
                >
                  <p>Save</p>
                </LoadingButton>
              </DialogActions>
            </form>
          </Dialog>
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

            <form noValidate onSubmit={subCategoryFormik.handleSubmit}>
              <DialogContent className="py-3 px-4">
              <div className="d-flex mb-2 mt-2">
                <p className="text-lightBlue me-2 ">Select Category </p>
                <Tooltip title="Select category" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
                </div>
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
                      value={subCategoryFormik.values.categoryId}
                      onBlur={subCategoryFormik.handleBlur}
                      onChange={subCategoryFormik.handleChange}
                    >
                      {categoriesData.data.data.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  {!!subCategoryFormik.touched.categoryId &&
                    subCategoryFormik.errors.categoryId && (
                      <FormHelperText error>
                        {subCategoryFormik.errors.categoryId}
                      </FormHelperText>
                    )}
                </FormControl>
                <div className="d-flex mb-2 mt-2">
                <p className="text-lightBlue me-2 ">Sub Category Name </p>
                <Tooltip title="Enter Name" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
                </div>
                <FormControl className="col-md-7 px-0">
                  <OutlinedInput
                    placeholder="Enter Sub Category Name"
                    size="small"
                    name="name"
                    value={subCategoryFormik.values.name}
                    onBlur={subCategoryFormik.handleBlur}
                    onChange={subCategoryFormik.handleChange}
                    onKeyDown={(e) =>
                      handleAddMultiple(
                        e,
                        subCategoryFormik,
                        setMultipleTagsForSub,
                        multipleTagsForSub,
                        {
                          name: subCategoryFormik.values.name,
                          description: "<p></p>",
                          status: "active",
                          categoryId: subCategoryFormik.values.categoryId,
                          showFilter: subCategoryFormik.values.showFilter,
                        },
                        false
                      )
                    }
                    endAdornment={
                      <InputAdornment position="end">
                         <Tooltip title="Create Multiple Sub Category" placement="top">

                        <ChevronRightIcon
                          className="c-pointer"
                          onClick={(e) =>
                            handleAddMultiple(
                              e,
                              subCategoryFormik,
                              setMultipleTagsForSub,
                              multipleTagsForSub,
                              {
                                name: subCategoryFormik.values.name,
                                description: "<p></p>",
                                status: "active",
                                categoryId: subCategoryFormik.values.categoryId,
                                showFilter: subCategoryFormik.values.showFilter,
                              },
                              false
                            )
                          }
                        />
                         </Tooltip>
                      </InputAdornment>
                    }
                  />
                  {!!subCategoryFormik.touched.name &&
                    subCategoryFormik.errors.name && (
                      <FormHelperText error>
                        {subCategoryFormik.errors.name}
                      </FormHelperText>
                    )}
                </FormControl>
                <br />
                <div className="small">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="showFilter"
                      checked={subCategoryFormik.values.showFilter}
                      onChange={subCategoryFormik.handleChange}
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
                  className=" px-0"
                />
                 <button className="reset link">(manage)</button>
                 </div>
                <div className="d-flex">
                  {multipleTagsForSub &&
                    multipleTagsForSub.map((data, index) => {
                      return (
                        <Chip
                          label={data.name}
                          onDelete={() =>
                            handleDelete(data.name, setMultipleTagsForSub)
                          }
                          onClick={() => {}}
                          size="small"
                          className="mt-3 me-2"
                        ></Chip>
                      );
                    })}
                </div>
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
                  loading={createSubCategoryIsLoading}
                  disabled={createSubCategoryIsLoading}
                  type="submit"
                  className="button-gradient py-2 px-5"
                >
                  <p>Save</p>
                </LoadingButton>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      </div>

      <div className="row mt-4">
        <Paper
          sx={{ width: "100%", mb: 2, mt: 0, p: 0 }}
          className="border-grey-5 bg-black-15"
        >
          <Box
            sx={{ width: "100%" }}
            className="d-flex justify-content-between tabs-header-box"
          >
            {/* variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile */}
            <Tabs
              value={categoryType}
              onChange={changeCategoryTypeHandler}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label={`Categories (${CategoriesStatusCount?.data?.[0]?.active+CategoriesStatusCount?.data?.[0]?.inActive+CategoriesStatusCount?.data?.[0]?.scheduled})`} className="tabs-head" />
              <Tab label={`Sub Categories  (${SubCategoriesStatusCount?.data?.[0]?.active+SubCategoriesStatusCount?.data?.[0]?.inActive+SubCategoriesStatusCount?.data?.[0]?.scheduled})`} className="tabs-head" />
              <Tab label={`Archived Categories (${CategoriesStatusCount?.data?.[0]?.archived})`} className="tabs-head" />
              <Tab label={`Archived Sub Categories (${SubCategoriesStatusCount?.data?.[0]?.archived})`} className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch
              searchValue={queryFilterState.name}
              handleSearchChange={handleSearchChange}
            />
            <div className="d-flex">
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idStatus}
                variant="contained"
                onClick={handleStatusClick}
              >
                <small className="text-lightBlue me-2">Status</small>
                <img src={arrowDown} alt="sort" className="" />
              </button>
              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                id={idStatus}
                open={openStatus}
                anchorEl={anchorStatusEl}
                onClose={handleStatusClose}
                className="columns"
              >
                <FormControl className="px-2 py-1">
                  <FormControlLabel
                    value="active"
                    control={
                      <Checkbox size="small" sx={{ color: "#C8D8FF" }} />
                    }
                    label="Active"
                    onChange={handleStatusChange}
                    checked={queryFilterState.firstStatus ==="" && queryFilterState.status.includes("active")}
                  />
                  <FormControlLabel
                    value="in-active"
                    control={
                      <Checkbox size="small" sx={{ color: "#C8D8FF" }} />
                    }
                    label="In-Active"
                    onChange={handleStatusChange}
                    checked={queryFilterState.firstStatus ==="" && queryFilterState.status.includes("in-active")}
                  />
                  <FormControlLabel
                    value="scheduled"
                    control={
                      <Checkbox size="small" sx={{ color: "#C8D8FF" }} />
                    }
                    label="Scheduled"
                    onChange={handleStatusChange}
                    checked={queryFilterState.firstStatus ==="" && queryFilterState.status.includes("scheduled")}
                  />
                </FormControl>
              </Popover>
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idSort}
                variant="contained"
                onClick={handleSortClick}
              >
                <small className="text-lightBlue me-2">Sort</small>
                <img src={sort} alt="sort" className="" />
              </button>
              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                id={idSort}
                open={openSort}
                anchorEl={anchorSortEl}
                onClose={handleSortClose}
                className="columns"
              >
                <FormControl className="px-2 py-1">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                  <FormControlLabel
                    value="-1"
                    control={
                      <Radio
                        size="small"
                        checked={queryFilterState.createdAt === "-1"}
                      />
                    }
                    label="Newest to Oldest"
                    onChange={handleChronologicalSorting}
                  />
                  <FormControlLabel
                    value="1"
                    control={
                      <Radio
                        size="small"
                        checked={queryFilterState.createdAt === "1"}
                      />
                    }
                    label="Oldest to Newest"
                    onChange={handleChronologicalSorting}
                  />
                  <FormControlLabel
                    value="1"
                    control={
                      <Radio
                        size="small"
                        checked={queryFilterState.alphabetical === "1"}
                      />
                    }
                    label="Alphabetical (A-Z)"
                    onChange={handleAlphabeticalSorting}
                  />
                  <FormControlLabel
                    value="-1"
                    control={
                      <Radio
                        size="small"
                        checked={queryFilterState.alphabetical === "-1"}
                      />
                    }
                    label="Alphabetical (Z-A)"
                    onChange={handleAlphabeticalSorting}
                  />
                </RadioGroup>
                </FormControl>
              </Popover>
            </div>
          </div>
          {
            <>
              <TabPanel value={categoryType} index={0}>
                <CategoriesTable
                  isLoading={categoriesIsLoading || subCategoriesIsLoading}
                  deleteData={deleteCategoryHandler}
                  deleteSubData={true}
                  subModalOpenHandler={subModalOpenHandler}
                  error={error}
                  list={categoryList}
                  edit={true}
                  bulkEdit={bulkEditCategory}
                  bulkSubEdit={bulkEditSubCategory}
                  editCategory={editCategory}
                  editSubCategory={editSubCategory}
                  bulkDeleteCategory={bulkDeleteCategory}
                  archived={true}
                  changeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPage={queryFilterState.pageSize}
                  changePage={handleChangePage}
                  page={queryFilterState.pageNo}
                  editSubPageHandler={editSubPageHandler}
                  editPageHandler={editPageHandler}
                  totalCount={categoryTotalCount}
                  cateoryOpenState={cateoryOpenState}
                  setCategoryOpenState={setCategoryOpenState}
                />
              </TabPanel>
              <TabPanel value={categoryType} index={1}>
                <SubCategoriesTable
                  isLoading={subCategoriesIsLoading}
                  deleteData={deleteSubCategoryHandler}
                  error={error}
                  list={subCategoryList}
                  edit={true}
                  bulkEdit={bulkEditSubCategory}
                  editSubCategory={editSubCategory}
                  bulkDeleteSubCategory={bulkDeleteSubCategory}
                  archived={true}
                  changeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPage={queryFilterState.pageSize}
                  changePage={handleChangePage}
                  page={queryFilterState.pageNo}
                  editPageHandler={editSubPageHandler}
                  totalCount={subCategoryTotalCount}
                />
              </TabPanel>
              <TabPanel value={categoryType} index={2}>
                <CategoriesTable
                  isLoading={categoriesIsLoading}
                  deleteData={deleteCategoryHandler}
                  error={error}
                  list={categoryList}
                  edit={true}
                  bulkEdit={bulkEditCategory}
                  bulkSubEdit={bulkEditSubCategory}
                  editCategory={editCategory}
                  editSubCategory={editSubCategory}
                  bulkDeleteCategory={bulkDeleteCategory}
                  archived={false}
                  changeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPage={queryFilterState.pageSize}
                  changePage={handleChangePage}
                  page={queryFilterState.pageNo}
                  editPageHandler={editPageHandler}
                  editSubPageHandler={editSubPageHandler}
                  totalCount={categoryTotalCount}
                  cateoryOpenState={cateoryOpenState}
                  setCategoryOpenState={setCategoryOpenState}
                />
              </TabPanel>
              <TabPanel value={categoryType} index={3}>
                <SubCategoriesTable
                  isLoading={subCategoriesIsLoading}
                  deleteData={deleteSubCategoryHandler}
                  error={error}
                  list={subCategoryList}
                  edit={true}
                  bulkEdit={bulkEditSubCategory}
                  editSubCategory={editSubCategory}
                  bulkDeleteSubCategory={bulkDeleteSubCategory}
                  changeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPage={queryFilterState.pageSize}
                  changePage={handleChangePage}
                  page={queryFilterState.pageNo}
                  editPageHandler={editSubPageHandler}
                  archived={false}
                  totalCount={subCategoryTotalCount}
                />
              </TabPanel>
            </>
          }
        </Paper>
      </div>
    </div>
  );
};

export default Categories;
