import React from "react";
import "../../pages/Parameters/EditVendor/EditVendor.scss";
import { Link } from "react-router-dom";

const SaveFooter = ({handleSubmit,handleSubmitAndAddAnother, saveAsDraft, saveAddAnother}) => {

  return (
    <div className="row create-buttons pt-5 pb-3 justify-content-between">
    <div className="d-flex w-auto px-0">
        <Link
        to="/parameters/vendors"
        className="button-red-outline py-2 px-4"
        >
        <p>Discard</p>
        </Link>

        { saveAsDraft ?
        <Link
        to="/parameters/vendors"
        className="button-lightBlue-outline py-2 px-4 ms-3"
        >
        <p>{saveAsDraft}</p>
        </Link>
        : " "}
    </div>
    <div className="d-flex w-auto px-0">
        { saveAddAnother ?
        <button
        onClick={handleSubmitAndAddAnother}
        className="button-lightBlue-outline py-2 px-4"
        >
        <p>{saveAddAnother}</p>
        </button>
        : ""}
        <button
          onClick={handleSubmit}
          className="button-gradient ms-3 py-2 px-4 w-auto"
        >
        <p>Save</p>
        </button>
    </div>
    </div>
  );
};

export default SaveFooter;
