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
// ! MATERIAL IMPORTS
import { Checkbox, FormControl, FormControlLabel, OutlinedInput, Tooltip } from "@mui/material";

import {
  useGetAllVendorsQuery,
  useEditVendorMutation,
  useCreateVendorMutation,
} from "../../../features/parameters/vendors/vendorsApiSlice";
import { updateVendorId } from "../../../features/parameters/vendors/vendorSlice";
import { useGetAllProductsQuery } from "../../../features/products/product/productApiSlice";


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

    if(vendorProductsDataIsSuccess)
    {
      setProducts(vendorProductsData)
    }

    if (vendorsIsSuccess && vendorId !== "") {
      // If vendorsIsSuccess is true, set the vendor name based on the data from the API response
      setVendorName(vendorsData.data.data[0].name);
      setVendorFlagShip(vendorsData.data.data[0].isFlagShip)
      setVendorNotes(vendorsData.data.data[0].description)
      setVendorStatus(vendorsData.data.data[0].status)
      
    }
  }, [vendorsIsSuccess,vendorProductsDataIsSuccess,vendorProductsData]);
  
    const vendorNotesChange=(event)=>{
      setVendorNotes(event.target.value);
    }
    const vendorStatusChange=(event,vendorStatus)=>{
      setVendorStatus(vendorStatus);
    }   

    const handleNameChange = (event) => {
      setVendorName(event.target.value); // Updating the vendor name based on the input value
    };

    const handleFilterChange=(event)=>{
      setChecked(event.target.checked);
    }
    const handleSubmit = () => {
     if(vendorId !== "")
     {
       // Calling Vendor edit API
       editVendor({
        id: vendorId, // ID of the vendor
        details: {
          isFlagShip: vendorFlagShip, // Flagship status of the vendor
          showFilter: checked, // Whether to show filters
          name: vendorName, // Vendor name
          description: vendorNotes, // Vendor description
          status: vendorStatus?vendorStatus:"active" // Vendor status
        }
      }).unwrap().then(() => {
        navigate("/parameters/vendors"); // Navigating to vendors page after successful edit
      });
     }
     else
     {
      createVendor({
        showFilter: checked, // Whether to show filters
        name: vendorName, // Vendor name
        description: vendorNotes, // Vendor description
        status: vendorStatus?vendorStatus:"active" // Vendor status
      }).unwrap().then(() => {
        navigate("/parameters/vendors"); // Navigating to vendors page after successful creation
      });
     }
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
            description: vendorNotes, // Vendor description
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
          description: vendorNotes, // Vendor description
          status: vendorStatus?vendorStatus:"active" // Vendor status
        }).unwrap().then(() => {
          navigate("/parameters/vendors/edit"); // Navigating to vendors page after successful creation
        });
      }
     
      setVendorName(''); 
      dispatch(updateVendorId(""));
    };
    

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
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Duplicate</p>
          </button>
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Preview</p>
          </button>
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
          <StatusBox  value={vendorStatus} 
           headingName={"Status"}
           handleProductStatus={vendorStatusChange}
           defaultValue={['active','archived']}
            />
          <NotesBox name="note" value={vendorNotes} onChange={vendorNotesChange} />
        </div>
      </div>
      <div className="row create-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/vendors"
            className="button-red-outline py-2 px-4"
          >
            <p>Discard</p>
          </Link>

          {/* <Link
            to="/parameters/vendors"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link> */}
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/vendors"
            className="button-lightBlue-outline py-2 px-4"
            onClick={handleSubmitAndAddAnother}
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="#"
            className="button-gradient ms-3 py-2 px-4 w-auto"
            onClick={handleSubmit}
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditVendor;
