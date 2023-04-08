import React from "react";
// ! IMAGES IMPORTS
import info from "../../assets/icons/info.svg";
import product2 from "../../assets/images/products/product2.jpg";
// ! MATERIAL IMPORTS
import { FormControl, MenuItem, Select, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchBorder from "../../components/SearchBorder/SearchBorder";

const BundleProductDiscount = ({ sectionTitle }) => {
  // ? FIELD SELECT STARTS HERE
  const [field, setField] = React.useState("");

  const handleFieldChange = (event) => {
    setField(event.target.value);
  };
  // ? FIELD SELECT ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue fw-500">
            {sectionTitle}
          </h6>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
      </div>
      <hr className="hr-grey-6 mt-3 mb-0" />
      {/* <div className="col-12 px-0">
      <div className="row align-items-start"> */}
      <div className="col-md-4 mt-3 ps-0 pe-0 pe-md-2">
        <div className="d-flex mb-1">
          <p className="text-lightBlue">Select Item from</p>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
        <FormControl sx={{ m: 0, minWidth: 120, width: "100%" }} size="small">
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={field}
            onChange={handleFieldChange}
            size="small"
          >
            <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
              None
            </MenuItem>
            <MenuItem value={10} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              All Products
            </MenuItem>
            <MenuItem value={20} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Specific Product
            </MenuItem>
            <MenuItem value={30} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Collection
            </MenuItem>
            <MenuItem value={40} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Category
            </MenuItem>
            <MenuItem value={50} sx={{ fontSize: 13, color: "#5c6d8e" }}>
              Tags
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="col-md-8 mt-3 mb-3 pe-0 ps-0 ps-md-2">
        <div className="d-flex mb-1">
          <p className="text-lightBlue">Select Product</p>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
              src={info}
              alt="info"
              className="ms-2 c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
        <SearchBorder />
      </div>
      <div className="col-12 mt-2 px-0">
        <div className="bg-black-21 rounded-8 align-items-center p-2 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={product2}
              alt="product2"
              className="rounded-8"
              width={50}
              height="auto"
            />
            <div className="d-flex flex-column ms-2">
              <p className="text-lightBlue">The Fringe Diamond Ring</p>
              <small className="text-grey-6 mt-1">SKU: TFDR012345</small>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="text-lightBlue me-3">₹&nbsp;50,000</p>
            <ClearIcon
              sx={{
                color: "#c8d8ff",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-12 mt-2 px-0">
        <div className="bg-black-21 rounded-8 align-items-center p-2 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={product2}
              alt="product2"
              className="rounded-8"
              width={50}
              height="auto"
            />
            <div className="d-flex flex-column ms-2">
              <p className="text-lightBlue">The Fringe Diamond Ring</p>
              <small className="text-grey-6 mt-1">SKU: TFDR012345</small>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="text-lightBlue me-3">₹&nbsp;50,000</p>
            <ClearIcon
              sx={{
                color: "#c8d8ff",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-12 mt-2 px-0">
        <div className="bg-black-21 rounded-8 align-items-center p-2 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={product2}
              alt="product2"
              className="rounded-8"
              width={50}
              height="auto"
            />
            <div className="d-flex flex-column ms-2">
              <p className="text-lightBlue">The Fringe Diamond Ring</p>
              <small className="text-grey-6 mt-1">SKU: TFDR012345</small>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="text-lightBlue me-3">₹&nbsp;50,000</p>
            <ClearIcon
              sx={{
                color: "#c8d8ff",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleProductDiscount;
