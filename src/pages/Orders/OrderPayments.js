import React from "react";
// ! IMAGES IMPORTS
import razorpay from "../../assets/icons/razorpay.png";
import cardIcon from "../../assets/icons/cardIcon.svg";
// ! MATERIAL IMPORTS
import { Popover, Tooltip } from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const OrderPayments = ({ showMarkAsPaidButton, showCollectPaymentButton }) => {
  // * PAYMENT POPOVERS STARTS
  const [anchorPaymentEl, setAnchorPaymentEl] = React.useState(null);
  const handlePaymentClick = (event) => {
    setAnchorPaymentEl(event.currentTarget);
  };

  const handlePaymentClose = () => {
    setAnchorPaymentEl(null);
  };

  const openPayment = Boolean(anchorPaymentEl);
  const idPayment = openPayment ? "simple-popover" : undefined;
  // * PAYMENT POPOVERS ENDS
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
      <div className="col-12 px-0">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src={cardIcon} alt="userIcon" width={16} />
            <h6 className="text-lightBlue fw-500 ms-2">Payment</h6>
            <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer ms-4">
              <small className="text-black fw-400">Pending</small>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-center px-0">
        <hr className="hr-grey-6 w-100 mt-3 mb-0" />
      </div>
      <div className="col-12 px-0">
        <div className="row">
          <div className="col-md-3 col-6 mt-3">
            <small className="text-grey-6 mb-1 d-block">Gateway</small>
            <img
              src={razorpay}
              alt="razorpay"
              height={20}
              className="rounded-pill"
            />
          </div>
          <div className="col-md-3 col-6 mt-3">
            <small className="text-grey-6 mb-1 d-block">Payment Type</small>
            <div className="d-flex">
              <h6 className="text-lightBlue">Debit Card</h6>
              <p className="text-blue-2 ms-2">(View Info)</p>
            </div>
          </div>
          <div className="col-md-3 col-6 mt-3">
            <small className="text-grey-6 mb-1 d-block">
              Order/Payment Status History
            </small>

            <p className="text-lightBlue">16 May, 2022 at 11:59 PM</p>
          </div>
          <div className="col-md-3 col-6 mt-3">
            <small className="text-grey-6 mb-1 d-block">Transaction ID</small>
            <div className="d-flex align-items-center">
              <p className="text-lightBlue me-2">16444443532</p>
              <Tooltip title="Copy" placement="top">
                <ContentCopyIcon
                  sx={{ fontSize: 12, color: "#c8d8ff" }}
                  className="c-pointer"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {(showMarkAsPaidButton || showCollectPaymentButton) && (
        <div className="col-12 d-flex justify-content-center px-0">
          <hr className="hr-grey-6 w-100 my-3" />
        </div>
      )}
      <div className="col-12 d-flex px-0">
        {showMarkAsPaidButton && (
          <button className="button-lightBlue-outline py-2 px-4 me-3">
            <p>Mark as Paid</p>
          </button>
        )}
        {showCollectPaymentButton && (
          <React.Fragment>
            <button
              className="button-gradient py-2 px-4"
              aria-describedby={idPayment}
              variant="contained"
              onClick={handlePaymentClick}
            >
              <p>Collect Payment</p>
            </button>
            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              id={idPayment}
              open={openPayment}
              anchorEl={anchorPaymentEl}
              onClose={handlePaymentClose}
            >
              <div className="py-2 px-2">
                <div className="d-flex align-items-center justify-content-between mb-2 text-lightBlue">
                  <small>Send Payment Link</small>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-2 text-lightBlue">
                  <small>Collect Cash</small>
                </div>
              </div>
            </Popover>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default OrderPayments;
