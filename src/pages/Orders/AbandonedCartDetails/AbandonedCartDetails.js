import React from "react";
import "./AbandonedCartDetails.scss";
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
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PrintIcon from "@mui/icons-material/Print";
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
