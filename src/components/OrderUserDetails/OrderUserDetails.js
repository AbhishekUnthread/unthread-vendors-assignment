import React from "react";
import "./OrderUserDetails.scss";
import { Link } from "react-router-dom";
// ! COMPONENT IMPORTS
import UploadFile from "../UploadFile/UploadFile";
// ! IMAGES IMPORTS
import indiaFlag from "../../assets/images/products/indiaFlag.svg";
import product2 from "../../assets/images/products/product2.jpg";
import userIcon from "../../assets/icons/userIcon.svg";
import cancel from "../../assets/icons/cancel.svg";
import locationGradient from "../../assets/icons/locationGradient.svg";
import productInfoMedia2 from "../../assets/images/products/productInfoMedia2.svg";
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

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const OrderUserDetails = ({ showGST, showReviewData, showMediaData }) => {
  // ? IMPORT SECOND DIALOG STARTS HERE
  const [openImportSecond, setOpenImportSecond] = React.useState(false);

  const handleImportSecondOpen = () => {
    setOpenImportSecond(true);
  };

  const handleImportSecondClose = () => {
    setOpenImportSecond(false);
  };
  // ? IMPORT SECOND DIALOG ENDS HERE

  // ? REVIEW DIALOG STARTS HERE
  const [openReview, setOpenReview] = React.useState(false);

  const handleOpenReview = () => {
    setOpenReview(true);
  };

  const handleOpenReviewClose = () => {
    setOpenReview(false);
  };
  // ? REVIEW DIALOG ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={userIcon} alt="userIcon" width={16} />
          <h6 className="text-lightBlue fw-500 ms-2">User</h6>
        </div>
        <small className="text-blue-2 c-pointer">Edit</small>
      </div>

      <div className="d-flex justify-content-center">
        <hr className="hr-grey-6 w-100 my-3" />
      </div>
      <div className="d-flex align-items-center">
        <h6 className="fw-500 text-blue-2 text-decoration-underline me-3 c-pointer">
          Saniya Shaikh
        </h6>

        <img src={indiaFlag} alt="indiaFlag" height={15} />
      </div>
      <div className="d-flex align-items-center mt-2">
        <small className="text-lightBlue me-2">saniya@mydesignar.com</small>
        <Tooltip title="Hide" placement="top">
          <VisibilityOutlinedIcon
            sx={{
              color: "#c8d8ff",
              fontSize: 14,
              cursor: "pointer",
              marginRight: "8px",
            }}
          />
        </Tooltip>
        <Tooltip title="Copy" placement="top">
          <ContentCopyIcon
            sx={{
              fontSize: 12,
              color: "#c8d8ff",
            }}
            className="c-pointer"
          />
        </Tooltip>
      </div>
      <div className="d-flex align-items-center mt-2">
        <small className="text-lightBlue me-2">+91-9876543210</small>

        <Tooltip title="Hide" placement="top">
          <VisibilityOutlinedIcon
            sx={{
              color: "#c8d8ff",
              fontSize: 14,
              cursor: "pointer",
              marginRight: "8px",
            }}
          />
        </Tooltip>
        <Tooltip title="Copy" placement="top">
          <ContentCopyIcon
            sx={{
              fontSize: 12,
              color: "#c8d8ff",
            }}
            className="c-pointer"
          />
        </Tooltip>
      </div>

      <div className="d-flex justify-content-center">
        <hr className="hr-grey-6 w-100 my-3" />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <small className="text-grey-6 me-2">Shipping Address</small>
        <small className="text-blue-2 c-pointer">Edit</small>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <small className="text-lightBlue me-3">
          The Boardroom Co-Working Space - Andheri Near DN Nagar Metro Station,
          Mumbai - 4000039, India
        </small>
        <Tooltip title="Copy" placement="top">
          <ContentCopyIcon
            sx={{
              fontSize: 12,
              color: "#c8d8ff",
            }}
            className="c-pointer"
          />
        </Tooltip>
      </div>
      <div className="d-flex mt-3">
        <img
          src={locationGradient}
          alt="locationGradient"
          width={14}
          className="me-2 c-pointer"
        />
        <small className="text-blue-gradient c-pointer">Get Direction</small>
      </div>
      <div className="d-flex justify-content-center">
        <hr className="hr-grey-6 w-100 my-3" />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <small className="text-grey-6 me-2">Billing Address</small>
        <small className="text-blue-2 c-pointer">Edit</small>
      </div>
      <small className="text-lightBlue me-3 d-block">Sahil Bhutani</small>
      <div className="d-flex align-items-center justify-content-between">
        <small className="text-lightBlue me-3">
          The Boardroom Co-Working Space - Andheri Near DN Nagar Metro Station,
          Mumbai - 4000039, India
        </small>

        <Tooltip title="Copy" placement="top">
          <ContentCopyIcon
            sx={{
              fontSize: 12,
              color: "#c8d8ff",
            }}
            className="c-pointer"
          />
        </Tooltip>
      </div>
      {showGST && (
        <div className="d-flex mt-3">
          <small className="text-grey-6 me-3 d-block me-3">
            GSTIN:&nbsp;
            <span className="text-lightBlue">AB1234567890ADS</span>
          </small>

          <Tooltip title="Copy" placement="top">
            <ContentCopyIcon
              sx={{
                fontSize: 12,
                color: "#c8d8ff",
              }}
              className="c-pointer"
            />
          </Tooltip>
        </div>
      )}
      <div className="d-flex mt-2 align-items-center">
        <small className="text-grey-6 me-3 d-block me-3">
          Email ID:&nbsp;
          <span className="text-lightBlue">saniya@mydesignar.com</span>
        </small>

        <Tooltip title="Copy" placement="top">
          <ContentCopyIcon
            sx={{
              fontSize: 12,
              color: "#c8d8ff",
            }}
            className="c-pointer"
          />
        </Tooltip>
      </div>
      <div className="d-flex mt-2 align-items-center">
        <small className="text-grey-6 me-3">
          Mobile No:&nbsp;
          <span className="text-lightBlue">+91-9876543210</span>
        </small>

        <Tooltip title="Copy" placement="top">
          <ContentCopyIcon
            sx={{
              fontSize: 12,
              color: "#c8d8ff",
            }}
            className="c-pointer"
          />
        </Tooltip>
      </div>
      {showReviewData && (
        <React.Fragment>
          <div className="d-flex justify-content-center">
            <hr className="hr-grey-6 w-100 my-3" />
          </div>
          <div className="d-flex justify-content-between mb-2">
            <small className="text-grey-6 me-2">Reviews</small>
            {/* <small className="text-blue-2">ask for feedback?</small> */}
            <small className="text-blue-2 c-pointer">Send Email</small>
          </div>
          <div className="d-flex flex-column">
            <small className="text-grey-6 d-block mt-2 ">
              <span
                className="text-blue-2 c-pointer"
                onClick={handleOpenReview}
              >
                #REV12345&nbsp;
              </span>
              •&nbsp;13/07/20222&nbsp;•&nbsp;09:23 am
            </small>
            <small className="text-grey-6 d-block mt-2 ">
              <span
                className="text-blue-2 c-pointer"
                onClick={handleOpenReview}
              >
                #REV12345&nbsp;
              </span>
              •&nbsp;13/07/20222&nbsp;•&nbsp;09:23 am
            </small>
          </div>

          {/* <Dialog
            open={openReview}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleOpenReviewClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">Rating Review</h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleOpenReviewClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="py-3 px-4">
              <p className="text-grey-6 mb-2">Rating</p>
              <Rating
                // size="small"
                name="half-rating-read"
                defaultValue={4}
                readOnly
              />
              <p className="text-grey-6 mt-3">Reviews</p>
              <p className="text-lightBlue mt-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis quod delectus ex quam dolorum, obcaecati molestiae
                praesentium soluta beatae laborum. Perspiciatis iusto facere
                repellendus molestiae animi sapiente aliquam quidem quae.
              </p>
              <div className="d-flex">
                <div className="d-flex flex-column">
                  <p className="text-grey-6 mt-3">Product</p>
                  <p className="text-blue-2 mt-1 text-decoration-underline">
                    The Fringe Diamond Ring
                  </p>
                </div>
                <div className="d-flex flex-column ms-5">
                  <p className="text-grey-6 mt-3">Order ID</p>
                  <p className="text-blue-2 mt-1 text-decoration-underline">
                    #12345
                  </p>
                </div>
              </div>
              <p className="text-grey-6 mt-3">Customer</p>
              <p className="text-blue-2 mt-1 text-decoration-underline c-pointer">
                Saniya Shaikh
              </p>
              <p className="text-grey-6 mt-3">Created On</p>
              <p className="text-lightBlue mt-1 ">
                13/07/20222&nbsp;•&nbsp;09:23 am
              </p>
              <p className="text-grey-6 mt-3">Status</p>
              <div className="d-flex mt-1">
                <div className="rounded-pill d-flex table-status px-4 py-1 c-pointer">
                  <small className="text-black fw-400">Active</small>
                </div>
              </div>
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button
                className="button-green-outline py-2 px-4"
                onClick={handleOpenReviewClose}
              >
                <TaskAltIcon
                  sx={{
                    fontSize: 18,
                    cursor: "pointer",
                    "& :hover": { color: "green" },
                  }}
                />
                <p className="ms-2">Approve Reviews</p>
              </button>
              <button
                className="button-red-outline py-2 px-4"
                onClick={handleOpenReviewClose}
              >
                <BlockIcon
                  sx={{
                    fontSize: 18,
                    cursor: "pointer",
                    "& :hover": { color: "green" },
                  }}
                />
                <p className="ms-2">Reject Reviews</p>
              </button>
            </DialogActions>
          </Dialog> */}

          <Dialog
            open={openReview}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleOpenReviewClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">Rating Review</h5>
                  <small className="text-grey-6 mt-1">
                    13/07/2022 at 09:23am
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleOpenReviewClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="py-3 px-4">
              <p className="text-grey-6 mb-2">Rating</p>
              <Rating
                // size="small"
                name="half-rating-read"
                defaultValue={4}
                readOnly
              />
              <p className="text-grey-6 mt-3">Reviews</p>
              <p className="text-lightBlue mt-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis quod delectus ex quam dolorum, obcaecati molestiae
                praesentium soluta beatae laborum. Perspiciatis iusto facere
                repellendus molestiae animi sapiente aliquam quidem quae.
              </p>
              <div className="d-flex">
                <div>
                  <p className="text-grey-6 mt-3">Product</p>
                  <p className="text-blue-2 mt-1 text-decoration-underline">
                    The Fringe Diamond Ring
                  </p>
                </div>
                <div className="ms-5">
                  <p className="text-grey-6 mt-3">Order ID</p>
                  <p className="text-blue-2 mt-1 text-decoration-underline">
                    #12345
                  </p>
                </div>
              </div>
              <p className="text-grey-6 mt-3">Customer</p>
              <p className="text-blue-2 mt-1 text-decoration-underline">
                Saniya Shaikh
              </p>
              <p className="text-grey-6 mt-3">Status</p>
              <div className="d-flex mt-1">
                <div className="rounded-pill d-flex table-status px-4 py-1 c-pointer">
                  <small className="text-black fw-400">Active</small>
                </div>
              </div>
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button
                className="button-green-outline py-2 px-4"
                onClick={handleOpenReviewClose}
              >
                <TaskAltIcon
                  sx={{
                    fontSize: 18,
                    cursor: "pointer",
                    "& :hover": { color: "green" },
                  }}
                />
                <p className="ms-2">Approve Reviews</p>
              </button>
              <button
                className="button-red-outline py-2 px-4"
                onClick={handleOpenReviewClose}
              >
                <BlockIcon
                  sx={{
                    fontSize: 18,
                    cursor: "pointer",
                    "& :hover": { color: "green" },
                  }}
                />
                <p className="ms-2">Reject Reviews</p>
              </button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
      {showMediaData && (
        <React.Fragment>
          <div className="d-flex justify-content-center">
            <hr className="hr-grey-6 w-100 my-3" />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <small className="text-grey-6 me-2">Media</small>
            <small
              className="text-blue-2 c-pointer"
              onClick={handleImportSecondOpen}
            >
              + Upload Media
            </small>
          </div>
          <div className="d-flex align-items-center flex-wrap">
            <img
              src={product2}
              alt="product2"
              className="me-1 mb-1"
              width={60}
            />
            <img
              src={product2}
              alt="product2"
              className="me-1 mb-1"
              width={60}
            />
            <img
              src={product2}
              alt="product2"
              className="me-1 mb-1"
              width={60}
            />
          </div>

          <Dialog
            open={openImportSecond}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleImportSecondClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <h5 className="text-lightBlue fw-500">Media</h5>
                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleImportSecondClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="py-4 px-4">
              <div className="d-flex flex-column">
                <UploadFile imageName={productInfoMedia2} />
              </div>
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button
                className="button-grey py-2 px-5"
                onClick={handleImportSecondClose}
              >
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button
                className="button-gradient py-2 px-5"
                onClick={handleImportSecondClose}
              >
                <p>Save</p>
              </button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </div>
  );
};

export default OrderUserDetails;
