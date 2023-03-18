import React from "react";
// ! IMAGES IMPORTS
import orderReason1 from "../../assets/icons/orderReason1.svg";
import orderReason2 from "../../assets/icons/orderReason2.svg";
import orderReason3 from "../../assets/icons/orderReason3.svg";
// ! MATERIAL ICONS IMPORT
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const OrderReasonsAndIssues = ({ showAlterationForm }) => {
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row mt-4">
      <div className="d-flex justify-content-between align-items-center col-12 px-0">
        <div className="d-flex align-items-center">
          {/* <Tooltip title="Lorem ipsum" placement="top"> */}
          <InfoOutlinedIcon
            sx={{ color: "#c8d8ff", fontSize: 20 }}
            className="c-pointer"
          />
          {/* </Tooltip> */}
          <h6 className="text-lightBlue fw-500 ms-2">Reasons and Issues</h6>
        </div>
      </div>

      <div className="d-flex justify-content-center col-12 px-0">
        <hr className="hr-grey-6 w-100 mt-3 mb-0" />
      </div>
      <div className=" col-12 px-0">
        <div className="row">
          <div className="col-12 mt-3">
            <small className="text-grey-6 fw-500">Resolution</small>
            <p className="text-lightBlue mt-1">Alteration</p>
          </div>
          <div className="col-6 mt-3">
            <small className="text-grey-6 fw-500">Reason</small>
            <p className="text-lightBlue mt-1 text-uppercase">
              Alter this Product
            </p>
          </div>
          <div className="col-6 mt-3">
            <small className="text-grey-6 fw-500">Tags</small>
            <p className="text-lightBlue mt-1">Original tags intact</p>
          </div>
          <div className="col-12 mt-3">
            <small className="text-grey-6 fw-500">Customer Note</small>
            <p className="text-lightBlue mt-1">
              To Lose for me to wear, Want 2-inch Smaller Neck and 5-inch shorts
              pants etc
            </p>
          </div>
          {showAlterationForm && (
            <div className="col-12 mt-3">
              <small className="text-grey-6 fw-500">Alteration Form</small>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Neck Depth Front
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Neck Depth Back
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Shoulder
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Arm Hole
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Bust
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Below Bust
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Waist
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Low Waist
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Dress Length
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Hip
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Sleeve Length
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Sleeve End Round
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Full Body Height
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Heels Height
                </small>
                <small className="text-lightBlue">:&nbsp;25 inch</small>
              </div>
              <div className="d-flex mt-1">
                <small className="text-lightBlue" style={{ width: 200 }}>
                  Standard Size
                </small>
                <small className="text-lightBlue">:&nbsp;XXL</small>
              </div>
            </div>
          )}
          <div className="col-12 mt-3">
            <small className="text-grey-6 fw-500">Attachment</small>
            <div className="d-flex">
              <img
                src={orderReason1}
                alt="orderReason1"
                width={50}
                className="mt-3 me-3"
              />
              <img
                src={orderReason2}
                alt="orderReason1"
                width={50}
                className="mt-3 me-3"
              />
              <img
                src={orderReason3}
                alt="orderReason1"
                width={50}
                className="mt-3 me-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReasonsAndIssues;
