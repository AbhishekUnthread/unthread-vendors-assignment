import React from "react";
import "./Attributes.scss";
import info from "../../../../assets/icons/info.svg";
import eyeClosed from "../../../../assets/icons/eyeClosed.svg";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";

const Attributes = () => {
  return (
    <div className="bg-black-2 border-grey-5 rounded-3 p-3 row attributes">
      <div className="d-flex col-12 px-0 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="text-lightBlue me-auto text-lightBlue">
            Additional Fields
          </h6>
          <img src={info} alt="info" className="ms-2" />
        </div>
        <p className="" style={{ color: "#6E8DD7" }}>
          Manage Additional Fields
        </p>
      </div>
      <hr className="hr-grey-6 my-3" />
      <div className="d-flex col-12 px-0">
        <p className="text-grey-5">Field Type :</p>
        <p className="mx-1">Metal Field Sets</p>
        <p style={{ color: "#6E8DD7" }}>(Change field sets)</p>
      </div>
      <hr className="hr-grey-6 mt-3 mb-3" />
      <div className="col-12 mt-1 mb-2 pb-2">
        <div className="row align-items-start">
          <div className="col-4">
            <p className="text-lightBlue">Style Code</p>
            <div className="d-flex">
              <img src={eyeClosed} alt="eyeClosed" width={15} />
              <small className="text-grey-6 ms-2">Customer wont see this</small>
            </div>
          </div>
          <FormControl sx={{ background: "#15142A" }} className="col-7 px-0">
            <OutlinedInput placeholder="Enter Content" size="small" />
          </FormControl>
        </div>
      </div>
      <div className="col-12 mt-1 mb-2 pb-2">
        <div className="row align-items-start">
          <p className="text-lightBlue col-4">Labour Code</p>
          <FormControl sx={{ background: "#15142A" }} className="col-7 px-0">
            <OutlinedInput placeholder="Enter Content" size="small" />
          </FormControl>
        </div>
      </div>
      <div className="col-12 mt-1 mb-2 pb-2">
        <div className="row align-items-start">
          <p className="text-lightBlue col-4">Labour Charge</p>
          <FormControl sx={{ background: "#15142A" }} className="col-7 px-0">
            <OutlinedInput placeholder="Enter Content" size="small" />
          </FormControl>
        </div>
      </div>
      <div className="col-12 mt-1 mb-2 pb-2">
        <div className="row align-items-start">
          <p className="text-lightBlue col-4">Metal Certification</p>
          <FormControl sx={{ background: "#15142A" }} className="col-7 px-0">
            <OutlinedInput placeholder="Enter Content" size="small" />
          </FormControl>
        </div>
      </div>
      <div className="col-12 mt-1 mb-2 pb-2">
        <div className="row align-items-start">
          <p className="text-lightBlue col-4">Metal Weight</p>
          <FormControl sx={{ background: "#15142A" }} className="col-8 px-0">
            <OutlinedInput
              placeholder="Enter Content"
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gm
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
      <div className="col-12">
        <div
          className="row py-3 mb-3"
          style={{ background: "rgba(39, 40, 63, 0.5)" }}
        >
          <div className="col-12 mb-3">
            <p className="text-lightBlue">Diamond Information 1</p>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Diamond Name</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Size (mm)</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Setting Type</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">No of Pieces</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Carat Weight</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
        </div>
        <div
          className="row py-3"
          style={{ background: "rgba(39, 40, 63, 0.5)" }}
        >
          <div className="col-12 mb-3">
            <p className="text-lightBlue">Diamond Information 2</p>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Diamond Name</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Size (mm)</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Setting Type</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">No of Pieces</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
          <div className="col-12 mt-1 mb-2 pb-2">
            <div className="row align-items-start">
              <p className="text-lightBlue col-4">Carat Weight</p>
              <FormControl
                sx={{ background: "#15142A" }}
                className="col-7 px-0"
              >
                <OutlinedInput placeholder="Enter Content" size="small" />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attributes;
