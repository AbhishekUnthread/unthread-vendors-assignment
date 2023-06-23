import React from "react";
import "../../EditVendor/EditVendor.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppTextEditor from "../../../../components/AppTextEditor/AppTextEditor";
import NotesBox from "../../../../components/NotesBox/NotesBox";
import StatusBox from "../../../../components/StatusBox/StatusBox";
import AddCategoriesProducts from "../../../../components/AddCategoriesProducts/AddCategoriesProducts";
import AddSubCategoriesProducts from "../../../../components/AddSubCategoriesProduct/AddSubCategoriesProduct";
import TabPanel from "../../../../components/TabPanel/TabPanel";
import UploadMediaBox from "../../../../components/UploadMediaBox/UploadMediaBox";
import SEOToggler from "../../../../components/SEOToggler/SEOToggler";
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

const EditCategories = () => {
  const [categoryType, setCategoryType] = React.useState(0);

  const changeCategoryTypeHandler = (event, tabIndex) => {
    setCategoryType(tabIndex);
    if (tabIndex === 0) {
    }
    if (tabIndex === 1) {
    }
  };

  return (
    <div className="page container-fluid position-relative user-group">
      <AddHeader headerName={"Gold Products"}/>
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
                <OutlinedInput placeholder="Gold Products" size="small" />
              </FormControl>
            </div>
            <FormGroup>
              <div className="d-flex align-items-center mt-3 col-12 px-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      inputProps={{ "aria-label": "controlled" }}
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
                <AppTextEditor />
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
                    <AddSubCategoriesProducts />
                  </TabPanel>
                </>
              }
          </div>
          <SEOToggler />
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <StatusBox headingName={"Category Status"} />
          <VisibilityBox />
          <div className="mt-4">
            <UploadMediaBox imageName={addMedia} headingName={"Media"} />
          </div>
          <NotesBox />
        </div>
      </div>
      <SaveFooter />
    </div>
  );
};

export default EditCategories;
