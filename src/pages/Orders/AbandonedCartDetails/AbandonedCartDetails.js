import React from "react";
import "./AbandonedCartDetails.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import TagsBox from "../../../components/TagsBox/TagsBox";
import OrderUserDetails from "../OrderUserDetails";
import OrderCartDetails from "../OrderCartDetails";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import deleteRed from "../../../assets/icons/delete.svg";
// ! MATERIAL IMPORTS
import { Popover } from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const AbandonedCartDetails = () => {
  // * CONTACT POPOVERS STARTS
  const [anchorContactEl, setContactEl] = React.useState(null);

  const handleContactClick = (event) => {
    setContactEl(event.currentTarget);
  };

  const handleContactClose = () => {
    setContactEl(null);
  };

  const openContact = Boolean(anchorContactEl);
  const idContact = openContact ? "simple-popover" : undefined;
  // * CONTACT POPOVERS ENDS

  return (
    <div className="page container-fluid">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/orders/abandonedCart" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>
          <div>
            <h5 className="page-heading ms-2 ps-1">#CHKT12345</h5>
            <div className="d-flex ms-2 ps-1 mt-1">
              <small className="text-lightBlue me-2">
                May 15, 2022 at 12:00 am
              </small>
              <img src={indiaFlag} alt="indiaFlag" width={20} />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-lightBlue-outline py-1 px-4">
            <EmailOutlinedIcon
              sx={{
                fontSize: 18,
                marginRight: 1,
                // color: "#c8d8ff",
                cursor: "pointer",
              }}
            />
            <p>Resend Recovery Email</p>
          </button>
          <button
            className="button-gradient py-1 px-4 w-auto ms-3 me-3"
            onClick={handleContactClick}
          >
            <p>More Actions</p>
          </button>

          <Popover
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            id={idContact}
            open={openContact}
            anchorEl={anchorContactEl}
            onClose={handleContactClose}
          >
            <div className="py-2 px-1">
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <Inventory2OutlinedIcon
                  sx={{
                    fontSize: 14,
                    marginRight: 1,
                    color: "#c8d8ff",
                  }}
                />
                <small className="text-lightBlue d-block">Place Order</small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back  c-pointer">
                <ReceiptLongOutlinedIcon
                  sx={{
                    fontSize: 14,
                    marginRight: 1,
                    color: "#c8d8ff",
                  }}
                />
                <small className="text-lightBlue d-block">Print</small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <img
                  src={deleteRed}
                  alt="message"
                  width={16}
                  className="me-2"
                />
                <small className="text-lightBlue d-block">Delete</small>
              </div>
            </div>
          </Popover>
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
        <div className="col-lg-9 mt-4">
          <OrderCartDetails
            showCartButton={true}
            showEditButton={false}
            showBasicDetail={false}
            showItemAvailable={false}
            showActionButton={false}
            showFulfillButton={false}
            showQCButton={false}
            showResolveButton={false}
            showTrackingBox={false}
            showReturnButton={false}
            showExchangeButton={false}
            showCreateLabelButton={false}
            showCreateExchangeButton={false}
            showRefundAmountButton={false}
            showCustomerNote={false}
            showMadeOrderChip={false}
            showOrderID={false}
            showNoOfItems={false}
            showDetails={true}
            showRestocking={false}
            showConfirm={true}
            showSelectCheckbox={false}
          />
        </div>
        <div className="col-lg-3 mt-4 pe-0 ps-0 ps-lg-3">
          <OrderUserDetails
            showGST={false}
            showMediaData={false}
            showReviewData={false}
          />
          <TagsBox />
        </div>
      </div>
    </div>
  );
};

export default AbandonedCartDetails;
