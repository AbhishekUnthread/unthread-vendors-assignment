import { forwardRef, useState, useEffect } from "react";
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
} from "../../../features/parameters/categories/categoriesApiSlice";

import "../../Products/AllProducts/AllProducts.scss";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Categories = () => {
  const dispatch = useDispatch();
  const [categoryType, setCategoryType] = useState(0);
  const [categoriesStatus, setCategoriesStatus] = useState("Active");
  const [categoryList, setCategoryList] = useState([]);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({
    start: 0,
    limit: 10,
    total: null,
  });

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    error: categoriesError,
  } = useGetAllCategoriesQuery(
    {
      "populate[products][fields][0]": "id",
      "filters[status][$eq]": categoriesStatus,
      "pagination[start]": pagination.start,
      "pagination[limit]": pagination.limit,
    },
    {
      skip: categoryType === 2,
    }
  );
  const {
    data: subCategoriesData,
    isLoading: subCategoriesIsLoading,
    isSuccess: subCategoriesIsSuccess,
    error: subCategoriesError,
  } = useGetAllSubCategoriesQuery(
    {
      "populate[products][fields][0]": "id",
      "filters[status][$eq]": categoriesStatus,
      "pagination[start]": pagination.start,
      "pagination[limit]": pagination.limit,
    },
    {
      skip: categoryType === 1,
    }
  );

  const changeCategoryTypeHandler = (event, tabIndex) => {
    setCategoryType(tabIndex);
    setPagination({
      start: 0,
      limit: 10,
      total: null,
    });
    if (tabIndex === 3) {
      setCategoriesStatus("Draft");
    } else {
      setCategoriesStatus("Active");
    }
  };

  useEffect(() => {
    if (categoriesError) {
      setError(true);
      if (categoriesError.data?.error?.message) {
        dispatch(showError({ message: categoriesError.data.error.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (subCategoriesError) {
      setError(true);
      if (subCategoriesError.data?.error?.message) {
        dispatch(showError({ message: subCategoriesError.data.error.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (categoryType === 0 || categoryType === 3) {
      if (categoriesIsSuccess && subCategoriesIsSuccess) {
        setError(false);
        setCategoryList([...categoriesData.data, ...subCategoriesData.data]);
      } else {
        setCategoryList([]);
      }
    }
    if (categoryType === 1) {
      if (categoriesIsSuccess) {
        setError(false);
        setCategoryList(categoriesData.data);
      } else {
        setCategoryList([]);
      }
    }
    if (categoryType === 2) {
      if (subCategoriesIsSuccess) {
        setError(false);
        setCategoryList(subCategoriesData.data);
      } else {
        setCategoryList([]);
      }
    }
  }, [
    categoriesData,
    subCategoriesData,
    categoriesIsSuccess,
    subCategoriesIsSuccess,
    categoriesError,
    subCategoriesError,
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
          <button
            to="/parameters/createFieldSets"
            className="button-gradient py-2 px-4 c-pointer"
          >
            <p>+ Create</p>
          </button>

          <Popover
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
              <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                Create Category
              </small>
              {/* {allCategory.length ? (
                <small className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back">
                  Create Sub-Category
                </small>
              ) : (
                ""
              )} */}
            </div>
          </Popover>

          <Dialog
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">{"Update Category"}</h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">Category Name</p>
              <FormControl className="col-7 px-0">
                <OutlinedInput placeholder="Enter Category Name" size="small" />
              </FormControl>
              <div className="d-flex"></div>
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button className="button-grey py-2 px-5">
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button className="button-gradient py-2 px-5">
                <p>Save</p>
              </button>
            </DialogActions>
          </Dialog>
          <Dialog
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">
                    {"Create Sub Category"}
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
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />

            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">Select Category</p>
              <FormControl
                //   sx={{ m: 0, minWidth: 120, width: "100%" }}
                size="small"
                className="col-md-7"
              >
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  size="small"
                ></Select>
              </FormControl>
              <p className="text-lightBlue mb-2 mt-3">Sub Category</p>
              <FormControl className="col-md-7 px-0">
                <OutlinedInput
                  placeholder="Enter Sub Category Name"
                  size="small"
                />
              </FormControl>
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button className="button-grey py-2 px-5">
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button className="button-gradient py-2 px-5">
                <p>Save</p>
              </button>
            </DialogActions>
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
              <Tab label="All" className="tabs-head" />
              <Tab label="Categories" className="tabs-head" />
              <Tab label="Sub Categories" className="tabs-head" />
              <Tab label="Draft" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          {
            <>
              <TabPanel value={categoryType} index={0}>
                <CategoriesTable error={error} list={categoryList} />
              </TabPanel>
              <TabPanel value={categoryType} index={1}>
                <CategoriesTable error={error} list={categoryList} />
              </TabPanel>
              <TabPanel value={categoryType} index={2}>
                <CategoriesTable error={error} list={categoryList} />
              </TabPanel>
              <TabPanel value={categoryType} index={3}>
                <CategoriesTable error={error} list={categoryList} />
              </TabPanel>
            </>
          }
        </Paper>
      </div>
    </div>
  );
};

export default Categories;
