import React from "react";
import "../../pages/Parameters/EditVendor/EditVendor.scss";
import { Link } from "react-router-dom";
// ! IMAGES IMPORTS
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import paginationRight from "../../assets/icons/paginationRight.svg";
import paginationLeft from "../../assets/icons/paginationLeft.svg";

const AddHeader = ({headerName, subHeading, subHighlightstext, navigateLink, previewButton}) => {

  return (
    <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to={navigateLink} className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column ">
                <h5 className="page-heading ms-2 ps-1">{headerName}</h5>
                <small className="text-grey-6 mt-1 d-block" style={{marginLeft: '10px'}}>
                    {subHeading}
                    <span className="text-blue-2 c-pointer">{subHighlightstext}</span>
                </small>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Duplicate</p>
          </button>
          <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">{previewButton}</p>
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
  );
};

export default AddHeader;
