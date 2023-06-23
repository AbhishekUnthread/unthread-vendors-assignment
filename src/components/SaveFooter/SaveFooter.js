import React from "react";
import "../../pages/Parameters/EditVendor/EditVendor.scss";
import { Link } from "react-router-dom";

const SaveFooter = () => {

  return (
    <div className="row create-buttons pt-5 pb-3 justify-content-between">
    <div className="d-flex w-auto px-0">
        <Link
        to="/parameters/vendors"
        className="button-red-outline py-2 px-4"
        >
        <p>Discard</p>
        </Link>

        <Link
        to="/parameters/vendors"
        className="button-lightBlue-outline py-2 px-4 ms-3"
        >
        <p>Save as Draft</p>
        </Link>
    </div>
    <div className="d-flex w-auto px-0">
        <Link
        to="/parameters/vendors"
        className="button-lightBlue-outline py-2 px-4"
        >
        <p>Save & Add Another</p>
        </Link>
        <Link
        to="/parameters/vendors"
        className="button-gradient ms-3 py-2 px-4 w-auto"
        >
        <p>Save</p>
        </Link>
    </div>
    </div>
  );
};

export default SaveFooter;
