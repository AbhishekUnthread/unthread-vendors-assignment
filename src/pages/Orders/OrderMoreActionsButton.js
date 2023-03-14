import React from "react"; // ! MATERIAL IMPORTS
import { Popover } from "@mui/material";
// ! MATERIAL ICONS IMPORTS
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import ClearIcon from "@mui/icons-material/Clear";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const OrderMoreActionsButton = () => {
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
    <React.Fragment>
      <button
        className="button-gradient py-1 px-4 w-auto me-3"
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
    </React.Fragment>
  );
};

export default OrderMoreActionsButton;
