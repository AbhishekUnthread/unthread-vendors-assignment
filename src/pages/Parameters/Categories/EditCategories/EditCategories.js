import React, { useEffect, useState } from "react";
import "../../EditVendor/EditVendor.scss";
import { Link, useNavigate } from "react-router-dom";
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
import SaveFooter from "../../../../components/SaveFooter/SaveFooter";
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
  FormControl,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
  Paper,
  Popover,
  Tab,
  Tabs,
  TextField,
  Tooltip
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryId } from "../../../../features/parameters/categories/categorySlice";
import { useCreateCategoryMutation, useEditCategoryMutation, useGetAllCategoriesQuery } from "../../../../features/parameters/categories/categoriesApiSlice";

const EditCategories = () => {
  const [categoryType, setCategoryType] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("active");
  const [categoryNotes, setCategoryNotes] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [categoryVisibility, setCategoryVisibility] = useState(false);
  const [categorySeo,setCategorySeo] = useState({})
  const [categoryMediaUrl, setCategoryMediaUrl] = useState('')
  const [checked, setChecked] = useState(false);
  const categoryId = useSelector((state) => state.category.categoryId);


  const [
    createCategory,
    {
      isLoading: createCategoryIsLoading,
      isSuccess: createCategoryIsSuccess,
      error: createCategoryError,
    },
  ] = useCreateCategoryMutation();

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    error: categoriesError,
  } = useGetAllCategoriesQuery({ createdAt: "-1", id: categoryId });

  const [
    editCategory,
    {
      data: editData,
      isLoading: editCategoryIsLoading,
      isSuccess: editCategoryIsSuccess,
      error: editCategoryError,
    },
  ] = useEditCategoryMutation();

  useEffect(() => {
    if (categoriesIsSuccess && categoryId !== "") {
      // If categoriesIsSuccess is true, set the category name based on the data from the API response
      setCategoryName(categoriesData.data.data[0].name);
      setCategoryDescription(categoriesData.data.data[0].description);
      setCategoryStatus(categoriesData.data.data[0].status);
      setCategoryVisibility(categoriesData.data.data[0].isVisibleFrontend)
      setCategoryNotes(categoriesData.data.data[0].notes)
      setChecked(categoriesData.data.data[0].showFilter)
      setStartDate(categoriesData.data.data[0].startDate)
      setEndDate(categoriesData.data.data[0].endDate)
      setCategoryMediaUrl(categoriesData.data.data[0].mediaUrl)
      setCategorySeo(categoriesData.data.data[0].seo)
    }
  }, [categoriesIsSuccess]);



  const handleNameChange = (event) => {
    setCategoryName(event.target.value); // Updating the category name based on the input value
  };

  const handleSubmit = () => {
    if (categoryId !== "") {
      // Calling Category edit API
      editCategory({
        id: categoryId, // ID of the category
        details: {
          showFilter: checked, // Whether to show filters
          name: categoryName, // Category name
          description: categoryDescription, // Category description
          status: categoryStatus, // Category status
          isVisibleFrontend: categoryVisibility,
          notes: categoryNotes,
          startDate: startDate,
          endDate: endDate,
          mediaUrl: categoryMediaUrl,
          seo: categorySeo,
        },
      })
        .unwrap()
        .then(() => {
          navigate("/parameters/categories"); // Navigating to categories page after successful edit
        });
    } else {
      createCategory({
        showFilter: checked, // Whether to show filters
        name: categoryName, // Category name
        description: categoryDescription, // Category description
        status: categoryStatus, // Category status
        isVisibleFrontend: categoryVisibility,
        notes: categoryNotes,
        startDate: startDate,
        endDate: endDate,
        mediaUrl: categoryMediaUrl,
        seo: categorySeo,
      })
        .unwrap()
        .then(() => {
          navigate("/parameters/categories"); // Navigating to categories page after successful creation
        });
    }
  };

  const handleSubmitAndAddAnother = () => {
    if (categoryId !== "") {
      // Calling Category edit API
      editCategory({
        id: categoryId, // ID of the category
        details: {
          showFilter: checked, // Whether to show filters
          name: categoryName, // Category name
          description: categoryDescription, // Category description
          status: categoryStatus, // Category status,
          isVisibleFrontend: categoryVisibility,
          notes: categoryNotes,
          startDate: startDate,
          endDate: endDate,
          mediaUrl: categoryMediaUrl,
          seo: categorySeo,
        },
      })
        .unwrap()
        .then(() => {
          navigate("/parameters/categories/edit"); // Navigating to edit page after successful edit
        });
    } else {
      createCategory({
        showFilter: checked, // Whether to show filters
        name: categoryName, // Category name
        description: categoryDescription, // Category description
        status: categoryStatus, // Category status
        isVisibleFrontend: categoryVisibility,
        notes: categoryNotes,
        startDate: startDate,
        endDate: endDate,
        mediaUrl: categoryMediaUrl,
        seo: categorySeo,
      })
        .unwrap()
        .then(() => {
          navigate("/parameters/categories/edit"); // Navigating to categories page after successful creation
        });
    }

    resetValues() // Resetting the category 
    dispatch(updateCategoryId(""));
  };

  const resetValues = () => {
    setCategoryName("");
    setCategoryDescription("");
    setCategoryStatus("active");
    setCategoryNotes("");
    setCategoryVisibility(false);
    setChecked(false);
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
      <AddHeader headerName={categoryName || ""} navigateLink={"/parameters/categories"} />
      <div className="row mt-3">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
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
                <OutlinedInput value={categoryName} onChange={handleNameChange} placeholder="Gold Products" size="small" />
              </FormControl>
            </div>
            <FormGroup>
              <div className="d-flex align-items-center col-12 px-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      inputProps={{ "aria-label": "controlled" }}
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
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
              <AppTextEditor value={categoryDescription} setFieldValue={(val) => setCategoryDescription(val)} />
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
            <div className="d-flex justify-content-between mb-2 px-0">
            </div>
            {
              <>
                <TabPanel value={categoryType} index={0}>
                  <AddCategoriesProducts />
                </TabPanel>
                <TabPanel value={categoryType} index={1}>
                  <AddSubCategoriesProducts id={categoryId} />
                </TabPanel>
              </>
            }
          </div>
          <div className="mt-4">
            <SEO name={categoryName} value={categorySeo} handleSeoChange={setCategorySeo} />
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <StatusBox
            headingName={"Category Status"}
            value={categoryStatus}
            handleProductStatus={(_, val) => setCategoryStatus(val)}
            toggleData={['active', 'scheduled']}
          />
          <VisibilityBox value={categoryVisibility}
            visibilityChange={(_, val) => setCategoryVisibility(val)}
            startDate={startDate}
            endDate={endDate}
            StartDateChange={setStartDate}
            EndDateChange={setEndDate}
          />
          <div className="mt-4">
            <UploadMediaBox imageName={addMedia} headingName={"Media"} UploadChange={setCategoryMediaUrl} imageValue={categoryMediaUrl} />
          </div>
          <NotesBox name={'notes'} value={categoryNotes} onChange={(e) => setCategoryNotes(e.target.value)} />
        </div>
      </div>
      <SaveFooter handleSubmit={handleSubmit} handleSubmitAndAddAnother={handleSubmitAndAddAnother} />
    </div>
  );
};

export default EditCategories;
