import React from "react";
import "./ReturnRequestDetails.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import TagsBox from "../../../components/TagsBox/TagsBox";
import OrderUserDetails from "../OrderUserDetails";
import OrderCartDetails from "../OrderCartDetails";
import OrderTimelines from "../OrderTimelines";
import OrderPayments from "../OrderPayments";
import OrderActions from "../OrderActions";
import OrderMoreActionsButton from "../OrderMoreActionsButton";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
// ! MATERIAL ICONS IMPORTS
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import OrderReasonsAndIssues from "../OrderReasonsAndIssues";

const ReturnRequestDetails = () => {
  return (
    <div className="page container-fluid">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/orders/allOrders" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>
          <div>
            <h5 className="page-heading ms-2 ps-1">#12345</h5>
            <div className="d-flex ms-2 ps-1  align-items-center">
              <small className="text-lightBlue me-2">
                May 15, 2022 at 12:00 am
              </small>
              <img src={indiaFlag} alt="indiaFlag" width={20} />
              <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer w-auto ms-2">
                <small className="text-black fw-400">Order Confirm</small>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-green-outline py-1 px-4 me-3">
            <TaskAltIcon
              sx={{
                fontSize: 18,
                cursor: "pointer",
                "& :hover": { color: "green" },
              }}
            />
            <p className="ms-2">Approve Reuest</p>
          </button>
          <button className="button-red-outline py-1 px-4 me-3">
            <BlockIcon
              sx={{
                fontSize: 18,
                cursor: "pointer",
                "& :hover": { color: "green" },
              }}
            />
            <p className="ms-2">Reject Request</p>
          </button>
          <OrderMoreActionsButton />
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
      <div className="row">
        <div className="col-lg-9">
          <OrderCartDetails
            showCartButton={false}
            showEditButton={true}
            showBasicDetail={false}
            showItemAvailable={true}
            showActionButton={true}
            showFulfillButton={false}
            showResolveButton={true}
            showQCButton={false}
            showTrackingBox={false}
            showReturnButton={false}
            showExchangeButton={false}
            showCreateLabelButton={true}
            showCreateExchangeButton={false}
            showRefundAmountButton={true}
            showCustomerNote={false}
            showMadeOrderChip={false}
            showOrderID={true}
            showDetails={true}
            showNoOfItems={false}
            showRestocking={false}
            showConfirm={true}
            showSelectCheckbox={false}
          />

          <OrderReasonsAndIssues showAlterationForm={false} />
          <OrderCartDetails
            showCartButton={false}
            showEditButton={true}
            showBasicDetail={false}
            showItemAvailable={true}
            showActionButton={true}
            showFulfillButton={false}
            showResolveButton={true}
            showQCButton={false}
            showTrackingBox={false}
            showReturnButton={false}
            showExchangeButton={false}
            showCreateLabelButton={false}
            showCreateExchangeButton={true}
            showRefundAmountButton={true}
            showCustomerNote={false}
            showMadeOrderChip={false}
            showOrderID={true}
            showDetails={true}
            showNoOfItems={false}
            showRestocking={false}
            showConfirm={true}
            showSelectCheckbox={false}
          />
          <OrderReasonsAndIssues showAlterationForm={true} />
          <OrderPayments
            showMarkAsPaidButton={false}
            showCollectPaymentButton={false}
          />
          <OrderActions />
          <OrderTimelines />
        </div>
        <div className="col-lg-3 mt-4 pe-0 ps-0 ps-lg-3">
          <OrderUserDetails
            showGST={true}
            showMediaData={true}
            showReviewData={true}
          />
          <TagsBox />
        </div>
      </div>
    </div>
  );
};

export default ReturnRequestDetails;
