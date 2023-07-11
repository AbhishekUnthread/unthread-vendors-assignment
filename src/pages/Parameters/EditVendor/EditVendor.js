import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./EditVendor.scss";
// ! COMPONENT IMPORTS
import NotesBox from "../../../components/NotesBox/NotesBox";
import StatusBox from "../../../components/StatusBox/StatusBox";
import AddProducts from "../../../components/AddProducts/AddProducts";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import cancel from "../../../assets/icons/cancel.svg";

// ! MATERIAL IMPORTS
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, OutlinedInput, Slide, Tooltip, Typography } from "@mui/material";

import {
  useGetAllVendorsQuery,
  useEditVendorMutation,
  useCreateVendorMutation,
} from "../../../features/parameters/vendors/vendorsApiSlice";
import { updateVendorId } from "../../../features/parameters/vendors/vendorSlice";
import { useGetAllProductsQuery } from "../../../features/products/product/productApiSlice";
import { showError, showSuccess } from "../../../features/snackbar/snackbarAction";
import SaveFooter, { SaveFooterSecondary } from "../../../components/SaveFooter/SaveFooter";
import * as Yup from 'yup';

    // ? DIALOG TRANSITION STARTS HERE
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    // ? DIALOG TRANSITION ENDS HERE

    const validationSchema = Yup.object().shape({
      vendorName: Yup.string().max(50, 'Name cannot exceed 50 characters').required('Name is required'),
    });


const EditVendor = () => {

  const navigate= useNavigate();
  const dispatch = useDispatch();
  const [vendorName, setVendorName] = useState("")
  const [vendorNotes, setVendorNotes] = useState("")
  const [vendorStatus, setVendorStatus] = useState("active")
  const [vendorFlagShip, setVendorFlagShip] = useState("")
  const [checked, setChecked] = React.useState(false);
  const vendorId = useSelector((state)=>state.vendor.vendorId)
  const [products,setProducts] = React.useState([])
  const [vendorDuplicateName, setVendorDuplicateName] = useState("");
  const [duplicateDescription, setDuplicateDescription] = useState(false);
  const [duplicateFilter, setDuplicateFilter] = useState(false);
  const [index, setIndex] = useState(null);
  const [vendorIndex, setVendorIndex] = useState();
  const [hideFooter, setHideFooter] = useState(false);
  const [vendorNameError, setVendorNameError] = useState('');

  const [initialName, setInitailName] = useState("");
  const [initialNotes, setInitailNotes] = useState("");
  const [initialStatus, setInitailStatus] = useState("active");
  const [initialFilter, setInitailFilter] = useState(false);

  
  const {
    data : vendorProductsData,
    isLoading:vendorProductsDataIsLoading,
    isSuccess:vendorProductsDataIsSuccess,
    error:vendorProductsDataErro
  }= useGetAllProductsQuery({id:vendorId});

  const [
    createVendor,
    {
      isLoading: createVendorIsLoading,
      isSuccess: createVendorIsSuccess,
      error: createVendorError,
    },
  ] = useCreateVendorMutation();

  const {
    data: vendorsData,
    isLoading: vendorsIsLoading,
    isSuccess: vendorsIsSuccess,
    error: vendorsError,
  } = useGetAllVendorsQuery({ createdAt:"-1",id:vendorId });

  const [
    editVendor,
    { data: editData,
      isLoading: editVendorIsLoading,
      isSuccess: editVendorIsSuccess,
      error: editVendorError },
  ] = useEditVendorMutation();
  
  useEffect(() => {
    if(editVendorIsSuccess)
    {
      dispatch(showSuccess({ message: "Vendor updated successfully" }));
    }

    if(editVendorError)
    {
      if (editVendorError?.data?.message) {
        dispatch(showError({ message: editVendorError?.data?.message }));
      } else {
        dispatch(
          showError({ message: "Something went wrong!, please try again" })
        );
      }
    }

    if(vendorProductsDataIsSuccess)
    {
      setProducts(vendorProductsData)
    }

    if (vendorsIsSuccess && vendorId !== "") {
      // If vendorsIsSuccess is true, set the vendor name based on the data from the API response

      // setIndex(vendorsData.data.data.findIndex(vendor => vendor._id === vendorId));
      // const vendor = vendorsData.data.data[index];
      // setVendorName(vendor?.name);
      // setVendorFlagShip(vendor?.isFlagShip);
      // setVendorNotes(vendor?.notes);
      // setVendorStatus(vendor?.status);
      // setChecked(vendor?.showFilter);
      setVendorName(vendorsData.data.data[0].name);
      setInitailName(vendorsData.data.data[0].name)
      setVendorFlagShip(vendorsData.data.data[0].isFlagShip)
      setVendorNotes(vendorsData.data.data[0].notes)
      setInitailNotes(vendorsData.data.data[0].notes)
      setVendorStatus(vendorsData.data.data[0].status)
      setInitailStatus(vendorsData.data.data[0].status)
      setChecked(vendorsData.data.data[0].showFilter)
      setInitailFilter(vendorsData.data.data[0].showFilter)
    }
  }, [vendorsIsSuccess,vendorProductsDataIsSuccess,vendorProductsData,vendorId,index,editVendorIsSuccess,editVendorError]);

  const getNextVendorId = () => {
    setVendorIndex(prevIndex => (prevIndex + 1) % vendorsData.data.data.length);
    setIndex(vendorIndex)
  };

  const getPreviousVendorId = () => {
    setVendorIndex(prevIndex => (prevIndex === 0 ? vendorsData.data.data.length - 1 : prevIndex - 1));
    setIndex(vendorsData.data.data[vendorIndex])
  };
  
    const vendorNotesChange=(event)=>{
      setVendorNotes(event.target.value);
      // setHideFooter(true);
    }
    const vendorStatusChange=(event,vendorStatus)=>{
      setVendorStatus(vendorStatus);
      // setHideFooter(true);
    }   

    // const handleNameChange = (event) => {
    //   setVendorName(event.target.value); // Updating the vendor name based on the input value
    //   setHideFooter(true);
    // };
    const handleNameChange = (event) => {
      const newName = event.target.value;
      // setHideFooter(true);
      validationSchema
        .validate({ vendorName: newName })
        .then(() => {
          setVendorName(newName);
          setVendorNameError('');
        })
        .catch((error) => {
          setVendorName(newName);
          setVendorNameError(error.message);
        });
    };

    const handleFilterChange=(event)=>{
      setChecked(event.target.checked);
      // setHideFooter(true);
    }
    const handleSubmit = () => {
      if (!vendorNameError) {
     if(vendorId !== "")
     {
       // Calling Vendor edit API
       editVendor({
        id: vendorId, // ID of the vendor
        details: {
          isFlagShip: vendorFlagShip, // Flagship status of the vendor
          showFilter: checked?checked:false, // Whether to show filters
          name: vendorName.trim(), // Vendor name
          notes: vendorNotes?vendorNotes.trim():vendorNotes, // Vendor description
          status: vendorStatus?vendorStatus:"active" // Vendor status
        }
      }).unwrap().then(() => {
        navigate("/parameters/vendors"); // Navigating to vendors page after successful edit
      })
      .catch((editVendorError)=>dispatch(showError( { message: editVendorError?.data?.message } )));
     }
     else
     {
      createVendor({
        showFilter: checked, // Whether to show filters
        name: vendorName.trim(), // Vendor name
        notes: vendorNotes?vendorNotes.trim():vendorNotes, // Vendor description
        status: vendorStatus?vendorStatus:"active" // Vendor status
      }).unwrap().then(() => {
        navigate("/parameters/vendors"); // Navigating to vendors page after successful creation
      });
     }
    }};

    const backHandler = () => {
      navigate("/parameters/vendors");
    };
    
    const handleSubmitAndAddAnother = () => {
      if(vendorId !== "")
      {
        // Calling Vendor edit API
        editVendor({
          id: vendorId, // ID of the vendor
          details: {
            isFlagShip: vendorFlagShip, // Flagship status of the vendor
            showFilter: checked, // Whether to show filters
            name: vendorName, // Vendor name
            notes: vendorNotes, // Vendor description
            status: vendorStatus?vendorStatus:"active" // Vendor status
          }
        }).unwrap().then(() => {
          navigate("/parameters/vendors/edit"); // Navigating to edit page after successful edit     
          
        });
      }
      else{
        createVendor({
          showFilter: checked, // Whether to show filters
          name: vendorName, // Vendor name
          notes: vendorNotes, // Vendor description
          status: vendorStatus?vendorStatus:"active" // Vendor status
        }).unwrap().then(() => {
          navigate("/parameters/vendors/edit"); // Navigating to vendors page after successful creation
        });
      }
     
      setVendorName(''); 
      dispatch(updateVendorId(""));
    };


    const handleNextItem = ()=>{
      getNextVendorId();
      
    }


   // ? DUPLICATE VENDOR DIALOG STARTS HERE

    const [openDuplicateVendor, setOpenDuplicateVendor] = React.useState(false);

    const handleDuplicate = () => {
      setOpenDuplicateVendor(true);
    };
  
    const handleDuplicateVendorClose = () => {
      setOpenDuplicateVendor(false);
    };
  
    const handleDuplicateNameChange = (event) => {
      setVendorDuplicateName(event.target.value);
    };
  
    const scheduleDuplicateVendor = () => {
      const VendorData = {
        name: vendorDuplicateName,
        showFilter:checked ? checked : true ,
        status: vendorStatus ? vendorStatus : "active",
      };
  
      if (duplicateDescription === true) {
        VendorData.notes = vendorNotes;
      }
      if(duplicateFilter === true)
      {
        VendorData.showFilter = checked;
      }
  
      createVendor(VendorData)
        .unwrap()
        .then(() => {
          setOpenDuplicateVendor(false);
        });
    };
    // ? DUPLICATE VENDOR DIALOG ENDS HERE

    useEffect(() => {
      setHideFooter(
        vendorName.trim() !== initialName ||
        (vendorNotes !== initialNotes && vendorNotes !== "") ||
        vendorStatus !== initialStatus ||
        checked !== initialFilter
      );
    }, [vendorName, vendorNotes, vendorStatus, checked]);
    
  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/parameters/vendors" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>
          <h5 className="page-heading ms-2 ps-1">{vendorName}</h5>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3" onClick={handleDuplicate}>
            <p className="text-lightBlue">Duplicate</p>
          </button>
          {/* <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Preview</p>
          </button> */}
          <img
            src={paginationLeft}
            alt="paginationLeft"
            className="c-pointer"
            width={30}
          />
          <img
            src={paginationRight}
            alt="paginationRight"
            className="c-pointer"
            width={30}
            onClick={handleNextItem}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="col-md-12 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Name</p>
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
                <OutlinedInput placeholder={vendorName} value={vendorName} onChange={handleNameChange}size="small" />
              </FormControl>
              {vendorNameError &&
              <>
              <Typography variant="caption" color="#F67476">
              {vendorNameError}
              </Typography>
              <br />
              </>
              }
              <FormControlLabel
                        control={
                          <Checkbox
                            name="showFilter"
                            checked={checked}
                            onChange={handleFilterChange}
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
            </div>
          </div>

          <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mt-4">
            <div className="d-flex justify-content-between mb-2 px-0">
              <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
                Add Products
              </h6>
            </div>
            <AddProducts 
            isLoading={vendorProductsDataIsLoading}
            list={products}
            />
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <StatusBox   
           headingName={"Status"}
           value={vendorStatus}
           handleProductStatus={vendorStatusChange}
          //  handleSchedule={handleSchedule}
           toggleData={['active','in-active']}
            />
          <NotesBox name="note" value={vendorNotes} onChange={vendorNotesChange} />
        </div>
      </div>
      

      <SaveFooterSecondary
          show={hideFooter}
          onDiscard={backHandler}
          isLoading={editVendorIsLoading}
          handleSubmit={handleSubmit}
        />


        {/* { hideFooter && <div className="row create-buttons pt-5 justify-content-between " style={{ width: '104%' }}>
          <SaveFooter handleSubmit={handleSubmit} />          
        </div>
           } */}

      <Dialog
        open={openDuplicateVendor}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDuplicateVendorClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-lightBlue fw-500">Duplicate Vendor</h5>
            <img
              src={cancel}
              alt="cancel"
              width={30}
              onClick={handleDuplicateVendorClose}
              className="c-pointer"
            />
          </div>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
                src={info}
                alt="info"
                className=" c-pointer"
                width={13.5}
            />
          </Tooltip>
          <small className="mt-1 text-grey-6 font1">
            These banner will be see no PLP page as promotional banner
          </small>
        </DialogTitle>
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-3 px-4 schedule-product">
          <div className="d-flex mb-1">
            <p className="text-lightBlue me-2">Vendor Name*</p>
          </div>
          <FormControl className="w-100 px-0">
            <OutlinedInput
              placeholder="Mirosa Collection_copy"
              size="small"
              name="title"
              value={vendorDuplicateName}
              onChange={handleDuplicateNameChange}
            />
          </FormControl>
          <hr className="hr-grey-6 my-0" />
          <div className="d-flex mb-1 mt-3">
            <p className="text-lightBlue me-2">What to Include in this Duplicate</p>
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="filter"
                  checked={duplicateDescription}
                  onChange={(e)=>setDuplicateDescription(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                  size="small"
                  style={{
                    color: "#5C6D8E",
                    marginRight: 0,
                  }}
                />
              }
              label="Notes"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#99a6c0",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="filter"
                  inputProps={{ "aria-label": "controlled" }}
                  size="small"
                  style={{
                    color: "#5C6D8E",
                    marginRight: 0,
                  }}
                />
              }
              label="Products"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#99a6c0",
                },
              }}
              
            />
                        <FormControlLabel
              control={
                <Checkbox
                  name="filter"
                  checked={duplicateFilter}
                  onChange={(e)=>setDuplicateFilter(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                  size="small"
                  style={{
                    color: "#5C6D8E",
                    marginRight: 0,
                  }}
                />
              }
              label="Show Filter"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#99a6c0",
                },
              }}
            />
          </FormGroup>
        </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex flex-column justify-content-start px-4 py-3">
          <div className="d-flex justify-content-between w-100">
            <button
              className="button-grey py-2 px-5"
              onClick={handleDuplicateVendorClose}
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={scheduleDuplicateVendor}
            >
              <p>Save</p>
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditVendor;
