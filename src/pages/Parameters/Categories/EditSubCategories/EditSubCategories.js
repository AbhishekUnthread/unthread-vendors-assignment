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
import { useCreateSubCategoryMutation, useEditSubCategoryMutation, useGetAllSubCategoriesQuery } from "../../../../features/parameters/categories/categoriesApiSlice";
import { updateCategoryId } from "../../../../features/parameters/categories/categorySlice";
import { showSuccess } from "../../../../features/snackbar/snackbarAction";

const EditSubCategories = () => {
  const [categoryType, setCategoryType] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryDescription, setSubCategoryDescription] = useState("");
  const [subCategoryStatus, setSubCategoryStatus] = useState("active");
  const [subCategoryNotes, setSubCategoryNotes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [subCategoryVisibility, setSubCategoryVisibility] = useState(false);
  const [subCategorySeo, setSubCategorySeo] = useState({});
  const [subCategoryMediaUrl, setSubCategoryMediaUrl] = useState("");
  const [categoryName,setCategoryName] = useState("")
  const [checked, setChecked] = useState(false);
  const subCategoryId = useSelector((state) => state.category.categoryId);

  const [
    createSubCategory,
    {
      isLoading: createSubCategoryIsLoading,
      isSuccess: createSubCategoryIsSuccess,
      error: createSubCategoryError,
    },
  ] = useCreateSubCategoryMutation();

  const {
    data: subCategoriesData,
    isLoading: subCategoriesIsLoading,
    isSuccess: subCategoriesIsSuccess,
    error: subCategoriesError,
  } = useGetAllSubCategoriesQuery({ createdAt: "-1", id: subCategoryId });

  const [
    editSubCategory,
    {
      data: editData,
      isLoading: editSubCategoryIsLoading,
      isSuccess: editSubCategoryIsSuccess,
      error: editSubCategoryError,
    },
  ] = useEditSubCategoryMutation();

  useEffect(() => {
    if (subCategoriesIsSuccess && subCategoryId !== "") {
      setSubCategoryName(subCategoriesData.data.data[0].name);
      setSubCategoryDescription(subCategoriesData.data.data[0].description);
      setSubCategoryStatus(subCategoriesData.data.data[0].status);
      setSubCategoryVisibility(subCategoriesData.data.data[0].isVisibleFrontend);
      setSubCategoryNotes(subCategoriesData.data.data[0].notes);
      setChecked(subCategoriesData.data.data[0].showFilter);
      setStartDate(subCategoriesData.data.data[0].startDate || null);
      setEndDate(subCategoriesData.data.data[0].endDate || null);
      setSubCategoryMediaUrl(subCategoriesData.data.data[0].mediaUrl);
      setCategoryName(subCategoriesData.data.data[0].category?.[0]?.name || "")
      setSubCategorySeo(subCategoriesData.data.data[0]?.seos || {});
    }
  }, [subCategoriesIsSuccess]);

  const handleSubmit = () => {
    if (subCategoryId !== "") {
      let editItem ={
        name: subCategoryName,
        description: subCategoryDescription,
        status: startDate === null ? subCategoryStatus :"scheduled",
        isVisibleFrontend: subCategoryVisibility,
        notes: subCategoryNotes,
        showFilter: checked,
        mediaUrl: subCategoryMediaUrl,
        seo: subCategorySeo,
      }
      if(startDate){
        editItem.startDate = startDate
      }
      if(endDate){
        editItem.endDate = endDate
      }
      editSubCategory({
        id: subCategoryId,
        details: editItem,
      })
        .unwrap()
        .then(() => {
          dispatch(showSuccess({message:"Sub Category Updated Successfully"}))
        });
    } else {
      createSubCategory({
          name: subCategoryName,
          description: subCategoryDescription,
          status: subCategoryStatus,
          isVisibleFrontend: subCategoryVisibility,
          notes: subCategoryNotes,
          showFilter: checked,
          startDate,
          endDate,
          mediaUrl: subCategoryMediaUrl,
          seo: subCategorySeo,
      })
        .unwrap()
        .then(() => {
          navigate("/parameters/categories");
        });
    }
  };
  const clearDate = () => {
    setStartDate(null);
    setEndDate(null);
  }

  




  const handleNameChange = (event) => {
    setSubCategoryName(event.target.value);
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
      <AddHeader headerName={subCategoryName} subHeading={`Parent Category: ${categoryName}`} subHighlightstext={"(Change)"} navigateLink={"/parameters/categories"} />
      <div className="row mt-3">
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
                <OutlinedInput value={subCategoryName} onChange={handleNameChange} placeholder="Rings" size="small" />
              </FormControl>
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
                <AppTextEditor value={subCategoryDescription} setFieldValue={val=>setSubCategoryDescription(val)} />
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
              </Tabs>
            </Box>
            <div className="d-flex justify-content-between mb-2 px-0">
            </div>
              {
                <>
                  <TabPanel value={categoryType} index={0}>
                    <AddCategoriesProducts />
                  </TabPanel>
                </>
              }
          </div>
          <SEO name={subCategoryName} value={subCategorySeo} handleSeoChange={setSubCategorySeo} />
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <StatusBox headingName={"Sub-Category Status"}
             value={subCategoryStatus}
             handleProductStatus={(_, val) => setSubCategoryStatus(val)}
             toggleData={['active', 'in-active']}
             startDate={startDate}
            endDate={endDate}
            handleStartDate={setStartDate}
            handleEndDate={setEndDate}
            clearDate={clearDate}
              />
          <VisibilityBox value={subCategoryVisibility}
            onChange={(_, val) => setSubCategoryVisibility(val)} />
          <div className="mt-4">
            <UploadMediaBox imageName={addMedia} headingName={"Media"} UploadChange={setSubCategoryMediaUrl} imageValue={subCategoryMediaUrl} />
          </div>
          <NotesBox value={subCategoryNotes} onChange={(e) => setSubCategoryNotes(e.target.value)} />
        </div>
      </div>
      <SaveFooter handleSubmit={handleSubmit}  />
    </div>
  );
};

export default EditSubCategories;
