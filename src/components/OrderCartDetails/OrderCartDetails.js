import React from "react";
import "./OrderCartDetails.scss";
// ! COMPONENT IMPORTS
// ! IMAGES IMPORTS
import product2 from "../../assets/images/products/product2.jpg";
import productIcon from "../../assets/icons/productIcon.svg";
import video from "../../assets/icons/video.svg";
import cancel from "../../assets/icons/cancel.svg";
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

const OrderCartDetails = ({
  showEditButton,
  showCartButton,
  showBasicDetail,
  showItemAvailable,
  showActionButton,
  showFulfillButton,
  showQCButton,
}) => {
  // * PRODUCT DETAIL POPOVERS STARTS
  const [anchorProductDetailEl, setAnchorProductDetailEl] =
    React.useState(null);
  const handleProductDetailClick = (event) => {
    setAnchorProductDetailEl(event.currentTarget);
  };

  const handleProductDetailClose = () => {
    setAnchorProductDetailEl(null);
  };

  const openProductDetail = Boolean(anchorProductDetailEl);
  const idProductDetail = openProductDetail ? "simple-popover" : undefined;
  // * PRODUCT DETAIL POPOVERS ENDS

  // * ACTION POPOVERS STARTS
  const [anchorActionEl, setAnchorActionEl] = React.useState(null);
  const handleActionClick = (event) => {
    setAnchorActionEl(event.currentTarget);
  };

  const handleActionClose = () => {
    setAnchorActionEl(null);
  };

  const openAction = Boolean(anchorActionEl);
  const idAction = openAction ? "simple-popover" : undefined;
  // * ACTION POPOVERS ENDS

  // * PRICE POPOVERS STARTS
  const [anchorPriceEl, setAnchorPriceEl] = React.useState(null);
  const handlePriceClick = (event) => {
    setAnchorPriceEl(event.currentTarget);
  };

  const handlePriceClose = () => {
    setAnchorPriceEl(null);
  };

  const openPrice = Boolean(anchorPriceEl);
  const idPrice = openPrice ? "simple-popover" : undefined;
  // * PRICE POPOVERS ENDS

  // * GIFT POPOVERS STARTS
  const [anchorGiftEl, setAnchorGiftEl] = React.useState(null);
  const handleGiftClick = (event) => {
    setAnchorGiftEl(event.currentTarget);
  };

  const handleGiftClose = () => {
    setAnchorGiftEl(null);
  };

  const openGift = Boolean(anchorGiftEl);
  const idGift = openGift ? "simple-popover" : undefined;
  // * GIFT POPOVERS ENDS

  // ? VIEW QC DIALOG STARTS HERE
  const [openQc, setOpenQc] = React.useState(false);

  const handleOpenQc = () => {
    setOpenQc(true);
  };

  const handleOpenQcClose = () => {
    setOpenQc(false);
  };
  // ? VIEW QC DIALOG ENDS HERE

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 row">
      <div className="d-flex justify-content-between align-items-center col-12 px-0">
        <div className="d-flex align-items-center">
          <img src={productIcon} alt="userIcon" width={16} />
          <h6 className="text-lightBlue fw-500 ms-2">
            Order&nbsp;:&nbsp;2&nbsp;Items
          </h6>
          <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer ms-4">
            <small className="text-black fw-400">Order Confirm</small>
          </div>
        </div>
        {showEditButton && (
          <small className="text-blue-2 c-pointer">Edit Order</small>
        )}
        {showCartButton && (
          <small className="text-blue-2 c-pointer">View Cart</small>
        )}
      </div>

      <div className="d-flex justify-content-center col-12 px-0">
        <hr className="hr-grey-6 w-100 mt-3 mb-0" />
      </div>
      <div className="bg-black-21 rounded-8 p-3 col-12 mt-4">
        <div className="d-flex align-items-center justify-content-between ">
          <div className="d-flex align-items-center">
            <p className="text-grey-6 w-auto pe-0">Location:</p>
            <Chip
              label="Karol Bagh, Delhi • 1.1km"
              size="small"
              className="px-1 w-auto ms-3"
              variant="outlined"
            />
          </div>
          {/*{showQCButton && <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
            <img src={video} alt="video" width={16} className="me-2" />
            <small
              className="text-blue-gradient d-block"
              onClick={handleOpenQc}
            >
              View QC
            </small>
          </div>} */}
        </div>
        <div className="row justify-content-between">
          {showBasicDetail && (
            <div className="col-3 mt-3">
              <p className="fw-500 text-blue-2 text-decoration-underline">
                #12345-A
              </p>
              <small className="text-grey-6 mt-2 d-block">
                Delivery Date:&nbsp;
                <span className="text-lightBlue">20th May, 2022</span>
              </small>
              <div className="d-flex mt-2">
                <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer w-auto">
                  <small className="text-black fw-400">Order Confirm</small>
                </div>
              </div>
            </div>
          )}
          <div className="col-5 mt-3">
            <div className="d-flex align-items-start">
              <img
                src={product2}
                alt="product2"
                className="rounded-8"
                width={80}
                height="auto"
              />
              <div className="d-flex flex-column ms-2">
                <p className="text-lightBlue">The Fringe Diamond Ring</p>
                <small className="text-grey-6 mt-1 d-block">
                  SKU:&nbsp;TFDR012345&nbsp;&nbsp;|&nbsp;&nbsp;Brand:JWLellers
                </small>
                <div className="d-flex mt-1 align-items-center">
                  <small className="text-grey-6 d-block me-2">
                    7-Gold-18KT-Rose-IJSI&nbsp;•&nbsp;3.65g
                  </small>
                  <KeyboardArrowDownIcon
                    sx={{
                      fontSize: 18,
                      marginLeft: 1,
                      color: "#c8d8ff",
                      cursor: "pointer",
                    }}
                    aria-describedby={idProductDetail}
                    variant="contained"
                    onClick={handleProductDetailClick}
                  />
                </div>
              </div>
            </div>
            {showItemAvailable && (
              <div className="d-flex ps-5">
                <small className="text-grey-6 mt-5 mb-2 ps-4">
                  Item available for Return & Exchange:&nbsp;
                  <span className="text-lightBlue">15 days</span>
                </small>
              </div>
            )}
          </div>
          <div className="col-4 d-flex flex-column justify-content-between mt-3 align-items-end">
            <div className="d-flex">
              <small className="text-lightBlue me-3">Calculated Price:</small>
              <h6 className="text-lightBlue me-2 fw-500">₹ 46,350</h6>
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 18,
                  marginLeft: 1,
                  color: "#c8d8ff",
                  cursor: "pointer",
                }}
                aria-describedby={idPrice}
                variant="contained"
                onClick={handlePriceClick}
              />
            </div>
            <button
              className="button-lightBlue-outline py-2 px-4"
              aria-describedby={idAction}
              variant="contained"
              onClick={handleActionClick}
            >
              <small>Action</small>
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 18,
                  marginLeft: 1,
                }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-black-21 rounded-8 p-3 col-12 mt-3">
        <div className="d-flex align-items-center justify-content-between ">
          <div className="d-flex align-items-center">
            <p className="text-grey-6 w-auto pe-0">Location:</p>
            <Chip
              label="Mahalaxmi, Mumbai • 2.1km"
              size="small"
              className="px-1 w-auto ms-3"
              variant="outlined"
            />
            <Chip
              label="Made to Order"
              size="small"
              className="px-1 w-auto ms-3"
            />
          </div>
          {/* {showQCButton && (
            <div className="d-flex align-items-center rounded-3 p-2 hover-back c-pointer">
              <img src={video} alt="video" width={16} className="me-2" />
              <small
                className="text-blue-gradient d-block"
                onClick={handleOpenQc}
              >
                View QC
              </small>
            </div>
          )} */}
        </div>
        <div className="row justify-content-between">
          {showBasicDetail && (
            <div className="col-3 mt-3">
              <p className="fw-500 text-blue-2 text-decoration-underline">
                #12345-A
              </p>
              <small className="text-grey-6 mt-2 d-block">
                Delivery Date:&nbsp;
                <span className="text-lightBlue">20th May, 2022</span>
              </small>
              <div className="d-flex mt-2">
                <div className="rounded-pill d-flex table-status px-2 py-1 c-pointer w-auto">
                  <small className="text-black fw-400">Order Confirm</small>
                </div>
              </div>
            </div>
          )}
          <div className="col-5 mt-3">
            <div className="d-flex align-items-start">
              <img
                src={product2}
                alt="product2"
                className="rounded-8"
                width={80}
                height="auto"
              />
              <div className="d-flex flex-column ms-2">
                <p className="text-lightBlue">The Fringe Diamond Ring</p>
                <small className="text-grey-6 mt-1 d-block">
                  SKU:&nbsp;TFDR012345&nbsp;&nbsp;|&nbsp;&nbsp;Brand:JWLellers
                </small>
                <div className="d-flex mt-1 align-items-center">
                  <small className="text-grey-6 d-block me-2">
                    7-Gold-18KT-Rose-IJSI&nbsp;•&nbsp;3.65g
                  </small>
                  <KeyboardArrowDownIcon
                    sx={{
                      fontSize: 18,
                      marginLeft: 1,
                      color: "#c8d8ff",
                      cursor: "pointer",
                    }}
                    aria-describedby={idProductDetail}
                    variant="contained"
                    onClick={handleProductDetailClick}
                  />
                </div>
              </div>
            </div>
            {showItemAvailable && (
              <div className="d-flex ps-5">
                <small className="text-grey-6 mt-5 mb-2 ps-4">
                  Item available for Return & Exchange:&nbsp;
                  <span className="text-lightBlue">15 days</span>
                </small>
              </div>
            )}
          </div>
          <div className="col-4 d-flex flex-column justify-content-between mt-3 align-items-end">
            <div className="d-flex">
              <small className="text-lightBlue me-3">Calculated Price:</small>
              <h6 className="text-lightBlue me-2 fw-500">₹ 46,350</h6>
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 18,
                  marginLeft: 1,
                  color: "#c8d8ff",
                  cursor: "pointer",
                }}
                aria-describedby={idPrice}
                variant="contained"
                onClick={handlePriceClick}
              />
            </div>
            <button
              className="button-lightBlue-outline py-2 px-4"
              aria-describedby={idAction}
              variant="contained"
              onClick={handleActionClick}
            >
              <small>Action</small>
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 18,
                  marginLeft: 1,
                }}
              />
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={openQc}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleOpenQcClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column ">
              <h5 className="text-lightBlue fw-500">QC Video:</h5>

              <small className="text-grey-6 mt-1 d-block">
                ⓘ Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </small>
            </div>
            <img
              src={cancel}
              alt="cancel"
              width={30}
              onClick={handleOpenQcClose}
              className="c-pointer"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                src={product2}
                alt="product2"
                className="rounded-8"
                width={60}
              />
              <div className="d-flex flex-column">
                <p className="text-lightBlue">The Fringe Diamond Ring</p>
                <small className="text-grey-6 mt-1 d-block">
                  SKU:&nbsp;TFDR012345
                </small>
              </div>
            </div>
            <div className="d-flex">
              <button
                className="button-green-outline py-2 px-4"
                onClick={handleOpenQcClose}
              >
                <TaskAltIcon
                  sx={{
                    fontSize: 18,
                    cursor: "pointer",
                    "& :hover": { color: "green" },
                  }}
                />
                <p className="ms-2">Approve QC</p>
              </button>
              <button
                className="button-red-outline py-2 px-4"
                onClick={handleOpenQcClose}
              >
                <BlockIcon
                  sx={{
                    fontSize: 18,
                    cursor: "pointer",
                    "& :hover": { color: "green" },
                  }}
                />
                <p className="ms-2">Reject QC</p>
              </button>
            </div>
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            quod delectus ex quam dolorum, obcaecati molestiae praesentium
            soluta beatae laborum. Perspiciatis iusto facere repellendus
            molestiae animi sapiente aliquam quidem quae.
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
          <p className="text-blue-2 mt-1 text-decoration-underline">
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
            onClick={handleOpenQcClose}
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
            onClick={handleOpenQcClose}
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

      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id={idProductDetail}
        open={openProductDetail}
        anchorEl={anchorProductDetailEl}
        onClose={handleProductDetailClose}
      >
        <div className="py-3 px-2">
          {/* <small className="text-lightBlue">
          Default : 12KT • Yellow • Gold • IJ-SI
        </small> */}
          <div className="d-flex align-items-center justify-content-between mb-2 text-lightBlue">
            <small>Size:</small>
            <small className="ms-2">7</small>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2 text-lightBlue">
            <small>Metal:</small>
            <small className="ms-2">Gold</small>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2 text-lightBlue">
            <small>Purity:</small>
            <small className="ms-2">18 KT</small>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2 text-lightBlue">
            <small>Color:</small>
            <small className="ms-2">Rose</small>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2 text-lightBlue">
            <small>Diamond:</small>
            <small className="ms-2">IJ-SI</small>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2 text-lightBlue">
            <small>Weight:</small>
            <small className="ms-2">3.65g</small>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2 text-grey-6">
            <small>Metal Weight:</small>
            <small className="ms-2">3.05g</small>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2 text-grey-6 ">
            <small>Diamond Weight:</small>
            <small className="ms-2">0.60g</small>
          </div>
          {/* <div className="d-flex align-items-center justify-content-between mt-2">
          <p className="text-lightBlue">Total</p>
          <p className="ms-2 text-lightBlue fw-600">₹&nbsp;20,600</p>
        </div> */}
        </div>
      </Popover>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id={idPrice}
        open={openPrice}
        anchorEl={anchorPriceEl}
        onClose={handlePriceClose}
      >
        <div className="py-3 px-2">
          {/* <small className="text-lightBlue">
          Default : 12KT • Yellow • Gold • IJ-SI
        </small> */}
          <div className="d-flex align-items-center justify-content-between mb-2 text-grey-6">
            <small>Metal Price</small>
            <small className="ms-2">₹&nbsp;15,000</small>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-grey-6">
            <small>Diamond Price</small>
            <small className="ms-2">₹&nbsp;4,000</small>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2 mt-2 text-grey-6">
            <small>Making Charges</small>
            <small className="ms-2">₹&nbsp;1,000</small>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-2 text-grey-6">
            <small>GST</small>
            <small className="ms-2">₹&nbsp;&nbsp;600</small>
          </div>
          {/* <div className="d-flex align-items-center justify-content-between mt-2">
          <p className="text-lightBlue">Total</p>
          <p className="ms-2 text-lightBlue fw-600">₹&nbsp;20,600</p>
        </div> */}
        </div>
      </Popover>
      {showActionButton && (
        <Popover
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          id={idAction}
          open={openAction}
          anchorEl={anchorActionEl}
          onClose={handleActionClose}
        >
          <div className="py-2 px-1">
            <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
              <ReceiptOutlinedIcon
                sx={{
                  fontSize: 14,
                  marginRight: 1,
                }}
              />
              Create Shipping Label
            </small>
            <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
              <PrintIcon
                sx={{
                  fontSize: 14,
                  marginRight: 1,
                }}
              />
              Print Packaging Slip
            </small>
            <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
              <ReceiptLongOutlinedIcon
                sx={{
                  fontSize: 14,
                  marginRight: 1,
                }}
              />
              View Product Invoice
            </small>
            <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
              <FileDownloadOutlinedIcon
                sx={{
                  fontSize: 14,
                  marginRight: 1,
                }}
              />
              Download Product Invoice
            </small>
            <small className="text-lightBlue rounded-3 p-2 hover-back d-block">
              <CloseIcon
                sx={{
                  fontSize: 14,
                  marginRight: 1,
                }}
              />
              Cancel Product
            </small>
          </div>
        </Popover>
      )}

      <div className="d-flex justify-content-center col-12 px-0">
        <hr className="hr-grey-6 w-100 my-3" />
      </div>
      <div className="col-12 px-0">
        <div className="row">
          <div className="col-md-6">
            <small className="text-grey-6 d-block">Customer Note:</small>

            <TextareaAutosize
              aria-label="meta description"
              placeholder="Type Something"
              style={{
                background: "#15142A",
                color: "#c8d8ff",
                borderRadius: 5,
              }}
              minRows={3}
              className=" mt-3 w-75"
            />
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-between mt-2">
              <small className="text-grey-6">Subtotal</small>
              <small className="text-blue-1">₹ 20,600 </small>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <small className="text-grey-6">
                Discount <span className="text-blue-1">(JWL200OFF)</span>
              </small>
              <small className="text-blue-1">₹ 20,600 </small>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <small className="text-grey-6">
                Gift Packaging Charges&nbsp;
                <span
                  className="text-blue-2 c-pointer"
                  aria-describedby={idGift}
                  variant="contained"
                  onClick={handleGiftClick}
                >
                  (JWL Exclusive Packaging)
                </span>
              </small>
              <small className="text-blue-1">₹ 20,600 </small>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <small className="text-grey-6">
                GST&nbsp;<span className="text-blue-1">(3%)</span>
              </small>
              <small className="text-blue-1">₹ 350</small>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <small className="text-grey-6">
                Shipping&nbsp;
                <span className="text-blue-1 c-pointer">
                  (Order above ₹ 50,000)
                </span>
              </small>
              <small className="text-blue-1">Free</small>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <small className="text-grey-6">
                Labour Charges&nbsp;
                <span className="text-blue-1 c-pointer">
                  (Extra Labour Charges)
                </span>
              </small>
              <small className="text-blue-1">₹ 2300</small>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <p className="text-lightBlue">Total</p>
              <h6 className="text-lightBlue">₹ 95,000</h6>
            </div>
          </div>
        </div>
      </div>

      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id={idGift}
        open={openGift}
        anchorEl={anchorGiftEl}
        onClose={handleGiftClose}
      >
        <div className="d-flex py-3 px-2">
          <img src={product2} alt="product2" className="rounded-8" width={80} />
          <div className="d-flex flex-column justify-content-between ms-3">
            <div>
              <p className="fw-500 text-lightBlue">JWL Exclusive Packaging</p>
              <small className="text-grey-6 mt-2">#GIFTWRAPPER</small>
            </div>
            <small className="text-blue-2 text-decoration-underline c-pointer">
              View Image
            </small>
          </div>
        </div>
      </Popover>

      {showFulfillButton && (
        <React.Fragment>
          <div className="d-flex justify-content-center col-12 px-0">
            <hr className="hr-grey-6 w-100 my-3" />
          </div>
          <div className="col-12 px-0 ">
            <button className="button-gradient ms-auto py-2 px-4 w-auto">
              <p>FulFill Item</p>
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default OrderCartDetails;
