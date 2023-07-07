<<<<<<< HEAD
import React from "react";
import "../../pages/Parameters/EditVendor/EditVendor.scss";
import { Link, useNavigate } from "react-router-dom";
const SaveFooter = ({handleSubmit,handleSubmitAndAddAnother, saveAsDraft, saveAddAnother}) => {
  const navigate = useNavigate()

  return (
    <div className="row create-buttons pt-5 pb-3 justify-content-between mb-2">
    <div className="d-flex w-auto px-0">
        <button
        className="button-red-outline py-2 px-4"
        onClick={()=>navigate(-1)}
        >
        <p>Discard</p>
        </button>
=======
import { Link } from "react-router-dom";
import { Slide } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import "../../pages/Parameters/EditVendor/EditVendor.scss";

const SaveFooter = () => {
  return (
    <div className="row create-buttons pt-5 pb-3 justify-content-between">
      <div className="d-flex w-auto px-0">
        <Link to="/parameters/vendors" className="button-red-outline py-2 px-4">
          <p>Discard</p>
        </Link>
>>>>>>> 6306a33 (product tab module pushed)

        { saveAsDraft ?
        <Link
          to="/parameters/vendors"
          className="button-lightBlue-outline py-2 px-4 ms-3"
        >
<<<<<<< HEAD
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
=======
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

const SaveFooterSecondary = (props) => {
  const { onDiscard, show, isLoading } = props;
  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <div className="row create-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          {onDiscard && (
            <button
              onClick={onDiscard}
              className="button-red-outline py-2 px-4"
              type="button"
            >
              <p>Discard</p>
            </button>
          )}
        </div>
        <div className="d-flex w-auto px-0">
          <LoadingButton
            className="button-gradient ms-3 py-2 px-4 w-auto"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            <p>Save</p>
          </LoadingButton>
        </div>
      </div>
    </Slide>
  );
};

export default SaveFooter;
export { SaveFooterSecondary };
>>>>>>> 6306a33 (product tab module pushed)
