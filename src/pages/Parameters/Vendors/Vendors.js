import React, { forwardRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Products/AllProducts/AllProducts.scss";
// ! COMPONENT IMPORTS
import TabPanel from "../../../components/TabPanel/TabPanel";
import VendorsTable from "./VendorsTable";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import TableSearch from "../../../components/TableSearch/TableSearch";
// ! IMAGES IMPORTS
import cancel from "../../../assets/icons/cancel.svg";
import parameters from "../../../assets/icons/sidenav/parameters.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  OutlinedInput,
  Paper,
  Slide,
  Tab,
  Tabs,
  Select,
  MenuItem,
  Chip,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Popover,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";
import {
  useGetAllVendorsQuery,
  useCreateVendorMutation,
  useDeleteVendorMutation,
  useBulkCreateVendorMutation,
  useEditVendorMutation,
} from "../../../features/parameters/vendors/vendorsApiSlice";
import { updateVendorId } from "../../../features/parameters/vendors/vendorSlice";
import sort from "../../../assets/icons/sort.svg";


// ! MATERIAL ICONS IMPORTS

// ? DIALOG TRANSITION STARTS HERE
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const Vendors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vendorType, setVendorType] = useState(0);
  const [vendorList, setVendorList] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = React.useState(null);
  const [selectedStatusOption, setSelectedStatusOption] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [multipleVendors,setMultipleVendors] = React.useState([]);

    const vendorValidationSchema = Yup.object({
    name: Yup.string().trim().min(3).required("Required"),
  // description: Yup.string().trim().min(3).required(),
  // status: Yup.mixed().oneOf(["active", "inactive"]).optional(),
});
  const multipleVendorsSchema = Yup.object({
  name: Yup.string().trim().min(3,"Name must be at least 3 characters long"),
  });

  const handleDelete = (value) => {
    setMultipleVendors((prevValues) => prevValues.filter((v) => v.name !== value));
  };


//Initializes an empty object to store the query parameters.
  const queryParameters = {};

// Check selectedSortOption
if (selectedSortOption) {
  // Check alphabetical sort options
  if (selectedSortOption === "alphabeticalAtoZ" || selectedSortOption === "alphabeticalZtoA") {
    queryParameters.alphabetical = selectedSortOption === "alphabeticalAtoZ" ? "1" : "-1";
  }
  // Check createdAt sort options
  else if (selectedSortOption === "oldestToNewest" || selectedSortOption === "newestToOldest") {
    queryParameters.createdAt = selectedSortOption === "oldestToNewest" ? "1" : "-1";
  }
}

// Check selectedStatusOption
if (selectedStatusOption !== null) {
  queryParameters.status = selectedStatusOption;
}

if(searchValue)
{
  queryParameters.name = searchValue;
}

// Check if both selectedSortOption and selectedStatusOption are null
if (!selectedSortOption && selectedStatusOption === null && !searchValue) {
  queryParameters.createdAt = "-1"; // Set default createdAt value
}

const vendorTypeQuery = vendorType === 0 ? { createdAt: -1 }
  : vendorType === 1 ? { status: "draft" }
  : vendorType === 2 ? { status: "active" }
  : {};

  const {
    data: vendorsData, // Data received from the useGetAllVendorsQuery hook
    isLoading: vendorsIsLoading, // Loading state of the vendors data
    isSuccess: vendorsIsSuccess, // Success state of the vendors data
    error: vendorsError, // Error state of the vendors data
  } = useGetAllVendorsQuery({...queryParameters,...vendorTypeQuery}, { enabled: Object.keys(queryParameters).length > 0 }); 
  // The `enabled` option determines whether the useGetAllVendorsQuery hook should be enabled or disabled based on the presence of query parameters.
  // Invoking the useGetAllVendorsQuery hook with the provided parameters to get latest created first

  const [
    editVendor,
    { data: editData,
      isLoading: editVendorIsLoading,
      isSuccess: editVendorIsSuccess,
      error: editVendorError },
  ] = useEditVendorMutation();


  const [
    createVendor,
    {
      isLoading: createVendorIsLoading,
      isSuccess: createVendorIsSuccess,
      error: createVendorError,
    },
  ] = useCreateVendorMutation();

  const [
    bulkCreateVendor,
    {
      isLoading: bulkCreateVendorIsLoading,
      isSuccess: bulkCreateVendorIsSuccess,
      error: bulkCreateVendorError,
    },
  ] =useBulkCreateVendorMutation();

  const [
    deleteVendor,
    {
      isLoading: deleteVendorIsLoading,
      isSuccess: deleteVendorIsSuccess,
      error: deleteVendorError,
    },
  ] = useDeleteVendorMutation();

  
  const vendorFormik = useFormik({
    initialValues: {
         name: "",
      // description: "",
      status: "active",
      showFilter: true,
    },
    enableReinitialize: true,
    validationSchema: multipleVendors.length > 0 ? multipleVendorsSchema : vendorValidationSchema,
    onSubmit: (values) => {  
      if(multipleVendors.length>0)
      {
        bulkCreateVendor(multipleVendors)
      }
      else
      {
        createVendor(values)
      }
    },
  });


  const toggleCreateModalHandler = () => {
    setShowCreateModal((prevState) => !prevState);
    vendorFormik.resetForm();
    setIsEditing(false);
    setMultipleVendors([]);
    vendorFormik.setFieldTouched('name', false);
    vendorFormik.setFieldError('name', '');

  };

  const ArchiveTagsHandler = (data) => {
    const newStatus = data?.status === "draft" ? "active" : "draft";
    editVendor({
      id: data?._id,
      details: {
        status: newStatus,
        showFilter:true
      },
    });
  };

  const editCategoryPageNavigationHandler = (data) => {
    // Set the flag to indicate that editing is in progress
    setIsEditing(true);
    // Dispatch an action to update the vendor ID
    dispatch(updateVendorId(data._id)); //have to update corresponding vendor id
    // Navigate to the "edit" page
    navigate("edit");
  };

  const changeVendorTypeHandler = (_event, tabIndex) => {
    setVendorType(tabIndex);
  };

  useEffect(() => {
    if (bulkCreateVendorIsSuccess) {
      setShowCreateModal(false);
      dispatch(showSuccess({ message: "Vendors created successfully" }));
    }
  }, [bulkCreateVendorIsSuccess,dispatch])
  

  useEffect(() => {
    if (vendorsError) {
      setError(true);
      if (vendorsError?.data?.message) {
        dispatch(showError({ message: vendorsError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (createVendorError) {
      setError(true);
      if (createVendorError?.data?.message) {
        dispatch(showError({ message: createVendorError.data.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
    if (createVendorIsSuccess) {
      setShowCreateModal(false);
      dispatch(showSuccess({ message: "Vendor created successfully" }));
    }

    if (vendorsIsSuccess) {
      setError(false);
      if (vendorType === 0) {
        setVendorList(vendorsData.data.data);
      }
      if (vendorType === 1) {
        setVendorList(vendorsData.data.data);
      }
      if(vendorType === 2)
      {
        setVendorList(vendorsData.data.data);
      }
    }
  }, [
    vendorsData,
    vendorsIsSuccess,
    vendorsError,
    createVendorIsSuccess,
    createVendorError,
    vendorType,
    dispatch,
  ]);
 // * SORT POPOVERS STARTS HERE
  const [anchorSortEl, setAnchorSortEl] = React.useState(null);

  const handleSortClick = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorSortEl(null);
  };

  const handleSortRadioChange = (event) => {
    setSelectedSortOption(event.target.value);
    setAnchorSortEl(null); // Close the popover after selecting a value
  };
  
  const openSort = Boolean(anchorSortEl);
  const idSort = openSort ? "simple-popover" : undefined;

 // * SORT POPOVERS ENDS

  // * STATUS POPOVERS STARTS HERE
  const [anchorStatusEl, setAnchorStatusEl] = React.useState(null);

  const handleStatusClick = (event) => {
    setAnchorStatusEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorStatusEl(null);
  };

  const handleStatusRadioChange = (event) => {
    setSelectedStatusOption(event.target.value);
    setAnchorStatusEl(null); // Close the popover after selecting a value
  };

  const openStatus = Boolean(anchorStatusEl);
  const idStatus = openSort ? "simple-popover" : undefined;
 // * STATUS POPOVERS ENDS



  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };


  const handleAddMultiple = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      vendorFormik.validateForm().then(() => {
        if (vendorFormik.isValid && vendorFormik.values.name !== '') {
          vendorFormik.setFieldTouched('name', true);
          setMultipleVendors((prevValues) => [
            ...prevValues,
            { name: vendorFormik.values.name, status: 'active', showFilter: vendorFormik.values.showFilter },
          ]);
          vendorFormik.resetForm();
        }
      });
    }
  };

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Vendors</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer
            headingName={"Parameters / Vendors"}
            icon={parameters}
          />
          <ExportDialog dialogName={"Vendors"} />
          <ImportSecondDialog dialogName={"Vendors"} />
          <button
            className="button-gradient py-2 px-4 ms-3 c-pointer"
            onClick={toggleCreateModalHandler}
          >
            <p>+ Add Vendors</p>
          </button>
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
                  <h5 className="text-lightBlue fw-500">
                    {`${isEditing ? "Edit" : "Create"} Vendor`}
                  </h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={toggleCreateModalHandler}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />

            <form noValidate onSubmit={vendorFormik.handleSubmit}>
              <DialogContent className="py-3 px-4">
                <p className="text-lightBlue mb-2">Vendor Name *</p>
                <FormControl className="col-7 px-0">
                  <OutlinedInput
                    placeholder="Enter Vendor Name"
                    size="small"
                    name="name"
                    value={vendorFormik.values.name}
                    onBlur={vendorFormik.handleBlur}
                    onChange={vendorFormik.handleChange}
                    onKeyDown={handleAddMultiple}
                  />
                  {!!vendorFormik.touched.name && vendorFormik.errors.name && (
                    <FormHelperText error>
                      {vendorFormik.errors.name}
                    </FormHelperText>
                  )}
                </FormControl>
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="showFilter"
                      checked={vendorFormik.values.showFilter}
                      onChange={vendorFormik.handleChange}
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
                <div >
                {multipleVendors && multipleVendors.map((value, index) => (
                <Chip
                  key={index}
                  label={value.name}
                  onDelete={() => handleDelete(value.name)}
                  size="small"
                  className="mt-3 me-2 px-1"
                />
              ))}
                </div>
            {/* <br/>
                <p className="text-lightBlue mb-2">Description</p>
                <FormControl className="col-7 px-0">
                  <OutlinedInput
                    placeholder="Enter Description"
                    size="small"
                    value={vendorFormik.values.description}
                    onBlur={vendorFormik.handleBlur}
                    onChange={vendorFormik.handleChange}
                    name="description"
                  />
                  {!!vendorFormik.touched.description &&
                    vendorFormik.errors.description && (
                      <FormHelperText error>
                        {vendorFormik.errors.description}
                      </FormHelperText>
                    )}
                </FormControl> */}

                {/* <div className="d-flex">
                    <Chip
                      label='Hi'
                      size="small"
                      className="mt-3 me-2"
                    ></Chip>
              </div> */}

                {/* <p className="text-lightBlue mb-2 mt-3">Vendor Category</p>
              <FormControl
                //   sx={{ m: 0, minWidth: 120, width: "100%" }}
                size="small"
                className="col-md-7"
              >
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={vendorCategory}
                  onChange={handleVendorCategoryChange}
                  size="small"
                >
                  <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    None
                  </MenuItem>
                  <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    JWL 1
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    FLAGSHIP VENDOR
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    JWL 2
                  </MenuItem>
                  <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
                    JWL 3
                  </MenuItem>
                </Select>
              </FormControl> */}
              </DialogContent>

              <hr className="hr-grey-6 my-0" />

              <DialogActions className="d-flex justify-content-between px-4 py-3">
                <button
                  className="button-grey py-2 px-5"
                  onClick={toggleCreateModalHandler}
                  type="button"
                >
                  <p className="text-lightBlue">Cancel</p>
                </button>
                <LoadingButton
                  loading={createVendorIsLoading}
                  disabled={createVendorIsLoading}
                  className="button-gradient py-2 px-5"
                  type="submit"
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
              value={vendorType}
              onChange={changeVendorTypeHandler}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Draft" className="tabs-head" />
              <Tab label="Active" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch searchValue={searchValue} handleSearchChange={handleSearchChange} />
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
                  value={selectedSortOption}
                  onChange={handleSortRadioChange}
                >
                  <FormControlLabel
                    value="alphabeticalAtoZ"
                    control={<Radio size="small" />}
                    label="Alphabetical (A-Z)"
                  />
                  <FormControlLabel
                    value="alphabeticalZtoA"
                    control={<Radio size="small" />}
                    label="Alphabetical (Z-A)"
                  />
                  <FormControlLabel
                    value="oldestToNewest"
                    control={<Radio size="small" />}
                    label="Oldest to Newest"
                  />
                  <FormControlLabel
                    value="newestToOldest"
                    control={<Radio size="small" />}
                    label="Newest to Oldest"
                  />
                </RadioGroup>
              </FormControl>
              </Popover>
              <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idStatus}
                variant="contained"
                onClick={handleStatusClick}
              >
                <small className="text-lightBlue me-2">Status</small>
                {/* <img src={sort} alt="sort" className="" /> */}
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
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={selectedStatusOption}
                    onChange={handleStatusRadioChange}
                  >
                    <FormControlLabel
                      value="active"
                      control={<Radio size="small" />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="archived"
                      control={<Radio size="small" />}
                      label="Archive"
                    />
                  </RadioGroup>
                </FormControl>
              </Popover>
          </div>
          <TabPanel value={vendorType} index={0}>
            <VendorsTable
              isLoading={vendorsIsLoading}
              deleteData={ArchiveTagsHandler}
              error={error}
              list={vendorList}
              edit={editCategoryPageNavigationHandler}
            />
          </TabPanel>
          <TabPanel value={vendorType} index={1}>
            <VendorsTable
              isLoading={vendorsIsLoading}
              deleteData={ArchiveTagsHandler}
              error={error}
              list={vendorList}
              edit={editCategoryPageNavigationHandler}
            />
          </TabPanel>
          <TabPanel value={vendorType} index={2}>
            <VendorsTable
              isLoading={vendorsIsLoading}
              deleteData={ArchiveTagsHandler}
              error={error}
              list={vendorList}
              edit={editCategoryPageNavigationHandler}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Vendors;
