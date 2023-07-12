import React, { forwardRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// ! COMPONENT IMPORTS
import TabPanel from "../../../components/TabPanel/TabPanel";
import VendorsTable from "./VendorsTable";
import ViewTutorial from "../../../components/ViewTutorial/ViewTutorial";
import ViewLogsDrawer from "../../../components/ViewLogsDrawer/ViewLogsDrawer";
import ExportDialog from "../../../components/ExportDialog/ExportDialog";
import ImportSecondDialog from "../../../components/ImportSecondDialog/ImportSecondDialog";
import TableSearch from "../../../components/TableSearch/TableSearch";
import { updateVendorId } from "../../../features/parameters/vendors/vendorSlice";
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
  useBulkDeleteVendorMutation,
  useBulkEditVendorMutation,
} from "../../../features/parameters/vendors/vendorsApiSlice";
import "../../Products/AllProducts/AllProducts.scss";
// ! ASSETS IMPORTS
import cancel from "../../../assets/icons/cancel.svg";
import parameters from "../../../assets/icons/sidenav/parameters.svg";
import sort from "../../../assets/icons/sort.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg"
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
  Autocomplete,
  FormGroup,
  InputAdornment,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
// ! MATERIAL ICONS IMPORTS
import { LoadingButton } from "@mui/lab";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
  const [selectedSortOption, setSelectedSortOption] = React.useState("newestToOldest");
  const [selectedStatusOption, setSelectedStatusOption] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [multipleVendors,setMultipleVendors] = React.useState([]);
  const [totalCount,setTotalCount] = React.useState([]);

  const vendorValidationSchema = Yup.object({
    name: Yup.string().trim().min(3).required("Required"),
});
  const multipleVendorsSchema = Yup.object({
  name: Yup.string().trim().min(3,"Name must be at least 3 characters long"),
  });

  const queryParameters = {
  };
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
  
  if (selectedStatusOption !== null) {
    if (Array.isArray(selectedStatusOption)) {
      queryParameters.status = selectedStatusOption.join(',');
    } else {
      queryParameters.status = selectedStatusOption;
    }
  }
  if(searchValue)
  {
    queryParameters.name = searchValue;
  }
  if (!selectedSortOption && selectedStatusOption === null && !searchValue) {
    queryParameters.status = "active";
    queryParameters.status = "in-active"
  }
  
  const vendorTypeQuery =
    vendorType === 0
      ? selectedStatusOption.length>0
        ? { status: selectedStatusOption }
        : { status: "[active,in-active]" }
      : vendorType === 1
      ? { status: "active" }
      : vendorType === 2
      ? { status: "in-active" }
      : vendorType === 3
      ? { status: "archieved" }
      : {};
  
    const {
      data: vendorsData, 
      isLoading: vendorsIsLoading, 
      isSuccess: vendorsIsSuccess, 
      error: vendorsError, 
    } = useGetAllVendorsQuery({...queryParameters,...vendorTypeQuery}, { enabled: Object.keys(queryParameters).length > 0 }); 
    // The `enabled` option determines whether the useGetAllVendorsQuery hook should be enabled or disabled based on the presence of query parameters.
    // Invoking the useGetAllVendorsQuery hook with the provided parameters to get latest created first
  
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
  
    const [
      bulkDeleteVendor,
      {
        isLoading: bulkDeleteVendorIsLoading,
        isSuccess: bulkDeleteVendorIsSuccess,
        error: bulkDeleteVendorError,
      },
    ] = useBulkDeleteVendorMutation();

    const [
      editVendor,
      { data: editData,
        isLoading: editVendorIsLoading,
        isSuccess: editVendorIsSuccess,
        error: editVendorError },
    ] = useEditVendorMutation();
  
    const[bulkEdit,
    {
      data: bulkEditVendor,
      isLoading: bulkVendorEditLoading,
      isSuccess: bulkVendorEditIsSuccess,
      error: bulkVendorEditError,
    }]=useBulkEditVendorMutation();


    const vendorFormik = useFormik({
      initialValues: {
        name: "",
        status: "active",
        showFilter: false,
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
          createVendor(values.name.trim(),values.status,values.showFilter)
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

    const editCategoryPageNavigationHandler = (data) => {
      setIsEditing(true);
      dispatch(updateVendorId(data._id)); 
      navigate("edit");
    };

    const changeVendorTypeHandler = (_event, tabIndex) => {
      setVendorType(tabIndex);
    };

    const handleAddMultiple = (event) => {
      if (event.key === 'Enter'||event.type === 'click') {
        event.preventDefault();
        vendorFormik.validateForm().then(() => {
          if (vendorFormik.isValid && vendorFormik.values.name.trim() !== '') {
            vendorFormik.setFieldTouched('name', true);
  
            const vendorExists = multipleVendors.some(
              (vendor) => vendor.name.toLowerCase().trim() === vendorFormik.values.name.toLowerCase().trim()
            );
  
            if (!vendorExists) {
              setMultipleVendors((prevValues) => [
                ...prevValues,
                { name: vendorFormik.values.name.trim(), status: 'active', showFilter: vendorFormik.values.showFilter },
              ]);
              vendorFormik.resetForm();
            }
            else{
              dispatch(
                showError({ message: "Duplicate Name Value" })
              );
            }
          }
          
        });
      }
    };

    const handleDelete = (value) => {
    setMultipleVendors((prevValues) => prevValues.filter((v) => v.name !== value));
    };

  const handleDeleteVendor =(data)=>{
    deleteVendor(data);
    }

  const handleBulkDeleteVendor =(data)=>{
    bulkDeleteVendor(data);
    }

  const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
    };

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

  const handleStatusCheckboxChange = (event) => {
    const { value } = event.target;
  
    setSelectedStatusOption((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((option) => option !== value);
      } else {
        return [...prevSelected, value];
      }
    });
    setAnchorStatusEl(null); 
  };
  
  const openStatus = Boolean(anchorStatusEl);
  const idStatus = openStatus ? "simple-popover" : undefined;
 // * STATUS POPOVERS ENDS


    useEffect(() => {
    if(createVendorIsSuccess)
    {
      setShowCreateModal(false);
      dispatch(showSuccess({ message: "Vendor created successfully" }));
    }
    if(createVendorError)
    {
      setError(true);
      if (createVendorError?.data?.message) {
        dispatch(showError({ message: createVendorError?.data?.message }));
      }
      else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }

  }, [createVendorIsSuccess,createVendorError])
  
    useEffect(() => {

    if(bulkCreateVendorIsSuccess)
    {
        setShowCreateModal(false);
      dispatch(showSuccess({ message: "Vendors created successfully" }));
    }

    if (bulkCreateVendorError ) {
      setError(true);
      if(bulkCreateVendorError?.data?.message)
      {
        dispatch(showError({ message: bulkCreateVendorError.data.message }));
      }
      else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }
  }, [bulkCreateVendorError,bulkCreateVendorIsSuccess])

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
    if (vendorsIsSuccess) {
      setError(false);
      if (vendorType === 0) {
        setVendorList(vendorsData.data.data);
        setTotalCount(vendorsData.data.totalCount)
      }
      if (vendorType === 1) {
        setVendorList(vendorsData.data.data);
        setTotalCount(vendorsData.data.totalCount)
      }
      if(vendorType === 2)
      {
        setVendorList(vendorsData.data.data);
        setTotalCount(vendorsData.data.totalCount)
      }
      if(vendorType === 3)
      {
        setVendorList(vendorsData.data.data);
        setTotalCount(vendorsData.data.totalCount)
      }
    }
      }, [
        vendorsData,
        vendorsIsSuccess,
        vendorType,
        vendorsError,
        createVendorIsSuccess,bulkCreateVendorIsSuccess,createVendorError,bulkCreateVendorError,editVendorIsSuccess,bulkVendorEditIsSuccess,editVendorError,bulkVendorEditError
      ]);

    useEffect(() => {
      if(deleteVendorIsSuccess)
      {
        dispatch(showSuccess({ message: "Vendor deleted successfully" }));
      }
      if(deleteVendorError)
      {
        if (deleteVendorError?.data?.message) {
          dispatch(showError({ message: deleteVendorError?.data?.message }));
        }
        else {
          dispatch(
            showError({ message: "Something went wrong!, please try again" })
          );
        }
      }
    }, [deleteVendorIsSuccess,deleteVendorError])

    useEffect(() => {

      if(bulkDeleteVendorIsSuccess)
      {
        dispatch(showSuccess({ message: "Vendors deleted successfully" }));
      }
      if(bulkDeleteVendorError)
      {
        if (bulkDeleteVendorError?.data?.message) {
          dispatch(showError({ message: bulkDeleteVendorError?.data?.message }));
        }
        else {
          dispatch(
            showError({ message: "Something went wrong!, please try again" })
          );
        }
      }
    }, [bulkDeleteVendorIsSuccess,bulkDeleteVendorError])

    useEffect(() => {
      if(editVendorIsSuccess)
      {
        dispatch(showSuccess({ message: "Status updated successfully" }));
      }
      if(editVendorError)
      {
        if (editVendorError?.data?.message) {
          dispatch(showError({ message: editVendorError?.data?.message }));
        }
        else {
          dispatch(
            showError({ message: "Something went wrong!, please try again" })
          );
        }
      }
    }, [editVendorIsSuccess,editVendorError])

    useEffect(() => {
      if(bulkVendorEditIsSuccess)
      {
        dispatch(showSuccess({ message: "Status updated successfully" }));
      }
      if(bulkVendorEditError)
      {
        if (bulkVendorEditError?.data?.message) {
          dispatch(showError({ message: bulkVendorEditError?.data?.message }));
        }
        else {
          dispatch(
            showError({ message: "Something went wrong!, please try again" })
          );
        }
      }
    }, [bulkVendorEditIsSuccess,bulkVendorEditError])
    

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
                    sx={{pr:1}}
                    placeholder="Enter Vendor Name"
                    size="small"
                    name="name"
                    value={vendorFormik.values.name}
                    onBlur={vendorFormik.handleBlur}
                    onChange={vendorFormik.handleChange}
                    onKeyDown={handleAddMultiple}
                    endAdornment={
                    <InputAdornment position="end">
                        <ChevronRightIcon className="c-pointer" onClick={handleAddMultiple}/>
                    </InputAdornment>
                    }
                  />
                  {!!vendorFormik.touched.name && vendorFormik.errors.name && (
                    <FormHelperText error color="#F67476">
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
                  <p>Create</p>
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
              <Tab label="Active" className="tabs-head" />
              <Tab label="In-Active" className="tabs-head" />
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch searchValue={searchValue} handleSearchChange={handleSearchChange} />
            <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idStatus}
                variant="contained"
                onClick={handleStatusClick}
              >
                <small className="text-lightBlue me-2">Status</small>
                <img src={arrowDown} alt="status" className="" />
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
                <FormGroup className="px-2 py-1"                   
                  onChange={handleStatusCheckboxChange}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Active"
                    value="active"
                    className="me-0"
                    // checked={selectedStatusOption === "active"}
                    checked={selectedStatusOption.includes("active")}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="In-Active"
                    className="me-0"
                    value="in-active"
                    // checked={selectedStatusOption === "archived"}
                    checked={selectedStatusOption.includes("in-active")}
                  />
                </FormGroup>
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
                  value={selectedSortOption}
                  onChange={handleSortRadioChange}
                >
                  <FormControlLabel
                    value="newestToOldest"
                    control={<Radio size="small" />}
                    label="Newest to Oldest"
                  />
                  <FormControlLabel
                    value="oldestToNewest"
                    control={<Radio size="small" />}
                    label="Oldest to Newest"
                  />
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

                </RadioGroup>
              </FormControl>
              </Popover>
              {/* <button
                className="button-grey py-2 px-3 ms-2"
                aria-describedby={idStatus}
                variant="contained"
                onClick={handleStatusClick}
              >
                <small className="text-lightBlue me-2">Status</small>
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
              </Popover> */}

              {/* <button
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
                anchorEl={anchorSortE1}
                onClose={handleSortClose}
                className="columns"
              >
                <FormGroup className="px-2 py-1"                   
                  onChange={handleSortCheckboxChange}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Alphabetical (A-Z)"
                    value="alphabeticalAtoZ"
                    className="me-0"
                    checked={selectedSortOption === "alphabeticalAtoZ"}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Alphabetical (Z-A)"
                    className="me-0"
                    value="alphabeticalZtoA"
                    checked={selectedSortOption === "alphabeticalZtoA"}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Oldest to Newest"
                    className="me-0"
                    value="oldestToNewest"
                    checked={selectedSortOption === "oldestToNewest"}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        style={{
                          color: "#5C6D8E",
                        }}
                      />
                    }
                    label="Newest to Oldest"
                    className="me-0"
                    value="newestToOldest"
                    checked={selectedSortOption === "newestToOldest"}
                  />
                </FormGroup>
              </Popover> */}


          </div>
          <TabPanel value={vendorType} index={0}>
            <VendorsTable
              isLoading={vendorsIsLoading}
              error={error}
              list={vendorList}
              edit={editCategoryPageNavigationHandler}
              totalCount={totalCount}
              deleteData={handleDeleteVendor}
              editVendor={editVendor}
              bulkEdit ={bulkEdit}
            />
          </TabPanel>
          <TabPanel value={vendorType} index={1}>
            <VendorsTable
              isLoading={vendorsIsLoading}
              error={error}
              list={vendorList}
              edit={editCategoryPageNavigationHandler}
              totalCount={totalCount}
              editVendor={editVendor}
              bulkEdit ={bulkEdit}

            />
          </TabPanel>
          <TabPanel value={vendorType} index={2}>
            <VendorsTable
              isLoading={vendorsIsLoading}
              error={error}
              list={vendorList}
              edit={editCategoryPageNavigationHandler}
              totalCount={totalCount}
              editVendor={editVendor}
              bulkEdit ={bulkEdit}
            />
          </TabPanel>
          <TabPanel value={vendorType} index={3}>
            <VendorsTable
              isLoading={vendorsIsLoading}
              error={error}
              list={vendorList}
              edit={editCategoryPageNavigationHandler}
              totalCount={totalCount}
              deleteData={handleDeleteVendor}
              bulkDelete={handleBulkDeleteVendor}
              vendorType={vendorType}
              editVendor={editVendor}
              bulkEdit ={bulkEdit}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Vendors;
