import { forwardRef, useState, useEffect, useReducer } from "react";
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
  useEditVendorMutation,
} from "../../../features/parameters/vendors/vendorsApiSlice";

// ! MATERIAL ICONS IMPORTS

// ? DIALOG TRANSITION STARTS HERE
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const vendorValidationSchema = Yup.object({
  name: Yup.string().trim().min(3).required("required"),
  description: Yup.string().trim().min(3).required(),
  status: Yup.mixed().oneOf(["active", "inactive"]).optional(),
});

const Vendors = () => {
  const dispatch = useDispatch();
  const [vendorType, setVendorType] = useState(0);
  const [vendorList, setVendorList] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const {
    data: vendorsData,
    isLoading: vendorsIsLoading,
    isSuccess: vendorsIsSuccess,
    error: vendorsError,
  } = useGetAllVendorsQuery();

  const [
    createVendor,
    {
      isLoading: createVendorIsLoading,
      isSuccess: createVendorIsSuccess,
      error: createVendorError,
    },
  ] = useCreateVendorMutation();
  const [
    deleteVendor,
    {
      isLoading: deleteVendorIsLoading,
      isSuccess: deleteVendorIsSuccess,
      error: deleteVendorError,
    },
  ] = useDeleteVendorMutation();
  const [
    editVendor,
    {
      isLoading: editVendorIsLoading,
      isSuccess: editVendorIsSuccess,
      error: editVendorError,
    },
  ] = useEditVendorMutation();

  const vendorFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: "active",
    },
    enableReinitialize: true,
    validationSchema: vendorValidationSchema,
    onSubmit: (values) => {
      if (isEditing) {
        editVendor({ id: editId, details: values })
          .unwrap()
          .then(() => vendorFormik.resetForm());
      } else {
        createVendor(values)
          .unwrap()
          .then(() => vendorFormik.resetForm());
      }
    },
  });

  const toggleCreateModalHandler = () => {
    setShowCreateModal((prevState) => !prevState);
    vendorFormik.resetForm();
    setIsEditing(false);
    setEditId(null);
  };

  const deleteVendorHandler = (data) => {
    deleteVendor(data._id);
  };

  const editCategoryHandler = (data) => {
    setIsEditing(true);
    setEditId(data._id);
    setShowCreateModal((prevState) => !prevState);
    vendorFormik.setFieldValue("name", data.name);
    vendorFormik.setFieldValue("description", data.description);
  };

  const changeVendorTypeHandler = (event, tabIndex) => {
    setVendorType(tabIndex);
  };

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
    if (createVendorIsSuccess || editVendorIsSuccess) {
      setShowCreateModal(false);
    }
    if (vendorsIsSuccess) {
      setError(false);
      if (vendorType === 0) {
        setVendorList(vendorsData.data.data);
      }
      if (vendorType === 1) {
        setVendorList(vendorsData.data.data);
      }
    }
  }, [
    vendorsData,
    vendorsIsSuccess,
    vendorsError,
    createVendorIsSuccess,
    createVendorError,
    editVendorIsSuccess,
    vendorType,
    dispatch,
  ]);

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
                <p className="text-lightBlue mb-2">Vendor Name</p>
                <FormControl className="col-7 px-0">
                  <OutlinedInput
                    placeholder="Enter Vendor Name"
                    size="small"
                    name="name"
                    value={vendorFormik.values.name}
                    onBlur={vendorFormik.handleBlur}
                    onChange={vendorFormik.handleChange}
                  />
                  {!!vendorFormik.touched.name && vendorFormik.errors.name && (
                    <FormHelperText error>
                      {vendorFormik.errors.name}
                    </FormHelperText>
                  )}
                </FormControl>

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
                </FormControl>

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
                  loading={createVendorIsLoading || editVendorIsLoading}
                  disabled={createVendorIsLoading || editVendorIsLoading}
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
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          <TabPanel value={vendorType} index={0}>
            <VendorsTable
              isLoading={vendorsIsLoading}
              deleteData={deleteVendorHandler}
              error={error}
              list={vendorList}
              edit={editCategoryHandler}
            />
          </TabPanel>
          <TabPanel value={vendorType} index={1}>
            <VendorsTable
              isLoading={vendorsIsLoading}
              deleteData={deleteVendorHandler}
              error={error}
              list={vendorList}
              edit={editCategoryHandler}
            />
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Vendors;
