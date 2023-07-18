import React from "react";
import { Slide } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";

import "../../pages/Parameters/EditVendor/EditVendor.scss";

const SaveFooter = ({
  handleSubmit,
  handleSubmitAndAddAnother,
  saveAsDraft,
  saveAddAnother,
  handleDiscard
}) => {
  const navigate = useNavigate();

  return (
    <div className="row create-buttons pt-5 pb-3 justify-content-between mb-2">
      <div className="d-flex w-auto px-0">
        <button
          className="button-red-outline py-2 px-4"
          onClick={handleDiscard}
        >
          <p>Discard</p>
        </button>

        {saveAsDraft ? (
          <Link
            to="/parameters/vendors"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>{saveAsDraft}</p>
          </Link>
        ) : (
          " "
        )}
      </div>
      <div className="d-flex w-auto px-0">
        {saveAddAnother ? (
          <button
            onClick={handleSubmitAndAddAnother}
            className="button-lightBlue-outline py-2 px-4"
          >
            <p>{saveAddAnother}</p>
          </button>
        ) : (
          ""
        )}
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

const SaveFooterSecondary = (props) => {
  const { onDiscard, show, isLoading, handleSubmit } = props;
  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <div
        className="row create-buttons pt-5 pb-3 justify-content-between"
        style={{ width: "102%" }}
      >
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
            onClick={handleSubmit ? handleSubmit : () => {}}
          >
            <p>Save</p>
          </LoadingButton>
        </div>
      </div>
    </Slide>
  );
};

const SaveFooterTertiary = (props) => {
  const { onDiscard, show, isLoading } = props;
  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <div
        className="row create-buttons pt-5 pb-3 justify-content-between"
        style={{ width: "102%" }}
      >
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
export { SaveFooterSecondary, SaveFooterTertiary };
