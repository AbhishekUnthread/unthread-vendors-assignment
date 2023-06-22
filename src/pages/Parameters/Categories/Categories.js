import { forwardRef, useState, useEffect, useReducer } from "react";
import {
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
  Chip,
  Select,
  MenuItem,
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
} from "../../../features/parameters/categories/categoriesApiSlice";

import "../../Products/AllProducts/AllProducts.scss";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const categoryValidationSchema = Yup.object({
  name: Yup.string().trim().min(3).required("required"),
  description: Yup.string().trim().min(3).optional(),
  status: Yup.mixed().oneOf(["active", "inactive"]).optional(),
});
const subCategoryValidationSchema = Yup.object({
  name: Yup.string().trim().min(3).required("required"),
  description: Yup.string().trim().min(3).optional(),
  status: Yup.mixed().oneOf(["active", "inactive"]).optional(),
  categoryId: Yup.string().required("required"),
});

const Categories = () => {
  const dispatch = useDispatch();
  const [categoryType, setCategoryType] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateSubModal, setShowCreateSubModal] = useState(false);
  const [showCreatePopover, setShowCreatePopover] = useState(null);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    error: categoriesError,
  } = useGetAllCategoriesQuery({ createdAt: -1 });
  const {
    data: subCategoriesData,
    isLoading: subCategoriesIsLoading,
    isSuccess: subCategoriesIsSuccess,
    error: subCategoriesError,
  } = useGetAllSubCategoriesQuery();
  const [
    createCategory,
    {
      isLoading: createCategoryIsLoading,
      isSuccess: createCategoryIsSuccess,
      error: createCategoryError,
    },
  ] = useCreateCategoryMutation();
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

  const categoryFormik = useFormik({
    initialValues: {
      name: "",
      description: "some description",
      status: "active",
    },
    enableReinitialize: true,
    validationSchema: categoryValidationSchema,
    onSubmit: (values) => {
      if (isEditing) {
        editCategory({ id: editId, details: values })
          .unwrap()
          .then(() => categoryFormik.resetForm());
      } else {
        createCategory(values)
          .unwrap()
          .then(() => categoryFormik.resetForm());
      }
    },
  });
  const subCategoryFormik = useFormik({
    initialValues: {
      name: "",
      description: "some description",
      status: "active",
      categoryId: "",
    },
    enableReinitialize: true,
    validationSchema: subCategoryValidationSchema,
    onSubmit: (values) => {
      if (isEditing) {
        editSubCategory({ id: editId, details: values })
          .unwrap()
          .then(() => subCategoryFormik.resetForm());
      } else {
        createSubCategory(values)
          .unwrap()
          .then(() => subCategoryFormik.resetForm());
      }
    },
  });

  const changeCategoryTypeHandler = (event, tabIndex) => {
    setCategoryType(tabIndex);
    if (tabIndex === 0) {
      setCategoryList(
        [...categoriesData.data.data, ...subCategoriesData.data.data].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
      );
    }
    if (tabIndex === 1) {
      setCategoryList(categoriesData.data.data);
    }
    if (tabIndex === 2) {
      setCategoryList(subCategoriesData.data.data);
    }
  };

  const toggleCreateModalHandler = () => {
    setShowCreateModal((prevState) => !prevState);
    setShowCreatePopover(null);
    categoryFormik.resetForm();
    setIsEditing(false);
    setEditId(null);
  };

  const toggleCreateSubModalHandler = () => {
    setShowCreateSubModal((prevState) => !prevState);
    setShowCreatePopover(null);
    subCategoryFormik.resetForm();
    setIsEditing(false);
    setEditId(null);
  };

  const toggleCreatePopoverHandler = (e) => {
    setShowCreatePopover((prevState) => (prevState ? null : e.currentTarget));
  };

  const deleteCategoryHandler = (data) => {
    if (categoryType === 0) {
      if (data.categoryId) {
        deleteSubCategory(data._id);
      } else {
        deleteCategory(data._id);
      }
    }
    if (categoryType === 1) {
      deleteCategory(data._id);
    }
    if (categoryType === 2) {
      deleteSubCategory(data._id);
    }
  };

  const editCategoryHandler = (data) => {
    setIsEditing(true);
    setEditId(data._id);
    if (categoryType === 0) {
      if (data.categoryId) {
        setShowCreateSubModal((prevState) => !prevState);
        subCategoryFormik.setFieldValue("name", data.name);
        subCategoryFormik.setFieldValue("categoryId", data.categoryId);
      } else {
        setShowCreateModal((prevState) => !prevState);
        categoryFormik.setFieldValue("name", data.name);
      }
    }
    if (categoryType === 1) {
      setShowCreateModal((prevState) => !prevState);
      categoryFormik.setFieldValue("name", data.name);
    }
    if (categoryType === 2) {
      setShowCreateSubModal((prevState) => !prevState);
      subCategoryFormik.setFieldValue("name", data.name);
      subCategoryFormik.setFieldValue("categoryId", data.categoryId);
    }
  };

  useEffect(() => {
    if (categoriesError) {
      setError(true);
      if (categoriesError.data?.message) {
        dispatch(showError({ message: categoriesError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (subCategoriesError) {
      setError(true);
      if (subCategoriesError.data?.message) {
        dispatch(showError({ message: subCategoriesError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }

    if (createCategoryError) {
      setError(true);
      if (createCategoryError.data?.message) {
        dispatch(showError({ message: createCategoryError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (createSubCategoryError) {
      setError(true);
      if (createSubCategoryError.data?.message) {
        dispatch(showError({ message: createSubCategoryError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }

    if (categoriesIsSuccess && subCategoriesIsSuccess) {
      setError(false);

      if (categoryType === 0) {
        setCategoryList(
          [...categoriesData.data.data, ...subCategoriesData.data.data].sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
        );
      }
      if (categoryType === 1) {
        setCategoryList(categoriesData.data.data);
      }
      if (categoryType === 2) {
        setCategoryList(subCategoriesData.data.data);
      }
    }
    if (createCategoryIsSuccess || editCategoryIsSuccess) {
      setShowCreateModal(false);
    }
    if (createSubCategoryIsSuccess || editSubCategoryIsSuccess) {
      setShowCreateSubModal(false);
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
    dispatch,
  ]);

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
                  <h5 className="text-lightBlue fw-500">{`${
                    isEditing ? "Edit" : "Create"
                  } Category`}</h5>

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
                <p className="text-lightBlue mb-2">Category Name</p>
                <FormControl className="col-7 px-0">
                  <OutlinedInput
                    placeholder="Enter Category Name"
                    size="small"
                    name="name"
                    value={categoryFormik.values.name}
                    onBlur={categoryFormik.handleBlur}
                    onChange={categoryFormik.handleChange}
                  />
                  {!!categoryFormik.touched.name &&
                    categoryFormik.errors.name && (
                      <FormHelperText error>
                        {categoryFormik.errors.name}
                      </FormHelperText>
                    )}
                </FormControl>
                <div className="d-flex"></div>
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
                  loading={createCategoryIsLoading || editCategoryIsLoading}
                  disabled={createCategoryIsLoading || editCategoryIsLoading}
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
                  <h5 className="text-lightBlue fw-500">
                    {`${isEditing ? "Edit" : "Update"} Sub Category`}
                  </h5>

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
                      value={subCategoryFormik.values.categoryId}
                      onBlur={subCategoryFormik.handleBlur}
                      onChange={subCategoryFormik.handleChange}
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
                  {!!subCategoryFormik.touched.categoryId &&
                    subCategoryFormik.errors.categoryId && (
                      <FormHelperText error>
                        {subCategoryFormik.errors.categoryId}
                      </FormHelperText>
                    )}
                </FormControl>
                <p className="text-lightBlue mb-2 mt-3">Sub Category</p>
                <FormControl className="col-md-7 px-0">
                  <OutlinedInput
                    placeholder="Enter Sub Category Name"
                    size="small"
                    name="name"
                    value={subCategoryFormik.values.name}
                    onBlur={subCategoryFormik.handleBlur}
                    onChange={subCategoryFormik.handleChange}
                  />
                  {!!subCategoryFormik.touched.name &&
                    subCategoryFormik.errors.name && (
                      <FormHelperText error>
                        {subCategoryFormik.errors.name}
                      </FormHelperText>
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
                  loading={
                    createSubCategoryIsLoading || editSubCategoryIsLoading
                  }
                  disabled={
                    createSubCategoryIsLoading || editSubCategoryIsLoading
                  }
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
              <Tab label="Categories" className="tabs-head" />
              <Tab label="Sub Categories" className="tabs-head" />
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          {
            <>
              <TabPanel value={categoryType} index={0}>
                <CategoriesTable
                  isLoading={categoriesIsLoading || subCategoriesIsLoading}
                  deleteData={deleteCategoryHandler}
                  error={error}
                  list={categoryList}
                  edit={editCategoryHandler}
                />
              </TabPanel>
              <TabPanel value={categoryType} index={1}>
                <SubCategoriesTable
                  isLoading={categoriesIsLoading}
                  deleteData={deleteCategoryHandler}
                  error={error}
                  list={categoryList}
                  edit={editCategoryHandler}
                />
              </TabPanel>
              <TabPanel value={categoryType} index={2}>
                <SubCategoriesTable
                  isLoading={subCategoriesIsLoading}
                  deleteData={deleteCategoryHandler}
                  error={error}
                  list={categoryList}
                  edit={editCategoryHandler}
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
