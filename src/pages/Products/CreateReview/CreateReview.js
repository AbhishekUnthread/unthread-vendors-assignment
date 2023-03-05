import React from "react";
import "./CreateReview.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import AppTextEditor from "../../../components/AppTextEditor/AppTextEditor";
import TagsBox from "../../../components/TagsBox/TagsBox";
import StatusBox from "../../../components/StatusBox/StatusBox";
import TableSearch from "../../../components/TableSearch/TableSearch";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import { FormControl, OutlinedInput, Tooltip, Rating } from "@mui/material";

const CreateReview = () => {
  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/products/reviews" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>

          <h5 className="page-heading ms-2 ps-1">Create Reviews</h5>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            {" "}
            <div className="col-md-12 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Select Product to Review</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <TableSearch />
            </div>
          </div>

          <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mt-4">
            <div className="d-flex justify-content-between mb-2 px-0">
              <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
                Rating & Reviews
              </h6>
            </div>
            <div className="col-12 mt-3 px-0">
              <p className="text-lightBlue">Add Rating</p>
              <Rating name="half-rating-read" defaultValue={4} />
            </div>
            <div className="col-12 mt-3 px-0">
              <div className="d-flex  mb-1">
                <p className="text-lightBlue me-2">Description</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <AppTextEditor />
            </div>
            <div className="col-md-12 px-0 mt-3">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Customer Name</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <TableSearch />
            </div>
            <div className="col-md-12 px-0 mt-3">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Customer Frontend</p>
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
                <OutlinedInput placeholder="Enter Group Name" size="small" />
              </FormControl>
            </div>
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          <StatusBox headingName={"Status"} />
          <TagsBox />
        </div>
      </div>
      <div className="row create-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/collections"
            className="button-red-outline py-2 px-4"
          >
            <p>Discard</p>
          </Link>

          <Link
            to="/parameters/collections"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link>
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="/parameters/collections"
            className="button-lightBlue-outline py-2 px-4"
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="/parameters/collections"
            className="button-gradient ms-3 py-2 px-4 w-auto"
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
