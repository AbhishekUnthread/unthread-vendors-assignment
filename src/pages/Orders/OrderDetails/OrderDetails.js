import React from "react";
import "./OrderDetails.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import TagsBox from "../../../components/TagsBox/TagsBox";
import OrderUserDetails from "../OrderUserDetails";
import OrderCartDetails from "../OrderCartDetails";
import OrderTimelines from "../OrderTimelines";
import OrderPayments from "../OrderPayments";
import OrderActions from "../OrderActions";
import OrderMoreActionsButton from "../OrderMoreActionsButton";
import OrderReturnBox from "../OrderReturnBox";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";

const OrderDetails = () => {
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
            <div className="d-flex ms-2 ps-1 mt-1">
              <small className="text-lightBlue me-2">
                May 15, 2022 at 12:00 am
              </small>
              <img src={indiaFlag} alt="indiaFlag" width={20} />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-lightBlue-outline py-1 px-4 me-3">
            <p>Refund</p>
          </button>
          <button className="button-lightBlue-outline py-1 px-4 me-3">
            <p>Send Invoice</p>
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
            showBasicDetail={true}
            showItemAvailable={true}
            showActionButton={true}
            showFulfillButton={true}
            showResolveButton={false}
            showQCButton={false}
            showTrackingBox={true}
            showReturnButton={true}
            showExchangeButton={true}
            showCreateLabelButton={false}
            showCreateExchangeButton={false}
            showRefundAmountButton={false}
            showCustomerNote={true}
            showMadeOrderChip={true}
            showOrderID={false}
            showDetails={true}
            showNoOfItems={true}
            showRestocking={false}
            showConfirm={true}
            showSelectCheckbox={false}
          />
          <OrderReturnBox
            showBasicDetail={true}
            showItemAvailable={true}
            showActionButton={true}
            showQCButton={true}
            showProductReceived={true}
          />
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

export default OrderDetails;
