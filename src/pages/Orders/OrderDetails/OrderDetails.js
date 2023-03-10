import React from "react";
import "./OrderDetails.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import TagsBox from "../../../components/TagsBox/TagsBox";
import UploadFile from "../../../components/UploadFile/UploadFile";
import OrderUserDetails from "../../../components/OrderUserDetails/OrderUserDetails";
import OrderCartDetails from "../../../components/OrderCartDetails/OrderCartDetails";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import email from "../../../assets/icons/email.svg";
import phone from "../../../assets/icons/phone.svg";
import message from "../../../assets/icons/message.svg";
import indiaFlag from "../../../assets/images/products/indiaFlag.svg";
import razorpay from "../../../assets/icons/razorpay.png";
import product2 from "../../../assets/images/products/product2.jpg";
import rolesSuperAdmin from "../../../assets/images/teams/rolesSuperAdmin.svg";
import info from "../../../assets/icons/info.svg";
import deleteRed from "../../../assets/icons/delete.svg";
import userRoles from "../../../assets/icons/userRoles.svg";
import uploadProfile from "../../../assets/icons/uploadProfile.svg";
import user from "../../../assets/images/users/user.svg";
import block from "../../../assets/images/users/block.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import currencyRupee from "../../../assets/icons/currencyRupee.svg";
import currencyDollar from "../../../assets/icons/currencyDollar.svg";
import currencyPound from "../../../assets/icons/currencyPound.svg";
import addMarkets from "../../../assets/icons/addMarkets.svg";
import userIcon from "../../../assets/icons/userIcon.svg";
import productIcon from "../../../assets/icons/productIcon.svg";
import timelineIcon from "../../../assets/icons/timelineIcon.svg";
import timelineTag from "../../../assets/icons/timelineTag.svg";
import timelineMicrophone from "../../../assets/icons/timelineMicrophone.svg";
import timelineAttachment from "../../../assets/icons/timelineAttachment.svg";
import timelineSmile from "../../../assets/icons/timelineSmile.svg";
import cardIcon from "../../../assets/icons/cardIcon.svg";
import cancel from "../../../assets/icons/cancel.svg";
import locationGradient from "../../../assets/icons/locationGradient.svg";
import productInfoMedia2 from "../../../assets/images/products/productInfoMedia2.svg";
// ! MATERIAL IMPORTS
import {
  Box,
  Tab,
  Tabs,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Popover,
  Chip,
  DialogTitle,
  Rating,
  TextareaAutosize,
  FormControl,
  OutlinedInput,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PrintIcon from "@mui/icons-material/Print";
import ClearIcon from "@mui/icons-material/Clear";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const OrderDetails = () => {
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

  // ? ORDER STATUS SELECT STARTS HERE
  const [orderStatus, setOrderStatus] = React.useState("");

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };
  // ? GENDER SELECT ENDS HERE

  // ? CHECKBOX STARTS HERE
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // ? CHECKBOX ENDS HERE

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
          <button className="button-lightBlue-outline py-1 px-4">
            <p>Refund</p>
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
              {/* <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <img src={phone} alt="phome" width={16} className="me-2" />
                <small className="text-lightBlue d-block">Call</small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <img src={email} alt="email" width={16} className="me-2" />
                <small className="text-lightBlue d-block">Send Email</small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <img src={message} alt="message" width={16} className="me-2" />
                <small className="text-lightBlue d-block">Message</small>
              </div> */}
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <ClearIcon
                  sx={{
                    color: "#c8d8ff",
                    fontSize: 16,
                    cursor: "pointer",
                    marginRight: "0.5rem",
                  }}
                />
                <small className="text-lightBlue d-block">Cancel Order</small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <ReceiptLongOutlinedIcon
                  sx={{
                    color: "#c8d8ff",
                    fontSize: 16,
                    cursor: "pointer",
                    marginRight: "0.5rem",
                  }}
                />
                <small className="text-lightBlue d-block">View Invoice</small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <FileDownloadOutlinedIcon
                  sx={{
                    color: "#c8d8ff",
                    fontSize: 16,
                    cursor: "pointer",
                    marginRight: "0.5rem",
                  }}
                />
                <small className="text-lightBlue d-block">
                  Download Order Invoice
                </small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <PrintIcon
                  sx={{
                    color: "#c8d8ff",
                    fontSize: 16,
                    cursor: "pointer",
                    marginRight: "0.5rem",
                  }}
                />
                <small className="text-lightBlue d-block">
                  Print Packaging Slip
                </small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <StarBorderOutlinedIcon
                  sx={{
                    color: "#c8d8ff",
                    fontSize: 16,
                    cursor: "pointer",
                    marginRight: "0.5rem",
                  }}
                />
                <small className="text-lightBlue d-block">
                  Mark as Priority Order
                </small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <EmailOutlinedIcon
                  sx={{
                    color: "#c8d8ff",
                    fontSize: 16,
                    cursor: "pointer",
                    marginRight: "0.5rem",
                  }}
                />
                <small className="text-lightBlue d-block">
                  Send Feedback Email
                </small>
              </div>
              <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
                <DeleteIcon
                  sx={{
                    color: "#c8d8ff",
                    fontSize: 16,
                    cursor: "pointer",
                    marginRight: "0.5rem",
                  }}
                />
                <small className="text-lightBlue d-block">Archive Order</small>
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
            showCartButton={false}
            showEditButton={true}
            showBasicDetail={true}
            showItemAvailable={true}
            showActionButton={true}
            showFulfillButton={true}
            showQCButton={true}
          />
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes mt-4">
            <div className="col-12 px-0">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={cardIcon} alt="userIcon" width={16} />
                  <h6 className="text-lightBlue fw-500 ms-2">Payment</h6>
                  <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer ms-4">
                    <small className="text-black fw-400">Order Confirm</small>
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
                  <small className="text-grey-6 mb-1 d-block">
                    Payment Type
                  </small>
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
                  <small className="text-grey-6 mb-1 d-block">
                    Transaction ID
                  </small>
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
            <div className="col-12 d-flex px-0 mt-3">
              <button className="button-lightBlue-outline py-2 px-4 me-3">
                <p>Mark as Paid</p>
              </button>
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
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row mt-4">
            <div className="d-flex justify-content-between align-items-center col-12 px-0">
              <div className="d-flex align-items-center">
                <img src={productIcon} alt="userIcon" width={16} />
                <h6 className="text-lightBlue fw-500 ms-2">Order Action</h6>
              </div>
            </div>

            <div className="d-flex justify-content-center col-12 px-0">
              <hr className="hr-grey-6 w-100 mt-3 mb-0" />
            </div>
            <div className="col-5 mt-3 ps-0">
              <div className="w-100 px-0">
                <p className="text-lightBlue mb-1">Order Status</p>

                <FormControl
                  sx={{ m: 0, minWidth: 120, width: "100%" }}
                  size="small"
                >
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={orderStatus}
                    onChange={handleOrderStatusChange}
                    size="small"
                  >
                    <MenuItem value="" sx={{ fontSize: 13, color: "#5c6d8e" }}>
                      None
                    </MenuItem>
                    <MenuItem
                      value={10}
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Status 1
                    </MenuItem>
                    <MenuItem
                      value={20}
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Status 2
                    </MenuItem>
                    <MenuItem
                      value={20}
                      sx={{ fontSize: 13, color: "#5c6d8e" }}
                    >
                      Status 3
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col-7 mt-3 pe-0">
              <div className="w-100 px-0">
                <p className="text-lightBlue mb-1">Note</p>
                <FormControl className="w-100 px-0">
                  <OutlinedInput placeholder="Type Something" size="small" />
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                      size="small"
                      style={{
                        color: "#5C6D8E",
                        marginRight: 0,
                        width: "auto",
                      }}
                    />
                  }
                  label="Send Notification to User"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.75rem",
                      color: "#c8d8ff",
                      // color: "#5c6d8e",
                    },
                  }}
                  className=" px-0"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center col-12 px-0">
              <hr className="hr-grey-6 w-100 my-3" />
            </div>
            <div className="col-12 px-0">
              <button className="button-gradient py-2 px-4">
                <p>Update Status</p>
              </button>
            </div>
          </div>
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row mt-4">
            <div className="d-flex justify-content-between align-items-center col-12 px-0">
              <div className="d-flex align-items-center">
                <img src={timelineIcon} alt="userIcon" width={16} />
                <h6 className="text-lightBlue fw-500 ms-2">Timelines</h6>
              </div>
            </div>

            <div className="d-flex justify-content-center col-12 px-0">
              <hr className="hr-grey-6 w-100 mt-3 mb-0" />
            </div>
            <div className="d-flex justify-content-center col-12 px-0 mt-3">
              {/* <div className="d-flex"> */}
              <img
                src={timelineSmile}
                alt="timelineSmile"
                width={18}
                className="me-2 c-pointer"
              />
              <img
                src={timelineAttachment}
                alt="timelineAttachment"
                width={18}
                className="me-2 c-pointer"
              />
              <img
                src={timelineTag}
                alt="timelineTag"
                width={18}
                className="me-2 c-pointer"
              />
              <img
                src={timelineMicrophone}
                alt="timelineMicrophone"
                width={18}
                className="me-2 c-pointer"
              />

              <FormControl className="w-100 px-0">
                <OutlinedInput
                  placeholder="Write your message here..."
                  size="small"
                />
              </FormControl>
              <button className="button-gradient ms-2 px-4 py-2">
                <p>Post</p>
              </button>
              {/* </div> */}
            </div>
            <table className="table table-borderless w-100 mt-3 mb-0 create-table">
              <thead className="">
                <tr className="bg-black-18">
                  <th scope="col" className="">
                    <small className="text-lightBlue fw-400">Date</small>
                  </th>
                  <th scope="col" className="">
                    <small className="text-lightBlue fw-400">Team Member</small>
                  </th>
                  <th scope="col" className="">
                    <small className="text-lightBlue fw-400">Activity</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(1)].map((elementInArray, index) => (
                  <React.Fragment>
                    <tr>
                      <td width={200}>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">Today at 5:25pm</p>
                        </div>
                      </td>
                      <td width={200}>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">Sanjay Chauhan</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">
                            Order Created, Payment Pending
                          </p>
                          <small className="text-lightBlue mt-2 text-green-2">
                            <i className=" text-green-2">Customer Notified</i>
                          </small>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td width={200}>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">Yesterday at 5:25pm</p>
                        </div>
                      </td>
                      <td width={200}>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">Sanjay Chauhan</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">Order Shipped</p>
                          <small className="text-lightBlue mt-2 text-green-2">
                            <i className="text-blue-1">
                              Hi Customer , your package has now been shipped
                              through Delhivery Tracking Number: 123456789. View
                              tracking details:
                              https://www.delhivery.com/track/123456789
                            </i>
                          </small>
                          <small className="text-lightBlue mt-2 text-green-2">
                            <i className=" text-green-2">Customer Notified</i>
                          </small>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td width={200}>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">Yesterday at 5:25pm</p>
                        </div>
                      </td>
                      <td width={200}>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">Sanjay Chauhan</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">QC Completed</p>

                          <small className="text-lightBlue mt-2">
                            <i className="text-grey-6">Customer not Notified</i>
                          </small>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td width={200}>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">Yesterday at 5:25pm</p>
                        </div>
                      </td>
                      <td width={200}>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">Sanjay Chauhan</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column py-2">
                          <p className="text-lightBlue">Invoice Cereated</p>

                          <small className="text-lightBlue mt-2">
                            <i className="text-grey-6">Customer not Notified</i>
                          </small>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
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
