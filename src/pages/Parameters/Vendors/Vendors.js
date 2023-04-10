import React from "react";
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
} from "@mui/material";
import { callGetApi, createVendor, updateVendor } from "../services/parameter.service";
// ! MATERIAL ICONS IMPORTS

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

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

  // ? VENDOR CATEGORY SELECT STARTS HERE
  const [vendorCategory, setVendorCategory] = React.useState("");

  const handleVendorCategoryChange = (event) => {
    setVendorCategory(event.target.value);
  };
  // ? VENDOR CATEGORY SELECT ENDS HERE


  //aman
  let [message, setMessage] = React.useState('');
  const [allvendors, setallvendors] = React.useState([]);
  const [allvendorsArchived, setallallvendorsArchived] = React.useState([]);

  const [vendorsName, setvendorsName] = React.useState('');
  const [editData, seteditData] = React.useState('');

  React.useEffect(()=>{
    getvendor();
  },[])


  let getvendor=()=>{
    callGetApi('/api/product-vendors','GET').then((res) => {
      setallvendors(res.data.filter(data=>data.attributes.status==='Active'))
      setallallvendorsArchived(res.data.filter(data=>data.attributes.status!=='Active'))

     })
   .catch((err) => {
     setMessage(err);
   });
   }

   let edit=(data)=>{

   }

   let deleteData=(data)=>{

    seteditData(data)
    setvendorsName(data.attributes.name)
    createupdatevendor('Draft')

  }

  let createupdatevendor=(status)=>{
    if (!vendorsName) {
      setMessage('Please enter vendorsName field');
      return;
    }

    let request = {
      data: {
        name: vendorsName,
        status
      },
    };

    if(!editData){
      createVendor(request)
      .then((res) => {
        responseHandled(res)
      })
      .catch((err) => {
        setMessage(err);
      });
    }else{
      updateVendor(request,editData.id)
      .then((res) => {
        responseHandled(res)
      })
      .catch((err) => {
        setMessage(err);
      });
    }

  }
 

  let responseHandled=(res)=>{
    if (res?.error?.message) {
      setMessage(res?.error?.message);
      return;
    }
    resetdata()
    getvendor()
    handleAddVendorsClose()
  }

  let resetdata=()=>{
    setvendorsName('')
    seteditData('')
  }

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
                  <h5 className="text-lightBlue fw-500">Create Vendors</h5>

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
            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">Vendor Name</p>
              <FormControl className="col-7 px-0">
                <OutlinedInput 
                  value={vendorsName}
                  onChange={(e) => setvendorsName(e.target.value)}
                placeholder="Enter Vendor Name" size="small" />
              </FormControl>

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
                onClick={e=>{
                  createupdatevendor('Active')
                }}
              >
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
              value={value}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Archived" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch />
          </div>
          <TabPanel value={value} index={0}>
            <VendorsTable list={allvendors}  edit={edit} deleteData={deleteData} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <VendorsTable list={allvendorsArchived}/>
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
};

export default Vendors;
