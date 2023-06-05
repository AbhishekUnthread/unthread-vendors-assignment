import React, { useEffect } from "react";
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
  FormHelperText
} from "@mui/material";
import {
  callGetApi,
  createVendor,
  updateVendor,
} from "../services/parameter.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch ,useSelector} from "react-redux";
import {addVendors} from '../../../features/vendors/vendorSlice'
import { getVendors } from "../../../features/vendors/vendorSlice";

// ! MATERIAL ICONS IMPORTS

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const vendorScehma = Yup.object({
  name: Yup.string().required("required"),
  description: Yup.string().required("required"),
  status: Yup.string(),
});

const Vendors = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ? VENDORS DIALOG STARTS HERE
  const [openAddVendors, setOpenAddVendors] = React.useState(false);

  const handleAddVendors = () => {
    setOpenAddVendors(true);
  };

  const handleAddVendorsClose = () => {
    setOpenAddVendors(false);
  };
  // ? VENDORS DIALOG ENDS HERE

  

  //aman

  const dispatch=useDispatch()
  dispatch(addVendors(['aman']))
  const allVendors=useSelector(getVendors)
 

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status:'active'
    },
    enableReinitialize: true,
    validationSchema: vendorScehma,
    onSubmit:(values)=>{
      console.log(values)
    }
  })


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
            onClick={handleAddVendors}
          >
            <p>+ Add Vendors</p>
          </button>

          <Dialog
            open={openAddVendors}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleAddVendorsClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">
                    Vendors
                  </h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain 
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleAddVendorsClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />

            <form noValidate onSubmit={formik.handleSubmit}>

          
            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">Vendor Name</p>
              <FormControl className="col-7 px-0">
                <OutlinedInput
                
                  placeholder="Enter Vendor Name"
                  size="small"
                  name="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                 { formik.errors.name && (
                  <FormHelperText error>
                    {formik.errors.name}
                  </FormHelperText>
                )}
              </FormControl>

              <p className="text-lightBlue mb-2">Description</p>
              <FormControl className="col-7 px-0">
                <OutlinedInput
                
                  placeholder="Enter Description"
                  size="small"
                  value={formik.values.description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="description"
                />
                 { formik.errors.description && (
                  <FormHelperText error>
                    {formik.errors.description}
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
                onClick={handleAddVendorsClose}
              >
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button
                className="button-gradient py-2 px-5"
                type="submit"

              >
                <p>Save</p>
              </button>
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
              value={value}
              onChange={handleChange}
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
          <TabPanel value={value} index={0}>
            {/* <VendorsTable
             
            /> */}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <VendorsTable /> */}
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Vendors;
